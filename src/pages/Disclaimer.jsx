import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';
import MedicalDisclaimerBanner from '../components/ui/MedicalDisclaimerBanner';

const Disclaimer = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.disclaimer;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Medical Disclaimer', url: 'https://www.thedivinegarbhsanskar.com/disclaimer' }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/disclaimer" />
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
            label={t({ hi: "महत्वपूर्ण स्वास्थ्य सूचना", en: "Health & Safety Notice", gu: "મહત્વપૂર્ણ સ્વાસ્થ્ય સૂચના" })}
            titleHi={t({ hi: "चिकित्सा एवं स्वास्थ्य अस्वीकरण", en: "Medical & Health Disclaimer", gu: "તબીબી અસ્વીકરણ (Medical Disclaimer)" })}
          />

          <div className="mt-8">
            <MedicalDisclaimerBanner fullPage={true} />
          </div>

          <div className="mt-8 bg-white border border-divineGold/25 rounded-divine-md p-8 md:p-12 shadow-sm space-y-8 font-sans text-templeBrown/85 text-base leading-relaxed">
            <p className="text-xs text-templeBrown/60 uppercase font-semibold tracking-wider">
              Last Updated: July 2026 • Mandatory Health Review
            </p>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">1. Educational Purpose Only</h2>
              <p>
                All materials, articles, videos, audio practices (ragas, mantras), dietary suggestions, yoga guidance, and consultation discussions on Divine Garbh Sanskar (https://www.thedivinegarbhsanskar.com) are provided for <strong>general educational, cultural, traditional, and maternal wellness purposes only</strong>.
              </p>
              <p className="mt-3">
                No content on this website is intended to serve as medical advice, clinical diagnosis, or a prescription for any pregnancy, maternal, or fetal condition.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">2. Mandatory Doctor Consultation</h2>
              <p>
                Every expecting mother must maintain regular visits with her qualified obstetrician, gynecologist, or healthcare practitioner.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Never disregard or delay seeking professional medical advice because of something you have read or listened to on this website.</li>
                <li>Never discontinue prescribed medications, prenatal vitamins, iron/calcium supplements, or medical procedures without your doctor's explicit consent.</li>
                <li>Before starting any prenatal yoga, breathing exercises (pranayama), or diet adjustments, clear them with your treating doctor.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">3. Traditional Beliefs vs Proven Medical Outcomes</h2>
              <p>
                Vedic Garbh Sanskar is an ancient Indian cultural tradition focused on positive mindset, satvik lifestyle, music, prayer, and emotional bonding during pregnancy.
              </p>
              <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 rounded-r-md text-sm">
                <strong>Important Policy Statement:</strong> We do NOT promise, guarantee, or claim that Garbh Sanskar practices can directly control or guarantee baby intelligence, IQ level, gender selection, physical appearance, immunity, or specific birth delivery outcomes (e.g. guaranteeing normal delivery). Delivery decisions and fetal growth depend on complex medical and biological factors monitored by clinicians.
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">4. Emergency Situations</h2>
              <p>
                If you experience severe abdominal pain, vaginal bleeding, fluid leakage, decreased fetal movement, dizziness, or any sudden symptoms, immediately contact your hospital or local emergency medical services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
