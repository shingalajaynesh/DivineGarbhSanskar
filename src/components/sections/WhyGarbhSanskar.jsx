import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Heart, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const WhyGarbhSanskar = () => {
  const { t } = useLanguage();

  const points = [
    {
      title: {
        hi: "१. वैदिक परंपरा एवं मातृत्व पोषण (Vedic Tradition & Maternal Care)",
        en: "1. Vedic Wisdom & Maternal Well-being",
        gu: "૧. વૈદિક પરંપરા અને માતૃત્વ પોષણ (Vedic Tradition & Care)"
      },
      desc: {
        hi: "गर्भावस्था में माँ का शांत मन, संतुलित आहार और सकारात्मक विचार गर्भस्थ शिशु के भावनात्मक विकास और स्वस्थ परिवेश के लिए एक मजबूत आधार तैयार करते हैं।",
        en: "During pregnancy, maternal peace of mind, balanced nutrition, and positive surroundings support a healthy prenatal environment and nurturing mother-baby bond.",
        gu: "ગર્ભાવસ્થામાં માતાનું શાંત મન, સંતુલિત આહાર અને હકારાત્મક વિચારો ગર્ભસ્થ બાળકના ભાવનાત્મક વિકાસ અને તંદુરસ્ત વાતાવરણ માટે મજબૂત પાયો પૂરો પાડે છે."
      }
    },
    {
      title: {
        hi: "२. समृद्ध सांस्कृतिक परंपरा (Cultural Heritage)",
        en: "2. Cherished Cultural Traditions",
        gu: "૨. સમૃદ્ધ સાંસ્કૃતિક વારસો (Cultural Heritage)"
      },
      desc: {
        hi: "अभिमन्यु, प्रह्लाद और छत्रपति शिवाजी जैसी महान विभूतियों की प्रेरक कथाएं दर्शाती हैं कि प्रसव पूर्व सकारात्मक वातावरण और उच्च संस्कारों को कितना महत्वपूर्ण माना गया है।",
        en: "Inspiring traditional narratives of Abhimanyu, Prahlad, and Shivaji reflect India's timeless cultural belief in surrounding an expectant mother with noble values and uplifting thoughts.",
        gu: "અભિમન્યુ, પ્રહલાદ અને છત્રપતિ શિવાજી જેવી મહાન વિભૂતિઓની પ્રેરક કથાઓ દર્શાવે છે કે ગર્ભાવસ્થા દરમિયાન હકારાત્મક વાતાવરણ અને સંસ્કારોને કેટલું મહત્વ આપવામાં આવ્યું છે."
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
    <section className="relative py-20 bg-white overflow-hidden" aria-label="Why Garbh Sanskar">
      <MandalaBg className="top-24 right-10 w-96 h-96 opacity-[0.04] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "वैदिक एवं समग्र महत्त्व", en: "Vedic Wisdom & Holistic Care", gu: "વૈદિક અને સર્વાંગી મહત્વ" })}
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
              <div className="absolute inset-10 rounded-full bg-white shadow-xl flex items-center justify-center p-3">
                <img
                  src="/logo.jpg"
                  alt={t({ hi: "दिव्य गर्भ संस्कार लोगो", en: "Divine Garbh Sanskar Logo", gu: "દિવ્ય ગર્ભ સંસ્કાર લોગો" })}
                  className="w-full h-full rounded-full object-contain p-0.5 border border-divineGold/35"
                />

              </div>

              {/* Floating Symbols orbiting */}
              {/* Sun Symbol (Vichar) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 right-12 w-11 h-11 bg-divineGold/20 border border-divineGold rounded-full flex items-center justify-center shadow-sm"
                title={t({ en: "Positive Thoughts (Vichar)", hi: "सकारात्मक विचार", gu: "હકારાત્મક વિચારો" })}
              >
                <Sun className="w-5 h-5 text-sacredMaroon" />
              </motion.div>

              {/* Heart Symbol (Purity/Bhav) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-6 left-12 w-11 h-11 bg-white/90 border border-divineGold rounded-full flex items-center justify-center shadow-sm"
                title={t({ en: "Purity (Pavitrata)", hi: "पवित्रता", gu: "પવિત્રતા" })}
              >
                <Heart className="w-5 h-5 text-vermillion" />
              </motion.div>

              {/* Shield Symbol (Culture/Suraksha) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-1/2 -right-4 w-11 h-11 bg-white/90 border border-divineGold rounded-full flex items-center justify-center shadow-sm"
                title={t({ en: "Cultural Roots (Sanskriti)", hi: "सांस्कृतिक जड़ें", gu: "સાંસ્કૃતિક મૂળ" })}
              >
                <ShieldCheck className="w-5 h-5 text-sacredMaroon" />
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
