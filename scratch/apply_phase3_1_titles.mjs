import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogPostsFile = path.resolve(__dirname, '../src/data/blogPosts.js');

let content = fs.readFileSync(blogPostsFile, 'utf8');

// 1. Article 2
content = content.replace(
  `    "title": {\n      "en": "Music Therapy & Classical Indian Ragas During Pregnancy: Sound Science for Womb Wellness",\n      "hi": "गर्भावस्था में संगीत चिकित्सा एवं शास्त्रीय भारतीय राग: गर्भस्थ शिशु के लिए नाद योग",\n      "gu": "ગર્ભાવસ્થામાં સંગીત ચિકિત્સા અને શાસ્ત્રીય ભારતીય રાગો: ગર્ભસ્થ શિશુ માટે નાદ યોગ"\n    },`,
  `    "title": {\n      "en": "Music & Classical Indian Ragas During Pregnancy: Relaxation and Traditional Garbh Sanskar",\n      "hi": "गर्भावस्था में संगीत एवं शास्त्रीय भारतीय राग: मानसिक शांति एवं पारंपरिक गर्भ संस्कार",\n      "gu": "ગર્ભાવસ્થામાં સંગીત અને શાસ્ત્રીય ભારતીય રાગો: માનસિક શાંતિ અને પરંપરાગત ગર્ભ સંસ્કાર"\n    },`
);

// 2. Article 7
content = content.replace(
  `    "title": {\n      "en": "Meditation and Mantra Chanting During Pregnancy: Scientific Benefits for Fetal Mind",\n      "hi": "गर्भावस्था में ध्यान एवं मंत्र जप: गर्भस्थ शिशु के मानसिक विकास के लिए वैज्ञानिक लाभ",\n      "gu": "ગર્ભાવસ્થામાં ધ્યાન અને મંત્ર જાપ: ગર્ભસ્થ બાળકના માનસિક વિકાસ માટે વૈજ્ઞાનિક ફાયદા"\n    },`,
  `    "title": {\n      "en": "Meditation & Mantra Chanting During Pregnancy: Calm, Focus & Traditional Garbh Sanskar",\n      "hi": "गर्भावस्था में ध्यान एवं मंत्र जप: मानसिक शांति, एकाग्रता एवं वैदिक परंपरा",\n      "gu": "ગર્ભાવસ્થામાં ધ્યાન અને મંત્ર જાપ: માનસિક શાંતિ, એકાગ્રતા અને વૈદિક પરંપરા"\n    },`
);

// 3. Article 11
content = content.replace(
  `    "title": {\n      "en": "Gentle Pregnancy Yoga Breathing (Pranayama) for Labor Calm & Oxygenation",\n      "hi": "गर्भावस्था में सुरक्षित प्राणायाम: प्रसव शांति, ऑक्सीजन और तनाव मुक्ति के लिए श्वास अभ्यास",\n      "gu": "ગર્ભાવસ્થામાં સુરક્ષિત પ્રાણાયામ: માનસિક શાંતિ, ઓક્સિજન અને શ્વાસની કસરતો"\n    },\n    "description": {\n      "en": "Master safe, pregnancy-appropriate pranayama techniques that optimize maternal oxygenation, soothe gestational tension, and build rhythmic breathing endurance without breath retention.",`,
  `    "title": {\n      "en": "Gentle Pregnancy Breathing (Pranayama): Relaxation, Comfort & Safe Practice",\n      "hi": "गर्भावस्था में सुरक्षित प्राणायाम: मानसिक शांति, आरामदायक श्वास और सुरक्षित अभ्यास",\n      "gu": "ગર્ભાવસ્થામાં સુરક્ષિત પ્રાણાયામ: માનસિક શાંતિ, આરામદાયક શ્વાસ અને સુરક્ષિત અભ્યાસ"\n    },\n    "description": {\n      "en": "Master safe, pregnancy-appropriate pranayama techniques that support calm breathing, soothe gestational tension, and build rhythmic breathing endurance without breath retention.",`
);

// 4. Article 15
content = content.replace(
  `    "title": {\n      "en": "Garbhini Paricharya: Classical Month-by-Month Ayurvedic Regimen for Expectant Mothers",\n      "hi": "गर्भिणी परिचर्या: आयुर्वेद अनुसार माहवार गर्भावस्था देखभाल एवं स्वास्थ्य नियम",\n      "gu": "ગર્ભિણી પરિચર્યા: આયુર્વેદ મુજબ મહિને-મહિને ગર્ભાવસ્થા કાળજી અને આહાર"\n    },\n    "description": {\n      "en": "An in-depth exploration of the classical Ayurvedic antenatal protocol (Garbhini Paricharya) from the 1st to 9th month as codified by Maharishi Charaka, Sushruta, and Vagbhata.",`,
  `    "title": {\n      "en": "Garbhini Paricharya: Traditional Month-by-Month Ayurvedic Pregnancy Guidance",\n      "hi": "गर्भिणी परिचर्या: पारंपरिक माहवार आयुर्वेदिक गर्भावस्था मार्गदर्शन",\n      "gu": "ગર્ભિણી પરિચર્યા: પરંપરાગત મહિને-મહિને આયુર્વેદિક ગર્ભાવસ્થા માર્ગદર્શન"\n    },\n    "description": {\n      "en": "A classical and educational exploration of the traditional Ayurvedic antenatal principles (Garbhini Paricharya) from the 1st to 9th month as codified in classical Ayurvedic texts.",`
);

