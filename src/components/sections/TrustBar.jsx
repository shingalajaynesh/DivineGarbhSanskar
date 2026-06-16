import React from 'react';
import Marquee from 'react-fast-marquee';
import { useLanguage } from '../../context/LanguageContext';

const TrustBar = () => {
  const { t } = useLanguage();

  const mediaList = [
    {
      name: "Times of India",
      font: "font-serif tracking-tighter font-extrabold italic text-slate-800 text-sm sm:text-base",
      hi: "टाइम्स ऑफ इंडिया",
      gu: "ટાઇમ્સ ઓફ ઇન્ડિયા",
      tag: { en: "🏆 National Press", hi: "🏆 राष्ट्रीय समाचार", gu: "🏆 રાષ્ટ્રીય સમાચાર" }
    },
    {
      name: "Divya Bhaskar",
      font: "font-sans font-black text-[#E12B30] tracking-wide text-base sm:text-lg",
      hi: "दिव्य भास्कर",
      gu: "દિવ્ય ભાસ્કર",
      tag: { en: "📰 No. 1 Gujarati", hi: "📰 नं. १ गुजराती दैनिक", gu: "📰 નં. ૧ ગુજરાતી દૈનિક" }
    },
    {
      name: "Gujarat Samachar",
      font: "font-sans font-extrabold text-[#0D3B66] text-sm sm:text-base",
      hi: "गुजरात समाचार",
      gu: "ગુજરાત સમાચાર",
      tag: { en: "🌟 Trusted Media", hi: "🌟 विश्वसनीय दैनिक", gu: "🌟 વિશ્વસનીય દૈનિક" }
    },
    {
      name: "Dainik Bhaskar",
      font: "font-sans font-extrabold text-[#F47A20] tracking-tight text-sm sm:text-base",
      hi: "दैनिक भास्कर",
      gu: "દૈનિક ભાસ્કર",
      tag: { en: "📢 Leading Hindi", hi: "📢 अग्रणी हिंदी दैनिक", gu: "📢 અગ્રણી હિન્દી દૈનિક" }
    },
    {
      name: "VTV News",
      font: "font-sans font-black uppercase tracking-widest text-[#E63946] text-xs sm:text-sm",
      hi: "वीटीवी न्यूज़",
      gu: "વીટીવી ન્યૂઝ",
      tag: { en: "📺 Digital Network", hi: "📺 डिजिटल नेटवर्क", gu: "📺 ડિજિટલ નેટવર્ક" }
    },
    {
      name: "TV9 Gujarati",
      font: "font-sans font-black tracking-wider text-slate-700 text-sm sm:text-base",
      hi: "टीवी9 गुजराती",
      gu: "ટીવી૯ ગુજરાતી",
      tag: { en: "⚡ News Channel", hi: "⚡ न्यूज़ चैनल", gu: "⚡ ન્યૂઝ ચેનલ" }
    },
    {
      name: "Sandesh News",
      font: "font-sans font-extrabold text-[#31572C] text-sm sm:text-base",
      hi: "संदेश न्यूज़",
      gu: "સંદેશ ન્યૂઝ",
      tag: { en: "🎖️ Royal Legacy", hi: "🎖️ रॉयल लेगेसी", gu: "🎖️ રોયલ લેગેસી" }
    },
    {
      name: "Chitralekha",
      font: "font-serif italic font-extrabold text-[#5E503F] text-sm sm:text-base",
      hi: "चित्रलेखा",
      gu: "ચિત્રલેખા",
      tag: { en: "🎨 Weekly Mag", hi: "🎨 साप्ताहिक पत्रिका", gu: "🎨 સાપ્તાહિક પત્રિકા" }
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white via-softCream/10 to-white border-y border-divineGold/20 select-none relative overflow-hidden">
      
      {/* Decorative Subtle Glowing Background Light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-divineGold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-warmAmber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center relative z-10">
        <span className="font-accent text-xs font-bold text-sacredMaroon tracking-widest uppercase mb-2 block">
          ✦ {t({ hi: "प्रमाणित विश्वसनीयता", en: "Media Presence", gu: "મીડિયા પ્રમાણપત્ર" })} ✦
        </span>
        <h3 className="font-sans font-black text-2xl md:text-3xl text-templeBrown leading-snug">
          {t({
            hi: "प्रमुख समाचार पत्रों और मीडिया चैनलों में हमारा उल्लेख",
            en: "Featured Across Prominent Media Channels",
            gu: "મુખ્ય સમાચાર પત્રો અને મીડિયા ચેનલોમાં અમારો ઉલ્લેખ"
          })}
        </h3>
      </div>
      
      <div className="relative w-full z-10">
        <Marquee speed={35} gradient={true} gradientColor={[255, 254, 246]} pauseOnHover={true}>
          <div className="flex items-center gap-8 md:gap-10 px-8 py-2">
            {mediaList.map((media, index) => (
              <div 
                key={index} 
                className="relative p-[1.5px] rounded-2xl bg-gradient-to-b from-divineGold/50 via-divineGold/15 to-divineGold/50 hover:from-divineGold hover:to-warmAmber transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.03] group"
              >
                <div className="px-6 py-4 w-52 h-24 rounded-[14px] bg-white flex flex-col justify-between items-center relative overflow-hidden shadow-inner">
                  
                  {/* Decorative Traditional Corner Accents */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-divineGold/30 rounded-tl pointer-events-none" />
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-divineGold/30 rounded-tr pointer-events-none" />
                  <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-divineGold/30 rounded-bl pointer-events-none" />
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-divineGold/30 rounded-br pointer-events-none" />
                  
                  {/* Subtle Background Watermark */}
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 opacity-[0.03] text-divineGold pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="50" cy="50" r="40" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="25" />
                    </svg>
                  </div>

                  {/* Top Category Tag */}
                  <span className="text-[9px] font-accent font-bold tracking-wider text-templeBrown/60 uppercase">
                    {t(media.tag)}
                  </span>

                  {/* Centered Media Logotype */}
                  <div className="flex-grow flex items-center justify-center">
                    <span className={`select-none ${media.font}`}>
                      {t({
                        en: media.name,
                        hi: media.hi,
                        gu: media.gu
                      })}
                    </span>
                  </div>

                  {/* Bottom Accent line */}
                  <div className="w-10 h-[2px] bg-divineGold/40 rounded-full group-hover:w-20 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default TrustBar;
