import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { stats } from '../../data/stats';
import AnimatedCounter from '../ui/AnimatedCounter';

const StatsCounter = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-gradient-to-r from-divineGold to-warmAmber border-y-2 border-divineGold/35 overflow-hidden">
      
      {/* Background circles */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 rounded-full border-4 border-white/10 pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-white/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="glass-panel p-6 sm:p-8 rounded-divine-md flex flex-col items-center justify-center text-center shadow-lg transform hover:-translate-y-2 transition-transform duration-300 select-default border-2 border-white/40"
              style={{
                animation: `float 4s ease-in-out infinite`,
                animationDelay: `${index * 0.4}s`
              }}
            >
              {/* Stat number counter */}
              <div className="font-sans text-3xl sm:text-5xl font-black text-sacredMaroon mb-2.5 flex items-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div className="font-accent text-[11px] sm:text-xs font-bold text-sacredMaroon/85 tracking-widest uppercase">
                {t(stat.label)}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
