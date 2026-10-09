import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import QRCode from 'qrcode';
import { 
  Heart, Calendar, Clock, MapPin, User, Sparkles, CheckCircle2, 
  AlertCircle, Upload, ArrowRight, ArrowLeft, ShieldCheck, Download, 
  ExternalLink, Phone, Search, RefreshCw, X, Shield, Sliders
} from 'lucide-react';
import { compressImage } from './imageCompression';

import { API_BASE } from '../../utils/apiConfig';
const ADMIN_WHATSAPP = '919586979897';

export default function EventRegisterPage() {
  const formTopRef = useRef(null);
  const navigate = useNavigate();

  // Step State: 1 = Couple Form, 2 = UPI Payment & Receipt, 3 = Confirmation
  const [step, setStep] = useState(1);

  // Form Fields
  const [husbandName, setHusbandName] = useState('');
  const [wifeName, setWifeName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Media
  const [couplePhoto, setCouplePhoto] = useState(null);
  const [couplePhotoPreview, setCouplePhotoPreview] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentPreview, setPaymentPreview] = useState('');

  // Server & Event State
  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  // Dynamic QR Data URL
  const [upiQrDataUrl, setUpiQrDataUrl] = useState('');

  // Status Check Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusQuery, setStatusQuery] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState('');

  // Fetch Event Data & Live Rates
  const fetchEventInfo = async () => {
    try {
      setLoadingEvent(true);
      const res = await fetch(`${API_BASE}/event`);
      if (res.ok) {
        const data = await res.json();
        setEventData(data);
      }
    } catch (err) {
      console.error('Error fetching event details:', err);
    } finally {
      setLoadingEvent(false);
    }
  };

  useEffect(() => {
    fetchEventInfo();
  }, []);

  // Generate UPI QR Code when in Step 2 or when eventData loads
  useEffect(() => {
    if (!eventData || !eventData.payment) return;

    if (eventData.payment.customQrImage && eventData.payment.useCustomQr) {
      setUpiQrDataUrl(eventData.payment.customQrImage);
      return;
    }

    const currentPrice = eventData.liveRates?.currentPrice || 600;
    const upiId = eventData.payment.upiId || 'jayneshshingala2005-2@okicici';
    const payeeName = encodeURIComponent(eventData.payment.payeeName || 'Shingala Jaynesh');
    const note = encodeURIComponent(`Divya Garbh Yatra Couple Pass ${husbandName ? `for ${husbandName}` : ''}`.trim());

    const upiString = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${currentPrice}&cu=INR&tn=${note}`;

    QRCode.toDataURL(upiString, {
      margin: 1,
      width: 280,
      color: {
        dark: '#120208',
        light: '#FFFFFF'
      }
    }).then((url) => {
      setUpiQrDataUrl(url);
    }).catch((err) => {
      console.error('Failed to generate UPI QR:', err);
    });
  }, [eventData, husbandName]);

  // Handle Couple Photo selection
  const handleCouplePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('કૃપા કરીને માન્ય ઈમેજ ફાઈલ (PNG/JPG) અપલોડ કરો.');
      return;
    }

    try {
      const compressed = await compressImage(file, 1000, 1000, 0.85);
      setCouplePhoto(compressed);
      setCouplePhotoPreview(URL.createObjectURL(compressed));
      setErrorMessage('');
    } catch {
      setCouplePhoto(file);
      setCouplePhotoPreview(URL.createObjectURL(file));
    }
  };

  // Handle Payment Screenshot selection
  const handlePaymentScreenshotChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('કૃપા કરીને માન્ય સ્ક્રીનશોટ ફાઈલ પસંદ કરો.');
      return;
    }

    try {
      const compressed = await compressImage(file, 1200, 1200, 0.9);
      setPaymentScreenshot(compressed);
      setPaymentPreview(URL.createObjectURL(compressed));
      setErrorMessage('');
    } catch {
      setPaymentScreenshot(file);
      setPaymentPreview(URL.createObjectURL(file));
    }
  };

  // Step 1 Validation & Proceed to Step 2
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!husbandName.trim() || !wifeName.trim() || !surname.trim() || !phoneNumber.trim()) {
      setErrorMessage('કૃપા કરીને પતિનું નામ, પત્નીનું નામ, અટક અને ૧૦ આંકડાનો મોબાઇલ નંબર દાખલ કરો.');
      return;
    }
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('કૃપા કરીને સાચો ૧૦ આંકડાનો મોબાઇલ નંબર દાખલ કરો.');
      return;
    }
    if (!couplePhoto) {
      setErrorMessage('કૃપા કરીને ડિજિટલ પાસ માટે તમારો કપલ ફોટો અપલોડ કરો.');
      return;
    }

    setErrorMessage('');
    setStep(2);
    // Smooth scroll cleanly to the top of the registration wizard
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 Final Submission
  const handleSubmitRegistration = async () => {
    if (!paymentScreenshot) {
      setErrorMessage('કૃપા કરીને પેમેન્ટ સક્સેસ થયા પછીનો સ્ક્રીનશોટ (Receipt) અપલોડ કરો.');
      return;
    }

    setErrorMessage('');
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'રજીસ્ટ્રેશન કરવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('સર્વર સાથે કનેક્ટ થઈ શક્યું નથી. કૃપા કરીને તમારું ઇન્ટરનેટ કનેક્શન તપાસો.');
    } finally {
      setSubmitting(false);
    }
  };

  // Check Registration Status lookup
  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!statusQuery.trim()) return;

    setStatusLoading(true);
    setStatusError('');
    setStatusResult(null);

    try {
      const res = await fetch(`${API_BASE}/status/${encodeURIComponent(statusQuery.trim())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setStatusResult(json.data);
      } else {
        setStatusError(json.error || 'આ ઇન્ક્વાયરી આઈડી અથવા મોબાઇલ નંબરનો કોઈ રેકોર્ડ મળ્યો નથી.');
      }
    } catch {
      setStatusError('સ્ટેટસ તપાસવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setStatusLoading(false);
    }
  };

  const currentPrice = eventData?.liveRates?.currentPrice || 600;
  const activeTier = eventData?.liveRates?.activeTier || { name: 'Early Access (પહેલા 50 કપલ માટે)', price: 600 };
  const upiIdVal = eventData?.payment?.upiId || 'jayneshshingala2005-2@okicici';
  const payeeNameVal = eventData?.payment?.payeeName || 'Shingala Jaynesh';
  const isSoldOut = eventData?.liveRates?.isSoldOut || false;

  const genericUpiUri = `upi://pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=${encodeURIComponent(`Divya Garbh Yatra Couple Pass`)}`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      <Helmet>
        <title>કપલ રજીસ્ટ્રેશન ફોર્મ • દિવ્ય ગર્ભયાત્રા સેમિનાર | The Divine Garbh Sanskar</title>
        <meta name="description" content="દિવ્ય ગર્ભયાત્રા કપલ સેમિનાર રજીસ્ટ્રેશન ફોર્મ. ઝડપી ઓનલાઇન બુકિંગ અને ઇન્સ્ટન્ટ ડિજિટલ પાસ." />
      </Helmet>

      {/* Subtle Warm Luxury Ambient Glows */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 65% 55% at 20% 10%, rgba(254, 205, 211, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 85% 30%, rgba(254, 243, 199, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 10% 85%, rgba(254, 215, 170, 0.3) 0%, transparent 70%)
          `,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-20 border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-0 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img
              src="/logo.jpg"
              alt="The Divine Garbh Sanskar Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-white object-contain group-hover:scale-105 transition-transform duration-300 shadow-md border border-amber-500/40 shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-black tracking-wider text-stone-900 uppercase leading-none">
                The Divine Garbh Sanskar
              </span>
              <span className="text-[10px] sm:text-xs text-rose-700 font-bold leading-none mt-1">
                દિવ્ય ગર્ભયાત્રા • કપલ રજીસ્ટ્રેશન
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/divy-garbhyatra"
              className="text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ઇવેન્ટ વિગત</span>
            </Link>

            <button
              onClick={() => setShowStatusModal(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-rose-600" />
              <span>સ્ટેટસ</span>
            </button>

            <Link
              to="/admin"
              className="text-xs text-stone-400 hover:text-stone-700 font-semibold transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main ref={formTopRef} className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6">

        {/* 1. COMPACT PROGRAM SUMMARY CARD (Clean, High-Trust, Focused) */}
        <div className="bg-gradient-to-br from-white via-stone-50 to-amber-50/30 border border-stone-200/90 rounded-3xl p-5 md:p-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-extrabold uppercase tracking-wider">
                  Live Event
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[10px] font-extrabold uppercase tracking-wider">
                  {activeTier.name}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-serif leading-tight">
                દિવ્ય ગર્ભયાત્રા સેમિનાર
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-medium pt-0.5">
                <span className="flex items-center gap-1 text-stone-800">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  <strong>19 Dec 2026, શનિવાર</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-600" />
                  રાત્રે 8:30 PM
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  જમના બા ભવન, સુરત
                </span>
              </div>
            </div>

            {/* Price Highlight Badge */}
            <div className="sm:text-right bg-white sm:bg-transparent p-3 sm:p-0 rounded-2xl border sm:border-0 border-stone-200 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
                  કપલ ફી (2 વ્યક્તિ)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-rose-800 leading-none mt-0.5">
                  ₹{currentPrice}
                </div>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-1">
                ૧ પાસ = પતિ-પત્ની બંને
              </span>
            </div>
          </div>
        </div>

        {/* 2. STEPPER TABS (1 -> 2 -> 3) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
          <button
            type="button"
            onClick={() => { if (step > 1 && !submitting) setStep(1); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              step === 1 
                ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white shadow-md shadow-rose-600/20' 
                : 'bg-white text-stone-600 border border-stone-200 shadow-2xs hover:bg-stone-50 cursor-pointer'
            }`}
          >
            <span>૧. કપલ વિગત</span>
          </button>
          
          <div className="w-4 sm:w-8 h-0.5 bg-stone-300" />

          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            step === 2 
              ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white shadow-md shadow-rose-600/20' 
              : 'bg-white text-stone-600 border border-stone-200 shadow-2xs'
          }`}>
            <span>૨. પેમેન્ટ &amp; રિસીપ્ટ</span>
          </div>

          <div className="w-4 sm:w-8 h-0.5 bg-stone-300" />

          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            step === 3 
              ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white shadow-md shadow-rose-600/20' 
              : 'bg-white text-stone-600 border border-stone-200 shadow-2xs'
          }`}>
            <span>૩. કન્ફર્મેશન</span>
          </div>
        </div>

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs sm:text-sm flex items-start gap-3 shadow-md animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium leading-relaxed">
              {errorMessage}
            </div>
            <button onClick={() => setErrorMessage('')} className="text-rose-600 hover:text-rose-900 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            STEP 1: COUPLE REGISTRATION FORM
        ======================================================== */}
        {step === 1 && (
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-stone-200/80 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  <span>કપલ નોંધણી વિગત (Step 1)</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  આ વિગતો તમારા સત્તાવાર ડિજિટલ એન્ટ્રી પાસ પર પ્રિન્ટ થશે.
                </p>
              </div>
              <img
                src="/logo.jpg"
                alt="The Divine Garbh Sanskar"
                className="w-10 h-10 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-2xs hidden sm:block shrink-0"
              />
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Husband Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    પતિનું પૂરું નામ (Husband's Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={husbandName}
                    onChange={(e) => setHusbandName(e.target.value)}
                    placeholder="દા.ત. જયનેશ"
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-2xs"
                  />
                </div>

                {/* Wife Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    પત્નીનું પૂરું નામ (Wife's Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={wifeName}
                    onChange={(e) => setWifeName(e.target.value)}
                    placeholder="દા.ત. પ્રિયા"
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Surname */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    અટક (Surname) *
                  </label>
                  <input
                    type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="દા.ત. શિંગાળા"
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-2xs"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    વોટ્સએપ મોબાઇલ નંબર (WhatsApp Number) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="૧૦ આંકડાનો મોબાઇલ નંબર"
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-2xs font-mono"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">
                    (આ નંબર પર ડિજિટલ પાસ કન્ફર્મેશન મોકલવામાં આવશે)
                  </span>
                </div>
              </div>

              {/* Couple Photo Upload */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  કપલ ફોટો અપલોડ કરો (Couple Photo for Pass) *
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/70">
                  {couplePhotoPreview ? (
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-rose-500 shadow-md shrink-0">
                      <img
                        src={couplePhotoPreview}
                        alt="Couple Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-stone-500 shrink-0 shadow-2xs">
                      <Upload className="w-6 h-6 text-stone-400 mb-1" />
                      <span className="text-[10px] font-medium">ફોટો પસંદ કરો</span>
                    </div>
                  )}

                  <div className="flex-1 w-full text-center sm:text-left">
                    <input
                      type="file"
                      id="couple-photo-direct"
                      accept="image/*"
                      onChange={handleCouplePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="couple-photo-direct"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-xs cursor-pointer transition-all shadow-md shadow-rose-600/20 active:scale-95"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{couplePhoto ? 'બીજો ફોટો બદલો' : 'કપલ ફોટો પસંદ કરો'}</span>
                    </label>
                    <span className="block text-[11px] text-stone-500 mt-1">
                      (PNG, JPG - ઓટોમેટિક કોમ્પ્રેસ થશે)
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit to Step 2 Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSoldOut}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-rose-600/25 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>આગળ વધો અને પેમેન્ટ કરો (₹{currentPrice})</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            STEP 2: UPI PAYMENT & RECEIPT UPLOAD
        ======================================================== */}
        {step === 2 && (
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-stone-200/80 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.jpg"
                  alt="The Divine Garbh Sanskar Logo"
                  className="w-10 h-10 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-2xs hidden sm:block shrink-0"
                />
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-rose-700" />
                    <span>સ્ટેપ ૨: UPI પેમેન્ટ &amp; રિસીપ્ટ</span>
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    The Divine Garbh Sanskar • કપલ: <span className="font-bold text-rose-800">{husbandName} &amp; {wifeName} {surname}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 underline underline-offset-4 cursor-pointer"
              >
                વિગતો સુધારો
              </button>
            </div>

            {/* Price Badge */}
            <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-600 block font-medium">કુલ ચૂકવવાપાત્ર રકમ:</span>
                <span className="text-2xl sm:text-3xl font-black text-rose-800">₹{currentPrice}</span>
                <span className="text-xs text-stone-500 block mt-0.5">({activeTier?.name || 'Couple Entry'})</span>
              </div>
              <div className="text-right text-xs text-stone-600">
                <span className="block font-medium">UPI ID:</span>
                <span className="font-mono text-rose-800 font-bold">{upiIdVal}</span>
                <span className="block text-[11px] text-stone-500 mt-0.5">{payeeNameVal}</span>
              </div>
            </div>

            {/* UPI QR Code Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Dynamic QR Code Box */}
              <div className="flex flex-col items-center justify-center p-5 bg-stone-50/80 border-2 border-stone-200 rounded-2xl shadow-inner">
                <span className="text-xs text-stone-800 font-bold mb-2 uppercase tracking-wider">
                  કોઈપણ UPI એપથી સ્કેન કરો
                </span>
                {upiQrDataUrl ? (
                  <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-200">
                    <img
                      src={upiQrDataUrl}
                      alt="UPI Payment QR"
                      className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center text-stone-400">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                )}
                <span className="text-xs text-stone-500 mt-2 font-medium">
                  GPay • PhonePe • Paytm • BHIM
                </span>
              </div>

              {/* Mobile 1-Click Pay Buttons */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-stone-700 block">
                  મોબાઇલ માટે ૧-ક્લિક પેમેન્ટ લિંક્સ:
                </span>

                <a
                  href={`gpay://upi/pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>Google Pay થી ચૂકવો</span>
                </a>

                <a
                  href={`phonepe://pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>PhonePe થી ચૂકવો</span>
                </a>

                <a
                  href={`paytmmp://pay?pa=${upiIdVal}&pn=${encodeURIComponent(payeeNameVal)}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>Paytm થી ચૂકવો</span>
                </a>

                <a
                  href={genericUpiUri}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>કોઈપણ UPI એપમાં ખોલો (Generic UPI)</span>
                </a>
              </div>
            </div>

            {/* Payment Screenshot Upload with OCR Guidance */}
            <div className="pt-2 border-t border-stone-200">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                પેમેન્ટ થયા પછીનો સક્સેસ સ્ક્રીનશોટ (Receipt) અપલોડ કરો *
              </label>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>મહત્વની સૂચના:</strong> પેમેન્ટ પૂર્ણ થયા પછી (Success Screen / UTR દેખાતો હોય તેવો) સ્ક્રીનશોટ અપલોડ કરો. પેમેન્ટના QR કોડનો ફોટો માન્ય ગણાશે નહીં.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/70">
                {paymentPreview ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
                    <img
                      src={paymentPreview}
                      alt="Payment Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-stone-500 shrink-0 shadow-2xs">
                    <Upload className="w-6 h-6 text-stone-400 mb-1" />
                    <span className="text-[10px] font-medium">રિસીપ્ટ પસંદ કરો</span>
                  </div>
                )}

                <div className="flex-1 w-full text-center sm:text-left">
                  <input
                    type="file"
                    id="payment-receipt-direct"
                    accept="image/*"
                    onChange={handlePaymentScreenshotChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="payment-receipt-direct"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs cursor-pointer transition-all shadow-md active:scale-95"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{paymentScreenshot ? 'બીજો સ્ક્રીનશોટ બદલો' : 'રિસીપ્ટ અપલોડ કરો'}</span>
                  </label>
                  <span className="block text-[11px] text-stone-500 mt-1">
                    (GPay / PhonePe / Paytm પેમેન્ટ કન્ફર્મેશન સ્ક્રીનશોટ)
                  </span>
                </div>
              </div>
            </div>

            {/* Final Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmitRegistration}
                disabled={submitting || !paymentScreenshot}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-rose-600/25 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-14 h-14 rounded-full p-0.5 bg-white object-contain border-2 border-amber-500 shadow-md"
              />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
                The Divine Garbh Sanskar • Registration Submitted
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                અભિનંદન! 'દિવ્ય ગર્ભયાત્રા' માટે તમારું ફોર્મ સબમિટ થઈ ગયું છે
              </h2>
              <p className="text-sm text-stone-600 max-w-lg mx-auto">
                તમારી નોંધણી વિગતો અને પેમેન્ટ રિસીપ્ટ સફળતાપૂર્વક સિસ્ટમમાં જમા થઈ ગઈ છે.
              </p>
            </div>

            {/* Inquiry ID Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 max-w-md mx-auto space-y-3 shadow-2xs">
              <span className="text-xs text-stone-500 block font-medium">તમારો રજીસ્ટ્રેશન / પાસ ID:</span>
              <div className="text-3xl font-black font-mono text-rose-800 tracking-wider">
                {submissionResult.inquiryId}
              </div>
              <div className="text-xs text-stone-600 border-t border-stone-200 pt-2 flex justify-between font-medium">
                <span>કપલ: {submissionResult.husbandName} &amp; {submissionResult.wifeName} {submissionResult.surname}</span>
                <span>રકમ: ₹{submissionResult.amount}</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                સ્ટેટસ: પેન્ડિંગ વેરિફિકેશન (Pending Verification)
              </div>
            </div>

            {/* Next Steps Guide */}
            <div className="text-left bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-xs text-stone-700 space-y-2">
              <span className="font-bold text-stone-900 block">આગળના પગલાં:</span>
              <p>૧. અમારી ટીમ દ્વારા તમારી પેમેન્ટ રિસીપ્ટ થોડી મિનિટોમાં વેરિફાય કરવામાં આવશે.</p>
              <p>૨. વેરિફિકેશન થતાં જ તમારો ડિજિટલ પાસ ઉપલબ્ધ થઈ જશે, જેને તમે ડાઉનલોડ કરી શકશો.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to={`/pass/${submissionResult.inquiryId}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-sm shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2"
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
                <span>WhatsApp પર વેરિફિકેશન મેસેજ મોકલો</span>
              </a>
            </div>
          </div>
        )}

        {/* Footer Brand Anchor */}
        <footer className="pt-6 border-t border-stone-200/80 text-center space-y-2 pb-6">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/logo.jpg"
              alt="The Divine Garbh Sanskar"
              className="w-7 h-7 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-2xs"
            />
            <span className="text-xs font-black tracking-wider text-stone-900 uppercase">
              The Divine Garbh Sanskar
            </span>
          </div>
          <p className="text-[11px] text-stone-500 max-w-md mx-auto leading-relaxed">
            'દિવ્ય ગર્ભયાત્રા' એ The Divine Garbh Sanskar દ્વારા સંચાલિત વિશેષ કપલ સેમિનાર કાર્યક્રમ છે.
          </p>
          <div className="text-[10px] text-stone-400 font-medium">
            © {new Date().getFullYear()} The Divine Garbh Sanskar • All Rights Reserved
          </div>
        </footer>

      </main>

      {/* ========================================================
          STATUS CHECK MODAL
      ======================================================== */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative text-stone-900">
            <button
              onClick={() => {
                setShowStatusModal(false);
                setStatusResult(null);
                setStatusError('');
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="The Divine Garbh Sanskar"
                className="w-10 h-10 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-2xs shrink-0"
              />
              <div>
                <h2 className="text-lg font-extrabold text-stone-900">
                  રજીસ્ટ્રેશન સ્ટેટસ તપાસો
                </h2>
                <p className="text-[11px] text-stone-500">
                  The Divine Garbh Sanskar • 'દિવ્ય ગર્ભયાત્રા' કાર્યક્રમ
                </p>
              </div>
            </div>

            <form onSubmit={handleCheckStatus} className="flex gap-2">
              <input
                type="text"
                required
                value={statusQuery}
                onChange={(e) => setStatusQuery(e.target.value)}
                placeholder="CPL-1001 અથવા મોબાઇલ નંબર..."
                className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={statusLoading}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {statusLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>શોધો</span>
              </button>
            </form>

            {statusError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {statusError}
              </div>
            )}

            {statusResult && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="font-mono font-bold text-rose-800 text-sm">{statusResult.inquiryId}</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                    statusResult.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : statusResult.status === 'rejected'
                      ? 'bg-rose-50 text-rose-700 border border-rose-300'
                      : 'bg-amber-50 text-amber-700 border border-amber-300'
                  }`}>
                    {statusResult.status}
                  </span>
                </div>

                <div className="text-stone-800">
                  <strong>કપલ:</strong> {statusResult.husbandName} &amp; {statusResult.wifeName} {statusResult.surname}
                </div>
                <div className="text-stone-600">
                  <strong>મોબાઇલ:</strong> {statusResult.phoneNumber}
                </div>

                {statusResult.status === 'approved' ? (
                  <Link
                    to={`/pass/${statusResult.inquiryId}`}
                    className="block w-full text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs mt-3 transition-colors shadow-2xs"
                  >
                    ડિજિટલ પાસ ડાઉનલોડ કરો
                  </Link>
                ) : statusResult.status === 'rejected' ? (
                  <p className="text-rose-600 text-[11px] pt-1">
                    કારણ: {statusResult.rejectionReason || 'પેમેન્ટ અમાન્ય.'}
                  </p>
                ) : (
                  <p className="text-amber-800 text-[11px] pt-1">
                    વેરિફિકેશન પ્રક્રિયા ચાલુ છે. કૃપા કરીને થોડીવાર પછી ફરીથી તપાસો.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
