import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import dotenv from 'dotenv';
import { Registration } from '../models/Registration.js';
import { EventSetting, getOrCreateEventSetting } from '../models/EventSetting.js';
import { Counter, getNextInquiryNumber } from '../models/Counter.js';
import { validatePaymentScreenshot } from '../services/ocrService.js';

dotenv.config();

const router = express.Router();

// Multer memory storage (files kept in memory for instant processing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

// Authentication middleware
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

const verifyAuth = (req) => {
  const authHeader = req.headers['authorization'] || req.headers['x-admin-password'];
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (token === SUPER_ADMIN_PASSWORD) {
    return 'superadmin';
  }
  if (token === ADMIN_PASSWORD) {
    return 'admin';
  }
  return null;
};

const requireAdmin = (req, res, next) => {
  const role = verifyAuth(req);
  if (!role) {
    return res.status(401).json({ error: 'અનધિકૃત ઍક્સેસ. કૃપા કરીને સાચો પાસવર્ડ નાખો.' });
  }
  req.userRole = role;
  next();
};

const requireSuperAdmin = (req, res, next) => {
  const role = verifyAuth(req);
  if (role !== 'superadmin') {
    return res.status(403).json({ error: 'સુપર એડમિન પાસવર્ડ જરૂરી છે.' });
  }
  req.userRole = role;
  next();
};

// Helper: Determine dynamic 50-couple tier
const calculateActiveTier = (registeredCount, tiers) => {
  // registeredCount: number of valid couples registered so far
  // Tier 1: 1-50, Tier 2: 51-100, Tier 3: 101-150, Tier 4: 151-200, Tier 5: 201-250
  const currentSlot = registeredCount + 1;
  for (const tier of tiers) {
    if (currentSlot >= tier.minCouple && currentSlot <= tier.maxCouple) {
      const slotsLeft = tier.maxCouple - registeredCount;
      return { activeTier: tier, slotsLeft };
    }
  }
  // If exceeded 250, return last tier with 0 slots
  const lastTier = tiers[tiers.length - 1];
  return { activeTier: lastTier, slotsLeft: 0 };
};

// Helper: Resolve Active UPI Account with Auto-Rolling every 50 couples
const resolveActiveUpi = (setting, registeredCount) => {
  const accounts = Array.isArray(setting.upiAccounts) && setting.upiAccounts.length > 0
    ? setting.upiAccounts.filter(a => a.isActive !== false)
    : [];

  const threshold = setting.upiRollingThreshold || 50;

  if (accounts.length === 0) {
    const bookingsInWindow = registeredCount % threshold;
    return {
      upiId: setting.upiId || 'jayneshshingala2005-2@okicici',
      payeeName: setting.payeeName || 'Shingala Jaynesh',
      customQrImage: setting.customQrImage || '/events/divy-garbhyatra/primary-upi-qr.jpg',
      useCustomQr: setting.useCustomQr !== false,
      accountIndex: 0,
      rollingThreshold: threshold,
      bookingsInCurrentWindow: bookingsInWindow,
      slotsLeftOnCurrentUpi: Math.max(0, threshold - bookingsInWindow),
      totalAccountsInPool: 1
    };
  }

  let activeIndex = setting.activeUpiIndex || 0;
  if (setting.autoRotateUpi !== false) {
    const windowIndex = Math.floor(registeredCount / threshold);
    activeIndex = windowIndex % accounts.length;
  }

  const activeAccount = accounts[activeIndex] || accounts[0];
  const bookingsInWindow = registeredCount % threshold;
  const slotsLeftOnUpi = Math.max(0, threshold - bookingsInWindow);

  return {
    upiId: activeAccount.upiId,
    payeeName: activeAccount.payeeName,
    customQrImage: activeAccount.customQrImage || setting.customQrImage || '/events/divy-garbhyatra/primary-upi-qr.jpg',
    useCustomQr: activeAccount.customQrImage ? true : Boolean(setting.useCustomQr),
    accountIndex: activeIndex,
    rollingThreshold: threshold,
    bookingsInCurrentWindow: bookingsInWindow,
    slotsLeftOnCurrentUpi: slotsLeftOnUpi,
    totalAccountsInPool: accounts.length
  };
};

