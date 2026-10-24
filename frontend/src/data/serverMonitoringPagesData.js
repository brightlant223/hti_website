/**
 * Comprehensive Product & Solution Page Data for:
 * 1. Server Room Environment Monitoring System (EMS) (slug: server-room-environment-monitoring)
 * 2. Underfloor Water Leak Detection Systems (WLD) (slug: water-leak-detection-systems)
 * 3. Toxic & Combustible Gas Detection Arrays (slug: hazardous-gas-detection-arrays)
 * 4. Microprocessor Visual Alarm Annunciator Panels (slug: alarm-annunciators)
 * 5. Cleanroom Digital Differential Pressure Monitors (slug: differential-pressure-monitors)
 * 6. Ultrasonic Rodent Repellent Systems (slug: rodent-repellent-systems)
 * 
 * Modeled on the exact architecture and layout of the master Industrial Access reference.
 */

export const SERVER_MONITORING_PAGES = {
  // =========================================================================
  // 1. SERVER ROOM ENVIRONMENT MONITORING (EMS / RMS)
  // =========================================================================
  'server-room-environment-monitoring': {
    slug: 'server-room-environment-monitoring',
    categoryName: 'Server Room & Critical Monitoring',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'monitoring-systems' },
      { label: 'Server Room & Critical Monitoring', page: 'monitoring-systems' },
      { label: 'Environment Monitoring Systems (EMS)', isCurrent: true }
    ],
    badge: 'DATA CENTER EMS | SNMP v3 / MODBUS | REAL-TIME TELEMETRY',
    titleLine1: 'Server Room Environment',
    titleLine2Accent: 'Monitoring Systems (EMS)',
    tagline: 'Continuous microclimate telemetry, early threshold alerting & autonomous chiller trip.',
    description: 'Protect mission-critical data center racks, server farms, and telecommunications shelters with centralized Environment Monitoring Systems. Measures temperature, humidity, airflow, power quality, and smoke with real-time SNMP v3, email, SMS, and cloud dashboard telemetry.',
    metrics: [
      { label: '±0.2°C Temperature Precision', icon: 'Activity' },
      { label: 'Multi-Point Rack Probe Network', icon: 'Cpu' },
      { label: 'Instant SMS / Email / Voice Alerting', icon: 'Zap' },
      { label: 'SNMP v1/v2c/v3 & Modbus TCP', icon: 'ShieldCheck' }
    ],
    heroImage: '/services/service-server-env-monitoring.jpg',
    heroStatusBadge: 'EMS Telemetry Online | Racks Normal (21.4°C / 48% RH)',
    benefits: [
      {
        title: 'Precision Microclimate Tracking',
        desc: 'Multi-point digital calibrated probes eliminate thermal hotspots inside high-density server cabinets.',
        icon: 'Activity'
      },
      {
        title: 'Instant Multi-Channel Alerting',
        desc: 'Dispatches automated SMS, audio sirens, email alerts, and SNMP traps before temperatures breach safe thresholds.',
        icon: 'Zap'
      },
      {
        title: 'Autonomous PAC Chiller Interlock',
        desc: 'Dry contact relays automatically activate standby Precision Air Conditioning (PAC) units when temperatures rise.',
        icon: 'Cpu'
      },
      {
        title: 'Enterprise BMS & DCIM Integration',
        desc: 'Native support for Modbus RTU/TCP, BACnet IP, and SNMP v3 allows seamless connection into enterprise DCIM suites.',
        icon: 'Layers'
      },
      {
        title: 'Audit-Proof Historical Logging',
        desc: 'Internal non-volatile flash storage records thousands of timestamped sensor readings for compliance audits.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Fail-Safe Battery Backup',
        desc: 'Integrated LiFePO4 battery pack keeps the monitoring controller alive during utility blackout conditions.',
        icon: 'Shield'
      }
    ],
    features: [
      {
        title: 'Daisy-Chain Sensor Architecture',
        desc: 'Plug-and-play RJ11/RJ45 bus connects up to 32 digital temperature and humidity sensor pods up to 300 meters away.',
        icon: 'Layers'
      },
      {
        title: 'Smoke & Door Contact Inputs',
        desc: 'Monitors server cabinet door tampering, unauthorized opening, and early optical smoke detection inside rack enclosures.',
        icon: 'Lock'
      },
      {
        title: 'Interactive Web Dashboard',
        desc: 'Built-in responsive HTTPS web server displays live thermal heatmaps, graphical trends, and downloadable CSV audit reports.',
        icon: 'Sparkles'
      },
      {
        title: 'Sound & Airflow Velocity Sensors',
        desc: 'Acoustic and anemometer probes detect fan failure, airflow reduction, or abnormal server chassis vibration.',
        icon: 'Activity'
      }
    ],
    specs: [
      { label: 'Input Channels', value: 'Up to 32 Intelligent Sensors (Daisy-Chained)' },
      { label: 'Temperature Range', value: '-40°C to +85°C (±0.2°C typical accuracy)' },
      { label: 'Humidity Range', value: '0% to 100% RH non-condensing (±2% RH)' },
      { label: 'Communication Ports', value: '10/100 Mbps RJ45 Ethernet, RS-485 Modbus, GSM/4G SIM Slot' },
      { label: 'Protocols Supported', value: 'SNMP v1/v2c/v3, Modbus TCP, MQTT, HTTPS, SMTP, NTP, Syslog' },
      { label: 'Digital Inputs / Relays', value: '8 Optoisolated Digital Inputs + 4 Form C Relays (250V AC / 5A)' },
      { label: 'Power Supply', value: 'Dual Redundant 100-240V AC 50/60Hz + 12V DC Battery Input' },
      { label: 'Mounting Form Factor', value: '19-inch 1U Rackmount or Wall Surface Mount' }
    ],
    applications: [
      {
        title: 'Tier III & IV Data Centers',
        desc: 'Comprehensive rack-level thermal mapping and underfloor cold-aisle monitoring for maximum uptime.',
        icon: 'Cpu'
      },
      {
        title: 'Telecom Transmission Shelters',
        desc: 'Remote unstaffed base station microclimate monitoring with cellular GSM alarm reporting.',
        icon: 'Activity'
      },
      {
        title: 'Hospital & Pharma Server Rooms',
        desc: 'Preserves critical patient record servers and cold-chain formulation telemetry without interruption.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Banking & Financial Hubs',
        desc: 'Secures high-frequency trading server racks against overheating, water ingress, and unauthorized access.',
        icon: 'Lock'
      }
    ],
    standards: [
      { name: 'ASHRAE TC 9.9 Thermal Guidelines', sub: 'Complies with Recommended Environmental Envelopes for Data Centers' },
      { name: 'TIA-942 Telecommunications Standard', sub: 'Engineered for Tier I through Tier IV data center infrastructure rating' },
      { name: 'SNMP v3 Cryptographic Security', sub: 'AES-128 encryption and SHA authentication preventing network telemetry tampering' }
    ],
    gallery: [
      { title: 'Data Center Rack Thermal Telemetry', image: '/products/monitoring-environment.jpg', category: 'Data Center', desc: 'Central EMS console displaying real-time rack temperature profiles' },
      { title: 'Server Room Underfloor Sensors', image: '/services/service-water-leak-detection.jpg', category: 'Infrastructure', desc: 'Integrated underfloor environment and fluid leak monitoring' },
      { title: 'Centralized Telemetry Control', image: '/cctv-featured-telemetry.jpg', category: 'Command Center', desc: 'Multi-site server room environmental telemetry and alarm annunciator' },
      { title: 'High-Density Rack Pod Monitoring', image: '/products/cctv-ip-4k-surveillance.jpg', category: 'High-Density Racks', desc: 'Cold-aisle containment temperature and humidity probe deployment' }
    ],
    faqs: [
      {
        q: 'What environmental parameters can the HTI EMS system monitor?',
        a: 'The system monitors temperature, relative humidity, water leakage, airflow velocity, cabinet door access, AC mains voltage, UPS battery voltage, smoke, and air particle levels across all racks and subfloors.'
      },
      {
        q: 'How does the system notify technicians in case of a critical alarm?',
        a: 'The controller provides multi-channel notifications: instant automated SMS text messages, outbound voice phone calls via internal 4G cellular modem, encrypted emails, audible sirens/strobes, and SNMP v3 traps sent to your central network monitoring tool.'
      },
      {
        q: 'Can the EMS automatically start backup cooling if a primary chiller trips?',
        a: 'Yes. Built-in Form C dry contact relays can be configured to energize secondary PAC air conditioners or initiate emergency exhaust dampers when rack temperatures cross high-limit setpoints.'
      },
      {
        q: 'Is the system compatible with third-party DCIM and BMS platforms?',
        a: 'Yes. The HTI EMS natively supports SNMP v1/v2c/v3 MIBs, Modbus TCP, BACnet IP, and MQTT, allowing complete telemetry integration with Schneider EcoStruxure, Vertiv, PRTG, Zabbix, and Nagios.'
      }
    ],
    cta: {
      tag: 'TURNKEY DATA CENTER EMS ENGINEERING',
      title: 'Protect Your Server Rooms with HTI Smart EMS Solutions',
      desc: 'Get turnkey engineering consultation, site sensor layout blueprints, and certified supply across India.'
    },
    seo: {
      title: 'Server Room Environment Monitoring Systems (EMS) | HTI',
      description: 'Turnkey data center environment monitoring systems (EMS), temperature/humidity rack probes, SNMP v3 alerts, and chiller interlocks engineered for zero server downtime.'
    }
  },

  // =========================================================================
  // 2. WATER LEAK DETECTION SYSTEMS (WLD)
  // =========================================================================
  'water-leak-detection-systems': {
    slug: 'water-leak-detection-systems',
    categoryName: 'Server Room & Critical Monitoring',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'monitoring-systems' },
      { label: 'Server Room & Critical Monitoring', page: 'monitoring-systems' },
      { label: 'Water Leak Detection Systems (WLD)', isCurrent: true }
    ],
    badge: 'UNDERFLOOR WLD | CONDUCTIVE CABLE | DISTANCE-LOCATING CONTROLLER',
    titleLine1: 'Water Leak Detection',
    titleLine2Accent: 'Systems (WLD)',
    tagline: 'Meter-accurate leak location under raised floors before water contacts live hardware.',
    description: 'Specialized distance-locating and zone-based water leak detection systems for data centers, server rooms, cleanrooms, and medical diagnostic facilities. Detects conductive fluid ingress under raised access floors and along chilled water pipes with meter-accurate precision.',
    metrics: [
      { label: '±1 Meter Precise Distance Locating', icon: 'ShieldCheck' },
      { label: 'Fast-Drying Non-Conductive Polymer', icon: 'Sparkles' },
      { label: 'Dual Output Relays for Auto Cut-Off', icon: 'Zap' },
      { label: 'Continuous Cable Continuity Loop', icon: 'Activity' }
    ],
    heroImage: '/services/service-water-leak-detection.jpg',
    heroStatusBadge: 'WLD Sensing Cable Armed | 0 Leaks Detected',
    benefits: [
      {
        title: 'Pinpoint Distance Locating',
        desc: 'Advanced time-domain reflectometry accurately identifies the exact meter distance to the leak along the cable.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Prevents Catastrophic Short Circuits',
        desc: 'Detects chilled water air conditioning condensation and pipe drips long before water pools reach server cables.',
        icon: 'Zap'
      },
      {
        title: 'Continuous Cable Integrity Monitoring',
        desc: 'Constantly checks cable continuity and alerts operators immediately if sensor cable is cut, severed, or unplugged.',
        icon: 'Activity'
      },
      {
        title: 'Automated Motorized Valve Shut-Off',
        desc: 'Volt-free output contacts can instantly close motorized water isolation valves to stop leaks at the pipe source.',
        icon: 'Cpu'
      },
      {
        title: 'Fast-Drying & Reusable',
        desc: 'Constructed from non-absorbent fluoropolymer that resets within seconds of drying without needing sensor replacement.',
        icon: 'Sparkles'
      },
      {
        title: 'Corrosion & Chemical Resistant',
        desc: 'Withstands exposure to deionized water, weak acids, cleaning agents, and aggressive industrial subfloor moisture.',
        icon: 'Layers'
      }
    ],
    features: [
      {
        title: 'High-Sensitivity Sensing Cable',
        desc: 'Twin insulated sensing wires spiraled in conductive polymer jacket for instantaneous 360-degree liquid contact.',
        icon: 'Layers'
      },
      {
        title: 'Digital LCD Display Controller',
        desc: 'Wall-mounted microprocessor panel shows exact distance in meters/feet, zone identifier, and audible 85 dB buzzer.',
        icon: 'Activity'
      },
      {
        title: 'Multi-Zone Expandable Architecture',
        desc: 'Supports independent zone monitoring for battery rooms, UPS rooms, AHU drip pans, and server raised floors.',
        icon: 'Cpu'
      },
      {
        title: 'Modbus RTU & BMS Communication',
        desc: 'RS-485 communication integrates seamlessly into central Building Management Systems and SCADA consoles.',
        icon: 'ShieldCheck'
      }
    ],
    specs: [
      { label: 'Detection Technology', value: 'Conductive Polymer Sensing Cable with Microprocessor Time-Domain Resistance' },
      { label: 'Locating Accuracy', value: '±1 meter or ±0.5% of total sensing cable length' },
      { label: 'Maximum Cable Length', value: 'Up to 1,500 meters (5,000 ft) per locating controller' },
      { label: 'Cable Construction', value: 'Fluoropolymer core with non-conductive abrasion-resistant polymer braid' },
      { label: 'Alarm Relay Outputs', value: '2 x Form C Relays (1 x Leak Alarm, 1 x Cable Break/Fault, rated 250V AC / 5A)' },
      { label: 'Display & Interface', value: 'Backlit LCD Screen with interactive distance readout and status LEDs' },
      { label: 'Communication Protocol', value: 'RS-485 Modbus RTU, 9600-38400 baud, 2-wire serial' },
      { label: 'Operating Temperature', value: '-10°C to +60°C; IP65 Controller Housing' }
    ],
    applications: [
      {
        title: 'Data Center Raised Access Floors',
        desc: 'Snaked under floor tiles around server racks to catch air handling unit leaks and condensation drip.',
        icon: 'Cpu'
      },
      {
        title: 'Chiller & PAC Pipe Trenches',
        desc: 'Clamped along chilled water pipe manifolds and drain pans for instantaneous pipe rupture alerts.',
        icon: 'Activity'
      },
      {
        title: 'Semiconductor & Pharma Cleanrooms',
        desc: 'Guards deionized water lines and sterile airlock pass-throughs from hazardous liquid pooling.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Archives & High-Value Vaults',
        desc: 'Shields rare documents, financial records, and museum artifacts from catastrophic ceiling and wall water ingress.',
        icon: 'Lock'
      }
    ],
    standards: [
      { name: 'UL 910 Plenum Rated Cable', sub: 'Non-toxic low-smoke zero-halogen jacket compliant with building plenum standards' },
      { name: 'CE & RoHS Certified', sub: 'Tested for continuous industrial electromagnetic compatibility and environmental safety' },
      { name: 'ISO 9001:2015 Manufacturing', sub: '100% factory calibrated and batch tested for micro-ohm continuity resistance' }
    ],
    gallery: [
      { title: 'Underfloor Conductive Cable Grid', image: '/services/service-water-leak-detection.jpg', category: 'Data Center WLD', desc: 'High-sensitivity sensing cable installed on raised floor pedestals' },
      { title: 'Server Room Environment Protection', image: '/products/monitoring-environment.jpg', category: 'Server Protection', desc: 'Integrated underfloor leak detection controller linked with EMS' },
      { title: 'Cleanroom Airlock Moisture Guard', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Cleanroom', desc: 'Static zone sensor probe deployed around cleanroom pass boxes' },
      { title: 'Central Infrastructure Monitoring', image: '/cctv-featured-telemetry.jpg', category: 'Telemetry Wall', desc: 'WLD controller reporting real-time status to central facility console' }
    ],
    faqs: [
      {
        q: 'How does the distance-locating water leak detection system work?',
        a: 'The controller passes a low-voltage sensing signal through two conductive polymer wires. When water touches the cable, a micro-current bridges the wires, and the controller calculates the exact electrical resistance to output the exact distance in meters.'
      },
      {
        q: 'Does the cable need to be replaced after it gets wet?',
        a: 'No. The cable is manufactured from non-absorbent fluoropolymer. Once the water spill is mopped or dried, the cable resets automatically within seconds and is immediately ready for continuous operation.'
      },
      {
        q: 'Can the WLD system shut off the water supply automatically?',
        a: 'Yes. The controller provides independent Form C volt-free relay contacts that can directly trigger motorized solenoid or motorized butterfly shut-off valves on the chiller supply line.'
      },
      {
        q: 'How is the cable installed under raised access floors?',
        a: 'The sensing cable is routed in serpentine patterns across the concrete subfloor using specialized adhesive hold-down clips, positioned around PAC unit drains, pipe headers, and server rack rows.'
      }
    ],
    cta: {
      tag: 'TURNKEY UNDERFLOOR WLD SOLUTIONS',
      title: 'Shield Your Data Center from Chilled Water Ingress with HTI WLD',
      desc: 'Connect with our critical monitoring team for subfloor layout calculations, cable routing schematics, and turnkey installation.'
    },
    seo: {
      title: 'Water Leak Detection Systems (WLD) | HTI Critical Monitoring',
      description: 'Turnkey underfloor water leak detection systems, distance-locating sensor cables, automated valve cut-off, and Modbus BMS telemetry for data centers.'
    }
  },

  // =========================================================================
  // 3. TOXIC & COMBUSTIBLE GAS DETECTION ARRAYS
  // =========================================================================
  'hazardous-gas-detection-arrays': {
    slug: 'hazardous-gas-detection-arrays',
    categoryName: 'Server Room & Critical Monitoring',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'monitoring-systems' },
      { label: 'Server Room & Critical Monitoring', page: 'monitoring-systems' },
      { label: 'Gas Detection Arrays', isCurrent: true }
    ],
    badge: 'ATEX / PESO CERTIFIED | FLAMEPROOF EX-d | MULTI-GAS SENSING',
    titleLine1: 'Hazardous Gas Detection',
    titleLine2Accent: 'Transmitter Arrays',
    tagline: 'Continuous electrochemical & catalytic telemetry for battery room hydrogen, refrigerants & toxic vapors.',
    description: 'Industrial and facility-grade hazardous gas detection transmitters and multi-channel receiver panels. Engineered to detect explosive battery room hydrogen (H2), toxic carbon monoxide (CO), chiller Freon refrigerants, ammonia, and VOCs with automated ventilation exhaust fan interlocking.',
    metrics: [
      { label: 'ATEX & PESO Ex-d Certified', icon: 'Flame' },
      { label: 'Fast Response: T90 < 15 Seconds', icon: 'Zap' },
      { label: 'Electrochemical & Catalytic Cells', icon: 'Activity' },
      { label: '4-20mA & RS-485 Modbus Telemetry', icon: 'ShieldCheck' }
    ],
    heroImage: '/services/service-battery-room-gas-detector.jpg',
    heroStatusBadge: 'Gas Sensors Calibrated | 0 PPM / 0% LEL Safe',
    benefits: [
      {
        title: 'Explosive Atmosphere Prevention',
        desc: 'Monitors UPS lead-acid battery rooms for hydrogen buildup, alerting operators at 10% and 20% LEL before explosive levels.',
        icon: 'Flame'
      },
      {
        title: 'Refrigerant Chiller Safety',
        desc: 'Detects toxic and asphyxiating Freon and ammonia leaks in central HVAC chiller plant rooms compliant with ASHRAE 15.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Automated Emergency Ventilation Trip',
        desc: 'Onboard setpoint relays automatically power on emergency exhaust blowers and open fresh air louvers upon gas detection.',
        icon: 'Zap'
      },
      {
        title: 'Heavy Flameproof (Ex-d) Enclosure',
        desc: 'Rugged cast aluminium and stainless steel housings certified for Gas Groups IIA, IIB, and IIC hazardous zones.',
        icon: 'Shield'
      },
      {
        title: 'Non-Intrusive Magnetic Calibration',
        desc: 'Perform routine zero and span calibration in the field without opening the flameproof enclosure in hazardous atmospheres.',
        icon: 'Settings'
      },
      {
        title: 'Unified SCADA & BMS Telemetry',
        desc: 'Isolated 4-20mA current loop and Modbus RS-485 outputs stream real-time PPM concentrations directly to facility control rooms.',
        icon: 'Cpu'
      }
    ],
    features: [
      {
        title: 'Smart Sensor Cartridge Technology',
        desc: 'Pre-calibrated plug-in sensor heads allow rapid field replacement without recalibrating the entire transmitter unit.',
        icon: 'Cpu'
      },
      {
        title: 'High-Visibility OLED Display',
        desc: 'Displays real-time gas concentration, engineering units (PPM / % LEL / % Vol), and visual alarm warning icons.',
        icon: 'Sparkles'
      },
      {
        title: 'Triple Alarm Setpoint Relays',
        desc: 'Three programmable relays for Low Alarm, High Alarm, and System Fault ensure stepped emergency response protocols.',
        icon: 'Activity'
      },
      {
        title: 'Integrated Strobe & Siren Option',
        desc: 'Top-mounted flameproof red xenon flashing beacon and high-decibel audio horn deliver clear local personnel warning.',
        icon: 'Flame'
      }
    ],
    specs: [
      { label: 'Gases Detected', value: 'Hydrogen (H2), Carbon Monoxide (CO), Freon Refrigerants, Ammonia (NH3), Methane (CH4), VOCs' },
      { label: 'Sensing Technologies', value: 'Electrochemical, Catalytic Pellistor, Non-Dispersive Infrared (NDIR)' },
      { label: 'Enclosure Rating', value: 'ATEX / PESO Ex-d IIB+H2 T6 Gb; Die-cast aluminium LM6 / SS316, IP66' },
      { label: 'Analog Output', value: 'Linear 4-20mA with fault signaling (< 2mA), 3-wire or 4-wire' },
      { label: 'Digital Interface', value: 'RS-485 Modbus RTU, multidrop network supporting up to 64 nodes' },
      { label: 'Response Time', value: 'T90 < 15 seconds for combustible gases; T90 < 30 seconds for toxic gases' },
      { label: 'Relay Contacts', value: '3 x SPDT dry contacts rated 5A @ 250V AC / 30V DC' },
      { label: 'Operating Temperature', value: '-20°C to +55°C; 10% to 95% RH non-condensing' }
    ],
    applications: [
      {
        title: 'Data Center UPS Battery Rooms',
        desc: 'Continuous hydrogen monitoring to prevent catastrophic thermal runaway explosions during battery charging.',
        icon: 'Cpu'
      },
      {
        title: 'Commercial HVAC Chiller Plant Rooms',
        desc: 'Refrigerant leak detection protecting plant technicians from asphyxiation and complying with ASHRAE 15 codes.',
        icon: 'Activity'
      },
      {
        title: 'Pharma Solvent Dispensing & API Suites',
        desc: 'Monitors solvent vapors (IPA, acetone, ethanol) in classified Zone 1 hazardous formulation areas.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Gas Cylinder Manifold Banks',
        desc: 'Detects combustible or inert shielding gas leakage from high-pressure piping manifolds and distribution valves.',
        icon: 'Flame'
      }
    ],
    standards: [
      { name: 'PESO & ATEX Certified', sub: 'Flameproof enclosure compliance under IS/IEC 60079-1 for hazardous Zone 1 & 2' },
      { name: 'ASHRAE Standard 15 Compliance', sub: 'Meets mandatory safety codes for mechanical refrigeration machinery rooms' },
      { name: 'EN 50271 / IEC 61508 SIL-2', sub: 'Functional safety certified electronics and firmware for life-critical gas interlocking' }
    ],
    gallery: [
      { title: 'Flameproof Gas Transmitter Head', image: '/services/service-battery-room-gas-detector.jpg', category: 'Hazardous Area', desc: 'ATEX certified explosion-proof gas transmitter with digital OLED display' },
      { title: 'Server Room Battery Facility Guard', image: '/services/service-server-env-monitoring.jpg', category: 'Battery Safety', desc: 'Continuous hydrogen sensor installed over high-capacity UPS battery racks' },
      { title: 'Chiller Plant Room Gas Monitoring', image: '/services/service-water-leak-detection.jpg', category: 'Plant Room', desc: 'Refrigerant gas leak sensor array linked with emergency ventilation louvers' },
      { title: 'Multi-Channel Central Gas Annunciator', image: '/cctv-featured-telemetry.jpg', category: 'Control Console', desc: 'Centralized gas detection receiver displaying zone gas concentrations' }
    ],
    faqs: [
      {
        q: 'Why is hydrogen gas monitoring mandatory in UPS battery rooms?',
        a: 'Lead-acid and VRLA batteries emit explosive hydrogen gas during charging and float cycles. Because hydrogen is lighter than air and has a very wide explosive range (4% to 75% in air), ceiling-mounted transmitters are required to auto-start ventilation fans before gas reaches 1% (25% LEL).'
      },
      {
        q: 'How frequently do industrial gas sensors require calibration?',
        a: 'We recommend routine bump-testing every 3 months and certified span recalibration every 6 to 12 months, depending on operating environmental conditions and sensor cell chemistry.'
      },
      {
        q: 'Can these gas transmitters be installed in explosive Zone 1 areas?',
        a: 'Yes. The heavy cast aluminium LM6 and SS316 explosion-proof enclosures carry full PESO and ATEX certification for Gas Groups IIA, IIB, and IIC, making them completely safe for installation in Zone 1 and Zone 2 hazardous locations.'
      },
      {
        q: 'What is non-intrusive magnetic calibration?',
        a: 'Using a handheld magnetic wand, technicians can adjust zero and span settings through the tempered glass viewing window without unbolting the flameproof housing, preserving explosion-proof containment.'
      }
    ],
    cta: {
      tag: 'TURNKEY HAZARDOUS GAS DETECTION SOLUTIONS',
      title: 'Ensure Safety & Regulatory Compliance with HTI Gas Detection Arrays',
      desc: 'Our certified instrumentation engineers provide plant gas dispersion studies, transmitter placement layouts, and turnkey commissioning.'
    },
    seo: {
      title: 'Toxic & Combustible Gas Detection Arrays | HTI Critical Monitoring',
      description: 'Turnkey industrial flameproof gas detection transmitters, battery room hydrogen monitoring, refrigerant alarms, and automated exhaust trips.'
    }
  },

  // =========================================================================
  // 4. MICROPROCESSOR ALARM ANNUNCIATORS
  // =========================================================================
  'alarm-annunciators': {
    slug: 'alarm-annunciators',
    categoryName: 'Server Room & Critical Monitoring',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'monitoring-systems' },
      { label: 'Server Room & Critical Monitoring', page: 'monitoring-systems' },
      { label: 'Microprocessor Alarm Annunciators', isCurrent: true }
    ],
    badge: 'ISA-18.1 SEQUENCE LOGIC | ULTRA-BRIGHT LED | FIRST-OUT DISCRIMINATION',
    titleLine1: 'Microprocessor Visual',
    titleLine2Accent: 'Alarm Annunciator Panels',
    tagline: 'Instant audio-visual fault window discrimination for mission-critical electrical & plant control.',
    description: 'High-reliability microprocessor-based visual alarm annunciator panels engineered for substation control rooms, data center electrical panels, chiller plants, and pharmaceutical cleanroom cascades. Displays immediate illuminated window indications and audio warnings following international ISA-18.1 sequences.',
    metrics: [
      { label: 'ISA-18.1 Sequence Support', icon: 'Settings' },
      { label: 'Super-Bright LED Backlit Windows', icon: 'Sparkles' },
      { label: '1 Millisecond First-Out Resolution', icon: 'Zap' },
      { label: 'Optoisolated Fault Contact Inputs', icon: 'ShieldCheck' }
    ],
    heroImage: '/services/service-alarm-annunciators.jpg',
    heroStatusBadge: 'Annunciator Armed | All 32 Windows Healthy',
    benefits: [
      {
        title: 'Instant Visual Fault Identification',
        desc: 'Custom-engraved LED windows illuminate and flash instantly when equipment trips, eliminating guesswork during plant emergencies.',
        icon: 'Sparkles'
      },
      {
        title: 'ISA-18.1 Standard Sequence Logic',
        desc: 'Supports standard Sequence A (Auto Reset), M (Manual Reset), and F1A/F3A First-Out fault sequence discrimination.',
        icon: 'Settings'
      },
      {
        title: 'Millisecond First-Out Tripping',
        desc: 'Distinguishes the root-cause trip in complex electrical chain reactions with 1 millisecond timing precision.',
        icon: 'Zap'
      },
      {
        title: 'High-Decibel Dual Audio Siren',
        desc: 'Integrated dual-tone audio alarm sounds continuously until the operator presses the front-panel Acknowledge button.',
        icon: 'Activity'
      },
      {
        title: 'Optoisolated Noise-Immune Inputs',
        desc: 'Optocoupler isolation protects delicate microcontroller logic from heavy electrical substation EMI and voltage spikes.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Modbus RS-485 Communication',
        desc: 'Transmits live window status, trip timestamps, and operator actions directly to central SCADA and DCS workstations.',
        icon: 'Cpu'
      }
    ],
    features: [
      {
        title: 'Modular Window Capacity',
        desc: 'Scalable chassis configurations supporting 4, 8, 12, 16, 24, 32, 48, or 64 illuminated alarm windows in compact panel cutouts.',
        icon: 'Layers'
      },
      {
        title: 'Multi-Color LED Selection',
        desc: 'Windows customizable in Red (Trip), Amber (Warning), Green (Normal), and White (Status) for intuitive operator cognition.',
        icon: 'Sparkles'
      },
      {
        title: 'Front-Accessible Pushbuttons',
        desc: 'Tactile Test, Mute, Acknowledge, and Reset pushbuttons allow seamless local operator control and lamp testing.',
        icon: 'Settings'
      },
      {
        title: 'Redundant Power Supply Units',
        desc: 'Dual universal AC/DC power supply modules ensure zero annunciator downtime even if one power feed fails.',
        icon: 'Zap'
      }
    ],
    specs: [
      { label: 'Window Capacities', value: '4, 8, 12, 16, 24, 32, 48, or 64 Windows (Modular Enclosure)' },
      { label: 'Sequence Standards', value: 'ISA-18.1 Sequences: A, M, R, F1A, F2A, F3A, Ringback' },
      { label: 'First-Out Resolution', value: '1 millisecond discrimination between sequential fault triggers' },
      { label: 'Input Types', value: 'Potential-free dry contacts (NO/NC selectable via DIP switches); Optoisolated' },
      { label: 'Interrogation Voltage', value: '12V DC / 24V DC / 48V DC / 110V DC / 220V DC internal or field supply' },
      { label: 'Window Dimensions', value: 'Standard 30mm x 30mm or 45mm x 45mm laser-engraved acrylic tiles' },
      { label: 'Relay Outputs', value: 'Horn Relay, Bell Relay, Common Fault Relay (Form C, rated 5A @ 250V AC)' },
      { label: 'Communication Port', value: 'RS-485 Modbus RTU serial interface for SCADA/BMS telemetry' }
    ],
    applications: [
      {
        title: 'Electrical Switchgear & Substation Panels',
        desc: 'Displays breaker trip, earth fault, overcurrent, and transformer Buchholz relay alarms.',
        icon: 'Zap'
      },
      {
        title: 'Data Center Power Distribution (PDU)',
        desc: 'Monitors UPS battery discharge, static transfer switch status, and generator run faults.',
        icon: 'Cpu'
      },
      {
        title: 'Chiller & HVAC Central Plant Rooms',
        desc: 'Instant visual alert on compressor overload, low chilled water flow, and condenser trip.',
        icon: 'Activity'
      },
      {
        title: 'Pharma Sterile Facility Airlocks',
        desc: 'Displays door held open warnings, emergency door breakout trips, and room cascade failures.',
        icon: 'ShieldCheck'
      }
    ],
    standards: [
      { name: 'ISA-18.1 Specifications', sub: 'Complies fully with standard Annunciator Sequences and Specifications for Process Industries' },
      { name: 'IEC 61000-4 EMC Standards', sub: 'Tested for Level 4 electrical fast transient and high-voltage surge immunity' },
      { name: 'IP54 Bezel Protection', sub: 'Industrial dust and splash-proof front fascia for harsh factory environments' }
    ],
    gallery: [
      { title: 'Alarm Annunciator Fascia Unit', image: '/services/service-alarm-annunciators.jpg', category: 'Annunciator Panel', desc: 'Flush-mounted microprocessor alarm annunciator with laser-engraved tiles' },
      { title: 'Substation Control Room Wall', image: '/cctv-featured-telemetry.jpg', category: 'Control Wall', desc: 'Integrated annunciator and SCADA telemetry desk monitoring electrical grids' },
      { title: 'Server Room Electrical Panel', image: '/services/service-server-env-monitoring.jpg', category: 'PDU Monitoring', desc: 'Compact 16-window annunciator monitoring data center power distribution' },
      { title: 'Cleanroom Airlock Fault Panel', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Sterile Facility', desc: 'Stainless steel flush annunciator tracking cleanroom pressure cascades' }
    ],
    faqs: [
      {
        q: 'What is a "First-Out" alarm annunciator sequence?',
        a: 'In complex machinery trips, one failure causes multiple secondary faults within seconds. A First-Out sequence uses millisecond timers to flash the very first fault window rapidly while flashing secondary faults steadily, allowing engineers to identify the root cause instantly.'
      },
      {
        q: 'Can the window legends and labels be customized for our facility?',
        a: 'Yes. Every HTI annunciator is supplied with custom laser-engraved polycarbonate tiles featuring your exact equipment names, breaker tags, or process fault descriptions.'
      },
      {
        q: 'What interrogation voltage is used for field fault contacts?',
        a: 'HTI annunciators support 24V DC, 48V DC, 110V DC, and 220V DC field interrogation voltages, with optical isolation preventing field noise from affecting the controller logic.'
      },
      {
        q: 'Can the annunciator connect to our central plant SCADA or BMS?',
        a: 'Yes. An optional RS-485 Modbus RTU communication module streams the real-time status of every single window and operator action to your SCADA screens.'
      }
    ],
    cta: {
      tag: 'TURNKEY ALARM ANNUNCIATION SOLUTIONS',
      title: 'Upgrade Your Control Panels with HTI Microprocessor Annunciators',
      desc: 'Contact our control systems engineers for custom window sizing, sequence programming, and certified delivery across India.'
    },
    seo: {
      title: 'Microprocessor Visual Alarm Annunciators | HTI Critical Monitoring',
      description: 'Turnkey industrial microprocessor visual alarm annunciator panels, ISA-18.1 sequence logic, first-out discrimination, and Modbus telemetry.'
    }
  },

  // =========================================================================
  // 5. CLEANROOM DIFFERENTIAL PRESSURE MONITORS
  // =========================================================================
  'differential-pressure-monitors': {
    slug: 'differential-pressure-monitors',
    categoryName: 'Server Room & Critical Monitoring',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'monitoring-systems' },
      { label: 'Server Room & Critical Monitoring', page: 'monitoring-systems' },
      { label: 'Differential Pressure Monitors', isCurrent: true }
    ],
    badge: 'PASCAL / mmWC READOUT | PIEZORESISTIVE ACCURACY | cGMP FLUSH SS304',
    titleLine1: 'Cleanroom Differential',
    titleLine2Accent: 'Pressure Monitors',
    tagline: 'High-accuracy digital pressure cascade telemetry for sterile pharma cleanrooms & bio-labs.',
    description: 'Precision digital differential pressure indicators and smart transmitters engineered for pharmaceutical cleanrooms, hospital isolation suites, semiconductor fabs, and data center air plenums. Accurately measures microscopic positive and negative pressure differentials to guarantee containment barrier integrity.',
    metrics: [
      { label: '±0.5% Full Scale Sensor Accuracy', icon: 'ShieldCheck' },
      { label: 'Ultra-Bright 7-Segment Digital Display', icon: 'Sparkles' },
      { label: 'Audible Buzzer on Pressure Breach', icon: 'Zap' },
      { label: 'Flush SS 304 Wall Mounting', icon: 'Layers' }
    ],
    heroImage: '/services/service-diff-pressure-monitor.jpg',
    heroStatusBadge: 'Pressure Cascade Active | +25.4 Pa Positive',
    benefits: [
      {
        title: 'Audit-Proof Pressure Compliance',
        desc: 'Ensures strict adherence to USFDA 21 CFR Part 11, EU cGMP, and ISO 14644 cleanroom pressure cascade requirements.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Precision Piezoresistive Sensing',
        desc: 'Micromachined silicon piezoresistive diaphragm provides drift-free measurements down to fractions of a Pascal.',
        icon: 'Activity'
      },
      {
        title: 'Audio-Visual Breach Alarm',
        desc: 'If a door is propped open and pressure drops below limits, an integrated 85 dB buzzer and flashing display alert personnel.',
        icon: 'Zap'
      },
      {
        title: 'Flush Stainless Steel Fascia',
        desc: 'Seamless front-flush SUS304 construction with silicone gaskets ensures zero microbial entrapment and easy wipe-down cleaning.',
        icon: 'Layers'
      },
      {
        title: 'Dual Engineering Units (Pa / mmWC)',
        desc: 'User-selectable display units supporting Pascals, millimeters of water column (mmWC), or inches of water (in.wg).',
        icon: 'Settings'
      },
      {
        title: 'Continuous BMS & SCADA Telemetry',
        desc: 'Isolated 4-20mA current loop and Modbus RS-485 outputs stream live pressure values to central HVAC control computers.',
        icon: 'Cpu'
      }
    ],
    features: [
      {
        title: 'Field Pushbutton Zero Calibration',
        desc: 'Easy single-touch tare zero calibration button accessible behind the sealed front membrane.',
        icon: 'Settings'
      },
      {
        title: 'Configurable Alarm Delay Timer',
        desc: 'Programmable 0 to 60 second delay prevents nuisance buzzing during normal personnel entry/exit door swings.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Integrated Temperature/RH Option',
        desc: 'Optional multi-parameter sensor combo displaying room temperature, relative humidity, and differential pressure in one box.',
        icon: 'Sparkles'
      },
      {
        title: 'Flameproof Enclosure Available',
        desc: 'ATEX/PESO certified cast aluminium flameproof models available for solvent dispensing and chemical synthesis rooms.',
        icon: 'Flame'
      }
    ],
    specs: [
      { label: 'Pressure Ranges', value: '0 to ±25 Pa, 0 to 50 Pa, 0 to 100 Pa, 0 to 250 Pa, 0 to 500 Pa (Bipolar available)' },
      { label: 'Accuracy', value: '±0.5% Full Scale at 25°C (thermal compensation across 0°C to 50°C)' },
      { label: 'Display Type', value: 'High-visibility 0.8-inch 4-digit red 7-segment LED display + status LEDs' },
      { label: 'Process Connections', value: 'Dual barbed brass / SS fittings for 4mm or 6mm ID pneumatic tubing' },
      { label: 'Analog Output', value: '4-20mA DC (2-wire / 3-wire) or 0-10V DC linear to pressure' },
      { label: 'Digital Interface', value: 'RS-485 Modbus RTU, 9600-19200 baud, 2-wire serial' },
      { label: 'Alarm Relay', value: '1 x SPDT relay contact (rated 2A @ 250V AC) + internal 85 dB buzzer' },
      { label: 'Fascia Enclosure', value: 'SS 304 Flush cleanroom plate (IP65 front face) / Powder-coated aluminium back' }
    ],
    applications: [
      {
        title: 'Pharma Sterile Formulation Suites',
        desc: 'Maintains positive differential pressure cascade preventing airborne particulates from entering filling rooms.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Hospital Negative Isolation Wards',
        desc: 'Preserves continuous negative air pressure containing airborne pathogens and infectious aerosols.',
        icon: 'Activity'
      },
      {
        title: 'Semiconductor Cleanroom Bays',
        desc: 'Micro-differential monitoring maintaining laminar airflow velocities and ultra-clean ISO Class 3/4 standards.',
        icon: 'Cpu'
      },
      {
        title: 'Data Center Underfloor Air Plenums',
        desc: 'Measures underfloor static pressure ensuring uniform cold air delivery through perforated floor tiles.',
        icon: 'Layers'
      }
    ],
    standards: [
      { name: 'ISO 14644-3 Compliance', sub: 'Certified for cleanroom pressure cascade measurement and testing methodologies' },
      { name: 'USFDA 21 CFR Part 11', sub: 'Supports electronic batch record data acquisition with continuous digital timestamps' },
      { name: 'NABL Traceable Calibration', sub: 'Every unit supplied with certified multi-point NABL traceable calibration certificates' }
    ],
    gallery: [
      { title: 'Digital Cleanroom DP Monitor', image: '/services/service-diff-pressure-monitor.jpg', category: 'Cleanroom Sensor', desc: 'Flush-mounted stainless steel differential pressure monitor displaying +25 Pa' },
      { title: 'Sterile Airlock Chamber Integration', image: '/hero-cleanroom-interlock-chamber.jpg', category: 'Airlock Monitoring', desc: 'Door interlock panel coordinated with digital differential pressure monitor' },
      { title: 'Server Room Subfloor Pressure Check', image: '/products/monitoring-environment.jpg', category: 'Air Plenum', desc: 'Measuring underfloor cold-aisle static pressure distribution' },
      { title: 'Central Pharma Telemetry Console', image: '/cctv-featured-telemetry.jpg', category: 'SCADA Telemetry', desc: 'Real-time multi-room pressure cascade mapping on central monitoring screens' }
    ],
    faqs: [
      {
        q: 'Why is differential pressure monitoring critical in cleanrooms?',
        a: 'Pharma cleanrooms rely on pressure cascades (e.g. +45 Pa in aseptic cores down to +15 Pa in outer airlocks). If pressure equalizes, airborne contaminants rush in. Digital monitors continuously verify this pressure barrier.'
      },
      {
        q: 'Does normal door opening trigger false buzzer alarms?',
        a: 'No. The HTI monitor includes a programmable alarm delay timer (typically 15 to 45 seconds). When personnel pass through, the temporary pressure dip is ignored; only prolonged hold-open states trigger alarms.'
      },
      {
        q: 'How are the pneumatic tubing lines connected to adjacent rooms?',
        a: 'Clean pneumatic polyurethane tubing connects from the barbed ports on the rear of the monitor through wall conduits into the cleanroom and reference corridor, measuring the exact air pressure difference.'
      },
      {
        q: 'Is calibration certification included with each unit?',
        a: 'Yes. Every HTI differential pressure monitor is factory calibrated against high-precision micromanometer standards and delivered with a certified NABL traceable calibration certificate.'
      }
    ],
    cta: {
      tag: 'TURNKEY DIFFERENTIAL PRESSURE ENGINEERING',
      title: 'Guarantee Cleanroom Pressure Cascades with HTI Digital Monitors',
      desc: 'Receive comprehensive engineering drawings, pressure cascade calculations, and certified turnkey supply across India.'
    },
    seo: {
      title: 'Digital Differential Pressure Monitors | HTI Cleanroom Telemetry',
      description: 'Turnkey cleanroom digital differential pressure monitors, flush SS304 indicators, piezoresistive accuracy, and Modbus BMS telemetry for pharma suites.'
    }
  },

  // =========================================================================
  // 6. ULTRASONIC RODENT REPELLENT SYSTEMS
  // =========================================================================
  'rodent-repellent-systems': {
    slug: 'rodent-repellent-systems',
    categoryName: 'Server Room & Critical Monitoring',
    breadcrumbs: [
      { label: 'Home', page: 'home' },
      { label: 'Services', page: 'monitoring-systems' },
      { label: 'Server Room & Critical Monitoring', page: 'monitoring-systems' },
      { label: 'Ultrasonic Rodent Repellents', isCurrent: true }
    ],
    badge: 'NON-TOXIC ULTRASONIC | FREQUENCY SWEEP | ZERO CABLE DAMAGE',
    titleLine1: 'Ultrasonic Rodent Repellent',
    titleLine2Accent: 'Systems for Data Centers',
    tagline: 'High-frequency ultrasonic waves protecting underfloor cables, server racks & false ceilings.',
    description: 'Enterprise ultrasonic rodent deterrent systems specifically engineered to protect data center server rooms, telecom cable trays, false ceilings, and underfloor electrical ducts. Emits sweeping high-decibel ultrasonic sound frequencies that permanently deter rats and mice without chemicals, poison, or mechanical traps.',
    metrics: [
      { label: '20 kHz – 65 kHz Frequency Sweeping', icon: 'Activity' },
      { label: '100% Inaudible to Humans & Pets', icon: 'Sparkles' },
      { label: '360° Multi-Transducer Saturation', icon: 'ShieldCheck' },
      { label: 'Zero Interference with IT Equipment', icon: 'Cpu' }
    ],
    heroImage: '/services/service-rodent-repellent.jpg',
    heroStatusBadge: 'Ultrasonic Sweep Active | Cable Trays Protected',
    benefits: [
      {
        title: 'Prevents Costly Cable Chew Disruptions',
        desc: 'Stops rodents from gnawing optical fiber and high-voltage power cables, preventing unexpected multi-million dollar outages.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Automatic Frequency Sweeping (20-65 kHz)',
        desc: 'Continuously varies ultrasonic frequencies across a wide spectrum so rodents cannot adapt or become immune to the sound.',
        icon: 'Activity'
      },
      {
        title: '100% Safe & Inaudible to Humans',
        desc: 'Operates entirely above the human hearing threshold, ensuring IT engineers and operators work comfortably with zero annoyance.',
        icon: 'Sparkles'
      },
      {
        title: 'Zero Electromagnetic Interference (EMI)',
        desc: 'Certified non-radiating electronics ensure absolutely zero interference with sensitive server CPUs, network switches, or storage arrays.',
        icon: 'Cpu'
      },
      {
        title: 'Cruelty-Free & Chemical-Free',
        desc: 'Non-lethal sonic deterrent eliminates messy poisoned carcasses, foul decomposition odors, and biohazards inside air ducts.',
        icon: 'Shield'
      },
      {
        title: 'Modular Satellite Transducers',
        desc: 'A single master central console powers up to 20 remote satellite transducers covering expansive underfloor floor grids.',
        icon: 'Layers'
      }
    ],
    features: [
      {
        title: 'High-Output Piezo Ceramic Transducers',
        desc: 'Heavy-duty transducers deliver up to 110 dB of acoustic pressure per unit, bouncing off hard subfloor concrete surfaces.',
        icon: 'Zap'
      },
      {
        title: 'Master Console with Visual Indicators',
        desc: '19-inch rackmount or wall-mounted control unit with channel health LEDs, testing buttons, and wave cycle selectors.',
        icon: 'Settings'
      },
      {
        title: 'Rugged Metal Transducer Enclosures',
        desc: 'Compact powder-coated steel pods with mounting brackets easily secured to cable trays, floor pedestals, or ceiling tees.',
        icon: 'Layers'
      },
      {
        title: 'Daisy-Chain 2-Core Cabling',
        desc: 'Standard unshielded twisted pair or 2-core cable connects satellite transducers up to 150 meters away from the master console.',
        icon: 'Activity'
      }
    ],
    specs: [
      { label: 'Operating Frequency', value: '20 kHz to 65 kHz (microcontroller automated pseudo-random sweep)' },
      { label: 'Acoustic Sound Pressure', value: '85 dB to 110 dB @ 1 meter per transducer pod' },
      { label: 'Transducer Coverage', value: 'Up to 300 sq. ft. per transducer in enclosed subfloors; line-of-sight propagation' },
      { label: 'Console Capacity', value: 'Supports up to 12 / 20 / 30 satellite transducers per master unit' },
      { label: 'Power Consumption', value: 'Low energy: < 15 Watts total consumption at full capacity' },
      { label: 'Interference Standards', value: 'Zero RF/EMI emissions; tested to EN 61000-6-3 / FCC Part 15 Class A' },
      { label: 'Operating Temperature', value: '0°C to +50°C; 0% to 90% RH non-condensing' },
      { label: 'Enclosure Finish', value: 'Powder-coated mild steel cabinet with front LED diagnostic matrix' }
    ],
    applications: [
      {
        title: 'Data Center Underfloor Cable Trenches',
        desc: 'Installed directly beneath raised floor tiles along high-density structured cabling paths and fiber trays.',
        icon: 'Cpu'
      },
      {
        title: 'False Ceiling Voids & Cable Trays',
        desc: 'Mounted above acoustic ceiling tiles to prevent rodents nesting on warm lighting and power trunking.',
        icon: 'Layers'
      },
      {
        title: 'Main Electrical Switchgear Rooms',
        desc: 'Protects switchgear cubicles, busbar chambers, and transformer rooms from animal-induced flashovers.',
        icon: 'Zap'
      },
      {
        title: 'Pharma & Food Processing Plants',
        desc: 'Maintains strict USFDA / FSSAI hygiene standards by deterring pests without contaminating chemical poisons.',
        icon: 'ShieldCheck'
      }
    ],
    standards: [
      { name: 'FCC Part 15 & CE Certified', sub: 'Verified electromagnetic compatibility ensuring zero impact on network telemetry' },
      { name: 'RoHS Environmental Compliance', sub: 'Manufactured with non-hazardous materials and lead-free electronic assemblies' },
      { name: 'ISO 9001:2015 Manufacturing', sub: 'Rigorous continuous wave frequency testing and burn-in reliability validation' }
    ],
    gallery: [
      { title: 'Underfloor Cable Tray Transducer', image: '/services/service-rodent-repellent.jpg', category: 'Cable Protection', desc: 'Heavy-duty ultrasonic transducer pod mounted directly above cable tray' },
      { title: 'Data Center Subfloor Grid Deployment', image: '/services/service-water-leak-detection.jpg', category: 'Server Infrastructure', desc: 'Satellite transducers deployed alongside underfloor water leak detection' },
      { title: 'Server Room Environment Console', image: '/services/service-server-env-monitoring.jpg', category: 'Master Console', desc: 'Master rodent repellent console integrated into 19-inch server rack' },
      { title: 'Central Infrastructure Monitoring', image: '/cctv-featured-telemetry.jpg', category: 'Facility Protection', desc: 'Unified monitoring showing health of ultrasonic deterrent arrays' }
    ],
    faqs: [
      {
        q: 'Do the ultrasonic sound waves harm humans or cause hearing fatigue?',
        a: 'No. The human ear can typically only hear sounds up to 20 kHz. The HTI system operates between 20 kHz and 65 kHz, making it completely silent and harmless to human technicians and domestic pets.'
      },
      {
        q: 'Can the ultrasonic frequencies damage hard drives or server equipment?',
        a: 'No. The acoustic energy emitted by ultrasonic transducers operates at low power (< 15W total system) and does not resonate with hard disk drive platters, optical sensors, or solid-state components. It carries zero electromagnetic interference.'
      },
      {
        q: 'How many transducers are needed for a typical server room?',
        a: 'As sound waves do not penetrate solid walls, one transducer is typically recommended for every 250 to 300 square feet of underfloor area and false ceiling void, strategically positioned along cable trunking paths.'
      },
      {
        q: 'Will rodents eventually get used to the sound?',
        a: 'No. The HTI system uses an automated microcontroller pseudo-random frequency sweep between 20 kHz and 65 kHz with varying pulse intervals, preventing rodents from ever adapting or becoming immune.'
      }
    ],
    cta: {
      tag: 'TURNKEY ULTRASONIC RODENT REPELLENT SOLUTIONS',
      title: 'Protect Your Critical Cables with HTI Ultrasonic Deterrent Systems',
      desc: 'Our monitoring engineers provide facility coverage blueprints, transducer placement maps, and certified turnkey commissioning.'
    },
    seo: {
      title: 'Ultrasonic Rodent Repellent Systems | HTI Critical Monitoring',
      description: 'Turnkey ultrasonic rodent repellent systems for data centers, server rooms, false ceilings, and underfloor cable trays with frequency sweeping technology.'
    }
  }
};
