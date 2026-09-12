import fs from 'fs';
import path from 'path';

const projectRoot = 'd:/WEBSITE DEVELOPMENT/thedivinegarbhsanskar/Divine-website';

// 1. Update src/data/aboutData.js
const aboutPath = path.join(projectRoot, 'src/data/aboutData.js');
let aboutContent = fs.readFileSync(aboutPath, 'utf-8');
aboutContent = aboutContent.replace(
  'managing cortisol and maternal stress, maintaining balanced micronutrient nutrition, and practicing soothing sound therapy directly benefit maternal tranquility and mother-child emotional bonding.',
  'reducing maternal stress, maintaining balanced nutrition, and enjoying soothing sound practices benefit maternal tranquility and emotional wellbeing.'
);
fs.writeFileSync(aboutPath, aboutContent, 'utf-8');
console.log('Updated aboutData.js');

// 2. Update src/components/sections/Faculty.jsx
const facultyPath = path.join(projectRoot, 'src/components/sections/Faculty.jsx');
let facultyContent = fs.readFileSync(facultyPath, 'utf-8');
facultyContent = facultyContent.replace(
  `      title: {
        hi: "आधुनिक भ्रूण विज्ञान और तनाव मुक्ति",
        en: "Modern Embryology & Stress Reduction",
        gu: "આધુનિક ભ્રૂણ વિજ્ઞાન અને તણાવ મુક્તિ"
      },
      desc: {
        hi: "गर्भावस्था के दौरान कोर्टिसोल (तनाव हार्मोन) को कम करने और सुरक्षित प्रसव के लिए वैज्ञानिक दृष्टिकोण।",
        en: "Clinical methods to lower maternal cortisol levels, enhance endorphins, and prepare for gentle, calm childbirth.",
        gu: "ગર્ભાવસ્થા દરમિયાન તણાવ હોર્મોન્સ ઘટાડવા અને સુરક્ષિત પ્રસૂતિ માટે વૈજ્ઞાનિક અભિગમ."
      }`,
  `      title: {
        hi: "मातृ कल्याण और तनाव प्रबंधन",
        en: "Maternal Wellness & Stress Management",
        gu: "માતૃ કલ્યાણ અને તણાવ વ્યવસ્થાપન"
      },
      desc: {
        hi: "गर्भावस्था के दौरान तनाव को कम करने, मानसिक शांति बनाए रखने और एक सकारात्मक वातावरण तैयार करने के व्यावहारिक तरीके।",
        en: "Practical relaxation techniques and mindful routines to reduce daily stress and cultivate emotional calm during pregnancy.",
        gu: "ગર્ભાવસ્થા દરમિયાન તણાવ હળવો કરવા, માનસિક શાંતિ જાળવવા અને હકારાત્મક વાતાવરણ સર્જવા માટેની વ્યવહારુ પદ્ધતિઓ."
      }`
);
fs.writeFileSync(facultyPath, facultyContent, 'utf-8');
console.log('Updated Faculty.jsx');

// 3. Update src/data/blogPosts.js
const blogPath = path.join(projectRoot, 'src/data/blogPosts.js');
let blogContent = fs.readFileSync(blogPath, 'utf-8');

// Post #2 updates
blogContent = blogContent.replace(
  '"en": "Discover how auditory stimulation, psycho-acoustics, Vedic mantras, and specific Indian classical ragas nurture fetal sensory development and lower maternal cortisol levels."',
  '"en": "Discover how auditory stimulation, Vedic mantras, and specific Indian classical ragas support maternal relaxation, peace of mind, and prenatal emotional bonding."'
);

