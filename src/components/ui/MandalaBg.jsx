import React from 'react';

const MandalaBg = ({ className = "" }) => {
  return (
    <div className={`absolute pointer-events-none select-none opacity-[0.08] md:opacity-[0.12] ${className}`}>
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-divineGold w-full h-full"
      >
        {/* Sun center */}
        <circle cx="300" cy="300" r="40" />
        <circle cx="300" cy="300" r="60" strokeDasharray="5 5" />
        
        {/* Outer concentric rings */}
        <circle cx="300" cy="300" r="120" />
        <circle cx="300" cy="300" r="180" strokeDasharray="10 5" />
        <circle cx="300" cy="300" r="240" />
        
        {/* Rays (8-fold symmetry) */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 300 + 60 * Math.cos(angle);
          const y1 = 300 + 60 * Math.sin(angle);
          const x2 = 300 + 280 * Math.cos(angle);
          const y2 = 300 + 280 * Math.sin(angle);
          return <line key={`ray-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" />;
        })}

        {/* Outer petals (16-fold symmetry) */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x = 300 + 240 * Math.cos(angle);
          const y = 300 + 240 * Math.sin(angle);
          return (
            <circle
              key={`petal-${i}`}
              cx={x}
              cy={y}
              r="15"
              stroke="currentColor"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default MandalaBg;
