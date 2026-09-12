import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogPostsFile = path.resolve(__dirname, '../src/data/blogPosts.js');

let content = fs.readFileSync(blogPostsFile, 'utf8');

const oldArt7 = `"title": {
      "en": "Meditation and Mantra Chanting During Pregnancy: Scientific Benefits for Fetal Mind",
      "hi": "गर्भावस्था में ध्यान एवं मंत्र जप: गर्भस्थ शिशु के मानसिक विकास के वैज्ञानिक लाभ",
      "gu": "ગર્ભાવસ્થામાં ધ્યાન અને મંત્ર જાપ: ગર્ભસ્થ બાળકના માનસિક વિકાસ માટે વૈજ્ઞાનિક ફાયદા"
    },`;

const newArt7 = `"title": {
      "en": "Meditation & Mantra Chanting During Pregnancy: Calm, Focus & Traditional Garbh Sanskar",
      "hi": "गर्भावस्था में ध्यान एवं मंत्र जप: मानसिक शांति, एकाग्रता एवं वैदिक परंपरा",
      "gu": "ગર્ભાવસ્થામાં ધ્યાન અને મંત્ર જાપ: માનસિક શાંતિ, એકાગ્રતા અને વૈદિક પરંપરા"
    },`;

if (content.includes(oldArt7)) {
  content = content.replace(oldArt7, newArt7);
  fs.writeFileSync(blogPostsFile, content, 'utf8');
  console.log('Successfully updated Article 7');
} else {
  console.log('oldArt7 not found directly, searching with regex...');
  const reg = /"title":\s*\{\s*"en":\s*"Meditation and Mantra Chanting During Pregnancy: Scientific Benefits for Fetal Mind"[\s\S]*?"gu":\s*"ગર્ભાવસ્થામાં ધ્યાન અને મંત્ર જાપ:[^"]*"\s*\}/;
  content = content.replace(reg, `"title": {
      "en": "Meditation & Mantra Chanting During Pregnancy: Calm, Focus & Traditional Garbh Sanskar",
      "hi": "गर्भावस्था में ध्यान एवं मंत्र जप: मानसिक शांति, एकाग्रता एवं वैदिक परंपरा",
      "gu": "ગર્ભાવસ્થામાં ધ્યાન અને મંત્ર જાપ: માનસિક શાંતિ, એકાગ્રતા અને વૈદિક પરંપરા"
    }`);
  fs.writeFileSync(blogPostsFile, content, 'utf8');
  console.log('Regex replace finished for Article 7');
}
