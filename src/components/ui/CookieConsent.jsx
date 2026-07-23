import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('dgs_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth page load
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('dgs_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleRejectOptional = () => {
    localStorage.setItem('dgs_cookie_consent', 'essential_only');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-sacredMaroon/95 backdrop-blur-md text-white border-t-2 border-divineGold/60 shadow-2xl transition-all duration-500 animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-start gap-3 text-left">
          <Cookie className="w-7 h-7 text-divineGold shrink-0 mt-1" />
          <div className="text-xs sm:text-sm text-softCream/90 leading-relaxed max-w-3xl">
            <span className="font-bold text-white block text-sm mb-0.5">
              {t({ hi: "कुकीज़ एवं आपकी गोपनीयता", en: "Cookie Preferences & Privacy", gu: "કૂકીઝ અને તમારી ગોપનીયતા" })}
            </span>
            {t({
              hi: "हम आपकी पसंदीदा भाषा को याद रखने, साइट विश्लेषण और Google AdSense विज्ञापनों के लिए कुकीज़ का उपयोग करते हैं। 'स्वीकार करें' चुनकर आप सभी कुकीज़ के उपयोग की अनुमति देते हैं।",
              en: "We use cookies to retain your language preferences, analyze traffic, and display relevant Google AdSense ads. By clicking 'Accept All', you consent to our use of cookies.",
              gu: "અમે તમારી પસંદગીની ભાષા યાદ રાખવા, પૃથ્થકરણ અને Google AdSense માટે કૂકીઝનો ઉપયોગ કરીએ છીએ."
            })}{' '}
            <Link to="/cookie-policy" className="text-divineGold font-semibold hover:underline">
              {t({ hi: "कुकी नीति पढ़ें", en: "Read Cookie Policy", gu: "કૂકી નીતિ વાંચો" })}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleRejectOptional}
            className="px-4 py-2 text-xs font-semibold rounded-full border border-divineGold/40 text-softCream hover:bg-white/10 transition-colors"
          >
            {t({ hi: "केवल आवश्यक", en: "Essential Only", gu: "માત્ર જરૂરી" })}
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-divineGold to-warmAmber text-sacredMaroon shadow-md hover:brightness-105 transition-all"
          >
            {t({ hi: "सभी स्वीकार करें", en: "Accept All", gu: "બધા સ્વીકારો" })}
          </button>
          <button
            onClick={handleRejectOptional}
            className="p-1.5 text-softCream/60 hover:text-white transition-colors md:hidden"
            aria-label="Close Cookie Banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CookieConsent;
