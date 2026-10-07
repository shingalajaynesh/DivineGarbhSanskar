import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import SectionLabel from '../components/ui/SectionLabel';
import MandalaBg from '../components/ui/MandalaBg';
import { getCoursesSchema, getBreadcrumbSchema } from '../seo/structuredData';
import { courses } from '../data/courses';

const Courses = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.courses;

  const coursesSchema = getCoursesSchema(courses);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://www.thedivinegarbhsanskar.com/" },
    { name: "Courses", url: "https://www.thedivinegarbhsanskar.com/courses" }
  ]);

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
          "शिशु के संवेदी विकास और सौम्य श्रवण उत्तेजना",
          "राग संगीत चिकित्सा (Raga Therapy) और सृजनात्मक क्रियाएं",
          "गर्भ संवाद (Talk to Baby) - पिता की भूमिका की शुरुआत"
        ],
        en: [
          "Sensory development and gentle auditory stimulation",
          "Classical Indian Ragas for soothing maternal relaxation",
          "Garbh Samvad (womb talk) and husband-led voice bonding"
        ],
        gu: [
          "બાળકના સંવેદી વિકાસ અને સૌમ્ય શ્રવણ ઉત્તેજના",
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
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/courses" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(coursesSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="relative pt-32 pb-12 overflow-hidden bg-softCream">
        <MandalaBg className="top-12 right-12 w-80 h-80 opacity-[0.04]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Headings */}
          <SectionLabel
            isPageHeader={true}
            label={t({ hi: "पाठ्यक्रम रूपरेखा", en: "Curriculum Map", gu: "અભ્યાસક્રમ રૂપરેખા" })}
            titleHi={t({ hi: "गर्भ संस्कार पाठ्यक्रम रूपरेखा", en: "Garbh Sanskar Curriculum Map", gu: "ગર્ભ સંસ્કાર અભ્યાસક્રમ રૂપરેખા" })}
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

          {/* Direct Consultation & Live Event Banner */}
          <div className="bg-gradient-to-r from-sacredMaroon to-[#3F0F00] text-white rounded-divine-lg p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden mb-12">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-amber-300/30 inline-block">
                {t({ hi: "व्यक्तिगत मार्गदर्शन", en: "1:1 Personal Guidance", gu: "વ્યક્તિગત માર્ગદર્શન" })}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                {t({
                  hi: "डॉ. तरुणा जियाणी के साथ 1:1 परामर्श बुक करें",
                  en: "Schedule 1:1 Counseling with Dr. Taruna Jiyani",
                  gu: "ડૉ. તરુણા જીયાણી સાથે ૧:૧ પરામર્શ બુક કરો"
                })}
              </h3>
              <p className="text-sm text-softCream/90 leading-relaxed">
                {t({
                  hi: "अपनी गर्भावस्था के प्रत्येक चरण के लिए आहार, योग, गर्भ संवाद और मानसिक शांति का व्यक्तिगत मार्गदर्शन प्राप्त करें।",
                  en: "Receive personalized prenatal lifestyle guidance, satvik diet plans, and womb communication methods tailored to your trimester.",
                  gu: "તમારી ગર્ભાવસ્થાના દરેક તબક્કા માટે આહાર, યોગ, ગર્ભ સંવાદ અને માનસિક શાંતિનું વ્યક્તિગત માર્ગદર્શન મેળવો."
                })}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/919586979897?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%2C%20%E0%AA%AE%E0%AA%BE%E0%AA%B0%E0%AB%87%20%E0%AA%A1%E0%AB%89.%20%E0%AA%A4%E0%AA%B0%E0%AB%81%E0%AA%A3%E0%AA%BE%20%E0%AA%9C%E0%AB%80%E0%AA%AF%E0%AA%BE%E0%AA%A3%E0%AB%80%20%E0%AA%B8%E0%AA%BE%E0%AA%A5%E0%AB%87%20%E0%AA%97%E0%AA%B0%E0%AB%8D%E0%AA%AD%20%E0%AA%B8%E0%AA%82%E0%AA%B8%E0%AB%8D%E0%AA%95%E0%AA%BE%E0%AA%B0%20%E0%AA%AA%E0%AA%B0%E0%AA%BE%E0%AA%AE%E0%AA%B0%E0%AB%8D%E0%AA%B6%20%E0%AA%AE%E0%AA%BE%E0%AA%9F%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%97%E0%AA%A4%20%E0%AA%9C%E0%AB%8B%E0%AA%88%E0%AA%8F%20%E0%AA%9B%E0%AB%87."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{t({ hi: "WhatsApp पर परामर्श बुक करें", en: "Book via WhatsApp", gu: "WhatsApp પર પરામર્શ બુક કરો" })}</span>
              </a>

              <Link
                to="/events/divy-garbhyatra"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-sacredMaroon font-extrabold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>{t({ hi: "दिव्य गर्भयात्रा कपल सेमिनार देखें", en: "View Divya Garbh Yatra Event", gu: "દિવ્ય ગર્ભયાત્રા કપલ સેમિનાર જુઓ" })}</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Courses;
