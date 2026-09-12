import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';
import { seoConfig } from '../src/seo/seoConfig.js';
import { privacyPolicyData } from '../src/data/privacyPolicyData.js';
import { cookiePolicyData } from '../src/data/cookiePolicyData.js';
import { termsData } from '../src/data/termsData.js';
import { refundPolicyData } from '../src/data/refundPolicyData.js';
import { disclaimerData } from '../src/data/disclaimerData.js';
import { editorialPolicyData } from '../src/data/editorialPolicyData.js';
import { aboutData } from '../src/data/aboutData.js';
import { simantonayanData } from '../src/data/simantonayanData.js';
import { curriculum, courses } from '../src/data/coursesData.js';
import { authorsData } from '../src/data/authorsData.js';
import { testimonials } from '../src/data/testimonials.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Please run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const rawTemplate = fs.readFileSync(templatePath, 'utf8');

// Ensure baseTemplate has a clean empty <div id="root"></div> and empty <noscript></noscript>
// regardless of whether index.html was already prerendered in a previous build step.
const baseTemplate = rawTemplate
  .replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>')
  .replace(/<noscript>[\s\S]*?<\/noscript>/i, '<noscript></noscript>');

// Helper to escape HTML characters
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper to extract language text (defaulting to English/Hindi)
function getLangText(obj, lang = 'en') {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.en || obj.hi || obj.gu || '';
}

// HTML Generators for Core Pages
function generateHomeHtml() {
  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Divine Garbh Sanskar (दिव्य गर्भ संस्कार)</h1>
      <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Vedic Prenatal Science, Maternal Wellbeing & Conscious Fetal Development</p>
    </header>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Authentic Vedic Prenatal Guidance in Surat, Gujarat</h2>
      <p>Founded by <strong>Dr. Taruna Jiyani</strong> (N.D., Alternative Wellness, Certified Vedic Garbh Sanskar Educator), Divine Garbh Sanskar is a dedicated educational and maternal wellness counseling platform. With over 8+ years of dedicated counseling experience, we have guided more than 10,000+ expectant mothers and families across Gujarat and worldwide.</p>
      <p>We harmonize authentic Vedic traditions—Aahar (Satvik Diet), Vihar (Mindful Lifestyle), Vichar (Positive Thoughts), and Bhavana (Spiritual Connection)—with modern prenatal psychology and obstetric wellness principles.</p>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Core Prenatal Programs & Guided Modules</h2>
      <ul>
        <li><strong>Garbh Samvad:</strong> Conscious maternal communication techniques fostering deep emotional connection in the womb.</li>
        <li><strong>Trimester Satvik Nutrition:</strong> Month-by-month Ayurvedic nutrition and balanced meal planning tailored for pregnancy.</li>
        <li><strong>Nada Yoga & Raga Therapy:</strong> Harmonizing maternal nervous system and fetal auditory stimulation with Indian classical ragas.</li>
        <li><strong>Safe Prenatal Yoga & Pranayama:</strong> Gentle pelvic mobility and Bhramari breathing for maternal calm and labor preparation.</li>
        <li><strong>Simantonayan Sanskar:</strong> Traditional Vedic rituals and joyous family celebration during the 7th/8th month of pregnancy.</li>
      </ul>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8; background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 8px; padding: 1.5rem;">
      <h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 0;">Founder & Lead Counselor: Dr. Taruna Jiyani</h2>
      <p>Dr. Taruna Jiyani holds qualifications in Naturopathy & Alternative Wellness (N.D.) alongside specialized certification in Vedic Garbh Sanskar. Her guidance is educational, holistic, and non-invasive, designed to complement—never replace—the medical diagnostics, treatments, and prescriptions of your treating obstetrician.</p>
      <p><strong>Guidance Center:</strong> 164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Nana Varachha, Surat, Gujarat - 395013.</p>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Verified Participant Experiences</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
        ${testimonials.map(t => `
          <div style="background: #FFFDF9; border: 1px solid #D4AF37; border-radius: 8px; padding: 1rem;">
            <div style="font-weight: bold; color: #8B2500; margin-bottom: 0.25rem;">${escapeHtml(t.name)} (${escapeHtml(t.initials)}) — ${escapeHtml(getLangText(t.city, 'en'))}</div>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.5rem 0;">${escapeHtml(getLangText(t.quote, 'en'))}</p>
            <div style="font-size: 0.8rem; color: #777;">Baby Born: ${escapeHtml(getLangText(t.babyBorn, 'en'))} • Rating: 5/5 ★</div>
          </div>
        `).join('\n')}
      </div>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Frequently Asked Questions</h2>
      <div style="margin-top: 1rem;">
        <h3 style="color: #8B2500; font-size: 1.15rem; margin-bottom: 0.25rem;">When should an expectant mother begin Garbh Sanskar?</h3>
        <p>Garbh Sanskar can begin from the planning stage or as soon as pregnancy is confirmed. Trimester-wise guidance adapts to every stage of fetal development.</p>
        <h3 style="color: #8B2500; font-size: 1.15rem; margin-bottom: 0.25rem;">Does Garbh Sanskar replace routine medical checkups?</h3>
        <p>No. Garbh Sanskar is an educational, lifestyle, and emotional wellness tradition. It strictly complements routine checkups, scans, and treatments prescribed by your treating obstetrician.</p>
      </div>
    </section>
  `;
}

function generateAboutHtml() {
  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">About Divine Garbh Sanskar</h1>
      <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Our Heritage, Educational Mission & Guiding Philosophy</p>
    </header>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Our Vision & Purpose</h2>
      <blockquote style="border-left: 4px solid #D4AF37; margin: 1rem 0; padding: 0.75rem 1rem; background: #FFF8E7; font-size: 1.1rem; color: #5D1A00; font-style: italic;">
        ${escapeHtml(aboutData.vision.quote)}
      </blockquote>
      <p>${escapeHtml(aboutData.vision.description)}</p>
      <p>Under the visionary leadership of <strong>Dr. Taruna Jiyani</strong>, Divine Garbh Sanskar has guided over 10,000+ families through structured workshops, interactive webinars, and personalized lifestyle counseling.</p>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">The Harmony of Ancient Wisdom & Modern Prenatal Psychology</h2>
      ${aboutData.foundations.map(f => `
        <div style="margin-bottom: 1rem;">
          <h3 style="color: #8B2500; font-size: 1.2rem; margin-bottom: 0.25rem;">${escapeHtml(f.title)}</h3>
          <p>${escapeHtml(f.description)}</p>
        </div>
      `).join('\n')}
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Three Core Pillars of Our Program</h2>
      <ul>
        ${aboutData.pillars.map(p => `
          <li style="margin-bottom: 0.75rem;">
            <strong>${escapeHtml(p.name)}:</strong> ${escapeHtml(p.description)}
          </li>
        `).join('\n')}
      </ul>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8; background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 8px; padding: 1.5rem;">
      <h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 0;">Founder & Guidance Center Spotlight</h2>
      <p><strong>Name:</strong> ${escapeHtml(aboutData.founder.name)}</p>
      <p><strong>Qualifications:</strong> ${escapeHtml(aboutData.founder.qualification)}</p>
      <p><strong>Experience:</strong> ${escapeHtml(aboutData.founder.experience)}</p>
      <p><strong>Guidance Center:</strong> ${escapeHtml(aboutData.founder.center)}</p>
      <p><strong>Scope of Practice:</strong> ${escapeHtml(aboutData.founder.scope)}</p>
      <p style="margin-top: 1rem;">
        <a href="/authors" style="color: #8B2500; font-weight: bold; text-decoration: underline;">View Authors & Editorial Team Profile →</a> • 
        <a href="/editorial-policy" style="color: #8B2500; font-weight: bold; text-decoration: underline;">Read Full Editorial Policy →</a>
      </p>
    </section>
  `;
}

