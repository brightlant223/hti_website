// Detailed Product Configuration Data for Traffic & Perimeter Products
// Perfectly aligns with the reference design established by Automatic Sliding & Swing Doors

export const TRAFFIC_PERIMETER_CONFIGS = {
  // 1. AUTOMATIC BOOM BARRIERS
  'boom-barriers': {
    slug: 'boom-barriers',
    name: 'Automatic Boom Barriers',
    categoryName: 'Traffic & Perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Automatic Boom Barriers',
    badges: [
      { text: 'TRAFFIC & PERIMETER', type: 'solid-blue' },
      { text: 'Vehicle Access Control', type: 'soft-blue' },
      { text: 'High Frequency', type: 'soft-pink' }
    ],
    heading: 'Automatic Boom Barriers',
    heroDescription: 'Continuous-duty electromechanical and hydraulic automated boom barriers engineered for high-frequency vehicle checkpoints, toll plazas, industrial factory gates, and corporate parking facilities.',
    heroImage: '/products/boom-barriers.jpg',
    trustIndicators: [
      { text: '100% Continuous Duty Cycle', icon: 'ShieldCheck' },
      { text: 'Turnkey PAN-India Installation', icon: 'Wrench' },
      { text: 'OEM Warranty & Service Support', icon: 'Settings' }
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
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Our automatic boom barriers combine high-torque brushless DC motor drives and heavy-duty planetary gearboxes to deliver millions of maintenance-free cycles. Equipped with microprocessor control units, dual-spring balancing, and auto-reverse safety logic, these barriers provide uncompromising reliability for toll gates, IT park entrances, residential communities, and industrial depots.',
      cards: [
        {
          title: 'Ultra-Fast Cycle',
          desc: '1.5s to 4s speed for high-throughput gates',
          iconName: 'Zap',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Anti-Crash Safety',
          desc: 'Inductive loop & photocell auto-reverse',
          iconName: 'ShieldCheck',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'UHF / FASTag Ready',
          desc: 'Seamless integration with RFID & ANPR',
          iconName: 'Radio',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'All-Weather IP65',
          desc: 'Corrosion-resistant UV powder-coated steel',
          iconName: 'Settings',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'HTI automatic boom barriers are manufactured to rigorous international standards, ensuring reliable 24/7 performance, weather resilience, and fail-safe vehicular security.',
      tableRows: [
        { label: 'Boom Arm Length:', value: '3 meters up to 8 meters (Straight, Telescopic, or 90° Articulated)' },
        { label: 'Operating Speed:', value: '1.5 seconds to 6.0 seconds (Microprocessor adjustable)' },
        { label: 'Duty Cycle:', value: 'Continuous 100% duty cycle (Brushless DC motor)' },
        { label: 'Cabinet Material:', value: '2.0 mm cold-rolled steel with anti-UV epoxy powder coating' },
        { label: 'Ingress Protection:', value: 'IP54 / IP65 weather-sealed enclosure' },
        { label: 'Operating Voltage:', value: 'AC 220V ± 10%, 50Hz (DC 24V motor drive)' },
        { label: 'Emergency Operation:', value: 'Manual key release clutch during power failure' },
        { label: 'Integration Protocols:', value: 'UHF Long-Range RFID, FASTag, ANPR Cameras, Loop Detectors' },
        { label: 'Operating Temperature:', value: '-20°C to +65°C ambient tolerance' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ISO 9001:2015 Certified Manufacturing',
        'CE Certified Anti-Crush Safety Compliance',
        'EN 12453 Industrial Barrier Safety Standards',
        'IP54 / IP65 Environmental Weather Resistance',
        'Compatible with FASTag Toll Specifications',
        'Fail-Safe Emergency Manual Override Mechanism'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our automatic boom barriers across commercial and industrial facilities.',
      images: [
        {
          id: 1,
          src: '/products/boom-barriers.jpg',
          caption: 'Automatic Boom Barrier – Corporate Campus Entrance'
        },
        {
          id: 2,
          src: '/services/service-boom-barrier.jpg',
          caption: 'High-Speed Articulated Barrier Arm – Basement Parking'
        },
        {
          id: 3,
          src: '/case-studies/case-boom-barrier.jpg',
          caption: 'Multi-Lane RFID Toll & Vehicle Checkpoint Array'
        }
      ]
    }
  },

  // 2. DOCK LEVELLERS & DOCK SHELTERS
  'dock-levellers-dock-shelters': {
    slug: 'dock-levellers-dock-shelters',
    name: 'Dock Levellers & Dock Shelters',
    categoryName: 'Traffic & Perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Dock Levellers & Dock Shelters',
    badges: [
      { text: 'TRAFFIC & PERIMETER', type: 'solid-blue' },
      { text: 'Logistics Loading Bay', type: 'soft-blue' },
      { text: 'Heavy Industrial', type: 'soft-pink' }
    ],
    heading: 'Dock Levellers & Dock Shelters',
    heroDescription: 'Heavy-duty electro-hydraulic dock levellers and weather-sealing dock shelters bridging the elevation gap between warehouse loading bays and transport freight trucks.',
    heroImage: '/services/services-logistics-bridge.jpg',
    trustIndicators: [
      { text: '6 to 8 Ton Dynamic Capacity', icon: 'ShieldCheck' },
      { text: 'Turnkey Structural & Civil Integration', icon: 'Wrench' },
      { text: 'EN 1398 European Safety Compliance', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Dock%20Levellers%20&%20Dock%20Shelters.mp4',
      poster: '/services/services-logistics-bridge.jpg',
      badge: 'PRODUCT SHOWCASE',
      heading: 'Dock Leveller & Logistics Bay Engineering',
      description: 'Watch the electro-hydraulic loading bay system bridge variances in truck heights while tear-resistant dock shelters prevent energy loss, rain, and dust infiltration.',
      bullets: [
        'High dynamic load rating for continuous forklift traffic',
        'Hydraulic swing-lip or telescopic lip with smooth chamfered transition',
        'Full-range side telescopic toe guards for operator safety',
        'Heavy-duty tear-resistant PVC dock shelter enclosure with guide stripes'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Our electro-hydraulic dock levellers are built from high-tensile tear-drop chequered steel plate and powered by dual hydraulic lift cylinders with velocity emergency shutoff valves. Paired with surrounding mechanical or inflatable dock shelters, the system creates a sealed, safe corridor that speeds up warehouse loading cycles while safeguarding temperature-sensitive cargo.',
      cards: [
        {
          title: 'High Dynamic Load',
          desc: 'Up to 8,000 kg forklift loading rating',
          iconName: 'ShieldCheck',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Dual Cylinder Drive',
          desc: 'Twin hydraulic rams with velocity stop valves',
          iconName: 'Settings',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Weather Seal',
          desc: 'High-tensile PVC curtains block dust & rain',
          iconName: 'Layers',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Operator Safety',
          desc: 'Full-range side toe guards & anti-slip deck',
          iconName: 'Award',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our dock levellers and shelters conform to European loading bay regulations, guaranteeing maximum operator safety, durable construction, and smooth logistics operations.',
      tableRows: [
        { label: 'Dynamic Load Rating:', value: '6,000 kg / 8,000 kg dynamic forklift capacity' },
        { label: 'Lip Configurations:', value: '400 mm / 500 mm (Hinged swing lip or telescopic extending lip)' },
        { label: 'Platform Deck Plate:', value: 'Chequered anti-skid high-tensile steel plate (6mm / 8mm)' },
        { label: 'Hydraulic Power Unit:', value: 'Compact 1.1 kW electro-hydraulic power pack (IP54)' },
        { label: 'Dock Shelter Material:', value: '3 mm high-tensile wear-resistant PVC fabric with guide arrows' },
        { label: 'Shelter Dimensions:', value: 'Standard 3400 x 3400 mm (customizable to truck profiles)' },
        { label: 'Operating Voltage:', value: '415V AC, 3-Phase, 50Hz electrical control' },
        { label: 'Safety Systems:', value: 'Emergency hydraulic stop valve, maintenance safety strut, toe guards' },
        { label: 'Compliance:', value: 'EN 1398 European standard for dock levellers' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'EN 1398 Certified Loading Bay Standards',
        'CE Certified Hydraulic Valve Safety',
        'High-Tensile Anti-Skid Chequered Deck',
        'Dual Hydraulic Emergency Velocity Stop Valves',
        'Side Telescopic Anti-Shear Toe Guards',
        'Weatherproof Tear-Resistant Dock Shelter Seals'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our dock levellers and dock shelters in high-capacity warehouse hubs.',
      images: [
        {
          id: 1,
          src: '/services/services-logistics-bridge.jpg',
          caption: 'Hydraulic Dock Leveller & Inflatable Shelter – Warehouse Bay'
        },
        {
          id: 2,
          src: '/hero-industrial-doors-dock.jpg',
          caption: 'Heavy-Duty Logistics Bridge Installation'
        },
        {
          id: 3,
          src: '/case-studies/case-industrial-doors.jpg',
          caption: 'Automated Loading Bay Threshold with Retractable Shelter'
        }
      ]
    }
  },

  // 3. TURNSTILES & OPTICAL FLAP BARRIERS
  'turnstiles-flap-barriers-speed-gates': {
    slug: 'turnstiles-flap-barriers-speed-gates',
    name: 'Turnstiles & Optical Flap Barriers',
    categoryName: 'Traffic & Perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Turnstiles & Optical Flap Barriers',
    badges: [
      { text: 'TRAFFIC & PERIMETER', type: 'solid-blue' },
      { text: 'Pedestrian Speed Gates', type: 'soft-blue' },
      { text: 'Biometric Access', type: 'soft-pink' }
    ],
    heading: 'Turnstiles & Optical Flap Barriers',
    heroDescription: 'High-throughput architectural pedestrian speed gates, optical flap barriers, and tripod turnstiles engineered for secure, rapid pedestrian access control in corporate lobbies and transit terminals.',
    heroImage: '/hero-glass-atrium.jpg',
    trustIndicators: [
      { text: 'Up to 45 Persons / Min Flow', icon: 'ShieldCheck' },
      { text: 'SUS304 Stainless Steel Construction', icon: 'Wrench' },
      { text: 'Fire Alarm Auto-Release Integration', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Turnstiles%20&%20Flap%20Barriers.mp4',
      poster: '/hero-glass-atrium.jpg',
      badge: 'PRODUCT SHOWCASE',
      heading: 'Pedestrian Flow & Speed Gate Engineering',
      description: 'Explore the high-speed brushless DC wing drive, multi-beam infrared anti-tailgating arrays, and seamless biometric face recognition integration.',
      bullets: [
        'Rapid pedestrian throughput of 35 to 45 persons per minute per lane',
        'Multi-pair infrared sensors detect and alarm unauthorized tailgating',
        'Automatic wing retraction upon fire alarm signal for life safety evacuation',
        'Brushed SUS304 stainless steel cabinet with intuitive LED lane status displays'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Designed for prestige corporate towers, high-density IT parks, and transit terminals, our optical flap barriers and speed gates combine whisper-quiet brushless servo drives with multi-beam infrared sensor grids. The system reliably prevents tailgating, crawl-throughs, and reverse entry while supporting RFID, facial biometrics, and dynamic QR visitor credentials.',
      cards: [
        {
          title: 'Anti-Tailgating',
          desc: 'Multi-beam infrared detection prevents unauthorized entry',
          iconName: 'ShieldCheck',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'High Flow Rate',
          desc: 'Up to 45 persons per minute per lane',
          iconName: 'Zap',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Multi-Credential',
          desc: 'Face recognition, RFID, QR & fingerprint',
          iconName: 'Radio',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Emergency Safe',
          desc: 'Auto-open upon fire alarm trigger for rapid evacuation',
          iconName: 'Settings',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our turnstiles and optical speed gates conform to international life-safety, electrical, and accessibility standards for seamless pedestrian transit flow.',
      tableRows: [
        { label: 'Passage Width:', value: '550 mm standard lane / 900 mm ADA wheelchair accessible lane' },
        { label: 'Throughput Speed:', value: '35 to 45 persons per minute per lane' },
        { label: 'Cabinet Construction:', value: 'SUS304 Stainless Steel (1.5 mm – 2.0 mm thickness)' },
        { label: 'Barrier Wings:', value: 'Toughened Acrylic / Polyurethane soft impact wings' },
        { label: 'Sensor Array:', value: '6 to 12 pairs of active infrared optical detection beams' },
        { label: 'Motor Drive:', value: 'DC brushless servo motor with planetary reducer' },
        { label: 'Operating Voltage:', value: 'AC 100 – 240V, 50/60Hz (DC 24V internal power)' },
        { label: 'Directional Indicators:', value: 'Dynamic LED red cross / green arrow indicators' },
        { label: 'Emergency Evacuation:', value: 'Fail-safe automatic wing opening on power loss or fire alarm' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'CE Certified Electrical & Mechanical Safety',
        'ISO 9001:2015 Quality Management Standard',
        'ADA Compliant 900 mm Wheelchair Accessible Lane',
        'Fire Alarm System (FACP) Auto-Trip Integration',
        'IP44 / IP54 Environmental Protection',
        'Continuous 5 Million Cycle Tested Drive Mechanism'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our optical flap barriers and turnstiles in commercial towers and entry atriums.',
      images: [
        {
          id: 1,
          src: '/hero-glass-atrium.jpg',
          caption: 'Optical Flap Barriers & Speed Gates – Corporate Tower Lobby'
        },
        {
          id: 2,
          src: '/services/service-boom-barrier.jpg',
          caption: 'Integrated Biometric Turnstile & Barrier Checkpoint'
        },
        {
          id: 3,
          src: '/hero-security-command-center.jpg',
          caption: 'Access Control Integration & High-Throughput Turnstiles'
        }
      ]
    }
  },

  // 4. BOLLARDS, TYRE KILLERS & CAR LIFTS
  'bollards-tyre-killers-car-lifts': {
    slug: 'bollards-tyre-killers-car-lifts',
    name: 'Bollards, Tyre Killers & Car Lifts',
    categoryName: 'Traffic & Perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Bollards, Tyre Killers & Car Lifts',
    badges: [
      { text: 'TRAFFIC & PERIMETER', type: 'solid-blue' },
      { text: 'Anti-Ram Defense', type: 'soft-blue' },
      { text: 'Crash Rated', type: 'soft-pink' }
    ],
    heading: 'Bollards, Tyre Killers & Car Lifts',
    heroDescription: 'High-security crash-rated rising hydraulic bollards, heavy-duty spike tyre killers, and multi-tier hydraulic car parking lifts for critical facilities, embassies, and commercial developments.',
    heroImage: '/services/service-bollards-blockers.jpg',
    trustIndicators: [
      { text: 'K4 / K8 / K12 / PAS 68 Crash Tested', icon: 'ShieldCheck' },
      { text: 'Sub-Second Emergency Fast Operation (EFO)', icon: 'Zap' },
      { text: 'Turnkey Civil & Hydraulic Skid Installation', icon: 'Wrench' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/Bollards,%20Tyre%20Killers%20&%20Car%20Lifts.mp4',
      poster: '/services/service-bollards-blockers.jpg',
      badge: 'PRODUCT SHOWCASE',
      heading: 'Anti-Ram Perimeter Defense & Hydraulic Systems',
      description: 'Witness the stopping power of crash-tested hydraulic bollards, bidirectional tyre killer spikes, and multi-tier vehicle scissor lift systems.',
      bullets: [
        'Crash-rated hydraulic rising bollards halting hostile vehicular ramming',
        'Hardened alloy steel tyre spikes shredding unauthorized vehicle tires',
        'Emergency Fast Operation (EFO) deployment in under 1.5 seconds',
        'High-capacity hydraulic vehicle lifts maximizing basement parking spaces'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Engineered for high-threat government installations, embassies, corporate headquarters, and data centers, our anti-ram physical defense solutions deliver verified impact resistance. High-grade structural steel bollards and hydraulic tyre killers withstand high-speed vehicle impacts, while our multi-level car lift systems optimize vehicle storage in space-constrained basements.',
      cards: [
        {
          title: 'Crash-Rated Defense',
          desc: 'Tested to K4/K8/K12 & PAS 68 impact standards',
          iconName: 'ShieldCheck',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Rapid Deployment',
          desc: 'EFO emergency deployment in under 1.5 seconds',
          iconName: 'Zap',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Heavy Hydraulic Lift',
          desc: '3,000 kg to 5,000 kg capacity vehicle elevators',
          iconName: 'Settings',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Submersible IP68',
          desc: 'Waterproof cylinder housing with sump drainage',
          iconName: 'Award',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'All HTI bollards, road blockers, and vehicle lift platforms undergo rigorous quality assurance and engineering validation to guarantee fail-safe security and durability.',
      tableRows: [
        { label: 'Bollard Crash Rating:', value: 'K4 / K8 / K12 / PAS 68 equivalent impact ratings' },
        { label: 'Bollard Rise / Fall Time:', value: '2.5 to 3.5 seconds (under 1.5s with EFO accumulator)' },
        { label: 'Cylinder Diameter & Height:', value: '220 mm / 275 mm diameter, 600 mm to 1000 mm lift height' },
        { label: 'Tyre Killer Spike Height:', value: '150 mm high hardened alloy steel spikes (bidirectional)' },
        { label: 'Car Lift Platform Capacity:', value: '3,000 kg to 5,000 kg scissor lift platform' },
        { label: 'Hydraulic Power Unit:', value: 'Heavy-duty hydraulic power pack with manual hand pump override' },
        { label: 'Environmental Sealing:', value: 'IP68 submersible cylinder housing with built-in drainage' },
        { label: 'Warning Systems:', value: 'Integrated LED crown warning lights and yellow reflective bands' },
        { label: 'Operating Temperature:', value: '-20°C to +65°C ambient tolerance' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ASTM F2656 / PAS 68 Anti-Ram Crash Standards',
        'K4 / K8 / K12 Certified Vehicle Impact Defense',
        'IP68 Submersible Hydraulic Enclosure Rating',
        'Emergency Fast Operation (EFO) Hydraulic Accumulator',
        'Manual Hand-Pump Emergency Override for Power Cut',
        'Integrated Warning Beacon & Loop Safety Sensors'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our crash-rated bollards, tyre spike blockers, and hydraulic vehicle car lifts.',
      images: [
        {
          id: 1,
          src: '/services/service-bollards-blockers.jpg',
          caption: 'Crash-Rated Hydraulic Rising Bollards – High-Security Facility'
        },
        {
          id: 2,
          src: '/services/services-trackless-gate.jpg',
          caption: 'Hydraulic Multi-Tier Scissor Car Lift System'
        },
        {
          id: 3,
          src: '/services/services-perimeter-gate.jpg',
          caption: 'Anti-Ram Heavy-Duty Spike Tyre Killer Installation'
        }
      ]
    }
  },

  // 5. VISITOR MANAGEMENT SYSTEMS
  'visitor-management-system': {
    slug: 'visitor-management-system',
    name: 'Visitor Management Systems',
    categoryName: 'Traffic & Perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Visitor Management Systems',
    badges: [
      { text: 'TRAFFIC & PERIMETER', type: 'solid-blue' },
      { text: 'Access Control', type: 'soft-blue' },
      { text: 'Paperless Security', type: 'soft-pink' }
    ],
    heading: 'Visitor Management Systems',
    heroDescription: 'Touchless digital visitor screening, QR badge printing kiosks, host notification software, and direct optical turnstile synchronization for corporate and industrial campuses.',
    heroImage: '/hero-security-command-center.jpg',
    trustIndicators: [
      { text: 'Touchless QR Code & Facial Screening', icon: 'ShieldCheck' },
      { text: 'Instant SMS & WhatsApp Host Alerts', icon: 'Radio' },
      { text: 'Direct Turnstile & Flap Barrier Sync', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/hero-security-command-center.jpg',
      badge: 'PRODUCT SHOWCASE',
      heading: 'Digital Visitor Registration & Access Flow',
      description: 'See how digital visitor management replaces paper logbooks with touchless registration, thermal QR badge printing, host alerts, and single-trip barrier access.',
      bullets: [
        'Self-service tablet kiosks or guard consoles for rapid registration',
        'Instant thermal visitor badge printing with photo and dynamic QR access',
        'Automated SMS, email, and WhatsApp notifications to the host',
        'Single-trip QR integration with optical turnstiles and speed gates'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Our modern digital visitor management platform replaces outdated paper guestbooks with an automated, secure audit trail. It empowers guests to self-register via touchscreen kiosks, verifies identity via optical card scanners, alerts hosts in real-time, and generates single-trip encrypted QR codes that directly operate lobby turnstiles and elevator access controllers.',
      cards: [
        {
          title: 'Paperless Check-In',
          desc: 'Self-service tablet kiosk & optical ID scan',
          iconName: 'Radio',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Instant Host Alerts',
          desc: 'SMS, WhatsApp & email host notifications',
          iconName: 'Zap',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Dynamic QR Badges',
          desc: 'Single-trip QR codes sync with turnstiles',
          iconName: 'ShieldCheck',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Live Evacuation',
          desc: 'Real-time roll-call dashboard & overstay alerts',
          iconName: 'Award',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'HTI visitor management hardware and cloud platforms adhere to strict data security, privacy, and access control integration standards.',
      tableRows: [
        { label: 'Terminal Platforms:', value: 'Android / iPad touchscreen kiosks and PC desktop guard consoles' },
        { label: 'Badge Printing:', value: 'Direct thermal high-speed barcode/QR label printer with auto-cutter' },
        { label: 'ID Verification:', value: 'National ID / Driving License OCR card scanner integration' },
        { label: 'Notification Channels:', value: 'Automated SMS, Email, and WhatsApp Business API integration' },
        { label: 'Turnstile Integration:', value: 'Wiegand / RS485 / TCP/IP relay integration for optical barriers' },
        { label: 'Cloud Reporting:', value: 'Live real-time dashboard, CSV analytics export, and overstay alerts' },
        { label: 'Emergency Features:', value: 'One-click roll-call evacuation list for fire and emergency drills' },
        { label: 'Data Security:', value: 'Encrypted database with role-based access control and GDPR compliance' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ISO 27001 Certified Data Security Architecture',
        'GDPR / Statutory Privacy Data Protection',
        'Real-Time Emergency Fire Evacuation Roll-Call',
        'Seamless Wiegand & TCP/IP Access Gate Relay',
        'Audit Trail Logging for Statutory Vendor Compliance',
        'Automated Host Notification Delivery via WhatsApp & SMS'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our visitor management consoles, badge printers, and integrated turnstiles.',
      images: [
        {
          id: 1,
          src: '/hero-security-command-center.jpg',
          caption: 'Digital Visitor Management Console & QR Badge Verification'
        },
        {
          id: 2,
          src: '/hero-glass-atrium.jpg',
          caption: 'Turnstile-Synchronized Single-Trip QR Visitor Access'
        },
        {
          id: 3,
          src: '/about-glance-building.jpg',
          caption: 'Corporate Reception Self-Service Visitor Check-in Kiosk'
        }
      ]
    }
  },

  // 6. PARKING & INTRUSION ALARM SYSTEMS
  'parking-intrusion-alarms': {
    slug: 'parking-intrusion-alarms',
    name: 'Parking & Intrusion Alarm Systems',
    categoryName: 'Traffic & Perimeter',
    categoryPage: 'perimeter-defense',
    breadcrumbName: 'Parking & Intrusion Alarm Systems',
    badges: [
      { text: 'TRAFFIC & PERIMETER', type: 'solid-blue' },
      { text: 'Parking & Boundary Security', type: 'soft-blue' },
      { text: 'Intrusion Detection', type: 'soft-pink' }
    ],
    heading: 'Parking & Intrusion Alarm Systems',
    heroDescription: 'Active infrared perimeter beam detectors, microwave motion sensors, and ultrasonic parking guidance networks optimizing vehicle space allocation and defending facility boundaries.',
    heroImage: '/services/services-hero-access.jpg',
    trustIndicators: [
      { text: 'Active Multi-Beam Boundary Detection', icon: 'ShieldCheck' },
      { text: 'Ultrasonic Bay Occupancy LED Guidance', icon: 'Settings' },
      { text: 'Central GSM & Siren Multi-Zone Alerts', icon: 'Radio' }
    ],
    video: {
      hasVideoFile: false,
      poster: '/services/services-hero-access.jpg',
      badge: 'PRODUCT SHOWCASE',
      heading: 'Perimeter Intrusion Detection & Parking Guidance',
      description: 'Discover how multi-beam perimeter sensors detect boundary breaches while ultrasonic sensors guide drivers quickly to vacant parking spots with live LED displays.',
      bullets: [
        'Active infrared perimeter beams with multi-channel anti-cross-talk',
        'Dual-tech PIR and microwave motion sensors immune to pet false alarms',
        'Ultrasonic bay occupancy sensors with overhead red/green LED indicators',
        'Central alarm panel with multi-zone annunciator, GSM dialer & siren strobe'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Our integrated boundary defense and parking management architecture delivers two vital facility capabilities: high-sensitivity boundary breach detection along fences and walls, and automated vehicle space allocation in multi-tier basements. Ultrasonic occupancy sensors route drivers directly to open bays, while synchronized perimeter beams trigger instant sirens and security command notifications upon unauthorized crossing.',
      cards: [
        {
          title: 'Perimeter Beams',
          desc: 'Dual & quad active IR beams with anti-cross-talk',
          iconName: 'Radio',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Bay Guidance',
          desc: 'Ultrasonic overhead sensors with red/green LEDs',
          iconName: 'Settings',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Instant Alerting',
          desc: 'High-decibel 115 dB siren & automated GSM alerts',
          iconName: 'Zap',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Central VMS Sync',
          desc: 'Direct integration with security VMS & barriers',
          iconName: 'ShieldCheck',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'HTI perimeter intrusion detection and ultrasonic parking guidance systems conform to international security and industrial instrumentation standards.',
      tableRows: [
        { label: 'Perimeter Beam Range:', value: '30m, 60m, 100m, and 200m dual/quad perimeter beam options' },
        { label: 'Detection Technology:', value: 'Active Infrared Beam Interruption / Dual PIR + Microwave Doppler' },
        { label: 'Parking Sensor Type:', value: 'Ultrasonic high-accuracy transceiver with overhead dual-color LED' },
        { label: 'Alarm Control Zones:', value: '8 to 64 hardwired and wireless supervised security zones' },
        { label: 'Alert Signaling:', value: 'High-decibel outdoor siren (115 dB), GSM SMS auto-dialer, Central CMS' },
        { label: 'Operating Voltage:', value: 'AC 220V auxiliary supply with integrated 12V DC battery backup' },
        { label: 'Enclosure Rating:', value: 'IP65 weatherproof UV-resistant ABS outdoor beam housings' },
        { label: 'Operating Temperature:', value: '-20°C to +60°C ambient tolerance' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'CE Certified Intrusion Detection Compliance',
        'IP65 Weatherproof Outdoor Environmental Rating',
        'Multi-Zone Supervised Security Monitoring',
        'Automatic GSM Dialer with SMS & Voice Telephony',
        'Energy-Efficient Low-Voltage Ultrasonic Sensors',
        'Fail-Safe Battery Backup Continuity During Grid Outage'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our parking guidance sensors and perimeter intrusion detection beams.',
      images: [
        {
          id: 1,
          src: '/services/services-hero-access.jpg',
          caption: 'Automated Parking Management & FASTag Toll Guidance'
        },
        {
          id: 2,
          src: '/products/boom-barriers.jpg',
          caption: 'Ultrasonic Bay Occupancy Sensors & Barrier Integration'
        },
        {
          id: 3,
          src: '/case-studies/case-boom-barrier.jpg',
          caption: 'Multi-Zone Perimeter Intrusion Detection & Alarm Annunciator'
        }
      ]
    }
  }
};
