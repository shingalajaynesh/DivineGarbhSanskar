import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import QRCode from 'qrcode';
import {
  Download, Share2, Calendar, Clock, MapPin,
  CheckCircle2, AlertCircle, Clock3, RefreshCw, Phone,
  Copy, CheckCheck, ExternalLink, Printer, ShieldCheck,
  User, Sparkles, Navigation
} from 'lucide-react';
import { generateDigitalPassCanvas } from './canvasPassGenerator';
import { API_BASE } from '../../utils/apiConfig';

const ADMIN_WHATSAPP = '919586979897';
const VENUE_MAPS_URL = 'https://maps.google.com/?q=Jamna+Baa+Bhavan+Surat';

export default function DigitalPassPage() {
  const { inquiryId } = useParams();

  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const hiddenCanvasRef = useRef(null);

  // Fetch Registration Status
  const fetchPassData = async () => {
    if (!inquiryId) return;
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/status/${encodeURIComponent(inquiryId.trim())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setRegistration(json.data);
      } else {
        setError(json.error || 'આ ઇન્ક્વાયરી આઈડીનો કોઈ પાસ મળ્યો નથી.');
      }
    } catch (err) {
      console.error('Error fetching pass details:', err);
      setError('સર્વર સાથે જોડાણ થઈ શક્યું નથી. કૃપા કરીને થોડીવાર પછી પ્રયાસ કરો.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassData();
  }, [inquiryId]);

  // Generate High-DPI QR Code for Gate Scanner
  useEffect(() => {
    if (!registration?.inquiryId) return;
    QRCode.toDataURL(registration.inquiryId.trim().toUpperCase(), {
      margin: 1,
      width: 220,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      }
    }).then(url => setQrDataUrl(url)).catch(() => {});
  }, [registration?.inquiryId]);

  // Download High-Resolution Pass PNG
  const handleDownloadPass = async () => {
    if (!registration || !hiddenCanvasRef.current) return;
    setDownloading(true);
    try {
      await generateDigitalPassCanvas(hiddenCanvasRef.current, registration);
      const dataUrl = hiddenCanvasRef.current.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Divya_Garbh_Yatra_Pass_${registration.inquiryId}_${registration.surname}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating download pass:', err);
      alert('પાસ ડાઉનલોડ કરવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.');
    } finally {
      setDownloading(false);
    }
  };

  // WhatsApp Share
  const handleShareWhatsApp = () => {
    if (!registration) return;
    const shareUrl = window.location.href;
    const text = encodeURIComponent(
      `🙏 નમસ્તે! આ રહ્યો મારો "દિવ્ય ગર્ભયાત્રા" કપલ સેમિનારનો ઓફિશિયલ એન્ટ્રી પાસ:\n\n` +
      `🎟️ પાસ ID: ${registration.inquiryId}\n` +
      `💑 કપલ: ${registration.husbandName} & ${registration.wifeName} ${registration.surname}\n` +
      `📅 તારીખ: 19 December 2026, શનિવાર (રાત્રે 8:30 PM)\n` +
      `📍 સ્થળ: જમના બા ભવન, સુરત\n\n` +
      `પાસ લિંક: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Copy Pass ID
  const handleCopyId = () => {
    if (!registration?.inquiryId) return;
    navigator.clipboard.writeText(registration.inquiryId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Print Pass
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans py-6 sm:py-10 px-4 print:p-0 print:bg-white">
      <Helmet>
        <title>{registration ? `VIP પાસ (${registration.inquiryId}) - દિવ્ય ગર્ભયાત્રા` : 'ડિજિટલ એન્ટ્રી પાસ - દિવ્ય ગર્ભયાત્રા'}</title>
      </Helmet>

      {/* Hidden canvas for offscreen high-res PNG export */}
      <canvas ref={hiddenCanvasRef} className="hidden" />

      {/* Top Navigation Bar (Hidden in Print) */}
      <div className="max-w-xl mx-auto mb-5 flex items-center justify-between print:hidden">
        <Link
          to="/events/divy-garbhyatra"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <img
            src="/logo.jpg"
            alt="Divine Logo"
            className="w-7 h-7 rounded-full object-contain border border-slate-200 p-0.5 bg-white shadow-2xs"
          />
          <span>← સેમિનાર પેજ</span>
        </Link>

        {registration?.inquiryId && (
          <button
            type="button"
            onClick={handleCopyId}
            className="text-xs font-mono font-semibold text-slate-700 bg-white hover:bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
            title="Click to copy ID"
          >
            <span>{registration.inquiryId}</span>
            {copiedId ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-xl mx-auto">
        {loading ? (
          /* Loading State */
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-sm">
            <RefreshCw className="w-7 h-7 text-slate-600 animate-spin mx-auto" />
            <h3 className="text-sm font-semibold text-slate-800">પાસ વિગતો લોડ થઈ રહી છે...</h3>
            <p className="text-xs text-slate-400">કૃપા કરીને થોડી ક્ષણ રાહ જુઓ</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900">પાસ મળ્યો નથી</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">{error}</p>
            <Link
              to="/events/divy-garbhyatra"
              className="inline-block px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-2xs"
            >
              નવું રજીસ્ટ્રેશન કરો
            </Link>
          </div>
        ) : registration && (
          <div className="space-y-5">
            {/* ========================================================
                1. STATUS BANNER
            ======================================================== */}
            {registration.status === 'approved' ? (
              <div className="bg-white border border-emerald-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-2xs print:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 font-bold block uppercase tracking-wider">
                      CONFIRMED VIP ENTRY PASS
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      તમારો એન્ટ્રી પાસ સફળતાપૂર્વક કન્ફર્મ થયેલ છે
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPass}
                  disabled={downloading}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer shrink-0 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{downloading ? 'ડાઉનલોડ...' : 'ડાઉનલોડ'}</span>
                </button>
              </div>
            ) : registration.status === 'rejected' ? (
              <div className="bg-white border border-red-200 rounded-2xl p-4 space-y-2.5 shadow-2xs print:hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-red-700 font-bold uppercase tracking-wider block">
                      Pass Status: REJECTED
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      આ રજીસ્ટ્રેશન મંજૂર થયેલ નથી
                    </span>
                  </div>
                </div>
                {registration.rejectionReason && (
                  <p className="text-xs text-red-800 bg-red-50 p-2.5 rounded-xl border border-red-200">
                    કારણ: {registration.rejectionReason}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white border border-amber-300 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs print:hidden">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                    <Clock3 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">
                      VERIFICATION IN PROGRESS
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      પેમેન્ટ વેરિફિકેશન પ્રક્રિયા હેઠળ છે
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  અમારી એડમિન ટીમ દ્વારા તમારી પેમેન્ટ રિસીપ્ટ ચકાસવામાં આવી રહી છે. વેરિફિકેશન પૂર્ણ થતાં જ અહીં તમારો ઓફિશિયલ QR પાસ ઉપલબ્ધ થઈ જશે.
                </p>
                <div className="pt-1 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={fetchPassData}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>સ્ટેટસ રિફ્રેશ કરો</span>
                  </button>
                  <a
                    href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`નમસ્તે, મારો પાસ ID ${registration.inquiryId} વેરિફિકેશન માટે પેન્ડિંગ છે. કૃપા કરીને તપાસ કરશો.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp હેલ્પલાઇન</span>
                  </a>
                </div>
              </div>
            )}

            {/* ========================================================
                2. LUXURY VIP DIGITAL TICKET CARD (PIXEL-PERFECT HTML/CSS)
                Crisp on all mobile/retina screens, authentic boarding pass look
            ======================================================== */}
            {registration.status === 'approved' && (
              <div className="space-y-4">
                <div className="relative bg-white border border-amber-300/80 rounded-3xl shadow-lg overflow-hidden print:border-2 print:border-slate-800 print:shadow-none">
                  
                  {/* Decorative Luxury Top Bar */}
                  <div className="h-2 bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500" />

                  {/* Ticket Upper Section: Event Branding & Couple Spotlight */}
                  <div className="p-5 sm:p-6 space-y-5">
                    {/* Event Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/logo.jpg"
                          alt="Divine Logo"
                          className="w-10 h-10 rounded-full object-contain p-0.5 bg-white border border-amber-300 shadow-2xs"
                        />
                        <div>
                          <span className="text-[11px] font-bold text-slate-800 tracking-wider block font-serif uppercase">
                            The Divine Garbh Sanskar
                          </span>
                          <span className="text-[10px] text-amber-800 font-semibold block">
                            સેમિનાર • અધિકૃત એન્ટ્રી પાસ
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">PASS ID</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md inline-block">
                          {registration.inquiryId}
                        </span>
                      </div>
                    </div>

                    {/* Program Title Banner */}
                    <div className="text-center space-y-1">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
                        Live Seminar • Jamna Baa Bhavan
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
                        દિવ્ય ગર્ભયાત્રા
                      </h1>
                      <p className="text-xs text-slate-500 font-medium">
                        પ્રેમ, સંસ્કાર અને સમર્પણની અનોખી સફર
                      </p>
                    </div>

                    {/* Couple Portrait & Name */}
                    <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
                      {/* Couple Photo Container with Luxury Gold Ring */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-50 border-2 border-amber-400 p-1 shadow-md">
                        {registration.couplePhoto ? (
                          <img
                            src={registration.couplePhoto}
                            alt="Couple"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-amber-50 flex items-center justify-center font-bold text-amber-900 text-2xl">
                            {registration.husbandName?.charAt(0)}{registration.wifeName?.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Couple Full Name */}
                      <div className="space-y-1">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-serif uppercase">
                          {registration.husbandName} &amp; {registration.wifeName} {registration.surname}
                        </h2>
                        
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>ADMIT 1 COUPLE (2 PERSONS)</span>
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            • પાસ કન્ફર્મ
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key Logistics Grid */}
                    <div className="grid grid-cols-2 gap-3 bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/80 text-xs">
                      {/* Date */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-rose-700" />
                          <span>તારીખ (Date)</span>
                        </span>
                        <strong className="text-slate-900 block text-xs sm:text-sm font-bold">
                          19 Dec 2026, શનિવાર
                        </strong>
                      </div>

                      {/* Time */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                          <Clock className="w-3 h-3 text-rose-700" />
                          <span>સમય (Time)</span>
                        </span>
                        <strong className="text-slate-900 block text-xs sm:text-sm font-bold">
                          8:30 PM (ગેટ 7:45 PM)
                        </strong>
                      </div>

                      {/* Venue */}
                      <div className="space-y-0.5 col-span-2 pt-1 border-t border-slate-200/60">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-700" />
                          <span>સ્થળ (Venue)</span>
                        </span>
                        <strong className="text-slate-900 block text-xs sm:text-sm font-bold">
                          જમના બા ભવન, સુરત (Jamna Baa Bhavan)
                        </strong>
                      </div>

                      {/* Speaker */}
                      <div className="space-y-0.5 col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block">
                            મુખ્ય વક્તા (Key Speaker)
                          </span>
                          <strong className="text-rose-900 block text-xs sm:text-sm font-bold">
                            નેહલ ગઢવી (Life Coach &amp; Expert)
                          </strong>
                        </div>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {registration.tierName || 'Confirmed Pass'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================
                      AUTHENTIC TICKET PERFORATION & NOTCHES
                  ======================================================== */}
                  <div className="relative py-2">
                    {/* Left Notched Semicircle */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F8FAFC] border-r border-amber-300/80 shadow-inner" />
                    
                    {/* Right Notched Semicircle */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#F8FAFC] border-l border-amber-300/80 shadow-inner" />

                    {/* Dashed Tear Line */}
                    <div className="border-t-2 border-dashed border-slate-300 mx-5" />
                  </div>

                  {/* Ticket Lower Stub: Gate QR Code & Verification */}
                  <div className="p-5 sm:p-6 bg-slate-50/50 space-y-4 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      ગેટ એન્ટ્રી સ્કેનર QR કોડ (GATE ENTRY QR)
                    </span>

                    {/* Gate QR Code */}
                    <div className="inline-block p-2.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      {qrDataUrl ? (
                        <img
                          src={qrDataUrl}
                          alt="Gate QR Code"
                          className="w-36 h-36 sm:w-40 sm:h-40 object-contain mx-auto"
                        />
                      ) : (
                        <div className="w-36 h-36 flex items-center justify-center text-xs text-slate-400">
                          QR Loading...
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 max-w-sm mx-auto">
                      <p className="text-xs font-semibold text-slate-800">
                        સેમિનાર હોલમાં પ્રવેશ મેળવવા માટે આ QR કોડ ગેટ પર બતાવો.
                      </p>
                      <p className="text-[11px] text-slate-400">
                        ગેટ પર સ્કેન થતાં જ કપલનું ડિજિટલ એડમિશન કન્ફર્મ થશે.
                      </p>
                    </div>

                    {/* Attendance Verification Indicator */}
                    <div className="pt-1">
                      {registration.attendance?.checkedIn ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>ગેટ પર પ્રવેશ પૂર્ણ (ADMITTED)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>વેરિફાઇડ એન્ટ્રી પાસ (ACTIVE TICKET)</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    3. CLEAN ACTION BAR (Download, Share, Maps, Print)
                ======================================================== */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 print:hidden">
                  {/* Download PNG */}
                  <button
                    type="button"
                    onClick={handleDownloadPass}
                    disabled={downloading}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloading ? 'સેવિંગ...' : 'ડાઉનલોડ'}</span>
                  </button>

                  {/* Share on WhatsApp */}
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  {/* Google Maps Venue Directions */}
                  <a
                    href={VENUE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-rose-700" />
                    <span>સ્થળ દિશા (Maps)</span>
                  </a>

                  {/* Print Pass */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span>પ્રિન્ટ (Print)</span>
                  </button>
                </div>

                {/* Important Guidelines Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 text-xs shadow-2xs print:hidden">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>સેમિનાર પ્રવેશ નિયમો (Entry Instructions)</span>
                  </h4>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px] leading-relaxed">
                    <li>આ ૧ ડિજિટલ પાસ પતિ-પત્ની (બંને વ્યક્તિ) માટે માન્ય છે.</li>
                    <li>ગેટ પર એન્ટ્રી સમયે આ પેજનો QR કોડ અથવા ડાઉનલોડ કરેલ પાસ બતાવવાનો રહેશે.</li>
                    <li>સેમિનાર સમયસર રાત્રે ૮:૩૦ કલાકે શરૂ થશે, જેથી ૭:૪૫ વાગ્યા સુધીમાં પહોંચી જવા નમ્ર વિનંતી.</li>
                    <li>કોઈપણ પ્રશ્ન હોય તો હેલ્પલાઇન <strong>+91 95869 79897</strong> પર સંપર્ક કરો.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
