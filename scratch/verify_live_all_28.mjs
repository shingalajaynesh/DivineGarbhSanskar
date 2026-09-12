import fs from 'fs';

const BASE_URL = 'https://www.thedivinegarbhsanskar.com';

// Import local blog posts to get all slugs and expected metadata
import { blogPosts } from '../src/data/blogPosts.js';

async function verifyAllLivePosts() {
  console.log(`Starting live verification of all ${blogPosts.length} blog posts against ${BASE_URL}...`);
  const results = [];

  for (const post of blogPosts) {
    const url = `${BASE_URL}/blog/${post.slug}`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
      });
      const status = res.status;
      const html = await res.text();

      // Check Raw HTML words inside article / main content
      // Remove scripts and styles
      const cleaned = html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const words = cleaned ? cleaned.split(/\s+/).length : 0;

      // Extract title
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'N/A';

      // Extract canonical
      const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
      const canonical = canonicalMatch ? canonicalMatch[1].trim() : 'N/A';

      // Extract robots
      const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
      const robots = robotsMatch ? robotsMatch[1].trim() : 'N/A';

      // Check Article schema
      const hasArticleSchema = html.includes('"@type":"Article"') || html.includes('"@type": "Article"');
      const hasAuthor = html.includes('Dr. Taruna Jiyani');

      // Check references visible
      const hasReferences = html.includes('Sources &amp; Medical Evidence') || 
                            html.includes('Sources & Medical Evidence') || 
                            html.includes('References') ||
                            (post.references && post.references.length > 0 && html.includes(post.references[0].slice(0, 20)));

      const is200 = status === 200;
      const hasWords = words >= 400;
      const hasCorrectCanonical = canonical.includes(post.slug);
      const isIndexable = !robots.includes('noindex');

      const pass = is200 && hasWords && isIndexable && hasArticleSchema && hasAuthor;

      results.push({
        id: post.id,
        slug: post.slug,
        status,
        words,
        title,
        canonical,
        robots,
        hasArticleSchema,
        hasAuthor,
        hasReferences,
        pass
      });

      console.log(`[${post.id}/28] /blog/${post.slug} -> HTTP ${status} | ${words} words | Schema: ${hasArticleSchema} | Pass: ${pass}`);
    } catch (err) {
      console.error(`Error checking /blog/${post.slug}:`, err.message);
      results.push({
        id: post.id,
        slug: post.slug,
        status: 'ERROR',
        words: 0,
        pass: false,
        error: err.message
      });
    }
  }

  fs.writeFileSync('scratch/live_28_posts_verification.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('Saved verification results to scratch/live_28_posts_verification.json');
}

verifyAllLivePosts();
