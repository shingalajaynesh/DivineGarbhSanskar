import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from '../src/data/blogPosts.js';
import { seoConfig } from '../src/seo/seoConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Please run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const baseTemplate = fs.readFileSync(templatePath, 'utf8');

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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Divine Garbh Sanskar (दिव्य गर्भ संस्कार)</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Vedic Prenatal Science, Maternal Wellbeing & Conscious Fetal Development</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Authentic Vedic Prenatal Guidance in Surat, Gujarat</h2>
        <p>Founded by <strong>Dr. Taruna Jiyani</strong>, Divine Garbh Sanskar is a dedicated educational and maternal wellness counseling platform. We harmonize authentic Vedic traditions—Aahar (Satvik Diet), Vihar (Mindful Lifestyle), Vichar (Positive Thoughts), and Bhavana (Spiritual Connection)—with modern prenatal psychology and obstetric wellness principles.</p>
        <p>Over 10,000+ expectant mothers have participated in our structured prenatal workshops, learning safe prenatal yoga, classical raga sound therapy, and maternal stress reduction.</p>
      </section>
      <section style="margin-bottom: 2rem;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Core Prenatal Programs & Guided Modules</h2>
        <ul>
          <li><strong>Garbh Samvad:</strong> Conscious maternal communication techniques fostering deep emotional connection in the womb.</li>
          <li><strong>Trimester Satvik Nutrition:</strong> Month-by-month Ayurvedic nutrition and balanced meal planning.</li>
          <li><strong>Nada Yoga & Raga Therapy:</strong> Harmonizing maternal nervous system and fetal auditory stimulation with Indian classical ragas.</li>
          <li><strong>Safe Prenatal Yoga & Pranayama:</strong> Gentle pelvic mobility and Bhramari breathing for maternal calm and labor preparation.</li>
          <li><strong>Simantonayan Sanskar:</strong> Traditional Vedic rituals and joyous family celebration during the 7th/8th month of pregnancy.</li>
        </ul>
      </section>
    `
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">About Divine Garbh Sanskar</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Our Heritage, Educational Mission & Guiding Philosophy</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Our Vision & Purpose</h2>
        <p>Our mission is to empower expectant parents with authentic, practical, and culturally rooted prenatal knowledge. We believe pregnancy is not merely a biological state, but a sacred window of opportunity to nurture a calm, healthy, and conscious generation.</p>
        <p>Under the visionary leadership of <strong>Dr. Taruna Jiyani</strong>, Divine Garbh Sanskar has guided over 10,000+ families through structured workshops, interactive webinars, and personalized lifestyle counseling.</p>
      </section>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">The Harmony of Ancient Wisdom & Prenatal Psychology</h2>
        <p>We draw upon ancient Ayurvedic treatises including the Charaka Samhita, Sushruta Samhita, and Kashyapa Samhita while embracing modern peer-reviewed findings in maternal stress management, embryology, and fetal auditory cognition.</p>
      </section>
    `
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Authors, Editorial Leadership & Review Framework</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Editorial Leadership, Verified Credentials & 4-Pillar Quality Standards</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Founder & Lead Author: Dr. Taruna Jiyani</h2>
        <p><strong>Professional Role:</strong> Founder, Lead Vedic Prenatal Counselor & Chief Editor at Divine Garbh Sanskar (Surat, Gujarat, India).</p>
        <p><strong>Exact Credentials:</strong> N.D. (Doctor of Naturopathy & Alternative Wellness), Certified Vedic Garbh Sanskar Educator & Maternal Lifestyle Counselor.</p>
        <p><strong>Experience:</strong> 8+ years of dedicated counseling in Vedic prenatal science, Garbhini Paricharya, and maternal lifestyle; over 10,000+ expectant families guided through structured workshops.</p>
        <p><strong>Specialization:</strong> Vedic Garbh Samvad, trimester-specific Satvik nutrition, Nada Yoga raga music relaxation, mindful breathwork, and postpartum Sutika Paricharya.</p>
        <div style="background-color: #FFF8E7; border-left: 4px solid #D4AF37; padding: 1rem; margin: 1.5rem 0;">
          <strong>Scope of Practice & Clinical Synergy Notice:</strong> Dr. Taruna Jiyani practices as a holistic prenatal wellness educator and Garbh Sanskar counselor. She is not an allopathic medical doctor or obstetric surgeon. Divine Garbh Sanskar provides educational and holistic lifestyle guidance designed to complement—never replace—the medical diagnostics, treatments, and prescriptions of your treating obstetrician.
        </div>
      </section>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Our 4 Core Editorial Review Pillars</h2>
        <ul>
          <li><strong>1. Ayurvedic Prenatal Reference Framework:</strong> Synthesizing classical scriptural guidance (Charaka, Sushruta & Kashyapa Samhitas), trimester satvik diets, and herbal safety boundaries.</li>
          <li><strong>2. Prenatal Movement & Anatomy Safety Standards:</strong> Evaluating movement safety, trimester-specific asana modifications, contraindications, and gentle pelvic floor preparation under obstetric guidelines.</li>
          <li><strong>3. Classical Nada Yoga & Acoustic Guidelines:</strong> Curating soothing classical Indian ragas and mindful audio environments for maternal relaxation and gentle womb bonding.</li>
          <li><strong>4. Maternal Mental Wellbeing & Counseling Framework:</strong> Providing structured guidance on maternal stress reduction, guided Yoga Nidra, birth confidence, and father emotional partnership.</li>
        </ul>
      </section>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">5-Stage Publishing & Fact-Checking Workflow</h2>
        <ol>
          <li><strong>Topic Research & Need Assessment:</strong> Addressing real physiological and emotional queries from expectant mothers.</li>
          <li><strong>Vedic & Modern Clinical Synthesis:</strong> Cross-referencing Sanskrit treatises with peer-reviewed medical guidance (WHO, ICMR, FOGSI).</li>
          <li><strong>Expert Fact-Checking & Safety Review:</strong> Rigorous review by certified prenatal educators and verification of medical disclaimers.</li>
          <li><strong>Trilingual Quality Review:</strong> Ensuring authentic, complete rendering across English, Hindi, and Gujarati.</li>
          <li><strong>Continuous Review & Updates:</strong> Periodically refreshing content based on evolving dietary guidelines and reader feedback.</li>
        </ol>
      </section>
    `
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Editorial & Quality Policy</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Content Integrity, Fact-Checking & Human Authorship Standards</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">1. Editorial Mission</h2>
        <p>Divine Garbh Sanskar is committed to publishing original, factually verified, culturally authentic, and practical prenatal educational content for expectant mothers and planning couples.</p>
        <h2 style="color: #5D1A00; font-size: 1.5rem;">2. Human Authorship & Expert Review</h2>
        <p>All articles, guides, and nutrition plans are researched, authored, and reviewed by identified prenatal educators led by Dr. Taruna Jiyani. We strictly adhere to Google's People-First Content Guidelines and do not publish mass-produced, automated, or unverified generic material.</p>
        <h2 style="color: #5D1A00; font-size: 1.5rem;">3. Medical & Evidence Demarcation</h2>
        <p>Every article discussing nutrition, herbs, gestational diabetes, or exercise clearly demarcates traditional wellness practices from clinical medical advice, providing mandatory notices to consult a qualified obstetrician.</p>
        <h2 style="color: #5D1A00; font-size: 1.5rem;">4. Sources & Citations</h2>
        <p>All physiological and nutritional claims are referenced against recognized national/international health authorities (ICMR, WHO, ACOG, Ministry of AYUSH) and classical treatises (Charaka Samhita).</p>
        <h2 style="color: #5D1A00; font-size: 1.5rem;">5. Corrections Policy</h2>
        <p>Readers and clinicians may report factual updates or corrections to <a href="mailto:divinegarbhsanskar0312@gmail.com">divinegarbhsanskar0312@gmail.com</a>. Corrections are reviewed and resolved within 48 hours.</p>
      </section>
    `
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Medical & Health Disclaimer</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Important Health Safety & Clinical Boundaries Notice</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <div style="background-color: #FFF8E7; border-left: 4px solid #D4AF37; padding: 1.25rem; margin-bottom: 2rem;">
          <h3 style="margin-top: 0; color: #5D1A00;">Educational & Cultural Purpose Only</h3>
          <p style="margin-bottom: 0;">All content on Divine Garbh Sanskar (articles, audio ragas, dietary charts, and yoga guidance) is provided strictly for educational, traditional cultural, and maternal lifestyle wellness purposes. It is NOT clinical medical advice, diagnosis, or treatment.</p>
        </div>
        <h2 style="color: #5D1A00; font-size: 1.5rem;">1. Mandatory Doctor Consultation</h2>
        <p>Every expecting mother must maintain regular checkups with her qualified obstetrician or gynecologist. Never discontinue prescribed prenatal vitamins, medications, or clinical tests based on information on this website.</p>
        <h2 style="color: #5D1A00; font-size: 1.5rem;">2. Traditional Beliefs vs Proven Clinical Outcomes</h2>
        <p>Vedic Garbh Sanskar focuses on positive mindset, satvik lifestyle, classical music, and emotional bonding. We do NOT guarantee medical outcomes, specific birth modes (such as guaranteeing normal delivery), or specific baby traits. Delivery and fetal health depend on biological and clinical factors monitored by doctors.</p>
        <h2 style="color: #5D1A00; font-size: 1.5rem;">3. Medical Emergencies</h2>
        <p>In case of severe abdominal pain, vaginal bleeding, fluid leakage, decreased fetal movement, or acute discomfort, seek immediate emergency medical care at a hospital.</p>
      </section>
    `
  },
  {
    path: '/courses',
    title: 'Our Programs & Courses | Divine Garbh Sanskar',
    description: 'Explore our guided Garbh Sanskar prenatal programs: Starter, Complete, and Divine Plus. Trimester-wise daily activities, counseling sessions, and materials.',
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Garbh Sanskar Programs & Courses</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Structured Trimester-by-Trimester Guided Prenatal Education</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Transformative Pregnancy Journey</h2>
        <p>Our courses offer day-by-day practical guidance designed to reduce maternal anxiety, foster deep emotional connection with your baby, and promote physical wellbeing through gentle movement and Satvik nutrition.</p>
      </section>
    `
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Simantonayan (Godh Bharai) Sanskar Guidance</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Sacred Vedic Prenatal Ritual for Maternal Wellbeing & Joyful Blessings</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <h2 style="color: #5D1A00; font-size: 1.5rem;">Significance of the 3rd Trimester Ritual</h2>
        <p>Simantonayan is one of the 16 sacred Vedic Samskaras performed during the 7th or 8th month of pregnancy. Its primary Vedic purpose is to uplift the mother's mental state, protect her nervous system, and surround the developing fetus with auspicious vibrations.</p>
      </section>
    `
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
        <ul>
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
        <p><strong>Phone / WhatsApp:</strong> <a href="tel:+919638484545">+91 96384 84545</a></p>
        <p><strong>Email:</strong> <a href="mailto:divinegarbhsanskar0312@gmail.com">divinegarbhsanskar0312@gmail.com</a></p>
        <p><strong>Working Hours:</strong> Monday – Saturday: 09:00 AM – 06:00 PM IST</p>
      </section>
    `
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Divine Garbh Sanskar',
    description: 'Learn how Divine Garbh Sanskar collects, protects, and handles user data in compliance with GDPR, Indian data laws, and Google AdSense privacy policies.',
    keywords: 'privacy policy, user data, Divine Garbh Sanskar',
    canonical: 'https://www.thedivinegarbhsanskar.com/privacy-policy',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "url": "https://www.thedivinegarbhsanskar.com/privacy-policy"
      }
    ],
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Privacy Policy</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Transparency in Data Protection & Privacy Rights</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <p>Divine Garbh Sanskar respects your privacy and is committed to protecting your personal information. We outline our data collection, cookie usage, analytics, and third-party ad network policies in full transparency.</p>
      </section>
    `
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Terms of Service</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">User Agreement & Educational Scope</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <p>By accessing Divine Garbh Sanskar, you agree to these Terms of Service. All course materials, audio recordings, and publications are protected educational assets under Indian copyright laws.</p>
      </section>
    `
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
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Refund & Cancellation Policy</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Fair & Transparent Enrollment Guidelines</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <p>We want every mother to feel completely comfortable with our guidance. We offer a 7-day money-back guarantee for course enrollments if you feel the program does not meet your expectations, with special medical emergency accommodation.</p>
      </section>
    `
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | Divine Garbh Sanskar',
    description: 'Information regarding the use of cookies, analytics tags, and preference storage on Divine Garbh Sanskar.',
    keywords: 'cookie policy, consent preferences, Divine Garbh Sanskar',
    canonical: 'https://www.thedivinegarbhsanskar.com/cookie-policy',
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Cookie Policy",
        "url": "https://www.thedivinegarbhsanskar.com/cookie-policy"
      }
    ],
    htmlContent: `
      <header style="border-bottom: 2px solid #D4AF37; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <h1 style="color: #5D1A00; font-size: 2.2rem; margin: 0 0 0.5rem 0;">Cookie Policy</h1>
        <p style="font-size: 1.2rem; color: #8B2500; margin: 0;">Cookie Usage & Consent Management</p>
      </header>
      <section style="margin-bottom: 2rem; line-height: 1.8;">
        <p>This Cookie Policy explains how Divine Garbh Sanskar uses essential cookies for site functionality and optional cookies for analytics and advertising preferences.</p>
      </section>
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
      <nav style="margin-bottom: 1.5rem;">
        <a href="/blog" style="color: #8B2500; font-weight: bold; text-decoration: none;">← Back to All Articles</a>
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

