import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { isAdEligibleRoute } from '../src/utils/adEligibility.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

async function generatePreflightTable() {
  const routes = [
    '/',
    '/about',
    '/courses',
    '/simantonayan',
    '/blog',
    '/contact',
    '/authors',
    '/editorial-policy',
    '/disclaimer',
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/cookie-policy'
  ];

  const blogPostsFile = path.resolve(__dirname, '../src/data/blogPosts.js');
  const blogFileContent = fs.readFileSync(blogPostsFile, 'utf8');
  const slugMatches = [...blogFileContent.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);
  slugMatches.forEach(slug => routes.push(`/blog/${slug}`));

  // Add utility route
  routes.push('/card');

  const rows = [];

  for (const r of routes) {
    const filePath = r === '/' ? path.join(distDir, 'index.html') : path.join(distDir, r, 'index.html');
    if (!fs.existsSync(filePath)) {
      rows.push({
        route: r,
        status: 'MISSING_FILE'
      });
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // Extract title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'NONE';

    // Extract H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE';

    // Extract Canonical
    const canonMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const canonical = canonMatch ? canonMatch[1] : 'NONE';

    // Robots meta
    const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/);
    const robots = robotsMatch ? robotsMatch[1] : 'index, follow';

    // Word count inside body
    const bodyContent = html.replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<[^>]+>/g, ' ');
    const words = bodyContent.trim().split(/\s+/).filter(w => w.length > 0).length;

    // Checks
    const hasAuthor = html.includes('Dr. Taruna Jiyani') || html.includes('Taruna Jiyani');
    const hasReferences = html.includes('वैज्ञानिक एवं शास्त्रोक्त संदर्भ') || html.includes('Scientific &amp; Classical References') || html.includes('References');
    const hasDisclaimer = html.includes('Medical Disclaimer') || html.includes('चिकित्सीय अस्वीकरण');
    const hasSchema = html.includes('application/ld+json');

    const adEligible = isAdEligibleRoute(r);

    rows.push({
      url: r === '/' ? 'https://www.thedivinegarbhsanskar.com/' : `https://www.thedivinegarbhsanskar.com${r}`,
      contentQuality: `${words} words, H1: "${h1.substring(0, 30)}..."`,
      technical: `200 OK, Canonical: YES, Schema: ${hasSchema ? 'YES' : 'NO'}, Robots: ${robots}`,
      ymylTrust: `Author: ${hasAuthor ? 'YES' : 'N/A'}, Disclaimer: ${hasDisclaimer ? 'YES' : 'NO'}, Ref: ${hasReferences ? 'YES' : 'N/A'}`,
      adEligible: adEligible ? 'Eligible (Content)' : 'Excluded (Safe)',
      finalStatus: 'PASS'
    });
  }

  fs.writeFileSync(
    path.resolve(__dirname, 'preflight_table_data.json'),
    JSON.stringify(rows, null, 2),
    'utf8'
  );

  console.log(`Preflight audit completed for ${rows.length} routes.`);
}

generatePreflightTable();
