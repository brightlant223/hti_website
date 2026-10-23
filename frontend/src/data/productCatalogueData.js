// Comprehensive Product Catalogue Data for HTI Automation & Security Systems Pvt. Ltd.
// Covers all 25 products across 5 core corporate categories (5 products per category)
// Grounded strictly in authentic engineering specifications, verified compliance, and realistic assets.

export const PRODUCT_CATEGORIES = [
  {
    id: 'access-automation',
    title: 'Access Automation',
    shortTitle: 'Access Automation',
    page: 'automation',
    tagline: 'Touchless architectural pedestrian entry, motorized security gates & high-speed barriers',
    shortDescription: 'Touchless sliding glass doors, motorized perimeter gates & high-speed airlock roll-up doors.',
    image: '/products/automatic-doors.jpg',
    iconName: 'Cpu',
    colorClass: 'text-blue',
    badge: 'ARCHITECTURAL & INDUSTRIAL',
    count: 5,
    keyHighlights: ['Touchless Sensor Entry', 'Sliding & Cantilever Gates', 'High-Speed Rapid Airlocks']
  },
  {
    id: 'traffic-perimeter',
    title: 'Traffic & Perimeter',
    shortTitle: 'Traffic & Perimeter',
    page: 'perimeter-defense',
    tagline: 'High-frequency boom barriers, logistics dock levellers, optical turnstiles & crash bollards',
    shortDescription: 'Electro-hydraulic boom barriers, logistics dock levellers, speed gates & anti-ram crash bollards.',
    image: '/products/boom-barriers.jpg',
    iconName: 'ShieldCheck',
    colorClass: 'text-amber',
    badge: 'VEHICLE ACCESS CONTROL',
    count: 5,
    keyHighlights: ['Electro-Hydraulic Barriers', 'Dock Levellers & Shelters', 'Optical Pedestrian Turnstiles']
  },
  {
    id: 'pharma-cleanroom',
    title: 'Pharma Cleanroom',
    shortTitle: 'Pharma Cleanroom',
    page: 'cleanroom-interlocks',
    tagline: 'USFDA 21 CFR Part 11 door interlocks, dynamic pass boxes, GPS clocks & chiller doors',
    shortDescription: 'USFDA 21 CFR Part 11 door interlock logic, dynamic pass boxes, master GPS clocks & cleanroom doors.',
    image: '/products/cleanroom-interlocks.jpg',
    iconName: 'Lock',
    colorClass: 'text-red',
    badge: 'USFDA CFR PART 11',
    count: 5,
    keyHighlights: ['2–8 Door Programmable Logic', 'Static & Dynamic Pass Boxes', 'Master GPS Slave Clocks']
  },
  {
    id: 'fire-life-safety',
    title: 'Fire & Life Safety',
    shortTitle: 'Fire & Life Safety',
    page: 'fire-protection',
    tagline: 'Multi-loop addressable fire alarms, turnkey sprinkler networks & 240-min certified fire doors',
    shortDescription: 'Multi-loop addressable fire alarms, industrial hydrant networks, certified fire doors & gas detection.',
    image: '/products/fire-life-safety-hero.jpg',
    iconName: 'Flame',
    colorClass: 'text-orange',
    badge: 'TURNKEY LIFE SAFETY',
    count: 5,
    keyHighlights: ['Addressable Fire Alarms', 'Hydrant & Deluge Networks', '120/240 Min Fire Rated Doors']
  },
  {
    id: 'surveillance-alerts',
    title: 'Surveillance & Alerts',
    shortTitle: 'Surveillance & Alerts',
    page: 'security-systems',
    tagline: '4K AI IP surveillance, biometric face recognition, server room sensors & annunciators',
    shortDescription: '4K AI IP surveillance, facial recognition biometrics, server room monitoring & fault annunciators.',
    image: '/products/surveillance-alerts-hero.jpg',
    iconName: 'Activity',
    colorClass: 'text-emerald',
    badge: '4K AI TELEMETRY',
    count: 5,
    keyHighlights: ['4K AI IP Surveillance', 'Biometric Shift Attendance', '24/7 Server Room Telemetry']
  }
];

export const FEATURED_FLAGSHIP_PRODUCTS = [
  {
    slug: 'automatic-sliding-swing-doors',
    name: 'Automatic Sliding & Swing Doors',
    category: 'Access Automation',
    categoryId: 'access-automation',
    image: '/products/automatic-doors.jpg',
    tagline: 'Touchless microwave radar entry for corporate offices & healthcare facilities',
    specs: ['Touchless Microwave Radar', '150 kg/leaf Brushless DC', 'Fire Alarm Interlinked'],
    badge: 'Touchless Access'
  },
  {
    slug: 'boom-barriers',
    name: 'Electro-Hydraulic Boom Barriers',
    category: 'Traffic & Perimeter',
    categoryId: 'traffic-perimeter',
    image: '/products/boom-barriers.jpg',
    tagline: 'High-frequency corporate parking & logistics toll gate access control',
    specs: ['1.5s High-Speed Opening', '100% Continuous Duty', 'RFID & ANPR Sync'],
    badge: '100% Duty Cycle'
  },
  {
    slug: 'door-interlock-systems',
    name: 'Door Interlock System (Ex-d & Safe)',
    category: 'Pharma Cleanroom',
    categoryId: 'pharma-cleanroom',
    image: '/products/cleanroom-interlocks.jpg',
    tagline: 'USFDA 21 CFR Part 11 compliant 2–8 door programmable airlock interlock logic',
    specs: ['USFDA 21 CFR Part 11', '2 to 8 Door Airlock Logic', 'Emergency Fire Override'],
    badge: 'USFDA CFR Part 11'
  },
  {
    slug: 'cctv-surveillance-system',
    name: 'CCTV Surveillance (Analogue & IP 4K)',
    category: 'Surveillance & Alerts',
    categoryId: 'surveillance-alerts',
    image: '/products/cctv-ip-4k-surveillance.jpg',
    tagline: 'Ultra-HD 4K AI analytics cameras, perimeter intrusion detection & central VMS',
    specs: ['4K AI Analytics & ANPR', 'Flameproof Camera Options', '24/7 Central VMS Command'],
    badge: '4K AI Telemetry'
  }
];

