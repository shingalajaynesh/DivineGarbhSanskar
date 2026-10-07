import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, Clock, MapPin, Sparkles, ArrowRight, Heart, 
  Search, ShieldCheck, CheckCircle2, Award, Users, BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionLabel from '../components/ui/SectionLabel';
import MandalaBg from '../components/ui/MandalaBg';

export default function EventsHub() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [passInquiryId, setPassInquiryId] = useState('');

  const handleSearchPass = (e) => {
    e.preventDefault();
    if (!passInquiryId.trim()) return;
    navigate(`/pass/${encodeURIComponent(passInquiryId.trim())}`);
  };

  return (
    <div className="relative pt-36 sm:pt-40 pb-20 bg-gradient-to-b from-softCream via-white to-softCream text-templeBrown overflow-hidden">
      <Helmet>
        <title>ઇવેન્ટ્સ અને સેમિનાર | Events & Seminars | The Divine Garbh Sanskar</title>
        <meta name="description" content="The Divine Garbh Sanskar દ્વારા આયોજિત વિશેષ કપલ સેમિનાર અને પ્રિનેટલ વર્કશોપ્સ. દિવ્ય ગર્ભયાત્રા - 19 December 2026, સુરત. બુક કરો તમારો પાસ." />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/events" />
      </Helmet>

      <MandalaBg className="top-20 left-10 w-[600px] h-[600px] opacity-[0.035] text-divineGold pointer-events-none" />
      <MandalaBg className="bottom-20 right-10 w-[550px] h-[550px] opacity-[0.03] text-sacredMaroon pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-vermillion font-bold text-xs md:text-sm tracking-wider mb-3 uppercase bg-vermillion/5 px-4 py-1.5 rounded-full border border-vermillion/15 inline-block">
            {t({ hi: "लाइव कार्यक्रम एवं कार्यशालाएं", en: "Live Events & Seminars Portal", gu: "લાઈવ કાર્યક્રમો અને સેમિનાર પોર્ટલ" })}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sacredMaroon font-extrabold leading-tight">
            {t({
              hi: "दिव्य गर्भ संस्कार इवेंट्स एवं सेमिनार",
              en: "Divine Garbh Sanskar Events & Workshops",
              gu: "દિવ્ય ગર્ભ સંસ્કાર ઇવેન્ટ્સ અને સેમિનાર"
            })}
          </h1>
          <p className="font-sans text-base md:text-lg text-templeBrown/80 mt-4 leading-relaxed">
            {t({
              hi: "गर्भावस्था के दौरान माता-पिता के लिए विशेष रूप से तैयार किए गए लाइव सेमिनार, व्यावहारिक सत्र और दिव्य अनुभव।",
              en: "Transformative offline couple seminars and interactive workshops designed to nurture your baby's divine potential.",
              gu: "ગર્ભાવસ્થા દરમિયાન માતા-પિતા માટે ખાસ આયોજિત લાઈવ સેમિનાર, વ્યવહારુ સત્રો અને દિવ્ય અનુભવો."
            })}
          </p>
        </div>

        {/* ========================================================
            FEATURED LIVE EVENT CARD: DIVYA GARBH YATRA (ekdujekeliye Clean Luxury Style)
        ======================================================== */}
        <div className="mb-16 bg-gradient-to-br from-white via-[#FFFDF9] to-[#FFF9F2] rounded-3xl border-2 border-amber-200/80 p-6 sm:p-10 lg:p-12 text-stone-900 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider shadow-xs">
                  આગામી મુખ્ય ઇવેન્ટ (Featured Event)
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  19 December 2026, શનિવાર
                </span>
              </div>

              <div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#D97706]">
                  દિવ્ય ગર્ભયાત્રા (Divya Garbh Yatra)
                </h2>
                <p className="text-stone-600 text-sm sm:text-base mt-2 italic font-normal">
                  "પ્રેમ, સંસ્કાર અને સમર્પણની અનોખી સફર — એક વિશેષ કપલ સેમિનાર"
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm pt-1">
                <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-xs">
                  <span className="text-stone-500 block text-[11px] font-medium">તારીખ & વાર</span>
                  <strong className="text-stone-900 font-bold">19 Dec 2026, શનિવાર</strong>
                </div>
                <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-xs">
                  <span className="text-stone-500 block text-[11px] font-medium">સમય</span>
                  <strong className="text-stone-900 font-bold">રાત્રે 8:30 થી 12:00 PM</strong>
                </div>
                <div className="bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-xs">
                  <span className="text-stone-500 block text-[11px] font-medium">સ્થળ (Venue)</span>
                  <strong className="text-stone-900 font-bold">જમના બા ભવન, સુરત</strong>
                </div>
              </div>

              {/* Speaker highlight in ekdujekeliye Host Card Style */}
              <div className="flex items-center gap-4 bg-white border border-stone-200/90 rounded-2xl p-4 text-xs shadow-md">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-stone-200 shadow-sm shrink-0">
                  <img
                    src="/events/divy-garbhyatra/nehal-gadhavi.jpg"
                    alt="નેહલ ગઢવી"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-rose-700 font-bold uppercase tracking-widest block">મુખ્ય વક્તા (Key Speaker)</span>
                  <strong className="text-stone-900 font-black text-sm md:text-base">નેહલ ગઢવી (Life Coach & Expert)</strong>
                  <span className="text-[11px] text-stone-600 block mt-0.5 font-medium">હજારો યુવા દંપતીઓને વૈદિક માતૃત્વ માટે પ્રેરિત કરનાર</span>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  to="/events/divy-garbhyatra"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-sm md:text-base shadow-lg shadow-rose-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>કપલ રજીસ્ટ્રેશન કરો (Register Now)</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>

                <Link
                  to="/events/divy-garbhyatra"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-xs md:text-sm text-center transition-all"
                >
                  ૫૦-કપલ સ્લેબ રેટ્સ જુઓ
                </Link>
              </div>
            </div>

            {/* Right Highlights Column */}
            <div className="lg:col-span-4 bg-stone-50/90 border border-stone-200/90 rounded-2xl p-6 space-y-4 text-xs text-stone-700 shadow-sm">
              <span className="text-stone-900 font-black uppercase tracking-wider block text-[11px] border-b border-stone-200 pb-2">
                ઇવેન્ટની મુખ્ય વિશેષતાઓ
              </span>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>ગર્ભાવસ્થામાં પિતાની સક્રિય ભૂમિકા અને ગર્ભ સંવાદ ટેકનીક</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>રાગ સંગીત ચિકિત્સા અને ભાવનાત્મક સંતુલન</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>હકારાત્મક ગર્ભ સંસ્કાર દ્વારા શિશુના મગજનો શ્રેષ્ઠ વિકાસ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>ઓનલાઇન QR ડિજિટલ પાસ અને ગેટ વેરિફિકેશન સિસ્ટમ</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-stone-200 text-center">
                <span className="text-[11px] text-rose-700 font-extrabold block">
                  મર્યાદિત ૨૫૦ કપલ સીટો ઉપલબ્ધ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            DIGITAL PASS RETRIEVAL TOOL
        ======================================================== */}
        <div className="max-w-2xl mx-auto mb-16 bg-white border-2 border-divineGold/30 rounded-2xl p-6 sm:p-8 shadow-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-sacredMaroon/10 text-sacredMaroon mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-sacredMaroon">
            તમારો ડિજિટલ એન્ટ્રી પાસ શોધો (Find Your Pass)
          </h3>
          <p className="text-xs sm:text-sm text-templeBrown/70 max-w-md mx-auto">
            જો તમે અગાઉ રજીસ્ટ્રેશન કર્યું હોય, તો તમારો ઇન્ક્વાયરી આઈડી (દા.ત. CPL-1001) નાખીને પાસ ડાઉનલોડ કરો.
          </p>

          <form onSubmit={handleSearchPass} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="text"
              required
              value={passInquiryId}
              onChange={(e) => setPassInquiryId(e.target.value)}
              placeholder="CPL-1001 દાખલ કરો..."
              className="flex-1 bg-softCream border border-divineGold/40 rounded-xl px-4 py-3 text-sacredMaroon font-mono text-sm focus:outline-none focus:border-vermillion"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-sacredMaroon text-white font-bold text-xs hover:bg-vermillion transition-colors"
            >
              પાસ જુઓ (View Pass)
            </button>
          </form>
        </div>

        {/* ========================================================
            UPCOMING CITY TOURS & FUTURE WORKSHOPS ROADMAP
        ======================================================== */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sacredMaroon">
              આગામી સિટી ટૂર્સ અને સેમિનાર (Upcoming Tours)
            </h3>
            <p className="text-xs sm:text-sm text-templeBrown/70 mt-1">
              ગુજરાતના વિવિધ શહેરોમાં ટૂંક સમયમાં યોજાનાર વૈદિક ગર્ભ સંસ્કાર કપલ કાર્યક્રમો
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-divineGold/30 rounded-2xl p-6 space-y-3 shadow-md hover:border-divineGold transition-all">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 uppercase">
                સુરત (Surat) • Ongoing
              </span>
              <h4 className="font-bold text-lg text-sacredMaroon">દિવ્ય ગર્ભયાત્રા સેમિનાર</h4>
              <p className="text-xs text-templeBrown/80">
                ૧૯ ડિસેમ્બર ૨૦૨૬ • જમના બા ભવન, સુરત. લાઈવ બુકિંગ ચાલુ છે.
              </p>
              <Link to="/events/divy-garbhyatra" className="text-xs font-bold text-vermillion hover:underline inline-flex items-center gap-1">
                <span>બુક કરો</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white border border-divineGold/30 rounded-2xl p-6 space-y-3 shadow-md opacity-85">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 uppercase">
                અમદાવાદ (Ahmedabad) • Coming Soon
              </span>
              <h4 className="font-bold text-lg text-sacredMaroon">મેગા કપલ સેમિનાર (Phase 2)</h4>
              <p className="text-xs text-templeBrown/80">
                અમદાવાદમાં યોજાનાર વિશેષ કપલ સેમિનાર. તારીખો ટૂંક સમયમાં જાહેર થશે.
              </p>
              <span className="text-xs text-slate-500 block">રજીસ્ટ્રેશન ટૂંક સમયમાં ખુલશે</span>
            </div>

            <div className="bg-white border border-divineGold/30 rounded-2xl p-6 space-y-3 shadow-md opacity-85">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 uppercase">
                રાજકોટ (Rajkot) • Coming Soon
              </span>
              <h4 className="font-bold text-lg text-sacredMaroon">સૌરાષ્ટ્ર કપલ વર્કશોપ</h4>
              <p className="text-xs text-templeBrown/80">
                રાજકોટ અને સૌરાષ્ટ્રના યુવા દંપતીઓ માટે વિશેષ ગર્ભ સંસ્કાર પરિસંવાદ.
              </p>
              <span className="text-xs text-slate-500 block">રજીસ્ટ્રેશન ટૂંક સમયમાં ખુલશે</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
