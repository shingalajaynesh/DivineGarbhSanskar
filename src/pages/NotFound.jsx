import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../seo/seoConfig';
import GoldenButton from '../components/ui/GoldenButton';
import MandalaBg from '../components/ui/MandalaBg';

const NotFound = () => {
  const { t, language } = useLanguage();
  const meta = seoConfig.notfound;

  return (
    <>
      <Helmet>
        <title>{t(meta.title)}</title>
        <meta name="description" content={t(meta.description)} />
        <link rel="canonical" href="https://www.thedivinegarbhsanskar.com/404" />
        <html lang={language} />
      </Helmet>

      <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-softCream overflow-hidden">
        
        {/* Soft watermark mandala */}
        <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.06]" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-md select-default">
          {/* Large stylized 404 */}
          <div className="font-accent text-8xl md:text-[120px] font-black text-vermillion leading-none animate-bounce">
            404
          </div>
          
          <h1 className="font-devanagari text-2xl md:text-3xl font-bold text-sacredMaroon">
            {t({ hi: "त्रुटि: पृष्ठ प्राप्त नहीं हुआ", en: "Oops! Page Not Found", gu: "ભૂલ: પેજ મળ્યું નથી" })}
          </h1>
          
          <p className="font-sans text-sm md:text-base text-templeBrown/80 leading-relaxed">
            {t({
              hi: "क्षमा करें, आप जिस पृष्ठ की खोज कर रहे हैं वह उपलब्ध नहीं है या स्थानांतरित कर दिया गया है।",
              en: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
              gu: "માફ કરશો, તમે જે પેજ શોધી રહ્યા છો તે ઉપલબ્ધ નથી અથવા ખસેડવામાં આવ્યું છે."
            })}
          </p>

          <Link to="/" className="mt-4">
            <GoldenButton className="flex items-center gap-2">
              <Home className="w-4.5 h-4.5" />
              <span>{t({ hi: "मुख्य पृष्ठ पर वापस जाएं", en: "Return to Homepage", gu: "મુખ્ય પેજ પર પાછા જાઓ" })}</span>
            </GoldenButton>
          </Link>
        </div>

      </div>
    </>
  );
};

export default NotFound;
