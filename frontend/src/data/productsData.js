// Comprehensive Product Catalog & Engineering Specifications for HTI Automation
export const productsData = [
  // --- 1. ACCESS AUTOMATION & DOORS ---
  {
    id: 1,
    slug: 'automatic-sliding-swing-doors',
    name: 'Automatic Sliding & Swing Doors',
    category: 'Automation',
    subcategory: 'Pedestrian Access & Entryways',
    tagline: 'Architectural-grade touchless sensor entry solutions for corporate towers & hospitals',
    badge: 'High Demand',
    workSummary: 'Touchless sensor entry for offices, hospitals & cleanrooms',
    description: 'Precision-engineered automatic sliding and swing doors offering hands-free, energy-efficient access for corporate headquarters, pharmaceutical entryways, healthcare suites, and commercial facilities. Powered by micro-processed brushless DC motors, intelligent motion radars, and safety presence infrared sensors that ensure whisper-quiet, fail-safe operation.',
    features: [
      'Heavy-duty brushless DC motor with high-efficiency planetary gearbox',
      'Dual microwave motion radars and active infrared safety presence detection',
      'Frameless toughened glass (10mm/12mm) or insulated hollow metal aluminum frames',
      'Integrated battery backup ensuring emergency fail-safe opening during power cut',
      'Programmable opening/closing speeds, obstacle auto-reverse, and hold-open duration',
      'Direct integration with biometric terminals, RFID card readers, and fire alarms'
    ],
    specs: {
      'Door Leaf Capacity': 'Up to 150 kg per leaf (Single) / 120 kg x 2 (Bi-parting)',
      'Opening Speed': '100 - 550 mm/sec (Fully adjustable via digital programmer)',
      'Operating Voltage': '230V AC ± 10%, 50Hz (DC 24V brushless motor drive)',
      'Activation Devices': 'Microwave Radar, Push Button, Foot Sensor, RFID / Face Access',
      'Safety Standard': 'EN 16005 / CE Certified anti-pinch safety standards',
      'Duty Cycle': 'Continuous 100% duty cycle rating'
    },
    applications: [
      'Corporate Headquarters & IT Park Lobbies',
      'Pharmaceutical Entry Airlocks & Clean Corridors',
      'Hospitals, Surgical ICUs & Diagnostic Centers',
      'Airports, Metro Stations & Retail Malls'
    ],
    isFeatured: true
  },
  {
    id: 2,
    slug: 'automatic-sliding-swing-gates',
    name: 'Automatic Sliding & Swing Gates',
    category: 'Automation',
    subcategory: 'Perimeter Security',
    tagline: 'Rugged motorized heavy-duty perimeter security gates for factory campuses & estates',
    badge: 'Heavy Duty',
    workSummary: 'Motorized perimeter gates for factory estates & corporate campuses',
    description: 'Engineered perimeter security entrance gates built from heavy-gauge galvanized steel and automated with oil-bath electro-mechanical or hydraulic operators. Built to withstand continuous vehicle throughput, extreme weather conditions, and unauthorized forced entry attempts.',
    features: [
      'High-torque oil-bath gear motor engineered for 100% continuous industrial duty',
      'Obstacle detection system with dual optical photocells and mechanical safety edges',
      'Multi-credential control: Long-range UHF RFID, ANPR camera, or remote key fob',
      'Personalized emergency mechanical release key in case of total power loss',
      'Hot-dip galvanized anti-corrosion primer with UV-resistant polyurethane coating',
      'Soft-start and soft-stop decelerations preventing mechanical shock wear'
    ],
    specs: {
      'Gate Weight Capacity': '500 kg up to 3,500 kg heavy industrial leaf',
      'Operating Traversal Speed': '12 to 20 meters per minute',
      'Motor Power': '370W to 1100W heavy-duty motor options',
      'Environmental Protection': 'IP55 / IP65 weather-sealed aluminum enclosure',
      'Temperature Range': '-10°C to +60°C ambient operating tolerance'
    },
    applications: [
      'Industrial Plants & Manufacturing Hubs',
      'Corporate Campuses & Technology Parks',
      'Warehousing, Freight Depots & Logistics Yards',
      'Gated Residential Enclaves & Defense Installations'
    ],
    isFeatured: false
  },
  {
    id: 3,
    slug: 'telescopic-cantilever-gates',
    name: 'Telescopic & Cantilever Gates',
    category: 'Automation',
    subcategory: 'Perimeter Security',
    tagline: 'Trackless and space-saving solutions for extra-wide openings & restricted boundaries',
    badge: 'Engineered Solution',
    workSummary: 'Trackless space-saving sliding barriers for tight back-run sites',
    description: 'Telescopic gates utilize overlapping leaves moving synchronously on dual wire-rope tracks, cutting required back-run parking area by up to 50%. Cantilever gates eliminate ground tracks altogether—floating over uneven, sloping, or debris-prone driveways with zero maintenance.',
    features: [
      'Telescopic synchronous drive saves up to 50% back-run space on tight boundary walls',
      'Cantilever system floats completely above driveway—no ground track to clean or clog',
      'High-strength aircraft grade wire-rope transmission for synchronous multi-leaf glide',
      'Heavy-duty internal roller carriage assemblies housed inside structural bottom track',
      'Integrated optical safety beams, soft-stop electronics, and flashing warning lamp'
    ],
    specs: {
      'Clear Opening Span': 'Up to 25 meters clear span opening',
      'Drive Mechanism': 'Multi-leaf synchronized cable drive / Trackless cantilever carriage',
      'Structural Steel': 'High-tensile Grade 350 structural steel hollow sections',
      'Controller': 'PLC / Microprocessor controller with soft-start inverter drive',
      'Impact Safety': 'Dual photocell curtains and pneumatic bottom safety edge'
    },
    applications: [
      'Railway Crossings & Intermodal Container Terminals',
      'Driveways with Slopes, Gravel, or Heavy Debris Accumulation',
      'Wide Logistics Yard Access Gates & Distribution Depots',
      'High-Security Government and Commercial Compounds'
    ],
    isFeatured: true
  },
  {
    id: 4,
    slug: 'pvc-rapid-roll-up-doors',
    name: 'High-Speed PVC Rapid Roll-Up Doors',
    category: 'Automation',
    subcategory: 'Industrial & Cleanroom Doors',
    tagline: 'High-speed flexible curtains for climate control, cleanroom isolation & hygiene',
    badge: 'Fast Acting',
    workSummary: 'Rapid thermal & airlock environmental retention for pharma & food plants',
    description: 'PVC Rapid Roll-Up Doors operate at speeds up to 1.5 m/s to isolate conditioned air, humidity, and airborne particulates between distinct manufacturing blocks. Fitted with rust-proof frames, self-repairing zipper side guides, and transparent vision windows.',
    features: [
      'Rapid operating cycle up to 1.5 m/sec cuts air exchange and thermal loss by 80%',
      'High-strength 900 g/m² fire-retardant polyester PVC fabric with internal wind stiffeners',
      'Self-repairing zipper track automatically re-inserts the curtain after accidental forklift impact',
      'Anti-wind aluminum reinforcement profiles and clear transparent PVC vision panel',
      'Wireless safety bottom edge stops and reverses curtain upon slightest obstruction'
    ],
    specs: {
      'Opening / Closing Speed': 'Opening up to 1.5 m/sec | Closing 0.8 m/sec (Inverter controlled)',
      'Curtain Material': '900 g/m² high-density PVC polyester (DIN 4102 B1 flame retardant)',
      'Wind Load Class': 'Class 2 (EN 12424) wind pressure resistance',
      'Frame Construction': 'Stainless Steel Grade 304 or Galvanized Powder Coated Steel',
      'Safety Devices': 'Dual safety photo eyes, bottom wireless contact edge, emergency pull rope'
    },
    applications: [
      'Pharma Formulation & Packaging Cleanrooms',
      'Cold Storage, Dairy & Food Processing Plants',
      'Clean Manufacturing & Electronics Assembly',
      'High-Traffic Logistics & Forklift Corridors'
    ],
    isFeatured: true
  },
  {
    id: 5,
    slug: 'sectional-overhead-doors',
    name: 'Sectional Overhead Doors',
    category: 'Automation',
    subcategory: 'Industrial Doors',
    tagline: 'Robust insulated sandwich panels tucking under ceiling to maximize dock space',
    badge: 'Thermal Efficient',
    workSummary: 'Insulated vertical lifting doors maximizing loading bay clear height',
    description: 'Industrial overhead doors manufactured from double-skinned insulated polyurethane sandwich panels. Designed to glide upward along vertical and curved tracks to rest flush against the ceiling, leaving the entire loading dock threshold unobstructed for cargo handling.',
    features: [
      'Double-wall insulated steel sandwich panels filled with CFC-free PU foam (40mm / 50mm)',
      'Excellent thermal insulation (U-value 0.51 W/m²K) and acoustic noise reduction',
      'Heavy-duty torsion spring balancing system tested for up to 50,000 cycles',
      'Spring break and cable break safety brake mechanisms prevent accidental fall',
      'Optional acrylic double-glazed vision windows and integrated pedestrian pass door'
    ],
    specs: {
      'Panel Thickness': '40 mm / 50 mm polyurethane core with thermal break seals',
      'Balancing System': 'High-cycle torsion springs with shot-peened surface treatment',
      'Operating Speed': '0.25 m/sec smooth motorized lift with chain hoist override',
      'Wind Load Resistance': 'Class 3 / Class 4 (tested to 120 km/h wind force)',
      'Safety Features': 'Anti-drop cable brake, spring rupture safety catch, bottom edge sensor'
    },
    applications: [
      'Logistics Warehouses & Dock Loading Bays',
      'Automotive Manufacturing & Assembly Halls',
      'Distribution Centers & Heavy Engineering Sheds',
      'Aviation Hangars & Maintenance Depots'
    ],
    isFeatured: false
  },
  {
    id: 6,
    slug: 'fire-rated-doors-shutters',
    name: 'Fire Rated Doors & Shutters',
    category: 'Automation',
    subcategory: 'Life Safety & Fire Protection',
    tagline: 'Certified life-safety barrier preventing the spread of fire, smoke & toxic fumes',
    badge: 'Life Safety Certified',
    workSummary: 'Certified 120/240 min fire barrier containment with auto drop release',
    description: 'Constructed from heavy-gauge hollow metal steel packed with high-density ceramic wool and rockwool insulation. Independently tested and certified for 60, 120, and 240 minutes fire resistance, fully compliant with NBC 2016 and IS 3614 standards.',
    features: [
      'Certified 1-hour, 2-hour, and 4-hour fire ratings (IS 3614 / BS 476 Part 20/22)',
      'High-density 96 kg/m³ rockwool / ceramic wool core insulation',
      'Intumescent fire seals expand under heat to hermetically seal against toxic smoke',
      'Gravity-drop fusible link or motorized auto-descent upon fire alarm panel trip',
      'Equipped with UL-listed panic crash exit hardware, heavy closers, and vision lites'
    ],
    specs: {
      'Fire Integrity Rating': '60 min / 120 min / 240 min certified integrity and stability',
      'Steel Sheet Gauge': '1.2 mm / 1.6 mm Galvanized Steel sheet (IS 277 standard)',
      'Infill Core': 'High-density mineral rockwool slab (non-combustible Class A1)',
      'FACP Integration': 'Direct 24V DC solenoid release linked to building Fire Alarm Panel',
      'Hardware': 'UL Listed Panic Bar, Heavy-Duty Hydraulic Closer, Mortise Lockset'
    },
    applications: [
      'Emergency Fire Exit Stairwells & Evacuation Corridors',
      'Electrical Sub-Stations, Transformer Rooms & Server Vaults',
      'Chemical Storage & Flammable Solvent Rooms',
      'Commercial Towers, Hospitals, Multiplexes & Malls'
    ],
    isFeatured: true
  },
  {
    id: 7,
    slug: 'motorized-rolling-shutters',
    name: 'Motorized Industrial Rolling Shutters',
    category: 'Automation',
    subcategory: 'Industrial Access',
    tagline: 'High-gauge cold-rolled galvanized steel rolling shutters for heavy bay security',
    badge: 'Heavy Gauge',
    workSummary: 'Heavy-gauge galvanized steel security barrier for warehouses & shops',
    description: 'Robust motorized rolling shutters crafted from interlocked cold-rolled galvanized or stainless steel slats. Provides dependable security and weather shielding for commercial shop fronts, industrial storage bays, and factory perimeters.',
    features: [
      'Heavy-gauge galvanized steel slats (0.8mm to 1.2mm) with interlocking wind locks',
      'Side-mounted central or tubular motor with mechanical manual hand chain override',
      'Integrated bottom safety rubber seal and galvanized deep guide channels',
      'Anti-drop safety brake preventing curtain descent in case of drive failure',
      'Optional perforated or grill slats for ventilation and display visibility'
    ],
    specs: {
      'Curtain Slat Profile': 'Galvanized Steel / Perforated / Polycarbonate clear slats',
      'Motor Drive': 'High-torque single-phase or three-phase side motor with brake',
      'Emergency Operation': 'Manual hand chain hoist and clutch release cable',
      'Finish Options': 'Hot dip galvanized / Epoxy polyester powder coating in custom RAL'
    },
    applications: [
      'Industrial Storage Bays & Manufacturing Units',
      'Commercial Retail Showrooms & Shopping Centers',
      'Warehousing Depots & Distribution Centers'
    ],
    isFeatured: false
  },
  {
    id: 8,
    slug: 'boom-barriers',
    name: 'Automatic Boom Barriers',
    category: 'Automation',
    subcategory: 'Traffic & Vehicle Access',
    tagline: 'High-frequency electromechanical and hydraulic barriers for toll and parking gates',
    badge: 'High Speed',
    workSummary: 'High-frequency corporate parking, toll & security checkpoint barrier',
    description: 'Continuous-duty automatic boom barriers designed for parking access, toll plazas, residential societies, and corporate entrance gates. Available in high-speed 1.5s models with integrated LED lighting strips and anti-collision loop sensors.',
    features: [
      'Brushless DC motor / hydraulic power unit rated for 100% continuous duty cycles',
      'Boom arm lengths from 3m up to 8m (straight, telescopic, or 90° articulated)',
      'Ultra-fast opening speed from 1.5 to 4 seconds (programmable speed control)',
      'Integrated red/green LED boom illumination for high day and night visibility',
      'Automatic auto-reverse upon hitting vehicle obstruction with optical photocells'
    ],
    specs: {
      'Boom Length': '3 meters up to 8 meters (Round, Octagonal or Articulated for basements)',
      'Operating Speed': '1.5 seconds to 6.0 seconds (Microprocessor adjustable)',
      'Duty Cycle': 'Continuous 100% duty cycle (Brushless DC motor rated 5 million cycles)',
      'Housing': '2.0 mm cold-rolled steel with anti-UV epoxy powder coating (IP54/IP65)',
      'Integration': 'UHF Long-Range RFID, ANPR License Plate Camera, Loop Detector'
    },
    applications: [
      'Corporate Office Campuses & Tech Park Gates',
      'Highway Toll Plazas, Weighbridges & Checkposts',
      'Commercial Mall Parking Basements (Articulated arm)',
      'Logistics Hubs & Residential Gated Townships'
    ],
    isFeatured: true
  },
  {
    id: 9,
    slug: 'dock-levellers-dock-shelters',
    name: 'Dock Levellers & Dock Shelters',
    category: 'Automation',
    subcategory: 'Material Handling & Logistics',
    tagline: 'Heavy-duty electro-hydraulic dock bridges for seamless loading bay logistics',
    badge: 'Industrial Grade',
    workSummary: 'Logistics loading bridge between trucks & warehouse bay floor',
    description: 'Electro-hydraulic dock levellers bridge the elevation and gap variance between warehouse loading bays and transport trailers. Supports forklifts up to 8,000 kg dynamic load, while surrounding dock shelters seal out rain, dust, and temperature leakage.',
    features: [
      'Heavy-duty dynamic load capacities: 6,000 kg and 8,000 kg dynamic forklift rating',
      'Hydraulic swing lip or telescopic lip with smooth chamfered transition to truck bed',
      'Twin hydraulic main lift cylinders with built-in velocity emergency shutoff valves',
      'Tear-proof heavy PVC dock shelter curtains mounted on extruded aluminum frames',
      'Full-range telescopic toe guards on both sides for operator foot protection'
    ],
    specs: {
      'Dynamic Capacity': '6,000 kg / 8,000 kg (EN 1398 Certified)',
      'Lip Length': '400 mm / 500 mm (Hinged swing lip or telescopic extending lip)',
      'Deck Plate': 'Chequered tear-drop anti-skid high-tensile steel plate (6mm / 8mm)',
      'Shelter Material': '3mm high-tensile wear-resistant PVC fabric with guide arrows',
      'Hydraulic Unit': 'Compact 1.1 kW power pack with IP54 electrical control box'
    },
    applications: [
      'FMCG, Food & Retail Distribution Centers',
      'Pharma Finished Goods Loading Bays',
      'Cold Chain Warehouses & Refrigerated Truck Docks',
      'Container Freight Stations & Export Depots'
    ],
    isFeatured: false
  },
  {
    id: 10,
    slug: 'turnstiles-flap-barriers-speed-gates',
    name: 'Turnstiles & Optical Flap Barriers',
    category: 'Automation',
    subcategory: 'Pedestrian Flow & Access Control',
    tagline: 'High-throughput pedestrian speed gates with biometric & RFID verification',
    badge: 'Smart Access',
    workSummary: 'Pedestrian biometric lobby speed gates with anti-tailgating sensors',
    description: 'Sleek, architectural pedestrian entrance turnstiles and optical flap barriers engineered to regulate high-density personnel movement. Facilitates smooth passage of up to 45 persons per minute with intelligent multi-beam infrared anti-tailgating arrays.',
    features: [
      'Rapid pedestrian throughput of 35 to 45 persons per minute per lane',
      'Precision infrared sensor grid detects and alarms tailgating and unauthorized reverse entry',
      'Seamless multi-credential integration: Face Recognition, Fingerprint, QR Code, RFID',
      'Automatic fail-safe lane drop / wing retract upon fire alarm trigger for rapid evacuation',
      'Brushed SUS304 stainless steel cabinet with dynamic LED directional indicator arrows'
    ],
    specs: {
      'Passage Width': '550 mm standard lane / 900 mm ADA wheelchair accessible lane',
      'Throughput Rate': '35 - 45 persons per minute',
      'Cabinet Material': 'SUS304 Stainless Steel (1.5mm - 2.0mm thickness)',
      'Flap Wing Material': 'Toughened Acrylic / Polyurethane soft impact wings',
      'Sensors': '6 to 12 pairs of infrared anti-tailgating optical beams'
    },
    applications: [
      'Corporate Headquarters & IT Hub Lobbies',
      'Pharma Production Floor Entry Airlocks',
      'Metro, Transit Terminals & High-Density Campuses',
      'Government Secretariats & R&D Laboratories'
    ],
    isFeatured: true
  },
  {
    id: 11,
    slug: 'bollards-tyre-killers-car-lifts',
    name: 'Bollards, Tyre Killers & Car Lifts',
    category: 'Automation',
    subcategory: 'Anti-Ram Perimeter Defense',
    tagline: 'Crash-rated rising hydraulic bollards, tyre spike barriers & vehicle scissor elevators',
    badge: 'Anti-Ram Defense',
    workSummary: 'Anti-ram vehicle defense & multi-level hydraulic car elevators',
    description: 'High-security crash-rated rising hydraulic bollards, electro-mechanical tyre killer spike barriers, and heavy-duty hydraulic car lifts for multi-level parking efficiency. Provides physical protection against hostile vehicle attacks.',
    features: [
      'Hydraulic rising bollards with built-in LED warning crown and reflective banding',
      'Heavy-duty hardened alloy steel tyre killers shred pneumatic tires instantly',
      'Sub-second Emergency Fast Operation (EFO) available on anti-terror bollards',
      'Electro-hydraulic scissor car lifts for underground vehicle storage and workshop bays',
      'IP68 submersible cylinder housing with integrated sump drainage system'
    ],
    specs: {
      'Bollard Crash Rating': 'K4 / K8 / K12 / PAS 68 crash-tested equivalent ratings',
      'Bollard Rise Time': '2.5 to 3.5 seconds (1.2 seconds with EFO hydraulic accumulator)',
      'Tyre Killer Spikes': '150 mm high hardened alloy spikes with bidirectional drive',
      'Car Lift Capacity': '3,000 kg to 5,000 kg scissor lift platform with hydraulic lock valves',
      'Drive Power': 'Heavy-duty hydraulic power unit with manual hand pump override'
    },
    applications: [
      'Government Embassies & High Commission Premises',
      'Corporate Headquarters, Bank Vaults & Data Centers',
      'VIP Hotel Entrances & Luxury Residential Basements',
      'Automotive Showrooms & Multi-Level Parking Garages'
    ],
    isFeatured: false
  },
  {
    id: 12,
    slug: 'chiller-clean-room-doors',
    name: 'Chiller & Clean Room Doors',
    category: 'Automation',
    subcategory: 'Pharma Cleanroom & Cold Storage',
    tagline: 'Hermetically sealed insulated doors for pharmaceutical labs & cold storage rooms',
    badge: 'Hermetic Seal',
    workSummary: 'Hermetically sealed cold storage & pharma cleanroom airlock barriers',
    description: 'Airtight and hermetically sealed doors engineered specifically for pharmaceutical cleanrooms, medical laboratories, and industrial chiller rooms. Features multi-layer EPDM rubber gaskets that seal tightly against the frame upon closure to preserve differential pressure.',
    features: [
      'Hermetic sealing track design drops and seals door against floor and frame',
      'Smooth flush surface with seamless seams preventing particulate accumulation',
      'Stainless Steel SS304 / Powder-coated galvanized steel with antibacterial finish',
      'Flush-mounted double-glazed vision panel with integrated silica gel desiccant',
      'Compatible with cleanroom door interlocking systems and touchless proximity sensors'
    ],
    specs: {
      'Door Leaf Core': 'Injected CFC-free polyurethane foam (40mm / 60mm / 80mm)',
      'Air Permeability': 'Class 4 (EN 12207) airtight hermetic seal',
      'Surface Facing': 'SUS304 Stainless Steel / Antibacterial HPL / Powder-coated GI',
      'Vision Window': 'Flush double-glazed toughened glass without dust-trapping ledge'
    },
    applications: [
      'Pharmaceutical Formulation & API Synthesis Blocks',
      'Hospital Surgical Suites, Isolation Wards & Blood Banks',
      'Cold Storage Rooms, Deep Freezers & Chiller Depots',
      'Biotechnology & Containment Level BSL-3/4 Labs'
    ],
    isFeatured: false
  },
  {
    id: 13,
    slug: 'sound-proof-doors',
    name: 'Sound Proof Acoustic Doors',
    category: 'Automation',
    subcategory: 'Acoustic Containment',
    tagline: 'High-STC certified acoustic doors dampening heavy machinery & plant noise',
    badge: 'Acoustic Rated',
    workSummary: 'Heavy acoustic decibel dampening for generator & testing rooms',
    description: 'Heavy-duty certified acoustic soundproof doors designed to attenuate industrial noise from power generators, compressors, and plant machinery, as well as providing acoustic isolation for broadcast studios and corporate conference auditoriums.',
    features: [
      'Acoustic attenuation ratings from 35 dB up to 55 dB Sound Transmission Class (STC)',
      'Multi-layer composite acoustic core combining viscoelastic dampening and mineral wool',
      'Perimeter acoustic compression seals and automatic drop-down bottom door seals',
      'Heavy-duty ball-bearing acoustic hinges engineered to carry heavy door leaf weight',
      'Available in single leaf, double leaf, and motorized automated configurations'
    ],
    specs: {
      'Sound Reduction (STC)': '38 dB, 45 dB, 50 dB, and 55 dB certified acoustic rating',
      'Core Composition': 'High-density mineral rockwool + viscoelastic acoustic barrier sheets',
      'Acoustic Seals': 'Dual perimeter Neoprene compression gaskets + auto drop threshold seal',
      'Hardware': 'Acoustic cam-lift hinges and 3-point heavy compression latch'
    },
    applications: [
      'DG (Diesel Generator) Rooms & Chiller Plant Rooms',
      'Audio Recording Studios & Corporate Auditoriums',
      'Acoustic Testing Chambers & Industrial Enclosures',
      'Hospital MRI & Audiology Examination Suites'
    ],
    isFeatured: false
  },
  {
    id: 14,
    slug: 'fire-hydrant-sprinkler-systems',
    name: 'Turnkey Fire Hydrant & Sprinkler Systems',
    category: 'Automation',
    subcategory: 'Industrial Fire Protection',
    tagline: 'Turnkey high-pressure fire hydrant infrastructure, pumps, sprinklers & valves',
    badge: 'Turnkey Fire Infrastructure',
    workSummary: 'Turnkey industrial fire fighting water distribution & pumping station',
    description: 'Complete turnkey fire hydrant and automatic water sprinkler infrastructure engineered to NBC 2016 and CFO statutory codes. Encompasses main electric fire pumps, diesel standby engine pumps, jockey pumps, heavy MS class piping, hydrant landing valves, and wet pipe sprinkler grids.',
    features: [
      'Turnkey pump room setup: Main Electric Motor, Diesel Standby, and Pressure Jockey Pump',
      'Heavy-duty ISI certified hydrant valves, landing valves, and canvas hose reels',
      'Automatic wet pipe sprinkler network with quick-response bulb sprinkler heads',
      'Dedicated fire brigade inlet manifolds, air release valves, and flow switch sensors',
      'Full compliance with National Building Code (NBC 2016) and TAC guidelines'
    ],
    specs: {
      'Pump Capacities': '450 GPM up to 2,500 GPM (Electric / Diesel engine driven)',
      'Operating Pressure': '7 kg/cm² to 14 kg/cm² working pipeline pressure',
      'Piping Standard': 'Heavy Class ERW Mild Steel pipes coated with anti-corrosion red enamel',
      'Sprinkler Heads': '68°C / 79°C / 93°C Quick Response Glass Bulb sprinklers (UL / FM)',
      'Certification': 'Statutory sign-off compliant with local CFO Fire Department norms'
    },
    applications: [
      'Pharmaceutical Formulation & Chemical API Plants',
      'Industrial Warehouses, Logistics Depots & Manufacturing Hubs',
      'Commercial Malls, Multiplexes & High-Rise Towers',
      'Refineries, Power Plants & Container Depots'
    ],
    isFeatured: true
  },

  // --- 2. SECURITY SYSTEMS & SURVEILLANCE ---
  {
    id: 15,
    slug: 'cctv-surveillance-system',
    name: 'CCTV Surveillance Systems (Analogue & IP 4K)',
    category: 'Security System',
    subcategory: 'Video Surveillance & AI Analytics',
    tagline: '4K Ultra HD IP cameras, optical zoom PTZ speed domes & flameproof housings',
    badge: 'AI Powered',
    workSummary: '4K IP cameras, optical PTZ & AI perimeter video surveillance',
    description: 'Comprehensive video surveillance systems covering crystal-clear 4K Ultra HD IP network cameras, 360° optical zoom PTZ speed domes, thermal perimeter cameras, and certified flameproof (Ex-d) cameras for hazardous chemical zones. Integrated with AI video analytics for perimeter intrusion, line crossing, and face recognition.',
    features: [
      '4K Ultra HD IP cameras with Sony Starvis low-light color night vision',
      'High-speed PTZ cameras with 25x to 42x optical zoom and auto-tracking',
      'Certified Flameproof (Ex-d) housings for chemical and explosive pharma zones',
      'AI Video Analytics: Perimeter intrusion, loitering, unattended baggage, and face capture',
      'Centralized NVR storage with RAID redundancy and multi-location cloud streaming'
    ],
    specs: {
      'Resolution Options': '2MP, 4MP, 8MP (4K) Ultra HD with 120dB True WDR',
      'Night Vision': 'Smart IR illumination up to 100m + Full-color low-light technology',
      'PTZ Zoom': '25x / 36x / 42x Optical Zoom with 360° endless pan traversal',
      'Certifications': 'ATEX / IECEx certified for Intrinsically Safe & Flameproof variants',
      'Storage': 'H.265+ high compression NVRs with hot-swappable enterprise SATA drives'
    },
    applications: [
      'Manufacturing Plants & Perimeter Fence Lines',
      'Pharmaceutical Clean Production & Packaging Halls',
      'Hazardous Chemical Refineries & Solvent Depots',
      'Corporate Campuses, Data Centers & Banking HQs'
    ],
    isFeatured: true
  },
  {
    id: 16,
    slug: 'biometric-access-attendance',
    name: 'Biometric Access Control & Time Attendance',
    category: 'Security System',
    subcategory: 'Access Control & Identity',
    tagline: 'Touchless facial recognition, multi-spectral fingerprint & RFID proximity terminals',
    badge: 'High Accuracy',
    workSummary: 'Touchless face & fingerprint access terminals with automated door locks',
    description: 'High-precision biometric access control and employee time-attendance terminals. Connects directly to electromagnetic door locks, drop bolts, flap barriers, and HR payroll software. Provides tamper-proof audit trails for USFDA 21 CFR Part 11 cleanroom compliance.',
    features: [
      'Touchless facial recognition with visible light technology and live spoof detection',
      'Multi-spectral optical fingerprint sensor reading wet, dry, and rough fingers',
      'Multi-card compatibility: 125kHz EM Proximity, 13.56MHz Mifare, and HID iClass',
      'Direct relay outputs to control EM locks, strike locks, and automated sliding doors',
      'Centralized cloud-ready software for shift scheduling, overtime, and payroll export'
    ],
    specs: {
      'User Capacity': 'Up to 50,000 face templates / 100,000 fingerprint credentials',
      'Authentication Speed': 'Less than 0.3 seconds per verification',
      'Communication': 'TCP/IP Ethernet, Wi-Fi, RS485, USB Host, Wiegand In/Out',
      'Lock Relay Output': 'Form C dry contact relay output for fail-safe/fail-secure locks',
      'Audit Trail': 'Up to 1,000,000 transaction event log storage with battery backup'
    },
    applications: [
      'Corporate Headquarters & IT Park Facilities',
      'Pharmaceutical R&D & Sterile Cleanroom Antechambers',
      'Educational Institutions & University Campuses',
      'Government Secretariats & High-Security Server Vaults'
    ],
    isFeatured: true
  },
  {
    id: 17,
    slug: 'door-interlock-systems',
    name: 'Door Interlock Systems (Flameproof Ex-d & Safe)',
    category: 'Security System',
    subcategory: 'Cleanroom Airlock Engineering',
    tagline: 'Multi-door airlock logic controllers for pharmaceutical cleanrooms & bio-safety labs',
    badge: 'Flagship Pharma Tech',
    workSummary: 'USFDA 21 CFR Part 11 compliant 2-8 door interlocking logic',
    description: 'Engineered specifically for sterile pharmaceutical cleanrooms, hospital OT suites, and containment laboratories where maintaining differential air pressure is paramount. Interlocks 2 to 12 doors electrically so adjacent airlock doors cannot be opened simultaneously, preventing cross-contamination.',
    features: [
      'Supports 2 to 12 doors electrically interlocked with intelligent priority logic',
      'Available in certified Flameproof (Ex-d Group IIA, IIB) and Non-Flameproof SS enclosures',
      'Programmable delay timer between door cycles allowing AHU pressure re-stabilization',
      'Emergency override push buttons and master key switches for instantaneous release',
      'Multi-credential door triggering: Biometric terminal, RFID reader, or touchless sensor',
      'Dual-color LED indicators (Red = Locked, Green = Free to Enter) and audio buzzers'
    ],
    specs: {
      'Door Support Capacity': '2 to 12 doors per central microprocessor controller',
      'Enclosure Variants': 'Flameproof Ex-d Cast Aluminum / SS304 Cleanroom Flush Mount',
      'Operating Voltage': '230V AC input, 12V / 24V DC regulated internal power supply',
      'Interlock Logic': 'Sequential / First-Come-First-Serve / Multi-Airlock Zone logic',
      'Emergency Modes': 'Auto-release on Fire Alarm Panel trigger and Emergency Push Button'
    },
    applications: [
      'Pharmaceutical Formulation & API Cleanrooms (ISO 5 to ISO 8)',
      'Hospital Surgical Operating Theatres & Isolation Suites',
      'Biotechnology, Vaccine Facilities & Containment Labs (BSL-3/4)',
      'Semiconductor & Precision Electronics Clean Environments'
    ],
    isFeatured: true
  },
  {
    id: 18,
    slug: 'pass-box-systems',
    name: 'Pass Box Systems (Static & Dynamic)',
    category: 'Security System',
    subcategory: 'Pharma Cleanroom Airlock',
    tagline: 'Contamination-free material transfer hatches with UV germicidal sterilization',
    badge: 'Pharma Grade',
    workSummary: 'Contamination-free material transfer hatches with UV sterilization',
    description: 'Pass boxes facilitate contamination-free material transfer between cleanrooms of different air classifications without personnel movement. Available in Static models for rooms of equal cleanliness and Dynamic models equipped with HEPA filtration and laminar airflow for sterile transfer.',
    features: [
      'Heavy-duty Stainless Steel SS304 / SS316 internal and external construction',
      'Electromagnetic interlocking doors prevent both doors from opening simultaneously',
      'UV-C germicidal sterilization lamp with safety hour meter and door interlock cutoff',
      'Dynamic version features mini-pleat HEPA filter (99.997% at 0.3 micron) and blower',
      'Differential pressure gauge (Magnehelic) to monitor HEPA filter pressure drop'
    ],
    specs: {
      'Material of Construction': 'SS304 / SS316 mirror or electro-polished sheet steel',
      'Interlocking Mechanism': 'Electro-magnetic interlock with mechanical backup',
      'UV Sterilization': 'Philips UV-C germicidal lamp (254 nm wavelength)',
      'Filtration (Dynamic)': 'EU14 Grade Mini-Pleat HEPA Filter (99.997% efficiency)',
      'Pressure Monitoring': 'Dwyer Magnehelic gauge (0 - 250 Pa range)'
    },
    applications: [
      'Pharmaceutical Packaging & Sterile Transfer Airlocks',
      'Microbiology Labs & Quality Control Testing Suites',
      'Hospital Pharmacy Compounding Rooms',
      'Electronics & Aerospace Clean Rooms'
    ],
    isFeatured: false
  },
  {
    id: 19,
    slug: 'fire-alarm-system',
    name: 'Fire Alarm Systems (Conventional & Addressable)',
    category: 'Security System',
    subcategory: 'Life Safety & Early Detection',
    tagline: 'Multi-loop addressable fire alarm control panels, multi-sensors & hooters',
    badge: 'Life Safety Certified',
    workSummary: 'Multi-loop smoke, heat & flame sensor network with auto AHU trip',
    description: 'Advanced conventional and micro-processed addressable fire alarm systems, intelligent optical smoke detectors, rate-of-rise thermal detectors, and audio-visual signaling devices. Engineered for new installations or turnkey retrofits with direct integration to door interlocks and AHU trip dampers.',
    features: [
      'Conventional (2 to 32 Zone) and Addressable (1 to 8 Loop) fire alarm control panels',
      'Complete detector portfolio: Optical Smoke, Thermal Heat, Multi-Sensor, and Optical Beam',
      'Flameproof intrinsically safe detectors for hazardous and solvent storage rooms',
      'High-decibel electronic hooters, sounders, and xenon flash strobe indicators',
      'Direct relay tripping to drop door access locks, close fire shutters, and trip AHU fans'
    ],
    specs: {
      'Loop Scalability': '1 to 8 Loops (Up to 254 addressable devices per loop)',
      'Compliance Standards': 'UL Listed / EN 54 / IS 2189 Indian Standards',
      'Display Interface': 'Backlit multi-line LCD graphical screen with mimic zone LEDs',
      'Relay Outputs': 'Configurable potential-free contacts for BMS, AHU, Interlocks, and Elevators'
    },
    applications: [
      'Pharmaceutical Manufacturing & Warehouse Facilities',
      'High-Rise Commercial Towers & Corporate Parks',
      'Hospitals, Hotels, Malls & Educational Campuses',
      'Industrial Engineering Plants & Data Centers'
    ],
    isFeatured: true
  },
  {
    id: 20,
    slug: 'gas-detection-systems',
    name: 'Gas Detection Systems',
    category: 'Security System',
    subcategory: 'Environmental Safety & Life Protection',
    tagline: 'Certified flameproof & safe gas transmitters for toxic, combustible & VOC gases',
    badge: 'Flameproof Ex-d',
    workSummary: 'Toxic, combustible LPG/CNG & VOC solvent leak alerts with blower trips',
    description: 'Continuous real-time gas monitoring instruments providing early detection of toxic, oxygen-depleting, and combustible gas leaks in industrial cleanrooms, chemical plants, and manufacturing floors. Features local OLED displays, dual alarm thresholds, and Modbus RTU communications.',
    features: [
      'Certified Flameproof (Ex-d Group IIA, IIB, IIC) cast aluminum/SS316 sensor heads',
      'Monitors combustible gases (% LEL), Toxic gases (CO, NH3, H2S, Cl2), O2, and VOCs',
      'Bright local digital OLED/LCD display with dual-level audible buzzer and LED alerts',
      'Standard 4-20mA analog current loop and RS485 Modbus RTU telemetry output',
      'Direct relay interlock to trigger industrial exhaust blowers and shut off gas solenoid valves'
    ],
    specs: {
      'Gas Types Detected': 'Combustible (% LEL), Toxic (ppm), Oxygen (% Vol), Refrigerants, VOCs',
      'Sensor Principles': 'Catalytic Pellistor, Electrochemical Cell, NDIR Infrared sensor',
      'Enclosure Rating': 'Flameproof Ex-d (ATEX / PESO certified) & Weatherproof IP66',
      'Telemetry Outputs': '4-20 mA Analog output, RS485 Modbus RTU, SPDT relay dry contacts'
    },
    applications: [
      'Pharmaceutical Solvent Storage & API Synthesis Areas',
      'Chemical Processing Units & Fertilizer Plants',
      'Gas Cylinder Manifold Banks & Boiler Fuel Lines',
      'Underground Commercial Car Basements (CO detection)'
    ],
    isFeatured: false
  },
  {
    id: 21,
    slug: 'digital-gps-clocks',
    name: 'Digital Clocks (GPS Synchronized)',
    category: 'Security System',
    subcategory: 'Precision Timing & USFDA Compliance',
    tagline: 'Master-slave synchronized digital clocks for pharmaceutical audit compliance',
    badge: 'USFDA Compliant',
    workSummary: 'GPS master-slave pharma time synchronization for batch compliance',
    description: 'High-visibility master-slave digital clocks synchronized automatically via GPS satellite receiver or NTP Ethernet server. Essential for USFDA 21 CFR Part 11 and WHO-GMP compliance across pharmaceutical manufacturing batches, testing labs, and hospital operation theatres.',
    features: [
      'GPS satellite wireless synchronization or Ethernet NTP network sync',
      'Available in Flameproof (Ex-d) cast enclosure and Non-Flameproof SS flush mount',
      'High-intensity 7-segment red/green LED digits visible from 30+ meters away',
      'Guarantees identical, synchronized time across all cleanroom production blocks',
      'Internal RTC backup battery retains accurate time during electrical power outages'
    ],
    specs: {
      'Digit Heights': '2-inch, 4-inch, and 6-inch high-visibility 7-segment LED digits',
      'Display Formats': 'HH:MM:SS (24-Hour / 12-Hour format selectable)',
      'Time Synchronization': 'GPS Outdoor Antenna Receiver / NTP Ethernet Server (RJ45)',
      'Enclosure Styles': 'Stainless Steel SS304 Flush Mount / Flameproof Ex-d IIA, IIB'
    },
    applications: [
      'Pharmaceutical Formulation & Batch Cleanrooms',
      'Quality Assurance & Analytical Testing Labs (21 CFR Part 11)',
      'Hospital Surgical OT Suites & Intensive Care Units',
      'Corporate Dispatch Centers & Trading Floors'
    ],
    isFeatured: false
  },
  {
    id: 22,
    slug: 'video-door-phones',
    name: 'Video Door Phones (IP & Multi-Apartment)',
    category: 'Security System',
    subcategory: 'Video Intercom & Visitor Screening',
    tagline: 'High-definition color touch-screen video intercoms with remote door release',
    badge: 'Smart Intercom',
    workSummary: 'High-definition video intercom with remote gate & door release',
    description: 'Advanced IP and analog video door phone systems featuring high-definition camera outdoor door stations and sleek indoor touchscreen monitors. Allows security guards and receptionists to visually verify visitors and trigger motorized gate or door release remotely.',
    features: [
      'Full HD wide-angle door camera with infrared night vision and call button',
      '7-inch / 10-inch capacitive color touchscreen indoor stations with hands-free intercom',
      'One-touch remote unlock button for motorized gates and electro-magnetic door locks',
      'Mobile app call forwarding allowing visitor answering and door release via smartphone',
      'Multi-apartment and corporate campus scalability supporting hundreds of indoor monitors'
    ],
    specs: {
      'Camera Resolution': '2MP Full HD 1080p with 130° wide field-of-view lens',
      'Indoor Monitor': '7-inch / 10-inch IPS capacitive touchscreen with micro SD recording',
      'Network Interface': 'PoE (Power over Ethernet) / Wi-Fi / 4-wire analog options',
      'Door Control': 'Dual relay outputs for pedestrian door lock and driveway motorized gate'
    },
    applications: [
      'Corporate Executive Offices & Reception Consoles',
      'Gated Residential Communities & Luxury Villas',
      'Pharma Plant Security Gatehouses to Office Intercom',
      'Commercial Towers & Penthouse Suites'
    ],
    isFeatured: false
  },
  {
    id: 23,
    slug: 'public-address-system',
    name: 'Public Address (PA) Systems',
    category: 'Security System',
    subcategory: 'Acoustics & Voice Evacuation',
    tagline: 'Turnkey audio systems for zoned announcements, paging & emergency evacuation',
    badge: 'Turnkey Audio',
    workSummary: 'Zoned emergency voice evacuation broadcast & factory paging',
    description: 'Engineered public address and voice evacuation systems designed to broadcast clear voice paging and emergency evacuation instructions across expansive industrial plants, corporate auditoriums, and commercial complexes. Features zoned distribution, mixer amplifiers, and fire alarm priority overrides.',
    features: [
      'Turnkey audio package: ceiling speakers, wall cabinets, horn speakers, and amplifiers',
      'Multi-zone audio matrix allowing selective paging per department, floor, or zone',
      'Fire Alarm Panel integration with automatic emergency voice evacuation override',
      'High-clarity paging microphones with chime alert tones and priority speech channels',
      'Background music distribution with multiple source inputs (USB, Bluetooth, Aux)'
    ],
    specs: {
      'Amplifier Power': '120W, 240W, 500W, and 1000W zone mixer amplifiers',
      'Speaker Line Voltage': '70V / 100V distributed constant-voltage lines',
      'Speaker Types': 'Ceiling Flush Speakers, Wall Columns, IP66 Outdoor Reflex Horns',
      'Emergency Override': '24V DC fire alarm panel trigger contact overrides all volume attenuators'
    },
    applications: [
      'Manufacturing Plant Floors & Assembly Sheds',
      'Corporate Auditoriums, Town Halls & Canteens',
      'Hospitals & Healthcare Facilities (Nurse paging)',
      'Commercial Malls, Multiplexes & Transit Stations'
    ],
    isFeatured: false
  },
  {
    id: 24,
    slug: 'visitor-management-system',
    name: 'Visitor Management Systems',
    category: 'Security System',
    subcategory: 'Digital Reception & Access Control',
    tagline: 'Digital touchless visitor screening, QR badge printing & host notifications',
    badge: 'Paperless Security',
    workSummary: 'Automated RFID guidance & QR digital pass for corporate security',
    description: 'Modern digital visitor management platform replacing outdated paper guestbooks. Enables touchless visitor pre-registration, instant thermal badge printing with QR code, host SMS/WhatsApp notifications, and direct barrier integration for seamless corporate security.',
    features: [
      'Self-service tablet kiosk or guard console for rapid visitor registration',
      'Instant thermal visitor badge printing with visitor photo and dynamic QR access code',
      'Automated SMS, email, and WhatsApp notification to host upon guest arrival',
      'Pre-registration invites with QR codes for VIP guests and interviewees',
      'Direct integration with optical flap barriers and turnstiles for single-trip access'
    ],
    specs: {
      'Supported Terminals': 'Android / iPad touchscreen kiosks and PC desktop guard consoles',
      'Badge Printer': 'Direct thermal barcode/QR label printer with auto-cutter',
      'Identification': 'National ID / Driving License OCR card scanner integration',
      'Cloud Dashboard': 'Real-time roll-call evacuation list, analytics reports, and overstay alerts'
    },
    applications: [
      'Corporate Headquarters & Multinational Technology Parks',
      'Pharmaceutical Formulation Facilities (Vendor tracking)',
      'Government Secretariats & Embassies',
      'Co-Working Hubs & Commercial Business Centers'
    ],
    isFeatured: false
  },
  {
    id: 25,
    slug: 'parking-intrusion-alarms',
    name: 'Parking & Intrusion Alarm Systems',
    category: 'Security System',
    subcategory: 'Perimeter Intrusion Detection',
    tagline: 'Infrared perimeter beams, microwave sensors & ultrasonic parking guidance',
    badge: 'Perimeter Protection',
    workSummary: 'Perimeter beam detection & automated multi-level parking guidance',
    description: 'High-reliability intrusion detection systems combining active infrared perimeter beams, microwave motion detectors, and ultrasonic parking management sensors. Provides multi-layered defense against boundary breaches while optimizing vehicle parking space allocation.',
    features: [
      'Active infrared photo-electric perimeter beams with multi-channel anti-cross-talk',
      'Dual-tech PIR and microwave motion sensors immune to pet false alarms',
      'Ultrasonic parking bay sensors with green/red overhead LED occupancy status',
      'Central control panel with multi-zone alarm annunciator and GSM auto-dialer',
      'Direct integration with siren strobe sounders and centralized security VMS'
    ],
    specs: {
      'Beam Outdoor Range': '30m, 60m, 100m, and 200m dual/quad perimeter beam options',
      'Detection Principle': 'Active Infrared Beam Interruption / Dual PIR + Microwave Doppler',
      'Alarm Panel Zones': '8 to 64 hardwired and wireless supervised security zones',
      'Alert Channels': 'High-decibel outdoor siren (115 dB), GSM SMS alert, Central Station dialer'
    },
    applications: [
      'Industrial Boundary Walls & Factory Perimeter Fences',
      'Multi-Level Corporate Parking Basements',
      'Warehouse Open Yards & Material Depots',
      'Solar Power Plants & Sub-Station Perimeters'
    ],
    isFeatured: false
  },
  {
    id: 26,
    slug: 'fault-alarm-systems',
    name: 'Fault Alarm Annunciator Systems',
    category: 'Security System',
    subcategory: 'Industrial Equipment Protection',
    tagline: 'Microcontroller alarm annunciators monitoring trip conditions in industrial machinery',
    badge: 'Industrial Protection',
    workSummary: 'Critical machinery trip monitoring & audio-visual fault annunciators',
    description: 'Microcontroller-based fault alarm annunciators engineered to monitor trip status and fault contacts from industrial electrical switchboards, pumps, chillers, and transformers. Displays fault sequences with flashing LED windows and loud audible hooters.',
    features: [
      'Available in 8, 16, 24, and 32 window fault annunciator modules',
      'Super-bright LED window illumination with replaceable fault name legend inserts',
      'Selectable ISA sequence standards (ISA-1, ISA-2A, ISA-4A manual/auto reset)',
      'Potential-free dry contact inputs from pressure switches, thermostats, and breakers',
      'RS485 Modbus RTU communication port for SCADA / PLC network telemetry'
    ],
    specs: {
      'Window Configurations': '8, 16, 24, or 32 LED fault display windows',
      'Input Signals': 'NO/NC potential-free dry contacts from field machinery',
      'Standard Sequences': 'ISA-1 (Manual Reset), ISA-2A (Auto Reset), Ringback sequences',
      'Power Supply': 'Universal 90-270V AC/DC auxiliary power supply'
    },
    applications: [
      'Electrical Sub-Stations & HT/LT Panel Boards',
      'Pharmaceutical Utility Plants & Chiller Control Desks',
      'Boiler Automation & DG Set Synchronizing Panels',
      'Process Industries, Chemical Plants & Water Treatment Hubs'
    ],
    isFeatured: false
  },
  {
    id: 27,
    slug: 'server-room-monitoring',
    name: 'Server Room Environmental Monitoring',
    category: 'Security System',
    subcategory: 'IT Infrastructure & Data Center Safety',
    tagline: 'Room Alert multi-sensor protection against temperature, water leaks, power & smoke',
    badge: '24/7 IT Protection',
    workSummary: 'Real-time continuous tracking of server room heat, water leaks & power loss',
    description: 'Continuous real-time environmental monitoring hardware for data centers and IT server closets. Tracks temperature spikes, excessive humidity, water flooding under raised floors, power outages, and airflow, sending instant SMS, email, and SNMP alerts before costly equipment damage occurs.',
    features: [
      'Continuous tracking of temperature, relative humidity, power supply, and fluid leaks',
      'Conductive water leak sensor ropes installed underneath raised floor tiles',
      'Instant automated email, SMS, and SNMP trap notifications to network admins',
      'Built-in web-browser dashboard with historical logging, graph charts, and CSV export',
      'Relay contact outputs to trigger backup air conditioners or audio-visual beacon towers'
    ],
    specs: {
      'Sensors Supported': 'Up to 32 digital sensors + dry contact switch inputs',
      'Alert Channels': 'Email, SMS via GSM modem, SNMP Traps, Audio-Visual Beacon Tower',
      'Power Supply': 'Power-over-Ethernet (PoE IEEE 802.3af) with internal backup battery',
      'Platform Compatibility': 'Nagios, PRTG, Zabbix, Room Alert Manager, SNMP v1/v2c/v3'
    },
    applications: [
      'Enterprise Data Centers & Network Operations Centers (NOC)',
      'Server Closets, Telecom Switching Rooms & PBX Racks',
      'Pharma Cold Storage & Temperature-Controlled Stability Chambers',
      'Museum Archives, Art Galleries & Cleanroom Equipment Rooms'
    ],
    isFeatured: true
  },

  // --- 3. HYGIENE & WASHROOM AUTOMATION ---
  {
    id: 28,
    slug: 'sensor-taps',
    name: 'Automatic Touchless Sensor Taps',
    category: 'Hygiene',
    subcategory: 'Touchless Water Management',
    tagline: 'Solid-cast brass touchless sensor taps conserving up to 70% water with pristine hygiene',
    badge: 'Water Saving',
    workSummary: 'Hands-free sensor water faucets preventing cross-infection & waste',
    description: 'Heavy-duty commercial-grade touch-free sensor taps manufactured from solid-cast brass with multi-layer chrome electroplating. Automatically dispenses water when hands are detected beneath the spout, eliminating cross-contamination and slashing corporate water consumption by up to 70%.',
    features: [
      'Active infrared proximity sensor delivers instantaneous touchless, germ-free flow',
      'Heavy-duty solid-cast brass construction with brilliant chrome electroplating',
      'Dual power options: Battery operated (4x AA alkaline) or 220V AC electrical adapter',
      'Built-in aerator generates a soft, splash-free laminar flow stream saving water',
      'Available in Pillar mounted, Basin deck mounted, and Wall mounted designs'
    ],
    specs: {
      'Sensing Distance': '10 to 18 cm (Factory calibrated with auto-adjustment)',
      'Operating Water Pressure': '0.05 MPa to 0.7 MPa dynamic water pressure',
      'Power Source': 'DC 6V (4x AA batteries rated for 100,000 cycles) / AC 220V 50Hz',
      'Shut-Off Delay': 'Under 1 second after hands leave the sensing area (anti-overflow auto shutoff at 60s)'
    },
    applications: [
      'Pharmaceutical Hand Scrub & Airlock Gowning Stations',
      'Hospitals, Surgical Scrub Sinks & Diagnostic Clinics',
      'Corporate Restrooms, Airport Lounges & Luxury Hotels',
      'Commercial Food Preparation Kitchens & Dining Pantries'
    ],
    isFeatured: false
  },
  {
    id: 29,
    slug: 'automatic-hand-dryers',
    name: 'Automatic High-Speed Hand Dryers',
    category: 'Hygiene',
    subcategory: 'Washroom Automation',
    tagline: 'Dual-blower high-speed hygienic hand drying with thermal overload protection',
    badge: 'Rapid Dry',
    workSummary: 'Touchless high-speed warm air hand drying in 8-12 seconds',
    description: 'Commercial high-speed touchless hand dryers available in single-blower and double-blower configurations. Equipped with Thermal Overload Protection (T.O.P.), automatic 1-minute safety cutoff, and a modern spectrum of designer housing finishes.',
    features: [
      'Available in powerful Single Blower and high-velocity Double Blower models',
      'Fully automatic touch-free optical sensor operation',
      'Internal motor protected by T.O.P. (Thermal Overload Protection)',
      'Heating element safeguarded by internal thermostat and thermo fuse',
      'Rapid drying time of 8 to 12 seconds saves electricity and eliminates paper waste',
      'Available in White ABS, Brushed SS304 Stainless Steel, and Matte Black'
    ],
    specs: {
      'Air Velocity': 'Up to 90 m/sec dual-blade high velocity air curtain',
      'Drying Time': '8 to 12 seconds rapid dry cycle',
      'Casing Material': 'Impact-resistant ABS engineering plastic / Brushed SUS304 Stainless Steel',
      'Power Rating': '1200W to 1800W with auto-heating element power cutoff',
      'Safety Cutoff': 'Automatic 60-second continuous run safety auto-shutoff'
    },
    applications: [
      'Pharma Cleanroom Entry Airlocks & Gowning Rooms',
      'Corporate Office Restrooms & Executive Washrooms',
      'Airports, Shopping Malls, Theatres & Food Courts',
      'Hospitals, Laboratories & Industrial Canteens'
    ],
    isFeatured: true
  },
  {
    id: 30,
    slug: 'urinal-flush-valves',
    name: 'Automatic Urinal Flush Valves',
    category: 'Hygiene',
    subcategory: 'Touchless Water Management',
    tagline: 'Smart infrared flushers in concealed wall box & exposed brass configurations',
    badge: 'Odor Free',
    workSummary: 'Infrared pre-flush & post-flush urinal valves keeping restrooms sanitary',
    description: 'Touchless sensor-driven urinal flushing valves engineered for corporate and commercial washrooms. Automatically conducts a brief pre-rinse when a user approaches and a thorough post-flush when stepping away, keeping urinals fresh and odor-free.',
    features: [
      'Dual flushing cycle: hygienic 2-second pre-rinse and thorough 6-second post-flush',
      'Available in both Concealed (recessed wall box) and Exposed chrome pipe styles',
      'Internal valve and external brass valve options to match existing plumbing',
      'Dual power: Long-life alkaline battery pack or AC 230V mains power adapter',
      'Automatic 24-hour trap freshener flush cycle if left unused to prevent sewer odor'
    ],
    specs: {
      'Installation Configurations': 'Concealed Wall Box (SS plate) / Exposed Top Spout Mount',
      'Sensor Technology': 'Digital Active Infrared with optical anti-interference filter',
      'Operating Water Pressure': '0.5 bar to 6.0 bar dynamic water pressure',
      'Flushing Volume': 'Adjustable 1.5 to 3.0 liters per flush cycle'
    },
    applications: [
      'Commercial Corporate Restrooms & IT Hubs',
      'Pharmaceutical Staff Facilities & Gowning Airlocks',
      'Airports, Railway Terminals & Metro Stations',
      'Sports Stadiums, Multiplexes & Shopping Malls'
    ],
    isFeatured: false
  },
  {
    id: 31,
    slug: 'industrial-air-curtains',
    name: 'Industrial & Commercial Air Curtains',
    category: 'Hygiene',
    subcategory: 'Air Barriers & Thermal Isolation',
    tagline: 'Flameproof & non-flameproof aerodynamic barriers keeping insects, dust & heat out',
    badge: 'Thermo Zone',
    workSummary: 'Aerodynamic air barrier preserving conditioned air & blocking insects',
    description: 'Precision engineered industrial air curtains that produce an invisible, high-velocity aerodynamic barrier across open doorways. Traps chilled air conditioning inside while repelling external summer heat, dust, fumes, and flying insects. Available in Flameproof (Ex-d) and Non-Flameproof specifications.',
    features: [
      'Low-noise continuous-duty operation with dynamically balanced multi-blade blowers',
      'Available in certified Flameproof (Ex-d) and Non-Flameproof configurations',
      'Thermo-Zone aerodynamic nozzle produces an even, laminar air barrier across opening',
      'Cuts HVAC air conditioning energy losses by up to 35% on frequently opened doors',
      'Specially engineered for pharmaceutical cleanrooms, food processing plants, and malls'
    ],
    specs: {
      'Available Lengths': '1.0m, 1.2m, 1.5m, 1.8m, and 2.0m modular lengths',
      'Air Velocity': '18 m/sec to 24 m/sec high-velocity laminar discharge',
      'Motor Insulation': 'Class F continuous rating TEFC motor (Flameproof Ex-d available)',
      'Noise Level': 'Under 58 dBA low-vibration acoustic dampening'
    },
    applications: [
      'Pharmaceutical Formulation & Packaging Clean Entrances',
      'Food Processing Bays, Cold Storages & Dairies',
      'Air Conditioned Malls, Supermarkets & Hotel Lobbies',
      'Restaurant Entrances & Commercial Kitchen Pass-Throughs'
    ],
    isFeatured: true
  },
  {
    id: 32,
    slug: 'automatic-soap-dispensers',
    name: 'Automatic Liquid Soap & Sanitizer Dispensers',
    category: 'Hygiene',
    subcategory: 'Touchless Washroom Automation',
    tagline: 'Touchless infrared dispensers preventing cross-infection with calibrated dosage',
    badge: 'Touchless Hygiene',
    workSummary: 'Touchless infrared soap & sanitizer dispensers avoiding fluid waste',
    description: 'Precision touch-free liquid soap and alcohol gel hand sanitizer dispensers. Available in wall-mounted, countertop basin-mounted, and freestanding stand configurations. Dispenses a calibrated volume per activation, eliminating cross-infection and fluid wastage.',
    features: [
      'Touch-free infrared sensor actuation completely eliminates contact contamination',
      'Heavy-duty solid outer construction engineered for high-traffic environments',
      'Adjustable liquid dosage volume per dispense (0.8 ml to 1.5 ml) to minimize wastage',
      'Compatible with liquid hand soap, antibacterial gel, and alcohol hand rub',
      'Translucent viewing reservoir window for quick fluid refill level inspection'
    ],
    specs: {
      'Reservoir Capacity': '800 ml to 1200 ml bulk refill tank',
      'Dispense Volume': '0.8 ml to 1.5 ml (Multi-stage adjustable dosage)',
      'Power Source': '4x AA batteries (up to 30,000 cycles) or DC adapter',
      'Mounting': 'Wall Mounted with security key lock / Countertop Basin Mounted'
    },
    applications: [
      'Pharmaceutical Gowning Airlocks & Personnel Entryways',
      'Hospital Intensive Care Units & Surgical Scrub Sinks',
      'Corporate Office Restrooms & Dining Pantries',
      'Commercial Food Courts & Restroom Washbasins'
    ],
    isFeatured: false
  },
  {
    id: 33,
    slug: 'pvc-strip-curtains',
    name: 'PVC Strip Curtains (Grade A+)',
    category: 'Hygiene',
    subcategory: 'Thermal & Dust Barriers',
    tagline: 'UV-stabilized 3mm Grade A+ transparent flexible curtains with 99.2% optical clarity',
    badge: 'Grade A+ Quality',
    workSummary: 'Heavy-duty 3mm transparent flexible dust & thermal barrier curtains',
    description: 'High-clarity flexible PVC strip doors offering exceptional chemical resistance to acids, alkalies, and harsh industrial environments. Prevents thermal leakage, airborne dust, insects, and noise between industrial zones while maintaining 99.2% optical transparency for forklift driver safety.',
    features: [
      'UV-stabilized formulation prevents yellowing, discoloration, or brittleness over time',
      'High chemical resistance against corrosive chemical vapors, acids, and alcohols',
      'Superior 99.2% transparency index ensures complete operator and forklift safety',
      'Standard 3mm thickness Grade A+ with 200mm individual strip width',
      'Stainless steel suspension hanger track system supporting 50% or 100% strip overlap'
    ],
    specs: {
      'Strip Thickness': '3 mm premium Grade A+ quality',
      'Strip Width': '200 mm standard strip width',
      'Optical Transparency': '99.2% high optical light transmission',
      'Temperature Range': '-15°C to +50°C (Polar freezer grade available down to -40°C)',
      'Hanger Hardware': 'Stainless Steel Grade 304 hook-on suspension track'
    },
    applications: [
      'Pharma Raw Material Warehouses & Dispensing Booths',
      'Cold Storage Rooms, Deep Freezers & Dairies',
      'Factory Loading Bay Openings & Forklift Gateways',
      'Food Processing & Chemical Packaging Units'
    ],
    isFeatured: false
  }
];

// Helper: Get product by slug
export const getProductBySlug = (slug) => {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return productsData.find(p => p.slug.toLowerCase() === cleanSlug) || null;
};

// Helper: Get products by category
export const getProductsByCategory = (category) => {
  if (!category || category === 'All') return productsData;
  const cleanCat = category.toLowerCase().trim();
  return productsData.filter(p => {
    const pCat = p.category.toLowerCase();
    if (cleanCat === 'automation') return pCat.includes('automation');
    if (cleanCat === 'security-systems' || cleanCat === 'security system' || cleanCat === 'security') {
      return pCat.includes('security');
    }
    if (cleanCat === 'cleanroom-interlocks' || cleanCat === 'interlocks') {
      return (
        p.slug.includes('interlock') ||
        p.slug.includes('pass-box') ||
        p.slug.includes('clean-room') ||
        p.subcategory.toLowerCase().includes('cleanroom')
      );
    }
    if (cleanCat === 'hygiene' || cleanCat === 'hygiene solutions') {
      return pCat.includes('hygiene');
    }
    return pCat === cleanCat;
  });
};
