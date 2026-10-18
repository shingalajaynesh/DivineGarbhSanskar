import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Heart, Calendar, Clock, MapPin, User, Sparkles, CheckCircle2, 
  AlertCircle, ArrowRight, ShieldCheck, Download, 
  ExternalLink, Phone, Search, RefreshCw, X, ChevronDown, Check, Star, Award, Users
} from 'lucide-react';
import EventRegistrationWizard from './components/EventRegistrationWizard';
import { API_BASE } from '../../utils/apiConfig';

const ADMIN_WHATSAPP = '919586979897';

export default function DivyaGarbhYatra() {
  const bookingSectionRef = useRef(null);

  // Server state
  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  // Status Check Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusQuery, setStatusQuery] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState('');

  // Active FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Fetch Event Data & Live Rates
  useEffect(() => {
    let isMounted = true;
    const fetchEventInfo = async () => {
      try {
        setLoadingEvent(true);
        const res = await fetch(`${API_BASE}/event`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setEventData(data);
        }
      } catch (err) {
        console.error('Error fetching event details:', err);
      } finally {
        if (isMounted) setLoadingEvent(false);
      }
    };
    fetchEventInfo();
    return () => { isMounted = false; };
  }, []);

  // Smooth scroll to booking section (Without page jump bugs)
  const scrollToBooking = (e) => {
    if (e) e.preventDefault();
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const currentPrice = eventData?.liveRates?.currentPrice || 900;
  const activeTier = eventData?.liveRates?.activeTier || { name: 'કપલ પ્રવેશ પાસ (Couple Pass)', price: 900 };
  const isSoldOut = eventData?.liveRates?.isSoldOut || false;

  const faqs = [
    {
      q: 'આ સેમિનારમાં પતિ અને પત્ની બંનેએ સાથે આવવું જરૂરી છે?',
      a: 'હા, આ કાર્યક્રમ ખાસ પતિ-પત્ની (Couples Only) માટે ડિઝાઈન કરવામાં આવ્યો છે જેથી બંને સાથે મળીને ગર્ભ સંસ્કાર અને બાળકના ઉજ્જવળ ભવિષ્યની સફર શરૂ કરી શકે. ૧ પાસ પર બંને વ્યક્તિ માટે પ્રવેશ માન્ય છે.'
    },
    {
      q: 'ઓનલાઇન ફી ચૂકવ્યા પછી પાસ કેવી રીતે મળશે?',
      a: 'ફોર્મ સબમિટ કર્યા પછી અમારી ટીમ થોડી જ મિનિટોમાં તમારી પેમેન્ટ રિસીપ્ટ વેરિફાય કરશે. વેરિફાય થતાં જ તમારો સત્તાવાર VIP ડિજિટલ પાસ QR કોડ સાથે જનરેટ થઈ જશે, જેને તમે ડાઉનલોડ કરી શકો છો.'
    },
    {
      q: 'જો પેમેન્ટ થઈ જાય પણ રિસીપ્ટ અપલોડ ન થઈ હોય તો શું કરવું?',
      a: 'તમે ઉપર આપેલા "સ્ટેટસ" બટન પર ક્લિક કરીને તમારો મોબાઇલ નંબર દાખલ કરી સ્ટેટસ જોઈ શકો છો અથવા અમારા હેલ્પલાઈન WhatsApp નંબર 95869 79897 પર સંપર્ક કરી શકો છો.'
    },
    {
      q: 'કાર્યક્રમનું સ્થળ અને સમય શું છે?',
      a: 'તારીખ: 19 ડિસેમ્બર 2026, શનિવાર. સમય: રાત્રે 8:30 વાગ્યે. સ્થળ: જમના બા ભવન, સુરત.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      <Helmet>
        <title>દિવ્ય ગર્ભયાત્રા સેમિનાર • The Divine Garbh Sanskar | સુરત</title>
        <meta name="description" content="પ્રેમ અને સંસ્કારની સફર - દિવ્ય ગર્ભયાત્રા કપલ સેમિનાર. નેહલ ગઢવી દ્વારા વિશેષ માર્ગદર્શન. હમણાં જ સીટ બુક કરો." />
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

      {/* Header Sticky Navigation Bar */}
      <header className="relative z-20 border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-0 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
              <span className="text-[10px] sm:text-xs text-rose-700 font-bold leading-none mt-1 flex items-center gap-1">
                <span>કાર્યક્રમ:</span>
                <span className="text-amber-800">દિવ્ય ગર્ભયાત્રા સેમિનાર</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={scrollToBooking}
              className="text-xs font-black bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white px-4 py-2 rounded-full shadow-md shadow-rose-700/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>બુક કરો (₹{currentPrice})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setShowStatusModal(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-rose-600" />
              <span>સ્ટેટસ</span>
            </button>

            <Link
              to="/admin"
              className="text-xs text-stone-500 hover:text-stone-900 font-semibold transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-12">

        {/* 1. HERO SECTION - Executive 2-Column Luxury Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
              <img
                src="/logo.jpg"
                alt="The Divine Garbh Sanskar"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-0.5 bg-white object-contain border border-amber-500/60 shadow-2xs shrink-0"
              />
              <div className="text-left">
                <span className="text-[11px] sm:text-xs font-black tracking-wider text-stone-900 uppercase block leading-none">
                  The Divine Garbh Sanskar
                </span>
                <span className="text-[9px] sm:text-[10px] text-rose-700 font-bold leading-none block mt-0.5">
                  સંસ્થા દ્વારા આયોજિત વિશેષ કપલ સેમિનાર
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>COUPLE SEMINAR • પતિ-પત્ની માટે</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs font-extrabold uppercase tracking-wider">
                <span>19 Dec 2026, શનિવાર</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              પ્રેમ અને સંસ્કારની સફર <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-rose-600 to-amber-700">
                દિવ્ય ગર્ભયાત્રા સેમિનાર
              </span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              માતા અને પિતા બંનેની સંયુક્ત સહભાગિતાથી ગર્ભસ્થ શિશુમાં દિવ્ય સંસ્કારોનું સિંચન કરવા માટે ખાસ આયોજિત લાઈવ કપલ વર્કશોપ, led by <strong>નેહલ ગઢવી (Life Coach & Expert)</strong>.
            </p>

            {/* Event Quick Meta Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-left">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-2xs">
                <Calendar className="w-4 h-4 text-rose-600 mb-1" />
                <span className="text-stone-500 text-[10px] block font-medium">તારીખ</span>
                <strong className="text-stone-900 block font-bold text-xs">19 Dec 2026</strong>
              </div>
              <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-2xs">
                <Clock className="w-4 h-4 text-rose-600 mb-1" />
                <span className="text-stone-500 text-[10px] block font-medium">સમય</span>
                <strong className="text-stone-900 block font-bold text-xs">રાત્રે 8:30 PM</strong>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-2xs">
                <MapPin className="w-4 h-4 text-rose-600 mb-1" />
                <span className="text-stone-500 text-[10px] block font-medium">સ્થળ</span>
                <strong className="text-stone-900 block font-bold text-xs">જમના બા ભવન, સુરત</strong>
              </div>
            </div>

            {/* Direct CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={scrollToBooking}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-700/25 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>હમણાં જ સીટ બુક કરો (₹{currentPrice})</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>

              <Link
                to="/divy-garbhyatra/register"
                className="py-4 px-6 rounded-2xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm text-center transition-colors shadow-2xs"
              >
                ડેડિકેટેડ રજીસ્ટ્રેશન ફોર્મ →
              </Link>
            </div>

            {/* Badges / Guarantees */}
            <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-stone-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                <span>કપલ એન્ટ્રી (૧ પાસ = ૨ વ્યક્તિ)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0" />
                <span>ઇન્સ્ટન્ટ QR ડિજિટલ પાસ</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-950 font-bold">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>સત્તાવાર ડિજિટલ એન્ટ્રી પાસ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Nehal Gadhavi) */}
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

              {/* Floating Glassmorphism Speaker Badge */}
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

        </section>

        {/* 2. SEMINAR COUPLE PASS DETAILS & INCLUSIONS (No counting display) */}
        <section className="bg-white border border-stone-200/90 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider">
                  સત્તાવાર પ્રવેશ પાસ
                </span>
                <span className="text-xs text-amber-900 font-bold">
                  {activeTier.name}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-stone-900 mt-1.5">
                કપલ ફી: <span className="text-rose-700 text-2xl md:text-3xl font-black">₹{currentPrice}</span>
                <span className="text-xs text-stone-600 font-normal ml-2">/ કપલ (પતિ-પત્ની બંને વ્યક્તિ માટે)</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={scrollToBooking}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-rose-700/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>હમણાં જ સીટ બુક કરો (₹{currentPrice})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-5">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-stone-900 block">કપલ એન્ટ્રી</strong>
                <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">૧ પાસ = પતિ અને પત્ની બંને માટે માન્ય</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-stone-900 block">લાઈવ પ્રેક્ટિકલ</strong>
                <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">નેહલ ગઢવી સાથે ધ્યાન અને સંવાદ</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-stone-900 block">QR ડિજિટલ પાસ</strong>
                <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">WhatsApp &amp; વેબ પર ઇન્સ્ટન્ટ ડિલિવરી</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-stone-900 block">લાઈવ Q&amp;A</strong>
                <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">નિષ્ણાત સાથે પ્રશ્નોત્તરી સેશન</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE 4 PILLARS EXPERIENCE (Why Attend) */}
        <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="text-center space-y-1 mb-6">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest block">Why Attend</span>
            <h3 className="text-2xl font-black text-stone-900">આ સેમિનાર તમારા માટે કેમ અનિવાર્ય છે?</h3>
            <p className="text-xs text-stone-500">ગર્ભાવસ્થા દરમિયાન માતા-પિતાના સંબંધો અને બાળકના સંસ્કારોનું દિવ્ય જોડાણ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-black">
                01
              </div>
              <h4 className="text-sm font-bold text-stone-900">ખુલ્લા દિલથી સંવાદ</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                ગર્ભાવસ્થામાં પતિ-પત્ની વચ્ચે ઊંડો પરસ્પર સ્નેહ અને ભાવનાત્મક સહકાર સ્થાપિત કરવો.
              </p>
            </div>

            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-black">
                02
              </div>
              <h4 className="text-sm font-bold text-stone-900">વૈદિક ગર્ભ સંવાદ</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                ગર્ભસ્થ શિશુ સાથે વાતચીત કરીને તેના મગજના કોષો અને સંસ્કારોને જાગૃત કરવાની કળા.
              </p>
            </div>

            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-black">
                03
              </div>
              <h4 className="text-sm font-bold text-stone-900">પતિની સક્રિય ભાગીદારી</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                માતાની લાગણીઓને સમજીને પિતા તરીકે ગર્ભ સંસ્કારમાં બરાબરીની ભૂમિકા ભજવવી.
              </p>
            </div>

            <div className="bg-[#FFFDF9] border border-stone-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-black">
                04
              </div>
              <h4 className="text-sm font-bold text-stone-900">દિવ્ય શિશુ નિર્માણ</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                તંદુરસ્ત, તેજસ્વી અને સંસ્કારી સંતાન પ્રાપ્તિ માટે પ્રાચીન ઋષિ વિજ્ઞાનનું માર્ગદર્શન.
              </p>
            </div>
          </div>
        </section>

        {/* 4. EMBEDDED REGISTRATION WIZARD (ANCHOR TARGET) */}
        <section ref={bookingSectionRef} className="scroll-mt-24 space-y-4">
          <div className="text-center space-y-1 mb-2">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest block">Direct Online Booking</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              દિવ્ય ગર્ભયાત્રા સેમિનાર સીટ બુકિંગ
            </h2>
            <p className="text-xs text-stone-600 max-w-lg mx-auto">
              માત્ર ૨ મિનિટમાં ફોર્મ ભરીને ઓનલાઇન પાસ બુક કરો.
            </p>
          </div>

          {/* Zero-Lag, Smooth Registration Wizard */}
          <EventRegistrationWizard isEmbedded={true} />
        </section>

        {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-widest block">FAQs</span>
            <h3 className="text-2xl font-black text-stone-900">વારંવાર પૂછાતા પ્રશ્નો</h3>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left font-bold text-sm text-stone-900 flex items-center justify-between gap-3 bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180 text-rose-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs text-stone-600 leading-relaxed bg-white border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Brand Info */}
        <footer className="pt-8 border-t border-stone-200/80 text-center space-y-3 pb-8">
          <div className="flex items-center justify-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="The Divine Garbh Sanskar"
              className="w-9 h-9 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-2xs"
            />
            <span className="text-sm font-black tracking-wider text-stone-900 uppercase">
              The Divine Garbh Sanskar
            </span>
          </div>
          <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
            'દિવ્ય ગર્ભયાત્રા' એ The Divine Garbh Sanskar દ્વારા સંચાલિત વિશેષ કપલ સેમિનાર કાર્યક્રમ છે.
          </p>
          <div className="text-[11px] text-stone-400 font-medium">
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
              type="button"
              onClick={() => {
                setShowStatusModal(false);
                setStatusResult(null);
                setStatusError('');
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs hover:brightness-105 transition-all shadow-md shadow-rose-600/20 cursor-pointer disabled:opacity-50"
              >
                {statusLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>શોધો</span>
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
