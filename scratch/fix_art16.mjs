import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogPostsFile = path.resolve(__dirname, '../src/data/blogPosts.js');

let content = fs.readFileSync(blogPostsFile, 'utf8');

const oldArt16 = `"title": {
      "en": "Garbh Samvad: The Art and Science of Conscious Communication with Your Unborn Baby",
      "hi": "गर्भ संवाद: गर्भस्थ शिशु से बातचीत करने की कला और वैज्ञानिक रहस्य",
      "gu": "ગર્ભ સંવાદ: ગર્ભસ્થ બાળક સાથે વાતચીત કરવાની કળા અને વૈજ્ઞાનિક રહસ્ય"
    },`;

const newArt16 = `"title": {
      "en": "Garbh Samvad: Traditional Practice & Conscious Communication with Your Unborn Baby",
      "hi": "गर्भ संवाद: गर्भस्थ शिशु के साथ आत्मीय एवं पारंपरिक संवाद साधना",
      "gu": "ગર્ભ સંવાદ: ગર્ભસ્થ બાળક સાથે આત્મીય અને પરંપરાગત સંવાદ સાધના"
    },`;

if (content.includes(oldArt16)) {
  content = content.replace(oldArt16, newArt16);
  fs.writeFileSync(blogPostsFile, content, 'utf8');
  console.log('Successfully updated Article 16 title');
} else {
  console.log('Direct string match failed, trying regex...');
  const reg = /"title":\s*\{\s*"en":\s*"Garbh Samvad: The Art and Science of Conscious Communication with Your Unborn Baby"[\s\S]*?"gu":\s*"ગર્ભ સંવાદ:[^"]*"\s*\}/;
  content = content.replace(reg, newArt16.trim().replace(/,$/, ''));
  fs.writeFileSync(blogPostsFile, content, 'utf8');
  console.log('Regex replace finished for Article 16');
}