console.log(`Prerendering ${routes.length} static routes for Googlebot & crawler visibility...`);

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

  // 3. Replace Canonical
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`);

  // 4. Replace Open Graph Tags
  html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  html = html.replace(/<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${escapeHtml(route.canonical)}" />`);
  if (route.image) {
    html = html.replace(/<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${escapeHtml(route.image)}" />`);
  }

  // 5. Replace Twitter Tags
  html = html.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = html.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);
  if (route.image) {
    html = html.replace(/<meta\s+name=["']twitter:image["'][^>]*>/i, `<meta name="twitter:image" content="${escapeHtml(route.image)}" />`);
  }

  // 6. Inject Structured Data Scripts into <head>
  if (route.structuredData && route.structuredData.length > 0) {
    const jsonLdScripts = route.structuredData.map(sd => `\n    <script type="application/ld+json">\n${JSON.stringify(sd, null, 2)}\n    </script>`).join('');
    html = html.replace('</head>', `${jsonLdScripts}\n  </head>`);
  }

  // 7. Inject Semantic Static Content into <div id="root"> and <noscript>
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
          <a href="/contact" style="color: #8B2500;">Contact</a>
        </p>
      </footer>
    </div>
  `;

  // Inject directly inside #root for immediate first-paint / headless crawler DOM visibility
  html = html.replace('<div id="root"></div>', `<div id="root">${staticBody}</div>`);

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
