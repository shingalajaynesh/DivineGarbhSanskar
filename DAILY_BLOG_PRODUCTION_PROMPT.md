# Daily Blog Production Master Prompt & Workflow Guide
**The Divine Garbh Sanskar — Content Publishing Engine**

This document provides the standard operating procedure (SOP), copy-pasteable AI generation prompt, exact code template, and 3-step publishing checklist for producing high-ranking, Google AdSense-approved, trilingual (English, Hindi, Gujarati) Garbh Sanskar and maternal wellness guides.

---

## 1. Master AI Generation Prompt (Copy & Paste to Produce New Articles)

```markdown
You are a senior Ayurvedic physician and prenatal wellness researcher collaborating with Dr. Taruna Jiyani (Founder & Lead Counselor at Divine Garbh Sanskar, Surat).

TASK:
Write a comprehensive, authoritative, medical-and-Vedic balanced blog guide on the following topic:
[INSERT TOPIC HERE, e.g. "Third Trimester Pelvic Exercises and Perineal Massage for Gentle Natural Delivery"]

STRICT QUALITY & ADSENSE COMPLIANCE RULES:
1. Word Count: 1,200 to 1,800 in-depth words. Avoid fluffy generic introductions.
2. Tone: Warm, scientifically grounded, culturally prestigious, and compassionate.
3. No AI Artifacts: DO NOT use star decorators (✦), emojis (🩺, ⭐, ★), raw bullet arrows (➜, ✓), or repetitive transitional phrases ("delve into", "testament to", "unlock", "in conclusion").
4. Medical Safety: Provide evidence-based explanations combined with classical Ayurvedic references (Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, or modern PubMed / WHO / ACOG clinical studies).
5. Languages: Provide complete, natural, and culturally authentic translations in:
   - English (en)
   - Hindi (hi)
   - Gujarati (gu)
6. Master Categories: Assign EXACTLY one of these 5 clean categories:
   - "Nutrition & Diet" (पोषण एवं आहार / પોષણ અને આહાર)
   - "Vedic Science & Ragas" (वैदिक विज्ञान एवं राग संगीत / વૈદિક વિજ્ઞાન અને રાગ સંગીત)
   - "Yoga & Meditation" (योग एवं ध्यान / યોગ અને ધ્યાન)
   - "Trimesters & Delivery" (त्रैमासिक एवं प्रसव तैयारी / ત્રિમાસિક અને પ્રસૂતિ)
   - "Maternal Wellbeing" (मातृ स्वास्थ्य एवं जीवनशैली / માતૃ સ્વાસ્થ્ય અને જીવનશૈલી)

OUTPUT FORMAT:
Output ONLY valid JavaScript object code ready to be pasted into `src/data/blogPosts.js`.
```

---

## 2. JavaScript Data Structure Specification