function generateAuthorsHtml() {
  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Authors, Editorial Leadership & Review Framework</h1>
      <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Editorial Leadership, Verified Credentials & 4-Pillar Quality Standards</p>
    </header>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Founder & Lead Author: ${escapeHtml(authorsData.founder.name)}</h2>
      <p><strong>Professional Role:</strong> ${escapeHtml(authorsData.founder.role)}</p>
      <p><strong>Exact Credentials:</strong> ${escapeHtml(authorsData.founder.credentials)}</p>
      <p><strong>Experience:</strong> ${escapeHtml(authorsData.founder.experience)}</p>
      <p><strong>Guidance Center:</strong> ${escapeHtml(authorsData.founder.center)}</p>
      <p>${escapeHtml(authorsData.founder.biography)}</p>
      <div style="background-color: #FFF8E7; border-left: 4px solid #D4AF37; padding: 1rem; margin: 1.5rem 0;">
        <strong>Scope of Practice & Clinical Synergy Notice:</strong> ${escapeHtml(authorsData.founder.scopeOfPractice)}
      </div>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Core Areas of Expertise & Research</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem;">
        ${authorsData.specializations.map((spec, i) => `
          <div style="background: #FFFDF9; border: 1px solid #D4AF37; border-radius: 6px; padding: 1rem;">
            <div style="font-weight: bold; color: #8B2500; margin-bottom: 0.25rem;">0${i + 1}. ${escapeHtml(spec.title)}</div>
            <p style="margin: 0; font-size: 0.95rem;">${escapeHtml(spec.desc)}</p>
          </div>
        `).join('\n')}
      </div>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Our 4 Core Editorial Review Pillars</h2>
      <p>To ensure cultural authenticity, factual rigor, and safety boundaries, our educational content is reviewed across 4 multidisciplinary editorial subject pillars:</p>
      <ul>
        ${authorsData.editorialPillars.map(pillar => `
          <li style="margin-bottom: 0.75rem;">
            <strong>${escapeHtml(pillar.title)}:</strong> ${escapeHtml(pillar.desc)}
          </li>
        `).join('\n')}
      </ul>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">5-Stage Publishing & Fact-Checking Workflow</h2>
      <ol>
        ${authorsData.publishingWorkflow.map(w => `
          <li style="margin-bottom: 0.75rem;">
            <strong>${escapeHtml(w.title)}:</strong> ${escapeHtml(w.desc)}
          </li>
        `).join('\n')}
      </ol>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8; background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 8px; padding: 1.5rem;">
      <h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 0;">Editorial Independence & Reader Corrections Protocol</h2>
      <p>We do not accept pharmaceutical sponsorships or third-party endorsements that compromise editorial integrity. All guidance prioritizes maternal and fetal safety above all else.</p>
      <p>If you identify an outdated reference or factual correction in any published article, please email our editorial desk at <a href="mailto:divinegarbhsanskar0312@gmail.com" style="color: #8B2500; font-weight: bold;">divinegarbhsanskar0312@gmail.com</a>. Inquiries are reviewed within 48 hours.</p>
    </section>
  `;
}

function generateEditorialPolicyHtml() {
  const sections = editorialPolicyData.sections.map(sec => {
    let content = `<h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">${escapeHtml(sec.title)}</h2>`;
    if (sec.paragraphs) {
      content += sec.paragraphs.map(p => `<p style="line-height: 1.8; margin-bottom: 0.75rem;">${escapeHtml(p)}</p>`).join('\n');
    }
    if (sec.pillars) {
      content += `<ul style="line-height: 1.8; padding-left: 1.5rem; margin-bottom: 1rem;">`;
      content += sec.pillars.map(p => `<li style="margin-bottom: 0.5rem;"><strong>${escapeHtml(p.name)}:</strong> ${escapeHtml(p.description)}</li>`).join('\n');
      content += `</ul>`;
    }
    return `<section style="margin-bottom: 1.5rem;">${content}</section>`;
  }).join('\n');

  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Editorial & Quality Policy</h1>
      <p style="font-size: 1.1rem; color: #8B2500; margin: 0 0 0.5rem 0;">Content Integrity, Fact-Checking, Human Authorship & Review Standards</p>
      <p style="font-size: 0.85rem; color: #777; margin: 0;">Last Updated: ${editorialPolicyData.lastUpdated} • ${editorialPolicyData.evidenceStandard}</p>
    </header>
    ${sections}
  `;
}

function generateDisclaimerHtml() {
  const sections = disclaimerData.sections.map(sec => {
    let content = `<h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">${escapeHtml(sec.title)}</h2>`;
    if (sec.paragraphs) {
      content += sec.paragraphs.map(p => `<p style="line-height: 1.8; margin-bottom: 0.75rem;">${escapeHtml(p)}</p>`).join('\n');
    }
    if (sec.bullets) {
      content += `<ul style="line-height: 1.8; padding-left: 1.5rem; margin-bottom: 1rem;">`;
      content += sec.bullets.map(b => `<li style="margin-bottom: 0.5rem;">${escapeHtml(b)}</li>`).join('\n');
      content += `</ul>`;
    }
    return `<section style="margin-bottom: 1.5rem;">${content}</section>`;
  }).join('\n');

  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Medical & Health Disclaimer</h1>
      <p style="font-size: 1.1rem; color: #8B2500; margin: 0 0 0.5rem 0;">Important Health Safety & Clinical Boundaries Notice</p>
      <p style="font-size: 0.85rem; color: #777; margin: 0;">Last Updated: ${disclaimerData.lastUpdated} • Effective Date: ${disclaimerData.effectiveDate}</p>
    </header>
    <div style="background-color: #FFF3CD; border-left: 4px solid #FFA000; padding: 1.25rem; margin-bottom: 2rem; font-size: 0.95rem; color: #664D03; line-height: 1.6;">
      <strong>Mandatory Medical Notice:</strong> All content published on Divine Garbh Sanskar is for educational, cultural, and maternal wellness purposes only. It is NOT medical advice, diagnosis, or treatment and does not replace regular consultations with your qualified obstetrician or gynecologist.
    </div>
    ${sections}
  `;
}

function generateCoursesHtml() {
  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Garbh Sanskar Programs & Courses</h1>
      <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Structured Trimester-by-Trimester Guided Prenatal Education</p>
    </header>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Transformative Pregnancy Journey</h2>
      <p>Our courses offer day-by-day practical guidance designed to reduce maternal anxiety, foster deep emotional connection with your baby, and promote physical wellbeing through gentle movement, Satvik nutrition, and classical raga soundscapes.</p>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Month-by-Month Curriculum Map</h2>
      ${curriculum.map(c => `
        <div style="background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.25rem;">
          <h3 style="color: #8B2500; font-size: 1.25rem; margin-top: 0; margin-bottom: 0.5rem;">${escapeHtml(c.month)}</h3>
          <p style="font-weight: bold; margin-bottom: 0.5rem; color: #5D1A00;">Key Daily Focus Areas:</p>
          <ul style="padding-left: 1.5rem; margin: 0;">
            ${c.topics.map(t => `<li style="margin-bottom: 0.35rem;">${escapeHtml(t)}</li>`).join('\n')}
          </ul>
        </div>
      `).join('\n')}
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Our Structured Program Options</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-top: 1rem;">
        ${courses.map(course => `
          <div style="border: 2px solid ${course.popular ? '#D4AF37' : '#E5DCC5'}; background: #FFFDF9; border-radius: 8px; padding: 1.5rem;">
            ${course.popular ? '<div style="background: #8B2500; color: #FFF; font-size: 0.75rem; font-weight: bold; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block; margin-bottom: 0.5rem; text-transform: uppercase;">Most Popular</div>' : ''}
            <h3 style="color: #5D1A00; font-size: 1.3rem; margin: 0 0 0.5rem 0;">${escapeHtml(getLangText(course.title, 'en'))}</h3>
            <p style="color: #8B2500; font-weight: bold; margin: 0 0 0.5rem 0;">${escapeHtml(getLangText(course.duration, 'en'))} • ${escapeHtml(getLangText(course.price, 'en'))}</p>
            <ul style="padding-left: 1.25rem; margin-bottom: 1rem; font-size: 0.95rem;">
              ${course.features.en.map(f => `<li style="margin-bottom: 0.35rem;">${escapeHtml(f)}</li>`).join('\n')}
            </ul>
            <a href="/contact" style="display: inline-block; background: #8B2500; color: #FFF; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 0.9rem;">${escapeHtml(getLangText(course.cta, 'en'))} →</a>
          </div>
        `).join('\n')}
      </div>
    </section>
    <section style="background: #FFF3CD; border-left: 4px solid #FFA000; padding: 1rem; margin-top: 2rem; font-size: 0.95rem; color: #664D03;">
      <strong>Educational Notice:</strong> All course routines, diets, and asanas are lifestyle recommendations designed to complement your clinical prenatal checkups. Consult your gynecologist before beginning physical exercises.
    </section>
  `;
}

