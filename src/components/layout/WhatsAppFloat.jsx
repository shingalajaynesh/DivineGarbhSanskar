import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

const WhatsAppFloat = () => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-30 select-none">
        {/* Phone Button */}
        <a
          href="tel:+919999999999"
          className="w-14 h-14 bg-sacredMaroon border-2 border-divineGold/50 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 hover:rotate-12"
          aria-label="Call Us"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919999999999?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20the%20Divine%20Garbh%20Sanskar%20program."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] border-2 border-white text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-scale"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
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
