import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyLive() {
  console.log('=== Verifying Live Production Website ===');
  const baseUrl = 'https://www.thedivinegarbhsanskar.com';
  const timestamp = Date.now();

  const results = {};

  // Helper to fetch live page
  async function fetchPage(pathUrl) {
    const url = `${baseUrl}${pathUrl}?_t=${timestamp}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
        'Cache-Control': 'no-cache'
      }
    });
    const html = await res.text();
    return {
      status: res.status,
      html
    };
  }

  // 1. Check Articles
  const articlesToCheck = [
    {
      id: 2,
      slug: 'music-and-ragas-during-pregnancy',
      expectedTitle: 'Music & Classical Indian Ragas During Pregnancy: Relaxation and Traditional Garbh Sanskar',
      forbiddenTitle: 'Sound Science for Womb Wellness'
    },
    {
      id: 7,
      slug: 'pregnancy-meditation-and-mantra-benefits',
      expectedTitle: 'Meditation & Mantra Chanting During Pregnancy: Calm, Focus & Traditional Garbh Sanskar',
      forbiddenTitle: 'Scientific Benefits for Fetal Mind'
    },
    {
      id: 11,
      slug: 'pregnancy-yoga-breathing-exercises',
      expectedTitle: 'Gentle Pregnancy Breathing (Pranayama): Relaxation, Comfort & Safe Practice',
      forbiddenTitle: 'Labor Calm & Oxygenation'
    },
    {
      id: 15,
      slug: 'ayurvedic-pregnancy-care-garbhini-paricharya',
      expectedTitle: 'Garbhini Paricharya: Traditional Month-by-Month Ayurvedic Pregnancy Guidance',
      forbiddenTitle: 'Classical Month-by-Month Ayurvedic Regimen'
    },
    {
      id: 16,
      slug: 'garbh-samvad-communicating-with-unborn-baby',
      expectedTitle: 'Garbh Samvad: Traditional Practice & Conscious Communication with Your Unborn Baby',
      forbiddenTitle: 'The Art and Science of Conscious Communication'
    },
    {
      id: 23,
      slug: 'normal-delivery-preparation-pelvic-exercises-and-diet',
      expectedTitle: 'Preparing for Labor: Pelvic Floor Exercises, Perineal Massage & Comfort Measures',
      forbiddenTitle: 'Preparing for Normal Delivery'
    }
  ];

  results.articles = [];
  for (const art of articlesToCheck) {
    const page = await fetchPage(`/blog/${art.slug}`);
    const titleMatch = page.html.match(/<title>([^<]+)<\/title>/);
    const liveTitle = titleMatch ? titleMatch[1] : 'NONE';
    const h1Match = page.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const liveH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE';
    const hasBreadcrumbs = page.html.includes('aria-label="Breadcrumb"') || page.html.includes('Home / Blog');
    const hasForbidden = page.html.includes(art.forbiddenTitle);

    results.articles.push({
      id: art.id,
      slug: art.slug,
      status: page.status,
      liveTitle,
      liveH1,
      hasBreadcrumbs,
      hasExpectedH1: liveH1.includes(art.expectedTitle) || liveTitle.includes(art.expectedTitle),
      hasForbiddenTerm: hasForbidden,
      pass: page.status === 200 && !hasForbidden
    });
  }

  // 2. Check Home Page navigation
  const home = await fetchPage('/');
  results.home = {
    status: home.status,
    hasAuthorsLink: home.html.includes('href="/authors"') || home.html.includes('authors'),
    hasFooterLegal: home.html.includes('privacy-policy') && home.html.includes('terms-of-service')
  };

  // 3. Check /card
  const card = await fetchPage('/card');
  results.card = {
    status: card.status,
    hasNoindex: card.html.includes('noindex')
  };

  // 4. Check Fake 404 URL
  const fake = await fetchPage('/non-existent-page-test-404');
  results.fake404 = {
    status: fake.status,
    is404: fake.status === 404
  };

  // 5. Check ads.txt
  const adsTxt = await fetchPage('/ads.txt');
  results.adsTxt = {
    status: adsTxt.status,
    snippet: adsTxt.html.trim(),
    isValid: adsTxt.html.includes('pub-6303291083449043') && adsTxt.html.includes('f08c47fec0942fa0')
  };

  // 6. Check robots.txt
  const robots = await fetchPage('/robots.txt');
  results.robots = {
    status: robots.status,
    hasMediapartners: robots.html.includes('Mediapartners-Google'),
    hasGooglebot: robots.html.includes('Googlebot'),
    hasSitemap: robots.html.includes('sitemap.xml')
  };

  // 7. Check sitemap.xml
  const sitemap = await fetchPage('/sitemap.xml');
  results.sitemap = {
    status: sitemap.status,
    containsCard: sitemap.html.includes('/card'),
    urlCount: (sitemap.html.match(/<loc>/g) || []).length
  };

  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync(path.resolve(__dirname, 'live_phase3_1_verification.json'), JSON.stringify(results, null, 2), 'utf8');
}

verifyLive();
