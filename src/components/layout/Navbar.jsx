import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ArrowRight, Heart, Sparkles, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import MandalaBg from '../ui/MandalaBg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: { hi: 'होम', en: 'Home', gu: 'હોમ' } },
    { 
      path: '/events', 
      label: { hi: 'इवेंट्स', en: 'Events', gu: 'ઇવેન્ટ્સ' }, 
      badge: { hi: '19 Dec', en: '19 Dec', gu: '19 Dec' },
      highlight: true 
    },
    { path: '/simantonayan', label: { hi: 'सीमंतोन्नयन', en: 'Simantonayan', gu: 'સીમંતોન્નયન' } },
    { path: '/about', label: { hi: 'के बारे में', en: 'About Us', gu: 'અમારા વિશે' } },
    { path: '/authors', label: { hi: 'डॉ. तरुणा जियाणी', en: 'Dr. Taruna Jiyani', gu: 'ડૉ. તરુણા જીયાણી' } },
    { path: '/blog', label: { hi: 'ब्लॉग', en: 'Blog', gu: 'બ્લોગ' } }
  ];

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-divineGold focus:text-sacredMaroon"
      >
        Skip to content
      </a>

      {/* Main Header Wrapper */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
        
        {/* ========================================================
            TOP PROMO / ANNOUNCEMENT BAR (Responsive & Stable)
        ======================================================== */}
        <div className="bg-gradient-to-r from-[#4A1200] via-vermillion to-[#4A1200] text-white border-b border-divineGold/30 relative z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-center text-center">
            <Link 
              to="/events/divy-garbhyatra" 
              className="group inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-sans font-medium text-amber-100 hover:text-white transition-colors"
            >
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 text-amber-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider border border-amber-300/30">
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                <span>{t({ hi: "लाइव सेमिनार", en: "Live Event", gu: "લાઈવ સેમિનાર" })}</span>
              </span>

              <span className="font-semibold text-white group-hover:underline underline-offset-2">
                {t({
                  hi: "'दिव्य गर्भयात्रा' कपल सेमिनार (19 Dec 2026, सूरत) - रजिस्ट्रेशन शुरू!",
                  en: "'Divya Garbh Yatra' Couple Seminar (19 Dec 2026, Surat) - Register Now!",
                  gu: "'દિવ્ય ગર્ભયાત્રા' કપલ સેમિનાર (19 Dec 2026, સુરત) - રજીસ્ટ્રેશન શરૂ!"
                })}
              </span>

              <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </div>

        {/* ========================================================
            MAIN NAVIGATION BAR
        ======================================================== */}
        <nav
          aria-label="Main Navigation"
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(93,26,0,0.08)] py-2 sm:py-2.5 border-b border-divineGold/25'
              : 'bg-softCream/95 backdrop-blur-sm py-2.5 sm:py-3.5 border-b border-divineGold/20'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">

              {/* 1. BRAND LOGO AREA */}
              <Link 
                to="/" 
                className="flex items-center gap-2.5 sm:gap-3 shrink-0 focus:outline-none group" 
                aria-label="Divine Garbh Sanskar Home"
              >
                <img
                  src="/logo.jpg"
                  alt={t({ hi: "दिव्य गर्भ संस्कार लोगो", en: "Divine Garbh Sanskar Logo", gu: "દિવ્ય ગર્ભ સંસ્કાર લોગો" })}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full p-0.5 bg-white object-contain group-hover:rotate-6 transition-transform duration-300 shadow-md border border-divineGold/40 shrink-0"
                />

                <div className="flex flex-col">
                  <span className="font-accent text-sm sm:text-base md:text-lg font-bold tracking-wider text-sacredMaroon leading-none">
                    DIVINE <span className="text-warmAmber font-extrabold">GARBH</span>
                  </span>
                  <span className="font-devanagari text-[8px] sm:text-[9px] md:text-[10px] text-sacredMaroon/70 tracking-[0.2em] font-semibold leading-none mt-1 uppercase flex items-center gap-1">
                    <span className="h-[1px] w-1.5 sm:w-2 bg-divineGold/60"></span>
                    गर्भ संस्कार
                    <span className="h-[1px] w-1.5 sm:w-2 bg-divineGold/60"></span>
                  </span>
                </div>
              </Link>

              {/* 2. DESKTOP NAVIGATION LINKS (Hidden on small, visible on lg+) */}
              <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-wrap justify-center">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`font-sans font-semibold text-xs xl:text-sm relative py-1 px-1 transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? 'text-vermillion font-bold'
                          : link.highlight
                          ? 'text-warmAmber hover:text-vermillion font-bold'
                          : 'text-sacredMaroon hover:text-vermillion'
                      }`}
                    >
                      <span>{t(link.label)}</span>

                      {/* Small badge if any (e.g. 19 Dec) */}
                      {link.badge && (
                        <span className="ml-1.5 px-1.5 py-0.2 text-[9px] bg-rose-600 text-white rounded-full font-bold uppercase shadow-sm">
                          {t(link.badge)}
                        </span>
                      )}

                      {/* Active indicator underline */}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-vermillion rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* 3. DESKTOP RIGHT ACTIONS (Language + Free Counselling Button) */}
              <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 shrink-0">
                {/* Language Selector Dropdown */}
                <div className="relative flex items-center shrink-0">
                  <Globe className="absolute left-2.5 w-3.5 h-3.5 text-vermillion pointer-events-none" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="pl-7 pr-6 py-1.5 rounded-full border border-sacredMaroon/20 hover:border-sacredMaroon text-sacredMaroon font-sans text-xs font-bold bg-white/90 cursor-pointer focus:outline-none appearance-none shadow-sm hover:shadow transition-all"
                    aria-label="Select Language"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="gu">ગુજરાતી</option>
                  </select>
                  <div className="absolute right-2 pointer-events-none flex items-center text-sacredMaroon/70">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Free Counselling Golden CTA Button (Guaranteed Visible & Sized) */}
                <Link to="/contact" className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-full font-bold text-xs xl:text-sm bg-gradient-to-r from-divineGold via-warmAmber to-divineGold hover:from-warmAmber hover:to-divineGold text-sacredMaroon shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all whitespace-nowrap border border-amber-400/50">
                    <Heart className="w-3.5 h-3.5 fill-sacredMaroon/20 text-sacredMaroon" />
                    <span>{t({ hi: 'निःशुल्क परामर्श', en: 'Free Counselling', gu: 'મફત પરામર્શ' })}</span>
                  </span>
                </Link>
              </div>

              {/* 4. MOBILE RIGHT CONTROLS (Lang + Hamburger) */}
              <div className="lg:hidden flex items-center gap-2 shrink-0">
                {/* Compact Mobile Language Selector */}
                <div className="relative flex items-center">
                  <Globe className="absolute left-2 w-3 h-3 text-vermillion pointer-events-none" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="pl-6 pr-5 py-1 rounded-full border border-sacredMaroon/25 text-sacredMaroon font-sans text-[11px] font-bold bg-white cursor-pointer focus:outline-none appearance-none shadow-sm"
                    aria-label="Select Language"
                  >
                    <option value="en">EN</option>
                    <option value="hi">HI</option>
                    <option value="gu">GU</option>
                  </select>
                  <div className="absolute right-1.5 pointer-events-none flex items-center text-sacredMaroon/70">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Hamburger Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1.5 sm:p-2 rounded-xl text-sacredMaroon hover:text-vermillion bg-white/70 border border-divineGold/30 focus:outline-none transition-colors"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>
        </nav>

        {/* ========================================================
            MOBILE NAVIGATION SLIDE-DOWN DRAWER (With Scroll & Sticky CTA)
        ======================================================== */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 bottom-0 top-[100px] z-30 bg-softCream/98 backdrop-blur-xl border-t border-divineGold/30 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.05] text-divineGold pointer-events-none" />

            <div className="p-6 space-y-6 relative z-10">

              {/* Mobile Quick Free Counselling Highlight Banner */}
              <div className="bg-white border-2 border-divineGold/40 rounded-2xl p-4 shadow-md text-center space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-vermillion bg-vermillion/10 px-3 py-0.5 rounded-full inline-block">
                  {t({ hi: "विशेषज्ञ मार्गदर्शन", en: "Expert Guidance", gu: "નિષ્ણાત માર્ગદર્શન" })}
                </span>
                <h4 className="font-serif text-base font-bold text-sacredMaroon">
                  {t({
                    hi: "डॉ. तरुणा जियाणी के साथ निःशुल्क परामर्श",
                    en: "Free Consultation with Dr. Taruna Jiyani",
                    gu: "ડૉ. તરુણા જીયાણી સાથે મફત પરામર્શ"
                  })}
                </h4>
                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    to="/contact"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-divineGold to-warmAmber text-sacredMaroon font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-sacredMaroon/20 text-sacredMaroon" />
                    <span>{t({ hi: 'निःशुल्क परामर्श फॉर्म भरें', en: 'Book Free Counselling', gu: 'મફત પરામર્શ બુક કરો' })}</span>
                  </Link>

                  <a
                    href="https://wa.me/919586979897?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%2C%20%E0%AA%AE%E0%AA%BE%E0%AA%B0%E0%AB%87%20%E0%AA%97%E0%AA%B0%E0%AB%8D%E0%AA%AD%20%E0%AA%B8%E0%AA%82%E0%AA%B8%E0%AB%8D%E0%AA%95%E0%AA%BE%E0%AA%B0%20%E0%AA%AE%E0%AA%BE%E0%AA%B0%E0%AB%8D%E0%AA%97%E0%AA%A6%E0%AA%B0%E0%AB%8D%E0%AA%B6%E0%AA%A8%20%E0%AA%AE%E0%AA%BE%E0%AA%9F%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%97%E0%AA%A4%20%E0%AA%9C%E0%AB%8B%E0%AA%88%E0%AA%8F%20%E0%AA%9B%E0%AB%87."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp હેલ્પલાઇન (+91 95869 79897)</span>
                  </a>
                </div>
              </div>

              {/* Mobile Links List */}
              <div className="flex flex-col gap-1 divide-y divide-divineGold/15">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`py-3 px-2 font-sans text-base font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? 'text-vermillion font-bold'
                          : 'text-sacredMaroon hover:text-vermillion'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.highlight && <Sparkles className="w-4 h-4 text-warmAmber" />}
                        <span>{t(link.label)}</span>
                      </span>

                      {link.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                          {t(link.badge)}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 bg-white/70 border-t border-divineGold/20 text-center text-xs text-templeBrown/70 space-y-1">
              <p>The Divine Garbh Sanskar • સુરત, ગુજરાત</p>
              <p className="font-semibold text-sacredMaroon">સંપર્ક: +91 95869 79897</p>
            </div>
          </div>
        )}

      </header>
    </>
  );
};

export default Navbar;
