import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import SectionLabel from '../components/ui/SectionLabel';
import GoldenButton from '../components/ui/GoldenButton';
import MandalaBg from '../components/ui/MandalaBg';
import { BookOpen, Sparkles, Heart, Check, Phone, Star, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClassGallery from '../components/sections/ClassGallery';
import { seoConfig } from '../seo/seoConfig';
import { getBreadcrumbSchema } from '../seo/structuredData';


const Simantonayan = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.simantonayan;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://www.thedivinegarbhsanskar.com/" },
    { name: "Simantonayan", url: "https://www.thedivinegarbhsanskar.com/simantonayan" }
  ]);

  const benefits = [

    {
      title: {
        en: "Brain & Sensory Stimulation",
        hi: "मस्तिष्क और संवेदी उत्तेजना",
        gu: "મગજ અને સંવેદનાત્મક ઉત્તેજના"
      },
      desc: {
        en: "Vedic techniques to stimulate the fetus's cognitive functions and active senses in the womb during the critical third trimester.",
        hi: "तीसरी तिमाही के महत्वपूर्ण समय में गर्भ में पल रहे बच्चे के संज्ञानात्मक कार्यों और सक्रिय इंद्रियों को उत्तेजित करने की वैदिक तकनीकें।",
        gu: "ત્રીજી ત્રિમાસિકના મહત્વપૂર્ણ સમયમાં ગર્ભમાં રહેલા બાળકના જ્ઞાનાત્મક કાર્યો અને સક્રિય ઇન્દ્રિયોને ઉત્તેજિત કરવાની વૈદિક પદ્ધતિઓ."
      },
      icon: "🧠"
    },
    {
      title: {
        en: "Maternal Stress Reduction",
        hi: "तनाव से मुक्ति और मानसिक शांति",
        gu: "તણાવ મુક્તિ અને માનસિક શાંતિ"
      },
      desc: {
        en: "Surrounding the mother with positive vibrations, scriptural chanting, and family bonding to lower cortisol levels and nurture happiness.",
        hi: "सकारात्मक तरंगों, वैदिक मंत्रोच्चार और पारिवारिक जुड़ाव से माँ में कोर्टिसोल के स्तर को कम करना और आंतरिक प्रसन्नता को बढ़ावा देना।",
        gu: "હકારાત્મક સ્પંદનો, વૈદિક મંત્રોચ્ચાર અને પારિવારિક સ્નેહ દ્વારા માતામાં તણાવ હોર્મોન્સ ઘટાડી આંતરિક ખુશી વધારવી."
      },
      icon: "🧘"
    },
    {
      title: {
        en: "Spiritual Protection (Garbh Raksha)",
        hi: "आध्यात्मिक सुरक्षा कवच",
        gu: "આધ્યાત્મિક સુરક્ષા કવચ"
      },
      desc: {
        en: "Invoking cosmic energies and divine blessings through sacred mantras for the safety and healthy development of the mother and unborn child.",
        hi: "माँ और अजन्मे बच्चे की सुरक्षा और स्वस्थ विकास के लिए पवित्र मंत्रों के माध्यम से ब्रह्मांडीय ऊर्जा और दिव्य आशीर्वाद का आह्वान करना।",
        gu: "માતા અને અજાત બાળકની રક્ષા અને તંદુરસ્ત વિકાસ માટે પવિત્ર મંત્રો દ્વારા દિવ્ય આશીર્વાદ પ્રાપ્ત કરવા."
      },
      icon: "🕉️"
    }
  ];

  const ritualSteps = [
    {
      title: {
        en: "1. Couple Connection & Alignment",
        hi: "1. दंपत्ति जुड़ाव और सामंजस्य",
        gu: "1. દંપતી જોડાણ અને સંવાદિતા"
      },
      desc: {
        en: "We align both husband and wife through counseling to prepare them emotionally for the sacred welcoming ritual.",
        hi: "हम परामर्श के माध्यम से पति-पत्नी दोनों को मानसिक और भावनात्मक रूप से इस पवित्र अनुष्ठान की तैयारी के लिए तैयार करते हैं।",
        gu: "અમે કાઉન્સેલિંગ દ્વારા પતિ-પત્ની બંનેને માનસિક અને ભાવનાત્મક રીતે આ પવિત્ર વિધિ માટે તૈયાર કરીએ છીએ."
      }
    },
    {
      title: {
        en: "2. Vedic Hair-Parting Ritual (Seemantham)",
        hi: "2. सीमंतोन्नयन विधि (केस संवारना)",
        gu: "2. સીમંતોન્નયન વિધિ (વાળ ઓળવા)"
      },
      desc: {
        en: "Symbolic parting of the mother's hair upward, accompanied by sacred mantras, designed to stimulate the brain center of the child.",
        hi: "माँ के बालों को ऊपर की ओर संवारने की प्रतीकात्मक विधि, जिसे बच्चे के मस्तिष्क केंद्र को सक्रिय करने वाले पवित्र मंत्रों के साथ किया जाता है।",
        gu: "માતાના વાળને ઉપરની તરફ ઓળવાની પ્રતીકાત્મક વિધિ, જે બાળકના મગજના કેન્દ્રોને ઉત્તેજિત કરતા પવિત્ર મંત્રોચ્ચાર સાથે કરવામાં આવે છે."
      }
    },
    {
      title: {
        en: "3. Sacred Sound (Mantra) Infusion",
        hi: "3. दिव्य ध्वनि और ध्वनि चिकित्सा",
        gu: "3. દિવ્ય ધ્વનિ અને નાદ ચિકિત્સા"
      },
      desc: {
        en: "Infusing the home environment with specific Raag music and soundscapes that match the biological rhythm of the fetus.",
        hi: "घर के वातावरण को विशिष्ट राग संगीत और मंत्र तरंगों से भरना जो गर्भ में पल रहे बच्चे की जैविक लय के साथ मेल खाते हैं।",
        gu: "ઘરના વાતાવરણને વિશિષ્ટ રાગ સંગીત અને મંત્ર તરંગોથી સમૃદ્ધ બનાવવું જે ગર્ભસ્થ શિશુની જૈવિક લય સાથે મેળ ખાય છે."
      }
    },
    {
      title: {
        en: "4. Positive Environmental Designing",
        hi: "4. सकारात्मक वातावरण निर्माण",
        gu: "4. હકારાત્મક વાતાવરણ નિર્માણ"
      },
      desc: {
        en: "Guiding the family on creating a peaceful home sanctuary filled with pure, sensory-rich inputs for the mother.",
        hi: "परिवार को घर में एक शांतिपूर्ण अभयारण्य बनाने के लिए निर्देशित करना, जो माँ के लिए शुद्ध और प्रेरक संवेदी अनुभवों से भरा हो।",
        gu: "પરિવારને ઘરમાં એક શાંતિપૂર્ણ પવિત્ર વાતાવરણ ઊભું કરવા માર્ગદર્શન આપવું, જે માતા માટે શુદ્ધ અને પ્રેરક અનુભવોથી ભરપૂર હોય."
      }
    }
  ];



  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/simantonayan" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>


      <div className="pt-24 pb-16 min-h-screen bg-softCream/30">
        
        {/* Hero Banner Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-templeBrown to-sacredMaroon text-white overflow-hidden border-b-4 border-divineGold/35">
          <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.06] text-divineGold" />
          
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <span className="font-accent text-divineGold text-xs md:text-sm font-bold tracking-[0.25em] uppercase block mb-3">
              {t({ hi: "१६ संस्कारों में से एक दिव्य संस्कार", en: "A Sacred Prenatal Rite of Passage", gu: "૧૬ સંસ્કારોમાંનો એક દિવ્ય સંસ્કાર" })}
            </span>
            <h1 className="font-devanagari text-3xl md:text-5xl font-normal text-white leading-tight">
              {t({ hi: "सीमंतोन्नयन संस्कार मार्गदर्शन", en: "Simantonayan Sanskar Guidance", gu: "સીમંતોન્નયન સંસ્કાર માર્ગદર્શન" })}
            </h1>
            <p className="font-sans text-sm md:text-lg text-softCream/80 max-w-2xl mx-auto mt-6 leading-relaxed">
              {t({
                hi: "गर्भावस्था के ७वें या ८वें महीने में किया जाने वाला एक पवित्र अनुष्ठान, जो अजन्मे बच्चे के सर्वोत्तम मानसिक व बौद्धिक विकास तथा माँ की पूर्ण सुरक्षा सुनिश्चित करता है।",
                en: "A divine prenatal ceremony performed during the 7th or 8th month of pregnancy, designed to elevate the mother's state of mind and stimulate the child's intellect in the womb.",
                gu: "ગર્ભાવસ્થાના ૭મા કે ૮મા મહિનામાં કરવામાં આવતી એક પવિત્ર વિધિ, જે અજાત બાળકના શ્રેષ્ઠ માનસિક વિકાસ અને માતાની પૂર્ણ સુરક્ષા સુનિશ્ચિત કરે છે."
              })}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/contact">
                <GoldenButton className="py-3 px-6 text-sm">
                  {t({ hi: "निःशुल्क परामर्श लें", en: "Book Expert Ritual Consultation", gu: "મફત પરામર્શ મેળવો" })}
                </GoldenButton>
              </Link>
              <a
                href="https://www.instagram.com/simantonayan_sanskar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-divineGold/50 text-white font-accent font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white/5 active:scale-98 transition-all"
              >
                <Instagram className="w-4.5 h-4.5 text-divineGold" />
                <span>{t({ hi: "इंस्टाग्राम देखें", en: "See Live Rituals", gu: "ઇન્સ્ટાગ્રામ જુઓ" })}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: What is it & Vedic Essence */}
        <section className="py-16 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-divineGold/10 rounded-divine-lg blur-2xl -z-10" />
            <img
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600"
              alt={t({ hi: "पवित्र सीमंतोन्नयन संस्कार समारोह", en: "Sacred Simantonayan Sanskar Ceremony", gu: "પવિત્ર સીમંતોન્નયન સંસ્કાર વિધિ" })}
              className="rounded-divine-lg border-2 border-divineGold/40 shadow-xl w-full h-[320px] md:h-[400px] object-cover"
            />

            <div className="absolute -bottom-4 -right-4 bg-white border border-divineGold/35 p-3 rounded-2xl shadow-lg flex items-center gap-2">
              <span className="text-xl">🩺</span>
              <div className="text-left">
                <span className="text-[10px] text-sacredMaroon font-bold uppercase tracking-wider block">Specialist</span>
                <span className="text-xs font-black text-templeBrown">Dr. Taruna Jiyani</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-accent text-xs font-bold text-vermillion tracking-widest uppercase mb-3 block">
              {t({ hi: "विधि का सार", en: "Vedic Essence", gu: "વિધિનો સાર" })}
            </span>
            <h2 className="font-devanagari text-2xl md:text-3xl font-normal text-sacredMaroon leading-tight">
              {t({ hi: "सीमंतोन्नयन का गहरा अर्थ और महत्व", en: "The Sacred Meaning of Seemantonnayana", gu: "સીમંતોન્નયનનો ગૂઢ અર્થ અને મહત્વ" })}
            </h2>
            <p className="font-sans text-sm md:text-base text-templeBrown/85 leading-relaxed mt-4">
              {t({
                hi: "सीमंतोन्नयन शब्द दो शब्दों से मिलकर बना है: 'सीमंत' (मांग/बालों का मध्य) और 'उन्नयन' (ऊपर उठाना)। इस अनुष्ठान में पति द्वारा पत्नी के बालों को ऊपर की ओर संवारा जाता है। यह क्रिया माँ के तंत्रिका तंत्र और बच्चे की संवेदी इंद्रियों को सक्रिय करने का कार्य करती है।",
                en: "The word Simantonayan translates to 'elevating the hairline' or 'parting the hair upward'. In Vedic tradition, the husband tenderly parts the mother's hair, a ritual symbolically associated with balancing the mother's nervous system and stimulating the intellectual capacities of the child in the womb.",
                gu: "સીમંતોન્નયન શબ્દ બે શબ્દોનો બનેલો છે: 'સીમંત' (સેંથો/વાળનો મધ્ય ભાગ) અને 'ઓળવું' (ઉપર ઉઠાવવું). આ વિધિમાં પતિ દ્વારા પત્નીના વાળને ઉપરની તરફ ઓળવામાં આવે છે, જે માતાની ચેતાતંત્રને સંતુલિત કરે છે અને ગર્ભસ્થ શિશુના મગજના જ્ઞાનતંતુઓને જાગ્રત કરે છે."
              })}
            </p>
            <p className="font-sans text-sm md:text-base text-templeBrown/80 leading-relaxed mt-3">
              {t({
                hi: "प्राचीन ग्रंथों के अनुसार, गर्भस्थ शिशु ६ठे महीने के बाद बाहर की ध्वनियों, विचारों और वातावरण को ग्रहण करना शुरू कर देता है। इसलिए इस समय माँ को आनंदित और तनावमुक्त रखना सबसे महत्वपूर्ण है।",
                en: "By the third trimester, the fetus is highly sensitive to external sound waves, emotions, and environmental vibes. Conducting this program traditionally ensures the mother is surrounded by positive energy, protective mantras, and loving vibrations.",
                gu: "પ્રાચીન શાસ્ત્રો અનુસાર, ગર્ભસ્થ શિશુ ૬ઠ્ઠા મહિના પછી બહારના અવાજો, વિચારો અને વાતાવરણને ગ્રહણ કરવા લાગે છે. તેથી આ સમયે માતાને આનંદિત અને તણાવમુક્ત રાખવી અનિવાર્ય છે."
              })}
            </p>
          </div>
        </section>

        {/* Section 3: Benefits Grid */}
        <section className="py-16 bg-white border-t border-b border-divineGold/10">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <SectionLabel
              label={t({ hi: "महत्वपूर्ण लाभ", en: "Vedic & Scientific Benefits", gu: "મહત્વપૂર્ણ લાભ" })}
              titleHi={t({ hi: "यह अनुष्ठान माता-शिशु के लिए क्यों लाभकारी है?", en: "Why is this Program Essential for You?", gu: "આ સંસ્કાર વિધિ શા માટે લાભદાયી છે?" })}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 bg-softCream/10 rounded-divine-md border border-divineGold/20 hover:border-divineGold/55 transition-all flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-sacredMaroon/5 rounded-full flex items-center justify-center text-3xl mb-4 shrink-0 shadow-inner">
                    {benefit.icon}
                  </div>
                  <h3 className="font-sans font-bold text-base md:text-lg text-sacredMaroon mb-2">
                    {t(benefit.title)}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-templeBrown/80 leading-relaxed">
                    {t(benefit.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: How We Conduct It */}
        <section className="py-16 max-w-5xl mx-auto px-6 text-center">
          <SectionLabel
            label={t({ hi: "हमारी कार्यप्रणाली", en: "How We Conduct the Program", gu: "અમારી કાર્યપ્રણાલી" })}
            titleHi={t({ hi: "दंपत्ति के लिए पारंपरिक एवं व्यावसायिक मार्गदर्शन", en: "Traditional & Professional Way for Couples", gu: "દંપતી માટે પરંપરાગત અને વ્યવસાયિક માર્ગદર્શન" })}
          />
          <p className="font-sans text-sm md:text-base text-templeBrown/75 max-w-2xl mx-auto mb-12 mt-6">
            {t({
              hi: "हम सीमंतोन्नयन संस्कार को केवल एक सामाजिक गोद भराई तक सीमित नहीं रखते, बल्कि इसे एक पूर्ण वैज्ञानिक और आध्यात्मिक प्रक्रिया के रूप में दंपत्तियों के साथ आयोजित करते हैं।",
              en: "We design and facilitate the Simantonayan program not just as a social gathering, but as a deeply scientific, mental, and spiritual process tailored for couples.",
              gu: "અમે સીમંતોન્નયન સંસ્કારને માત્ર એક સામાજિક પ્રસંગ તરીકે નહીં, પરંતુ એક વૈજ્ઞાનિક અને આધ્યાત્મિક પ્રક્રિયા તરીકે દંપતીઓ માટે આયોજિત કરીએ છીએ."
            })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {ritualSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-white border border-divineGold/20 rounded-divine-sm hover:shadow-md transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-sacredMaroon text-white flex items-center justify-center font-accent font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-sans font-bold text-base text-sacredMaroon mb-1">
                    {t(step.title)}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-templeBrown/80 leading-relaxed">
                    {t(step.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Session Photo Gallery Marquee */}
        <ClassGallery />

        {/* Section 5: Trust Banner & CTA */}
        <section className="py-12 max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-softCream/80 to-divineGold/20 border-2 border-divineGold/45 p-8 md:p-12 rounded-divine-lg text-center shadow-md relative overflow-hidden">
            <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] text-sacredMaroon" />
            
            <h2 className="font-devanagari text-2xl md:text-3xl font-normal text-sacredMaroon leading-tight">
              {t({ hi: "अपने शिशु के उज्ज्वल भविष्य की शुरुआत करें", en: "Gift Your Unborn Child a Divine Beginning", gu: "તમારા બાળકના ઉજ્જવળ ભવિષ્યની શરૂઆત કરો" })}
            </h2>
            <p className="font-sans text-xs md:text-sm text-templeBrown/80 max-w-xl mx-auto mt-4 leading-relaxed">
              {t({
                hi: "डॉ. तरुणा जियानी के मार्गदर्शन में अपने सीमंतोन्नयन संस्कार को पारंपरिक और वैदिक पद्धति से संपन्न करें। निःशुल्क कॉल बैक के लिए संपर्क करें।",
                en: "Establish a positive, stress-free, and intellectually nurturing atmosphere during your pregnancy under the guidance of Dr. Taruna Jiyani.",
                gu: "ડો. તરુણા જીયાણીના માર્ગદર્શન હેઠળ તમારા સીમંતોન્નયન સંસ્કારને પરંપરાગત અને વૈદિક પદ્ધતિથી આયોજિત કરો."
              })}
            </p>

            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <Link to="/contact">
                <GoldenButton className="py-3 px-8 text-sm">
                  {t({ hi: "परामर्श के लिए संपर्क करें", en: "Consult Our Experts", gu: "પરામર્શ માટે સંપર્ક કરો" })}
                </GoldenButton>
              </Link>
              <a href="tel:+919638484545" className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white border border-sacredMaroon/20 hover:border-sacredMaroon/50 text-sacredMaroon font-accent font-bold text-xs uppercase tracking-wider transition-all">
                <Phone className="w-4 h-4" />
                <span>+91 96384 84545</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Simantonayan;
