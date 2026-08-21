import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import MandalaBg from '../ui/MandalaBg';
import GoldenButton from '../ui/GoldenButton';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Instagram, ShieldCheck, Sun, Compass, Music } from 'lucide-react';

const SimantonayanTeaser = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Compass className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "१. दंपत्ति संकल्प (Couples Harmony)",
        en: "1. Couple Emotional Alignment",
        gu: "૧. દંપતી સંકલ્પ (Couples Harmony)"
      },
      desc: {
        hi: "माता-पिता के बीच भावनात्मक सामंजस्य और घरेलू वातावरण को सकारात्मक व तनावमुक्त बनाना।",
        en: "Fostering mutual understanding and supportive counseling between parents to establish a calm, peaceful home environment.",
        gu: "માતા-પિતા વચ્ચે ભાવનાત્મક સુમેળ સાધી ઘરના વાતાવરણને સકારાત્મક અને તણાવમુક્ત બનાવવું."
      }
    },
    {
      icon: <Sun className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "२. सीमंतोन्नयन विधि (Sacred Hair-Parting Ritual)",
        en: "2. Sacred Hair-Parting Ritual (Seemantham)",
        gu: "૨. સીમંતોન્નયન વિધિ (Sacred Hair-Parting Ritual)"
      },
      desc: {
        hi: "माँ के सम्मान और मानसिक प्रसन्नता के लिए पारंपरिक वैदिक विधि, जो मातृत्व के उल्लास का उत्सव मनाती है।",
        en: "The traditional symbolic hair-parting ritual performed with auspicious herbal preparations to honor the expectant mother and bring joyful serenity.",
        gu: "માતાના સન્માન અને માનસિક ખુશી માટે પરંપરાગત વૈદિક વિધિ, જે માતૃત્વના ઉત્સાહની ઉજવણી કરે છે."
      }
    },
    {
      icon: <Music className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "३. राग-नाद श्रवण (Mantra & Classical Music)",
        en: "3. Mantra & Classical Soundscapes",
        gu: "૩. રાગ-નાદ શ્રવણ (Mantra & Classical Music)"
      },
      desc: {
        hi: "शास्त्रीय राग संगीत और सकारात्मक मंत्र ध्वनियों द्वारा घर में शांत और सुखद वातावरण का निर्माण।",
        en: "Gentle classical Indian ragas and calming mantras curated to foster a restful, soothing environment for mother and baby.",
        gu: "શાસ્ત્રીય રાગ સંગીત અને હકારાત્મક મંત્ર ધ્વનિ દ્વારા ઘરમાં શાંત અને સુખદ વાતાવરણનું નિર્માણ."
      }
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-divineGold" />,
      title: {
        hi: "४. मातृत्व रक्षा एवं आशीर्वाद (Blessings & Well-being)",
        en: "4. Mother & Baby Blessings",
        gu: "૪. માતૃત્વ રક્ષા અને આશીર્વાદ"
      },
      desc: {
        hi: "माँ और शिशु के समग्र कल्याण और सुखद मातृत्व यात्रा के लिए वैदिक मंत्रों एवं परिवार के शुभ संकल्पों का आशीर्वाद।",
        en: "Traditional prayers and family blessings dedicated to the mother's peace of mind, healthy pregnancy journey, and safe childbirth.",
        gu: "માતા અને બાળકના સર્વાંગી કલ્યાણ અને સુખદ માતૃત્વ યાત્રા માટે વૈદિક મંત્રો અને પરિવારના શુભ આશીર્વાદ."
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
          <span className="text-divineGold font-bold text-xs md:text-sm tracking-wider mb-3 uppercase bg-white/10 px-3.5 py-1 rounded-full border border-divineGold/30">
            {t({ hi: "विशेष गर्भावस्था अनुष्ठान", en: "Vedic Prenatal Science", gu: "વિશેષ ગર્ભાવસ્થા સંસ્કાર વિધિ" })}
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
            <div className="w-10 h-10 rounded-full bg-sacredMaroon border border-divineGold/35 flex items-center justify-center shadow-inner">
              <Heart className="w-5 h-5 text-divineGold" />
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
