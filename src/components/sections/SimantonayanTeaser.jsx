import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import MandalaBg from '../ui/MandalaBg';
import GoldenButton from '../ui/GoldenButton';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, Instagram, ShieldCheck, Brain, Compass, Music } from 'lucide-react';

const SimantonayanTeaser = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Compass className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "१. दंपत्ति संकल्प (Couples Alignment)",
        en: "1. Couples Energy Alignment",
        gu: "૧. દંપતી સંકલ્પ (Couples Alignment)"
      },
      desc: {
        hi: "पति-पत्नी के ऊर्जा क्षेत्र को जोड़ना और घरेलू वातावरण को सकारात्मक व तनावमुक्त बनाना।",
        en: "Connecting the parents' energy fields through counseling to establish a peaceful, loving home sanctuary.",
        gu: "પતિ-પત્નીના ઊર્જા ક્ષેત્રોને જોડવું અને ઘરના વાતાવરણને સકારાત્મક અને તણાવમુક્ત બનાવવું."
      }
    },
    {
      icon: <Brain className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "२. सीमंतोन्नयन विधि (Sacred Hair-Parting)",
        en: "2. Sacred Hair-Parting Science",
        gu: "૨. સીમંતોન્નયન વિધિ (Sacred Hair-Parting)"
      },
      desc: {
        hi: "पवित्र औषधियों के साथ बालों को ऊपर संवारने की विधि, जो गर्भस्थ शिशु के मस्तिष्क केंद्र को सक्रिय करती है।",
        en: "The symbolic hair-parting using sacred herbs, scientifically designed to stimulate cognitive registers.",
        gu: "પવિત્ર ઔષધિઓથી વાળ ઓળવાની પ્રતીકાત્મક વિધિ, જે ગર્ભસ્થ બાળકના મગજના કેન્દ્રોને ઉત્તેજિત કરે છે."
      }
    },
    {
      icon: <Music className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "३. राग-नाद चिकित्सा (Soundscape Therapy)",
        en: "3. Mantra & Raga Soundscape",
        gu: "૩. રાગ-નાદ ચિકિત્સા (Soundscape Therapy)"
      },
      desc: {
        hi: "शिशु की जैविक घड़ी के अनुकूल शास्त्रीय राग संगीत और सकारात्मक ध्वनि तरंगों का संचार।",
        en: "Month-specific classical Indian ragas and protective chanting aligned with the baby's biological clock.",
        gu: "બાળકની જૈવિક ઘડિયાળને અનુકૂળ શાસ્ત્રીય રાગ સંગીત અને હકારાત્મક ધ્વનિ તરંગોનો સંચાર."
      }
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "४. गर्भ रक्षा कवच (Spiritual Womb Shield)",
        en: "4. Womb Protection & Blessings",
        gu: "૪. ગર્ભ રક્ષા કવચ (Spiritual Womb Shield)"
      },
      desc: {
        hi: "गर्भ की पूर्ण सुरक्षा और सुखद प्रसव के लिए वैदिक मंत्रों के माध्यम से दिव्य ऊर्जा का आह्वान।",
        en: "Invoking cosmic energy through Vedic mantras for safe fetal development and natural, healthy delivery.",
        gu: "ગર્ભની પૂર્ણ સુરક્ષા અને સુખદ પ્રસૂતિ માટે વૈદિક મંત્રો દ્વારા દિવ્ય ઊર્જાનું આવાહાન."
      }
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#3B0F00] via-[#5D1A00] to-[#3B0F00] overflow-hidden border-y border-divineGold/30 shadow-inner text-white">
      {/* Background Watermark Mandala */}
      <MandalaBg className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] opacity-[0.05] text-divineGold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Sanskrit Quote Ribbon */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-sm border-y border-divineGold/30 px-6 py-2.5 rounded-full text-center">
            <span className="font-devanagari text-xs md:text-sm text-divineGold font-semibold tracking-wide block">
              ॥ निषेकादिश्मशानान्तो मन्त्रैर्यस्योदितो विधिः · सीमन्तोन्नयनं तृतीयं गर्भसंस्कारो विधीयते ॥
            </span>
          </div>
        </div>

        {/* Custom Dark-Mode Section Header */}
        <div className="flex flex-col mb-12 items-center text-center">
          <span className="font-accent text-divineGold font-bold text-sm tracking-widest mb-3 uppercase animate-pulse">
            ✦ {t({ hi: "विशेष गर्भावस्था अनुष्ठान", en: "Vedic Prenatal Science", gu: "વિશેષ ગર્ભાવસ્થા સંસ્કાર વિધિ" })} ✦
          </span>
          <h2 className="font-devanagari text-3xl md:text-5xl text-white leading-tight font-normal mb-2">
            {t({ hi: "सीमंतोन्नयन (गोद भराई) संस्कार मार्गदर्शन", en: "Sacred Simantonayan Sanskar Guidance", gu: "સીમંતોન્નયન (ખોળો ભરાવવો) સંસ્કાર માર્ગદર્શન" })}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-divineGold to-transparent mt-4 rounded-full mx-auto" />
        </div>

        {/* Storytelling Path Layout */}
        <div className="relative mt-16 max-w-4xl mx-auto">

          {/* Central Connecting Path Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 sm:-translate-x-1/2 bg-dashed border-l-2 border-dashed border-divineGold/30 -z-10" />

          {/* Steps List */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row items-start sm:items-center w-full relative ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                >
                  {/* Step Card */}
                  <div className="w-full sm:w-[45%] pl-12 sm:pl-0">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-divineGold/60 p-6 rounded-divine-md shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 relative group">

                      {/* Floating Step Number */}
                      <span className="absolute -top-3 right-4 bg-sacredMaroon border border-divineGold text-[10px] font-accent font-black text-divineGold px-2 py-0.5 rounded-full shadow-md">
                        STEP 0{idx + 1}
                      </span>

                      <h4 className="font-sans font-bold text-base md:text-lg text-divineGold mb-2 group-hover:text-white transition-colors">
                        {t(step.title)}
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed">
                        {t(step.desc)}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Dot */}
                  <div className="absolute left-0 sm:left-1/2 top-6 sm:top-1/2 -translate-y-1/2 sm:-translate-x-1/2 w-8 h-8 rounded-full bg-sacredMaroon border-2 border-divineGold flex items-center justify-center shadow-lg z-10">
                    {step.icon}
                  </div>

                  {/* Empty space for layout matching on desktop */}
                  <div className="hidden sm:block w-[45%]" />
                </div>
              );
            })}
          </div>

        </div>

        {/* CTA Actions and Clinical Specialist Block */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">

          {/* Clinical Specialist Badge */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full shadow-sm">
            <div className="w-10 h-10 rounded-full bg-sacredMaroon border border-divineGold/35 flex items-center justify-center text-lg shadow-inner">
              🩺
            </div>
            <div className="text-left">
              <span className="text-[9px] text-divineGold font-accent font-black tracking-widest uppercase block">
                SPECIALIST GUIDE
              </span>
              <span className="text-xs font-sans font-black text-white">
                Dr. Taruna Jiyani (Founder)
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/simantonayan">
              <GoldenButton className="py-3 px-8 text-sm flex items-center gap-2 group shadow-sm hover:shadow-md">
                <span>{t({ hi: "सीमंतोन्नयन विधि विस्तार से जानें", en: "Explore Simantonayan Science", gu: "સીમંતોન્નયન વિધિ વિગતવાર જાણો" })}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </GoldenButton>
            </Link>

            <a
              href="https://www.instagram.com/simantonayan_sanskar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full border border-divineGold/30 hover:border-divineGold text-divineGold font-accent font-bold text-xs uppercase tracking-wider transition-all hover:bg-white/5 bg-transparent"
            >
              <Instagram className="w-4 h-4" />
              <span>{t({ hi: "लाइव विधि देखें", en: "Watch Live Rituals", gu: "લાઇવ વિધિ જુઓ" })}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SimantonayanTeaser;
