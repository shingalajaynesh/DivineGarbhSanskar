import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import SectionLabel from '../components/ui/SectionLabel';
import FloatingCard from '../components/ui/FloatingCard';
import MandalaBg from '../components/ui/MandalaBg';
import { getBreadcrumbSchema } from '../seo/structuredData';
import { blogPosts } from '../data/blogPosts';
import { Calendar, Clock, Search, ArrowRight, ArrowUpDown, X, BookOpen } from 'lucide-react';

const MASTER_CATEGORIES = [
  {
    id: 'all',
    label: { en: 'All Guides', hi: 'सभी लेख', gu: 'બધા લેખો' }
  },
  {
    id: 'Nutrition & Diet',
    label: { en: 'Nutrition & Diet', hi: 'पोषण एवं आहार', gu: 'પોષણ અને આહાર' }
  },
  {
    id: 'Vedic Science & Ragas',
    label: { en: 'Vedic Science & Ragas', hi: 'वैदिक विज्ञान एवं संगीत', gu: 'વૈદિક વિજ્ઞાન અને સંગીત' }
  },
  {
    id: 'Yoga & Meditation',
    label: { en: 'Yoga & Meditation', hi: 'योग एवं ध्यान', gu: 'યોગ અને ધ્યાન' }
  },
  {
    id: 'Trimesters & Delivery',
    label: { en: 'Trimesters & Delivery', hi: 'त्रैमासिक एवं प्रसव', gu: 'ત્રિમાસિક અને પ્રસૂતિ' }
  },
  {
    id: 'Maternal Wellbeing',
    label: { en: 'Maternal Wellbeing', hi: 'मातृ स्वास्थ्य एवं जीवनशैली', gu: 'માતૃ સ્વાસ્થ્ય અને જીવનશૈલી' }
  }
];

