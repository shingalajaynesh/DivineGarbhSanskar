import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-templeBrown text-softCream/80 relative overflow-hidden pt-16 pb-8 border-t-4 border-divineGold/35 z-10">

      {/* Decors: Corner Watermark Mandalas */}
      <div className="absolute -bottom-24 -left-24 w-60 h-60 opacity-[0.05] text-divineGold pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="30" />
          <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M15 85 L85 15" />
        </svg>
      </div>
      <div className="absolute -top-24 -right-24 w-60 h-60 opacity-[0.05] text-divineGold pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="30" />
          <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M15 85 L85 15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt={t({ hi: "दिव्य गर्भ संस्कार लोगो", en: "Divine Garbh Sanskar Logo", gu: "દિવ્ય ગર્ભ સંસ્કાર લોગો" })}
                className="w-12 h-12 rounded-full p-0.5 bg-white object-contain hover:rotate-6 transition-transform duration-300 shadow-md border border-divineGold/35"
              />

              <div className="flex flex-col">
                <span className="font-accent text-base font-bold tracking-widest text-white leading-none">
                  DIVINE <span className="text-divineGold font-extrabold">GARBH</span>
                </span>
                <span className="font-devanagari text-[9px] text-softCream/80 tracking-[0.22em] font-semibold leading-none mt-1.5 uppercase flex items-center gap-1">
                  <span className="h-[1px] w-2 bg-divineGold/40"></span>
                  गर्भ संस्कार
                  <span className="h-[1px] w-2 bg-divineGold/40"></span>
                </span>
              </div>
            </Link>

            <p className="font-sans text-sm text-softCream/70 leading-relaxed mt-2">
              {t({
                hi: "वैदिक गर्भ संस्कार - भारतीय सांस्कृतिक मूल्यों और आधुनिक विज्ञान के मिलन से मातृत्व को एक दिव्य और आनंदमय अनुभव बनाने की हमारी एक विनम्र पहल।",
                en: "Weaving ancient cultural roots and modern science into motherhood. Laying the blueprint for intelligent, peaceful, and values-driven children.",
                gu: "વૈદિક ગર્ભ સંસ્કાર - ભારતીય સાંસ્કૃતિક મૂલ્યો અને આધુનિક વિજ્ઞાનના મિલનથી માતૃત્વને એક દિવ્ય અને આનંદમય અનુભવ બનાવવાની અમારી નમ્ર પહેલ।"
              })}
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/divinegarbhsanskar/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-softCream/10 rounded-full text-divineGold hover:bg-divineGold hover:text-sacredMaroon transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/people/Divine-Garbhsanskar/100063998265079/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-softCream/10 rounded-full text-divineGold hover:bg-divineGold hover:text-sacredMaroon transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@DivineGarbhsanskar0312"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-softCream/10 rounded-full text-divineGold hover:bg-divineGold hover:text-sacredMaroon transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4 md:pl-8">
            <h3 className="font-accent text-white font-bold tracking-widest text-sm uppercase border-b border-divineGold/30 pb-2">
              {t({ hi: "त्वरित लिंक्स", en: "QUICK LINKS", gu: "ઝડપી લિંક્સ" })}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-divineGold transition-colors">
                  {t({ hi: "होम", en: "Home", gu: "હોમ" })}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-divineGold transition-colors">
                  {t({ hi: "हमारे बारे में", en: "About Us", gu: "અમારા વિશે" })}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-divineGold transition-colors">
                  {t({ hi: "कोर्स", en: "Courses", gu: "કોર્સ" })}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-divineGold transition-colors">
                  {t({ hi: "ब्लॉग", en: "Blog & Articles", gu: "બ્લોગ અને લેખો" })}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-divineGold transition-colors">
                  {t({ hi: "संपर्क करें", en: "Contact Us", gu: "સંપર્ક કરો" })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="flex flex-col gap-4">
            <h3 className="font-accent text-white font-bold tracking-widest text-sm uppercase border-b border-divineGold/30 pb-2">
              {t({ hi: "हमारे कार्यक्रम", en: "OUR PROGRAMS", gu: "અમારા કાર્યક્રમો" })}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-divineGold transition-colors">
                  {t({ hi: "स्टार्टर गाइड (3 महीने)", en: "Starter Guide (3 Months)", gu: "સ્ટાર્ટર ગાઇડ (૩ મહિના)" })}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-divineGold transition-colors">
                  {t({ hi: "सम्पूर्ण कार्यक्रम (9 महीने)", en: "Complete Program (9 Months)", gu: "સંપૂર્ણ કાર્યક્રમ (૯ મહિના)" })}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-divineGold transition-colors">
                  {t({ hi: "दिव्य प्लस प्रीमियम (12 महीने)", en: "Divine Plus Premium (12 Months)", gu: "દિવ્ય પ્લસ પ્રીમિયમ (૧૨ મહિના)" })}
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-divineGold transition-colors">
                  {t({ hi: "हमारी पुस्तकें एवं साहित्य", en: "Garbh Sanskar Books", gu: "અમારી પુસ્તકો અને સાહિત્ય" })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-accent text-white font-bold tracking-widest text-sm uppercase border-b border-divineGold/30 pb-2">
              {t({ hi: "संपर्क विवरण", en: "CONTACT INFO", gu: "સંપર્ક વિગત" })}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-divineGold shrink-0" />
                <span>
                  {t({
                    hi: "१६४, एबीसी स्कूल के पास, रॉयल आर्केड के पीछे, मारुतिधाम सोसायटी, सरथाना जकात नाका, मणि नगर सोसायटी, नाना वराछा, सूरत, गुजरात - ३९५०१३",
                    en: "164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Mani Nagar Society, Nana Varachha, Surat, Gujarat - 395013",
                    gu: "૧૬૪, એબીસી સ્કૂલ પાસે, રોયલ આર્કેડ પાછળ, મારુતિધામ સોસાયટી, સરથાણા જકાત નાકા, મણી નગર સોસાયટી, નાના વરાછા, સુરત, ગુજરાત - ૩૯૫૦૧૩"
                  })}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-divineGold shrink-0" />
                <a href="tel:+919638484545" className="hover:text-divineGold transition-colors">
                  +91 96384 84545
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-divineGold shrink-0" />
                <a href="mailto:divinegarbhsanskar0312@gmail.com" className="hover:text-divineGold transition-colors">
                  divinegarbhsanskar0312@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical Disclaimer Banner in Footer */}
        <div className="bg-sacredMaroon/60 border border-divineGold/30 rounded-divine-sm p-4 text-xs text-softCream/80 leading-relaxed text-center mb-8">
          <p>
            <strong className="text-divineGold font-semibold">Medical Disclaimer:</strong> Content on Divine Garbh Sanskar is for educational, traditional, and general wellness purposes only and does not replace medical advice, diagnosis, or treatment. Always consult your gynecologist or qualified healthcare provider regarding your pregnancy care.{' '}
            <Link to="/disclaimer" className="text-divineGold underline font-semibold">Read Disclaimer</Link> •{' '}
            <Link to="/editorial-policy" className="text-divineGold underline font-semibold">Editorial Policy</Link> •{' '}
            <Link to="/authors" className="text-divineGold underline font-semibold">Authors & Team</Link>
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-divineGold/20 my-8" />

        {/* Bottom copyright details */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-softCream/60 gap-4 text-center">
          <p>© {new Date().getFullYear()} Divine Garbh Sanskar. All Rights Reserved. Built with devotion.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="hover:text-divineGold transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-divineGold transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-divineGold transition-colors">Refund Policy</Link>
            <Link to="/cookie-policy" className="hover:text-divineGold transition-colors">Cookie Policy</Link>
            <Link to="/disclaimer" className="hover:text-divineGold transition-colors">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