blogContent = blogContent.replace(
  '• Optimal Volume Control: Maintain acoustic volume between 50 to 60 decibels (similar to a gentle conversation). Never place high-volume headphones directly on the abdominal wall, as amniotic fluid amplifies pressure waves.',
  '• Moderate Listening Volume: Keep music at a comfortable room listening volume (similar to a gentle conversation). Avoid placing headphones directly against the maternal abdomen, as sound travels efficiently through fluid.'
);
blogContent = blogContent.replace(
  '• इष्टतम वॉल्यूम नियंत्रण: ध्वनिक वॉल्यूम 50 से 60 डेसिबल (सौम्य वार्तालाप के समान) के बीच बनाए रखें। कभी भी हाई-वॉल्यूम हेडफ़ोन को सीधे पेट की दीवार पर न रखें, क्योंकि एमनियोटिक द्रव दबाव तरंगों को बढ़ाता है।',
  '• मध्यम आवाज़: संगीत को कमरे में सामान्य बातचीत के स्तर जितनी आरामदायक आवाज़ में सुनें। हेडफ़ोन को सीधे पेट पर रखने से बचें, क्योंकि ध्वनि तरल माध्यम में तेज़ी से फैलती है।'
);
blogContent = blogContent.replace(
  '• શ્રેષ્ઠ વોલ્યુમ નિયંત્રણ: 50 થી 60 ડેસિબલ્સ વચ્ચે એકોસ્ટિક વોલ્યુમ જાળવો (સૌમ્ય વાતચીત જેવું જ). હાઈ-વોલ્યુમ હેડફોન સીધા પેટની દિવાલ પર ક્યારેય ન મૂકો, કારણ કે એમ્નિઅટિક પ્રવાહી દબાણના તરંગોને વધારે છે.',
  '• મધ્યમ અવાજ: સંગીતને રૂમમાં સામાન્ય વાતચીત જેટલા આરામદાયક અવાજમાં સાંભળો. હેડફોનને સીધા પેટ પર રાખવાનું ટાળો, કારણ કે ધ્વનિ પ્રવાહીમાં સરળતાથી પ્રવાસ કરે છે.'
);

blogContent = blogContent.replace(
  'Expectant mothers should avoid prolonged exposure to harsh, erratic, loud industrial noises, heavy metal music, or aggressive movie soundtracks exceeding 85 decibels. Intense acoustic shocks can trigger fetal startle reflexes, sudden spikes in fetal motor activity, and transient maternal tachycardia.',
  'Expectant mothers should avoid prolonged exposure to very loud environments or sudden loud noises (such as loud industrial settings or blaring speakers). A quiet, peaceful acoustic atmosphere helps the mother remain relaxed and comfortable.'
);
blogContent = blogContent.replace(
  'गर्भवती माताओं को कठोर, अनियमित, तेज़ औद्योगिक शोर, भारी धातु संगीत, या 85 डेसिबल से अधिक के आक्रामक मूवी साउंडट्रैक के लंबे समय तक संपर्क से बचना चाहिए। तीव्र ध्वनिक झटके भ्रूण की चौंका देने वाली प्रतिक्रिया, भ्रूण की मोटर गतिविधि में अचानक वृद्धि और क्षणिक मातृ क्षिप्रहृदयता को ट्रिगर कर सकते हैं।',
  'गर्भवती माताओं को अत्यधिक तेज़ शोर वाले वातावरण या अचानक तेज़ आवाज़ों (जैसे तेज़ औद्योगिक शोर या तेज़ आवाज़ वाले लाउडस्पीकर) के लंबे समय तक संपर्क से बचना चाहिए। एक शांत और सौम्य वातावरण माँ को तनावमुक्त और सहज रखने में मदद करता है।'
);
blogContent = blogContent.replace(
  'સગર્ભા માતાઓએ કઠોર, અનિયમિત, મોટા ઔદ્યોગિક ઘોંઘાટ, હેવી મેટલ મ્યુઝિક અથવા 85 ડેસિબલથી વધુના આક્રમક મૂવી સાઉન્ડટ્રેક્સના લાંબા સમય સુધી સંપર્કમાં રહેવાનું ટાળવું જોઈએ. તીવ્ર એકોસ્ટિક આંચકાથી ગર્ભમાં આશ્ચર્યજનક પ્રતિક્રિયાઓ, ગર્ભની મોટર પ્રવૃત્તિમાં અચાનક વધારો અને ક્ષણિક માતૃત્વ ટાકીકાર્ડિયા થઈ શકે છે.',
  'સગર્ભા માતાઓએ વધુ પડતા મોટા અવાજવાળા વાતાવરણ અથવા અચાનક મોટા અવાજો (જેમ કે મોટો ઔદ્યોગિક ઘોંઘાટ અથવા મોટા સ્પીકર્સ) ના લાંબા સંપર્કથી બચવું જોઈએ. શાંત અને સુખદ વાતાવરણ માતાને આરામદાયક અને ચિંતામુક્ત રાખવામાં મદદ કરે છે.'
);