// ==========================================
// PUBLIC ENDPOINTS
// ==========================================

// 1. GET /api/event - Get event details and live 50-couple rate status
router.get('/event', async (req, res) => {
  try {
    const setting = await getOrCreateEventSetting();
    const registeredCount = await Registration.countDocuments({ status: { $ne: 'rejected' } });
    const { activeTier, slotsLeft } = calculateActiveTier(registeredCount, setting.tiers);
    const activePayment = resolveActiveUpi(setting, registeredCount);

    const totalCapacity = setting.totalCoupleCapacity || 250;
    const isSoldOut = registeredCount >= totalCapacity;

    res.json({
      success: true,
      event: {
        title: setting.title,
        subtitle: setting.subtitle,
        dateGujarati: setting.dateGujarati,
        dateIso: setting.dateIso,
        time: setting.time,
        venue: setting.venue,
        venueAddress: setting.venueAddress,
        speaker: setting.speaker,
        speakerTitle: setting.speakerTitle,
        speakerBio: setting.speakerBio || 'Vedic Prenatal Science Guide & Inspirational Speaker',
        speakerPhoto: setting.speakerPhoto || '',
        supportPhone: setting.supportPhone || '+91 94285 24890',
        supportWhatsapp: setting.supportWhatsapp || '919586979897',
        venueMapUrl: setting.venueMapUrl || '',
        isRegistrationOpen: setting.isRegistrationOpen !== false,
        registrationClosedNotice: setting.registrationClosedNotice || 'દિલગીર છીએ, રજીસ્ટ્રેશન હાલ પૂર્ણ થયેલ છે.',
        passNotice: setting.passNotice || 'કૃપા કરીને સમયસર પહોંચવું. ગેટ પર ડિજિટલ પાસ QR કોડ બતાવવો ફરજિયાત છે.',
        totalCapacity
      },
      payment: {
        upiId: activePayment.upiId,
        payeeName: activePayment.payeeName,
        customQrImage: activePayment.customQrImage || '',
        useCustomQr: Boolean(activePayment.useCustomQr),
        autoRotate: setting.autoRotateUpi !== false,
        accountIndex: activePayment.accountIndex,
        slotsLeftOnCurrentUpi: activePayment.slotsLeftOnCurrentUpi,
        bookingsInCurrentWindow: activePayment.bookingsInCurrentWindow,
        rollingThreshold: activePayment.rollingThreshold,
        totalAccountsInPool: activePayment.totalAccountsInPool
      },
      liveRates: {
        registeredCount,
        totalCapacity,
        isSoldOut,
        activeTier,
        currentPrice: activeTier.price,
        slotsLeftInTier: Math.max(0, slotsLeft),
        totalSpotsRemaining: Math.max(0, totalCapacity - registeredCount),
        tiers: setting.tiers.map(t => ({
          ...t.toObject(),
          isCurrent: t.tierNumber === activeTier.tierNumber,
          isCompleted: registeredCount >= t.maxCouple
        }))
      }
    });
  } catch (err) {
    console.error('[API /event] Error:', err);
    res.status(500).json({ error: 'ઇવેન્ટ વિગતો લાવવામાં ભૂલ આવી.' });
  }
});

