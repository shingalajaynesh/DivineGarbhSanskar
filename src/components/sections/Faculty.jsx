import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const Faculty = () => {
  const { t } = useLanguage();

  const experts = [
    {
      name: { hi: "डॉ. तरुणा जियानी", en: "Dr. Taruna Jiyani", gu: "ડો. તરુણા જીયાણી" },
      role: { hi: "संस्थापक एवं मुख्य विशेषज्ञ", en: "Founder & Lead Counselor", gu: "સ્થાપક અને મુખ્ય સલાહકાર" },
      image: "/taruna.jpg",
      icon: "🩺",
      bio: {
        en: "Dr. Taruna Jiyani is a visionary educator and counselor dedicated to the revival of Vedic prenatal science. Under her guidance, more than 10,000 families have experienced the divine journey of conscious motherhood.",
        hi: "डॉ. तरुणा जियानी एक दूरदर्शी शिक्षिका और परामर्शदाता हैं जो वैदिक गर्भ संस्कार विज्ञान के पुनरुत्थान के लिए समर्पित हैं। उनके मार्गदर्शन में 10,000 से अधिक परिवारों ने सचेत मातृत्व की दिव्य यात्रा का अनुभव किया है।",
        gu: "ડો. તરુણા જીયાણી એક સ્વપ્નદ્રષ્ટા શિક્ષક અને પરામર્શદાતા છે જેઓ વૈદિક ગર્ભ સંસ્કાર વિજ્ઞાનના પુનરુત્થાન માટે સમર્પિત છે. તેમના માર્ગદર્શન હેઠળ ૧૦,૦૦૦ થી વધુ પરિવારોએ સભાન માતૃત્વની દિવ્ય યાત્રાનો અનુભવ કર્યો છે।"
      }
    }
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10">
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] text-divineGold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "हमारे विशेषज्ञ", en: "Our Experts", gu: "અમારા નિષ્ણાતો" })}
          titleHi={t({ hi: "मार्गदर्शक और मार्गप्रदर्शक", en: "Our Visionary Guides & Mentors", gu: "માર્ગદર્શક અને પથદર્શક" })}
        />

        {/* Centered Founder Card */}
        <div className="flex justify-center items-center mt-16">
          {experts.map((expert, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-8 bg-softCream/10 rounded-divine-md border border-divineGold/20 hover:border-divineGold/60 hover:shadow-lg transition-all duration-300 select-default max-w-md w-full"
              style={{
                animation: `float 4.5s ease-in-out infinite`,
                animationDelay: `${idx * 0.3}s`
              }}
            >
              
              {/* Image Circle Container */}
              <div className="relative w-40 h-40 mb-6 shrink-0">
                
                {/* Golden rotating ring wrapper */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-divineGold/80 animate-rotate-slow" />
                
                {/* Inner border */}
                <div className="absolute inset-2.5 rounded-full border border-divineGold" />
                
                {/* Image */}
                <img
                  src={expert.image}
                  alt={t(expert.name)}
                  className="absolute inset-4 w-32 h-32 rounded-full object-cover shadow-sm bg-white"
                  loading="lazy"
                />

                {/* Micro Category Icon Badge */}
                <div className="absolute bottom-1 right-2 w-9 h-9 bg-white border border-divineGold text-lg rounded-full flex items-center justify-center shadow-md select-none">
                  {expert.icon}
                </div>
              </div>

              {/* Text */}
              <h3 className="font-sans font-bold text-xl text-sacredMaroon mb-1">
                {t(expert.name)}
              </h3>
              <p className="font-sans text-sm text-templeBrown font-semibold italic opacity-85 mb-4">
                {t(expert.role)}
              </p>
              {expert.bio && (
                <p className="font-sans text-xs md:text-sm text-templeBrown/80 leading-relaxed border-t border-divineGold/25 pt-4">
                  {t(expert.bio)}
                </p>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faculty;
