import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

async function runAudit() {
  console.log('--- Phase 3 Comprehensive Verification ---');
  
  // 1. Collect all HTML files in dist
  function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getHtmlFiles(fullPath, fileList);
      } else if (file.endsWith('.html')) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  const htmlFiles = getHtmlFiles(distDir);
  console.log(`Found ${htmlFiles.length} HTML files in dist/`);

  // 2. Audit Internal & External Links
  const internalLinks = new Set();
  const externalLinks = new Set();
  const linkIssues = [];
  const routeSchemas = {};

  const validRoutes = [
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
    '/cookie-policy',
    '/card'
  ];

  // Add all 28 blog routes to validRoutes
  const blogPostsFile = path.resolve(__dirname, '../src/data/blogPosts.js');
  const blogFileContent = fs.readFileSync(blogPostsFile, 'utf8');
  const slugMatches = [...blogFileContent.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);
  slugMatches.forEach(slug => validRoutes.push(`/blog/${slug}`));

  console.log(`Total valid local routes: ${validRoutes.length}`);

  for (const htmlPath of htmlFiles) {
    const relPath = path.relative(distDir, htmlPath).replace(/\\/g, '/');
    const content = fs.readFileSync(htmlPath, 'utf8');

    // Extract all hrefs
    const hrefMatches = [...content.matchAll(/href="([^"]+)"/g)].map(m => m[1]);

    for (const href of hrefMatches) {
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.match(/\.(jpg|jpeg|png|webp|svg|gif|ico|css|js|xml|txt|json)$/i)
      ) {
        continue;
      }

      if (href.startsWith('http://') || href.startsWith('https://')) {
        if (href.includes('thedivinegarbhsanskar.com')) {
          const urlObj = new URL(href);
          const pathname = urlObj.pathname.replace(/\/$/, '') || '/';
          internalLinks.add(pathname);
          if (!validRoutes.includes(pathname)) {
            linkIssues.push({
              source: relPath,
              destination: href,
              problem: `Internal absolute link points to unknown route: ${pathname}`,
              fix: 'Update or remove link'
            });
          }
        } else {
          externalLinks.add(href);
          if (href.startsWith('http://')) {
            linkIssues.push({
              source: relPath,
              destination: href,
              problem: 'HTTP external link (insecure)',
              fix: 'Upgrade to HTTPS'
            });
          }
        }
      } else if (href.startsWith('/')) {
        const pathname = href.replace(/\/$/, '') || '/';
        internalLinks.add(pathname);
        if (!validRoutes.includes(pathname)) {
          linkIssues.push({
            source: relPath,
            destination: href,
            problem: `Internal relative link points to unknown route: ${pathname}`,
            fix: 'Update or remove link'
          });
        }
      }
    }

    // Extract JSON-LD schemas
    const jsonLdMatches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const schemas = [];
    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        schemas.push(parsed['@type'] || (Array.isArray(parsed) ? 'Array' : 'Unknown'));
      } catch (e) {
        schemas.push('INVALID_JSON');
      }
    }
    routeSchemas[relPath] = schemas;
  }

  console.log(`Unique internal destinations checked: ${internalLinks.size}`);
  console.log(`Unique external links found: ${externalLinks.size}`);
  console.log(`Link issues count: ${linkIssues.length}`);

  // 3. Check live robots.txt, sitemap.xml, ads.txt
  console.log('\nChecking live endpoints via fetch...');
  const liveChecks = {};

  try {
    const adsTxtRes = await fetch('https://www.thedivinegarbhsanskar.com/ads.txt');
    const adsTxtBody = await adsTxtRes.text();
    liveChecks.adsTxt = {
      status: adsTxtRes.status,
      contentType: adsTxtRes.headers.get('content-type'),
      bodySnippet: adsTxtBody.trim(),
      hasCorrectPub: adsTxtBody.includes('pub-6303291083449043') && adsTxtBody.includes('f08c47fec0942fa0')
    };
  } catch (e) {
    liveChecks.adsTxt = { error: e.message };
  }

  try {
    const robotsRes = await fetch('https://www.thedivinegarbhsanskar.com/robots.txt');
    const robotsBody = await robotsRes.text();
    liveChecks.robotsTxt = {
      status: robotsRes.status,
      contentType: robotsRes.headers.get('content-type'),
      hasMediapartners: robotsBody.includes('Mediapartners-Google'),
      hasGooglebot: robotsBody.includes('Googlebot'),
      hasSitemap: robotsBody.includes('sitemap.xml')
    };
  } catch (e) {
    liveChecks.robotsTxt = { error: e.message };
  }

  try {
    const sitemapRes = await fetch('https://www.thedivinegarbhsanskar.com/sitemap.xml');
    const sitemapBody = await sitemapRes.text();
    const locMatches = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    liveChecks.sitemap = {
      status: sitemapRes.status,
      urlCount: locMatches.length,
      containsCard: sitemapBody.includes('/card'),
      urls: locMatches
    };
  } catch (e) {
    liveChecks.sitemap = { error: e.message };
  }

  // 4. Check Privacy Policy content for AdSense disclosures
  const privacyHtml = fs.readFileSync(path.join(distDir, 'privacy-policy/index.html'), 'utf8');
  const privacyPolicyAudit = {
    mentionsAdSense: privacyHtml.includes('AdSense') || privacyHtml.includes('Google AdSense'),
    mentionsCookies: privacyHtml.includes('cookie') || privacyHtml.includes('Cookies'),
    mentionsAnalytics: privacyHtml.includes('Analytics') || privacyHtml.includes('analytics'),
    mentionsUserChoices: privacyHtml.includes('opt-out') || privacyHtml.includes('choices') || privacyHtml.includes('consent')
  };

  const report = {
    totalHtmlFiles: htmlFiles.length,
    validRoutesCount: validRoutes.length,
    internalLinksCount: internalLinks.size,
    externalLinks: Array.from(externalLinks),
    linkIssues,
    liveChecks,
    privacyPolicyAudit,
    routeSchemasSample: {
      home: routeSchemas['index.html'],
      about: routeSchemas['about/index.html'],
      courses: routeSchemas['courses/index.html'],
      blog: routeSchemas['blog/index.html'],
      firstArticle: routeSchemas['blog/first-trimester-diet-guide/index.html']
    }
  };

  fs.writeFileSync(
    path.resolve(__dirname, 'phase3_audit_results.json'),
    JSON.stringify(report, null, 2),
    'utf8'
  );

  console.log('Phase 3 audit results written to scratch/phase3_audit_results.json');
}

runAudit();
