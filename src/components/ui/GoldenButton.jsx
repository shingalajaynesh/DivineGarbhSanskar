import React from 'react';

const GoldenButton = ({ children, onClick, className = "", type = "button", pulse = true }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-8 py-4 font-accent text-sacredMaroon font-bold text-base tracking-wider uppercase bg-gradient-to-r from-divineGold to-warmAmber border-2 border-divineGold/50 rounded-divine-md hover:from-warmAmber hover:to-divineGold hover:scale-[1.03] shadow-md transition-all duration-300 ${pulse ? 'animate-glow-pulse' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default GoldenButton;
