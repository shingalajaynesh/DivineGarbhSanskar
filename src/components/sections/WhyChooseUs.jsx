import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import FloatingCard from '../ui/FloatingCard';
import MandalaBg from '../ui/MandalaBg';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const cardsData = [
    {
      icon: "🕉️",
      title: { hi: "वैदिक एवं वैज्ञानिक", en: "Vedic & Scientific", gu: "વૈદિક અને વૈજ્ઞાનિક" },
      desc: {
        hi: "हमारे सत्र प्राचीन ग्रन्थों के ज्ञान और आधुनिक भ्रूण विज्ञान (Embryology) के तर्कों पर आधारित हैं।",
        en: "We align ancient texts with modern fetal biology to provide clear, actionable pregnancy steps.",
        gu: "અમારા સત્રો પ્રાચીન ગ્રંથોના જ્ઞાન અને આધુનિક ભ્રૂણ વિજ્ઞાન (Embryology) ના તર્કો પર આધારિત છે."
      }
    },
    {
      icon: "👩‍👧",
      title: { hi: "व्यक्तिगत मार्गदर्शन", en: "Personalized Guidance", gu: "વ્યક્તિગત માર્ગદર્શન" },
      desc: {
        hi: "हर माँ और शिशु विशिष्ट होते हैं। हमारी काउंसलर हर चरण में आपसे जुड़कर सलाह देती हैं।",
        en: "Every mother is unique. Get 1:1 tailored checks and custom activities corresponding to your month.",
        gu: "દરેક માતા અને શિશુ અજોડ હોય છે. અમારા પરામર્શદાતા દરેક તબક્કે તમારી સાથે જોડાઈને માર્ગદર્શન આપે છે."
      }
    },
    {
      icon: "🎵",
      title: { hi: "राग संगीत चिकित्सा", en: "Raag Music Therapy", gu: "રાગ સંગીત ચિકિત્સા" },
      desc: {
        hi: "विशेष रूप से चयनित राग संगीत जो गर्भ में शिशु के मस्तिष्क के स्नायुओं के विकास को उत्तेजित करता है।",
        en: "Curated Classical Indian Ragas that lower prenatal stress and stimulate fetal neural pathways.",
        gu: "ખાસ પસંદ કરેલા રાગ સંગીત જે ગર્ભમાં બાળકના મગજના કોષોના વિકાસને ઉત્તેજિત કરે છે."
      }
    },
    {
      icon: "🧘",
      title: { hi: "योग एवं ध्यान", en: "Yoga & Meditation", gu: "યોગ અને ધ્યાન" },
      desc: {
        hi: "सुरक्षित प्रसव और मानसिक शांति के लिए योग, प्राणायाम और गहरी साँस लेने के विशेष अभ्यास।",
        en: "Safe prenatal exercises, stretches, and mindfulness routines for peaceful labor preparation.",
        gu: "સુરક્ષિત પ્રસૂતિ અને માનસિક શાંતિ માટે યોગ, પ્રાણાયામ અને ઊંડા શ્વાસ લેવાના વિશેષ અભ્યાસ."
      }
    },
    {
      icon: "📱",
      title: { hi: "100% ऑनलाइन", en: "100% Online Access", gu: "૧૦૦% ઓનલાઇન એક્સેસ" },
      desc: {
        hi: "आप घर बैठे, अपनी सुविधा के समय हमारे लाइव वर्कशॉप और मोबाइल ऐप गतिविधियों में शामिल हो सकती हैं।",
        en: "Access all video lectures, tracking checklists, and worksheets directly from your smartphone.",
        gu: "તમે ઘરે બેઠા, તમારી અનુકૂળતા મુજબ અમારા લાઈવ વર્કશોપ અને મોબાઇલ એપ્લિકેશન પ્રવૃત્તિઓમાં જોડાઈ શકો છો."
      }
    },
    {
      icon: "🌍",
      title: { hi: "विश्वव्यापी पहुँच", en: "Available Worldwide", gu: "વિશ્વવ્યાપી પહોંચ" },
      desc: {
        hi: "भारत, यूएसए, यूके और दुनिया के अन्य हिस्सों से हजारों गर्भवती माताएं हमारी कक्षाओं का लाभ ले रही हैं।",
        en: "Expectant parents from over 15+ countries rely on our certified digital prenatal coaching.",
        gu: "ભારત, યુએસએ, યુકે અને વિશ્વના અન્ય ભાગોમાંથી હજારો ગર્ભવતી માતાઓ અમારા વર્ગોનો લાભ લઈ રહી છે."
      }
    }
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10">
      {/* Background Decors */}
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.04] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "हमें क्यों चुनें", en: "Why Choose Us", gu: "શા માટે અમને પસંદ કરો" })}
          titleHi={t({ hi: "सच्चा मातृत्व, श्रेष्ठ संस्कार", en: "True Motherhood, Noble Values", gu: "સાચું માતૃત્વ, શ્રેષ્ઠ સંસ્કાર" })}
        />

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {cardsData.map((card, index) => (
            <FloatingCard key={index} delay={index * 0.1} className="flex flex-col items-center text-center p-8 bg-white border border-divineGold/20 rounded-divine-md">
              {/* Pulsing Icon */}
              <div className="w-16 h-16 rounded-full bg-softCream border border-divineGold/30 flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:animate-pulse">
                {card.icon}
              </div>
              
              <h3 className="font-sans font-bold text-xl text-sacredMaroon mb-3">
                {t(card.title)}
              </h3>
              
              <p className="font-sans text-sm text-templeBrown/75 leading-relaxed">
                {t(card.desc)}
              </p>
            </FloatingCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
