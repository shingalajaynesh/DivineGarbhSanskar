import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      step: "STEP 1",
      titleHi: "निःशुल्क पंजीकरण",
      titleEn: "Register For Free",
      titleGu: "મફત રજીસ્ટ્રેશન",
      descHi: "परामर्श के लिए हमारी वेबसाइट पर अपनी जानकारी दर्ज करें और स्लॉट बुक करें।",
      descEn: "Sign up via our short form to claim your free online coaching spot.",
      descGu: "પરામર્શ માટે અમારી વેબસાઇટ પર તમારી માહિતી દાખલ કરો અને સ્લોટ બુક કરો."
    },
    {
      step: "STEP 2",
      titleHi: "विशेषज्ञ परामर्श सत्र",
      titleEn: "Free Consultation",
      titleGu: "નિષ્ણાત પરામર્શ સત્ર",
      descHi: "हमारे डॉक्टर और काउंसलर आपकी गर्भावस्था के अनुसार सर्वोत्तम सलाह देंगे।",
      descEn: "Speak with our prenatal expert to map your customized activities.",
      descGu: "અમારા ડોકટરો અને પરામર્શદાતાઓ તમારી ગર્ભાવસ્થા અનુસાર શ્રેષ્ઠ સલાહ આપશે."
    },
    {
      step: "STEP 3",
      titleHi: "दिव्य यात्रा शुरू करें",
      titleEn: "Start Divine Journey",
      titleGu: "દિવ્ય યાત્રા શરૂ કરો",
      descHi: "ऐप द्वारा संगीत चिकित्सा, योग और आहार नियमों का दैनिक अभ्यास शुरू करें।",
      descEn: "Unlock your daily routine, music charts, and begin your parenting path.",
      descGu: "એપ દ્વારા સંગીત ચિકિત્સા, યોગ અને આહાર નિયમોની દૈનિક પ્રેક્ટિસ શરૂ કરો."
    }
  ];

  return (
    <section className="relative py-20 bg-softCream/30 overflow-hidden border-b border-divineGold/10">
      <MandalaBg className="top-12 left-10 w-80 h-80 opacity-[0.04] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section labels */}
        <SectionLabel
          label={t({ hi: "सरल प्रक्रिया", en: "Three-Step Flow", gu: "સરળ પ્રક્રિયા" })}
          titleHi={t({ hi: "आपकी दिव्य यात्रा कैसे शुरू करें?", en: "How to Begin Your Prenatal Program", gu: "તમારી દિવ્ય યાત્રા કેવી રીતે શરૂ કરવી?" })}
        />

        {/* Steps Journey */}
        <div className="relative mt-16 flex flex-col md:flex-row justify-between items-stretch gap-12 md:gap-6">
          
          {/* Dash connection line for Desktop */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-divineGold/70">
            {/* Travelling animated dot */}
            <motion.div
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute h-3.5 w-3.5 bg-vermillion rounded-full shadow-[0_0_10px_#CC0000] -top-1.5"
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex-1 flex flex-col items-center text-center group"
            >
              
              {/* Step Circle */}
              <div className="w-20 h-20 rounded-full bg-white border-2 border-divineGold flex items-center justify-center font-accent text-sacredMaroon text-lg font-bold shadow-md z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-vermillion">
                {idx + 1}
              </div>

              {/* Step Tag */}
              <span className="font-accent text-xs font-black text-vermillion tracking-widest uppercase mt-4 mb-2">
                {step.step}
              </span>

              {/* Title */}
              <h3 className="font-sans font-bold text-lg md:text-xl text-sacredMaroon mb-2">
                {t({ hi: step.titleHi, en: step.titleEn, gu: step.titleGu })}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-templeBrown/80 leading-relaxed max-w-xs px-2">
                {t({ hi: step.descHi, en: step.descEn, gu: step.descGu })}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
