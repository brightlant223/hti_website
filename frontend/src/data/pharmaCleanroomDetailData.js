// =========================================================================
// HTI AUTOMATION — PHARMA CLEANROOM DETAIL CONFIGURATION DATA
// Dedicated product data module for Pharma Cleanroom products.
// Structured to allow adding more pharma products (Pass Boxes, GPS Clocks,
// Chiller Doors, Hermetic Doors) without changing the view component.
// =========================================================================

export const PHARMA_CLEANROOM_CONFIGS = {
  // ── 1. Door Interlock System (2-8 Door) ──────────────────────────────
  'door-interlock-system': {
    slug: 'door-interlock-system',
    name: 'Door Interlock System (2-8 Door)',
    breadcrumbName: 'Door Interlock System',
    categoryName: 'Pharma Cleanroom',
    categoryRoute: 'cleanroom-interlocks',
    
    // Tag Pills: PHARMA CLEANROOM (filled), USFDA 21 CFR PART 11 (outlined), CASCADING INTERLOCK LOGIC (soft red)
    badges: [
      { text: 'PHARMA CLEANROOM', type: 'solid-blue' },
      { text: 'USFDA 21 CFR PART 11', type: 'outlined' },
      { text: 'CASCADING INTERLOCK LOGIC', type: 'soft-red' }
    ],
    
    heading: 'Door Interlock System (2-8 Door)',
    heroDescription: 'Programmable cascading interlock controllers for pharmaceutical cleanrooms, airlocks and pass-through chambers. Only one door opens at a time, preserving pressure cascades and contamination control, with full status indication and fire-alarm override.',
    
    // Primary hero showcase image (mega-menu door interlock image)
    heroImage: '/products/cleanroom-interlocks.jpg',
    
    // Image Carousel slides (first slide uses mega-menu image; rest are clearly named placeholders)
    heroImages: [
      {
        id: 1,
        src: '/products/cleanroom-interlocks.jpg',
        alt: 'Door Interlock System (2-8 Door) - Central Controller and Door Station'
      },
      {
        id: 2,
        src: '/products/cleanroom-interlock-slide2.jpg',
        alt: 'Door Interlock System - Airlock Cascading Door Indicator Station'
      },
      {
        id: 3,
        src: '/products/cleanroom-interlock-slide3.jpg',
        alt: 'Door Interlock System - Touchless Sensor and Electromagnetic Lock Integration'
      },
      {
        id: 4,
        src: '/products/cleanroom-interlock-slide4.jpg',
        alt: 'Door Interlock System - Pharmaceutical Cleanroom Airlock Entry Suite'
      }
    ],

    // Trust Badges (3 items)
    trustIndicators: [
      { text: 'USFDA 21 CFR Part 11 Aligned', icon: 'ShieldCheck' },
      { text: 'Pan-India Commissioning', icon: 'Wrench' },
      { text: '24x7 Continuous Duty Rating', icon: 'Activity' }
    ],

    // Operational Showcase (Video / Feature Points)
    video: {
      hasVideoFile: true,
      videoSrc: '/products/door-interlock-showcase.mp4', // Placeholder video file
      poster: '/products/cleanroom-interlocks.jpg',
      badge: 'OPERATIONAL SHOWCASE',
      heading: 'Precision Logic for Controlled Environments',
      description: 'See how the interlock controller locks every other door in the airlock the moment one opens, keeps pressure cascades stable and gives clear red/green status at every entry.',
      bullets: [
        'Programmable 2 to 8 door cascading interlock logic',
        'Red/green status indicators and buzzer alarm at every door',
        'Emergency release integrated with the fire alarm panel',
        'Door-open timeout alarm and optional time-delay unlock'
      ]
    },

    // Engineering & Technical Overview (4 Cards)
    engineering: {
      tag: 'ENGINEERING & TECHNICAL OVERVIEW',
      heading: 'Designed for Contamination Control & Compliance',
      description: 'HTI Door Interlock Systems provide reliable, validated control of personnel and material movement between cleanroom zones. Built for pharma plants, hospitals, labs and food-processing facilities.',
      cards: [
        {
          title: 'Cascading Interlock Logic',
          desc: 'Only one door can be open at a time; the next door stays locked until the previous door is closed and sensed.',
          iconName: 'Layers',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Clear Status Indication',
          desc: 'Red/green LED indicators and optional buzzer at every door show when it is safe to enter.',
          iconName: 'Radio',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Fire & Emergency Override',
          desc: 'Integrated emergency release and fire alarm interface unlock all doors automatically for safe evacuation.',
          iconName: 'AlertCircle',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Audit-Ready Reliability',
          desc: 'Industrial-grade controller with fail-safe operation, event logging option and documentation support for validation.',
          iconName: 'ShieldCheck',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },

    // Technical Specifications Table & Standards
    // TODO: confirm specs with engineering team
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our cleanroom door interlock systems comply with international pharmaceutical and cleanroom engineering standards, ensuring reliable mutual exclusion, contamination defense and personnel safety.',
      tableRows: [
        { label: 'Interlock Configuration:', value: '2 to 8 door programmable cascading interlock' },
        { label: 'Controller:', value: 'Microprocessor / PLC-based interlock controller' },
        { label: 'Locking Method:', value: 'Electromagnetic lock (fail-safe, unlocks on power loss)' },
        { label: 'Door Status Sensing:', value: 'Magnetic reed switch per door' },
        { label: 'Indication:', value: 'Red/green LED and buzzer per door' },
        { label: 'Emergency Release:', value: 'Break-glass / push-to-exit with fire alarm interface' },
        { label: 'Power Supply:', value: '230V AC +/-10%, 50/60 Hz with 24V DC output' },
        { label: 'Backup:', value: 'Optional battery backup for lock and controller' },
        { label: 'Door Open Timeout:', value: 'Programmable alarm delay' },
        { label: 'Operating Temperature:', value: '0 to +50 C (indoor, controlled environment)' }
      ],
      // TODO: confirm certifications before publishing
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'USFDA 21 CFR Part 11 and cGMP compliant design practices',
        'CE Conformity',
        'ISO 9001:2015 Quality Management Certified',
        'Fire Alarm Interface: supervised dry contact, fail-safe unlock',
        'Cleanroom classification support (ISO 14644 / Schedule M environments)'
      ]
    },

    // Related Images Section
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our cleanroom door interlock systems across certified pharmaceutical suites.',
      images: [
        {
          id: 1,
          src: '/products/cleanroom-interlocks.jpg',
          caption: 'Door Interlock Controller with Red/Green Status Indicators'
        },
        {
          id: 2,
          src: '/hero-cleanroom-interlock-chamber.jpg',
          caption: 'Pharmaceutical Cleanroom Cascading Personnel Airlock'
        },
        {
          id: 3,
          src: '/hero-cleanroom-automation.jpg',
          caption: 'Airlock Cleanroom Entry Station with Wave Sensor'
        },
        {
          id: 4,
          src: '/services/service-cleanroom.jpg',
          caption: 'Stainless-Steel Sterile Pass-Through Interlock Door'
        }
      ]
    },

    // Related Products Carousel
    relatedProducts: {
      heading: 'Related Products',
      description: 'Explore companion pharmaceutical cleanroom solutions engineered for sterile contamination control.',
      products: [
        {
          id: 'pass-boxes',
          title: 'Dynamic & Static Pass Boxes',
          description: 'SS 304/316 cleanroom material transfer hatches with UV disinfection & magnetic interlocking.',
          image: '/products/pass-box-system.jpg',
          slug: 'dynamic-static-pass-boxes'
        },
        {
          id: 'gps-clocks',
          title: 'Digital Master GPS Slave Clocks',
          description: 'GPS synchronized cleanroom digital display clocks with pharma flush housings.',
          image: '/products/digital-clock-hero.jpg',
          slug: 'digital-gps-clocks'
        },
        {
          id: 'chiller-doors',
          title: 'Cold Storage & Chiller Doors',
          description: 'Heavy thermal-insulated sliding cold storage & cleanroom refrigeration doors.',
          image: '/products/chiller-door-hero.jpg',
          slug: 'chiller-clean-room-doors'
        },
        {
          id: 'hermetic-doors',
          title: 'Hermetically Sealed Cleanroom Doors',
          description: 'Airtight flush-fit antimicrobial cleanroom swing and sliding doors for sterile suites.',
          image: '/hero-cleanroom-interlock-chamber.jpg',
          slug: 'hermetic-cleanroom-doors'
        }
      ]
    }
  },

  // ── Extra Pharma Cleanroom Stubs (Future expansion ready) ───────────
  'dynamic-static-pass-boxes': {
    slug: 'dynamic-static-pass-boxes',
    name: 'Dynamic & Static Pass Boxes',
    breadcrumbName: 'Pass Boxes',
    categoryName: 'Pharma Cleanroom',
    categoryRoute: 'cleanroom-interlocks',
    badges: [
      { text: 'PHARMA CLEANROOM', type: 'solid-blue' },
      { text: 'ISO 14644 COMPLIANT', type: 'outlined' },
      { text: 'UV DISINFECTION', type: 'soft-red' }
    ],
    heading: 'Dynamic & Static Cleanroom Pass Boxes',
    heroDescription: 'Electro-magnetically interlocked stainless-steel material transfer hatches with HEPA laminar airflow, UV sterilization, and differential pressure gauges.',
    heroImage: '/products/pass-box-system.jpg',
    heroImages: [
      { id: 1, src: '/products/pass-box-system.jpg', alt: 'Dynamic Pass Box Hatch' }
    ],
    trustIndicators: [
      { text: 'Grade 304 / 316 Stainless Steel', icon: 'ShieldCheck' },
      { text: 'Interlocked Dual Doors', icon: 'Lock' },
      { text: 'HEPA H14 Filtered', icon: 'Sparkles' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/pass-box-system.jpg',
      badge: 'OPERATIONAL SHOWCASE',
      heading: 'Sterile Material Transfer Automation',
      description: 'Transfer supplies seamlessly across classification boundaries without cross-contamination.',
      bullets: [
        'Electromagnetic mutual door interlocking',
        'Programmable UV lamp exposure cycle timer',
        'Flush double-pane toughened glass viewing windows',
        'Magnehelic differential pressure gauge integration'
      ]
    },
    engineering: {
      tag: 'ENGINEERING & TECHNICAL OVERVIEW',
      heading: 'Material Transfer with Zero Cross-Contamination',
      description: 'Engineered for seamless transfer of tools, samples, and raw materials between clean and non-clean zones.',
      cards: [
        { title: 'Electromagnetic Interlock', desc: 'Prevents both doors opening simultaneously.', iconName: 'Lock', circleClass: 'circle-cyan', iconClass: 'text-cyan-600' },
        { title: 'UV Germicidal Irradiation', desc: 'Automatic timed UV disinfection cycle.', iconName: 'Zap', circleClass: 'circle-red', iconClass: 'text-red-500' },
        { title: 'HEPA Filtration', desc: 'Dynamic mini-pleat H14 filter with 99.997% efficiency.', iconName: 'Sparkles', circleClass: 'circle-blue', iconClass: 'text-sky-600' },
        { title: 'Full SS304/316 Shell', desc: 'Coved interior corners for zero particulate traps.', iconName: 'ShieldCheck', circleClass: 'circle-green', iconClass: 'text-emerald-500' }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Manufactured according to Schedule M and ISO 14644 guidelines for sterile processing.',
      tableRows: [
        { label: 'Type:', value: 'Static / Dynamic Pass Box' },
        { label: 'Material of Construction:', value: 'Stainless Steel SS 304 / SS 316' },
        { label: 'Interlocking Mechanism:', value: 'Electromagnetic / Mechanical Interlock' },
        { label: 'Air Cleanliness Class:', value: 'ISO Class 5 (Grade A) for Dynamic Pass Box' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'cGMP / Schedule M Compliant Design',
        'ISO 14644-1 Cleanroom Classification',
        'CE Conformity Certified'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Pass box installations across sterile formulation facilities.',
      images: [
        { id: 1, src: '/products/pass-box-system.jpg', caption: 'Dynamic Pass Box with Magnehelic Gauge' }
      ]
    },
    relatedProducts: {
      heading: 'Related Products',
      description: 'Explore companion cleanroom solutions.',
      products: [
        { id: 'interlock', title: 'Door Interlock System (2-8 Door)', description: 'Programmable cascading interlock controllers.', image: '/products/cleanroom-interlocks.jpg', slug: 'door-interlock-system' }
      ]
    }
  }
};

// Aliases for alternate route/slug resolutions
PHARMA_CLEANROOM_CONFIGS['door-interlock-systems'] = PHARMA_CLEANROOM_CONFIGS['door-interlock-system'];
PHARMA_CLEANROOM_CONFIGS['cleanroom-door-interlock-system'] = PHARMA_CLEANROOM_CONFIGS['door-interlock-system'];
PHARMA_CLEANROOM_CONFIGS['pharma-cleanroom-door-interlock-system'] = PHARMA_CLEANROOM_CONFIGS['door-interlock-system'];
PHARMA_CLEANROOM_CONFIGS['pass-box-systems'] = PHARMA_CLEANROOM_CONFIGS['dynamic-static-pass-boxes'];
