import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';

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
              Last Updated: July 2026 • Effective Date: January 1, 2024
            </p>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your computer or mobile device when you visit websites. They help websites remember your device, preferences (such as language), and improve user experience during subsequent visits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">2. Categories of Cookies We Use</h2>

              <div className="space-y-4 mt-3">
                <div className="p-4 bg-softCream/30 border border-divineGold/20 rounded-divine-sm">
                  <h3 className="font-bold text-sacredMaroon">A. Essential Cookies (Strictly Necessary)</h3>
                  <p className="text-sm mt-1">
                    These cookies are required for the basic operation of our website, enabling core features such as page navigation, language retention (Hindi / English / Gujarati), and secure access.
                  </p>
                </div>

                <div className="p-4 bg-softCream/30 border border-divineGold/20 rounded-divine-sm">
                  <h3 className="font-bold text-sacredMaroon">B. Analytical / Performance Cookies</h3>
                  <p className="text-sm mt-1">
                    We use web analytics tools to collect aggregated, anonymous information about how visitors navigate the site, popular pages, and error frequency to continuously improve speed and content quality.
                  </p>
                </div>

                <div className="p-4 bg-softCream/30 border border-divineGold/20 rounded-divine-sm">
                  <h3 className="font-bold text-sacredMaroon">C. Google AdSense Advertising Cookies</h3>
                  <p className="text-sm mt-1">
                    Google AdSense uses cookies to serve relevant ads based on prior browsing activity. Third-party vendors may place or read cookies on your browser to measure ad performance and prevent ad fraud.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">3. Consent Management (EEA & UK Users)</h2>
              <p>
                For users located in the European Economic Area (EEA), United Kingdom, and Switzerland, non-essential advertising cookies are only placed after your explicit consent via our Cookie Banner. You can modify or revoke your consent at any time using your browser settings or our site consent preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">4. How to Disable Cookies</h2>
              <p>
                You can block or remove cookies through your internet browser settings (Chrome, Safari, Firefox, Edge). Please note that disabling essential cookies may affect site performance or language persistence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">5. Contact Us</h2>
              <p>If you have questions regarding our cookie practices, please contact us at:</p>
              <p className="mt-2 font-semibold">Email: divinegarbhsanskar0312@gmail.com</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy;