// 5. Article 16
content = content.replace(
  `    "title": {\n      "en": "Garbh Samvad: The Art and Science of Conscious Communication with Your Unborn Baby",\n      "hi": "गर्भ संवाद: गर्भस्थ शिशु से बातचीत की कला और वैज्ञानिक महत्व",\n      "gu": "ગર્ભ સંવાદ: ગર્ભસ્થ બાળક સાથે વાતચીત કરવાની કળા અને વૈજ્ઞાનિક મહત્વ"\n    },`,
  `    "title": {\n      "en": "Garbh Samvad: Traditional Practice & Conscious Communication with Your Unborn Baby",\n      "hi": "गर्भ संवाद: गर्भस्थ शिशु के साथ आत्मीय एवं पारंपरिक संवाद साधना",\n      "gu": "ગર્ભ સંવાદ: ગર્ભસ્થ બાળક સાથે આત્મીય અને પરંપરાગત સંવાદ સાધના"\n    },`
);

// 6. Article 23
content = content.replace(
  `    "title": {\n      "en": "Preparing for Normal Delivery: Pelvic Floor Exercises, Perineal Massage & Natural Labor Tips",\n      "hi": "सामान्य प्रसव (Normal Delivery) की तैयारी: पेल्विक फ्लोर व्यायाम, पेरिनियल मसाज और आहार",\n      "gu": "સામાન્ય પ્રસૂતિ (Normal Delivery) ની તૈયારી: પેલ્વિક કસરતો, પેરીનિયલ મસાજ અને આહાર"\n    },\n    "description": {\n      "en": "A complete step-by-step preparation guide for labor readiness: essential pelvic mobility stretches (Malasana, Butterfly pose), perineal massage techniques from week 34, labor breathing, and third-trimester nourishment.",\n      "hi": "प्राकृतिक एवं सामान्य प्रसव की तैयारी के वैज्ञानिक व वैदिक उपाय: तितली आसन, मलासन, 34वें सप्ताह से पेरिनियल मसाज, खजूर का सेवन और लेबर ब्रीदिंग तकनीक।",\n      "gu": "સામાન્ય પ્રસૂતિ માટે સંપૂર્ણ તૈયારી: બટરફ્લાય આસન, માલાસન, ૩૪મા અઠવાડિયાથી પેરીનિયલ મસાજ અને શ્વાસ લેવાની સાચી પદ્ધતિ."\n    },\n    "keywords": "normal delivery preparation tips, perineal massage pregnancy, pelvic floor exercises pregnancy, malasana for labor, third trimester nourishment, garbh sanskar normal delivery, natural childbirth tips",`,
  `    "title": {\n      "en": "Preparing for Labor: Pelvic Floor Exercises, Perineal Massage & Comfort Measures",\n      "hi": "प्रसव की तैयारी: पेल्विक फ्लोर व्यायाम, पेरिनियल मसाज और आरामदायक उपाय",\n      "gu": "પ્રસૂતિની તૈયારી: પેલ્વિક કસરતો, પેરીનિયલ મસાજ અને આરામદાયક પદ્ધતિઓ"\n    },\n    "description": {\n      "en": "A thoughtful preparation guide for labor comfort: gentle pelvic mobility stretches (Malasana, Butterfly pose), perineal massage techniques from week 34, labor breathing awareness, and third-trimester nourishment.",\n      "hi": "प्रसव की सहज तैयारी के लिए संतुलित उपाय: तितली आसन, मलासन, 34वें सप्ताह से पेरिनियल मसाज, सात्विक पोषण और आरामदायक श्वास तकनीक।",\n      "gu": "પ્રસૂતિની સહજ તૈયારી માટે સંતુલિત ઉપાયો: બટરફ્લાય આસન, માલાસન, ૩૪મા અઠવાડિયાથી પેરીનિયલ મસાજ અને આરામદાયક શ્વાસ પદ્ધતિ."\n    },\n    "keywords": "labor preparation tips, perineal massage pregnancy, pelvic floor exercises pregnancy, malasana for labor, third trimester nourishment, garbh sanskar labor comfort, childbirth preparation tips",`
);

fs.writeFileSync(blogPostsFile, content, 'utf8');
console.log('Successfully updated article titles and metadata in blogPosts.js');