// 2. POST /api/register - Couple registration with OCR fraud verification
router.post('/register', upload.fields([
  { name: 'couplePhoto', maxCount: 1 },
  { name: 'paymentScreenshot', maxCount: 1 }
]), async (req, res) => {
  try {
    const { husbandName, wifeName, surname, phoneNumber } = req.body;

    if (!husbandName || !wifeName || !surname || !phoneNumber) {
      return res.status(400).json({ error: 'પતિનું નામ, પત્નીનું નામ, અટક અને મોબાઇલ નંબર જરૂરી છે.' });
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'કૃપા કરીને માન્ય ૧૦ આંકડાનો મોબાઇલ નંબર દાખલ કરો.' });
    }

    // Check files
    const couplePhotoFile = req.files && req.files['couplePhoto'] ? req.files['couplePhoto'][0] : null;
    const paymentFile = req.files && req.files['paymentScreenshot'] ? req.files['paymentScreenshot'][0] : null;

    if (!couplePhotoFile) {
      return res.status(400).json({ error: 'કપલ ફોટો (Couple Photo) અપલોડ કરવો ફરજિયાત છે.' });
    }
    if (!paymentFile) {
      return res.status(400).json({ error: 'પેમેન્ટનો સક્સેસ સ્ક્રીનશોટ (Receipt) અપલોડ કરવો ફરજિયાત છે.' });
    }

    // Check capacity
    const setting = await getOrCreateEventSetting();
    const registeredCount = await Registration.countDocuments({ status: { $ne: 'rejected' } });
    if (registeredCount >= setting.totalCoupleCapacity) {
      return res.status(400).json({ error: 'દિલગીર છીએ, આ ઇવેન્ટના તમામ ૨૫૦ કપલના સ્લોટ બુક થઈ ચૂક્યા છે!' });
    }

    // 1. OCR & QR Code Fraud Verification on payment screenshot
    console.log(`[Register] Processing OCR verification for couple: ${husbandName} & ${wifeName}...`);
    const ocrResult = await validatePaymentScreenshot(paymentFile.buffer);

    if (!ocrResult.valid) {
      console.warn(`[Register] Fraud/Invalid receipt rejected: ${ocrResult.error}`);
      return res.status(400).json({ error: ocrResult.error });
    }

    // 2. Compress and prepare images for direct reliable storage in MongoDB
    // Compress couple photo: resize to max 800x800, quality 80
    const compressedCouplePhotoBuffer = await sharp(couplePhotoFile.buffer)
      .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    const couplePhotoBase64 = `data:image/jpeg;base64,${compressedCouplePhotoBuffer.toString('base64')}`;

    // Compress payment screenshot: resize to max 1000px height, quality 80
    const compressedPaymentBuffer = await sharp(paymentFile.buffer)
      .resize({ width: 1000, height: 1400, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();
    const paymentScreenshotBase64 = `data:image/jpeg;base64,${compressedPaymentBuffer.toString('base64')}`;

    // 3. Compute active tier & price
    const { activeTier } = calculateActiveTier(registeredCount, setting.tiers);

    // 4. Generate sequential Inquiry ID (starts at CPL-1001)
    const nextSeq = await getNextInquiryNumber();
    const inquiryId = `CPL-${nextSeq}`;

    // 5. Create Registration document
    const registration = await Registration.create({
      inquiryId,
      husbandName: husbandName.trim(),
      wifeName: wifeName.trim(),
      surname: surname.trim(),
      phoneNumber: cleanPhone,
      couplePhoto: couplePhotoBase64,
      paymentScreenshot: paymentScreenshotBase64,
      utr: ocrResult.utr || '',
      payeeNameFromReceipt: ocrResult.payeeName || 'Not detected',
      tier: activeTier.tierNumber,
      tierName: activeTier.name,
      amount: activeTier.price,
      status: 'pending'
    });

    console.log(`[Register] Successfully registered couple: ${inquiryId} - ${husbandName} & ${wifeName} ${surname} at ₹${activeTier.price}`);

    res.status(201).json({
      success: true,
      message: 'તમારું રજીસ્ટ્રેશન સફળતાપૂર્વક સબમિટ થઈ ગયું છે. વેરિફિકેશન પછી પાસ ઉપલબ્ધ થશે.',
      data: {
        inquiryId: registration.inquiryId,
        husbandName: registration.husbandName,
        wifeName: registration.wifeName,
        surname: registration.surname,
        tier: registration.tier,
        amount: registration.amount,
        status: registration.status,
        createdAt: registration.createdAt
      }
    });

  } catch (err) {
    console.error('[API /register] Error:', err);
    res.status(500).json({ error: 'રજીસ્ટ્રેશન કરવામાં સર્વર એરર આવી: ' + err.message });
  }
});

