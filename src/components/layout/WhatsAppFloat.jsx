import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

const WhatsAppFloat = () => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const isBlogRoute = location.pathname.startsWith('/blog');

  useEffect(() => {
    // If on blog route, keep sticky bar hidden to avoid distracting readers and colliding with mobile bottom ads
    if (isBlogRoute) {
      setShowStickyBar(false);
      return;
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 100 && window.scrollY > totalHeight * 0.35) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBlogRoute]);

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-30 select-none">
        {/* Phone Button */}
        <a
          href="tel:+919638484545"
          className="w-14 h-14 bg-sacredMaroon border-2 border-divineGold/50 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 hover:rotate-12"
          aria-label="Call Us"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919638484545?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20the%20Divine%20Garbh%20Sanskar%20program."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] border-2 border-white text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-scale"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.531 1.77.818 2.796.818 3.18 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.715.068-2.072-.497-1.733-.722-2.827-2.483-2.913-2.598-.087-.116-.704-.937-.704-1.787 0-.85.448-1.267.607-1.44.159-.174.346-.217.462-.217.116 0 .231.002.332.007.107.006.25-.041.391.297.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.178.181-.077.355.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.174.087.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.232-.144.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.044.072.044.42-.1.825zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.178L2 22l4.981-1.306A9.948 9.948 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.614 0-3.12-.464-4.403-1.267l-.316-.197-2.964.778.791-2.888-.214-.341A8.115 8.115 0 013.846 12c0-4.496 3.658-8.154 8.154-8.154s8.154 3.658 8.154 8.154-3.658 8.154-8.154 8.154z"/>
          </svg>
        </a>
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-gradient-to-r from-divineGold to-warmAmber py-3 px-5 shadow-[0_-4px_20px_rgba(93,26,0,0.12)] flex items-center justify-between border-t border-white/20 md:hidden z-30 transition-all duration-500 transform ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="flex flex-col text-sacredMaroon">
          <span className="font-accent text-xs font-bold leading-none">DIVINE GARBH SANSKAR</span>
          <span className="font-devanagari text-[9px] font-bold opacity-80 mt-1">
            {t({ hi: "शिशु का दिव्य विकास", en: "Divine Fetal Growth", gu: "બાળકનો દિવ્ય વિકાસ" })}
          </span>
        </div>
        
        <Link
          to="/contact"
          className="px-4 py-2 font-sans font-bold text-xs uppercase bg-sacredMaroon text-white rounded-full hover:bg-templeBrown active:scale-95 transition-all shadow-md animate-glow-pulse"
        >
          {t({ hi: 'निःशुल्क परामर्श', en: 'Free Advice', gu: 'મફત પરામર્શ' })}
        </Link>
      </div>
    </>
  );
};

export default WhatsAppFloat;
