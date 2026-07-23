import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';

const EditorialPolicy = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.editorial;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Editorial Policy', url: 'https://www.thedivinegarbhsanskar.com/editorial-policy' }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/editorial-policy" />
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
            label={t({ hi: "सामग्री मानक", en: "Content Integrity", gu: "સામગ્રી વિગત" })}
            titleHi={t({ hi: "संपादकीय नीति (Editorial Policy)", en: "Editorial & Quality Policy", gu: "સંપાદકીય નીતિ (Editorial Policy)" })}
          />

          <div className="mt-8 bg-white border border-divineGold/25 rounded-divine-md p-8 md:p-12 shadow-sm space-y-8 font-sans text-templeBrown/85 text-base leading-relaxed">
            <p className="text-xs text-templeBrown/60 uppercase font-semibold tracking-wider">
              Last Updated: July 2026 • Quality & Fact-Checking Standard
            </p>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">1. Editorial Mission</h2>
              <p>
                At Divine Garbh Sanskar, our editorial mission is to publish original, accurate, culturally respectful, and practical content about Vedic prenatal science, pregnancy diet, prenatal yoga safety, music therapy, and emotional wellbeing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">2. Author & Reviewer Standards</h2>
              <p>
                - <strong>Author Identification:</strong> Articles are authored by identified counselors and educators led by Dr. Taruna Jiyani (Founder).
              </p>
              <p className="mt-2">
                - <strong>Medical Clarification:</strong> Health and nutrition topics clearly demarcate traditional wellness practices from clinical medical advice, providing mandatory disclaimers to consult a gynecologist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">3. AI-Content & Human Quality Control</h2>
              <p>
                We adhere strictly to Google's People-First Content Guidance. AI tools may assist in research structuring or language drafting, but all published articles undergo rigorous human review, fact-checking, and editorial editing for originality and usefulness before publication.
              </p>
              <p className="mt-3 font-semibold text-sacredMaroon">
                We do not publish mass-produced, repetitive, or unverified automated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">4. Sources & Citation</h2>
              <p>
                Factual statements regarding Ayurveda, classical music ragas, fetal sensory development, and nutritional guidelines are referenced from traditional Vedic texts or recognized prenatal biology sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">5. Corrections Policy</h2>
              <p>
                If an error or outdated piece of information is identified in any published article, our editorial team corrects it promptly with updated dates. Readers may submit factual corrections to:
              </p>
              <p className="mt-2 font-semibold">Email: divinegarbhsanskar0312@gmail.com</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorialPolicy;
