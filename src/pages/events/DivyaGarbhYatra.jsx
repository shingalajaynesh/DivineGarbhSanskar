import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import QRCode from 'qrcode';
import { 
  Heart, Calendar, Clock, MapPin, User, Sparkles, CheckCircle2, 
  AlertCircle, Upload, ArrowRight, ShieldCheck, Download, 
  ExternalLink, Phone, Search, RefreshCw, X
} from 'lucide-react';
import { compressImage } from './imageCompression';

import { API_BASE } from '../../utils/apiConfig';
const ADMIN_WHATSAPP = '919586979897';

export default function DivyaGarbhYatra() {
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

  // Floating Hearts & Click Bursts
  const [hearts, setHearts] = useState([]);
  const [clickHearts, setClickHearts] = useState([]);

  // Status Check Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusQuery, setStatusQuery] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState('');

  // Initialize floating hearts
  useEffect(() => {
    const list = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 18 + 12,
      delay: Math.random() * 6,
      duration: Math.random() * 5 + 6
    }));
    setHearts(list);
  }, []);

  // Heart burst on click
  const handleGlobalClick = (e) => {
    // Avoid triggering on inputs or buttons
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

    const newHearts = Array.from({ length: 5 }).map((_, i) => {
      const angle = (i * 72 * Math.PI) / 180;
      const distance = Math.random() * 60 + 30;
      return {
        id: Date.now() + i + Math.random(),
        x: e.clientX,
        y: e.clientY,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: Math.random() * 10 + 10
      };
    });
    setClickHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 800);
  };

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
    const currentPrice = eventData.liveRates?.currentPrice || 900;
    const upiId = eventData.payment.upiId || 'thedivinegarbhsanskar@okaxis';
    const payeeName = encodeURIComponent(eventData.payment.payeeName || 'The Divine Garbh Sanskar');
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
      setErrorMessage('કૃપા કરીને માન્ય ઈમેજ ફાઈલ (JPG અથવા PNG) પસંદ કરો.');
      return;
    }

    try {
      const compressed = await compressImage(file, 800, 800, 0.85);
      setCouplePhoto(compressed);
      setCouplePhotoPreview(URL.createObjectURL(compressed));
      setErrorMessage('');
    } catch (err) {
      console.error('Image compression error:', err);
      setCouplePhoto(file);
      setCouplePhotoPreview(URL.createObjectURL(file));
    }
  };

  // Handle Payment Screenshot selection
  const handlePaymentScreenshotChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('કૃપા કરીને માન્ય પેમેન્ટ સ્ક્રીનશોટ ઈમેજ પસંદ કરો.');
      return;
    }

    try {
      const compressed = await compressImage(file, 1000, 1400, 0.85);
      setPaymentScreenshot(compressed);
      setPaymentPreview(URL.createObjectURL(compressed));
      setErrorMessage('');
    } catch (err) {
      console.error('Screenshot compression error:', err);
      setPaymentScreenshot(file);
      setPaymentPreview(URL.createObjectURL(file));
    }
  };

  // Step 1 Validation & Proceed to Step 2
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!husbandName.trim() || !wifeName.trim() || !surname.trim() || !phoneNumber.trim()) {
      setErrorMessage('કૃપા કરીને પતિનું નામ, પત્નીનું નામ, અટક અને મોબાઇલ નંબર દાખલ કરો.');
      return;
    }
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('કૃપા કરીને સાચો ૧૦ આંકડાનો મોબાઇલ નંબર દાખલ કરો.');
      return;
    }
    if (!couplePhoto) {
      setErrorMessage('કૃપા કરીને તમારો કપલ ફોટો અપલોડ કરો.');
      return;
    }

    setErrorMessage('');
    setStep(2);
    window.scrollTo({ top: 350, behavior: 'smooth' });
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
        window.scrollTo({ top: 250, behavior: 'smooth' });
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
    } catch (err) {
      setStatusError('સ્ટેટસ તપાસવામાં ભૂલ આવી.');
    } finally {
      setStatusLoading(false);
    }
  };

  const currentPrice = eventData?.liveRates?.currentPrice || 900;
  const activeTier = eventData?.liveRates?.activeTier;
  const slotsLeftInTier = eventData?.liveRates?.slotsLeftInTier ?? 50;
  const registeredCount = eventData?.liveRates?.registeredCount ?? 0;
  const totalCapacity = eventData?.liveRates?.totalCapacity ?? 250;
  const isSoldOut = eventData?.liveRates?.isSoldOut;

  // Direct UPI Intent links for mobile
  const upiIdVal = eventData?.payment?.upiId || 'thedivinegarbhsanskar@okaxis';
  const payeeNameVal = encodeURIComponent(eventData?.payment?.payeeName || 'The Divine Garbh Sanskar');
  const genericUpiUri = `upi://pay?pa=${upiIdVal}&pn=${payeeNameVal}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`;

  return (
    <div 
      onClick={handleGlobalClick}
      className="min-h-screen bg-[#FAF9F6] text-stone-900 relative overflow-hidden font-sans select-none"
    >
      <Helmet>
        <title>દિવ્ય ગર્ભયાત્રા - Couple Seminar | 19 Dec 2026 | The Divine Garbh Sanskar</title>
        <meta name="description" content="દિવ્ય ગર્ભયાત્રા - વિશેષ કપલ સેમિનાર. તારીખ: 19 December 2026, શનિવાર. વક્તા: નેહલ ગઢવી. જમના બા ભવન, સુરત. બુક કરો તમારું કપલ રજીસ્ટ્રેશન." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Floating Ambient Sacred Petals / Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="absolute bottom-[-40px] text-rose-300/25 animate-float-heart select-none"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`
            }}
          >
            🌸
          </span>
        ))}
      </div>

      {/* Dynamic Cursor Heart Bursts on Click */}
      {clickHearts.map((ch) => (
        <span
          key={ch.id}
          className="fixed pointer-events-none select-none text-rose-500 z-50 transition-all duration-700 ease-out"
          style={{
            left: `${ch.x}px`,
            top: `${ch.y}px`,
            fontSize: `${ch.size}px`,
            transform: `translate(${ch.tx}px, ${ch.ty}px) scale(0)`,
            opacity: 0
          }}
        >
          ✨
        </span>
      ))}

      {/* Subtle Warm Luxury Ambient Glows (Native GPU Vector Gradients from ekdujekeliye) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 65% 55% at 25% 10%, rgba(254, 205, 211, 0.45) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 85% 35%, rgba(254, 243, 199, 0.45) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 10% 85%, rgba(254, 215, 170, 0.35) 0%, transparent 70%)
          `,
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />

      {/* Header Sticky Navigation Bar for Event - ekdujekeliye Clean Luxury Style */}
      <header className="relative z-20 border-b border-stone-200/80 bg-white/90 backdrop-blur-md sticky top-0 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-900/10 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </span>
            <div>
              <span className="text-sm font-black tracking-wider text-stone-900 block uppercase">The Divine</span>
              <span className="text-xs text-rose-700 font-bold block">Garbh Sanskar</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowStatusModal(true)}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Search className="w-3.5 h-3.5 text-rose-600" />
              <span>સ્ટેટસ ચેક કરો</span>
            </button>
            <Link
              to="/event-admin"
              className="text-xs text-stone-500 hover:text-stone-900 font-semibold transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">

        {/* 1. HERO SECTION - ekdujekeliye Signature 2-Column Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Heart className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 fill-rose-600" />
                <span>વિશેષ કપલ સેમિનાર • COUPLE SEMINAR</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
                <span>19 Dec 2026, શનિવાર</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              પ્રેમ અને સંસ્કારની સફર <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#D97706]">
                દિવ્ય ગર્ભયાત્રા સેમિનાર
              </span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              માતા અને પિતા બંનેની સંયુક્ત સહભાગિતાથી ગર્ભસ્થ શિશુમાં દિવ્ય સંસ્કારોનું સિંચન કરવા માટે ખાસ આયોજિત લાઈવ કપલ વર્કશોપ, led by <strong>નેહલ ગઢવી (Life Coach & Expert)</strong>.
            </p>

            {/* Event Quick Meta Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs text-left">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-xs">
                <Calendar className="w-4 h-4 text-rose-600 mb-1" />
                <span className="text-stone-500 text-[10px] block font-medium">તારીખ</span>
                <strong className="text-stone-900 block font-bold text-[11px] sm:text-xs">19 Dec 2026</strong>
              </div>
              <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-xs">
                <Clock className="w-4 h-4 text-rose-600 mb-1" />
                <span className="text-stone-500 text-[10px] block font-medium">સમય</span>
                <strong className="text-stone-900 block font-bold text-[11px] sm:text-xs">રાત્રે 8:30 PM</strong>
              </div>
              <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-xs">
                <MapPin className="w-4 h-4 text-rose-600 mb-1" />
                <span className="text-stone-500 text-[10px] block font-medium">સ્થળ</span>
                <strong className="text-stone-900 block font-bold text-[11px] sm:text-xs">જમના બા ભવન</strong>
              </div>
              <div className="bg-white border border-stone-200/90 rounded-2xl p-3 shadow-xs">
                <Heart className="w-4 h-4 text-rose-600 mb-1 fill-rose-600" />
                <span className="text-stone-500 text-[10px] block font-medium">પ્રવેશ</span>
                <strong className="text-stone-900 block font-bold text-[11px] sm:text-xs">1 પાસ = 1 કપલ</strong>
              </div>
            </div>

            {/* Badges / Guarantees from ekdujekeliye */}
            <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[11px] font-semibold text-stone-600">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>પતિ-પત્ની (Couples Only)</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>ઇન્સ્ટન્ટ ડિજિટલ પાસ + QR</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                <span>WhatsApp ડિલિવરી</span>
              </div>
              <div className="flex items-center gap-1 text-amber-950 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>મર્યાદિત ૨૫૦ કપલ સીટો</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Nehal Gadhavi) in exact ekdujekeliye Signature Style */}
          <div className="lg:col-span-5 relative flex justify-center w-full">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xl bg-stone-100 group">
              <img
                src="/events/divy-garbhyatra/nehal-gadhavi.jpg"
                alt="નેહલ ગઢવી - દિવ્ય ગર્ભયાત્રા"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/20 to-transparent pointer-events-none" />

              {/* Floating Glassmorphism Host Badge from ekdujekeliye */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg text-left">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                    મુખ્ય વક્તા (Keynote Speaker)
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-950 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    10,000+ Couples Guided
                  </span>
                </div>
                <span className="text-base font-black text-stone-900 block">
                  નેહલ ગઢવી (Nehal Gadhavi)
                </span>
                <span className="text-xs text-stone-600 block font-medium">
                  ખ્યાતનામ Life Coach &amp; Garbh Sanskar Expert
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 1.5. THE 4 PILLARS EXPERIENCE (Why Attend) from ekdujekeliye */}
        <div className="mb-10 bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center space-y-1 mb-6">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest block">Why Attend</span>
            <h3 className="text-2xl font-black text-stone-900">આ સેમિનાર તમારા માટે કેમ અનિવાર્ય છે?</h3>
            <p className="text-xs text-stone-500">ગર્ભાવસ્થા દરમિયાન માતા-પિતાના સંબંધો અને બાળકના સંસ્કારોનું દિવ્ય જોડાણ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-sm font-bold text-stone-900">ખુલ્લા દિલથી સંવાદ</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                ગર્ભાવસ્થામાં પતિ-પત્ની વચ્ચે ઊંડો પરસ્પર સ્નેહ અને ભાવનાત્મક સહકાર સ્થાપિત કરવો.
              </p>
            </div>

            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-sm font-bold text-stone-900">વૈદિક ગર્ભ સંવાદ</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                ગર્ભસ્થ શિશુ સાથે વાતચીત કરીને તેના મગજના કોષો અને સંસ્કારોને જાગૃત કરવાની કળા.
              </p>
            </div>

            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-sm font-bold text-stone-900">પતિની સક્રિય ભાગીદારી</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                માતાની લાગણીઓને સમજીને પિતા તરીકે ગર્ભ સંસ્કારમાં બરાબરીની ભૂમિકા ભજવવી.
              </p>
            </div>

            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
                04
              </div>
              <h4 className="text-sm font-bold text-stone-900">દિવ્ય શિશુ નિર્માણ</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                તંદુરસ્ત, તેજસ્વી અને સંસ્કારી સંતાન પ્રાપ્તિ માટે પ્રાચીન ઋષિ વિજ્ઞાનનું માર્ગદર્શન.
              </p>
            </div>
          </div>
        </div>

        {/* 2. DYNAMIC 50-COUPLE RATE ESCALATION CARD */}
        <div className="mb-8 bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                  Live Pricing
                </span>
                <span className="text-xs text-amber-900 font-bold">
                  50-કપલ સ્લેબ સિસ્ટમ
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 mt-1">
                હાલનો ભાવ: <span className="text-rose-700 text-2xl md:text-3xl font-black">₹{currentPrice}</span>
                <span className="text-xs text-stone-600 font-normal ml-2">/ કપલ (બંને વ્યક્તિ માટે)</span>
              </h2>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 text-right shadow-2xs">
              <span className="text-[11px] text-stone-600 block font-medium">આ ભાવે માત્ર બાકી સ્લોટ:</span>
              <span className="text-lg md:text-xl font-black text-rose-700">
                {slotsLeftInTier > 0 ? `${slotsLeftInTier} કપલ બાકી` : 'સ્લોટ પૂર્ણ'}
              </span>
            </div>
          </div>

          {/* Progress bar out of 250 couples */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-stone-600 mb-1.5 font-semibold">
              <span>કુલ બુકિંગ: <strong className="text-stone-900">{registeredCount} / {totalCapacity} કપલ</strong></span>
              <span>બાકી સ્પોટ્સ: <strong className="text-rose-700">{Math.max(0, totalCapacity - registeredCount)} કપલ</strong></span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (registeredCount / totalCapacity) * 100)}%` }}
              />
            </div>
          </div>

          {/* Tier Pills Visualizer */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 text-[11px]">
            {[
              { num: 1, range: '1-50 કપલ', rate: '₹900', label: 'Early Bird' },
              { num: 2, range: '51-100 કપલ', rate: '₹1100', label: 'Phase 2' },
              { num: 3, range: '101-150 કપલ', rate: '₹1300', label: 'Phase 3' },
              { num: 4, range: '151-200 કપલ', rate: '₹1500', label: 'Phase 4' },
              { num: 5, range: '201-250 કપલ', rate: '₹1800', label: 'Final Slots' }
            ].map((t) => {
              const isActive = activeTier?.tierNumber === t.num;
              const isPast = (activeTier?.tierNumber || 1) > t.num;
              return (
                <div
                  key={t.num}
                  className={`rounded-xl p-2.5 text-center border transition-all ${
                    isActive
                      ? 'bg-rose-50 border-rose-500 text-rose-900 shadow-md ring-2 ring-rose-500/20 font-bold'
                      : isPast
                      ? 'bg-stone-100 border-stone-200 text-stone-400 line-through'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className={`block text-xs ${isActive ? 'text-rose-700 font-extrabold text-sm' : 'font-bold'}`}>{t.rate}</span>
                  <span className="text-[10px] block opacity-75">{t.range}</span>
                  {isActive && <span className="inline-block px-1.5 py-0.5 text-[9px] bg-rose-600 text-white rounded-full mt-1 font-bold">સક્રિય</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2.5 5-STEP SEAMLESS REGISTRATION PROCESS from ekdujekeliye */}
        <div className="mb-8">
          <div className="text-center space-y-1 mb-5">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-widest block">Seamless Experience</span>
            <h3 className="text-xl md:text-2xl font-black text-stone-900">૫ સરળ પગલાંમાં તમારી સીટ બુક કરો</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs">
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-lg font-black text-rose-600 block">01</span>
              <h4 className="font-bold text-stone-900 text-xs">સ્લોટ પસંદગી</h4>
              <p className="text-[10px] text-stone-500 font-medium leading-tight">હાલનો ૫૦-કપલ સ્લેબ રેટ તપાસો.</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-lg font-black text-amber-600 block">02</span>
              <h4 className="font-bold text-stone-900 text-xs">કપલ વિગત</h4>
              <p className="text-[10px] text-stone-500 font-medium leading-tight">પતિ-પત્નીનું નામ અને મોબાઈલ નંબર.</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-lg font-black text-rose-600 block">03</span>
              <h4 className="font-bold text-stone-900 text-xs">કપલ ફોટો</h4>
              <p className="text-[10px] text-stone-500 font-medium leading-tight">ડિજિટલ પાસ માટે કપલ ફોટો અપલોડ કરો.</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-lg font-black text-amber-600 block">04</span>
              <h4 className="font-bold text-stone-900 text-xs">UPI પેમેન્ટ</h4>
              <p className="text-[10px] text-stone-500 font-medium leading-tight">કોઈપણ UPI એપથી ચૂકવી રિસીપ્ટ જોડો.</p>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white border border-stone-200 rounded-2xl p-3.5 space-y-1 shadow-2xs">
              <span className="text-lg font-black text-emerald-600 block">05</span>
              <h4 className="font-bold text-stone-900 text-xs">QR પાસ</h4>
              <p className="text-[10px] text-stone-500 font-medium leading-tight">ઇન્સ્ટન્ટ QR પાસ ડાઉનલોડ & WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* 3. STEPPER TABS */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${step === 1 ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white shadow-md shadow-rose-600/20' : 'bg-white text-stone-600 border border-stone-200 shadow-xs'}`}>
            <span>૧. કપલ વિગત</span>
          </div>
          <div className="w-4 sm:w-8 h-0.5 bg-stone-300" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${step === 2 ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white shadow-md shadow-rose-600/20' : 'bg-white text-stone-600 border border-stone-200 shadow-xs'}`}>
            <span>૨. પેમેન્ટ & રિસીપ્ટ</span>
          </div>
          <div className="w-4 sm:w-8 h-0.5 bg-stone-300" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${step === 3 ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white shadow-md shadow-rose-600/20' : 'bg-white text-stone-600 border border-stone-200 shadow-xs'}`}>
            <span>૩. કન્ફર્મેશન</span>
          </div>
        </div>

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-sm flex items-start gap-3 shadow-md">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium leading-relaxed">
              {errorMessage}
            </div>
            <button onClick={() => setErrorMessage('')} className="text-rose-600 hover:text-rose-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            STEP 1: COUPLE REGISTRATION FORM
        ======================================================== */}
        {step === 1 && (
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="border-b border-stone-200/80 pb-4 mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                કપલ નોંધણી વિગત (Couple Details)
              </h2>
              <p className="text-xs md:text-sm text-stone-600 mt-1">
                કૃપા કરીને સાચી વિગતો ભરો. આ વિગતો તમારા ડિજિટલ એન્ટ્રી પાસ પર પ્રિન્ટ થશે.
              </p>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-xs"
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
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-xs"
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
                    className="w-full bg-stone-50/80 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600 text-sm transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Couple Photo Upload Section */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  કપલ ફોટો અપલોડ કરો (Couple Photo) *
                </label>
                <p className="text-xs text-stone-600 mb-2">
                  તમારો બંનેનો સાથે હોય તેવો સારો ફોટો અપલોડ કરો, જે એન્ટ્રી પાસ પર પ્રિન્ટ થશે.
                </p>

                <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/80">
                  {couplePhotoPreview ? (
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-md shrink-0">
                      <img
                        src={couplePhotoPreview}
                        alt="Couple Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-stone-500 shrink-0 shadow-xs">
                      <Upload className="w-7 h-7 text-stone-400 mb-1" />
                      <span className="text-[10px] font-medium">ફોટો પસંદ કરો</span>
                    </div>
                  )}

                  <div className="flex-1 w-full text-center md:text-left">
                    <input
                      type="file"
                      id="couple-photo-input"
                      accept="image/*"
                      onChange={handleCouplePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="couple-photo-input"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-xs cursor-pointer transition-all shadow-md shadow-rose-600/20 active:scale-95"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{couplePhoto ? 'બીજો ફોટો બદલો' : 'કપલ ફોટો પસંદ કરો'}</span>
                    </label>
                    <span className="block text-[11px] text-stone-500 mt-1.5">
                      (PNG, JPG - ઓટોમેટિક કોમ્પ્રેસ થશે)
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit to Step 2 Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSoldOut}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-black text-base md:text-lg flex items-center justify-center gap-2 shadow-xl shadow-rose-600/25 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <div className="border-b border-stone-200/80 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-rose-700" />
                  સ્ટેપ ૨: UPI પેમેન્ટ & રિસીપ્ટ અપલોડ
                </h2>
                <p className="text-xs md:text-sm text-stone-600 mt-0.5">
                  કપલ: <span className="font-bold text-rose-800">{husbandName} & {wifeName} {surname}</span>
                </p>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-rose-700 hover:text-rose-900 underline underline-offset-4"
              >
                વિગતો સુધારો
              </button>
            </div>

            {/* Price Badge */}
            <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-600 block font-medium">ચૂકવવાપાત્ર રકમ (Total Amount):</span>
                <span className="text-2xl md:text-3xl font-black text-rose-800">₹{currentPrice}</span>
                <span className="text-xs text-stone-500 block mt-0.5">({activeTier?.name || 'Couple Entry'})</span>
              </div>
              <div className="text-right text-xs text-stone-600">
                <span className="block font-medium">UPI ID:</span>
                <span className="font-mono text-rose-800 font-bold">{upiIdVal}</span>
              </div>
            </div>

            {/* UPI QR Code Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
                      className="w-52 h-52 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center text-stone-400">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                )}
                <span className="text-xs text-stone-500 mt-2 font-medium">
                  GPay • PhonePe • Paytm • BHIM
                </span>
              </div>

              {/* Mobile 1-Click Pay Buttons & Instructions */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-stone-700 block">
                  મોબાઇલ માટે 1-ક્લિક પેમેન્ટ લિંક્સ:
                </span>

                <a
                  href={`gpay://upi/pay?pa=${upiIdVal}&pn=${payeeNameVal}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>Google Pay થી ચૂકવો</span>
                </a>

                <a
                  href={`phonepe://pay?pa=${upiIdVal}&pn=${payeeNameVal}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>PhonePe થી ચૂકવો</span>
                </a>

                <a
                  href={`paytmmp://pay?pa=${upiIdVal}&pn=${payeeNameVal}&am=${currentPrice}&cu=INR&tn=DivyaGarbhYatra`}
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

              <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/80">
                {paymentPreview ? (
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
                    <img
                      src={paymentPreview}
                      alt="Payment Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-white border border-stone-200 flex flex-col items-center justify-center text-stone-500 shrink-0 shadow-xs">
                    <Upload className="w-7 h-7 text-stone-400 mb-1" />
                    <span className="text-[10px] font-medium">રિસીપ્ટ પસંદ કરો</span>
                  </div>
                )}

                <div className="flex-1 w-full text-center md:text-left">
                  <input
                    type="file"
                    id="payment-screenshot-input"
                    accept="image/*"
                    onChange={handlePaymentScreenshotChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="payment-screenshot-input"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xs cursor-pointer transition-all shadow-md shadow-emerald-600/20 active:scale-95"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{paymentScreenshot ? 'બીજી રિસીપ્ટ બદલો' : 'પેમેન્ટ રિસીપ્ટ પસંદ કરો'}</span>
                  </label>
                  <span className="block text-[11px] text-stone-500 mt-1.5">
                    (GPay / PhonePe / Paytm / BHIM સક્સેસ સ્ક્રીન)
                  </span>
                </div>
              </div>
            </div>

            {/* Final Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmitRegistration}
                disabled={submitting || !paymentScreenshot}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-black text-base md:text-lg flex items-center justify-center gap-2 shadow-xl shadow-rose-600/25 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 md:p-10 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-600 shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
                Registration Submitted
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-stone-900">
                અભિનંદન! તમારું ફોર્મ સબમિટ થઈ ગયું છે
              </h2>
              <p className="text-sm text-stone-600 max-w-lg mx-auto">
                તમારી નોંધણી વિગતો અને પેમેન્ટ રિસીપ્ટ સફળતાપૂર્વક સિસ્ટમમાં જમા થઈ ગઈ છે.
              </p>
            </div>

            {/* Inquiry ID Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 max-w-md mx-auto space-y-3 shadow-sm">
              <span className="text-xs text-stone-500 block font-medium">તમારો રજીસ્ટ્રેશન / પાસ ID:</span>
              <div className="text-3xl font-black font-mono text-rose-800 tracking-wider">
                {submissionResult.inquiryId}
              </div>
              <div className="text-xs text-stone-600 border-t border-stone-200 pt-2 flex justify-between font-medium">
                <span>કપલ: {submissionResult.husbandName} & {submissionResult.wifeName} {submissionResult.surname}</span>
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
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-rose-600" />
                રજીસ્ટ્રેશન સ્ટેટસ તપાસો
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                તમારો ઇન્ક્વાયરી આઈડી (દા.ત. CPL-1001) અથવા રજીસ્ટર્ડ મોબાઇલ નંબર દાખલ કરો.
              </p>
            </div>

            <form onSubmit={handleCheckStatus} className="flex gap-2">
              <input
                type="text"
                required
                value={statusQuery}
                onChange={(e) => setStatusQuery(e.target.value)}
                placeholder="CPL-1001 અથવા 9876543210"
                className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-rose-600 focus:bg-white focus:ring-1 focus:ring-rose-600"
              />
              <button
                type="submit"
                disabled={statusLoading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs hover:brightness-105 transition-all shadow-md shadow-rose-600/20"
              >
                {statusLoading ? 'શોધી રહ્યું છે...' : 'ચેક કરો'}
              </button>
            </form>

            {statusError && (
              <p className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {statusError}
              </p>
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
                  <strong>કપલ:</strong> {statusResult.husbandName} & {statusResult.wifeName} {statusResult.surname}
                </div>
                <div className="text-stone-600">
                  <strong>મોબાઇલ:</strong> {statusResult.phoneNumber}
                </div>

                {statusResult.status === 'approved' ? (
                  <Link
                    to={`/pass/${statusResult.inquiryId}`}
                    className="block w-full text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs mt-3 transition-colors shadow-sm"
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
