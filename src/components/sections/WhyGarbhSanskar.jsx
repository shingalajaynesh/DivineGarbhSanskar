import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const WhyGarbhSanskar = () => {
  const { t } = useLanguage();

  const points = [
    {
      title: {
        hi: "१. वैदिक एवं वैज्ञानिक आधार (Vedic + Scientific)",
        en: "1. Vedic & Scientific Foundation",
        gu: "૧. વૈદિક અને વૈજ્ઞાનિક આધાર (Vedic + Scientific)"
      },
      desc: {
        hi: "शिशु के मस्तिष्क का ८०% विकास गर्भकाल में होता है। गर्भावस्था में माँ के विचारों और हॉर्मोन्स से शिशु के IQ, EQ और व्यक्तित्व का निर्माण होता है।",
        en: "80% of a baby's brain development happens in the womb. The mother's thoughts, stress levels, and environment directly sculpt the child's IQ and EQ.",
        gu: "બાળકના મગજનો ૮૦% વિકાસ ગર્ભકાળ દરમિયાન થાય છે. ગર્ભાવસ્થામાં માતાના વિચારો અને હોર્મોન્સ બાળકના IQ, EQ અને વ્યક્તિત્વનું ઘડતર કરે છે."
      }
    },
    {
      title: {
        hi: "२. ऐतिहासिक साक्ष्य (Historical Proof)",
        en: "2. Proven Historical Heritage",
        gu: "૨. ઐતિહાસિક પુરાવા (Historical Proof)"
      },
      desc: {
        hi: "अभिमन्यु, प्रह्लाद, छत्रपति शिवाजी और स्वामी विवेकानंद जैसी महान विभूतियों की कथाएं सिद्ध करती हैं कि गर्भ में ही संस्कार दिए जा सकते हैं।",
        en: "The legendary stories of Abhimanyu learning military formations, Prahlad learning devotion, and Shivaji receiving statecraft lessons in the womb prove prenatal learning.",
        gu: "અભિમન્યુ, પ્રહલાદ, છત્રપતિ શિવાજી અને સ્વામી વિવેકાનંદ જેવા મહાન વિભૂતિઓની કથાઓ સાબિત કરે છે કે ગર્ભમાં જ સંસ્કાર આપી શકાય છે."
      }
    },
    {
      title: {
        hi: "३. केवल अनुष्ठान नहीं, बल्कि जीवन शैली",
        en: "3. Complete Aahar-Vihar-Vichar Science",
        gu: "૩. માત્ર વિધિ નહીં, પણ જીવનશૈલી (Aahar-Vihar-Vichar)"
      },
      desc: {
        hi: "यह केवल पूजा या यज्ञ नहीं है; यह दैनिक आहार (Diet), विहार (Physical Habits) और विचार (Mental/Spiritual state) का पूर्ण संतुलित जीवन विज्ञान है।",
        en: "It is not just a prayer or a ritual. It is a complete wellness framework balancing nutrition (Aahar), physical habits (Vihar), and mental state (Vichar).",
        gu: "આ માત્ર પૂજા કે યજ્ઞ નથી; આ દૈનિક આહાર (Diet), વિહાર (Habits) અને વિચાર (Mindset) નું સંપૂર્ણ સંતુલિત જીવન વિજ્ઞાન છે."
      }
    },
    {
      title: {
        hi: "४. आधुनिक एवं सरल उपयोग (Modern Delivery)",
        en: "4. Modern, Customized App Activities",
        gu: "૪. આધુનિક અને સરળ ઉપયોગ (Modern Delivery)"
      },
      desc: {
        hi: "हम प्राचीन ज्ञान को आधुनिक मोबाइल तकनीक द्वारा आपके लिए लाते हैं - हर दिन के हिसाब से अनुकूलित और व्यक्तिगत दैनिक गतिविधियाँ।",
        en: "We bridge ancient Vedic lore with daily digital tasks: customized pregnancy music therapy, meditation trackers, and personalized counselor guidance.",
        gu: "અમે પ્રાચીન જ્ઞાનને આધુનિક મોબાઇલ ટેકનોલોજી દ્વારા તમારા સુધી પહોંચાડીએ છીએ - દરેક દિવસ પ્રમાણે અનુકૂળ બનાવેલી દૈનિક પ્રવૃત્તિઓ."
      }
    }
  ];

  return (
    <section className="relative py-20 bg-softCream/30 overflow-hidden border-b border-divineGold/10" aria-label="Why Garbh Sanskar">
      <MandalaBg className="top-24 right-10 w-96 h-96 opacity-[0.04] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "वैज्ञानिक महत्त्व", en: "Vedic Wisdom & Science", gu: "વૈજ્ઞાનિક મહત્વ" })}
          titleHi={t({ hi: "गर्भ संस्कार क्यों आवश्यक है?", en: "Why Garbh Sanskar?", gu: "ગર્ભ સંસ્કાર કેમ જરૂરી છે?" })}
          titleEn={t({ hi: "Why Choose Garbh Sanskar?", en: "Why Choose Garbh Sanskar?", gu: "Why Choose Garbh Sanskar?" })}
          center={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mt-12">
          
          {/* Left Column: Floating SVG Illustration */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center"
            >
              {/* Outer Golden Glow Circle */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-divineGold/40 animate-rotate-slow" />
              <div className="absolute inset-8 rounded-full border border-divineGold/30" />
              <div className="absolute inset-10 rounded-full bg-white shadow-xl flex items-center justify-center p-6">
                
                {/* SVG Illustration of mother and fetus */}
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-sacredMaroon">
                  {/* Mother shape */}
                  <path
                    d="M48 24C44 24 41 27 41 32C41 40 47 43 47 55C47 58 49 60 52 60C55 60 57 58 57 55C57 46 48 43 48 35C48 29 51 26 55 26C57 26 58 27 58 28C58 36 53 40 53 47C53 52 57 55 61 55C66 55 70 51 70 45C70 35 62 24 52 24Z"
                    fill="currentColor"
                  />
                  {/* Glowing Connection / Aura */}
                  <circle cx="53" cy="46" r="3" fill="#CC0000" className="animate-pulse" />
                  
                  {/* Rays of warmth connecting */}
                  <path d="M42 36 Q32 30 25 35 Q18 40 25 50" stroke="#FFD600" strokeWidth="1" strokeDasharray="3 2" />
                  <path d="M62 36 Q72 30 78 35 Q84 40 78 50" stroke="#FF8C00" strokeWidth="1" strokeDasharray="3 2" />
                </svg>
              </div>

              {/* Floating Symbols orbiting */}
              {/* Sun Symbol (Vichar) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 right-12 w-11 h-11 bg-divineGold/20 border border-divineGold rounded-full flex items-center justify-center text-lg shadow-sm"
                title="Positive Thoughts (विचार)"
              >
                ☀️
              </motion.div>

              {/* Lotus Symbol (Purity) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-6 left-12 w-11 h-11 bg-white/90 border border-divineGold rounded-full flex items-center justify-center text-lg shadow-sm"
                title="Purity (पवित्रता)"
              >
                🌸
              </motion.div>

              {/* Kalash Symbol (Culture) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-1/2 -right-4 w-11 h-11 bg-white/90 border border-divineGold rounded-full flex items-center justify-center text-lg shadow-sm"
                title="Cultural Roots (कलश)"
              >
                🏺
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Key Points */}
          <div className="lg:col-span-7 flex flex-col gap-8 order-1 lg:order-2">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4 items-start"
              >
                {/* Custom Bullet: Sacred Mandala Dot */}
                <div className="w-10 h-10 rounded-full bg-divineGold/20 border border-divineGold flex items-center justify-center text-sacredMaroon shrink-0 mt-1 shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 100 100" className="text-sacredMaroon animate-rotate-slow">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="25 15" />
                    <circle cx="50" cy="50" r="15" fill="currentColor" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-sacredMaroon mb-1.5">
                    {t(point.title)}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-templeBrown/80 leading-relaxed">
                    {t(point.desc)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyGarbhSanskar;