blogContent = blogContent.replace(
  '"You do not need formal knowledge of musicology. The therapeutic benefit arises from the melodic frequencies, harmonic resonance, and the emotional calm it creates within your mind and nervous system."',
  '"You do not need formal knowledge of musicology. The primary benefit comes from the calming melody and the soothing emotional relaxation it provides to the mother."'
);
blogContent = blogContent.replace(
  '"आपको संगीतशास्त्र के औपचारिक ज्ञान की आवश्यकता नहीं है। चिकित्सीय लाभ मधुर आवृत्तियों, हार्मोनिक अनुनाद और आपके दिमाग और तंत्रिका तंत्र के भीतर पैदा होने वाली भावनात्मक शांति से उत्पन्न होता है।',
  '"आपको संगीत शास्त्र के औपचारिक ज्ञान की आवश्यकता नहीं है। इसका मुख्य लाभ इसके शांत संगीत और उससे मिलने वाले भावनात्मक सुकून से प्राप्त होता है।'
);
blogContent = blogContent.replace(
  '"તમારે સંગીતશાસ્ત્રના ઔપચારિક જ્ઞાનની જરૂર નથી. રોગનિવારક લાભ મધુર ફ્રીક્વન્સીઝ, હાર્મોનિક રેઝોનન્સ અને તે તમારા મન અને ચેતાતંત્રમાં બનાવેલી ભાવનાત્મક શાંતિથી થાય છે.',
  '"તમારે સંગીત શાસ્ત્રના ઔપચારિક જ્ઞાનની જરૂર નથી. તેનો મુખ્ય ફાયદો તેના શાંત સંગીત અને તેનાથી મળતા ભાવનાત્મક આરામમાંથી મળે છે.'
);

blogContent = blogContent.replace(
  '"Yes! Lower frequency male voices penetrate amniotic fluid with great clarity. When the father speaks, sings, or recites mantras close to the mother\'s abdomen, the baby recognizes his vocal signature, creating early paternal bonding."',
  '"Yes! Partners can speak, read, or sing near the mother\'s abdomen as part of emotional bonding and shared pregnancy routines. Hearing familiar voices helps foster early emotional closeness and family connection."'
);
blogContent = blogContent.replace(
  '"हाँ! कम आवृत्ति वाली पुरुष आवाजें बड़ी स्पष्टता के साथ एमनियोटिक द्रव में प्रवेश करती हैं। जब पिता मां के पेट के करीब बोलता है, गाता है या मंत्र पढ़ता है, तो बच्चा उसके मुखर हस्ताक्षर को पहचानता है, जिससे प्रारंभिक पितृ संबंध बनता है।',
  '"हाँ! माता-पिता दोनों की भागीदारी और भावनात्मक जुड़ाव के लिए साथी माँ के पास बैठकर बात कर सकते हैं, पढ़ सकते हैं या गा सकते हैं। परिचित आवाज़ें सुनना परिवार में स्नेह और अपनेपन को बढ़ावा देता है।'
);
blogContent = blogContent.replace(
  '"હા! નિમ્ન આવર્તન પુરૂષ અવાજો એમ્નિઅટિક પ્રવાહીમાં ખૂબ સ્પષ્ટતા સાથે પ્રવેશ કરે છે. જ્યારે પિતા બોલે છે, ગાય છે અથવા માતાના ઉદરની નજીક મંત્રો પાઠ કરે છે, ત્યારે બાળક તેના અવાજની સહી ઓળખે છે, પ્રારંભિક પિતૃત્વ બંધન બનાવે છે.',
  '"હા! ભાવનાત્મક જોડાણ અને સગર્ભાવસ્થાની સહિયારી દિનચર્યાના ભાગરૂપે જીવનસાથી માતાની નજીક બોલી, વાંચી અથવા ગાઈ શકે છે. પરિચિત અવાજો સાંભળવાથી પ્રારંભિક સ્નેહ અને પારિવારિક આત્મીયતા વધે છે.'
);

