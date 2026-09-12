import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const searchTerms = [
  'scientific benefits',
  'fetal mind',
  'fetal brain',
  'brain stimulation',
  'normal delivery',
  'oxygenation',
  'cure',
  'prevention',
  'guaranteed',
  'therapeutic',
  'clinical',
  'detox',
  'hormone balance'
];

const matches = [];

blogPosts.forEach((post, index) => {
  const postMatches = [];

  const checkField = (fieldPath, value) => {
    if (!value) return;
    const str = typeof value === 'object' ? JSON.stringify(value).toLowerCase() : String(value).toLowerCase();
    for (const term of searchTerms) {
      if (str.includes(term)) {
        postMatches.push({
          term,
          field: fieldPath,
          snippet: typeof value === 'object' ? value : value
        });
      }
    }
  };

  checkField('title.en', post.title.en);
  checkField('title.hi', post.title.hi);
  checkField('title.gu', post.title.gu);
  checkField('description.en', post.description.en);
  checkField('description.hi', post.description.hi);
  checkField('description.gu', post.description.gu);
  checkField('keywords', post.keywords);

  if (postMatches.length > 0) {
    matches.push({
      id: post.id,
      slug: post.slug,
      postMatches
    });
  }
});

console.log(`Found ${matches.length} posts with matching search terms in titles/descriptions/keywords`);
fs.writeFileSync(path.resolve(__dirname, 'title_term_matches.json'), JSON.stringify(matches, null, 2), 'utf8');
