import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/live_28_posts_verification.json', 'utf8'));

console.log('| Article | HTTP | Raw HTML words | Title | Canonical | Robots | Article schema | References visible | Status |');
console.log('| :--- | :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |');

for (const p of data) {
  const shortTitle = p.title.split('|')[0].trim().replace(/&amp;/g, '&');
  const canonicalOk = p.canonical.includes(p.slug) ? 'Matches URL' : 'Mismatch';
  const robotsOk = p.robots.includes('index') ? 'index, follow' : 'noindex';
  const schemaOk = p.hasArticleSchema && p.hasAuthor ? 'Valid (Dr. Taruna Jiyani)' : 'Invalid';
  const refsOk = p.hasReferences ? 'Visible' : 'None';
  const statusStr = p.pass ? '200 OK (Verified)' : 'FAILED';
  
  console.log(`| \`${p.slug}\` | ${p.status} | ${p.words} | ${shortTitle} | ${canonicalOk} | ${robotsOk} | ${schemaOk} | ${refsOk} | ${statusStr} |`);
}
