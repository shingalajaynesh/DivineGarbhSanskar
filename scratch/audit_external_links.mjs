import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkExternalLinks() {
  console.log('--- External Links & Citations Audit ---');

  const blogPostsFile = path.resolve(__dirname, '../src/data/blogPosts.js');
  const blogFileContent = fs.readFileSync(blogPostsFile, 'utf8');

  // Find all URLs in blogPosts.js
  const urlRegex = /https?:\/\/[^\s"',<>\]\)]+/g;
  const foundUrls = [...blogFileContent.matchAll(urlRegex)].map(m => m[0]);
  const uniqueUrls = [...new Set(foundUrls)];

  console.log(`Found ${uniqueUrls.length} unique external URLs in blogPosts.js:`);

  const results = [];
  for (const url of uniqueUrls) {
    const isHttp = url.startsWith('http://');
    let status = 'UNCHECKED';
    let reachable = false;
    let error = null;

    try {
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
      status = res.status;
      reachable = res.status < 400;
    } catch (e) {
      try {
        // Retry with GET if HEAD is disallowed
        const resGet = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
        status = resGet.status;
        reachable = resGet.status < 400;
      } catch (err2) {
        error = err2.message;
      }
    }

    results.push({
      url,
      isHttp,
      status,
      reachable,
      error
    });
  }

  fs.writeFileSync(path.resolve(__dirname, 'external_links_report.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log('Results written to scratch/external_links_report.json');
}

checkExternalLinks();
