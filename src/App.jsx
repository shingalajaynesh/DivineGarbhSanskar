import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';
import CookieConsent from './components/ui/CookieConsent';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Card from './pages/Card';
import Simantonayan from './pages/Simantonayan';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Disclaimer from './pages/Disclaimer';
import EditorialPolicy from './pages/EditorialPolicy';
import Authors from './pages/Authors';

// Layout wrapper to conditionally hide header, footer and whatsapp float on the digital card page
const AppContent = () => {
  const location = useLocation();
  const isCardPage = location.pathname === '/card';

  return (
    <div className="flex flex-col min-h-screen bg-softCream">
      {!isCardPage && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/card" element={<Card />} />
          <Route path="/simantonayan" element={<Simantonayan />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isCardPage && <WhatsAppFloat />}
      {!isCardPage && <Footer />}
      <CookieConsent />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
