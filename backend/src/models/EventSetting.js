import mongoose from 'mongoose';

const TierSchema = new mongoose.Schema({
  tierNumber: { type: Number, required: true },
  name: { type: String, required: true },
  minCouple: { type: Number, required: true },
  maxCouple: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const UpiAccountSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  upiId: { type: String, required: true },
  payeeName: { type: String, required: true },
  customQrImage: { type: String, default: '' },
  limit: { type: Number, default: 50 },
  bookingsCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { _id: false });

const DEFAULT_TIERS = [
  { tierNumber: 1, name: 'Early Access (પહેલા 50 કપલ માટે)', minCouple: 1, maxCouple: 50, price: 600 },
  { tierNumber: 2, name: 'Phase 2 (51 થી 250 કપલ માટે)', minCouple: 51, maxCouple: 250, price: 900 }
];

const DEFAULT_PRIMARY_UPI = {
  upiId: 'jayneshshingala2005-2@okicici',
  payeeName: 'Shingala Jaynesh',
  customQrImage: '/events/divy-garbhyatra/primary-upi-qr.jpg',
  limit: 50,
  bookingsCount: 0,
  isActive: true
};

const EventSettingSchema = new mongoose.Schema({
  key: { type: String, default: 'divy-garbhyatra', unique: true },
  title: { type: String, default: 'દિવ્ય ગર્ભયાત્રા' },
  subtitle: { type: String, default: 'Couple Seminar • The Divine Garbh Sanskar' },
  dateGujarati: { type: String, default: '19 December 2026, શનિવાર' },
  dateIso: { type: String, default: '2026-12-19' },
  time: { type: String, default: 'રાત્રે 8:30 PM થી 12:00 PM' },
  venue: { type: String, default: 'જમના બા ભવન, સુરત' },
  venueAddress: { type: String, default: 'Jamna Baa Bhavan, Surat, Gujarat' },
  venueMapUrl: { type: String, default: 'https://maps.google.com' },
  speaker: { type: String, default: 'નેહલ ગઢવી' },
  speakerTitle: { type: String, default: 'Life Coach & Garbh Sanskar Expert' },
  speakerBio: { type: String, default: 'Vedic Prenatal Science Guide & Inspirational Speaker' },
  speakerPhoto: { type: String, default: '' },
  
  // Primary UPI Details
  upiId: { type: String, default: DEFAULT_PRIMARY_UPI.upiId },
  payeeName: { type: String, default: DEFAULT_PRIMARY_UPI.payeeName },
  customQrImage: { type: String, default: DEFAULT_PRIMARY_UPI.customQrImage },
  useCustomQr: { type: Boolean, default: true },

  // Multi-account UPI Auto-Rolling / Rotation Pool (avoids Google Pay velocity limit blocks)
  upiAccounts: {
    type: [UpiAccountSchema],
    default: [DEFAULT_PRIMARY_UPI]
  },
  autoRotateUpi: { type: Boolean, default: true },
  upiRollingThreshold: { type: Number, default: 50 }, // Auto rotate after 50 couple registrations
  activeUpiIndex: { type: Number, default: 0 },

  totalCoupleCapacity: { type: Number, default: 250 },
  tiers: {
    type: [TierSchema],
    default: DEFAULT_TIERS
  },

  supportPhone: { type: String, default: '+91 94285 24890' },
  supportWhatsapp: { type: String, default: '919586979897' },
  isRegistrationOpen: { type: Boolean, default: true },
  registrationClosedNotice: { type: String, default: 'દિલગીર છીએ, રજીસ્ટ્રેશન હાલ પૂર્ણ થયેલ છે.' },
  passNotice: { type: String, default: 'કૃપા કરીને સમયસર પહોંચવું. ગેટ પર ડિજિટલ પાસ QR કોડ બતાવવો ફરજિયાત છે.' }
}, { timestamps: true });

export const EventSetting = mongoose.model('EventSetting', EventSettingSchema);

export const getOrCreateEventSetting = async () => {
  let setting = await EventSetting.findOne({ key: 'divy-garbhyatra' });
  if (!setting) {
    setting = await EventSetting.create({
      key: 'divy-garbhyatra'
    });
    console.log('[EventSetting] Initialized default event settings for Divya Garbh Yatra');
  } else {
    // Migration: ensure early access 600 and phase 2 900 pricing and primary UPI are up-to-date
    let modified = false;
    if (!setting.tiers || setting.tiers.length > 2 || setting.tiers[0]?.price !== 600) {
      setting.tiers = DEFAULT_TIERS;
      modified = true;
    }
    if (!setting.upiAccounts || setting.upiAccounts.length === 0 || setting.upiAccounts[0]?.upiId !== DEFAULT_PRIMARY_UPI.upiId) {
      setting.upiAccounts = [DEFAULT_PRIMARY_UPI];
      setting.upiId = DEFAULT_PRIMARY_UPI.upiId;
      setting.payeeName = DEFAULT_PRIMARY_UPI.payeeName;
      setting.customQrImage = DEFAULT_PRIMARY_UPI.customQrImage;
      setting.useCustomQr = true;
      modified = true;
    }
    if (setting.upiId !== DEFAULT_PRIMARY_UPI.upiId) {
      setting.upiId = DEFAULT_PRIMARY_UPI.upiId;
      setting.payeeName = DEFAULT_PRIMARY_UPI.payeeName;
      setting.customQrImage = DEFAULT_PRIMARY_UPI.customQrImage;
      setting.useCustomQr = true;
      modified = true;
    }
    if (modified) {
      await setting.save();
      console.log('[EventSetting] Synchronized ₹600/₹900 pricing slabs and primary UPI for Divya Garbh Yatra');
    }
  }
  return setting;
};
