/**
 * Comprehensive Product Page Data for:
 * 1. Door Interlock (2-8 Door)
 * 2. Pass Box Systems
 * 3. Digital Clocks
 * 4. Chiller & Cleanroom Doors
 * 5. Acoustic Sound Doors
 * 6. Safety Override Buzzers
 * 
 * Modeled on the exact architecture and layout of Touchless Entry & Industrial Access pages.
 */

export const CLEANROOM_PAGES = {
  // =========================================================================
  // 1. DOOR INTERLOCK (2-8 DOOR)
  // =========================================================================
  'door-interlock-system': {
    slug: 'door-interlock-system',
    categoryName: 'Cleanroom Interlocks & Pass Boxes',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'cleanroom-interlocks' },
      { label: 'Cleanroom Interlocks & Pass Boxes', page: 'cleanroom-interlocks' },
      { label: 'Door Interlock (2-8 Door)', isCurrent: true }
    ],
    badge: 'USFDA 21 CFR PART 11 | cGMP CLEANROOM | PRESSURE CASCADE',
    titleLine1: 'Door Interlock (2-8 Door)',
    titleLine2Accent: 'Systems',
    tagline: 'Sterile. Microcontroller Logic. Zero Air Leakage.',
    description: 'Advanced programmable cleanroom door interlocking systems supporting 2 to 8 doors across personnel airlocks (PAL), material airlocks (MAL), and sterile change rooms. Eliminates simultaneous door openings, preserving positive/negative differential pressure cascades.',
    metrics: [
      { label: '2 to 8 Door Programmable Logic', icon: 'Settings' },
      { label: '0.05s Millisecond Lock Relay', icon: 'Zap' },
      { label: 'USFDA & ISO 14644 Compliant', icon: 'Award' },
      { label: 'Audio-Visual Red/Green Status', icon: 'Sparkles' }
    ],
    heroImage: '/hero-cleanroom-interlock-chamber.jpg',
    heroStatusBadge: 'Sterile Differential Pressure Active',
    benefits: [
      {
        title: 'Zero Cross-Contamination',
        desc: 'Prevents simultaneous opening of entry/exit doors, containing airborne particulate cascades.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Flameproof (Ex-d) & Safe Enclosures',
        desc: 'ATEX & PESO certified flameproof station housings for hazardous solvent and chemical rooms.',
        icon: 'Shield'
      },
      {
        title: 'Fail-Safe Fire Alarm Trip',
        desc: 'Instantly releases all electromagnetic locks upon building fire alarm activation or emergency override.',
        icon: 'Zap'
      },
      {
        title: 'Magnetic Lock Feedback',
        desc: '600 lbs / 1200 lbs electromagnetic shear locks with Hall effect bonded door status sensors.',
        icon: 'Lock'
      },
      {
        title: 'Custom Programmable Logic',
        desc: 'Flexible priority cascading, multi-room zoning, and cleanroom air shower purge timer sequencing.',
        icon: 'Sparkles'
      }
    ],
    showcase: {
      videoSrc: '/automatic_sliding.mp4',
      poster: '/hero-cleanroom-interlock-chamber.jpg',
      eyebrow: 'PHARMA STERILITY DEMONSTRATION',
      heading: 'Cleanroom Door Interlocking in Action',
      description: 'Observe our microcontroller interlock coordinate sequential door releases and LED traffic lights, safeguarding positive air pressure between ISO Class 5, 7, and 8 clean zones.',
      features: [
        'Microprocessor logic controller with opto-isolated inputs',
        'Instantaneous electromagnetic lock release (< 40ms)',
        'Integrated audio buzzer alarm for doors held open > 30s',
        'Seamless dry contact BMS & access control interface'
      ]
    },
    productsTitle: 'Our Door Interlock Products',
    products: [
      {
        title: '2-Door Microcontroller Interlock System',
        badge: '2-Door | Standard PAL/MAL',
        image: '/hero-cleanroom-interlock-chamber.jpg',
        chips: ['2-Door Logic', 'Touchless Wave', 'Auto-Timed Release'],
        desc: 'Compact microcontroller unit designed for 2-door airlocks in pharma corridors, microbiology labs, and sterile change rooms.',
        bullets: [
          'Dual Red/Green status LED indicators on each door',
          'Touchless wave sensor or soft-touch push button activation',
          'Programmable hold-open timer with door-ajar buzzer alert'
        ]
      },
      {
        title: '4-Door Multi-Zone Airlock Controller',
        badge: '4-Door | Priority Cascades',
        image: '/products/cleanroom-interlocks.jpg',
        chips: ['4-Door Cascade', 'Priority Logic', 'Differential Pressure'],
        desc: 'Intelligent multi-room interlock coordinating 4 doors across gowning, de-gowning, and sterile buffer preparation suites.',
        bullets: [
          'Configurable room priority and one-way directional flow',
          'Interlocked integration with cleanroom pass box hatches',
          'Emergency panic breakout with BMS alarm relay feedback'
        ]
      },
      {
        title: '8-Door Enterprise PLC Interlock Panel',
        badge: '8-Door | PLC Automation',
        image: '/services/service-cleanroom.jpg',
        chips: ['8-Door PLC', 'SCADA / BMS Modbus', 'Touchscreen HMI'],
        desc: 'Centralized PLC-based cleanroom automation controlling up to 8 interlocked doors across large sterile formulation manufacturing complexes.',
        bullets: [
          'Industrial PLC controller with Modbus / Ethernet IP output',
          'Touchscreen HMI door status display for plant supervisors',
          'Optically isolated inputs immune to plant electrical noise'
        ]
      },
      {
        title: 'Flameproof (Ex-d) Cleanroom Interlock',
        badge: 'Flameproof | Zone 1 & 2',
        image: '/case-studies/case-ss304-mist.jpg',
        chips: ['ATEX / PESO Ex-d', 'Solvent Bays', 'Gas Group IIA/IIB'],
        desc: 'Explosion-proof door interlock stations engineered for bulk drug active pharmaceutical ingredient (API) and solvent handling zones.',
        bullets: [
          'Heavy cast aluminium alloy LM6 flameproof enclosure',
          'Certified for Gas Groups IIA, IIB, and IIC hazardous areas',
          'Intrinsically safe Zener barrier interface for door sensors'
        ]
      }
    ],
    technologies: {
      eyebrow: 'MICROCONTROLLER & LOCK ARCHITECTURE',
      title: 'Precision Microprocessor Logic & Magnetic Holding',
      subtitle: 'Opto-isolated logic circuits, Hall-effect magnetic feedback, and failsafe building automation integration.',
      tabs: [
        {
          id: 'microcontroller-logic',
          name: 'Microcontroller Opto-Isolated Logic Core',
          badge: 'Solid-State Reliability',
          icon: 'Settings',
          range: '2 to 8 Door Programmable Sequencing',
          speed: '< 30 ms Logic Execution Speed',
          summary: 'Industrial 32-bit microcontroller processor with opto-isolated inputs protects against voltage surges, electromagnetic noise, and false triggers.',
          highlights: [
            'Solid-state relay drivers provide millions of silent switching cycles',
            'Independent door timer potentiometers adjustable from 0 to 90 seconds',
            'Non-volatile EEPROM memory retains configuration during facility power cuts'
          ],
          standard: 'USFDA 21 CFR Part 11 & cGMP',
          ipRating: 'IP65 Flush Mount Front'
        },
        {
          id: 'em-shear-locks',
          name: 'Electromagnetic 600 / 1200 lbs Shear Locks',
          badge: 'Fail-Safe Locking',
          icon: 'Lock',
          range: '600 lbs (280 kg) / 1200 lbs (540 kg)',
          speed: 'Zero Residual Magnetism Release',
          summary: 'Electromagnetic armature plates mounted in door frame header deliver immense holding force while releasing instantaneously upon power cutoff.',
          highlights: [
            'Built-in Hall-effect magnetic sensor confirms door is physically locked',
            'Anti-residual magnetism kick-off pin guarantees instantaneous door opening',
            'Anodized aluminum housing with zinc-plated armature plate resists corrosion'
          ],
          standard: 'EN 13637 & ANSI/BHMA A156.23',
          ipRating: 'IP54 / IP67 Sealed Available'
        },
        {
          id: 'touchless-wave-station',
          name: 'Touchless Infrared Wave & Status Station',
          badge: 'Sterile Touchless Activation',
          icon: 'Radio',
          range: '3 cm – 10 cm Contactless Trigger',
          speed: '< 20 ms Detection Latency',
          summary: 'Micro-optical infrared proximity sensors eliminate physical contact, keeping hands sterile during passage between cleanroom suites.',
          highlights: [
            'High-luminance dual-color LED halo (Green = Enter, Red = Interlocked Wait)',
            'Stainless steel SS 304 satin finish faceplate flush with wall partition',
            'Resistant to aggressive chemical cleanroom sanitizers (IPA, Spor-Klenz)'
          ],
          standard: 'ISO 14644-1 Cleanroom Standards',
          ipRating: 'IP65 Water & Dust Resistant'
        },
        {
          id: 'fire-bms-failsafe',
          name: 'Fail-Safe Fire Alarm & Emergency Breakout',
          badge: 'Life Safety Priority',
          icon: 'ShieldCheck',
          range: '24V DC Dedicated Emergency Loop',
          speed: 'Instantaneous Hardware Cutoff',
          summary: 'Hardware-level fail-safe relay automatically cuts power to all magnetic locks upon building fire alarm trip, allowing effortless egress.',
          highlights: [
            'Complies with NFPA 101 Life Safety Code and National Building Code',
            'Dedicated Emergency Push Button station with illuminated reset key',
            'Auxiliary dry contact alarm output connects directly to central facility BMS'
          ],
          standard: 'NFPA 101 & NBC 2016 Compliant',
          ipRating: 'IP55 / IP65 Station'
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Approach & Status Check',
        desc: 'Operator checks Red/Green LED indicator',
        detail: 'The station display shows Green (Safe to Enter) if the airlock chamber is clear and opposite doors are securely locked.'
      },
      {
        step: 2,
        title: 'Touchless Request',
        desc: 'Hand waved in front of optical switch',
        detail: 'Infrared wave sensor registers command without surface contact, sending opto-isolated trigger signal to central controller.'
      },
      {
        step: 3,
        title: 'Door Release & Interlock Latch',
        desc: 'Magnetic lock releases, opposite doors locked',
        detail: 'Controller releases current to electromagnetic lock; all other doors in the cascade immediately lock with Red LED status.'
      },
      {
        step: 4,
        title: 'Auto-Close & Cascade Reset',
        desc: 'Door closes, hold-open time resets',
        detail: 'Magnetic door contact detects full closure; after programmable pressure stabilization time, system returns to ready state.'
      }
    ],
    applications: [
      { title: 'Sterile Pharma Formulation Bays', image: '/hero-cleanroom-interlock-chamber.jpg' },
      { title: 'Biosafety Level (BSL-2/3/4) Labs', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Semiconductor Fabrication Cleanrooms', image: '/services/service-cleanroom.jpg' },
      { title: 'API & Bulk Drug Solvent Zones', image: '/case-studies/case-ss304-mist.jpg' },
      { title: 'Hospital Operation Theatres & Isolation', image: '/products/automatic-doors-hospital.jpg' },
      { title: 'Biotech Injectable Suites', image: '/products/cleanroom-door-pharma.jpg' }
    ],
    specs: [
      { label: 'System Capacity', value: '2, 3, 4, 6, or 8 doors per central controller unit' },
      { label: 'Operating Power Supply', value: '230V AC ± 10%, 50Hz Single Phase (Internal 12V/24V DC UPS)' },
      { label: 'Lock Holding Capacity', value: '600 lbs (280 kg) / 1200 lbs (540 kg) electromagnetic shear locks' },
      { label: 'Door Release Response Time', value: '< 40 milliseconds instantaneous opto-relay trigger' },
      { label: 'Programmable Hold-Open Timer', value: '0 to 90 seconds (field adjustable via potentiometer/dipswitch)' },
      { label: 'Door-Held-Open Buzzer Alert', value: 'Integrated 85 dB audible buzzer sounds after 30s preset delay' },
      { label: 'Emergency Override Interface', value: 'Dedicated hardware fire alarm trip input + emergency push station' },
      { label: 'Fascia & Housing Material', value: 'Stainless Steel SS 304 satin finish / Flameproof cast aluminium LM6' }
    ],
    certs: [
      { name: 'USFDA 21 CFR Part 11 Compliance', sub: 'Standardized contamination barrier and audit-ready cleanroom logging' },
      { name: 'ISO 14644-1 Cleanroom Classification', sub: 'Tested for airborne particulate containment in ISO Class 5, 7, and 8 zones' },
      { name: 'ATEX / PESO Flameproof Certification', sub: 'Certified for Gas Groups IIA and IIB in hazardous solvent preparation bays' },
      { name: 'CE Conformity & RoHS Compliant', sub: 'Complies with European EMC, LVD, and environmentally safe electronics' },
      { name: 'ISO 9001:2015 Quality Management', sub: 'Factory tested across 1,000,000+ continuous lock/release switching cycles' }
    ],
    gallery: [
      { title: 'Pharma Airlock Interlock Panel', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Cleanroom Engineering', desc: 'Flush-mounted 3-door cleanroom airlock with dual-color LED indicators' },
      { title: 'Dynamic Pass Box with Interlock', image: '/products/pass-box-system.jpg', category: 'Pharma Pass Box', desc: 'Stainless steel pass box hatch with interlocked magnetic door lock' },
      { title: 'Sterile Formulation Gowning Area', image: '/products/cleanroom-interlocks.jpg', category: 'Sterile Facility', desc: 'Personnel airlock door interlock with touchless wave sensors' },
      { title: 'Cleanroom Flush Door Assembly', image: '/products/cleanroom-door-pharma.jpg', category: 'Pharma Cleanroom', desc: 'Hermetic flush door paired with electromagnetic shear locking unit' },
      { title: 'Active Chemical Cleanroom Suite', image: '/case-studies/case-ss304-mist.jpg', category: 'Solvent Cleanroom', desc: 'Flameproof door interlock with integrated emergency breakout push' },
      { title: 'Biotech Cleanroom Cascade', image: '/hero-cleanroom-automation.jpg', category: 'Biotechnology', desc: 'Multi-room pressure cascading interlock maintaining sterile barriers' }
    ],
    faqs: [
      {
        q: 'How does the door interlock maintain cleanroom pressure cascades?',
        a: 'In pharmaceutical ISO Class 5 to 8 facilities, adjacent rooms operate at different pressure differentials (e.g. +15 Pa, +30 Pa, +45 Pa). The HTI door interlock ensures that entry and exit doors in an airlock can never open at the same time, preventing air pressure from equalizing and containing airborne contaminants.'
      },
      {
        q: 'What happens in the event of a fire or emergency evacuation?',
        a: 'Safety is the paramount priority. The system features a hardware-level fail-safe loop connected directly to the facility Fire Alarm Panel (FAP). In the event of a fire trigger, mains power loss, or emergency push button press, all electromagnetic locks de-energize instantly, allowing free emergency egress.'
      },
      {
        q: 'Can the interlock controller connect to our building BMS or SCADA system?',
        a: 'Yes. Every HTI cleanroom interlock controller includes volt-free dry contact outputs and optional Modbus RS485 communication ports that transmit live door status, door-ajar alarms, and emergency override logs to central Building Management Systems.'
      },
      {
        q: 'What is the purpose of the door-held-open buzzer?',
        a: 'If a cleanroom door is propped open or held past the pre-programmed hold-open time (typically 30 to 45 seconds), the built-in 85 dB buzzer sounds an audio warning to prompt personnel to close the door immediately, protecting sterile room integrity.'
      },
      {
        q: 'Are flameproof (Ex-d) models available for solvent dispensing rooms?',
        a: 'Yes. For API, bulk drug manufacturing, and chemical formulation suites where flammable solvent vapors exist, HTI provides ATEX and PESO certified cast aluminium flameproof enclosures rated for Gas Groups IIA, IIB, and Zone 1/2 environments.'
      }
    ],
    cta: {
      tag: 'TURNKEY CLEANROOM INTERLOCK ENGINEERING',
      title: 'Protect Your Cleanroom Cascades with HTI Interlocks',
      desc: 'Get full turnkey engineering consultation, custom multi-door wiring schematics, and USFDA/cGMP compliant installation across India.'
    }
  },

  // =========================================================================
  // 2. PASS BOX SYSTEMS
  // =========================================================================
  'pass-box-systems': {
    slug: 'pass-box-systems',
    categoryName: 'Cleanroom Interlocks & Pass Boxes',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'cleanroom-interlocks' },
      { label: 'Cleanroom Interlocks & Pass Boxes', page: 'cleanroom-interlocks' },
      { label: 'Pass Box Systems (Static & Dynamic)', isCurrent: true }
    ],
    badge: 'ISO 14644 CLASS 5 | UV STERILIZATION | MATERIAL TRANSFER',
    titleLine1: 'Pass Box',
    titleLine2Accent: 'Systems',
    tagline: 'Static & Dynamic. Airtight Transfer. Contamination Barrier.',
    description: 'Turnkey stainless steel 304/316 Static and Dynamic cleanroom pass boxes engineered for contamination-free material transfers between classified pharmaceutical suites. Features HEPA laminar flow showers, germicidal UV-C disinfection, and mechanical/electromagnetic door interlocking.',
    metrics: [
      { label: 'ISO Class 5 Laminar Airflow', icon: 'Award' },
      { label: '99.997% @ 0.3μm HEPA Filter', icon: 'ShieldCheck' },
      { label: 'UV-C Germicidal Decontamination', icon: 'Sparkles' },
      { label: 'SS 304/316 Mirror Coved Corners', icon: 'Layers' }
    ],
    heroImage: '/products/pass-box-system.jpg',
    heroStatusBadge: 'Dynamic HEPA Downflow Active',
    benefits: [
      {
        title: 'Eliminates Personnel Cross-Traffic',
        desc: 'Transfer raw materials, packaging, and vials between clean zones without personnel moving.',
        icon: 'ShieldCheck'
      },
      {
        title: 'HEPA Purge & ISO Class 5 Shower',
        desc: 'Dynamic pass box recirculating vertical downflow scrubs particulate off transferred goods.',
        icon: 'Award'
      },
      {
        title: 'UV-C Interlocked Disinfection',
        desc: 'Timer-controlled 254nm germicidal UV lamp automatically sterilizes chamber surfaces.',
        icon: 'Sparkles'
      },
      {
        title: 'Airtight Electromagnetic Interlock',
        desc: 'Doors are cross-interlocked so that both sides cannot be opened simultaneously.',
        icon: 'Lock'
      },
      {
        title: 'Coved Seamless Corners',
        desc: 'Seamless radius internal corners prevent dust accumulation and allow easy wipe-down cleaning.',
        icon: 'Layers'
      }
    ],
    showcase: {
      videoSrc: '/automatic_sliding.mp4',
      poster: '/products/pass-box-system.jpg',
      eyebrow: 'MATERIAL TRANSFER DEMONSTRATION',
      heading: 'Dynamic Pass Box in Action',
      description: 'Observe the automated decontamination cycle of our dynamic pass boxes: UV-C germicidal sterilization, HEPA downflow purging, and interlocking door seals preventing room-to-room air exchange.',
      features: [
        'Mini-pleat HEPA filter with 99.997% efficiency @ 0.3 microns',
        'Differential pressure Magnehelic gauge monitors filter load',
        'Electronic interlocking with emergency bypass push button',
        'Heavy-duty double-walled SS 304 construction'
      ]
    },
    productsTitle: 'Our Cleanroom Pass Box Products',
    products: [
      {
        title: 'Dynamic Cleanroom Pass Box',
        badge: 'Dynamic | HEPA Recirculation',
        image: '/products/pass-box-system.jpg',
        chips: ['HEPA Downflow', '0.45 m/s Airflow', 'Magnehelic Gauge'],
        desc: 'Self-contained laminar airflow pass box continuously washing transfer items with ISO Class 5 HEPA filtered air before door release.',
        bullets: [
          'High-efficiency dynamically balanced centrifugal blower',
          'Interlocked UV lamp with automated hour run meter',
          'DOP / PAO test aerosol injection and sampling ports'
        ]
      },
      {
        title: 'Static Cleanroom Pass Box',
        badge: 'Static | Clean-to-Clean',
        image: '/products/pass-box-chamber.jpg',
        chips: ['Mechanical Interlock', 'UV-C Lamp', 'SS 304 Body'],
        desc: 'Airtight transfer hatch for transferring materials between zones of equal cleanliness classification.',
        bullets: [
          'Robust mechanical or electromagnetic door interlocking',
          'Double-glazed toughened glass vision view window',
          'Internal coved corners for effortless aseptic sanitization'
        ]
      },
      {
        title: 'Floor-Mounted Trolley Pass Box',
        badge: 'Floor Mount | Heavy Cargo',
        image: '/products/pass-box-installed.jpg',
        chips: ['Full Height', 'Ramp Loading', 'Heavy Pallet Transfer'],
        desc: 'Full-height roll-in pass box designed for manual trolleys, pallet carts, and heavy drum container transfers.',
        bullets: [
          'Integral floor ramp eliminates elevation lifting',
          'Heavy-duty electromagnetic shear locks with audio alarm',
          'Air curtain nozzle array available for rapid particulate purge'
        ]
      },
      {
        title: 'Bio-Decontamination VHP Pass Box',
        badge: 'VHP | BSL-3 / Isolation',
        image: '/case-studies/case-cleanroom.jpg',
        chips: ['VHP Vapor Port', 'Inflatable Gasket', 'Hermetic Seal'],
        desc: 'Specialized bio-decontamination hatch equipped with Vaporized Hydrogen Peroxide (VHP) injection ports for high-containment suites.',
        bullets: [
          'Pneumatic inflatable silicone gaskets for zero-leak seal',
          'Integrated catalytic aeration converter for rapid cycle times',
          'Automated leak tightness testing compliant with ISO 10648-2'
        ]
      }
    ],
    technologies: {
      eyebrow: 'HEPA AIRFLOW & STERILITY ENGINEERING',
      title: 'Laminar Airflow Dynamics & Surface Sterilization',
      subtitle: 'HEPA downflow filtration, differential pressure monitoring, and germicidal UV-C cycle automation.',
      tabs: [
        {
          id: 'hepa-downflow',
          name: 'H14 HEPA Laminar Downflow Filtration',
          badge: 'ISO Class 5 Air Shower',
          icon: 'Award',
          range: '99.997% Efficiency @ 0.3μm',
          speed: '0.45 m/s (90 FPM) Face Velocity',
          summary: 'Vertical laminar downflow provides continuous ISO Class 5 air sweeping across transferring containers to scrub surface particulates.',
          highlights: [
            'Mini-pleated H14 glass fiber HEPA filter with aluminum separator',
            'Pre-filter EU4 rating protects main HEPA filter from coarse dust',
            'Internal perforated SS 304 diffuser screen delivers uniform laminar flow'
          ],
          standard: 'EN 1822 & ISO 14644-1',
          ipRating: 'IP65 Flush Mount'
        },
        {
          id: 'uv-c-sterilization',
          name: 'Germicidal UV-C Disinfection Lamp (254nm)',
          badge: 'Surface Decontamination',
          icon: 'Sparkles',
          range: '254 nm Ultraviolet Emission',
          speed: 'Programmable 0–30 min Cycle',
          summary: 'High-output ozone-free UV-C lamps eliminate 99.9% of surface bacteria and spores inside the chamber during the transfer interlock period.',
          highlights: [
            'Safety interlock turns UV lamp OFF automatically whenever any door opens',
            'Digital hour counter tracks UV tube operational lifespan (9000h rating)',
            'Reflective mirror-finished stainless steel interior amplifies UV intensity'
          ],
          standard: 'USFDA cGMP Guidelines',
          ipRating: 'Cleanroom Compatible'
        },
        {
          id: 'magnehelic-pressure',
          name: 'Differential Pressure Magnehelic Gauge',
          badge: 'Filter Integrity Monitoring',
          icon: 'Settings',
          range: '0 – 250 Pa (0 – 25 mm WC)',
          speed: 'Continuous Real-Time Display',
          summary: 'Front-mounted Dwyer Magnehelic gauge continuously displays pressure drop across the HEPA filter to identify filter saturation.',
          highlights: [
            'Clearly marked green/red zones indicate normal vs clogged filter state',
            'Flush-mounted into cleanroom partition with zero surface ledge',
            'High-accuracy diaphragm mechanism requires zero external power'
          ],
          standard: 'ISO 14644-3 Filter Testing',
          ipRating: 'Cleanroom Flush Mount'
        },
        {
          id: 'electronic-interlock',
          name: 'Cross-Door Electromagnetic Interlock',
          badge: 'Hermetic Isolation',
          icon: 'Lock',
          range: 'Dual Electromagnetic Locks',
          speed: '< 25 ms Latch Lockout',
          summary: 'Microprocessor interlocking circuit ensures that opening one door instantly locks the opposite door, preventing cross-room air exchange.',
          highlights: [
            'Audio-visual LED traffic status on both dirty and clean sides',
            'Emergency override button on both sides for life safety compliance',
            'Food-grade silicone rubber gaskets guarantee airtight compression'
          ],
          standard: 'USFDA 21 CFR Part 11',
          ipRating: 'IP65 Wash-Down Resistant'
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Open Dirty-Side Door',
        desc: 'Place material inside chamber',
        detail: 'Operator opens entry door (clean-side door remains locked) and places container on stainless steel interior coved floor.'
      },
      {
        step: 2,
        title: 'Door Closes & Seal Engages',
        desc: 'Both doors locked simultaneously',
        detail: 'Magnetic door switch detects full closure; controller locks both doors and initiates the automated decontamination sequence.'
      },
      {
        step: 3,
        title: 'HEPA Purge & UV Sterilization',
        desc: 'Laminar air shower and UV-C lamp run',
        detail: 'HEPA blower provides 0.45 m/s laminar air shower while 254nm UV-C lamp neutralizes airborne and surface biological contaminants.'
      },
      {
        step: 4,
        title: 'Clean-Side Door Release',
        desc: 'Clean-side operator retrieves items',
        detail: 'Following cycle completion, clean-side indicator turns Green; operator opens door and retrieves sterile material.'
      }
    ],
    applications: [
      { title: 'Sterile Injectable Filling Lines', image: '/products/pass-box-system.jpg' },
      { title: 'Quality Control Microbiology Labs', image: '/products/pass-box-chamber.jpg' },
      { title: 'Active Pharmaceutical Ingredients (API)', image: '/case-studies/case-ss304-mist.jpg' },
      { title: 'Biotechnology & Vaccine Production', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Hospital Central Sterile Supply (CSSD)', image: '/products/pass-box-installed.jpg' },
      { title: 'Semiconductor Wafer Processing', image: '/services/service-cleanroom.jpg' }
    ],
    specs: [
      { label: 'Chamber Internal Dimensions', value: '600x600x600 mm / 750x750x750 mm / 900x900x900 mm (Custom built)' },
      { label: 'External Construction Material', value: 'Stainless Steel SS 304 / SS 316L (1.5mm thickness, 240-grit satin finish)' },
      { label: 'HEPA Filtration Efficiency', value: 'H14 Grade mini-pleated HEPA filter (99.997% @ 0.3 micron rating)' },
      { label: 'Blower & Airflow Velocity', value: 'Dynamically balanced centrifugal fan delivering 0.45 m/s ± 20%' },
      { label: 'UV-C Disinfection Lamp', value: 'Philips 254nm germicidal ultraviolet lamp with automated run-hour counter' },
      { label: 'Door Interlocking Mechanism', value: 'Fail-safe electromagnetic locks (300 kg holding force) with manual override' },
      { label: 'Differential Pressure Gauge', value: 'Dwyer Magnehelic gauge (0-25 mm WC / 0-250 Pa) with calibration certificate' },
      { label: 'Power Supply & Consumption', value: '230V AC, 50Hz, Single Phase (Operating power: 150W Static / 450W Dynamic)' }
    ],
    certs: [
      { name: 'ISO 14644-1 Cleanroom Compliance', sub: 'Certified for ISO Class 5 particulate cleanliness standards inside chamber' },
      { name: 'USFDA cGMP Schedule M Standard', sub: 'Meets sanitary requirements for sterile material transfer between classified rooms' },
      { name: 'DOP / PAO Filter Integrity Certified', sub: 'Factory tested with poly-alpha-olefin aerosol with zero leak penetration' },
      { name: 'CE Electrical & Machinery Safety', sub: 'Conforms to 2006/42/EC Machinery Directive and Low Voltage Safety standards' },
      { name: 'ISO 9001:2015 Quality Manufacturing', sub: 'Precision CNC laser cut, TIG welded, and mirror-polished coved internal radius' }
    ],
    gallery: [
      { title: 'Dynamic Pass Box with Magnehelic Gauge', image: '/products/pass-box-system.jpg', category: 'Dynamic Pass Box', desc: 'SS304 Dynamic pass box with HEPA filtration and differential pressure meter' },
      { title: 'Coved Stainless Steel Interior', image: '/products/pass-box-chamber.jpg', category: 'Chamber Design', desc: 'Mirror-polished coved radius corners preventing particle buildup' },
      { title: 'Cleanroom Partition Installation', image: '/products/pass-box-installed.jpg', category: 'Cleanroom Wall', desc: 'Flush-mounted pass box integrated between ISO Class 7 and Class 5 suites' },
      { title: 'Pharma Cleanroom Material Air Shower', image: '/services/service-cleanroom.jpg', category: 'Airlock Hatch', desc: 'Automated interlocked hatch with dual-side traffic LED light panels' },
      { title: 'Sterile Biopharma Transfer Hatch', image: '/case-studies/case-cleanroom.jpg', category: 'Bio-Containment', desc: 'VHP compatible pass box with inflatable airtight perimeter seals' },
      { title: 'Cleanroom Interlock Wall System', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Integrated Airlock', desc: 'Pass box paired with multi-door interlocking cleanroom airlock' }
    ],
    faqs: [
      {
        q: 'What is the main difference between a Static Pass Box and a Dynamic Pass Box?',
        a: 'A Static Pass Box is used between two areas of equal cleanliness (e.g. Class C to Class C). It has electromagnetic interlocking doors and a UV lamp, but no internal airflow. A Dynamic Pass Box is used between areas of different cleanliness (e.g. Class D to Class B). It acts as a miniature laminar airflow unit, providing 0.45 m/s HEPA filtered ISO Class 5 vertical downflow air to actively cleanse materials.'
      },
      {
        q: 'Why are coved internal corners essential in pharmaceutical pass boxes?',
        a: 'Sharp 90-degree internal corners trap dust, microbial spores, and cleaning chemicals, making them difficult to sanitize. HTI pass boxes feature seamless radius coved corners that allow thorough antiseptic wipe-downs compliant with USFDA and cGMP standards.'
      },
      {
        q: 'What safety systems protect personnel from UV-C radiation exposure?',
        a: 'UV-C radiation at 254nm is harmful to eyes and skin. HTI pass boxes feature intelligent safety interlocks: the UV lamp operates only when both doors are fully closed. The instant either door is unlocked or opened, the controller immediately deactivates the UV lamp.'
      },
      {
        q: 'How often does the HEPA filter inside a Dynamic Pass Box require replacement?',
        a: 'Under standard pharmaceutical cleanroom conditions with clean pre-filtration, H14 HEPA filters typically last 3 to 5 years. The front-mounted Dwyer Magnehelic gauge monitors pressure drop; when resistance doubles past initial clean resistance (typically > 250 Pa), filter replacement is recommended.'
      },
      {
        q: 'Can pass boxes be customized for floor trolley or pallet loading?',
        a: 'Yes. HTI manufactures floor-mounted trolley pass boxes with built-in stainless steel entry ramps, allowing operators to roll mobile carts, vessel dollies, and stainless steel containers directly into the chamber without heavy manual lifting.'
      }
    ],
    cta: {
      tag: 'TURNKEY CLEANROOM PASS BOX SOLUTIONS',
      title: 'Upgrade Your Cleanroom Material Transfers with HTI Pass Boxes',
      desc: 'Receive comprehensive engineering datasheets, dimensional CAD layouts, and validation support documents across India.'
    }
  },

  // =========================================================================
  // 3. DIGITAL CLOCKS (GPS SYNCHRONIZED)
  // =========================================================================
  'digital-clocks': {
    slug: 'digital-clocks',
    categoryName: 'Cleanroom Interlocks & Pass Boxes',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'cleanroom-interlocks' },
      { label: 'Cleanroom Interlocks & Pass Boxes', page: 'cleanroom-interlocks' },
      { label: 'Digital GPS & NTP Clocks', isCurrent: true }
    ],
    badge: 'GPS MASTER-SLAVE | USFDA CFR PART 11 | NTP SYNCHRONIZATION',
    titleLine1: 'Digital GPS',
    titleLine2Accent: 'Clocks',
    tagline: 'Precision. Synchronized. Flameproof. Time Integrity.',
    description: 'High-visibility cleanroom digital wall and panel clocks featuring GPS wireless receiver synchronization, TCP/IP NTP server integration, and flush SS 304 mounting. Engineered for pharmaceutical batch record compliance, sterile formulation suites, and corporate operations.',
    metrics: [
      { label: 'Microsecond GPS Sync Accuracy', icon: 'Zap' },
      { label: 'Flush SS304 Cleanroom Mount', icon: 'Shield' },
      { label: 'HH:MM:SS High-Lumen Display', icon: 'Activity' },
      { label: 'Flameproof Ex-d Option Available', icon: 'Award' }
    ],
    heroImage: '/products/digital-clock-hero.jpg',
    heroStatusBadge: 'GPS Satellite Time Lock Active',
    benefits: [
      {
        title: '100% USFDA Time Audit Compliance',
        desc: 'Eliminates time discrepancies in batch manufacturing records (BMR) and electronic logbooks.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Master-Slave Network Sync',
        desc: 'Central GPS/NTP master transmitter synchronizes hundreds of cleanroom secondary slave clocks.',
        icon: 'Zap'
      },
      {
        title: 'Flush Stainless Steel Front',
        desc: 'Zero surface ledges, wipe-down sanitization resistant, and IP65 wash-down front fascia.',
        icon: 'Shield'
      },
      {
        title: 'Flameproof Certified Housings',
        desc: 'Cast aluminium alloy flameproof (Ex-d) models suitable for hazardous solvent and chemical rooms.',
        icon: 'Award'
      },
      {
        title: 'Multi-Color High-Brightness LED',
        desc: 'Brilliant 2-inch or 4-inch 7-segment red, green, or amber display readable from 30+ meters.',
        icon: 'Sparkles'
      }
    ],
    showcase: {
      videoSrc: '/CCTV-Surveillance- &-Biometrics.mp4',
      poster: '/products/digital-clock-hero.jpg',
      eyebrow: 'TIME SYNCHRONIZATION SHOWCASE',
      heading: 'Precision Digital GPS Clocks in Action',
      description: 'Observe how HTI master GPS cleanroom clocks synchronize plant-wide secondary displays down to the microsecond, ensuring audit-proof batch recording across production floors.',
      features: [
        'High-sensitivity multi-satellite GPS antenna receiver',
        'Standard NTP / SNTP Ethernet LAN network compatibility',
        'Internal RTC backup battery keeps time during power cuts',
        'Flameproof Ex-d enclosure certified for Gas Groups IIA/IIB'
      ]
    },
    productsTitle: 'Our Digital Cleanroom Clock Products',
    products: [
      {
        title: 'Flush Mount Cleanroom GPS Clock (SS304)',
        badge: 'Flush Mount | IP65 Cleanroom',
        image: '/products/digital-clock-hero.jpg',
        chips: ['Flush Mount', 'GPS Wireless', 'IP65 Cleanroom'],
        desc: 'Ultra-slim stainless steel 304 cleanroom clock mounting completely flush into cleanroom modular wall panels.',
        bullets: [
          'High-brightness 2.3-inch / 4-inch Red or Green 7-segment LED',
          'Toughened non-glare acrylic front screen resistant to alcohol wipes',
          'Wireless GPS receiver maintains zero drift microsecond precision'
        ]
      },
      {
        title: 'Ethernet NTP / PoE Digital Clock',
        badge: 'PoE Powered | NTP Sync',
        image: '/products/digital-clock-wall.jpg',
        chips: ['PoE Powered', 'NTP Server', 'RJ45 LAN Interface'],
        desc: 'Network-synchronized digital clock powered directly over Ethernet (PoE 802.3af), syncing with central IT NTP servers.',
        bullets: [
          'Single RJ45 cable delivers power and precision time data',
          'Automatic Daylight Savings Time (DST) and time zone configuration',
          'Web browser management console with SNMP status alerts'
        ]
      },
      {
        title: 'Flameproof (Ex-d) Digital Clock',
        badge: 'Flameproof | Zone 1 & 2',
        image: '/products/digital-clock-industrial.jpg',
        chips: ['Gas Group IIA/IIB', 'Cast Aluminium', 'Zone 1 & 2 Approved'],
        desc: 'Heavy-duty explosion-proof clock engineered for petrochemical, refinery, and pharmaceutical chemical solvent handling suites.',
        bullets: [
          'Heavy cast aluminium alloy LM6 flameproof housing',
          'Certified for Gas Groups IIA, IIB, and IIC hazardous areas',
          'Toughened borosilicate glass window withstands explosion pressure'
        ]
      },
      {
        title: 'Master-Slave Dual Time Display (Local/UTC)',
        badge: 'Dual Time | Multi-Zone',
        image: '/products/alarm-annunciators-panel.jpg',
        chips: ['Dual Zone', 'UTC / Local Time', 'BMS RS485 Bus'],
        desc: 'Dual-row cleanroom clock displaying Local Indian Standard Time (IST) alongside Universal Coordinated Time (UTC) for multinational export labs.',
        bullets: [
          'Upper row displays Local Time, lower row displays UTC/GMT',
          'RS485 multi-drop 2-wire serial bus linking up to 64 slave clocks',
          'Programmable stop-watch and countdown timer mode for QC testing'
        ]
      }
    ],
    technologies: {
      eyebrow: 'GPS & NETWORK SYNCHRONIZATION',
      title: 'Satellite Time Synchronization & Solid-State Displays',
      subtitle: 'Multi-satellite GPS receivers, NTP Ethernet architecture, and long-life industrial LED displays.',
      tabs: [
        {
          id: 'gps-receiver',
          name: 'Multi-Satellite GPS Receiver Engine',
          badge: 'Satellite Time Lock',
          icon: 'Radio',
          range: 'Global GPS / GLONASS Satellites',
          speed: '< 1 μs Time Base Accuracy',
          summary: 'High-gain roof-mounted GPS antenna locks onto atomic satellite clocks, receiving UTC time data with zero cumulative drift.',
          highlights: [
            'Autonomous time lock requires zero manual date/time adjustment ever',
            'Surge-protected coaxial or RS485 antenna cable run up to 300 meters',
            'Automatic satellite acquisition within 60 seconds of cold startup'
          ],
          standard: 'USFDA 21 CFR Part 11 Audit Standard',
          ipRating: 'IP67 Outdoor Antenna'
        },
        {
          id: 'ntp-poe',
          name: 'TCP/IP NTP & Power-over-Ethernet (PoE)',
          badge: 'Network Infrastructure',
          icon: 'Cpu',
          range: 'Standard Cat6 LAN Network',
          speed: '10/100 Mbps Ethernet Interface',
          summary: 'Connects directly to enterprise corporate LAN networks, synchronizing with internal server NTP pools and drawing power via standard PoE.',
          highlights: [
            'Zero high-voltage AC wiring inside cleanroom wall cavities',
            'Centralized web GUI dashboard monitors all clock operational statuses',
            'Automatic email/SNMP alerts generated if synchronization signal drops'
          ],
          standard: 'IEEE 802.3af PoE Standard',
          ipRating: 'IP65 Cleanroom Front'
        },
        {
          id: 'seven-segment-led',
          name: 'Industrial High-Contrast 7-Segment LED',
          badge: 'High-Lumen Visibility',
          icon: 'Activity',
          range: '30+ Meters Viewing Distance',
          speed: '100,000 Hours Operational Life',
          summary: 'Super-bright 2.3-inch or 4-inch 7-segment alphanumeric LED characters encased in anti-glare scratch-resistant acrylic.',
          highlights: [
            'Available in Ultra-Red, Pure-Green, or Cobalt-Blue illumination',
            'Adjustable brightness dimming for darkened laboratory microscope rooms',
            'Solid-state design with zero flickering or viewing angle distortion'
          ],
          standard: 'RoHS Lead-Free Electronics',
          ipRating: 'Cleanroom Sanitizer Resistant'
        },
        {
          id: 'flameproof-housing',
          name: 'Ex-d Flameproof Cast Aluminium Housing',
          badge: 'Explosion-Proof Defense',
          icon: 'Award',
          range: 'Zone 1 & 2 Hazardous Locations',
          speed: 'Gas Group IIA, IIB, IIC Rated',
          summary: 'Cast aluminium alloy housing with flamepaths capable of containing internal explosions without igniting surrounding flammable atmospheres.',
          highlights: [
            'PESO (CCOE) and CMRI certified for explosive pharmaceutical zones',
            'Epoxy powder-coated finish resistant to acid fumes and solvent vapors',
            'Neoprene weather-proof gaskets provide complete IP65 protection'
          ],
          standard: 'IS/IEC 60079-1 & ATEX Directive',
          ipRating: 'IP65 Weatherproof'
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Satellite Time Acquisition',
        desc: 'GPS antenna locks to atomic satellites',
        detail: 'Roof-mounted GPS antenna receives atomic time signals from GPS satellite constellation, delivering UTC time down to the microsecond.'
      },
      {
        step: 2,
        title: 'Master Clock Processing',
        desc: 'Master clock converts to local time zone',
        detail: 'Master clock processor adds local time offset (+05:30 IST) and broadcasts standardized time code packets across network bus.'
      },
      {
        step: 3,
        title: 'Plant-Wide Distribution',
        desc: 'Time packets sent via RS485 or LAN',
        detail: 'Data packets travel via 2-wire RS485 serial bus or PoE Cat6 Ethernet cables to secondary slave clocks throughout cleanrooms.'
      },
      {
        step: 4,
        title: 'Synchronized Display Update',
        desc: 'All cleanroom clocks tick simultaneously',
        detail: 'Every secondary digital clock displays identical hours, minutes, and seconds, ensuring perfect audit trail synchronization.'
      }
    ],
    applications: [
      { title: 'Pharma Batch Manufacturing Suites', image: '/products/digital-clock-hero.jpg' },
      { title: 'Quality Control Analytical Labs', image: '/products/digital-clock-wall.jpg' },
      { title: 'Chemical Solvent & API Processing', image: '/products/digital-clock-industrial.jpg' },
      { title: 'Hospital Operation Theatres', image: '/products/automatic-doors-hospital.jpg' },
      { title: 'Biotechnology Research Centers', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Central Cleanroom Airlock Corridors', image: '/hero-cleanroom-interlock-chamber.jpg' }
    ],
    specs: [
      { label: 'Display Format', value: '6 Digits (HH:MM:SS) or 4 Digits (HH:MM) 12/24 hour selectable' },
      { label: 'Digit Display Height', value: '2.3 inches (58 mm) / 4.0 inches (100 mm) super-bright 7-segment LED' },
      { label: 'Time Source Synchronization', value: 'Wireless GPS Satellite Antenna / Ethernet NTP Server / RS485 Master Clock' },
      { label: 'Clock Accuracy', value: '± 1 microsecond synchronized (internal RTC drift < 1s/month during power cut)' },
      { label: 'Enclosure Material', value: 'Stainless Steel SS 304 flush plate (Cleanroom) / Cast Aluminium (Flameproof)' },
      { label: 'Operating Power Supply', value: '230V AC ± 10%, 50Hz / Power over Ethernet (PoE IEEE 802.3af)' },
      { label: 'Operating Temperature & Humidity', value: '0°C to +55°C, up to 95% RH non-condensing (IP65 front sealed)' },
      { label: 'Battery Backup Duration', value: 'Internal rechargeable lithium battery maintains timekeeping for 7+ years' }
    ],
    certs: [
      { name: 'USFDA 21 CFR Part 11 Compliance', sub: 'Guarantees audit-trail integrity for electronic batch record timestamps' },
      { name: 'ISO 14644 Cleanroom Sanitization', sub: 'Completely flush front fascia resistant to isopropyl alcohol sanitizers' },
      { name: 'PESO / ATEX Flameproof Certified', sub: 'Approved for Zone 1 and Zone 2 hazardous gas groups IIA, IIB, and IIC' },
      { name: 'CE Electrical & EMC Conformity', sub: 'Certified zero electromagnetic radiation interfering with cleanroom instruments' },
      { name: 'ISO 9001:2015 Quality Manufacturing', sub: '100% factory bench tested with continuous 72-hour burn-in cycles' }
    ],
    gallery: [
      { title: 'Cleanroom Flush Mounted GPS Clock', image: '/products/digital-clock-hero.jpg', category: 'Cleanroom Clock', desc: 'SS 304 flush mounted 6-digit red LED GPS cleanroom clock' },
      { title: 'Wall-Mount Secondary Digital Clock', image: '/products/digital-clock-wall.jpg', category: 'Wall Mounted', desc: 'High-visibility digital clock installed in pharmaceutical packaging bay' },
      { title: 'Flameproof (Ex-d) Industrial Clock', image: '/products/digital-clock-industrial.jpg', category: 'Explosion Proof', desc: 'Cast aluminium alloy flameproof digital clock for solvent suites' },
      { title: 'Master Clock Control Console', image: '/products/alarm-annunciators-panel.jpg', category: 'Central Control', desc: 'Centralized master clock console linking cleanroom slave units' },
      { title: 'Cleanroom Airlock Time Integration', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Pharma Airlock', desc: 'Digital clock synchronized with door interlock status panels' },
      { title: 'Sterile Biopharma Laboratory Suite', image: '/hero-cleanroom-automation.jpg', category: 'Biotech Lab', desc: 'Precision NTP synchronized clocks throughout sterile testing rooms' }
    ],
    faqs: [
      {
        q: 'Why is GPS clock synchronization mandatory in pharmaceutical manufacturing?',
        a: 'Regulatory agencies like the USFDA (under 21 CFR Part 11) require that all batch records, sample time logs, and sterilization records reflect verified, tamper-proof timestamps. GPS master-slave clocks ensure every clock in the facility displays identical, drift-free time derived from atomic satellites.'
      },
      {
        q: 'Can the clocks synchronize with our corporate IT NTP server instead of GPS?',
        a: 'Yes. HTI provides Ethernet NTP models with RJ45 ports that connect directly to your plant local area network (LAN). The clock continuously polls your internal NTP time server, synchronizing automatically without needing an external rooftop GPS antenna.'
      },
      {
        q: 'What happens to the clocks during a facility power blackout?',
        a: 'Every HTI digital clock contains an internal rechargeable lithium coin battery and Real-Time Clock (RTC) chip. During power failure, the display turns off to conserve power, but timekeeping continues internally. When power restores, the clock instantly displays the correct time without needing re-synchronization.'
      },
      {
        q: 'Are the clocks designed to withstand daily pharmaceutical chemical sanitization?',
        a: 'Yes. Our cleanroom clocks feature a seamless 1.5mm Stainless Steel SS 304 front fascia with a chemically bonded non-glare polycarbonate display window. The front is rated IP65, fully resistant to daily wash-downs with 70% Isopropyl Alcohol (IPA), Spor-Klenz, and chlorine disinfectants.'
      },
      {
        q: 'What display colors and digit sizes are available?',
        a: 'HTI cleanroom clocks are available in 2.3-inch (58mm) character height (readable up to 20 meters) and 4.0-inch (100mm) character height (readable up to 45 meters). Standard LED colors include Ultra-Red, Emerald-Green, and Amber-Yellow.'
      }
    ],
    cta: {
      tag: 'TURNKEY TIME SYNCHRONIZATION SYSTEMS',
      title: 'Ensure 100% Audit Compliance with HTI GPS Clocks',
      desc: 'Get turnkey site layout consultation, rooftop GPS cabling blueprints, and certified supply across India.'
    }
  },

  // =========================================================================
  // 4. CHILLER & CLEANROOM DOORS
  // =========================================================================
  'chiller-cleanroom-doors': {
    slug: 'chiller-cleanroom-doors',
    categoryName: 'Cleanroom Interlocks & Pass Boxes',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'cleanroom-interlocks' },
      { label: 'Cleanroom Interlocks & Pass Boxes', page: 'cleanroom-interlocks' },
      { label: 'Chiller & Cleanroom Doors', isCurrent: true }
    ],
    badge: 'HERMETIC AIRTIGHT SEAL | THERMAL INSULATION | cGMP FLUSH',
    titleLine1: 'Chiller & Cleanroom',
    titleLine2Accent: 'Doors',
    tagline: 'Hermetic. Thermal Barrier. Antimicrobial. Flush Profile.',
    description: 'High-performance insulated chiller cold-storage doors and hermetically sealing flush cleanroom swing doors. Engineered for temperature preservation (-40°C to +60°C), positive air retention, and sterile pharmaceutical and biotechnology clean zones.',
    metrics: [
      { label: '-40°C Thermal Insulation Rating', icon: 'Award' },
      { label: 'Drop-Down Hermetic Bottom Seal', icon: 'ShieldCheck' },
      { label: 'Double-Glazed Flush Vision Panel', icon: 'Sparkles' },
      { label: 'Non-Corrosive SS 304 / HPL Clad', icon: 'Layers' }
    ],
    heroImage: '/products/chiller-door-hero.jpg',
    heroStatusBadge: 'Hermetic Inflatable Gasket Active',
    benefits: [
      {
        title: 'Zero Air Permeation',
        desc: 'Multi-lip Santoprene gaskets and automatic drop-down bottom seals ensure complete hermetic barrier.',
        icon: 'ShieldCheck'
      },
      {
        title: 'CFC-Free High-Density PUF Core',
        desc: '60mm to 120mm polyurethane foam core maintains sterile cold chain temperatures.',
        icon: 'Award'
      },
      {
        title: 'Flush-Glazed Double Vision Panels',
        desc: 'Double tempered glass flush with both door leaves with built-in desiccant to prevent fogging.',
        icon: 'Sparkles'
      },
      {
        title: 'Automated or Manual Swing/Slide',
        desc: 'Available with brushless DC automatic swing operators or heavy stainless pull handles.',
        icon: 'DoorClosed'
      },
      {
        title: 'Chemical & Disinfectant Resistant',
        desc: 'High-pressure laminate (HPL) or SS 304 skins withstand daily chlorine and alcohol wipe-downs.',
        icon: 'Layers'
      }
    ],
    showcase: {
      videoSrc: '/High-Speed.mp4',
      poster: '/products/chiller-door-hero.jpg',
      eyebrow: 'THERMAL & HERMETIC SHOWCASE',
      heading: 'Chiller & Cleanroom Doors in Action',
      description: 'Observe how HTI hermetically sealed flush doors seal completely against door rebates on closing, locking in cold room refrigeration and containing airlock differential pressure.',
      features: [
        'High-density 42 kg/m³ CFC-free polyurethane thermal core',
        'Automatic drop-down acoustic and air bottom seal mechanism',
        'Electric perimeter defrost heating cables prevent freezer icing',
        'Flush double-glazed vision panel with silica desiccant matrix'
      ]
    },
    productsTitle: 'Our Chiller & Cleanroom Door Products',
    products: [
      {
        title: 'Hermetic Cleanroom Flush Swing Door',
        badge: 'Cleanroom | Flush Profile',
        image: '/products/cleanroom-door-pharma.jpg',
        chips: ['Flush Frame', 'Drop Bottom Seal', 'SS304 / HPL'],
        desc: 'Aseptic flush-fitting swing door designed for pharmaceutical cleanrooms, operating theatres, and sterile laboratory suites.',
        bullets: [
          'Flush profile matches modular cleanroom wall panels seamlessly',
          'Automatic mechanical drop-down bottom seal closes air gap on latching',
          'Heavy-duty stainless steel SS 304 3D-adjustable lift-off hinges'
        ]
      },
      {
        title: 'Insulated Chiller Cold-Room Sliding Door',
        badge: 'Chiller | -30°C Cold Chain',
        image: '/products/chiller-door-hero.jpg',
        chips: ['Heated Perimeter', 'PUF 100mm Core', '-30°C Rating'],
        desc: 'Heavy insulated cold storage sliding door engineered for pharma cold rooms, vaccine depots, and food freezing facilities.',
        bullets: [
          'High-density 100mm polyurethane foam core stops thermal transmission',
          'Low-voltage electric heating cables in frame prevent gasket icing',
          'Heavy stainless steel drop-track guides press door tight against wall'
        ]
      },
      {
        title: 'Hermetic Sealing Automatic Sliding Door',
        badge: 'Hermetic | Touchless Slide',
        image: '/products/automatic-doors-hospital.jpg',
        chips: ['Hermetic Drop Track', 'Radar / Wave Touchless', 'Clean Seal'],
        desc: 'Automated sliding door whose track lowers the leaf diagonally into the frame on closure, achieving complete airtight containment.',
        bullets: [
          'Certified Class 4 airtightness under European standard EN 12207',
          'Microprocessor brushless DC operator with smooth soft-close curve',
          'Touchless infrared wave switch activation eliminates surface germs'
        ]
      },
      {
        title: 'GMP Double-Leaf Pharma Cleanroom Door',
        badge: 'Bi-Parting | Wide Cargo',
        image: '/hero-cleanroom-interlock-chamber.jpg',
        chips: ['Bi-Parting', 'Seamless Coved Rebate', 'Panic Bar Release'],
        desc: 'Double-leaf cleanroom door engineered for pallet trolley entry and vessel transfers between classified cleanroom suites.',
        bullets: [
          'Coordinated door leaf sequencing with overlapping astragal rebate',
          'Integrated electromagnetic shear lock with fire panic bar egress',
          'Flush vision panels equipped with internal privacy blinds'
        ]
      }
    ],
    technologies: {
      eyebrow: 'THERMAL & HERMETIC SEALING ENGINEERING',
      title: 'Hermetic Compression Dynamics & Polyurethane Cores',
      subtitle: 'Continuous multi-lip silicone gaskets, drop-down threshold seals, and high-density thermal cores.',
      tabs: [
        {
          id: 'drop-down-seal',
          name: 'Automatic Drop-Down Bottom Seal',
          badge: 'Airtight Threshold Seal',
          icon: 'ShieldCheck',
          range: '0 – 20 mm Threshold Gap',
          speed: 'Instantaneous Mechanical Drop',
          summary: 'Internal spring-loaded mechanism drops high-grade Santoprene silicone blade to the floor as the door closes, sealing the bottom gap completely.',
          highlights: [
            'No drag or floor wear during door swing—drops only on final latch',
            'Compensates for uneven cleanroom floor finishes up to 15mm',
            'Tested for over 1,000,000 continuous door open/close cycles'
          ],
          standard: 'EN 12207 Class 4 Air Permeability',
          ipRating: 'Hermetic Seal'
        },
        {
          id: 'puf-insulation',
          name: 'High-Density 42 kg/m³ PUF Insulation Core',
          badge: 'Thermal Preservation',
          icon: 'Award',
          range: '-40°C to +60°C Temperature Range',
          speed: 'Thermal U-Value 0.28 W/m²K',
          summary: 'CFC-free rigid polyurethane foam injected under high pressure creates a solid thermal barrier preventing condensation and heat transfer.',
          highlights: [
            'Zero thermal bridging through patented internal PVC thermal breaks',
            'Flame-retardant B2 class insulation core compliant with DIN 4102',
            'Structural rigidity withstands cleanroom differential pressure surges'
          ],
          standard: 'DIN 4102 & ASTM C518',
          ipRating: 'Airtight Insulated'
        },
        {
          id: 'heated-frame',
          name: 'Low-Voltage Perimeter Defrost Heating Cable',
          badge: 'Anti-Icing Technology',
          icon: 'Zap',
          range: '30W / Meter Constant Wattage',
          speed: 'Continuous Self-Regulating',
          summary: 'Concealed heating cables embedded inside the perimeter aluminum frame prevent moisture condensation and frost formation on freezer seals.',
          highlights: [
            'Safe low-voltage operation with internal thermal safety cutoff',
            'Prevents rubber door gaskets from tearing due to ice adhesion',
            'Reduces HVAC chiller compressor load and energy waste'
          ],
          standard: 'CE Electrical Safety Directives',
          ipRating: 'IP67 Waterproof Heating'
        },
        {
          id: 'flush-vision-panel',
          name: 'Flush Double-Glazed Argon Vision Panel',
          badge: 'Zero Ledge Glazing',
          icon: 'Sparkles',
          range: '6mm + 6mm Toughened Safety Glass',
          speed: 'Argon Filled Anti-Condensation',
          summary: 'Double panes of laminated safety glass sit 100% flush with both front and back faces of the door leaf, eliminating ledges for dust.',
          highlights: [
            'Integral molecular sieve desiccant inside spacer prevents fogging',
            'Shatter-proof tempered safety glass compliant with BS 6206',
            'Optional integral magnetic Venetian blinds operated from outside'
          ],
          standard: 'ISO 14644 cGMP Cleanliness',
          ipRating: 'Flush Airtight'
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Door Approach & Opening',
        desc: 'Handle unlatches or wave sensor activates',
        detail: 'As door begins to open, automatic bottom seal lifts immediately off the floor, preventing any friction wear across cleanroom epoxy.'
      },
      {
        step: 2,
        title: 'Clear Unobstructed Passage',
        desc: 'Wide clear opening for personnel / carts',
        detail: 'High-lift hinges or sliding carriage clears opening completely; internal PUF core retains internal room climate.'
      },
      {
        step: 3,
        title: 'Door Closes & Latches',
        desc: 'Perimeter Santoprene gasket engages',
        detail: 'Door closer gently pulls leaf into rebate; multi-fin rubber gasket compresses tight against stainless steel frame.'
      },
      {
        step: 4,
        title: 'Bottom Seal Drops & Locks Air',
        desc: 'Airtight barrier established',
        detail: 'On final latch contact, internal plunger drives bottom seal down to the floor, completing 100% hermetic isolation.'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Cleanroom Suites', image: '/products/cleanroom-door-pharma.jpg' },
      { title: 'Vaccine & Biological Cold Depots (-30°C)', image: '/products/chiller-door-hero.jpg' },
      { title: 'Hospital Operating Theatres (OT)', image: '/products/automatic-doors-hospital.jpg' },
      { title: 'Food & Meat Processing Cold Storage', image: '/services/service-sectional-doors.jpg' },
      { title: 'Cleanroom Airlock Corridors', image: '/hero-cleanroom-interlock-chamber.jpg' },
      { title: 'Biotechnology R&D Incubator Bays', image: '/hero-cleanroom-automation.jpg' }
    ],
    specs: [
      { label: 'Door Leaf Thickness', value: '45mm / 60mm (Cleanroom Flush) to 100mm / 120mm (Chiller / Freezer)' },
      { label: 'Facing Skin Material', value: '0.8mm Stainless Steel SS 304 satin / 1.0mm High Pressure Laminate (HPL)' },
      { label: 'Insulation Core Material', value: 'CFC-free rigid Polyurethane Foam (PUF) 42 kg/m³ density' },
      { label: 'Air Permeability Class', value: 'Class 4 certified airtight under European Standard EN 12207' },
      { label: 'Bottom Threshold Sealing', value: 'Heavy-duty automatic mechanical drop-down Santoprene silicone seal' },
      { label: 'Defrost Heating Element', value: '230V / 24V perimeter frame heating tape (standard on freezer models)' },
      { label: 'Hinges & Hardware', value: 'Heavy SS 304 3D-adjustable lift-off hinges with flush mortise lockset' },
      { label: 'Vision View Panel', value: '300x600mm / 400x800mm flush double-glazed toughened safety glass with desiccant' }
    ],
    certs: [
      { name: 'EN 12207 Class 4 Air Permeability', sub: 'Certified lowest air leakage class for power and manual operated doors' },
      { name: 'USFDA Schedule M & cGMP Guidelines', sub: 'Completely flush sanitary construction with zero dust ledge surfaces' },
      { name: 'DIN 4102 Flame Retardancy', sub: 'Polyurethane insulation core tested for fire retardant self-extinguishing safety' },
      { name: 'ISO 14644-1 Cleanroom Compatibility', sub: 'Tested for continuous use in ISO Class 4, 5, 6, and 7 clean environments' },
      { name: 'ISO 9001:2015 Quality Manufacturing', sub: 'Precision CNC folded skin panels and automated high-pressure PUF injection' }
    ],
    gallery: [
      { title: 'Pharmaceutical Flush Cleanroom Door', image: '/products/cleanroom-door-pharma.jpg', category: 'Cleanroom Flush', desc: 'SS304 flush cleanroom door with double vision panel and drop bottom seal' },
      { title: 'Cold Room Insulated Chiller Door', image: '/products/chiller-door-hero.jpg', category: 'Chiller Door', desc: '100mm PUF insulated cold storage sliding door with perimeter heater' },
      { title: 'Hospital Operating Theatre Hermetic Door', image: '/products/automatic-doors-hospital.jpg', category: 'Hospital OT', desc: 'Touchless automatic hermetically sealing sliding door for surgical suites' },
      { title: 'Cleanroom Airlock Door Interlock Pair', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Pharma Airlock', desc: 'Flush swing doors paired with electromagnetic door interlocks' },
      { title: 'Bio-Cleanroom Facility Passage', image: '/hero-cleanroom-automation.jpg', category: 'Biotech Cleanroom', desc: 'Aseptic HPL cleanroom doors with stainless steel kickplates' },
      { title: 'High-Speed Cleanroom Airlock Rapid Door', image: '/products/rapid-doors.jpg', category: 'Rapid Airlock', desc: 'High-speed PVC cleanroom roll-up door paired with chiller airlock' }
    ],
    faqs: [
      {
        q: 'Why are flush doors mandatory in pharmaceutical cleanrooms?',
        a: 'Standard commercial doors have overlapping frame ledges and architraves where dust, microbial spores, and chemical residues accumulate. HTI cleanroom doors mount completely flush with the modular cleanroom wall panels on both sides, eliminating horizontal ledges and allowing effortless wipe-down disinfection.'
      },
      {
        q: 'How does the automatic drop-down bottom seal operate without scratching the floor?',
        a: 'The bottom seal is spring-loaded and retracted inside the hollow base of the door leaf. It stays lifted during the entire swing. Only during the final 5 degrees of door closure does an internal mechanical actuator depress, pushing the silicone seal down against the floor to lock in air pressure without scraping.'
      },
      {
        q: 'What prevents condensation and ice buildup around freezer and chiller doors?',
        a: 'Our freezer and low-temperature chiller doors feature low-voltage perimeter electric heating cables concealed beneath the frame gaskets. This gentle warmth maintains the gasket contact area just above freezing, preventing condensation and stopping the door gasket from freezing shut.'
      },
      {
        q: 'Are the vision panels prone to internal fogging or condensation?',
        a: 'No. HTI cleanroom vision panels feature double panes of tempered safety glass separated by a continuous aluminum spacer packed with molecular sieve silica desiccant. The air cavity between the glass panes is hermetically sealed and moisture-free, preventing internal fogging permanently.'
      },
      {
        q: 'Can these doors integrate with HTI cleanroom door interlocking systems?',
        a: 'Yes. All HTI cleanroom and chiller doors can be ordered pre-machined for concealed electromagnetic locks, magnetic door status switches, and touchless wave sensor plates, wiring directly into our 2 to 8 door interlocking controllers.'
      }
    ],
    cta: {
      tag: 'TURNKEY CLEANROOM & CHILLER DOOR SYSTEMS',
      title: 'Upgrade to Airtight Hermetic Cleanroom & Chiller Doors',
      desc: 'Receive comprehensive engineering drawings, thermal U-value certifications, and turnkey installation across India.'
    }
  },

  // =========================================================================
  // 5. ACOUSTIC SOUND DOORS
  // =========================================================================
  'acoustic-sound-doors': {
    slug: 'acoustic-sound-doors',
    categoryName: 'Cleanroom Interlocks & Pass Boxes',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'cleanroom-interlocks' },
      { label: 'Cleanroom Interlocks & Pass Boxes', page: 'cleanroom-interlocks' },
      { label: 'Acoustic Sound Barrier Doors', isCurrent: true }
    ],
    badge: 'SOUND TRANSMISSION LOSS | STC 45 – 55 dB | VIBRATION DAMPING',
    titleLine1: 'Acoustic Sound',
    titleLine2Accent: 'Doors',
    tagline: 'Noise Attenuation. Heavy Acoustic Core. Sealed Perfection.',
    description: 'Heavy acoustic noise-attenuation barrier doors engineered for pharmaceutical plant utility rooms, compressor chambers, chiller plant rooms, and sound-critical industrial facilities. Delivers certified STC 45 to STC 55 dB noise reduction with peripheral acoustic magnetic seals.',
    metrics: [
      { label: 'STC 45 – 55 dB Sound Attenuation', icon: 'Award' },
      { label: 'Multi-Layer Viscoelastic Core', icon: 'ShieldCheck' },
      { label: 'Magnetic Perimeter Compression Seal', icon: 'Lock' },
      { label: 'Heavy Stainless Steel Cam Hinges', icon: 'Settings' }
    ],
    heroImage: '/case-studies/case-air-curtain.jpg',
    heroStatusBadge: 'Acoustic Compression Seal Active',
    benefits: [
      {
        title: 'Certified Noise Reduction (STC 45-55 dB)',
        desc: 'Reduces ear-splitting machinery roar to safe, whisper-quiet lobby decibel levels.',
        icon: 'Award'
      },
      {
        title: 'Multi-Layer Damped Mineral Core',
        desc: 'Composite layers of high-density rockwool, viscoelastic polymer, and heavy steel sheeting.',
        icon: 'Layers'
      },
      {
        title: 'Continuous Magnetic Gasket',
        desc: 'Triple-fin magnetic compression seals around jambs and header prevent acoustic air leaks.',
        icon: 'Lock'
      },
      {
        title: 'Heavy Cam-Lift Hinges',
        desc: 'Specialized cam hinges raise the door leaf on swing and seat it firmly against floor acoustic thresholds.',
        icon: 'Settings'
      },
      {
        title: 'Integrated 2-Hour Fire Rating',
        desc: 'Complies with BS 476 and IS 3614 fire resistance standards in addition to acoustic damping.',
        icon: 'ShieldCheck'
      }
    ],
    showcase: {
      videoSrc: '/Motorized Industrial Rolling Shutters.mp4',
      poster: '/case-studies/case-air-curtain.jpg',
      eyebrow: 'ACOUSTIC DAMPING DEMONSTRATION',
      heading: 'High-Performance Soundproof Doors in Action',
      description: 'Observe how HTI acoustic sound barrier doors attenuate industrial compressor, generator, and HVAC chiller noise from 105 dB down to a compliant, tranquil 50 dB in adjoining workspace corridors.',
      features: [
        'Certified Sound Transmission Class (STC) up to 55 dB',
        'Heavy-gauge galvanized steel door leaf filled with acoustic damping mass',
        'Perimeter magnetic compression seal stops high-frequency acoustic leaks',
        'Automatic heavy mechanical drop-down acoustic threshold seal'
      ]
    },
    productsTitle: 'Our Acoustic Sound Door Products',
    products: [
      {
        title: 'STC 45 dB Single Steel Acoustic Door',
        badge: 'STC 45 dB | Utility Rooms',
        image: '/products/fire-rated-steel-doors.jpg',
        chips: ['STC 45 dB', 'Cam-Lift Hinge', 'Magnetic Gasket'],
        desc: 'Heavy-duty acoustic door engineered for plant utility rooms, HVAC air handling unit (AHU) rooms, and server corridors.',
        bullets: [
          'High-density 96 kg/m³ acoustic mineral wool insulation',
          'Heavy cam-lift hinges seat door firmly against floor seal',
          '2-Hour fire integrity rating certified under BS 476 Part 22'
        ]
      },
      {
        title: 'STC 52 dB Heavy Industrial Acoustic Door',
        badge: 'STC 52 dB | High Noise Bays',
        image: '/case-studies/case-air-curtain.jpg',
        chips: ['Double Core', 'STC 52 dB', 'Compressor Rooms'],
        desc: 'Heavy acoustic door for high-decibel diesel generator (DG) rooms, air compressor bays, and turbine test cells.',
        bullets: [
          'Double composite sound-damped steel core with acoustic membrane',
          'Multi-point acoustic compression latch holds perimeter air-tight',
          'Attenuates high and low frequency motor vibration hum'
        ]
      },
      {
        title: 'Double-Leaf Plant Room Soundproof Door',
        badge: 'Double Leaf | Wide Machinery',
        image: '/hero-industrial-doors-dock.jpg',
        chips: ['STC 48 dB', 'Acoustic Astragal', 'Chiller Bays'],
        desc: 'Double-leaf acoustic sound barrier door designed for wide equipment replacement openings in chiller and boiler plant rooms.',
        bullets: [
          'Heavy overlapping acoustic astragal rebate with dual seals',
          'Integrated panic crash bar for rapid emergency egress',
          'Custom sized up to 3.0 meters wide x 3.2 meters high'
        ]
      },
      {
        title: 'Acoustic Sound Door with Glazed Vision',
        badge: 'Acoustic Glass | Vision View',
        image: '/head-office-building.jpg',
        chips: ['Double Acoustic Glass', 'Sound & Vision', 'Test Benches'],
        desc: 'High-STC sound door featuring multi-laminated acoustic vision glass, allowing supervisor monitoring without noise transmission.',
        bullets: [
          'Double-glazed acoustic safety glass with argon gas filling',
          'STC 45 dB certified acoustic rating across vision pane',
          'Architectural powder-coated or stainless steel SS 304 finish'
        ]
      }
    ],
    technologies: {
      eyebrow: 'SOUND TRANSMISSION LOSS & DAMPING',
      title: 'Acoustic Mass Physics & Magnetic Compression Seals',
      subtitle: 'Multi-layer viscoelastic damping, cam-lift mechanics, and perimeter acoustic magnetic gaskets.',
      tabs: [
        {
          id: 'acoustic-mass-core',
          name: 'Multi-Layer Viscoelastic Composite Core',
          badge: 'Mass Law Attenuation',
          icon: 'Layers',
          range: 'STC 45 to STC 55 dB Sound Attenuation',
          speed: 'Broadband Frequency Damping (100Hz – 5kHz)',
          summary: 'Combines heavy-gauge cold-rolled steel skins, high-density resin-bonded acoustic rockwool, and viscoelastic damping sheets to dissipate sound energy.',
          highlights: [
            'Breaks resonance frequencies between structural steel faces',
            'Attenuates low-frequency industrial rumble as well as high-pitch whine',
            'Non-combustible Class 1 fire-safe mineral insulation core'
          ],
          standard: 'ASTM E90 & ISO 10140-2',
          ipRating: 'Acoustic Barrier'
        },
        {
          id: 'magnetic-gasket',
          name: 'Triple Magnetic Perimeter Compression Gasket',
          badge: 'Acoustic Air-Leak Prevention',
          icon: 'Lock',
          range: 'Continuous Header & Jamb Seal',
          speed: 'Zero Gap Magnetic Clamping',
          summary: 'Extruded Santoprene rubber gasket with internal magnetic core continuously clamps against the steel door leaf when closed.',
          highlights: [
            'Stops high-frequency airborne noise leaks (sound travels through air gaps)',
            'UV and ozone resistant rubber maintains flexibility over decades',
            'Double-fin design creates dual acoustic buffer chambers'
          ],
          standard: 'ASTM E283 Air Leakage Rated',
          ipRating: 'Acoustic Airtight'
        },
        {
          id: 'cam-lift-hinge',
          name: 'Precision Heavy-Duty Cam-Lift Hinges',
          badge: 'Mechanical Lift & Seat',
          icon: 'Settings',
          range: 'Up to 500 kg Door Leaf Weight',
          speed: '12mm Vertical Cam Elevation',
          summary: 'Internal helical cam raises the heavy acoustic door leaf 12mm as it opens and lowers it tightly against the floor threshold on closing.',
          highlights: [
            'Zero dragging of heavy bottom acoustic seal across the floor',
            'Precision machined stainless steel SS 304 investment cast body',
            'Maintenance-free self-lubricating bronze thrust bearings'
          ],
          standard: 'ANSI/BHMA A156.1 Certified',
          ipRating: 'Heavy Duty Structural'
        },
        {
          id: 'fire-acoustic-dual',
          name: 'Dual Acoustic & 120-Min Fire Resistance',
          badge: 'Life Safety & Acoustic',
          icon: 'ShieldCheck',
          range: '120 Minutes Fire Integrity (FD 120)',
          speed: 'BS 476 Part 22 & IS 3614',
          summary: 'Engineered with intumescent perimeter seals that expand 25x under heat, sealing door gaps against smoke and fire in plant utility rooms.',
          highlights: [
            'Certified dual-compliance: STC 48 dB acoustic + 2-Hour fire door',
            'Heavy-duty UL-listed panic crash exit hardware available',
            'Reinforced internal steel stiffeners prevent heat warping'
          ],
          standard: 'BS 476 Part 20/22 & IS 3614',
          ipRating: 'Fire & Acoustic Certified'
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Open Swing & Cam Elevation',
        desc: 'Hinges raise door leaf vertically',
        detail: 'Heavy-duty cam-lift hinges lift the massive acoustic leaf 12mm upon opening, clearing bottom seals effortlessly off the floor.'
      },
      {
        step: 2,
        title: 'Personnel & Equipment Access',
        desc: 'Smooth swing with low opening force',
        detail: 'Despite weighing up to 250 kg, precision engineered hinges allow smooth push/pull operation compliant with ADA opening force.'
      },
      {
        step: 3,
        title: 'Door Closes & Cam Drops',
        desc: 'Leaf lowers firmly into acoustic jambs',
        detail: 'Door closer swings leaf shut; cam drops door leaf into final seated position, pressing acoustic magnetic seals tightly.'
      },
      {
        step: 4,
        title: 'Full Noise Attenuation',
        desc: '99% of acoustic sound energy absorbed',
        detail: 'Continuous magnetic seals and heavy composite viscoelastic core attenuate machinery roar from 105 dB to a quiet 50 dB.'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Utility & Compressor Rooms', image: '/case-studies/case-air-curtain.jpg' },
      { title: 'Chiller & HVAC Plant Rooms', image: '/products/fire-rated-steel-doors.jpg' },
      { title: 'Diesel Generator (DG) Enclosures', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Industrial Testing Laboratories', image: '/head-office-building.jpg' },
      { title: 'Cleanroom AHU Air Handling Suites', image: '/hero-cleanroom-interlock-chamber.jpg' },
      { title: 'Corporate Boardrooms & Auditoriums', image: '/hero-glass-atrium.jpg' }
    ],
    specs: [
      { label: 'Sound Transmission Class (STC)', value: 'Certified STC 45 dB, STC 48 dB, STC 52 dB, and STC 55 dB' },
      { label: 'Door Leaf Thickness', value: '55mm (STC 45) / 75mm (STC 50) / 95mm (STC 55 dB)' },
      { label: 'Door Skin Material', value: '1.6mm / 2.0mm Galvanized Iron (GI) or Stainless Steel SS 304' },
      { label: 'Internal Acoustic Core', value: 'High-density 96 kg/m³ rockwool + viscoelastic sound damping membrane' },
      { label: 'Perimeter Sealing System', value: 'Triple-fin magnetic compression gasket + automatic mechanical bottom drop seal' },
      { label: 'Hinge Hardware', value: 'Heavy stainless steel SS 304 cam-lift elevation hinges (3 or 4 per leaf)' },
      { label: 'Fire Integrity Rating', value: 'Certified 60 / 120 minutes fire resistance under BS 476 & IS 3614' },
      { label: 'Latching & Egress', value: 'Heavy multi-point compression acoustic lockset / UL-listed panic crash bar' }
    ],
    certs: [
      { name: 'ASTM E90 Sound Transmission Loss', sub: 'Standard laboratory test method for airborne sound transmission loss of building partitions' },
      { name: 'ISO 10140-2 Laboratory Measurement', sub: 'International acoustic standard measuring sound insulation of door assemblies' },
      { name: 'BS 476 Part 22 Fire Safety Certified', sub: 'Tested for 120 minutes structural fire integrity and thermal insulation' },
      { name: 'IS 3614 Indian Fire Door Standard', sub: 'Bureau of Indian Standards compliance for fire-rated metal door assemblies' },
      { name: 'ISO 9001:2015 Quality Manufacturing', sub: 'High-precision CNC laser cutting, structural welding, and acoustic bench testing' }
    ],
    gallery: [
      { title: 'Industrial Plant Room Acoustic Door', image: '/case-studies/case-air-curtain.jpg', category: 'Acoustic Sound Door', desc: 'STC 52 dB heavy acoustic door installed at central chiller plant room' },
      { title: 'Fire-Rated Soundproof Steel Door', image: '/products/fire-rated-steel-doors.jpg', category: 'Fire & Acoustic', desc: 'Dual-certified 2-hour fire door with STC 45 dB noise attenuation' },
      { title: 'Double-Leaf Heavy Compressor Door', image: '/hero-industrial-doors-dock.jpg', category: 'Double Leaf', desc: 'Double acoustic doors with acoustic astragal for machinery access' },
      { title: 'Acoustic Vision Glazed Sound Door', image: '/head-office-building.jpg', category: 'Acoustic Glazing', desc: 'Soundproof door with double laminated acoustic inspection window' },
      { title: 'Pharmaceutical Utility Suite Door', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Pharma Utility', desc: 'Noise-attenuating barrier door between utility plant and sterile corridor' },
      { title: 'Cleanroom Flush Acoustic Assembly', image: '/hero-cleanroom-automation.jpg', category: 'Cleanroom Sound', desc: 'Aseptic sound-damped door assembly maintaining cleanroom pressure' }
    ],
    faqs: [
      {
        q: 'What does the STC (Sound Transmission Class) rating mean in practice?',
        a: 'Sound Transmission Class (STC) is an integer rating of how well a door attenuates airborne sound. A standard hollow door has an STC of ~20 dB (normal speech heard clearly). An STC 45 dB door reduces loud speech to a faint whisper. An STC 52 to 55 dB door reduces deafening 105 dB compressor roar down to a quiet 50 dB hum.'
      },
      {
        q: 'Why are cam-lift hinges used on heavy acoustic doors?',
        a: 'Acoustic doors require heavy bottom seals that press tightly against the floor threshold. If standard hinges were used, the seal would scrape and wear out quickly. Cam-lift hinges raise the door leaf 12mm as it opens and lower it firmly on closing, ensuring an airtight seal without floor friction.'
      },
      {
        q: 'Can HTI acoustic sound doors also serve as certified fire doors?',
        a: 'Yes. HTI manufactures dual-certified acoustic fire doors tested under BS 476 Part 22 and IS 3614. These doors achieve up to STC 48 dB noise reduction while providing 120 minutes of certified fire resistance.'
      },
      {
        q: 'Are magnetic perimeter seals more effective than standard neoprene seals?',
        a: 'Yes. Sound behaves like water—it leaks through the tiniest microscopic air gaps. Magnetic gaskets use a continuous magnetic strip that actively pulls against the steel door frame, eliminating acoustic flanking paths that traditional compression gaskets leave behind.'
      },
      {
        q: 'Can double-leaf acoustic doors maintain high STC ratings?',
        a: 'Yes. Our double-leaf acoustic doors feature heavy overlapping center astragals equipped with dual acoustic compression seals and sequential door coordinators, achieving certified STC ratings up to 50 dB across openings as wide as 3 meters.'
      }
    ],
    cta: {
      tag: 'TURNKEY ACOUSTIC SOUND DOOR SOLUTIONS',
      title: 'Silence Plant Noise with HTI Certified Acoustic Doors',
      desc: 'Receive certified acoustic test laboratory reports, dimensional submittal drawings, and turnkey installation across India.'
    }
  },

  // =========================================================================
  // 6. SAFETY OVERRIDE BUZZERS
  // =========================================================================
  'safety-override-buzzers': {
    slug: 'safety-override-buzzers',
    categoryName: 'Cleanroom Interlocks & Pass Boxes',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'cleanroom-interlocks' },
      { label: 'Cleanroom Interlocks & Pass Boxes', page: 'cleanroom-interlocks' },
      { label: 'Safety Override Buzzers & Annunciators', isCurrent: true }
    ],
    badge: 'EMERGENCY TRIP | AUDIO-VISUAL ANNUNCIATION | LIFE SAFETY',
    titleLine1: 'Safety Override',
    titleLine2Accent: 'Buzzers',
    tagline: 'Emergency Release. High-Decibel Warning. Instant Override.',
    description: 'Industrial and cleanroom safety override buzzers, emergency breakout push stations, and multi-window audio-visual fault annunciators. Engineered to provide immediate fail-safe lock release and clear audible alerting during cleanroom over-time breaches, gas leaks, and fire panel trips.',
    metrics: [
      { label: '95 – 110 dB Dual-Tone Siren', icon: 'Zap' },
      { label: 'Instantaneous Latch Trip < 20ms', icon: 'ShieldCheck' },
      { label: 'IP65 Stainless Steel Fascia', icon: 'Shield' },
      { label: 'BMS & Fire Panel Integration', icon: 'Cpu' }
    ],
    heroImage: '/case-studies/case-ss304-mist.jpg',
    heroStatusBadge: 'Safety Alarm Monitoring Armed',
    benefits: [
      {
        title: 'Emergency Egress Compliance',
        desc: 'Overrides interlock and opens doors immediately upon panic button press or fire trip.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Door-Held-Open Audible Alert',
        desc: 'Sounds warning buzzer if cleanroom personnel hold a door open past preset cascade time.',
        icon: 'Zap'
      },
      {
        title: 'High-Intensity Strobe Flasher',
        desc: 'Pulsing xenon / high-lumen LED visual strobe visible through cleanroom safety goggles.',
        icon: 'Sparkles'
      },
      {
        title: 'Stainless Steel Flush Enclosure',
        desc: 'SS 304 cleanroom faceplate with antimicrobial sealed silicone membrane buttons.',
        icon: 'Shield'
      },
      {
        title: 'BMS & SCADA Event Logging',
        desc: 'Dry contact relay outputs send timestamped alarm notifications to central security BMS.',
        icon: 'Cpu'
      }
    ],
    showcase: {
      videoSrc: '/Turnstiles & Flap Barriers.mp4',
      poster: '/case-studies/case-ss304-mist.jpg',
      eyebrow: 'LIFE SAFETY & ALARM DEMONSTRATION',
      heading: 'Safety Override & Annunciation in Action',
      description: 'Observe how HTI safety override stations and multi-window alarm annunciators trigger fail-safe lock release, flash high-visibility LED beacons, and broadcast clear audible alerts during cleanroom emergencies.',
      features: [
        'High-decibel dual-tone buzzer with adjustable volume up to 105 dB',
        'Independent illuminated Emergency Breakout push switch',
        'Flameproof cast aluminium hooter certified for hazardous zones',
        'Integrated Modbus RS485 communication bus to central BMS'
      ]
    },
    productsTitle: 'Our Safety Override & Buzzer Products',
    products: [
      {
        title: 'Cleanroom Flush Emergency Breakout Station',
        badge: 'Flush Mount | Breakout',
        image: '/products/cleanroom-interlocks.jpg',
        chips: ['SS304 Faceplate', 'Mushroom Push', 'Fail-Safe Egress'],
        desc: 'Flush-mounted emergency station that hardware-trips all airlock magnetic locks, permitting immediate unhindered life safety egress.',
        bullets: [
          'High-visibility red mushroom-head push button with twist reset',
          'Stainless steel SS 304 faceplate with silicone moisture seal',
          'Dual independent microswitches trip lock power and notify BMS'
        ]
      },
      {
        title: 'Audio-Visual Door-Ajar Buzzer Strobe',
        badge: 'Door-Ajar | 95 dB Siren',
        image: '/products/alarm-annunciators.jpg',
        chips: ['95 dB Buzzer', 'Red LED Flasher', 'Adjustable Delay'],
        desc: 'Compact audio-visual warning unit alerting cleanroom personnel when airlock doors are held open beyond permissible cascade times.',
        bullets: [
          'Adjustable 0 to 60 second delay before audible alarm triggers',
          'Pulsing high-intensity Red LED beacon visible across cleanrooms',
          'Flush panel mounting with wipe-down disinfectant resistance'
        ]
      },
      {
        title: 'Multi-Window Alarm Annunciator Panel',
        badge: 'Annunciator | Multi-Zone',
        image: '/products/alarm-annunciators-panel.jpg',
        chips: ['Microcontroller', '8-Window Display', 'Mute / Test Logic'],
        desc: 'Centralized cleanroom fault annunciator monitoring differential pressure failures, door breaches, gas leaks, and HVAC trips.',
        bullets: [
          '8, 16, or 24 optically isolated fault alarm windows',
          'Integrated Test / Acknowledge / Reset / Mute push buttons',
          'Complies with ISA-18.1 Sequence 1A industrial alarm standards'
        ]
      },
      {
        title: 'Flameproof (Ex-d) Warning Hooter & Beacon',
        badge: 'Flameproof | Zone 1 & 2',
        image: '/case-studies/case-ss304-mist.jpg',
        chips: ['ATEX Ex-d', 'Solvent Areas', '110 dB Sounder'],
        desc: 'Explosion-proof audible hooter and flashing beacon for pharmaceutical chemical synthesis suites and hazardous solvent areas.',
        bullets: [
          'Heavy cast aluminium alloy LM6 flameproof enclosure',
          'Certified for Gas Groups IIA, IIB, and IIC hazardous areas',
          'Loud 110 dB dual-tone electronic siren with 360-degree strobe'
        ]
      }
    ],
    technologies: {
      eyebrow: 'AUDIBLE ALERTING & FAIL-SAFE LOGIC',
      title: 'Piezoelectric Sirens & Hardware Egress Loops',
      subtitle: 'Microcontroller alarm sequencers, high-decibel transducers, and fail-safe hardware loops.',
      tabs: [
        {
          id: 'piezo-siren',
          name: 'Piezoelectric High-Decibel Acoustic Siren',
          badge: 'Audible Clarity',
          icon: 'Zap',
          range: '95 to 110 dB at 1 Meter',
          speed: 'Instantaneous Acoustic Wave',
          summary: 'Solid-state piezoelectric transducer produces clear, penetrating dual-tone frequencies that cut through cleanroom HVAC ambient noise.',
          highlights: [
            'Adjustable internal volume control trimmer (80 dB to 110 dB)',
            'Solid-state design with zero moving parts and zero spark risk',
            'Low current consumption (< 35mA at 24V DC)'
          ],
          standard: 'ISA-18.1 & EN 54-3 Sounder',
          ipRating: 'IP65 Sealed Diaphragm'
        },
        {
          id: 'hardware-failsafe',
          name: 'Hardware-Level Emergency Breakout Loop',
          badge: 'Uncompromising Life Safety',
          icon: 'ShieldCheck',
          range: 'Direct Series Power Interruption',
          speed: '< 15 ms Lock Cutoff',
          summary: 'Emergency push button physically interrupts the power circuit supplying magnetic door locks, guaranteeing lock release regardless of software state.',
          highlights: [
            'Failsafe design: opening button contacts drops lock power directly',
            'Auxiliary signal contacts notify central building security and fire panel',
            'Tamper-resistant key reset prevents unauthorized alarm cancellation'
          ],
          standard: 'NFPA 101 Life Safety Code',
          ipRating: 'IP65 Flush Plate'
        },
        {
          id: 'annunciator-logic',
          name: 'ISA-18.1 Multi-Window Annunciator Engine',
          badge: 'Supervisory Monitoring',
          icon: 'Cpu',
          range: 'Up to 32 Alarm Channels',
          speed: 'Microsecond Fault Latch',
          summary: 'Microcontroller-driven annunciator logic alerts operators to cleanroom pressure loss, door ajar, emergency trips, and filter failure.',
          highlights: [
            'Follows international ISA-18.1 Sequence 1A (Flash on fault, steady on Ack)',
            'Ultra-bright LED illumination windows with engraved legend plates',
            'RS485 Modbus RTU interface streams alarm records to central SCADA'
          ],
          standard: 'ISA-18.1 Alarm Standards',
          ipRating: 'Flush Panel Mount'
        },
        {
          id: 'flameproof-sounder',
          name: 'ATEX / PESO Certified Flameproof Sounder',
          badge: 'Zone 1 & 2 Defense',
          icon: 'Award',
          range: 'Gas Groups IIA, IIB, IIC',
          speed: '110 dB High-Output Warning',
          summary: 'Heavy cast aluminium flameproof sounder and flashing beacon certified for explosive chemical and solvent handling cleanrooms.',
          highlights: [
            'Withstands internal explosion without igniting external explosive gas',
            'Epoxy powder-coated corrosion-resistant enclosure',
            'Integrated high-intensity pulsing xenon strobe lamp'
          ],
          standard: 'IS/IEC 60079-1 & PESO Certified',
          ipRating: 'IP65 Heavy Industrial'
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Emergency Trigger or Over-Time',
        desc: 'Mushroom button pressed or door held open',
        detail: 'An operator presses the Emergency Breakout station or an airlock door is held open past the 30-second cleanroom timeout.'
      },
      {
        step: 2,
        title: 'Hardware Circuit Cutoff',
        desc: 'Power to all magnetic locks cuts instantly',
        detail: 'Hardware contact opens, immediately de-energizing all electromagnetic door locks in the airlock cascade for free emergency egress.'
      },
      {
        step: 3,
        title: 'Audio-Visual Annunciation',
        desc: '95 dB siren sounds and strobe flashes',
        detail: 'High-decibel buzzer broadcasts audible alarm while high-luminance LED strobe beacon pulses, alerting personnel across cleanroom corridors.'
      },
      {
        step: 4,
        title: 'BMS Alert & Supervised Reset',
        desc: 'Central security logged, key reset',
        detail: 'Dry contact relay informs central BMS; system remains locked open until authorized supervisor turns the safety key reset switch.'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Cleanroom Emergency Egress', image: '/products/cleanroom-interlocks.jpg' },
      { title: 'Solvent & Chemical Dispensing Bays', image: '/case-studies/case-ss304-mist.jpg' },
      { title: 'Cleanroom Differential Pressure Alarm', image: '/products/alarm-annunciators-panel.jpg' },
      { title: 'Airlock Door-Held-Open Notification', image: '/products/alarm-annunciators.jpg' },
      { title: 'Hospital Isolation & BSL Laboratories', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Hazardous Flammable Solvent Storage', image: '/services/service-cleanroom.jpg' }
    ],
    specs: [
      { label: 'Audible Output Level', value: '85 to 110 dB @ 1 meter (adjustable internal volume control potentiometer)' },
      { label: 'Sounder Tone Selection', value: 'Dual Tone / Intermittent Beep / Continuous High Siren (field selectable)' },
      { label: 'Visual Alarm Indicator', value: 'High-intensity pulsing Red LED strobe / 360-degree xenon beacon' },
      { label: 'Emergency Breakout Switch', value: 'Heavy red mushroom push button with mechanical twist-to-reset latch' },
      { label: 'Door-Ajar Timer Range', value: '0 to 60 seconds programmable delay before buzzer alert activates' },
      { label: 'Operating Power Supply', value: '12V DC / 24V DC / 230V AC ± 10%, 50Hz (Low-power draw < 40mA)' },
      { label: 'Enclosure & Mounting', value: 'Stainless Steel SS 304 satin flush mount / Flameproof Cast Aluminium (Ex-d)' },
      { label: 'Relay Output Interface', value: 'Potential-free NO/NC changeover contacts rated 5A @ 230V AC for BMS/Fire' }
    ],
    certs: [
      { name: 'NFPA 101 Life Safety Code Compliance', sub: 'Guarantees unhindered fail-safe emergency egress from locked cleanroom suites' },
      { name: 'ISA-18.1 Alarm Annunciator Standard', sub: 'Standardized industrial audible and visual sequence for process fault alerting' },
      { name: 'PESO / ATEX Flameproof Certification', sub: 'Certified for Zone 1 and 2 hazardous locations (Gas Groups IIA, IIB, IIC)' },
      { name: 'ISO 14644 Cleanroom Sanitization', sub: 'IP65 sealed front membrane resistant to pharmaceutical chemical wipe-downs' },
      { name: 'ISO 9001:2015 Quality Manufacturing', sub: '100% factory bench tested with continuous sound pressure and relay load tests' }
    ],
    gallery: [
      { title: 'Cleanroom Flush Emergency Breakout Switch', image: '/products/cleanroom-interlocks.jpg', category: 'Emergency Station', desc: 'SS304 flush emergency mushroom breakout push button with key reset' },
      { title: 'Audio-Visual Door-Ajar Buzzer Strobe', image: '/products/alarm-annunciators.jpg', category: 'Door Buzzer', desc: 'Flush-mounted 95 dB warning buzzer and red LED flasher for airlock doors' },
      { title: 'Multi-Window Annunciator Panel', image: '/products/alarm-annunciators-panel.jpg', category: 'Annunciator Panel', desc: 'Microprocessor 8-window cleanroom fault and pressure alarm annunciator' },
      { title: 'Flameproof Audible Warning Sounder', image: '/case-studies/case-ss304-mist.jpg', category: 'Explosion Proof', desc: 'Ex-d cast aluminium warning hooter and beacon for solvent chemical suites' },
      { title: 'Cleanroom Door Interlock Integration', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Pharma Interlock', desc: 'Safety buzzer integrated with cleanroom door interlock controller' },
      { title: 'Biopharma Containment Alarm Suite', image: '/hero-cleanroom-automation.jpg', category: 'Bio-Safety', desc: 'Plant-wide audible and visual safety warning network across cleanrooms' }
    ],
    faqs: [
      {
        q: 'Why are safety override buzzers essential in interlocked cleanrooms?',
        a: 'Door interlocks lock doors to prevent air leakage, but life safety regulations (such as NFPA 101 and NBC) mandate that personnel must never be trapped inside an airlock during an emergency. Safety override stations provide an immediate physical bypass, cutting power to magnetic locks so doors open instantly for rapid egress.'
      },
      {
        q: 'How does the door-held-open buzzer prevent cleanroom pressure loss?',
        a: 'If a worker props a cleanroom door open to move supplies, airborne contaminants can rush in and pressure cascades fail. The door-held-open timer detects when a door exceeds its preset threshold (e.g. 30 seconds) and triggers a 95 dB audible alert and flashing LED, prompting workers to shut the door.'
      },
      {
        q: 'Is the emergency breakout switch hardwired or software dependent?',
        a: 'Our emergency breakout stations feature a hardwired series-break circuit. When the red mushroom button is pressed, it physically breaks the power circuit feeding the electromagnetic locks, releasing them instantaneously (< 15ms) regardless of any software or controller status.'
      },
      {
        q: 'Can the buzzer volume be adjusted for sensitive cleanroom environments?',
        a: 'Yes. HTI audio alert stations include an internal volume trimmer potentiometer, allowing facility engineers to adjust output sound levels between 80 dB (soft laboratory beep) up to 105 dB (loud industrial alarm).'
      },
      {
        q: 'Are flameproof hooters and buzzers available for hazardous solvent zones?',
        a: 'Yes. For chemical synthesis and solvent handling areas (such as API crystallization rooms), HTI supplies ATEX and PESO certified cast aluminium flameproof sounders and beacons rated for Gas Groups IIA, IIB, and Zone 1 & 2 environments.'
      }
    ],
    cta: {
      tag: 'TURNKEY CLEANROOM LIFE SAFETY SYSTEMS',
      title: 'Ensure Complete Life Safety & Emergency Egress with HTI',
      desc: 'Receive comprehensive wiring schematics, NFPA 101 compliance documentation, and certified installation across India.'
    }
  }
};
