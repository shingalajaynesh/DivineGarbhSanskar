export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Divine Garbh Sanskar",
  "url": "https://www.divinegarbhsanskar.com",
  "logo": "https://www.divinegarbhsanskar.com/logo.jpg",
  "tagline": "Weaving Cultural Roots into Motherhood",
  "sameAs": [
    "https://www.instagram.com/divinegarbhsanskar/",
    "https://www.facebook.com/people/Divine-Garbhsanskar/100063998265079/",
    "https://www.youtube.com/@DivineGarbhsanskar0312"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-96384-84545",
    "contactType": "customer service",
    "availableLanguage": ["Hindi", "Gujarati", "English"]
  }
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Divine Garbh Sanskar",
  "image": "https://www.divinegarbhsanskar.com/logo.jpg",
  "@id": "https://www.divinegarbhsanskar.com/#localbusiness",
  "url": "https://www.divinegarbhsanskar.com",
  "telephone": "+919638484545",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Mani Nagar Society, Nana Varachha",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "postalCode": "395013",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.1702,
    "longitude": 72.8311
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
});

export const getCoursesSchema = (coursesList) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": coursesList.map((course, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Course",
      "name": course.title.en,
      "description": course.features.en.join(", "),
      "provider": {
        "@type": "Organization",
        "name": "Divine Garbh Sanskar",
        "sameAs": "https://www.divinegarbhsanskar.com"
      }
    }
  }))
});

export const getFAQSchema = (faqsList) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqsList.map((faq) => ({
    "@type": "Question",
    "name": faq.question.en,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer.en
    }
  }))
});

export const getBreadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});
