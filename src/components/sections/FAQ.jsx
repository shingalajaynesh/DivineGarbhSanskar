import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { faqs } from '../../data/faq';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';
import { getFAQSchema } from '../../seo/structuredData';

const FAQ = () => {
  const { t } = useLanguage();

  // Split FAQs for 2-column layout on desktop
  const leftColFaqs = faqs.slice(0, 5);
  const rightColFaqs = faqs.slice(5, 10);

  // Generate structured data schema
  const faqSchema = getFAQSchema(faqs);

  const renderFaqAccordion = (list) => {
    return list.map((item, idx) => (
      <details
        key={idx}
        className="group bg-white border border-divineGold/35 rounded-divine-sm p-4 md:p-6 transition-all duration-300 select-default shadow-sm open:shadow-md hover:border-divineGold mb-4 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex items-center justify-between cursor-pointer focus:outline-none list-none">
          <h3 className="font-sans font-bold text-base md:text-lg text-sacredMaroon pr-4 leading-snug group-hover:text-vermillion transition-colors">
            {t(item.question)}
          </h3>
          <span className="shrink-0 transition-transform duration-300 group-open:rotate-180 text-vermillion text-lg">
            ▼
          </span>
        </summary>
        <div className="mt-4 border-t border-divineGold/10 pt-4 font-sans text-sm md:text-base text-templeBrown/80 leading-relaxed">
          <p>{t(item.answer)}</p>
        </div>
      </details>
    ));
  };

  return (
    <section className="relative py-20 bg-softCream/30 overflow-hidden border-b border-divineGold/10" id="faq-section">
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.03] text-divineGold" />
      
      {/* Inject JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "जिज्ञासा समाधान", en: "Frequently Asked Questions", gu: "જિજ્ઞાસા સમાધાન" })}
          titleHi={t({ hi: "अक्सर पूछे जाने वाले प्रश्न", en: "Got Questions? We Have Scientific Answers", gu: "વારંવાર પૂછાતા પ્રશ્નો" })}
        />

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 mt-12">
          
          {/* Left Column FAQs */}
          <div>
            {renderFaqAccordion(leftColFaqs)}
          </div>

          {/* Right Column FAQs */}
          <div>
            {renderFaqAccordion(rightColFaqs)}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQ;
