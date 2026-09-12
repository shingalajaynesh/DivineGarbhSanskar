import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';
import { refundPolicyData } from '../data/refundPolicyData';

const RefundPolicy = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.refund;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Refund Policy', url: 'https://www.thedivinegarbhsanskar.com/refund-policy' }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/refund-policy" />
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
            label={t({ hi: "रिफंड नीतियां", en: "Cancellation & Refund", gu: "રિફંડ નીતિઓ" })}
            titleHi={t({ hi: "रिफंड एवं रद्दीकरण नीति", en: "Refund & Cancellation Policy", gu: "રિફંડ નીતિ (Refund Policy)" })}
          />

          <div className="mt-8 bg-white border border-divineGold/25 rounded-divine-md p-8 md:p-12 shadow-sm space-y-8 font-sans text-templeBrown/85 text-base leading-relaxed">
            <p className="text-xs text-templeBrown/60 uppercase font-semibold tracking-wider">
              Last Updated: {refundPolicyData.lastUpdated} • Effective Date: {refundPolicyData.effectiveDate}
            </p>

            {refundPolicyData.sections.map((section) => (
              <section key={section.id}>
                <h2 className="text-2xl font-bold text-sacredMaroon mb-4">{section.title}</h2>
                {section.paragraphs && section.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-3" : ""}>{p}</p>
                ))}
                {section.listItems && (
                  <ul className="list-disc pl-6 space-y-3 mt-3">
                    {section.listItems.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.label}:</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
