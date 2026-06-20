import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import SectionLabel from '../components/ui/SectionLabel';
import FloatingCard from '../components/ui/FloatingCard';
import MandalaBg from '../components/ui/MandalaBg';
import { getBreadcrumbSchema } from '../seo/structuredData';

const Blog = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.blog;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://www.thedivinegarbhsanskar.com/" },
    { name: "Blog", url: "https://www.thedivinegarbhsanskar.com/blog" }
  ]);

  const posts = [

    {
      id: 1,
      category: { hi: "आहार (NUTRITION)", en: "NUTRITION", gu: "આહાર (NUTRITION)" },
      date: "2026-05-10",
      title: { hi: "गर्भावस्था के प्रथम तीन महीनों का आहार चार्ट", en: "First Trimester Nutrition Guide: Satvik Diet", gu: "ગર્ભાવસ્થાના પ્રથમ ત્રણ મહિનાનો આહાર ચાર્ટ" },
      desc: {
        hi: "प्रथम तिमाही में फोलिक एसिड, आयरन और प्रोटीन युक्त भारतीय सात्विक भोजन की आवश्यकता होती है। जानें क्या खाएं और क्या न खाएं...",
        en: "Discover the essential nutrients needed during weeks 1-12. Learn about pregnancy-safe herbs, dry fruits, and items to strictly avoid...",
        gu: "પ્રથમ ત્રિમાસિકમાં ફોલિક એસિડ, આયર્ન અને પ્રોટીન યુક્ત ભારતીય સાત્વિક ખોરાકની જરૂરિયાત હોય છે. જાણો શું ખાવું અને શું ન ખાવું..."
      },
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=350"
    },
    {
      id: 2,
      category: { hi: "संगीत चिकित्सा (MUSIC)", en: "MUSIC THERAPY", gu: "સંગીત ચિકિત્સા (MUSIC)" },
      date: "2026-05-28",
      title: { hi: "राग यमन और राग बिलावल: गर्भ में शिशु पर प्रभाव", en: "Classical Indian Ragas for Fetal Brain Tuning", gu: "રાગ યમન અને રાગ બિલાવલ: ગર્ભમાં બાળક પર અસર" },
      desc: {
        hi: "शास्त्रीय रागों की ध्वनियाँ बच्चे के श्रवण यंत्रों को उत्तेजित करती हैं। जानें सुबह-शाम कौन से राग सुनने चाहिए...",
        en: "Scientific reasons why Ragas like Yaman and Bilawal soothen maternal nerves and accelerate fetal synapse connections...",
        gu: "શાસ્ત્રીય રાગોના અવાજો બાળકના શ્રવણ યંત્રોને ઉત્તેજિત કરે છે. જાણો સવાર-સાંજ કયા રાગ સાંભળવા જોઈએ..."
      },
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=350"
    },
    {
      id: 3,
      category: { hi: "योग (YOGA)", en: "PRENATAL YOGA", gu: "યોગ (YOGA)" },
      date: "2026-06-12",
      title: { hi: "नॉर्मल डिलीवरी के लिए ५ सुरक्षित योगासन", en: "5 Safe Yoga Stretches for Natural Labor", gu: "નોર્મલ ડિલિવરી માટે ૫ સુરક્ષિત યોગાસનો" },
      desc: {
        hi: "तितली आसन, मार्जरी आसन और कोणासन के नियमित अभ्यास से पेल्विक मांसपेशियों में लचीलापन आता है। ध्यान रखने योग्य सावधानियां...",
        en: "Strengthen your pelvic muscles and hips naturally. Daily easy stretches with proper breathing techniques under expert supervision...",
        gu: "તિતલી આસન, માર્જરી આસન અને કોણાસનના નિયમિત અભ્યાસથી પેલ્વિક સ્નાયુઓમાં લવચીકતા આવે છે. સાવચેતીઓ..."
      },
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=350"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/blog" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="relative pt-32 pb-20 overflow-hidden bg-softCream">
        <MandalaBg className="top-12 left-12 w-80 h-80 opacity-[0.04]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Headings */}
          <SectionLabel
            isPageHeader={true}
            label={t({ hi: "ज्ञान गंगा", en: "Pregnancy Wisdom", gu: "જ્ઞાન ગંગા" })}
            titleHi={t({ hi: "गर्भ संस्कार ब्लॉग एवं स्वास्थ्य चर्चा", en: "Garbh Sanskar Blog & Articles", gu: "ગર્ભ સંસ્કાર બ્લોગ અને સ્વાસ્થ્ય ચર્ચા" })}
          />

          {/* Grid of articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {posts.map((post) => (
              <FloatingCard
                key={post.id}
                delay={post.id * 0.1}
                className="bg-white border border-divineGold/25 rounded-divine-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Aspect ratio cover */}
                  <div className="aspect-video w-full overflow-hidden border-b border-divineGold/10">
                    <img
                      src={post.image}
                      alt={t(post.title)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    {/* Category */}
                    <span className="font-accent text-[10px] font-bold text-vermillion tracking-wider uppercase">
                      {t(post.category)}
                    </span>
                    
                    {/* Date */}
                    <span className="text-[11px] text-templeBrown/60 font-sans block mt-1 mb-3">
                      {post.date}
                    </span>

                    {/* Title */}
                    <h3 className="font-sans font-bold text-base md:text-lg text-sacredMaroon mb-3 leading-snug line-clamp-2 hover:text-vermillion transition-colors cursor-pointer">
                      {t(post.title)}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs md:text-sm text-templeBrown/75 leading-relaxed line-clamp-4">
                      {t(post.desc)}
                    </p>
                  </div>
                </div>

                {/* Read Button */}
                <div className="px-6 pb-6 pt-2">
                  <button className="text-xs font-bold font-sans text-sacredMaroon hover:text-vermillion transition-colors uppercase tracking-wider border-b border-sacredMaroon hover:border-vermillion pb-0.5">
                    {t({ hi: "आगे पढ़ें ➜", en: "Read More ➜", gu: "વધુ વાંચો ➜" })}
                  </button>
                </div>

              </FloatingCard>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Blog;
