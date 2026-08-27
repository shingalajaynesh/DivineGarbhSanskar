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
              Last Updated: August 2026 • Evidence & Quality Standard
            </p>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">1. Editorial Mission & Guiding Principles</h2>
              <p>
                At Divine Garbh Sanskar, our mission is to provide authentic, culturally rich, and practically grounded educational content on Vedic prenatal science, satvik trimester nutrition, gentle yoga practices, classical sound therapy (Nada Yoga), and maternal emotional wellbeing.
              </p>
              <p className="mt-3">
                All guides are crafted to nurture a calm, positive, and healthy pregnancy environment while strictly respecting the boundaries of modern obstetric medicine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">2. Authorship & Editorial Leadership</h2>
              <p>
                - <strong>Lead Counselor & Chief Editor:</strong> Content is authored and overseen by <strong>Dr. Taruna Jiyani</strong> (Founder), holding qualifications in Naturopathy & Alternative Wellness (N.D.) and certified as a Vedic Garbh Sanskar educator and maternal lifestyle counselor with over 8+ years of field experience in Surat, Gujarat.
              </p>
              <p className="mt-3">
                - <strong>Non-Allopathic Educational Scope:</strong> Divine Garbh Sanskar provides holistic lifestyle, emotional bonding, and cultural education. Dr. Taruna Jiyani practices as a naturopathy and prenatal lifestyle counselor; she is not an allopathic physician/obstetric surgeon. We do not provide clinical prescriptions, allopathic diagnoses, or surgical advice. Every article explicitly reminds expectant mothers to maintain active medical supervision with their registered obstetrician/gynecologist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">3. 4-Pillar Evidence & Fact-Checking Framework</h2>
              <p>
                To maintain the highest factual integrity, safety, and cultural authenticity, our educational material synthesizes traditional Ayurvedic wisdom with established public health and clinical benchmarks across 4 core review pillars:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>1. Ayurvedic Prenatal Science:</strong> Charaka Samhita, Sushruta Samhita, and Kashyapa Samhita (Garbhini Paricharya protocols) and Ministry of AYUSH prenatal guidelines.</li>
                <li><strong>2. Movement & Anatomy Safety:</strong> FOGSI safety advisories, trimester-appropriate pelvic movement, and contraindication verifications.</li>
                <li><strong>3. Classical Nada Yoga & Soundscapes:</strong> Soothing acoustic ragas for mental tranquility and maternal stress relief.</li>
                <li><strong>4. Maternal Wellbeing & Evidence Standards:</strong> World Health Organization (WHO) Antenatal Care Standards, ICMR-NIN Dietary Guidelines, and supportive family counseling.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">4. Human-First Content & No Mass Automation</h2>
              <p>
                We adhere strictly to Google's People-First Content standards. Every published guide undergoes human drafting, thorough fact-checking, and cultural review. We do not generate mass automated or unverified content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">5. Reader Feedback & Corrections Protocol</h2>
              <p>
                If you identify any outdated reference, medical nuance, or typographical error in our published material, our editorial team will review and update the guide promptly:
              </p>
              <p className="mt-2 font-semibold text-sacredMaroon">
                Email: divinegarbhsanskar0312@gmail.com (Subject: Editorial Correction)
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorialPolicy;