function generateSimantonayanHtml() {
  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <p style="color: #8B2500; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 0.5rem 0;">${escapeHtml(simantonayanData.hero.badge)}</p>
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">${escapeHtml(simantonayanData.hero.title)}</h1>
      <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">${escapeHtml(simantonayanData.hero.subtitle)}</p>
    </header>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Significance of the 3rd Trimester Ritual</h2>
      <p>${escapeHtml(simantonayanData.hero.intro)}</p>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Three Core Maternal Benefits</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem;">
        ${simantonayanData.benefits.map(b => `
          <div style="background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 8px; padding: 1.25rem;">
            <h3 style="color: #8B2500; font-size: 1.15rem; margin-top: 0; margin-bottom: 0.5rem;">${escapeHtml(b.title)}</h3>
            <p style="margin: 0; font-size: 0.95rem;">${escapeHtml(b.desc)}</p>
          </div>
        `).join('\n')}
      </div>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8;">
      <h2 style="color: #5D1A00; font-size: 1.5rem;">Four Sacred Vedic Ritual Steps</h2>
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
        ${simantonayanData.ritualSteps.map(s => `
          <div style="border-left: 4px solid #8B2500; background: #FFFDF9; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; border-top: 1px solid #E5DCC5; border-right: 1px solid #E5DCC5; border-bottom: 1px solid #E5DCC5;">
            <h3 style="color: #5D1A00; font-size: 1.15rem; margin: 0 0 0.35rem 0;">${escapeHtml(s.step)}. ${escapeHtml(s.title)}</h3>
            <p style="margin: 0; font-size: 0.95rem;">${escapeHtml(s.desc)}</p>
          </div>
        `).join('\n')}
      </div>
    </section>
    <section style="margin-bottom: 2rem; line-height: 1.8; background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 8px; padding: 1.5rem;">
      <h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 0;">Family Celebration Guidelines</h2>
      <ul style="padding-left: 1.5rem; margin: 0;">
        ${simantonayanData.familyGuidelines.map(g => `<li style="margin-bottom: 0.5rem;">${escapeHtml(g)}</li>`).join('\n')}
      </ul>
    </section>
  `;
}

function generatePrivacyPolicyHtml() {
  const sections = privacyPolicyData.sections.map(sec => {
    let content = `<h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">${escapeHtml(sec.title)}</h2>`;
    if (sec.paragraphs) {
      content += sec.paragraphs.map(p => `<p style="line-height: 1.8; margin-bottom: 0.75rem;">${escapeHtml(p)}</p>`).join('\n');
    }
    if (sec.listItems) {
      content += `<ul style="line-height: 1.8; padding-left: 1.5rem; margin-bottom: 1rem;">`;
      content += sec.listItems.map(item => {
        let text = escapeHtml(item.text);
        text = text.replace(/(https?:\/\/[^\s\)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #8B2500; font-weight: bold; text-decoration: underline;">$1</a>');
        return `<li style="margin-bottom: 0.5rem;"><strong>${escapeHtml(item.label)}:</strong> ${text}</li>`;
      }).join('\n');
      content += `</ul>`;
    }
    if (sec.bullets) {
      content += `<ul style="line-height: 1.8; padding-left: 1.5rem; margin-bottom: 1rem;">`;
      content += sec.bullets.map(b => `<li style="margin-bottom: 0.5rem;">${escapeHtml(b)}</li>`).join('\n');
      content += `</ul>`;
    }
    if (sec.contactDetails) {
      content += `
        <div style="background-color: #FFF8E7; border: 1px solid #D4AF37; border-radius: 6px; padding: 1rem; margin-top: 0.75rem;">
          <p style="margin: 0 0 0.25rem 0;"><strong>${escapeHtml(sec.contactDetails.organization)}</strong></p>
          <p style="margin: 0 0 0.25rem 0;">Address: ${escapeHtml(sec.contactDetails.address)}</p>
          <p style="margin: 0 0 0.25rem 0;">Email: <a href="mailto:${escapeHtml(sec.contactDetails.email)}" style="color: #8B2500;">${escapeHtml(sec.contactDetails.email)}</a></p>
          <p style="margin: 0;">Phone: <a href="tel:${escapeHtml(sec.contactDetails.phone.replace(/[\s-]/g, ''))}" style="color: #8B2500;">${escapeHtml(sec.contactDetails.phone)}</a></p>
        </div>
      `;
    }
    return `<section style="margin-bottom: 1.5rem;">${content}</section>`;
  }).join('\n');

  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Privacy Policy</h1>
      <p style="font-size: 1.1rem; color: #8B2500; margin: 0 0 0.5rem 0;">Transparency in Data Protection, User Privacy Rights & Google AdSense Compliance</p>
      <p style="font-size: 0.85rem; color: #777; margin: 0;">Last Updated: ${privacyPolicyData.lastUpdated} • Effective Date: ${privacyPolicyData.effectiveDate}</p>
    </header>
    ${sections}
  `;
}

function generateTermsHtml() {
  const sections = termsData.sections.map(sec => {
    let content = `<h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">${escapeHtml(sec.title)}</h2>`;
    if (sec.paragraphs) {
      content += sec.paragraphs.map(p => `<p style="line-height: 1.8; margin-bottom: 0.75rem;">${escapeHtml(p)}</p>`).join('\n');
    }
    if (sec.bullets) {
      content += `<ul style="line-height: 1.8; padding-left: 1.5rem; margin-bottom: 1rem;">`;
      content += sec.bullets.map(b => `<li style="margin-bottom: 0.5rem;">${escapeHtml(b)}</li>`).join('\n');
      content += `</ul>`;
    }
    return `<section style="margin-bottom: 1.5rem;">${content}</section>`;
  }).join('\n');

  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Terms of Service</h1>
      <p style="font-size: 1.1rem; color: #8B2500; margin: 0 0 0.5rem 0;">User Agreement & Educational Scope</p>
      <p style="font-size: 0.85rem; color: #777; margin: 0;">Last Updated: ${termsData.lastUpdated} • Effective Date: ${termsData.effectiveDate}</p>
    </header>
    ${sections}
  `;
}

function generateRefundPolicyHtml() {
  const sections = refundPolicyData.sections.map(sec => {
    let content = `<h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">${escapeHtml(sec.title)}</h2>`;
    if (sec.paragraphs) {
      content += sec.paragraphs.map(p => `<p style="line-height: 1.8; margin-bottom: 0.75rem;">${escapeHtml(p)}</p>`).join('\n');
    }
    if (sec.listItems) {
      content += `<ul style="line-height: 1.8; padding-left: 1.5rem; margin-bottom: 1rem;">`;
      content += sec.listItems.map(item => `<li style="margin-bottom: 0.5rem;"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.text)}</li>`).join('\n');
      content += `</ul>`;
    }
    return `<section style="margin-bottom: 1.5rem;">${content}</section>`;
  }).join('\n');

  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Refund & Cancellation Policy</h1>
      <p style="font-size: 1.1rem; color: #8B2500; margin: 0 0 0.5rem 0;">Fair & Transparent Enrollment Guidelines</p>
      <p style="font-size: 0.85rem; color: #777; margin: 0;">Last Updated: ${refundPolicyData.lastUpdated} • Effective Date: ${refundPolicyData.effectiveDate}</p>
    </header>
    ${sections}
  `;
}

function generateCookiePolicyHtml() {
  const sections = cookiePolicyData.sections.map(sec => {
    let content = `<h2 style="color: #5D1A00; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">${escapeHtml(sec.title)}</h2>`;
    if (sec.paragraphs) {
      content += sec.paragraphs.map(p => `<p style="line-height: 1.8; margin-bottom: 0.75rem;">${escapeHtml(p)}</p>`).join('\n');
    }
    if (sec.categories) {
      content += `<div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.75rem; margin-bottom: 1rem;">`;
      content += sec.categories.map(c => `
        <div style="background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 6px; padding: 1rem;">
          <h3 style="color: #8B2500; font-size: 1.1rem; margin: 0 0 0.25rem 0;">${escapeHtml(c.name)}</h3>
          <p style="margin: 0; font-size: 0.95rem;">${escapeHtml(c.description)}</p>
        </div>
      `).join('\n');
      content += `</div>`;
    }
    return `<section style="margin-bottom: 1.5rem;">${content}</section>`;
  }).join('\n');

  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Cookie Policy</h1>
      <p style="font-size: 1.1rem; color: #8B2500; margin: 0 0 0.5rem 0;">Cookie Usage, Analytics & Advertising Preferences</p>
      <p style="font-size: 0.85rem; color: #777; margin: 0;">Last Updated: ${cookiePolicyData.lastUpdated} • Effective Date: ${cookiePolicyData.effectiveDate}</p>
    </header>
    ${sections}
  `;
}

function generateCardHtml() {
  return `
    <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem; text-align: center;">
      <h1 style="color: #5D1A00; font-size: 2rem; margin: 0 0 0.5rem 0;">Dr. Taruna Jiyani</h1>
      <p style="font-size: 1.1rem; color: #8B2500; margin: 0 0 0.5rem 0;">Founder & Lead Vedic Prenatal Counselor • Divine Garbh Sanskar</p>
      <p style="font-size: 0.9rem; color: #777; margin: 0;">Digital Contact Card & Center Information</p>
    </header>
    <section style="max-width: 500px; margin: 0 auto; background: #FFF8E7; border: 1px solid #D4AF37; border-radius: 8px; padding: 1.5rem; line-height: 1.8;">
      <p><strong>Professional Scope:</strong> N.D. (Alternative Wellness / Naturopathy), Certified Vedic Garbh Sanskar Educator</p>
      <p><strong>Counseling Experience:</strong> 8+ years of dedicated guidance for expectant families</p>
      <p><strong>Guidance Center:</strong> 164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Nana Varachha, Surat, Gujarat - 395013</p>
      <p><strong>Phone:</strong> <a href="tel:+919638484545" style="color: #8B2500; font-weight: bold;">+91 96384 84545</a></p>
      <p><strong>Email:</strong> <a href="mailto:divinegarbhsanskar0312@gmail.com" style="color: #8B2500; font-weight: bold;">divinegarbhsanskar0312@gmail.com</a></p>
      <p><strong>Official Website:</strong> <a href="https://www.thedivinegarbhsanskar.com" style="color: #8B2500; font-weight: bold;">https://www.thedivinegarbhsanskar.com</a></p>
    </section>
  `;
}

// Route definitions for static generation
const routes = [
  {
    path: '/',
    title: 'Divine Garbh Sanskar | गर्भ संस्कार - वैदिक गर्भावस्था एवं मातृत्व कल्याण',
    description: 'Vedic Garbh Sanskar guidance combining ancient Indian prenatal science, satvik trimester nutrition, gentle prenatal yoga, classical raga therapy, and Garbh Samvad.',
    keywords: 'Garbh Sanskar, Vedic pregnancy, prenatal yoga, satvik pregnancy diet, raga therapy, Dr Taruna Jiyani',
    canonical: 'https://www.thedivinegarbhsanskar.com/',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Divine Garbh Sanskar",
        "url": "https://www.thedivinegarbhsanskar.com",
        "logo": "https://www.thedivinegarbhsanskar.com/logo.jpg",
        "tagline": "Weaving Cultural Roots into Motherhood",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-96384-84545",
          "contactType": "customer service",
          "availableLanguage": ["Hindi", "Gujarati", "English"]
        }
      }
    ],
    htmlContent: generateHomeHtml()
  },
  {
    path: '/about',
    title: 'About Us | Divine Garbh Sanskar | Our Vedic Roots & Mission',
    description: 'Learn about Divine Garbh Sanskar, our founder Dr. Taruna Jiyani, our mission to revive authentic Vedic prenatal science, and our counseling center in Surat, Gujarat.',
    keywords: 'about Garbh Sanskar, Vedic parenting, ancient prenatal wisdom, garbh vigyan, Dr Taruna Jiyani Surat',
    canonical: 'https://www.thedivinegarbhsanskar.com/about',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Divine Garbh Sanskar",
        "url": "https://www.thedivinegarbhsanskar.com/about"
      }
    ],
    htmlContent: generateAboutHtml()
  },
  {
    path: '/authors',
    title: 'Authors, Editorial Leadership & 4-Pillar Review Framework | Divine Garbh Sanskar',
    description: 'Meet Dr. Taruna Jiyani (N.D., Alternative Wellness, Certified Vedic Garbh Sanskar Educator) and our 4-pillar evidence review framework. Verified qualifications, 8+ years experience, and transparent scope of practice.',
    keywords: 'Dr Taruna Jiyani, Garbh Sanskar author, prenatal counselor Surat, editorial team, evidence review framework',
    canonical: 'https://www.thedivinegarbhsanskar.com/authors',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Dr. Taruna Jiyani",
          "honorificPrefix": "Dr.",
          "jobTitle": "Founder, Lead Vedic Prenatal Counselor & Holistic Wellness Educator (N.D.)",
          "worksFor": {
            "@type": "Organization",
            "name": "Divine Garbh Sanskar",
            "url": "https://www.thedivinegarbhsanskar.com"
          },
          "description": "N.D. (Alternative Wellness / Naturopathy), Certified Vedic Garbh Sanskar Educator and Maternal Lifestyle Counselor based in Surat, Gujarat with over 8+ years of experience guiding expectant families.",
          "image": "https://www.thedivinegarbhsanskar.com/taruna.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Nana Varachha",
            "addressLocality": "Surat",
            "addressRegion": "Gujarat",
            "postalCode": "395013",
            "addressCountry": "IN"
          },
          "email": "divinegarbhsanskar0312@gmail.com",
          "telephone": "+919638484545"
        }
      }
    ],
    htmlContent: generateAuthorsHtml()
  },
  {
    path: '/editorial-policy',
    title: 'Editorial & Quality Policy | Divine Garbh Sanskar',
    description: 'Read our editorial standards, fact-checking procedures, human authorship policy, source citation guidelines, and factual correction policy.',
    keywords: 'editorial policy, fact checking, prenatal content standards, Divine Garbh Sanskar',
    canonical: 'https://www.thedivinegarbhsanskar.com/editorial-policy',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Editorial Policy",
        "url": "https://www.thedivinegarbhsanskar.com/editorial-policy"
      }
    ],
    htmlContent: generateEditorialPolicyHtml()
  },
  {
    path: '/disclaimer',
    title: 'Medical & Health Disclaimer | Divine Garbh Sanskar',
    description: 'Mandatory medical notice: Divine Garbh Sanskar content is for educational and cultural wellness purposes only and does not replace professional obstetric care.',
    keywords: 'medical disclaimer, pregnancy advice disclaimer, Garbh Sanskar health notice',
    canonical: 'https://www.thedivinegarbhsanskar.com/disclaimer',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Medical Disclaimer",
        "url": "https://www.thedivinegarbhsanskar.com/disclaimer"
      }
    ],
    htmlContent: generateDisclaimerHtml()
  },
  {
    path: '/courses',
    title: 'Our Programs & Courses | Divine Garbh Sanskar',
    description: 'Explore our guided Garbh Sanskar prenatal programs: Foundation, Complete, and Divine Plus. Trimester-wise daily activities, counseling sessions, and materials.',
    keywords: 'Garbh Sanskar courses, online pregnancy classes, prenatal modules Surat, Dr Taruna Jiyani',
    canonical: 'https://www.thedivinegarbhsanskar.com/courses',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Divine Garbh Sanskar Guided Prenatal Program",
        "description": "Comprehensive Vedic prenatal training covering trimester nutrition, Nada Yoga, Garbh Samvad, and gentle prenatal yoga.",
        "provider": {
          "@type": "Organization",
          "name": "Divine Garbh Sanskar",
          "sameAs": "https://www.thedivinegarbhsanskar.com"
        }
      }
    ],
    htmlContent: generateCoursesHtml()
  },
  {
    path: '/simantonayan',
    title: 'Simantonayan (Godh Bharai) Sanskar Guidance | Divine Garbh Sanskar',
    description: 'Complete Vedic guide to Simantonayan Sanskar (Godh Bharai ritual) in the 7th or 8th month of pregnancy. Sacred significance, mantras, and peaceful celebrations.',
    keywords: 'Simantonayan Sanskar, Godh Bharai ceremony, Vedic baby shower, pregnancy rituals India',
    canonical: 'https://www.thedivinegarbhsanskar.com/simantonayan',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Simantonayan Sanskar Guidance",
        "url": "https://www.thedivinegarbhsanskar.com/simantonayan"
      }
    ],
    htmlContent: generateSimantonayanHtml()
  },
  {
    path: '/blog',
    title: 'Pregnancy Blog & Educational Guides | Divine Garbh Sanskar',
    description: 'Read our collection of authentic prenatal guides covering trimester diets, Ayurvedic herbs, prenatal yoga safety, classical ragas, and Garbh Samvad.',
    keywords: 'pregnancy blog, garbh sanskar tips, healthy pregnancy diet, prenatal care articles',
    canonical: 'https://www.thedivinegarbhsanskar.com/blog',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Divine Garbh Sanskar Educational Blog",
        "url": "https://www.thedivinegarbhsanskar.com/blog"
      }
    ],
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Educational Blog & Prenatal Guides</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Evidence-Informed Vedic Guidance for Expectant Mothers</p>
      </header>
      <section style="margin-bottom: 2rem;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">All Published Prenatal Guides (${blogPosts.length} Guides)</h2>
        <ul style="line-height: 1.8;">
          ${blogPosts.map(p => `<li><a href="/blog/${p.slug}" style="color: #8B2500; font-weight: bold;">${escapeHtml(getLangText(p.title, 'en'))}</a> - <em>${escapeHtml(getLangText(p.category, 'en'))}</em></li>`).join('\n')}
        </ul>
      </section>
    `
  },
  {
    path: '/contact',
    title: 'Contact Us | Divine Garbh Sanskar | Surat, Gujarat',
    description: 'Connect with Dr. Taruna Jiyani and the Divine Garbh Sanskar guidance center in Surat, Gujarat. Phone: +91 96384 84545. In-person & online counseling available.',
    keywords: 'contact Garbh Sanskar Surat, call Garbh Sanskar counselor, pregnancy helpline India',
    canonical: 'https://www.thedivinegarbhsanskar.com/contact',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Divine Garbh Sanskar",
        "url": "https://www.thedivinegarbhsanskar.com/contact"
      }
    ],
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Contact Divine Garbh Sanskar</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Reach Our Guidance Center in Surat, Gujarat</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Guidance Center & Consultation Inquiries</h2>
        <p><strong>Address:</strong> 164, near ABC School, behind Royal Arcade, Marutidham Society, Sarthana Jakat Naka, Nana Varachha, Surat, Gujarat 395013, India</p>
        <p><strong>Phone / WhatsApp:</strong> <a href="tel:+919638484545" style="color: #8B2500; font-weight: bold;">+91 96384 84545</a></p>
        <p><strong>Email:</strong> <a href="mailto:divinegarbhsanskar0312@gmail.com" style="color: #8B2500; font-weight: bold;">divinegarbhsanskar0312@gmail.com</a></p>
        <p><strong>Working Hours:</strong> Monday – Saturday: 09:00 AM – 06:00 PM IST</p>
        <p><strong>Scope of Services:</strong> In-person counseling, 1:1 online consultations, prenatal workshops, and guided trimester programs.</p>
      </section>
    `
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Divine Garbh Sanskar',
    description: 'Learn how Divine Garbh Sanskar collects, protects, and handles user data in compliance with Google AdSense privacy policies and Indian IT laws.',
    keywords: 'privacy policy, user data, Google AdSense cookies, Divine Garbh Sanskar',
    canonical: 'https://www.thedivinegarbhsanskar.com/privacy-policy',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "url": "https://www.thedivinegarbhsanskar.com/privacy-policy"
      }
    ],
    htmlContent: generatePrivacyPolicyHtml()
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Divine Garbh Sanskar',
    description: 'Read the terms of service governing website usage, educational course enrollments, and intellectual property on Divine Garbh Sanskar.',
    keywords: 'terms of service, website terms, Divine Garbh Sanskar',
    canonical: 'https://www.thedivinegarbhsanskar.com/terms-of-service',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service",
        "url": "https://www.thedivinegarbhsanskar.com/terms-of-service"
      }
    ],
    htmlContent: generateTermsHtml()
  },
  {
    path: '/refund-policy',
    title: 'Refund & Cancellation Policy | Divine Garbh Sanskar',
    description: 'Clear cancellation and refund policy for Divine Garbh Sanskar educational courses, workshop registrations, and digital resources.',
    keywords: 'refund policy, cancellation policy, Divine Garbh Sanskar',
    canonical: 'https://www.thedivinegarbhsanskar.com/refund-policy',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Refund Policy",
        "url": "https://www.thedivinegarbhsanskar.com/refund-policy"
      }
    ],
    htmlContent: generateRefundPolicyHtml()
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | Divine Garbh Sanskar',
    description: 'Information regarding the use of cookies, analytics tags, and preference storage on Divine Garbh Sanskar.',
    keywords: 'cookie policy, consent preferences, Google AdSense cookies, Divine Garbh Sanskar',
    canonical: 'https://www.thedivinegarbhsanskar.com/cookie-policy',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Cookie Policy",
        "url": "https://www.thedivinegarbhsanskar.com/cookie-policy"
      }
    ],
    htmlContent: generateCookiePolicyHtml()
  },
  {
    path: '/card',
    title: 'Dr. Taruna Jiyani - Divine Garbh Sanskar | Digital Card',
    description: 'Connect with Dr. Taruna Jiyani, Founder & Lead Vedic Prenatal Counselor at Divine Garbh Sanskar in Surat, Gujarat.',
    keywords: 'Dr Taruna Jiyani vcard, Garbh Sanskar contact card Surat',
    canonical: 'https://www.thedivinegarbhsanskar.com/card',
    robots: 'noindex, nofollow',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thedivinegarbhsanskar.com/" },
          { "@type": "ListItem", "position": 2, "name": "Digital Card", "item": "https://www.thedivinegarbhsanskar.com/card" }
        ]
      }
    ],
    htmlContent: generateCardHtml()
  },
  {
    path: '/404',
    title: '404 - Page Not Found | Divine Garbh Sanskar',
    description: 'The page you are looking for does not exist or has been moved.',
    canonical: 'https://www.thedivinegarbhsanskar.com/404',
    robots: 'noindex, nofollow',
    structuredData: [],
    htmlContent: `
      <header style="text-align: center; margin-bottom: 2rem;">
        <h1 style="color: #8B2500; font-size: 3rem; margin: 0 0 0.5rem 0;">404</h1>
        <h2 style="color: #5D1A00; font-size: 1.8rem; margin: 0 0 1rem 0;">Page Not Found (पृष्ठ प्राप्त नहीं हुआ)</h2>
        <p style="font-size: 1.1rem; color: #555; max-width: 600px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <p>
          <a href="/" style="display: inline-block; background: #8B2500; color: #FFF; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: bold;">Return to Homepage (मुख्य पृष्ठ पर वापस जाएं) →</a>
        </p>
      </header>
    `
  }
];

// Add each blog post as a discrete static route
blogPosts.forEach(post => {
  const titleText = getLangText(post.title, 'en');
  const descText = getLangText(post.description, 'en');
  const catText = getLangText(post.category, 'en');
  const canonicalUrl = `https://www.thedivinegarbhsanskar.com/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": titleText,
    "description": descText,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Dr. Taruna Jiyani",
      "jobTitle": "Founder & Lead Vedic Prenatal Counselor",
      "url": "https://www.thedivinegarbhsanskar.com/authors"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Divine Garbh Sanskar",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thedivinegarbhsanskar.com/logo.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thedivinegarbhsanskar.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.thedivinegarbhsanskar.com/blog" },
      { "@type": "ListItem", "position": 3, "name": titleText, "item": canonicalUrl }
    ]
  };

  const schemas = [articleSchema, breadcrumbsSchema];

  if (post.faqs && post.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": getLangText(faq.question, 'en'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": getLangText(faq.answer, 'en')
        }
      }))
    });
  }

  // Generate HTML body from sections
  let sectionsHtml = '';
  if (post.sections && post.sections.length > 0) {
    sectionsHtml = post.sections.map(sec => {
      const heading = escapeHtml(getLangText(sec.heading, 'en'));
      let paras = [];
      if (sec.paragraphs) {
        if (Array.isArray(sec.paragraphs)) {
          paras = sec.paragraphs.map(p => escapeHtml(typeof p === 'object' ? getLangText(p, 'en') : p));
        } else if (typeof sec.paragraphs === 'object') {
          const list = sec.paragraphs.en || sec.paragraphs.hi || sec.paragraphs.gu || [];
          paras = (Array.isArray(list) ? list : [list]).map(p => escapeHtml(p));
        }
      }
      return `
        <section style="margin-bottom: 2rem;">
          <h2 style="color: #5D1A00; font-size: 1.5rem; margin-bottom: 0.75rem;">${heading}</h2>
          ${paras.map(p => `<p style="line-height: 1.8; margin-bottom: 1rem; color: #3B0F00;">${p}</p>`).join('\n')}
        </section>
      `;
    }).join('\n');
  }

  // FAQs HTML
  let faqsHtml = '';
  if (post.faqs && post.faqs.length > 0) {
    faqsHtml = `
      <section style="margin-top: 2rem; border-top: 1px solid #D4AF37; padding-top: 1.5rem;">
        <h2 style="color: #5D1A00; font-size: 1.5rem; margin-bottom: 1rem;">Frequently Asked Questions (FAQ)</h2>
        ${post.faqs.map(faq => `
          <div style="margin-bottom: 1.25rem;">
            <h3 style="color: #8B2500; font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHtml(getLangText(faq.question, 'en'))}</h3>
            <p style="line-height: 1.7; color: #3B0F00; margin: 0;">${escapeHtml(getLangText(faq.answer, 'en'))}</p>
          </div>
        `).join('\n')}
      </section>
    `;
  }

  // References HTML
  let refsHtml = '';
  if (post.references && post.references.length > 0) {
    refsHtml = `
      <section style="margin-top: 2rem; background: #FFF8E7; padding: 1.25rem; border-radius: 8px; border: 1px solid #D4AF37;">
        <h3 style="color: #5D1A00; font-size: 1.2rem; margin-top: 0; margin-bottom: 0.5rem;">Scientific & Classical Medical References</h3>
        <ul style="font-size: 0.9rem; line-height: 1.6; padding-left: 1.25rem; color: #3B0F00;">
          ${post.references.map(r => `<li>${escapeHtml(r)}</li>`).join('\n')}
        </ul>
      </section>
    `;
  }

  const postHtmlContent = `
    <article style="line-height: 1.8; color: #3B0F00;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 1.5rem; font-size: 0.9rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <a href="/" style="color: #8B2500; text-decoration: none; font-weight: 500;">Home</a> / 
          <a href="/blog" style="color: #8B2500; text-decoration: none; font-weight: 500;">Blog</a> / 
          <span style="color: #B22222; font-weight: bold;">${escapeHtml(catText)}</span>
        </div>
        <div>
          <a href="/blog" style="color: #8B2500; font-weight: bold; text-decoration: none;">← Back to All Articles</a>
        </div>
      </nav>
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <p style="color: #B22222; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 0.5rem 0;">${escapeHtml(catText)} • ${escapeHtml(post.readTime)}</p>
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 1rem 0; line-height: 1.3;">${escapeHtml(titleText)}</h1>
        <p style="font-size: 1.15rem; color: #5D1A00; line-height: 1.6; margin: 0 0 1rem 0;">${escapeHtml(descText)}</p>
        <div style="font-size: 0.9rem; color: #5D1A00; background: #FFFDF9; padding: 0.75rem 1rem; border: 1px solid #D4AF37; border-radius: 6px;">
          <span><strong>Authored by:</strong> <a href="/authors" style="color: #8B2500;">Dr. Taruna Jiyani</a> (Founder & Lead Prenatal Counselor)</span> • 
          <span><strong>Evidence Standards:</strong> <a href="/editorial-policy" style="color: #8B2500;">WHO, ICMR & AYUSH Evidence Standards</a></span> • 
          <span><strong>Published / Updated:</strong> ${escapeHtml(post.date)}</span>
        </div>
      </header>

      <div style="background-color: #FFF3CD; border-left: 4px solid #FFA000; padding: 1rem; margin-bottom: 2rem; font-size: 0.95rem; color: #664D03;">
        <strong>Mandatory Medical Notice:</strong> The following guidance combines traditional Vedic Garbh Sanskar practices with maternal lifestyle principles. It is for educational purposes and is designed to complement—never substitute—the diagnosis, diet, and clinical care provided by your treating gynecologist or obstetrician.
      </div>

      ${sectionsHtml}
      ${faqsHtml}
      ${refsHtml}
    </article>
  `;

  routes.push({
    path: `/blog/${post.slug}`,
    title: `${titleText} | Divine Garbh Sanskar`,
    description: descText,
    keywords: post.keywords || `${titleText}, Garbh Sanskar, pregnancy care`,
    canonical: canonicalUrl,
    image: post.image,
    structuredData: schemas,
    htmlContent: postHtmlContent
  });
});

