import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import GoldenButton from '../ui/GoldenButton';
import MandalaBg from '../ui/MandalaBg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
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
    { path: '/blog', label: { hi: 'ब्लॉग', en: 'Blog', gu: 'બ્લોગ' } },
    { path: '/contact', label: { hi: 'संपर्क', en: 'Contact', gu: 'સંપર્ક' } }
  ];

  const getLanguageLabel = () => {
    if (language === 'hi') return 'ગુજરાતી';
    if (language === 'gu') return 'English';
    return 'हिंदी';
  };

  return (
    <>
      {/* Skip to Content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-divineGold focus:text-sacredMaroon">
        Skip to content
      </a>

      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(93,26,0,0.08)] py-3 border-b border-divineGold/20'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo area */}
            <Link to="/" className="flex items-center gap-3 focus:outline-none" aria-label="Divine Garbh Sanskar Home">
              <img
                src="/logo.jpg"
                alt="Divine Garbh Sanskar Logo"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full p-0.5 bg-white object-contain hover:rotate-6 transition-transform duration-300 shadow-md border border-divineGold/30"
              />

              <div className="flex flex-col">
                <span className="font-accent text-lg md:text-xl font-bold tracking-tight text-sacredMaroon leading-none">
                  <span className="text-vermillion">DIVINE</span> GARBH
                </span>
                <span className="font-devanagari text-[10px] md:text-xs text-templeBrown tracking-widest font-bold leading-none mt-1">
                  गर्भ संस्कार
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
                      className={`font-sans font-medium text-base relative py-2 transition-all duration-300 ${isActive ? 'text-vermillion font-semibold' : 'text-sacredMaroon hover:text-vermillion'
                        }`}
                    >
                      {t(link.label)}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-vermillion rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Language + CTA */}
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sacredMaroon/20 hover:border-sacredMaroon text-sacredMaroon transition-all font-sans text-sm font-semibold"
                  aria-label="Switch Language"
                >
                  <Globe className="w-4 h-4 text-vermillion" />
                  <span>{getLanguageLabel()}</span>
                </button>

                <Link to="/contact">
                  <GoldenButton pulse={false} className="py-2.5 px-5 text-sm">
                    {t({ hi: 'निःशुल्क परामर्श लें', en: 'Free Counselling', gu: 'મફત પરામર્શ લો' })}
                  </GoldenButton>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-sacredMaroon/20 text-sacredMaroon font-sans text-xs font-semibold"
                aria-label="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-vermillion" />
                <span>{getLanguageLabel()}</span>
              </button>

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
          className={`lg:hidden fixed inset-0 top-[73px] bg-softCream z-30 transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
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
                  className={`font-sans text-2xl font-semibold transition-all duration-300 ${isActive ? 'text-vermillion' : 'text-sacredMaroon hover:text-vermillion'
                    }`}
                >
                  {t(link.label)}
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
