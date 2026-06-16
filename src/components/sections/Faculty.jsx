import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const Faculty = () => {
  const { t } = useLanguage();

  const experts = [
    {
      name: { hi: "डॉ. मानसी पटेल", en: "Dr. Mansi Patel", gu: "ડો. માનસી પટેલ" },
      role: { hi: "स्त्री रोग विशेषज्ञ (Gynaecologist)", en: "Senior Gynaecologist & IVF Expert", gu: "સ્ત્રી રોગ નિષ્ણાત (Gynaecologist)" },
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250",
      icon: "🩺"
    },
    {
      name: { hi: "वैद्य राजेश शर्मा", en: "Vaidya Rajesh Sharma", gu: "વૈદ્ય રાજેશ શર્મા" },
      role: { hi: "आयुर्वेद एवं गर्भ विज्ञान विशेषज्ञ", en: "Ayurveda Garbh Vigyan Specialist", gu: "આયુર્વેદ અને ગર્ભ વિજ્ઞાન નિષ્ણાત" },
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250",
      icon: "🌿"
    },
    {
      name: { hi: "आचार्य हरीश जोशी", en: "Acharya Harish Joshi", gu: "આચાર્ય હરીશ જોશી" },
      role: { hi: "योग, चक्र एवं ध्यान प्रशिक्षक", en: "Yoga, Chakra & Meditation Trainer", gu: "યોગ, ચક્ર અને ધ્યાન પ્રશિક્ષક" },
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=250",
      icon: "🧘"
    },
    {
      name: { hi: "डॉ. सीमा शर्मा", en: "Dr. Seema Sharma", gu: "ડો. સીમા શર્મા" },
      role: { hi: "बाल रोग विशेषज्ञ (Pediatrician)", en: "Consultant Pediatrician", gu: "બાળ રોગ નિષ્ણાત (Pediatrician)" },
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=250",
      icon: "👶"
    },
    {
      name: { hi: "श्रीमती सुनीता व्यास", en: "Mrs. Sunita Vyas", gu: "શ્રીમતી સુનીતા વ્યાસ" },
      role: { hi: "आध्यात्मिक एवं सुसंस्कार मार्गदर्शक", en: "Spiritual & Values Coach", gu: "આધ્યાત્મિક અને સુસંસ્કાર માર્ગદર્શક" },
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
      icon: "🕉️"
    },
    {
      name: { hi: "डॉ. अमित मेहता", en: "Dr. Amit Mehta", gu: "ડો. અમિત મહેતા" },
      role: { hi: "बाल मनोवैज्ञानिक (Child Psychologist)", en: "Fetal & Child Psychologist", gu: "બાળ મનોવૈજ્ઞાનિક (Child Psychologist)" },
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250",
      icon: "🧠"
    }
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10">
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] text-divineGold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "हमारी फैकल्टी", en: "Our Gurus & Experts", gu: "અમારા માર્ગદર્શકો અને નિષ્ણાતો" })}
          titleHi={t({ hi: "विशेषज्ञ डॉक्टरों और गुरुओं का मार्गदर्शन", gu: "નિષ્ણાત ડોકટરો અને ગુરુઓનું માર્ગદર્શન" })}
          titleEn="Learn from Doctors, Psychologists, & Spiritual Coaches"
        />

        {/* Hexagonal/Circular Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
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
