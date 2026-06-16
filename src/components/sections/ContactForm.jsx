import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, CheckCircle, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionLabel from '../ui/SectionLabel';
import MandalaBg from '../ui/MandalaBg';

const ContactForm = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    // Simulate API Submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      reset();
    }, 1500);
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden border-b border-divineGold/10" id="contact-section">
      <MandalaBg className="bottom-0 left-0 w-80 h-80 opacity-[0.03] text-divineGold" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <SectionLabel
          label={t({ hi: "निःशुल्क परामर्श", en: "Free Counselling Call", gu: "મફત પરામર્શ" })}
          titleHi={t({ hi: "आज ही निःशुल्क परामर्श सत्र बुक करें", en: "Schedule Your Free Expert Counseling Call", gu: "આજે જ મફત પરામર્શ સત્ર બુક કરો" })}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-stretch">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-softCream/20 border-2 border-divineGold/30 p-8 rounded-divine-md shadow-md relative overflow-hidden flex flex-col justify-center">
            
            {isSubmitted ? (
              /* Success State Screen */
              <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                <CheckCircle className="w-20 h-20 text-[#25D366] animate-bounce" />
                <h3 className="font-sans font-black text-2xl text-sacredMaroon">
                  {t({ hi: "पंजीकरण सफल रहा!", en: "Registration Successful!", gu: "રજીસ્ટ્રેશન સફળ રહ્યું!" })}
                </h3>
                <p className="font-sans text-sm md:text-base text-templeBrown/85 max-w-sm">
                  {t({
                    hi: "हम जल्द संपर्क करेंगे। हमारे वरिष्ठ परामर्शदाता २४ घंटों के भीतर आपसे संपर्क करेंगे।",
                    en: "We will reach you soon! Our senior pregnancy counselor will contact you within 24 hours.",
                    gu: "અમે ટૂંક સમયમાં સંપર્ક કરીશું. અમારા વરિષ્ઠ પરામર્શદાતા ૨૪ કલાકમાં તમારો સંપર્ક કરશે."
                  })}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 font-accent text-xs font-bold bg-sacredMaroon text-white rounded-full hover:bg-vermillion transition-all"
                >
                  {t({ hi: "नया फॉर्म भरें", en: "Submit Another Form", gu: "બીજું ફોર્મ ભરો" })}
                </button>
              </div>
            ) : (
              /* Contact Form Screen */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold font-sans text-sacredMaroon uppercase tracking-wider mb-2">
                    {t({ hi: "पूरा नाम *", en: "Full Name *", gu: "સંપૂર્ણ નામ *" })}
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Pooja Sharma"
                    className={`w-full px-4 py-3 rounded-divine-sm bg-white border font-sans text-sm focus:outline-none focus:ring-1 focus:ring-divineGold ${
                      errors.name ? 'border-vermillion' : 'border-divineGold/35'
                    }`}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-xs text-vermillion font-sans mt-1 block">
                      {t({ hi: "कृपया अपना नाम लिखें।", en: "Please enter your name.", gu: "કૃપા કરીને તમારું નામ લખો." })}
                    </span>
                  )}
                </div>

                {/* Grid Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold font-sans text-sacredMaroon uppercase tracking-wider mb-2">
                      {t({ hi: "मोबाइल नंबर (India +91) *", en: "Mobile Number (India) *", gu: "મોબાઇલ નંબર (ભારત) *" })}
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-divine-sm border-y border-l border-divineGold/35 bg-softCream/40 font-sans text-sm font-semibold text-sacredMaroon">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        className={`w-full px-4 py-3 rounded-r-divine-sm bg-white border-y border-r font-sans text-sm focus:outline-none focus:ring-1 focus:ring-divineGold ${
                          errors.mobile ? 'border-vermillion' : 'border-divineGold/35'
                        }`}
                        {...register("mobile", {
                          required: true,
                          pattern: /^[6-9]\d{9}$/
                        })}
                      />
                    </div>
                    {errors.mobile && (
                      <span className="text-xs text-vermillion font-sans mt-1 block">
                        {t({ hi: "कृपया सही १०-अंकीय नंबर लिखें।", en: "Please enter a valid 10-digit mobile number.", gu: "કૃપા કરીને સાચો ૧૦-આંકડાનો મોબાઇલ નંબર લખો." })}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold font-sans text-sacredMaroon uppercase tracking-wider mb-2">
                      {t({ hi: "ईमेल पता", en: "Email Address", gu: "ઈમેલ સરનામું" })}
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-divine-sm bg-white border border-divineGold/35 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-divineGold"
                      {...register("email")}
                    />
                  </div>
                </div>

                {/* Grid Fields Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold font-sans text-sacredMaroon uppercase tracking-wider mb-2">
                      {t({ hi: "शहर / गाँव *", en: "City / Town *", gu: "શહેર / ગામ *" })}
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. Surat"
                      className={`w-full px-4 py-3 rounded-divine-sm bg-white border font-sans text-sm focus:outline-none focus:ring-1 focus:ring-divineGold ${
                        errors.city ? 'border-vermillion' : 'border-divineGold/35'
                      }`}
                      {...register("city", { required: true })}
                    />
                    {errors.city && (
                      <span className="text-xs text-vermillion font-sans mt-1 block">
                        {t({ hi: "कृपया शहर का नाम लिखें।", en: "Please enter your city.", gu: "કૃપા કરીને શહેરનું નામ લખો." })}
                      </span>
                    )}
                  </div>

                  {/* Preferred Language */}
                  <div>
                    <label className="block text-xs font-bold font-sans text-sacredMaroon uppercase tracking-wider mb-2">
                      {t({ hi: "पसंदीदा भाषा", en: "Preferred Language", gu: "પસંદગીની ભાષા" })}
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-divine-sm bg-white border border-divineGold/35 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-divineGold text-sacredMaroon"
                      {...register("language")}
                    >
                      <option value="Hindi">हिंदी (Hindi)</option>
                      <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                </div>

                {/* Call Time Preferred */}
                <div>
                  <label className="block text-xs font-bold font-sans text-sacredMaroon uppercase tracking-wider mb-2">
                    {t({ hi: "बात करने का सुविधाजनक समय", en: "Convenient Time to Call", gu: "વાત કરવાનો અનુકૂળ સમય" })}
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-divine-sm bg-white border border-divineGold/35 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-divineGold text-sacredMaroon"
                    {...register("callTime")}
                  >
                    <option value="Morning">{t({ hi: "सुबह १० से दोपहर १२ (10:00 AM - 12:00 PM)", en: "Morning (10:00 AM - 12:00 PM)", gu: "સવારે ૧૦ થી બપોરે ૧૨ (10:00 AM - 12:00 PM)" })}</option>
                    <option value="Afternoon">{t({ hi: "दोपहर १२ से शाम ४ (12:00 PM - 04:00 PM)", en: "Afternoon (12:00 PM - 04:00 PM)", gu: "બપોરે ૧૨ થી સાંજે ૪ (12:00 PM - 04:00 PM)" })}</option>
                    <option value="Evening">{t({ hi: "शाम ४ से रात ७ (04:00 PM - 07:00 PM)", en: "Evening (04:00 PM - 07:00 PM)", gu: "સાંજે ૪ થી રાત્રે ૭ (04:00 PM - 07:00 PM)" })}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold font-sans text-sacredMaroon uppercase tracking-wider mb-2">
                    {t({ hi: "शुशू के लिए आपकी आकांक्षाएं / संदेश", en: "Your Message or Expectations", gu: "બાળક માટે તમારી આકાંક્ષાઓ / સંદેશ" })}
                  </label>
                  <textarea
                    rows="3"
                    placeholder={t({ hi: "E.g. मैं वर्तमान में ३ महीने की गर्भवती हूँ और...", en: "E.g. I am 3 months pregnant and would like to...", gu: "E.g. હું હાલમાં ૩ મહિનાની ગર્ભવતી છું અને..." })}
                    className="w-full px-4 py-3 rounded-divine-sm bg-white border border-divineGold/35 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-divineGold resize-none"
                    {...register("message")}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 rounded-divine-sm bg-gradient-to-r from-divineGold to-warmAmber border-2 border-divineGold text-sacredMaroon font-accent font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:from-warmAmber hover:to-divineGold shadow-md flex items-center justify-center gap-2 animate-glow-pulse disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t({ hi: "भेजा जा रहा है...", en: "Submitting...", gu: "મોકલાઈ રહ્યું છે..." })}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>{t({ hi: "🌸 निःशुल्क सत्र बुक करें", en: "🌸 Book Free Session", gu: "🌸 મફત સત્ર બુક કરો" })}</span>
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* Right Column: Office Coordinates & Contact Info */}
          <div className="lg:col-span-5 bg-templeBrown text-softCream p-8 rounded-divine-md flex flex-col justify-between border-2 border-divineGold/30 relative overflow-hidden select-default">
            
            {/* Soft decorative background circles */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

            <div>
              <span className="font-accent text-divineGold font-bold text-xs tracking-widest uppercase mb-4 block">
                ✦ {t({ hi: "संपर्क कार्यालय", en: "Our HQ Coordinates", gu: "સંપર્ક કાર્યાલય" })} ✦
              </span>
              
              <h3 className="font-sans font-black text-2xl text-white mb-6 leading-snug">
                {t({ hi: "मार्गदर्शन केंद्र, सूरत", en: "Surat Guidance Center", gu: "માર્ગદર્શન કેન્દ્ર, સુરત" })}
              </h3>

              <ul className="flex flex-col gap-6 text-sm md:text-base text-softCream/85">
                <li className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 text-divineGold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-1">
                      {t({ hi: "मुख्य कार्यालय पता:", en: "Office Address:", gu: "મુખ્ય કાર્યાલયનું સરનામું:" })}
                    </span>
                    <span>
                      {t({
                        hi: "३०५, दिव्य प्लाजा, रिंग रोड, सूरत, गुजरात - ३९५००३",
                        en: "350, Divine Plaza, Ring Road, Surat, Gujarat - 395003",
                        gu: "૩૦૫, દિવ્ય પ્લાઝા, રિંગ રોડ, સુરત, ગુજરાત - ૩૯૫૦૦૩"
                      })}
                    </span>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <Phone className="w-6 h-6 text-divineGold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-1">
                      {t({ hi: "कॉल सेवा:", en: "Telephone Helpline:", gu: "ફોન સેવા:" })}
                    </span>
                    <a href="tel:+919999999999" className="hover:text-divineGold transition-colors font-mono">
                      +91 99999 99999
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <Mail className="w-6 h-6 text-divineGold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-1">
                      {t({ hi: "ईमेल संपर्क:", en: "Email Support:", gu: "ઈમેલ સંપર્ક:" })}
                    </span>
                    <a href="mailto:info@divinegarbhsanskar.com" className="hover:text-divineGold transition-colors">
                      info@divinegarbhsanskar.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Counselors silhouette watermark */}
            <div className="border-t border-white/10 pt-6 mt-8">
              <p className="font-sans text-xs text-softCream/60 leading-relaxed italic">
                {t({
                  hi: "* आपकी व्यक्तिगत जानकारी पूरी तरह से गोपनीय रखी जाएगी और किसी भी तीसरे पक्ष से साझा नहीं की जाएगी।",
                  en: "* Your pregnancy details are stored securely. We respect your confidentiality and never share your records.",
                  gu: "* તમારી વ્યક્તિગત માહિતી સંપૂર્ણપણે ગુપ્ત રાખવામાં આવશે અને કોઈ પણ ત્રીજી વ્યક્તિ સાથે શેર કરવામાં આવશે નહીં."
                })}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
