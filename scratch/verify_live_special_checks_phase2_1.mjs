import fs from 'fs';

const BASE_URL = 'https://www.thedivinegarbhsanskar.com';

async function runDetailedChecks() {
  console.log('--- RUNNING SPECIAL YMYL, GLOBAL SEARCH, REFERENCES & PHASE 1 REGRESSION CHECKS ON LIVE PRODUCTION ---');
  const report = {
    step3_ymyl: {},
    step4_global_search: {},
    step5_references: {},
    step6_phase1_regression: {}
  };

  // Helper fetch
  async function fetchLive(path) {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    const status = res.status;
    const html = await res.text();
    return { status, html };
  }

  // STEP 3: Special YMYL Live Checks
  console.log('\n--- Step 3: Priority YMYL Articles ---');
  
  // 1. GDM
  const gdm = await fetchLive('/blog/gestational-diabetes-diet-and-ayurvedic-lifestyle');
  report.step3_ymyl.gdm = {
    status: gdm.status,
    noCureOrReversal: !gdm.html.toLowerCase().includes('cure diabetes') && !gdm.html.toLowerCase().includes('reverse diabetes') && !gdm.html.toLowerCase().includes('reversing gestational diabetes'),
    noPancreaticStimulation: !gdm.html.toLowerCase().includes('pancreatic stimulation'),
    medicalMonitoringRequired: gdm.html.includes('Oral Glucose Tolerance Test') && gdm.html.includes('obstetrician'),
    medicationNotDiscouraged: gdm.html.includes('Never stop or alter prescribed insulin or oral medications'),
    pass: false
  };
  report.step3_ymyl.gdm.pass = report.step3_ymyl.gdm.noCureOrReversal && 
                               report.step3_ymyl.gdm.noPancreaticStimulation && 
                               report.step3_ymyl.gdm.medicalMonitoringRequired && 
                               report.step3_ymyl.gdm.medicationNotDiscouraged;
  console.log('GDM checks:', report.step3_ymyl.gdm);

  // 2. Safe Herbs
  const herbs = await fetchLive('/blog/safe-herbs-and-ayurvedic-spices-during-pregnancy');
  report.step3_ymyl.herbs = {
    status: herbs.status,
    culinaryVsMedicinalSeparated: herbs.html.includes('Culinary Pinch vs. Medicinal Dose') || herbs.html.includes('Culinary Spices vs. Medicinal Extracts'),
    noFairSkin: !herbs.html.toLowerCase().includes('fair skin') && !herbs.html.toLowerCase().includes('fair baby') && !herbs.html.includes('गोरा बच्चा'),
    noBloodPurificationDetox: !herbs.html.toLowerCase().includes('blood purification') && !herbs.html.toLowerCase().includes('detoxifies fetal blood'),
    noUnsupportedTherapeuticDosage: !herbs.html.toLowerCase().includes('therapeutic dosage of saffron'),
    concentratedExtractsWarning: herbs.html.includes('obstetrician') && herbs.html.includes('contraindicated'),
    pass: false
  };
  report.step3_ymyl.herbs.pass = report.step3_ymyl.herbs.culinaryVsMedicinalSeparated && 
                                 report.step3_ymyl.herbs.noFairSkin && 
                                 report.step3_ymyl.herbs.noBloodPurificationDetox && 
                                 report.step3_ymyl.herbs.concentratedExtractsWarning;
  console.log('Herbs checks:', report.step3_ymyl.herbs);

  // 3. Safe Prenatal Yoga
  const yoga = await fetchLive('/blog/safe-prenatal-yoga-for-normal-delivery');
  report.step3_ymyl.yoga = {
    status: yoga.status,
    noGuaranteeNormalDelivery: !yoga.html.toLowerCase().includes('guarantee a normal') && !yoga.html.toLowerCase().includes('guarantees normal delivery'),
    deliveryModeDependsOnObstetrics: yoga.html.includes('No exercise or movement routine can determine or ensure a specific birth mode'),
    contraindicationsVisible: yoga.html.includes('placenta previa') && yoga.html.includes('medical clearance'),
    pass: false
  };
  report.step3_ymyl.yoga.pass = report.step3_ymyl.yoga.noGuaranteeNormalDelivery && 
                                report.step3_ymyl.yoga.deliveryModeDependsOnObstetrics && 
                                report.step3_ymyl.yoga.contraindicationsVisible;
  console.log('Yoga checks:', report.step3_ymyl.yoga);

  // 4. Normal Delivery Prep
  const labor = await fetchLive('/blog/normal-delivery-preparation-pelvic-exercises-and-diet');
  report.step3_ymyl.labor = {
    status: labor.status,
    noCsectionAvoidanceOrFailure: !labor.html.toLowerCase().includes('avoid c-section at all costs') && !labor.html.toLowerCase().includes('failure of natural birth'),
    noGheeLubricatesBirthCanal: !labor.html.toLowerCase().includes('lubricate the birth canal') && !labor.html.toLowerCase().includes('lubricates the pelvic canal'),
    traditionalAyurvedaLabeled: labor.html.includes('Charaka Samhita') && labor.html.includes('traditional'),
    pass: false
  };
  report.step3_ymyl.labor.pass = report.step3_ymyl.labor.noCsectionAvoidanceOrFailure && 
                                 report.step3_ymyl.labor.noGheeLubricatesBirthCanal && 
                                 report.step3_ymyl.labor.traditionalAyurvedaLabeled;
  console.log('Labor Prep checks:', report.step3_ymyl.labor);

  // 5. Twin Pregnancy
  const twins = await fetchLive('/blog/twin-pregnancy-care-and-garbh-sanskar-guidance');
  report.step3_ymyl.twins = {
    status: twins.status,
    noRoutinePelvicRest: !twins.html.toLowerCase().includes('pelvic rest'),
    noGenericBedRest: !twins.html.toLowerCase().includes('routine bed rest') || twins.html.includes('Avoid Routine Bed Rest'),
    noPreventPrematureBirthClaim: !twins.html.toLowerCase().includes('garbh sanskar prevents premature birth'),
    individualizedActivityGuidance: twins.html.includes('Individualized Activity Modifications') || twins.html.includes('individualized activity changes'),
    closerClinicalMonitoring: twins.html.includes('closer obstetric surveillance') && twins.html.includes('chorionicity'),
    pass: false
  };
  report.step3_ymyl.twins.pass = report.step3_ymyl.twins.noRoutinePelvicRest && 
                                 report.step3_ymyl.twins.noPreventPrematureBirthClaim && 
                                 report.step3_ymyl.twins.individualizedActivityGuidance && 
                                 report.step3_ymyl.twins.closerClinicalMonitoring;
  console.log('Twins checks:', report.step3_ymyl.twins);

  // 6. Meditation & Mantra
  const med = await fetchLive('/blog/pregnancy-meditation-and-mantra-benefits');
  report.step3_ymyl.meditation = {
    status: med.status,
    noCerebrospinalResonance: !med.html.toLowerCase().includes('cerebrospinal'),
    noFetalHormonalBenefits: !med.html.toLowerCase().includes('fetal hormones'),
    noUnsupportedVagalMechanisms: !med.html.toLowerCase().includes('vagal') && !med.html.toLowerCase().includes('vagus'),
    pass: false
  };
  report.step3_ymyl.meditation.pass = report.step3_ymyl.meditation.noCerebrospinalResonance && 
                                      report.step3_ymyl.meditation.noFetalHormonalBenefits && 
                                      report.step3_ymyl.meditation.noUnsupportedVagalMechanisms;
  console.log('Meditation checks:', report.step3_ymyl.meditation);

  // 7. Father's Role
  const father = await fetchLive('/blog/father-role-in-garbh-sanskar-prenatal-support');
  report.step3_ymyl.father = {
    status: father.status,
    noLowerPitchAcousticPenetration: !father.html.toLowerCase().includes('acoustic penetration') && !father.html.toLowerCase().includes('penetrates amniotic fluid with remarkable clarity'),
    noFetalBrainStimulation: !father.html.toLowerCase().includes('stimulate the fetal brain'),
    pass: false
  };
  report.step3_ymyl.father.pass = report.step3_ymyl.father.noLowerPitchAcousticPenetration && 
                                  report.step3_ymyl.father.noFetalBrainStimulation;
  console.log('Father Role checks:', report.step3_ymyl.father);

  // 8. Breastfeeding Prep
  const bfeed = await fetchLive('/blog/breastfeeding-preparation-and-lactation-ayurvedic-guide');
  report.step3_ymyl.breastfeeding = {
    status: bfeed.status,
    noUniversalPre37wNippleProhibition: !bfeed.html.toLowerCase().includes('never stimulate nipples before 37 weeks') && !bfeed.html.toLowerCase().includes('strictly avoid nipple stimulation before week 37'),
    antenatalColostrumDeferredToDoctor: bfeed.html.includes('Discuss antenatal colostrum harvesting with your maternity care team'),
    pass: false
  };
  report.step3_ymyl.breastfeeding.pass = report.step3_ymyl.breastfeeding.noUniversalPre37wNippleProhibition && 
                                         report.step3_ymyl.breastfeeding.antenatalColostrumDeferredToDoctor;
  console.log('Breastfeeding checks:', report.step3_ymyl.breastfeeding);

  // STEP 4: Global Live Search across all blog pages
  console.log('\n--- Step 4: Global Concept Search across Live Articles ---');
  const forbiddenConcepts = [
    'guarantee normal delivery',
    'reverse diabetes',
    'pancreatic stimulation',
    'fair baby',
    'fair skin',
    'pelvic rest',
    'stimulates iq',
    'genius baby',
    'fetal iq',
    'cerebrospinal',
    'acoustic penetration',
    'lower-pitched voice penetrates',
    'vagus nerve',
    'યોનિમાર્ગને ઉત્તેજિત', // old mistranslation
    'birth canal lubrication',
    'doctor guarantee'
  ];

  const blogListRes = await fetch(`${BASE_URL}/blog`);
  const blogListHtml = await blogListRes.text();
  
  // Check priority pages specifically for forbidden concepts
  const priorityPages = [
    '/blog/gestational-diabetes-diet-and-ayurvedic-lifestyle',
    '/blog/safe-herbs-and-ayurvedic-spices-during-pregnancy',
    '/blog/safe-prenatal-yoga-for-normal-delivery',
    '/blog/normal-delivery-preparation-pelvic-exercises-and-diet',
    '/blog/twin-pregnancy-care-and-garbh-sanskar-guidance',
    '/blog/pregnancy-meditation-and-mantra-benefits',
    '/blog/father-role-in-garbh-sanskar-prenatal-support',
    '/blog/breastfeeding-preparation-and-lactation-ayurvedic-guide',
    '/blog/music-and-ragas-during-pregnancy',
    '/blog/best-books-and-stories-to-read-during-pregnancy',
    '/blog/pregnancy-stress-management-tips'
  ];

  const globalSearchFindings = {};
  for (const p of priorityPages) {
    const pageData = await fetchLive(p);
    const htmlLower = pageData.html.toLowerCase();
    for (const concept of forbiddenConcepts) {
      if (htmlLower.includes(concept.toLowerCase())) {
        if (!globalSearchFindings[concept]) globalSearchFindings[concept] = [];
        globalSearchFindings[concept].push(p);
      }
    }
  }
  report.step4_global_search = globalSearchFindings;
  console.log('Global forbidden concepts findings:', globalSearchFindings);

  // STEP 5: Verify References on Live Articles
  console.log('\n--- Step 5: Verify Authentic References on Live Articles ---');
  report.step5_references = {
    acog_804: yoga.html.includes('Committee Opinion No. 804') && twins.html.includes('Committee Opinion No. 804'),
    acog_766: (await fetchLive('/blog/third-trimester-garbh-sanskar-preparation')).html.includes('Committee Opinion No. 766'),
    acog_231: twins.html.includes('Practice Bulletin No. 231'),
    acog_189: (await fetchLive('/blog/managing-morning-sickness-and-pregnancy-nausea')).html.includes('Practice Bulletin No. 189') && (await fetchLive('/blog/first-trimester-diet-guide')).html.includes('Practice Bulletin No. 189'),
    ada_gdm: gdm.html.includes('American Diabetes Association') && gdm.html.includes('Standards of Medical Care in Diabetes'),
    icmr_gdm: gdm.html.includes('Indian Council of Medical Research (ICMR)'),
    cochrane_labor: labor.html.includes('Beckmann, M. M., &amp; Stock, O. M. (2013)') || labor.html.includes('Beckmann, M. M., & Stock, O. M. (2013)'),
    no_acog_650_restored: !yoga.html.includes('Committee Opinion No. 650') && !twins.html.includes('Committee Opinion No. 650'),
    no_pb_209_for_labor: !(await fetchLive('/blog/third-trimester-garbh-sanskar-preparation')).html.includes('Practice Bulletin No. 209')
  };
  console.log('References verification:', report.step5_references);

  // STEP 6: Phase 1 Regression Checks
  console.log('\n--- Step 6: Phase 1 Regression Checks ---');
  const p1Pages = [
    { path: '/about', minWords: 350 },
    { path: '/authors', minWords: 500 },
    { path: '/editorial-policy', minWords: 350 },
    { path: '/disclaimer', minWords: 300 },
    { path: '/privacy-policy', minWords: 450 },
    { path: '/cookie-policy', minWords: 280 },
    { path: '/terms-of-service', minWords: 300 },
    { path: '/refund-policy', minWords: 250 },
    { path: '/courses', minWords: 300 },
    { path: '/simantonayan', minWords: 300 },
    { path: '/card', expectNoindex: true },
    { path: '/non-existent-url-regression-test', expect404: true }
  ];

  const p1Results = {};
  for (const p of p1Pages) {
    const res = await fetchLive(p.path);
    const cleaned = res.html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = cleaned ? cleaned.split(/\s+/).length : 0;

    const checks = {
      status: res.status,
      words
    };

    if (p.minWords) {
      checks.hasMinWords = words >= p.minWords;
    }
    if (p.expectNoindex) {
      checks.isNoindex = res.html.includes('noindex, nofollow');
    }
    if (p.expect404) {
      checks.is404 = res.status === 404;
    }
    if (p.path === '/privacy-policy') {
      checks.hasAdSense = res.html.includes('Google AdSense') && res.html.includes('DoubleClick DART');
    }
    if (p.path === '/authors') {
      checks.hasPillars = res.html.includes('Editorial Review Pillars') && !res.html.includes('Medical Review Board of Obstetricians');
    }

    p1Results[p.path] = checks;
  }

  // Check home page for stock portraits / "our doctors"
  const home = await fetchLive('/');
  p1Results['/'] = {
    status: home.status,
    noStockPhotos: !home.html.includes('images.unsplash.com/photo-1559839734') && !home.html.includes('images.unsplash.com/photo-1594824813637'),
    noOurDoctorsWording: !home.html.includes('हमारे डॉक्टर और काउंसलर')
  };

  report.step6_phase1_regression = p1Results;
  console.log('Phase 1 regression results:', p1Results);

  fs.writeFileSync('scratch/live_special_checks_report.json', JSON.stringify(report, null, 2), 'utf-8');
  console.log('\nAll detailed live checks completed and saved to scratch/live_special_checks_report.json');
}

runDetailedChecks();