// Post #4 updates
blogContent = blogContent.replace(
  '• Hormonal Harmony & Smooth Pregnancy Progression: Calming practices stimulate natural oxytocin and endorphin secretion, easing common physical discomforts.',
  '• Emotional Wellbeing & Physical Comfort: Gentle relaxation techniques help ease everyday stress, promoting maternal rest and emotional balance.'
);
blogContent = blogContent.replace(
  '• हार्मोनल सामंजस्य और सहज गर्भावस्था प्रगति: शांत करने वाली प्रथाएं प्राकृतिक ऑक्सीटोसिन और एंडोर्फिन स्राव को उत्तेजित करती हैं, जिससे सामान्य शारीरिक असुविधाएं कम हो जाती हैं।',
  '• भावनात्मक कल्याण और शारीरिक आराम: सौम्य विश्राम तकनीकें दैनिक तनाव को कम करने, विश्राम और भावनात्मक संतुलन को बढ़ावा देने में मदद करती हैं।'
);
blogContent = blogContent.replace(
  '• આંતરસ્ત્રાવીય સંવાદિતા અને સગર્ભાવસ્થાની સરળ પ્રગતિ: શાંત કરવાની પદ્ધતિઓ કુદરતી ઓક્સીટોસિન અને એન્ડોર્ફિન સ્ત્રાવને ઉત્તેજિત કરે છે, સામાન્ય શારીરિક અગવડતાઓને સરળ બનાવે છે.',
  '• ભાવનાત્મક સુખાકારી અને શારીરિક આરામ: સૌમ્ય આરામ તકનીકો રોજિંદા તણાવને હળવો કરવામાં મદદ કરે છે, જે માતાને આરામ અને ભાવનાત્મક સંતુલન પ્રદાન કરે છે.'
);

