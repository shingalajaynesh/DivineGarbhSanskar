import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import MandalaBg from '../ui/MandalaBg';

const FinalCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-gradient-to-r from-divineGold to-warmAmber border-y-2 border-divineGold/30 overflow-hidden text-sacredMaroon">
      
      {/* Background Watermark Mandala */}
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.06] text-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Call-to-action text and buttons */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-6">
            <span className="font-accent text-xs font-bold tracking-widest uppercase text-vermillion block">
              ✦ {t({ hi: "मातृत्व का दिव्य उपहार", en: "A Divine Gift of Motherhood", gu: "માતૃત્વની દિવ્ય ભેટ" })} ✦
            </span>
            
            <h2 className="font-devanagari text-3xl sm:text-5xl font-black leading-tight">
              {t({
                hi: "आज ही निःशुल्क परामर्श सत्र बुक करें",
                en: "Get Your Free Counselling Today",
                gu: "આજે જ મફત પરામર્શ બુક કરો"
              })}
            </h2>
            
            <p className="font-sans text-sm md:text-lg text-sacredMaroon/85 max-w-xl font-medium leading-relaxed">
              {t({
                hi: "हमारे वरिष्ठ गर्भ संस्कार सलाहकार आपकी मातृभाषा (हिंदी/गुजराती/अंग्रेजी) में व्यक्तिगत रूप से आपका मार्गदर्शन करेंगे।",
                en: "Our senior pregnancy experts will guide you personally in your native language (Hindi, Gujarati, or English).",
                gu: "અમારા વરિષ્ઠ ગર્ભ સંસ્કાર પરામર્શદાતા તમારી માતૃભાષા (હિન્દી/ગુજરાતી/અંગ્રેજી) માં વ્યક્તિગત રીતે તમારું માર્ગદર્શન કરશે."
              })}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
              {/* Call Now */}
              <a
                href="tel:+919638484545"
                className="px-8 py-4 bg-sacredMaroon text-white font-accent font-bold text-sm tracking-wider uppercase rounded-divine-md hover:bg-templeBrown shadow-lg flex items-center gap-2.5 transition-all animate-glow-pulse"
              >
                <Phone className="w-4.5 h-4.5" />
                <span>{t({ hi: "अभी बात करें", en: "Call Now", gu: "અત્યારે જ વાત કરો" })}</span>
              </a>

              {/* WhatsApp Us */}
              <a
                href="https://wa.me/919638484545?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20the%20Divine%20Garbh%20Sanskar%20program."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-white font-accent font-bold text-sm tracking-wider uppercase rounded-divine-md hover:bg-[#20ba5a] shadow-lg flex items-center gap-2.5 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>{t({ hi: "व्हाट्सएप करें", en: "WhatsApp Us", gu: "વોટ્સએપ કરો" })}</span>
              </a>
            </div>
          </div>

          {/* Right Side: Floating Baby Womb Illustration with Orbiting Icons */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px]">
            
            {/* Meditating sphere portal */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Rotating outer dash line */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/40 animate-rotate-slow" />
              
              {/* Core glow background */}
              <div className="absolute inset-8 rounded-full bg-white/20 blur-xl animate-pulse" />
              
              {/* Central Logo Sphere */}
              <div className="absolute inset-10 rounded-full bg-white shadow-xl flex items-center justify-center p-3 border border-divineGold/35">
                <img
                  src="/logo.jpg"
                  alt={t({ hi: "दिव्य गर्भ संस्कार लोगो", en: "Divine Garbh Sanskar Logo", gu: "દિવ્ય ગર્ભ સંસ્કાર લોગો" })}
                  className="w-full h-full rounded-full object-contain p-0.5"
                />

              </div>

              {/* Orbiting Icons */}
              {/* Music */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 left-6 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center text-base shadow-md"
              >
                🎵
              </motion.div>
              
              {/* Yoga */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-4 right-6 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center text-base shadow-md"
              >
                🧘
              </motion.div>
              
              {/* Literature/Book */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-1/2 -right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center text-base shadow-md"
              >
                📚
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
