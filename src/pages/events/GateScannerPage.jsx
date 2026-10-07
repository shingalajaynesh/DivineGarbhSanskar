import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Camera, CheckCircle2, XCircle, AlertTriangle, ArrowLeft, 
  RefreshCw, Volume2, Search, Lock, User
} from 'lucide-react';

const API_BASE = '/api';

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
    } catch (err) {
      playWarningBuzzer();
      setScanResult({
        status: 'SERVER_ERROR',
        message: 'સર્વર સાથે કનેક્શન થઈ શક્યું નથી.',
        data: null
      });
    } finally {
      setVerifying(false);
      setInquiryInput('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#090104] text-slate-100 font-sans p-4 md:p-8 flex flex-col justify-between">
      <Helmet>
        <title>Gate Entry Scanner - દિવ્ય ગર્ભયાત્રા</title>
      </Helmet>

      {/* Top Bar */}
      <header className="max-w-xl mx-auto w-full flex items-center justify-between border-b border-rose-950 pb-4 mb-6">
        <Link
          to="/event-admin"
          className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>એડમિન ડેશબોર્ડ</span>
        </Link>

        <span className="text-xs text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1">
          <Camera className="w-3.5 h-3.5" />
          <span>Gate Scanner Online</span>
        </span>
      </header>

      {/* Main Scanner Box */}
      <main className="max-w-xl mx-auto w-full space-y-6">

        {/* Scanner Input Card */}
        <div className="bg-[#18040E] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-black text-white">ગેટ એન્ટ્રી પાસ સ્કેનર</h1>
            <p className="text-xs text-slate-400 mt-1">
              બારકોડ સ્કેનરથી સ્કેન કરો અથવા પાસ ID (દા.ત. CPL-1001) લખી Enter દબાવો.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyId();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={inquiryInput}
              onChange={(e) => setInquiryInput(e.target.value)}
              placeholder="સ્કેન કરો અથવા CPL-1001 લખો..."
              className="flex-1 bg-black border-2 border-rose-900 rounded-2xl px-4 py-3.5 text-white font-mono text-lg tracking-wider placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={verifying || !inquiryInput.trim()}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {verifying ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'વેરિફાય'}
            </button>
          </form>
        </div>

        {/* Verification Result Card */}
        {scanResult && (
          <div className={`rounded-3xl p-6 border-2 shadow-2xl transition-all ${
            scanResult.status === 'SUCCESS'
              ? 'bg-emerald-950/90 border-emerald-400 shadow-emerald-900/30'
              : scanResult.status === 'ALREADY_CHECKED_IN'
              ? 'bg-amber-950/90 border-amber-400 shadow-amber-900/30'
              : 'bg-rose-950/90 border-rose-500 shadow-rose-900/30'
          }`}>
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
              {scanResult.status === 'SUCCESS' ? (
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : scanResult.status === 'ALREADY_CHECKED_IN' ? (
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                  <XCircle className="w-8 h-8" />
                </div>
              )}

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block opacity-80">
                  {scanResult.status}
                </span>
                <h2 className="text-xl font-black text-white">
                  {scanResult.message}
                </h2>
              </div>
            </div>

            {/* Couple Card if found */}
            {scanResult.data && (
              <div className="flex items-center gap-4 bg-black/40 rounded-2xl p-4 border border-white/10">
                {scanResult.data.couplePhoto && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20 shrink-0">
                    <img
                      src={scanResult.data.couplePhoto}
                      alt="Couple"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-amber-300 block">
                    {scanResult.data.inquiryId}
                  </span>
                  <div className="text-base font-bold text-white">
                    {scanResult.data.husbandName} & {scanResult.data.wifeName} {scanResult.data.surname}
                  </div>
                  <span className="text-xs text-slate-300 block">
                    કપલ પ્રવેશ: <strong className="text-emerald-400">માન્ય (2 Persons)</strong>
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setScanResult(null);
                inputRef.current?.focus();
              }}
              className="w-full mt-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              બીજો પાસ સ્કેન કરો (Next Scan)
            </button>
          </div>
        )}

      </main>

      {/* Footer Info */}
      <footer className="max-w-xl mx-auto w-full text-center py-4 text-xs text-slate-500">
        The Divine Garbh Sanskar • Gate Scanner • 19 Dec 2026
      </footer>
    </div>
  );
}
