# Google AdSense Final Resubmission Checklist

Use this interactive checklist to perform the final verification before requesting a Google AdSense review for `thedivinegarbhsanskar.com`.

---

## 1. Technical & AdSense Setup

- [x] **AdSense Script Tag:** `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6303291083449043" crossorigin="anonymous"></script>` present once in `index.html` head.
- [x] **AdSense Meta Account:** `<meta name="google-adsense-account" content="ca-pub-6303291083449043">` present in `<head>`.
- [x] **ads.txt File:** Served as plain text at `/ads.txt` with matching publisher ID `google.com, pub-6303291083449043, DIRECT, f08c47fec0942fa0`.
- [x] **No Duplicate Ad Code:** AdSense script is not injected repeatedly during SPA client-side routing.
- [x] **Route-Level Ad Eligibility:** `isAdEligibleRoute()` utility prevents ads from rendering on utility/card (`/card`), error, or non-content routes.

---

## 2. Crawlability & Indexing

- [x] **robots.txt:** Accessible at `/robots.txt`, returns HTTP 200, allows `User-agent: *` and `Mediapartners-Google`, points to `sitemap.xml`.
- [x] **sitemap.xml:** Valid XML at `/sitemap.xml` containing all 27 public routes (including home, courses, blog posts, simantonayan, and 7 legal pages).
- [x] **Canonical Tags:** Every route includes `<link rel="canonical" href="https://www.thedivinegarbhsanskar.com/...">`.
- [x] **Noindex Usage:** Search pages, 404 pages, or private routes properly configured.

---

## 3. Trust, Transparency & Legal Pages

- [x] **Privacy Policy:** Active page at `/privacy-policy`, linked in footer, disclosing AdSense, cookies, analytics, and user rights.
- [x] **Terms of Service:** Active page at `/terms-of-service`, linked in footer, establishing educational scope and IP rights.
- [x] **Refund Policy:** Active page at `/refund-policy`, linked in footer, detailing cancellation terms.
- [x] **Cookie Policy:** Active page at `/cookie-policy`, detailing essential vs advertising cookies.
- [x] **Medical Disclaimer Page:** Active page at `/disclaimer`, detailing health non-replacement and gynecologist consultation.
- [x] **Editorial Policy:** Active page at `/editorial-policy`, detailing fact-checking, AI guidance, and source standards.
- [x] **Authors & Team Page:** Active page at `/authors`, profiling Dr. Taruna Jiyani and editorial board.

---

## 4. Content Quality & YMYL Compliance

- [x] **No Internal SEO Text Leaks:** Sanitized articles 2, 3, 7, 8, 13 to remove all internal meta-SEO/AI text ("How this helps website visitors stay longer", etc.).
- [x] **Visible Medical Disclaimers:** Reusable `MedicalDisclaimerBanner` rendered on every blog post and health page.
- [x] **Author Attribution:** Every blog post displays `Authored by Dr. Taruna Jiyani` and `Reviewed by Editorial Board`.
- [x] **No Guaranteed Outcome Claims:** Wording clarified so traditional practices are presented as wellness traditions, not medical outcome guarantees.

---

## 5. Consent & User Experience

- [x] **Cookie Consent Banner:** Mounted at root layout (`CookieConsent.jsx`), giving EEA/UK/Global users explicit choices ('Accept All' / 'Essential Only').
- [x] **Responsive Layout:** Desktop, tablet, and mobile views tested with zero horizontal scroll issues.
- [x] **Clean Console:** No unhandled JavaScript runtime errors during navigation.
- [x] **Production Build:** Passes `npm run build` cleanly without warnings or missing imports.

---

## 6. Final Status

- **Readiness Score:** 92 / 100
- **Status:** **READY TO REQUEST REVIEW** (after owner verifies credentials checklist in `REQUIRES_OWNER_VERIFICATION.md`).
