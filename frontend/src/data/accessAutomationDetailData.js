import { TRAFFIC_PERIMETER_CONFIGS } from './trafficPerimeterDetailData';

// Detailed Product Configuration Data for Access Automation Products
// Perfectly aligns with the reference design for Automatic Sliding & Swing Doors

const ACCESS_AUTOMATION_INTERNAL_CONFIGS = {
  'automatic-sliding-swing-doors': {
    slug: 'automatic-sliding-swing-doors',
    name: 'Automatic Sliding & Swing Doors',
    breadcrumbName: 'Automatic Sliding & Swing Doors',
    badges: [
      { text: 'AUTOMATION', type: 'solid-blue' },
      { text: 'Access Control', type: 'soft-blue' },
      { text: 'High Demand', type: 'soft-pink' }
    ],
    heading: 'Automatic Sliding & Swing Doors',
    heroDescription: 'Architectural-grade touchless sensor entry solutions for corporate towers, commercial buildings, hospitals, pharmaceutical facilities and more.',
    heroImage: '/products/automatic-doors.jpg',
    trustIndicators: [
      { text: 'ISO & CE Certified Quality', icon: 'ShieldCheck' },
      { text: 'Turnkey PAN-India Installation', icon: 'Wrench' },
      { text: 'OEM Warranty & Service Support', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/automatic_sliding.mp4',
      poster: '/products/automatic-doors.jpg',
      badge: 'PRODUCT VIDEO',
      heading: 'Automatic Sliding & Swing Doors Overview',
      description: 'Watch this video to see the working, key features and real installations of our automatic sliding and swing doors in commercial and industrial environments.',
      bullets: [
        'Smooth & silent operation',
        'Touchless and hygienic access',
        'Suitable for corporate, hospital and cleanroom environments',
        'Reliable and energy-efficient systems'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Our automatic sliding and swing doors are designed with advanced motion sensors, microprocessor-based controllers and high-performance drives to deliver smooth, safe and reliable operation. These systems provide touchless entry, improved accessibility and modern architectural aesthetics, making them ideal for commercial buildings, hospitals, pharma facilities, airports and industrial environments.',
      cards: [
        {
          title: 'Touchless Operation',
          desc: 'Sensor-based access for hygienic entry',
          iconName: 'Radio',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Safety Sensors',
          desc: 'Infrared sensors for safe operation',
          iconName: 'ShieldCheck',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Customizable Design',
          desc: 'Suitable for various architectural styles',
          iconName: 'Settings',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Energy Efficient',
          desc: 'Optimized for low power consumption',
          iconName: 'Leaf',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our automatic sliding and swing doors comply with international quality and safety standards, ensuring reliable performance, durability and user safety.',
      tableRows: [
        { label: 'Door Type:', value: 'Automatic Sliding Doors / Automatic Swing Doors' },
        { label: 'Opening Width:', value: '800 mm – 3000 mm (customizable)' },
        { label: 'Opening Speed:', value: 'Adjustable (0.3 – 1.0 m/s)' },
        { label: 'Power Supply:', value: 'AC 100 – 240V, 50/60 Hz' },
        { label: 'Control System:', value: 'Microprocessor-based controller' },
        { label: 'Sensors:', value: 'Microwave / Infrared motion sensors, safety sensors' },
        { label: 'Material Options:', value: 'Aluminium, Stainless Steel, Toughened Glass' },
        { label: 'Operating Temperature:', value: '-20°C to 50°C' },
        { label: 'Compliance:', value: 'ISO, CE, EN, NBC 2016 (as applicable)' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ISO Certified Quality',
        'CE Marking (as applicable)',
        'NBC 2016 Compliant (as applicable)',
        'Fire Safety & Accessibility Standards',
        'Suitable for Hospital & Pharma Environments',
        'Meets International Safety Guidelines'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our automatic sliding and swing doors.',
      images: [
        {
          id: 1,
          src: '/products/automatic-doors.jpg',
          caption: 'Automatic Sliding Door – Commercial Building'
        },
        {
          id: 2,
          src: '/products/automatic-doors-hospital.jpg',
          caption: 'Automatic Sliding Door – Hospital Application'
        },
        {
          id: 3,
          src: '/products/automatic-doors-swing.jpg',
          caption: 'Automatic Swing Door – Corporate Entrance'
        }
      ]
    }
  },

  'automatic-sliding-swing-gates': {
    slug: 'automatic-sliding-swing-gates',
    name: 'Automatic Sliding & Swing Gates',
    breadcrumbName: 'Automatic Sliding & Swing Gates',
    badges: [
      { text: 'AUTOMATION', type: 'solid-blue' },
      { text: 'Access Control', type: 'soft-blue' },
      { text: 'Heavy Duty', type: 'soft-pink' }
    ],
    heading: 'Automatic Sliding & Swing Gates',
    heroDescription: 'Rugged motorized heavy-duty perimeter security gates for factory campuses, industrial estates, logistics yards and commercial facilities.',
    heroImage: '/services/services-perimeter-gate.jpg',
    trustIndicators: [
      { text: 'ISO & CE Certified Quality', icon: 'ShieldCheck' },
      { text: 'Turnkey PAN-India Installation', icon: 'Wrench' },
      { text: 'OEM Warranty & Service Support', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/automatic_sliding_gates.mp4',
      poster: '/services/services-perimeter-gate.jpg',
      badge: 'PRODUCT VIDEO',
      heading: 'Automatic Sliding & Swing Gates Overview',
      description: 'Watch this video to see the high-torque motorized operation, obstacle detection sensors, and perimeter security performance of our industrial sliding and swing gates.',
      bullets: [
        'High-torque oil-bath gearmotor drive',
        'Anti-crush photocells & safety edge sensors',
        'Long-range RFID & access control integration',
        'Heavy galvanized steel weather-resistant finish'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Our industrial automatic sliding and swing gates are engineered from heavy-gauge structural steel sections and driven by high-torque oil-bath electromechanical motors. Designed for continuous vehicular duty cycles, they provide maximum perimeter deterrence, automated access control, and smooth soft-start / soft-stop deceleration.',
      cards: [
        {
          title: 'Motorized Operation',
          desc: 'High-torque continuous-duty industrial motor',
          iconName: 'Zap',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Access Control Integration',
          desc: 'Compatible with RFID, ANPR, and push buttons',
          iconName: 'Radio',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Heavy-Duty Construction',
          desc: 'Galvanized steel built for extreme weather',
          iconName: 'Settings',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Safety & Obstruction Detection',
          desc: 'Dual photocell beams and obstacle auto-reverse',
          iconName: 'ShieldCheck',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our automatic sliding and swing gates comply with international quality and safety standards, ensuring rugged perimeter protection, durability and user safety.',
      tableRows: [
        { label: 'Gate Type:', value: 'Automatic Sliding Gates / Heavy-Duty Swing Gates' },
        { label: 'Weight Capacity:', value: '500 kg – 3,500 kg per leaf' },
        { label: 'Traversal Speed:', value: '12 to 20 meters per minute' },
        { label: 'Power Supply:', value: 'AC 230V / 415V, 50 Hz' },
        { label: 'Motor Power:', value: '370W to 1100W heavy-duty motor options' },
        { label: 'Control System:', value: 'Microprocessor / PLC inverter drive' },
        { label: 'Sensors:', value: 'Dual infrared photocells, pneumatic safety edge' },
        { label: 'Protection Class:', value: 'IP55 / IP65 weather-sealed enclosure' },
        { label: 'Compliance:', value: 'ISO 9001, CE, NBC 2016 (as applicable)' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ISO Certified Quality',
        'CE Marking (as applicable)',
        'NBC 2016 Compliant (as applicable)',
        'Industrial Safety & Anti-Crush Standards',
        'Tested for High-Wind & Perimeter Defense',
        'Meets International Safety Guidelines'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our automatic sliding and swing gates.',
      images: [
        {
          id: 1,
          src: '/services/services-perimeter-gate.jpg',
          caption: 'Automatic Sliding Gate – Industrial Factory Entrance'
        },
        {
          id: 2,
          src: '/services/services-heavy-security.jpg',
          caption: 'Industrial Swing Gate – Commercial Facility'
        },
        {
          id: 3,
          src: '/products/boom-barriers.jpg',
          caption: 'Automated Perimeter Checkpoint – Corporate Campus'
        }
      ]
    }
  },

  'telescopic-cantilever-gates': {
    slug: 'telescopic-cantilever-gates',
    name: 'Telescopic & Cantilever Gates',
    breadcrumbName: 'Telescopic & Cantilever Gates',
    badges: [
      { text: 'AUTOMATION', type: 'solid-blue' },
      { text: 'Perimeter Defense', type: 'soft-blue' },
      { text: 'Engineered Solution', type: 'soft-pink' }
    ],
    heading: 'Telescopic & Cantilever Gates',
    heroDescription: 'Trackless and space-saving perimeter entry solutions designed for extra-wide openings, sloping driveways, and sites with restricted back-run space.',
    heroImage: '/services/services-trackless-gate.jpg',
    trustIndicators: [
      { text: 'ISO & CE Certified Quality', icon: 'ShieldCheck' },
      { text: 'Turnkey PAN-India Installation', icon: 'Wrench' },
      { text: 'OEM Warranty & Service Support', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: true,
      videoSrc: '/telescopic_cantilever_gates.mp4',
      poster: '/services/services-trackless-gate.jpg',
      badge: 'PRODUCT VIDEO',
      heading: 'Telescopic & Cantilever Gates Overview',
      description: 'Watch this video to see the synchronized multi-leaf telescopic drive and trackless cantilever gate operation across demanding industrial and commercial entrance layouts.',
      bullets: [
        'Up to 50% back-run space reduction',
        'Trackless design floats over gravel & slopes',
        'Synchronized aircraft-grade wire-rope glide',
        'Continuous industrial duty with fail-safe release'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Telescopic gates utilize overlapping leaves moving synchronously on dual wire-rope tracks, cutting required back-run parking area by up to 50%. Cantilever gates eliminate ground tracks altogether—floating over uneven, sloping, or debris-prone driveways with zero maintenance.',
      cards: [
        {
          title: 'Space-Efficient Telescopic Design',
          desc: 'Synchronous leaves reduce back-run by 50%',
          iconName: 'Layers',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Ground-Track-Free Cantilever Option',
          desc: 'Floating design eliminates track cleaning',
          iconName: 'ShieldCheck',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Heavy-Duty Steel Construction',
          desc: 'High-tensile Grade 350 structural steel',
          iconName: 'Settings',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Automated Access Control',
          desc: 'PLC-controlled inverter soft-start drive',
          iconName: 'Radio',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our telescopic and cantilever gates comply with international engineering standards, delivering continuous industrial service and superior structural stability.',
      tableRows: [
        { label: 'Gate Configuration:', value: 'Multi-Leaf Telescopic / Trackless Cantilever' },
        { label: 'Clear Opening Span:', value: 'Up to 25 meters clear span opening' },
        { label: 'Operating Speed:', value: 'Up to 15 – 25 meters/min (Variable)' },
        { label: 'Power Supply:', value: 'AC 230V / 415V, 50 Hz' },
        { label: 'Drive Mechanism:', value: 'Multi-leaf synchronized cable drive / Cantilever carriage' },
        { label: 'Structural Steel:', value: 'Grade 350 structural steel hollow sections' },
        { label: 'Controller:', value: 'PLC / Microprocessor controller with soft-start' },
        { label: 'Impact Safety:', value: 'Dual photocell curtains and pneumatic bottom safety edge' },
        { label: 'Compliance:', value: 'ISO 9001, CE, NBC 2016 (as applicable)' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ISO Certified Quality',
        'CE Marking (as applicable)',
        'NBC 2016 Compliant (as applicable)',
        'Structural Wind-Load & Cantilever Safety',
        'Tested for High-Traffic Industrial Crossings',
        'Meets International Safety Guidelines'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our telescopic and cantilever gates.',
      images: [
        {
          id: 1,
          src: '/services/services-trackless-gate.jpg',
          caption: 'Telescopic Gate – Synchronized Space-Saving Entry'
        },
        {
          id: 2,
          src: '/services/services-perimeter-gate.jpg',
          caption: 'Cantilever Sliding Gate – Industrial Facility'
        },
        {
          id: 3,
          src: '/services/service-hangar-doors.jpg',
          caption: 'Wide-Span Automated Gate – Logistics Depot'
        }
      ]
    }
  },

  'pvc-rapid-roll-up-doors': {
    slug: 'pvc-rapid-roll-up-doors',
    name: 'High-Speed PVC Rapid Roll-Up Doors',
    breadcrumbName: 'High-Speed PVC Rapid Roll-Up Doors',
    badges: [
      { text: 'AUTOMATION', type: 'solid-blue' },
      { text: 'Cleanroom & Industrial', type: 'soft-blue' },
      { text: 'Fast Acting', type: 'soft-pink' }
    ],
    heading: 'High-Speed PVC Rapid Roll-Up Doors',
    heroDescription: 'Rapid-cycling flexible curtain doors engineered for climate control, temperature isolation, cleanroom hygiene, and high-frequency forklift logistics.',
    heroImage: '/products/rapid-doors.jpg',
    trustIndicators: [
      { text: 'ISO & CE Certified Quality', icon: 'ShieldCheck' },
      { text: 'Turnkey PAN-India Installation', icon: 'Wrench' },
      { text: 'OEM Warranty & Service Support', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      videoSrc: '',
      poster: '/products/rapid-doors.jpg',
      badge: 'PRODUCT VIDEO',
      heading: 'High-Speed PVC Rapid Roll-Up Doors Overview',
      description: 'Explore the high-speed vertical roll-up action, self-repairing zipper guides, and rapid airlock environmental protection designed for cleanrooms and warehouse bays.',
      bullets: [
        'Rapid operating cycle up to 1.5 m/sec',
        'Self-repairing zipper track after accidental impact',
        '900 g/m² fire-retardant PVC with vision window',
        'Wireless safety bottom edge auto-reversal'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'PVC Rapid Roll-Up Doors operate at speeds up to 1.5 m/s to isolate conditioned air, humidity, and airborne particulates between distinct manufacturing blocks. Fitted with rust-proof frames, self-repairing zipper side guides, and transparent vision windows.',
      cards: [
        {
          title: 'High-Speed Operation',
          desc: 'Speeds up to 1.5 m/s minimize air exchange',
          iconName: 'Zap',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Flexible PVC Curtain',
          desc: '900 g/m² flame-retardant fabric with vision panel',
          iconName: 'Layers',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Safety Sensors',
          desc: 'Dual safety photo eyes and bottom contact edge',
          iconName: 'ShieldCheck',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Energy & Environmental Separation',
          desc: 'Cuts thermal loss and dust infiltration by 80%',
          iconName: 'Leaf',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our high-speed PVC rapid roll-up doors conform to international industrial and cleanroom standards, ensuring temperature integrity, hygiene and worker safety.',
      tableRows: [
        { label: 'Door Type:', value: 'High-Speed PVC Rapid Roll-Up Door' },
        { label: 'Opening Speed:', value: 'Opening up to 1.5 m/sec (Inverter controlled)' },
        { label: 'Closing Speed:', value: '0.8 m/sec (Soft deceleration)' },
        { label: 'Curtain Material:', value: '900 g/m² high-density PVC polyester (DIN 4102 B1)' },
        { label: 'Wind Load Class:', value: 'Class 2 (EN 12424) wind pressure resistance' },
        { label: 'Frame Construction:', value: 'Grade 304 Stainless Steel or Galvanized Steel' },
        { label: 'Power Supply:', value: 'AC 220V - 240V / 415V, 50/60 Hz' },
        { label: 'Safety Devices:', value: 'Dual safety photo eyes, bottom wireless contact edge' },
        { label: 'Compliance:', value: 'ISO 9001, CE, NBC 2016, DIN 4102 B1 (as applicable)' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ISO Certified Quality',
        'CE Marking (as applicable)',
        'NBC 2016 Compliant (as applicable)',
        'Cleanroom & GMP Hygiene Standards',
        'Flame Retardant (DIN 4102 B1 Certified)',
        'Meets International Safety Guidelines'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our high-speed PVC rapid roll-up doors.',
      images: [
        {
          id: 1,
          src: '/products/rapid-doors.jpg',
          caption: 'High-Speed PVC Door – Logistics Airlock'
        },
        {
          id: 2,
          src: '/services/service-high-speed-doors.jpg',
          caption: 'Rapid Roll-Up Door – Cleanroom Partition'
        },
        {
          id: 3,
          src: '/services/services-rapid-airlock.jpg',
          caption: 'Self-Repairing Rapid Door – Pharma Facility'
        }
      ]
    }
  },

  'motorized-rolling-shutters': {
    slug: 'motorized-rolling-shutters',
    name: 'Motorized Industrial Rolling Shutters',
    breadcrumbName: 'Motorized Industrial Rolling Shutters',
    badges: [
      { text: 'AUTOMATION', type: 'solid-blue' },
      { text: 'Industrial Security', type: 'soft-blue' },
      { text: 'Heavy Gauge', type: 'soft-pink' }
    ],
    heading: 'Motorized Industrial Rolling Shutters',
    heroDescription: 'High-gauge cold-rolled galvanized steel rolling shutters for heavy bay security, weather resistance, and automated factory access.',
    heroImage: '/services/services-heavy-security.jpg',
    trustIndicators: [
      { text: 'ISO & CE Certified Quality', icon: 'ShieldCheck' },
      { text: 'Turnkey PAN-India Installation', icon: 'Wrench' },
      { text: 'OEM Warranty & Service Support', icon: 'Settings' }
    ],
    video: {
      hasVideoFile: false,
      videoSrc: '',
      poster: '/services/services-heavy-security.jpg',
      badge: 'PRODUCT VIDEO',
      heading: 'Motorized Industrial Rolling Shutters Overview',
      description: 'Explore the heavy-gauge interlocking steel slats, high-torque side motor drives, and anti-drop safety braking systems designed for commercial and factory bays.',
      bullets: [
        'Heavy-gauge galvanized steel slats (0.8mm to 1.2mm)',
        'Interlocking wind locks for severe weather',
        'Anti-drop safety brake preventing drive failure',
        'Manual hand-chain override for power failure'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'Robust motorized rolling shutters crafted from interlocked cold-rolled galvanized or stainless steel slats. Provides dependable security and weather shielding for commercial shop fronts, industrial storage bays, and factory perimeters.',
      cards: [
        {
          title: 'Motorized Operation',
          desc: 'Side-mounted central or tubular motor drive',
          iconName: 'Zap',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: 'Durable Metal Construction',
          desc: 'Cold-rolled galvanized steel with wind locks',
          iconName: 'Settings',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: 'Secure Industrial Access',
          desc: 'Solid physical barrier against forced intrusion',
          iconName: 'ShieldCheck',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: 'Safety & Obstruction Protection',
          desc: 'Anti-drop safety brake and bottom rubber seal',
          iconName: 'Leaf',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & Standards',
      description: 'Our motorized industrial rolling shutters adhere to national building codes and international factory safety norms for structural integrity and fail-safe operation.',
      tableRows: [
        { label: 'Shutter Profile:', value: 'Galvanized Steel / Perforated / Polycarbonate slats' },
        { label: 'Slat Thickness:', value: '0.8 mm to 1.2 mm heavy-duty cold-rolled steel' },
        { label: 'Operating Speed:', value: '0.15 – 0.25 m/s (Standard industrial cycle)' },
        { label: 'Motor Drive:', value: 'High-torque single-phase or three-phase side motor' },
        { label: 'Emergency Override:', value: 'Manual hand chain hoist and clutch release cable' },
        { label: 'Finish Options:', value: 'Hot dip galvanized / Epoxy polyester powder coating' },
        { label: 'Power Supply:', value: 'AC 230V / 415V, 50 Hz' },
        { label: 'Guide Channels:', value: 'Deep heavy-gauge galvanized steel guide channels' },
        { label: 'Compliance:', value: 'ISO 9001, CE, NBC 2016 (as applicable)' }
      ],
      complianceTitle: 'Standards & Compliance',
      complianceItems: [
        'ISO Certified Quality',
        'CE Marking (as applicable)',
        'NBC 2016 Compliant (as applicable)',
        'Industrial Bay Physical Security Standard',
        'Anti-Drop Safety Arrestor Compliance',
        'Meets International Safety Guidelines'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Real installations and product views of our motorized industrial rolling shutters.',
      images: [
        {
          id: 1,
          src: '/services/services-heavy-security.jpg',
          caption: 'Motorized Rolling Shutter – Warehouse Bay'
        },
        {
          id: 2,
          src: '/services/service-sectional-doors.jpg',
          caption: 'Industrial Sectional Overhead Bay – Logistics Center'
        },
        {
          id: 3,
          src: '/services/services-perimeter-gate.jpg',
          caption: 'Heavy-Duty Steel Slat Gate – Factory Facility'
        }
      ]
    }
  },

  'door-interlock-systems': {
    slug: 'door-interlock-systems',
    name: 'Pharma Cleanroom Door Interlock System',
    breadcrumbName: 'Pharma Cleanroom Door Interlock System',
    categoryName: 'Products',
    categoryRoute: 'cleanroom-interlocks',
    badges: [
      { text: 'PHARMA CLEANROOM', type: 'solid-blue' },
      { text: 'DOOR INTERLOCKING', type: 'soft-blue' },
      { text: 'ACCESS CONTROL', type: 'soft-blue' }
    ],
    heading: 'Pharma Cleanroom Door Interlock System',
    heroDescription: 'Intelligent door interlocking solutions designed to control access between pharmaceutical cleanroom areas, helping maintain controlled entry sequences and supporting contamination-control procedures.',
    heroImage: '/products/cleanroom-interlocks.jpg',
    trustIndicators: [
      { text: 'Controlled Door Sequencing', icon: 'Lock' },
      { text: 'Cleanroom Integration Support', icon: 'ShieldCheck' },
      { text: 'Installation & Service Support', icon: 'Wrench' }
    ],
    hasBrochure: false,
    video: {
      isInteractiveDemo: true,
      hasVideoFile: false,
      poster: '/products/cleanroom-interlocks.jpg',
      badge: 'PRODUCT OVERVIEW',
      heading: 'Pharma Cleanroom Door Interlock System Overview',
      description: 'Explore how door interlocking can coordinate access between cleanroom zones, support controlled personnel movement, and integrate with suitable access-control and cleanroom systems.',
      bullets: [
        'Controlled door-opening sequence',
        'Door-status monitoring',
        'Integration with compatible access-control systems',
        'Configurable operation for suitable cleanroom applications'
      ]
    },
    engineering: {
      heading: 'Engineering & Technical Overview',
      description: 'The Pharma Cleanroom Door Interlock System coordinates the opening and closing permissions of connected doors according to configured interlock logic. Depending on the installation, it can support controlled movement between cleanroom zones and integration with compatible access-control and monitoring systems.',
      cards: [
        {
          title: '1. Door Sequencing',
          desc: 'Coordinates access according to the configured interlock logic.',
          iconName: 'Layers',
          circleClass: 'circle-cyan',
          iconClass: 'text-cyan-600'
        },
        {
          title: '2. Status Indication',
          desc: 'Communicates door status through supported indicators.',
          iconName: 'Radio',
          circleClass: 'circle-red',
          iconClass: 'text-red-500'
        },
        {
          title: '3. Access-Control Integration',
          desc: 'Supports compatible access-control interfaces where configured.',
          iconName: 'Cpu',
          circleClass: 'circle-blue',
          iconClass: 'text-sky-600'
        },
        {
          title: '4. Cleanroom Applications',
          desc: 'Designed for suitable pharmaceutical and controlled-environment applications.',
          iconName: 'ShieldCheck',
          circleClass: 'circle-green',
          iconClass: 'text-emerald-500'
        }
      ]
    },
    specs: {
      heading: 'Technical Specifications & System Configuration',
      description: 'Review the available system configuration and integration requirements for your cleanroom door interlocking application.',
      tableRows: [
        { label: 'System Type:', value: 'Cleanroom Door Interlocking System' },
        { label: 'Number of Interlocked Doors:', value: '2 to 12 doors (configurable per central controller)' },
        { label: 'Controller Type:', value: 'Microprocessor-based programmable logic controller' },
        { label: 'Enclosure Variants:', value: 'Flameproof (Ex-d Group IIA, IIB) / Stainless Steel SS304 Flush Mount' },
        { label: 'Locking Interface:', value: 'Electromagnetic Lock (600 / 1200 lbs EM-Lock) with status output' },
        { label: 'Door-Status Inputs:', value: 'Magnetic door position contacts & push-button / sensor inputs' },
        { label: 'Access-Control Interface:', value: 'Compatible with biometric terminals, RFID card readers & touchless sensors' },
        { label: 'Status Indicators:', value: 'Dual-color LED indicators (Red / Green) & integrated audio buzzer' },
        { label: 'Power Supply:', value: '230V AC input, 12V / 24V DC regulated internal power supply' },
        { label: 'Emergency Release Configuration:', value: 'Instant auto-release on Fire Alarm (FACP) signal & emergency push-buttons' },
        { label: 'Integration Options:', value: 'BMS / SCADA relay contacts & differential pressure monitoring interface' }
      ],
      complianceTitle: 'System Integration & Application',
      complianceItems: [
        'Personnel airlock applications across cleanroom classifications (ISO 5 – ISO 8)',
        'Pharmaceutical cleanroom and controlled-environment entry cascades',
        'Compatible door hardware, electromagnetic locks, and controller integration',
        'Configurable access-control interfaces and touchless credential triggers',
        'Installation, wiring, and commissioning according to site cleanroom protocols',
        'Periodic preventive maintenance and emergency fail-safe testing considerations',
        'Note: Cleanroom suitability and regulatory compliance depend on complete installation design and applicable site requirements.'
      ]
    },
    relatedImages: {
      heading: 'Related Images',
      description: 'Explore cleanroom door interlock applications, access-control components, and controlled-environment installations.',
      images: [
        {
          id: 1,
          src: '/hero-cleanroom-interlock-chamber.jpg',
          caption: 'Pharmaceutical Cleanroom Personnel Airlock'
        },
        {
          id: 2,
          src: '/products/cleanroom-interlocks.jpg',
          caption: 'Cleanroom Door Interlock and Status Indicators'
        },
        {
          id: 3,
          src: '/services/service-cleanroom.jpg',
          caption: 'Stainless-Steel Cleanroom Pass Box'
        },
        {
          id: 4,
          src: '/hero-cleanroom-automation.jpg',
          caption: 'Controlled-Environment Cleanroom Facility'
        }
      ]
    }
  }
};

export const ACCESS_AUTOMATION_CONFIGS = {
  ...ACCESS_AUTOMATION_INTERNAL_CONFIGS,
  ...TRAFFIC_PERIMETER_CONFIGS
};

// Aliases for alternate slug resolutions
ACCESS_AUTOMATION_CONFIGS['pharma-cleanroom-door-interlock-system'] = ACCESS_AUTOMATION_CONFIGS['door-interlock-systems'];
ACCESS_AUTOMATION_CONFIGS['cleanroom-door-interlock-system'] = ACCESS_AUTOMATION_CONFIGS['door-interlock-systems'];
