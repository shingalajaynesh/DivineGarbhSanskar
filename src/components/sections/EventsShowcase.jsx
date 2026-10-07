import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Heart, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

export default function EventsShowcase() {
  const { t } = useLanguage();
  const [liveEvent, setLiveEvent] = useState(null);

  useEffect(() => {
    // Attempt to fetch live event rates from local API if available
    fetch('/api/event')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setLiveEvent(data);
      })
      .catch(() => {
        // Fallback default info
      });
  }, []);

  const currentPrice = liveEvent?.liveRates?.currentPrice || 900;
  const activeTierName = liveEvent?.liveRates?.activeTier?.name || 'Early Bird Offer (પહેલા 50 કપલ)';
  const slotsLeft = liveEvent?.liveRates?.slotsLeftInTier ?? 50;

  return (
    <section className="relative py-24 bg-gradient-to-b from-softCream via-white to-softCream overflow-hidden border-b border-divineGold/15" id="events-section">
      <MandalaBg className="top-10 left-10 w-[550px] h-[550px] opacity-[0.035] text-divineGold pointer-events-none" />
      <MandalaBg className="bottom-10 right-10 w-[500px] h-[500px] opacity-[0.03] text-sacredMaroon pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Label & Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionLabel
            label={t({ hi: "लाइव कार्यक्रम एवं सेमिनार", en: "Upcoming Live Seminars", gu: "લાઈવ કાર્યક્રમો અને સેમિનાર" })}
            titleHi={t({
              hi: "आगामी विशेष कपल सेमिनार: दिव्य गर्भयात्रा",
              en: "Flagship Couple Seminar: Divya Garbh Yatra",
              gu: "આગામી વિશેષ કપલ સેમિનાર: દિવ્ય ગર્ભયાત્રા"
            })}
          />
          <p className="font-sans text-base md:text-lg text-templeBrown/80 mt-3 leading-relaxed">
            {t({
              hi: "माता और पिता दोनों की संयुक्त सहभागिता से गर्भस्थ शिशु में दिव्य संस्कारों का बीजारोपण करने का स्वर्णिम अवसर।",
              en: "A transformative, interactive couple workshop uniting parents in the sacred science of conscious prenatal parenting.",
              gu: "માતા અને પિતા બંનેની સંયુક્ત ભાગીદારીથી ગર્ભસ્થ શિશુમાં દિવ્ય સંસ્કારોનું સિંચન કરવાની અમૂલ્ય તક."
            })}
          </p>
        </div>

        {/* Master Showcase Card - ekdujekeliye Latest Clean Luxury Design */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-[#FFFDF9] to-[#FFF9F2] border-2 border-amber-200/80 shadow-2xl text-stone-900 p-6 sm:p-10 lg:p-12">
          
          {/* Subtle Warm Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>વિશેષ કપલ સેમિનાર • COUPLE SEMINAR</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  19 December 2026, શનિવાર
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#D97706] leading-tight">
                  દિવ્ય ગર્ભયાત્રા
                </h3>
                <p className="font-sans text-sm sm:text-base text-stone-600 mt-2 italic leading-relaxed font-normal">
                  "પ્રેમ, સંસ્કાર અને સમર્પણની અનોખી સફર — ગર્ભાવસ્થા દરમિયાન માતા-પિતાની દિવ્ય ભાગીદારી"
                </p>
              </div>

              {/* Event Meta Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm">
                <div className="flex items-center gap-3 bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-xs">
                  <Calendar className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <span className="text-stone-500 text-[11px] block font-medium">તારીખ & વાર</span>
                    <strong className="text-stone-900 font-bold">19 December 2026, શનિવાર</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-xs">
                  <Clock className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <span className="text-stone-500 text-[11px] block font-medium">સમય</span>
                    <strong className="text-stone-900 font-bold">રાત્રે 8:30 PM થી 12:00 PM</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-xs">
                  <MapPin className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <span className="text-stone-500 text-[11px] block font-medium">સ્થળ (Venue)</span>
                    <strong className="text-stone-900 font-bold">જમના બા ભવન, સુરત</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white border border-stone-200/90 rounded-2xl p-3.5 shadow-xs">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600 shrink-0" />
                  <div>
                    <span className="text-stone-500 text-[11px] block font-medium">પ્રવેશ સુવિધા</span>
                    <strong className="text-stone-900 font-bold">૧ પાસ = ૧ કપલ (૨ વ્યક્તિ)</strong>
                  </div>
                </div>
              </div>

              {/* Dynamic 50-Couple Rate Banner */}
              <div className="bg-gradient-to-r from-amber-50/90 via-rose-50/50 to-amber-50/90 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <span className="text-[11px] text-amber-900 font-extrabold block uppercase tracking-wider">
                    {activeTierName}
                  </span>
                  <div className="text-2xl font-black text-stone-900 mt-0.5">
                    હાલનો ભાવ: <span className="text-rose-700">₹{currentPrice}</span>
                    <span className="text-xs text-stone-600 font-normal ml-2">/ કપલ (બંને માટે)</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-rose-700 font-black block">
                    {slotsLeft > 0 ? `માત્ર ${slotsLeft} સ્લોટ બાકી` : 'સ્લોટ પૂર્ણ'}
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5 font-medium">
                    આ પછી સ્લેબ રેટ વધશે
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  to="/events/divy-garbhyatra"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold text-sm md:text-base shadow-lg shadow-rose-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>કપલ પાસ બુક કરો (Book Couple Pass)</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>

                <Link
                  to="/events"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-xs md:text-sm text-center transition-all"
                >
                  ઇવેન્ટ વિગતો જુઓ
                </Link>
              </div>

            </div>

            {/* Right Column: Speaker Showcase (Nehal Gadhavi) in ekdujekeliye Host Card Style */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm bg-white border border-stone-200/90 rounded-3xl p-6 md:p-7 text-center space-y-4 shadow-xl relative">
                
                {/* Speaker Portrait in Clean Luxury Rounded Frame */}
                <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-stone-200 shadow-md">
                  <img
                    src="/events/divy-garbhyatra/nehal-gadhavi.jpg"
                    alt="નેહલ ગઢવી"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold uppercase tracking-widest inline-block">
                    મુખ્ય વક્તા (Keynote Speaker)
                  </span>
                  <h4 className="text-2xl font-black text-stone-900">
                    નેહલ ગઢવી (Nehal Gadhavi)
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    ખ્યાતનામ Life Coach & Garbh Sanskar Expert • હજારો યુવા દંપતીઓને વૈદિક માતૃત્વ અને પિતૃત્વ માટે પ્રેરિત કરનાર
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-around text-xs">
                  <div>
                    <span className="font-extrabold text-stone-900 block">૨૫૦ કપલ</span>
                    <span className="text-[10px] text-stone-500 font-medium">મર્યાદિત ક્ષમતા</span>
                  </div>
                  <div className="w-px h-8 bg-stone-200" />
                  <div>
                    <span className="font-extrabold text-emerald-700 block">સુરક્ષા & QR</span>
                    <span className="text-[10px] text-stone-500 font-medium">ડિજિટલ એન્ટ્રી પાસ</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
