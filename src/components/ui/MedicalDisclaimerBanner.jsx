import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Stethoscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const MedicalDisclaimerBanner = ({ fullPage = false }) => {
  const { t } = useLanguage();

  return (
    <div
      className={`bg-amber-50/90 border border-amber-300/80 rounded-divine-sm p-4 md:p-5 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-sm ${
        fullPage ? 'my-4' : 'mt-6 mb-8'
      }`}
    >
      <Stethoscope className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <span className="font-bold text-amber-950 block mb-1">
          {t({
            hi: "चिकित्सा परामर्श अस्वीकरण (Medical Disclaimer)",
            en: "Important Medical Disclaimer",
            gu: "તબીબી અસ્વીકરણ (Medical Disclaimer)"
          })}
        </span>
        <p>
          {t({
            hi: "यह सामग्री केवल सामान्य वैदिकी एवं शैक्षणिक कल्याण मार्गदर्शन के लिए है, किसी भी चिकित्सा सलाह, निदान या इलाज का विकल्प नहीं है। अपनी गर्भावस्था के दौरान डॉक्टर की सलाह और नियमित जांच हमेशा जारी रखें।",
            en: "This content is provided for general educational and traditional wellness purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult your obstetrician or qualified doctor before following diet, yoga, or wellness routines.",
            gu: "આ માહિતી માત્ર શૈક્ષણિક અને કલ્યાણકારી માર્ગદર્શન માટે છે, તબીબી સલાહનો વિકલ્પ નથી. હંમેશા તમારા ડૉક્ટરની સલાહ લો."
          })}{' '}
          <Link to="/disclaimer" className="underline font-bold text-amber-950 hover:text-vermillion">
            {t({ hi: "पूर्ण अस्वीकरण पढ़ें ➜", en: "Read full disclaimer ➜", gu: "સંપૂર્ણ અસ્વીકરણ વાંચો ➜" })}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MedicalDisclaimerBanner;