// Post #6 updates
blogContent = blogContent.replace(
  `        "heading": {
          "en": "The Neurological and Psychological Science Behind the Ritual",
          "hi": "अनुष्ठान के पीछे तंत्रिका विज्ञान और मनोवैज्ञानिक विज्ञान",
          "gu": "ધાર્મિક વિધિ પાછળ ન્યુરોલોજીકલ અને મનોવૈજ્ઞાનિક વિજ્ઞાન"
        },
        "paragraphs": {
          "en": [
            "By the seventh month of gestation, the fetal sensory system and brain cortex have developed advanced cognitive processing. Fetal memories, sensory reactions, and emotional attunement are at their highest prenatal peak. Ayurveda notes that during this period, the baby experiences 'Dauhrida' (the desires of two hearts—mother and child).",
            "Surrounding the expectant mother with joyous family music, fragrant flowers, sweet satvik delicacies, divine chanting, and loving blessings floods her bloodstream with oxytocin and endorphins. This emotional shielding relieves the anxieties of late-stage pregnancy and instills deep psychological confidence for impending labor."
          ],
          "hi": [
            "गर्भधारण के सातवें महीने तक, भ्रूण की संवेदी प्रणाली और मस्तिष्क कॉर्टेक्स ने उन्नत संज्ञानात्मक प्रसंस्करण विकसित कर लिया है। भ्रूण की यादें, संवेदी प्रतिक्रियाएं और भावनात्मक सामंजस्य जन्मपूर्व अपने उच्चतम शिखर पर होते हैं। आयुर्वेद बताता है कि इस अवधि के दौरान, शिशु को 'दौहृदा' (दो दिलों की इच्छाएँ - माँ और बच्चे) का अनुभव होता है।",
            "भावी माँ को आनंदपूर्ण पारिवारिक संगीत, सुगंधित फूल, मीठे सात्विक व्यंजन, दिव्य मंत्रोच्चार और प्रेमपूर्ण आशीर्वाद से घेरने से उसके रक्तप्रवाह में ऑक्सीटोसिन और एंडोर्फिन की बाढ़ आ जाती है। यह भावनात्मक सुरक्षा देर से गर्भावस्था की चिंताओं से राहत देती है और आसन्न प्रसव के लिए गहरा मनोवैज्ञानिक आत्मविश्वास पैदा करती है।"
          ],
          "gu": [
            "સગર્ભાવસ્થાના સાતમા મહિના સુધીમાં, ગર્ભ સંવેદનાત્મક પ્રણાલી અને મગજ કોર્ટેક્સે અદ્યતન જ્ઞાનાત્મક પ્રક્રિયા વિકસાવી છે. ગર્ભની સ્મૃતિઓ, સંવેદનાત્મક પ્રતિક્રિયાઓ અને ભાવનાત્મક સંવર્ધન તેમના સર્વોચ્ચ પ્રિનેટલ શિખર પર છે. આયુર્વેદ નોંધે છે કે આ સમયગાળા દરમિયાન, બાળક 'દૌહરિદા' (બે હૃદયની ઈચ્છાઓ-માતા અને બાળક) અનુભવે છે.",
            "આનંદી કૌટુંબિક સંગીત, સુગંધિત ફૂલો, મધુર સાત્વિક વાનગીઓ, દૈવી મંત્રોચ્ચાર અને પ્રેમાળ આશીર્વાદો સાથે ગર્ભવતી માતાને ઘેરીને તેના લોહીના પ્રવાહમાં ઓક્સીટોસિન અને એન્ડોર્ફિન્સ ભરાય છે. આ ભાવનાત્મક કવચ ગર્ભાવસ્થાના અંતના તબક્કાની ચિંતાઓથી રાહત આપે છે અને તોળાઈ રહેલા શ્રમ માટે ઊંડો મનોવૈજ્ઞાનિક આત્મવિશ્વાસ સ્થાપિત કરે છે."
          ]
        }`,
  `        "heading": {
          "en": "Psychological and Cultural Significance of the Ritual",
          "hi": "अनुष्ठान का मनोवैज्ञानिक और सांस्कृतिक महत्व",
          "gu": "ધાર્મિક વિધિનું મનોવૈજ્ઞાનિક અને સાંસ્કૃતિક મહત્વ"
        },
        "paragraphs": {
          "en": [
            "By the third trimester, emotional and psychological support becomes vital for the expectant mother. Classical Ayurvedic literature, such as the Kashyapa Samhita, describes this stage as 'Dauhrida' (the period honoring the emotional state and wishes of the expectant mother).",
            "Surrounding the mother with supportive family, uplifting traditional music, fragrant flowers, nourishing food, and caring blessings helps relieve late-pregnancy anxieties and fosters emotional calm and reassurance as she approaches childbirth."
          ],
          "hi": [
            "तीसरी तिमाही तक, भावी माँ के लिए भावनात्मक और मनोवैज्ञानिक समर्थन महत्वपूर्ण हो जाता है। कश्यप संहिता जैसे शास्त्रीय आयुर्वेदिक साहित्य में इस अवस्था को 'दौहृद' (गर्भवती माँ की भावनात्मक स्थिति और इच्छाओं का सम्मान करने की अवधि) के रूप में वर्णित किया गया है।",
            "माँ को सहायक परिवार, उत्थानकारी पारंपरिक संगीत, सुगंधित फूलों, पौष्टिक भोजन और स्नेहपूर्ण आशीर्वाद से घेरने से गर्भावस्था के अंतिम चरण की चिंताओं को कम करने में मदद मिलती है और प्रसव के निकट आने पर भावनात्मक शांति व संबल मिलता है।"
          ],
          "gu": [
            "ત્રીજા ત્રિમાસિક સુધીમાં, સગર્ભા માતા માટે ભાવનાત્મક અને મનોવૈજ્ઞાનિક સમર્થન અત્યંત મહત્વપૂર્ણ બની જાય છે. કાશ્યપ સંહિતા જેવા શાસ્ત્રીય આયુર્વેદિક સાહિત્યમાં આ તબક્કાને 'દૌહૃદ' (સગર્ભા માતાની ભાવનાત્મક સ્થિતિ અને ઇચ્છાઓનું સન્માન કરવાનો સમય) તરીકે વર્ણવવામાં આવ્યો છે.",
            "માતાને પ્રેમાળ પરિવાર, ઉત્સાહપૂર્ણ પરંપરાગત સંગીત, સુગંધિત ફૂલો, પૌષ્ટિક આહાર અને કાળજીપૂર્વકના આશીર્વાદથી ઘેરી લેવાથી ગર્ભાવસ્થાના અંતિમ તબક્કાની ચિંતાઓ હળવી થાય છે અને સુવાવડ તરફ આગળ વધતાં ભાવનાત્મક શાંતિ અને આત્મવિશ્વાસ મળે છે."
          ]
        }`
);

