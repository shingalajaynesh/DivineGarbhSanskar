import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, Globe, MapPin, Share2, UserPlus, Star, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Card = () => {
  const { t } = useLanguage();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Dr. Taruna Jiyani
ORG:Divine Garbh Sanskar
TITLE:Founder & CEO
TEL;TYPE=WORK,VOICE:+919638484545
EMAIL;TYPE=WORK:info@divinegarbhsanskar.com
URL:https://www.divinegarbhsanskar.com
ADR;TYPE=WORK:;;164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Mani Nagar Society, Nana Varachha;Surat;Gujarat;395013;India
NOTE:Reviving Vedic Prenatal Science for conscious motherhood.
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Dr_Taruna_Jiyani_Divine_Garbh_Sanskar.vcf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    triggerToast(t({ hi: "संपर्क कार्ड डाउनलोड किया गया!", en: "Contact Card Downloaded!", gu: "સંપર્ક કાર્ડ ડાઉનલોડ થયું!" }));
  };

  const handleShareCard = async () => {
    const shareData = {
      title: 'Dr. Taruna Jiyani - Divine Garbh Sanskar',
      text: 'Connect with Dr. Taruna Jiyani (Divine Garbh Sanskar)',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        triggerToast(t({ hi: "लिंक क्लिपबोर्ड पर कॉपी किया गया!", en: "Link copied to clipboard!", gu: "લિંક ક્લિપબોર્ડ પર કોપી થઈ!" }));
      } catch (err) {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          triggerToast(t({ hi: "लिंक क्लिपबोर्ड पर कॉपी किया गया!", en: "Link copied to clipboard!", gu: "લિંક ક્લિપબોર્ડ પર કોપી થઈ!" }));
        } catch (e) {
          console.error('Copy fallback failed', e);
        }
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Dr. Taruna Jiyani - Digital Business Card | Divine Garbh Sanskar</title>
        <meta name="description" content="Digital business card for Dr. Taruna Jiyani, Founder & CEO of Divine Garbh Sanskar. Get in touch for Vedic Prenatal Science classes and counseling." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      {/* Standalone card display wrapping outer section */}
      <div className="min-h-screen bg-softCream/40 text-templeBrown flex justify-center items-start sm:items-center py-0 sm:py-12 px-0 sm:px-4">
        
        <div className="w-full max-w-[430px] bg-white min-h-screen sm:min-h-auto sm:rounded-3xl overflow-hidden shadow-2xl border-0 sm:border border-divineGold/30 relative pb-12 flex flex-col justify-between">
          
          {/* Cover Banner */}
          <div>
            <div className="h-44 bg-gradient-to-r from-templeBrown to-sacredMaroon relative overflow-hidden flex items-center justify-center">
              {/* Subtle Mandala Watermark Background */}
              <div className="absolute inset-0 opacity-[0.05] text-white flex items-center justify-center pointer-events-none select-none">
                <svg viewBox="0 0 100 100" className="w-64 h-64" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="30" />
                  <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M15 85 L85 15" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
                <img
                  src="/logo.jpg"
                  alt="DGS Logo"
                  className="w-8 h-8 rounded-full bg-white p-0.5 object-contain"
                />
                <span className="font-accent text-xs font-bold text-divineGold tracking-widest uppercase">
                  Divine Garbh Sanskar
                </span>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="relative flex justify-center -mt-16 z-10">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                  <img
                    src="/taruna.jpg"
                    alt="Dr. Taruna Jiyani"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=Dr+Taruna+Jiyani&background=5D1A00&color=fff&size=200&bold=true";
                    }}
                  />
                </div>
                {/* Gold Crest Ribbon Badge */}
                <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-gradient-to-r from-divineGold to-warmAmber border-2 border-white rounded-full flex items-center justify-center shadow-md text-[11px]" title="Founder & CEO">
                  👑
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="text-center px-6 pt-4 pb-2">
              <h1 className="font-sans font-black text-2xl text-sacredMaroon leading-none">
                Dr. Taruna Jiyani
              </h1>
              <h2 className="font-sans text-sm font-semibold text-divineGold uppercase tracking-wider mt-2">
                {t({ hi: "संस्थापक एवं सीईओ", en: "Founder & CEO", gu: "સ્થાપક અને સીઈઓ" })}
              </h2>
              <p className="font-sans text-xs text-templeBrown/80 font-medium italic mt-1">
                {t({
                  hi: "वैदिक गर्भ संस्कार विशेषज्ञ और परामर्शदाता",
                  en: "Vedic Prenatal Science Educator & Trainer",
                  gu: "વૈદિક ગર્ભ સંસ્કાર નિષ્ણાત અને પરામર્શદાતા"
                })}
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-templeBrown/60 mt-3 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-sacredMaroon" />
                <span>Surat, Gujarat, India</span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex justify-center gap-3.5 py-4 px-6">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919638484545?text=Hello%20Dr.%20Taruna%20Jiyani,%20I%20would%20like%20to%20know%20more%20about%20Divine%20Garbh%20Sanskar."
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center text-lg hover:scale-105 transition-transform shadow-md"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.13.67 4.11 1.81 5.73L2.03 23l5.44-1.42A9.9 9.9 0 0012 22c5.49 0 9.986-4.5 9.986-10S17.494 2 12.004 2zm0 18.2a8.2 8.2 0 01-4.22-1.18l-.3-.18-3.13.82.83-3.04-.2-.3a8.2 8.2 0 117.02 3.88z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/divinegarbhsanskar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/Divine-Garbhsanskar/100063998265079/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@DivineGarbhsanskar0312"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.555A3.003 3.003 0 00.5 6.163C0 8.07 0 12 0 12s0 3.93.5 5.837a3.003 3.003 0 002.11 2.108c1.87.555 9.388.555 9.388.555s7.518 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.93 24 12 24 12s0-3.93-.5-5.837z" />
                  <polygon points="9.545 15.568 15.818 12 9.545 8.432" className="fill-white" />
                </svg>
              </a>
            </div>

            {/* Detailed Contact List */}
            <div className="px-6 py-2 flex flex-col gap-3.5">
              {/* Phone */}
              <a href="tel:+919638484545" className="flex items-center gap-4 p-3.5 bg-softCream/35 hover:bg-softCream/60 active:bg-softCream/80 rounded-2xl border border-divineGold/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-sacredMaroon/10 text-sacredMaroon flex items-center justify-center shrink-0">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-templeBrown/55 font-bold uppercase tracking-wider">{t({ hi: "मोबाइल नंबर", en: "Mobile Number", gu: "મોબાઇલ નંબર" })}</span>
                  <span className="text-sm font-semibold text-templeBrown font-mono">+91 96384 84545</span>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@divinegarbhsanskar.com" className="flex items-center gap-4 p-3.5 bg-softCream/35 hover:bg-softCream/60 active:bg-softCream/80 rounded-2xl border border-divineGold/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-sacredMaroon/10 text-sacredMaroon flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-templeBrown/55 font-bold uppercase tracking-wider">{t({ hi: "ईमेल पता", en: "Email Support", gu: "ઇમેઇલ સરનામું" })}</span>
                  <span className="text-sm font-semibold text-templeBrown truncate max-w-[280px]">info@divinegarbhsanskar.com</span>
                </div>
              </a>

              {/* Website */}
              <a href="https://www.divinegarbhsanskar.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3.5 bg-softCream/35 hover:bg-softCream/60 active:bg-softCream/80 rounded-2xl border border-divineGold/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-sacredMaroon/10 text-sacredMaroon flex items-center justify-center shrink-0">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-templeBrown/55 font-bold uppercase tracking-wider">{t({ hi: "वेबसाइट", en: "Official Website", gu: "વેબસાઇટ" })}</span>
                  <span className="text-sm font-semibold text-templeBrown">www.divinegarbhsanskar.com</span>
                </div>
              </a>

              {/* Office Address */}
              <a href="https://www.google.com/maps/place/Divine+Garbhsanskar/@21.226308,72.9026557,17z" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3.5 bg-softCream/35 hover:bg-softCream/60 active:bg-softCream/80 rounded-2xl border border-divineGold/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-sacredMaroon/10 text-sacredMaroon flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-templeBrown/55 font-bold uppercase tracking-wider">{t({ hi: "कार्यालय का पता", en: "Office HQ Address", gu: "કાર્યાલયનું સરનામું" })}</span>
                  <span className="text-xs font-semibold text-templeBrown leading-relaxed mt-0.5">
                    {t({
                      hi: "१६४, एबीसी स्कूल के पास, रॉयल आर्केड के पीछे, मारुतिधाम सोसायटी, सरथाना जकात नाका, मणि नगर सोसायटी, नाना वराछा, सूरत - ३९५०१३",
                      en: "164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Mani Nagar Society, Nana Varachha, Surat - 395013",
                      gu: "૧૬૪, એબીસી સ્કૂલ પાસે, રોયલ આર્કેડ પાછળ, મારુતિધામ સોસાયટી, સરથાણા જકાત નાકા, મણી નગર સોસાયટી, નાના વરાછા, સુરત - ૧૬૪"
                    })}
                  </span>
                </div>
              </a>

              {/* Google Reviews rating inline snippet */}
              <a href="https://share.google/RGcRhq1kyraBvkA7j" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 bg-gradient-to-r from-divineGold/10 to-warmAmber/5 hover:from-divineGold/20 rounded-2xl border border-divineGold/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-divineGold/35 shadow-sm text-sm">
                    ⭐
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-sacredMaroon font-bold uppercase tracking-wider">Google Rating</span>
                    <span className="text-xs font-bold text-templeBrown">4.9 ★ (161+ Reviews)</span>
                  </div>
                </div>
                <span className="text-xs text-sacredMaroon font-semibold underline hover:text-vermillion transition-colors">
                  {t({ hi: "समीक्षाएं पढ़ें", en: "Read Reviews", gu: "સમીક્ષાઓ વાંચો" })}
                </span>
              </a>
            </div>
          </div>

          {/* Action Call Buttons */}
          <div className="px-6 pt-6 flex flex-col gap-3.5">
            <button
              onClick={handleSaveContact}
              className="w-full py-4 bg-sacredMaroon text-white font-accent font-bold text-sm tracking-wider uppercase rounded-2xl hover:bg-templeBrown active:scale-98 shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-4.5 h-4.5" />
              <span>{t({ hi: "संपर्क सहेजें", en: "Save Contact", gu: "સંપર્ક સાચવો" })}</span>
            </button>

            <button
              onClick={handleShareCard}
              className="w-full py-4 bg-transparent text-sacredMaroon border-2 border-sacredMaroon font-accent font-bold text-sm tracking-wider uppercase rounded-2xl hover:bg-sacredMaroon/5 active:scale-98 flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-4.5 h-4.5" />
              <span>{t({ hi: "कार्ड साझा करें", en: "Share Card", gu: "કાર્ડ શેર કરો" })}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Floating toast message */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-slate-900 text-white font-sans text-xs md:text-sm font-semibold shadow-lg transition-all duration-300 z-[9999] pointer-events-none flex items-center gap-2 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <Check className="w-4 h-4 text-emerald-400" />
        <span>{toastMessage}</span>
      </div>
    </>
  );
};

export default Card;
