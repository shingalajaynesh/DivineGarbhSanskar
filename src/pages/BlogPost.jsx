import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import MandalaBg from '../components/ui/MandalaBg';
import { blogPosts, getBlogPostBySlug } from '../data/blogPosts';
import { User, CheckCircle2, Calendar, BookOpen, ArrowRight, Heart, ShieldCheck } from 'lucide-react';
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
    { name: typeof post.title === 'object' ? post.title.en : post.title, url: canonicalUrl }
  ]);

  const faqSchema = getFAQSchema(
    (post.faqs || []).map((faq) => ({
      question: { en: typeof faq.question === 'object' ? faq.question.en : faq.question },
      answer: { en: typeof faq.answer === 'object' ? faq.answer.en : faq.answer }
    }))
  );

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      if (a.category.en === post.category.en && b.category.en !== post.category.en) return -1;
      if (b.category.en === post.category.en && a.category.en !== post.category.en) return 1;
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 3);

  // Helper to extract localized text
  const getLocalizedText = (val) => {
    if (!val) return '';
    if (typeof val === 'object' && !Array.isArray(val)) {
      return val[language] || val.en || val.hi || val.gu || '';
    }
    return String(val);
  };

  // Helper to extract localized paragraphs array
  const getLocalizedParagraphs = (section) => {
    if (!section || !section.paragraphs) return [];
    
    // Case 1: paragraphs is an object with language keys: { en: [...], hi: [...], gu: [...] }
    if (typeof section.paragraphs === 'object' && !Array.isArray(section.paragraphs)) {
      return section.paragraphs[language] || section.paragraphs.en || section.paragraphs.hi || section.paragraphs.gu || [];
    }

    // Case 2: paragraphs is an array of strings or localized objects: [ "p1", "p2" ] or [ { en, hi, gu } ]
    if (Array.isArray(section.paragraphs)) {
      return section.paragraphs.map((p) => (typeof p === 'object' ? getLocalizedText(p) : p));
    }

    return [];
  };

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
          
          {/* Back to Blog Navigation */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sacredMaroon hover:text-vermillion uppercase tracking-wider transition-colors mb-6"
          >
            <span>{t({ hi: "← सभी लेखों पर वापस जाएं", en: "← Back to All Articles", gu: "← બધા લેખો પર પાછા જાઓ" })}</span>
          </Link>

          {/* Hero Image */}
          <div className="rounded-[28px] overflow-hidden border-2 border-divineGold/30 shadow-lg bg-white">
            <img
              src={post.image}
              alt={t(post.title)}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </div>

          {/* Article Header */}
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
                <User className="w-3.5 h-3.5 text-sacredMaroon" />
                <span>{t({ hi: "लेखक:", en: "Authored by:", gu: "લેખક:" })}</span>
                <Link to="/authors" className="underline hover:text-vermillion">Dr. Taruna Jiyani</Link>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-templeBrown">
                <CheckCircle2 className="w-3.5 h-3.5 text-divineGold" />
                <span>{t({ hi: "संपादकीय मानक:", en: "Evidence Standards:", gu: "સંપાદકીય ધોરણો:" })}</span>
                <Link to="/editorial-policy" className="underline hover:text-vermillion">
                  {t({ hi: "डब्ल्यूएचओ व आयुष दिशानिर्देश", en: "WHO, ICMR & AYUSH Standards", gu: "WHO અને આયુષ માર્ગદર્શિકા" })}
                </Link>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-templeBrown">
                <Calendar className="w-3.5 h-3.5 text-templeBrown/70" />
                <span>{t({ hi: "प्रकाशन:", en: "Updated:", gu: "પ્રકાશન:" })} {post.date}</span>
              </span>
            </div>
          </header>

          {/* Medical Disclaimer Box */}
          <MedicalDisclaimerBanner />

          {/* Traditional Wisdom vs Clinical Evidence Demarcation Box */}
          <div className="mt-6 p-4 md:p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs md:text-sm text-templeBrown/90 leading-relaxed font-sans shadow-xs">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sacredMaroon shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sacredMaroon text-xs uppercase tracking-wider mb-1">
                  {t({
                    hi: "वैदिक परंपरा एवं आधुनिक चिकित्सा साक्ष्य समन्वय (Evidence & Tradition Balance)",
                    en: "Vedic Prenatal Tradition & Modern Clinical Evidence Notice",
                    gu: "વૈદિક પરંપરા અને આધુનિક તબીબી સાક્ષ્ય સમન્વય"
                  })}
                </p>
                <p>
                  {t({
                    hi: "यह मार्गदर्शिका प्राचीन आयुर्वेदिक गर्भिणी परिचर्या और मातृत्व कल्याण सिद्धांतों पर आधारित है। वैदिक गर्भ संस्कार की विधियां गर्भावस्था के दौरान मानसिक शांति, भावनात्मक जुड़ाव और सात्विक जीवनशैली के लिए समग्र पूरक (Complementary Support) हैं। किसी भी नैदानिक जांच, गर्भावस्था जटिलता या दवा के लिए हमेशा अपने पंजीकृत प्रसूति रोग विशेषज्ञ की सलाह लें।",
                    en: "This educational guide integrates classical Ayurvedic Garbhini Paricharya with maternal wellness principles. Vedic Garbh Sanskar practices serve as holistic, non-invasive lifestyle complements supporting relaxation and fetal bonding, and are designed to accompany—never replace—clinical obstetric care.",
                    gu: "આ માર્ગદર્શિકા આયુર્વેદિક ગર્ભિણી પરિચર્યા અને પ્રિનેટલ સુખાકારી પર આધારિત છે. વૈદિક ગર્ભ સંસ્કાર પદ્ધતિઓ માનસિક શાંતિ માટેનું પૂરક માર્ગદર્શન છે. કોઈપણ તબીબી નિદાન કે સારવાર માટે હંમેશા તમારા ગાયનેકોલોજિસ્ટની સલાહ લો."
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Article Main Body Sections */}
          <div className="mt-10 bg-white/95 rounded-[28px] border border-divineGold/25 p-6 md:p-10 shadow-sm">
            <div className="space-y-10">
              {(post.sections || []).map((section, sIdx) => {
                const headingText = getLocalizedText(section.heading);
                const paragraphList = getLocalizedParagraphs(section);

                return (
                  <section key={sIdx}>
                    <h2 className="text-2xl md:text-3xl font-serif text-sacredMaroon mb-4">
                      {headingText}
                    </h2>
                    <div className="space-y-4">
                      {paragraphList.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-base md:text-lg leading-8 text-templeBrown/85 font-sans"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          {(post.faqs || []).length > 0 && (
            <section className="mt-12 bg-white rounded-[28px] border border-divineGold/25 p-6 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-serif text-sacredMaroon mb-6">
                {t({ hi: "अक्सर पूछे जाने वाले प्रश्न (FAQ)", en: "Frequently Asked Questions", gu: "વારંવાર પૂછાતા પ્રશ્નો (FAQ)" })}
              </h2>
              <div className="space-y-5">
                {post.faqs.map((faq, fIdx) => {
                  const qText = getLocalizedText(faq.question);
                  const aText = getLocalizedText(faq.answer);

                  return (
                    <div key={fIdx} className="border-b border-divineGold/15 pb-5 last:border-b-0">
                      <h3 className="text-lg font-serif font-bold text-sacredMaroon">{qText}</h3>
                      <p className="mt-2 text-base leading-7 text-templeBrown/85 font-sans">{aText}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Medical & Scientific References Section */}
          {post.references && post.references.length > 0 && (
            <section className="mt-10 bg-white rounded-[28px] border border-divineGold/20 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <BookOpen className="w-5 h-5 text-sacredMaroon" />
                <h3 className="text-xl font-serif font-bold text-sacredMaroon">
                  {t({ hi: "वैज्ञानिक एवं शास्त्रोक्त संदर्भ", en: "Scientific & Classical References", gu: "વૈજ્ઞાનિક અને શાસ્ત્રોક્ત સંદર્ભ" })}
                </h3>
              </div>
              <p className="text-xs text-templeBrown/70 mb-4 leading-relaxed font-sans">
                {t({
                  hi: "हमारी संपादकीय टीम सभी पोषण, योग और गर्भ संस्कार दावों की पुष्टि सहकर्मी-समीक्षित शोध पत्रिकाओं, राष्ट्रीय आहार दिशानिर्देशों और शास्त्रीय आयुर्वेदिक ग्रंथों से करती है।",
                  en: "Our editorial team verifies all prenatal and nutritional guidance against peer-reviewed clinical journals, national health guidelines, and classical Ayurvedic medical treatises.",
                  gu: "અમારી સંપાદકીય ટીમ તમામ આહાર, યોગ અને ગર્ભ સંસ્કાર દાવાઓની ચકાસણી શાસ્ત્રીય ગ્રંથો અને તબીબી સંશોધનથી કરે છે."
                })}
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-templeBrown/85">
                {post.references.map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-divineGold font-bold shrink-0">[{idx + 1}]</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Author & Reviewer Bio Card */}
          <section className="mt-10 bg-softCream/40 border-2 border-divineGold/30 rounded-[28px] p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src="/taruna.jpg"
                alt="Dr. Taruna Jiyani"
                className="w-24 h-24 rounded-full object-cover border-2 border-divineGold shadow-md shrink-0"
              />
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-serif text-lg font-bold text-sacredMaroon">
                    Dr. Taruna Jiyani
                  </h3>
                  <span className="px-2.5 py-0.5 bg-divineGold/20 text-sacredMaroon text-[10px] font-bold rounded-full uppercase">
                    {t({ hi: "संस्थापक एवं मुख्य मार्गदर्शक", en: "Founder & Lead Counselor", gu: "સ્થાપક અને મુખ્ય સલાહકાર" })}
                  </span>
                </div>
                <p className="text-xs text-templeBrown/80 leading-relaxed font-sans">
                  {t({
                    hi: "डॉ. तरुणा जियाणी सूरत, गुजरात स्थित वैदिक गर्भ संस्कार विशेषज्ञ और मातृत्व परामर्शदाता हैं। उन्होंने 10,000+ से अधिक माताओं को जागरूक मातृत्व की दिशा में मार्गदर्शन प्रदान किया है।",
                    en: "Dr. Taruna Jiyani is a seasoned Garbh Sanskar educator and maternal wellness counselor based in Surat, Gujarat. She has guided over 10,000+ expectant mothers in integrating authentic Vedic prenatal wisdom with evidence-based pregnancy care.",
                    gu: "ડૉ. તરુણા જીયાણી સુરત, ગુજરાત સ્થિત વૈદિક ગર્ભ સંસ્કાર સલાહકાર છે. તેમણે ૧૦,૦૦૦+ થી વધુ માતાઓને સભાન માતૃત્વનું માર્ગદર્શન આપ્યું છે."
                  })}
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-sacredMaroon">
                  <Link to="/authors" className="underline hover:text-vermillion">
                    {t({ hi: "लेखक प्रोफाइल देखें →", en: "View Full Author Profile →", gu: "લેખક પરિચય જુઓ →" })}
                  </Link>
                  <Link to="/editorial-policy" className="underline hover:text-vermillion">
                    {t({ hi: "संपादकीय मानक →", en: "Editorial Standards →", gu: "સંપાદકીય ધોરણો →" })}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Conversion & Related Articles Split Section */}
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            
            {/* Left: Course Counseling Callout */}
            <div className="bg-sacredMaroon text-white rounded-[28px] p-8 shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold">
                  {t({ hi: "व्यक्तिगत मार्गदर्शन चाहते हैं?", en: "Want Personal Guidance?", gu: "વ્યક્તિગત માર્ગદર્શન જોઈએ છે?" })}
                </h2>
                <p className="mt-3 text-white/85 leading-relaxed text-sm">
                  {t({
                    hi: "डॉ. तरुणा जियाणी एवं विशेषज्ञों के साथ अपनी गर्भावस्था के अनुसार विशेष 1:1 परामर्श सत्र और गर्भ संस्कार पाठ्यक्रम बुक करें।",
                    en: "Explore Divine Garbh Sanskar programs and connect with our expert counseling team for a pregnancy routine tailored to your stage and needs.",
                    gu: "ડૉ. તરુણા જીયાણી અને નિષ્ણાતો સાથે તમારી ગર્ભાવસ્થા મુજબ વિશેષ ૧:૧ પરામર્શ સત્ર બુક કરો."
                  })}
                </p>
              </div>
              <Link
                to="/courses"
                className="inline-block mt-6 rounded-full bg-divineGold px-6 py-3 text-sacredMaroon font-bold text-xs uppercase tracking-wider hover:bg-white transition-all text-center"
              >
                {t({ hi: "पाठ्यक्रम विवरण देखें", en: "View Programs", gu: "કોર્સ વિગત જુઓ" })}
              </Link>
            </div>

            {/* Right: Related Reading */}
            <div className="bg-white rounded-[28px] border border-divineGold/20 p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-sacredMaroon font-bold">
                {t({ hi: "संबंधित एवं नवीनतम लेख", en: "Related & Recent Guides", gu: "સંબંધિત અને નવીનતમ લેખો" })}
              </h2>
              <div className="mt-5 space-y-4">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/blog/${item.slug}`}
                    className="block rounded-2xl border border-divineGold/20 p-4 hover:border-vermillion transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="uppercase tracking-wider text-vermillion font-bold">
                        {t(item.category)}
                      </span>
                      <span className="text-templeBrown/60 text-[11px]">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-templeBrown group-hover:text-vermillion transition-colors leading-snug">
                      {t(item.title)}
                    </h3>
                    <p className="mt-1.5 text-xs text-templeBrown/70 leading-relaxed line-clamp-2">
                      {t(item.description)}
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