Every new article must match this exact object structure in [`src/data/blogPosts.js`](file:///d:/WEBSITE%20DEVELOPMENT/thedivinegarbhsanskar/Divine-website/src/data/blogPosts.js):

```javascript
{
  id: 29, // Increment ID sequentially
  slug: "sample-article-slug-format",
  date: "2026-05-28", // YYYY-MM-DD
  readTime: "12 min read",
  image: "https://images.unsplash.com/photo-XXXXXXXXXXXX?auto=format&fit=crop&q=80&w=1200", // Must return HTTP 200
  category: {
    en: "Nutrition & Diet", // One of 5 master categories
    hi: "पोषण एवं आहार",
    gu: "પોષણ અને આહાર"
  },
  title: {
    en: "Sample Comprehensive Title in English",
    hi: "हिंदी में संपूर्ण एवं प्रामाणिक शीर्षक",
    gu: "ગુજરાતીમાં સંપૂર્ણ અને પ્રમાણભૂત શીર્ષક"
  },
  description: {
    en: "A 2-sentence summary providing clear context, targeted keywords, and value for the expectant mother.",
    hi: "गर्भवती माताओं के लिए 2-वाक्यों का सारगर्भित और ज्ञानवर्धक विवरण।",
    gu: "ગર્ભવતી માતાઓ માટે ૨ વાક્યોમાં વિસ્તૃત અને ઉપયોગી સારાંશ."
  },
  keywords: "keyword 1, keyword 2, pregnancy care india, garbh sanskar guide, dr taruna jiyani",
  sections: [
    {
      heading: "1. Section Heading One",
      paragraphs: [
        "First detailed paragraph exploring the biological and spiritual fundamentals...",
        "Second paragraph providing actionable guidance, exact measurements, and timing..."
      ]
    },
    {
      heading: "2. Section Heading Two",
      paragraphs: [
        "1. First step or dietary recommendation with clinical/Ayurvedic context...",
        "2. Second step with safety guidelines and best practices..."
      ]
    },
    {
      heading: "3. Section Heading Three",
      paragraphs: [
        "Further deep exploration..."
      ]
    },
    {
      heading: "4. Section Heading Four",
      paragraphs: [
        "Summary of daily integration..."
      ]
    }
  ],
  faqs: [
    {
      question: "Common practical question asked by expectant parents?",
      answer: "Direct, reassuring, and evidence-based answer providing exact clarity."
    },
    {
      question: "When should medical attention or doctor consultation be sought?",
      answer: "Clear guidance highlighting red-flag symptoms and professional boundaries."
    }
  ],
  references: [
    "World Health Organization or PubMed Clinical Study Citation.",
    "Classical Ayurvedic Reference (e.g., Charaka Samhita, Sharira Sthana, Chapter 8)."
  ]
}
```

---

## 3. The 3-Step Publishing Workflow

### Step 1: Add to Data File
- Open [`src/data/blogPosts.js`](file:///d:/WEBSITE%20DEVELOPMENT/thedivinegarbhsanskar/Divine-website/src/data/blogPosts.js)
- Append your new article object to the `blogPosts` array before the closing bracket `];`.
- Verify the `id` is incremented and `slug` is URL-safe and unique.

### Step 2: Update XML Sitemap
- Open [`public/sitemap.xml`](file:///d:/WEBSITE%20DEVELOPMENT/thedivinegarbhsanskar/Divine-website/public/sitemap.xml)
- Add a new `<url>` entry before `</urlset>`:
```xml
  <url>
    <loc>https://www.thedivinegarbhsanskar.com/blog/YOUR-NEW-SLUG</loc>
    <lastmod>2026-08-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

### Step 3: Update Fallback Link in HTML
- Open [`index.html`](file:///d:/WEBSITE%20DEVELOPMENT/thedivinegarbhsanskar/Divine-website/index.html)
- Add a fallback link under `<noscript>`:
```html
<li><a href="https://www.thedivinegarbhsanskar.com/blog/YOUR-NEW-SLUG" style="color: #B22222;">Article Title Here</a></li>
```

### Step 4: Validate Production Build
Run in terminal:
```bash
npm run build
```
Ensure build exits with code `0`.

---

## 4. 50+ High-Search-Volume Topic Bank for Daily Publishing

### A. Nutrition & Diet (पोषण एवं आहार)
1. `benefits-of-a2-cow-ghee-in-pregnancy`: "The Truth About A2 Cow Desi Ghee in Pregnancy: Dosage, Digestion & Labor Preparation"
2. `dry-fruits-and-nuts-daily-chart-pregnancy`: "Daily Dry Fruits Chart for Pregnancy: Soaking Rules, Almonds, Walnuts & Munakka"
3. `calcium-rich-indian-pregnancy-foods`: "Top 10 Plant-Based Calcium Foods in Indian Diet for Fetal Bone Density"
4. `protein-sources-for-vegetarian-pregnancy`: "High-Protein Vegetarian Diet for Indian Pregnancy: Paneer, Moong, Sattu & Seeds"
5. `coconut-water-benefits-and-best-time-pregnancy`: "Tender Coconut Water in Pregnancy: Amniotic Fluid, Electrolytes & Best Time to Drink"
6. `safe-fruits-during-pregnancy-chart`: "Indian Pregnancy Fruit Guide: What to Eat Every Trimester and What to Avoid"
7. `winter-pregnancy-diet-indian-superfoods`: "Winter Pregnancy Nutrition in India: Gond Ladoo, Sesame & Warming Satvik Foods"
8. `summer-pregnancy-cooling-ayurvedic-drinks`: "Beating Summer Pregnancy Heat: Sattu, Bel Sharbat & Fennel Infusions"
9. `fiber-rich-foods-for-pregnancy-constipation`: "Natural Relief for Pregnancy Constipation: High-Fiber Satvik Diet & Triphala Caution"
10. `herbal-teas-safe-for-pregnancy`: "Safe Herbal Teas During Pregnancy: CCF Tea, Chamomile & Mint Guidelines"

### B. Vedic Science & Ragas (वैदिक विज्ञान एवं संगीत)
11. `raga-yaman-pregnancy-benefits`: "Raga Yaman for Pregnancy: Evening Sound Therapy for Fetal Calming and Deep Sleep"
12. `raga-bhupali-fetal-brain-stimulation`: "Raga Bhupali & Fetal Intellect: Uplifting Sound Frequencies for Morning Meditation"
13. `gayatri-mantra-chanting-during-pregnancy`: "The Science of Gayatri Mantra Chanting in Pregnancy: Acoustic Vibrations in Amniotic Fluid"
14. `atharva-veda-garbha-upanishad-insights`: "Garbha Upanishad Decoded: Ancient Embryology and Consciousness in the Womb"
15. `garbh-kavach-spiritual-protection`: "Garbh Rakshambika Stotram & Garbh Kavach: Spiritual Affirmations for Safe Pregnancy"
16. `vedic-names-for-baby-with-spiritual-meanings`: "Choosing Meaningful Vedic Names for Baby Based on Nakshatra and Sound Vibrations"
17. `sound-therapy-for-baby-kick-response`: "Fetal Sound Mapping: How Classical Indian Instruments (Veena, Flute, Santoor) Soothe the Womb"
18. `panch-kosha-development-in-womb`: "The 5 Layers of Consciousness (Pancha Kosha) Developed During Garbh Sanskar"
19. `abhimanyu-garbh-sanskar-story-science`: "The Story of Abhimanyu & Womb Learning: What Modern Neuroscience Confirms"
20. `sacred-symbols-rangoli-mandala-pregnancy`: "Mandala Art & Sacred Geometries: Calming Maternal Alpha Brainwaves"

### C. Yoga & Meditation (योग एवं ध्यान)
21. `anulom-vilom-pranayama-pregnancy-guide`: "Anulom Vilom Pranayama in Pregnancy: Oxygenating the Placenta and Balancing Hemispheres"
22. `bhramari-pranayama-pregnancy-blood-pressure`: "Bhramari (Humming Bee Breath): Lowering Maternal Nitric Oxide & Regulating Blood Pressure"
23. `safe-standing-yoga-poses-first-trimester`: "Gentle Standing Asanas for Trimester 1: Tadasana, Vrikshasana & Posture Alignment"
24. `butterfly-pose-baddha-konasana-benefits`: "Butterfly Pose (Baddha Konasana): Pelvic Flexibility, Circulation & Groin Relief"
25. `cat-cow-marjariasana-back-pain-relief`: "Cat-Cow Pose (Marjariasana): Relieving Sciatica, Sacroiliac Pain & Spinal Decompression"
26. `yoga-poses-to-avoid-during-pregnancy`: "Asanas to Avoid in Pregnancy: Deep Twists, Inversions, Supine Poses & Jump Backs"
27. `guided-womb-meditation-script-for-mothers`: "10-Minute Daily Guided Womb Meditation: Connecting with Baby's Prana"
28. `pelvic-floor-kegel-exercises-guide`: "Mastering Kegel Exercises: Pelvic Muscle Control for Birth and Postpartum Recovery"
29. `yoga-nidra-script-for-pregnancy-sleep`: "Prenatal Yoga Nidra Script: Overcoming Insomnia and Restoring Cellular Vitality"
30. `walking-routine-step-count-during-pregnancy`: "Daily Walking Guide for Pregnant Women: Pace, Duration, Footwear & Hydration"

### D. Trimesters & Delivery (त्रैमासिक एवं प्रसव तैयारी)
31. `first-ultrasound-scan-what-to-expect`: "Your First Trimester Ultrasound (NT Scan & Viability): Understanding Milestones"
32. `anomaly-scan-level-2-ultrasound-guide`: "The 20-Week Anomaly Scan (Level 2 Ultrasound): What Doctors Check in Fetal Anatomy"
33. `breech-baby-natural-turning-exercises`: "Natural Techniques to Encourage Breech Baby to Turn Head Down (Cephalic)"
34. `how-to-create-a-gentle-birth-plan`: "Writing a Positive Hospital Birth Plan: Pain Management, Delayed Cord Clamping & Doula Support"
35. `hospital-bag-checklist-indian-mothers`: "Complete Hospital Bag Checklist for Indian Mothers: Essentials for Mom, Baby & Dad"
36. `stages-of-labor-what-happens-in-each-stage`: "The 3 Stages of Labor Explained: Latent, Active, Transition & Pushing"
37. `breathing-techniques-during-labor-contractions`: "4 Rhythmic Labor Breathing Techniques: Managing Surges Without Hyperventilating"
38. `water-birth-in-india-benefits-and-readiness`: "Water Birth in India: Warm Water Immersion, Benefits, Safety & Hospital Selection"
39. `natural-induction-methods-what-works`: "Natural Labor Induction: Dates, Walking, Acupressure & What to Avoid"
40. `cesarean-recovery-tips-ayurvedic-care`: "Holistic Recovery After C-Section: Wound Care, Gentle Mobility & Nutrient Support"

### E. Maternal Wellbeing & Lifestyle (मातृ स्वास्थ्य एवं जीवनशैली)
41. `managing-pregnancy-anxiety-and-fear-of-birth`: "Overcoming Tokophobia (Fear of Birth): Cognitive Reframing and Vedic Trust"
42. `pregnancy-stretch-marks-natural-oils`: "Preventing & Soothing Stretch Marks: Pure Coconut Oil, Kumkumadi & Hydration"
43. `skin-care-and-hair-fall-during-pregnancy`: "Safe Pregnancy Skincare: Combating Melasma, Acne & Safe Natural Ingredients"
44. `working-women-pregnancy-workplace-tips`: "Pregnancy at Work: Managing Commuting, Ergonomics, Screen Time & Lunch Packing"
45. `traveling-by-flight-and-car-during-pregnancy`: "Safe Travel Guidelines: Airline Regulations, Seatbelt Safety & Road Trips"
46. `household-chores-safe-vs-unsafe-in-pregnancy`: "Indian Household Chores During Pregnancy: What is Safe to Do and What to Delegate"
47. `building-strong-immune-system-in-pregnancy`: "Strengthening Maternal Immunity Naturally: Amla, Tulsi Infusions & Zinc Foods"
48. `postpartum-diet-gond-ladoo-panjiri-recipe`: "Traditional Postpartum Healing Foods: Gond Ke Ladoo, Panjiri & Dashmool Decoctions"
49. `baby-massage-oil-abhyanga-for-newborns`: "Newborn Ayurvedic Massage (Shishu Abhyanga): Virgin Coconut vs Sesame Oil Guidelines"
50. `emotional-wellbeing-postpartum-blues-prevention`: "Preventing Postpartum Depression (PPD): Family Support, Rest & Hormonal Rebalancing"
