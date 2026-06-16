import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import ContactForm from '../components/sections/ContactForm';

const Contact = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.contact;

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/contact" />
        <html lang={language} />
      </Helmet>

      <div className="pt-16">
        {/* Render Form Section */}
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