console.log(`Prerendering ${routes.length} static routes with full meaningful content for Googlebot & crawler visibility...`);

let generatedCount = 0;

routes.forEach(route => {
  let html = baseTemplate;

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  // 2. Replace Primary Meta Tags
  html = html.replace(/<meta\s+name=["']title["'][^>]*>/i, `<meta name="title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}" />`);
  if (route.keywords) {
    html = html.replace(/<meta\s+name=["']keywords["'][^>]*>/i, `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`);
  }

  // 3. Robots Meta Tag (handling noindex routes such as /card)
  const robotsContent = route.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${escapeHtml(robotsContent)}" />`);

  // 4. Replace Canonical
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`);

  // 5. Replace Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${escapeHtml(route.canonical)}" />`);
  if (route.image) {
    html = html.replace(/<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${escapeHtml(route.image)}" />`);
  }

  // 6. Replace Twitter Tags
  html = html.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);
  if (route.image) {
    html = html.replace(/<meta\s+name=["']twitter:image["'][^>]*>/i, `<meta name="twitter:image" content="${escapeHtml(route.image)}" />`);
  }

  // 7. Inject Structured Data Scripts into <head>
  if (route.structuredData && route.structuredData.length > 0) {
    const jsonLdScripts = route.structuredData.map(sd => `\n    <script type="application/ld+json">\n${JSON.stringify(sd, null, 2)}\n    </script>`).join('');
    html = html.replace('</head>', `${jsonLdScripts}\n  </head>`);
  }

  // 8. Inject Semantic Static Content into <div id="root"> and <noscript>
  const staticBody = `
    <div style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: sans-serif; line-height: 1.6; color: #3B0F00; background-color: #FFFDF9;">
      ${route.htmlContent}
      <footer style="margin-top: 3rem; border-top: 1px solid #D4AF37; padding-top: 1.5rem; font-size: 0.85rem; color: #777;">
        <p>© ${new Date().getFullYear()} Divine Garbh Sanskar • Surat, Gujarat, India • All Rights Reserved.</p>
        <p>
          <a href="/" style="color: #8B2500;">Home</a> • 
          <a href="/about" style="color: #8B2500;">About</a> • 
          <a href="/authors" style="color: #8B2500;">Authors</a> • 
          <a href="/editorial-policy" style="color: #8B2500;">Editorial Policy</a> • 
          <a href="/disclaimer" style="color: #8B2500;">Medical Disclaimer</a> • 
          <a href="/courses" style="color: #8B2500;">Courses</a> • 
          <a href="/simantonayan" style="color: #8B2500;">Simantonayan</a> • 
          <a href="/blog" style="color: #8B2500;">Blog</a> • 
          <a href="/contact" style="color: #8B2500;">Contact</a> • 
          <a href="/privacy-policy" style="color: #8B2500;">Privacy Policy</a> • 
          <a href="/terms-of-service" style="color: #8B2500;">Terms</a> • 
          <a href="/refund-policy" style="color: #8B2500;">Refunds</a> • 
          <a href="/cookie-policy" style="color: #8B2500;">Cookies</a>
        </p>
      </footer>
    </div>
  `;

  // Inject directly inside #root for immediate first-paint / headless crawler DOM visibility
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${staticBody}</div>`);

  // Also replace noscript
  const noscriptBlock = `
    <!-- Semantic Static Crawlable Content for Mediapartners-Google & Non-JS Bots -->
    <noscript>
      ${staticBody}
    </noscript>
  `;
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, noscriptBlock.trim());

  // Determine output directory path and write dual static files
  if (route.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
  } else {
    const cleanPath = route.path.replace(/^\//, '');
    const targetDir = path.join(distDir, cleanPath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // 1. Write /path/index.html
    const targetIndexFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetIndexFile, html, 'utf8');

    // 2. Write /path.html for clean URL routing
    const targetDirectFile = path.join(distDir, `${cleanPath}.html`);
    const parentOfDirectFile = path.dirname(targetDirectFile);
    if (!fs.existsSync(parentOfDirectFile)) {
      fs.mkdirSync(parentOfDirectFile, { recursive: true });
    }
    fs.writeFileSync(targetDirectFile, html, 'utf8');
  }

  generatedCount++;
});

console.log(` Successfully prerendered and saved ${generatedCount} static routes (both /index.html and .html) to dist/`);
