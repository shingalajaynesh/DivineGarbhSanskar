import React from 'react';
import { BookOpen, ShoppingBag, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import FloatingCard from '../ui/FloatingCard';
import { Link } from 'react-router-dom';

const BookStore = () => {
  const { t } = useLanguage();

  const books = [
    {
      title: { hi: "दिव्य गर्भ संस्कार मार्गदर्शिका", en: "Divine Garbh Sanskar Guidebook", gu: "દિવ્ય ગર્ભ સંસ્કાર માર્ગદર્શિકા" },
      lang: { hi: "भाषा: हिंदी / गुजराती", en: "Lang: Hindi / Gujarati", gu: "ભાષા: હિન્દી / ગુજરાતી" },
      price: "₹350",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=250",
      bullets: {
        hi: [
          "माहवार गर्भावस्था दिनचर्या",
          "सचित्र योग एवं प्राणायाम गाइड",
          "मस्तिष्क विकास की वैज्ञानिक क्रियाएं"
        ],
        en: [
          "Month-by-month pregnancy guides",
          "Illustrated prenatal yoga steps",
          "Brain exercises for fetus"
        ],
        gu: [
          "મહિનાવાર ગર્ભાવસ્થા દિનચર્યા",
          "સચિત્ર યોગ અને પ્રાણાયામ ગાઈડ",
          "મગજના વિકાસ માટેની વૈજ્ઞાનિક પ્રવૃત્તિઓ"
        ]
      }
    },
    {
      title: { hi: "राग चिकित्सा और गर्भ संगीत", en: "Raag Therapy & Garbh Music", gu: "રાગ ચિકિત્સા અને ગર્ભ સંગીત" },
      lang: { hi: "भाषा: हिंदी / अंग्रेजी", en: "Lang: Hindi / English", gu: "ભાષા: હિન્દી / અંગ્રેજી" },
      price: "₹400",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=250",
      bullets: {
        hi: [
          "राग संगीत के वैज्ञानिक प्रमाण",
          "सुनने के लिए रागों की समय सारणी",
          "मंत्रोच्चार के साथ अभ्यास पुस्तिका"
        ],
        en: [
          "Scientific proofs of raga healing",
          "Schedules for classical listening",
          "Vedic chants handbook & lyrics"
        ],
        gu: [
          "રાગ સંગીતના વૈજ્ઞાનિક પુરાવા",
          "સાંભળવા માટે રાગોનું સમયપત્રક",
          "મંત્રોચ્ચાર સાથે અભ્યાસ પુસ્તિકા"
        ]
      }
    },
    {
      title: { hi: "गर्भ आहार और स्वस्थ जीवन शैली", en: "Prenatal Nutrition & Wellness", gu: "ગર્ભ આહાર અને સ્વસ્થ જીવનશૈલી" },
      lang: { hi: "भाषा: बहुभाषी (Multilingual)", en: "Lang: Multilingual", gu: "ભાષા: બહુભાષી (Multilingual)" },
      price: "₹450",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=250",
      bullets: {
        hi: [
          "त्रैमासिक आहार चार्ट योजना",
          "स्वस्थ और पोष्टिक भारतीय व्यंजन",
          "आयुर्वेदिक जड़ी-बूटी सेवन सलाह"
        ],
        en: [
          "Trimester-specific diet maps",
          "Nutritious Indian pregnancy recipes",
          "Ayurvedic herb dosage guidance"
        ],
        gu: [
          "ત્રિમાસિક આહાર ચાર્ટ યોજના",
          "સ્વસ્થ અને પૌષ્ટિક ભારતીય વાનગીઓ",
          "આયુર્વેદિક જડીબુટ્ટી સેવનની સલાહ"
        ]
      }
    }
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "हमारी पुस्तकें", en: "Vedic Literature", gu: "અમારા પુસ્તકો" })}
          titleHi={t({ hi: "सच्चा ज्ञान, घर बैठे पाएं", en: "Authored Guides & Literature for Expectant Parents", gu: "સાચું જ્ઞાન, ઘરે બેઠા મેળવો" })}
        />

        {/* Books cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {books.map((book, idx) => (
            <FloatingCard
              key={idx}
              delay={idx * 0.1}
              className="bg-white border border-divineGold/25 rounded-divine-md p-6 flex flex-col justify-between"
            >
              
              <div>
                {/* Image Book Cover */}
                <div className="relative aspect-[4/5] max-w-[180px] mx-auto overflow-hidden rounded-md border border-divineGold/20 shadow-md mb-6">
                  <img
                    src={book.image}
                    alt={t(book.title)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Category icon */}
                  <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-vermillion text-white flex items-center justify-center shadow-md">
                    <BookOpen className="w-4 h-4" />
                  </span>
                </div>

                {/* Info Text */}
                <div className="text-center md:text-left">
                  {/* Language badge */}
                  <span className="inline-block bg-softCream border border-divineGold/40 text-[10px] text-sacredMaroon font-sans font-bold px-2 py-0.5 rounded-full mb-2.5">
                    {t(book.lang)}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-sans font-bold text-lg text-sacredMaroon mb-4 line-clamp-1">
                    {t(book.title)}
                  </h3>

                  {/* Bullet features */}
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-templeBrown/80 mb-6 text-left pl-1">
                    {t(book.bullets).map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2.5 items-start">
                        <Check className="w-4.5 h-4.5 text-divineGold shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Buy Button */}
              <div className="border-t border-divineGold/20 pt-4 flex items-center justify-between gap-4">
                <span className="font-sans text-2xl font-black text-sacredMaroon">
                  {book.price}
                </span>
                
                <Link to="/contact">
                  <button className="flex items-center gap-2 bg-sacredMaroon hover:bg-vermillion text-white font-accent font-bold text-xs uppercase px-4 py-2.5 rounded-divine-sm shadow-md transition-all">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t({ hi: "अभी खरीदें", en: "Order Now" })}</span>
                  </button>
                </Link>
              </div>

            </FloatingCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BookStore;