// Post #8 keyword update
blogContent = blogContent.replace('cortisol pregnancy baby', 'stress relief pregnancy tips');

// Post #9 updates
blogContent = blogContent.replace(
  '"en": "A curated guide on positive reading, inspiring biographies, spiritual scriptures, and children\'s fables that cultivate virtues, courage, and intelligence in your baby."',
  '"en": "A curated guide on uplifting reading, inspiring biographies, cultural literature, and gentle bedtime stories that promote maternal peace and enjoyable family reading routines."'
);
blogContent = blogContent.replace(
  '"hi": "सकारात्मक विचार, प्रेरणादायक जीवनियाँ और आध्यात्मिक साहित्य जो गर्भस्थ शिशु में संस्कार और बुद्धिमत्ता का संचार करते हैं।"',
  '"hi": "सकारात्मक पठन, प्रेरक जीवनियाँ और सांस्कृतिक साहित्य जो माँ को मानसिक शांति और परिवार को आनंददायक पठन दिनचर्या प्रदान करते हैं।"'
);
blogContent = blogContent.replace(
  '"gu": "સકારાત્મક વિચારો અને આધ્યાત્મિક સાહિત્ય જે ગર્ભસ્થ બાળકમાં સંસ્કાર અને બુદ્ધિમત્તાનું સિંચન કરે છે."',
  '"gu": "પ્રેરણાદાયી જીવનચરિત્રો, સાંસ્કૃતિક સાહિત્ય અને વાર્તાઓ જે માતાને માનસિક શાંતિ અને પરિવારે વાંચનની સુંદર આદત આપે છે."'
);

blogContent = blogContent.replace(
  '"en": "Make it a daily practice for both mother and father to read a short 10-minute story aloud to the baby every evening. The baby learns to identify the distinct vocal cadences of both parents, building advanced auditory familiarity and linguistic receptivity before birth."',
  '"en": "Make it an enjoyable daily routine for parents to read a short story aloud together. Hearing parents\' voices regularly helps build comforting vocal familiarity and strengthens early family bonding."'
);
blogContent = blogContent.replace(
  '"hi": "माता और पिता दोनों के लिए यह दैनिक अभ्यास बनाएं कि वे हर शाम बच्चे को 10 मिनट की एक छोटी कहानी ज़ोर से सुनाएँ। बच्चा जन्म से पहले ही माता-पिता दोनों के अलग-अलग स्वर ताल को पहचानना सीखता है, जिससे उन्नत श्रवण परिचितता और भाषाई ग्रहणशीलता का निर्माण होता है।"',
  '"hi": "माता-पिता दोनों के लिए यह एक सुखद दैनिक आदत बनाएं कि वे साथ मिलकर एक छोटी कहानी पढ़ें। माता-पिता की आवाज़ सुनने से परिचितता बढ़ती है और पारिवारिक जुड़ाव मजबूत होता है।"'
);
blogContent = blogContent.replace(
  '"gu": "દરરોજ સાંજે બાળકને 10-મિનિટની ટૂંકી વાર્તા મોટેથી વાંચવાની માતા અને પિતા બંને માટે દરરોજની પ્રેક્ટિસ બનાવો. બાળક જન્મ પહેલાં અદ્યતન શ્રાવ્ય પરિચય અને ભાષાકીય ગ્રહણશક્તિનું નિર્માણ કરીને માતાપિતા બંનેની અલગ-અલગ સ્વર કેડેન્સને ઓળખવાનું શીખે છે."',
  '"gu": "માતા-પિતા બંને માટે એક નાની વાર્તા સાથે વાંચવાની આ એક આનંદદાયક દૈનિક આદત બનાવો. માતાપિતાનો અવાજ સાંભળવાથી પારિવારિક સ્નેહ અને આત્મીયતા વધે છે."'
);

