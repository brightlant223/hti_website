/**
 * Comprehensive Product Page Data for:
 * 1. Perimeter Gate
 * 2. Trackless Gate
 * 3. Rapid Airlock
 * 4. Logistics Bridge
 * 5. Heavy Security
 * 
 * Modeled on the exact architecture and layout of the Touchless Entry Page.
 */

export const INDUSTRIAL_ACCESS_PAGES = {
  // =========================================================================
  // 1. PERIMETER GATE
  // =========================================================================
  'perimeter-gate': {
    slug: 'perimeter-gate',
    categoryName: 'Industrial Access Automation',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'automation' },
      { label: 'Industrial Access Automation', page: 'automation' },
      { label: 'Perimeter Gate Solutions', isCurrent: true }
    ],
    badge: 'HEAVY SECURITY | PERIMETER DEFENSE | AUTOMATION',
    titleLine1: 'Perimeter Gate',
    titleLine2Accent: 'Solutions',
    tagline: 'Robust. Motorized. Secure. Uncompromising.',
    description: 'Protect your enterprise borders with high-throughput automatic sliding and heavy cantilever swing gates. Engineered for continuous industrial duty, vehicular access control, and maximum physical site defense.',
    metrics: [
      { label: 'Up to 3000 kg Gate Rating', icon: 'ShieldCheck' },
      { label: '0.2 – 0.5 m/s Variable Speed', icon: 'Zap' },
      { label: '100% Duty Cycle Inverter', icon: 'Award' },
      { label: 'Anti-Crush Obstacle Radar', icon: 'Sparkles' }
    ],
    heroImage: '/services/services-perimeter-gate.jpg',
    heroStatusBadge: 'Perimeter Radar Guard Active',
    benefits: [
      {
        title: 'High-Impact Perimeter Defense',
        desc: 'Reinforced tubular steel construction with anti-lift geometry.',
        icon: 'Shield'
      },
      {
        title: 'Intelligent Safety Beams',
        desc: 'Active optical photocells prevent gate closure on crossing vehicles.',
        icon: 'ShieldCheck'
      },
      {
        title: 'FASTag & ANPR Integration',
        desc: 'Hands-free vehicular passage via long-range RFID and camera readers.',
        icon: 'User'
      },
      {
        title: 'Heavy Oil-Bath Gear Motor',
        desc: '24/7 continuous duty cycle rated for industrial plant entrances.',
        icon: 'Zap'
      },
      {
        title: 'Architectural Finish',
        desc: 'Hot-dip galvanized & UV powder-coated for 25+ years rust resistance.',
        icon: 'Sparkles'
      }
    ],
    showcase: {
      videoSrc: '/automatic_sliding_gates.mp4',
      poster: '/services/services-perimeter-gate.jpg',
      eyebrow: 'OPERATIONAL SHOWCASE',
      heading: 'Perimeter Gate in Action',
      description: 'Observe our heavy-duty automated sliding and cantilever gates operating silently and securely across commercial factory perimeters.',
      features: [
        'High-torque oil-bath gear drive with soft start & soft stop',
        'Dual active infrared safety photocell curtains',
        'Automatic mechanical lock with manual key override',
        'Engineered for 500+ daily heavy vehicle access movements'
      ]
    },
    productsTitle: 'Our Perimeter Gate Products',
    products: [
      {
        title: 'Automatic Cantilever Sliding Gate',
        badge: 'Cantilever | Trackless',
        image: '/services/services-perimeter-gate.jpg',
        chips: ['No Ground Track', 'Heavy Duty', '3000 kg Rating'],
        desc: 'Heavy cantilever gate suspended above the driveway, eliminating debris jam issues and ground rail excavation.',
        bullets: [
          'Counterbalanced carriage with precision sealed bearings',
          'Span capacity up to 18 meters single-leaf',
          'Self-locking electromechanical gear motor with clutch release'
        ]
      },
      {
        title: 'Tracked Industrial Sliding Gate',
        badge: 'Tracked | Ultra Wide',
        image: '/services/services-trackless-gate.jpg',
        chips: ['V-Groove Track', 'Dual Motors', 'High Wind Load'],
        desc: 'Heavy-duty bottom-roller sliding gate on high-tensile steel rail for wide logistics yards and cargo checkpoints.',
        bullets: [
          'High load-bearing machined steel rollers with grease nipples',
          'Integrated optical safety edges with wireless transmitter',
          'Supports gate lengths up to 25 meters with bi-parting option'
        ]
      },
      {
        title: 'Motorized Heavy-Duty Swing Gate',
        badge: 'Swing | Electro-Hydraulic',
        image: '/services/services-hero-access.jpg',
        chips: ['Hydraulic Ram', 'Anti-Crush Valve', 'Single/Double'],
        desc: 'Underground or surface-mounted hydraulic ram arms opening heavy architectural steel gates smoothly up to 110 degrees.',
        bullets: [
          'Heavy hydraulic locking valves hold gate rigid against ramming',
          'Emergency manual key release in case of power failure',
          'Built-in pedestrian pass-through opening mode'
        ]
      },
      {
        title: 'High-Speed Bi-Folding Speed Gate',
        badge: 'Bi-Fold | 0.8 m/s Fast',
        image: '/case-studies/case-boom-barrier.jpg',
        chips: ['Trackless Bi-Fold', 'Fast Cycles', 'Anti-Tailgating'],
        desc: 'Ultra-fast trackless bi-folding gates that open and close in 3–5 seconds, preventing vehicle tailgating at security checkpoints.',
        bullets: [
          'Fast opening speed of 0.8–1.0 m/s for high-security entries',
          'Minimal perimeter swing clearance required',
          'Integrated warning strobe light and traffic light signals'
        ]
      }
    ],
    technologies: {
      eyebrow: 'HEAVY AUTOMATION & DRIVES',
      title: 'Precision Motor Drives & Perimeter Safety Technologies',
      subtitle: 'Industrial three-phase oil-bath motors, variable frequency drives (VFD), and triple-layer perimeter safety sensors.',
      tabs: [
        {
          id: 'vfd-drive',
          name: 'VFD Inverter Drive & Oil-Bath Motor',
          badge: 'High-Torque Powertrain',
          icon: 'Settings',
          range: '1000 kg – 3500 kg Gate Weight',
          speed: 'Soft-Start / Soft-Stop VFD Ramp',
          summary: 'Continuous 100% duty cycle oil-bath gearbox with integrated electronic brake for non-stop logistics vehicle operations.',
          highlights: [
            'Dynamic acceleration and deceleration ramps eliminate mechanical gate shock',
            'Heavy cast-iron helical gears immersed in synthetic cooling oil',
            'Torque-limiting optical sensor prevents motor burn-out on obstructions'
          ]
        },
        {
          id: 'safety-beams',
          name: 'Dual Active IR Photocells & Radar',
          badge: 'Obstacle Detection',
          icon: 'ShieldCheck',
          range: '15 m – 30 m Optical Beam Distance',
          speed: '< 20 ms Auto-Reversal Trigger',
          summary: 'Infrared photocell transmitter/receiver pairs across the vehicular driveway instantly command the gate to halt and reverse.',
          highlights: [
            'Monitored dual-height beams detect high-chassis trailers as well as low sports cars',
            'Weatherproof IP67 aluminum cast housing resistant to driving rain and sun glare',
            'Wireless safety edge bumper strip sends millisecond halt signal on contact'
          ]
        },
        {
          id: 'fastag-rfid',
          name: 'FASTag RFID & ANPR Camera Integration',
          badge: 'Automated Access Control',
          icon: 'Radio',
          range: '6 m – 12 m Long Range Reader',
          speed: '0.2s Automated Vehicle Validation',
          summary: 'Automatic vehicle identification via UHF long-range windshield tags or optical number plate recognition (ANPR).',
          highlights: [
            'Direct interface with corporate security databases and ERP gate pass systems',
            'Hands-free entry keeps security lanes moving without vehicular queues',
            'Time-stamped audit logs with snapshot capture for all entering vehicles'
          ]
        },
        {
          id: 'failsafe-manual',
          name: 'Fail-Safe Battery Backup & Manual Clutch',
          badge: 'Emergency Continuity',
          icon: 'Zap',
          range: '24V DC / 48V DC Emergency Backup',
          speed: 'Instantaneous Auto-Switchover',
          summary: 'High-capacity battery backup kit maintains 50+ emergency cycles during power blackouts, paired with mechanical key clutch release.',
          highlights: [
            'Ergonomic key-lock clutch releases gate for effortless hand pushing (< 40 N force)',
            'Automatic fire alarm interface opens gates immediately during facility evacuation',
            'Internal heating elements available for cold weather temperature drops down to -25°C'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Vehicle Approach & Detection',
        desc: 'Long-range RFID or loop detector senses car',
        detail: 'Underground magnetic induction loop detects vehicle presence and awakens long-range FASTag reader.'
      },
      {
        step: 2,
        title: 'Security Validation',
        desc: 'Controller authenticates vehicle credential',
        detail: 'Access controller verifies vehicle authorization and checks photocell safety curtains are clear of obstruction.'
      },
      {
        step: 3,
        title: 'Motorized Gate Opening',
        desc: 'VFD motor glides gate open smoothly',
        detail: 'Oil-bath gear motor accelerates smoothly via soft-start ramp to 0.4 m/s while warning beacon flashes.'
      },
      {
        step: 4,
        title: 'Safety Auto-Close',
        desc: 'Gate closes after vehicle clears beam',
        detail: 'Once the rear safety loop confirms vehicle clearance, gate decelerates into soft-stop mechanical latch.'
      }
    ],
    applications: [
      { title: 'Industrial Manufacturing Plants', image: '/services/services-perimeter-gate.jpg' },
      { title: 'Logistics & Cargo Hubs', image: '/services/services-trackless-gate.jpg' },
      { title: 'Commercial Tech Parks', image: '/hero-glass-atrium.jpg' },
      { title: 'Defense & Military Bases', image: '/services/service-bollards-blockers.jpg' },
      { title: 'Ports & Container Depots', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Corporate Headquarters', image: '/head-office-building.jpg' }
    ],
    specs: [
      { label: 'Gate Configuration', value: 'Single Cantilever, Tracked Sliding, or Bi-Parting Swing' },
      { label: 'Leaf Weight Capacity', value: 'Up to 3,500 kg per gate leaf' },
      { label: 'Opening / Closing Speed', value: '0.20 – 0.50 m/sec (VFD programmable)' },
      { label: 'Clear Driveway Opening', value: 'Up to 25 meters (Single Leaf) / 40m (Bi-Parting)' },
      { label: 'Operating Power Supply', value: '230V AC Single Phase / 415V AC 3-Phase, 50Hz' },
      { label: 'Motor Gearbox Type', value: 'Heavy helical gear in permanent synthetic oil bath' },
      { label: 'Safety Obstacle Detection', value: 'Dual active infrared photocell beams & safety rubber edge' },
      { label: 'Operating Temperature', value: '-20°C to +60°C (IP55/IP67 rated enclosure)' }
    ],
    certs: [
      { name: 'EN 12453 – Safety in Use of Power Operated Gates', sub: 'European standard for motorized gate impact force & obstacle protection' },
      { name: 'EN 12604 – Mechanical Safety Requirements', sub: 'Certified structural durability, fall-arrest bracket, and wind load resistance' },
      { name: 'CE Machinery Directive Conformity', sub: 'Complies with 2006/42/EC electrical and electro-mechanical safety standards' },
      { name: 'ISO 9001:2015 – Quality Management System', sub: 'Standardized precision fabrication, weld inspection, and motor bench testing' },
      { name: 'RoHS – Environmental Compliance', sub: 'Lead-free controller electronics and eco-safe synthetic lubricants' }
    ],
    gallery: [
      { title: 'Commercial Campus Gate', image: '/services/services-perimeter-gate.jpg', category: 'Commercial & IT Hub', desc: 'Heavy cantilever gate with FASTag tolling integration' },
      { title: 'Industrial Factory Entrance', image: '/services/services-trackless-gate.jpg', category: 'Industrial Access', desc: 'Motorized high-span sliding gate with warning beacon' },
      { title: 'Logistics Facility Checkpoint', image: '/services/services-hero-access.jpg', category: 'Logistics Hub', desc: 'Continuous duty perimeter security gate with dual photocells' },
      { title: 'Pharma Manufacturing Perimeter', image: '/case-studies/case-boom-barrier.jpg', category: 'Pharmaceutical', desc: 'Architectural stainless steel automated entrance barrier' },
      { title: 'High-Security Anti-Ram Gate', image: '/services/service-bollards-blockers.jpg', category: 'Perimeter Defense', desc: 'Crash-rated motorized gate integrated with tyre killers' },
      { title: 'Corporate Headquarters Gate', image: '/head-office-building.jpg', category: 'Corporate Architecture', desc: 'Sleek motorized sliding gate with integrated biometric boom' }
    ],
    faqs: [
      {
        q: 'What is the main difference between Cantilever and Tracked Sliding Gates?',
        a: 'A tracked gate rolls on a steel rail embedded in the ground across the driveway. A cantilever gate is suspended in mid-air over the opening, supported by an extended counterbalance tail and heavy roller carriages at the side. Cantilever gates require zero ground track, preventing issues with gravel, mud, or heavy truck wear.'
      },
      {
        q: 'How does the gate open during a total mains power blackout?',
        a: 'Every HTI perimeter gate automation kit includes a key-operated mechanical clutch release that allows the heaviest gate to be effortlessly pushed open by hand. Optional 24V DC auxiliary battery backup packs automatically provide 50+ full motorized open/close cycles during power failure.'
      },
      {
        q: 'Can the gate integrate with existing security access systems like FASTag and RFID?',
        a: 'Yes. HTI gate controllers offer standard dry contact, Wiegand, and RS485 interfaces that connect directly to FASTag toll readers, long-range RFID, biometric fingerprint scanners, ANPR camera triggers, and central building management systems (BMS).'
      },
      {
        q: 'What safety systems prevent the gate from hitting a vehicle or person?',
        a: 'We implement triple-redundancy safety: 1) Active infrared photocell beams that halt the gate if an object crosses the path, 2) Pressure-sensitive rubber safety edges that reverse movement on physical contact, and 3) Electronic obstacle current sensing built into the motor inverter.'
      },
      {
        q: 'What is the maximum span width available for industrial gates?',
        a: 'Single-leaf cantilever gates can clear openings up to 18 meters. Bi-parting cantilever gates can clear up to 30 meters. Bottom-tracked sliding gates can clear openings of up to 25 meters (single leaf) and up to 40+ meters (bi-parting).'
      }
    ],
    cta: {
      tag: 'TURNKEY PERIMETER AUTOMATION',
      title: 'Fortify Your Perimeter with HTI Motorized Gates',
      desc: 'Get full turnkey site consultation, structural CAD foundation drawings, custom fabrication, and certified installation across India.'
    }
  },

  // =========================================================================
  // 2. TRACKLESS GATE
  // =========================================================================
  'trackless-gate': {
    slug: 'trackless-gate',
    categoryName: 'Industrial Access Automation',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'automation' },
      { label: 'Industrial Access Automation', page: 'automation' },
      { label: 'Trackless & Telescopic Gates', isCurrent: true }
    ],
    badge: 'ZERO GROUND TRACK | TELESCOPIC | CANTILEVER',
    titleLine1: 'Trackless Gate',
    titleLine2Accent: 'Systems',
    tagline: 'Zero Ground Track. Space-Saving Telescopic Design.',
    description: 'Engineered for sites where digging a ground track is impossible. Our trackless cantilever and multi-leaf telescopic gates glide effortlessly over uneven ground, slopes, and heavy industrial vehicle paths without ground rails.',
    metrics: [
      { label: 'Zero Ground Track Needed', icon: 'Sparkles' },
      { label: '50% Reduced Parking Space', icon: 'SlidersHorizontal' },
      { label: 'Up to 30 m Driveway Span', icon: 'ShieldCheck' },
      { label: 'Smooth Multi-Leaf Sync Drive', icon: 'Zap' }
    ],
    heroImage: '/services/services-trackless-gate.jpg',
    heroStatusBadge: 'Telescopic Sync Drive Active',
    benefits: [
      {
        title: 'Zero Ground Rail Required',
        desc: 'Overhang cantilever engineering leaves the roadway 100% clean and clear.',
        icon: 'Sparkles'
      },
      {
        title: 'Telescopic Space Conservation',
        desc: '2 or 3 leaves stack together, reducing required side run-back clearance by up to 60%.',
        icon: 'SlidersHorizontal'
      },
      {
        title: 'All-Terrain & Slope Resilient',
        desc: 'Operates over uneven paving, railway crossings, and drainage ditches without binding.',
        icon: 'Layers'
      },
      {
        title: 'Synchronized Cable Drive',
        desc: 'Continuous wire rope & pulley synchronization moves all leaves simultaneously.',
        icon: 'Zap'
      },
      {
        title: 'Heavy Vehicle Friendly',
        desc: 'No ground track to get bent, warped, or damaged by 40-tonne container trucks.',
        icon: 'Truck'
      }
    ],
    showcase: {
      videoSrc: '/telescopic_cantilever_gates.mp4',
      poster: '/services/services-trackless-gate.jpg',
      eyebrow: 'TELESCOPIC DEMONSTRATION',
      heading: 'Trackless & Telescopic Gate in Action',
      description: 'See how multiple interlocking gate leaves glide open in synchronous motion, opening double the driveway width in half the runback space.',
      features: [
        'High-strength aircraft-grade stainless steel internal sync cables',
        'Heavy-duty internal trackless cantilever roller carriage',
        'Dual speed synchronous leaf acceleration',
        'Tested for 1,500,000 continuous opening cycles'
      ]
    },
    productsTitle: 'Our Trackless & Telescopic Products',
    products: [
      {
        title: 'Trackless Cantilever Sliding Gate',
        badge: 'Cantilever | Zero Ground Track',
        image: '/services/services-trackless-gate.jpg',
        chips: ['Overhang Design', 'No Floor Rail', 'Clean Ground'],
        desc: 'Heavy structural gate suspended over the entrance using heavy-duty internal carriage wheels mounted on a solid side concrete foundation.',
        bullets: [
          'No ground excavation across the vehicular driveway',
          'Immune to dirt, ice, gravel, and heavy vehicle axle loading',
          'Spans up to 16 meters single leaf and 30 meters double leaf'
        ]
      },
      {
        title: '2-Leaf Telescopic Sliding Gate',
        badge: 'Telescopic | 50% Space Saving',
        image: '/services/services-perimeter-gate.jpg',
        chips: ['Synchronized Drive', 'Half Runback', 'High Speed'],
        desc: 'Two synchronized panels where the master leaf drives the secondary leaf at 2x speed, drastically shortening required side clearance.',
        bullets: [
          'Requires only half the runback clearance of standard sliding gates',
          'Opens in half the time compared to single-panel gates',
          'Heavy mechanical tensioning pulleys with safety lock'
        ]
      },
      {
        title: '3-Leaf Telescopic Gate (Ultra-Compact)',
        badge: '3-Leaf | 66% Space Saving',
        image: '/hero-industrial-doors-dock.jpg',
        chips: ['Triple Leaf', 'Max Driveway Opening', 'Heavy Industry'],
        desc: 'Triple-stage telescoping gate engineered for tight industrial properties with short boundary walls and wide driveway entrances.',
        bullets: [
          'Maximizes entrance opening width with minimal side space',
          'Precision cable cascade with zero backlash',
          'Smooth soft-start and soft-stop motor integration'
        ]
      },
      {
        title: 'Trackless Bi-Folding Speed Gate',
        badge: 'Bi-Fold | Instant Barrier',
        image: '/case-studies/case-boom-barrier.jpg',
        chips: ['Trackless Hinges', '3-Sec Open', 'High Security'],
        desc: 'Trackless folding security gates combining the speed of a boom barrier with the full physical defense of a high perimeter gate.',
        bullets: [
          'Lightning-fast 3 to 4 second opening cycle',
          'No ground track or overhead guide tracks needed',
          'Integrated fail-safe anti-crush safety edge'
        ]
      }
    ],
    technologies: {
      eyebrow: 'TELESCOPIC DRIVE ARCHITECTURE',
      title: 'Precision Synchronization & Cantilever Mechanics',
      subtitle: 'Counterbalanced cantilever engineering, heavy-duty sealed roller carriages, and aerospace cable linkages.',
      tabs: [
        {
          id: 'telescopic-cable',
          name: 'Multi-Leaf Synchronized Cable Linkage',
          badge: 'Mechanical Synchronizer',
          icon: 'SlidersHorizontal',
          range: '2-Leaf or 3-Leaf Telescopic Array',
          speed: '2x / 3x Progressive Leaf Speed',
          summary: 'High-tensile stainless steel aircraft cables and sealed bearing pulleys synchronize leaf movement, allowing all panels to reach full open together.',
          highlights: [
            'Zero electrical wiring required on secondary leaves—100% mechanical linkage',
            'Heavy-gauge galvanized tensioning brackets with fine-tune cable adjustment',
            'Internal cable routing protects mechanisms from dust, weather, and tampering'
          ]
        },
        {
          id: 'cantilever-carriage',
          name: 'Heavy Cantilever Track & 8-Roller Carriages',
          badge: 'Suspension Engineering',
          icon: 'Settings',
          range: 'Up to 2,500 kg Overhang Rating',
          speed: 'Silent Internal Bearing Rollers',
          summary: 'Enclosed heavy galvanized monorail track gliding on dual 8-roller precision steel carriages mounted securely to the side foundation pad.',
          highlights: [
            'Internal roller design protects moving parts completely from rain, dust, and gravel',
            'Machined high-grade carbon steel wheels with permanently lubricated bearings',
            'End-stop docking cup with guide wheels relieves carriage load when fully closed'
          ]
        },
        {
          id: 'smart-vfd',
          name: 'Smart VFD Inverter Motor Controller',
          badge: 'Smooth Motion Control',
          icon: 'Zap',
          range: '230V / 415V Inverter Power',
          speed: '0.15 m/s – 0.45 m/s Adjustable',
          summary: 'Variable frequency inverter drive provides precise acceleration curves, eliminating jerky stops and mechanical stress on the gates.',
          highlights: [
            'Electronic anti-pinch obstacle detection instantly halts movement on resistance',
            'Pedestrian passage partial opening mode for foot traffic',
            'Seamless interface with FASTag, RFID, push buttons, and remote transmitters'
          ]
        },
        {
          id: 'anti-drop',
          name: 'Fall-Arrest & Anti-Derailment Safety',
          badge: 'Safety Compliance',
          icon: 'ShieldCheck',
          range: 'Certified 3x Safety Factor',
          speed: 'Instant Mechanical Interlock',
          summary: 'Heavy structural side guide portals prevent gate tilting or derailment even in the highest coastal windstorm conditions.',
          highlights: [
            'Heavy dual guide-roller portal holds top beam securely against wind loading',
            'Internal mechanical stops prevent gate leaves from overrunning carriage limits',
            'Meets stringent European EN 12604 mechanical safety regulations'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Sensor Authorization',
        desc: 'Loop detector or RFID activates gate motor',
        detail: 'Access control authorizes entry and energizes the primary motor controller.'
      },
      {
        step: 2,
        title: 'Master Leaf Movement',
        desc: 'Primary leaf begins smooth VFD acceleration',
        detail: 'Motor drives the primary panel via steel rack & pinion at a controlled acceleration curve.'
      },
      {
        step: 3,
        title: 'Synchronized Leaf Glide',
        desc: 'Cables pull secondary leaves simultaneously',
        detail: 'Synchronized internal steel cable loop propels secondary panels at progressive speed.'
      },
      {
        step: 4,
        title: 'Full Retraction & Lock',
        desc: 'Leaves nest compactly into side runback',
        detail: 'Panels nest flush behind the wall, leaving the entire driveway 100% open and clear.'
      }
    ],
    applications: [
      { title: 'Properties with Short Side Walls', image: '/services/services-trackless-gate.jpg' },
      { title: 'Sites with Sloped or Uneven Roads', image: '/services/services-perimeter-gate.jpg' },
      { title: 'Heavy Container Truck Bays', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Railway Crossing Entrances', image: '/services/services-hero-access.jpg' },
      { title: 'Corporate Headquarters & Tech Parks', image: '/hero-glass-atrium.jpg' },
      { title: 'High-Security Perimeter Checkpoints', image: '/head-office-building.jpg' }
    ],
    specs: [
      { label: 'Gate Mechanism', value: 'Overhung Trackless Cantilever / Multi-Leaf Telescopic' },
      { label: 'Runback Space Reduction', value: '45% to 65% reduction compared to standard sliding gate' },
      { label: 'Clear Driveway Width', value: '6 meters to 22 meters single leaf (Up to 36m double leaf)' },
      { label: 'Maximum Leaf Weight', value: 'Up to 2,500 kg total gate weight' },
      { label: 'Drive Synchronization', value: 'Internal stainless steel wire ropes & sealed bearing pulleys' },
      { label: 'Motor Powertrain', value: 'Heavy-duty 230V AC / 415V 3-Phase oil-bath gear motor' },
      { label: 'Safety Devices', value: 'Dual optical photocells, anti-crush safety edge & warning strobe' },
      { label: 'Ground Rail Required', value: 'None (100% Trackless overhead cantilever design)' }
    ],
    certs: [
      { name: 'EN 12453 – Power Operated Gates Safety in Use', sub: 'Tested for dynamic impact force limit and optical obstacle reversal' },
      { name: 'EN 12604 – Structural Integrity & Wind Resistance', sub: 'Class 4 wind load certification with integrated fall-arrest structure' },
      { name: 'CE Machinery Directive Conformity', sub: 'Fully certified electrical, mechanical, and electromagnetic compatibility' },
      { name: 'ISO 9001:2015 – Certified Manufacturing', sub: 'Standardized precision laser cutting, MIG welding, and balancing tests' },
      { name: 'Hot-Dip Galvanizing (ISO 1461)', sub: 'Minimum 85-micron zinc coating for 30+ years corrosion resistance' }
    ],
    gallery: [
      { title: 'Telescopic Factory Gate', image: '/services/services-trackless-gate.jpg', category: 'Telescopic System', desc: 'Dual-panel telescopic gate providing 14m opening with 8m runback' },
      { title: 'Cantilever Trackless Entry', image: '/services/services-perimeter-gate.jpg', category: 'Trackless Access', desc: 'Overhung cantilever gate floating over uneven paving stones' },
      { title: 'Heavy Vehicle Depot Gate', image: '/hero-industrial-doors-dock.jpg', category: 'Logistics Facility', desc: 'Heavy container truck yard with zero ground rail maintenance' },
      { title: 'Compact Runback Solution', image: '/services/services-hero-access.jpg', category: 'Commercial Site', desc: 'Triple-leaf telescopic automated gate on tight boundary property' },
      { title: 'Speed Bi-Fold Automated Gate', image: '/case-studies/case-boom-barrier.jpg', category: 'High-Security Hub', desc: 'Trackless folding speed gate opening in 3.5 seconds' },
      { title: 'Corporate Tech Campus Gate', image: '/head-office-building.jpg', category: 'Corporate Architecture', desc: 'Modern powder-coated trackless gate with RFID tolling' }
    ],
    faqs: [
      {
        q: 'Why choose a Telescopic Gate over a standard sliding gate?',
        a: 'Standard sliding gates require a side runback wall space equal to the full driveway width plus counterweight. If your driveway is 10 meters wide, you need 13 meters of straight wall space. A 2-leaf telescopic gate cuts this space in half (around 6.5 meters), and a 3-leaf gate cuts it by nearly 65%.'
      },
      {
        q: 'Does a trackless cantilever gate require any ground excavation across the road?',
        a: 'No. The road across the driveway remains 100% untouched. The gate is suspended in mid-air over the opening. All concrete civil work and heavy roller carriages are located completely to the side of the driveway behind the boundary wall.'
      },
      {
        q: 'How do the multiple leaves stay synchronized?',
        a: 'Our telescopic gates use a closed-loop mechanical cable drive system with heavy aircraft-grade stainless steel wire ropes and precision sealed bearing pulleys. When the motorized master leaf moves, the internal cables pull the secondary leaf at an exact 2:1 or 3:1 ratio.'
      },
      {
        q: 'Can a trackless cantilever gate handle strong winds?',
        a: 'Yes. HTI cantilever gates feature heavy steel bottom tracks and oversized dual-guide top portals anchored to deep reinforced concrete foundation piles, rated to withstand severe gale-force winds up to 120 km/h (Class 4 Wind Load certified).'
      },
      {
        q: 'What maintenance is needed for trackless gates?',
        a: 'Since there is no ground rail to clean or collect dirt, maintenance is significantly lower than tracked gates. Routine maintenance simply involves periodic inspection of roller carriages, tension cable lubrication, and motor oil checks every 6 to 12 months.'
      }
    ],
    cta: {
      tag: 'SPACE-SAVING ACCESS AUTOMATION',
      title: 'Maximize Your Driveway with Trackless & Telescopic Gates',
      desc: 'Contact HTI engineering for site surveys, custom AutoCAD gate drawings, and turnkey fabrication across India.'
    }
  },

  // =========================================================================
  // 3. RAPID AIRLOCK (HIGH-SPEED DOORS)
  // =========================================================================
  'rapid-airlock': {
    slug: 'rapid-airlock',
    categoryName: 'Industrial Access Automation',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'automation' },
      { label: 'Industrial Access Automation', page: 'automation' },
      { label: 'Rapid Airlock & High-Speed Doors', isCurrent: true }
    ],
    badge: 'HIGH SPEED ROLL-UP | CLEANROOM AIRLOCK | THERMAL SEAL',
    titleLine1: 'Rapid Airlock',
    titleLine2Accent: 'High-Speed Doors',
    tagline: 'Lightning Fast 2.5 m/s. Sterile Contamination Shield.',
    description: 'Engineered for pharmaceutical cleanrooms, food processing, cold chains, and high-traffic manufacturing bays. HTI rapid roll-up doors open in milliseconds to maintain cleanroom airlock pressure, prevent temperature loss, and block airborne contaminants.',
    metrics: [
      { label: 'Up to 2.5 m/s Opening Speed', icon: 'Zap' },
      { label: 'Self-Repairing Zipper Track', icon: 'ShieldCheck' },
      { label: 'Air-Tight Class 4 Seal', icon: 'Award' },
      { label: 'Full-Height Safety Light Curtain', icon: 'Sparkles' }
    ],
    heroImage: '/services/services-rapid-airlock.jpg',
    heroStatusBadge: 'Optical Light Curtain Guard Active',
    benefits: [
      {
        title: 'Ultra-Fast 2.5 m/s Cycle Speed',
        desc: 'Minimizes doorway open duration, dramatically reducing conditioned air loss.',
        icon: 'Zap'
      },
      {
        title: 'Sterile Cleanroom Pressure Control',
        desc: 'Hermetic edge seals maintain positive/negative pressure cascades in airlocks.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Self-Repairing "Zip" System',
        desc: 'If accidentally struck by a forklift, the PVC curtain resets into the tracks automatically.',
        icon: 'Sparkles'
      },
      {
        title: 'Full-Height Safety Light Grid',
        desc: 'Multi-beam infrared barrier stops and reverses door if anything enters the doorway.',
        icon: 'Shield'
      },
      {
        title: 'Heavy Tear-Resistant PVC Fabric',
        desc: '900 g/m² PVC with transparent vision panels for maximum forklift visibility.',
        icon: 'Layers'
      }
    ],
    showcase: {
      videoSrc: '/High-Speed.mp4',
      poster: '/services/services-rapid-airlock.jpg',
      eyebrow: 'SPEED DEMONSTRATION',
      heading: 'Rapid Roll-Up Door in Action',
      description: 'Watch our high-speed roll-up doors open and seal in under two seconds, facilitating seamless forklift traffic while preserving internal environmental temperature.',
      features: [
        'Ultra-fast brushless motor with soft acceleration ramp',
        'Integrated wireless bottom safety edge detector',
        'Class 4 wind-resistant structural lateral stiffener bars',
        'Tested for 2,500,000+ continuous warehouse cycles'
      ]
    },
    productsTitle: 'Our Rapid Airlock Products',
    products: [
      {
        title: 'Self-Repairing High-Speed PVC Door',
        badge: 'Self-Repair | Zipper Track',
        image: '/services/services-rapid-airlock.jpg',
        chips: ['Zipper Track', '2.5 m/s Speed', 'Zero Downtime'],
        desc: 'Flexible PVC roll-up door with soft bottom edge. Re-inserts into side tracks automatically after forklift collision.',
        bullets: [
          'Automatic self-resetting track system eliminates maintenance downtime',
          'Soft bottom edge prevents damage to goods and pedestrian injury',
          'Airtight side seals ideal for pharmaceutical airlocks and food bays'
        ]
      },
      {
        title: 'Insulated Cold Storage Rapid Door',
        badge: 'Cold Storage | -30°C',
        image: '/products/chiller-door-hero.jpg',
        chips: ['Thermal Foam', 'Heated Side Guides', 'Condensation-Free'],
        desc: 'High-speed insulated fabric door designed for freezer rooms and cold chain logistics, stopping ice build-up.',
        bullets: [
          'Thermal insulation core prevents thermal bridging and condensation',
          'Low-voltage electric heating elements in side columns prevent icing',
          'Opens at 2.0 m/s to prevent cold air evacuation from freezers'
        ]
      },
      {
        title: 'Cleanroom Airlock High-Speed Door',
        badge: 'USFDA Cleanroom | GMP',
        image: '/products/rapid-doors.jpg',
        chips: ['Smooth Wipeable', 'Air Tight', 'Interlock Ready'],
        desc: 'Smooth antimicrobial PVC roll-up door designed for sterile cascading cleanroom airlocks with interlock controller integration.',
        bullets: [
          'Fully compliant with ISO 14644 & USFDA sterile airlock standards',
          'Interlocks with HVAC and secondary cleanroom doors',
          'Smooth SS304 stainless steel side column covers for easy sanitation'
        ]
      },
      {
        title: 'Heavy Wind-Resistant High-Speed Door',
        badge: 'Exterior | Class 4 Wind',
        image: '/services/service-high-speed-doors.jpg',
        chips: ['Steel Reinforcing Ribs', 'Exterior Use', 'High Traffic'],
        desc: 'High-speed roll-up door with composite steel wind-stiffeners engineered for exterior loading bay portals exposed to heavy wind gusts.',
        bullets: [
          'Class 4 wind-load rating (up to 120 km/h wind pressure resistance)',
          'Heavy-duty industrial drive with emergency manual crank release',
          'Wide transparent PVC vision window for driver safety'
        ]
      }
    ],
    technologies: {
      eyebrow: 'HIGH-FREQUENCY MOTION TECH',
      title: 'Precision Motor Drives, Optical Curtains & Smart Controllers',
      subtitle: 'Variable frequency speed drives, self-repairing zipper profiles, and multi-beam safety arrays.',
      tabs: [
        {
          id: 'vfd-motor',
          name: 'High-Speed Variable Frequency Drive',
          badge: 'High-Speed Powertrain',
          icon: 'Zap',
          range: '1.2 m/s to 2.5 m/s Opening Speed',
          speed: '100% Continuous High-Duty Cycles',
          summary: 'Microprocessor controlled VFD motor enables lightning-fast acceleration and smooth, silent deceleration, extending mechanical curtain life.',
          highlights: [
            'Adjustable opening speeds up to 2.5 m/s and closing speeds of 0.8 m/s',
            'Soft-start and soft-stop ramping eliminates curtain slapping and gearbox wear',
            'Integrated encoder accurately counts position down to the single millimeter'
          ]
        },
        {
          id: 'self-repair',
          name: 'Self-Repairing Zipper Edge Profile',
          badge: 'Zero Downtime',
          icon: 'Sparkles',
          range: 'Continuous Trackless Zipper Guide',
          speed: 'Instant Automatic Re-Feed',
          summary: 'Special polyethylene side guides retain a continuous zipper bead. If impacted by equipment, the curtain pops free without damage and re-feeds automatically on the next cycle.',
          highlights: [
            'Soft bottom edge contains zero rigid metal bars, protecting forklift drivers and pedestrians',
            'Zero repair technician callouts needed after accidental impact',
            'Tight perimeter sealing prevents dust, insects, and draft intrusion'
          ]
        },
        {
          id: 'light-curtain',
          name: 'Full-Height Infrared Safety Light Grid',
          badge: 'Anti-Pinch Optical Safety',
          icon: 'ShieldCheck',
          range: '0 to 2.5 m Full Doorway Height',
          speed: '< 15 ms Instant Auto-Reverse',
          summary: 'Up to 32 infrared optical beams built directly into the side columns monitor the entire doorway plane, halting and reversing the door before physical contact occurs.',
          highlights: [
            'Meets European safety standard EN 13241-1 for industrial doors',
            'Detects small boxes on forklift forks and crossing personnel effortlessly',
            'Immune to dust, optical reflections, and direct sunlight'
          ]
        },
        {
          id: 'radar-motion',
          name: 'Microwave Radar & Vehicle Loop Sensors',
          badge: 'Hands-Free Vehicle Trigger',
          icon: 'Radio',
          range: 'Up to 6 m Detection Zone',
          speed: 'Directional Pedestrian/Forklift Filter',
          summary: 'Overhead radar motion sensors distinguish between forklift vehicles and pedestrians, opening automatically only when a vehicle approaches.',
          highlights: [
            'Direction-sensing radar ignores pedestrians walking alongside the opening',
            'Underground magnetic induction loops trigger door open as forklift crosses line',
            'Pull cord switch, contactless wave plate, and remote control transmitters available'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Approach Detection',
        desc: 'Radar sensor detects approaching forklift',
        detail: 'Direction-sensing microwave radar triggers the high-speed drive as forklift approaches at 15 km/h.'
      },
      {
        step: 2,
        title: 'Rapid Acceleration',
        desc: 'Door rolls up in under 1.5 seconds',
        detail: 'VFD motor spools the PVC curtain onto the top shaft at up to 2.5 m/s, providing clear transit.'
      },
      {
        step: 3,
        title: 'Optical Safety Verification',
        desc: 'Light curtain guards the doorway',
        detail: 'Infrared light grid verifies complete vehicle clearance through the threshold.'
      },
      {
        step: 4,
        title: 'Instant Reseal',
        desc: 'Door closes rapidly to preserve clean air',
        detail: 'Curtain glides closed and seals tightly in the side guides, preserving cleanroom pressure.'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Cleanroom Airlocks', image: '/services/services-rapid-airlock.jpg' },
      { title: 'Cold Storage Freezers & Chillers', image: '/products/chiller-door-hero.jpg' },
      { title: 'Food & Beverage Processing Facilities', image: '/products/rapid-doors.jpg' },
      { title: 'Automotive Manufacturing Bays', image: '/services/service-high-speed-doors.jpg' },
      { title: 'Logistics Warehouse Loading Portals', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Electronics Precision Clean Environments', image: '/hero-cleanroom-automation.jpg' }
    ],
    specs: [
      { label: 'Door Operating Speed', value: 'Opening up to 2.5 m/s | Closing 0.8 m/s (Adjustable)' },
      { label: 'Curtain Material', value: 'High-density 900 g/m² PVC (Fire Retardant DIN 4102 B1)' },
      { label: 'Maximum Door Size', value: 'Up to 6000 mm (W) x 6000 mm (H)' },
      { label: 'Wind Resistance Rating', value: 'Class 2 to Class 4 (EN 12424 certified)' },
      { label: 'Motor Power System', value: '0.75 kW – 1.5 kW Heavy Inverter Motor, 230V 1Φ / 415V 3Φ' },
      { label: 'Operating Temperature', value: '-10°C to +50°C (Freezer version: down to -30°C)' },
      { label: 'Safety Sensor Systems', value: 'Full-height optical light curtain & wireless bottom safety edge' },
      { label: 'Daily Cycle Durability', value: 'Rated for 2000+ daily cycles (Over 2,500,000 cycles tested)' }
    ],
    certs: [
      { name: 'EN 13241-1 – Industrial, Commercial & Garage Doors', sub: 'European standard for motorized door mechanical safety and wind permeability' },
      { name: 'EN 12424 – Wind Load Resistance Classification', sub: 'Certified structural stability under heavy internal and external wind pressure' },
      { name: 'USFDA & cGMP Cleanroom Compliant', sub: 'Meets sterile pharmaceutical airlock and food sanitary manufacturing codes' },
      { name: 'DIN 4102 B1 – Fire Retardant Fabric Classification', sub: 'Flame-retardant self-extinguishing PVC curtain material' },
      { name: 'ISO 9001:2015 – Quality Control Certification', sub: 'Certified motor drive endurance testing and laser track alignment' }
    ],
    gallery: [
      { title: 'Pharma Airlock High-Speed Door', image: '/services/services-rapid-airlock.jpg', category: 'Cleanroom Airlock', desc: 'Self-repairing rapid door maintaining 25 Pa pressure cascade' },
      { title: 'Cold Storage Fast Door', image: '/products/chiller-door-hero.jpg', category: 'Cold Chain', desc: 'Insulated thermal rapid door operating at -25°C in freezer bay' },
      { title: 'Warehouse High-Traffic Portal', image: '/products/rapid-doors.jpg', category: 'Logistics Facility', desc: 'High-frequency rapid roll-up door with transparent vision panel' },
      { title: 'Cleanroom Material Airlock', image: '/hero-cleanroom-automation.jpg', category: 'Pharma Manufacturing', desc: 'Interlocked cleanroom high-speed doors with touchless wave sensors' },
      { title: 'Industrial Exterior Speed Door', image: '/services/service-high-speed-doors.jpg', category: 'Industrial Access', desc: 'Wind-resistant rapid door with heavy internal steel stiffening ribs' },
      { title: 'Automated Logistics Loading Bay', image: '/hero-industrial-doors-dock.jpg', category: 'Logistics Center', desc: 'High-speed roll-up doors integrated with hydraulic dock levelers' }
    ],
    faqs: [
      {
        q: 'How does the self-repairing zipper system work?',
        a: 'The curtain edges feature continuous flexible polymer zipper teeth running inside specially shaped polyethylene side channels. If a forklift strikes the curtain, the teeth pop cleanly out of the channel without tearing the fabric. On the very next open cycle, the curtain is automatically guided back into the tracks without manual intervention.'
      },
      {
        q: 'Can rapid roll-up doors be integrated with cleanroom interlock systems?',
        a: 'Yes. HTI rapid doors come equipped with programmable PLC interlock cards. In cleanroom cascades, the controller communicates with secondary doors and HVAC pressure sensors to ensure that when one door is open, the opposing airlock door is electronically locked.'
      },
      {
        q: 'What triggers can be used to open the door automatically for forklifts?',
        a: 'We offer multiple triggering technologies: 1) Overhead microwave Doppler radar that detects approaching vehicles, 2) Underground magnetic induction floor loops, 3) RFID long-range tags mounted on forklift masts, 4) Overhead pull-cord switches, and 5) Contactless wave-to-open wall switches.'
      },
      {
        q: 'What happens to the high-speed door during a power failure?',
        a: 'All HTI rapid doors include a manual hand-chain or release lever to raise the curtain easily during a blackout. Optional 24V UPS battery backup systems are available to automatically drive the door to the full-open position immediately upon power loss.'
      },
      {
        q: 'How much energy does a high-speed door save compared to standard doors?',
        a: 'Because a high-speed door opens and closes in under 4 seconds compared to 20–30 seconds for a conventional motorized shutter, air exchange through the doorway is reduced by up to 80%, drastically cutting cooling and heating power bills in climate-controlled facilities.'
      }
    ],
    cta: {
      tag: 'RAPID CLEANROOM & WAREHOUSE AUTOMATION',
      title: 'Accelerate Productivity with HTI High-Speed Doors',
      desc: 'Connect with our industrial automation specialists for custom sizing, site evaluation, and turnkey supply and installation across India.'
    }
  },

  // =========================================================================
  // 4. LOGISTICS BRIDGE (DOCK LEVELLERS & SHELTERS)
  // =========================================================================
  'logistics-bridge': {
    slug: 'logistics-bridge',
    categoryName: 'Industrial Access Automation',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'automation' },
      { label: 'Industrial Access Automation', page: 'automation' },
      { label: 'Logistics Bridge & Dock Levellers', isCurrent: true }
    ],
    badge: 'ELECTRO-HYDRAULIC DOCK LEVELLERS | DOCK SHELTERS | SEALS',
    titleLine1: 'Logistics Bridge',
    titleLine2Accent: 'Dock Levellers',
    tagline: 'Bridging the Gap. Seamless High-Load Cargo Transfer.',
    description: 'Bridge the height and distance gap between warehouse loading bays and transport truck beds effortlessly. HTI electro-hydraulic dock levellers, inflatable shelters, and vehicle restraints ensure rapid, safe, and weatherproof container loading operations.',
    metrics: [
      { label: '6 to 15 Ton Dynamic Capacity', icon: 'ShieldCheck' },
      { label: 'Electro-Hydraulic Dual Cylinder', icon: 'Zap' },
      { label: 'Tear-Drop Chequered Top Plate', icon: 'Layers' },
      { label: 'Weatherproof Inflatable Seal', icon: 'Award' }
    ],
    heroImage: '/services/services-logistics-bridge.jpg',
    heroStatusBadge: 'Hydraulic Pressure Safety System Active',
    benefits: [
      {
        title: 'Heavy Dynamic Load Capacity',
        desc: '6,000 kg to 15,000 kg structural rating engineered for heavy 3-wheel and 4-wheel forklifts.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Seamless Vehicle Docking Bridge',
        desc: 'Telescopic or hinged lip accommodates variations in truck heights and suspension tilt.',
        icon: 'Truck'
      },
      {
        title: 'Anti-Fall Hydraulic Safety Valves',
        desc: 'Velocity parachute valves lock the ramp instantly if a truck accidentally pulls away.',
        icon: 'Shield'
      },
      {
        title: 'Complete Cold Chain Seal',
        desc: 'Inflatable and retractable dock shelters maintain 100% temperature integrity during loading.',
        icon: 'Sparkles'
      },
      {
        title: 'Single-Button Smart Controller',
        desc: 'One-touch push button automatically raises platform, extends lip, and rests onto truck bed.',
        icon: 'Zap'
      }
    ],
    showcase: {
      videoSrc: '/Dock Levellers & Dock Shelters.mp4',
      poster: '/services/services-logistics-bridge.jpg',
      eyebrow: 'LOGISTICS DEMONSTRATION',
      heading: 'Logistics Bridge in Action',
      description: 'Observe how our electro-hydraulic dock leveller and dock shelter create an airtight, high-capacity loading bridge for non-stop forklift pallet movement.',
      features: [
        'Dual hydraulic lift cylinders with velocity parachute valves',
        'High-tensile St52 steel tear-drop non-slip chequered platform',
        'Telescopic lip reaching deep into refrigerated container trucks',
        'Integrated dock shelter preventing heat, rain, and insect ingress'
      ]
    },
    productsTitle: 'Our Logistics Bridge Products',
    products: [
      {
        title: 'Electro-Hydraulic Dock Leveller (Hinged Lip)',
        badge: 'Hydraulic | Hinged Lip',
        image: '/services/services-logistics-bridge.jpg',
        chips: ['6-10 Ton Capacity', 'Dual Lift Ram', 'Anti-Slip'],
        desc: 'Standard warehouse hydraulic leveller with self-cleaning open hinge lip that automatically drops onto vehicle floor.',
        bullets: [
          'High-tensile 6/8 mm tear-drop chequered steel plate',
          'Self-cleaning piano-hinge design resists dirt and debris',
          'Emergency velocity fuse prevents platform drop if truck pulls out'
        ]
      },
      {
        title: 'Telescopic Lip Dock Leveller',
        badge: 'Telescopic Lip | Cold Chain',
        image: '/hero-industrial-doors-dock.jpg',
        chips: ['500–1000mm Lip Reach', 'Precision Placement', 'Reefer Friendly'],
        desc: 'Equipped with a sliding telescopic lip that extends up to 1000 mm, allowing precise placement inside end-loaded refrigerated containers.',
        bullets: [
          'Variable lip extension for side-loaded and end-loaded trucks',
          'Maximizes thermal seal for cold chain distribution warehouses',
          'Independent cylinder control for platform and telescopic lip'
        ]
      },
      {
        title: 'Inflatable Dock Shelter & Seals',
        badge: 'Inflatable | 100% Thermal Seal',
        image: '/services/service-sectional-doors.jpg',
        chips: ['Airtight Cushions', 'High-Speed Blower', 'Weatherproof'],
        desc: 'Inflatable airbags inflate around the truck top and sides after docking, creating an airtight thermal seal for cold rooms and pharma bays.',
        bullets: [
          'Heavy 1000 g/m² Cordura fabric cushions resist abrasion',
          'Inflates completely in under 30 seconds via centrifugal blower',
          'Prevents rain, dust, insects, and humidity from entering warehouse'
        ]
      },
      {
        title: 'Vehicle Restraint & Wheel Lock System',
        badge: 'Safety | Anti-Driveaway',
        image: '/services/services-heavy-security.jpg',
        chips: ['Wheel Chock', 'Interlocked Alarm', 'Prevents Fall'],
        desc: 'Automatic electro-mechanical steel hook locks the truck rear wheel or ICC bar, preventing premature driveaway accidents.',
        bullets: [
          'Withstands up to 15,000 kg of accidental truck pull-out force',
          'Interlocked with dock leveller—leveler cannot operate until truck is locked',
          'Inside/outside red & green LED traffic light communication'
        ]
      }
    ],
    technologies: {
      eyebrow: 'HEAVY HYDRAULIC ENGINEERING',
      title: 'Precision Hydraulic Powertrains & Cargo Safety Mechanisms',
      subtitle: 'Multi-cylinder hydraulic power packs, emergency velocity parachute valves, and laser-welded structural deck beams.',
      tabs: [
        {
          id: 'hydraulic-powerpack',
          name: 'Electro-Hydraulic Power Unit & Dual Cylinders',
          badge: 'Heavy Lifting Powertrain',
          icon: 'Zap',
          range: '6,000 kg to 15,000 kg Dynamic Capacity',
          speed: '25-Second Full Extension Cycle',
          summary: 'Integrated compact hydraulic power pack with thermal overload motor, oil reservoir, and precision proportional valves.',
          highlights: [
            'Dual primary lift cylinders distribute hydraulic lifting force evenly across the frame',
            'Submerged low-noise electric motor running in high-grade hydraulic oil',
            'Operating pressure up to 220 bar with built-in pressure relief safety valve'
          ]
        },
        {
          id: 'velocity-valves',
          name: 'Velocity Fuse Parachute Valves',
          badge: 'Anti-Freefall Safety',
          icon: 'ShieldCheck',
          range: 'Instant Mechanical Hydraulic Lock',
          speed: '< 0.05s Auto-Lock Response',
          summary: 'Internal velocity parachute valves mounted directly in the cylinder port immediately lock the hydraulic fluid if a sudden truck departure occurs.',
          highlights: [
            'Ramp drops less than 25 mm if a truck accidentally pulls away under forklift load',
            'Protects forklift driver from catastrophic dock drop accidents',
            'Conforms strictly to European docking standard EN 1398'
          ]
        },
        {
          id: 'torsion-deck',
          name: 'Torsional Flex Platform Deck Architecture',
          badge: 'Structural Flex',
          icon: 'Layers',
          range: 'Up to 100 mm Lateral Bed Tilt Compensation',
          speed: 'Continuously Follows Truck Suspension',
          summary: 'The deck structure is engineered with longitudinal I-beams that can twist up to 100 mm to maintain full contact when a truck tilts during loading.',
          highlights: [
            'Eliminates step hazards and forklift tire damage during uneven pallet loading',
            'Robotically welded St52 structural steel I-beams provide superior fatigue strength',
            'Heavy-duty sliding toe guards prevent foot entrapment during ramp travel'
          ]
        },
        {
          id: 'dock-interlock',
          name: 'Integrated Dock Management Master Controller',
          badge: 'Sequential Interlocking',
          icon: 'Settings',
          range: 'Unified Control for Shutter, Leveler & Light',
          speed: 'Foolproof Sequential Operation',
          summary: 'Single central control panel interlocks the sectional overhead door, dock leveller, vehicle restraint, and exterior LED traffic lights.',
          highlights: [
            'Sectional door must be opened before dock leveller can be operated',
            'Dock leveller cannot be raised until vehicle restraint is securely locked',
            'Exterior red light warns truck driver not to depart while loading is active'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Truck Docking & Restraint',
        desc: 'Vehicle reverses into bay & wheel is locked',
        detail: 'Truck docks against heavy rubber dock bumpers; wheel restraint locks rear tire safely.'
      },
      {
        step: 2,
        title: 'Shelter Inflation',
        desc: 'Inflatable shelter seals around the truck',
        detail: 'Airbags inflate around top and side container walls, establishing 100% weather seal.'
      },
      {
        step: 3,
        title: 'Ramp Raise & Lip Extension',
        desc: 'Single button raises leveller and deploys lip',
        detail: 'Hydraulic rams elevate platform; lip swings out and floats gently onto truck floor.'
      },
      {
        step: 4,
        title: 'Continuous Floating Transit',
        desc: 'Platform follows truck suspension float',
        detail: 'Leveler follows vehicle height changes dynamically as 50+ forklift pallet tons cross.'
      }
    ],
    applications: [
      { title: 'E-Commerce Fulfillment Centers', image: '/services/services-logistics-bridge.jpg' },
      { title: 'Pharmaceutical Cold Storage Warehouses', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'FMCG & Retail Distribution Hubs', image: '/services/service-sectional-doors.jpg' },
      { title: 'Container Freight Stations & Dry Ports', image: '/services/services-perimeter-gate.jpg' },
      { title: 'Automotive Spare Parts Warehousing', image: '/services/services-heavy-security.jpg' },
      { title: 'Food & Beverage Processing Plants', image: '/products/rapid-doors.jpg' }
    ],
    specs: [
      { label: 'Dynamic Load Rating', value: '6,000 kg (6 Ton) standard | Heavy version up to 15,000 kg' },
      { label: 'Platform Deck Size', value: '2000 mm x 2500 mm (Custom dimensions up to 2500 x 4000 mm)' },
      { label: 'Operating Travel Range', value: '+350 mm above dock / -300 mm below dock level' },
      { label: 'Lip Reach & Thickness', value: '400–1000 mm reach | 16 mm heavy high-tensile steel plate' },
      { label: 'Hydraulic System', value: 'Dual main lift cylinders + 1 lip cylinder (220 bar working pressure)' },
      { label: 'Deck Plate Material', value: '6/8 mm tear-drop chequered non-slip structural St52 steel' },
      { label: 'Emergency Safety Valves', value: 'Instant-lock velocity fuse valves & full-range sliding toe guards' },
      { label: 'Electrical Power Supply', value: '415V AC 3-Phase, 50Hz (Single-button automated sequence)' }
    ],
    certs: [
      { name: 'EN 1398 – European Dock Levellers Safety Standard', sub: 'Certified structural capacity, deflection limits, and safety velocity valves' },
      { name: 'CE Machinery Directive Conformity', sub: 'Complies with 2006/42/EC electrical and hydraulic safety regulations' },
      { name: 'ISO 9001:2015 – Certified Manufacturing', sub: 'Precision robotic welding, ultrasound weld testing, and 125% overload proof testing' },
      { name: 'OSHA 1910.178 Compliant Dock Safety', sub: 'Meets US workplace safety guidelines for powered industrial truck loading' },
      { name: 'Surface Preparation (SSPC-SP10)', sub: 'Shot-blasted steel with two-pack epoxy zinc primer and polyurethane enamel finish' }
    ],
    gallery: [
      { title: 'Hydraulic Dock Leveller Installation', image: '/services/services-logistics-bridge.jpg', category: 'Logistics Center', desc: 'Heavy 10-ton hydraulic leveler bridging container truck' },
      { title: 'Inflatable Dock Shelter Bay', image: '/hero-industrial-doors-dock.jpg', category: 'Cold Storage Bay', desc: 'Airtight inflatable shelter maintaining -20°C freezer bay temperature' },
      { title: 'Overhead Sectional Door & Leveller', image: '/services/service-sectional-doors.jpg', category: 'Distribution Hub', desc: 'Integrated loading portal with dock leveller and sectional door' },
      { title: 'Telescopic Lip Dock System', image: '/products/rapid-doors.jpg', category: 'Pharma Logistics', desc: 'Long-reach telescopic lip resting inside reefer container truck' },
      { title: 'Multi-Bay Warehouse Terminal', image: '/services/services-heavy-security.jpg', category: 'Cargo Terminal', desc: '12-bay continuous loading dock with vehicle restraints and bumpers' },
      { title: 'Heavy Vehicle Restraint Lock', image: '/services/services-perimeter-gate.jpg', category: 'Safety Systems', desc: 'Automatic truck wheel locking system preventing driveaway accidents' }
    ],
    faqs: [
      {
        q: 'What is the dynamic capacity vs static capacity of a dock leveller?',
        a: 'Static capacity is the maximum stationary weight a leveller can hold when parked. Dynamic capacity is the active moving load when a loaded forklift drives across the ramp at speed with braking and acceleration forces. HTI dock levellers are rated for 6,000 kg to 15,000 kg TRUE DYNAMIC load.'
      },
      {
        q: 'How does the dock leveller handle trucks that are higher or lower than the dock?',
        a: 'HTI electro-hydraulic levellers offer an operating travel range of up to +350 mm above dock height and -300 mm below dock height. The dual cylinders and lip automatically maintain contact with the truck bed as cargo is loaded or unloaded.'
      },
      {
        q: 'What safety systems prevent accidents if a truck pulls away while a forklift is on the ramp?',
        a: 'Every HTI leveller incorporates internal hydraulic velocity fuse (parachute) valves directly inside the main cylinder ports. If oil flow suddenly accelerates due to a missing truck, the valves lock instantly (< 0.05s), preventing the ramp from dropping more than 25 mm.'
      },
      {
        q: 'What is the advantage of an Inflatable Dock Shelter over standard curtain shelters?',
        a: 'Curtain shelters rely on truck compression against rubber pads, leaving small air gaps. Inflatable dock shelters use high-volume blowers to inflate heavy-duty Cordura airbags completely around the vehicle body, creating an airtight seal that cuts energy loss by up to 90% in cold storages.'
      },
      {
        q: 'Can dock levellers be retrofitted into existing warehouses without pits?',
        a: 'Yes! While most facilities install pit-mounted levellers, HTI also provides pre-fabricated external cantilever dock pods and edge-of-dock (EOD) mechanical levelers that mount directly to the front face of the concrete dock without pit excavation.'
      }
    ],
    cta: {
      tag: 'TURNKEY WAREHOUSE LOGISTICS SOLUTIONS',
      title: 'Optimize Your Cargo Flow with HTI Dock Levellers',
      desc: 'Speak with our logistics engineering team for pit layout drawings, civil guidelines, and turnkey installation across India.'
    }
  },

  // =========================================================================
  // 5. HEAVY SECURITY (MOTORIZED ROLLING SHUTTERS)
  // =========================================================================
  'heavy-security': {
    slug: 'heavy-security',
    categoryName: 'Industrial Access Automation',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'automation' },
      { label: 'Industrial Access Automation', page: 'automation' },
      { label: 'Heavy Security & Motorized Shutters', isCurrent: true }
    ],
    badge: 'MOTORIZED ROLLING SHUTTERS | FIRE RATED | STORM DEFENSE',
    titleLine1: 'Heavy Security',
    titleLine2Accent: 'Rolling Shutters',
    tagline: 'High-Strength Steel Defense. 4-Hour Fire Protection.',
    description: 'Protect warehouses, factories, aircraft hangars, and commercial buildings with heavy-duty motorized rolling shutters. Engineered from cold-rolled galvanized steel, double-skin insulated slats, or certified fire-rated curtains for impenetrable physical defense.',
    metrics: [
      { label: 'Galvanized / Galvalume Steel', icon: 'Shield' },
      { label: 'Up to 4-Hour Fire Resistance', icon: 'ShieldCheck' },
      { label: 'Class 4 Wind Storm Resistance', icon: 'Award' },
      { label: 'High-Torque Central / Side Motor', icon: 'Zap' }
    ],
    heroImage: '/services/services-heavy-security.jpg',
    heroStatusBadge: 'Heavy Shutter Motor Drive Ready',
    benefits: [
      {
        title: 'Impenetrable Physical Defense',
        desc: 'Interlocking heavy-gauge galvanized steel slats resist forced burglary and ramming.',
        icon: 'Shield'
      },
      {
        title: '2 to 4-Hour Fire Containment',
        desc: 'BS 476 / EN 1634 certified fire-rated shutters integrated with building fire alarm panels.',
        icon: 'ShieldCheck'
      },
      {
        title: 'High-Torque Industrial Drive',
        desc: 'Heavy side-shaft chain drive motor with electromagnetic fail-safe brake and manual override.',
        icon: 'Zap'
      },
      {
        title: 'Thermal & Acoustic Insulation',
        desc: 'Double-skin polyurethane-filled slats eliminate outdoor noise and heat transmission.',
        icon: 'Layers'
      },
      {
        title: 'Extreme Wind Load Engineering',
        desc: 'Wind-lock end clips and heavy steel guide channels prevent curtain blow-out during storms.',
        icon: 'Sparkles'
      }
    ],
    showcase: {
      videoSrc: '/Motorized Industrial Rolling Shutters.mp4',
      poster: '/services/services-heavy-security.jpg',
      eyebrow: 'SECURITY SHOWCASE',
      heading: 'Motorized Rolling Shutter in Action',
      description: 'Watch our heavy motorized rolling shutters open and close smoothly, demonstrating heavy-duty side-mount chain motors, safety bottom edges, and fire-drop mechanisms.',
      features: [
        'Heavy-duty side-mounted industrial gear motor with manual haul chain',
        'Built-in anti-drop centrifugal safety brake device',
        'Wireless pneumatic bottom safety edge with auto-reverse',
        'Tested for over 1,000,000 continuous opening and closing cycles'
      ]
    },
    productsTitle: 'Our Heavy Security Products',
    products: [
      {
        title: 'Motorized Industrial Rolling Shutter',
        badge: 'Industrial | Galvanized Steel',
        image: '/products/motorized-rolling-shutters.jpg',
        chips: ['Heavy Steel Slats', 'Side Motor Drive', 'Manual Chain'],
        desc: 'Heavy-gauge galvanized steel rolling shutter for factory portals, warehouse entrances, and commercial showrooms.',
        bullets: [
          'Cold-rolled heavy-gauge galvanized steel interlocking slats (0.8–1.2 mm)',
          'High-torque side-mount motor with emergency manual hand-chain',
          'Wind-lock end shoes prevent curtain displacement in open bays'
        ]
      },
      {
        title: 'Certified Fire-Rated Rolling Shutter',
        badge: 'Fire Rated | 2-4 Hours',
        image: '/products/fire-rated-steel-doors.jpg',
        chips: ['BS 476 / EN 1634', 'Fusible Link', 'Auto Gravity Drop'],
        desc: 'Automatic fire-rated rolling shutter designed to compartmentalize fires in commercial malls, data centers, and factory bays.',
        bullets: [
          'Certified for 120 to 240 minutes fire resistance integrity',
          'Automatic controlled gravity descent triggered by fire alarm or fusible link',
          'Audio-visual alarm beacon warns occupants before descent'
        ]
      },
      {
        title: 'Double-Skin Insulated Rolling Shutter',
        badge: 'Insulated | Acoustic & Thermal',
        image: '/services/services-heavy-security.jpg',
        chips: ['PUF Injected', 'Noise Dampening', 'Energy Saving'],
        desc: 'Twin-wall aluminum or steel slats injected with high-density polyurethane insulation for thermal efficiency and acoustic privacy.',
        bullets: [
          'Thermal insulation value U = 1.2 W/m²K reduces HVAC costs',
          'Acoustic noise reduction rating up to 25 dB',
          'Rubber bottom weatherstrip and brush seals in guide tracks'
        ]
      },
      {
        title: 'High-Wind Storm Defense Rolling Shutter',
        badge: 'Cyclone Resistant | Wind Lock',
        image: '/services/service-hangar-doors.jpg',
        chips: ['Class 5 Wind', 'Deep Guide Channels', 'Anti-Blowout'],
        desc: 'Engineered for coastal plants, shipyards, and hangars exposed to severe tropical cyclonic winds up to 180 km/h.',
        bullets: [
          'Cast-steel wind-lock end clips riveted to slat ends',
          'Deep structural steel guide channels prevent curtain pull-out',
          'Heavy barrel shaft with internal torsion spring counterbalancing'
        ]
      }
    ],
    technologies: {
      eyebrow: 'HEAVY MECHANICAL & FIRE ENGINEERING',
      title: 'Precision Motor Drives, Anti-Drop Brakes & Fire Descent Regulators',
      subtitle: 'Side-mounted industrial gear motors, centrifugal fall-arrest safety brakes, and controlled gravity descent regulators.',
      tabs: [
        {
          id: 'side-motor',
          name: 'Heavy Industrial Side-Mounted Gear Drive',
          badge: 'High-Torque Powertrain',
          icon: 'Zap',
          range: '300 kg to 2,500 kg Shutter Lifting Force',
          speed: '12 – 15 RPM Smooth Spooling',
          summary: 'Powerful three-phase or single-phase side-mounted gear motor with built-in electromagnetic disk brake and manual haul chain.',
          highlights: [
            'Precision worm gear reduction mechanism provides tremendous lifting torque',
            'Integrated manual haul chain allows smooth opening during power blackouts',
            'Adjustable rotary limit switches provide millimeter-accurate open/close stopping'
          ]
        },
        {
          id: 'anti-drop-brake',
          name: 'Centrifugal Anti-Drop Safety Brake (Fall Arrest)',
          badge: 'Personnel Protection',
          icon: 'ShieldCheck',
          range: 'Immediate Mechanical Lock on Overspeed',
          speed: '< 0.1s Rotational Lockout',
          summary: 'Mounted on the dummy end of the barrel shaft. If the motor drive chain breaks, centrifugal pawls lock into the ratchet wheel instantly, preventing curtain drop.',
          highlights: [
            'Certified according to European safety standard EN 12604 for anti-fall protection',
            'Built-in microswitch cuts electrical power to the motor upon mechanical trip',
            'Completely mechanical operation—zero reliance on electrical sensors or power'
          ]
        },
        {
          id: 'fire-descent',
          name: 'Controlled Fire Descent Governor',
          badge: 'Life Safety System',
          icon: 'Award',
          range: '120 – 240 Min Fire Resistance',
          speed: '0.15 m/s Controlled Gravity Drop',
          summary: 'In a fire alert, the electromagnetic brake releases and a centrifugal governor regulates the shutter descent at a safe 0.15 m/s without power.',
          highlights: [
            'Prevents free-fall hazards while ensuring complete fire barrier compartmentation',
            'Connects to building fire alarm panel (FACP) with thermal fusible link fallback (72°C)',
            'Allows 2-stage drop: pauses at 1.5 m for egress, then seals completely'
          ]
        },
        {
          id: 'safety-edge',
          name: 'Optical Safety Light Curtains & Wireless Bottom Edge',
          badge: 'Obstacle Protection',
          icon: 'Shield',
          range: 'Full Clear Width & Height',
          speed: '< 20 ms Auto-Reverse Signal',
          summary: 'Wireless conductive rubber safety profile along the bottom slat instantly commands the motor to stop and reverse if it touches any obstruction.',
          highlights: [
            'Wireless RF transmitter eliminates tangled spiral coil cables on the curtain',
            'Optional thru-beam infrared photocell pairs cross the entrance threshold',
            'Meets EN 12453 safety regulations for power-operated industrial doors'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Command Signal',
        desc: 'Push button, key switch or fire alarm input',
        detail: 'Operator triggers push button station or remote transmitter; controller tests safety circuits.'
      },
      {
        step: 2,
        title: 'Electromagnetic Brake Release',
        desc: 'Motor brake disengages & motor spools barrel',
        detail: 'Motor brake releases and high-torque side gear spools the steel curtain around the top axle.'
      },
      {
        step: 3,
        title: 'Smooth Travel & Safety Monitoring',
        desc: 'Curtain glides in deep steel side guides',
        detail: 'Interlocking steel slats glide smoothly inside heavy guide channels with nylon wear-strips.'
      },
      {
        step: 4,
        title: 'Limit Lock & Mechanical Sealing',
        desc: 'Auto stop at limits & bottom weather seal',
        detail: 'Rotary limit switch cuts power; heavy bottom bar seals against floor with EPDM rubber gasket.'
      }
    ],
    applications: [
      { title: 'Heavy Industrial Factories & Warehouses', image: '/services/services-heavy-security.jpg' },
      { title: 'Commercial Malls & Shopping Complexes', image: '/products/motorized-rolling-shutters.jpg' },
      { title: 'Data Centers & Server Farm Containment', image: '/products/fire-rated-steel-doors.jpg' },
      { title: 'Aircraft Hangars & Shipyard Portals', image: '/services/service-hangar-doors.jpg' },
      { title: 'Chemical & Hazardous Material Depots', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Bank Vaults & High-Security Logistics', image: '/services/services-hero-access.jpg' }
    ],
    specs: [
      { label: 'Slat Material & Profile', value: 'Galvanized Steel, Galvalume, or Extruded Aluminum (0.8–1.5 mm)' },
      { label: 'Maximum Shutter Size', value: 'Up to 12,000 mm (W) x 10,000 mm (H) single barrel' },
      { label: 'Fire Rating Integrity', value: 'Up to 4 Hours (240 Minutes) – BS 476 Part 22 & EN 1634-1' },
      { label: 'Wind Load Resistance', value: 'Class 3 to Class 5 (Wind speed resistance up to 180 km/h)' },
      { label: 'Drive Motor System', value: 'Heavy side-mount chain drive (300 kg to 2,500 kg lifting capacity)' },
      { label: 'Emergency Manual Operation', value: 'Integrated manual haul chain for effortless hand lifting' },
      { label: 'Safety Devices', value: 'Anti-drop fall arrest safety brake & wireless safety edge bumper' },
      { label: 'Finish & Coating', value: 'Hot-dip galvanized zinc coated or architectural powder coating' }
    ],
    certs: [
      { name: 'BS 476: Part 22 – Fire Tests on Building Materials', sub: 'Certified 2 to 4 hour fire containment integrity for passive fire barriers' },
      { name: 'EN 1634-1 – Fire Resistance & Smoke Control', sub: 'European standard for motorized fire door and shutter assemblies' },
      { name: 'EN 12604 & EN 12453 – Mechanical & Safety Devices', sub: 'Mandatory anti-fall centrifugal safety brake and obstacle detection compliance' },
      { name: 'ISO 9001:2015 – Certified Manufacturing', sub: 'Standardized cold roll forming, robotic welding, and motor bench torque testing' },
      { name: 'IS 6248 – Indian Standard for Metal Rolling Shutters', sub: 'Fully compliant with Bureau of Indian Standards (BIS) specifications' }
    ],
    gallery: [
      { title: 'Industrial Rolling Shutter', image: '/products/motorized-rolling-shutters.jpg', category: 'Industrial Access', desc: 'Heavy galvanized steel motorized shutter for factory bay' },
      { title: 'Fire-Rated Rolling Shutter', image: '/products/fire-rated-steel-doors.jpg', category: 'Fire Protection', desc: '4-hour fire-rated automatic descent shutter in commercial complex' },
      { title: 'Insulated Roller Shutter', image: '/services/services-heavy-security.jpg', category: 'Thermal Protection', desc: 'Double-skin polyurethane insulated shutter reducing factory heat' },
      { title: 'Aircraft Hangar Large Door', image: '/services/service-hangar-doors.jpg', category: 'Aviation Access', desc: 'Extra-wide motorized rolling shutter with wind-lock end clips' },
      { title: 'Logistics Warehouse Bay Shutter', image: '/hero-industrial-doors-dock.jpg', category: 'Logistics Facility', desc: 'Motorized roller shutter integrated with dock leveller and shelter' },
      { title: 'Corporate Security Shutter', image: '/services/services-hero-access.jpg', category: 'Commercial Security', desc: 'Perimeter automated security shutter with key switch control' }
    ],
    faqs: [
      {
        q: 'How does a fire-rated rolling shutter operate during a fire emergency?',
        a: 'When an alarm signal is received from the building fire alarm panel (or when the backup 72°C thermal fusible link melts), the motor electromagnetic brake disengages. The shutter descends under gravity at a controlled, safe speed of 0.15 m/s, regulated by a mechanical centrifugal governor, even if the electrical power has completely failed.'
      },
      {
        q: 'How does the shutter open if there is a complete power outage?',
        a: 'All HTI industrial side-mount motors include a built-in heavy manual haul chain. A staff member simply pulls the hand chain from the ground to raise the shutter smoothly without electricity. Optional 24V UPS battery backup systems are also available.'
      },
      {
        q: 'What is an Anti-Drop Safety Brake and why is it essential?',
        a: 'An anti-drop brake is a mandatory mechanical safety device mounted on the non-drive end of the shutter barrel. In the unlikely event of motor gearbox failure or drive chain breakage, internal centrifugal pawls instantly lock into a heavy ratchet gear, arresting the falling shutter in less than 0.1 seconds to prevent injury or equipment damage.'
      },
      {
        q: 'What are Wind-Lock clips and when are they needed?',
        a: 'In wide openings (over 5 meters) or coastal sites exposed to strong winds, wind pressure can pull standard slats out of their guide channels. Wind-lock clips are heavy steel anchors riveted to every slat end that hook inside specially shaped channel tracks, locking the curtain securely against cyclonic wind pressure.'
      },
      {
        q: 'What is the advantage of Insulated Rolling Shutters over standard single-skin shutters?',
        a: 'Insulated shutters feature double-skin steel or aluminum slats filled with high-density polyurethane (PUF) insulation. This cuts thermal heat transfer by over 70%, dampens exterior industrial noise by up to 25 dB, and prevents condensation build-up inside air-conditioned factories and cold stores.'
      }
    ],
    cta: {
      tag: 'HEAVY INDUSTRIAL SITE SECURITY',
      title: 'Protect Your Premises with HTI Motorized Rolling Shutters',
      desc: 'Contact HTI engineering for site surveys, custom CAD specifications, fire safety certifications, and turnkey installations across India.'
    }
  }
};
