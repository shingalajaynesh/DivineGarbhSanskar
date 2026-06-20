import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import ContactForm from '../components/sections/ContactForm';
import { getBreadcrumbSchema } from '../seo/structuredData';

const Contact = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.contact;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://www.thedivinegarbhsanskar.com/" },
    { name: "Contact", url: "https://www.thedivinegarbhsanskar.com/contact" }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/contact" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="pt-16">

        {/* Render Form Section */}
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
