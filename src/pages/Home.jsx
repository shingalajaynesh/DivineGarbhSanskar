import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import { getOrganizationSchema, getLocalBusinessSchema } from '../seo/structuredData';

// Section imports
import Hero from '../components/sections/Hero';
import TrustBar from '../components/sections/TrustBar';
import WhyGarbhSanskar from '../components/sections/WhyGarbhSanskar';
import StatsCounter from '../components/sections/StatsCounter';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import HowItWorks from '../components/sections/HowItWorks';
import Courses from '../components/sections/Courses';
import SimantonayanTeaser from '../components/sections/SimantonayanTeaser';
import Testimonials from '../components/sections/Testimonials';
import VideoGallery from '../components/sections/VideoGallery';
import Faculty from '../components/sections/Faculty';
import MediaCoverage from '../components/sections/MediaCoverage';
import BookStore from '../components/sections/BookStore';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import FinalCTA from '../components/sections/FinalCTA';

const Home = () => {
  const { language, t } = useLanguage();

  const meta = seoConfig.home;
  const orgSchema = getOrganizationSchema();
  const bizSchema = getLocalBusinessSchema();

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={t(meta.title)} />
        <meta property="og:description" content={t(meta.description)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thedivinegarbhsanskar.com/" />
        <meta property="og:image" content="https://www.thedivinegarbhsanskar.com/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t(meta.title)} />
        <meta name="twitter:description" content={t(meta.description)} />
        <meta name="twitter:image" content="https://www.thedivinegarbhsanskar.com/og-image.jpg" />
        
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/" />
        <html lang={language} />

        {/* Structured Data Script Tags */}
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(bizSchema)}
        </script>
      </Helmet>

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Media Trust Marquee */}
        <TrustBar />

        {/* Why Garbh Sanskar explanations */}
        <WhyGarbhSanskar />

        {/* Numerical Stats Counters */}
        <StatsCounter />

        {/* Simantonayan Teaser Promo Section */}
        <SimantonayanTeaser />

        {/* 6 Reusable value cards */}
        <WhyChooseUs />

        {/* 3 Step journey timeline */}
        <HowItWorks />

        {/* Course card options */}
        <Courses />

        {/* Parent carousel reviews */}
        <Testimonials />

        {/* Parent video gallery reviews */}
        <VideoGallery />

        {/* Expert doctors grid */}
        <Faculty />

        {/* External write-up tiles */}
        <MediaCoverage />

        {/* Books store */}
        <BookStore />

        {/* Standard FAQ details */}
        <FAQ />

        {/* Contacts entries */}
        <ContactForm />

        {/* Final conversion CTA */}
        <FinalCTA />
      </main>
    </>
  );
};

export default Home;
