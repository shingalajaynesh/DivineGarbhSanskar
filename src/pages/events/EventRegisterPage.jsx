import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, Clock, MapPin, ArrowLeft, Search, RefreshCw, X, ShieldCheck
} from 'lucide-react';
import EventRegistrationWizard from './components/EventRegistrationWizard';
import { API_BASE } from '../../utils/apiConfig';

export default function EventRegisterPage() {
  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  // Status Check Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusQuery, setStatusQuery] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState('');

  // Fetch Event Data & Live Rates for the summary header
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
        console.error('Error fetching event details:', err);
      } finally {
        if (isMounted) setLoadingEvent(false);
      }
    };
    fetchEvent();
    return () => { isMounted = false; };
  }, []);

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
              type="button"
              onClick={() => setShowStatusModal(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
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

      {/* Main Registration Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6">

        {/* 1. COMPACT PROGRAM SUMMARY CARD */}
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

        {/* 2. ZERO-LAG, SMOOTH REGISTRATION WIZARD */}
        <EventRegistrationWizard />

        {/* Footer Brand Info */}
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
              type="button"
              onClick={() => {
                setShowStatusModal(false);
                setStatusResult(null);
                setStatusError('');
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 cursor-pointer p-1"
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
