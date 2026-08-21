import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import SectionLabel from '../components/ui/SectionLabel';
import MandalaBg from '../components/ui/MandalaBg';
import FloatingCard from '../components/ui/FloatingCard';
import { BookOpen, Activity } from 'lucide-react';
import { getBreadcrumbSchema } from '../seo/structuredData';

const About = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.about;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://www.thedivinegarbhsanskar.com/" },
    { name: "About", url: "https://www.thedivinegarbhsanskar.com/about" }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/about" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="relative pt-32 pb-20 overflow-hidden bg-softCream">
        <MandalaBg className="top-20 left-10 w-96 h-96 opacity-[0.05]" />
        <MandalaBg className="bottom-20 right-10 w-96 h-96 opacity-[0.05]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Headline */}
          <SectionLabel
            isPageHeader={true}
            label={t({ hi: "हमारी विरासत", en: "Our Roots", gu: "અમારી વિરાસત" })}
            titleHi={t({ hi: "दिव्य गर्भ संस्कार की स्थापना", en: "Establishment of Divine Garbh Sanskar", gu: "દિવ્ય ગર્ભ સંસ્કારની સ્થાપના" })}
          />


          {/* Vision Statement block */}
          <div className="bg-white border-2 border-divineGold/35 rounded-divine-md p-8 md:p-12 shadow-md mb-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-divineGold to-warmAmber" />
            <h3 className="text-xs font-bold text-vermillion tracking-wider uppercase mb-4">
              {t({ hi: "हमारा लक्ष्य · Our Vision", en: "Our Mission and Vision", gu: "અમારું લક્ષ્ય · Our Vision" })}
            </h3>
            
            <p className="font-sans text-lg md:text-xl font-bold text-sacredMaroon leading-relaxed mb-6">
              {t({
                hi: "“हमारा मुख्य उद्देश्य हर बच्चे को गर्भ से ही सुसंस्कृत, बुद्धिमान, स्वस्थ और संस्कारी बनाकर भारत की नई पीढ़ी को सशक्त बनाना है।”",
                en: "“Our vision is to nurture a highly evolved, intelligent, healthy, and values-driven future generation, starting right from the mother's womb.”",
                gu: "“અમારો મુખ્ય હેતુ દરેક બાળકને ગર્ભમાંથી જ સુસંસ્કારી, બુદ્ધિશાળી, સ્વસ્થ અને સંસ્કારી બનાવીને ભારતની નવી પેઢીને સશક્ત બનાવવાનો છે।”"
              })}
            </p>
            <p className="font-sans text-sm md:text-base text-templeBrown/80 leading-relaxed">
              {t({
                hi: "गर्भावस्था कोई बीमारी या केवल शारीरिक अवस्था नहीं है, बल्कि यह शिशु के चरित्र, बुद्धिमत्ता और स्वास्थ्य की नींव रखने का एक सुनहरा अवसर है। इसी विश्वास के साथ हमने प्राचीन ऋषियों की सीखों और आधुनिक विज्ञान का समन्वय कर इस कार्यक्रम का विकास किया है।",
                en: "Pregnancy is not just a physiological state; it is the ultimate window of opportunity to design a child's character, brain architecture, and immune health. By combining Vedic guidelines with modern prenatal psychology, we empower mothers to cultivate greatness.",
                gu: "ગર્ભાવસ્થા કોઈ બીમારી કે માત્ર શારીરિક અવસ્થા નથી, પરંતુ આ બાળકના ચારિત્ર્ય, બુદ્ધિમત્તા અને સ્વાસ્થ્યનો પાયો નાખવાની એક સુવર્ણ તક છે. આ જ વિશ્વાસ સાથે અમે પ્રાચીન ઋષિઓના જ્ઞાન અને આધુનિક વિજ્ઞાનનો સમન્વય કરીને આ કાર્યક્રમ તૈયાર કર્યો છે."
              })}
            </p>
          </div>

          {/* Historical vs Scientific Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Historical Card */}
            <FloatingCard className="bg-white p-8 rounded-divine-md border border-divineGold/35">
              <div className="w-12 h-12 rounded-full bg-sacredMaroon/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-sacredMaroon" />
              </div>
              <h3 className="font-sans font-bold text-xl text-sacredMaroon mb-3">
                {t({ hi: "सांस्कृतिक एवं वैदिक परंपरा (Vedic Heritage)", en: "Vedic Prenatal Tradition", gu: "સાંસ્કૃતિક અને વૈદિક પરંપરા" })}
              </h3>
              <p className="font-sans text-sm text-templeBrown/85 leading-relaxed text-left">
                {t({
                  hi: "भारतीय वैदिक परंपरा में गर्भावस्था के दौरान माँ के सकारात्मक परिवेश, स्वाध्याय और संस्कारों को विशेष महत्व दिया गया है। अभिमन्यु और प्रह्लाद की पारंपरिक कथाएं प्रसव पूर्व माता की मानसिक स्थिति और संस्कारों के महत्व को रेखांकित करती हैं।",
                  en: "Vedic tradition places profound emphasis on surrounding an expectant mother with positive thoughts, uplifting literature, and serene surroundings, celebrating the sacred journey of bringing life into the world.",
                  gu: "ભારતીય વૈદિક પરંપરામાં ગર્ભાવસ્થા દરમિયાન માતાના હકારાત્મક વાતાવરણ, સ્વાધ્યાય અને સંસ્કારોને વિશેષ મહત્વ આપવામાં આવ્યું છે. પૌરાણિક કથાઓ પ્રિનેટલ સંસ્કારોના મહત્વને પ્રતિબિંબિત કરે છે."
                })}
              </p>
            </FloatingCard>

            {/* Scientific Card */}
            <FloatingCard className="bg-white p-8 rounded-divine-md border border-divineGold/35" delay={0.2}>
              <div className="w-12 h-12 rounded-full bg-vermillion/10 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-vermillion" />
              </div>
              <h3 className="font-sans font-bold text-xl text-sacredMaroon mb-3">
                {t({ hi: "समग्र स्वास्थ्य दृष्टिकोण (Holistic Well-being)", en: "Maternal Health & Psychology", gu: "સર્વાંગી સ્વાસ્થ્ય અભિગમ" })}
              </h3>
              <p className="font-sans text-sm text-templeBrown/85 leading-relaxed text-left">
                {t({
                  hi: "आधुनिक मातृत्व स्वास्थ्य विज्ञान भी इस बात को स्वीकार करता है कि माँ का मानसिक तनाव कम होना, संतुलित पोषण और सकारात्मक विचार गर्भावस्था को सुखद बनाने और माँ-शिशु के स्वास्थ्य के लिए अत्यंत लाभकारी हैं।",
                  en: "Modern maternal health research emphasizes that managing stress, maintaining balanced nutrition, and cultivating emotional peace significantly benefit maternal well-being and mother-child bonding during pregnancy.",
                  gu: "આધુનિક માતૃત્વ સ્વાસ્થ્ય વિજ્ઞાન પણ સ્વીકારે છે કે માતાનો તણાવ ઓછો થવો, સંતુલિત પોષણ અને હકારાત્મક વિચારો ગર્ભાવસ્થાને સુખદ બનાવવા તેમજ માતા-બાળકના સ્વાસ્થ્ય માટે લાભદાયી છે."
                })}
              </p>
            </FloatingCard>

          </div>

          {/* Three pillars of Garbh Sanskar */}
          <div className="text-center">
            <h3 className="font-sans font-extrabold text-2xl text-sacredMaroon mb-8">
              {t({ hi: " गर्भ संस्कार के तीन मूल स्तंभ", en: "Three Pillars of Our Program", gu: "ગર્ભ સંસ્કારના ત્રણ મુખ્ય સ્તંભ" })}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: { hi: "आहार (Aahar - Nutrition)", en: "Aahar (Pure Nutrition)", gu: "આહાર (Aahar - Nutrition)" }, desc: { hi: "संतुलित, सात्विक और पोषक तत्वों से भरपूर आहार जो शिशु के अंगों के समुचित विकास में सहायक है।", en: "Satvik, balanced diet customized month-by-month for optimal baby physical growth.", gu: "સંતુલિત, સાત્વિક અને પોષક તત્વોથી ભરપૂર આહાર જે બાળકના અંગોના યોગ્ય વિકાસમાં મદદ કરે છે." } },
                { title: { hi: "विहार (Vihar - Activities)", en: "Vihar (Healthy Habits)", gu: "વિહાર (Vihar - Activities)" }, desc: { hi: "हल्का व्यायाम, योग, प्राणायाम और संगीत सुनना जो माँ के तनाव को दूर कर सकारात्मकता लाता है।", en: "Prenatal yoga, classical classical ragas, and creative activities to alleviate stress.", gu: "હળવી કસરત, યોગ, પ્રાણાયામ અને સંગીત સાંભળવું જે માતાના તણાવને દૂર કરી હકારાત્મકતા લાવે છે." } },
                { title: { hi: "विचार (Vichar - Mindset)", en: "Vichar (Pure Mindset)", gu: "વિચાર (Vichar - Mindset)" }, desc: { hi: "सकारात्मक सोच, मंत्रोच्चार और आध्यात्मिक स्वाध्याय जो शिशु के चरित्र का निर्माण करते हैं।", en: "Spiritual reflection, chanting, and positive visualizations to shape values.", gu: "હકારાત્મક વિચારસરણી, મંત્રોચ્ચાર અને આધ્યાત્મિક સ્વાધ્યાય જે બાળકના ચારિત્ર્યનું ઘડતર કરે છે." } }
              ].map((pillar, index) => (
                <div key={index} className="p-6 bg-white border border-divineGold/25 rounded-divine-sm shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-sans font-bold text-base md:text-lg text-sacredMaroon mb-2">{t(pillar.title)}</h4>
                  <p className="font-sans text-xs md:text-sm text-templeBrown/80 leading-relaxed">{t(pillar.desc)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Founder & Physical Center Spotlight for E-E-A-T */}
          <div className="mt-16 bg-white border-2 border-divineGold/35 rounded-divine-md p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <img
              src="/taruna.jpg"
              alt="Dr. Taruna Jiyani"
              className="w-32 h-32 rounded-full object-cover border-4 border-divineGold/40 shadow-md shrink-0"
              loading="lazy"
            />
            <div className="flex-1 text-center md:text-left space-y-3">
              <span className="inline-block px-3 py-1 bg-divineGold/20 text-sacredMaroon rounded-full text-xs font-bold uppercase tracking-wider">
                {t({ hi: "संस्थापक एवं मुख्य मार्गदर्शक", en: "Founder & Lead Counselor", gu: "સ્થાપક અને મુખ્ય સલાહકાર" })}
              </span>
              <h3 className="text-2xl font-serif text-sacredMaroon font-bold">
                Dr. Taruna Jiyani
              </h3>
              <p className="text-sm font-sans text-templeBrown/85 leading-relaxed">
                {t({
                  hi: "डॉ. तरुणा जियानी के मार्गदर्शन में 10,000+ से अधिक परिवारों ने वैदिक गर्भ संस्कार के माध्यम से सचेत मातृत्व का अनुभव किया है। हमारा मार्गदर्शन केंद्र सूरत, गुजरात में स्थित है।",
                  en: "Under Dr. Taruna Jiyani's leadership, over 10,000+ families have embraced conscious parenting through Vedic Garbh Sanskar. Our physical guidance center is located in Surat, Gujarat.",
                  gu: "ડૉ. તરુણા જીયાણીના માર્ગદર્શન હેઠળ ૧૦,૦૦૦+ થી વધુ પરિવારોએ વૈદિક ગર્ભ સંસ્કાર દ્વારા સભાન માતૃત્વનો અનુભવ કર્યો છે. અમારું માર્ગદર્શન કેન્દ્ર સુરત, ગુજરાતમાં આવેલું છે."
                })}
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start text-xs font-semibold">
                <a
                  href="/authors"
                  className="text-sacredMaroon font-bold hover:text-vermillion underline"
                >
                  {t({ hi: "संपादकीय टीम एवं लेखक प्रोफाइल देखें →", en: "View Authors & Editorial Team →", gu: "સંપાદકીય ટીમ અને લેખક પરિચય જુઓ →" })}
                </a>
                <a
                  href="/editorial-policy"
                  className="text-sacredMaroon font-bold hover:text-vermillion underline"
                >
                  {t({ hi: "संपादकीय नीति →", en: "Editorial Policy →", gu: "સંપાદકીય નીતિ →" })}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