// 3. GET /api/status/:inquiryId - Public Status Check & Digital Pass Lookup
router.get('/status/:inquiryId', async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const query = inquiryId.trim();

    const registration = await Registration.findOne({
      $or: [
        { inquiryId: new RegExp(`^${query}$`, 'i') },
        { phoneNumber: query }
      ]
    });

    if (!registration) {
      return res.status(404).json({ error: 'ઇન્ક્વાયરી આઈડી અથવા મોબાઇલ નંબર મળ્યો નથી.' });
    }

    const setting = await getOrCreateEventSetting();

    res.json({
      success: true,
      data: {
        inquiryId: registration.inquiryId,
        husbandName: registration.husbandName,
        wifeName: registration.wifeName,
        surname: registration.surname,
        phoneNumber: registration.phoneNumber,
        couplePhoto: registration.couplePhoto,
        status: registration.status,
        rejectionReason: registration.rejectionReason,
        tier: registration.tier,
        tierName: registration.tierName,
        amount: registration.amount,
        attendance: registration.attendance,
        createdAt: registration.createdAt,
        event: {
          title: setting.title,
          subtitle: setting.subtitle,
          dateGujarati: setting.dateGujarati,
          time: setting.time,
          venue: setting.venue,
          speaker: setting.speaker
        }
      }
    });
  } catch (err) {
    console.error('[API /status] Error:', err);
    res.status(500).json({ error: 'સ્ટેટસ તપાસવામાં ભૂલ આવી.' });
  }
});

// ==========================================
// ADMIN & GATE SCANNER ENDPOINTS
// ==========================================

router.post('/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'પાસવર્ડ જરૂરી છે.' });
  }
  const cleanPass = password.trim();

  if (cleanPass === SUPER_ADMIN_PASSWORD) {
    return res.json({ success: true, role: 'superadmin', message: 'સુપર એડમિન લૉગિન સફળ.' });
  }
  if (cleanPass === ADMIN_PASSWORD) {
    return res.json({ success: true, role: 'admin', message: 'એડમિન લૉગિન સફળ.' });
  }
  return res.status(401).json({ error: 'ખોટો પાસવર્ડ! કૃપા કરીને સાચો પાસવર્ડ નાખો.' });
});

// 5. GET /api/admin/registrations - List all registrations with filters
router.get('/admin/registrations', requireAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const q = search.trim();
      filter.$or = [
        { inquiryId: new RegExp(q, 'i') },
        { husbandName: new RegExp(q, 'i') },
        { wifeName: new RegExp(q, 'i') },
        { surname: new RegExp(q, 'i') },
        { phoneNumber: new RegExp(q, 'i') },
        { utr: new RegExp(q, 'i') }
      ];
    }

    const registrations = await Registration.find(filter).sort({ createdAt: -1 });

    // Aggregate stats
    const totalCount = await Registration.countDocuments();
    const approvedCount = await Registration.countDocuments({ status: 'approved' });
    const pendingCount = await Registration.countDocuments({ status: 'pending' });
    const rejectedCount = await Registration.countDocuments({ status: 'rejected' });
    const checkedInCount = await Registration.countDocuments({ 'attendance.checkedIn': true });

    const revenueResult = await Registration.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
      success: true,
      stats: {
        total: totalCount,
        approved: approvedCount,
        pending: pendingCount,
        rejected: rejectedCount,
        checkedIn: checkedInCount,
        totalRevenue
      },
      registrations
    });
  } catch (err) {
    console.error('[API /admin/registrations] Error:', err);
    res.status(500).json({ error: 'રજીસ્ટ્રેશન લિસ્ટ લાવવામાં ભૂલ આવી.' });
  }
});

