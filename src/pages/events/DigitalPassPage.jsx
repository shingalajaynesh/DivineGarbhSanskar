import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Heart, Download, Share2, Calendar, Clock, MapPin, 
  CheckCircle2, AlertCircle, Clock3, ArrowLeft, RefreshCw, Phone
} from 'lucide-react';
import { generateDigitalPassCanvas } from './canvasPassGenerator';

const API_BASE = '/api';
const ADMIN_WHATSAPP = '919586979897';

export default function DigitalPassPage() {
  const { inquiryId } = useParams();

  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatingCanvas, setGeneratingCanvas] = useState(false);

  const canvasRef = useRef(null);

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

  // When registration is loaded and status is approved, generate canvas
  useEffect(() => {
    if (!registration || registration.status !== 'approved' || !canvasRef.current) return;

    setGeneratingCanvas(true);
    generateDigitalPassCanvas(canvasRef.current, registration)
      .catch((err) => console.error('Error drawing digital pass canvas:', err))
      .finally(() => setGeneratingCanvas(false));
  }, [registration]);

  // Download high-resolution PNG
  const handleDownloadPass = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `Divya_Garbh_Yatra_${registration.surname}_${registration.husbandName}_Pass.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp share
  const handleShareWhatsApp = () => {
    if (!registration) return;
    const shareUrl = window.location.href;
    const text = encodeURIComponent(
      `નમસ્તે! આ રહ્યો મારો "દિવ્ય ગર્ભયાત્રા" કપલ સેમિનારનો ઓફિશિયલ એન્ટ્રી પાસ:\n` +
      `પાસ ID: ${registration.inquiryId}\n` +
      `કપલ: ${registration.husbandName} & ${registration.wifeName} ${registration.surname}\n` +
      `તારીખ: 19 December 2026, શનિવાર\n` +
      `સ્થળ: જમના બા ભવન, સુરત\n` +
      `પાસ લિંક: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans relative overflow-x-hidden py-10 px-4">
      <Helmet>
        <title>{registration ? `ડિજિટલ પાસ (${registration.inquiryId}) - દિવ્ય ગર્ભયાત્રા` : 'ડિજિટલ એન્ટ્રી પાસ - દિવ્ય ગર્ભયાત્રા'}</title>
      </Helmet>

      {/* Header bar */}
      <div className="max-w-xl mx-auto mb-6 flex items-center justify-between">
        <Link
          to="/events/divy-garbhyatra"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ઇવેન્ટ પેજ પર પાછા જાઓ</span>
        </Link>

        <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
          ID: {inquiryId?.toUpperCase()}
        </span>
      </div>

      {/* Main Card */}
      <div className="max-w-xl mx-auto">
        {loading ? (
          <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-4 shadow-xl">
            <RefreshCw className="w-8 h-8 text-rose-600 animate-spin mx-auto" />
            <p className="text-sm text-stone-600 font-medium">પાસ વિગતો લોડ થઈ રહી છે...</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-rose-200 rounded-3xl p-8 text-center space-y-4 shadow-xl">
            <AlertCircle className="w-12 h-12 text-rose-600 mx-auto" />
            <h2 className="text-xl font-extrabold text-stone-900">પાસ મળ્યો નથી</h2>
            <p className="text-xs text-stone-600">{error}</p>
            <Link
              to="/events/divy-garbhyatra"
              className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 hover:brightness-105 transition-all"
            >
              નવું રજીસ્ટ્રેશન કરો
            </Link>
          </div>
        ) : registration && (
          <div className="space-y-6">

            {/* STATUS BANNER */}
            {registration.status === 'approved' ? (
              <div className="bg-white border-2 border-emerald-500/60 rounded-3xl p-5 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-700 font-extrabold block uppercase tracking-wider">
                      Pass Status: APPROVED
                    </span>
                    <span className="text-sm font-bold text-stone-900">
                      તમારો એન્ટ્રી પાસ કન્ફર્મ થઈ ગયો છે!
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleDownloadPass}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ડાઉનલોડ</span>
                </button>
              </div>
            ) : registration.status === 'rejected' ? (
              <div className="bg-white border-2 border-rose-400 rounded-3xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] text-rose-700 font-extrabold block uppercase tracking-wider">
                      Pass Status: REJECTED
                    </span>
                    <span className="text-sm font-bold text-stone-900">
                      આ રજીસ્ટ્રેશન મંજૂર થયેલ નથી.
                    </span>
                  </div>
                </div>
                {registration.rejectionReason && (
                  <p className="text-xs text-rose-800 bg-rose-50 p-3 rounded-xl border border-rose-200 font-medium">
                    કારણ: {registration.rejectionReason}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                    <Clock3 className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] text-amber-800 font-extrabold block uppercase tracking-wider">
                      Pass Status: PENDING VERIFICATION
                    </span>
                    <span className="text-sm font-bold text-stone-900">
                      પેમેન્ટ વેરિફિકેશન પ્રક્રિયા હેઠળ છે
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  અમારી એડમિન ટીમ દ્વારા તમારી પેમેન્ટ રિસીપ્ટ ચકાસવામાં આવી રહી છે. વેરિફિકેશન પૂર્ણ થતાં જ અહીં તમારો ઓફિશિયલ QR પાસ આપોઆપ જનરેટ થશે.
                </p>
                <div className="pt-1 flex items-center gap-3">
                  <button
                    onClick={fetchPassData}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>સ્ટેટસ રિફ્રેશ કરો</span>
                  </button>
                  <a
                    href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(`નમસ્તે, મારો પાસ ID ${registration.inquiryId} વેરિફિકેશન માટે પેન્ડિંગ છે. કૃપા કરીને તપાસ કરશો.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp હેલ્પલાઇન</span>
                  </a>
                </div>
              </div>
            )}

            {/* CANVAS TICKET RENDER (Only visible and drawn when approved) */}
            {registration.status === 'approved' && (
              <div className="space-y-4">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-white">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto block"
                    style={{ maxHeight: '820px' }}
                  />
                  {generatingCanvas && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center text-stone-900 text-xs font-bold">
                      પાસ જનરેટ થઈ રહ્યો છે...
                    </div>
                  )}
                </div>

                {/* Download and Share Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleDownloadPass}
                    className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-600/25 active:scale-95 transition-all"
                  >
                    <Download className="w-4 h-4 stroke-[3]" />
                    <span>પાસ ડાઉનલોડ કરો (PNG)</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>WhatsApp પર શેર કરો</span>
                  </button>
                </div>
              </div>
            )}

            {/* Couple Registration Summary Card */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-6 space-y-3 text-xs shadow-xl">
              <h3 className="font-extrabold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-2">
                નોંધણી સારાંશ (Registration Summary)
              </h3>
              <div className="grid grid-cols-2 gap-3 text-stone-600">
                <div>
                  <span className="text-stone-400 block text-[11px]">પતિનું નામ:</span>
                  <span className="font-bold text-stone-900 text-sm">{registration.husbandName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">પત્નીનું નામ:</span>
                  <span className="font-bold text-stone-900 text-sm">{registration.wifeName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">અટક:</span>
                  <span className="font-bold text-stone-900 text-sm">{registration.surname}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">મોબાઇલ:</span>
                  <span className="font-bold text-stone-900 text-sm">{registration.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">સ્લેબ / રકમ:</span>
                  <span className="font-bold text-rose-700 text-sm">₹{registration.amount} ({registration.tierName})</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">ગેટ એન્ટ્રી સ્ટેટસ:</span>
                  <span className={`font-bold text-sm ${registration.attendance?.checkedIn ? 'text-emerald-600' : 'text-stone-500'}`}>
                    {registration.attendance?.checkedIn ? 'ADMITTED (હાજર)' : 'પ્રવેશ બાકી'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
