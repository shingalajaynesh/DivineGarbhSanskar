import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import MandalaBg from '../ui/MandalaBg';
import GoldenButton from '../ui/GoldenButton';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, ShieldCheck, CheckCircle2, MapPin, Mail, ArrowRight, UserCheck } from 'lucide-react';

const Faculty = () => {
  const { t } = useLanguage();

  const corePillars = [
    {
      icon: <BookOpen className="w-5 h-5 text-sacredMaroon shrink-0 mt-0.5" />,
      title: {
        hi: "वैदिक जीवनशैली एवं गर्भ संवाद",
        en: "Vedic Lifestyle & Garbh Samvad",
        gu: "વૈદિક જીવનશૈલી અને ગર્ભ સંવાદ"
      },
      desc: {
        hi: "आहार, विहार, विचार और सकारात्मक भावनाओं के माध्यम से गर्भस्थ शिशु के मानसिक व आध्यात्मिक विकास की वैदिक तकनीकें।",
        en: "Scriptural techniques of conscious communication, satvik nutrition, and emotional harmony for fetal development.",
        gu: "આહાર, વિહાર, વિચાર અને હકારાત્મક ભાવનાઓ દ્વારા ગર્ભસ્થ શિશુના માનસિક અને આધ્યાત્મિક વિકાસની પદ્ધતિઓ."
      }
    },
    {
      icon: <Heart className="w-5 h-5 text-vermillion shrink-0 mt-0.5" />,
      title: {
        hi: "मातृ कल्याण और तनाव प्रबंधन",
        en: "Maternal Wellness & Stress Management",
        gu: "માતૃ કલ્યાણ અને તણાવ વ્યવસ્થાપન"
      },
      desc: {
        hi: "गर्भावस्था के दौरान तनाव को कम करने, मानसिक शांति बनाए रखने और एक सकारात्मक वातावरण तैयार करने के व्यावहारिक तरीके।",
        en: "Practical relaxation techniques and mindful routines to reduce daily stress and cultivate emotional calm during pregnancy.",
        gu: "ગર્ભાવસ્થા દરમિયાન તણાવ હળવો કરવા, માનસિક શાંતિ જાળવવા અને હકારાત્મક વાતાવરણ સર્જવા માટેની વ્યવહારુ પદ્ધતિઓ."
      }
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-sacredMaroon shrink-0 mt-0.5" />,
      title: {
        hi: "व्यक्तिगत 1:1 पारिवारिक मार्गदर्शन",
        en: "Personalized 1:1 Trimester Counseling",
        gu: "વ્યક્તિગત ૧:૧ પારિવારિક માર્ગદર્શન"
      },
      desc: {
        hi: "प्रत्येक माता और शिशु की विशिष्ट आवश्यकताओं के अनुसार हर महीने का व्यक्तिगत चेकअप और परामर्श।",
        en: "Tailored monthly consultations catering to the unique physical and emotional milestones of each mother.",
        gu: "દરેક માતા અને શિશુની વિશિષ્ટ જરૂરિયાતો મુજબ દર મહિનાનું વ્યક્તિગત ચેકઅપ અને પરામર્શ."
      }
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-softCream/20 to-white overflow-hidden border-b border-divineGold/15" id="mentor-section">
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.035] text-divineGold pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <span className="text-vermillion font-bold text-xs md:text-sm tracking-wider mb-3 uppercase bg-vermillion/5 px-4 py-1.5 rounded-full border border-vermillion/15 w-fit">
            {t({ hi: "संस्थापक एवं मुख्य मार्गदर्शक", en: "Founder & Chief Counselor", gu: "સ્થાપક અને મુખ્ય માર્ગદર્શક" })}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-sacredMaroon leading-tight font-medium mb-4">
            {t({
              hi: "डॉ. तरुणा जियाणी के सान्निध्य में सीखें",
              en: "Guiding Your Divine Journey: Dr. Taruna Jiyani",
              gu: "ડૉ. તરુણા જીયાણીના માર્ગદર્શન હેઠળ શીખો"
            })}
          </h2>
          <p className="font-sans text-base md:text-lg text-templeBrown/80 leading-relaxed">
            {t({
              hi: "१०,०००+ परिवारों को वैदिक गर्भ संस्कार और आधुनिक मातृत्व की शक्ति से जोड़ने वाली समर्पित मार्गदर्शिका।",
              en: "Pioneering the revival of authentic Vedic Garbh Sanskar science with compassionate, evidence-based prenatal counseling.",
              gu: "૧૦,૦૦૦+ પરિવારોને વૈદિક ગર્ભ સંસ્કાર અને આધુનિક માતૃત્વની શક્તિ સાથે જોડનાર સમર્પિત માર્ગદર્શક."
            })}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-divineGold to-transparent mt-4 rounded-full" />
        </div>

        {/* Grand Founder Showcase Card */}
        <div className="bg-white border-2 border-divineGold/35 rounded-divine-lg p-6 sm:p-10 lg:p-14 shadow-xl shadow-sacredMaroon/5 relative overflow-hidden">
          
          {/* Subtle Corner Accent Gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-divineGold/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sacredMaroon/5 to-transparent rounded-tr-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Portrait & Credential Badges */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              
              {/* Portrait Container with Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8">
                {/* Outer Golden Aura Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-divineGold/60 animate-rotate-slow" />
                <div className="absolute inset-2.5 rounded-full border-2 border-divineGold/40" />
                
                {/* Main Photo */}
                <img
                  src="/taruna.jpg"
                  alt={t({ hi: "डॉ. तरुणा जियाणी - दिव्य गर्भ संस्कार", en: "Dr. Taruna Jiyani - Divine Garbh Sanskar", gu: "ડૉ. તરુણા જીયાણી - દિવ્ય ગર્ભ સંસ્કાર" })}
                  className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full object-cover shadow-lg border-4 border-white bg-softCream/30"
                  loading="lazy"
                />

                {/* Verified Specialist Floating Badge */}
                <div className="absolute -bottom-2 right-4 bg-sacredMaroon border-2 border-divineGold text-white py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <UserCheck className="w-4 h-4 text-divineGold shrink-0" />
                  <span className="text-[11px] font-bold tracking-wider uppercase">Lead Specialist</span>
                </div>
              </div>

              {/* Founder Credentials Strip */}
              <div className="w-full grid grid-cols-2 gap-3 pt-2">
                <div className="bg-softCream/40 border border-divineGold/30 p-3.5 rounded-2xl text-center">
                  <span className="block font-serif font-bold text-xl text-sacredMaroon">10,000+</span>
                  <span className="text-[11px] text-templeBrown font-semibold uppercase tracking-wider">
                    {t({ hi: "मार्गदर्शित माताएं", en: "Mothers Guided", gu: "માર્ગદર્શિત માતાઓ" })}
                  </span>
                </div>

                <div className="bg-softCream/40 border border-divineGold/30 p-3.5 rounded-2xl text-center">
                  <span className="block font-serif font-bold text-xl text-sacredMaroon">100%</span>
                  <span className="text-[11px] text-templeBrown font-semibold uppercase tracking-wider">
                    {t({ hi: "वैदिक + वैज्ञानिक", en: "Vedic Science", gu: "વૈદિક + વિજ્ઞાન" })}
                  </span>
                </div>
              </div>

              {/* Location Tag */}
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-sacredMaroon/80 bg-sacredMaroon/5 px-3.5 py-1 rounded-full border border-sacredMaroon/10">
                <MapPin className="w-3.5 h-3.5 text-sacredMaroon" />
                <span>{t({ hi: "मार्गदर्शन केंद्र, सूरत, गुजरात", en: "Surat Guidance Center, Gujarat", gu: "માર્ગદર્શન કેન્દ્ર, સુરત, ગુજરાત" })}</span>
              </div>
            </div>

            {/* Right Column: Founder's Mission, Philosophy & Key Pillars */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              
              {/* Designation Pill */}
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 bg-divineGold/20 text-sacredMaroon rounded-full text-xs font-bold uppercase tracking-wider border border-divineGold/40">
                  {t({ hi: "संस्थापक एवं मुख्य मार्गदर्शक", en: "Founder & Lead Counselor", gu: "સ્થાપક અને મુખ્ય સલાહકાર" })}
                </span>
              </div>

              {/* Name */}
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-sacredMaroon font-bold leading-tight">
                  Dr. Taruna Jiyani
                </h3>
                <p className="font-sans text-sm sm:text-base text-templeBrown/85 font-medium mt-1">
                  {t({
                    hi: "एन.डी. (नेचरोपैथी एवं वैकल्पिक स्वास्थ्य) • प्रमाणित वैदिक गर्भ संस्कार परामर्शदाता",
                    en: "N.D. (Alternative Wellness / Naturopathy) • Certified Vedic Garbh Sanskar Educator",
                    gu: "એન.ડી. (નેચરોપેથી અને વૈકલ્પિક સુખાકારી) • પ્રમાણિત વૈદિક ગર્ભ સંસ્કાર સલાહકાર"
                  })}
                </p>
              </div>

              {/* Philosophy Quote Box */}
              <div className="bg-gradient-to-r from-sacredMaroon/5 via-divineGold/10 to-transparent border-l-4 border-sacredMaroon p-4 sm:p-5 rounded-r-2xl">
                <p className="font-serif text-sm sm:text-base text-sacredMaroon font-medium italic leading-relaxed">
                  {t({
                    hi: "“गर्भस्थ शिशु मात्र एक जैविक संरचना नहीं है, बल्कि उसके मन, बुद्धि और संस्कारों की नींव माता के हर विचार, भाव और ध्वनि से आकार लेती है।”",
                    en: "“A child in the womb is not merely a biological entity — their intellect, emotional resilience, and lifelong values are shaped by every thought, prayer, and vibration of the mother.”",
                    gu: "“ગર્ભસ્થ શિશુ માત્ર એક જૈવિક રચના નથી, પરંતુ તેના મન, બુદ્ધિ અને સંસ્કારોનો પાયો માતાના દરેક વિચાર, ભાવ અને ધ્વનિથી ઘડાય છે.”"
                  })}
                </p>
              </div>

              {/* 3 Core Methodology Pillars */}
              <div className="space-y-3.5 pt-1">
                {corePillars.map((pillar, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start p-3 bg-softCream/20 rounded-xl border border-divineGold/15 hover:border-divineGold/40 transition-colors">
                    <div className="p-2 bg-white rounded-lg shadow-xs border border-divineGold/20">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-sacredMaroon">
                        {t(pillar.title)}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-templeBrown/80 leading-relaxed mt-0.5">
                        {t(pillar.desc)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Action Row */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link to="/contact">
                  <GoldenButton className="py-3 px-7 text-xs sm:text-sm shadow-md">
                    {t({ hi: "डॉ. तरुणा से परामर्श लें", en: "Book 1:1 Consultation", gu: "ડૉ. તરુણા સાથે પરામર્શ લો" })}
                  </GoldenButton>
                </Link>

                <Link
                  to="/authors"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-sacredMaroon/20 hover:border-sacredMaroon/60 text-sacredMaroon font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:bg-sacredMaroon/5"
                >
                  <span>{t({ hi: "लेखक एवं संपादकीय प्रोफाइल", en: "View Author Profile", gu: "લેખક પરિચય જુઓ" })}</span>
                  <ArrowRight className="w-4 h-4 text-sacredMaroon" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Faculty;
