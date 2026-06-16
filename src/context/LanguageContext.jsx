import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('hi'); // Default to Hindi

  const toggleLanguage = () => {
    setLanguage((prev) => {
      if (prev === 'hi') return 'gu';
      if (prev === 'gu') return 'en';
      return 'hi';
    });
  };

  const t = (translations) => {
    if (!translations) return '';
    return translations[language] || translations['hi'] || translations['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
