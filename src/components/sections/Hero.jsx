import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import GoldenButton from '../ui/GoldenButton';
import ParticleField from '../ui/ParticleField';
import MandalaBg from '../ui/MandalaBg';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  // Draw animation configuration for the self-assembling SVG paths
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-softCream" id="main-content">
      {/* Dynamic Particle Field background */}
      <ParticleField />
      
      {/* Background Watermark Mandala */}
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vedic Copy */}
          <div className="lg:col-span-7 text-left flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-accent text-vermillion font-bold text-sm tracking-widest uppercase"
            >
              ✦ {t({ hi: "वैदिक विज्ञान", en: "Vedic Science", gu: "વૈદિક વિજ્ઞાન" })} · {t({ hi: "आधुनिक गर्भावस्था", en: "Modern Motherhood", gu: "આધુનિક માતૃત્વ" })} ✦
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-devanagari text-4xl sm:text-5xl md:text-[68px] text-sacredMaroon leading-[1.15] font-normal"
            >
              {t({
                hi: "गर्भ संस्कार से दिव्य संतान की नींव रखें",
                en: "Lay the Foundation of Your Divine Child",
                gu: "ગર્ભ સંસ્કારથી દિવ્ય બાળકની સ્થાપના કરો"
              })}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              <h2 className="font-latinDisplay text-xl sm:text-2xl text-templeBrown italic font-semibold">
                {t({
                  hi: "प्राचीन वैदिक ज्ञान और आधुनिक भ्रूण विज्ञान का समन्वय",
                  en: "Weaving Vedic wisdom & modern embryology into parenting",
                  gu: "પ્રાચીન વૈદિક જ્ઞાન અને આધુનિક ભ્રૂણ વિજ્ઞાનનો સમન્વય"
                })}
              </h2>
              <p className="font-sans text-base text-templeBrown/85 leading-relaxed max-w-xl">
                {t({
                  hi: "वैदिक परंपरा सिखाती है कि गर्भ में ही शिशु का शारीरिक, मानसिक और आध्यात्मिक विकास शुरू हो जाता है। प्रथम दिन से ही अपने शिशु के सुंदर भविष्य की शुरुआत करें।",
                  en: "The Vedic tradition of Garbh Sanskar teaches us that a child's intelligence, personality, and values begin shaping in the womb — from Day One.",
                  gu: "વૈદિક પરંપરા શીખવે છે કે ગર્ભમાં જ બાળકનો શારીરિક, માનસિક અને આધ્યાત્મિક વિકાસ શરૂ થાય છે. પ્રથમ દિવસથી જ તમારા બાળકના સુંદર ભવિષ્યની શરૂઆત કરો।"
                })}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <Link to="/contact">
                <GoldenButton className="flex items-center gap-2">
                  🌸 {t({ hi: "निःशुल्क परामर्श लें", en: "Free Counselling", gu: "મફત પરામર્શ લો" })}
                </GoldenButton>
              </Link>
              
              <a 
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 font-sans font-bold text-base text-sacredMaroon border-2 border-sacredMaroon rounded-divine-md flex items-center gap-2.5 hover:bg-sacredMaroon/5 transition-all duration-300"
              >
                <Play className="w-4.5 h-4.5 fill-sacredMaroon" />
                {t({ hi: "परिचय वीडियो देखें", en: "Watch Intro Video", gu: "પરિચય વિડીયો જુઓ" })}
              </a>
            </motion.div>

            {/* Trust Micro-Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs font-semibold text-templeBrown/70 border-t border-sacredMaroon/10 pt-4"
            >
              <span>✓ {t({ hi: "10,000+ परिवार बदले", en: "10,000+ Families Transformed", gu: "10,000+ પરિવારો બદલાયા" })}</span>
              <span>✓ {t({ hi: "वैदिक + वैज्ञानिक", en: "Vedic + Scientific", gu: "વૈદિક + વૈજ્ઞાનિક" })}</span>
              <span>✓ {t({ hi: "100% ऑनलाइन कार्यशाला", en: "100% Online Workshops", gu: "100% ઓનલાઇન વર્કશોપ" })}</span>
            </motion.div>
          </div>

          {/* Right Column: Divine Womb Portal (Anti-Gravity Visual) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px]">
            
            {/* The Portal Container */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
              
              {/* Radial Glow Gradient */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-divineGold/30 to-warmAmber/20 blur-2xl animate-pulse" />
              
              {/* SVG Divine Womb Portal (Self-assembling & rotating layers) */}
              <svg viewBox="0 0 200 200" className="absolute w-full h-full text-divineGold drop-shadow-[0_0_15px_rgba(255,214,0,0.25)]">
                
                {/* 1. Self-assembling outer petal circle (draw animation) */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  className="animate-rotate-slow origin-center"
                />

                {/* 2. Concentric inner geometric ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="72"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  className="animate-rotate-slow-counter origin-center"
                />

                {/* 3. Mandala rays representing solar flares */}
                {[...Array(12)].map((_, idx) => {
                  const angle = (idx * 30 * Math.PI) / 180;
                  const x1 = 100 + 40 * Math.cos(angle);
                  const y1 = 100 + 40 * Math.sin(angle);
                  const x2 = 100 + 68 * Math.cos(angle);
                  const y2 = 100 + 68 * Math.sin(angle);
                  return (
                    <motion.line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="0.6"
                      opacity="0.6"
                      variants={pathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  );
                })}

                {/* 4. Solid glowing core sun circle */}
                <circle cx="100" cy="100" r="38" fill="url(#sunGradient)" className="animate-glow-pulse origin-center" />

                <defs>
                  <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FEFFC5" />
                    <stop offset="60%" stopColor="#FFD600" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Divine logo image at absolute center */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                className="absolute w-40 h-40 flex items-center justify-center z-10"
              >
                <img
                  src="/logo.jpg"
                  alt="Divine Garbh Sanskar Logo"
                  className="w-32 h-32 rounded-full object-contain shadow-lg border-2 border-divineGold p-0.5 bg-white"
                />
              </motion.div>

              {/* Orbiting info chips (Staggered Floating Cards) */}
              {/* Chip 1: Vedic Music */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 -left-6 bg-white/95 border border-divineGold/55 shadow-md px-3 py-1.5 rounded-full text-xs font-bold text-sacredMaroon flex items-center gap-1.5 z-20 cursor-default"
              >
                <span>🎵</span> {t({ hi: "राग संगीत", en: "Vedic Music", gu: "રાગ સંગીત" })}
              </motion.div>

              {/* Chip 2: Yoga & Meditation */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute bottom-6 -right-6 bg-white/95 border border-divineGold/55 shadow-md px-3 py-1.5 rounded-full text-xs font-bold text-sacredMaroon flex items-center gap-1.5 z-20 cursor-default"
              >
                <span>🧘</span> {t({ hi: "योग और ध्यान", en: "Yoga & Meditation", gu: "યોગ અને ધ્યાન" })}
              </motion.div>

              {/* Chip 3: Brain Development */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-2 -left-4 bg-white/95 border border-divineGold/55 shadow-md px-3 py-1.5 rounded-full text-xs font-bold text-sacredMaroon flex items-center gap-1.5 z-20 cursor-default"
              >
                <span>🧠</span> {t({ hi: "दिमागी विकास", en: "Brain Development", gu: "મગજનો વિકાસ" })}
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
