import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import SectionLabel from '../components/ui/SectionLabel';
import FloatingCard from '../components/ui/FloatingCard';
import MandalaBg from '../components/ui/MandalaBg';
import { getBreadcrumbSchema } from '../seo/structuredData';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.blog;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Blog', url: 'https://www.thedivinegarbhsanskar.com/blog' }
  ]);

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/blog" />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="relative pt-32 pb-20 overflow-hidden bg-softCream">
        <MandalaBg className="top-12 left-12 w-80 h-80 opacity-[0.04]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel
            isPageHeader={true}
            label={t({ hi: 'ज्ञान गंगा', en: 'Pregnancy Wisdom', gu: 'જ્ઞાન ગંગા' })}
            titleHi={t({
              hi: 'गर्भ संस्कार ब्लॉग एवं स्वास्थ्य चर्चा',
              en: 'Garbh Sanskar Blog & Articles',
              gu: 'ગર્ભ સંસ્કાર બ્લોગ અને આરોગ્ય ચર્ચા'
            })}
          />

          <p className="mt-6 max-w-3xl text-base md:text-lg text-templeBrown/80 leading-8">
            Practical pregnancy guidance helps this website rank for more searches than the brand name alone.
            These articles are designed to answer real questions parents ask about Garbh Sanskar, diet,
            music, yoga, and a calm pregnancy routine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogPosts.map((post) => (
              <FloatingCard
                key={post.id}
                delay={post.id * 0.1}
                className="bg-white border border-divineGold/25 rounded-divine-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden border-b border-divineGold/10">
                    <img
                      src={post.image}
                      alt={t(post.title)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    <span className="font-accent text-[10px] font-bold text-vermillion tracking-wider uppercase">
                      {t(post.category)}
                    </span>

                    <span className="text-[11px] text-templeBrown/60 font-sans block mt-1 mb-3">
                      {post.date} • {post.readTime}
                    </span>

                    <Link to={`/blog/${post.slug}`} className="block">
                      <h3 className="font-sans font-bold text-base md:text-lg text-sacredMaroon mb-3 leading-snug line-clamp-2 hover:text-vermillion transition-colors">
                        {t(post.title)}
                      </h3>
                    </Link>

                    <p className="font-sans text-xs md:text-sm text-templeBrown/75 leading-relaxed line-clamp-4">
                      {t(post.description)}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold font-sans text-sacredMaroon hover:text-vermillion transition-colors uppercase tracking-wider border-b border-sacredMaroon hover:border-vermillion pb-0.5"
                  >
                    {t({ hi: 'आगे पढ़ें →', en: 'Read More →', gu: 'વધુ વાંચો →' })}
                  </Link>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
