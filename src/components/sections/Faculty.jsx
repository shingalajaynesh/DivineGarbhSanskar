import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const Faculty = () => {
  const { t } = useLanguage();

  const experts = [
    {
      name: { hi: "डॉ. तरुणा जियानी", en: "Dr. Taruna Jiyani", gu: "ડો. તરુણા જીયાણી" },
      role: { hi: "सीईओ और संस्थापक (CEO & Founder)", en: "Founder & CEO, Divine Garbh Sanskar", gu: "સીઈઓ અને સ્થાપક (CEO & Founder)" },
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250",
      icon: "🕉️"
    }
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10">
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] text-divineGold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "संस्थापक एवं सीईओ", en: "Founder & CEO", gu: "સ્થાપક અને સીઈઓ" })}
          titleHi={t({ hi: "मार्गदर्शक और मार्गप्रदर्शक", en: "Our Leadership & Visionary Guide", gu: "માર્ગદર્શક અને પથદર્શક" })}
        />

        {/* Centered Founder Card */}
        <div className="flex justify-center items-center mt-16">
          {experts.map((expert, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-softCream/10 rounded-divine-md border border-divineGold/15 hover:border-divineGold/60 hover:shadow-lg transition-all duration-300 select-default"
              style={{
                animation: `float 4.5s ease-in-out infinite`,
                animationDelay: `${idx * 0.3}s`
              }}
            >
              
              {/* Image Circle Container */}
              <div className="relative w-40 h-40 mb-6">
                
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
                <div className="absolute bottom-1 right-2 w-9 h-9 bg-white border border-divineGold text-lg rounded-full flex items-center justify-center shadow-md">
                  {expert.icon}
                </div>
              </div>

              {/* Text */}
              <h3 className="font-sans font-bold text-xl text-sacredMaroon mb-1">
                {t(expert.name)}
              </h3>
              <p className="font-sans text-sm text-templeBrown font-semibold italic opacity-85">
                {t(expert.role)}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faculty;
