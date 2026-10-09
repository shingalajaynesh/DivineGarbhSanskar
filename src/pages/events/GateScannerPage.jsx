import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Camera, CheckCircle2, XCircle, AlertTriangle, ArrowLeft, 
  RefreshCw, Users, ShieldCheck, Check, Search, Lock
} from 'lucide-react';

import { API_BASE } from '../../utils/apiConfig';

// Web Audio API Synthesizers for gate entry sound cues
const playSuccessChime = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    console.warn('Audio feedback failed:', e);
  }
};

const playWarningBuzzer = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.setValueAtTime(130, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.warn('Audio feedback failed:', e);
  }
};

export default function GateScannerPage() {
  const [adminPassword, setAdminPassword] = useState(() => sessionStorage.getItem('divineAdminPassword') || '');
  const [inquiryInput, setInquiryInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleVerifyId = async (idToVerify) => {
    const id = (idToVerify || inquiryInput).trim().toUpperCase();
    if (!id) return;

    setVerifying(true);
    setScanResult(null);

    try {
      const res = await fetch(`${API_BASE}/admin/scanner/verify`, {
        method: 'POST',
        headers: {
          'Authorization': adminPassword,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inquiryId: id })
      });

      const json = await res.json();

      if (res.ok && json.success) {
        playSuccessChime();
        setScanResult({
          status: 'SUCCESS',
          message: json.message,
          data: json.registration
        });
      } else {
        playWarningBuzzer();
        setScanResult({
          status: json.code || 'ERROR',
          message: json.message || 'અમાન્ય પાસ!',
          data: json.registration || null
        });
      }
    } catch {
      playWarningBuzzer();
      setScanResult({
        status: 'SERVER_ERROR',
        message: 'સર્વર સાથે જોડાણ થઈ શક્યું નથી.',
        data: null
      });
    } finally {
      setVerifying(false);
      setInquiryInput('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans antialiased p-4 md:p-8 flex flex-col justify-between">
      <Helmet>
        <title>Gate Entry Scanner - દિવ્ય ગર્ભયાત્રા</title>
      </Helmet>

      {/* Top Bar */}
      <header className="max-w-xl mx-auto w-full flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
        <Link
          to="/event-admin"
          className="inline-flex items-center gap-2 text-xs text-rose-800 hover:text-stone-900 font-bold transition-colors"
        >
          <img
            src="/logo.jpg"
            alt="The Divine Garbh Sanskar"
            className="w-8 h-8 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-2xs shrink-0"
          />
          <div className="text-left">
            <span className="text-[10px] text-stone-500 uppercase block leading-none font-bold">The Divine Garbh Sanskar</span>
            <span className="text-xs text-stone-900 font-extrabold leading-none mt-0.5 block">← એડમિન ડેશબોર્ડ</span>
          </div>
        </Link>

        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 tracking-wider flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-purple-700" />
          <span>Gate Scanner Active</span>
        </span>
      </header>

      {/* Main Scanner Box */}
      <main className="max-w-xl mx-auto w-full space-y-6">
        {/* Scanner Input Card */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 space-y-5">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-800 mx-auto flex items-center justify-center mb-2">
              <Camera className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-serif">
              ગેટ એન્ટ્રી પાસ સ્કેનર
            </h1>
            <p className="text-xs text-stone-500 font-medium">
              બારકોડ સ્કેનરથી સ્કેન કરો અથવા પાસ ID (દા.ત. CPL-1001) લખી Enter દબાવો.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleVerifyId(); }} className="space-y-3">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                autoFocus
                value={inquiryInput}
                onChange={(e) => setInquiryInput(e.target.value)}
                placeholder="CPL-1001 સ્કેન કરો..."
                className="w-full bg-stone-50 border-2 border-stone-300 rounded-2xl px-5 py-4 text-center font-mono font-black text-lg text-stone-900 uppercase tracking-widest focus:outline-none focus:border-rose-700 focus:bg-white transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white font-black text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
            >
              {verifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>ચકાસણી ચાલુ છે...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>વેરિફાય કરો &amp; એન્ટ્રી આપો</span>
                </>
              )}
            </button>
          </form>

          {/* Fallback Password Field if session is empty */}
          {!adminPassword && (
            <div className="pt-3 border-t border-stone-100">
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                સ્કેનર ઓથોરાઈઝેશન પાસવર્ડ (Required for Scanner)
              </label>
              <input
                type="password"
                placeholder="એડમિન પાસવર્ડ..."
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  sessionStorage.setItem('divineAdminPassword', e.target.value);
                }}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900"
              />
            </div>
          )}
        </div>

        {/* Scan Result Feedback Banner */}
        {scanResult && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {scanResult.status === 'SUCCESS' && (
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                      ENTRY GRANTED
                    </span>
                    <h2 className="text-xl font-black text-emerald-950 font-serif">
                      {scanResult.message}
                    </h2>
                  </div>
                </div>

                {scanResult.data && (
                  <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-emerald-200 flex items-center gap-4">
                    {scanResult.data.couplePhoto && (
                      <img
                        src={scanResult.data.couplePhoto}
                        alt="Couple"
                        className="w-16 h-16 rounded-xl object-cover border border-emerald-300 flex-shrink-0"
                      />
                    )}
                    <div>
                      <span className="font-mono text-xs font-black text-stone-600 block">
                        {scanResult.data.inquiryId}
                      </span>
                      <strong className="text-base font-black text-stone-900 block">
                        {scanResult.data.husbandName} &amp; {scanResult.data.wifeName} {scanResult.data.surname}
                      </strong>
                      <span className="text-xs text-emerald-700 font-bold block mt-0.5">
                        કપલ પાસ માન્ય છે
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {scanResult.status === 'ALREADY_CHECKED_IN' && (
              <div className="bg-amber-50 border-2 border-amber-500 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                      DUPLICATE ENTRY ALERT
                    </span>
                    <h2 className="text-lg font-black text-amber-950">
                      {scanResult.message}
                    </h2>
                  </div>
                </div>

                {scanResult.data && (
                  <div className="bg-white/80 rounded-2xl p-4 border border-amber-200 flex items-center gap-4">
                    {scanResult.data.couplePhoto && (
                      <img
                        src={scanResult.data.couplePhoto}
                        alt="Couple"
                        className="w-16 h-16 rounded-xl object-cover border border-amber-300 flex-shrink-0"
                      />
                    )}
                    <div>
                      <span className="font-mono text-xs font-black text-stone-600 block">
                        {scanResult.data.inquiryId}
                      </span>
                      <strong className="text-base font-black text-stone-900 block">
                        {scanResult.data.husbandName} &amp; {scanResult.data.wifeName} {scanResult.data.surname}
                      </strong>
                      <span className="text-xs text-amber-800 font-bold block mt-0.5">
                        આ પાસ પર અગાઉ એન્ટ્રી લેવાઈ ચૂકી છે!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {scanResult.status !== 'SUCCESS' && scanResult.status !== 'ALREADY_CHECKED_IN' && (
              <div className="bg-rose-50 border-2 border-rose-500 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-800 tracking-wider">
                      ACCESS DENIED
                    </span>
                    <h2 className="text-lg font-black text-rose-950">
                      {scanResult.message}
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Instructions */}
      <footer className="max-w-xl mx-auto w-full text-center text-xs text-stone-400 pt-6">
        The Divine Garbh Sanskar • Gate Entry Control
      </footer>
    </div>
  );
}
