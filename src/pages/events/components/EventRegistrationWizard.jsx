import React, { useState, useEffect, useRef, useId } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { 
  Heart, Calendar, Clock, MapPin, User, Sparkles, CheckCircle2, 
  AlertCircle, Upload, ArrowRight, ArrowLeft, ShieldCheck, Download, 
  ExternalLink, Phone, Copy, Check, RefreshCw, X, Shield, Info, Image as ImageIcon
} from 'lucide-react';
import { compressImage } from '../imageCompression';
import { API_BASE } from '../../../utils/apiConfig';

const ADMIN_WHATSAPP = '919586979897';

export default function EventRegistrationWizard({ isEmbedded = false, onComplete }) {
  const wizardRef = useRef(null);
  const husbandInputRef = useRef(null);
  const wifeInputRef = useRef(null);
  const surnameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const couplePhotoInputRef = useRef(null);
  const receiptInputRef = useRef(null);

  // Stepper: 1 = Couple Details, 2 = UPI Payment & Receipt, 3 = Confirmation
  const [step, setStep] = useState(1);

  // Field values
  const [husbandName, setHusbandName] = useState('');
  const [wifeName, setWifeName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Media
  const [couplePhoto, setCouplePhoto] = useState(null);
  const [couplePhotoPreview, setCouplePhotoPreview] = useState('');
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);

  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentPreview, setPaymentPreview] = useState('');
  const [isCompressingReceipt, setIsCompressingReceipt] = useState(false);

  // Field-specific validation errors (Clean inline errors, no hot-toast spam)
  const [errors, setErrors] = useState({});

  // Server state
  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  // UPI QR & Copy state
  const [upiQrDataUrl, setUpiQrDataUrl] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPayee, setCopiedPayee] = useState(false);

  // Fetch Event Live Data
  useEffect(() => {
    let isMounted = true;
    const fetchEvent = async () => {
      try {
        setLoadingEvent(true);
        const res = await fetch(`${API_BASE}/event`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setEventData(data);
        }
      } catch (err) {
        console.error('[EventWizard] Error loading event data:', err);
      } finally {
        if (isMounted) setLoadingEvent(false);
      }
    };
    fetchEvent();
    return () => { isMounted = false; };
  }, []);

  const currentPrice = eventData?.liveRates?.currentPrice || 900;
  const activeTier = eventData?.liveRates?.activeTier || { name: 'કપલ પ્રવેશ પાસ (Couple Pass)', price: 900 };
  const upiIdVal = eventData?.payment?.upiId || 'jayneshshingala2005-2@okicici';
  const payeeNameVal = eventData?.payment?.payeeName || 'Shingala Jaynesh';
  const isSoldOut = eventData?.liveRates?.isSoldOut || false;

  // Generate UPI QR Code ONCE when payment details or price are ready (DECOUPLED from typing!)
  useEffect(() => {
    if (!eventData?.payment && !eventData) return;

    if (eventData?.payment?.customQrImage && eventData?.payment?.useCustomQr) {
      setUpiQrDataUrl(eventData.payment.customQrImage);
      return;
    }

    const price = currentPrice;
    const payee = encodeURIComponent(payeeNameVal);
    const note = encodeURIComponent('Divya Garbh Yatra Couple Entry');
    const upiString = `upi://pay?pa=${upiIdVal}&pn=${payee}&am=${price}&cu=INR&tn=${note}`;

    QRCode.toDataURL(upiString, {
      margin: 1,
      width: 320,
      color: {
        dark: '#1C1917',
        light: '#FFFFFF'
      }
    }).then((url) => {
      setUpiQrDataUrl(url);
    }).catch((err) => {
      console.error('[EventWizard] Failed to generate UPI QR:', err);
    });
  }, [eventData?.payment?.customQrImage, eventData?.payment?.useCustomQr, upiIdVal, payeeNameVal, currentPrice]);

  // Copy UPI ID with inline feedback
  const handleCopyUpi = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(upiIdVal);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    } catch {
      // Fallback
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    }
  };

  // Copy Payee Name with inline feedback
  const handleCopyPayee = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(payeeNameVal);
      setCopiedPayee(true);
      setTimeout(() => setCopiedPayee(false), 2200);
    } catch {
      setCopiedPayee(true);
      setTimeout(() => setCopiedPayee(false), 2200);
    }
  };

  // Handle Couple Photo selection with fast compression & preview
  const handleCouplePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, couplePhoto: 'કૃપા કરીને માન્ય ઈમેજ ફાઈલ (PNG/JPG) પસંદ કરો.' }));
      return;
    }

    setErrors((prev) => ({ ...prev, couplePhoto: '' }));
    setIsCompressingPhoto(true);

    try {
      const compressed = await compressImage(file, 900, 900, 0.85);
      setCouplePhoto(compressed);
      setCouplePhotoPreview(URL.createObjectURL(compressed));
    } catch (err) {
      console.warn('Compression fallback to original file:', err);
      setCouplePhoto(file);
      setCouplePhotoPreview(URL.createObjectURL(file));
    } finally {
      setIsCompressingPhoto(false);
    }
  };

  // Handle Payment Screenshot selection
  const handlePaymentScreenshotChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, paymentScreenshot: 'કૃપા કરીને માન્ય સ્ક્રીનશોટ ઈમેજ (PNG/JPG) પસંદ કરો.' }));
      return;
    }

    setErrors((prev) => ({ ...prev, paymentScreenshot: '' }));
    setServerError('');
    setIsCompressingReceipt(true);

    try {
      const compressed = await compressImage(file, 1200, 1400, 0.85);
      setPaymentScreenshot(compressed);
      setPaymentPreview(URL.createObjectURL(compressed));
    } catch (err) {
      console.warn('Compression fallback to original screenshot:', err);
      setPaymentScreenshot(file);
      setPaymentPreview(URL.createObjectURL(file));
    } finally {
      setIsCompressingReceipt(false);
    }
  };

  // Step 1 Validation & Transition to Step 2 (NO JUMP TO TOP!)
  const handleProceedToStep2 = (e) => {
    if (e) e.preventDefault();

    const newErrors = {};

    if (!husbandName.trim()) {
      newErrors.husbandName = 'કૃપા કરીને પતિનું પૂરું નામ દાખલ કરો.';
    }
    if (!wifeName.trim()) {
      newErrors.wifeName = 'કૃપા કરીને પત્નીનું પૂરું નામ દાખલ કરો.';
    }
    if (!surname.trim()) {
      newErrors.surname = 'કૃપા કરીને અટક દાખલ કરો.';
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phoneNumber = 'કૃપા કરીને ૧૦ આંકડાનો મોબાઇલ નંબર દાખલ કરો.';
    } else if (cleanPhone.length < 10) {
      newErrors.phoneNumber = 'મોબાઇલ નંબર ૧૦ આંકડાનો હોવો જરૂરી છે.';
    }

    if (!couplePhoto) {
      newErrors.couplePhoto = 'કૃપા કરીને એન્ટ્રી પાસ માટે કપલ ફોટો અપલોડ કરો.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first erroneous field smoothly without jumping to top of page
      if (newErrors.husbandName && husbandInputRef.current) {
        husbandInputRef.current.focus({ preventScroll: true });
      } else if (newErrors.wifeName && wifeInputRef.current) {
        wifeInputRef.current.focus({ preventScroll: true });
      } else if (newErrors.surname && surnameInputRef.current) {
        surnameInputRef.current.focus({ preventScroll: true });
      } else if (newErrors.phoneNumber && phoneInputRef.current) {
        phoneInputRef.current.focus({ preventScroll: true });
      }
      return;
    }

    setErrors({});
    setServerError('');
    setStep(2);

    // Smoothly ensure wizard top is gently visible without jumping to page top
    if (wizardRef.current) {
      wizardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Step 2 Submission to Server
  const handleSubmitRegistration = async (e) => {
    if (e) e.preventDefault();

    if (!paymentScreenshot) {
      setErrors((prev) => ({ 
        ...prev, 
        paymentScreenshot: 'કૃપા કરીને પેમેન્ટ સફળ થયા પછીનો સ્ક્રીનશોટ (Receipt) અપલોડ કરો.' 
      }));
      return;
    }

    setErrors({});
    setServerError('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('husbandName', husbandName.trim());
      formData.append('wifeName', wifeName.trim());
      formData.append('surname', surname.trim());
      formData.append('phoneNumber', phoneNumber.trim());
      formData.append('couplePhoto', couplePhoto);
      formData.append('paymentScreenshot', paymentScreenshot);

      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        body: formData
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmissionResult(json.data);
        setStep(3);
        if (onComplete) onComplete(json.data);
        if (wizardRef.current) {
          wizardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        const errorMsg = json.error || 'રજીસ્ટ્રેશન કરવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.';
        setServerError(errorMsg);
        // Highlight receipt field if OCR failed
        if (errorMsg.includes('રિસીપ્ટ') || errorMsg.includes('QR') || errorMsg.includes('સ્ક્રીનશોટ')) {
          setErrors((prev) => ({ ...prev, paymentScreenshot: errorMsg }));
        }
      }
    } catch (err) {
      console.error('[EventWizard] Submission failed:', err);
      setServerError('સર્વર સાથે કનેક્ટ થઈ શક્યું નથી. કૃપા કરીને તમારું ઇન્ટરનેટ કનેક્શન તપાસો.');
    } finally {
      setSubmitting(false);
    }
  };

  const genericUpiUri = `upi://pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=${encodeURIComponent('Divya Garbh Yatra Couple Entry')}`;

  return (
    <div ref={wizardRef} className="w-full">
      {/* STEP INDICATOR TABS (Smooth, Clickable without page scroll jumps) */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={() => { if (step > 1 && !submitting) setStep(1); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
            step === 1
              ? 'bg-rose-700 text-white shadow-md shadow-rose-700/25 ring-2 ring-rose-200'
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 cursor-pointer shadow-2xs'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">1</span>
          <span>કપલ વિગત</span>
        </button>

        <div className={`w-6 sm:w-10 h-0.5 transition-colors ${step >= 2 ? 'bg-rose-600' : 'bg-stone-200'}`} />

        <button
          type="button"
          onClick={() => { if (step === 1) handleProceedToStep2(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
            step === 2
              ? 'bg-rose-700 text-white shadow-md shadow-rose-700/25 ring-2 ring-rose-200'
              : step === 3
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-stone-400 border border-stone-200 shadow-2xs'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">2</span>
          <span>પેમેન્ટ &amp; રિસીપ્ટ</span>
        </button>

        <div className={`w-6 sm:w-10 h-0.5 transition-colors ${step === 3 ? 'bg-rose-600' : 'bg-stone-200'}`} />

        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
            step === 3
              ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25'
              : 'bg-white text-stone-400 border border-stone-200 shadow-2xs'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">3</span>
          <span>કન્ફર્મેશન</span>
        </div>
      </div>

      {/* Global Server Error Banner (Displayed only if generic server failure occurs) */}
      {serverError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50/90 border border-rose-300 text-rose-950 text-xs sm:text-sm flex items-start gap-3 shadow-md">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-semibold leading-relaxed">
            {serverError}
          </div>
          <button
            type="button"
            onClick={() => setServerError('')}
            className="text-rose-600 hover:text-rose-950 p-1 rounded-lg hover:bg-rose-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================
          STEP 1: COUPLE REGISTRATION FORM
      ======================================================== */}
      {step === 1 && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-8 shadow-xl">
          <div className="border-b border-stone-200/80 pb-4 mb-6 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-rose-700 uppercase bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                પગલું ૧ માંથી ૨
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                <span>કપલ નોંધણી વિગત (Couple Details)</span>
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                આ વિગતો તમારા સત્તાવાર VIP ડિજિટલ એન્ટ્રી પાસ પર પ્રિન્ટ થશે.
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-[11px] text-stone-500 font-bold block uppercase">કપલ ફી</span>
              <span className="text-2xl font-black text-rose-800">₹{currentPrice}</span>
            </div>
          </div>

          <form onSubmit={handleProceedToStep2} className="space-y-5" noValidate>
            {/* Row 1: Husband & Wife Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Husband Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  પતિનું પૂરું નામ (Husband's Name) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={husbandInputRef}
                    type="text"
                    value={husbandName}
                    onChange={(e) => {
                      setHusbandName(e.target.value);
                      if (errors.husbandName) {
                        setErrors((prev) => ({ ...prev, husbandName: '' }));
                      }
                    }}
                    placeholder="દા.ત. જયનેશ"
                    autoComplete="given-name"
                    className={`w-full bg-stone-50/70 border rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm transition-all focus:outline-none focus:bg-white ${
                      errors.husbandName
                        ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-100 bg-rose-50/20'
                        : 'border-stone-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-100'
                    }`}
                  />
                </div>
                {errors.husbandName && (
                  <p className="text-[11px] text-rose-700 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.husbandName}</span>
                  </p>
                )}
              </div>

              {/* Wife Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  પત્નીનું પૂરું નામ (Wife's Name) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={wifeInputRef}
                    type="text"
                    value={wifeName}
                    onChange={(e) => {
                      setWifeName(e.target.value);
                      if (errors.wifeName) {
                        setErrors((prev) => ({ ...prev, wifeName: '' }));
                      }
                    }}
                    placeholder="દા.ત. પ્રિયા"
                    autoComplete="family-name"
                    className={`w-full bg-stone-50/70 border rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm transition-all focus:outline-none focus:bg-white ${
                      errors.wifeName
                        ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-100 bg-rose-50/20'
                        : 'border-stone-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-100'
                    }`}
                  />
                </div>
                {errors.wifeName && (
                  <p className="text-[11px] text-rose-700 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.wifeName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Surname & WhatsApp Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Surname */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  અટક (Surname) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={surnameInputRef}
                    type="text"
                    value={surname}
                    onChange={(e) => {
                      setSurname(e.target.value);
                      if (errors.surname) {
                        setErrors((prev) => ({ ...prev, surname: '' }));
                      }
                    }}
                    placeholder="દા.ત. શિંગાળા"
                    className={`w-full bg-stone-50/70 border rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm transition-all focus:outline-none focus:bg-white ${
                      errors.surname
                        ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-100 bg-rose-50/20'
                        : 'border-stone-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-100'
                    }`}
                  />
                </div>
                {errors.surname && (
                  <p className="text-[11px] text-rose-700 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.surname}</span>
                  </p>
                )}
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  વોટ્સએપ મોબાઇલ નંબર (WhatsApp Number) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/[^0-9]/g, '');
                      setPhoneNumber(clean);
                      if (errors.phoneNumber) {
                        setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                      }
                    }}
                    placeholder="૧૦ આંકડાનો મોબાઇલ નંબર"
                    className={`w-full bg-stone-50/70 border rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm font-mono tracking-wider transition-all focus:outline-none focus:bg-white ${
                      errors.phoneNumber
                        ? 'border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-100 bg-rose-50/20'
                        : 'border-stone-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-100'
                    }`}
                  />
                </div>
                {errors.phoneNumber ? (
                  <p className="text-[11px] text-rose-700 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-stone-500 mt-1">
                    (આ નંબર પર ડિજિટલ પાસ કન્ફર્મેશન મોકલવામાં આવશે)
                  </p>
                )}
              </div>
            </div>

            {/* Couple Photo Upload Card */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                કપલ ફોટો અપલોડ કરો (Couple Photo for Pass) <span className="text-rose-600">*</span>
              </label>

              <div
                className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
                  errors.couplePhoto
                    ? 'border-rose-400 bg-rose-50/30'
                    : couplePhotoPreview
                    ? 'border-emerald-400 bg-emerald-50/20'
                    : 'border-stone-300 bg-stone-50/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Photo Preview Thumbnail */}
                  {couplePhotoPreview ? (
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0 bg-stone-100">
                      <img
                        src={couplePhotoPreview}
                        alt="Couple Photo Preview"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-stone-400 shrink-0 shadow-2xs">
                      {isCompressingPhoto ? (
                        <RefreshCw className="w-6 h-6 animate-spin text-rose-600" />
                      ) : (
                        <>
                          <ImageIcon className="w-7 h-7 text-stone-300 mb-1" />
                          <span className="text-[10px] font-bold text-stone-500">ફોટો ઉમેરો</span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex-1 w-full text-center sm:text-left">
                    <input
                      ref={couplePhotoInputRef}
                      type="file"
                      id="couple-photo-wizard-file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleCouplePhotoChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="couple-photo-wizard-file"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs cursor-pointer transition-all shadow-md active:scale-95"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{couplePhoto ? 'બીજો ફોટો બદલો' : 'કપલ ફોટો પસંદ કરો'}</span>
                    </label>

                    <div className="text-[11px] text-stone-500 mt-2 space-y-0.5">
                      <p>• બંનેનો ચહેરો સ્પષ્ટ દેખાતો હોય તેવો સારો ફોટો પસંદ કરો.</p>
                      <p>• ફોટો આપમેળે ઑપ્ટિમાઇઝ અને સુરક્ષિત રીતે સેવ થશે.</p>
                    </div>
                  </div>
                </div>
              </div>

              {errors.couplePhoto && (
                <p className="text-[11px] text-rose-700 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.couplePhoto}</span>
                </p>
              )}
            </div>

            {/* Step 1 Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSoldOut || isCompressingPhoto}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-rose-700/25 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>આગળ વધો અને પેમેન્ટ કરો (₹{currentPrice})</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
              <div className="text-center mt-2">
                <span className="text-[11px] text-stone-500 font-medium">
                  ૧ પાસ = પતિ-પત્ની બંને વ્યક્તિ માટે માન્ય છે.
                </span>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================
          STEP 2: UPI PAYMENT & RECEIPT UPLOAD
      ======================================================== */}
      {step === 2 && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-8 shadow-xl space-y-6">
          {/* Header */}
          <div className="border-b border-stone-200/80 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-wider text-rose-700 uppercase bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                પગલું ૨ માંથી ૨
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-rose-700" />
                <span>UPI પેમેન્ટ &amp; રિસીપ્ટ અપલોડ</span>
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                કપલ: <span className="font-bold text-rose-800">{husbandName} &amp; {wifeName} {surname}</span> • મોબાઇલ: <span className="font-mono font-bold text-stone-800">{phoneNumber}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => { setStep(1); }}
              className="text-xs font-bold text-rose-700 hover:text-rose-900 underline underline-offset-4 cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>વિગતો સુધારો</span>
            </button>
          </div>

          {/* Amount & Active Tier Highlight */}
          <div className="bg-gradient-to-r from-rose-50/80 via-amber-50/60 to-rose-50/80 border border-rose-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <span className="text-xs text-stone-600 block font-bold uppercase tracking-wider">
                કુલ ચૂકવવાપાત્ર રકમ (Total Amount):
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl sm:text-4xl font-black text-rose-800">
                  ₹{currentPrice}
                </span>
                <span className="text-xs text-emerald-800 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {activeTier?.name || 'Couple Entry'}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-700 space-y-0.5">
              <span className="text-[11px] text-stone-500 font-semibold block">અધિકૃત UPI ID:</span>
              <span className="font-mono font-black text-rose-900 text-sm">{upiIdVal}</span>
              <span className="text-[11px] text-stone-600 font-medium block">ખાતાધારક: {payeeNameVal}</span>
            </div>
          </div>

          {/* QR Code & Mobile UPI Action Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left: High-Contrast QR Code */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-black text-stone-800 uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>કોઈપણ UPI એપથી સ્કેન કરો</span>
              </div>

              {upiQrDataUrl ? (
                <div className="p-3 bg-white rounded-2xl shadow-md border-2 border-stone-200">
                  <img
                    src={upiQrDataUrl}
                    alt="The Divine Garbh Sanskar UPI Payment QR"
                    className="w-52 h-52 object-contain"
                  />
                </div>
              ) : (
                <div className="w-52 h-52 flex flex-col items-center justify-center text-stone-400 bg-white rounded-2xl border border-stone-200">
                  <RefreshCw className="w-6 h-6 animate-spin text-rose-600 mb-2" />
                  <span className="text-xs font-medium">QR જનરેટ થઈ રહ્યો છે...</span>
                </div>
              )}

              <div className="mt-3 text-xs text-stone-600 font-semibold">
                GPay • PhonePe • Paytm • BHIM • Cred
              </div>
            </div>

            {/* Right: Fast 1-Click Mobile Actions & Copy Box */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              {/* Copy UPI Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2.5">
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                  મેન્યુઅલ પેમેન્ટ માટે UPI ID:
                </span>
                
                <div className="flex items-center justify-between gap-2 bg-white border border-stone-300 rounded-xl px-3 py-2">
                  <span className="font-mono text-xs sm:text-sm font-bold text-stone-900 truncate">
                    {upiIdVal}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                      copiedUpi
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                    }`}
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>કોપી થઈ ગયું!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>કોપી ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile 1-Tap Payment Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                  મોબાઇલ પર સીધા પેમેન્ટ કરવા માટે:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`gpay://upi/pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                    className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Google Pay</span>
                  </a>

                  <a
                    href={`phonepe://pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                    className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>PhonePe</span>
                  </a>

                  <a
                    href={`paytmmp://pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                    className="py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Paytm</span>
                  </a>

                  <a
                    href={genericUpiUri}
                    className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Any UPI App</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Upload Box with Clear OCR Fraud Guidance */}
          <div className="pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                પેમેન્ટ સફળ થયા પછીનો સ્ક્રીનશોટ (Receipt) અપલોડ કરો <span className="text-rose-600">*</span>
              </label>
              {paymentPreview && (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>રિસીપ્ટ પસંદ કરેલ છે</span>
                </span>
              )}
            </div>

            {/* Clear Visual Guide to Prevent Rejections */}
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 text-xs text-amber-950 mb-3 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>મહત્વની સૂચના:</strong> પેમેન્ટ પૂર્ણ થયા પછી જે લીલી સ્ક્રીન પર <strong>'Paid Successfully'</strong> અને <strong>12 આંકડાનો UTR / UPI Ref No.</strong> લખેલો હોય તે સ્ક્રીનશોટ અપલોડ કરો. પેમેન્ટ QR કોડનો ફોટો માન્ય ગણાશે નહીં.
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
                errors.paymentScreenshot
                  ? 'border-rose-400 bg-rose-50/30'
                  : paymentPreview
                  ? 'border-emerald-400 bg-emerald-50/20'
                  : 'border-stone-300 bg-stone-50/70'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {paymentPreview ? (
                  <div className="relative w-24 h-28 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0 bg-stone-100">
                    <img
                      src={paymentPreview}
                      alt="Payment Receipt Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  </div>
                ) : (
                  <div className="w-24 h-28 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-stone-400 shrink-0 shadow-2xs">
                    {isCompressingReceipt ? (
                      <RefreshCw className="w-6 h-6 animate-spin text-rose-600" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-stone-300 mb-1" />
                        <span className="text-[10px] font-bold text-stone-500">રિસીપ્ટ ઉમેરો</span>
                      </>
                    )}
                  </div>
                )}

                <div className="flex-1 w-full text-center sm:text-left">
                  <input
                    ref={receiptInputRef}
                    type="file"
                    id="payment-receipt-wizard-file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handlePaymentScreenshotChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="payment-receipt-wizard-file"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs cursor-pointer transition-all shadow-md active:scale-95"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{paymentScreenshot ? 'બીજી રિસીપ્ટ બદલો' : 'પેમેન્ટ રિસીપ્ટ પસંદ કરો'}</span>
                  </label>

                  <p className="text-[11px] text-stone-500 mt-2">
                    (GPay / PhonePe / Paytm ની Payment Successful સ્ક્રીન)
                  </p>
                </div>
              </div>
            </div>

            {errors.paymentScreenshot && (
              <p className="text-[11px] text-rose-700 font-semibold mt-2 flex items-center gap-1.5 p-2 rounded-xl bg-rose-50 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errors.paymentScreenshot}</span>
              </p>
            )}
          </div>

          {/* Final Submit Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmitRegistration}
              disabled={submitting || !paymentScreenshot || isCompressingReceipt}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-rose-700/25 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>OCR વેરિફિકેશન અને સબમિશન ચાલુ છે...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                  <span>સબમિટ કરો અને કન્ફર્મેશન મેળવો</span>
                </>
              )}
            </button>
            <div className="text-center mt-2">
              <span className="text-[11px] text-stone-500">
                સબમિટ કર્યા પછી તરત જ તમારો પાસ નંબર જનરેટ થઈ જશે.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: REGISTRATION COMPLETED / PENDING VERIFICATION
      ======================================================== */}
      {step === 3 && submissionResult && (
        <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mx-auto">
            <img
              src="/logo.jpg"
              alt="The Divine Garbh Sanskar Logo"
              className="w-16 h-16 rounded-full p-0.5 bg-white object-contain border-2 border-amber-500 shadow-md"
            />
          </div>

          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>સફળતાપૂર્વક ફોર્મ સબમિટ થયું</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              અભિનંદન! 'દિવ્ય ગર્ભયાત્રા' માટે તમારી સીટ નોંધાઈ ગઈ છે
            </h2>
            <p className="text-sm text-stone-600 max-w-lg mx-auto">
              તમારી નોંધણી વિગતો અને પેમેન્ટ રિસીપ્ટ સિસ્ટમમાં જમા થઈ ગઈ છે.
            </p>
          </div>

          {/* Pass ID Ticket Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 max-w-md mx-auto space-y-3 shadow-2xs">
            <span className="text-xs text-stone-500 block font-bold uppercase tracking-wider">
              તમારો રજીસ્ટ્રેશન / પાસ ID:
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-rose-800 tracking-wider">
              {submissionResult.inquiryId}
            </div>
            <div className="text-xs text-stone-700 border-t border-stone-200 pt-2 flex justify-between font-semibold">
              <span>કપલ: {submissionResult.husbandName} &amp; {submissionResult.wifeName} {submissionResult.surname}</span>
              <span>રકમ: ₹{submissionResult.amount}</span>
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
              સ્ટેટસ: પેન્ડિંગ વેરિફિકેશન (Pending Verification)
            </div>
          </div>

          {/* Next Steps Guide */}
          <div className="text-left bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-md mx-auto text-xs text-stone-700 space-y-2">
            <span className="font-bold text-stone-900 block">આગળના પગલાં:</span>
            <p>૧. અમારી ટીમ દ્વારા તમારી પેમેન્ટ રિસીપ્ટ ટૂંક સમયમાં વેરિફાય કરવામાં આવશે.</p>
            <p>૨. વેરિફિકેશન થતાં જ તમારો સત્તાવાર VIP ડિજિટલ પાસ ઉપલબ્ધ થઈ જશે.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={`/pass/${submissionResult.inquiryId}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-extrabold text-sm shadow-lg shadow-rose-700/25 transition-all flex items-center justify-center gap-2"
            >
              <span>તમારો ડિજિટલ પાસ જુઓ (View Pass)</span>
              <ExternalLink className="w-4 h-4 stroke-[3]" />
            </Link>

            <a
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`નમસ્તે, મેં દિવ્ય ગર્ભયાત્રા સેમિનાર માટે રજીસ્ટ્રેશન કર્યું છે.\nપાસ ID: ${submissionResult.inquiryId}\nકપલ: ${submissionResult.husbandName} & ${submissionResult.wifeName} ${submissionResult.surname}\nકૃપા કરીને મારો પાસ કન્ફર્મ કરો.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp પર વેરિફિકેશન મોકલો</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
