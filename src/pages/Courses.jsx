import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import SectionLabel from '../components/ui/SectionLabel';
import CoursesSection from '../components/sections/Courses';
import MandalaBg from '../components/ui/MandalaBg';

const Courses = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.courses;

  const curriculum = [
    {
      month: { hi: "महीना १ - ३ (Trimester 1)", en: "Month 1 - 3 (Trimester 1)", gu: "મહિના ૧ - ૩ (Trimester 1)" },
      topics: {
        hi: [
          "भ्रूण का विकास और माँ का सकारात्मक मानसिक रुख",
          "हल्के प्राणायाम और गर्भस्थ मंत्रोच्चार की शुरुआत",
          "मॉर्निंग सिकनेस से निपटने के लिए आहार योजना"
        ],
        en: [
          "Cell division and establishing deep positive affirmations",
          "Gentle breathwork (Pranayama) and initial Vedic chanting",
          "Anti-nausea customized nutrition maps"
        ],
        gu: [
          "ભ્રૂણનો વિકાસ અને માતાનું હકારાત્મક માનસિક વલણ",
          "હળવા પ્રાણાયામ અને ગર્ભસ્થ મંત્રોચ્ચારની શરૂઆત",
          "મોર્નિંગ સિકનેસથી બચવા માટે આહાર યોજના"
        ]
      }
    },
    {
      month: { hi: "महीना ४ - ६ (Trimester 2)", en: "Month 4 - 6 (Trimester 2)", gu: "મહિના ૪ - ૬ (Trimester 2)" },
      topics: {
        hi: [
          "शिशु के मस्तिष्क और ज्ञानेंद्रियों का तेजी से विकास",
          "राग संगीत चिकित्सा (Raga Therapy) और सृजनात्मक क्रियाएं",
          "गर्भ संवाद (Talk to Baby) - पिता की भूमिका की शुरुआत"
        ],
        en: [
          "Sensory organ formation and neural synapse stimulation",
          "Classical Indian Ragas for fetal acoustic response",
          "Garbh Samvad (womb talk) and husband-led voice training"
        ],
        gu: [
          "બાળકના મગજ અને જ્ઞાનેન્દ્રિયોનો ઝડપી વિકાસ",
          "રાગ સંગીત ચિકિત્સા (Raga Therapy) અને સર્જનાત્મક પ્રવૃત્તિઓ",
          "ગર્ભ સંવાદ (Talk to Baby) - પિતાની ભૂમિકાની શરૂઆત"
        ]
      }
    },
    {
      month: { hi: "महीना ७ - ९ (Trimester 3)", en: "Month 7 - 9 (Trimester 3)", gu: "મહિના ૭ - ૯ (Trimester 3)" },
      topics: {
        hi: [
          "प्रसव की तैयारी, भय निवारण और सकारात्मक मानसिकता",
          "पेल्विक स्ट्रेचिंग योग अभ्यास और प्रसव मुद्राएं",
          "प्रसवोत्तर शिशु की देखभाल और नवजात स्तनपान मार्गदर्शिका"
        ],
        en: [
          "Active labor mindset, fears release, and mental strength",
          "Pelvic floor flexibility yoga, postures, and breath control",
          "Postpartum lactation setup, infant sleeping & hygiene training"
        ],
        gu: [
          "પ્રસૂતિની તૈયારી, ડર નિવારણ અને હકારાત્મક માનસિકતા",
          "પેલ્વિક સ્ટ્રેચિંગ યોગ અભ્યાસ અને પ્રસૂતિ મુદ્રાઓ",
          "સુવાવડ પછી બાળકની સંભાળ અને નવજાત સ્તનપાન માર્ગદર્શિકા"
        ]
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.divinegarbhsanskar.com/courses" />
        <html lang={language} />
      </Helmet>

      <div className="relative pt-32 pb-12 overflow-hidden bg-softCream">
        <MandalaBg className="top-12 right-12 w-80 h-80 opacity-[0.04]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Headings */}
          <SectionLabel
            label={t({ hi: "पाठ्यक्रम रूपरेखा", en: "Curriculum Map", gu: "અભ્યાસક્રમ રૂપરેખા" })}
            titleHi={t({ hi: "गर्भ संस्कार पाठ्यक्रम रूपरेखा", gu: "ગર્ભ સંસ્કાર અભ્યાસક્રમ રૂપરેખા" })}
            titleEn="Trimester-by-Trimester Growth Plan"
          />

          {/* Month-by-month syllabus list */}
          <div className="flex flex-col gap-6 mb-16 mt-12">
            {curriculum.map((item, index) => (
              <div
                key={index}
                className="bg-white border-2 border-divineGold/35 p-6 md:p-8 rounded-divine-md shadow-sm hover:shadow-md transition-shadow select-default flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Left side: Month mark */}
                <div className="w-full md:w-1/4 shrink-0 bg-gradient-to-r from-divineGold to-warmAmber text-sacredMaroon font-accent font-black text-sm uppercase px-4 py-3.5 rounded-divine-sm text-center shadow-inner">
                  {t(item.month)}
                </div>

                {/* Right side: Topics */}
                <div className="flex-1">
                  <h4 className="font-sans font-bold text-lg text-sacredMaroon mb-3">
                    {t({ hi: "दैनिक गतिविधियों के प्रमुख बिंदु:", en: "Key Daily Focus Areas:", gu: "દૈનિક પ્રવૃત્તિઓના મુખ્ય ક્ષેત્રો:" })}
                  </h4>
                  <ul className="list-disc pl-5 font-sans text-sm md:text-base text-templeBrown/85 space-y-2 text-left">
                    {item.topics[language].map((topic, tIdx) => (
                      <li key={tIdx}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Render pricing plans section */}
      <CoursesSection />
    </>
  );
};

export default Courses;
