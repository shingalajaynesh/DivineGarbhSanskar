import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import FloatingCard from '../ui/FloatingCard';

const MediaCoverage = () => {
  const { t } = useLanguage();

  const articles = [
    {
      pub: "Divya Bhaskar",
      date: { hi: "नवंबर २०२५", en: "November 2025", gu: "નવેમ્બર ૨૦૨૫" },
      headline: {
        hi: "गर्भ संस्कार: बच्चे के मानसिक विकास में माता के विचारों की भूमिका महत्वपूर्ण",
        en: "Garbh Sanskar: The vital role of maternal thoughts in fetal brain development",
        gu: "ગર્ભ સંસ્કાર: બાળકના માનસિક વિકાસમાં માતાના વિચારોની ભૂમિકા મહત્વપૂર્ણ"
      },
      desc: {
        hi: "सूरत में आयोजित भव्य कार्यशाला में विशेषज्ञों ने बताया कि कैसे राग संगीत और ध्यान से शिशु को सुसंस्कृत बनाया जा सकता है...",
        en: "At a major seminar in Surat, prenatal specialists shared how Classical Ragas and meditation shape future child intelligence...",
        gu: "સુરતમાં યોજાયેલ ભવ્ય સેમિનારમાં નિષ્ણાતોએ જણાવ્યું કે કેવી રીતે રાગ સંગીત અને ધ્યાનથી શિશુને સુસંસ્કારી બનાવી શકાય..."
      },
      link: "https://www.divyabhaskar.co.in",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=350"
    },
    {
      pub: "Times of India",
      date: { hi: "जनवरी २०२६", en: "January 2026", gu: "જાન્યુઆરી ૨૦૨૬" },
      headline: {
        hi: "आधुनिक एपिजेनेटिक्स द्वारा प्राचीन वैदिक गर्भ संस्कार पद्धतियों को मान्यता",
        en: "Ancient Vedic Garbh Sanskar practices validated by modern Epigenetics",
        gu: "પ્રાચીન વૈદિક ગર્ભ સંસ્કાર પદ્ધતિઓ આધુનિક એપિજેનેટિક્સ દ્વારા પ્રમાણિત થઈ"
      },
      desc: {
        hi: "नवीनतम वैज्ञानिक शोधों के अनुसार माता का खुश रहना बच्चे के डीएनए एक्सप्रेशन (DNA Expression) को सकारात्मक रूप से प्रभावित करता है...",
        en: "Recent clinical researches reveal maternal happiness and stress reduction directly influences fetal gene expression in a positive way...",
        gu: "નવીનતમ વૈજ્ઞાનિક સંશોધનો અનુસાર માતાનું ખુશ રહેવું બાળકના ડીએનએ એક્સપ્રેશનને હકારાત્મક રીતે પ્રભાવિત કરે છે..."
      },
      link: "https://timesofindia.indiatimes.com",
      image: "https://images.unsplash.com/photo-1495020689067-958852a6565d?auto=format&fit=crop&q=80&w=350"
    },
    {
      pub: "Gujarat Samachar",
      date: { hi: "मार्च २०२६", en: "March 2026", gu: "માર્ચ ૨૦૨૬" },
      headline: {
        hi: "सूरतना गर्भ संस्कार केन्द्र द्वारा 10,000 माताओं ने मेळव्युं मार्गदर्शन",
        en: "Surat's Garbh Sanskar program helps over 10,000 expectant mothers",
        gu: "સુરતના ગર્ભ સંસ્કાર કેન્દ્ર દ્વારા ૧૦,૦૦૦ માતાઓએ મેળવ્યું માર્ગદર્શન"
      },
      desc: {
        hi: "संस्था ने दावा किया है कि इस वैज्ञानिक गर्भ संस्कार पद्धति को अपनाने से अधिकांश माताओं की नॉर्मल डिलीवरी संभव हुई है...",
        en: "The organization states that practicing this structured prenatal methodology has significantly aided in achieving natural labor births...",
        gu: "સંસ્થાએ દાવો કર્યો છે કે આ વૈજ્ઞાનિક ગર્ભ સંસ્કાર પદ્ધતિ અપનાવવાથી મોટાભાગની માતાઓની નોર્મલ ડિલિવરી શક્ય બની છે..."
      },
      link: "https://www.gujaratsamachar.com",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=350"
    }
  ];

  return (
    <section className="relative py-20 bg-softCream/10 overflow-hidden border-b border-divineGold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "प्रेस समाचार", en: "In the News", gu: "પ્રેસ સમાચાર" })}
          titleHi={t({ hi: "मीडिया जगत में डिवाइन गर्भ संस्कार", en: "Divine Garbh Sanskar in the Media", gu: "મીડિયા જગતમાં ડિવાઇન ગર્ભ સંસ્કાર" })}
        />

        {/* Masonry or Scrollable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {articles.map((art, idx) => (
            <FloatingCard
              key={idx}
              delay={idx * 0.15}
              className="bg-white border border-divineGold/25 rounded-divine-md overflow-hidden flex flex-col justify-between"
            >
              
              <div>
                {/* Article Image */}
                <div className="relative aspect-video overflow-hidden border-b border-divineGold/10">
                  <img
                    src={art.image}
                    alt={art.pub}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Publication tag */}
                  <span className="absolute top-3 left-3 bg-sacredMaroon text-white font-accent text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase shadow-md">
                    {art.pub}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Date */}
                  <span className="text-xs font-semibold text-templeBrown/60 font-sans block mb-2">
                    {t(art.date)}
                  </span>
                  
                  {/* Headline */}
                  <h3 className="font-sans font-bold text-base md:text-lg text-sacredMaroon mb-3 leading-snug line-clamp-2">
                    {t(art.headline)}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-xs md:text-sm text-templeBrown/75 leading-relaxed line-clamp-3">
                    {t(art.desc)}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6 pt-2">
                <a
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-sans text-vermillion hover:text-sacredMaroon transition-colors uppercase tracking-wider"
                >
                  <span>{t({ hi: "पूरा लेख पढ़ें", en: "Read Full Article", gu: "સંપૂર્ણ લેખ વાંચો" })}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </FloatingCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MediaCoverage;
