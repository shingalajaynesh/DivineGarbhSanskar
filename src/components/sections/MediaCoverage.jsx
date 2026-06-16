import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';

const MediaCoverage = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const mediaImages = [
    {
      src: "/media/media1.jpg",
      caption: {
        hi: "दिव्य भास्कर समाचार पत्र कवरेज - गर्भ संस्कार का महत्व",
        en: "Divya Bhaskar Newspaper Coverage - Significance of Fetal Development",
        gu: "દિવ્ય ભાસ્કર ન્યૂઝ કવરેજ - ગર્ભ સંસ્કારનું મહત્વ"
      }
    },
    {
      src: "/media/media2.jpg",
      caption: {
        hi: "गुजरात समाचार लेख - १०,०००+ माताओं को मार्गदर्शन",
        en: "Gujarat Samachar Feature - 10,000+ Expectant Mothers Guided Successfully",
        gu: "ગુજરાત સમાચાર લેખ - ૧૦,૦૦૦+ માતાઓને સફળ માર્ગદર્શન"
      }
    },
    {
      src: "/media/media3.jpg",
      caption: {
        hi: "अहमदाबाद मिरर रिपोर्ट - वैदिक एवं वैज्ञानिक समन्वय",
        en: "Ahmedabad Mirror Report - Merging Vedic Rituals with Prenatal Biology",
        gu: "અમદાવાદ મિરર રિપોર્ટ - વૈદિક અને વૈજ્ઞાનિક સમન્વય"
      }
    },
    {
      src: "/media/media4.jpg",
      caption: {
        hi: "नवभारत टाइम्स विशेष - डॉ. तरुणा जियानी की कार्यशाला",
        en: "Navbharat Times Special - Vedic Seminar by Dr. Taruna Jiyani",
        gu: "નવભારત ટાઇમ્સ વિશેષ - ડો. તરુણા જીયાણીની કાર્યશાળા"
      }
    },
    {
      src: "/media/media5.jpg",
      caption: {
        hi: "संदेश दैनिक समाचार - स्वस्थ शिशु के लिए गर्भ संस्कार",
        en: "Sandesh Daily News - Vedic Pregnancy Rituals for Healthy Offspring",
        gu: "સંદેશ દૈનિક સમાચાર - સ્વસ્થ બાળક માટે ગર્ભ સંસ્કાર"
      }
    }
  ];

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, mediaImages.length]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaImages.length) % mediaImages.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaImages.length);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-softCream/20 to-white overflow-hidden border-b border-divineGold/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "प्रमाणित विश्वसनीयता", en: "Media Presence", gu: "મીડિયા પ્રમાણપત્ર" })}
          titleHi={t({ hi: "प्रमुख समाचार पत्रों और मीडिया चैनलों में हमारा उल्लेख", en: "Featured Across Prominent Media Channels", gu: "મુખ્ય સમાચાર પત્રો અને મીડિયા ચેનલોમાં અમારો ઉલ્લેખ" })}
        />

        {/* Premium Slider Container */}
        <div 
          className="relative max-w-4xl mx-auto mt-12 group"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Slide Frame */}
          <div className="bg-white border-2 border-divineGold/35 rounded-divine-lg p-3 sm:p-4 md:p-6 shadow-lg overflow-hidden relative transition-all duration-300 hover:border-divineGold/70">
            
            {/* Visual Frame wrapper to give Legibility and Fixed Aspect Ratio */}
            <div className="relative h-[300px] sm:h-[450px] md:h-[550px] w-full bg-[#3B0F00]/5 rounded-divine-md overflow-hidden flex items-center justify-center border border-divineGold/10">
              
              {/* Actual Image Slide */}
              <img
                src={mediaImages[currentIndex].src}
                alt={t(mediaImages[currentIndex].caption)}
                className="max-h-full max-w-full w-auto h-auto object-contain transition-all duration-700 transform scale-100 ease-in-out select-none"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />

              {/* High-Quality Placeholder if photo not replaced/found */}
              <div 
                className="hidden absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-softCream/80 to-divineGold/10 text-sacredMaroon gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-sacredMaroon/5 border border-divineGold/40 flex items-center justify-center animate-pulse">
                  <ImageIcon className="w-8 h-8 text-sacredMaroon" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-bold text-base md:text-lg">
                    {t({ hi: "मीडिया फ़ोटो स्थान धारक", en: "Media Photo Placeholder", gu: "મીડિયા ફોટો પ્લેસહોલ્ડર" })}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-templeBrown/70 max-w-md">
                    {t({
                      hi: `कृपया public/media/ 📂 फोल्डर में इस फाइल को बदलें: media${currentIndex + 1}.jpg`,
                      en: `Please replace the file: media${currentIndex + 1}.jpg inside public/media/ 📂 folder with your actual photo.`,
                      gu: `કૃપા કરીને public/media/ 📂 ફોલ્ડરમાં આ ફાઇલ બદલો: media${currentIndex + 1}.jpg`
                    })}
                  </p>
                </div>
              </div>

              {/* Watermark Logo Accent */}
              <div className="absolute top-4 right-4 pointer-events-none bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-divineGold/20 flex items-center gap-1.5 shadow-sm">
                <span className="text-[10px] font-accent font-black tracking-widest text-sacredMaroon">MEDIA</span>
                <span className="text-[10px] bg-vermillion text-white px-1.5 py-0.25 rounded font-bold uppercase scale-95">LIVE</span>
              </div>
            </div>

            {/* Slider Caption Banner */}
            <div className="mt-4 pt-3 border-t border-divineGold/15 text-center flex flex-col gap-1.5 px-4">
              <p className="font-sans font-bold text-sm sm:text-base md:text-lg text-sacredMaroon leading-snug">
                {t(mediaImages[currentIndex].caption)}
              </p>
              <p className="font-accent text-[9px] sm:text-[10px] text-templeBrown/50 tracking-wider uppercase font-semibold">
                {t({ hi: "स्लाइड", en: "SLIDE", gu: "સ્લાઇડ" })} {currentIndex + 1} / {mediaImages.length}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          {/* Left Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-divineGold/40 hover:border-divineGold text-sacredMaroon shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-divineGold/40 hover:border-divineGold text-sacredMaroon shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators Dots */}
          <div className="flex justify-center gap-2.5 mt-6">
            {mediaImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-8 bg-sacredMaroon border border-divineGold' 
                    : 'w-2.5 bg-divineGold/35 hover:bg-divineGold'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default MediaCoverage;
