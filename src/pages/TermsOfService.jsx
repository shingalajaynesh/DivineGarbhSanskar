import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';

const TermsOfService = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.terms;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Terms of Service', url: 'https://www.thedivinegarbhsanskar.com/terms-of-service' }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/terms-of-service" />
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
            label={t({ hi: "कानूनी शर्तें", en: "Terms & Conditions", gu: "કાનૂની શરતો" })}
            titleHi={t({ hi: "सेवा की शर्तें (Terms of Service)", en: "Terms of Service", gu: "સેવાની શરતો (Terms of Service)" })}
          />

          <div className="mt-8 bg-white border border-divineGold/25 rounded-divine-md p-8 md:p-12 shadow-sm space-y-8 font-sans text-templeBrown/85 text-base leading-relaxed">
            <p className="text-xs text-templeBrown/60 uppercase font-semibold tracking-wider">
              Last Updated: July 2026 • Effective Date: January 1, 2024
            </p>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website https://www.thedivinegarbhsanskar.com, enrolling in programs, or utilizing our educational materials, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">2. Educational & Wellness Purpose Only</h2>
              <p>
                Divine Garbh Sanskar provides educational, cultural, traditional, and prenatal wellness guidance. <strong>Our services, courses, articles, music, and routines do NOT constitute medical diagnosis, treatment, or professional obstetric care.</strong>
              </p>
              <p className="mt-3">
                All expecting mothers must remain under the direct care and supervision of a licensed doctor (obstetrician/gynecologist) throughout their pregnancy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">3. Intellectual Property Rights</h2>
              <p>
                All content, text, audio recordings, graphic design, logos, mantras, video material, and custom curriculum published on this site are the intellectual property of Divine Garbh Sanskar and are protected by copyright laws. Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">4. User Conduct</h2>
              <p>When using our site or participating in guided groups, you agree to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Provide accurate contact and registration information.</li>
                <li>Refrain from using the website for unauthorized commercial purposes or spam.</li>
                <li>Respect fellow participants in workshop sessions and discussion forums.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Divine Garbh Sanskar and its counselors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your reliance on information presented on the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">6. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">7. Contact Information</h2>
              <p>For any legal inquiries regarding these terms, please write to:</p>
              <p className="mt-2 font-semibold">Email: divinegarbhsanskar0312@gmail.com</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