// Post #15 updates
blogContent = blogContent.replace(
  '• महीना 2: मीठी जड़ी-बूटियों से युक्त दूध (आयुर्वेदिक देखरेख में शतावरी या विदारी जैसी मधुर गण जड़ी-बूटियाँ)।',
  '• महीना 2: शास्त्रीय ग्रंथों में ऐतिहासिक रूप से मधुर गण की जड़ी-बूटियों के साथ दूध का उल्लेख मिलता है (यह केवल पारंपरिक जानकारी है; आधुनिक माताओं को किसी भी जड़ी-बूटी के सेवन से पहले अपने डॉक्टर से सलाह लेनी चाहिए)।'
);
blogContent = blogContent.replace(
  '• મહિનો 2: મીઠી જડીબુટ્ટીઓ (મધુરા ગણ ઔષધિઓ જેમ કે શતાવરી અથવા વિદરી, આયુર્વેદિક દેખરેખ હેઠળ) સાથેનું દૂધ.',
  '• મહિનો 2: શાસ્ત્રીય ગ્રંથોમાં ઐતિહાસિક રીતે મધુર ગણની ઔષધિઓ સાથે દૂધનું વર્ણન છે (આ માત્ર પરંપરાગત સંદર્ભ છે; સગર્ભા માતાઓએ કોઈપણ ઔષધિ લેતા પહેલા પોતાના ડૉક્ટરની સલાહ લેવી જોઈએ).'
);

blogContent = blogContent.replace(
  '• Month 9: Unctuous, easily digestible satvik meals, warm oil pelvic application (Abhyanga), preparing birth canal for smooth labor.',
  '• Month 9: Easily digestible nourishing meals and gentle physical rest to support maternal comfort and labor readiness.'
);
blogContent = blogContent.replace(
  '• महीना 9: सादा, आसानी से पचने वाला सात्विक भोजन, पेल्विक में गर्म तेल लगाना (अभ्यंग), सुचारू प्रसव के लिए जन्म नहर तैयार करना।',
  '• महीना 9: आसानी से पचने वाला पौष्टिक सात्विक भोजन और शारीरिक आराम, जो माँ के स्वास्थ्य और प्रसव की तैयारी में सहायक हो।'
);
blogContent = blogContent.replace(
  '• 9 મહિનો: અસ્પષ્ટ, સરળતાથી સુપાચ્ય સાત્વિક ભોજન, ગરમ તેલ પેલ્વિક એપ્લીકેશન (અભ્યંગ), સરળ પ્રસૂતિ માટે જન્મ નહેર તૈયાર કરવી.',
  '• મહિનો 9: સરળતાથી પચતો પૌષ્ટિક સાત્વિક આહાર અને પૂરતો શારીરિક આરામ, જે માતાની સુખાકારી અને પ્રસૂતિની તૈયારીમાં મદદરૂપ બને.'
);

