import React from 'react';

const SectionLabel = ({ label, titleHi, titleEn, center = true, isPageHeader = false }) => {
  const TitleTag = isPageHeader ? 'h1' : 'h2';

  return (
    <div className={`flex flex-col mb-12 ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      {label && (
        <span className="text-vermillion font-bold text-xs md:text-sm tracking-wider mb-3 uppercase bg-vermillion/5 px-3.5 py-1 rounded-full border border-vermillion/15 w-fit">
          {label}
        </span>
      )}
      <TitleTag className="font-serif text-3xl md:text-5xl text-sacredMaroon leading-tight font-medium mb-2">
        {titleHi}
      </TitleTag>
      {titleEn && (
        <p className="text-base md:text-xl text-templeBrown font-sans font-medium opacity-85 mt-1">
          {titleEn}
        </p>
      )}
      <div className={`w-24 h-1 bg-gradient-to-r from-transparent via-divineGold to-transparent mt-4 rounded-full ${center ? 'mx-auto' : ''}`} />
    </div>
  );
};


export default SectionLabel;
