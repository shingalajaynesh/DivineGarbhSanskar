import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MandalaBg from '../components/ui/MandalaBg';
import { blogPosts, getBlogPostBySlug } from '../data/blogPosts';
import MedicalDisclaimerBanner from '../components/ui/MedicalDisclaimerBanner';
import { getArticleSchema, getBreadcrumbSchema, getFAQSchema } from '../seo/structuredData';
import NotFound from './NotFound';

const BlogPost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const canonicalUrl = `https://www.thedivinegarbhsanskar.com/blog/${post.slug}`;
  const articleSchema = getArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Blog', url: 'https://www.thedivinegarbhsanskar.com/blog' },
    { name: post.title.en, url: canonicalUrl }
  ]);
  const faqSchema = getFAQSchema(
    post.faqs.map((faq) => ({
      question: { en: faq.question },
      answer: { en: faq.answer }
    }))
  );
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{`${t(post.title)} | Divine Garbh Sanskar`}</title>
        <meta name="description" content={t(post.description)} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:title" content={`${t(post.title)} | Divine Garbh Sanskar`} />
        <meta property="og:description" content={t(post.description)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.image} />
        <link rel="canonical" href={canonicalUrl} />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <article className="relative pt-32 pb-20 overflow-hidden bg-softCream">
        <MandalaBg className="top-10 right-0 w-96 h-96 opacity-[0.05]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-semibold text-sacredMaroon hover:text-vermillion transition-colors"
          >
            ← Back to Blog
          </Link>

          <div className="mt-8 rounded-[28px] overflow-hidden border border-divineGold/20 shadow-lg bg-white">
            <img
              src={post.image}
              alt={t(post.title)}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </div>

          <header className="mt-8">
            <p className="text-xs uppercase tracking-[0.25em] text-vermillion font-bold">
              {t(post.category)} • {post.readTime}
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-sacredMaroon leading-tight">
              {t(post.title)}
            </h1>
            <p className="mt-4 text-base md:text-lg text-templeBrown/80 leading-relaxed">
              {t(post.description)}
            </p>
            
            {/* Author & Reviewer Attribution */}
            <div className="mt-6 flex flex-wrap items-center gap-4 py-3 px-4 bg-white rounded-divine-sm border border-divineGold/25 text-xs text-templeBrown/80 font-medium">
              <span className="flex items-center gap-1.5 text-sacredMaroon font-bold">
                ✍️ Authored by: <Link to="/authors" className="underline hover:text-vermillion">Dr. Taruna Jiyani</Link>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-templeBrown">
                🔍 Reviewed by: <Link to="/editorial-policy" className="underline hover:text-vermillion">Editorial Board</Link>
              </span>
              <span>•</span>
              <span>📅 Published: {post.date}</span>
            </div>
          </header>

          {/* Medical Disclaimer Box */}
          <MedicalDisclaimerBanner />

          <div className="mt-10 bg-white/90 rounded-[28px] border border-divineGold/20 p-6 md:p-10 shadow-sm">
            <div className="space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl md:text-3xl font-serif text-sacredMaroon mb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base md:text-lg leading-8 text-templeBrown/85"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <section className="mt-12 bg-white rounded-[28px] border border-divineGold/20 p-6 md:p-10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-serif text-sacredMaroon mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-divineGold/15 pb-5 last:border-b-0">
                  <h3 className="text-lg font-semibold text-templeBrown">{faq.question}</h3>
                  <p className="mt-2 text-base leading-7 text-templeBrown/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bg-sacredMaroon text-white rounded-[28px] p-8 shadow-md">
              <h2 className="text-2xl font-serif">Want personal guidance?</h2>
              <p className="mt-3 text-white/85 leading-7">
                Explore Divine Garbh Sanskar programs and connect with the team for a pregnancy
                routine tailored to your stage and needs.
              </p>
              <Link
                to="/courses"
                className="inline-block mt-6 rounded-full bg-divineGold px-6 py-3 text-sacredMaroon font-semibold"
              >
                View Programs
              </Link>
            </div>

            <div className="bg-white rounded-[28px] border border-divineGold/20 p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-sacredMaroon">Related reading</h2>
              <div className="mt-5 space-y-4">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/${item.slug}`}
                    className="block rounded-2xl border border-divineGold/20 p-4 hover:border-vermillion transition-colors"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-vermillion font-bold">
                      {item.category.en}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-templeBrown">
                      {item.title.en}
                    </h3>
                    <p className="mt-2 text-sm text-templeBrown/70 leading-6">
                      {item.description.en}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
