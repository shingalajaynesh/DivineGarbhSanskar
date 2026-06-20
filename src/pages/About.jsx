import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import SectionLabel from '../components/ui/SectionLabel';
import MandalaBg from '../components/ui/MandalaBg';
import FloatingCard from '../components/ui/FloatingCard';
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
            <h3 className="font-accent text-xs font-black text-vermillion tracking-wider uppercase mb-4">
              {t({ hi: "✦ हमारा लक्ष्य · OUR VISION ✦", en: "✦ OUR MISSION & VISION ✦", gu: "✦ અમારું લક્ષ્ય · OUR VISION ✦" })}
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
              <div className="text-3xl mb-4">📜</div>
              <h3 className="font-sans font-bold text-xl text-sacredMaroon mb-3">
                {t({ hi: "ऐतिहासिक परंपरा (Vedic History)", en: "Vedic Prenatal Science", gu: "ઐતિહાસિક પરંપરા (Vedic History)" })}
              </h3>
              <p className="font-sans text-sm text-templeBrown/85 leading-relaxed text-left">
                {t({
                  hi: "वेदों और उपनिषदों में स्पष्ट उल्लेख है कि गर्भ में पल रहा शिशु सुनता है, समझता है और सीखता है। अभिमन्यु ने चक्रव्यूह भेदने की कला अपनी माँ सुभद्रा के गर्भ में ही सीखी थी। इसी प्रकार प्रह्लाद ने गर्भ में ही नारद मुनि से भक्ति मार्ग का ज्ञान प्राप्त किया था।",
                  en: "Vedic literature explains that the fetus possesses active sensory registers. Abhimanyu learned the art of penetrating military formations in Subhadra's womb, while Prahlad received spiritual lessons from Sage Narada before birth.",
                  gu: "વેદો અને ઉપનિષદોમાં સ્પષ્ટ ઉલ્લેખ છે કે ગર્ભમાં ઉછરી રહેલું બાળક સાંભળે છે, સમજે છે અને શીખે છે. અભિમન્યુએ ચક્રવ્યૂહ ભેદવાની કળા પોતાની માતા સુભદ્રાના ગર્ભમાં જ શીખી હતી. તેવી જ રીતે પ્રહલાદે ગર્ભમાં જ નારદ મુનિ પાસેથી ભક્તિ માર્ગનું જ્ઞાન મેળવ્યું હતું."
                })}
              </p>
            </FloatingCard>

            {/* Scientific Card */}
            <FloatingCard className="bg-white p-8 rounded-divine-md border border-divineGold/35" delay={0.2}>
              <div className="text-3xl mb-4">🧬</div>
              <h3 className="font-sans font-bold text-xl text-sacredMaroon mb-3">
                {t({ hi: "वैज्ञानिक दृष्टिकोण (Modern Science)", en: "Epigenetics & Biology", gu: "વૈજ્ઞાનિક દ્રષ્ટિકોણ (Modern Science)" })}
              </h3>
              <p className="font-sans text-sm text-templeBrown/85 leading-relaxed text-left">
                {t({
                  hi: "आधुनिक एपिजेनेटिक्स (Epigenetics) और न्यूरो-एम्ब्रियोलॉजी बताती है कि गर्भस्थ शिशु का मस्तिष्क तेजी से न्यूरॉन्स का निर्माण करता है। माँ के भावनात्मक हॉर्मोन्स (ऑक्सीटोसिन, एंडोर्फिन) गर्भनाल के जरिए शिशु के विकास को सीधे प्रभावित करते हैं।",
                  en: "Modern science corroborates that maternal emotions generate neurotransmitters and chemical hormones that cross the placental barrier. Epigenetics shows that parent environments literally activate or silence genes in the fetus.",
                  gu: "આધુનિક એપિજેનેટિક્સ (Epigenetics) અને ન્યુરો-એમ્બ્રીયોલોજી દર્શાવે છે કે ગર્ભસ્થ બાળકનું મગજ ઝડપથી ન્યુરોન્સનું નિર્માણ કરે છે. માતાના ભાવનાત્મક હોર્મોન્સ (ઓક્સિટોસિન, એન્ડોર્ફિન) પ્લેસેન્ટા દ્વારા બાળકના વિકાસને સીધી અસર કરે છે."
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

        </div>
      </div>
    </>
  );
};

export default About;