const Blog = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.blog;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'oldest' | 'readTime'

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.thedivinegarbhsanskar.com/' },
    { name: 'Blog', url: 'https://www.thedivinegarbhsanskar.com/blog' }
  ]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { all: blogPosts.length };
    MASTER_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = blogPosts.filter((p) => p.category.en === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filter and Sort Blog Posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...blogPosts];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.en.toLowerCase().includes(q) ||
          post.title.hi.toLowerCase().includes(q) ||
          post.title.gu.toLowerCase().includes(q) ||
          post.description.en.toLowerCase().includes(q) ||
          post.description.hi.toLowerCase().includes(q) ||
          post.description.gu.toLowerCase().includes(q) ||
          (post.keywords && post.keywords.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((post) => post.category.en === selectedCategory);
    }

    // 3. Sorting logic
    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'readTime') {
      const getMinutes = (str) => parseInt(str) || 0;
      result.sort((a, b) => getMinutes(a.readTime) - getMinutes(b.readTime));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Featured Spotlight Article (Latest post)
  const featuredPost = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted[0];
  }, []);

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

      <div className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-softCream/40 via-white to-softCream/30 min-h-screen">
        <MandalaBg className="top-12 left-12 w-96 h-96 opacity-[0.035] text-divineGold pointer-events-none" />
        <MandalaBg className="bottom-12 right-12 w-96 h-96 opacity-[0.035] text-sacredMaroon pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <SectionLabel
            isPageHeader={true}
            label={t({ hi: 'ज्ञान गंगा', en: 'Garbh Sanskar Wisdom Library', gu: 'જ્ઞાન ગંગા' })}
            titleHi={t({
              hi: 'गर्भ संस्कार ब्लॉग एवं स्वास्थ्य चर्चा',
              en: 'Articles, Research & Pregnancy Guides',
              gu: 'ગર્ભ સંસ્કાર બ્લોગ અને આરોગ્ય માર્ગદર્શિકા'
            })}
          />

          <p className="mt-4 max-w-3xl mx-auto text-center text-base md:text-lg text-templeBrown/80 leading-relaxed font-sans">
            {t({
              hi: 'गर्भावस्था, सात्विक पोषण, राग संगीत चिकित्सा, योग एवं वैदिक गर्भ संस्कार पर प्रामाणिक और वैज्ञानिक शोध-आधारित लेख संग्रह।',
              en: 'Explore expert-authored, evidence-based guides on Garbh Sanskar, satvik pregnancy nutrition, raga music therapy, trimester care, and maternal wellbeing.',
              gu: 'ગર્ભાવસ્થા, સાત્વિક આહાર, રાગ સંગીત, યોગ અને વૈદિક ગર્ભ સંસ્કાર પર પ્રમાણભૂત અને વૈજ્ઞાનિક સંશોધન-આધારિત લેખોનો સંગ્રહ.'
            })}
          </p>

          {/* Featured Spotlight Article Banner (Visible when no search or category filter active) */}
          {featuredPost && selectedCategory === 'all' && !searchQuery && (
            <div className="mt-12 bg-white border-2 border-divineGold/40 rounded-divine-lg overflow-hidden shadow-xl shadow-sacredMaroon/5 hover:border-divineGold/70 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                
                {/* Image */}
                <div className="lg:col-span-6 h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-sacredMaroon/5">
                  <img
                    src={featuredPost.image}
                    alt={t(featuredPost.title)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-sacredMaroon border border-divineGold text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {t({ hi: 'नवीनतम विशेष लेख', en: 'Latest Featured Guide', gu: 'નવીનતમ ખાસ લેખ' })}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold mb-3">
                    <span className="bg-divineGold/20 text-sacredMaroon border border-divineGold/40 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      {t(featuredPost.category)}
                    </span>
                    <span className="flex items-center gap-1 text-templeBrown/70">
                      <Calendar className="w-3.5 h-3.5 text-sacredMaroon" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1 text-templeBrown/70">
                      <Clock className="w-3.5 h-3.5 text-sacredMaroon" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="font-serif text-2xl sm:text-3xl text-sacredMaroon font-bold leading-snug hover:text-vermillion transition-colors mb-3">
                      {t(featuredPost.title)}
                    </h2>
                  </Link>

                  <p className="font-sans text-sm sm:text-base text-templeBrown/80 leading-relaxed line-clamp-3 mb-6">
                    {t(featuredPost.description)}
                  </p>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sacredMaroon hover:text-vermillion uppercase tracking-wider transition-colors w-fit border-b-2 border-sacredMaroon hover:border-vermillion pb-0.5"
                  >
                    <span>{t({ hi: 'पूरा लेख पढ़ें', en: 'Read Full Guide', gu: 'સંપૂર્ણ લેખ વાંચો' })}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>
          )}

          {/* Clean Master Search & Filter Controls Center */}
          <div className="mt-12 bg-white border-2 border-divineGold/30 rounded-divine-md p-5 sm:p-7 shadow-sm">
            
            {/* Top Row: Search & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-templeBrown/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t({
                    hi: 'आहार, योग, संगीत, तिमाही आदि खोजें...',
                    en: 'Search diet, yoga, music, trimester...',
                    gu: 'આહાર, યોગ, સંગીત, ત્રિમાસિક વગેરે શોધો...'
                  })}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-softCream/30 border border-divineGold/30 rounded-full text-xs sm:text-sm text-templeBrown placeholder-templeBrown/50 focus:outline-none focus:border-sacredMaroon focus:bg-white transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-templeBrown/50 hover:text-sacredMaroon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <ArrowUpDown className="w-4 h-4 text-sacredMaroon shrink-0" />
                <span className="text-xs font-bold text-sacredMaroon uppercase tracking-wider whitespace-nowrap">
                  {t({ hi: 'क्रम:', en: 'Sort By:', gu: 'ક્રમ:' })}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort articles"
                  className="bg-softCream/40 border border-divineGold/35 text-templeBrown text-xs sm:text-sm font-semibold rounded-full px-4 py-2.5 focus:outline-none focus:border-sacredMaroon cursor-pointer hover:border-divineGold"
                >
                  <option value="recent">{t({ hi: 'नवीनतम पहले (Recent)', en: 'Most Recent First', gu: 'નવીનતમ પહેલા' })}</option>
                  <option value="oldest">{t({ hi: 'प्रारंभिक लेख (Oldest)', en: 'Oldest / Foundation', gu: 'પ્રારંભિક લેખો' })}</option>
                  <option value="readTime">{t({ hi: 'पठन समय (Shortest)', en: 'Shortest Read Time', gu: 'વાંચન સમય' })}</option>
                </select>
              </div>

            </div>

            {/* Bottom Row: 6 Clean Master Category Pills */}
            <div className="mt-5 pt-4 border-t border-divineGold/15 flex flex-wrap gap-2 items-center">
              {MASTER_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sacredMaroon text-white border border-sacredMaroon shadow-sm'
                        : 'bg-softCream/40 text-templeBrown/80 hover:bg-divineGold/20 hover:text-sacredMaroon border border-transparent'
                    }`}
                  >
                    <span>{t(cat.label)}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-divineGold/25 text-sacredMaroon'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Results Counter & Active Filter Badge */}
            <div className="mt-4 flex items-center justify-between text-xs text-templeBrown/70 pt-2 border-t border-dashed border-divineGold/20">
              <span>
                {t({
                  hi: `कुल २८ में से ${filteredAndSortedPosts.length} लेख प्रदर्शित`,
                  en: `Showing ${filteredAndSortedPosts.length} of ${blogPosts.length} articles`,
                  gu: `કુલ ૨૮ માંથી ${filteredAndSortedPosts.length} લેખો ઉપલબ્ધ`
                })}
              </span>

              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-vermillion font-bold hover:underline cursor-pointer flex items-center gap-1 text-[11px] uppercase tracking-wider"
                >
                  <X className="w-3 h-3" />
                  {t({ hi: 'फ़िल्टर हटाएं', en: 'Reset Filters', gu: 'ફિલ્ટર હટાવો' })}
                </button>
              )}
            </div>

          </div>

          {/* Blog Cards Grid */}
          {filteredAndSortedPosts.length === 0 ? (
            <div className="mt-16 text-center py-16 bg-white border-2 border-dashed border-divineGold/30 rounded-divine-md max-w-lg mx-auto p-8">
              <BookOpen className="w-10 h-10 text-sacredMaroon/50 mx-auto mb-3" />
              <p className="text-lg font-serif text-sacredMaroon font-bold mb-1">
                {t({
                  hi: 'कोई लेख नहीं मिला',
                  en: 'No matching articles found',
                  gu: 'કોઈ લેખ મળ્યો નથી'
                })}
              </p>
              <p className="text-xs text-templeBrown/70 mb-4">
                {t({
                  hi: 'कृपया अन्य कीवर्ड खोजें या फ़िल्टर साफ़ करें।',
                  en: 'Try searching for another term like diet, music, or yoga.',
                  gu: 'કૃપા કરીને અન્ય કીવર્ડ શોધો અથવા ફિલ્ટર સાફ કરો.'
                })}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-2.5 bg-sacredMaroon text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-templeBrown transition-colors"
              >
                {t({ hi: 'सभी लेख देखें', en: 'Show All Articles', gu: 'બધા લેખો જુઓ' })}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {filteredAndSortedPosts.map((post) => (
                <FloatingCard
                  key={post.id}
                  delay={0.05}
                  className="bg-white border border-divineGold/30 rounded-divine-md overflow-hidden flex flex-col justify-between hover:border-divineGold/80 hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="aspect-video w-full overflow-hidden border-b border-divineGold/15 relative bg-softCream/30">
                      <img
                        src={post.image}
                        alt={t(post.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-sacredMaroon text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs border border-divineGold/30">
                        {t(post.category)}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[11px] text-templeBrown/60 font-sans mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sacredMaroon" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-sacredMaroon" />
                          {post.readTime}
                        </span>
                      </div>

                      <Link to={`/blog/${post.slug}`} className="block">
                        <h3 className="font-serif font-bold text-base sm:text-lg text-sacredMaroon mb-3 leading-snug line-clamp-2 group-hover:text-vermillion transition-colors">
                          {t(post.title)}
                        </h3>
                      </Link>

                      <p className="font-sans text-xs sm:text-sm text-templeBrown/75 leading-relaxed line-clamp-3">
                        {t(post.description)}
                      </p>
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="px-6 pb-6 pt-3 border-t border-divineGold/10 flex items-center justify-between">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sacredMaroon group-hover:text-vermillion transition-colors uppercase tracking-wider"
                    >
                      <span>{t({ hi: 'पूरा लेख पढ़ें', en: 'Read Full Guide', gu: 'સંપૂર્ણ લેખ વાંચો' })}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </FloatingCard>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Blog;
