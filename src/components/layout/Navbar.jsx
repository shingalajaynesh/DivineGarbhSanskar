import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import GoldenButton from '../ui/GoldenButton';
import MandalaBg from '../ui/MandalaBg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: { hi: 'होम', en: 'Home', gu: 'હોમ' } },
    { path: '/about', label: { hi: 'के बारे में', en: 'About', gu: 'વિશે' } },
    { path: '/courses', label: { hi: 'कोर्स', en: 'Courses', gu: 'કોર્સ' } },
    { path: '/simantonayan', label: { hi: 'सीमंतोन्नयन', en: 'Simantonayan', gu: 'સીમંતોન્નયન' }, highlight: true },
    { path: '/blog', label: { hi: 'ब्लॉग', en: 'Blog', gu: 'બ્લોગ' } },
    { path: '/contact', label: { hi: 'संपर्क', en: 'Contact', gu: 'સંપર્ક' } }
  ];



  return (
    <>
      {/* Skip to Content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-divineGold focus:text-sacredMaroon">
        Skip to content
      </a>

      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled
            ? 'bg-white shadow-[0_4px_30px_rgba(93,26,0,0.08)] py-3 border-b border-divineGold/20'
            : 'bg-softCream border-b border-divineGold/20 py-3 lg:bg-transparent lg:border-none lg:py-5'
          }`}
      >
        {/* Top Announcement Bar */}
        <div 
          className={`bg-gradient-to-r from-sacredMaroon via-vermillion to-sacredMaroon text-white text-center text-[10px] sm:text-xs md:text-sm font-sans font-medium border-b border-divineGold/20 relative z-50 transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-1.5 opacity-100'
          }`}
        >
          <Link to="/simantonayan" className="hover:underline flex items-center justify-center gap-1.5">
            <span className="animate-pulse">✨</span>
            <span>
              {t({
                hi: "नया: सीमंतोन्नयन (गोद भराई) संस्कार मार्गदर्शन कार्यक्रम ➜",
                en: "New: Sacred Simantonayan Prenatal Guidance Program ➜",
                gu: "નવું: સીમંતોન્નયન સંસ્કાર માર્ગદર્શન કાર્યક્રમ ➜"
              })}
            </span>
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo area */}
            <Link to="/" className="flex items-center gap-3 focus:outline-none" aria-label="Divine Garbh Sanskar Home">
              <img
                src="/logo.jpg"
                alt={t({ hi: "दिव्य गर्भ संस्कार लोगो", en: "Divine Garbh Sanskar Logo", gu: "દિવ્ય ગર્ભ સંસ્કાર લોગો" })}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 bg-white object-contain hover:rotate-6 transition-transform duration-300 shadow-md border border-divineGold/30"
              />


              <div className="flex flex-col">
                <span className="font-accent text-base md:text-lg font-bold tracking-widest text-sacredMaroon leading-none">
                  DIVINE <span className="text-warmAmber font-extrabold">GARBH</span>
                </span>
                <span className="font-devanagari text-[9px] md:text-[10px] text-sacredMaroon/70 tracking-[0.22em] font-semibold leading-none mt-1.5 uppercase flex items-center gap-1">
                  <span className="h-[1px] w-2 bg-divineGold/60"></span>
                  गर्भ संस्कार
                  <span className="h-[1px] w-2 bg-divineGold/60"></span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`font-sans font-medium text-base relative py-2 transition-all duration-300 ${
                        isActive
                          ? 'text-vermillion font-semibold'
                          : link.highlight
                            ? 'text-warmAmber font-semibold hover:text-vermillion animate-pulse'
                            : 'text-sacredMaroon hover:text-vermillion'
                      }`}
                    >
                      {t(link.label)}
                      {link.highlight && (
                        <span className="absolute -top-1.5 -right-3 px-1 py-0.25 bg-vermillion text-white text-[8px] font-bold rounded-full uppercase scale-90 tracking-wide">
                          {t({ hi: "नया", en: "New", gu: "નવું" })}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-vermillion rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Language Selector Dropdown + CTA */}
              <div className="flex items-center gap-4">
                <div className="relative flex items-center">
                  <Globe className="absolute left-3 w-4 h-4 text-vermillion pointer-events-none" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="pl-9 pr-8 py-1.5 rounded-full border border-sacredMaroon/20 hover:border-sacredMaroon text-sacredMaroon transition-all font-sans text-sm font-semibold bg-white cursor-pointer focus:outline-none appearance-none shadow-sm hover:shadow"
                    aria-label="Select Language"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="gu">ગુજરાતી</option>
                  </select>
                  <div className="absolute right-3 pointer-events-none flex items-center text-sacredMaroon/70">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <Link to="/contact">
                  <GoldenButton pulse={false} className="py-2.5 px-5 text-sm">
                    {t({ hi: 'निःशुल्क परामर्श लें', en: 'Free Counselling', gu: 'મફત પરામર્શ લો' })}
                  </GoldenButton>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="relative flex items-center">
                <Globe className="absolute left-2.5 w-3.5 h-3.5 text-vermillion pointer-events-none" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="pl-7 pr-6 py-1 rounded-full border border-sacredMaroon/20 text-sacredMaroon font-sans text-xs font-semibold bg-white cursor-pointer focus:outline-none appearance-none shadow-sm"
                  aria-label="Select Language"
                >
                  <option value="en">EN</option>
                  <option value="hi">हिन्दी</option>
                  <option value="gu">ગુજ</option>
                </select>
                <div className="absolute right-2 pointer-events-none flex items-center text-sacredMaroon/70">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-sacredMaroon hover:text-vermillion focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          className={`lg:hidden fixed inset-0 z-30 transition-all duration-500 transform ${
            isScrolled ? 'top-[73px]' : 'top-[101px]'
          } bg-softCream ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          {/* Watermark Mandala background */}
          <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.06] text-divineGold" />

          <div className="flex flex-col items-center justify-start h-full pt-12 gap-8 px-6 relative z-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans text-2xl font-semibold transition-all duration-300 relative ${
                    isActive
                      ? 'text-vermillion'
                      : link.highlight
                        ? 'text-warmAmber hover:text-vermillion flex items-center gap-1.5'
                        : 'text-sacredMaroon hover:text-vermillion'
                  }`}
                >
                  {t(link.label)}
                  {link.highlight && (
                    <span className="px-1.5 py-0.5 bg-vermillion text-white text-[9px] font-bold rounded-full uppercase tracking-wide">
                      {t({ hi: "नया", en: "New", gu: "નવું" })}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link to="/contact" className="w-full max-w-xs mt-6">
              <GoldenButton className="w-full text-center">
                {t({ hi: 'निःशुल्क परामर्श', en: 'Free Counselling', gu: 'મફત પરામર્શ' })}
              </GoldenButton>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
