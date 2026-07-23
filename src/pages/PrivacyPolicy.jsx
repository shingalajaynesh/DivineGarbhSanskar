import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import MandalaBg from '../components/ui/MandalaBg';
import SectionLabel from '../components/ui/SectionLabel';
import { getBreadcrumbSchema } from '../seo/structuredData';

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
              Last Updated: July 2026 • Effective Date: January 1, 2024
            </p>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">1. Introduction</h2>
              <p>
                Welcome to Divine Garbh Sanskar ("we," "our," "us"). We respect your privacy and are committed to protecting personal information provided by visitors and participants who interact with our website (https://www.thedivinegarbhsanskar.com).
              </p>
              <p className="mt-3">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit inquiries, register for programs, or interact with our digital content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, city, and pregnancy stage provided voluntarily when filling out contact forms, booking consultations, or enrolling in programs.
                </li>
                <li>
                  <strong>Derivative Data:</strong> IP address, browser type, operating system, access times, pages viewed, and referral URLs collected automatically by web servers and analytics tools.
                </li>
                <li>
                  <strong>Advertising & Tracking Data:</strong> Identifiers collected via cookies, web beacons, and Google advertising tags.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">3. Google AdSense & Third-Party Advertising</h2>
              <p>
                We use Google AdSense and authorized third-party advertising vendors to serve advertisements when you visit our website.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  Google uses cookies (including the DoubleClick cookie) to serve ads based on users' prior visits to our website or other websites on the internet.
                </li>
                <li>
                  Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-vermillion underline font-semibold">Google Ad Settings</a> or visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-vermillion underline font-semibold">aboutads.info</a>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">4. Cookies and Web Beacons</h2>
              <p>
                Our website uses cookies, web beacons, and local storage to personalize content, maintain user preferences (such as language selection), provide social media features, and analyze traffic patterns. You can manage or disable optional cookies through your browser settings or via our site's Cookie Consent banner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">5. How We Use Your Information</h2>
              <p>Information collected is used strictly for legitimate business purposes:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>To provide, operate, and improve our Garbh Sanskar guidance programs.</li>
                <li>To respond to your questions, inquiries, and customer service requests.</li>
                <li>To send program notifications, workshop reminders, and educational updates (only with your consent).</li>
                <li>To monitor and analyze usage trends and enhance website security.</li>
                <li>To ensure compliance with Google Publisher Policies and applicable privacy laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">6. Data Protection and Rights</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties for marketing purposes. You have the right to request access to, correction of, or deletion of your personal information stored with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sacredMaroon mb-4">7. Contact Us</h2>
              <p>
                If you have questions or concerns regarding this Privacy Policy, please contact us:
              </p>
              <div className="mt-3 p-4 bg-softCream/40 rounded-divine-sm border border-divineGold/20">
                <p><strong>Divine Garbh Sanskar</strong></p>
                <p>Address: 164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Nana Varachha, Surat, Gujarat - 395013</p>
                <p>Email: divinegarbhsanskar0312@gmail.com</p>
                <p>Phone: +91 96384 84545</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
