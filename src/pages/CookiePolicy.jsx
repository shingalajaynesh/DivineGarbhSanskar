import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';
import { cookiePolicyData } from '../data/cookiePolicyData';

const CookiePolicy = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.cookie;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Cookie Policy', url: 'https://www.thedivinegarbhsanskar.com/cookie-policy' }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/cookie-policy" />
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
            label={t({ hi: "कुकी तकनीक", en: "Cookies & Preferences", gu: "કૂકી ટેકનોલોજી" })}
            titleHi={t({ hi: "कुकी नीति (Cookie Policy)", en: "Cookie Policy", gu: "કૂકી નીતિ (Cookie Policy)" })}
          />

          <div className="mt-8 bg-white border border-divineGold/25 rounded-divine-md p-8 md:p-12 shadow-sm space-y-8 font-sans text-templeBrown/85 text-base leading-relaxed">
            <p className="text-xs text-templeBrown/60 uppercase font-semibold tracking-wider">
              Last Updated: {cookiePolicyData.lastUpdated} • Effective Date: {cookiePolicyData.effectiveDate}
            </p>

            {cookiePolicyData.sections.map((section) => (
              <section key={section.id}>
                <h2 className="text-2xl font-bold text-sacredMaroon mb-4">{section.title}</h2>
                {section.paragraphs && section.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-3" : ""}>{p}</p>
                ))}
                {section.categories && (
                  <div className="space-y-4 mt-3">
                    {section.categories.map((c, idx) => (
                      <div key={idx} className="p-4 bg-softCream/30 border border-divineGold/20 rounded-divine-sm">
                        <h3 className="font-bold text-sacredMaroon">{c.name}</h3>
                        <p className="text-sm mt-1">{c.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