// 6. POST /api/admin/registrations/:inquiryId/approve - Approve registration
router.post('/admin/registrations/:inquiryId/approve', requireAdmin, async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const registration = await Registration.findOneAndUpdate(
      { inquiryId },
      { status: 'approved', rejectionReason: '' },
      { new: true }
    );
    if (!registration) {
      return res.status(404).json({ error: 'રજીસ્ટ્રેશન મળ્યું નથી.' });
    }
    res.json({
      success: true,
      message: `ઇન્ક્વાયરી ${inquiryId} સફળતાપૂર્વક એપ્રુવ થઈ ગઈ છે!`,
      data: registration
    });
  } catch (err) {
    console.error('[API /approve] Error:', err);
    res.status(500).json({ error: 'એપ્રુવ કરવામાં ભૂલ આવી.' });
  }
});

// 7. POST /api/admin/registrations/:inquiryId/reject - Reject registration
router.post('/admin/registrations/:inquiryId/reject', requireAdmin, async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const { reason } = req.body;
    const registration = await Registration.findOneAndUpdate(
      { inquiryId },
      { status: 'rejected', rejectionReason: reason || 'પેમેન્ટ વેરિફિકેશન અમાન્ય.' },
      { new: true }
    );
    if (!registration) {
      return res.status(404).json({ error: 'રજીસ્ટ્રેશન મળ્યું નથી.' });
    }
    res.json({
      success: true,
      message: `ઇન્ક્વાયરી ${inquiryId} રિજેક્ટ કરવામાં આવી છે.`,
      data: registration
    });
  } catch (err) {
    console.error('[API /reject] Error:', err);
    res.status(500).json({ error: 'રિજેક્ટ કરવામાં ભૂલ આવી.' });
  }
});

// 8. DELETE /api/admin/registrations/:inquiryId - Delete registration
router.delete('/admin/registrations/:inquiryId', requireAdmin, async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const deleted = await Registration.findOneAndDelete({ inquiryId });
    if (!deleted) {
      return res.status(404).json({ error: 'રજીસ્ટ્રેશન મળ્યું નથી.' });
    }
    res.json({ success: true, message: `રજીસ્ટ્રેશન ${inquiryId} સફળતાપૂર્વક ડિલીટ થયું.` });
  } catch (err) {
    console.error('[API /delete] Error:', err);
    res.status(500).json({ error: 'ડિલીટ કરવામાં ભૂલ આવી.' });
  }
});

// 9. POST /api/admin/scanner/verify - Gate Pass Scanner
router.post('/admin/scanner/verify', requireAdmin, async (req, res) => {
  try {
    const { inquiryId } = req.body;
    if (!inquiryId) {
      return res.status(400).json({ success: false, code: 'MISSING_ID', message: 'ઇન્ક્વાયરી ID જરૂરી છે.' });
    }

    const cleanId = inquiryId.trim().toUpperCase();
    const registration = await Registration.findOne({ inquiryId: cleanId });

    if (!registration) {
      return res.status(404).json({
        success: false,
        code: 'NOT_FOUND',
        message: 'અમાન્ય પાસ! ડેટાબેઝમાં કોઈ રેકોર્ડ મળ્યો નથી.'
      });
    }

    if (registration.status !== 'approved') {
      return res.status(400).json({
        success: false,
        code: 'NOT_APPROVED',
        message: `આ પાસ માન્ય નથી! સ્ટેટસ: ${registration.status.toUpperCase()}`,
        registration: {
          inquiryId: registration.inquiryId,
          husbandName: registration.husbandName,
          wifeName: registration.wifeName,
          surname: registration.surname,
          couplePhoto: registration.couplePhoto,
          status: registration.status
        }
      });
    }

    // Check if already checked in
    if (registration.attendance && registration.attendance.checkedIn) {
      return res.status(400).json({
        success: false,
        code: 'ALREADY_CHECKED_IN',
        message: 'ચેતવણી: આ કપલ પહેલેથી જ એન્ટ્રી લઈ ચૂક્યા છે!',
        checkedInAt: registration.attendance.checkedInAt,
        registration: {
          inquiryId: registration.inquiryId,
          husbandName: registration.husbandName,
          wifeName: registration.wifeName,
          surname: registration.surname,
          couplePhoto: registration.couplePhoto
        }
      });
    }

    // Mark check-in
    registration.attendance.checkedIn = true;
    registration.attendance.checkedInAt = new Date();
    await registration.save();

    res.json({
      success: true,
      code: 'ENTRY_GRANTED',
      message: 'સ્વાગત છે! કપલ એન્ટ્રી મંજૂર.',
      registration: {
        inquiryId: registration.inquiryId,
        husbandName: registration.husbandName,
        wifeName: registration.wifeName,
        surname: registration.surname,
        couplePhoto: registration.couplePhoto,
        checkedInAt: registration.attendance.checkedInAt
      }
    });

  } catch (err) {
    console.error('[API /scanner/verify] Error:', err);
    res.status(500).json({ success: false, code: 'SERVER_ERROR', message: 'સ્કેનરમાં એરર આવી.' });
  }
});

