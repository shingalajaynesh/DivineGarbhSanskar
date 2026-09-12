import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';
import { privacyPolicyData } from '../data/privacyPolicyData';

const PrivacyPolicy = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.privacy;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Privacy Policy', url: 'https://www.thedivinegarbhsanskar.com/privacy-policy' }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/privacy-policy" />
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
            label={t({ hi: "कानूनी जानकारी", en: "Legal & Transparency", gu: "કાનૂની માહિતી" })}
            titleHi={t({ hi: "गोपनीयता नीति (Privacy Policy)", en: "Privacy Policy", gu: "ગોપનીયતા નીતિ (Privacy Policy)" })}
          />

          <div className="mt-8 bg-white border border-divineGold/25 rounded-divine-md p-8 md:p-12 shadow-sm space-y-8 font-sans text-templeBrown/85 text-base leading-relaxed">
            <p className="text-xs text-templeBrown/60 uppercase font-semibold tracking-wider">
              Last Updated: {privacyPolicyData.lastUpdated} • Effective Date: {privacyPolicyData.effectiveDate}
            </p>

            {privacyPolicyData.sections.map((section) => (
              <section key={section.id}>
                <h2 className="text-2xl font-bold text-sacredMaroon mb-4">{section.title}</h2>
                {section.paragraphs && section.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-3" : ""}>{p}</p>
                ))}
                {section.listItems && (
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    {section.listItems.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.label}:</strong>{" "}
                        {item.text.includes("Google Ad Settings") ? (
                          <>
                            Users may opt out of personalized advertising by visiting{" "}
                            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-vermillion underline font-semibold">
                              Google Ad Settings
                            </a>{" "}
                            or by visiting{" "}
                            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-vermillion underline font-semibold">
                              aboutads.info
                            </a>.
                          </>
                        ) : (
                          item.text
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {section.bullets && (
                  <ul className="list-disc pl-6 mt-3 space-y-2">
                    {section.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.contactDetails && (
                  <div className="mt-3 p-4 bg-softCream/40 rounded-divine-sm border border-divineGold/20">
                    <p><strong>{section.contactDetails.organization}</strong></p>
                    <p>Address: {section.contactDetails.address}</p>
                    <p>Email: <a href={`mailto:${section.contactDetails.email}`} className="text-sacredMaroon underline font-semibold">{section.contactDetails.email}</a></p>
                    <p>Phone: <a href={`tel:${section.contactDetails.phone.replace(/[\s-]/g, '')}`} className="text-sacredMaroon underline font-semibold">{section.contactDetails.phone}</a></p>
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

export default PrivacyPolicy;
