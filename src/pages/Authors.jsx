import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';

const Authors = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.authors;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Authors & Editorial Team', url: 'https://www.thedivinegarbhsanskar.com/authors' }
  ]);

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
      </Helmet>

      <div className="relative pt-32 pb-20 overflow-hidden bg-softCream">
        <MandalaBg className="top-10 right-0 w-96 h-96 opacity-[0.05]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel
            isPageHeader={true}
            label={t({ hi: "लेखक एवं विशेषज्ञ", en: "Authors & Experts", gu: "લેખક અને નિષ્ણાતો" })}
            titleHi={t({ hi: "संपादकीय टीम एवं लेखक (Editorial Team)", en: "Authors & Editorial Team", gu: "સંપાદકીય ટીમ (Editorial Team)" })}
          />

          <div className="mt-8 space-y-8">
            {/* Dr. Taruna Profile */}
            <div className="bg-white border-2 border-divineGold/35 rounded-divine-md p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img
                src="/taruna.jpg"
                alt="Dr. Taruna Jiyani"
                className="w-36 h-36 rounded-full object-cover border-4 border-divineGold/40 shadow-md shrink-0"
              />
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="inline-block px-3 py-1 bg-divineGold/20 text-sacredMaroon rounded-full text-xs font-bold uppercase tracking-wider">
                  Founder & Lead Editorial Counselor
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-sacredMaroon font-bold">
                  Dr. Taruna Jiyani
                </h2>
                <p className="text-sm font-semibold text-templeBrown/80 italic">
                  Vedic Garbh Sanskar Educator & Maternal Wellbeing Counselor
                </p>
                <p className="text-base leading-relaxed text-templeBrown/85">
                  Dr. Taruna Jiyani is a passionate educator dedicated to reviving authentic Indian prenatal heritage combined with modern prenatal wellness practices. She oversees content strategy, curriculum design, and family counseling at Divine Garbh Sanskar in Surat, Gujarat.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start text-xs text-sacredMaroon font-semibold">
                  <span>📍 Office: Surat, Gujarat</span>
                  <span>📧 divinegarbhsanskar0312@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Editorial Board Note */}
            <div className="bg-white border border-divineGold/20 rounded-divine-md p-8 shadow-sm space-y-4 font-sans text-templeBrown/85">
              <h3 className="text-xl font-serif text-sacredMaroon font-bold">
                Editorial Review Board
              </h3>
              <p className="text-base leading-relaxed">
                Articles published on Divine Garbh Sanskar are authored and fact-checked by our dedicated team of pregnancy educators, Ayurvedic wellness advisers, and classical music therapy researchers.
              </p>
              <p className="text-sm text-templeBrown/70">
                For questions about our editorial team, or to report a factual correction, please visit our <Link to="/editorial-policy" className="text-vermillion font-bold hover:underline">Editorial Policy</Link> page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authors;
