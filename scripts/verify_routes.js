import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const testRoutes = [
  '/',
  '/authors',
  '/editorial-policy',
  '/disclaimer',
  '/blog',
  '/blog/gestational-diabetes-diet-and-ayurvedic-lifestyle',
  '/blog/safe-herbs-and-ayurvedic-spices-during-pregnancy',
  '/blog/anemia-prevention-iron-rich-indian-pregnancy-foods',
  '/blog/normal-delivery-preparation-pelvic-exercises-and-diet'
];

let allPassed = true;

testRoutes.forEach(r => {
  let filePath = r === '/' ? path.join(distDir, 'index.html') : path.join(distDir, r.replace(/^\//, '') + '.html');
  let folderIndexPath = r === '/' ? path.join(distDir, 'index.html') : path.join(distDir, r.replace(/^\//, ''), 'index.html');

  if (!fs.existsSync(filePath)) {
    console.error('FAIL: Missing static file:', filePath);
    allPassed = false;
    return;
  }
  if (!fs.existsSync(folderIndexPath)) {
    console.error('FAIL: Missing folder index file:', folderIndexPath);
    allPassed = false;
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  const rootContentMatch = html.match(/<div id="root">([\s\S]*?)<\/div>/i);
  const rootContentLength = rootContentMatch ? rootContentMatch[1].trim().length : 0;
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';
  const hasJsonLd = html.includes('application/ld+json');

  console.log(`Route: ${r}`);
  console.log(`  Title: ${title}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  #root content length: ${rootContentLength} chars`);
  console.log(`  JSON-LD present: ${hasJsonLd}`);

  if (rootContentLength < 100 || !title || !canonical || !hasJsonLd) {
    console.error(`FAIL: Validation criteria not met for ${r}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n ALL 9 TESTED CORE ROUTES PASSED 100% CRAWLER & EEAT VALIDATION!');
} else {
  console.log('\n SOME ROUTES FAILED VALIDATION');
  process.exit(1);
}
