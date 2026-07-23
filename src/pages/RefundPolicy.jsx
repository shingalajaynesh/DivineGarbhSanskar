import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';

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
              Last Updated: July 2026 • Effective Date: January 1, 2024
            </p>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">1. Overview</h2>
              <p>
                At Divine Garbh Sanskar, we strive to deliver high-quality, authentic Vedic prenatal guidance and personal counseling. We want every expecting mother and family to have complete clarity regarding payments, enrollment, and refunds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">2. Program Enrollment & Trial Window</h2>
              <p>
                - <strong>Initial Inquiries & Consultations:</strong> Introductory counseling calls and inquiry consultations are free of charge.
              </p>
              <p className="mt-2">
                - <strong>Course Registration:</strong> When enrolling in a 3-month, 9-month, or 12-month program, participants receive complete access to digital materials, daily activity plans, and counselor sessions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">3. Refund Eligibility</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Cancellation within 7 Days:</strong> If you enroll in a program and decide it is not suitable for your needs, you may request a refund within 7 calendar days of your enrollment date.
                </li>
                <li>
                  <strong>Medical Exceptions:</strong> If a physician advises medical rest or restrictions that prevent participation, refund requests will be reviewed sympathetically upon submission of a doctor's certificate.
                </li>
                <li>
                  <strong>Physical Kits / Books:</strong> Physical items (such as Garbh Sanskar activity books or materials) that have already been shipped or delivered are non-refundable due to hygiene and publication policies.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">4. Processing Refunds</h2>
              <p>
                Approved refunds will be processed via bank transfer or original payment method within 7 to 10 working days after confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">5. How to Request a Refund</h2>
              <p>
                To initiate a cancellation or refund request, please email us with your full name, registered mobile number, and payment receipt at:
              </p>
              <p className="mt-2 font-semibold text-sacredMaroon">Email: divinegarbhsanskar0312@gmail.com</p>
              <p className="mt-1 font-semibold text-sacredMaroon">Phone / WhatsApp: +91 96384 84545</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
