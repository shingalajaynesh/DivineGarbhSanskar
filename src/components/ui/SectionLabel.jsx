import React from 'react';

const SectionLabel = ({ label, titleHi, titleEn, center = true }) => {
  return (
    <div className={`flex flex-col mb-12 ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      {label && (
        <span className="font-accent text-vermillion font-bold text-sm tracking-widest mb-3 uppercase">
          ✦ {label} ✦
        </span>
      )}
      <h2 className="font-devanagari text-3xl md:text-5xl text-sacredMaroon leading-tight font-normal mb-2">
        {titleHi}
      </h2>
      {titleEn && (
        <p className="font-latinDisplay text-lg md:text-xl text-templeBrown italic font-medium opacity-85">
          {titleEn}
        </p>
      )}
      <div className={`w-24 h-1 bg-gradient-to-r from-transparent via-divineGold to-transparent mt-4 rounded-full ${center ? 'mx-auto' : ''}`} />
    </div>
  );
};

export default SectionLabel;
