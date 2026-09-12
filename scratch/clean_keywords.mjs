import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogPostsFile = path.resolve(__dirname, '../src/data/blogPosts.js');

let content = fs.readFileSync(blogPostsFile, 'utf8');

// Article 3 keywords
content = content.replace(
  `"prenatal yoga, yoga for normal delivery, safe pregnancy exercise, garbh sanskar yoga, pelvic floor exercises pregnancy, butterfly pose pregnancy, pregnancy stretching"`,
  `"prenatal yoga, prenatal yoga for pelvic health, safe pregnancy exercise, garbh sanskar yoga, pelvic floor exercises pregnancy, butterfly pose pregnancy, pregnancy stretching"`
);

// Article 14 keywords
content = content.replace(
  `"third trimester garbh sanskar, labor preparation yoga, normal delivery preparation, pregnancy 7th 8th 9th month guide, gentle birth mindset, late pregnancy diet"`,
  `"third trimester garbh sanskar, labor preparation yoga, labor readiness yoga, pregnancy 7th 8th 9th month guide, gentle birth mindset, late pregnancy diet"`
);

// Article 17 keywords
content = content.replace(
  `"sutika paricharya, postpartum recovery ayurveda, 40 days postpartum care, ayurvedic postpartum diet, lactation foods india, postpartum depression prevention, mother healing after delivery"`,
  `"sutika paricharya, postpartum recovery ayurveda, 40 days postpartum care, ayurvedic postpartum diet, lactation foods india, postpartum emotional support, mother healing after delivery"`
);

// Article 27 keywords
content = content.replace(
  `"twin pregnancy care tips, carrying twins diet chart, twin garbh sanskar, multiples pregnancy guide india, preterm labor prevention twins, twin baby kicks bonding"`,
  `"twin pregnancy care tips, carrying twins diet chart, twin garbh sanskar, multiples pregnancy guide india, preterm labor awareness twins, twin baby kicks bonding"`
);

fs.writeFileSync(blogPostsFile, content, 'utf8');
console.log('Successfully cleaned remaining keyword overstatements');
