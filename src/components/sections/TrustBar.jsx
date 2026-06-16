import React from 'react';
import Marquee from 'react-fast-marquee';
import { useLanguage } from '../../context/LanguageContext';

const TrustBar = () => {
  const { t } = useLanguage();

  const mediaList = [
    "Divya Bhaskar",
    "Gujarat Samachar",
    "Times of India",
    "Dainik Bhaskar",
    "VTV News",
    "TV9 Gujarati",
    "Sandesh News",
    "Chitralekha"
  ];

  return (
    <section className="py-8 bg-white border-y-2 border-divineGold/20 select-none">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <h4 className="font-accent text-[11px] md:text-xs text-sacredMaroon font-bold tracking-widest uppercase opacity-80">
          ✦ {t({ hi: "जैसा कि यहाँ देखा गया", en: "As Featured In", gu: "પ્રસાર માધ્યમોમાં" })} ✦
        </h4>
      </div>
      
      <Marquee speed={40} gradient={true} gradientColor={[255, 255, 255]} pauseOnHover={true}>
        <div className="flex items-center gap-16 md:gap-24 px-12">
          {mediaList.map((media, index) => (
            <span
              key={index}
              className="font-latinDisplay text-lg md:text-2xl font-black tracking-wide text-templeBrown/40 hover:text-sacredMaroon hover:scale-105 transition-all duration-300 cursor-default"
            >
              {media}
            </span>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default TrustBar;