// 10. GET /api/admin/export/csv - Export CSV of attendees
router.get('/admin/export/csv', requireAdmin, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: 1 });

    let csv = 'Inquiry ID,Husband Name,Wife Name,Surname,Mobile Number,Tier,Amount,Status,UTR Number,Payee Name,Checked In,Checked In Time,Registration Date\n';

    registrations.forEach(r => {
      const checkedInTime = r.attendance?.checkedInAt ? new Date(r.attendance.checkedInAt).toLocaleString('en-IN') : '';
      const regDate = new Date(r.createdAt).toLocaleString('en-IN');
      const row = [
        `"${r.inquiryId}"`,
        `"${r.husbandName}"`,
        `"${r.wifeName}"`,
        `"${r.surname}"`,
        `"${r.phoneNumber}"`,
        `"${r.tierName}"`,
        r.amount,
        `"${r.status}"`,
        `"${r.utr || ''}"`,
        `"${r.payeeNameFromReceipt || ''}"`,
        r.attendance?.checkedIn ? 'YES' : 'NO',
        `"${checkedInTime}"`,
        `"${regDate}"`
      ];
      csv += row.join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="divy-garbhyatra-registrations.csv"');
    res.send(csv);
  } catch (err) {
    console.error('[API /export/csv] Error:', err);
    res.status(500).json({ error: 'CSV એક્સપોર્ટ કરવામાં ભૂલ આવી.' });
  }
});

// 11. GET /api/admin/settings & POST /api/admin/settings
router.get('/admin/settings', requireAdmin, async (req, res) => {
  try {
    const setting = await getOrCreateEventSetting();
    res.json({ success: true, setting });
  } catch (err) {
    res.status(500).json({ error: 'સેટિંગ્સ લાવવામાં ભૂલ આવી.' });
  }
});