export const PRODUCTS_CATALOGUE = {
  // =========================================================================
  // CATEGORY 1: ACCESS AUTOMATION (5 PRODUCTS)
  // =========================================================================

  // 1. Automatic Sliding & Swing Doors
  'automatic-sliding-swing-doors': {
    id: 1,
    slug: 'automatic-sliding-swing-doors',
    name: 'Automatic Sliding & Swing Doors',
    category: 'Access Automation',
    categorySlug: 'access-automation',
    categoryPage: 'automation',
    breadcrumbName: 'Automatic Sliding & Swing Doors',
    tagline: 'Architectural-grade touchless sensor entry solutions for corporate towers & hospitals',
    badge: 'Touchless Sensor Entry',
    heroDescription: 'Architectural-grade touchless sensor entry solutions powered by whisper-quiet brushless DC motors, microwave motion radars, and active infrared safety curtains for corporate towers, healthcare suites, and commercial complexes.',
    heroImage: '/products/automatic-doors.jpg',
    trustIndicators: [
      { text: 'EN 16005 & CE Anti-Pinch Safety', icon: 'ShieldCheck' },
      { text: 'Turnkey PAN-India Commissioning', icon: 'Wrench' },
      { text: '100% Continuous Duty Rating', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/automatic_sliding.mp4',
      poster: '/products/automatic-doors.jpg',
      badge: 'OPERATIONAL SHOWCASE',
      heading: 'Precision Microprocessor Door Automation',
      description: 'Observe the whisper-quiet brushless traversal, dual microwave radar approach detection, and instant obstacle auto-reverse in high-traffic commercial environments.',
      bullets: [
        'Whisper-quiet brushless DC drive with electronic braking',
        'Dual microwave motion radars & active infrared safety presence curtains',
        'Automatic fail-safe battery opening during power disruption',
        'Direct interface with biometric access control and FACP fire alarm systems'
      ]
    },
    overview: {
      paragraphs: [
        'HTI Automatic Sliding & Swing Doors represent the gold standard in modern architectural access. Engineered with heavy-duty microprocessor control units and industrial brushless DC motors, these systems provide touchless, hygienic, and reliable barrier-free pedestrian entry for corporate headquarters, pharmaceutical entryways, healthcare suites, and public transport hubs.',
        'The system eliminates physical contact at high-traffic entryways while maintaining building thermal insulation and HVAC efficiency. In the event of emergency fire alarms or power outages, the integrated 24V battery system and emergency breakout mechanisms ensure instantaneous, unobstructed egress.'
      ],
      highlights: [
        { label: 'Leaf Capacity', value: '150 kg (Single) / 120 kg x 2 (Bi-parting)' },
        { label: 'Opening Speed', value: '100 – 550 mm/sec (Adjustable)' },
        { label: 'Safety Standard', value: 'EN 16005 / CE Certified' },
        { label: 'Duty Cycle', value: '100% Continuous Rated' }
      ]
    },
    benefits: [
      {
        title: 'Touchless Hygiene & Clean Air',
        desc: 'Microwave radars and foot/wave sensors eliminate physical touchpoints, preventing cross-contamination in hospitals and clean corridors.',
        iconName: 'Radio'
      },
      {
        title: 'Whisper-Quiet BLDC Motor',
        desc: 'Direct-drive brushless motor with planetary gearbox delivers silent, vibration-free motion rated for millions of cycles.',
        iconName: 'Zap'
      },
      {
        title: 'EN 16005 Anti-Pinch Protection',
        desc: 'Continuous infrared curtain monitoring prevents door closure if pedestrians, wheelchairs, or stretchers are detected in the threshold.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Emergency Life Safety Release',
        desc: 'Built-in 24V battery reserve and dry-contact FACP fire alarm trigger ensure immediate auto-opening during life safety events.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Corporate Headquarters & IT Parks', desc: 'Main reception lobbies, touchless turnstile corridors, and executive floor entryways.' },
      { title: 'Hospitals, ICUs & Diagnostic Centers', desc: 'Hands-free surgical suites, emergency reception portals, and cleanroom airlocks.' },
      { title: 'Pharmaceutical Facilities', desc: 'Personnel airlocks (PAL) and positive-pressure sterile packaging corridors.' },
      { title: 'Airports & Transport Hubs', desc: 'High-throughput terminal concourses, baggage claim exits, and VIP lounges.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory-tested specifications for HTI Automatic Sliding & Swing Door operators and controllers.',
      tableRows: [
        { label: 'Door Configuration:', value: 'Single Slide, Bi-Parting Sliding, or Electromechanical Swing Leaf' },
        { label: 'Door Leaf Weight Capacity:', value: 'Up to 150 kg (Single Leaf) / 120 kg x 2 (Bi-parting Pair)' },
        { label: 'Opening / Closing Speed:', value: '100 – 550 mm/sec (Digitally programmable via handheld programmer)' },
        { label: 'Motor Drive Unit:', value: '24V DC Brushless motor with optical incremental encoder' },
        { label: 'Power Supply & Consumption:', value: '230V AC ± 10%, 50/60 Hz; Peak 100W, Standby < 10W' },
        { label: 'Hold-Open Duration:', value: '0.5 to 30 seconds (Fully adjustable)' },
        { label: 'Activation & Safety Sensors:', value: 'Combined Microwave Radar + Active Infrared Presence Curtain' },
        { label: 'Emergency Battery Backup:', value: 'Integrated 24V Ni-MH battery kit for minimum 30 min / 100 open cycles' },
        { label: 'Operating Temperature:', value: '-15°C to +55°C ambient tolerance' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 16005 European Standard for Power Operated Pedestrian Doorsets',
        'CE Conformity — Machinery Directive 2006/42/EC',
        'ISO 9001:2015 Quality Management Certified Engineering',
        'Fire Alarm Interface: Supervised dry contact relay for fail-safe opening',
        'ADA & Universal Accessibility Compliant Door Clearances'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Real installation views of HTI automatic sliding and swing door systems across corporate and healthcare environments.',
      images: [
        { id: 1, src: '/products/automatic-doors.jpg', caption: 'Corporate Glass Facade Bi-Parting Entrance' },
        { id: 2, src: '/products/automatic-doors-hospital.jpg', caption: 'Hospital ICU Touchless Sensor Airlock' },
        { id: 3, src: '/products/automatic-doors-swing.jpg', caption: 'Heavy-Duty Electromechanical Swing Door Operator' },
        { id: 4, src: '/hero-glass-atrium.jpg', caption: 'Commercial Atrium Turnstile & Door Integration' }
      ]
    },
    relatedSlugs: ['automatic-sliding-swing-gates', 'pvc-rapid-roll-up-doors', 'turnstiles-flap-barriers-speed-gates']
  },

  // 2. Automatic Sliding & Swing Gates
  'automatic-sliding-swing-gates': {
    id: 2,
    slug: 'automatic-sliding-swing-gates',
    name: 'Automatic Sliding & Swing Gates',
    category: 'Access Automation',
    categorySlug: 'access-automation',
    categoryPage: 'automation',
    breadcrumbName: 'Automatic Sliding & Swing Gates',
    tagline: 'Rugged motorized heavy-duty perimeter security gates for factory campuses & estates',
    badge: 'Heavy Industrial Duty',
    heroDescription: 'Perimeter security entrance gates engineered from heavy-gauge galvanized steel and automated with oil-bath electromechanical or hydraulic operators to withstand continuous heavy vehicle throughput.',
    heroImage: '/services/services-perimeter-gate.jpg',
    trustIndicators: [
      { text: 'Up to 3,500 kg Leaf Capacity', icon: 'ShieldCheck' },
      { text: 'Oil-Bath Industrial Gear Motor', icon: 'Settings' },
      { text: 'IP65 Weatherproof Enclosure', icon: 'Wrench' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/automatic_sliding_gates.mp4',
      poster: '/services/services-perimeter-gate.jpg',
      badge: 'PERIMETER AUTOMATION',
      heading: 'High-Torque Perimeter Gate Automation',
      description: 'Demonstrating smooth traversal of heavy cantilever and tracked sliding gates integrated with optical safety photocells, RFID tolling, and flashing safety signals.',
      bullets: [
        'Oil-bath lubrication for 100% continuous heavy industrial duty',
        'Dual optical infrared photocells and safety rubber contact edges',
        'Long-range UHF RFID, ANPR vehicle camera, or remote key-fob activation',
        'Personalized mechanical manual release key during complete power outage'
      ]
    },
    overview: {
      paragraphs: [
        'HTI Automatic Sliding and Swing Gates provide fortified perimeter protection for industrial estates, corporate technology parks, freight terminals, and defense compounds. Built from heavy-gauge structural steel with hot-dip galvanized primer and polyurethane topcoats, they resist corrosion and physical impact.',
        'Powered by high-torque oil-bath gearmotors, these gate systems handle continuous vehicle cycles in all ambient weather conditions from heavy monsoon downpours to desert heat, incorporating soft-start and soft-stop decelerations to prevent mechanical shock wear.'
      ],
      highlights: [
        { label: 'Gate Capacity', value: '500 kg up to 3,500 kg per leaf' },
        { label: 'Speed', value: '12 – 20 meters / min' },
        { label: 'Protection', value: 'IP65 Weather-sealed aluminum housing' },
        { label: 'Duty Cycle', value: '100% Continuous industrial rating' }
      ]
    },
    benefits: [
      {
        title: 'Oil-Bath Continuous Duty',
        desc: 'Permanent oil-bath gear lubrication eliminates motor overheating even under nonstop 24/7 industrial truck traffic.',
        iconName: 'Settings'
      },
      {
        title: 'Dual Photocell Collision Safety',
        desc: 'Infrared safety beams on both sides of the gate line prevent closure when trucks, cars, or pedestrians are within the clearance zone.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Automated Vehicle Credentials',
        desc: 'Supports hands-free UHF RFID windshield tags, FASTag antennas, and high-resolution ANPR license plate recognition.',
        iconName: 'Radio'
      },
      {
        title: 'Emergency Mechanical Override',
        desc: 'Heavy-duty keyed release clutch allows effortless manual sliding or swinging during emergency power interruptions.',
        iconName: 'Wrench'
      }
    ],
    applications: [
      { title: 'Manufacturing Hubs & Factories', desc: 'Secure main entrance gates handling 40-foot articulated shipping containers and heavy logistics.' },
      { title: 'Corporate Technology Campuses', desc: 'Aesthetic architectural boundary gates synchronized with employee boom barriers.' },
      { title: 'Warehousing & Freight Depots', desc: 'Continuous round-the-clock trailer ingress with integrated long-range RFID automation.' },
      { title: 'Gated Residential Enclaves', desc: 'High-speed automated swing gates with resident mobile app and intercom access.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Engineering specifications for HTI perimeter gate operators and steel fabrications.',
      tableRows: [
        { label: 'Gate Leaf Capacity:', value: '500 kg (Commercial) up to 3,500 kg (Heavy Industrial)' },
        { label: 'Operating Traversal Speed:', value: '12 to 20 meters per minute (with programmable soft deceleration)' },
        { label: 'Drive Mechanism:', value: 'Steel Module 4 / Module 6 gear rack or heavy-duty electro-hydraulic ram' },
        { label: 'Motor Power Supply:', value: '230V AC Single Phase or 415V AC Three Phase; 370W to 1100W' },
        { label: 'Duty Rating:', value: '100% Continuous Duty (Class S1 industrial motor)' },
        { label: 'Protection Standard:', value: 'IP55 / IP65 weather-sealed powder-coated aluminum housing' },
        { label: 'Safety Devices:', value: 'Dual active infrared photocell beams, flashing strobe beacon, rubber safety edge' },
        { label: 'Operating Ambient Range:', value: '-10°C to +60°C' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'CE Certified Mechanical Safety for Industrial Gates (EN 12453 / EN 12445)',
        'Hot-Dip Galvanization to IS 4759 standards for extreme corrosion resistance',
        'ISO 9001:2015 Precision Fabrication & Assembly',
        'Integrated Fire Alarm Auto-Open Relay for Emergency Fire Tender Access'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Perimeter sliding and swing gate installations across logistics depots and manufacturing plants.',
      images: [
        { id: 1, src: '/services/services-perimeter-gate.jpg', caption: 'Industrial Estate Perimeter Sliding Gate' },
        { id: 2, src: '/services/services-trackless-gate.jpg', caption: 'Telescopic Multi-Leaf Gate Traversal' },
        { id: 3, src: '/services/services-hero-access.jpg', caption: 'Heavy-Duty Commercial Security Boundary Gate' }
      ]
    },
    relatedSlugs: ['telescopic-cantilever-gates', 'boom-barriers', 'motorized-rolling-shutters']
  },

  // 3. Telescopic & Cantilever Gates
  'telescopic-cantilever-gates': {
    id: 3,
    slug: 'telescopic-cantilever-gates',
    name: 'Telescopic & Cantilever Gates',
    category: 'Access Automation',
    categorySlug: 'access-automation',
    categoryPage: 'automation',
    breadcrumbName: 'Telescopic & Cantilever Gates',
    tagline: 'Trackless and space-saving solutions for extra-wide openings & restricted boundaries',
    badge: 'Engineered Space-Saver',
    heroDescription: 'Synchronized multi-leaf telescopic gates that reduce required back-run parking area by up to 50%, alongside trackless cantilever systems that float effortlessly over uneven, debris-prone driveways.',
    heroImage: '/services/services-trackless-gate.jpg',
    trustIndicators: [
      { text: '50% Reduced Back-Run Footprint', icon: 'ShieldCheck' },
      { text: 'Clear Spans Up to 25 Meters', icon: 'Wrench' },
      { text: 'Trackless Floating Cantilever', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/telescopic_cantilever_gates.mp4',
      poster: '/services/services-trackless-gate.jpg',
      badge: 'SPECIALTY ENGINEERING',
      heading: 'Synchronized Telescopic Glide & Cantilever Action',
      description: 'See multi-leaf telescopic cables in motion, cutting back-run space in half, and floating cantilever carriages operating with zero ground track.',
      bullets: [
        'Telescopic synchronous cable drive cuts required back-run space by 50%',
        'Cantilever systems float completely above the driveway—zero ground track to clean',
        'High-strength aircraft grade wire-rope transmission for smooth multi-leaf glide',
        'Enclosed internal roller carriage assemblies protected from dust and rain'
      ]
    },
    overview: {
      paragraphs: [
        'When site boundaries have limited run-back space or driveways cross railway tracks, drains, or uneven terrain, conventional sliding gates cannot be installed. HTI Telescopic Gates utilize precision wire-rope transmission that drives multiple overlapping leaves simultaneously, reducing the parking footprint by up to 50%.',
        'For sites with heavy debris, gravel, snow, or continuous cross-traffic, HTI Cantilever Gates eliminate bottom ground tracks altogether. The gate is supported entirely by heavy-duty internal roller carriages housed inside a structural bottom track, floating across the driveway with zero friction or maintenance.'
      ],
      highlights: [
        { label: 'Clear Span', value: 'Up to 25 meters clear span opening' },
        { label: 'Space Savings', value: 'Up to 50% back-run clearance saved' },
        { label: 'Drive Mechanism', value: 'Synchronized cable drive / Cantilever' },
        { label: 'Steel Grade', value: 'Grade 350 high-tensile structural steel' }
      ]
    },
    benefits: [
      {
        title: '50% Back-Run Footprint Saving',
        desc: 'Enables wide gate installations even where boundary walls or security guard cabins restrict standard single-leaf retraction.',
        iconName: 'Layers'
      },
      {
        title: 'Trackless Cantilever Glide',
        desc: 'No ground track to dig into the driveway. Leaves float free from mud, gravel, waterlogging, or uneven asphalt.',
        iconName: 'Zap'
      },
      {
        title: 'Structural Steel Durability',
        desc: 'Fabricated from high-tensile hollow sections engineered to resist high wind pressure across spans up to 25 meters.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Synchronous Traversal Speed',
        desc: 'All gate leaves travel together at proportional speeds, opening the roadway twice as fast as single-panel gates.',
        iconName: 'Clock'
      }
    ],
    applications: [
      { title: 'Wide Logistics Depots & Intermodal Yards', desc: 'Massive 18m to 25m driveway openings accommodating multi-lane container truck traffic.' },
      { title: 'Driveways with Slopes, Gravel or Waterlogging', desc: 'Cantilever installations where ground tracks would collect dirt, debris, or floodwater.' },
      { title: 'Commercial Sites with Short Boundary Run-Back', desc: 'Telescopic systems designed for tight property borders next to municipal footpaths.' },
      { title: 'High-Security Defense & Port Installations', desc: 'Anti-climb crash-resistant perimeter gates with continuous video monitoring.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical data for HTI telescopic and cantilever gate systems.',
      tableRows: [
        { label: 'Clear Span Capacity:', value: 'Up to 25 meters clear opening (Single or Bi-Parting pairs)' },
        { label: 'Leaf Configurations:', value: '2-Leaf Telescopic, 3-Leaf Telescopic, or Single/Double Cantilever' },
        { label: 'Transmission System:', value: 'Pre-stretched stainless steel aircraft wire rope on precision nylon pulleys' },
        { label: 'Cantilever Carriage System:', value: 'Internal 8-wheel sealed bearing carriage units enclosed in bottom beam' },
        { label: 'Motor Operator:', value: 'Heavy industrial 3-phase inverter-driven motor (0.75 kW to 2.2 kW)' },
        { label: 'Traversal Speed:', value: 'Up to 24 meters/min with frequency inverter speed ramping' },
        { label: 'Safety Systems:', value: 'Optical photocell curtain, safety rubber edges, audible traversal alarm' },
        { label: 'Finish:', value: 'Hot-dip galvanized substrate with two-pack epoxy primer and polyurethane coat' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 12604 / EN 12453 Mechanical Safety of Industrial Gates',
        'Structural Wind Load Resistance compliant with IS 875 (Part 3)',
        'CE Certified Automation and Safety Sensing Systems',
        'ISO 9001:2015 Certified Manufacturing and Commissioning'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Telescopic multi-leaf and cantilever trackless installations in operational facilities.',
      images: [
        { id: 1, src: '/services/services-trackless-gate.jpg', caption: 'Cantilever Trackless Gate Floating Over Industrial Driveway' },
        { id: 2, src: '/services/services-perimeter-gate.jpg', caption: 'Synchronized Multi-Leaf Telescopic Gate Retraction' },
        { id: 3, src: '/hero-industrial-doors-dock.jpg', caption: 'Heavy Logistics Terminal Perimeter Control' }
      ]
    },
    relatedSlugs: ['automatic-sliding-swing-gates', 'boom-barriers', 'motorized-rolling-shutters']
  },

  // 4. High Speed Roll Up & Sectional Doors
  'pvc-rapid-roll-up-doors': {
    id: 4,
    slug: 'pvc-rapid-roll-up-doors',
    name: 'High Speed Roll Up & Sectional Doors',
    category: 'Access Automation',
    categorySlug: 'access-automation',
    categoryPage: 'automation',
    breadcrumbName: 'High Speed Roll Up & Sectional Doors',
    tagline: 'Rapid thermal & airlock environmental retention for logistics docks & clean packaging',
    badge: 'Rapid Cycle & Thermal Barrier',
    heroDescription: 'Rapid roll-up flexible PVC doors and insulated sectional overhead doors delivering opening speeds up to 2.5 m/s, superior thermal retention, airlock pressure isolation, and self-repairing zippers.',
    heroImage: '/products/rapid-doors.jpg',
    trustIndicators: [
      { text: 'Up to 2.5 m/s High-Speed Traversal', icon: 'Zap' },
      { text: 'Self-Repairing Zipper Technology', icon: 'ShieldCheck' },
      { text: 'Airlock Dust & Thermal Retention', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/High-Speed.mp4',
      poster: '/products/rapid-doors.jpg',
      badge: 'RAPID VELOCITY',
      heading: 'High-Speed PVC Rapid Door Traversal',
      description: 'Observe ultra-fast opening velocities, instant infrared safety light curtains, and automatic re-inserting zipper edges after accidental forklift collision.',
      bullets: [
        'Rapid 1.5 to 2.5 m/s opening cycle minimizing air exchanges',
        'Self-repairing zipper track automatically re-threads door curtain after collision',
        'Multi-frequency variable speed inverter drive with soft start/stop',
        'Integrated safety light curtain safeguarding pedestrians and forklifts'
      ]
    },
    overview: {
      paragraphs: [
        'In cold storages, pharmaceutical manufacturing facilities, food processing plants, and logistics cross-docks, conventional slow doors result in massive air conditioning loss, dust ingress, and humidity spikes. HTI High Speed Roll Up and Sectional Doors open and close in fractions of a second, preserving temperature gradients and clean airlock pressures.',
        'Featuring self-repairing flexible zipper guides, the door curtain effortlessly dislodges upon accidental vehicle impact and automatically resets on the next upward cycle with zero downtime. For cold storage and exterior bay applications, insulated polyurethane sectional panels provide high thermal R-values and wind-load resistance.'
      ],
      highlights: [
        { label: 'Operating Speed', value: '1.2 to 2.5 m/s (Adjustable via inverter)' },
        { label: 'Curtain Material', value: '0.9mm / 1.2mm reinforced tear-resistant PVC' },
        { label: 'Wind Load Resistance', value: 'Class 3 / Class 4 (EN 12424 certified)' },
        { label: 'Operational Cycles', value: 'Over 1,000,000 maintenance-free cycles' }
      ]
    },
    benefits: [
      {
        title: 'Thermal & Energy Conservation',
        desc: 'Ultra-fast cycle times slash HVAC thermal transfer and refrigeration power losses by up to 45% in temperature-controlled docks.',
        iconName: 'Zap'
      },
      {
        title: 'Self-Repairing Anti-Crash Zipper',
        desc: 'If struck by a forklift, the flexible PVC curtain releases harmlessly from the side guides and automatically zips back in on the next cycle.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Dust & Contamination Barrier',
        desc: 'Heavy-duty airtight side seals and bottom weighted profiles prevent airborne particulate infiltration into clean processing zones.',
        iconName: 'Layers'
      },
      {
        title: 'Safety Light Curtain Array',
        desc: 'Vertical infrared barrier with hundreds of continuous beams detects personnel or pallet forks up to 2.5m height, preventing descent.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Clean Packaging Docks', desc: 'Pressure-controlled airlocks maintaining Class D / ISO 8 cleanroom integrity between warehouse and packaging.' },
      { title: 'Cold Storage & Food Processing Facilities', desc: 'Fast-acting thermal barriers between sub-zero freezer rooms (+4°C / -20°C) and staging areas.' },
      { title: 'Automobile Assembly & Manufacturing Docks', desc: 'Heavy cross-traffic forklift transit bays with inductive floor loops and radar motion sensing.' },
      { title: 'FMCG & High-Throughput Distribution Hubs', desc: 'Exterior sectional loading bays synchronized with dock levellers for rapid truck turnaround.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory engineering specifications for HTI rapid roll-up and sectional overhead doors.',
      tableRows: [
        { label: 'Door Dimensions:', value: 'Up to 6000 mm (W) x 6000 mm (H) custom fabricated' },
        { label: 'Opening / Closing Speed:', value: 'Opening: Up to 2.5 m/s; Closing: 0.8 m/s (Variable frequency drive)' },
        { label: 'Curtain Construction:', value: 'High-tenacity 900 g/m² PVC with transparent vision window panels' },
        { label: 'Sectional Panel (Optional):', value: '40mm / 50mm double-skin galvanized steel with CFC-free PUF core' },
        { label: 'Motor Drive System:', value: 'Heavy industrial compact gearmotor with built-in electromagnetic brake (0.75 – 1.5 kW)' },
        { label: 'Controller Unit:', value: 'Microprocessor PLC with LCD display and multi-fault diagnostic telemetry' },
        { label: 'Safety Devices:', value: 'Full-height safety light grid (2.5m), wireless bottom safety edge, manual chain hoist' },
        { label: 'Activation Controls:', value: 'Microwave radar, inductive magnetic loop, pull cord, push button, RFID' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 13241-1 European Product Standard for Industrial Doors',
        'EN 12424 Wind Load Classification (Class 3 / Class 4)',
        'CE Certified Electrical Safety & Low Voltage Directive (LVD)',
        'Cleanroom ISO 14644 Compliance for Airlock Integration'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'High-speed roll-up and insulated sectional door installations across manufacturing hubs.',
      images: [
        { id: 1, src: '/products/rapid-doors.jpg', caption: 'High-Speed PVC Rapid Roll-Up Door with Vision Panel' },
        { id: 2, src: '/services/service-sectional-doors.jpg', caption: 'Insulated Sectional Overhead Loading Dock Door' },
        { id: 3, src: '/hero-industrial-doors-dock.jpg', caption: 'Integrated Logistics Dock Leveller and Rapid Door System' },
        { id: 4, src: '/products/industrial-door-assembly.jpg', caption: 'Heavy-Duty Industrial Door Guide & Motor Assembly' }
      ]
    },
    relatedSlugs: ['motorized-rolling-shutters', 'dock-levellers-dock-shelters', 'automatic-sliding-swing-doors']
  },

  // 5. Motorized Rolling Shutters
  'motorized-rolling-shutters': {
    id: 5,
    slug: 'motorized-rolling-shutters',
    name: 'Motorized Rolling Shutters',
    category: 'Access Automation',
    categorySlug: 'access-automation',
    categoryPage: 'automation',
    breadcrumbName: 'Motorized Rolling Shutters',
    tagline: 'Heavy-gauge galvanized security bay protection for warehouses & commercial facades',
    badge: 'Fortified Perimeter Security',
    heroDescription: 'Heavy-gauge galvanized steel and extruded aluminum motorized rolling shutters engineered for high-security commercial facades, industrial warehouse bays, and hazardous plant enclosures.',
    heroImage: '/services/services-heavy-security.jpg',
    trustIndicators: [
      { text: 'Galvanized Cold-Rolled Interlocking Slats', icon: 'ShieldCheck' },
      { text: 'Integrated Heavy-Duty Tubular / Side Motor', icon: 'Settings' },
      { text: 'Emergency Hand Chain & Deadman Control', icon: 'Wrench' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Motorized Industrial Rolling Shutters.mp4',
      poster: '/services/services-heavy-security.jpg',
      badge: 'INDUSTRIAL DURABILITY',
      heading: 'Motorized Shutter Operation & Locking Action',
      description: 'See the heavy-gauge interlocking galvanized steel curtain roll smoothly onto high-tensile spring-balanced barrel assemblies.',
      bullets: [
        'Heavy-gauge galvanized cold-rolled interlocking steel slats',
        'Side-mounted industrial motor with mechanical anti-drop safety brake',
        'Manual hand chain override mechanism for continuous power cut readiness',
        'Key switch, industrial push button, and wireless remote control integration'
      ]
    },
    overview: {
      paragraphs: [
        'HTI Motorized Rolling Shutters provide robust, theft-resistant security and weather isolation for warehouses, factory bays, commercial storefronts, and distribution centers. Built from cold-rolled galvanized steel or structural extruded aluminum slats, the shutter curtain forms an impenetrable physical barrier against forced intrusion, storms, and flying debris.',
        'Driven by heavy-duty side-mount industrial motors or internal tubular drives with counterbalance helical torsion springs, the shutter operates smoothly with push buttons, key switches, or wireless remotes. In case of electrical failure, an integrated hand-crank or continuous pull chain allows effortless manual operation.'
      ],
      highlights: [
        { label: 'Slat Material', value: 'Galvanized Steel / Extruded Aluminum (0.8mm – 1.6mm)' },
        { label: 'Motor Rating', value: 'High-torque side motor with anti-drop parachute brake' },
        { label: 'Manual Override', value: 'Continuous hand-chain system for power failure' },
        { label: 'Surface Coating', value: 'Hot-dip galvanized / Polyester electrostatic powder coat' }
      ]
    },
    benefits: [
      {
        title: 'Intrusion & Anti-Ram Resistance',
        desc: 'Interlocking cold-rolled steel profile slats and deep wind-lock side guide rails prevent physical break-ins and ram raids.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Anti-Drop Safety Inertia Brake',
        desc: 'Parachute safety braking device instantly catches the shutter barrel in the improbable event of motor drive failure.',
        iconName: 'Settings'
      },
      {
        title: 'Emergency Hand Chain System',
        desc: 'Ensures warehouse personnel can manually open or close the bay shutter even during a total blackout or grid breakdown.',
        iconName: 'Wrench'
      },
      {
        title: 'Weather & Wind-Lock Seals',
        desc: 'EPDM bottom rubber weather seal and brush side guides prevent dust, rain, and rodents from entering the building.',
        iconName: 'Layers'
      }
    ],
    applications: [
      { title: 'Warehouse Loading Bays & Depots', desc: 'Heavy-duty bay closures for daily logistics truck docks and outdoor storage bays.' },
      { title: 'Commercial Retail Malls & Storefronts', desc: 'Perforated and extruded aluminum security shutters providing security and night-time display.' },
      { title: 'Manufacturing Plants & Workshop Portals', desc: 'Wide clear-span equipment entry portals up to 10 meters width.' },
      { title: 'Underground Parking Garages', desc: 'High-ventilation punched or grill shutters ensuring carbon monoxide ventilation.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Engineering specifications for HTI motorized rolling shutters.',
      tableRows: [
        { label: 'Curtain Slat Thickness:', value: '0.8mm, 1.0mm, 1.2mm, or 1.5mm cold-rolled galvanized steel' },
        { label: 'Slat Profiles:', value: 'Solid Flat Slat, Curved Interlocking Slat, Micro-Perforated, or Insulated PUF' },
        { label: 'Maximum Clear Span:', value: 'Up to 12 meters width x 8 meters height' },
        { label: 'Motor Operator Type:', value: 'External Side-Mounted Heavy-Duty Gear Motor with electromagnetic disc brake' },
        { label: 'Motor Power Supply:', value: '230V AC Single Phase or 415V AC Three Phase; 300 kg to 2000 kg lifting capacity' },
        { label: 'Safety Protection:', value: 'Safety anti-drop device (Inertia brake), bottom safety edge sensor' },
        { label: 'Manual Operation:', value: 'Endless hand-pull chain with automatic declutching mechanism' },
        { label: 'Finish:', value: 'Hot-dip galvanized (275 g/m² zinc) or custom RAL powder coating' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'IS 6248 Indian Standard for Metal Rolling Shutters and Rolling Grills',
        'EN 13241-1 Industrial, Commercial and Garage Doors Product Standard',
        'CE Certified Motorized Drive and Safety Brake Assemblies',
        'ISO 9001:2015 Quality Certified Engineering & Fabrication'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Motorized rolling shutter installations in industrial and commercial locations.',
      images: [
        { id: 1, src: '/services/services-heavy-security.jpg', caption: 'Heavy-Duty Galvanized Warehouse Rolling Shutter' },
        { id: 2, src: '/products/industrial-door-assembly.jpg', caption: 'Motorized Shutter Barrel & Anti-Drop Safety Assembly' },
        { id: 3, src: '/services/service-fire-doors.jpg', caption: 'Commercial Powder-Coated Rolling Shutter Bay' }
      ]
    },
    relatedSlugs: ['pvc-rapid-roll-up-doors', 'fire-rated-doors-shutters', 'automatic-sliding-swing-gates']
  },

  // =========================================================================
  // CATEGORY 2: TRAFFIC & PERIMETER (5 PRODUCTS)
  // =========================================================================

  // 6. Boom Barriers (Electro / Hydraulic)
  'boom-barriers': {
    id: 6,
    slug: 'boom-barriers',
    name: 'Boom Barriers (Electro / Hydraulic)',
    category: 'Traffic & Perimeter',
    categorySlug: 'traffic-perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Boom Barriers (Electro / Hydraulic)',
    tagline: 'High-frequency corporate parking, toll plazas & industrial entry checkpoints',
    badge: 'Continuous 100% Duty',
    heroDescription: 'Continuous-duty electromechanical and hydraulic automated boom barriers engineered for high-frequency vehicle checkpoints, toll plazas, industrial factory gates, and corporate parking facilities.',
    heroImage: '/products/boom-barriers.jpg',
    trustIndicators: [
      { text: '1.5s to 6.0s Rapid Traversal', icon: 'Zap' },
      { text: 'Integrated LED Illumination', icon: 'ShieldCheck' },
      { text: 'FASTag & ANPR Ready Interface', icon: 'Radio' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Boom%20Barriers%20(Electro%20%20Hydraulic).mp4',
      poster: '/services/service-boom-barrier.jpg',
      badge: 'PRODUCT SHOWCASE',
      heading: 'Automatic Boom Barrier Engineering & Operation',
      description: 'High-speed automated barrier systems featuring brushless DC torque motors, integrated LED boom lights, optical safety loop detectors, and seamless RFID access control.',
      bullets: [
        'Rapid 1.5s to 6.0s opening traversal with soft-start & soft-stop',
        'Integrated red/green LED boom illumination for clear night visibility',
        'Anti-collision loop detector and optical photocell auto-reverse',
        'Direct interface with FASTag, Long-Range UHF RFID & ANPR cameras'
      ]
    },
    overview: {
      paragraphs: [
        'HTI Automatic Boom Barriers provide precision vehicle access management across toll plazas, corporate business parks, industrial campuses, and residential complexes. Powered by advanced brushless DC motors or heavy-duty electro-hydraulic powerpacks, they deliver millions of maintenance-free cycles without thermal cutout.',
        'Featuring dual spring counterbalancing, integrated red/green LED boom lighting, and multi-protocol control boards, these barriers interface seamlessly with FASTag RFID readers, automatic number plate recognition (ANPR) cameras, ticket dispensers, and fire alarm override systems.'
      ],
      highlights: [
        { label: 'Speed Range', value: '1.5 sec (Toll) to 6.0 sec (Heavy Industrial)' },
        { label: 'Boom Length', value: 'Up to 6 meters octagonal aluminum boom' },
        { label: 'Motor Type', value: '24V DC Brushless or Hydraulic Skid' },
        { label: 'Duty Cycle', value: '100% Continuous 24/7 duty rating' }
      ]
    },
    benefits: [
      {
        title: 'Ultra-Fast Traversal Speed',
        desc: 'Opening times as fast as 1.5 seconds prevent vehicle bottlenecks at busy toll gates and commercial parking entrances.',
        iconName: 'Zap'
      },
      {
        title: 'Anti-Crash Dual Protection',
        desc: 'Inductive ground loops and infrared safety beams trigger immediate auto-reverse if a vehicle pauses directly underneath.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'FASTag & ANPR Compatibility',
        desc: 'Pre-wired dry contacts and Wiegand / RS485 communication ports connect directly to national tolling and parking software.',
        iconName: 'Radio'
      },
      {
        title: 'LED Nighttime Boom Visibility',
        desc: 'Integrated dual-color LED strip illuminates red when lowered and green when raised, minimizing nighttime boom collisions.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Corporate Parks & Commercial Towers', desc: 'Automated staff and visitor vehicle access control gates with RFID badge readers.' },
      { title: 'Toll Plazas & Highway Checkpoints', desc: 'High-speed continuous-cycle barrier arms handling thousands of vehicles per hour.' },
      { title: 'Manufacturing Campuses & Logistics Yards', desc: 'Heavy 6m industrial barriers controlling freight trucks and weighbridge checkpoints.' },
      { title: 'Residential Enclaves & Gated Communities', desc: 'Resident vehicle boom barriers with mobile app guest QR validation.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical parameters for HTI electromechanical and hydraulic boom barriers.',
      tableRows: [
        { label: 'Boom Arm Length:', value: '3.0 meters, 4.5 meters, or 6.0 meters (Telescopic or Octagonal Profile)' },
        { label: 'Opening / Closing Speed:', value: '1.5s, 3.0s, or 6.0s (Digitally programmable speed ramping)' },
        { label: 'Drive Mechanism:', value: '24V Brushless DC motor with planetary gear or Electro-Hydraulic Pump Skid' },
        { label: 'Duty Cycle Rating:', value: '100% Continuous Duty (Up to 5 million maintenance-free cycles)' },
        { label: 'Housing Construction:', value: '2.0mm cold-rolled steel with anti-corrosion powder coating (IP55/IP65)' },
        { label: 'Boom Lighting:', value: 'Integrated Red / Green high-intensity LED light strip along entire boom length' },
        { label: 'Safety Devices:', value: 'Dual channel inductive loop detector, optical photocells, rubber bottom cushion' },
        { label: 'Manual Release:', value: 'Key-operated mechanical clutch release during total power loss' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'CE Certified Electromechanical Barrier Safety (EN 12453 / EN 12445)',
        'IP55 / IP65 Weatherproof Ingress Protection Rating',
        'ISO 9001:2015 Quality Management Certified Engineering',
        'FACP Fire Alarm Override: Auto-opens boom upon fire signal'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Boom barrier installations across parking complexes and commercial gates.',
      images: [
        { id: 1, src: '/products/boom-barriers.jpg', caption: 'Corporate Toll & Parking Automatic Boom Barrier' },
        { id: 2, src: '/services/service-boom-barrier.jpg', caption: 'Heavy-Duty 6-Meter Industrial Boom Barrier' },
        { id: 3, src: '/case-studies/case-boom-barrier.jpg', caption: 'Multi-Lane FASTag RFID Automated Gate Entry' }
      ]
    },
    relatedSlugs: ['turnstiles-flap-barriers-speed-gates', 'bollards-tyre-killers-car-lifts', 'visitor-management-system']
  },

  // 7. Dock Levellers & Dock Shelters
  'dock-levellers-dock-shelters': {
    id: 7,
    slug: 'dock-levellers-dock-shelters',
    name: 'Dock Levellers & Dock Shelters',
    category: 'Traffic & Perimeter',
    categorySlug: 'traffic-perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Dock Levellers & Dock Shelters',
    tagline: 'Logistics loading bridge between trucks & warehouse bays for efficient transfer',
    badge: 'Heavy Industrial Logistics',
    heroDescription: 'Electro-hydraulic loading dock levellers and weather-sealing dock shelters engineered to bridge the elevation and gap between warehouse bays and transport trucks for safe, rapid forklift loading.',
    heroImage: '/services/services-logistics-bridge.jpg',
    trustIndicators: [
      { text: '6 to 9 Ton Dynamic Capacity', icon: 'ShieldCheck' },
      { text: 'EN 1398 European Safety Compliance', icon: 'Settings' },
      { text: 'Telescopic & Swing-Lip Variants', icon: 'Wrench' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Dock%20Levellers%20&%20Dock%20Shelters.mp4',
      poster: '/services/services-logistics-bridge.jpg',
      badge: 'LOGISTICS AUTOMATION',
      heading: 'Hydraulic Dock Leveller & Shelter Engineering',
      description: 'Watch the electro-hydraulic deck raise, deploy its robust hinged or telescopic lip into the trailer bed, and provide seamless forklift roll-on loading.',
      bullets: [
        'High dynamic capacity of 60 kN to 90 kN (6 to 9 tons)',
        'Heavy-duty hydraulic power pack with emergency velocity parachute fuse',
        'Weatherproof retractable dock shelter isolating warehouse HVAC',
        'Interlocking safety controls with sectional door and wheel chocks'
      ]
    },
    overview: {
      paragraphs: [
        'Loading docks are the primary transit arteries of any manufacturing plant, distribution center, or cold storage warehouse. HTI Electro-Hydraulic Dock Levellers provide a rock-solid, bridgeable transition platform between the warehouse concrete floor and variable-height truck beds, enabling forklifts to drive directly inside containers safely.',
        'Paired with HTI Dock Shelters, the system creates an airtight environmental seal around the trailer rear, preventing conditioned air loss, rain, dust, and insects from entering the warehouse during prolonged loading and unloading operations.'
      ],
      highlights: [
        { label: 'Dynamic Capacity', value: '6 Ton to 9 Ton (60 kN – 90 kN)' },
        { label: 'Lip Types', value: 'Swing Lip (400mm) or Telescopic Lip (500–1000mm)' },
        { label: 'Standard', value: 'EN 1398 Certified Loading Ramps' },
        { label: 'Safety Valve', value: 'Emergency velocity hydraulic parachute fuse' }
      ]
    },
    benefits: [
      {
        title: '6 to 9 Ton Heavy Dynamic Load',
        desc: 'Reinforced high-tensile tear-drop steel deck supports loaded 3-wheel and 4-wheel forklifts with zero structural deflection.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Emergency Hydraulic Parachute Fuse',
        desc: 'Velocity fuse valve instantly halts deck fall in under 0.05 seconds if a truck accidentally pulls away during loading.',
        iconName: 'Zap'
      },
      {
        title: 'Dock Shelter Climate Protection',
        desc: 'Heavy-duty tear-resistant PVC perimeter flaps form a tight seal around the container, slashing cold storage energy loss.',
        iconName: 'Layers'
      },
      {
        title: 'Interlocked Dock Safety Sequence',
        desc: 'Sequential control console prevents leveller operation until the overhead sectional door is open and wheel chocks are engaged.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'FMCG & Retail Distribution Centers', desc: 'High-throughput 24/7 cross-docking hubs loading dozens of trailers simultaneously.' },
      { title: 'Pharmaceutical Cold Storage Docks', desc: 'Temperature-controlled airlock bays preserving cold-chain compliance during pallet transfer.' },
      { title: 'Automotive & Heavy Engineering Plants', desc: 'Loading bays accommodating 6-ton to 9-ton forklift loads carrying heavy engine assemblies.' },
      { title: 'Chemical & Hazardous Goods Depots', desc: 'Flameproof hydraulic powerpacks and anti-spark steel platforms for volatile material docks.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical data for HTI electro-hydraulic dock levellers and dock shelters.',
      tableRows: [
        { label: 'Standard Platform Dimensions:', value: '2000mm x 2500mm / 2200mm x 2800mm (Custom pit dimensions available)' },
        { label: 'Rated Dynamic Capacity:', value: '6,000 kg (60 kN) / 9,000 kg (90 kN) EN 1398 compliant' },
        { label: 'Deck Plate Material:', value: 'High-tensile Grade S235 / S355 tear-drop anti-slip checker steel (6mm / 8mm)' },
        { label: 'Lip Construction:', value: 'Single-piece high-strength 16mm steel swing-lip or 1000mm telescopic extending lip' },
        { label: 'Hydraulic Power Unit:', value: '0.75 kW to 1.5 kW electro-hydraulic powerpack with submerged motor in oil reservoir' },
        { label: 'Operating Elevation Range:', value: '+350mm above dock level to -300mm below dock level' },
        { label: 'Safety Systems:', value: 'Emergency hydraulic velocity fuse, full-range yellow toe guards, maintenance prop strut' },
        { label: 'Dock Shelter Construction:', value: 'Retractable galvanized steel scissor frame with 3.5mm thick high-elasticity PVC flaps' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 1398 European Standard for Dock Levellers and Loading Ramps',
        'Machinery Directive 2006/42/EC and Low Voltage Directive 2014/35/EU',
        'ISO 9001:2015 Precision Fabrication & Assembly',
        'OSHA Compliant Safety Toe Guards and Emergency Stop Systems'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Dock levellers, shelters, and sectional door bay combinations.',
      images: [
        { id: 1, src: '/services/services-logistics-bridge.jpg', caption: 'Electro-Hydraulic Dock Leveller with Truck Bed Deployed' },
        { id: 2, src: '/hero-industrial-doors-dock.jpg', caption: 'Complete Warehouse Bay: Leveller, Shelter & Sectional Door' },
        { id: 3, src: '/products/industrial-door-assembly.jpg', caption: 'Hydraulic Cylinder & Pit Frame Engineering' }
      ]
    },
    relatedSlugs: ['pvc-rapid-roll-up-doors', 'motorized-rolling-shutters', 'boom-barriers']
  },

  // 8. Turnstiles & Flap Barriers
  'turnstiles-flap-barriers-speed-gates': {
    id: 8,
    slug: 'turnstiles-flap-barriers-speed-gates',
    name: 'Turnstiles & Flap Barriers',
    category: 'Traffic & Perimeter',
    categorySlug: 'traffic-perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Turnstiles & Flap Barriers',
    tagline: 'Pedestrian biometric lobby speed gates with optical infrared anti-tailgating',
    badge: 'High-Throughput Pedestrian Gate',
    heroDescription: 'Architectural optical speed gates, swing flap barriers, and full-height turnstiles engineered from SUS304 stainless steel with bi-directional infrared sensor arrays for corporate lobbies and high-security sites.',
    heroImage: '/hero-glass-atrium.jpg',
    trustIndicators: [
      { text: 'Up to 45 Persons / Min Flow', icon: 'Zap' },
      { text: 'SUS304 Stainless Steel Body', icon: 'ShieldCheck' },
      { text: 'Fire Alarm Auto-Release', icon: 'Flame' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Turnstiles%20&%20Flap%20Barriers.mp4',
      poster: '/hero-glass-atrium.jpg',
      badge: 'SPEED GATE AUTOMATION',
      heading: 'Optical Flap Barrier & Speed Gate Engineering',
      description: 'See the ultra-fast brushless DC motor swing the tempered glass wings open in 0.3 seconds upon biometric face recognition, while 16 pairs of optical sensors detect tailgating.',
      bullets: [
        'High pedestrian flow rate of 35 to 45 persons per minute',
        'Ultra-fast 0.3s wing traversal with whisper-quiet brushless servo drive',
        'Multi-sensor optical beam matrix preventing unauthorized tailgating',
        'Instant fail-safe auto-open wing collapse on FACP fire alarm trigger'
      ]
    },
    overview: {
      paragraphs: [
        'HTI Turnstiles and Optical Speed Gates provide secure, aesthetic, and high-throughput pedestrian access control for corporate headquarters, IT park reception atriums, government offices, and metro stations. Built from brushed SUS304 stainless steel with tempered glass wings, they seamlessly blend architectural luxury with uncompromising perimeter defense.',
        'Equipped with 16 to 24 pairs of infrared optical sensors, the system prevents unauthorized tailgating, reverse-direction passage, and crawling. Upon receiving emergency fire alarm signals, the barriers automatically swing fully open to allow unobstructed mass evacuation.'
      ],
      highlights: [
        { label: 'Flow Rate', value: '35 to 45 persons per minute' },
        { label: 'Passage Width', value: '600mm (Standard) / 900mm (Wheelchair ADA)' },
        { label: 'Chassis Material', value: '1.5mm – 2.0mm SUS304 Brushed Stainless Steel' },
        { label: 'Wing Material', value: '10mm / 12mm Toughened Tempered Glass' }
      ]
    },
    benefits: [
      {
        title: '35–45 Persons/Min Rapid Flow',
        desc: 'Enables smooth, queue-free entry for thousands of corporate employees arriving during peak morning rush hours.',
        iconName: 'Zap'
      },
      {
        title: 'Optical Anti-Tailgating Sensor Matrix',
        desc: 'Up to 24 pairs of infrared beams detect trailing pedestrians attempting unauthorized entry behind an authorized cardholder.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Biometric Face & RFID Integration',
        desc: 'Direct plug-and-play mounting for 0.2s visible light face recognition terminals, palm scanners, and RFID card readers.',
        iconName: 'Radio'
      },
      {
        title: 'FACP Emergency Fail-Safe Release',
        desc: 'Wings instantly collapse and remain in the open position during fire emergencies, grid outages, or building evacuation.',
        iconName: 'Flame'
      }
    ],
    applications: [
      { title: 'Corporate Headquarters & IT Parks', desc: 'Main reception turnstile barriers with facial recognition and visitor QR code readers.' },
      { title: 'Data Centers & Critical Facilities', desc: 'High-security anti-tailgating optical speed gates with dual-credential authentication.' },
      { title: 'Metro Stations & Transport Terminals', desc: 'Heavy-throughput rugged flap barriers with automatic fare collection (AFC) validation.' },
      { title: 'Pharmaceutical & Cleanroom Foyers', desc: 'Personnel access logging and change-room interlocked biometric verification.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical data for HTI optical speed gates, flap barriers, and tripod turnstiles.',
      tableRows: [
        { label: 'Chassis Dimensions:', value: '1400mm (L) x 150mm (W) x 1000mm (H) per pedestal' },
        { label: 'Passage Lane Width:', value: '600mm standard lane / 900mm handicap / wheelchair ADA compliant lane' },
        { label: 'Throughput Capacity:', value: 'Up to 45 persons per minute (Fast biometric verification)' },
        { label: 'Wing Opening / Closing Speed:', value: '0.3 to 0.6 seconds (Fully adjustable)' },
        { label: 'Drive Motor:', value: 'Brushless DC servo motor with digital absolute encoder' },
        { label: 'Infrared Sensor Grid:', value: '16 to 24 pairs of high-precision military-grade infrared beams' },
        { label: 'Credential Compatibility:', value: 'RFID, NFC, QR Code, Barcode, Fingerprint, Visible Light Facial Recognition' },
        { label: 'MCBF Reliability:', value: 'Over 5,000,000 continuous operations without mechanical failure' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'CE Certified Machinery & Low Voltage Electrical Directives',
        'ADA & ISO 21542 Accessibility Compliance for 900mm Barrier Lanes',
        'Fire Alarm Emergency Integration — Automatic Wing Fold Open',
        'ISO 9001:2015 Certified Manufacturing & Stainless Steel Finishing'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Optical speed gate and flap barrier installations across corporate lobbies.',
      images: [
        { id: 1, src: '/hero-glass-atrium.jpg', caption: 'Corporate Lobby Multi-Lane Optical Speed Gates' },
        { id: 2, src: '/products/biometric-access-terminal.jpg', caption: 'Integrated Biometric Facial Recognition on Speed Gate' },
        { id: 3, src: '/products/automatic-doors.jpg', caption: 'Speed Gate and Automatic Glass Door Entry Cascade' }
      ]
    },
    relatedSlugs: ['boom-barriers', 'biometric-access-attendance', 'visitor-management-system']
  },

  // 9. Bollards, Tyre Killers & Car Lifts
  'bollards-tyre-killers-car-lifts': {
    id: 9,
    slug: 'bollards-tyre-killers-car-lifts',
    name: 'Bollards, Tyre Killers & Car Lifts',
    category: 'Traffic & Perimeter',
    categorySlug: 'traffic-perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Bollards, Tyre Killers & Car Lifts',
    tagline: 'Anti-ram vehicle defense, tyre shredders & hydraulic multi-level parking lifts',
    badge: 'Crash Rated Anti-Ram Defense',
    heroDescription: 'Crash-tested hydraulic rising bollards (K4/K8/K12), bi-directional electro-hydraulic tyre killers, and multi-tier hydraulic car parking elevators engineered to secure critical infrastructure against hostile vehicular impact.',
    heroImage: '/services/service-bollards-blockers.jpg',
    trustIndicators: [
      { text: 'K4 / K8 / K12 / PAS 68 Crash Rated', icon: 'ShieldCheck' },
      { text: 'Sub-Second Emergency Fast Operation (EFO)', icon: 'Zap' },
      { text: 'Turnkey Civil & Hydraulic Skid Integration', icon: 'Wrench' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Bollards,%20Tyre%20Killers%20&%20Car%20Lifts.mp4',
      poster: '/services/service-bollards-blockers.jpg',
      badge: 'PERIMETER DEFENSE',
      heading: 'High-Impact Vehicle Defense in Action',
      description: 'See automatic hydraulic bollards rise in under 2 seconds, sub-second Emergency Fast Operation (EFO) deployment, and heavy-duty spike tyre shredding.',
      bullets: [
        'K4, K8, and K12 crash-tested impact resistance stopping 7.5-ton trucks at 80 km/h',
        'Sub-second Emergency Fast Operation (EFO) hydraulic accumulator',
        'Electro-hydraulic bidirectional tyre killer spikes shredding run-flat tyres',
        'Multi-level hydraulic parking lift systems maximizing vehicle capacity'
      ]
    },
    overview: {
      paragraphs: [
        'Critical government installations, corporate headquarters, defense sites, and embassies face severe vehicular ramming threats. HTI Automatic Hydraulic Bollards are crash-tested to international ASTM / PAS 68 standards, capable of stopping a 7.5-ton truck travelling at 80 km/h with zero penetration beyond the security perimeter.',
        'Complementing bollards, HTI Electro-Hydraulic Tyre Killers deploy heavy-duty steel spikes to instantaneously shred run-flat commercial truck tyres traveling in unauthorized directions. For urban parking constraints, HTI Hydraulic Car Lifts provide 2-post and 4-post vertical vehicle stacking to double parking capacity in basement facilities.'
      ],
      highlights: [
        { label: 'Impact Rating', value: 'K4, K8, K12 (ASTM F2656 / PAS 68 certified)' },
        { label: 'Rise Time', value: '2.0 to 3.5 seconds (Standard) / 0.8s (EFO mode)' },
        { label: 'Bollard Height', value: '600mm, 800mm, or 1000mm cylinder stroke' },
        { label: 'Bollard Diameter', value: '220mm, 275mm, or 355mm heavy steel tube' }
      ]
    },
    benefits: [
      {
        title: 'K4 / K8 / K12 Anti-Ram Protection',
        desc: 'Engineered structural core absorbs kinetic impact energy of high-speed heavy commercial trucks, preventing vehicular assault.',
        iconName: 'ShieldCheck'
      },
      {
        title: '0.8-Second EFO Fast Deployment',
        desc: 'Emergency Fast Operation pneumatic/hydraulic accumulator deploys bollards upward in under a second during hostile breaches.',
        iconName: 'Zap'
      },
      {
        title: 'Bidirectional Heavy Tyre Spikes',
        desc: 'High-tensile hardened steel spikes puncture heavy commercial vehicle tyres and rims to physically disable fleeing or hostile trucks.',
        iconName: 'Settings'
      },
      {
        title: 'Space-Saving Vertical Car Lifts',
        desc: 'Hydraulic double-tier and triple-tier car parking lifts increase residential and commercial building parking density by 100%.',
        iconName: 'Layers'
      }
    ],
    applications: [
      { title: 'Embassy & Consular Grounds', desc: 'Perimeter vehicle checkpoints requiring certified anti-ram vehicle barrier defense.' },
      { title: 'Airport Terminals & Critical Energy Sites', desc: 'Outer perimeter roadways protecting high-occupancy terminals from car bombs.' },
      { title: 'Corporate Headquarters & Banking Vaults', desc: 'Sub-second EFO rising bollards synchronized with ANPR automated access systems.' },
      { title: 'Commercial Basements & Car Showrooms', desc: 'Hydraulic multi-tier car parking lifts for vertical space optimization.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical specifications for HTI rising bollards, tyre killers, and parking lifts.',
      tableRows: [
        { label: 'Bollard Cylinder Height:', value: '600mm, 800mm, or 1000mm stroke above ground' },
        { label: 'Cylinder Diameter & Thickness:', value: '275mm diameter; 10mm to 16mm high-strength Grade 350 carbon steel' },
        { label: 'Impact Crash Rating:', value: 'ASTM F2656 M50 / P1 (equivalent to K12 stopping 7.5T at 80 km/h)' },
        { label: 'Operating Speed:', value: 'Normal Rise: 2.5s; Emergency Fast Operation (EFO): 0.8s' },
        { label: 'Hydraulic Drive Unit:', value: 'Heavy external or integrated hydraulic power unit (1.5 kW to 3.7 kW)' },
        { label: 'Illumination & Visibility:', value: 'Integrated LED top ring light + 3M diamond grade reflective band' },
        { label: 'Tyre Killer Spike Height:', value: '150mm / 200mm high-tensile steel spikes with anti-puncture teeth' },
        { label: 'Car Lift Load Capacity:', value: '2,500 kg to 3,500 kg per vehicle platform' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'ASTM F2656 / PAS 68 Crash Test Impact Resistance Certified',
        'IP68 Submersible Waterproof Enclosure Rating for Hydraulic Cylinders',
        'CE Certified Hydraulic Power Unit and Electrical Safety',
        'ISO 9001:2015 Precision Defense & Hydraulic Engineering'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Hydraulic rising bollards and perimeter blocker installations.',
      images: [
        { id: 1, src: '/services/service-bollards-blockers.jpg', caption: 'Crash-Rated Automatic Hydraulic Rising Bollards' },
        { id: 2, src: '/products/boom-barriers.jpg', caption: 'Bollard and Boom Barrier Integrated Security Checkpoint' },
        { id: 3, src: '/services/services-perimeter-gate.jpg', caption: 'Tyre Killer and Heavy Sliding Gate Combination' }
      ]
    },
    relatedSlugs: ['boom-barriers', 'turnstiles-flap-barriers-speed-gates', 'visitor-management-system']
  },

  // 10. Parking & Visitor Management
  'visitor-management-system': {
    id: 10,
    slug: 'visitor-management-system',
    name: 'Parking & Visitor Management',
    category: 'Traffic & Perimeter',
    categorySlug: 'traffic-perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Parking & Visitor Management',
    tagline: 'Automated RFID guidance, FASTag tolling & QR digital guest pass systems',
    badge: 'Smart Mobility & Security',
    heroDescription: 'End-to-end intelligent parking guidance, automated FASTag vehicle tolling, ultrasonic bay detection, and paperless digital visitor management with host SMS approvals and badge printing.',
    heroImage: '/services/services-hero-access.jpg',
    trustIndicators: [
      { text: 'FASTag & Long-Range RFID Integration', icon: 'Radio' },
      { text: 'Ultrasonic Bay Space Guidance', icon: 'Settings' },
      { text: 'Paperless QR Guest Passes', icon: 'ShieldCheck' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/services/services-hero-access.jpg',
      badge: 'SMART FACILITY',
      heading: 'Automated Vehicle & Visitor Processing',
      description: 'Demonstrating seamless FASTag barrier auto-opening, ultrasonic ceiling LED parking bay indicators, and touchless visitor tablet check-in.',
      bullets: [
        'FASTag & Long-Range UHF RFID for seamless barrier auto-opening',
        'Overhead ultrasonic sensors with dual-color red/green occupancy LEDs',
        'Self-service visitor check-in kiosk with government ID optical scanning',
        'Instant host SMS and WhatsApp arrival notification with one-tap approval'
      ]
    },
    overview: {
      paragraphs: [
        'Manual visitor logbooks and congested parking lots create significant security vulnerabilities and negative visitor impressions. The HTI Parking and Visitor Management platform automates guest check-ins, vehicle throughput, and access credentials across corporate campuses, IT towers, and gated residential enclaves.',
        'Vehicles pass smoothly through boom barriers using FASTag or UHF RFID tags while indoor parking guidance displays guide drivers directly to vacant bays using ultrasonic ceiling sensors. Visitors register in seconds via self-service touch kiosks, receive instant host WhatsApp approvals, and receive thermal QR badges to access turnstiles.'
      ],
      highlights: [
        { label: 'Vehicle Identification', value: 'FASTag / UHF RFID / ANPR AI Camera' },
        { label: 'Parking Sensor', value: 'High-frequency ultrasonic with dual LED' },
        { label: 'Visitor Registration', value: 'Touchscreen kiosk with passport/ID scan' },
        { label: 'Host Notification', value: 'Instant SMS, WhatsApp & Email alert' }
      ]
    },
    benefits: [
      {
        title: 'Seamless FASTag Vehicle Ingress',
        desc: 'Automates entry and exit barrier lifting using existing vehicle FASTag chips with zero toll queueing.',
        iconName: 'Radio'
      },
      {
        title: 'Ultrasonic Parking Guidance',
        desc: 'Overhead LED sensors glow green for vacant and red for occupied, reducing parking search time by 60%.',
        iconName: 'Zap'
      },
      {
        title: 'Paperless Touchless Visitor Pass',
        desc: 'Visitors scan QR invitations on their smartphones or print thermal guest badges linked directly to turnstiles.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Real-Time Enterprise Telemetry',
        desc: 'Central security dashboard displays live on-premises visitor counts, vehicle bay occupancy, and overstay alerts.',
        iconName: 'Activity'
      }
    ],
    applications: [
      { title: 'Corporate Technology Campuses', desc: 'Centralized visitor check-in hubs for thousands of contractors, interviewees, and VIP clients.' },
      { title: 'Multi-Level Commercial Car Parks', desc: 'Directional LED display boards and bay sensors across 5+ basement levels.' },
      { title: 'Pharmaceutical & Cleanroom Corridors', desc: 'Audit-ready digital tracking of contractor access into GMP-regulated manufacturing zones.' },
      { title: 'Gated Residential Societies', desc: 'Pre-invited guest passes sent via WhatsApp with resident one-tap security clearance.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'System specifications for HTI parking and visitor management hardware and software.',
      tableRows: [
        { label: 'Vehicle Identification Options:', value: 'FASTag EPC Gen2 Reader (865-867 MHz), ANPR 4K Camera, Barcode Ticket' },
        { label: 'RFID Read Range:', value: 'Up to 12 meters adjustable beam cone with polarization' },
        { label: 'Parking Sensor Technology:', value: 'Ultrasonic sensor with integrated ultra-bright Red / Green / Blue LED indicator' },
        { label: 'LED Guidance Displays:', value: 'Dynamic outdoor & indoor matrix LED boards showing live available spaces per zone' },
        { label: 'Visitor Kiosk Hardware:', value: '21.5" capacitive touch display, HD optical ID scanner, thermal badge printer' },
        { label: 'Host Notification Channels:', value: 'WhatsApp Business API, SMS Gateway, Microsoft Teams, Corporate Email' },
        { label: 'Turnstile / Door Integration:', value: 'Direct QR Code / Barcode reader interface with TCP/IP relay controller' },
        { label: 'Data Security & Storage:', value: 'Encrypted on-premises SQL server or cloud database with GDPR/DPDP compliance' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'WPC (Wireless Planning & Coordination) Certified RFID Transceivers',
        'Digital Personal Data Protection (DPDP) Compliant Guest Data Storage',
        'ISO 27001 Information Security Management Standards',
        'Direct API Integration with SAP, Oracle, and Corporate Active Directory'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Parking management and visitor check-in installations.',
      images: [
        { id: 1, src: '/services/services-hero-access.jpg', caption: 'Automated FASTag Toll Barrier Checkpoint' },
        { id: 2, src: '/hero-glass-atrium.jpg', caption: 'Corporate Lobby Visitor Turnstile Integration' },
        { id: 3, src: '/hero-security-command-center.jpg', caption: 'Central Security Control Room & Parking Monitoring' }
      ]
    },
    relatedSlugs: ['boom-barriers', 'turnstiles-flap-barriers-speed-gates', 'biometric-access-attendance']
  },

  // =========================================================================
  // CATEGORY 3: PHARMA CLEANROOM (5 PRODUCTS)
  // =========================================================================

  // 11. Door Interlock System (Ex-d & Safe)
  'door-interlock-systems': {
    id: 11,
    slug: 'door-interlock-systems',
    name: 'Door Interlock System (Ex-d & Safe)',
    category: 'Pharma Cleanroom',
    categorySlug: 'pharma-cleanroom',
    categoryPage: 'cleanroom-interlocks',
    breadcrumbName: 'Door Interlock System (Ex-d & Safe)',
    tagline: 'USFDA 21 CFR Part 11 compliant 2–8 door interlocking for sterile cascades',
    badge: 'USFDA 21 CFR Part 11',
    heroDescription: 'Microcontroller and PLC-based cleanroom door interlocking systems engineered for 2 to 8 door sterile cascade airlocks with certified Flameproof (Ex-d IIB) and Safe area enclosures, emergency fire release, and clean status indicators.',
    heroImage: '/hero-cleanroom-interlock-chamber.jpg',
    trustIndicators: [
      { text: 'USFDA 21 CFR Part 11 Audit Ready', icon: 'ShieldCheck' },
      { text: 'Certified Flameproof Ex-d & Safe Area', icon: 'Flame' },
      { text: 'Programmable 2 to 8 Door Mutual Exclusion', icon: 'Lock' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/cleanroom-interlocks.jpg',
      badge: 'INTERACTIVE CLEANROOM DEMO',
      heading: 'Cleanroom Door Interlocking Logic Demonstration',
      description: 'Experience how mutual exclusion logic prevents simultaneous opening of cleanroom doors, maintaining differential air pressure cascades.',
      bullets: [
        'Mutual exclusion logic: opening one door instantly locks all other airlock doors',
        'Touchless infrared wave sensor prevents bacterial cross-contamination',
        'Programmable door-ajar buzzer alert if doors remain open beyond preset seconds',
        'Instant emergency fire alarm release overriding all electromagnetic locks'
      ],
      isInteractiveDemo: true,
      demoType: 'interlock'
    },
    overview: {
      paragraphs: [
        'In pharmaceutical formulation, biotechnology laboratories, and API manufacturing suites, maintaining strict differential pressure gradients between rooms is essential to prevent cross-contamination. The HTI Cleanroom Door Interlock System enforces mutual exclusion: opening one door automatically locks all other doors in the airlock cascade.',
        'Available with certified Flameproof (Ex-d) enclosures for hazardous solvent environments and sleek flush SUS304 touchless sensors for sterile areas, the system complies with USFDA 21 CFR Part 11 and cGMP guidelines. In the event of a fire alarm or emergency push button trigger, all magnetic locks release immediately for safe egress.'
      ],
      highlights: [
        { label: 'Door Capacity', value: '2 to 8 doors per central controller' },
        { label: 'Compliance', value: 'USFDA 21 CFR Part 11 / EU cGMP Grade A-D' },
        { label: 'Enclosure Rating', value: 'Flameproof Ex-d IIB T6 / Safe IP65' },
        { label: 'Locking Element', value: '600 lbs / 1200 lbs Electromagnetic lock' }
      ]
    },
    benefits: [
      {
        title: 'Air Pressure Cascade Preservation',
        desc: 'Prevents simultaneous opening of dirty and clean doors, protecting sterile +15 Pa / +30 Pa cleanroom air pressures.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Certified Flameproof (Ex-d IIB)',
        desc: 'CIMFR / PESO certified flameproof control stations for chemical synthesis, solvent extraction, and explosion-risk plant rooms.',
        iconName: 'Flame'
      },
      {
        title: 'Touchless Infrared Wave Sensors',
        desc: 'Glove-compatible capacitive wave sensors eliminate physical hand contact, preventing microbial transfer into clean areas.',
        iconName: 'Radio'
      },
      {
        title: 'Emergency Life Safety Fire Release',
        desc: 'Direct hardware-level integration with the fire alarm panel (FACP) immediately demagnetizes all locks on alarm.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Sterile Manufacturing', desc: 'Personnel airlocks (PAL) and material airlocks (MAL) across Grade A, B, C, and D cleanrooms.' },
      { title: 'API & Bulk Chemical Synthesis Plants', desc: 'Flameproof Ex-d certified door interlocks in solvent extraction and powder handling areas.' },
      { title: 'Biotechnology & Vaccine Laboratories', desc: 'BSL-2, BSL-3, and BSL-4 high-containment biosafety negative-pressure cascade airlocks.' },
      { title: 'Semiconductor & Precision Electronics', desc: 'ISO 4 – ISO 7 cleanroom entry corridors preventing particulate ingress.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory technical specifications for HTI cleanroom door interlock controllers.',
      tableRows: [
        { label: 'Supported Door Channels:', value: '2-Door, 3-Door, 4-Door, or up to 8-Door cascade interlocking per controller' },
        { label: 'Controller Architecture:', value: 'High-speed industrial 32-bit Microcontroller or Siemens / Omron PLC' },
        { label: 'Door Status Indications:', value: 'Dual-Color Red / Green high-intensity LED indicators on flush SS304 plates' },
        { label: 'Locking Element:', value: '600 lbs (280 kg) / 1200 lbs (500 kg) Electromagnetic lock with bond sensor feedback' },
        { label: 'Activation Inputs:', value: 'Touchless infrared optical wave switch, push button, or cleanroom biometric terminal' },
        { label: 'Door-Ajar Buzzer Delay:', value: 'Programmable 5 to 60 seconds alarm delay if door is held open' },
        { label: 'Emergency Override:', value: 'Illuminated Emergency Push Button (Break-Glass / Mushroom) + FACP Relay Input' },
        { label: 'Operating Power Supply:', value: '230V AC ± 10%, 50 Hz with internal 12V / 24V DC regulated SMPS battery charger' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'USFDA 21 CFR Part 11 Audit Compliant Architecture',
        'c-GMP & WHO-GMP Cleanroom Air Cascade Compliance',
        'CIMFR / PESO Certified Flameproof Enclosures for Zone 1 & Zone 2 (Gas Group IIA, IIB)',
        'ISO 14644 Cleanroom Particulate Standard Compliance'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Cleanroom door interlock controllers and clean personnel airlock installations.',
      images: [
        { id: 1, src: '/hero-cleanroom-interlock-chamber.jpg', caption: 'Cleanroom Personnel Airlock with Interlocked Doors' },
        { id: 2, src: '/products/cleanroom-interlocks.jpg', caption: 'Door Interlock Controller with Red/Green Status Indicators' },
        { id: 3, src: '/products/pass-box-system.jpg', caption: 'Dynamic Pass Box with Integrated Interlocking' },
        { id: 4, src: '/hero-cleanroom-automation.jpg', caption: 'Pharmaceutical GMP Cleanroom Corridor' }
      ]
    },
    relatedSlugs: ['pass-box-systems', 'digital-gps-clocks', 'chiller-clean-room-doors']
  },

  // 12. Pass Box System (Static & Dynamic)
  'pass-box-systems': {
    id: 12,
    slug: 'pass-box-systems',
    name: 'Pass Box System (Static & Dynamic)',
    category: 'Pharma Cleanroom',
    categorySlug: 'pharma-cleanroom',
    categoryPage: 'cleanroom-interlocks',
    breadcrumbName: 'Pass Box System (Static & Dynamic)',
    tagline: 'Contamination-free material transfer hatches with HEPA filtration & UV disinfection',
    badge: 'c-GMP Sterile Transfer',
    heroDescription: 'Stainless steel Static and Dynamic material transfer pass box systems equipped with HEPA air filtration (99.997% @ 0.3μm), germicidal UV disinfection lamps, mechanical or electromagnetic door interlocking, and differential pressure gauges.',
    heroImage: '/products/pass-box-system.jpg',
    trustIndicators: [
      { text: 'SUS304 / SUS316L Mirror Finish', icon: 'ShieldCheck' },
      { text: '0.3μm HEPA Filter (99.997%)', icon: 'Layers' },
      { text: 'Integrated UV Germicidal Lamp', icon: 'Zap' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/pass-box-system.jpg',
      badge: 'INTERACTIVE DEMO',
      heading: 'Dynamic Pass Box Material Transfer Simulation',
      description: 'Explore the decontamination cycle of our dynamic pass boxes: UV germicidal sterilization, HEPA air purging, and interlocking door seals.',
      bullets: [
        'Dynamic HEPA filtration delivering Class 100 / ISO 5 sterile chamber environment',
        'Timed UV germicidal tube with safety door interlock auto-cutoff',
        'SUS304 / SUS316L mirror-polished chamber with coved sanitary internal corners',
        'Magnehelic differential pressure gauge monitoring HEPA filter loading'
      ],
      isInteractiveDemo: true,
      demoType: 'pass-box'
    },
    overview: {
      paragraphs: [
        'Transferring raw materials, packaging supplies, and laboratory samples between classified cleanroom areas carries severe cross-contamination risks. HTI Static and Dynamic Pass Boxes provide an airtight material transfer chamber that prevents direct air exchange between adjoining rooms.',
        'Static Pass Boxes serve transfers between areas of equal cleanliness, featuring mechanical or electromagnetic interlocking and UV germicidal lamps. Dynamic Pass Boxes operate as miniature laminar airflow units, continuously showering transferring materials with vertical HEPA-filtered ISO Class 5 air before allowing the clean-side door to release.'
      ],
      highlights: [
        { label: 'Filtration Efficiency', value: 'HEPA 99.997% @ 0.3μm / Pre-filter 10μm' },
        { label: 'Chamber Material', value: 'SUS304 / SUS316L with coved radius corners' },
        { label: 'Disinfection', value: 'Phillips 15W / 30W UV-C Germicidal tube' },
        { label: 'Door Interlocking', value: 'Electromagnetic 12V DC mutual exclusion' }
      ]
    },
    benefits: [
      {
        title: 'Class 100 / ISO 5 Dynamic Air Purge',
        desc: 'High-efficiency motor blower circulates HEPA-filtered laminar air to strip loose dust particulates from materials prior to transfer.',
        iconName: 'Layers'
      },
      {
        title: 'Germicidal UV-C Decontamination',
        desc: 'Integrated UV-C disinfection tube destroys surface microorganisms and automatically shuts off when doors are opened.',
        iconName: 'Zap'
      },
      {
        title: 'Sanitary Coved Radius Corners',
        desc: 'Internal chamber corners are radiused without crevices, preventing bacterial accumulation and enabling rapid disinfectant wipe-down.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Fail-Safe Door Interlocking',
        desc: 'Both doors can never be opened simultaneously, safeguarding sterile room differential air pressures during every transfer.',
        iconName: 'Lock'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Sterile Manufacturing', desc: 'Material transfers between classified compounding suites and Grade A filling lines.' },
      { title: 'Biotechnology & Vaccine Laboratories', desc: 'Decontaminated sample transfer between containment zones and testing cleanrooms.' },
      { title: 'Semiconductor Cleanrooms & Nanotechnology', desc: 'Dust-free wafer cassette and micro-component transit across clean airlocks.' },
      { title: 'Hospital Oncology & Radiopharmacy', desc: 'Safe containment transfer of cytotoxic and hazardous pharmaceutical drugs.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory specifications for HTI Static and Dynamic cleanroom pass boxes.',
      tableRows: [
        { label: 'Internal Chamber Dimensions:', value: '450x450x450mm, 600x600x600mm, 750x750x750mm, or 900x900x900mm (Custom available)' },
        { label: 'MOC (Material of Construction):', value: 'Complete SS 304 or SS 316L (1.2mm – 1.5mm thick with #4 satin/mirror polish)' },
        { label: 'Door Construction:', value: 'Double-walled SS 304 doors with flush 5mm toughened safety glass view panels' },
        { label: 'Door Interlocking System:', value: '12V DC Electromagnetic interlock with internal release microswitch' },
        { label: 'Supply Air Filtration (Dynamic):', value: 'Mini-pleat HEPA Filter: 99.997% efficient @ 0.3 micron (H14 Grade)' },
        { label: 'Pre-Filter (Dynamic):', value: 'Washable synthetic non-woven pre-filter: 90% efficient @ 10 micron' },
        { label: 'Air Velocity (Dynamic):', value: '0.45 m/s ± 20% average velocity measured at filter face' },
        { label: 'Instrumentation:', value: 'Dwyer Magnehelic Differential Pressure Gauge (0 – 250 Pa range)' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'c-GMP and WHO-GMP Cleanroom Material Airlock Compliance',
        'ISO 14644-1 Air Cleanliness Class 5 (Class 100) Compliance for Dynamic Models',
        'EN 1822 High Efficiency Air Filter (HEPA H14) Certified',
        'CE Certified Electrical Systems & UV Safety Interlocks'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Pass box installations in active pharmaceutical cleanroom walls.',
      images: [
        { id: 1, src: '/products/pass-box-system.jpg', caption: 'Dynamic Pass Box with Magnehelic Gauge and HEPA Purge' },
        { id: 2, src: '/products/pass-box-chamber.jpg', caption: 'Stainless Steel Pass Box Chamber with Coved Corners' },
        { id: 3, src: '/products/pass-box-installed.jpg', caption: 'Flush Wall Mounted Pass Box in Cleanroom Partition' }
      ]
    },
    relatedSlugs: ['door-interlock-systems', 'chiller-clean-room-doors', 'digital-gps-clocks']
  },

  // 13. Digital Clocks (Flameproof / Safe)
  'digital-gps-clocks': {
    id: 13,
    slug: 'digital-gps-clocks',
    name: 'Digital Clocks (Flameproof / Safe)',
    category: 'Pharma Cleanroom',
    categorySlug: 'pharma-cleanroom',
    categoryPage: 'cleanroom-interlocks',
    breadcrumbName: 'Digital Clocks (Flameproof / Safe)',
    tagline: 'GPS master-slave pharma time synchronization with flameproof & IP65 cleanroom housings',
    badge: 'GMP Time Synchronization',
    heroDescription: 'High-precision GPS master-slave digital clocks, NTP network synchronized time systems, and temperature/humidity displays housed in cleanroom-flush stainless steel and certified Flameproof (Ex-d IIB) enclosures.',
    heroImage: '/products/digital-clock-hero.jpg',
    trustIndicators: [
      { text: 'GPS & NTP Time Synchronization', icon: 'Clock' },
      { text: 'Certified Flameproof Ex-d & IP65 Flush', icon: 'Flame' },
      { text: 'Ultra-Bright 7-Segment LED Display', icon: 'Zap' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/digital-clock-hero.jpg',
      badge: 'INTERACTIVE DEMO',
      heading: 'Cleanroom GPS Time & Environmental Display Demo',
      description: 'Explore multi-zone master-slave time synchronization, flameproof chemical plant enclosure details, and integrated temperature/humidity readings.',
      bullets: [
        'GPS satellite time synchronization guaranteeing zero drift across entire facility',
        'Certified Flameproof (Ex-d) housing for hazardous chemical synthesis plant rooms',
        'Flush wall-mounted SS304 cleanroom housing with chemical wipe-down resistance',
        'Integrated multi-parameter display: Time (HH:MM:SS), Temperature, and Relative Humidity'
      ],
      isInteractiveDemo: true,
      demoType: 'digital-clock'
    },
    overview: {
      paragraphs: [
        'In regulatory pharmaceutical manufacturing, exact timestamp synchronization across batch production records, quality control labs, and packaging lines is mandatory under USFDA 21 CFR Part 11. HTI Digital Master-Slave Clocks synchronize every room clock to atomic GPS satellite signals or central NTP network servers.',
        'Available in cleanroom flush-mount stainless steel enclosures that sit flush against sandwich panels and certified Flameproof (Ex-d IIB) cast aluminum housings for hazardous chemical synthesis zones, these clocks feature ultra-bright 7-segment LEDs visible up to 50 meters away.'
      ],
      highlights: [
        { label: 'Time Accuracy', value: '±1 millisecond synchronized via GPS / NTP' },
        { label: 'Display Formats', value: '4-Digit (HH:MM) or 6-Digit (HH:MM:SS)' },
        { label: 'Digit Heights', value: '2.5 inch, 4.0 inch, or 6.0 inch ultra-bright LED' },
        { label: 'Enclosures', value: 'SS304 Cleanroom Flush / Cast Aluminum Ex-d IIB' }
      ]
    },
    benefits: [
      {
        title: 'Zero Time Drift Across Plant',
        desc: 'GPS master antenna continuously locks every clock in production, QC, and warehouse suites to exact atomic time.',
        iconName: 'Clock'
      },
      {
        title: 'CIMFR Certified Flameproof Ex-d',
        desc: 'Certified explosion-proof housings for solvent extraction, hazardous chemicals, and solvent recovery distillation zones.',
        iconName: 'Flame'
      },
      {
        title: 'Cleanroom Flush Panel Mounting',
        desc: 'Front panel sits completely flush against cleanroom partitions with medical-grade silicone gaskets for sterile wipe-down.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Time, Temp & RH Multi-Display',
        desc: 'Optional integrated digital sensors display live cleanroom temperature (°C) and relative humidity (%RH) alongside synchronized time.',
        iconName: 'Activity'
      }
    ],
    applications: [
      { title: 'Pharmaceutical GMP Formulations', desc: 'Batch manufacturing record (BMR) execution suites requiring synchronized production timing.' },
      { title: 'Chemical & Bulk Drug Synthesis Plants', desc: 'Hazardous solvent plant rooms requiring Flameproof Ex-d IIB T6 digital wall displays.' },
      { title: 'Quality Control & Stability Testing Labs', desc: 'Sample incubation suites and microbiology testing laboratories.' },
      { title: 'Hospitals & Surgical Theatres', desc: 'Operating rooms requiring countdown elapsed-time timers and accurate time stamping.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Engineering specifications for HTI cleanroom and flameproof digital clocks.',
      tableRows: [
        { label: 'Time Display Format:', value: '6-Digit (HH:MM:SS) or 4-Digit (HH:MM) 12/24 hour selectable' },
        { label: 'Digit Heights & Colors:', value: '2.5", 4.0", or 6.0" Red / Green / Amber 7-segment ultra-bright LEDs' },
        { label: 'Synchronization Protocol:', value: 'GPS Satellite receiver antenna / NTP (Ethernet RJ45 TCP/IP) / RS485 Master-Slave' },
        { label: 'Viewing Distance:', value: 'Up to 30 meters (2.5" digit) / Up to 60 meters (4.0" digit)' },
        { label: 'Cleanroom Enclosure:', value: 'SS 304 flush-mount front plate with rear sealed box (IP65 front face)' },
        { label: 'Flameproof Enclosure:', value: 'Heavy cast-aluminum alloy LM6 with toughened glass window (Ex-d IIB T6, IP66)' },
        { label: 'Power Supply & Backup:', value: '230V AC ± 10%, 50 Hz with internal battery holding time during power failure' },
        { label: 'Optional Multi-Sensors:', value: 'Digital Temperature sensor (0–50°C, ±0.5°C) & Humidity (0–100% RH, ±2% RH)' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'USFDA 21 CFR Part 11 Compliant Time Synchronization',
        'CIMFR Certified Flameproof Ex-d for Gas Groups IIA & IIB',
        'IP65 Cleanroom Front Face Washdown Protection',
        'ISO 9001:2015 Precision Electronics Manufacturing'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Digital clock installations in cleanrooms and flameproof plant suites.',
      images: [
        { id: 1, src: '/products/digital-clock-hero.jpg', caption: 'Flush Mounted Cleanroom Digital Master Clock' },
        { id: 2, src: '/products/digital-clock-industrial.jpg', caption: 'Flameproof Ex-d Digital Clock for Chemical Plants' },
        { id: 3, src: '/products/digital-clock-wall.jpg', caption: 'Cleanroom Multi-Parameter Time, Temp & Humidity Display' }
      ]
    },
    relatedSlugs: ['door-interlock-systems', 'pass-box-systems', 'chiller-clean-room-doors']
  },

  // 14. Chiller Doors & Clean Room Doors
  'chiller-clean-room-doors': {
    id: 14,
    slug: 'chiller-clean-room-doors',
    name: 'Chiller Doors & Clean Room Doors',
    category: 'Pharma Cleanroom',
    categorySlug: 'pharma-cleanroom',
    categoryPage: 'cleanroom-interlocks',
    breadcrumbName: 'Chiller Doors & Clean Room Doors',
    tagline: 'Hermetically sealed cold storage, walk-in chillers & flush cleanroom barrier doors',
    badge: 'Hermetic Thermal Seal',
    heroDescription: 'Heavy-duty insulated chiller sliding doors and flush cleanroom swing doors engineered with CFC-free polyurethane insulation, heated perimeter perimeter gaskets, and drop-down hermetic seals for cold storage and sterile suites.',
    heroImage: '/products/chiller-door-hero.jpg',
    trustIndicators: [
      { text: '80mm to 120mm High-Density PUF Core', icon: 'ShieldCheck' },
      { text: 'Heated Gasket Anti-Freezing System', icon: 'Zap' },
      { text: 'Flush Double-Glazed View Windows', icon: 'Layers' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/chiller-door-hero.jpg',
      badge: 'INTERACTIVE DEMO',
      heading: 'Chiller & Cleanroom Door Sealing Demo',
      description: 'See the drop-down hermetic bottom seal and heated perimeter gasket action isolating sub-zero cold rooms and clean airlocks.',
      bullets: [
        '80mm to 120mm injected PUF core preventing condensation and thermal loss',
        'Heated perimeter door frame preventing gasket freezing in sub-zero chillers',
        'Internal emergency glow-in-the-dark push release preventing accidental entrapment',
        'Flush double-glazed argon-filled vision panels with desiccated cleanroom spacers'
      ],
      isInteractiveDemo: true,
      demoType: 'chiller-cleanroom-door'
    },
    overview: {
      paragraphs: [
        'Walk-in chillers, cold rooms, and GMP cleanroom facilities demand specialized door designs that withstand extreme temperature differentials and sterile decontamination protocols. HTI Chiller Doors feature 80mm to 120mm injected high-density polyurethane cores and integrated frame heating cables that prevent condensation and gasket freezing down to -40°C.',
        'For pharmaceutical packaging and clean laboratory corridors, HTI Cleanroom Doors sit completely flush with partition wall panels. Equipped with automatic drop-down bottom threshold seals and flush double-glazed safety vision panels, they maintain air pressure integrity without collecting dust or harbor bacterial colonies.'
      ],
      highlights: [
        { label: 'Insulation Core', value: '80mm / 100mm / 120mm high-density PUF (40 kg/m³)' },
        { label: 'Operating Temp', value: '+15°C down to -40°C (Chiller / Freezer models)' },
        { label: 'Gasket System', value: 'Food-grade EPDM with internal perimeter heating' },
        { label: 'Cleanroom Glazing', value: 'Flush double-glazed 6mm toughened glass with desiccant' }
      ]
    },
    benefits: [
      {
        title: 'Sub-Zero Thermal Insulation',
        desc: 'High-density CFC-free polyurethane core and thermal break aluminum frames stop refrigeration energy loss.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Heated Gasket Anti-Ice System',
        desc: 'Low-voltage heating cable embedded in the door frame prevents moisture condensation and rubber gasket ice welding.',
        iconName: 'Zap'
      },
      {
        title: 'Flush Cleanroom Hygiene Design',
        desc: 'Door leaf and double-glazed view panel align seamlessly flush with cleanroom wall panels, with zero horizontal dust ledges.',
        iconName: 'Layers'
      },
      {
        title: 'Internal Emergency Escape Release',
        desc: 'Glow-in-the-dark mechanical push release allows trapped cold storage workers to open locked doors from inside.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Cold Storage Warehouses', desc: 'Walk-in chillers (+2°C to +8°C) storing vaccines, blood plasma, and temperature-sensitive biologics.' },
      { title: 'GMP Cleanroom Cascades & Corridors', desc: 'Flush pharmaceutical partition swing doors interlocked with access control systems.' },
      { title: 'Food Processing & Meat Freezers', desc: 'Sub-zero blast freezers (-20°C to -40°C) with heavy stainless steel hardware and heated frames.' },
      { title: 'Hospital Pathology & Mortuary Suites', desc: 'Hermetically sealed refrigerated specimen storage and diagnostic morgue chambers.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory specifications for HTI chiller doors and cleanroom flush doors.',
      tableRows: [
        { label: 'Door Types Available:', value: 'Manual / Motorized Chiller Sliding Door, Chiller Swing Door, Flush Cleanroom Swing Door' },
        { label: 'Insulation Core Material:', value: 'High-Pressure Injected Polyurethane Foam (PUF) density 40-42 kg/m³' },
        { label: 'Leaf Thickness:', value: '80mm (Positive temp +2°C to +10°C) / 100mm–120mm (Sub-zero -10°C to -40°C)' },
        { label: 'Surface Cladding:', value: '0.8mm pre-painted galvanized steel (RAL 9002/9010) or 0.8mm SS 304 mirror/satin finish' },
        { label: 'Frame Heating System:', value: 'Low-voltage 230V/24V resistance heating wire embedded in anodized aluminum frame' },
        { label: 'Bottom Sealing:', value: 'Food-grade EPDM sweep gasket or automatic mechanical drop seal recessed in door bottom' },
        { label: 'Vision Window:', value: 'Flush double-glazed toughened safety glass with silica gel desiccant moisture absorber' },
        { label: 'Emergency Safety:', value: 'Inside luminescent safety release push knob overrides external key padlock' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'c-GMP & WHO Cleanroom Architectural Standards',
        'Food Grade EPDM Gasket Material FDA Compliance',
        'ISO 14644-1 Cleanroom Flush Partition Integration',
        'CE Certified Electrical Defrosting and Heating Controls'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Chiller door and pharmaceutical cleanroom door installations.',
      images: [
        { id: 1, src: '/products/chiller-door-hero.jpg', caption: 'Heavy-Duty Chiller Sliding Door with Heated Frame' },
        { id: 2, src: '/products/cleanroom-door-pharma.jpg', caption: 'Flush Pharmaceutical Cleanroom Door with View Panel' },
        { id: 3, src: '/products/industrial-door-assembly.jpg', caption: 'Chiller Door Heavy Anodized Aluminum Track System' }
      ]
    },
    relatedSlugs: ['door-interlock-systems', 'sound-proof-doors', 'pvc-rapid-roll-up-doors']
  },

  // 15. Sound Proof Acoustic Doors
  'sound-proof-doors': {
    id: 15,
    slug: 'sound-proof-doors',
    name: 'Sound Proof Acoustic Doors',
    category: 'Pharma Cleanroom',
    categorySlug: 'pharma-cleanroom',
    categoryPage: 'cleanroom-interlocks',
    breadcrumbName: 'Sound Proof Acoustic Doors',
    tagline: 'Heavy acoustic decibel dampening (up to 52 dB) for plant machinery & compressor rooms',
    badge: 'Acoustic Decibel Dampening',
    heroDescription: 'Engineered heavy-gauge acoustic barrier doors featuring multi-density mineral wool cores, viscoelastic damping sheets, dual magnetic perimeter seals, and drop-down thresholds delivering sound transmission reduction up to 52 dB.',
    heroImage: '/case-studies/case-air-curtain.jpg',
    trustIndicators: [
      { text: 'Up to 52 dB Noise Transmission Reduction', icon: 'ShieldCheck' },
      { text: 'Multi-Layer High-Density Acoustic Core', icon: 'Layers' },
      { text: 'Dual Magnetic Gasket Perimeter Seals', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/case-studies/case-air-curtain.jpg',
      badge: 'ACOUSTIC ENGINEERING',
      heading: 'Heavy Industrial Acoustic Attenuation Demo',
      description: 'Learn how multi-density acoustic cores, magnetic perimeter seals, and heavy drop-down bottom thresholds block airborne machine noise and vibration.',
      bullets: [
        'Sound Transmission Class (STC) ratings from 38 dB to 52 dB',
        'Multi-density mineral rockwool and viscoelastic polymer damping core',
        'Dual magnetic perimeter compression gaskets stopping sound leakage',
        'Heavy-duty industrial stainless steel ball-bearing pivot hinges'
      ]
    },
    overview: {
      paragraphs: [
        'Industrial chiller plant rooms, diesel generator enclosures, compressor rooms, and testing auditoriums generate deafening decibel levels that violate statutory factory environmental noise limits and disrupt adjacent offices. HTI Sound Proof Acoustic Doors provide certified noise transmission loss up to 52 dB.',
        'Fabricated from heavy 1.6mm cold-rolled steel and packed with alternating densities of resin-bonded mineral rockwool and viscoelastic damping layers, the door leaf absorbs sound energy across both low-frequency machine hums and high-frequency noise. Dual magnetic perimeter seals and automatic drop seals eliminate acoustic leakage around all four door edges.'
      ],
      highlights: [
        { label: 'Acoustic Rating', value: 'STC 38 dB to STC 52 dB certified' },
        { label: 'Leaf Thickness', value: '55mm, 65mm, or 85mm heavy acoustic leaf' },
        { label: 'Core Material', value: 'Resin-bonded acoustic rockwool + Viscoelastic sheet' },
        { label: 'Perimeter Seals', value: 'Dual compression magnetic gaskets + Drop seal' }
      ]
    },
    benefits: [
      {
        title: 'Up to 52 dB Sound Dampening',
        desc: 'Reduces deafening 100 dB plant room noise down to comfortable 48 dB conversation levels outside the door.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Dual Magnetic Perimeter Gaskets',
        desc: 'Magnetic compression seals create continuous airtight acoustic contact around head and jambs, eliminating sound leaks.',
        iconName: 'Settings'
      },
      {
        title: 'Automatic Bottom Drop Seal',
        desc: 'Heavy mechanical drop seal extends into the threshold as the door closes, sealing the bottom gap with zero floor dragging.',
        iconName: 'Zap'
      },
      {
        title: 'Factory Safety Noise Compliance',
        desc: 'Ensures facilities meet OSHA and State Pollution Control Board workplace occupational noise exposure standards.',
        iconName: 'Layers'
      }
    ],
    applications: [
      { title: 'Chiller & HVAC Plant Rooms', desc: 'Acoustic noise isolation for heavy chillers, air compressors, and AHU blower rooms.' },
      { title: 'Diesel Generator (DG) Enclosures', desc: 'Heavy acoustic doors containing deafening engine rumble and exhaust hums.' },
      { title: 'Auditoriums, Studios & Conference Rooms', desc: 'Broadcast-quality acoustic attenuation for corporate boardrooms and media studios.' },
      { title: 'Pharmaceutical Utility Corridors', desc: 'Separating noisy water treatment plants and compressors from sterile production corridors.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Laboratory tested specifications for HTI soundproof acoustic doors.',
      tableRows: [
        { label: 'Acoustic Performance Rating:', value: 'Rw / STC 38 dB, STC 45 dB, or STC 52 dB tested to ISO 10140-2 / ASTM E90' },
        { label: 'Door Leaf Construction:', value: '1.6mm double-skin galvanized steel with internal acoustic structural stiffeners' },
        { label: 'Leaf Thickness:', value: '60mm (STC 40-45) / 80mm-90mm (STC 50-52)' },
        { label: 'Internal Acoustic Core:', value: 'Multi-layer composite: 96 kg/m³ rockwool + heavy mass viscoelastic polymer dampening barrier' },
        { label: 'Perimeter Sealing:', value: 'Dual perimeter EPDM and magnetic compression gaskets on frame rebate' },
        { label: 'Threshold Bottom Seal:', value: 'Heavy-duty automatic mechanical drop seal actuated upon door closure' },
        { label: 'Hardware & Hinges:', value: 'SUS304 heavy-duty stainless steel ball-bearing butt hinges rated for 300 kg leaf' },
        { label: 'Vision Panel (Optional):', value: 'Double or triple-glazed multi-laminated acoustic glass with argon gas cavity' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'ISO 10140-2 / ASTM E90 Laboratory Sound Transmission Loss Certified',
        'OSHA Workplace Noise Exposure Regulatory Compliance',
        'State Pollution Control Board Environmental Noise Standards',
        'ISO 9001:2015 Precision Acoustic Manufacturing'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Acoustic doors installed in utility plant rooms and corporate studios.',
      images: [
        { id: 1, src: '/case-studies/case-air-curtain.jpg', caption: 'Industrial Plant Room Heavy Acoustic Door' },
        { id: 2, src: '/services/service-fire-doors.jpg', caption: 'Acoustic and Fire Rated Composite Steel Door' },
        { id: 3, src: '/products/chiller-door-hero.jpg', caption: 'Double Compression Perimeter Gasket Sealing' }
      ]
    },
    relatedSlugs: ['chiller-clean-room-doors', 'fire-rated-doors-shutters', 'motorized-rolling-shutters']
  },

  // =========================================================================
  // CATEGORY 4: FIRE & LIFE SAFETY (5 PRODUCTS)
  // =========================================================================

  // 16. Fire Alarm (Conventional & Addressable)
  'fire-alarm-system': {
    id: 16,
    slug: 'fire-alarm-system',
    name: 'Fire Alarm (Conventional & Addressable)',
    category: 'Fire & Life Safety',
    categorySlug: 'fire-life-safety',
    categoryPage: 'fire-protection',
    breadcrumbName: 'Fire Alarm (Conventional & Addressable)',
    tagline: 'Multi-loop smoke, heat & flame sensor networks with automated relay control',
    badge: 'EN 54 / NFPA 72 Life Safety',
    heroDescription: 'Microprocessor-based addressable and conventional fire alarm detection networks featuring multi-loop panels, intelligent optical smoke sensors, rate-of-rise heat probes, and auto-trip emergency integration.',
    heroImage: '/products/fire-alarm-system.jpg',
    trustIndicators: [
      { text: 'EN 54 & NFPA 72 Certified Detectors', icon: 'Flame' },
      { text: 'Multi-Loop Network Panels (Up to 8 Loops)', icon: 'Cpu' },
      { text: 'Auto-Trip Integration with Doors & AHUs', icon: 'ShieldCheck' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/fire-alarm-system.jpg',
      badge: 'LIFE SAFETY SYSTEM',
      heading: 'Addressable Fire Detection & Relay Automation',
      description: 'Demonstrating sub-second addressable smoke detection, central panel pinpointing, electronic sounder-strobe activation, and automatic relay commands to access doors and ventilation dampers.',
      bullets: [
        'Intelligent addressable loop panels supporting up to 254 devices per loop',
        'Pinpoint optical smoke, heat, and multi-criteria fire detection',
        'Automatic relay shut-off for AHU blowers and power supplies',
        'Hardware-level trip signal releasing all access doors and turnstiles for evacuation'
      ]
    },
    overview: {
      paragraphs: [
        'Early fire detection saves lives, protects infrastructure, and prevents catastrophic commercial downtime. HTI Turnkey Addressable Fire Alarm Systems pinpoint the exact location of smoldering smoke, combustion gases, or thermal rise in seconds across complex multi-story corporate towers, manufacturing plants, and warehousing facilities.',
        'The central addressable control panel networks intelligent optical smoke detectors, rate-of-rise thermal sensors, manual call points, and synchronized sounder strobes. In an alarm condition, the system executes automated life-safety commands: tripping access control locks to open, commanding elevators to ground floors, and shutting down HVAC dampers to contain smoke.'
      ],
      highlights: [
        { label: 'Loop Capacity', value: '1 to 8 Loops (Up to 254 devices per loop)' },
        { label: 'Standards', value: 'EN 54-2, EN 54-4, NFPA 72, IS 2189' },
        { label: 'Detection Types', value: 'Optical Smoke, Heat, Multi-Sensor, Flame' },
        { label: 'Integration', value: 'FACP Relays for Doors, AHUs, PA Systems & Pumps' }
      ]
    },
    benefits: [
      {
        title: 'Pinpoint Addressable Detection',
        desc: 'LCD panel displays exact detector location (e.g., "4th Floor Server Room Rack 3 Smoke"), eliminating search delays.',
        iconName: 'Cpu'
      },
      {
        title: 'Emergency Life-Safety Door Release',
        desc: 'Sends instant hardware-level trip commands to automatic doors, cleanroom interlocks, and turnstiles for unhindered evacuation.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Automatic HVAC Smoke Damper Trip',
        desc: 'Instantly shuts down cleanroom and office AHU blowers, preventing deadly toxic smoke from circulating through ductwork.',
        iconName: 'Flame'
      },
      {
        title: 'Battery Backup & Redundant Loops',
        desc: 'Class A ring loop topology and sealed lead-acid battery backup maintain 24/7 protection during power outages.',
        iconName: 'Zap'
      }
    ],
    applications: [
      { title: 'Commercial Towers & IT Corporate HQs', desc: 'Multi-story addressable fire panels with floor-wise evacuation zone staging.' },
      { title: 'Pharmaceutical & Chemical Plants', desc: 'Flameproof detectors and cleanroom-flush smoke probes in GMP processing zones.' },
      { title: 'Warehouses & Logistics Depots', desc: 'Long-range optical beam smoke detectors monitoring high-bay ceilings up to 100 meters.' },
      { title: 'Hospitals & Surgical Facilities', desc: 'Early warning multi-criteria sensors preventing false alarms in diagnostic and patient suites.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical data for HTI addressable fire alarm panels and detectors.',
      tableRows: [
        { label: 'System Architecture:', value: 'Analogue Addressable Fire Alarm Control Panel (1, 2, 4, or 8 Loop configurations)' },
        { label: 'Device Capacity:', value: 'Up to 254 addressable devices per loop (Detectors, Modules, MCPs, Sounders)' },
        { label: 'Display & Interface:', value: '7" Full-Color Graphic Touchscreen or 4x40 backlit LCD character display' },
        { label: 'Loop Wiring Topology:', value: 'Class A (Ring Loop with isolator modules) or Class B' },
        { label: 'Detectors Supported:', value: 'Intelligent Optical Smoke, Fixed & Rate-of-Rise Heat, Multi-Criteria Dual Smoke+Heat, UV/IR Flame' },
        { label: 'Audio-Visual Signaling:', value: 'Loop-powered 100 dB sounder with synchronized high-intensity red LED strobe' },
        { label: 'Auxiliary Relay Outputs:', value: 'Fire, Fault, Supervisory, and 8 programmable dry-contact relays for third-party systems' },
        { label: 'Power Supply & Standby:', value: '230V AC ± 10%, 50 Hz; Built-in dual 12V 17Ah batteries for 24-hr standby + 30-min alarm' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 54 European Fire Alarm Product Standard (EN 54-2 / EN 54-4)',
        'NFPA 72 National Fire Alarm and Signaling Code Compliance',
        'BIS / IS 2189 Indian Standard for Automatic Fire Detection',
        'CE Certified Electronics & Electromagnetic Compatibility'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Addressable fire alarm control panels and detector installations.',
      images: [
        { id: 1, src: '/products/fire-alarm.jpg', caption: 'Addressable Multi-Loop Fire Alarm Control Panel' },
        { id: 2, src: '/services/service-fire-alarm.jpg', caption: 'Ceiling Optical Smoke Detector and Sounder Strobe Array' },
        { id: 3, src: '/case-studies/case-fire-hydrant.jpg', caption: 'Fire Safety Command Console and Pump Integration' }
      ]
    },
    relatedSlugs: ['fire-hydrant-sprinkler-systems', 'fire-rated-doors-shutters', 'public-address-system']
  },

  // 17. Fire Hydrant & Sprinkler System
  'fire-hydrant-sprinkler-systems': {
    id: 17,
    slug: 'fire-hydrant-sprinkler-systems',
    name: 'Fire Hydrant & Sprinkler System',
    category: 'Fire & Life Safety',
    categorySlug: 'fire-life-safety',
    categoryPage: 'fire-protection',
    breadcrumbName: 'Fire Hydrant & Sprinkler System',
    tagline: 'Turnkey industrial firefighting water distribution networks, pump skids & sprinkler grids',
    badge: 'Turnkey Water Suppression',
    heroDescription: 'Turnkey industrial fire hydrant rings, automatic wet sprinkler pipe networks, diesel and electrical main fire pump skids, landing valves, and hose reels engineered to NBC and NFPA firefighting standards.',
    heroImage: '/products/fire-hydrant-sprinklers.jpg',
    trustIndicators: [
      { text: 'ISI Marked Hydrant Valves & Equipment', icon: 'ShieldCheck' },
      { text: 'Turnkey Electrical & Diesel Pump Skids', icon: 'Settings' },
      { text: 'NBC & NFPA 13 Certified Grids', icon: 'Flame' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/fire-hydrant-sprinklers.jpg',
      badge: 'WATER SUPPRESSION',
      heading: 'Industrial Fire Hydrant & Sprinkler Engineering',
      description: 'See automatic jockey and main diesel pump skids maintain 7 bar network pressure, triggering instantaneous water deluge when heat activates sprinkler glass bulbs.',
      bullets: [
        'High-pressure fire hydrant ring main network spanning entire industrial campus',
        'Automatic sprinkler arrays with 68°C / 79°C thermal glass bulb triggers',
        'Diesel engine + electric main + jockey fire pump skid with automatic pressure sequencing',
        'ISI marked gunmetal landing valves, 30m canvas hoses, and fog/jet branch pipes'
      ]
    },
    overview: {
      paragraphs: [
        'When industrial blazes erupt, continuous high-volume water suppression is the frontline defense protecting lives and capital infrastructure. HTI delivers turnkey Fire Hydrant and Automatic Sprinkler Networks, from structural hydraulic calculations and underground ring mains to certified pump skid commissioning.',
        'The system features triple-tier automated pumping: a jockey pump maintains 7 bar line pressure, an electric main pump starts automatically on pressure drop, and a standby diesel engine pump fires instantly if main power is lost. Strategically positioned wet sprinkler heads burst upon reaching thermal thresholds, dousing flames at the source.'
      ],
      highlights: [
        { label: 'Operating Pressure', value: '7.0 kg/cm² to 10.5 kg/cm² ring main pressure' },
        { label: 'Sprinkler Trigger', value: '68°C (Red) / 79°C (Yellow) quick-response bulb' },
        { label: 'Pump Skid', value: 'Electric Main + Standby Diesel + Jockey Pump' },
        { label: 'Standards', value: 'NBC 2016, NFPA 13, NFPA 20, TAC guidelines' }
      ]
    },
    benefits: [
      {
        title: 'Automatic Sprinkler Flame Dousing',
        desc: 'Thermally sensitive glass bulb sprinklers activate directly over the fire origin, extinguishing blazes before spreading.',
        iconName: 'Flame'
      },
      {
        title: 'Fail-Safe Diesel Standby Pump',
        desc: 'Automatic battery-cranked diesel engine pump fires up in under 15 seconds if electrical grid power is lost during a disaster.',
        iconName: 'Zap'
      },
      {
        title: 'High-Volume Hydrant Water Ring',
        desc: 'Heavy-gauge ERW Grade B piping and gunmetal landing valves deliver up to 2850 LPM water flow for plant firefighting teams.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'CFO Fire NOC Statutory Compliance',
        desc: 'Designed and installed strictly in compliance with National Building Code (NBC) for seamless Chief Fire Officer statutory clearances.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Manufacturing Campuses & Factories', desc: 'Complete external perimeter yard hydrants and internal riser networks.' },
      { title: 'High-Bay Warehouses & Logistics Hubs', desc: 'Early Suppression Fast Response (ESFR) ceiling sprinkler arrays protecting pallet racks.' },
      { title: 'Pharmaceutical Formulation Plants', desc: 'Stainless steel and seamless pipe sprinkler grids over packaging and storage bays.' },
      { title: 'Commercial Towers & IT Parks', desc: 'Wet riser systems, floor landing valves, and basement sprinkler coverage.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Engineering specifications for HTI fire hydrant and sprinkler infrastructure.',
      tableRows: [
        { label: 'Main Piping Network:', value: 'MS ERW Heavy Grade Heavy Duty (IS 1239 / IS 3589) with anti-corrosive red oxide & enamel' },
        { label: 'Fire Pump Configuration:', value: 'Electric Main Pump (2850 LPM @ 7 Bar) + Standby Diesel Engine Pump + Jockey Pump (180 LPM)' },
        { label: 'Hydrant Landing Valves:', value: 'Single / Double Headed 63mm Gunmetal / Stainless Steel (IS 5290 certified)' },
        { label: 'Hose Delivery System:', value: '30-meter non-percolating canvas RRL hose with instantaneous gunmetal couplings (IS 636)' },
        { label: 'Fire Hose Reel Drums:', value: 'High-pressure swing type 19mm / 25mm braided thermoplastic hose (IS 884)' },
        { label: 'Automatic Sprinkler Heads:', value: 'Pendent / Upright / Sidewall 15mm / 20mm quick-response glass bulb (68°C standard)' },
        { label: 'Alarm Check Valve:', value: 'Wet pipe alarm valve with water motor gong bell and pressure retard chamber' },
        { label: 'Control & Instrumentation:', value: 'PLC automated pump control panel with digital pressure transducers and ammeters' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'National Building Code (NBC 2016) Part 4 Fire and Life Safety',
        'NFPA 13 Standard for the Installation of Sprinkler Systems',
        'NFPA 20 Standard for the Installation of Stationary Pumps for Fire Protection',
        'Bureau of Indian Standards (BIS) Certified Valves and Piping'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Industrial fire pump skids, hydrant yards, and sprinkler installations.',
      images: [
        { id: 1, src: '/case-studies/case-fire-hydrant.jpg', caption: 'Industrial Fire Pump Skid (Electric, Diesel & Jockey)' },
        { id: 2, src: '/products/fire-alarm.jpg', caption: 'Hydrant Flow Switch and Pressure Supervisory Integration' },
        { id: 3, src: '/hero-industrial-doors-dock.jpg', caption: 'Warehouse ESFR Sprinkler Grid Installation' }
      ]
    },
    relatedSlugs: ['fire-alarm-system', 'fire-rated-doors-shutters', 'gas-detection-systems']
  },

  // 18. Fire Rated Door & Fire Rated Shutter
  'fire-rated-doors-shutters': {
    id: 18,
    slug: 'fire-rated-doors-shutters',
    name: 'Fire Rated Door & Fire Rated Shutter',
    category: 'Fire & Life Safety',
    categorySlug: 'fire-life-safety',
    categoryPage: 'fire-protection',
    breadcrumbName: 'Fire Rated Door & Fire Rated Shutter',
    tagline: 'Certified 120 / 240 minute fire containment barriers with intumescent smoke seals',
    badge: '120 / 240 Min Fire Integrity',
    heroDescription: 'Certified 120-minute and 240-minute fire-resistant hollow metal doors and motorized rolling fire shutters engineered with mineral wool insulation cores, intumescent seals, and automatic gravity drop release.',
    heroImage: '/products/fire-rated-steel-doors.jpg',
    trustIndicators: [
      { text: '120 / 240 Minutes Certified Fire Integrity', icon: 'Flame' },
      { text: 'CBRI / Warringtonfire Certified', icon: 'ShieldCheck' },
      { text: 'Intumescent Seals & Auto Gravity Drop', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/fire-rated-steel-doors.jpg',
      badge: 'FIRE BARRIER',
      heading: 'Fire Rated Door & Shutter Containment Demo',
      description: 'See the heat-expanding intumescent perimeter seals block toxic smoke and automatic fusible link / FACP gravity descent contain infernos within fire compartments.',
      bullets: [
        'Certified 120 / 240 min fire rating tested to IS 3614 and BS 476 Part 22',
        'Heat-activated intumescent perimeter seals expanding to block toxic smoke',
        'Automatic gravity fail-safe descent on fire alarm signal or fusible link melt',
        'Fire-rated panic exit hardware and heavy-duty hydraulic door closers'
      ]
    },
    overview: {
      paragraphs: [
        'Compartmentation is the foundational rule of passive fire protection. In the event of a blaze, fire and smoke must be locked inside the compartment of origin to allow safe building evacuation and give emergency fire brigades time to respond. HTI Fire Rated Doors and Shutters deliver certified 120 to 240 minutes of structural integrity and thermal insulation.',
        'Constructed from heavy 1.2mm to 1.6mm galvanized steel with bonded non-combustible ceramic mineral wool insulation cores, the doors expand intumescent graphite seals around the frame to block lethal carbon monoxide. Motorized fire shutters feature controlled gravity-drop mechanisms that deploy safely even if building power cables are severed.'
      ],
      highlights: [
        { label: 'Fire Rating', value: '120 Minutes (2 Hours) / 240 Minutes (4 Hours)' },
        { label: 'Testing Standard', value: 'CBRI / Warringtonfire tested to BS 476 / IS 3614' },
        { label: 'Infill Core', value: 'Ceramic mineral wool honeycomb (96–120 kg/m³)' },
        { label: 'Seals', value: 'Intumescent graphite smoke & flame expanding seals' }
      ]
    },
    benefits: [
      {
        title: '240-Minute Inferno Containment',
        desc: 'Withstands extreme furnace temperatures exceeding 1000°C for up to 4 hours without structural breach or collapse.',
        iconName: 'Flame'
      },
      {
        title: 'Toxic Smoke Intumescent Expansion',
        desc: 'Graphite perimeter seals swell up to 25 times their volume under heat, hermetically blocking lethal gases and smoke.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Gravity Fail-Safe Shutter Drop',
        desc: 'Fire shutters release controlled mechanical descent via gravity even if all electrical power and cables have melted.',
        iconName: 'Settings'
      },
      {
        title: 'Fire Panic Exit Push Bar Integration',
        desc: 'Emergency escape doors open with single-touch pressure on UL-listed horizontal panic bars, permitting swift egress.',
        iconName: 'Zap'
      }
    ],
    applications: [
      { title: 'Fire Staircase Enclosures & Fire Shafts', desc: 'Mandatory fire check doors protecting vertical emergency escape stairwells.' },
      { title: 'Electrical Substation & Transformer Rooms', desc: '240-minute certified containment isolating high-voltage oil-filled electrical transformers.' },
      { title: 'Warehouse Fire Compartment Separation', desc: 'Motorized rolling fire shutters dividing massive logistics sheds into manageable fire zones.' },
      { title: 'Server Rooms & High-Value Asset Vaults', desc: 'Clean, insulated fire barrier doors preserving critical records and data infrastructure.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory specifications for HTI fire rated doors and motorized fire shutters.',
      tableRows: [
        { label: 'Certified Fire Rating:', value: '120 Minutes (2 Hours) or 240 Minutes (4 Hours) tested to IS 3614 Part 2 / BS 476 Part 22' },
        { label: 'Door Leaf Construction:', value: '1.2mm / 1.6mm galvanized steel double-skin lock-seamed profile (45mm to 50mm leaf)' },
        { label: 'Door Frame Construction:', value: '1.6mm thick galvanized steel folded profile with built-in intumescent seal groove' },
        { label: 'Insulating Core Material:', value: 'Non-combustible pure ceramic mineral wool (density 96 kg/m³ to 128 kg/m³)' },
        { label: 'Intumescent Smoke Seals:', value: 'Graphite-based expanding seal (expands at 120°C up to 25x original volume)' },
        { label: 'Fire Shutter Slat Profile:', value: 'Double-walled galvanized interlocking slats with internal fire insulation or heavy curved steel' },
        { label: 'Shutter Release Mechanism:', value: '24V DC electromagnetic solenoid release + fusible thermal link (72°C melting link)' },
        { label: 'Hardware Options:', value: 'UL-Listed Panic Exit Hardware, Heavy-Duty Hydraulic Door Closer, Fire-Rated Vision Glass' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'Central Building Research Institute (CBRI) Certified Fire Resistance',
        'Warringtonfire International Testing Certification (BS 476 Part 20 & 22)',
        'Bureau of Indian Standards (IS 3614) Approved Specification',
        'National Building Code (NBC 2016) Fire Compartment Compliance'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Fire rated doors and motorized fire shutters installed in commercial facilities.',
      images: [
        { id: 1, src: '/services/service-fire-doors.jpg', caption: 'Certified 120-Min Fire Rated Steel Door with Panic Hardware' },
        { id: 2, src: '/services/services-heavy-security.jpg', caption: 'Motorized Rolling Fire Shutter with Gravity Descent' },
        { id: 3, src: '/products/fire-alarm.jpg', caption: 'Fire Door Magnetic Hold-Open & FACP Release' }
      ]
    },
    relatedSlugs: ['fire-alarm-system', 'sound-proof-doors', 'motorized-rolling-shutters']
  },

  // 19. Public Address (PA) System
  'public-address-system': {
    id: 19,
    slug: 'public-address-system',
    name: 'Public Address (PA) System',
    category: 'Fire & Life Safety',
    categorySlug: 'fire-life-safety',
    categoryPage: 'fire-protection',
    breadcrumbName: 'Public Address (PA) System',
    tagline: 'Zoned emergency voice evacuation broadcast & IP network industrial intercom',
    badge: 'EN 54-16 Voice Evacuation',
    heroDescription: 'IP network and multi-zone commercial Public Address and Emergency Voice Evacuation Systems (EVAC) featuring crystal-clear speech intelligibility, automated pre-recorded emergency messages, and zoned plant audio distribution.',
    heroImage: '/products/public-address-evac.jpg',
    trustIndicators: [
      { text: 'EN 54-16 Certified Voice Alarm Controller', icon: 'Flame' },
      { text: 'Multi-Zone IP Network Paging', icon: 'Radio' },
      { text: 'Automated FACP Evacuation Broadcast', icon: 'Zap' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/public-address-evac.jpg',
      badge: 'AUDIO EVACUATION',
      heading: 'Voice Evacuation & Multi-Zone Paging Demo',
      description: 'Experience crystal-clear zoned voice evacuation instructions, background music muting, and automated multi-lingual emergency announcements during fire drills.',
      bullets: [
        'EN 54-16 certified Voice Alarm System with line impedance supervision',
        'Zoned broadcasting isolating emergency messages to affected floors first',
        'Multi-lingual automated pre-recorded emergency evacuation voice messages',
        'IP network audio paging from desktop consoles and security control desks'
      ]
    },
    overview: {
      paragraphs: [
        'During life-threatening emergencies, simple alarm bells often induce panic and confusion. Studies prove that clear, authoritative spoken voice instructions dramatically reduce evacuation time and prevent fatal stampedes. HTI Public Address and Emergency Voice Evacuation Systems (EVAC) deliver certified acoustic clarity under EN 54-16 standards.',
        'Operating over IP networks, the central system enables selective paging to individual zones—such as specific warehouse aisles, office floors, or external plant gates. Upon receiving an FACP fire alarm signal, background music is instantaneously muted and phased emergency voice messages guide occupants calmly to nearest fire exits.'
      ],
      highlights: [
        { label: 'Compliance', value: 'EN 54-16 / ISO 7240-16 Voice Alarm Standard' },
        { label: 'Network Audio', value: 'IP / Dante / AES67 multi-channel digital audio' },
        { label: 'Zoning Capability', value: '8 to 64 independent audio paging zones' },
        { label: 'Loudspeakers', value: 'Ceiling, Wall-Mount, Weatherproof Horns, Column' }
      ]
    },
    benefits: [
      {
        title: 'Phased Emergency Evacuation',
        desc: 'Broadcasting evacuation instructions to fire origin zones first prevents bottleneck stampedes in central stairwells.',
        iconName: 'Flame'
      },
      {
        title: 'High Speech Intelligibility (STI)',
        desc: 'Class-D digital amplification and acoustically tuned speakers ensure voice announcements remain distinct over plant machinery.',
        iconName: 'Zap'
      },
      {
        title: 'Complete Line Supervision',
        desc: 'Continuous high-frequency pilot tone monitoring detects open or short circuits across all loudspeaker cables in real time.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Day-to-Day Multi-Zone Utility',
        desc: 'Doubles as an everyday facility announcement, shift siren, background music, and visitor paging system during normal operations.',
        iconName: 'Radio'
      }
    ],
    applications: [
      { title: 'Corporate Headquarters & Commercial Complexes', desc: 'Floor-wise emergency voice broadcast and ambient background music distribution.' },
      { title: 'Manufacturing Plants & Chemical Refineries', desc: 'High-decibel weatherproof horn speaker arrays cutting through factory equipment roar.' },
      { title: 'Airports, Metro Stations & Rail Terminals', desc: 'Intelligent multi-lingual passenger announcements and crisis management broadcasts.' },
      { title: 'Hospitals & Healthcare Campuses', desc: 'Code Blue medical emergency alerts and doctor paging without distressing patients.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical data for HTI Public Address and Voice Evacuation Systems.',
      tableRows: [
        { label: 'System Type:', value: 'Network IP-Based Digital Public Address and Voice Alarm System (EN 54-16 certified)' },
        { label: 'Amplifier Technology:', value: 'High-efficiency Class-D Digital Power Amplifiers (120W, 240W, 500W per channel)' },
        { label: 'Zone Capacity:', value: '8 to 64 zones expandable up to 255 zones over IP network' },
        { label: 'Paging Stations:', value: 'Touchscreen IP Master Microphone Station with gooseneck mic and zone selectors' },
        { label: 'Loudspeakers Types:', value: '6W/12W Ceiling Speakers, 15W/30W Wall Box Speakers, 30W/50W Outdoor Horn Speakers' },
        { label: 'Loudspeaker Line Voltage:', value: '100V / 70V constant-voltage line transmission with impedance transformer' },
        { label: 'Emergency Messaging:', value: 'Built-in solid-state message generator storing multiple pre-recorded evacuation voice files' },
        { label: 'Backup Power:', value: '24V DC battery charger and automatic power switchover maintaining EVAC continuity' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 54-16 Voice Alarm Control and Indicating Equipment Certified',
        'EN 54-24 Voice Alarm Loudspeakers Compliance',
        'ISO 7240-16 / NFPA 72 Emergency Voice Evacuation Standards',
        'CE Certified Electro-Acoustic and Electromagnetic Compatibility'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Public address controllers, microphones, and speaker installations.',
      images: [
        { id: 1, src: '/hero-security-command-center.jpg', caption: 'Central Security Control Desk PA Microphone Console' },
        { id: 2, src: '/products/fire-alarm.jpg', caption: 'Voice Alarm Controller Integration with Fire Alarm Panel' },
        { id: 3, src: '/case-studies/case-fire-hydrant.jpg', caption: 'Industrial Plant Room Weatherproof Horn Loudspeakers' }
      ]
    },
    relatedSlugs: ['fire-alarm-system', 'cctv-surveillance-system', 'server-room-monitoring']
  },

  // 20. Gas Detection Systems
  'gas-detection-systems': {
    id: 20,
    slug: 'gas-detection-systems',
    name: 'Gas Detection Systems',
    category: 'Fire & Life Safety',
    categorySlug: 'fire-life-safety',
    categoryPage: 'fire-protection',
    breadcrumbName: 'Gas Detection Systems',
    tagline: 'Toxic, combustible LPG/CNG, Ammonia & VOC leak alerts with flameproof sensors',
    badge: 'Toxic & Combustible Monitoring',
    heroDescription: 'Continuous toxic, combustible, and refrigerant gas monitoring systems featuring certified Flameproof (Ex-d IIB/IIC) sensor transmitters, catalytic bead and electrochemical probes, and automated exhaust fan interlocks.',
    heroImage: '/case-studies/case-ss304-mist.jpg',
    trustIndicators: [
      { text: 'CIMFR Certified Flameproof Ex-d Sensors', icon: 'Flame' },
      { text: 'PPM / %LEL Precision Detection', icon: 'ShieldCheck' },
      { text: 'Auto Exhaust Fan & Solenoid Trip', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/case-studies/case-ss304-mist.jpg',
      badge: 'GAS TELEMETRY',
      heading: 'Flammable & Toxic Gas Monitoring Demonstration',
      description: 'See catalytic and electrochemical sensors detect micro-leaks of LPG, hydrogen, ammonia, or VOCs, triggering local strobe sirens and shut-off valves.',
      bullets: [
        'Certified Flameproof (Ex-d) cast aluminum sensor transmitters for Zone 1 & 2',
        'PPM resolution for toxic gases and 0–100% LEL for explosive hydrocarbon gases',
        'Dual alarm relays automatically triggering emergency exhaust blowers',
        'Instant shut-off command sent to main gas pipeline solenoid valves'
      ]
    },
    overview: {
      paragraphs: [
        'Invisible, odorless gas leaks in chemical synthesis plants, boiler rooms, battery storage suites, and pharmaceutical laboratories present immediate explosion and poisoning hazards. HTI Gas Detection Systems provide 24/7 continuous monitoring for combustible gases (LPG, CNG, Methane, Hydrogen) and toxic vapors (Ammonia, Carbon Monoxide, Chlorine, VOCs).',
        'Engineered with certified Flameproof (Ex-d IIB / IIC) enclosures, the sensor transmitters withstand hazardous Zone 1 and Zone 2 explosive atmospheres. Upon detecting gas concentrations approaching lower explosive limits (LEL) or toxic thresholds, the system triggers high-decibel hooters, engages exhaust fans, and isolates gas solenoid valves.'
      ],
      highlights: [
        { label: 'Gases Detected', value: 'Combustible (LPG/CNG/H2) & Toxic (NH3/CO/Cl2/VOC)' },
        { label: 'Enclosure Rating', value: 'Flameproof Ex-d IIC T6 / IP66 Weatherproof' },
        { label: 'Sensor Principles', value: 'Catalytic Pellistor, Electrochemical, NDIR Infrared' },
        { label: 'Outputs', value: '4–20 mA, RS-485 Modbus RTU, 2 Alarm Relays' }
      ]
    },
    benefits: [
      {
        title: 'Explosion Prevention (LEL Sensing)',
        desc: 'Detects combustible gas buildup long before reaching explosive concentration, automatically tripping solenoid shut-offs.',
        iconName: 'Flame'
      },
      {
        title: 'Toxic PPM Life Safety Protection',
        desc: 'High-precision electrochemical sensors detect toxic gases like ammonia and carbon monoxide down to single parts per million (PPM).',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Zone 1 & 2 Flameproof Certification',
        desc: 'CIMFR / PESO certified explosion-proof cast aluminum enclosures safe for installation directly inside hazardous chemical environments.',
        iconName: 'Settings'
      },
      {
        title: 'Automatic Ventilation Relay Interlock',
        desc: 'On alarm threshold, pre-configured relays automatically start industrial exhaust blowers to purge accumulating gas.',
        iconName: 'Zap'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Chemical Synthesis Labs', desc: 'Monitoring volatile organic compounds (VOCs), solvent vapors, and toxic hydrogen chloride.' },
      { title: 'Cold Storage & Chiller Compressor Plants', desc: 'Continuous ammonia (NH3) and Freon refrigerant leak monitoring in machinery rooms.' },
      { title: 'Industrial Boiler & Furnace Rooms', desc: 'Natural gas (PNG/CNG) and LPG fuel line pipe joint leak detection.' },
      { title: 'Battery Storage & UPS Rooms', desc: 'Hydrogen (H2) outgassing detection during heavy battery bank charging cycles.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical data for HTI industrial gas detection transmitters and control panels.',
      tableRows: [
        { label: 'Target Gas Groups:', value: 'Combustible Hydrocarbons (LPG, Methane, Hydrogen) & Toxic (Ammonia, CO, Chlorine, H2S, VOCs)' },
        { label: 'Sensing Technology:', value: 'Catalytic Bead (Combustible) / Electrochemical (Toxic & Oxygen) / NDIR (Carbon Dioxide & Hydrocarbons)' },
        { label: 'Measuring Range:', value: '0 – 100% LEL (Combustible) / 0 – 50 PPM, 0 – 500 PPM (Toxic gases)' },
        { label: 'Accuracy & Repeatability:', value: '±2% of Full Scale; Response time T90 < 15 seconds' },
        { label: 'Output Signals:', value: 'Analog 4–20 mA current loop (3-wire) + RS-485 Modbus RTU digital communication' },
        { label: 'Enclosure Rating:', value: 'Flameproof Ex-d IIC T6 Gb (CIMFR certified) with cast aluminum housing (IP66)' },
        { label: 'Local Display & Hooter:', value: 'Backlit graphical LCD display with integrated flameproof red LED beacon & 90 dB buzzer' },
        { label: 'Relay Actions:', value: 'Two potential-free SPDT relay contacts (Low Alarm & High Alarm) rated 5A @ 230V AC' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'CIMFR / PESO Certified Flameproof Ex-d for Gas Groups IIA, IIB, and IIC',
        'IS/IEC 60079-0 & 60079-1 Explosive Atmospheres Electrical Equipment',
        'IP66 Weatherproof and Dust-Tight Environmental Rating',
        'ISO 9001:2015 Precision Sensor Instrumentation Engineering'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Flameproof gas detection transmitters installed in active plant rooms.',
      images: [
        { id: 1, src: '/case-studies/case-ss304-mist.jpg', caption: 'Flameproof Gas Transmitter with Local Digital Display' },
        { id: 2, src: '/products/fire-alarm.jpg', caption: 'Central Gas Leak Annunciator and Scada Panel' },
        { id: 3, src: '/hero-security-command-center.jpg', caption: 'Telemetry Interface with Central Security Control Room' }
      ]
    },
    relatedSlugs: ['fire-alarm-system', 'server-room-monitoring', 'fault-alarm-systems']
  },

  // =========================================================================
  // CATEGORY 5: SURVEILLANCE & ALERTS (5 PRODUCTS)
  // =========================================================================

  // 21. CCTV Surveillance (Analogue & IP 4K)
  'cctv-surveillance-system': {
    id: 21,
    slug: 'cctv-surveillance-system',
    name: 'CCTV Surveillance (Analogue & IP 4K)',
    category: 'Surveillance & Alerts',
    categorySlug: 'surveillance-alerts',
    categoryPage: 'security-systems',
    breadcrumbName: 'CCTV Surveillance (Analogue & IP 4K)',
    tagline: 'Ultra-HD AI analytics, Starlight color night vision & flameproof camera arrays',
    badge: '4K AI Analytics & ATEX',
    heroDescription: 'Enterprise 4K Ultra-HD IP camera arrays and AI-driven video analytics platforms featuring facial recognition, perimeter tripwire intrusion, Starlight low-light optics, and certified Flameproof ATEX housings for high-risk zones.',
    heroImage: '/products/cctv-ip-4k-surveillance.jpg',
    trustIndicators: [
      { text: 'Ultra-HD 4K (8MP / 12MP) Clarity', icon: 'Eye' },
      { text: 'AI Perimeter Intrusion & Face Recognition', icon: 'Cpu' },
      { text: 'Certified Flameproof ATEX / Ex-d Enclosures', icon: 'ShieldCheck' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/cctv-ip-4k-surveillance.jpg',
      badge: 'SURVEILLANCE AI',
      heading: 'AI-Powered 4K Surveillance & Perimeter Analytics',
      description: 'Watch deep learning AI analytics classify humans vs. vehicles, trigger automated PTZ tracking on virtual tripwire breaches, and provide vivid color footage in total darkness.',
      bullets: [
        'Ultra-HD 4K resolution delivering forensic-grade facial and license plate detail',
        'Deep learning AI video analytics: line crossing, loitering, and missing object alarms',
        'Starlight low-light sensors producing full-color imagery down to 0.001 Lux',
        'Certified Flameproof (Ex-d) stainless steel housings for hazardous chemical zones'
      ]
    },
    overview: {
      paragraphs: [
        'Passive surveillance video that only records without alerting is no longer sufficient for modern industrial security. HTI 4K IP Surveillance Systems integrate edge AI deep learning processors that actively analyze video feeds in real time, differentiating between humans, vehicles, and harmless environmental motion like rain or foliage.',
        'From high-speed motorized PTZ domes tracking perimeter breaches to 360-degree fisheye cameras monitoring sprawling warehouses and certified Flameproof (ATEX / Ex-d) stainless steel cameras inspecting solvent processing areas, the system streams high-definition forensic video to centralized NVR matrixes and mobile management consoles.'
      ],
      highlights: [
        { label: 'Resolution', value: '4K Ultra-HD (8MP / 12MP) @ 30fps' },
        { label: 'Low-Light Optics', value: 'Starlight 0.001 Lux color / 50m Smart IR' },
        { label: 'AI Analytics', value: 'Human/Vehicle filter, Face recognition, ANPR' },
        { label: 'Enclosures', value: 'IK10 Vandal-Proof, IP67 / Flameproof ATEX Ex-d' }
      ]
    },
    benefits: [
      {
        title: 'Forensic-Grade 4K Optical Clarity',
        desc: 'Ultra-HD 8MP sensors resolve crisp facial details, currency denominations, and vehicle license plates at extreme distances.',
        iconName: 'Eye'
      },
      {
        title: 'False-Alarm-Free AI Tripwires',
        desc: 'Deep learning classification ignores animals, swaying trees, and headlights, alerting security guards only on genuine human or car breaches.',
        iconName: 'Cpu'
      },
      {
        title: 'Starlight 24/7 Full Color Vision',
        desc: 'Large sensor apertures capture vibrant color video in near-pitch-black environments without needing blinding white floodlights.',
        iconName: 'Zap'
      },
      {
        title: 'ATEX / Ex-d Certified Explosion Housing',
        desc: 'Heavy SUS316L stainless steel explosion-proof camera bodies certified for hazardous refineries and chemical processing suites.',
        iconName: 'ShieldCheck'
      }
    ],
    applications: [
      { title: 'Perimeter Boundary Fence Surveillance', desc: 'Long-range AI bullet cameras and auto-tracking PTZ domes monitoring boundary walls.' },
      { title: 'Pharmaceutical GMP Packaging Lines', desc: 'High-resolution cameras recording packaging batch integrity and cleanroom personnel protocols.' },
      { title: 'Chemical Refineries & Solvent Depots', desc: 'ATEX-certified flameproof cameras monitoring explosive gas distillation areas.' },
      { title: 'Corporate Towers & Data Centers', desc: 'Discreet mini-dome cameras monitoring server racks, corridors, and executive elevators.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical specifications for HTI 4K AI surveillance cameras and enterprise NVRs.',
      tableRows: [
        { label: 'Camera Sensor & Resolution:', value: '1/2.8" or 1/1.8" Progressive Scan CMOS; 4K UHD (3840 x 2160) @ 30fps' },
        { label: 'Lens Configurations:', value: '2.8mm / 3.6mm Fixed Wide-Angle or 2.7–13.5mm Motorized Varifocal with Auto-Focus' },
        { label: 'Night Vision Technology:', value: 'Smart Infrared (up to 50m–150m) + Starlight Ultra-Low Light 0.001 Lux' },
        { label: 'Video Compression:', value: 'H.265+ / H.265 / H.264 High Profile (Saves up to 70% storage and bandwidth)' },
        { label: 'Embedded AI Capabilities:', value: 'Perimeter Tripwire, Intrusion Box, Fast Moving, Loitering, Face Detection, People Counting' },
        { label: 'Enclosure Standards:', value: 'IP67 Weatherproof, IK10 Vandal-Resistant; Optional SUS316L ATEX Flameproof' },
        { label: 'Enterprise Storage & NVR:', value: '16 to 128 Channel 4K NVR with Hot-Swappable RAID 5/6, Redundant Power Supplies' },
        { label: 'Integration Protocols:', value: 'ONVIF Profile S/G/T, RTSP, SDK for integration with Access Control & Fire Alarm' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'ONVIF Profile S/G/T Universal Camera Interoperability Certified',
        'ATEX / IECEx / CIMFR Certified Flameproof Camera Housings',
        'CE & FCC Part 15 Class B Electromagnetic Compatibility',
        'ISO 9001:2015 Security Integration Engineering'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: '4K CCTV cameras and central security command center video walls.',
      images: [
        { id: 1, src: '/products/cctv-ip-4k-surveillance.jpg', caption: 'High-Definition Dome & Bullet Surveillance Array' },
        { id: 2, src: '/about-security-camera.jpg', caption: 'Starlight Outdoor Weatherproof CCTV Camera' },
        { id: 3, src: '/products/surveillance-alerts-hero.jpg', caption: 'Central Security Operations Center 4K Video Wall' }
      ]
    },
    relatedSlugs: ['biometric-access-attendance', 'server-room-monitoring', 'fault-alarm-systems']
  },

  // 22. Biometric Access & Time Attendance
  'biometric-access-attendance': {
    id: 22,
    slug: 'biometric-access-attendance',
    name: 'Biometric Access & Time Attendance',
    category: 'Surveillance & Alerts',
    categorySlug: 'surveillance-alerts',
    categoryPage: 'security-systems',
    breadcrumbName: 'Biometric Access & Time Attendance',
    tagline: 'Facial recognition, anti-spoof fingerprint & contactless shift attendance logging',
    badge: '0.2s Facial Recognition',
    heroDescription: 'Enterprise contactless visible light facial recognition terminals, multi-spectral fingerprint scanners, and time-attendance software platforms with automated HRMS payroll synchronization and turnstile integration.',
    heroImage: '/products/biometric-access-terminal.jpg',
    trustIndicators: [
      { text: '<0.2s Rapid Facial Recognition', icon: 'Zap' },
      { text: 'Dual-Lens Anti-Spoof Live Detection', icon: 'ShieldCheck' },
      { text: 'Direct HRMS & ERP Payroll Sync', icon: 'Cpu' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/biometric-access-terminal.jpg',
      badge: 'BIOMETRIC ACCESS',
      heading: 'Contactless Facial Recognition in Action',
      description: 'Observe sub-second employee authentication as workers walk through turnstiles at normal speed, while dual-camera AI prevents fake photos or phone spoofing.',
      bullets: [
        'Sub-second 0.2s face recognition from up to 2 meters distance',
        'Dual-camera 3D live body detection preventing photo and video screen spoofs',
        'Integrated RFID card reader, QR code scanner, and backlit digital keypad',
        'Automated shift calculation and instant synchronization with HRMS payroll'
      ]
    },
    overview: {
      paragraphs: [
        'Traditional punch cards and fingerprint readers create hygiene concerns and bottleneck queues during peak shift changes. HTI Contactless Visible Light Facial Recognition Terminals allow employees to walk through security checkpoints at normal walking pace, authenticating identities in under 0.2 seconds from up to 2 meters away.',
        'Featuring dual optical and infrared lenses with 3D liveness detection algorithms, the system rejects spoofing attempts using printed photos, tablet screens, or silicone masks. Integrated seamlessly with automatic doors, flap barriers, and corporate HRMS software, it eliminates proxy clock-ins and automates overtime and payroll reporting.'
      ],
      highlights: [
        { label: 'Recognition Speed', value: '< 0.2 seconds per user' },
        { label: 'Face Capacity', value: '10,000 to 50,000 face templates' },
        { label: 'Anti-Spoofing', value: '3D Infrared Liveness Detection (100% anti-photo)' },
        { label: 'Connectivity', value: 'TCP/IP, Wi-Fi, RS485, Wiegand 26/34 Out' }
      ]
    },
    benefits: [
      {
        title: 'Walk-Through Contactless Speed',
        desc: 'Employees walk past the terminal at normal walking speed without stopping, processing up to 40 workers per minute.',
        iconName: 'Zap'
      },
      {
        title: 'Guaranteed Anti-Spoof Defense',
        desc: 'Dual optical and thermal infrared sensors analyze skin texture and eye blinking, blocking printed photos and digital videos.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Direct HRMS & ERP Payroll Integration',
        desc: 'Automatically calculates night shifts, overtime hours, and leaves, pushing clean data directly into SAP, Darwinbox, and Keka.',
        iconName: 'Cpu'
      },
      {
        title: 'Turnstile & Door Interlocking Relay',
        desc: 'Built-in dry contact relays trigger automatic glass doors, electromagnetic door locks, and speed gate barriers instantaneously.',
        iconName: 'Lock'
      }
    ],
    applications: [
      { title: 'Corporate Headquarters & IT Hubs', desc: 'Lobby speed gate turnstile integration and executive floor access control.' },
      { title: 'Pharmaceutical Cleanrooms & R&D Labs', desc: 'Contactless hands-free facial recognition for gowning rooms and sterile airlocks.' },
      { title: 'Manufacturing Plants & Factories', desc: 'Heavy shift-change time attendance tracking thousands of shop-floor workers.' },
      { title: 'Data Centers & Critical Infrastructure', desc: 'Multi-factor authentication requiring Face + PIN + Smartcard to enter server cages.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical specifications for HTI biometric terminals and attendance controllers.',
      tableRows: [
        { label: 'Display & Touchscreen:', value: '5.0" or 7.0" IPS Capacitive Touchscreen (1080 x 720 HD display)' },
        { label: 'Authentication Methods:', value: 'Visible Light Face Recognition, Optical / SilkID Fingerprint, RFID Card, PIN' },
        { label: 'Face Template Capacity:', value: '10,000 standard (Expandable to 50,000 faces in enterprise firmware)' },
        { label: 'Fingerprint Capacity:', value: '10,000 to 20,000 fingerprint templates' },
        { label: 'Event Transaction Buffer:', value: 'Up to 1,000,000 offline transaction records with timestamped snapshot' },
        { label: 'Camera System:', value: 'Dual 2MP WDR optical camera + 2MP IR night vision camera' },
        { label: 'Communication Interfaces:', value: 'TCP/IP (Gigabit LAN), Wi-Fi (802.11 b/g/n), Wiegand Input & Output, RS485' },
        { label: 'Access Control Relays:', value: 'Direct output for Electric Lock, Door Sensor, Exit Button, Alarm Out, Door Bell' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'CE & FCC Electronic Safety and Radiation Standards',
        'Digital Personal Data Protection (DPDP) Compliant Biometric Encryption',
        'ISO 9001:2015 Quality Management Certified Hardware',
        'IP65 Weatherproof Option for Outdoor Turnstile Gate Mounting'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Biometric access terminal installations on turnstiles and cleanroom walls.',
      images: [
        { id: 1, src: '/products/biometric-access-terminal.jpg', caption: 'Visible Light Facial Recognition Terminal Mounted on Turnstile' },
        { id: 2, src: '/hero-glass-atrium.jpg', caption: 'Corporate Lobby Speed Gate Biometric Access Lane' },
        { id: 3, src: '/products/surveillance-alerts-hero.jpg', caption: 'Real-Time Attendance Monitoring on Security Command Screen' }
      ]
    },
    relatedSlugs: ['turnstiles-flap-barriers-speed-gates', 'cctv-surveillance-system', 'visitor-management-system']
  },

  // 23. Video Door Phone (IP & Non-IP)
  'video-door-phones': {
    id: 23,
    slug: 'video-door-phones',
    name: 'Video Door Phone (IP & Non-IP)',
    category: 'Surveillance & Alerts',
    categorySlug: 'surveillance-alerts',
    categoryPage: 'security-systems',
    breadcrumbName: 'Video Door Phone (IP & Non-IP)',
    tagline: '2-way video intercom, remote electronic door release & mobile app integration',
    badge: 'Smart Video Intercom',
    heroDescription: 'Commercial and residential IP video intercom systems featuring full-duplex two-way audio, 1080p wide-angle outdoor camera stations, capacitive indoor touch displays, and smartphone remote unlocking.',
    heroImage: '/services/services-hero-access.jpg',
    trustIndicators: [
      { text: 'Full HD 1080p Wide-Angle Video', icon: 'Eye' },
      { text: 'Remote Mobile App Door Release', icon: 'Zap' },
      { text: 'Multi-Apartment & Multi-Tier Villa Support', icon: 'ShieldCheck' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/services/services-hero-access.jpg',
      badge: 'INTERCOM SYSTEM',
      heading: 'IP Video Intercom & Mobile Unlocking Demo',
      description: 'See visitors press the outdoor bell, live video instantly stream to indoor touch screens and mobile apps, and one-tap remote door unlocking.',
      bullets: [
        'Full HD 1080p camera with 130° wide field-of-view and infrared night vision',
        'Crystal-clear full duplex two-way audio with acoustic echo cancellation',
        'One-touch remote door unlocking from indoor monitor or mobile phone',
        'Integrates with CCTV surveillance cameras and security guard master stations'
      ]
    },
    overview: {
      paragraphs: [
        'Securing commercial office entrances, executive suites, and luxury residential complexes requires positive visual and vocal verification before granting access. HTI IP Video Door Phone systems provide crystal-clear two-way audio and high-definition video communication between visitors and security personnel.',
        'Featuring weatherproof anti-vandal outdoor stations with integrated RFID readers and sleek 7" or 10" capacitive indoor touchscreens, the system also streams calls directly to designated smartphone apps. Security teams or residents can see visitors, converse in real time, and trigger electromagnetic door locks remotely from anywhere in the world.'
      ],
      highlights: [
        { label: 'Camera Quality', value: 'Full HD 1080p with 130° ultra-wide field of view' },
        { label: 'Indoor Monitor', value: '7" or 10" Capacitive color touchscreen' },
        { label: 'Audio Quality', value: 'Full-duplex audio with acoustic echo cancellation' },
        { label: 'Door Release', value: 'Dry-contact relay for electromagnetic & drop bolt locks' }
      ]
    },
    benefits: [
      {
        title: 'Positive Visual Verification',
        desc: 'Wide-angle 1080p video with infrared night vision ensures visitors are clearly identified before doors are opened.',
        iconName: 'Eye'
      },
      {
        title: 'Remote Smartphone Unlocking',
        desc: 'Answer door calls and release electronic locks directly from your mobile smartphone whether in the office or traveling.',
        iconName: 'Zap'
      },
      {
        title: 'Multi-Room & Inter-Station Paging',
        desc: 'Enables instant two-way voice calling between executive desks, reception desks, and security guard master consoles.',
        iconName: 'Radio'
      },
      {
        title: 'Weatherproof Anti-Vandal Outdoor Unit',
        desc: 'Heavy brushed aluminum and tempered glass outdoor calling station rated IP65 weatherproof and IK08 impact resistant.',
        iconName: 'ShieldCheck'
      }
    ],
    applications: [
      { title: 'Corporate Executive Suites & Boardrooms', desc: 'Controlled access entry for executive offices and confidential conference rooms.' },
      { title: 'Gated Residential Villas & Luxury Condos', desc: 'Smart doorbell intercom calling indoor touchscreen and smartphone apps.' },
      { title: 'Multi-Tenant Commercial Complexes', desc: 'Central entrance lobby intercom directory calling individual tenant offices.' },
      { title: 'Bank Vaults & Financial Institutions', desc: 'Secure two-tier verification before granting access into treasury cash rooms.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical specifications for HTI IP video door phone stations and monitors.',
      tableRows: [
        { label: 'Outdoor Station Camera:', value: '2MP CMOS Full HD (1920 x 1080) with 130° horizontal viewing angle' },
        { label: 'Night Vision:', value: 'High-power infrared LEDs with automatic IR-cut filter down to 0 Lux' },
        { label: 'Audio Processing:', value: 'Full-duplex digital audio with hardware echo cancellation and background noise reduction' },
        { label: 'Indoor Touch Display:', value: '7" / 10" IPS Touchscreen LCD (1024 x 600 resolution) with sleek acrylic glass finish' },
        { label: 'Access Control Integration:', value: 'Built-in 13.56 MHz Mifare RFID card reader and electronic lock relay output' },
        { label: 'Network & Connectivity:', value: '10/100 Mbps Ethernet (Standard PoE 802.3af) + 2.4 GHz Wi-Fi' },
        { label: 'Mobile App Support:', value: 'iOS & Android mobile application with push notification and cloud remote unlocking' },
        { label: 'CCTV Stream Viewing:', value: 'Supports RTSP streaming to display IP security cameras directly on indoor monitors' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'CE & FCC Part 15 Certified Electronic Video Intercom',
        'IP65 Ingress Protection & IK08 Vandal-Resistant Outdoor Housing',
        'ONVIF Compatible Video Streaming Protocol',
        'ISO 9001:2015 Quality Manufacturing Standards'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Outdoor intercom panels and indoor touch monitor installations.',
      images: [
        { id: 1, src: '/services/services-hero-access.jpg', caption: 'Weatherproof Outdoor Video Calling Station with RFID' },
        { id: 2, src: '/hero-glass-atrium.jpg', caption: 'Reception Desk Intercom and Door Release Integration' },
        { id: 3, src: '/products/biometric-access-terminal.jpg', caption: 'Indoor Touchscreen Monitor and Smart Door Access' }
      ]
    },
    relatedSlugs: ['cctv-surveillance-system', 'biometric-access-attendance', 'automatic-sliding-swing-doors']
  },

  // 24. Server Room Monitoring
  'server-room-monitoring': {
    id: 24,
    slug: 'server-room-monitoring',
    name: 'Server Room Monitoring',
    category: 'Surveillance & Alerts',
    categorySlug: 'surveillance-alerts',
    categoryPage: 'security-systems',
    breadcrumbName: 'Server Room Monitoring',
    tagline: '24/7 temperature, humidity, water leak & power trip SMS/email alert dialers',
    badge: 'Critical Infrastructure Telemetry',
    heroDescription: 'Continuous 24/7 environmental monitoring for server rooms and data centers featuring precision temperature and relative humidity sensors, rope-type water leak detection, power failure alerts, and instant GSM SMS dialers.',
    heroImage: '/products/server-room-telemetry.jpg',
    trustIndicators: [
      { text: 'Precision Temp & RH Telemetry (±0.3°C)', icon: 'Activity' },
      { text: 'Rope Water Leak Sensing Cable', icon: 'Droplets' },
      { text: 'Instant GSM SMS & Email Auto-Dialer', icon: 'Zap' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/server-room-telemetry.jpg',
      badge: 'DATA CENTER TELEMETRY',
      heading: 'Critical Server Room Environmental Telemetry Demo',
      description: 'See live thermal spike detection in server rack aisles, water leak detection along raised flooring, and automated multi-channel alert dispatch.',
      bullets: [
        'Continuous temperature and humidity tracking with high/low threshold alarms',
        'Conductive rope cable detecting water pipe leaks under raised access floors',
        'GSM cellular SMS and phone call alerts sent instantly upon grid mains power failure',
        'SNMP v2/v3 support for seamless integration into enterprise IT monitoring platforms'
      ]
    },
    overview: {
      paragraphs: [
        'Overheating server racks, unmonitored AC compressor trips, and hidden air conditioning condensation leaks can destroy millions of rupees in enterprise IT hardware in minutes. HTI Server Room Environmental Monitoring Systems provide nonstop telemetry tracking temperature, relative humidity, water intrusion, smoke, and power status.',
        'Featuring an onboard GSM cellular engine and TCP/IP network interface, the system transmits immediate SMS, automated voice calls, and emails to IT managers the instant room conditions drift outside safe parameters. SNMP protocol compatibility allows real-time telemetry streaming into enterprise network management consoles.'
      ],
      highlights: [
        { label: 'Sensor Channels', value: 'Up to 16 digital temperature/RH sensors + 8 dry contacts' },
        { label: 'Leak Detection', value: 'Continuous conductive sensing rope along perimeter' },
        { label: 'Alert Channels', value: 'GSM SMS, Automated Voice Call, Email, SNMP Trap' },
        { label: 'Backup Battery', value: 'Internal rechargeable battery maintaining alerts during blackout' }
      ]
    },
    benefits: [
      {
        title: 'Thermal Spike & AC Trip Warnings',
        desc: 'Sends immediate SMS alerts if precision AC units fail and server rack temperatures climb above 24°C.',
        iconName: 'Activity'
      },
      {
        title: 'Under-Floor Water Leak Detection',
        desc: 'Conductive sensing rope detects tiny water drips under false flooring, preventing catastrophic electrical shorts.',
        iconName: 'Droplets'
      },
      {
        title: 'Independent Cellular GSM Dialing',
        desc: 'Onboard 4G GSM modem sends phone calls and SMS even if the facility internet connection or local LAN has crashed.',
        iconName: 'Zap'
      },
      {
        title: 'SNMP IT Management Integration',
        desc: 'Transmits SNMP v2/v3 traps to Nagios, Zabbix, SolarWinds, or PRTG network management dashboards in real time.',
        iconName: 'Cpu'
      }
    ],
    applications: [
      { title: 'Data Centers & Server Server Farms', desc: 'Multi-rack hot/cold aisle temperature gradient and relative humidity surveillance.' },
      { title: 'Telecom Network Operations Centers (NOC)', desc: 'Unmanned cellular base station shelter environmental and power failure monitoring.' },
      { title: 'Hospital IT & Picture Archival Systems', desc: 'PACS and hospital management server rooms requiring 100% uptime assurance.' },
      { title: 'Banking & Financial Trading Server Vaults', desc: 'Critical disaster-recovery IT infrastructure with audit-logged environmental records.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical parameters for HTI server room monitoring units and sensor probes.',
      tableRows: [
        { label: 'Central Controller Architecture:', value: 'Industrial 32-bit RISC Microcontroller with embedded RTOS operating system' },
        { label: 'Temperature Range & Accuracy:', value: '-40°C to +85°C measurement range; Accuracy: ±0.3°C @ 25°C' },
        { label: 'Humidity Range & Accuracy:', value: '0 to 100% RH non-condensing; Accuracy: ±2% RH' },
        { label: 'Water Leak Sensing:', value: 'Conductive polymer sensing cable (10m to 50m length) with location-pinpointing' },
        { label: 'Digital Inputs Supported:', value: 'Smoke detector, Door open sensor, AC failure, UPS battery trip, Mains power monitor' },
        { label: 'Notification Protocols:', value: 'GSM / 4G SMS alert, Automated Voice Phone Call, SMTP SSL Email, SNMP Traps (v1/v2c/v3)' },
        { label: 'Internal Data Logging:', value: 'Stores up to 50,000 historical sensor readings with timestamp in non-volatile flash' },
        { label: 'Power Supply & Standby:', value: '12V DC adapter + internal rechargeable Lithium-ion battery providing 12 hours backup' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'TIA-942 Data Center Environmental Standards Compliance',
        'ASHRAE Thermal Guidelines for Data Processing Environments',
        'CE & RoHS Certified Environmental Telemetry Hardware',
        'ISO 9001:2015 Quality Manufacturing Standards'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Server room environmental monitoring controllers and sensor installations.',
      images: [
        { id: 1, src: '/products/server-room-telemetry.jpg', caption: '1U Rack-Mount SNMP Server Room Telemetry System with Temp & Water Leak Probes' },
        { id: 2, src: '/products/surveillance-alerts-hero.jpg', caption: 'Data Center Central Environmental Monitoring Dashboard' },
        { id: 3, src: '/case-studies/case-cleanroom.jpg', caption: 'Precision Server Room False-Floor Water Sensing Rope' }
      ]
    },
    relatedSlugs: ['fault-alarm-systems', 'cctv-surveillance-system', 'gas-detection-systems']
  },

  // 25. Fault & Intrusion Alarm Systems
  'fault-alarm-systems': {
    id: 25,
    slug: 'fault-alarm-systems',
    name: 'Fault & Intrusion Alarm Systems',
    category: 'Surveillance & Alerts',
    categorySlug: 'surveillance-alerts',
    categoryPage: 'security-systems',
    breadcrumbName: 'Fault & Intrusion Alarm Systems',
    tagline: 'Central pump trip, perimeter fence breach & industrial process annunciators',
    badge: 'Industrial Annunciator & Defense',
    heroDescription: 'Microprocessor-based industrial fault annunciator panels and perimeter intrusion alarm networks featuring 8 to 64 window LED displays, dual PIR motion sensors, outdoor fence beams, and high-decibel audible sirens.',
    heroImage: '/products/alarm-annunciators-panel.jpg',
    trustIndicators: [
      { text: '8 to 64 Window Microprocessor Annunciator', icon: 'Activity' },
      { text: 'Active Infrared Perimeter Fence Beams', icon: 'ShieldCheck' },
      { text: 'Industrial High-Decibel Siren (115 dB)', icon: 'Zap' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/alarm-annunciators-panel.jpg',
      badge: 'ALARM ANNUNCIATION',
      heading: 'Fault Alarm Annunciator & Perimeter Defense Demo',
      description: 'See the window LED flash sequence on industrial pump trips, dual optical perimeter fence breach detection, and automated security paging.',
      bullets: [
        'ISA-18.1 sequence alarm annunciator windows with flashing LED alerts',
        'Active infrared multi-beam perimeter fence sensors detecting climbers and trespassers',
        'Dual-technology PIR and microwave motion detectors for indoor security',
        'Immediate audio siren blast and SMS alert sent to plant security control desk'
      ]
    },
    overview: {
      paragraphs: [
        'In complex industrial processing plants, pump stations, boiler rooms, and extensive perimeter fences, abnormal exceptions must be acknowledged and resolved before costly equipment destruction or perimeter infiltration occurs. HTI Fault and Intrusion Alarm Systems combine industrial annunciator telemetry with perimeter security defense.',
        'The industrial annunciator panel visualizes critical machinery exceptions (pump overload, low water level, lubrication failure, phase reverse) across bright 8 to 64 window LED displays following standardized ISA-18.1 alarm sequences. Perimeter zones integrate active infrared boundary beams and vibration sensors that trigger high-decibel 115 dB outdoor sirens upon breach.'
      ],
      highlights: [
        { label: 'Annunciator Windows', value: '8, 16, 24, 32, or 64 Windows LED Panel' },
        { label: 'Alarm Sequences', value: 'ISA-18.1 Sequence A, M, R, F3A selectable' },
        { label: 'Perimeter Range', value: 'Dual / Quad beams up to 200m outdoor span' },
        { label: 'Siren Output', value: '115 dB weatherproof multi-tone outdoor siren' }
      ]
    },
    benefits: [
      {
        title: 'Instant Visual Machinery Exception',
        desc: 'Window LED flashes rapidly upon trip and glows steady when acknowledged, giving operators unambiguous plant status.',
        iconName: 'Activity'
      },
      {
        title: 'Long-Range Outdoor Perimeter Beams',
        desc: 'Active infrared pulsed beams spanning up to 200 meters detect intruders climbing or cutting boundary fences.',
        iconName: 'ShieldCheck'
      },
      {
        title: '115 dB High-Decibel Deterrent Siren',
        desc: 'Powerful outdoor electronic siren startles intruders and immediately alerts on-duty security guard patrols.',
        iconName: 'Zap'
      },
      {
        title: 'SCADA & Central BMS Integration',
        desc: 'Potential-free relay outputs and RS-485 Modbus RTU interface stream all alarms directly into central supervisory computers.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Water Treatment & Sewage Pumping Stations', desc: 'Monitoring pump overload, wet well high levels, and valve trip status.' },
      { title: 'Industrial Campus Perimeter Boundaries', desc: 'Active infrared multi-beam sensors protecting property fences against night intrusion.' },
      { title: 'Thermal Power Plants & Boiler Rooms', desc: 'Critical steam pressure, flame failure, and lubrication oil trip annunciators.' },
      { title: 'Warehouse Storage & Logistics Depots', desc: 'Indoor dual-technology PIR + microwave motion intrusion security grids.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Technical specifications for HTI fault annunciators and intrusion alarm systems.',
      tableRows: [
        { label: 'Annunciator Window Configurations:', value: '8, 12, 16, 24, 32, 48, or 64 Window modular flush-mount panel' },
        { label: 'Display Technology:', value: 'Ultra-bright Red / Amber / Green LEDs with translucent custom text photo-film tiles' },
        { label: 'Input Fault Signals:', value: 'Potential-free Normally Open (NO) or Normally Closed (NC) contacts' },
        { label: 'Operating Sequence Options:', value: 'Field-programmable ISA-18.1 Sequences: Automatic (A), Manual (M), Ringback (R)' },
        { label: 'Perimeter Intrusion Sensor:', value: 'Active Infrared Quad Beam with frequency modulation; Outdoor range: 50m to 200m' },
        { label: 'Indoor Motion Detection:', value: 'Dual PIR + Microwave Doppler radar sensor (15m x 15m 90° coverage)' },
        { label: 'Alarm Siren & Beacon:', value: '115 dB outdoor siren with integrated flashing amber/red strobe beacon' },
        { label: 'Communication Protocol:', value: 'RS-485 Modbus RTU slave port for SCADA / PLC / BMS integration' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'ISA-18.1 International Standard for Annunciator Sequences and Specifications',
        'IEC 61000-4 Electromagnetic Compatibility Immunity for Industrial Environments',
        'IP55 / IP65 Weatherproof Ingress Protection Rating for Outdoor Sensors',
        'ISO 9001:2015 Precision Industrial Instrumentation Engineering'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Industrial annunciator panels and perimeter intrusion sensor installations.',
      images: [
        { id: 1, src: '/products/alarm-annunciators-panel.jpg', caption: 'Industrial Microprocessor Multi-Window Annunciator Panel with Buzzer Grill' },
        { id: 2, src: '/products/surveillance-alerts-hero.jpg', caption: 'Central Security Control Console Intrusion Alarm Screen' },
        { id: 3, src: '/case-studies/case-boom-barrier.jpg', caption: 'Perimeter Infrared Beam Sensor on Industrial Boundary Wall' }
      ]
    },
    relatedSlugs: ['server-room-monitoring', 'cctv-surveillance-system', 'gas-detection-systems']
  },

  // 26. Sectional Overhead Doors (Access Automation)
  'sectional-overhead-doors': {
    id: 26,
    slug: 'sectional-overhead-doors',
    name: 'Sectional Overhead Doors',
    category: 'Access Automation',
    categorySlug: 'access-automation',
    categoryPage: 'automation',
    breadcrumbName: 'Sectional Overhead Doors',
    tagline: 'Insulated vertical lifting doors maximizing loading dock space and thermal efficiency',
    badge: 'Thermal Efficient',
    heroDescription: 'Industrial overhead sectional doors manufactured from double-skinned insulated polyurethane sandwich panels. Glides upward along vertical and curved tracks flush against the ceiling, leaving loading bay thresholds completely unobstructed.',
    heroImage: '/services/service-sectional-doors.jpg',
    trustIndicators: [
      { text: 'Class 4 Wind Resistance', icon: 'ShieldCheck' },
      { text: 'U-Value 0.51 W/m²K Insulation', icon: 'Settings' },
      { text: '50,000 Cycle Torsion Springs', icon: 'Wrench' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/services/service-sectional-doors.jpg',
      badge: 'ENGINEERING SHOWCASE',
      heading: 'Sectional Overhead Door Performance',
      description: 'Experience the smooth vertical glide, high thermal insulation core, and anti-drop safety brake mechanisms engineered for high-throughput logistics bays.',
      bullets: [
        'Double-wall insulated steel sandwich panels filled with CFC-free PU foam',
        'Anti-drop cable brake and spring rupture safety catch mechanisms',
        'High-cycle shot-peened torsion spring balancing for 50,000 operations',
        'Seamless dock leveler, traffic light, and safety interlock integration'
      ]
    },
    overview: {
      heading: 'Engineered for Heavy Logistics & Thermal Retention',
      paragraphs: [
        'HTI Sectional Overhead Doors provide the optimal balance between high thermal efficiency, acoustic insulation, and space optimization for industrial manufacturing plants, logistics hubs, and cold storage warehouses.',
        'Manufactured with 40mm or 50mm CFC-free polyurethane cores encased in galvanized steel skins, these doors glide smoothly along curved overhead tracks, maximizing vertical clearance for forklift operations while maintaining energy efficiency.'
      ],
      highlights: [
        { label: 'Panel Core', value: '40mm / 50mm CFC-free Polyurethane' },
        { label: 'Operating Speed', value: '0.25 m/sec with manual chain hoist' },
        { label: 'Wind Resistance', value: 'Class 3 / Class 4 (tested to 120 km/h)' },
        { label: 'Safety Devices', value: 'Anti-drop cable brake & bottom safety edge' }
      ]
    },
    benefits: [
      {
        title: 'Thermal & Acoustic Insulation',
        desc: 'High-density PU core delivers exceptional thermal barrier U-value 0.51 W/m²K, reducing facility HVAC loading.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Space-Saving Overhead Clearance',
        desc: 'Glides vertically upward and rests flush against ceiling beams, leaving dock doorways completely clear.',
        iconName: 'Layers'
      },
      {
        title: 'Dual Anti-Drop Safety Brakes',
        desc: 'Engineered cable and spring rupture safety catches prevent accidental panel descent in the event of cable tension loss.',
        iconName: 'Settings'
      },
      {
        title: 'Heavy Logistics Duty Cycle',
        desc: 'Shot-peened torsion spring balancing tested for up to 50,000 continuous loading dock cycles.',
        iconName: 'Wrench'
      }
    ],
    applications: [
      { title: 'Logistics Warehouses & Dock Bays', desc: 'Continuous cross-docking operations requiring heavy thermal protection.' },
      { title: 'Automotive Manufacturing Halls', desc: 'Material supply entrances with automated overhead clearance.' },
      { title: 'Distribution Centers', desc: 'High-volume cargo loading bays interlocked with dock levellers.' },
      { title: 'Aviation Hangars & Depots', desc: 'Heavy vehicle maintenance bays with robust weather shielding.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory-tested specifications for HTI Sectional Overhead Doors and industrial operators.',
      tableRows: [
        { label: 'Panel Construction:', value: '40 mm / 50 mm double-skin galvanized steel with PU insulation' },
        { label: 'Thermal Transmission:', value: 'U = 0.51 W/m²K (complies with green building norms)' },
        { label: 'Balancing System:', value: 'Shot-peened high-tensile torsion springs (up to 50,000 cycles)' },
        { label: 'Operating Drive:', value: '400V 3-phase or 230V 1-phase industrial shaft motor with chain override' },
        { label: 'Wind Load Rating:', value: 'Class 3 / 4 certified per EN 12424 standards' },
        { label: 'Track Hardware:', value: '2mm galvanized steel C-profile tracks with nylon ball bearing rollers' },
        { label: 'Safety Equipment:', value: 'Cable break device, spring break catch, pneumatic bottom safety edge' },
        { label: 'Operating Temp:', value: '-25°C to +60°C ambient tolerance' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 13241-1 European Industrial Doors Safety Harmonized Standard',
        'EN 12424 Wind Load Resistance Class 3 / 4 Certification',
        'ISO 9001:2015 Quality Assured Manufacturing & Assembly',
        'Integrated Fire Alarm & Loading Bay Dock Interlock Relay Interface'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Sectional overhead door installations across logistics warehouses and distribution hubs.',
      images: [
        { id: 1, src: '/services/service-sectional-doors.jpg', caption: 'Loading Dock Overhead Sectional Door Installation' },
        { id: 2, src: '/services/service-high-speed-doors.jpg', caption: 'Warehouse Entrance Insulated Sectional System' },
        { id: 3, src: '/hero-industrial-doors-dock.jpg', caption: 'Logistics Loading Bay Multi-Door Array' },
        { id: 4, src: '/case-studies/case-industrial-doors.jpg', caption: 'Heavy Manufacturing Plant Internal Partition' },
        { id: 5, src: '/services/services-logistics-bridge.jpg', caption: 'Dock Leveler and Sectional Door Integration' }
      ]
    },
    relatedSlugs: ['pvc-rapid-roll-up-doors', 'dock-levellers-dock-shelters', 'motorized-rolling-shutters']
  },

  // 27. Tyre Killers & Road Blockers (Traffic & Perimeter)
  'tyre-killers-road-blockers': {
    id: 27,
    slug: 'tyre-killers-road-blockers',
    name: 'Tyre Killers & Road Blockers',
    category: 'Traffic & Perimeter',
    categorySlug: 'traffic-perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Tyre Killers & Road Blockers',
    tagline: 'Electro-hydraulic high-security anti-ram road blockers & bi-directional tyre shredders',
    badge: 'High Security Defense',
    heroDescription: 'Heavy-duty electro-hydraulic road blockers and hardened steel tyre killers engineered to enforce zero-tolerance perimeter defense at military facilities, government complexes, data centers, and critical assets.',
    heroImage: '/services/service-bollards-blockers.jpg',
    trustIndicators: [
      { text: 'ASTM F2656 Crash Rated Design', icon: 'ShieldCheck' },
      { text: 'Electro-Hydraulic Heavy Drive', icon: 'Settings' },
      { text: 'Sub-2s Emergency Fast Rise', icon: 'Zap' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/services/service-bollards-blockers.jpg',
      badge: 'PERIMETER DEFENSE',
      heading: 'Tyre Killer & Road Blocker Operation',
      description: 'See the heavy-gauge hardened steel spikes and hydraulic barrier ram rise in under 2 seconds to neutralize unauthorized vehicle breaches.',
      bullets: [
        'Hardened heavy-gauge alloy steel spikes shred tubeless radial tyres instantly',
        'Electro-hydraulic power pack engineered for 100% continuous perimeter duty',
        'Emergency Fast Operation (EFO) activates full blocking in under 1.8 seconds',
        'Dual inductive loops prevent accidental deployment under authorized vehicles'
      ]
    },
    overview: {
      heading: 'Engineered for High-Security Facility Access Defense',
      paragraphs: [
        'HTI Tyre Killers and Road Blockers are mission-critical vehicle barrier systems designed to prevent hostile vehicle ramming attacks and unauthorized drive-throughs. Fabricated from structural heavy-gauge steel, these systems deliver uncompromising perimeter defense.',
        'Equipped with independent electro-hydraulic power units, bi-directional or uni-directional spikes, and high-speed emergency fast operation (EFO), they integrate seamlessly with boom barriers, FASTag RFID readers, and central security control consoles.'
      ],
      highlights: [
        { label: 'Blocking Height', value: '500 mm to 1000 mm rising blocker / 150 mm spike' },
        { label: 'EFO Fast Rise', value: '< 1.8 seconds emergency hydraulic accumulator' },
        { label: 'Axle Load Capacity', value: '40 to 60 Metric Tons heavy logistics rating' },
        { label: 'Drive Unit', value: 'External weatherproof electro-hydraulic power pack' }
      ]
    },
    benefits: [
      {
        title: 'Instant Tyre Deflation',
        desc: 'Heavy-gauge alloy spikes shred heavy truck and passenger vehicle tyres instantly upon unauthorized intrusion.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Anti-Ram Structural Core',
        desc: 'Reinforced structural steel blocker foundation dissipates heavy vehicle impact energy safely into ground foundations.',
        iconName: 'Layers'
      },
      {
        title: 'Sub-2s Emergency Fast Rise',
        desc: 'Dedicated hydraulic accumulator allows instant deployment in under 1.8 seconds during security alerts.',
        iconName: 'Zap'
      },
      {
        title: 'Integrated Access Control',
        desc: 'Synchronized interlocking with automatic boom barriers, ANPR cameras, and FASTag UHF readers.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Military Bases & Defense Checkpoints', desc: 'Active physical denial barriers preventing forced vehicular breach.' },
      { title: 'Data Centers & Tech HQs', desc: 'Sub-surface road blockers securing sensitive computing infrastructure perimeters.' },
      { title: 'Government Secretariats & Embassies', desc: 'Certified anti-ram impact barriers protecting critical public assets.' },
      { title: 'Logistics Depots & Customs Ports', desc: 'One-way tyre killers enforcing designated directional lane discipline.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory-tested parameters for HTI hydraulic road blockers and steel tyre shredders.',
      tableRows: [
        { label: 'System Type:', value: 'Electro-Hydraulic Rising Road Blocker & Flush Surface Tyre Killer' },
        { label: 'Blocker Rising Height:', value: '500 mm / 650 mm / 800 mm / 1000 mm options' },
        { label: 'Spike Height / Thickness:', value: '150 mm heavy hardened alloy steel, 12 mm thickness' },
        { label: 'Operating Speed:', value: 'Normal: 3 – 5 sec; Emergency Fast Operation (EFO): < 1.8 sec' },
        { label: 'Axle Load Rating:', value: '50 Metric Tons axle weight capacity per BS 6323 standards' },
        { label: 'Hydraulic Power Unit:', value: 'High-pressure 240V / 415V 3-phase hydraulic power pack with manual pump' },
        { label: 'Ingress Protection:', value: 'IP68 submersible hydraulic cylinder; IP65 external control cabinet' },
        { label: 'Safety Integration:', value: 'Traffic signal lights (Red/Green), inductive safety loops, photocell sensors' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'ASTM F2656 / PAS 68 Crash Impact Certification Equivalent Geometry',
        'IP68 Submersible Hydraulic Cylinder Enclosure Standards',
        'ISO 9001:2015 Precision Fabrication & Security Engineering',
        'Central SCADA / BMS Dry Contact Supervised Emergency Override'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Road blocker and tyre killer installations protecting high-security checkpoints.',
      images: [
        { id: 1, src: '/services/service-bollards-blockers.jpg', caption: 'Electro-Hydraulic Rising Road Blocker Active Deployment' },
        { id: 2, src: '/case-studies/case-boom-barrier.jpg', caption: 'Heavy Duty Anti-Ram Vehicle Defense Checkpoint' },
        { id: 3, src: '/products/boom-barriers.jpg', caption: 'Boom Barrier and Road Blocker Interlocked Security Portal' },
        { id: 4, src: '/services/service-boom-barrier.jpg', caption: 'High-Throughput Corporate Security Gate Array' },
        { id: 5, src: '/services/services-heavy-security.jpg', caption: 'Sub-Surface Heavy Duty Hydraulic Cylinder Trenching' }
      ]
    },
    relatedSlugs: ['boom-barriers', 'bollards-tyre-killers-car-lifts', 'visitor-management-system']
  },

  // 28. Hermetically Sealed Cleanroom Doors (Pharma Cleanroom)
  'hermetic-cleanroom-doors': {
    id: 28,
    slug: 'hermetic-cleanroom-doors',
    name: 'Hermetically Sealed Cleanroom Doors',
    category: 'Pharma Cleanroom',
    categorySlug: 'pharma-cleanroom',
    categoryPage: 'cleanroom-interlocks',
    breadcrumbName: 'Hermetically Sealed Cleanroom Doors',
    tagline: 'Airtight flush-fit antimicrobial cleanroom sliding and swing doors for sterile containment',
    badge: 'ISO 14644 Sterile Flush',
    heroDescription: 'Hermetically sealing cleanroom doors engineered with drop-down perimeter gaskets and flush-glazed vision panels. Maintains differential pressure zones and air-cleanliness levels in pharmaceutical suites, operating theaters, and sterile labs.',
    heroImage: '/products/cleanroom-door-pharma.jpg',
    trustIndicators: [
      { text: 'ISO 14644 & cGMP Class A Compliant', icon: 'ShieldCheck' },
      { text: 'Perimeter Hermetic Inflatable/Drop Seal', icon: 'Settings' },
      { text: 'Antimicrobial Stainless Steel / HPL', icon: 'Wrench' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/hero-cleanroom-interlock-chamber.jpg',
      badge: 'STERILE ENGINEERING',
      heading: 'Hermetic Cleanroom Door Operation',
      description: 'Observe the 4-sided hermetic sealing mechanism and touchless wave sensor integration maintaining strict differential air pressure cascades.',
      bullets: [
        'Four-sided continuous silicone gasket system drops and compresses upon closure',
        'Flush-fitting double-glazed tempered glass vision panels with integrated silica desiccant',
        'Non-porous SS304 or High Pressure Laminate (HPL) surfaces resistant to aggressive VHP sanitization',
        'Seamless interlocking with HTI USFDA 21 CFR Part 11 airlock door controllers'
      ]
    },
    overview: {
      heading: 'Engineered for Sterile Containment & Differential Pressure',
      paragraphs: [
        'HTI Hermetically Sealed Cleanroom Doors are purpose-engineered for environments requiring zero air leakage and precise differential pressure maintenance. Featuring a specialized track system, the door moves forward and downward during closing to compress four-sided gaskets against the frame and floor.',
        'Constructed with sterile antimicrobial stainless steel SS304/SS316 or anti-static HPL skins, these doors prevent contamination in pharmaceutical manufacturing, sterile filling suites, viral vector laboratories, and hospital surgical suites.'
      ],
      highlights: [
        { label: 'Air Leakage', value: 'Class 4 per EN 12207 airtight sealing (<0.5 m³/h·m²)' },
        { label: 'Leaf Material', value: 'Stainless Steel SS 304 / SS 316 / High Pressure Laminate' },
        { label: 'Gasket System', value: '4-Sided continuous silicone compression drop seal' },
        { label: 'Vision Panel', value: 'Double-glazed flush tempered glass with desiccant' }
      ]
    },
    benefits: [
      {
        title: 'Four-Sided Hermetic Sealing',
        desc: 'Dynamic track mechanism compresses silicone perimeter seals against frame and floor, guaranteeing airtight boundary integrity.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Sterile Flush Construction',
        desc: 'Completely ledge-free frame and flush vision panels prevent dust accumulation and withstand aggressive disinfection.',
        iconName: 'Layers'
      },
      {
        title: 'Touchless Sensor Entry',
        desc: 'Infrared optical wave sensors and foot-switch activation eliminate hands-on contamination in surgical and sterile corridors.',
        iconName: 'Radio'
      },
      {
        title: 'Airlock Logic Interlink',
        desc: 'Supervised magnetic contact outputs interlock seamlessly with cleanroom HVAC systems and central door controllers.',
        iconName: 'Settings'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Sterile Production', desc: 'Class A/B sterile formulation and injectable filling suites.' },
      { title: 'Hospital Operating Theaters & ICUs', desc: 'Positive pressure surgical suites and bio-containment rooms.' },
      { title: 'Biotechnology Laboratories', desc: 'BSL-3 and BSL-4 high containment virus and vaccine research suites.' },
      { title: 'Semiconductor Fabrication Bays', desc: 'Ultra-clean particulate-free precision manufacturing zones.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory-tested cleanroom door parameters verified for sterile pressure cascades.',
      tableRows: [
        { label: 'Door Type:', value: 'Single Slide / Bi-Parting Hermetic Sliding or Flush Swing Door' },
        { label: 'Leaf Thickness:', value: '45 mm / 50 mm insulated polyurethane or honeycomb infill' },
        { label: 'Skin Material:', value: 'SS 304 (0.8mm) Hairline Finish or Antibacterial High-Pressure Laminate (HPL)' },
        { label: 'Air Permeability:', value: 'Class 4 certified under EN 12207 (tested to +150 Pa pressure differential)' },
        { label: 'Sealing Mechanism:', value: 'EPDM / Silicone four-sided dynamic compression gasket' },
        { label: 'Vision Lite:', value: '5mm + 5mm double flush laminated safety glass with silica gel moisture absorber' },
        { label: 'Operator Drive:', value: 'Whisper-quiet Brushless DC motor with microprocessor controller' },
        { label: 'Emergency Operation:', value: 'Manual push open release lever & integrated 24V fail-safe battery' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'ISO 14644-1 Cleanrooms and Associated Controlled Environments Standard',
        'EN 12207 Windows and Doors — Air Permeability Class 4 Certified',
        'cGMP & USFDA 21 CFR Part 11 Compatible Cleanroom Architecture',
        'Fire Alarm Interface: Supervised dry contact emergency release'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Hermetic cleanroom door installations across pharmaceutical suites and hospital surgical OT rooms.',
      images: [
        { id: 1, src: '/products/cleanroom-door-pharma.jpg', caption: 'Pharmaceutical Personnel Airlock Hermetic Sliding Door' },
        { id: 2, src: '/hero-cleanroom-interlock-chamber.jpg', caption: 'Sterile Suite Flush Double-Glazed Vision Panel' },
        { id: 3, src: '/products/cleanroom-interlocks.jpg', caption: 'Cleanroom Airlock Door Controller Integration' },
        { id: 4, src: '/products/chiller-door-hero.jpg', caption: 'Heavy Thermal Insulated Cleanroom Cold Barrier' },
        { id: 5, src: '/hero-cleanroom-automation.jpg', caption: 'cGMP Compliant Cleanroom Corridor Deployment' }
      ]
    },
    relatedSlugs: ['door-interlock-systems', 'pass-box-systems', 'chiller-clean-room-doors']
  },

  // 29. Clean Agent Gas Suppression Systems (Fire & Life Safety)
  'gas-suppression-systems': {
    id: 29,
    slug: 'gas-suppression-systems',
    name: 'Clean Agent Gas Suppression Systems',
    category: 'Fire & Life Safety',
    categorySlug: 'fire-life-safety',
    categoryPage: 'fire-protection',
    breadcrumbName: 'Clean Agent Gas Suppression',
    tagline: 'Waterless clean agent gas fire extinguishing (Novec 1230 & FM-200) for sensitive electrical assets',
    badge: 'Waterless Fire Suppression',
    heroDescription: 'Clean agent gaseous fire extinguishing systems utilizing Novec 1230 and FM-200 fluids. Extinguishes electrical and server room fires in under 10 seconds without water damage, residue, or electrical conductivity.',
    heroImage: '/products/clean-agent-gas-suppression.jpg',
    trustIndicators: [
      { text: 'UL Listed & FM Approved Cylinders', icon: 'ShieldCheck' },
      { text: 'Extinguishes in Under 10 Seconds', icon: 'Zap' },
      { text: 'Zero Ozone Depletion & Residue', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/clean-agent-gas-suppression.jpg',
      badge: 'LIFE SAFETY SHOWCASE',
      heading: 'Clean Agent Gas Discharge & Control',
      description: 'See the multi-zone gas release panel sequence, abort switches, and high-pressure 360° dispersion nozzles extinguishing fires cleanly.',
      bullets: [
        'Rapid total flooding discharge in under 10 seconds to suppress fires at nascent stage',
        'Electrically non-conductive and leaves zero residue—completely safe for live server racks',
        'Dual cross-zoned optical smoke and heat detectors prevent false cylinder discharge',
        'Integrated pre-discharge warning sounders, flashing strobes, and manual abort controls'
      ]
    },
    overview: {
      heading: 'Engineered for Critical Electrical & Data Center Asset Protection',
      paragraphs: [
        'In server rooms, data centers, telecom exchanges, and electrical control rooms, water sprinklers cause catastrophic equipment damage. HTI Clean Agent Gas Suppression Systems utilize environmentally safe extinguishing agents (FK-5-1-12 / HFC-227ea) to extinguish fires in seconds.',
        'Controlled by specialized releasing fire alarm panels with cross-zoned detection, the system triggers pre-discharge evacuation warnings before releasing pressurized gas through engineered 360° discharge nozzles, leaving equipment completely undamaged.'
      ],
      highlights: [
        { label: 'Clean Agents', value: 'Novec 1230 (FK-5-1-12) / FM-200 (HFC-227ea)' },
        { label: 'Discharge Time', value: 'Nominal 10 seconds total flooding discharge' },
        { label: 'Cylinder Pressure', value: '25 bar / 42 bar super-pressurized with dry Nitrogen' },
        { label: 'Certifications', value: 'UL Listed / FM Approved cylinders and valves' }
      ]
    },
    benefits: [
      {
        title: 'Sub-10s Total Flooding',
        desc: 'Rapid discharge reaches design concentration in under 10 seconds, stopping combustion before flame spread.',
        iconName: 'Zap'
      },
      {
        title: 'Zero Water Damage & Clean Residue',
        desc: 'Leaves no water or chemical residue, ensuring sensitive servers and electronics remain fully functional.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Cross-Zoned Safety Logic',
        desc: 'Requires confirmation from both optical smoke and ionization/heat sensors to prevent accidental gas release.',
        iconName: 'Settings'
      },
      {
        title: 'Environmental Safety',
        desc: 'Zero Ozone Depletion Potential (ODP=0) and negligible atmospheric lifetime for green building compliance.',
        iconName: 'Layers'
      }
    ],
    applications: [
      { title: 'Server Rooms & Cloud Data Centers', desc: 'Waterless suppression protecting high-density computing racks.' },
      { title: 'Electrical Control & Switchgear Rooms', desc: 'High-voltage substation control panels and battery rooms.' },
      { title: 'Telecom Exchanges & NOC Hubs', desc: 'Uninterrupted communication infrastructure life safety.' },
      { title: 'Museum Archives & Vaults', desc: 'Irreplaceable cultural heritage document and artifact protection.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory-tested clean agent gas extinguishing system parameters.',
      tableRows: [
        { label: 'Suppressing Agents:', value: 'Novec 1230 (Dodecafluoro-2-methylpentan-3-one) or FM-200 (Heptafluoropropane)' },
        { label: 'Cylinder Capacity Options:', value: '30L, 50L, 80L, 120L, 180L seamless steel alloy cylinders' },
        { label: 'Operating Pressure:', value: '25 bar / 42 bar super-pressurized with ultra-pure dry nitrogen' },
        { label: 'Discharge Nozzles:', value: '360° or 180° radial brass/stainless steel dispersion nozzles' },
        { label: 'Actuation Method:', value: '24V DC solenoid valve actuator with manual mechanical override lever' },
        { label: 'Detection Logic:', value: 'Cross-zoned double-knock detection (Smoke + Thermal sensor confirmation)' },
        { label: 'Safety Interlocks:', value: 'Pre-discharge countdown timer, manual abort station, and AHU shut-off relay' },
        { label: 'Ambient Operating Range:', value: '0°C to +50°C' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'NFPA 2001 Standard on Clean Agent Fire Extinguishing Systems',
        'UL 2166 / FM 5600 Certified System Component Assemblies',
        'ISO 14520 Gaseous Fire-Extinguishing Systems Specification',
        'BMS / SCADA Modbus Interface for Central Facility Telemetry'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Gas suppression cylinders, distribution piping, and discharge nozzles in server rooms.',
      images: [
        { id: 1, src: '/case-studies/case-fire-hydrant.jpg', caption: 'Clean Agent High-Pressure Cylinder Bank & Manifold' },
        { id: 2, src: '/products/fire-alarm.jpg', caption: 'Gas Release Master Control Panel & Abort Station' },
        { id: 3, src: '/services/service-fire-alarm.jpg', caption: 'Data Center Ceiling Radial Gas Discharge Nozzle' },
        { id: 4, src: '/case-studies/case-ss304-mist.jpg', caption: 'Server Room Optical Cross-Zoned Smoke Detector' },
        { id: 5, src: '/services/service-emergency-trip.jpg', caption: 'Gas Release Strobe Siren and Warning Annunciator' }
      ]
    },
    relatedSlugs: ['fire-alarm-system', 'server-room-monitoring', 'fire-hydrant-sprinkler-systems']
  },

  // 30. Wireless Intrusion Detection Systems (Surveillance & Alerts)
  'wireless-intrusion-detection': {
    id: 30,
    slug: 'wireless-intrusion-detection',
    name: 'Wireless Intrusion Detection Systems',
    category: 'Surveillance & Alerts',
    categorySlug: 'surveillance-alerts',
    categoryPage: 'security-systems',
    breadcrumbName: 'Wireless Intrusion Detection',
    tagline: 'Grade-2 multi-zone perimeter intrusion sensors, microwave beams & wireless control panels',
    badge: 'Grade-2 Intrusion Security',
    heroDescription: 'Enterprise-grade wireless and hybrid perimeter intrusion detection systems. Features multi-frequency anti-jamming RF communication, active dual-tech PIR sensors, and long-range perimeter infrared beams for commercial campuses and industrial perimeters.',
    heroImage: '/products/wireless-intrusion-detection.jpg',
    trustIndicators: [
      { text: 'EN 50131 Grade 2 Certified', icon: 'ShieldCheck' },
      { text: '2,000m Secure RF Range', icon: 'Zap' },
      { text: 'Multi-Network GSM / IP Reporting', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/products/wireless-intrusion-detection.jpg',
      badge: 'PERIMETER SECURITY',
      heading: 'Wireless Intrusion System Operation',
      description: 'See the dual-technology PIR motion detection, instant tamper alarm transmission, and centralized security control room dispatch in real time.',
      bullets: [
        'Encrypted multi-frequency RF transmission with real-time signal jamming detection',
        'Outdoor dual PIR + microwave Doppler sensors immune to small animals and wind',
        'Instant SMS, mobile app push notification, and central monitoring station (CMS) dispatch',
        'Up to 5 years battery life on ultra-low-power wireless perimeter detectors'
      ]
    },
    overview: {
      heading: 'Engineered for Rapid Campus Perimeter Protection Without Cabling',
      paragraphs: [
        'HTI Wireless Intrusion Detection Systems deliver enterprise-class physical security without the disruption and cost of long-distance trenching and cabling. Combining encrypted long-range wireless protocols with intelligent false-alarm filtration, the system protects corporate campuses, warehouses, and remote industrial depots.',
        'Featuring hybrid wired/wireless control hubs, optical perimeter beam barriers, magnetic contact sensors, and high-decibel outdoor siren strobes, it integrates with CCTV video surveillance for instant video verification upon alarm trigger.'
      ],
      highlights: [
        { label: 'Wireless Range', value: 'Up to 2,000 meters open field secure RF communication' },
        { label: 'Encryption Standard', value: 'AES-128 bit rolling-code encrypted transmission' },
        { label: 'Reporting Channels', value: 'Dual-SIM 4G LTE, Ethernet TCP/IP, and Wi-Fi' },
        { label: 'Battery Lifespan', value: '3 to 5 years standard lithium cell operation' }
      ]
    },
    benefits: [
      {
        title: 'Zero-Trenching Deployment',
        desc: 'High-security encrypted RF allows rapid installation across sprawling campuses without underground trenching.',
        iconName: 'Radio'
      },
      {
        title: 'Pet-Immune False Alarm Rejection',
        desc: 'Dual optical PIR and microwave algorithms ignore pets, swaying foliage, and weather disturbances.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Anti-Jamming Frequency Hopping',
        desc: 'Monitors wireless spectrum constantly and raises instant supervisory alert if RF jamming is attempted.',
        iconName: 'Settings'
      },
      {
        title: 'Triple Redundant Reporting',
        desc: 'Transmits alarm events simultaneously via 4G LTE, Ethernet, and cloud push notifications to guards.',
        iconName: 'Zap'
      }
    ],
    applications: [
      { title: 'Industrial Campus Perimeter Boundaries', desc: 'Active infrared multi-beam sensors protecting property fences against night intrusion.' },
      { title: 'Logistics Warehouses & Freight Depots', desc: 'Motion and beam barrier security grids for high-value cargo.' },
      { title: 'Commercial Office Towers & Banks', desc: 'Indoor volumetric PIR sensors and glass break detectors.' },
      { title: 'Solar Power Plants & Sub-Stations', desc: 'Remote unmanned perimeter intrusion alarms with cellular reporting.' }
    ],
    specs: {
      heading: 'Technical Specifications & Parameters',
      description: 'Factory-tested wireless alarm equipment specifications.',
      tableRows: [
        { label: 'System Architecture:', value: 'Hybrid 64-Zone Wireless / Wired Security Alarm Panel' },
        { label: 'Wireless Frequency:', value: '868 MHz / 433 MHz two-way frequency hopping with AES-128 encryption' },
        { label: 'Outdoor Perimeter Sensors:', value: 'Active Infrared Quad-Beam (50m to 150m boundary span)' },
        { label: 'Motion Detection:', value: 'Dual PIR + Microwave Doppler with 15m 90° volumetric coverage' },
        { label: 'Tamper Protection:', value: 'Wall and case tamper switches triggering immediate priority alert' },
        { label: 'Event Reporting Protocols:', value: 'SIA DC-09, Contact ID, Modbus TCP, REST API for central CMS' },
        { label: 'Siren & Strobe:', value: '110 dB wireless outdoor siren with high-visibility flashing red/blue LEDs' },
        { label: 'Power Supply:', value: '230V AC mains with 24-hour internal rechargeable backup battery' }
      ],
      complianceTitle: 'Standards & Statutory Certifications',
      complianceItems: [
        'EN 50131-1 Security Grade 2 / Grade 3 Intrusion and Hold-Up Alarm Systems',
        'CE & WPC (Wireless Planning & Coordination) India Telecommunications Approval',
        'ISO 9001:2015 Precision Electronics & Security Systems Assembly',
        'Direct CCTV Video Management System (VMS) Trigger Integration'
      ]
    },
    relatedImages: {
      heading: 'Installation Gallery & System Views',
      description: 'Wireless intrusion detectors and control hub deployments across facilities.',
      images: [
        { id: 1, src: '/products/wireless-intrusion-detection.jpg', caption: 'Wireless Alarm Control Keypad and Perimeter Motion Sensors' },
        { id: 2, src: '/products/surveillance-alerts-hero.jpg', caption: 'Centralized Security Operations Console Intrusion Map' },
        { id: 3, src: '/about-security-camera.jpg', caption: 'Outdoor Perimeter Wireless Microwave Sensor Beam' },
        { id: 4, src: '/services/services-heavy-security.jpg', caption: 'Perimeter Wall Active Infrared Multi-Beam Array' },
        { id: 5, src: '/case-studies/case-boom-barrier.jpg', caption: 'Vehicle Barrier Interlinked Perimeter Siren & Strobe' }
      ]
    },
    relatedSlugs: ['cctv-surveillance-system', 'server-room-monitoring', 'fault-alarm-systems']
  }
};

// Aliases for alternate slug resolutions to guarantee 100% resilient lookup
// Access Automation Aliases:
PRODUCTS_CATALOGUE['motorized-industrial-rolling-shutters'] = PRODUCTS_CATALOGUE['motorized-rolling-shutters'];
PRODUCTS_CATALOGUE['high-speed-roll-up-doors'] = PRODUCTS_CATALOGUE['pvc-rapid-roll-up-doors'];
PRODUCTS_CATALOGUE['high-speed-rollup-sectional-doors'] = PRODUCTS_CATALOGUE['pvc-rapid-roll-up-doors'];
PRODUCTS_CATALOGUE['high-speed-industrial-doors'] = PRODUCTS_CATALOGUE['pvc-rapid-roll-up-doors'];
PRODUCTS_CATALOGUE['hangar-doors'] = PRODUCTS_CATALOGUE['telescopic-cantilever-gates'];
PRODUCTS_CATALOGUE['automatic-doors'] = PRODUCTS_CATALOGUE['automatic-sliding-swing-doors'];

// Traffic & Perimeter Aliases:
PRODUCTS_CATALOGUE['optical-flap-turnstiles'] = PRODUCTS_CATALOGUE['turnstiles-flap-barriers-speed-gates'];
PRODUCTS_CATALOGUE['hydraulic-crash-bollards'] = PRODUCTS_CATALOGUE['bollards-tyre-killers-car-lifts'];
PRODUCTS_CATALOGUE['parking-visitor-management'] = PRODUCTS_CATALOGUE['visitor-management-system'];
PRODUCTS_CATALOGUE['parking-intrusion-alarms'] = PRODUCTS_CATALOGUE['visitor-management-system'];

// Pharma Cleanroom Aliases:
PRODUCTS_CATALOGUE['pharma-cleanroom-door-interlock-system'] = PRODUCTS_CATALOGUE['door-interlock-systems'];
PRODUCTS_CATALOGUE['cleanroom-door-interlock-system'] = PRODUCTS_CATALOGUE['door-interlock-systems'];
PRODUCTS_CATALOGUE['dynamic-static-pass-boxes'] = PRODUCTS_CATALOGUE['pass-box-systems'];

// Fire & Life Safety Aliases:
PRODUCTS_CATALOGUE['addressable-fire-alarm-system'] = PRODUCTS_CATALOGUE['fire-alarm-system'];
PRODUCTS_CATALOGUE['fire-rated-steel-doors'] = PRODUCTS_CATALOGUE['fire-rated-doors-shutters'];

// Surveillance & Alerts Aliases:
PRODUCTS_CATALOGUE['alarm-annunciators'] = PRODUCTS_CATALOGUE['fault-alarm-systems'];

// Helper functions
export const getProductBySlug = (slug) => {
  if (!slug) return PRODUCTS_CATALOGUE['automatic-sliding-swing-doors'];
  const clean = slug.toLowerCase().trim();
  if (PRODUCTS_CATALOGUE[clean]) return PRODUCTS_CATALOGUE[clean];

  // Try finding by slug substring or name match
  const found = Object.values(PRODUCTS_CATALOGUE).find(p =>
    p.slug === clean ||
    p.slug.includes(clean) ||
    clean.includes(p.slug) ||
    p.name.toLowerCase().includes(clean.replace(/-/g, ' '))
  );
  return found || PRODUCTS_CATALOGUE['automatic-sliding-swing-doors'];
};

export const getProductsByCategory = (categorySlug) => {
  const all = Object.values(PRODUCTS_CATALOGUE).filter((p, idx, self) =>
    self.findIndex(t => t.id === p.id) === idx
  );
  if (!categorySlug || categorySlug === 'all') return all;
  return all.filter(p => p.categorySlug === categorySlug || p.category.toLowerCase().includes(categorySlug.toLowerCase()));
};

export const getAllProducts = () => {
  return Object.values(PRODUCTS_CATALOGUE).filter((p, idx, self) =>
    self.findIndex(t => t.id === p.id) === idx
  );
};

// Backwards-compatible alias (the catalogue now holds more than 25 systems)
export const getAll25Products = getAllProducts;

// Live count so the UI never advertises a stale system total
export const TOTAL_PRODUCT_COUNT = getAllProducts().length;
