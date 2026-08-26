import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../src/data/blogPosts.js');

let content = fs.readFileSync(filePath, 'utf8');

// 1. Update gestational diabetes yoga stimulation claim
content = content.replace(
  'Safe prenatal yoga postures such as Marjariasana (Cat-Cow pose), Baddha Konasana (Bound Angle pose), and gentle seated pelvic circles stimulate pancreatic function and enhance lower-body circulation without compressing the abdomen.',
  'Safe prenatal yoga postures such as Marjariasana (Cat-Cow pose), Baddha Konasana (Bound Angle pose), and gentle seated pelvic circles encourage lower-body circulation and pelvic mobility without abdominal strain. All exercises must be cleared with your treating obstetrician to safely complement your medical blood sugar care.'
);

content = content.replace(
  'सुरक्षित प्रसव पूर्व योग आसन जैसे कि मार्जरीआसन (कैट-काउ पोज़), बद्ध कोणासन (बाउंड एंगल पोज़), और कोमल बैठे हुए पेल्विक सर्कल अग्न्याशय के कार्य को उत्तेजित करते हैं और पेट पर दबाव डाले बिना निचले शरीर के परिसंचरण को बढ़ाते हैं।',
  'सुरक्षित प्रसव पूर्व योगासन जैसे मार्जरीआसन, बद्ध कोणासन और कोमल बैठे पेल्विक सर्कल पेट पर दबाव डाले बिना निचले शरीर के परिसंचरण और लचीलेपन को बढ़ावा देते हैं। किसी भी योगाभ्यास को शुरू करने से पहले अपने चिकित्सक की स्वीकृति अवश्य लें।'
);

content = content.replace(
  'સલામત પ્રસૂતિ પૂર્વેના યોગ મુદ્રાઓ જેમ કે માર્જારિયાસન (બિલાડી-ગાયની દંભ), બદ્ધ કોનાસન (બાઉન્ડ એન્ગલ પોઝ), અને હળવા બેઠેલા પેલ્વિક વર્તુળો સ્વાદુપિંડના કાર્યને ઉત્તેજીત કરે છે અને પેટને સંકુચિત કર્યા વિના શરીરના નીચેના ભાગમાં પરિભ્રમણને વધારે છે.',
  'સલામત પ્રિનેટલ યોગાસનો જેમ કે માર્જારિયાસન, બદ્ધ કોનાસન અને હળવી પેલ્વિક કસરતો પેટ પર દબાણ લાવ્યા વિના રક્ત પરિભ્રમણ અને લવચીકતા વધારે છે. કોઈપણ યોગાસન શરૂ કરતા પહેલા તમારા ડૉક્ટરની મંજૂરી મેળવવી જરૂરી છે.'
);

// 2. Update gestational diabetes stress / hormone claim
content = content.replace(
  'Practicing 15 minutes of daily Bhramari Pranayama (humming bee breath) and listening to soothing classical ragas activates the parasympathetic nervous system, naturally stabilizing hormonal balance.',
  'Practicing 15 minutes of daily Bhramari Pranayama (humming bee breath) and listening to soothing classical ragas activates the parasympathetic nervous system, promoting relaxation and helping manage maternal stress as a supportive lifestyle aid.'
);

content = content.replace(
  'प्रतिदिन 15 मिनट भ्रामरी प्राणायाम (गुनगुनाती सांस) का अभ्यास करने और सुखदायक शास्त्रीय रागों को सुनने से पैरासिम्पेथेटिक तंत्रिका तंत्र सक्रिय हो जाता है, जिससे स्वाभाविक रूप से हार्मोनल संतुलन स्थिर हो जाता है।',
  'प्रतिदिन 15 मिनट भ्रामरी प्राणायाम और सुखदायक शास्त्रीय संगीत सुनने से पैरासिम्पेथेटिक तंत्रिका तंत्र सक्रिय होता है, जिससे मानसिक शांति मिलती है और तनाव प्रबंधन में सहायता होती है।'
);