// Post #21 updates
blogContent = blogContent.replace(
  'Guided Prenatal Yoga Nidra: Rejuvenating Cellular Energy',
  'Guided Prenatal Yoga Nidra: Mindful Rest & Relaxation'
);
blogContent = blogContent.replace(
  'निर्देशित प्रसव पूर्व योग निद्रा: सेलुलर ऊर्जा का कायाकल्प',
  'निर्देशित प्रसव पूर्व योग निद्रा: मानसिक विश्राम और शांति'
);
blogContent = blogContent.replace(
  'માર્ગદર્શિત પ્રિનેટલ યોગ નિદ્રા: સેલ્યુલર એનર્જીનું પુનર્જીવન',
  'માર્ગદર્શિત પ્રિનેટલ યોગ નિદ્રા: માનસિક વિશ્રામ અને શાંતિ'
);

blogContent = blogContent.replace(
  '"en": "Yes. While the left side is optimal for maximum blood flow, shifting to the right side periodically to relieve hip pressure is perfectly safe."',
  '"en": "Yes. While sleeping on the side is generally recommended, shifting to the right side periodically to relieve hip pressure is completely normal and safe."'
);
blogContent = blogContent.replace(
  '"hi": "हाँ। जबकि बाईं ओर अधिकतम रक्त प्रवाह के लिए इष्टतम है, कूल्हे के दबाव को राहत देने के लिए समय-समय पर दाईं ओर जाना पूरी तरह से सुरक्षित है।',
  '"hi": "हाँ। हालांकि करवट लेकर सोने की सलाह दी जाती है, कूल्हे के दबाव को कम करने के लिए समय-समय पर दाईं ओर करवट बदलना पूरी तरह से सामान्य और सुरक्षित है।'
);
blogContent = blogContent.replace(
  '"gu": "હા. જ્યારે ડાબી બાજુ મહત્તમ રક્ત પ્રવાહ માટે શ્રેષ્ઠ છે, હિપ દબાણને દૂર કરવા માટે સમયાંતરે જમણી બાજુ ખસેડવું સંપૂર્ણપણે સલામત છે.',
  '"gu": "હા. જો કે પડખે સૂવાની સામાન્ય ભલામણ કરવામાં આવે છે, થાપાના દબાણને હળવું કરવા માટે સમયાંતરે જમણી બાજુ વળવું સંપૂર્ણપણે સામાન્ય અને સુરક્ષિત છે.'
);

// Post #23 updates
blogContent = blogContent.replace(
  '"en": "A complete step-by-step preparation guide for natural normal delivery: essential pelvic floor stretches (Malasana, Butterfly pose), perineal massage techniques from week 34, labor breathing, and cervical softening diet."',
  '"en": "A complete step-by-step preparation guide for labor readiness: essential pelvic mobility stretches (Malasana, Butterfly pose), perineal massage techniques from week 34, labor breathing, and third-trimester nourishment."'
);
blogContent = blogContent.replace(
  'date fruit labor cervical dilation',
  'third trimester nourishment'
);

// Post #25 updates
blogContent = blogContent.replace(
  'Applying firm, circular thumb pressure for 2 to 3 minutes on each wrist provides clinically proven relief from acute nausea.',
  'Applying gentle, circular thumb pressure for 2 to 3 minutes on each wrist may help relieve mild pregnancy nausea in some women.'
);
blogContent = blogContent.replace(
  'Cochrane reviews confirm that small culinary doses of fresh ginger significantly curb nausea without side effects.',
  'Systematic reviews (such as Matthews et al., Cochrane 2015) indicate that small culinary amounts of fresh ginger can help reduce nausea symptoms in early pregnancy.'
);

// Post #28 updates
blogContent = blogContent.replace(
  'provides 100% of their fluid, caloric, and immunoglobin requirements before mature milk arrives on day 3 or 4.',
  'provides sufficient fluid and concentrated immunoglobulins to meet the newborn\'s initial needs before mature milk arrives on day 3 to 5.'
);

fs.writeFileSync(blogPath, blogContent, 'utf-8');
console.log('Updated blogPosts.js successfully');
