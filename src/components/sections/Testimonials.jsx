import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonials } from '../../data/testimonials';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const Testimonials = () => {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-20 bg-softCream/45 overflow-hidden border-b border-divineGold/10">
      <MandalaBg className="top-10 left-10 w-80 h-80 opacity-[0.03] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "माताओं की कहानियाँ", en: "Success Stories", gu: "માતાઓનો અનુભવ" })}
          titleHi={t({ hi: "संतुष्ट माताओं के दिव्य अनुभव", en: "Divine Experiences of Happy Mothers", gu: "સંતુષ્ટ માતાઓના દિવ્ય અનુભવ" })}
        />

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto mt-12 bg-white border-2 border-divineGold/30 rounded-divine-md p-8 md:p-12 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 text-[#FFD600] mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>

          {/* Testimonial Active Slide */}
          <div className="min-h-[220px] flex flex-col justify-between text-center">
            
            {/* Quote Block */}
            <div className="flex flex-col gap-4">
              <p className="font-sans text-lg md:text-xl font-bold text-sacredMaroon leading-relaxed">
                {t(testimonials[activeIndex].quote)}
              </p>
              {language !== 'en' && (
                <p className="font-sans text-sm md:text-base text-templeBrown/75 italic leading-relaxed">
                  {testimonials[activeIndex].quote.en}
                </p>
              )}
            </div>

            {/* Author Meta */}
            <div className="flex flex-col items-center mt-8 gap-3">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-16 h-16 rounded-full border-2 border-divineGold object-cover shadow-sm"
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-base text-sacredMaroon">
                  {testimonials[activeIndex].name}
                </span>
                <span className="text-xs text-templeBrown/70 font-sans font-semibold">
                  {t(testimonials[activeIndex].city)} ({t({ hi: "शिशु जन्म:", en: "Baby Born:", gu: "શિશુ જન્મ:" })} {t(testimonials[activeIndex].babyBorn)})
                </span>
              </div>
            </div>

          </div>

          {/* Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-softCream text-sacredMaroon border border-divineGold/30 hover:bg-divineGold hover:text-white transition-all shadow-sm z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-softCream text-sacredMaroon border border-divineGold/30 hover:bg-divineGold hover:text-white transition-all shadow-sm z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'bg-vermillion w-6' : 'bg-divineGold/40'
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

export default Testimonials;
