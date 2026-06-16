import React from 'react';
import Marquee from 'react-fast-marquee';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';

const ClassGallery = () => {
  const { t } = useLanguage();

  const galleryImages = [
    "/gallery/gallery1.jpg",
    "/gallery/gallery2.jpg",
    "/gallery/gallery3.jpg",
    "/gallery/gallery4.jpg",
    "/gallery/gallery5.jpg",
    "/gallery/gallery6.jpg",
    "/gallery/gallery7.jpg",
    "/gallery/gallery8.jpg",
    "/gallery/gallery9.jpg"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-softCream/10 to-white border-y border-divineGold/15 select-none relative overflow-hidden">
      {/* Decorative Subtle Glowing Background Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-divineGold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-warmAmber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center relative z-10">
        <SectionLabel
          label={t({ hi: "सजीव झलकियाँ", en: "Live Glimpses", gu: "સજીવ ઝાંખી" })}
          titleHi={t({ hi: "हमारी कक्षाओं और वैदिक अनुष्ठानों के चित्र", en: "Glimpses of Our Live Classes & Rituals", gu: "અમારા વર્ગો અને વૈદિક વિધિઓના ચિત્રો" })}
        />
      </div>

      <div className="relative w-full z-10 mt-8">
        <Marquee speed={30} gradient={true} gradientColor={[255, 254, 246]} pauseOnHover={true}>
          <div className="flex items-center gap-6 py-2">
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className="w-72 h-52 sm:w-80 sm:h-60 rounded-divine-md overflow-hidden border-2 border-divineGold/20 hover:border-divineGold/70 shadow-md hover:scale-[1.03] transition-all duration-300 mx-2 bg-sacredMaroon/5 relative group cursor-pointer"
              >
                {/* Visual Accent Corner Highlights */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-white/50 rounded-tl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-white/50 rounded-tr z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-white/50 rounded-bl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-white/50 rounded-br z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <img
                  src={src}
                  alt={`Divine Garbh Sanskar Session ${index + 1}`}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default ClassGallery;