content = content.replace(
  'દરરોજ 15 મિનિટ ભ્રમરી પ્રાણાયામ (મધમાખીના શ્વાસમાં ગુંજારવો)નો અભ્યાસ કરવો અને શાંત શાસ્ત્રીય રાગો સાંભળવાથી પેરાસિમ્પેથેટિક નર્વસ સિસ્ટમ સક્રિય થાય છે, કુદરતી રીતે હોર્મોનલ સંતુલન સ્થિર થાય છે.',
  'દરરોજ 15 મિનિટ ભ્રમરી પ્રાણાયામ અને શાંત શાસ્ત્રીય સંગીત સાંભળવાથી પેરાસિમ્પેથેટિક નર્વસ સિસ્ટમ સક્રિય થાય છે, માનસિક શાંતિ મળે છે અને તણાવ ઘટે છે.'
);

// 3. Update CCF tea claims in safe herbs
content = content.replace(
  'Boil 1/2 teaspoon each of whole cumin seeds, whole coriander seeds, and fennel seeds in 3 cups of water for 5 minutes. Strain and sip warm throughout the day. This gentle classical preparation flushes urinary toxins, relieves water retention, and calms digestive fire.',
  'Simmer 1/2 teaspoon each of whole cumin seeds, whole coriander seeds, and fennel seeds in 3 cups of water for 5 minutes. Strain and sip warm. This traditional household preparation is widely used in Indian homes to support comfortable hydration and post-meal digestive ease; check with your doctor for individual suitability.'
);

content = content.replace(
  '1/2 चम्मच साबुत जीरा, साबुत धनिया और सौंफ को 3 कप पानी में 5 मिनट तक उबालें। छानकर पूरे दिन गर्म-गर्म घूंट-घूंट करके पियें। यह सौम्य शास्त्रीय तैयारी मूत्र विषाक्त पदार्थों को बाहर निकालती है, जल प्रतिधारण से राहत देती है और पाचन अग्नि को शांत करती है।',
  '1/2 चम्मच साबुत जीरा, धनिया और सौंफ को 3 कप पानी में 5 मिनट उबालें। छानकर हल्का गर्म पिएं। यह पारंपरिक पेय जलयोजन और पाचन में सहायता के लिए भारतीय घरों में प्रचलित है; अपनी स्थिति के अनुसार डॉक्टर से परामर्श लें।'
);

content = content.replace(
  '1/2 ચમચી આખા જીરું, આખા ધાણા અને વરિયાળીના બીજને 3 કપ પાણીમાં 5 મિનિટ માટે ઉકાળો. આખો દિવસ તાણ અને ચુસકીઓ ગરમ કરો. આ સૌમ્ય શાસ્ત્રીય તૈયારી પેશાબના ઝેરને ફ્લશ કરે છે, પાણીની જાળવણીમાં રાહત આપે છે અને પાચનની આગને શાંત કરે છે.',
  '૧/૨ ચમચી જીરું, આખા ધાણા અને વરિયાળીને ૩ કપ પાણીમાં ૫ મિનિટ ઉકાળીને ગાળી લો. આ પરંપરાગત ઘરગથ્થુ પીણું પાચન અને હાઇડ્રેશન માટે સહાયક છે; નિયમિત ઉપયોગ પહેલાં ડૉક્ટરની સલાહ લો.'
);

// 4. Update Saffron FAQ claim
content = content.replace(
  "A baby's skin complexion is determined entirely by parental genetics (melanin synthesis). However, saffron does provide genuine therapeutic benefits: improving maternal sleep, uplifting mood, supporting digestion, and lowering blood pressure.",
  "A baby's skin complexion is determined solely by parental genetics (melanin synthesis) and not by saffron. In moderate culinary amounts (2-3 strands in warm milk), saffron is enjoyed primarily for its comforting aroma, traditional soothing warmth, and pleasant culinary flavor."
);

content = content.replace(
  "एक बच्चे की त्वचा का रंग पूरी तरह से माता-पिता के आनुवंशिकी (मेलेनिन संश्लेषण) द्वारा निर्धारित होता है। हालाँकि, केसर वास्तविक चिकित्सीय लाभ प्रदान करता है: मातृ नींद में सुधार, मनोदशा में सुधार, पाचन में सहायता और रक्तचाप को कम करना।",
  "बच्चे की त्वचा का रंग पूरी तरह से माता-पिता के आनुवंशिकी (जींस) द्वारा निर्धारित होता है, केसर से नहीं। केसर का उपयोग संतुलित मात्रा में इसके सुखद स्वाद, सुगंध और पारंपरिक पोषण के लिए किया जाता है।"
);

