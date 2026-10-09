import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';
import CookieConsent from './components/ui/CookieConsent';
import ScrollToTop from './components/layout/ScrollToTop';

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

// Event Pages (Divya Garbh Yatra & Events Hub)
import EventsHub from './pages/EventsHub';
import DivyaGarbhYatra from './pages/events/DivyaGarbhYatra';
import EventRegisterPage from './pages/events/EventRegisterPage';
import DigitalPassPage from './pages/events/DigitalPassPage';
import EventAdminPage from './pages/events/EventAdminPage';
import GateScannerPage from './pages/events/GateScannerPage';

// Layout wrapper to conditionally hide header, footer and whatsapp float on standalone pages
const AppContent = () => {
  const location = useLocation();
  const isStandalonePage = 
    location.pathname === '/card' || 
    location.pathname === '/events/divy-garbhyatra' || 
    location.pathname.startsWith('/divy-garbhyatra') || 
    location.pathname.startsWith('/pass') || 
    location.pathname.startsWith('/events/pass') || 
    location.pathname.startsWith('/event-admin') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/superadmin') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/events/register') ||
    location.pathname.startsWith('/scanner');

  return (
    <div className="flex flex-col min-h-screen bg-softCream">
      <ScrollToTop />
      {!isStandalonePage && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventsHub />} />
          <Route path="/events/divy-garbhyatra" element={<DivyaGarbhYatra />} />
          <Route path="/divy-garbhyatra" element={<DivyaGarbhYatra />} />
          <Route path="/register" element={<EventRegisterPage />} />
          <Route path="/divy-garbhyatra/register" element={<EventRegisterPage />} />
          <Route path="/events/divy-garbhyatra/register" element={<EventRegisterPage />} />
          <Route path="/events/register" element={<EventRegisterPage />} />
          <Route path="/events/pass/:inquiryId" element={<DigitalPassPage />} />
          <Route path="/pass/:inquiryId" element={<DigitalPassPage />} />
          <Route path="/admin" element={<EventAdminPage />} />
          <Route path="/superadmin" element={<EventAdminPage />} />
          <Route path="/event-admin" element={<EventAdminPage />} />
          <Route path="/event-admin/scanner" element={<GateScannerPage />} />
          <Route path="/scanner" element={<GateScannerPage />} />
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
      {!isStandalonePage && <WhatsAppFloat />}
      {!isStandalonePage && <Footer />}
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
