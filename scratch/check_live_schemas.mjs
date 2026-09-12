import fs from 'fs';

async function checkLiveSchemas() {
  const slugs = [
    'music-and-ragas-during-pregnancy',
    'pregnancy-meditation-and-mantra-benefits',
    'pregnancy-yoga-breathing-exercises',
    'ayurvedic-pregnancy-care-garbhini-paricharya',
    'garbh-samvad-communicating-with-unborn-baby',
    'normal-delivery-preparation-pelvic-exercises-and-diet'
  ];

  for (const s of slugs) {
    const res = await fetch(`https://www.thedivinegarbhsanskar.com/blog/${s}?_t=${Date.now()}`);
    const html = await res.text();
    const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const articleMatch = matches.find(m => m[1].includes('"@type": "Article"'));
    let headline = 'NONE';
    if (articleMatch) {
      const parsed = JSON.parse(articleMatch[1]);
      headline = parsed.headline;
    }
    console.log(`[${s}] Live Schema Headline: ${headline}`);
  }
}

checkLiveSchemas();