content = content.replace(
  "બાળકની ત્વચાનો રંગ સંપૂર્ણપણે પેરેંટલ જિનેટિક્સ (મેલેનિન સિન્થેસિસ) દ્વારા નક્કી કરવામાં આવે છે. જો કે, કેસર સાચા ઉપચારાત્મક લાભો પૂરા પાડે છે: માતાની ઊંઘમાં સુધારો કરવો, મૂડમાં સુધારો કરવો, પાચનને ટેકો આપવો અને બ્લડ પ્રેશર ઘટાડવું.",
  "બાળકની ત્વચાનો રંગ સંપૂર્ણપણે માતાપિતાના જિનેટિક્સ પર આધાર રાખે છે, કેસર પર નહીં. કેસરનો ઉપયોગ મર્યાદિત માત્રામાં માત્ર સ્વાદ, સુગંધ અને પરંપરાગત પોષણ માટે થાય છે."
);

// 5. Update Perineal Tears mistranslation in normal delivery
content = content.replace(
  '"hi": "34वें सप्ताह से पेरिनियल मालिश: आंसुओं को रोकना"',
  '"hi": "34वें सप्ताह से पेरिनियल मालिश: ऊतકો કે લચીલેપન કી દેખભાલ"'
);

content = content.replace(
  '"gu": "34મા અઠવાડિયાથી પેરીનિયલ મસાજ: આંસુ અટકાવવા"',
  '"gu": "34મા અઠવાડિયાથી પેરીનિયલ મસાજ: પેશીઓની લવચીકતા અને સંભાળ"'
);

// 6. Normal delivery section 0 wording
content = content.replace(
  'Preparing your body during the third trimester through focused pelvic mobility, perineal tissue conditioning, rhythmic breath mastery, and mental confidence dramatically reduces labor duration, lowers perineal tearing risk, and supports a gentle vaginal birth.',
  'Preparing your body during the third trimester through focused pelvic mobility, gentle conditioning, rhythmic breath awareness, and mental calmness supports maternal fitness and builds confidence for labor. The final mode of delivery is always determined by your obstetric team based on maternal and fetal safety.'
);

content = content.replace(
  'तीसरी तिमाही के दौरान केंद्रित पेल्विक गतिशीलता, पेरिनियल टिश्यू कंडीशनिंग, लयबद्ध सांस की महारत और मानसिक आत्मविश्वास के माध्यम से अपने शरीर को तैयार करने से प्रसव की अवधि नाटकीय रूप से कम हो जाती है, पेरिनियल फटने का जोखिम कम हो जाता है, और सौम्य योनि जन्म में मदद मिलती है।',
  'तीसरी तिमाही में पेल्विक लचीलापन, कोमल व्यायाम, गहरी सांस लेने का अभ्यास और मानसिक आत्मविश्वास माता के शारीरिक स्वास्थ्य को सुदृढ़ बनाते हैं। प्रसव का अंतिम तरीका हमेशा माता और शिशु की सुरक्षा को देखते हुए आपके डॉक्टर द्वारा निर्धारित किया जाता है।'
);

content = content.replace(
  'ધ્યાન કેન્દ્રિત પેલ્વિક ગતિશીલતા, પેરીનિયલ ટીશ્યુ કન્ડીશનીંગ, લયબદ્ધ શ્વાસની નિપુણતા અને માનસિક આત્મવિશ્વાસ દ્વારા ત્રીજા ત્રિમાસિક દરમિયાન તમારા શરીરને તૈયાર કરવાથી શ્રમ સમયગાળો નાટ્યાત્મક રીતે ઘટાડે છે, પેરીનેલ ફાટી જવાનું જોખમ ઘટાડે છે અને હળવા યોનિમાર્ગના જન્મને ટેકો આપે છે.',
  'ત્રીજા ત્રિમાસિકમાં પેલ્વિક કસરતો, હળવા આસનો, શ્વાસની જાગૃતિ અને માનસિક શાંતિ માતાના શારીરિક સ્વાસ્થ્યને મજબૂત બનાવે છે. પ્રસૂતિનો પ્રકાર હંમેશા માતા અને બાળકની સુરક્ષા મુજબ ડૉક્ટર દ્વારા નક્કી થાય છે.'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated blogPosts.js with responsible, compliant wording.');
