import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetIds = [2, 7, 11, 15, 23, 24];

const report = blogPosts
  .filter(p => targetIds.includes(p.id))
  .map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    keywords: p.keywords
  }));

console.log(JSON.stringify(report, null, 2));