router.post('/admin/settings', requireAdmin, async (req, res) => {
  try {
    const {
      title, subtitle, dateGujarati, dateIso, time,
      venue, venueAddress, venueMapUrl,
      speaker, speakerTitle, speakerBio, speakerPhoto,
      upiId, payeeName, customQrImage, useCustomQr,
      upiAccounts, autoRotateUpi, upiRollingThreshold, activeUpiIndex,
      totalCoupleCapacity, tiers,
      supportPhone, supportWhatsapp,
      isRegistrationOpen, registrationClosedNotice, passNotice
    } = req.body;

    const setting = await getOrCreateEventSetting();

    if (title !== undefined) setting.title = title;
    if (subtitle !== undefined) setting.subtitle = subtitle;
    if (dateGujarati !== undefined) setting.dateGujarati = dateGujarati;
    if (dateIso !== undefined) setting.dateIso = dateIso;
    if (time !== undefined) setting.time = time;
    if (venue !== undefined) setting.venue = venue;
    if (venueAddress !== undefined) setting.venueAddress = venueAddress;
    if (venueMapUrl !== undefined) setting.venueMapUrl = venueMapUrl;

    if (speaker !== undefined) setting.speaker = speaker;
    if (speakerTitle !== undefined) setting.speakerTitle = speakerTitle;
    if (speakerBio !== undefined) setting.speakerBio = speakerBio;
    if (speakerPhoto !== undefined) setting.speakerPhoto = speakerPhoto;

    if (upiId !== undefined) setting.upiId = upiId.trim();
    if (payeeName !== undefined) setting.payeeName = payeeName.trim();
    if (customQrImage !== undefined) setting.customQrImage = customQrImage;
    if (useCustomQr !== undefined) setting.useCustomQr = Boolean(useCustomQr);

    if (Array.isArray(upiAccounts)) setting.upiAccounts = upiAccounts;
    if (autoRotateUpi !== undefined) setting.autoRotateUpi = Boolean(autoRotateUpi);
    if (upiRollingThreshold !== undefined) setting.upiRollingThreshold = Number(upiRollingThreshold);
    if (activeUpiIndex !== undefined) setting.activeUpiIndex = Number(activeUpiIndex);

    if (totalCoupleCapacity !== undefined) setting.totalCoupleCapacity = Number(totalCoupleCapacity);
    if (Array.isArray(tiers) && tiers.length > 0) {
      setting.tiers = tiers;
    }

    if (supportPhone !== undefined) setting.supportPhone = supportPhone;
    if (supportWhatsapp !== undefined) setting.supportWhatsapp = supportWhatsapp;
    if (isRegistrationOpen !== undefined) setting.isRegistrationOpen = Boolean(isRegistrationOpen);
    if (registrationClosedNotice !== undefined) setting.registrationClosedNotice = registrationClosedNotice;
    if (passNotice !== undefined) setting.passNotice = passNotice;

    await setting.save();
    res.json({ success: true, message: 'સેટિંગ્સ સફળતાપૂર્વક અપડેટ થયા.', setting });
  } catch (err) {
    console.error('[API /admin/settings] Error:', err);
    res.status(500).json({ error: 'સેટિંગ્સ અપડેટ કરવામાં ભૂલ આવી: ' + err.message });
  }
});

// Dedicated QR Code Upload Endpoint
router.post('/admin/upload-qr', requireAdmin, upload.single('qrImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'કૃપા કરીને QR કોડ ઈમેજ ફાઈલ પસંદ કરો.' });
    }
    const compressed = await sharp(req.file.buffer)
      .resize({ width: 600, height: 600, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
    const base64Data = `data:image/jpeg;base64,${compressed.toString('base64')}`;

    const setting = await getOrCreateEventSetting();
    setting.customQrImage = base64Data;
    setting.useCustomQr = true;
    await setting.save();

    res.json({
      success: true,
      message: 'કસ્ટમ QR કોડ સફળતાપૂર્વક અપલોડ અને સેવ થઈ ગયો!',
      customQrImage: base64Data,
      useCustomQr: true
    });
  } catch (err) {
    console.error('[API /admin/upload-qr] Error:', err);
    res.status(500).json({ error: 'QR કોડ અપલોડ કરવામાં ભૂલ આવી: ' + err.message });
  }
});

// 12. POST /api/admin/reset-data - Super Admin Wipe back to Zero
router.post('/admin/reset-data', requireSuperAdmin, async (req, res) => {
  try {
    await Registration.deleteMany({});
    await Counter.findOneAndUpdate({ name: 'inquiryNumber' }, { seq: 1000 }, { upsert: true });
    res.json({ success: true, message: 'તમામ ડેટા ડિલીટ કરી ઝીરો (0) કરવામાં આવ્યો છે.' });
  } catch (err) {
    res.status(500).json({ error: 'ડેટા રીસેટ કરવામાં ભૂલ આવી.' });
  }
});

export default router;
