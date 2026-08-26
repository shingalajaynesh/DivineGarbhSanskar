import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  BookOpen,
  Award,
  ShieldCheck,
  Heart,
  Music,
  Activity,
  Users,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import GoldenButton from '../components/ui/GoldenButton';
import { getBreadcrumbSchema } from '../seo/structuredData';

const Authors = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.authors;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Authors & Editorial Team', url: 'https://www.thedivinegarbhsanskar.com/authors' }
  ]);

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Dr. Taruna Jiyani",
      "jobTitle": "Founder, Lead Vedic Prenatal Counselor & Chief Editor",
      "worksFor": {
        "@type": "Organization",
        "name": "Divine Garbh Sanskar",
        "url": "https://www.thedivinegarbhsanskar.com"
      },
      "description": "Vedic Garbh Sanskar specialist, maternal wellness counselor, and holistic prenatal educator based in Surat, Gujarat with over 8+ years of experience and 10,000+ expectant mothers guided.",
      "image": "https://www.thedivinegarbhsanskar.com/taruna.jpg",
      "knowsAbout": [
        "Vedic Garbh Sanskar",
        "Garbh Samvad (Fetal Communication)",
        "Prenatal Nada Yoga & Classical Ragas",
        "Trimester Satvik Nutrition",
        "Maternal Stress Reduction & Relaxation",
        "Gentle Prenatal Yoga & Pelvic Exercises",
        "Postpartum Sutika Paricharya"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Nana Varachha",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395013",
        "addressCountry": "IN"
      },
      "email": "divinegarbhsanskar0312@gmail.com",
      "telephone": "+919638484545"
    }
  };

  const specializations = [
    {
      title: { hi: "वैदिक गर्भ संवाद एवं संस्कार", en: "Vedic Garbh Samvad & Fetal Bonding", gu: "વૈદિક ગર્ભ સંવાદ અને સંસ્કાર" },
      desc: { hi: "गर्भस्थ शिशु के साथ सचेत संवाद, सकारात्मक संकल्प और मातृ-शिशु आध्यात्मिक जुड़ाव।", en: "Conscious communication techniques, positive affirmations, and maternal-fetal bonding.", gu: "ગર્ભસ્થ શિશુ સાથે સભાન સંવાદ અને હકારાત્મક સંકલ્પ." }
    },
    {
      title: { hi: "त्रिमासिक सात्विक पोषण (आहार)", en: "Trimester Satvik Nutrition (Aahar)", gu: "ત્રિમાસિક સાત્વિક પોષણ (આહાર)" },
      desc: { hi: "माह-दर-माह आयुर्वेद सम्मत संतुलित आहार, सूक्ष्म पोषक तत्व और मॉर्निंग सिकनेस निवारण।", en: "Month-by-month Ayurvedic nutrition, essential micronutrients, and nausea management.", gu: "મહિના મુજબ આયુર્વેદિક સંતુલિત આહાર અને પોષણ." }
    },
    {
      title: { hi: "राग संगीत एवं नाद योग चिकित्सा", en: "Raga Music Therapy & Nada Yoga", gu: "રાગ સંગીત અને નાદ યોગ ચિકિત્સા" },
      desc: { hi: "भारतीय शास्त्रीय रागों (यमन, भूपाली) द्वारा एम्नियोटिक द्रव में ध्वनि तरंगों का संतुलन।", en: "Harmonizing acoustic sound waves in amniotic fluid via classical Indian ragas.", gu: "શાસ્ત્રીય રાગો દ્વારા ગર્ભમાં ધ્વનિ તરંગોનું સંતુલન." }
    },
    {
      title: { hi: "सुरक्षित प्रसव पूर्व योग एवं प्राणायाम", en: "Safe Prenatal Yoga & Labor Breathwork", gu: "સુરક્ષિત પ્રીનેટલ યોગ અને પ્રાણાયામ" },
      desc: { hi: "सामान्य प्रसव के लिए पेल्विक लचीलापन (मलासन, तितली आसन) और भ्रामरी प्राणायाम।", en: "Pelvic mobility for gentle birth (Malasana, Baddha Konasana) and soothing breathwork.", gu: "સામાન્ય પ્રસૂતિ માટે પેલ્વિક કસરતો અને પ્રાણાયામ." }
    },
    {
      title: { hi: "प्रसव पूर्व सकारात्मक परिवेश एवं शिशु जुड़ाव", en: "Prenatal Environment & Emotional Bonding", gu: "પ્રિનેટલ વાતાવરણ અને ભાવનાત્મક જોડાણ" },
      desc: { hi: "माता के मानसिक विश्राम, शांत वातावरण और रचनात्मक गतिविधियों द्वारा गर्भस्थ शिशु के साथ भावनात्मक जुड़ाव।", en: "Nurturing emotional connection and maternal calmness through relaxation, creative engagement, and mindfulness.", gu: "માતાના માનસિક વિશ્રામ અને સર્જનાત્મક પ્રવૃત્તિઓ દ્વારા બાળકના સાનુકૂળ વિકાસમાં સહાય." }
    },
    {
      title: { hi: "प्रसवोत्तर सूतिका परिचर्या", en: "Postpartum Care (Sutika Paricharya)", gu: "પ્રસૂતિ પછીની સૂતિકા પરિચર્યા" },
      desc: { hi: "प्रसव के बाद माता का शारीरिक पुनरुत्थान, दुग्धवर्धन (शतावरी) और नवजात शिशु देखभाल।", en: "Maternal physical rejuvenation, Ayurvedic galactagogues, and newborn bonding.", gu: "સુવાવડ પછી માતાનું સ્વાસ્થ્ય, દૂધવર્ધક આહાર અને શિશુ સંભાળ." }
    }
  ];

  const editorialPanels = [
    {
      icon: <BookOpen className="w-6 h-6 text-sacredMaroon shrink-0" />,
      title: { hi: "आयुर्वेदिक गर्भिणी परिचर्या समीक्षा मंडल", en: "Ayurvedic Prenatal Science Panel", gu: "આયુર્વેદિક ગર્ભિણી પરિચર્યા સમીક્ષા મંડળ" },
      desc: {
        hi: "चरक संहिता, सुश्रुत संहिता और काश्यप संहिता के शास्त्रीय सिद्धांतों के अनुसार आहार, जड़ी-बूटियों की सुरक्षा और मासिक परिवर्तनों की प्रामाणिकता की समीक्षा।",
        en: "Reviewing classical scriptural accuracy (Charaka, Sushruta & Kashyapa Samhitas), trimester-wise satvik diets, and herbal safety guidelines.",
        gu: "શાસ્ત્રીય ગ્રંથો અનુસાર આહાર, ઔષધિઓની સુરક્ષા અને માસિક ફેરફારોની ચકાસણી."
      }
    },
    {
      icon: <Activity className="w-6 h-6 text-vermillion shrink-0" />,
      title: { hi: "प्रसव पूर्व योग एवं शरीर क्रिया विज्ञान सलाहकार", en: "Prenatal Yoga & Pelvic Anatomy Board", gu: "પ્રીનેટલ યોગ અને શરીર વિજ્ઞાન સલાહકાર" },
      desc: {
        hi: "गर्भावस्था के दौरान आसन संशोधनों, शारीरिक सीमाओं, रक्तचाप नियंत्रण और प्रसव पीड़ा प्रबंधन तकनीकों की सुरक्षा जांच।",
        en: "Evaluating anatomical safety, trimester-specific asana modifications, contraindications, and gentle pelvic floor preparation.",
        gu: "ગર્ભાવસ્થા દરમિયાન યોગાસનોની સુરક્ષા, પેલ્વિક લચીલાપણું અને શ્વાસ નિયંત્રણની સમીક્ષા."
      }
    },
    {
      icon: <Music className="w-6 h-6 text-sacredMaroon shrink-0" />,
      title: { hi: "शास्त्रीय नाद योग एवं संगीत अनुसंधान", en: "Classical Sound Therapy Researchers", gu: "શાસ્ત્રીય નાદ યોગ અને સંગીત સંશોધન" },
      desc: {
        hi: "भारतीय शास्त्रीय रागों की आवृत्तियों, भ्रूण श्रवण तंत्र के विकास और वैदिक मंत्रोच्चार (गायत्री मंत्र) के वैज्ञानिक प्रभावों का विश्लेषण।",
        en: "Analyzing acoustic frequencies, fetal auditory pathway formation, and the vibrational impact of Vedic chanting in the womb.",
        gu: "શાસ્ત્રીય રાગોની ફ્રીક્વન્સી અને ગર્ભસ્થ શિશુના શ્રવણ વિકાસ પર સંશોધન."
      }
    },
    {
      icon: <Heart className="w-6 h-6 text-vermillion shrink-0" />,
      title: { hi: "मातृ मानसिक स्वास्थ्य एवं पारिवारिक परामर्श", en: "Maternal Mental Health & Counseling Panel", gu: "માતૃ માનસિક સ્વાસ્થ્ય અને પારિવારિક પરામર્શ" },
      desc: {
        hi: "कोर्टिसोल (तनाव हार्मोन) के स्तर को कम करने, प्रसव भय (टोकोफोबिया) निवारण, योग निद्रा और पिता की सक्रिय सहभागिता का मार्गदर्शन।",
        en: "Advising on maternal stress reduction, guided Yoga Nidra, birth confidence, and father's active emotional partnership.",
        gu: "તણાવ મુક્તિ, યોગ નિદ્રા અને પિતાની સક્રિય ભાગીદારી અંગે માર્ગદર્શન."
      }
    }
  ];

  const reviewStages = [
    {
      step: "01",
      title: { hi: "विषय चयन एवं मातृ आवश्यकता विश्लेषण", en: "Topic Research & Need Assessment", gu: "વિષય સંશોધન અને જરૂરિયાત વિશ્લેષણ" },
      desc: { hi: "गर्भवती माताओं द्वारा दैनिक जीवन में पूछे जाने वाले वास्तविक प्रश्नों और स्वास्थ्य चिंताओं की पहचान करना।", en: "Identifying genuine physiological, emotional, and dietary queries faced by expectant parents.", gu: "સગર્ભા માતાઓના વાસ્તવિક પ્રશ્નો અને સ્વાસ્થ્ય ચિંતાઓની ઓળખ." }
    },
    {
      step: "02",
      title: { hi: "वैदिक एवं आधुनिक शोध समन्वय", en: "Vedic & Modern Clinical Synthesis", gu: "વૈદિક અને આધુનિક સંશોધન સમન્વય" },
      desc: { hi: "प्राचीन आयुर्वेदिक संहिताओं और आधुनिक सहकर्मी-समीक्षित शोधपत्रों (PubMed, WHO, ICMR) का तुलनात्मक अध्ययन।", en: "Cross-referencing classical Sanskrit medical texts with modern peer-reviewed obstetrics literature.", gu: "શાસ્ત્રીય ગ્રંથો અને આધુનિક તબીબી સંશોધનોનો તુલનાત્મક અભ્યાસ." }
    },
    {
      step: "03",
      title: { hi: "विशेषज्ञ समीक्षा एवं सुरक्षा प्रमाणीकरण", en: "Expert Fact-Checking & Safety Review", gu: "નિષ્ણાત સમીક્ષા અને સુરક્ષા ચકાસણી" },
      desc: { hi: "वरिष्ठ परामर्शदाताओं द्वारा सामग्री की तथ्यात्मक जांच, सुरक्षित खुराक और अनिवार्य चिकित्सा अस्वीकरण का सत्यापन।", en: "Rigorous fact-checking by senior prenatal educators and verifying medical disclaimer boundaries.", gu: "સામગ્રીની સચોટતા અને તબીબી અસ્વીકરણની કડક ચકાસણી." }
    },
    {
      step: "04",
      title: { hi: "त्रिभाषी गुणवत्ता एवं सांस्कृतिक सटीकता", en: "Trilingual Quality & Cultural Review", gu: "ત્રિભાષી ગુણવત્તા અને ચોકસાઈ" },
      desc: { hi: "अंग्रेजी, हिंदी और गुजराती तीनों भाषाओं में पूर्ण, प्राकृतिक और सांस्कृतिक रूप से समृद्ध अनुवाद सुनिश्चित करना।", en: "Ensuring 100% complete, natural, and culturally authentic rendering across English, Hindi, and Gujarati.", gu: "અંગ્રેજી, હિન્દી અને ગુજરાતીમાં કુદરતી અને સચોટ અનુવાદ." }
    },
    {
      step: "05",
      title: { hi: "वार्षिक अद्यतन एवं निरंतर सुधार", en: "Annual Review & Continuous Updates", gu: "વાર્ષિક સમીક્ષા અને સતત સુધારો" },
      desc: { hi: "नए पोषण दिशानिर्देशों और पाठक प्रतिक्रिया के आधार पर प्रकाशित लेखों की समय-समय पर समीक्षा और अद्यतनीकरण।", en: "Periodically updating existing articles to incorporate new clinical guidelines and reader feedback.", gu: "નવા માર્ગદર્શિકા મુજબ સમયાંતરે લેખોનું અપડેટ." }
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/authors" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(authorSchema)}
        </script>
      </Helmet>

      <div className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-softCream/40 via-white to-softCream/30 min-h-screen">
        <MandalaBg className="top-10 right-0 w-96 h-96 opacity-[0.04] text-divineGold pointer-events-none" />
        <MandalaBg className="bottom-20 left-10 w-96 h-96 opacity-[0.04] text-sacredMaroon pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <SectionLabel
            isPageHeader={true}
            label={t({ hi: "संपादकीय नेतृत्व एवं विशेषज्ञ", en: "Editorial Leadership & Authority", gu: "સંપાદકીય નેતૃત્વ અને નિષ્ણાતો" })}
            titleHi={t({
              hi: "संपादकीय टीम, लेखक एवं विशेषज्ञ सलाहकार मंडल",
              en: "Authors, Clinical Reviewers & Editorial Board",
              gu: "સંપાદકીય ટીમ, લેખક અને સલાહકાર મંડળ"
            })}
          />

          <p className="mt-4 max-w-3xl mx-auto text-center text-base md:text-lg text-templeBrown/80 leading-relaxed font-sans">
            {t({
              hi: "दिव्य गर्भ संस्कार पर प्रकाशित प्रत्येक लेख और मार्गदर्शन सामग्री वरिष्ठ वैदिक शिक्षकों, मातृत्व परामर्शदाताओं और स्वास्थ्य शोधकर्ताओं की एक समर्पित टीम द्वारा तैयार और जांची जाती है।",
              en: "Every guide, nutritional chart, and prenatal practice published on Divine Garbh Sanskar is authored and rigorously fact-checked by experienced Vedic educators, maternal wellness counselors, and researchers.",
              gu: "દિવ્ય ગર્ભ સંસ્કાર પર પ્રકાશિત દરેક લેખ અને માર્ગદર્શન સામગ્રી વરિષ્ઠ વૈદિક શિક્ષકો અને માતૃત્વ સલાહકારોની સમર્પિત ટીમ દ્વારા તૈયાર અને ચકાસાયેલ છે."
            })}
          </p>

          {/* Founder & Lead Author Spotlight Card */}
          <div className="mt-14 bg-white border-2 border-divineGold/40 rounded-divine-lg p-6 sm:p-10 lg:p-12 shadow-xl shadow-sacredMaroon/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-divineGold/10 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Portrait & Verification */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                
                <div className="relative w-60 h-60 sm:w-68 sm:h-68 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-divineGold/60 animate-rotate-slow" />
                  <div className="absolute inset-2.5 rounded-full border-2 border-divineGold/40" />
                  
                  <img
                    src="/taruna.jpg"
                    alt="Dr. Taruna Jiyani - Founder & Lead Counselor"
                    className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full object-cover shadow-lg border-4 border-white bg-softCream/30"
                    loading="lazy"
                  />

                  <div className="absolute -bottom-2 right-4 bg-sacredMaroon border-2 border-divineGold text-white py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <UserCheck className="w-4 h-4 text-divineGold shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">Lead Specialist</span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-softCream/40 border border-divineGold/30 p-3 rounded-2xl text-center">
                    <span className="block font-serif font-bold text-xl text-sacredMaroon">10,000+</span>
                    <span className="text-[11px] text-templeBrown font-semibold uppercase tracking-wider">
                      {t({ hi: "मार्गदर्शित परिवार", en: "Families Guided", gu: "માર્ગદર્શિત પરિવારો" })}
                    </span>
                  </div>

                  <div className="bg-softCream/40 border border-divineGold/30 p-3 rounded-2xl text-center">
                    <span className="block font-serif font-bold text-xl text-sacredMaroon">8+ Years</span>
                    <span className="text-[11px] text-templeBrown font-semibold uppercase tracking-wider">
                      {t({ hi: "परामर्श अनुभव", en: "Experience", gu: "પરામર્શ અનુભવ" })}
                    </span>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-sacredMaroon bg-sacredMaroon/5 px-4 py-1.5 rounded-full border border-sacredMaroon/15">
                  <MapPin className="w-3.5 h-3.5 text-sacredMaroon" />
                  <span>{t({ hi: "सूरत मार्गदर्शन केंद्र, गुजरात", en: "Surat Guidance Center, Gujarat", gu: "સુરત માર્ગદર્શન કેન્દ્ર, ગુજરાત" })}</span>
                </div>

                <div className="mt-2 text-xs font-medium text-templeBrown/80">
                  <a href="mailto:divinegarbhsanskar0312@gmail.com" className="hover:text-vermillion underline flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sacredMaroon" />
                    <span>divinegarbhsanskar0312@gmail.com</span>
                  </a>
                </div>

              </div>

              {/* Right Column: In-Depth Biography & Philosophy */}
              <div className="lg:col-span-7 flex flex-col gap-5 text-left">
                
                <div>
                  <span className="px-3.5 py-1 bg-divineGold/20 text-sacredMaroon rounded-full text-xs font-bold uppercase tracking-wider border border-divineGold/40">
                    {t({ hi: "संस्थापक, मुख्य संपादक एवं वरिष्ठ परामर्शदाता", en: "Founder, Chief Editor & Lead Counselor", gu: "સ્થાપક, મુખ્ય સંપાદક અને વરિષ્ઠ સલાહકાર" })}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-sacredMaroon font-bold mt-2">
                    Dr. Taruna Jiyani
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-templeBrown/85 font-medium mt-1">
                    {t({
                      hi: "वैदिक गर्भ संस्कार विशेषज्ञ, मातृत्व स्वास्थ्य परामर्शदाता एवं प्रसव पूर्व शिक्षिका",
                      en: "Vedic Garbh Sanskar Specialist, Maternal Health Counselor & Prenatal Educator",
                      gu: "વૈદિક ગર્ભ સંસ્કાર નિષ્ણાત, માતૃત્વ સ્વાસ્થ્ય સલાહકાર અને પ્રીનેટલ શિક્ષક"
                    })}
                  </p>
                </div>

                <div className="font-sans text-sm sm:text-base text-templeBrown/85 leading-relaxed space-y-3 border-t border-divineGold/20 pt-4">
                  <p>
                    {t({
                      hi: "डॉ. तरुणा जियाणी वैदिक गर्भ संस्कार और आधुनिक भ्रूण मनोविज्ञान के पुनरुत्थान के लिए समर्पित एक प्रमुख विशेषज्ञ हैं। उन्होंने सूरत (गुजरात) स्थित दिव्य गर्भ संस्कार केंद्र के माध्यम से 10,000 से अधिक गर्भवती माताओं और परिवारों को व्यक्तिगत रूप से प्रशिक्षित किया है।",
                      en: "Dr. Taruna Jiyani is a pioneering educator and counselor dedicated to the revival of authentic Vedic prenatal science harmonized with modern embryology and maternal wellness. Based at Divine Garbh Sanskar HQ in Surat, Gujarat, she has personally mentored over 10,000+ expectant families through pregnancy.",
                      gu: "ડૉ. તરુણા જીયાણી વૈદિક ગર્ભ સંસ્કાર અને આધુનિક ભ્રૂણ મનોવિજ્ઞાનના પુનરુત્થાન માટે સમર્પિત અગ્રણી નિષ્ણાત છે. તેમણે સુરત સ્થિત દિવ્ય ગર્ભ સંસ્કાર કેન્દ્ર દ્વારા ૧૦,૦૦૦ થી વધુ પરિવારોને માર્ગદર્શન આપ્યું છે."
                    })}
                  </p>
                  <p>
                    {t({
                      hi: "वे दिव्य गर्भ संस्कार की संपूर्ण शैक्षिक सामग्री, पाठ्यक्रम संरचना और संपादकीय गुणवत्ता की प्रमुख सूत्रधार हैं। उनका उद्देश्य प्रत्येक माता को भयमुक्त, सुसंस्कृत और वैज्ञानिक रूप से जागरूक मातृत्व का उपहार देना है।",
                      en: "She oversees all curriculum design, content accuracy, and editorial standards across the platform. Her methodology focuses on non-invasive lifestyle interventions: satvik trimester nutrition, Nada Yoga raga therapy, cortisol reduction, and conscious fetal communication (Garbh Samvad).",
                      gu: "તેઓ તમામ શૈક્ષણિક સામગ્રી, અભ્યાસક્રમ રચના અને સંપાદકીય ગુણવત્તાના મુખ્ય સંચાલક છે."
                    })}
                  </p>

                  {/* Professional Scope & Clinical Collaboration Clarification */}
                  <div className="p-3.5 bg-softCream/60 border border-divineGold/30 rounded-xl text-xs sm:text-sm text-templeBrown/90 space-y-1 mt-3">
                    <p className="font-bold text-sacredMaroon flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-sacredMaroon shrink-0" />
                      <span>{t({ hi: "परामर्श कार्यक्षेत्र एवं चिकित्सा समन्वय (Scope of Practice)", en: "Scope of Practice & Medical Collaboration", gu: "પરામર્શ કાર્યક્ષેત્ર અને તબીબી સમન્વય" })}</span>
                    </p>
                    <p className="leading-relaxed">
                      {t({
                        hi: "डॉ. तरुणा जियाणी वैदिक गर्भ संस्कार, मातृत्व मनोविज्ञान और सात्विक जीवनशैली परामर्श में विशेषज्ञता रखती हैं। हमारा मार्गदर्शन शैक्षिक और भावनात्मक कल्याण के लिए है तथा यह आपके पंजीकृत प्रसूति रोग विशेषज्ञ (Gynecologist/Obstetrician) की चिकित्सा देखभाल का पूरक (Complementary) है, उसका विकल्प नहीं।",
                        en: "Dr. Taruna Jiyani specializes in Vedic prenatal education, maternal lifestyle wellness, and prenatal psychology. Divine Garbh Sanskar provides educational and holistic wellness support designed to complement—never replace—the medical diagnostics, treatments, and prescriptions of your treating obstetrician.",
                        gu: "ડૉ. તરુણા જીયાણી વૈદિક ગર્ભ સંસ્કાર અને માતૃત્વ મનોવિજ્ઞાન સલાહકાર તરીકે માર્ગદર્શન આપે છે. આ માર્ગદર્શન શૈક્ષણિક અને સુખાકારી માટે છે અને તમારા સ્ત્રીરોગ નિષ્ણાત (ગાયનેકોલોજિસ્ટ) ની તબીબી સારવારનું પૂરક છે."
                      })}
                    </p>
                  </div>
                </div>

                {/* Consultation Direct Button */}
                <div className="pt-3 flex flex-wrap gap-4 items-center">
                  <Link to="/contact">
                    <GoldenButton className="py-3 px-7 text-xs sm:text-sm shadow-md">
                      {t({ hi: "डॉ. तरुणा से 1:1 परामर्श लें", en: "Book 1:1 Session with Dr. Taruna", gu: "ડૉ. તરુણા સાથે ૧:૧ પરામર્શ લો" })}
                    </GoldenButton>
                  </Link>

                  <a
                    href="tel:+919638484545"
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-sacredMaroon/20 hover:border-sacredMaroon text-sacredMaroon font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:bg-sacredMaroon/5"
                  >
                    <Phone className="w-4 h-4 text-sacredMaroon" />
                    <span>+91 96384 84545</span>
                  </a>
                </div>

              </div>

            </div>

          </div>

          {/* 6 Key Areas of Specialization Grid */}
          <div className="mt-16">
            <h3 className="font-serif text-2xl sm:text-3xl text-sacredMaroon font-bold text-center mb-8">
              {t({ hi: "संपादकीय एवं परामर्श विशेषज्ञता के प्रमुख क्षेत्र", en: "Core Areas of Expertise & Research", gu: "મુખ્ય વિશેષતા અને સંશોધનના ક્ષેત્રો" })}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializations.map((spec, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-divineGold/30 rounded-divine-md p-6 shadow-sm hover:shadow-md hover:border-divineGold/70 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sacredMaroon/5 border border-sacredMaroon/15 flex items-center justify-center text-sacredMaroon mb-4 font-bold font-serif text-lg">
                      0{idx + 1}
                    </div>
                    <h4 className="font-serif font-bold text-lg text-sacredMaroon mb-2">
                      {t(spec.title)}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-templeBrown/80 leading-relaxed">
                      {t(spec.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multidisciplinary Advisory & Review Board */}
          <div className="mt-20 bg-white border-2 border-divineGold/35 rounded-divine-lg p-8 sm:p-12 shadow-sm">
            <div className="max-w-3xl mb-10 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-vermillion bg-vermillion/10 px-3.5 py-1 rounded-full border border-vermillion/20">
                {t({ hi: "संपादकीय मानक", en: "Evidence & Review Standards", gu: "સંપાદકીય ધોરણો" })}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-sacredMaroon font-bold mt-2">
                {t({ hi: "हमारी 4-स्तंभीय तथ्य-जांच एवं समीक्षा प्रणाली", en: "Our 4-Pillar Fact-Checking & Review Standards", gu: "અમારી ૪-સ્તંભીય તથ્ય-તપાસ અને સમીક્ષા પ્રણાલી" })}
              </h3>
              <p className="font-sans text-sm sm:text-base text-templeBrown/80 leading-relaxed mt-2">
                {t({
                  hi: "तथ्यात्मक सटीकता, सुरक्षा सीमाओं और सांस्कृतिक प्रामाणिकता की गारंटी के लिए प्रत्येक लेख को डब्ल्यूएचओ (WHO), आईसीएमआर (ICMR) और आयुष मंत्रालय (AYUSH) के दिशानिर्देशों के अनुरूप 4 विशेषज्ञ शाखाओं में परखा जाता है:",
                  en: "To guarantee clinical safety boundaries, factual accuracy, and Vedic authenticity, all content is evaluated across 4 core educational pillars cross-referenced with WHO, ICMR, and Ministry of AYUSH guidelines:",
                  gu: "તબીબી સુરક્ષા અને શાસ્ત્રીય ચોકસાઈ સુનિશ્ચિત કરવા માટે તમામ સામગ્રીને WHO, ICMR અને આયુષ માર્ગદર્શિકા સાથે સુસંગત ૪ શાખાઓમાં ચકાસવામાં આવે છે:"
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {editorialPanels.map((panel, idx) => (
                <div key={idx} className="p-6 bg-softCream/30 border border-divineGold/25 rounded-divine-md flex gap-4 items-start">
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-divineGold/20 shrink-0">
                    {panel.icon}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-sacredMaroon mb-2">
                      {t(panel.title)}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-templeBrown/80 leading-relaxed">
                      {t(panel.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Stage Publishing Workflow */}
          <div className="mt-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-sacredMaroon bg-sacredMaroon/5 px-4 py-1.5 rounded-full border border-sacredMaroon/15">
                {t({ hi: "प्रकाशन प्रक्रिया", en: "5-Stage Editorial Workflow", gu: "પ્રકાશન પ્રક્રિયા" })}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-sacredMaroon font-bold mt-2">
                {t({ hi: "हमारी तथ्य-जांच एवं गुणवत्ता नियंत्रण विधि", en: "How We Author & Verify Every Article", gu: "અમારી ગુણવત્તા નિયંત્રણ પદ્ધતિ" })}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-templeBrown/70 mt-2">
                {t({
                  hi: "Google E-E-A-T और स्वास्थ्य सामग्री मानकों के अनुरूप 5-चरणीय सत्यापन प्रक्रिया।",
                  en: "Built to strictly satisfy Google's People-First Content Quality & Health YMYL standards.",
                  gu: "ગુગલ E-E-A-T ધોરણો મુજબ ૫-તબક્કાની ચકાસણી પ્રક્રિયા."
                })}
              </p>
            </div>

            <div className="space-y-4">
              {reviewStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-white border border-divineGold/30 rounded-divine-md shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:border-divineGold/70 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-sacredMaroon text-white font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
                    {stage.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-base sm:text-lg text-sacredMaroon">
                      {t(stage.title)}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-templeBrown/80 leading-relaxed mt-1">
                      {t(stage.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Affiliation & Corrections Pledge */}
          <div className="mt-16 bg-softCream/40 border-2 border-divineGold/30 rounded-divine-lg p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-6 h-6 text-sacredMaroon" />
                  <h4 className="font-serif text-xl font-bold text-sacredMaroon">
                    {t({ hi: "संपादकीय स्वतंत्रता एवं पारदर्शिता", en: "Editorial Independence & Ethics", gu: "સંપાદકીય સ્વતંત્રતા અને પારદર્શિતા" })}
                  </h4>
                </div>
                <p className="font-sans text-xs sm:text-sm text-templeBrown/85 leading-relaxed">
                  {t({
                    hi: "हम किसी भी फार्मास्युटिकल कंपनी से प्रायोजित चिकित्सा दावे स्वीकार नहीं करते हैं। हमारी सभी सामग्री निष्पक्ष, पारंपरिक एवं प्रमाण-आधारित ज्ञान पर आधारित है।",
                    en: "We do not accept pharmaceutical sponsorships or third-party compensation that compromises editorial objectivity. All recommendations prioritize maternal and fetal safety above all else.",
                    gu: "અમે કોઈ પણ દવા કંપની પાસેથી પ્રાયોજિત તબીબી દાવાઓ સ્વીકારતા નથી."
                  })}
                </p>
              </div>

              <div className="bg-white border border-divineGold/30 p-6 rounded-divine-md text-xs font-sans text-templeBrown/80 space-y-3">
                <h5 className="font-bold text-sacredMaroon text-sm font-serif">
                  {t({ hi: "तथ्यात्मक सुधार एवं सुझाव", en: "Report a Factual Correction", gu: "સુધારા અને સૂચનો" })}
                </h5>
                <p>
                  {t({
                    hi: "यदि आपको किसी लेख में कोई त्रुटि या पुरानी जानकारी दिखे, तो कृपया हमारी संपादकीय टीम को सूचित करें:",
                    en: "If you notice an outdated reference or factual error in any published guide, our team will review and update it within 48 hours:",
                    gu: "જો તમને કોઈ લેખમાં ભૂલ જણાય, તો કૃપા કરીને અમારી સંપાદકીય ટીમને જણાવો:"
                  })}
                </p>
                <div className="font-mono text-sacredMaroon font-bold pt-1">
                  divinegarbhsanskar0312@gmail.com
                </div>
                <div className="pt-2">
                  <Link to="/editorial-policy" className="text-vermillion font-bold underline">
                    {t({ hi: "पूर्ण संपादकीय नीति पढ़ें →", en: "Read Full Editorial Policy →", gu: "સંપૂર્ણ સંપાદકીય નીતિ વાંચો →" })}
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Authors;
