/**
 * Comprehensive Product & Solution Page Data for:
 * 1. Addressable Fire Alarms (slug: addressable-fire-alarms)
 * 2. Hydrant & Sprinkler Arrays (slug: hydrant-sprinkler-arrays)
 * 3. Fire Rated Doors & Shutters (slug: fire-rated-doors-shutters)
 * 4. Public Address (PA) (slug: public-address-system)
 * 5. Gas Leak Detection (slug: gas-leak-detection)
 * 6. Emergency Auto Trip (slug: emergency-auto-trip)
 * 
 * Modeled on the exact architecture and layout of the industrial access data store.
 */

export const FIRE_SAFETY_PAGES = {
  // =========================================================================
  // 1. ADDRESSABLE FIRE ALARMS
  // =========================================================================
  'addressable-fire-alarms': {
    slug: 'addressable-fire-alarms',
    categoryName: 'Fire Protection & Life Safety',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'fire-protection' },
      { label: 'Fire Protection & Life Safety', page: 'fire-protection' },
      { label: 'Addressable Fire Alarm Systems', isCurrent: true }
    ],
    badge: 'FIRE SAFETY | ADDRESSABLE | LIFE SAFETY',
    titleLine1: 'Addressable Fire Alarm',
    titleLine2Accent: 'Detection Systems',
    tagline: 'Detect early. Locate exactly. Respond faster.',
    description: 'Protect your enterprise with multi-zone addressable fire alarm panels, optical smoke, heat and multi-sensor detectors, manual call points and sounders that pinpoint the exact device in alarm.',
    metrics: [
      { label: 'Multi-Zone Loop Network', icon: 'Flame' },
      { label: 'Sub-3s Alarm Polling', icon: 'Zap' },
      { label: 'Built-in Fault Event Log', icon: 'Activity' },
      { label: 'EN 54 / IS 2189 Design', icon: 'ShieldCheck' }
    ],
    heroImage: '/services/service-fire-alarm.jpg',
    heroStatusBadge: 'Loop 1–4 Polling Active | System Normal',
    benefits: [
      {
        title: 'Exact Device Location',
        desc: 'Pinpoint the precise room, corridor, or ceiling detector address on the central LCD panel instantly.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Early Smoke & Heat Detection',
        desc: 'Advanced dual-chamber optical sensors detect smouldering fires and rapid temperature shifts early.',
        icon: 'Flame'
      },
      {
        title: 'Scalable Loop Wiring',
        desc: 'Support for multiple SLC loops with short-circuit isolator modules ensuring unbroken loop integrity.',
        icon: 'Layers'
      },
      {
        title: 'Fault & Event Logging',
        desc: 'Comprehensive historical memory records sensor drift, maintenance requirements, and test cycles.',
        icon: 'Activity'
      },
      {
        title: 'Integrated Emergency Actions',
        desc: 'Direct relay outputs release access doors, trip AHU blowers, and signal building management systems.',
        icon: 'Settings'
      }
    ],
    showcase: {
      videoSrc: '/automatic_sliding.mp4',
      poster: '/services/service-fire-alarm.jpg',
      eyebrow: 'OPERATIONAL SHOWCASE',
      heading: 'Addressable Fire Alarm in Action',
      description: 'Observe our microprocessor addressable fire alarm panels coordinating multi-zone commercial and industrial facilities with instant device identification.',
      features: [
        'Pinpoint individual detector address and ambient contamination status',
        'Automatic sensor drift compensation and dust sensitivity calibration',
        'Phased evacuation sounder sequencing with pre-alarm verification mode',
        'Direct BACnet and Modbus integration with central building BMS control'
      ]
    },
    productsTitle: 'Our Addressable Fire Alarm Products',
    products: [
      {
        title: 'Addressable Control Panel',
        badge: 'Multi-Loop | Microprocessor',
        image: '/services/service-fire-alarm.jpg',
        chips: ['1-4 Loops', 'LCD Display', 'Battery Backup'],
        desc: 'Intelligent multi-loop addressable panel supporting distributed detectors, modules, and repeater panels.',
        bullets: [
          'High-resolution backlit graphical display with intuitive keypad',
          'Supports up to 250 addressable nodes per loop with loop isolators',
          'Dual 24V standby battery backup for 48-hour continuous monitoring'
        ]
      },
      {
        title: 'Optical Smoke & Heat Detectors',
        badge: 'Dual Optical | Multi-Sensor',
        image: '/cctv-featured-fire-panel.jpg',
        chips: ['Early Smoke', 'Rate-of-Rise', '360° LED'],
        desc: 'High-precision photoelectric smoke and rate-of-rise thermal sensor heads with programmable sensitivity.',
        bullets: [
          'Dual-wavelength optical scattering chamber resistant to dust false alarms',
          'Built-in bi-color status LED visible from 360 degrees',
          'Plug-in twist-lock base with anti-tamper locking mechanism'
        ]
      },
      {
        title: 'Manual Call Points & Sounders',
        badge: 'Life Safety | Audible Alert',
        image: '/services/service-emergency-trip.jpg',
        chips: ['Resettable Glass', 'Dual Flash', 'IP65 Rated'],
        desc: 'Addressable manual break-glass call points and synchronized multi-tone strobe sounders for escape routes.',
        bullets: [
          'Key-resettable manual call element with addressable monitor module',
          'High-decibel multi-tone sounder beacon with ultra-bright xenon flash',
          'Weatherproof IP65 outdoor versions for industrial yard installation'
        ]
      },
      {
        title: 'Input/Output & Isolator Modules',
        badge: 'Interlock | System Trip',
        image: '/case-studies/case-fire-hydrant.jpg',
        chips: ['Form-C Relay', 'Loop Isolation', 'Monitored Input'],
        desc: 'DIN-rail and junction box modules providing dry contact tripping and short-circuit fault containment.',
        bullets: [
          'Automatic fault isolation isolates damaged cable section without loop loss',
          'Form-C potential-free relay contacts rated for AHU and door interlock trips',
          'Monitored switch input contacts for third-party waterflow switches'
        ]
      }
    ],
    technologies: {
      eyebrow: 'ADVANCED DETECTION ARCHITECTURE',
      title: 'Addressable Loop Technology & Microprocessor Polling',
      subtitle: 'High-frequency digital communication protocols delivering rapid alarm identification, continuous sensor diagnostics, and immunity to false alarms.',
      tabs: [
        {
          id: 'panel-network',
          name: 'Microprocessor Multi-Loop Network',
          badge: 'Central Intelligence Panel',
          icon: 'Cpu',
          range: 'Up to 250 devices / loop',
          speed: '< 3s full loop scan',
          standard: 'Designed in line with EN 54-2 / IS 2189',
          ipRating: 'IP30 indoor enclosure',
          summary: 'Central addressable control unit continually polls every sensor, module, and manual call point to detect alarms and electrical loop faults.',
          highlights: [
            'Digital signalling protocol with parity check prevents electrical line noise corruption',
            'Peer-to-peer ring networking across multiple panels for large industrial sites',
            'Backlit alphanumeric display provides clear zone, floor, and device location text'
          ]
        },
        {
          id: 'optical-detection',
          name: 'Photoelectric Scattering Detectors',
          badge: 'Early Smouldering Fire Detection',
          icon: 'Flame',
          range: 'Up to 100 m² coverage / unit',
          speed: '< 2s optical response',
          standard: 'Designed in line with EN 54-7 / IS 2189',
          ipRating: 'IP42 dust sealed chamber',
          summary: 'Infrared light scattering chambers detect microscopic smoke aerosols from smouldering electrical and textile fires before open flame erupts.',
          highlights: [
            'Automated drift compensation accounts for slow dust accumulation over time',
            'Programmable sensitivity threshold for cleanrooms versus industrial production zones',
            'Integrated screening mesh blocks airborne insects and particulate intrusion'
          ]
        },
        {
          id: 'thermal-sensing',
          name: 'Rate-of-Rise & Fixed Thermal Sensors',
          badge: 'Clean Heat Detection',
          icon: 'Activity',
          range: 'Up to 50 m² coverage / unit',
          speed: 'Dynamic thermistor response',
          standard: 'Designed in line with EN 54-5 / IS 2189',
          ipRating: 'IP42 / IP65 industrial options',
          summary: 'Precision thermistor array triggers an alarm upon sudden rapid temperature rise or when ambient temperature exceeds factory thresholds.',
          highlights: [
            'Ideal for dusty or steamy environments such as boiler rooms, generator bays, and kitchens',
            'Monitors both rate-of-temperature-rise (°C/min) and fixed threshold ceiling temperature',
            'Immune to exhaust fumes, cooking steam, and ambient aerosol false alarms'
          ]
        },
        {
          id: 'relay-interfaces',
          name: 'Monitored Input/Output Modules',
          badge: 'Building Interlock Automation',
          icon: 'Settings',
          range: 'Up to 1.5 km loop distance',
          speed: '< 1s relay trip time',
          standard: 'Designed in line with EN 54-18 / IS 2189',
          ipRating: 'IP40 / IP65 enclosures',
          summary: 'Interfaces the fire alarm system with external infrastructure such as air handling units, access control doors, elevator grounding, and fire dampers.',
          highlights: [
            'Potential-free dry contact relays trip high-voltage starters and dampers reliably',
            'Monitored input circuits verify waterflow switch triggers and fire pump run signals',
            'Short-circuit line isolator cuts off severed cable segments to keep loop online'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Detector Senses Hazard',
        desc: 'Optical or thermal sensor detects combustion products',
        detail: 'The optical chamber or thermistor registers elevated particulate or rapid heat rise and flags an alarm condition on the loop protocol.'
      },
      {
        step: 2,
        title: 'Panel Identifies Address',
        desc: 'Control unit locates exact device coordinates',
        detail: 'The central microprocessor decodes the node ID, sounds the panel buzzer, and displays the exact room, floor, and device description on the LCD.'
      },
      {
        step: 3,
        title: 'Alarms & Sounders Trigger',
        desc: 'Audible sounders and visual strobes activate',
        detail: 'Zoned sounder beacons and multi-tone horns activate in accordance with the site evacuation matrix, alerting occupants safely.'
      },
      {
        step: 4,
        title: 'Integrated Systems Act',
        desc: 'Relays trip doors, AHUs, and emergency systems',
        detail: 'Output modules signal access doors to unlock for emergency egress, shut down air handling units to stop smoke spread, and alert central BMS.'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Plants', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Hospitals & Healthcare', image: '/products/automatic-doors-hospital.jpg' },
      { title: 'Warehouses & Logistics', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Corporate Offices', image: '/hero-glass-atrium.jpg' },
      { title: 'Hotels & Commercial', image: '/head-office-building.jpg' },
      { title: 'Data Centres & Server Rooms', image: '/hero-security-command-center.jpg' }
    ],
    // TODO: confirm specs with engineering team
    specs: [
      { label: 'System Architecture', value: 'Addressable Loop Network, Multi-Zone' },
      { label: 'Device Capacity per Loop', value: 'Up to 250 addressable nodes (detectors, modules, call points)' },
      { label: 'Operating Voltage', value: '230V AC, 50Hz with 24V DC auxiliary battery backup' },
      { label: 'Communication Protocol', value: 'High-speed noise-immune digital polling' },
      { label: 'Event Memory Capacity', value: 'Historical event logging with non-volatile memory' },
      { label: 'Interlock Interfaces', value: 'Form-C dry contact relays for AHU, BMS, and door release' },
      { label: 'Standby Battery Autonomy', value: '24 to 48 hours standby plus 30 minutes full alarm ringing' }
    ],
    // TODO: confirm certifications before publishing
    certs: [
      { name: 'Designed in line with EN 54-2 & EN 54-4', sub: 'Control & indicating equipment and integrated power supply standards' },
      { name: 'Compliant with IS 2189 (as applicable)', sub: 'Bureau of Indian Standards code of practice for automatic fire alarm systems' },
      { name: 'Designed in line with NFPA 72', sub: 'National Fire Alarm and Signaling Code design and installation guidelines' },
      { name: 'ISO 9001:2015 – Quality Management', sub: 'Certified manufacturing, panel wiring, bench testing, and commissioning' },
      { name: 'CE & RoHS Certified Electronics (as applicable)', sub: 'Electromagnetic compatibility and hazardous substance compliance' }
    ],
    gallery: [
      { title: 'Addressable Control Panel', image: '/services/service-fire-alarm.jpg', category: 'Control Stations', desc: 'Central multi-loop addressable panel installed in control room' },
      { title: 'Smoke Detector Layout', image: '/cctv-featured-fire-panel.jpg', category: 'Detection Arrays', desc: 'Ceiling optical smoke detector array in clean production area' },
      { title: 'Manual Call Station', image: '/services/service-emergency-trip.jpg', category: 'Emergency Call', desc: 'Resettable manual call point with strobe sounder on escape route' },
      { title: 'Pump Room Integration', image: '/case-studies/case-fire-hydrant.jpg', category: 'Interlock Wiring', desc: 'Interface module monitoring fire pump flow switch status' },
      { title: 'Central Command Monitoring', image: '/hero-security-command-center.jpg', category: 'BMS Monitoring', desc: 'Central security BMS console displaying fire zone status' },
      { title: 'Cleanroom Flush Mount', image: '/hero-cleanroom-automation.jpg', category: 'Cleanroom Safety', desc: 'Flush ceiling smoke sensor integrated in pharmaceutical bay' }
    ],
    faqs: [
      {
        q: 'What is the key advantage of an Addressable Fire Alarm over a Conventional System?',
        a: 'Conventional systems indicate fire by zone only (e.g. Zone 3 on the 2nd floor), requiring personnel to search multiple rooms. Addressable systems pinpoint the exact room, detector number, and device type instantly on the panel screen, saving vital minutes during an emergency.'
      },
      {
        q: 'How does the system ensure continued operation if loop wiring is accidentally cut?',
        a: 'Addressable loops are wired in a closed ring configuration. If a wire break occurs, the control panel feeds power and signals from both ends of the loop, ensuring 100% of detectors remain online. Short-circuit isolator modules isolate only the damaged wire segment.'
      },
      {
        q: 'Can the fire alarm system automatically shut down ventilation (AHU) and unlock access doors?',
        a: 'Yes. Addressable relay modules are programmed to execute site safety matrix logic. Upon alarm confirmation, relays automatically drop power to magnetic door locks to allow free escape, de-energize air handling units (AHUs) to stop smoke circulating, and trigger fire dampers.'
      },
      {
        q: 'What battery backup is provided during a mains electrical blackout?',
        a: 'Every HTI addressable panel includes sealed lead-acid (SLA) 24V battery packs sized to sustain the complete detection network for 24 to 48 hours of normal operation followed by 30 minutes of continuous alarm horn sounders.'
      }
    ],
    cta: {
      tag: 'TURNKEY LIFE SAFETY INFRASTRUCTURE',
      title: 'Protect Your Premises with HTI Addressable Fire Alarms',
      desc: 'Connect with our certified fire protection engineering team for site surveys, loop load calculations, CAD layouts, and turnkey commissioning.'
    },
    seo: {
      title: 'Addressable Fire Alarm Systems | HTI Fire Protection & Life Safety',
      description: 'Turnkey addressable fire detection panels, optical smoke, heat, manual call points and sounders engineered for industrial plants, pharma, and commercial complexes.'
    }
  },

  // =========================================================================
  // 2. HYDRANT & SPRINKLER ARRAYS
  // =========================================================================
  'hydrant-sprinkler-arrays': {
    slug: 'hydrant-sprinkler-arrays',
    categoryName: 'Fire Protection & Life Safety',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'fire-protection' },
      { label: 'Fire Protection & Life Safety', page: 'fire-protection' },
      { label: 'Hydrant & Sprinkler Fire Fighting Systems', isCurrent: true }
    ],
    badge: 'FIRE SAFETY | HYDRANT | SPRINKLER',
    titleLine1: 'Hydrant & Sprinkler',
    titleLine2Accent: 'Fire Fighting Systems',
    tagline: 'Water where it matters, when it matters.',
    description: 'Ensure comprehensive site suppression with wet riser and hydrant networks, sprinkler and deluge arrays, landing valves and pump skids designed and commissioned as a turnkey system.',
    metrics: [
      { label: 'High-Pressure Wet Riser', icon: 'Droplets' },
      { label: 'Auto Pump Skid Sequencing', icon: 'Zap' },
      { label: 'Quartzoid Sprinkler Heads', icon: 'Activity' },
      { label: 'NFPA / NBC India Standards', icon: 'ShieldCheck' }
    ],
    heroImage: '/case-studies/case-fire-hydrant.jpg',
    heroStatusBadge: 'Hydrant Line Pressurized | Main Pump Ready',
    benefits: [
      {
        title: 'Water Where It Matters',
        desc: 'Engineered ring mains and internal wet risers deliver high-volume water suppression to every floor.',
        icon: 'Droplets'
      },
      {
        title: 'Automatic Pump Sequencing',
        desc: 'Jockey pumps maintain standby pressure while main electric and diesel pumps auto-start on demand.',
        icon: 'Zap'
      },
      {
        title: 'Comprehensive Sprinkler Coverage',
        desc: 'Thermally sensitive glass bulb sprinklers activate individually directly above heat sources.',
        icon: 'Activity'
      },
      {
        title: 'Heavy Industrial Build',
        desc: 'Heavy-gauge seamless steel piping with epoxy primer and flame-red architectural finish for 25+ years life.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Turnkey Hydraulic Engineering',
        desc: 'End-to-end hydraulic calculations, pipe sizing, pump room skids, and local fire department compliance.',
        icon: 'Settings'
      }
    ],
    showcase: {
      videoSrc: '/automatic_sliding.mp4',
      poster: '/case-studies/case-fire-hydrant.jpg',
      eyebrow: 'OPERATIONAL SHOWCASE',
      heading: 'Hydrant & Sprinkler Arrays in Action',
      description: 'Observe our high-pressure fire fighting pipe networks, automatic sprinkler grid, and pump skids engineered for immediate high-volume flame suppression.',
      features: [
        'Automatic pressure-switched pump sequencing (jockey, main electric, diesel backup)',
        'Heavy-duty cast bronze oblique landing valves with quick-release instantaneous couplings',
        'Zoned alarm check valve stations with integrated water motor gongs and flow switches',
        'Hydraulically calculated sprinkler grids for uniform density water distribution'
      ]
    },
    productsTitle: 'Our Hydrant & Sprinkler Products',
    products: [
      {
        title: 'Hydrant Network & Landing Valves',
        badge: 'Wet Riser | Heavy Bronze',
        image: '/case-studies/case-fire-hydrant.jpg',
        chips: ['Gunmetal Valves', 'Hose Reels', 'Canvas Hose'],
        desc: 'Internal and external yard hydrant posts with certified oblique landing valves and swinging hose reels.',
        bullets: [
          'Heavy forged brass and gunmetal landing valves tested to 20 bar hydrostatic pressure',
          '30-meter swinging thermoplastic hose reel drums with shut-off jet nozzles',
          'Weatherproof red sheet metal hydrant boxes with break-glass lock mechanisms'
        ]
      },
      {
        title: 'Sprinkler Arrays & Bulbs',
        badge: 'Automatic | Thermal Trigger',
        image: '/services/service-fire-doors.jpg',
        chips: ['Pendent / Upright', '68°C / 79°C', 'Brass / Chrome'],
        desc: 'Automatic fire sprinkler heads with precision quartzoid glass bulbs for commercial and warehouse grids.',
        bullets: [
          'Pendent, upright, and horizontal sidewall sprinkler heads with quick-response bulbs',
          'Pre-assembled zone control valves with pressure gauges and electrical flow switches',
          'Concealed architectural sprinkler plates for luxury offices and hotel lobbies'
        ]
      },
      {
        title: 'Fire Pump Skids (Main, Jockey, Standby)',
        badge: 'Pump Room | Triple Redundancy',
        image: '/case-studies/case-fire-hydrant.jpg',
        chips: ['Electric Main', 'Diesel Standby', 'Jockey Pump'],
        desc: 'Turnkey skid-mounted fire pump assemblies with automatic control panels, relief valves, and manifolds.',
        bullets: [
          'Multi-stage centrifugal main electric fire pump with automatic delta starter',
          'Direct-drive diesel engine standby pump ensuring water flow during total power loss',
          'Vertical jockey pump maintaining constant 7–10 bar static header line pressure'
        ]
      },
      {
        title: 'Deluge & Medium Velocity Water Spray',
        badge: 'Deluge | Transformer / Tanker',
        image: '/case-studies/case-ss304-mist.jpg',
        chips: ['Open Nozzles', 'Deluge Valve', 'Rapid Flood'],
        desc: 'Fast-acting water deluge systems for flammable chemical stores, oil-cooled transformers, and gas tanks.',
        bullets: [
          'Pneumatically or electrically tripped diaphragm deluge valves for instant pipe flooding',
          'Medium and high-velocity water spray projector nozzles for rapid flame quench',
          'Integrated foam induction proportioners for flammable hydrocarbon fuel hazards'
        ]
      }
    ],
    technologies: {
      eyebrow: 'HYDRAULIC FIRE FIGHTING SYSTEMS',
      title: 'Water Reticulation, Hydraulic Pressure & Automated Pumping',
      subtitle: 'Engineered pipe networks and automated pump sets designed to deliver guaranteed water flow rates at critical operational pressures.',
      tabs: [
        {
          id: 'wet-riser',
          name: 'Wet Riser & Hydrant Ring Mains',
          badge: 'High-Volume Reticulation',
          icon: 'Droplets',
          range: '6–12 bar header pressure',
          speed: 'Immediate water delivery',
          standard: 'Designed in line with IS 3844 / NFPA 14',
          ipRating: 'Class-C carbon steel piping',
          summary: 'Pressurized vertical risers and buried underground ring mains feed internal and yard hydrants across the complete enterprise perimeter.',
          highlights: [
            'Heavy-gauge MS piping with anti-corrosion bitumen tape wrapping or epoxy coatings',
            'Flanged isolation butterfly valves with tamper switch monitoring at each floor',
            'Dual four-way fire brigade breeching inlets allowing mobile fire tender water boosting'
          ]
        },
        {
          id: 'sprinkler-grid',
          name: 'Automatic Glass Bulb Sprinkler Arrays',
          badge: 'Localized Thermal Suppression',
          icon: 'Activity',
          range: '9–12 m² per sprinkler head',
          speed: '< 30s thermal glass burst',
          standard: 'Designed in line with NFPA 13 / IS 15105',
          ipRating: 'Brass / chrome plated heads',
          summary: 'Individual heat-activated glass bulbs shatter when ceiling temperatures rise, discharging water directly over the seat of the fire.',
          highlights: [
            'Localized discharge prevents unnecessary water damage to non-involved building zones',
            'Waterflow detector switches transmit immediate electrical floor zone alarms to the panel',
            'Available in standard 68°C (red bulb), 79°C (yellow bulb), and 93°C (green bulb) ratings'
          ]
        },
        {
          id: 'pump-automation',
          name: 'Skid-Mounted Fire Pump Sets',
          badge: 'Triple Pump Redundancy',
          icon: 'Zap',
          range: '2280 – 4500 LPM flow rates',
          speed: '< 10s auto-start sequencing',
          standard: 'Designed in line with NFPA 20 / IS 12469',
          ipRating: 'IP55 control enclosures',
          summary: 'Integrated electric, diesel, and jockey pump skids maintain constant pipe pressure and start automatically upon pressure drop.',
          highlights: [
            'Jockey pump handles minor pipeline weepage without cycling high-power main pumps',
            'Main electric pump starts automatically when landing valve or sprinkler opens',
            'Diesel engine pump starts autonomously if electric mains fail or pressure keeps dropping'
          ]
        },
        {
          id: 'deluge-systems',
          name: 'Deluge & High-Velocity Foam Spray',
          badge: 'High-Hazard Immersion',
          icon: 'Flame',
          range: 'Instant whole-zone coverage',
          speed: '< 5s deluge valve open',
          standard: 'Designed in line with NFPA 15 / NFPA 16',
          ipRating: 'Heavy cast ductile iron valves',
          summary: 'Open sprinkler nozzle arrays flooded simultaneously via a quick-opening deluge valve to cool oil-filled transformers and solvent stores.',
          highlights: [
            'Automatic activation triggered by flame detectors, heat detectors, or manual pull stations',
            'Delivers rapid cooling and blanket smothering over high-hazard flammable liquids',
            'Integrated water motor mechanical gongs sound local alarms without electrical power'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Pressure Drop or Alarm Detected',
        desc: 'Sprinkler head opens or hydrant valve is opened',
        detail: 'The shattering of a sprinkler bulb or opening of a landing valve discharges water, causing a sudden pressure drop in the header pipe.'
      },
      {
        step: 2,
        title: 'Pumps Start Automatically',
        desc: 'Pressure switch commands fire pump skid',
        detail: 'The electrical control panel detects header pressure falling below the set point and commands the main electric pump (or diesel standby) to start.'
      },
      {
        step: 3,
        title: 'Water Reaches Suppression Zone',
        desc: 'High-volume water floods the fire area',
        detail: 'Constant high-pressure water delivers continuous suppression spray through open sprinkler heads or firefighters hoses.'
      },
      {
        step: 4,
        title: 'System Resets & Is Inspected',
        desc: 'Isolation, drainage, and re-commissioning',
        detail: 'Following fire suppression, the zone isolation valve is closed, drainage opened, replacement sprinkler bulbs installed, and the line repressurized.'
      }
    ],
    applications: [
      { title: 'Industrial Manufacturing Plants', image: '/services/service-fire-doors.jpg' },
      { title: 'Warehouses & Logistics Hubs', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Commercial Office Towers', image: '/head-office-building.jpg' },
      { title: 'Hospitals & Healthcare Facilities', image: '/products/automatic-doors-hospital.jpg' },
      { title: 'Pharmaceutical Facilities', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Multi-Level Parking Structures', image: '/case-studies/case-fire-hydrant.jpg' }
    ],
    // TODO: confirm specs with engineering team
    specs: [
      { label: 'System Type', value: 'Wet Riser, External Hydrant & Automatic Sprinkler' },
      { label: 'Pump Flow Capacity', value: 'Up to 2,280 to 4,500 LPM (per hydraulic design)' },
      { label: 'Working Header Pressure', value: '7.0 to 12.0 kg/cm² (bar) continuous standby' },
      { label: 'Pipe Specifications', value: 'Heavy grade MS seamless / ERW to IS 1239 / IS 3589' },
      { label: 'Sprinkler Rating & Type', value: '68°C / 79°C Quartzoid glass bulb, 15mm / 20mm orifice' },
      { label: 'Valves & Couplings', value: 'Gunmetal / stainless steel oblique landing valves to IS 5290' },
      { label: 'Pump Skid Composition', value: 'Main electric pump + standby diesel engine pump + jockey pump' }
    ],
    // TODO: confirm certifications before publishing
    certs: [
      { name: 'Designed in line with NFPA 13, 14 & 20', sub: 'Standard for installation of sprinklers, standpipe systems and fire pumps' },
      { name: 'Compliant with IS 15105 & IS 3844 (as applicable)', sub: 'Bureau of Indian Standards code for sprinkler and hydrant installations' },
      { name: 'National Building Code (NBC) of India', sub: 'Strict adherence to Part 4 Fire and Life Safety compliance tables' },
      { name: 'ISO 9001:2015 – Certified Engineering Skids', sub: 'Fabrication, hydrostatic pressure testing, and hydraulic flow calculation' },
      { name: 'UL / FM Approved Components (as specified)', sub: 'Valves, sprinkler heads, and pump sets supplied with international approvals' }
    ],
    gallery: [
      { title: 'Hydrant Pump Room Skid', image: '/case-studies/case-fire-hydrant.jpg', category: 'Pump Stations', desc: 'Main electric and diesel standby pump skid with header manifold' },
      { title: 'Industrial Yard Hydrant', image: '/services/service-fire-alarm.jpg', category: 'External Hydrants', desc: 'Outdoor red hydrant post with dual landing valve couplings' },
      { title: 'Ceiling Sprinkler Grid', image: '/services/service-fire-doors.jpg', category: 'Sprinkler Networks', desc: 'Overhead automatic sprinkler pipework in warehouse ceiling' },
      { title: 'Zone Control Valve Station', image: '/cctv-featured-fire-panel.jpg', category: 'Zone Controls', desc: 'Floor riser alarm check valve with waterflow switch' },
      { title: 'Deluge Transformer Spray', image: '/case-studies/case-ss304-mist.jpg', category: 'Deluge Protection', desc: 'High-velocity water deluge array for electrical sub-station' },
      { title: 'Hose Reel Cabinet Installation', image: '/services/service-emergency-trip.jpg', category: 'First-Aid Equipment', desc: 'Recessed swinging hose reel cabinet on plant escape staircase' }
    ],
    faqs: [
      {
        q: 'Why is a standby diesel fire pump necessary in addition to the electric pump?',
        a: 'During major industrial fires, electrical mains power is frequently cut off or automatically tripped for firefighter safety. A diesel-driven fire pump operates entirely independently of electrical supply, guaranteeing uninterrupted high-pressure water delivery throughout the incident.'
      },
      {
        q: 'Will one fire sprinkler opening trigger all other sprinklers in the building?',
        a: 'No. Contrary to popular misconception, each fire sprinkler head acts as an independent thermal sensor. Only the sprinkler head directly exposed to the heat of the fire shatters its bulb and opens. Over 90% of building fires are controlled by just 1 to 4 sprinkler heads.'
      },
      {
        q: 'What is the role of the Jockey Pump in a fire hydrant system?',
        a: 'A small-horsepower jockey pump automatically starts and stops to compensate for minor pipeline weeping or temperature pressure variations, keeping the line at 7–10 bar without starting the heavy 50–100 HP main fire pump.'
      },
      {
        q: 'What hydrostatic pressure testing is performed on the piping network?',
        a: 'All welded and flanged fire fighting pipelines are hydrostatically tested at 1.5 times the maximum working pressure (typically 15 to 18 bar) for at least 2 to 4 hours to verify absolute leak-proof structural integrity before handover.'
      }
    ],
    cta: {
      tag: 'TURNKEY FIRE FIGHTING RETICULATION',
      title: 'Equip Your Facility with HTI Hydrant & Sprinkler Networks',
      desc: 'Our hydraulic fire engineering team provides complete site surveys, pump skid sizing, hydraulic calculations, and certified turnkey execution across India.'
    },
    seo: {
      title: 'Hydrant & Sprinkler Fire Fighting Systems | HTI Life Safety',
      description: 'Turnkey industrial fire hydrant networks, automatic glass bulb sprinkler arrays, and electric/diesel fire pump skids compliant with NBC India and NFPA standards.'
    }
  },

  // =========================================================================
  // 3. FIRE RATED DOORS & SHUTTERS
  // =========================================================================
  'fire-rated-doors-shutters': {
    slug: 'fire-rated-doors-shutters',
    categoryName: 'Fire Protection & Life Safety',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'fire-protection' },
      { label: 'Fire Protection & Life Safety', page: 'fire-protection' },
      { label: 'Fire Rated Doors & Shutters', isCurrent: true }
    ],
    badge: 'FIRE SAFETY | FIRE RATED | CONTAINMENT',
    titleLine1: 'Fire Rated Doors',
    titleLine2Accent: '& Shutters',
    tagline: 'Contain the fire. Protect the exit.',
    description: 'Ensure critical compartmentalization with certified fire-resistant doors and automatic drop shutters that compartmentalise fire and smoke and keep escape routes protected.',
    metrics: [
      { label: 'Up to 120–240 Min Fire Rating', icon: 'Shield' },
      { label: 'Gravity Fail-Safe Drop', icon: 'Activity' },
      { label: 'Intumescent Smoke Seals', icon: 'Lock' },
      { label: 'BS 476 / IS 3614 Compliance', icon: 'ShieldCheck' }
    ],
    heroImage: '/services/service-fire-doors.jpg',
    heroStatusBadge: 'Fire Containment Certified | Fusible Link Armed',
    benefits: [
      {
        title: 'Certified Fire Compartmentalization',
        desc: 'Rigid fire-tested assemblies prevent flame propagation between building zones for 120 to 240 minutes.',
        icon: 'Shield'
      },
      {
        title: 'Gravity Fail-Safe Descent',
        desc: 'Auto-drop shutters descend smoothly under gravity even when all electrical power and cables have failed.',
        icon: 'Activity'
      },
      {
        title: 'Smoke & Toxic Gas Sealing',
        desc: 'Perimeter intumescent fire seals expand dramatically under heat to seal all perimeter gaps against toxic smoke.',
        icon: 'Lock'
      },
      {
        title: 'High Mechanical Integrity',
        desc: 'Heavy galvanized and insulated steel construction withstands intense thermal warping and blast pressures.',
        icon: 'ShieldCheck'
      },
      {
        title: 'BMS & Alarm Relay Interlock',
        desc: 'Electromagnetic hold-open devices release instantly upon fire alarm panel command to close escape routes.',
        icon: 'Settings'
      }
    ],
    showcase: {
      videoSrc: '/Motorized Industrial Rolling Shutters.mp4',
      poster: '/services/service-fire-doors.jpg',
      eyebrow: 'OPERATIONAL SHOWCASE',
      heading: 'Fire Rated Doors & Shutters in Action',
      description: 'Observe our certified fire doors and automatic descent rolling shutters creating impenetrable passive fire compartments in industrial warehouses and corridors.',
      features: [
        'Controlled gravity descent regulated by mechanical centrifugal governor at 0.15 m/s',
        'Automatic dual activation via building fire alarm signal or 72°C thermal fusible link',
        'Intumescent perimeter edge strips expanding up to 25x volume to seal smoke gaps',
        'Certified fire resistance test compliance with BS 476 Part 22 and IS 3614 standards'
      ]
    },
    productsTitle: 'Our Fire Rated Door & Shutter Products',
    products: [
      {
        title: 'Fire Rated Steel Doors',
        badge: '120-240 Min | Galvanized Steel',
        image: '/services/service-fire-doors.jpg',
        chips: ['Ceramic Core', 'Vision Panel', 'Panic Bar'],
        desc: 'Insulated double-skin steel doors with mineral wool or ceramic honeycomb core for stairwells and corridors.',
        bullets: [
          'Tested to BS 476: Part 22 and IS 3614 for 120-minute and 240-minute integrity',
          'Heavy-duty stainless steel ball bearing hinges and automatic hydraulic overhead door closers',
          'Optional fire-rated clear ceramic vision glass and certified emergency panic exit push bars'
        ]
      },
      {
        title: 'Fire Rated Rolling Shutters',
        badge: 'Motorized | Heavy Slats',
        image: '/hero-industrial-doors-dock.jpg',
        chips: ['Interlocking Slats', 'Side Guides', 'End Clips'],
        desc: 'Heavy motorized rolling shutters built from curved cold-rolled steel slats designed for wide bay openings.',
        bullets: [
          'High-tensile interlocking curved steel slats with fire-expansion end lock clips',
          'Heavy tubular barrel assembly with high-torque side motor and internal safety brake',
          'Hot-dip galvanized or architectural powder-coated finish for industrial environments'
        ]
      },
      {
        title: 'Auto Drop Shutters',
        badge: 'Gravity Descent | Fail-Safe',
        image: '/services/services-hero-access.jpg',
        chips: ['Centrifugal Brake', 'Fusible Link', 'Controlled Drop'],
        desc: 'Shutters engineered to drop automatically under gravity upon fire alarm trigger or fusible link melt.',
        bullets: [
          'Internal mechanical centrifugal governor regulates descent speed safely without electricity',
          'Electromagnetic release mechanism activates upon 24V pulse from fire alarm panel',
          'Auxiliary manual haul chain allows effortless manual lifting after emergency reset'
        ]
      },
      {
        title: 'Fire Door Hardware & Closers',
        badge: 'UL Listed | Life Safety',
        image: '/services/service-emergency-trip.jpg',
        chips: ['Panic Exit Device', 'Hydraulic Closer', 'Intumescent Seal'],
        desc: 'UL-listed panic exit hardware, automatic door coordinators, and intumescent graphite seal kits.',
        bullets: [
          'Heavy rim panic exit bars allowing effortless single-push egress during dark evacuations',
          'EN 1154 certified rack-and-pinion overhead door closers with adjustable latching speed',
          'Intumescent graphite perimeter fire seals and automatic drop-down bottom smoke seals'
        ]
      }
    ],
    technologies: {
      eyebrow: 'PASSIVE FIRE CONTAINMENT ENGINEERING',
      title: 'Structural Steel Core, Thermal Insulation & Gravity Descent',
      subtitle: 'Passive compartmentalization mechanisms designed to withstand furnace temperatures exceeding 1000°C without structural failure.',
      tabs: [
        {
          id: 'steel-doors',
          name: 'Insulated Steel Fire Doors',
          badge: '120–240 Minute Resistance',
          icon: 'Shield',
          range: 'Single / Double leaf configurations',
          speed: 'Self-closing hydraulic action',
          standard: 'Designed in line with IS 3614 / BS 476',
          ipRating: 'Heavy zinc-coated galvanneal steel',
          summary: 'Double-skinned galvanized steel door leaves packed with high-density ceramic fibre insulation to prevent heat transfer to escape routes.',
          highlights: [
            'Internal steel reinforcement stiffeners welded throughout leaf length prevent heat bowing',
            'Full perimeter intumescent seals expand under heat to block lethal carbon monoxide gases',
            'Heavy-duty stainless steel locksets and door coordinators ensure flush leaf closing'
          ]
        },
        {
          id: 'fire-shutters',
          name: 'Motorized Fire Rolling Shutters',
          badge: 'Wide Industrial Openings',
          icon: 'Activity',
          range: 'Up to 8 m width single span',
          speed: '0.15 m/s controlled descent',
          standard: 'Designed in line with BS 476 / EN 1634',
          ipRating: 'Heavy cold-rolled steel slats',
          summary: 'Motorized rolling curtains designed to seal large factory bays, kitchen counters, and warehouse partition walls during fire alerts.',
          highlights: [
            'Curved double-skin or heavy single-skin cold-rolled slats resist extreme thermal expansion',
            'Heavy guide channels with flame-expansion clearance avoid curtain jamming under heat',
            'Built-in centrifugal mechanical governor keeps gravity descent at a safe, controlled speed'
          ]
        },
        {
          id: 'fusible-links',
          name: 'Fusible Link & Solenoid Releases',
          badge: 'Dual Activation Triggers',
          icon: 'Flame',
          range: 'Direct local thermal trigger',
          speed: '< 2s electromagnetic release',
          standard: 'Designed in line with UL 33 / NFPA 80',
          ipRating: 'Fail-safe gravity operation',
          summary: 'Electromagnetic hold-open releases shutter upon fire alarm signal, while secondary thermal fusible link melts independently at 72°C.',
          highlights: [
            '24V DC solenoid disengages motor brake upon signal from addressable fire alarm panel',
            'Backup mechanical fusible link melts at 72°C if electrical cabling has burned through',
            'Operates reliably without battery power, UPS, or motorized power during structural fire'
          ]
        },
        {
          id: 'intumescent-seals',
          name: 'Intumescent Seals & Hardware',
          badge: 'Smoke Containment Barriers',
          icon: 'Lock',
          range: 'Expands up to 25x volume at 150°C',
          speed: 'Continuous thermal expansion',
          standard: 'Designed in line with EN 1634-3 / BS 476',
          ipRating: 'Graphite / silicate composition',
          summary: 'High-performance graphite intumescent strips embedded in door frames and bottom edges expand into a dense foam barrier when heated.',
          highlights: [
            'Blocks cold and hot toxic smoke migration through frame clearances and door margins',
            'Automatic drop-down acoustic and smoke bottom seals seal floor gaps when closed',
            'UL-listed panic exit hardware allows effortless hand-push egress during blackout'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Fire Alarm or Fusible Link Triggers',
        desc: 'Panel signals or 72°C link melts',
        detail: 'The building fire alarm sends an electrical trip pulse to the hold-open device, or the thermal fusible link melts directly above the doorway.'
      },
      {
        step: 2,
        title: 'Shutter or Door Releases',
        desc: 'Electromagnetic clutch disengages',
        detail: 'The mechanical brake disengages, allowing the overhead rolling shutter to descend or the hydraulic closer to pull the steel door shut.'
      },
      {
        step: 3,
        title: 'Compartment Sealed',
        desc: 'Intumescent strips expand under heat',
        detail: 'As temperatures climb past 150°C, intumescent seals expand into gaps, sealing flame, heat radiation, and smoke completely inside the compartment.'
      },
      {
        step: 4,
        title: 'Escape Route Protected',
        desc: 'Corridors and stairwells remain safe',
        detail: 'Occupants evacuate safely through pressurized stairwells and corridors shielded from fire, thermal radiation, and toxic gases.'
      }
    ],
    applications: [
      { title: 'Stairwells & Exit Corridors', image: '/head-office-building.jpg' },
      { title: 'Industrial Warehouses & Logistics', image: '/hero-industrial-doors-dock.jpg' },
      { title: 'Pharmaceutical Cleanrooms', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Basement Parking Compartments', image: '/case-studies/case-fire-hydrant.jpg' },
      { title: 'Plant & Boiler Rooms', image: '/services/service-fire-doors.jpg' },
      { title: 'Commercial Mall & Kitchen Openings', image: '/services/service-emergency-trip.jpg' }
    ],
    // TODO: confirm specs with engineering team
    specs: [
      { label: 'Fire Integrity Ratings', value: '60, 120, 180, and 240 minutes (per specification)' },
      { label: 'Door Construction', value: 'Double-skinned galvanized steel with ceramic / rockwool core' },
      { label: 'Shutter Slat Material', value: 'Cold-rolled galvanized steel / insulated curved profile' },
      { label: 'Operating Mechanism', value: 'High-torque side motor with fail-safe gravity descent clutch' },
      { label: 'Release Triggers', value: '24V DC fire alarm panel signal & 72°C thermal fusible link' },
      { label: 'Smoke Sealing', value: 'High-expansion graphite intumescent seals on perimeter' },
      { label: 'Standard Hardware', value: 'Heavy SS ball bearing hinges, hydraulic closer, panic push bar' }
    ],
    // TODO: confirm certifications before publishing
    certs: [
      { name: 'Designed in line with BS 476: Part 22', sub: 'Fire tests on building materials and structures for non-loadbearing elements' },
      { name: 'Compliant with IS 3614 (as applicable)', sub: 'Bureau of Indian Standards specifications for fire doors and frame assemblies' },
      { name: 'Designed in line with EN 1634-1 & EN 1634-3', sub: 'European fire resistance and smoke control tests for door and shutter assemblies' },
      { name: 'ISO 9001:2015 – Certified Fabrication', sub: 'Standardized cold roll forming, welding, and quality-controlled assembly' },
      { name: 'CBRI / NABL Accredited Laboratory Testing', sub: 'Tested and certified by premier Indian building research and fire test institutes' }
    ],
    gallery: [
      { title: 'Fire Rated Rolling Shutter', image: '/services/service-fire-doors.jpg', category: 'Rolling Shutters', desc: 'Overhead fire-rated shutter protecting warehouse compartment' },
      { title: 'Fire Rated Steel Door', image: '/services/service-fire-alarm.jpg', category: 'Hinged Doors', desc: '120-minute fire exit door with panic push bar on stairwell' },
      { title: 'Gravity Descent Shutter Head', image: '/hero-industrial-doors-dock.jpg', category: 'Drive Assemblies', desc: 'Mechanical centrifugal governor and motor release mechanism' },
      { title: 'Double Leaf Fire Door', image: '/head-office-building.jpg', category: 'Double Doors', desc: 'Double leaf fire door with automatic coordinator in corporate corridor' },
      { title: 'Cleanroom Fire Barrier Door', image: '/hero-cleanroom-automation.jpg', category: 'Cleanroom Safety', desc: 'Flush fire-resistant door integrated into pharma cleanroom partition' },
      { title: 'Kitchen Service Fire Shutter', image: '/services/service-emergency-trip.jpg', category: 'Counter Shutters', desc: 'Automatic drop counter shutter protecting cafeteria server hatch' }
    ],
    faqs: [
      {
        q: 'How does an auto-drop fire shutter close if building electrical power has failed completely?',
        a: 'The shutter does not rely on electrical power to close. When the fire alarm triggers or the thermal link melts, a mechanical clutch disengages the motor brake. The heavy curtain descends under its own weight, with descent speed safely governed by an internal mechanical centrifugal brake.'
      },
      {
        q: 'What is the purpose of the 72°C thermal fusible link?',
        a: 'The fusible link acts as an absolute fail-safe mechanical trigger. Even if fire cables are completely burned through or the electronic alarm panel fails, the eutectic alloy link melts at 72°C, mechanically releasing the shutter curtain to drop and seal the opening.'
      },
      {
        q: 'What is the difference between Fire Integrity and Fire Insulation ratings?',
        a: 'Integrity (E) measures the doors ability to physically contain flames and hot gases without cracks developing. Insulation (I) measures its ability to limit temperature rise on the unexposed side, protecting personnel standing on the exit stairwell from radiant heat burns.'
      },
      {
        q: 'Are fire rated doors required to have automatic door closers?',
        a: 'Yes. Every fire door must be self-closing under statutory building safety codes (such as NBC Part 4 and NFPA 80). Hydraulic overhead door closers guarantee the door latches firmly shut every time it is used, maintaining the fire compartment.'
      }
    ],
    cta: {
      tag: 'PASSIVE FIRE PROTECTION ENGINEERING',
      title: 'Secure Your Escape Routes with HTI Fire Doors & Shutters',
      desc: 'Contact our fire containment specialists for fire rating consultations, structural frame drawings, and certified turnkey installations across India.'
    },
    seo: {
      title: 'Fire Rated Doors & Shutters | HTI Fire Protection & Life Safety',
      description: 'Certified 120-240 minute fire rated steel doors, automatic drop shutters, and passive fire containment hardware engineered for industrial, commercial, and cleanroom facilities.'
    }
  },

  // =========================================================================
  // 4. PUBLIC ADDRESS (PA) & VOICE EVACUATION
  // =========================================================================
  'public-address-system': {
    slug: 'public-address-system',
    categoryName: 'Fire Protection & Life Safety',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'fire-protection' },
      { label: 'Fire Protection & Life Safety', page: 'fire-protection' },
      { label: 'Public Address & Voice Evacuation Systems', isCurrent: true }
    ],
    badge: 'LIFE SAFETY | VOICE EVACUATION | PA',
    titleLine1: 'Public Address &',
    titleLine2Accent: 'Voice Evacuation',
    tagline: 'Clear instructions when every second counts.',
    description: 'Guide occupants safely during emergencies with zoned voice evacuation, emergency sirens and plant horns integrated with the fire alarm for clear, prioritised announcements.',
    metrics: [
      { label: 'Multi-Zone Voice Routing', icon: 'Volume2' },
      { label: 'Fire Alarm Priority Override', icon: 'Zap' },
      { label: 'Continuous Speaker Line Check', icon: 'Activity' },
      { label: 'EN 54-16 / IS Standards', icon: 'ShieldCheck' }
    ],
    heroImage: '/products/public-address-evac.jpg',
    heroStatusBadge: 'PA Matrix Online | Voice Evacuation Standby',
    benefits: [
      {
        title: 'Clear Voice Evacuation',
        desc: 'Pre-recorded clear spoken instructions prevent mass panic and direct building occupants to safe exits.',
        icon: 'Volume2'
      },
      {
        title: 'Fire Alarm Priority Override',
        desc: 'Emergency announcements automatically mute background music and commercial paging instantly.',
        icon: 'Zap'
      },
      {
        title: 'Multi-Zone Plant Paging',
        desc: 'Selectively broadcast to specific floors, production bays, or the entire enterprise campus.',
        icon: 'Layers'
      },
      {
        title: 'Monitored Speaker Circuits',
        desc: 'Continuous line impedance supervision flags broken speaker wires and ground faults immediately.',
        icon: 'Activity'
      },
      {
        title: 'Emergency Power Autonomy',
        desc: 'Integrated 24V battery backup systems keep voice evacuation functional through severe electrical blackouts.',
        icon: 'ShieldCheck'
      }
    ],
    showcase: {
      videoSrc: '/CCTV-Surveillance- &-Biometrics.mp4',
      poster: '/hero-security-command-center.jpg',
      eyebrow: 'OPERATIONAL SHOWCASE',
      heading: 'Public Address & Voice Evacuation in Action',
      description: 'Observe our intelligent voice alarm matrix routing multi-zone emergency evacuation announcements and siren tones across large enterprise facilities.',
      features: [
        'Automated multi-lingual voice evacuation messages triggered by fire panel contacts',
        'Zoned matrix controller with remote desktop paging consoles and pre-chime tones',
        'Continuous 100V speaker line impedance monitoring for cut and short detection',
        'Emergency battery backup keeping emergency announcements active through blackouts'
      ]
    },
    productsTitle: 'Our Public Address & Voice Evacuation Products',
    products: [
      {
        title: 'PA Amplifier & Matrix Controller',
        badge: 'Multi-Zone | Modular',
        image: '/hero-security-command-center.jpg',
        chips: ['100V Line', 'Zone Matrix', 'DSP Audio'],
        desc: 'Central digital signal processor amplifier matrix with priority voice evacuation message storage.',
        bullets: [
          'Modular class-D audio power amplifier with automatic standby amplifier switchover',
          'Multi-channel zone matrix routing emergency voice to affected fire zones first',
          'Flash memory storing multi-lingual emergency evacuation and alert broadcasts'
        ]
      },
      {
        title: 'Ceiling & Wall Speakers',
        badge: 'EN 54-24 | High Intelligibility',
        image: '/cctv-featured-fire-panel.jpg',
        chips: ['Metal Dome', 'Fire Dome', '100V Tappings'],
        desc: 'High-intelligibility ceiling and wall mount speakers equipped with steel fire domes and thermal fuses.',
        bullets: [
          'Steel fire dome back-boxes prevent fire spreading into ceiling voids',
          'High speech transmission index (STI) ensuring clear words across noisy lobbies',
          'Multiple wattage tappings (6W / 3W / 1.5W) for customized acoustic levels'
        ]
      },
      {
        title: 'Emergency Sirens & Plant Horns',
        badge: 'High Decibel | Weatherproof',
        image: '/services/service-emergency-trip.jpg',
        chips: ['Up to 120 dB', 'IP66 Rated', 'Re-entrant Horn'],
        desc: 'Heavy-duty re-entrant acoustic horn speakers and motor sirens for loud factory floors and outdoor yards.',
        bullets: [
          'High-efficiency sound output delivering up to 120 dB acoustic penetration',
          'UV-stabilized weatherproof IP66 aluminum housing for corrosive outdoor plants',
          'Integrated multi-tone alarm generators for distinct fire, gas, and all-clear signals'
        ]
      },
      {
        title: 'Paging Microphone Stations',
        badge: 'Desktop Console | Priority',
        image: '/services/service-fire-alarm.jpg',
        chips: ['Gooseneck Mic', 'Zone Select Keys', 'All-Call'],
        desc: 'Remote desktop microphone stations with programmable zone selection keys and master emergency override.',
        bullets: [
          'Flexible noise-cancelling gooseneck condenser microphone element',
          'Individual zone selection buttons plus instant "All-Call" emergency broadcast button',
          'Monitored Cat6 or RS485 communication link back to the central PA controller rack'
        ]
      }
    ],
    technologies: {
      eyebrow: 'INTELLIGENT VOICE ALARM INFRASTRUCTURE',
      title: 'Digital Signal Processing, 100V Lines & Line Supervision',
      subtitle: 'Engineered acoustics delivering high speech intelligibility (STI) and fail-safe multi-zone routing across complex multi-story facilities.',
      tabs: [
        {
          id: 'matrix-controller',
          name: 'Digital Voice Alarm Matrix',
          badge: 'Central Sound Management',
          icon: 'Cpu',
          range: '8 to 64+ configurable zones',
          speed: '< 0.5s priority switchover',
          standard: 'Designed in line with EN 54-16 / IS 1819',
          ipRating: '19-inch rack mount enclosure',
          summary: 'Central DSP controller managing audio distribution, scheduled chimes, background music, and emergency fire alarm overrides.',
          highlights: [
            'Instant priority override mutes all commercial audio upon fire alarm relay contact',
            'Solid-state non-volatile memory stores pre-recorded evacuation and warning instructions',
            'Automatic amplifier surveillance switches to standby amplifier if primary channel fails'
          ]
        },
        {
          id: 'speaker-network',
          name: '100V Constant Voltage Distribution',
          badge: 'Long-Distance Audio Lines',
          icon: 'Volume2',
          range: 'Up to 2 km cable run',
          speed: 'Zero audible line loss',
          standard: 'Designed in line with EN 54-24',
          ipRating: 'Flame-retardant enclosures',
          summary: 'High-voltage 100V transformer distribution enables hundreds of speakers to be powered across kilometers of wiring without signal degradation.',
          highlights: [
            'Step-up and step-down line transformers minimize cable copper gauge requirements',
            'Fire-resistant silicone cabling ensures announcements continue during structural fire',
            'High acoustic output engineered to overcome background machinery and ambient plant noise'
          ]
        },
        {
          id: 'line-supervision',
          name: 'Continuous Line Impedance Monitoring',
          badge: 'Self-Testing Audio Circuits',
          icon: 'Activity',
          range: 'Continuous 24/7 scanning',
          speed: '< 10s fault reporting',
          standard: 'Designed in line with EN 54-16',
          ipRating: 'Built-in diagnostic hardware',
          summary: 'Inaudible high-frequency pilot tone continually measures speaker loop impedance to detect severed wires, grounds, or short circuits.',
          highlights: [
            'Alerts control room operators instantly if a speaker line is severed or damaged',
            'Identifies earth leakage faults before electrical amplifier damage can occur',
            'Logs all line integrity test records in compliance with life safety audit standards'
          ]
        },
        {
          id: 'paging-consoles',
          name: 'Emergency Paging Microphones',
          badge: 'Operator Control Stations',
          icon: 'Zap',
          range: 'Up to 1 km from main rack',
          speed: 'Instantaneous push-to-talk',
          standard: 'Designed in line with EN 54-16',
          ipRating: 'Durable metal housing',
          summary: 'Ergonomic desktop paging consoles allow safety wardens to broadcast clear live evacuation guidance to individual floors or the entire site.',
          highlights: [
            'Prioritized audio channel cuts through automated messages for live instruction',
            'Illuminated zone status LEDs indicate active broadcast zones clearly',
            'Protected emergency broadcast button with anti-tamper flip cover'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Fire Alarm or Manual Trigger',
        desc: 'Relay pulse or console push activates system',
        detail: 'The building fire alarm panel energizes a priority trigger input, or an operator activates the emergency console.'
      },
      {
        step: 2,
        title: 'Evacuation Zone Selected',
        desc: 'Matrix determines affected areas',
        detail: 'The digital audio matrix selects the fire-affected floors and adjacent zones for immediate phased evacuation signalling.'
      },
      {
        step: 3,
        title: 'Spoken Evacuation Message Plays',
        desc: 'Clear spoken instructions broadcast',
        detail: 'Pre-recorded multi-lingual voice messages and attention-grabbing sirens broadcast over 100V speakers, preventing panic.'
      },
      {
        step: 4,
        title: 'Normal Audio Restored',
        desc: 'System resets after safety confirmation',
        detail: 'Once the incident is safely resolved and the panel reset, normal background audio, general paging, and chime functions resume.'
      }
    ],
    applications: [
      { title: 'Manufacturing Factories', image: '/services/service-fire-doors.jpg' },
      { title: 'Hospitals & Medical Centres', image: '/products/automatic-doors-hospital.jpg' },
      { title: 'Corporate Headquarters', image: '/hero-glass-atrium.jpg' },
      { title: 'University & College Campuses', image: '/head-office-building.jpg' },
      { title: 'Shopping Malls & Retail', image: '/services/service-emergency-trip.jpg' },
      { title: 'Logistics Warehouses', image: '/hero-industrial-doors-dock.jpg' }
    ],
    // TODO: confirm specs with engineering team
    specs: [
      { label: 'System Configuration', value: 'Centralized Digital Matrix, Multi-Zone 100V Line' },
      { label: 'Amplifier Power', value: 'Scalable Class-D Modular (120W, 240W, 500W per channel)' },
      { label: 'Zone Capacity', value: '8 to 64+ software-configurable acoustic zones' },
      { label: 'Speaker Line Voltage', value: '100V / 70V balanced constant voltage distribution' },
      { label: 'Emergency Power Autonomy', value: '24V DC battery backup with automatic battery charger' },
      { label: 'Line Monitoring', value: 'Continuous inaudible pilot tone line impedance supervision' },
      { label: 'Integration Interfaces', value: 'Dry contact relay inputs, TCP/IP, and Modbus/BMS' }
    ],
    // TODO: confirm certifications before publishing
    certs: [
      { name: 'Designed in line with EN 54-16', sub: 'Voice alarm control and indicating equipment European standards' },
      { name: 'Designed in line with EN 54-24', sub: 'Components of voice alarm systems – Loudspeakers specifications' },
      { name: 'Compliant with IS 1819 (as applicable)', sub: 'Bureau of Indian Standards code of practice for public address systems' },
      { name: 'ISO 9001:2015 – Quality Certified Assembly', sub: 'Acoustic measurement, rack fabrication, and sound pressure testing' },
      { name: 'CE & RoHS Certified Audio Electronics', sub: 'Certified electromagnetic immunity and low-noise operational compliance' }
    ],
    gallery: [
      { title: 'Central PA Rack Controller', image: '/hero-security-command-center.jpg', category: 'Control Racks', desc: '19-inch audio matrix amplifier rack installed in security room' },
      { title: 'Industrial Horn Speakers', image: '/services/service-fire-doors.jpg', category: 'Horn Speakers', desc: 'High-decibel re-entrant horn speakers mounted in production bay' },
      { title: 'Ceiling Fire Dome Speaker', image: '/cctv-featured-fire-panel.jpg', category: 'Ceiling Speakers', desc: 'Recessed ceiling speaker with metal fire dome in corporate corridor' },
      { title: 'Desktop Paging Console', image: '/services/service-fire-alarm.jpg', category: 'Microphones', desc: 'Gooseneck multi-zone paging console on reception desk' },
      { title: 'Emergency Siren Station', image: '/services/service-emergency-trip.jpg', category: 'Siren Systems', desc: 'High-output audible siren beacon in warehouse aisle' },
      { title: 'Outdoor Yard Projector', image: '/case-studies/case-fire-hydrant.jpg', category: 'Outdoor Audio', desc: 'Weatherproof sound projector mounted on perimeter post' }
    ],
    faqs: [
      {
        q: 'Why is Voice Evacuation preferred over standard fire alarm bells or sirens?',
        a: 'Standard bells and sirens only communicate that an alarm is active, frequently leading to confusion, panic, or being ignored as false alarms. Spoken voice messages clearly inform occupants of the nature of the emergency and direct them to safe exits, cutting evacuation time by over 50%.'
      },
      {
        q: 'What is Phased Evacuation and how does the PA system support it?',
        a: 'In high-rise towers or large industrial plants, evacuating all occupants simultaneously causes dangerous bottlenecks on stairwells. Phased evacuation immediately directs occupants on the fire floor and adjacent floors to exit first, while placing other floors on alert standby.'
      },
      {
        q: 'What happens if a speaker cable is severed during an emergency?',
        a: 'With continuous line impedance monitoring, the central matrix flags the cable fault instantly. Where loop wiring or interleaved A/B speaker circuits are implemented, alternate speakers along the corridor remain fully operational, ensuring speech intelligibility is maintained.'
      },
      {
        q: 'Can the Public Address system be used for daily background music and general paging?',
        a: 'Yes! The system functions seamlessly for everyday multi-zone background music, bell chimes, and staff announcements. When a fire alarm or emergency override occurs, all non-critical audio is instantly muted and priority emergency broadcasts take over.'
      }
    ],
    cta: {
      tag: 'TURNKEY VOICE EVACUATION INFRASTRUCTURE',
      title: 'Equip Your Facility with HTI Public Address & Voice Alarm',
      desc: 'Our acoustic and life safety engineers provide acoustic coverage modeling, speech intelligibility (STI) calculations, and turnkey installation across India.'
    },
    seo: {
      title: 'Public Address & Voice Evacuation Systems | HTI Life Safety',
      description: 'Zoned Public Address and emergency voice evacuation systems integrated with fire alarm panels for commercial buildings, factories, and campuses.'
    }
  },

  // =========================================================================
  // 5. GAS LEAK DETECTION
  // =========================================================================
  'gas-leak-detection': {
    slug: 'gas-leak-detection',
    categoryName: 'Fire Protection & Life Safety',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'fire-protection' },
      { label: 'Fire Protection & Life Safety', page: 'fire-protection' },
      { label: 'Gas Leak Detection Systems', isCurrent: true }
    ],
    badge: 'LIFE SAFETY | GAS DETECTION | MONITORING',
    titleLine1: 'Gas Leak',
    titleLine2Accent: 'Detection Systems',
    tagline: 'See the leak before it becomes an incident.',
    description: 'Ensure worker safety and environmental compliance with fixed detectors for toxic, combustible, VOC and ammonia gases with alarms, relay outputs and shut-off integration.',
    metrics: [
      { label: 'Toxic & Combustible Sensing', icon: 'Activity' },
      { label: 'Fast PPM / LEL Trigger', icon: 'Zap' },
      { label: 'Auto Solenoid Shut-Off', icon: 'ShieldCheck' },
      { label: 'ATEX / PESO Hazardous Rated', icon: 'Flame' }
    ],
    heroImage: '/services/service-gas-leak-detector.jpg',
    heroStatusBadge: 'Gas Sensors Calibrated | Atmosphere Normal',
    benefits: [
      {
        title: 'See Leaks Before Incidents',
        desc: 'Continuous electrochemical and catalytic monitoring detects ppm leaks long before flammable or toxic thresholds.',
        icon: 'Activity'
      },
      {
        title: 'Multi-Gas Sensor Compatibility',
        desc: 'Modular sensor heads monitor toxic, combustible (LEL), VOC, refrigerant, and ammonia gases simultaneously.',
        icon: 'Layers'
      },
      {
        title: 'Automatic Solenoid Shut-Off',
        desc: 'Direct relay outputs slam shut gas pipeline safety shut-off valves instantly upon alarm verification.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Emergency Exhaust Activation',
        desc: 'Interlocked relays turn on explosion-proof exhaust fans to purge and dilute hazardous gas build-ups.',
        icon: 'Settings'
      },
      {
        title: 'Flameproof Hazardous Area Certified',
        desc: 'Heavy cast aluminum and stainless steel flameproof housings certified for Zone 1 and Zone 2 environments.',
        icon: 'Flame'
      }
    ],
    showcase: {
      videoSrc: '/automatic_sliding.mp4',
      poster: '/case-studies/case-ss304-mist.jpg',
      eyebrow: 'OPERATIONAL SHOWCASE',
      heading: 'Gas Leak Detection in Action',
      description: 'Observe our hazardous gas monitoring network detecting volatile leaks in real time, alerting operators, and tripping automated pipeline shut-off valves.',
      features: [
        'Continuous 4-20mA and RS485 telemetry to central multi-channel gas controller',
        'Automatic dual-level alarm setpoints (Warning / Critical Emergency Trip)',
        'Direct interlocking with pneumatic gas slam-shut valves and exhaust fans',
        'Certified flameproof Ex d IIC enclosures for hazardous explosion-risk areas'
      ]
    },
    productsTitle: 'Our Gas Leak Detection Products',
    products: [
      {
        title: 'Toxic Gas Detectors',
        badge: 'Electrochemical | PPM Precision',
        image: '/case-studies/case-ss304-mist.jpg',
        chips: ['CO, Cl2, H2S, SO2', 'PPM Accuracy', 'Flameproof'],
        desc: 'Electrochemical sensor transmitters designed for rapid detection of toxic gases in chemical and pharma plants.',
        bullets: [
          'High-sensitivity electrochemical sensor cells measuring parts-per-million (PPM)',
          'Local backlit digital LCD display showing real-time ambient concentration',
          'Heavy stainless steel sensor head with hydrophobic splash protection shield'
        ]
      },
      {
        title: 'Combustible Gas Detectors',
        badge: 'Catalytic / NDIR | 0-100% LEL',
        image: '/services/service-fire-alarm.jpg',
        chips: ['LPG, PNG, Methane', '0-100% LEL', 'Pellistor'],
        desc: 'Catalytic pellistor and non-dispersive infrared (NDIR) transmitters for hydrocarbon and flammable gas leaks.',
        bullets: [
          'Calibrated for Lower Explosive Limit (0-100% LEL) of target combustible gas',
          'Fast T90 response time under 10 seconds for rapid emergency intervention',
          'Poison-resistant catalytic pellistors resilient against silicones and lead'
        ]
      },
      {
        title: 'VOC & Ammonia Sensors',
        badge: 'Photoionization | Refrigeration',
        image: '/hero-cleanroom-automation.jpg',
        chips: ['NH3 Ammonia', 'PID for VOCs', 'Cold Storage'],
        desc: 'Specialized detectors for cold storage ammonia refrigeration circuits and industrial chemical VOC solvents.',
        bullets: [
          'Wide-range ammonia sensors engineered for extreme cold down to -30°C',
          'High-accuracy photoionization detector (PID) lamps for volatile organic compounds',
          'Configurable dual alarm relays for warning beacon and plant shut-off'
        ]
      },
      {
        title: 'Gas Monitoring Panel',
        badge: 'Multi-Channel | Wall Mount',
        image: '/hero-security-command-center.jpg',
        chips: ['4-16 Channels', 'Bar Graph', 'Modbus RTU'],
        desc: 'Central multi-channel gas control unit providing visual bar graphs, audible sirens, and relay outputs.',
        bullets: [
          'Microprocessor controller displaying gas levels for up to 16 channels simultaneously',
          'User-adjustable Low and High alarm setpoints with latching relay contacts',
          'RS485 Modbus telemetry linking all gas readings to the central plant SCADA/BMS'
        ]
      }
    ],
    technologies: {
      eyebrow: 'HAZARDOUS ATMOSPHERE SENSING',
      title: 'Electrochemical, Catalytic Pellistor & Optical NDIR Sensing',
      subtitle: 'Precision gas sensing elements calibrated for industrial process areas, gas manifolds, boiler rooms, and chemical storage.',
      tabs: [
        {
          id: 'toxic-sensing',
          name: 'Electrochemical Toxic Sensors',
          badge: 'Parts-Per-Million Accuracy',
          icon: 'Activity',
          range: '0 – 100 ppm typical',
          speed: '< 15s T90 response',
          standard: 'Designed in line with EN 50271 / IS 16335',
          ipRating: 'IP66 flameproof Ex d',
          summary: 'Electrochemical cell generates an electrical current directly proportional to the concentration of target toxic gas.',
          highlights: [
            'Specific to target gas (e.g. CO, Cl2, H2S, NH3, SO2) with minimal cross-sensitivity',
            'Low power consumption allows long-distance 2-wire 4-20mA loop operation',
            'Built-in calibration memory stores zero and span calibration constants'
          ]
        },
        {
          id: 'combustible-sensing',
          name: 'Catalytic Pellistor Flammable Sensing',
          badge: 'Lower Explosive Limit (LEL)',
          icon: 'Flame',
          range: '0 – 100% LEL',
          speed: '< 10s T90 response',
          standard: 'Designed in line with EN 60079-29-1',
          ipRating: 'Heavy cast aluminum Ex d',
          summary: 'Matched catalytic and reference pellistors combust flammable gas traces, producing a resistance change proportional to explosive risk.',
          highlights: [
            'Essential for LPG, LNG, natural gas, methane, propane, and hydrogen storage zones',
            'Sintered stainless steel flame arrestor prevents sensor ignition of ambient explosive air',
            'Dual warning setpoints (typically 20% LEL Warning, 40% LEL Critical Shut-off)'
          ]
        },
        {
          id: 'ndir-sensing',
          name: 'Optical Non-Dispersive Infrared (NDIR)',
          badge: 'Fail-Safe Optical Technology',
          icon: 'Zap',
          range: '0 – 100% Vol / LEL',
          speed: '< 5s optical response',
          standard: 'Designed in line with IEC 60079',
          ipRating: 'IP66 / IP67 waterproof',
          summary: 'Measures hydrocarbon gas concentration via infrared light absorption; cannot be poisoned by silicones and operates in zero-oxygen atmospheres.',
          highlights: [
            'Immune to sensor poisoning agents that damage standard catalytic sensors',
            'Operates in inert nitrogen-blanketed tanks with zero oxygen present',
            'Extended calibration lifespan lasting over 5 years with minimal drift'
          ]
        },
        {
          id: 'control-panel',
          name: 'Multi-Channel Gas Controller',
          badge: 'Trip Automation Hub',
          icon: 'Cpu',
          range: '4 to 16 detector channels',
          speed: '< 0.5s relay trip',
          standard: 'Designed in line with EN 50545 / IS 16335',
          ipRating: 'IP54 / IP65 wall unit',
          summary: 'Rack or wall-mounted central panel aggregating multi-point sensor signals and commanding emergency shutdown systems.',
          highlights: [
            'High-visibility graphical LCD displaying real-time gas bar graphs per channel',
            'Form-C potential-free relay contacts trip gas solenoid valves and exhaust fans',
            'RS485 Modbus RTU communication connects all readings to plant DCS/SCADA'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Sensor Measures Gas Level',
        desc: 'Electrochemical or catalytic cell detects ppm / LEL',
        detail: 'The sensor element continuously samples ambient air and converts gas concentration into a standardized 4-20mA analog signal.'
      },
      {
        step: 2,
        title: 'Controller Compares to Set Points',
        desc: 'Panel verifies Warning and Critical levels',
        detail: 'The multi-channel controller compares readings to programmed thresholds (e.g. 20% LEL Warning, 40% LEL Critical Trip).'
      },
      {
        step: 3,
        title: 'Alarms & Ventilation Trigger',
        desc: 'Horns sound and exhaust fans activate',
        detail: 'Local flameproof strobe horns alert workers while interlock relays power on explosion-proof exhaust fans to ventilate the area.'
      },
      {
        step: 4,
        title: 'Solenoid Valve Isolates Supply',
        desc: 'Main gas line shuts down automatically',
        detail: 'If concentration hits critical thresholds, a fast-acting solenoid safety shut-off valve slams closed, isolating gas supply at the source.'
      }
    ],
    applications: [
      { title: 'Chemical & Petrochemical Plants', image: '/services/service-fire-doors.jpg' },
      { title: 'Cold Storage & Ammonia Plants', image: '/case-studies/case-ss304-mist.jpg' },
      { title: 'Research & Testing Laboratories', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Pharma Utility & Solvent Stores', image: '/hero-cleanroom-interlock-chamber.jpg' },
      { title: 'Industrial Boiler & Generator Rooms', image: '/case-studies/case-fire-hydrant.jpg' },
      { title: 'Underground Parking Structures', image: '/services/service-emergency-trip.jpg' }
    ],
    // TODO: confirm specs with engineering team
    specs: [
      { label: 'Gases Detected', value: 'Toxic (CO, H2S, Cl2, NH3, SO2), Combustible (LPG, PNG, H2), VOCs' },
      { label: 'Sensor Technology', value: 'Electrochemical, Catalytic Pellistor, NDIR Infrared, PID' },
      { label: 'Signal Output', value: '3-wire 4-20mA analog & RS485 Modbus RTU digital telemetry' },
      { label: 'Response Time (T90)', value: '< 10 to 15 seconds (gas specific)' },
      { label: 'Hazardous Area Rating', value: 'Flameproof Ex d IIC T6 Gb (Zone 1 and Zone 2)' },
      { label: 'Operating Temperature', value: '-20°C to +55°C (special -30°C models for cold stores)' },
      { label: 'Trip Integration', value: 'Programmable dual relays for exhaust fans and solenoid valves' }
    ],
    // TODO: confirm certifications before publishing
    certs: [
      { name: 'Designed in line with IS/IEC 60079-0 & 60079-1', sub: 'Explosive atmospheres – Equipment protection by flameproof enclosures Ex d' },
      { name: 'PESO (CCOE) Certification (as applicable)', sub: 'Petroleum and Explosives Safety Organisation compliance for hazardous plants' },
      { name: 'Designed in line with EN 50271 / EN 60079-29-1', sub: 'Gas detectors – Performance requirements for combustible and toxic gas' },
      { name: 'ISO 9001:2015 – Quality Certified Assembly', sub: 'Standardized sensor calibration, burn-in testing, and enclosure sealing' },
      { name: 'CE & ATEX Compliant Transmitters (as specified)', sub: 'Certified European hazardous equipment and electromagnetic safety' }
    ],
    gallery: [
      { title: 'Flameproof Toxic Gas Detector', image: '/case-studies/case-ss304-mist.jpg', category: 'Sensor Heads', desc: 'Ex d flameproof gas sensor head with local LCD ppm reading' },
      { title: 'Multi-Channel Gas Controller', image: '/hero-security-command-center.jpg', category: 'Control Panels', desc: 'Central multi-channel wall console monitoring plant gas levels' },
      { title: 'Gas Manifold Safety Skid', image: '/case-studies/case-fire-hydrant.jpg', category: 'Pipeline Safety', desc: 'Automated gas shut-off valve manifold with local detector' },
      { title: 'Cold Storage Ammonia Sensor', image: '/hero-cleanroom-automation.jpg', category: 'Cold Storage', desc: 'Low-temperature ammonia sensor mounted in refrigeration bay' },
      { title: 'Flameproof Strobe Horn', image: '/services/service-emergency-trip.jpg', category: 'Audio Visual', desc: 'Zone 1 flameproof beacon and siren unit mounted in chemical plant' },
      { title: 'Boiler Room Methane Monitor', image: '/services/service-fire-doors.jpg', category: 'Utility Safety', desc: 'Catalytic LEL gas detector protecting industrial boiler room' }
    ],
    faqs: [
      {
        q: 'What is the difference between Lower Explosive Limit (LEL) and Parts-Per-Million (PPM)?',
        a: 'LEL (Lower Explosive Limit) measures the minimum concentration of a combustible gas required to burn in air; combustible gas detectors monitor 0-100% of this limit. PPM (Parts-Per-Million) measures trace concentrations of highly toxic gases (like Chlorine or Carbon Monoxide) where even tiny fractions cause human harm.'
      },
      {
        q: 'How frequently do gas leak detectors require calibration?',
        a: 'Industrial safety standards recommend bump testing every 3 to 6 months and full span calibration annually using certified calibration test gas canisters to verify sensor accuracy and compensate for natural electrochemical aging.'
      },
      {
        q: 'Can the gas detection system trigger automatic gas pipeline shut-off valves?',
        a: 'Yes! The control panel features potential-free relay contacts that de-energize or pulse emergency gas solenoid slam-shut valves, isolating gas cylinders or pipeline supply instantly upon high-level leak verification.'
      },
      {
        q: 'Where should gas detectors be installed – near the ceiling or near the floor?',
        a: 'Placement depends on the molecular weight of the gas compared to air. Gases lighter than air (like methane and hydrogen) rise, requiring detectors near the ceiling. Gases heavier than air (like LPG, propane, and chlorine) sink, requiring detectors 30 cm above the floor.'
      }
    ],
    cta: {
      tag: 'HAZARDOUS GAS SAFETY INFRASTRUCTURE',
      title: 'Protect Your Facility with HTI Gas Leak Detection Systems',
      desc: 'Our hazardous safety engineers provide gas hazard assessments, sensor mapping, ATEX/PESO flameproof hardware, and turnkey commissioning.'
    },
    seo: {
      title: 'Gas Leak Detection Systems | HTI Fire Protection & Life Safety',
      description: 'Turnkey toxic and combustible gas leak detection transmitters, flameproof Ex d sensors, and automated solenoid shut-off systems for chemical, cold storage, and pharma plants.'
    }
  },

  // =========================================================================
  // 6. EMERGENCY AUTO TRIP
  // =========================================================================
  'emergency-auto-trip': {
    slug: 'emergency-auto-trip',
    categoryName: 'Fire Protection & Life Safety',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'fire-protection' },
      { label: 'Fire Protection & Life Safety', page: 'fire-protection' },
      { label: 'Emergency Auto Trip Integration', isCurrent: true }
    ],
    badge: 'LIFE SAFETY | INTEGRATION | AUTO TRIP',
    titleLine1: 'Emergency',
    titleLine2Accent: 'Auto Trip Integration',
    tagline: 'One alarm. Every system responds.',
    description: 'Ensure synchronized life safety response with relay integration that releases access doors, shuts down AHUs and starts fire pumps automatically when the fire alarm activates.',
    metrics: [
      { label: 'Unified Alarm Interlocking', icon: 'Settings' },
      { label: 'Millisecond Relay Tripping', icon: 'Zap' },
      { label: 'Fail-Safe Egress Release', icon: 'Lock' },
      { label: 'NBC / NFPA Interlock Code', icon: 'ShieldCheck' }
    ],
    heroImage: '/services/service-emergency-trip.jpg',
    heroStatusBadge: 'Trip Relays Armed | Interlocks Healthy',
    benefits: [
      {
        title: 'One Alarm. Every System Responds',
        desc: 'A single confirmed fire alarm triggers coordinated, synchronized safety actions across all facility systems.',
        icon: 'Settings'
      },
      {
        title: 'Instant Life Safety Door Release',
        desc: 'Magnetic locks and access control doors unlock immediately to allow uninhibited occupant evacuation.',
        icon: 'Lock'
      },
      {
        title: 'Automated Smoke Isolation',
        desc: 'Air handling units (AHUs) trip offline and motorized fire dampers close to stop smoke circulating through ducts.',
        icon: 'Activity'
      },
      {
        title: 'Automatic Fire Pump Engagement',
        desc: 'Main electric and diesel pump starters receive automated start signals for immediate pipeline pressurization.',
        icon: 'Zap'
      },
      {
        title: 'BMS & SCADA Central Telemetry',
        desc: 'Real-time status signals confirm relay state, door release, and AHU shutdown on the central control monitor.',
        icon: 'ShieldCheck'
      }
    ],
    showcase: {
      videoSrc: '/automatic_sliding.mp4',
      poster: '/services/service-emergency-trip.jpg',
      eyebrow: 'OPERATIONAL SHOWCASE',
      heading: 'Emergency Auto Trip Integration in Action',
      description: 'Observe our emergency interlock panel receiving a simulated fire alarm and instantly executing fail-safe door unlocks, AHU blower shutdowns, and emergency pump starts.',
      features: [
        'Millisecond potential-free dry contact relay activation upon fire alarm trigger',
        'Automatic power cut to fail-safe electromagnetic access locks for free escape',
        'Direct interlocking with motor control center (MCC) starters for air handling units',
        'Redundant manual override switches on the central security console for emergency test'
      ]
    },
    productsTitle: 'Our Emergency Auto Trip Integration Products',
    products: [
      {
        title: 'Relay Interface Panel',
        badge: 'Multi-Channel | Interlock Hub',
        image: '/services/service-emergency-trip.jpg',
        chips: ['24V Input', 'Form-C Relays', 'LED Status'],
        desc: 'Centralized interlock relay panel providing multi-channel potential-free contacts for all facility systems.',
        bullets: [
          'Heavy industrial din-rail relays with gold-flashed contacts for high reliability',
          'Optical isolation prevents electrical surges from transferring between building systems',
          'Bi-color LED indicators show active trip state for each individual output channel'
        ]
      },
      {
        title: 'AHU Shut-Off Module',
        badge: 'HVAC Safety | Smoke Control',
        image: '/services/service-fire-doors.jpg',
        chips: ['MCC Interlock', 'Damper Trip', 'Fail-Safe'],
        desc: 'Dedicated HVAC trip module that drops contactor power to ventilation fans and closes motorized fire dampers.',
        bullets: [
          'Direct integration with building Motor Control Centers (MCC) and VFD drives',
          'Spring-return fire damper actuator trip outputs seal ventilation ducts against smoke',
          'Prevents recirculation of toxic carbon monoxide fumes across unaffected building floors'
        ]
      },
      {
        title: 'Door Release Controller',
        badge: 'Access Control | Egress Release',
        image: '/products/biometric-access-terminal.jpg',
        chips: ['EM Lock Cut', 'Turnstile Drop', 'Fire Egress'],
        desc: 'Fail-safe access control interface that cuts power to magnetic locks and drops turnstile arms during emergencies.',
        bullets: [
          'Cuts 12V/24V power to electromagnetic door locks, allowing doors to swing freely',
          'Commands speed gates and tripod turnstiles to drop barriers for unimpeded exit',
          'Integrated key-resettable manual emergency break-glass for local bypass'
        ]
      },
      {
        title: 'Pump Start Interface',
        badge: 'Fire Fighting | Auto Start',
        image: '/case-studies/case-fire-hydrant.jpg',
        chips: ['Pump Starter', 'Flow Switch', 'Auto Sequencer'],
        desc: 'High-reliability interface providing confirmed start commands to electric and diesel fire fighting pump skids.',
        bullets: [
          'Signals fire pump starter panels to engage high-pressure booster pumps immediately',
          'Monitors auxiliary run-status contacts to confirm water pressure to the fire panel',
          'Bypasses building power-saving load-shedding interlocks during emergency fire mode'
        ]
      }
    ],
    technologies: {
      eyebrow: 'FACILITY-WIDE LIFE SAFETY INTERLOCKS',
      title: 'Relay Logic, Optical Isolation & Multi-System Synchronization',
      subtitle: 'Engineered cause-and-effect matrix linking detection, egress automation, HVAC containment, and fire suppression into a cohesive safety response.',
      tabs: [
        {
          id: 'relay-logic',
          name: 'Central Relay Matrix Architecture',
          badge: 'Cause & Effect Hub',
          icon: 'Settings',
          range: 'Multi-system integration',
          speed: '< 50 ms relay trip',
          standard: 'Designed in line with NFPA 72 / NBC Part 4',
          ipRating: 'IP54 industrial steel enclosure',
          summary: 'High-density relay matrix receives confirmed alarm signals and executes programmable cause-and-effect safety actions across the facility.',
          highlights: [
            'Electrically isolated dry-contact outputs prevent ground loops between separate panels',
            'Configurable latching or non-latching output behavior per facility SOPs',
            'Comprehensive diagnostic LEDs provide clear visual confirmation of each active trip circuit'
          ]
        },
        {
          id: 'door-egress',
          name: 'Fail-Safe Access Egress Release',
          badge: 'Uninhibited Evacuation',
          icon: 'Lock',
          range: 'All building perimeter & corridor doors',
          speed: 'Instantaneous power drop',
          standard: 'Designed in line with EN 13637 / NFPA 101',
          ipRating: 'Fail-safe normally-closed circuits',
          summary: 'Cuts electrical supply to magnetic locks and electromechanical strikes, restoring manual door operation for immediate exit.',
          highlights: [
            'Fail-safe architecture ensures doors unlock automatically if trip wiring is damaged or severed',
            'Integrates with optical speed turnstiles to drop arms and open glass wings permanently',
            'Manual break-glass overrides at each exit door provide local mechanical backup'
          ]
        },
        {
          id: 'hvac-trip',
          name: 'AHU & Smoke Damper Interlocking',
          badge: 'Toxic Smoke Containment',
          icon: 'Activity',
          range: 'Facility-wide air handling network',
          speed: '< 2s fan power cut',
          standard: 'Designed in line with NFPA 90A',
          ipRating: 'Heavy industrial MCC relays',
          summary: 'Interlocks with HVAC air handling units (AHUs) and fresh air blowers to de-energize fans and close motorized fire dampers immediately.',
          highlights: [
            'Stops toxic smoke and combustion gases from being forced into clean zones via ductwork',
            'Commands dedicated smoke extraction exhaust fans to start in designated escape routes',
            'Auxiliary micro-switch feedback confirms damper closure on the central BMS screen'
          ]
        },
        {
          id: 'pump-trigger',
          name: 'Automated Fire Pump Engagement',
          badge: 'Suppression Readiness',
          icon: 'Zap',
          range: 'Direct to pump control room',
          speed: '< 1s pump start pulse',
          standard: 'Designed in line with NFPA 20 / NBC Part 4',
          ipRating: 'Heavy-duty contactor interfaces',
          summary: 'Transmits direct start commands to electric and diesel fire pump control panels to guarantee immediate line pressure for hydrants and sprinklers.',
          highlights: [
            'Overrides normal standby delay timers to ensure immediate water availability',
            'Bypasses building automatic load-shedding and power management systems',
            'Monitors pump run status and provides visual confirmation on the fire alarm panel'
          ]
        }
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Fire Alarm Signal Received',
        desc: 'Panel confirms alarm and pulses interlock',
        detail: 'The building addressable fire alarm panel confirms an emergency event and energizes the input channel of the auto-trip panel.'
      },
      {
        step: 2,
        title: 'Relays Energize Instantly',
        desc: 'Millisecond execution across all channels',
        detail: 'High-speed optically isolated Form-C relays trip simultaneously across access control, HVAC, and fire pump circuits.'
      },
      {
        step: 3,
        title: 'Doors Unlock & AHUs Stop',
        desc: 'Occupants escape & smoke is contained',
        detail: 'Power drops to magnetic locks allowing free door opening, while AHU blowers stop and motorized dampers close.'
      },
      {
        step: 4,
        title: 'Fire Pumps Start & BMS Logs',
        desc: 'Water is ready & event is recorded',
        detail: 'Fire pump skids engage high-pressure water delivery, while the central BMS console logs every trip execution timestamp.'
      }
    ],
    applications: [
      { title: 'Pharmaceutical Cleanrooms', image: '/hero-cleanroom-automation.jpg' },
      { title: 'Hospitals & Medical Centers', image: '/products/automatic-doors-hospital.jpg' },
      { title: 'Industrial Manufacturing Plants', image: '/services/service-fire-doors.jpg' },
      { title: 'Corporate Headquarter Towers', image: '/head-office-building.jpg' },
      { title: 'Data Centers & Server Facilities', image: '/hero-security-command-center.jpg' },
      { title: 'Chemical & Hazardous Utilities', image: '/services/service-emergency-trip.jpg' }
    ],
    // TODO: confirm specs with engineering team
    specs: [
      { label: 'Interlock Panel Type', value: 'Multi-Channel Relay Interface Unit with Optical Isolation' },
      { label: 'Relay Contact Rating', value: 'Form-C potential-free dry contacts rated 10A @ 250V AC / 30V DC' },
      { label: 'Trigger Input Voltage', value: '12V / 24V DC from addressable fire alarm panel or manual switch' },
      { label: 'Response Latency', value: '< 50 milliseconds from trigger to contact changeover' },
      { label: 'Channel Capacity', value: '4, 8, 16, or 32 configurable interlock output channels' },
      { label: 'Supervision & Feedback', value: 'Monitored input loops for auxiliary damper/door position feedback' },
      { label: 'Enclosure Rating', value: 'IP54 powder-coated mild steel cabinet with key lock' }
    ],
    // TODO: confirm certifications before publishing
    certs: [
      { name: 'Designed in line with NFPA 72 & NFPA 101', sub: 'National Fire Alarm and Life Safety Code egress requirements' },
      { name: 'Compliant with National Building Code (NBC) Part 4', sub: 'Fire and Life Safety emergency egress and HVAC trip regulations' },
      { name: 'Designed in line with NFPA 90A', sub: 'Standard for the installation of air conditioning and ventilating systems' },
      { name: 'ISO 9001:2015 – Certified Relay Panel Assembly', sub: 'Standardized wiring, dielectric isolation testing, and quality control' },
      { name: 'CE & RoHS Certified Industrial Components', sub: 'Electromagnetic compatibility and industrial relay component safety' }
    ],
    gallery: [
      { title: 'Emergency Auto Trip Panel', image: '/services/service-emergency-trip.jpg', category: 'Trip Panels', desc: 'Central relay interface cabinet with status LEDs and manual test keys' },
      { title: 'Access Control Door Release', image: '/products/biometric-access-terminal.jpg', category: 'Egress Release', desc: 'Fail-safe magnetic lock power cut unit mounted above exit doorway' },
      { title: 'HVAC Air Handling Unit Trip', image: '/services/service-fire-doors.jpg', category: 'HVAC Interlock', desc: 'MCC relay connection commanding AHU fan shutdown' },
      { title: 'Fire Pump Start Contactor', image: '/case-studies/case-fire-hydrant.jpg', category: 'Pump Control', desc: 'Automated start interface linked to main electric fire pump' },
      { title: 'BMS Central Control Room', image: '/hero-security-command-center.jpg', category: 'BMS Telemetry', desc: 'Building management system console displaying all interlock states' },
      { title: 'Cleanroom Airlock Trip Station', image: '/hero-cleanroom-automation.jpg', category: 'Cleanroom Safety', desc: 'Emergency door release button and interlock override in pharma airlock' }
    ],
    faqs: [
      {
        q: 'Why must access control doors unlock automatically during a fire alarm?',
        a: 'In modern facilities, electromagnetic locks keep doors secure against unauthorized entry. In a fire, power to these locks must drop immediately to allow free egress without badges or keys, preventing occupants from being trapped in smoke-filled corridors.'
      },
      {
        q: 'How does shutting down Air Handling Units (AHUs) prevent disaster?',
        a: 'HVAC ventilation systems can rapidly circulate toxic smoke, carbon monoxide, and soot from a fire origin room throughout the entire building via ductwork. Tripping AHUs and closing fire dampers isolates the smoke to its source compartment.'
      },
      {
        q: 'Are the auto-trip relay outputs dry contacts or powered contacts?',
        a: 'They are potential-free Form-C dry contacts (Common, Normally Open, Normally Closed). This electrically isolates the fire alarm system from external equipment voltages (e.g. 230V AC or 415V AC in MCC panels), preventing dangerous cross-voltage damage.'
      },
      {
        q: 'What happens if the wire between the fire alarm and the auto-trip panel is damaged?',
        a: 'Life safety circuits are designed with fail-safe normally-closed (NC) or monitored resistor loops. If a cable is severed or power is lost, the access door magnetic locks naturally lose power and fall open, ensuring life safety is always prioritized.'
      }
    ],
    cta: {
      tag: 'SYNCHRONIZED LIFE SAFETY INTERLOCKS',
      title: 'Coordinate Your Facility Safety with HTI Emergency Auto Trip',
      desc: 'Our life safety systems engineers develop custom cause-and-effect matrices, relay interface panels, and turnkey commissioning across India.'
    },
    seo: {
      title: 'Emergency Auto Trip Integration | HTI Fire Protection & Life Safety',
      description: 'Synchronized fire alarm relay integration for fail-safe access door release, AHU fan shutdown, damper tripping, and automated fire pump engagement.'
    }
  }
};
