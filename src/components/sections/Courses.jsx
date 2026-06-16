import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { courses } from '../../data/courses';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';
import { Link } from 'react-router-dom';

const Courses = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10" id="courses-section">
      <MandalaBg className="bottom-10 right-10 w-[500px] h-[500px] opacity-[0.04] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "प्रवेश योजनाएं", en: "Pricing & Programs", gu: "પ્રવેશ યોજનાઓ" })}
          titleHi={t({ hi: "हमारे कार्यक्रम एवं शुल्क विवरण", gu: "અમારા કાર્યક્રમો અને ફી વિગતો" })}
          titleEn="Explore Our Divine Garbh Sanskar Programs"
        />

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-12">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className={`relative flex flex-col justify-between p-8 rounded-divine-md transition-all duration-300 border-2 select-default ${
                course.popular
                  ? 'border-vermillion bg-white shadow-[0_20px_50px_rgba(204,0,0,0.1)] scale-100 lg:scale-[1.03] z-10'
                  : 'border-divineGold/30 bg-white hover:border-divineGold/80 hover:shadow-xl'
              }`}
            >
              
              {/* Popular ribbon */}
              {course.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-vermillion text-white text-xs font-accent font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {t({ hi: "★ सबसे लोकप्रिय", en: "★ MOST POPULAR", gu: "★ સૌથી લોકપ્રિય" })}
                  </span>
                </div>
              )}

              {/* Card Top */}
              <div>
                {/* Duration Label */}
                <span className="font-accent text-xs font-bold text-vermillion tracking-wider uppercase">
                  {t(course.duration)}
                </span>
                
                {/* Course Title */}
                <h3 className="font-sans font-extrabold text-2xl text-sacredMaroon mt-2 mb-4 leading-snug">
                  {t(course.title)}
                </h3>

                {/* Price tag */}
                <div className="flex items-baseline gap-1.5 border-b border-divineGold/20 pb-6 mb-6">
                  <span className="font-sans text-4xl font-black text-sacredMaroon">
                    {course.price[language]}
                  </span>
                  <span className="text-sm text-templeBrown/70 font-sans font-medium">
                    {t({ hi: "/ सम्पूर्ण कोर्स", en: "/ full course", gu: "/ સંપૂર્ણ કોર્સ" })}
                  </span>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-4 text-sm md:text-base text-templeBrown/85">
                  {course.features[language].map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Button */}
              <div className="mt-8">
                <Link to="/contact">
                  <button
                    className={`w-full py-4 px-6 rounded-divine-sm flex items-center justify-center gap-2 font-accent font-bold text-sm uppercase tracking-wider transition-all duration-300 border-2 ${
                      course.popular
                        ? 'bg-gradient-to-r from-divineGold to-warmAmber border-divineGold text-sacredMaroon hover:from-warmAmber hover:to-divineGold shadow-md animate-glow-pulse'
                        : 'bg-transparent border-sacredMaroon text-sacredMaroon hover:bg-sacredMaroon hover:text-white'
                    }`}
                  >
                    <span>{t(course.cta)}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Courses;
