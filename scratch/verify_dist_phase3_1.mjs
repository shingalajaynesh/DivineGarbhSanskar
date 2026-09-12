import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const checks = {};

// 1. Check updated titles in dist
const checkTitle = (relPath) => {
  const filePath = path.join(distDir, relPath);
  if (!fs.existsSync(filePath)) return 'FILE_MISSING';
  const html = fs.readFileSync(filePath, 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  return {
    title: titleMatch ? titleMatch[1] : 'NONE',
    h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE'
  };
};

checks.article2 = checkTitle('blog/music-and-ragas-during-pregnancy/index.html');
checks.article7 = checkTitle('blog/pregnancy-meditation-and-mantra-benefits/index.html');
checks.article11 = checkTitle('blog/pregnancy-yoga-breathing-exercises/index.html');
checks.article15 = checkTitle('blog/ayurvedic-pregnancy-care-garbhini-paricharya/index.html');
checks.article16 = checkTitle('blog/garbh-samvad-communicating-with-unborn-baby/index.html');
checks.article23 = checkTitle('blog/normal-delivery-preparation-pelvic-exercises-and-diet/index.html');

// 2. Check /card noindex
const cardHtml = fs.readFileSync(path.join(distDir, 'card/index.html'), 'utf8');
checks.cardNoindex = cardHtml.includes('noindex') && cardHtml.includes('nofollow');

// 3. Check navbar authors link in index.html
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
checks.navbarAuthors = homeHtml.includes('href="/authors"');
checks.footerAuthors = homeHtml.includes('href="/authors"');

// 4. Check breadcrumbs in article 1
const art1Html = fs.readFileSync(path.join(distDir, 'blog/first-trimester-diet-guide/index.html'), 'utf8');
checks.articleBreadcrumbs = art1Html.includes('aria-label="Breadcrumb"');

console.log(JSON.stringify(checks, null, 2));
