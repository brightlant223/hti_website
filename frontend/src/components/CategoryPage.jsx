import React, { useState, useMemo } from 'react';
import {
  ArrowLeft, Search, Filter, ShieldCheck, ArrowRight,
  Send, Sparkles, Cpu, Layers, Flame, Lock, CheckCircle2,
  PhoneCall, FileText, Check, ChevronDown, ChevronUp, Wrench,
  Clock, Award, HelpCircle, CheckSquare, Factory, Building2,
  SlidersHorizontal, Play, Truck, Plane, Download, X, Activity
} from 'lucide-react';
import { getProductsByCategory } from '../data/productsData';

// EXACT 14 INDUSTRIAL ACCESS AUTOMATION SERVICES MATCHING REFERENCE DESIGN
const INDUSTRIAL_AUTOMATION_SERVICES = [
  {
    num: '01',
    id: 1,
    slug: 'automatic-sliding-swing-doors',
    title: 'Automatic Sliding & Swing Doors',
    categoryBadge: 'Industrial Access',
    categoryFilters: ['All', 'Industrial Access', 'Heavy Duty', 'Energy Efficient'],
    description: 'Advanced automatic entrance systems for commercial, industrial and public facilities.',
    features: [
      'Touchless & hygienic access',
      'Custom glass / metal finish',
      'Suitable for high-traffic areas'
    ],
    image: '/services/services-touchless-entry.jpg',
    brochure: true
  },
  {
    num: '02',
    id: 2,
    slug: 'automatic-sliding-swing-gates',
    title: 'Automatic Sliding & Swing Gates',
    categoryBadge: 'Perimeter Security',
    categoryFilters: ['All', 'Perimeter Security', 'Heavy Duty'],
    description: 'Robust perimeter gates for industrial and commercial sites.',
    features: [
      'Heavy-duty automation',
      'Multiple gate configurations',
      'Secure & reliable operation'
    ],
    image: '/services/services-perimeter-gate.jpg',
    brochure: true
  },
  {
    num: '03',
    id: 3,
    slug: 'telescopic-cantilever-gates',
    title: 'Telescopic & Cantilever Gates',
    categoryBadge: 'Perimeter Security',
    categoryFilters: ['All', 'Perimeter Security', 'Custom Solutions', 'Heavy Duty'],
    description: 'Wide span gate solutions for large openings and heavy-duty applications.',
    features: [
      'Telescopic / cantilever design',
      'Ideal for wide entrances',
      'Smooth & stable operation'
    ],
    image: '/services/services-trackless-gate.jpg',
    brochure: true
  },
  {
    num: '04',
    id: 4,
    slug: 'pvc-rapid-roll-up-doors',
    title: 'High-Speed PVC Rapid Roll-Up Doors',
    categoryBadge: 'Industrial Doors',
    categoryFilters: ['All', 'Vertical Access', 'High Speed', 'Energy Efficient'],
    description: 'Fast, durable doors for high-traffic industrial zones.',
    features: [
      'High opening/closing speed',
      'Insulated & energy efficient',
      'Suitable for indoor/outdoor use'
    ],
    image: '/services/services-rapid-airlock.jpg',
    brochure: true
  },
  {
    num: '05',
    id: 5,
    slug: 'sectional-overhead-doors',
    title: 'Sectional Overhead Doors',
    categoryBadge: 'Industrial Doors',
    categoryFilters: ['All', 'Vertical Access', 'Logistics & Loading', 'Energy Efficient', 'Heavy Duty'],
    description: 'Insulated sectional doors with high durability and smooth operation.',
    features: [
      'Space saving design',
      'Thermal insulation',
      'Ideal for warehouses & plants'
    ],
    image: '/services/service-sectional-doors.jpg',
    brochure: true
  },
  {
    num: '06',
    id: 6,
    slug: 'fire-rated-doors-shutters',
    title: 'Fire Rated Doors & Shutters',
    categoryBadge: 'Fire Protection',
    categoryFilters: ['All', 'Fire & Smoke Protection', 'Vertical Access', 'Heavy Duty'],
    description: 'Certified fire-rated doors and shutters for enhanced safety.',
    features: [
      'Fire resistance as per standards',
      'Automatic closing system',
      'Suitable for critical areas'
    ],
    image: '/services/service-fire-doors.jpg',
    brochure: true
  },
  {
    num: '07',
    id: 7,
    slug: 'motorized-rolling-shutters',
    title: 'Motorized Industrial Rolling Shutters',
    categoryBadge: 'Industrial Access',
    categoryFilters: ['All', 'Industrial Access', 'Vertical Access', 'Heavy Duty'],
    description: 'Heavy-duty rolling shutters for maximum security.',
    features: [
      'Durable and robust design',
      'Custom sizes & finishes',
      'Ideal for industrial sites'
    ],
    image: '/services/services-heavy-security.jpg',
    brochure: true
  },
  {
    num: '08',
    id: 8,
    slug: 'boom-barriers',
    title: 'Automatic Boom Barriers',
    categoryBadge: 'Traffic & Vehicle Access',
    categoryFilters: ['All', 'Traffic & Vehicle Access', 'Perimeter Security', 'High Speed'],
    description: 'Reliable vehicle access control for entry/exit points.',
    features: [
      'Fast operation',
      'Integrated access control',
      'Ideal for parking & gated facilities'
    ],
    image: '/services/service-boom-barrier.jpg',
    brochure: true
  },
  {
    num: '09',
    id: 9,
    slug: 'dock-levellers-dock-shelters',
    title: 'Dock Levellers & Dock Shelters',
    categoryBadge: 'Logistics & Loading',
    categoryFilters: ['All', 'Logistics & Loading', 'Heavy Duty'],
    description: 'Optimized loading bay solutions for efficient material handling.',
    features: [
      'Hydraulic & mechanical options',
      'Weather protection',
      'Suitable for all truck types'
    ],
    image: '/services/services-logistics-bridge.jpg',
    brochure: true
  },
  {
    num: '10',
    id: 31,
    slug: 'industrial-air-curtains',
    title: 'Air Curtains',
    categoryBadge: 'Indoor Air Control',
    categoryFilters: ['All', 'Indoor Air Control', 'Energy Efficient'],
    description: 'Maintains indoor climate and prevents dust, insects and outside air.',
    features: [
      'Energy efficient operation',
      'Suitable for commercial & industrial',
      'Multiple sizes and models'
    ],
    image: '/services/service-air-curtain.jpg',
    brochure: true
  },
  {
    num: '11',
    id: 17,
    slug: 'door-interlock-systems',
    title: 'Cleanroom Interlocks & Pass Boxes',
    categoryBadge: 'Hygiene & Cleanrooms',
    categoryFilters: ['All', 'Hygiene & Cleanrooms', 'Custom Solutions'],
    description: 'For contamination control in cleanroom environments.',
    features: [
      'Static & dynamic pass boxes',
      'UV & interlock options',
      'Custom cleanroom solutions'
    ],
    image: '/services/service-cleanroom.jpg',
    brochure: true
  },
  {
    num: '12',
    id: 11,
    slug: 'bollards-tyre-killers-car-lifts',
    title: 'Bollards & Road Blockers',
    categoryBadge: 'Perimeter Security',
    categoryFilters: ['All', 'Perimeter Security', 'Traffic & Vehicle Access', 'Heavy Duty'],
    description: 'High-security vehicle access control solutions.',
    features: [
      'Automatic & manual options',
      'Crash-rated models',
      'Suitable for sensitive locations'
    ],
    image: '/services/service-bollards-blockers.jpg',
    brochure: true
  },
  {
    num: '13',
    id: 34,
    slug: 'high-speed-industrial-doors',
    title: 'High-Speed Industrial Doors',
    categoryBadge: 'Special Applications',
    categoryFilters: ['All', 'Vertical Access', 'High Speed', 'Custom Solutions'],
    description: 'High-cycle fast operating fabric and spiral doors for logistics bays and manufacturing.',
    features: [
      'High cycle performance',
      'Insulated & durable',
      'Custom configuration'
    ],
    image: '/services/service-high-speed-doors.jpg',
    brochure: true
  },
  {
    num: '14',
    id: 35,
    slug: 'hangar-doors',
    title: 'Hangar Doors',
    categoryBadge: 'Special Applications',
    categoryFilters: ['All', 'Vertical Access', 'Heavy Duty', 'Custom Solutions'],
    description: 'Large span doors for aviation, shipyard, and heavy industrial facilities.',
    features: [
      'Custom engineered design',
      'Wide opening solutions',
      'Robust and reliable operation'
    ],
    image: '/services/service-hangar-doors.jpg',
    brochure: true
  }
];

const FILTER_CATEGORIES = [
  'All',
  'Industrial Access',
  'Perimeter Security',
  'Vertical Access',
  'Logistics & Loading',
  'Fire & Smoke Protection',
  'Indoor Air Control',
  'Hygiene & Cleanrooms',
  'Traffic & Vehicle Access',
  'Heavy Duty',
  'High Speed',
  'Energy Efficient',
  'Custom Solutions'
];

// CLEANROOM INTERLOCKS & PASS BOXES SERVICES
const CLEANROOM_SERVICES = [
  {
    num: '01',
    id: 1,
    slug: 'door-interlock-systems',
    title: 'Door Interlock Systems',
    categoryBadge: 'Airlock Control',
    categoryFilters: ['All', 'Airlock Control', 'Pressure Containment', 'Flameproof Ex-d'],
    description: 'Microcontroller 2 to 12 door interlocking logic preventing simultaneous door opening in sterile cascades.',
    features: [
      'Sequential & priority interlocking logic',
      'Flameproof Ex-d & SS304 flush options',
      'Programmable pressure stabilization delay'
    ],
    image: '/hero-cleanroom-interlock-chamber.jpg',
    brochure: true
  },
  {
    num: '02',
    id: 2,
    slug: 'pass-box-systems',
    title: 'Pass Box Systems',
    categoryBadge: 'Material Transfer',
    categoryFilters: ['All', 'Material Transfer', 'Pressure Containment', 'Audit Compliance'],
    description: 'Static and dynamic material transfer hatches with electromagnetic interlocking and germicidal UV-C disinfection.',
    features: [
      'SS304/SS316 mirror-finished chamber',
      'Dynamic mini-pleat HEPA (99.997% @ 0.3μm)',
      'UV-C timer cutoff with interlocking doors'
    ],
    image: '/hero-cleanroom-automation.jpg',
    brochure: true
  },
  {
    num: '03',
    id: 3,
    slug: 'door-interlock-systems',
    title: 'Digital Clock / Synchronization Systems',
    categoryBadge: 'Audit Compliance',
    categoryFilters: ['All', 'Audit Compliance', 'Emergency Safety'],
    description: 'GPS master-slave synchronized digital clocks ensuring uniform time-stamped batch records for 21 CFR Part 11.',
    features: [
      'GPS satellite & NTP master-slave sync',
      'Flameproof & SS flush cleanroom enclosures',
      'USFDA 21 CFR Part 11 audit compliance'
    ],
    image: '/case-studies/case-cleanroom.jpg',
    brochure: true
  },
  {
    num: '04',
    id: 4,
    slug: 'door-interlock-systems',
    title: 'Cleanroom Doors',
    categoryBadge: 'Pressure Containment',
    categoryFilters: ['All', 'Pressure Containment', 'Airlock Control'],
    description: 'Hermetically sealed flush cleanroom doors preventing particulate infiltration and air leakage across pressure zones.',
    features: [
      'Hermetic perimeter silicone drop seals',
      'Flush double-glazed vision view panels',
      'Seamless SS304 / powder-coated GI construction'
    ],
    image: '/about-hero-cleanroom.jpg',
    brochure: true
  },
  {
    num: '05',
    id: 5,
    slug: 'door-interlock-systems',
    title: 'Acoustic Sound Doors',
    categoryBadge: 'Pressure Containment',
    categoryFilters: ['All', 'Pressure Containment', 'Emergency Safety'],
    description: 'Heavy noise-dampening acoustic barrier doors engineered for cleanroom utility corridors and compressor plant rooms.',
    features: [
      'Certified high STC acoustic insulation',
      'Heavy-gauge perimeter compression seals',
      'Flush finish compatible with clean environments'
    ],
    image: '/services/service-fire-doors.jpg',
    brochure: true
  },
  {
    num: '06',
    id: 6,
    slug: 'door-interlock-systems',
    title: 'Safety Override Buzzers',
    categoryBadge: 'Emergency Safety',
    categoryFilters: ['All', 'Emergency Safety', 'Airlock Control', 'Flameproof Ex-d'],
    description: 'Emergency release logic and integrated audio buzzer alerts for instant unhindered exit during fire trips.',
    features: [
      'Instant lock release upon fire alarm trigger',
      'Illuminated emergency mushroom push buttons',
      'Integrated high-visibility LED and audio buzzers'
    ],
    image: '/case-studies/case-ss304-mist.jpg',
    brochure: true
  }
];

const CLEANROOM_FILTER_CATEGORIES = [
  'All',
  'Airlock Control',
  'Material Transfer',
  'Pressure Containment',
  'Emergency Safety',
  'Audit Compliance',
  'Flameproof Ex-d'
];

// PERIMETER DEFENSE & TRAFFIC CONTROL SERVICES
const PERIMETER_SERVICES = [
  {
    num: '01',
    id: 1,
    slug: 'boom-barriers',
    title: 'Automatic Boom Barriers',
    categoryBadge: 'Vehicle Access',
    categoryFilters: ['All', 'Vehicle Access', 'High Speed', 'Heavy Duty'],
    description: 'High-frequency electromechanical and hydraulic barriers engineered for continuous toll and parking gates.',
    features: [
      'Brushless DC & hydraulic 100% duty motor',
      'Rapid 1.5s to 6s opening traversal',
      'Integrated LED boom arm lighting & loop safety sensors'
    ],
    image: '/services/service-boom-barrier.jpg',
    brochure: true
  },
  {
    num: '02',
    id: 2,
    slug: 'bollards-tyre-killers-car-lifts',
    title: 'Tyre Killers & Crash Bollards',
    categoryBadge: 'Perimeter Defense',
    categoryFilters: ['All', 'Perimeter Defense', 'Crash Rated', 'Heavy Duty'],
    description: 'Crash-rated rising hydraulic bollards and heavy-duty spike tyre killers preventing unauthorized vehicular intrusion.',
    features: [
      'K4 / K8 / K12 anti-ram crash rating',
      'Emergency Fast Operation (EFO) under 1.5s',
      'Bidirectional hardened alloy tyre spikes'
    ],
    image: '/services/service-bollards-blockers.jpg',
    brochure: true
  },
  {
    num: '03',
    id: 3,
    slug: 'turnstiles-flap-barriers-speed-gates',
    title: 'Optical Turnstiles & Speed Gates',
    categoryBadge: 'Pedestrian Control',
    categoryFilters: ['All', 'Pedestrian Control', 'Biometric Access', 'High Speed'],
    description: 'Architectural pedestrian flap barriers and optical swing speed gates regulating high-throughput personnel movement.',
    features: [
      'High throughput up to 45 persons/min',
      'Infrared anti-tailgating sensor array',
      'Brushed SUS304 stainless steel cabinet'
    ],
    image: '/hero-glass-atrium.jpg',
    brochure: true
  },
  {
    num: '04',
    id: 4,
    slug: 'parking-intrusion-alarms',
    title: 'Parking Management Systems',
    categoryBadge: 'Traffic Management',
    categoryFilters: ['All', 'Traffic Management', 'Vehicle Access', 'Smart Controls'],
    description: 'Automated FASTag RFID guidance, ticket dispensers, barrier integration, and ultrasonic parking bay occupancy sensors.',
    features: [
      'FASTag & Long-Range UHF RFID integration',
      'Ultrasonic bay occupancy LED indicators',
      'Central revenue tracking & ticket billing'
    ],
    image: '/services/services-hero-access.jpg',
    brochure: true
  },
  {
    num: '05',
    id: 5,
    slug: 'bollards-tyre-killers-car-lifts',
    title: 'Car Lift Systems',
    categoryBadge: 'Vehicle Stacking',
    categoryFilters: ['All', 'Vehicle Stacking', 'Heavy Duty', 'Custom Solutions'],
    description: 'Heavy hydraulic multi-level scissor and cantilever vehicle elevators optimizing parking density in restricted spaces.',
    features: [
      '3,000 kg to 5,000 kg load capacity platform',
      'Dual hydraulic lock valves & anti-drop safety',
      'Smooth micro-leveling & compact footprint'
    ],
    image: '/services/services-trackless-gate.jpg',
    brochure: true
  },
  {
    num: '06',
    id: 6,
    slug: 'visitor-management-system',
    title: 'Visitor Management Systems',
    categoryBadge: 'Access Control',
    categoryFilters: ['All', 'Access Control', 'Pedestrian Control', 'Smart Controls'],
    description: 'Digital paperless visitor registration kiosks with dynamic QR badge printing, host alerts, and speed gate sync.',
    features: [
      'Self-service tablet kiosks & thermal badge print',
      'Instant SMS / WhatsApp host notifications',
      'Single-trip QR integration with turnstiles'
    ],
    image: '/hero-security-command-center.jpg',
    brochure: true
  }
];

const PERIMETER_FILTER_CATEGORIES = [
  'All',
  'Vehicle Access',
  'Perimeter Defense',
  'Pedestrian Control',
  'Traffic Management',
  'Vehicle Stacking',
  'Access Control',
  'Crash Rated',
  'Heavy Duty',
  'High Speed',
  'Smart Controls',
  'Custom Solutions'
];

// FIRE PROTECTION & LIFE SAFETY SERVICES
const FIRE_SERVICES = [
  {
    num: '01',
    id: 1,
    slug: 'fire-alarm-system',
    title: 'Addressable Fire Alarm Systems',
    categoryBadge: 'Detection & Alarm',
    categoryFilters: ['All', 'Detection & Alarm', 'Life Safety', 'Turnkey Arrays'],
    description: 'Multi-zone micro-processed addressable fire alarm panels, optical smoke detectors, and thermal sensors with intelligent loop topology.',
    features: [
      '1 to 8 loop addressable multi-sensor network',
      'Automatic AHU shutdown & lock release relays',
      'UL Listed, EN 54 & NBC 2016 Part 4 compliant'
    ],
    image: '/services/service-fire-alarm.jpg',
    brochure: true
  },
  {
    num: '02',
    id: 2,
    slug: 'fire-hydrant-sprinkler-systems',
    title: 'Fire Hydrant & Sprinkler Arrays',
    categoryBadge: 'Fire Suppression',
    categoryFilters: ['All', 'Fire Suppression', 'Industrial Protection', 'Turnkey Arrays'],
    description: 'Complete industrial fire fighting networks featuring high-pressure hydrant landing valves, wet pipe sprinkler grids, and pump skids.',
    features: [
      'Main electric, diesel engine & jockey pump skids',
      'Quick-response glass bulb sprinkler heads (UL/FM)',
      'Heavy-duty ERW mild steel red enamel piping'
    ],
    image: '/case-studies/case-fire-hydrant.jpg',
    brochure: true
  },
  {
    num: '03',
    id: 3,
    slug: 'fire-rated-doors-shutters',
    title: 'Fire Rated Doors & Shutters',
    categoryBadge: 'Passive Containment',
    categoryFilters: ['All', 'Passive Containment', 'Life Safety', 'Heavy Duty'],
    description: 'Independently tested 120-minute and 240-minute fire containment doors and auto-descent motorized rolling shutters.',
    features: [
      'Certified 2-hour & 4-hour fire rating (IS 3614 / BS 476)',
      'High-density rockwool / ceramic wool insulation',
      'Gravity-drop fusible link & FACP auto-descent'
    ],
    image: '/services/service-fire-doors.jpg',
    brochure: true
  },
  {
    num: '04',
    id: 4,
    slug: 'public-address-system',
    title: 'Public Address & Voice Evacuation',
    categoryBadge: 'Emergency Alert',
    categoryFilters: ['All', 'Emergency Alert', 'Life Safety', 'Smart Controls'],
    description: 'Zoned emergency audio notification systems, voice alarm broadcast consoles, and industrial high-decibel siren towers.',
    features: [
      'Multi-zone voice evacuation with fire panel override',
      'High-clarity paging microphones & chime generators',
      'Constant-voltage 70V/100V distributed horn arrays'
    ],
    image: '/hero-security-command-center.jpg',
    brochure: true
  },
  {
    num: '05',
    id: 5,
    slug: 'gas-detection-systems',
    title: 'Gas Leak Detection Systems',
    categoryBadge: 'Hazard Prevention',
    categoryFilters: ['All', 'Hazard Prevention', 'Industrial Protection', 'Flameproof Ex-d'],
    description: 'Continuous gas monitoring transmitters for toxic, combustible LPG/CNG, VOC, and refrigerant leaks with automated exhaust trips.',
    features: [
      'Certified Flameproof (Ex-d Group IIA, IIB, IIC) sensor heads',
      'Pellistor, electrochemical & NDIR infrared sensors',
      'Direct relay interlocks for emergency exhaust blowers'
    ],
    image: '/case-studies/case-ss304-mist.jpg',
    brochure: true
  },
  {
    num: '06',
    id: 6,
    slug: 'door-interlock-systems',
    title: 'Emergency Auto Trip & Safety Interlocks',
    categoryBadge: 'Life Safety Interlock',
    categoryFilters: ['All', 'Life Safety Interlock', 'Life Safety', 'Smart Controls'],
    description: 'Fail-safe relay integration releasing access doors, tripping AHU dampers, activating fire pumps, and overriding airlocks upon fire alarm trigger.',
    features: [
      'Instant fail-safe electromagnetic lock release',
      'AHU ventilation smoke damper trip contacts',
      'Illuminated emergency break-glass & strobe beacon'
    ],
    image: '/services/service-emergency-trip.jpg',
    brochure: true
  }
];

const FIRE_FILTER_CATEGORIES = [
  'All',
  'Detection & Alarm',
  'Fire Suppression',
  'Passive Containment',
  'Emergency Alert',
  'Hazard Prevention',
  'Life Safety Interlock',
  'Life Safety',
  'Turnkey Arrays',
  'Industrial Protection',
  'Flameproof Ex-d',
  'Smart Controls',
  'Custom Solutions'
];

export default function CategoryPage({
  categoryKey,
  onNavigate,
  onQuickQuote
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [brochureToast, setBrochureToast] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const isAutomation = categoryKey?.toLowerCase() === 'automation';
  const isCleanroom = categoryKey?.toLowerCase() === 'cleanroom-interlocks' || categoryKey?.toLowerCase() === 'interlocks';
  const isPerimeter = categoryKey?.toLowerCase() === 'perimeter-defense' || categoryKey?.toLowerCase() === 'perimeter';
  const isFire = categoryKey?.toLowerCase() === 'fire-protection' || categoryKey?.toLowerCase() === 'fire' || categoryKey?.toLowerCase() === 'fire-safety';

  // Filter 14 Industrial Automation Services
  const filteredAutomationServices = useMemo(() => {
    return INDUSTRIAL_AUTOMATION_SERVICES.filter(service => {
      const matchSearch = (
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const matchFilter = (
        activeFilter === 'All' ||
        service.categoryFilters.includes(activeFilter) ||
        service.categoryBadge === activeFilter
      );
      return matchSearch && matchFilter;
    });
  }, [searchQuery, activeFilter]);

  // Filter 6 Cleanroom Interlocks & Pass Boxes Services
  const filteredCleanroomServices = useMemo(() => {
    return CLEANROOM_SERVICES.filter(service => {
      const matchSearch = (
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const matchFilter = (
        activeFilter === 'All' ||
        service.categoryFilters.includes(activeFilter) ||
        service.categoryBadge === activeFilter
      );
      return matchSearch && matchFilter;
    });
  }, [searchQuery, activeFilter]);

  // Filter 6 Perimeter Defense & Traffic Control Services
  const filteredPerimeterServices = useMemo(() => {
    return PERIMETER_SERVICES.filter(service => {
      const matchSearch = (
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const matchFilter = (
        activeFilter === 'All' ||
        service.categoryFilters.includes(activeFilter) ||
        service.categoryBadge === activeFilter
      );
      return matchSearch && matchFilter;
    });
  }, [searchQuery, activeFilter]);

  // Filter 6 Fire Protection & Life Safety Services
  const filteredFireServices = useMemo(() => {
    return FIRE_SERVICES.filter(service => {
      const matchSearch = (
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryBadge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const matchFilter = (
        activeFilter === 'All' ||
        service.categoryFilters.includes(activeFilter) ||
        service.categoryBadge === activeFilter
      );
      return matchSearch && matchFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleBrochureDownload = (service) => {
    setBrochureToast(`Technical engineering brochure for "${service.title}" has been downloaded.`);
    setTimeout(() => setBrochureToast(null), 3500);
  };

  // Category metadata configurations with rich content for non-automation categories
  const categoryMeta = useMemo(() => {
    switch (categoryKey?.toLowerCase()) {
      case 'automation':
        return {
          title: 'Industrial Access Automation & Perimeter Defense',
          categoryName: 'Automation',
          tagline: 'High-throughput motorized entrance doors, telescopic cantilever gates, rapid roll-up & loading bay logistics.',
          icon: Cpu,
          badgeColor: 'badge-blue',
          heroGradient: 'hero-gradient-automation',
          stats: [
            { label: 'Turnkey Installations', value: '450+' },
            { label: 'Continuous Duty Motors', value: '100%' },
            { label: 'Gate Width Span', value: 'Up to 25m' },
            { label: 'Certifications', value: 'CE / EN 16005' }
          ],
          overviewText: 'HTI Automation delivers heavy-duty, high-frequency motorized entrance systems engineered to withstand continuous commercial and industrial traffic. Our access automation systems incorporate brushless DC drives, obstacle auto-reverse sensors, hydraulic power units, and intelligent microprocessor controls. From sterile pharmaceutical cleanroom airlocks to 3000 kg industrial factory gates, our turnkey engineering ensures zero downtime and complete statutory safety compliance.',
          sectors: ['Manufacturing Facilities', 'Corporate & IT Parks', 'Logistics & Warehouses', 'Pharma & Healthcare', 'Infrastructure & Airports'],
          faqs: [
            {
              q: 'Can automatic sliding doors and gates operate during a complete power failure?',
              a: 'Yes. All HTI automatic pedestrian doors are equipped with a built-in intelligent battery backup system that ensures fail-safe opening or normal cycle operation for up to 200 opening cycles during power loss. Industrial sliding and swing gates feature a personalized mechanical clutch release key allowing smooth manual operation.'
            },
            {
              q: 'What is the maximum width supported for telescopic and cantilever sliding gates?',
              a: 'Our telescopic sliding gates support clear spans up to 25 meters by synchronizing multiple overlapping leaves. Cantilever gates operate without any ground track, floating completely above driveways up to 18 meters wide, ideal for sloped, uneven, or debris-prone sites.'
            },
            {
              q: 'Are high-speed PVC roll-up doors suitable for pharmaceutical cleanroom airlocks?',
              a: 'Absolutely. HTI rapid roll-up doors operate at speeds up to 1.5 m/sec, drastically reducing air exchange time between rooms. They feature airtight zipper side tracks, self-repairing curtains after accidental impact, and smooth non-porous surfaces compliant with GMP norms.'
            },
            {
              q: 'What is the duty cycle rating of HTI boom barriers and dock levellers?',
              a: 'HTI boom barriers feature brushless DC motors rated for 100% continuous duty (exceeding 5 million cycles) without thermal shutdown. Our hydraulic dock levellers support dynamic forklift loads from 6,000 kg to 8,000 kg compliant with EN 1398.'
            }
          ]
        };
      case 'security-systems':
      case 'security':
        return {
          title: 'Comprehensive Security Systems & AI Surveillance',
          categoryName: 'Security System',
          tagline: '4K AI video surveillance, multi-spectral biometrics, life-safety fire alarms & server room monitoring.',
          icon: ShieldCheck,
          badgeColor: 'badge-purple',
          heroGradient: 'hero-gradient-security',
          stats: [
            { label: 'Cameras Deployed', value: '12,000+' },
            { label: 'Biometric Users Managed', value: '250,000+' },
            { label: 'Fire Alarm Loops', value: '1 to 8 Loops' },
            { label: 'Compliance', value: 'NBC 2016 / UL' }
          ],
          overviewText: 'HTI Security Systems Directorate provides end-to-end security architectures engineered for corporate real estate, pharmaceutical plants, and high-security infrastructure. We integrate ultra-HD 4K IP cameras with deep-learning AI analytics (perimeter intrusion, line crossing, facial recognition), touchless multi-factor biometric attendance terminals, addressable fire alarm networks conforming to NBC 2016 Part 4, and real-time IT server room environmental protection.',
          sectors: ['Corporate IT HQs & BFSI', 'Pharma API & Formulation', 'Data Centers & Server Rooms', 'Chemical Processing Units', 'Commercial Shopping Malls'],
          faqs: [
            {
              q: 'Do HTI CCTV surveillance systems include explosion-proof / flameproof cameras?',
              a: 'Yes. For pharmaceutical solvent storage, chemical synthesis, and hazardous areas, we supply ATEX and IECEx certified Flameproof (Ex-d Group IIA, IIB, IIC) camera housings in cast aluminum or stainless steel SS316.'
            },
            {
              q: 'How does the Fire Alarm System integrate with cleanroom door interlocks?',
              a: 'HTI addressable and conventional fire alarm panels feature potential-free relay contacts connected directly to our door interlocking controllers. Upon a confirmed smoke or heat detector trip, power to all electromagnetic door locks drops instantly to guarantee unhindered evacuation.'
            },
            {
              q: 'What parameters does the Server Room Environmental Monitoring system track?',
              a: 'The system continuously monitors ambient temperature, relative humidity (RH), fluid/water leaks under raised floors via sensor ropes, AC power failure, and smoke. It triggers instant automated SMS, email, SNMP traps, and hooter siren towers.'
            },
            {
              q: 'Are your biometric access systems compliant with USFDA 21 CFR Part 11?',
              a: 'Yes. Our software provides encrypted, immutable audit trails, time-stamped entry logs, role-based operator permissions, and export capabilities required for USFDA and WHO-GMP audit scrutiny.'
            }
          ]
        };
      case 'cleanroom-interlocks':
      case 'interlocks':
        return {
          title: 'Pharma Cleanroom Interlocks & Controlled Environments',
          categoryName: 'Cleanroom Interlocks',
          tagline: 'USFDA 21 CFR Part 11 compliant 2-12 door interlock logic, dynamic pass boxes & GPS synchronized clocks.',
          icon: Lock,
          badgeColor: 'badge-red',
          heroGradient: 'hero-gradient-cleanroom',
          stats: [
            { label: 'Pharma Blocks Protected', value: '180+' },
            { label: 'Doors per Controller', value: '2 to 12 Doors' },
            { label: 'Airlock Timing Delay', value: 'Calibrated AHU Sync' },
            { label: 'Safety Enclosure', value: 'Flameproof Ex-d' }
          ],
          overviewText: 'Sterile pharmaceutical manufacturing requires precise differential air pressure maintenance between adjacent airlocks and clean corridors. HTI is an acknowledged pioneer in cleanroom interlocking systems, supporting 2 to 12 doors electrically interlocked with intelligent priority sequencing. Complemented by static and dynamic pass boxes with UV-C sterilization, hermetically sealed chiller doors, and GPS satellite synchronized digital clocks, our solutions satisfy the most stringent USFDA, EU-GMP, and WHO audits.',
          sectors: ['Sterile Injectables & API', 'Biotechnology & Vaccine Labs', 'Microbiology & Quality Control', 'Hospital Surgical Theatres (OT)', 'Semiconductor Cleanrooms'],
          faqs: [
            {
              q: 'How does the programmable delay timer preserve cleanroom differential pressure?',
              a: 'When an airlock door is opened, pressure momentarily drops. Our controller introduces an engineered delay (typically 3 to 6 seconds) after door closure before releasing the lock on the adjoining door, allowing the AHU sufficient time to re-establish the differential pressure barrier (+15 to +30 Pascals).'
            },
            {
              q: 'What is the difference between Static and Dynamic Pass Boxes?',
              a: 'Static pass boxes are designed for material transfer between cleanrooms of identical air classification. Dynamic pass boxes are equipped with an internal motorized blower, mini-pleat HEPA filter (99.997% at 0.3μm), and Magnehelic pressure gauge, creating a clean vertical laminar shower during transfer.'
            },
            {
              q: 'Can the door interlock system be installed in flameproof solvent dispensing areas?',
              a: 'Yes. HTI manufactures certified Flameproof (Ex-d Group IIA, IIB) door stations with heavy cast aluminum enclosures and explosion-proof push buttons specifically designed for solvent storage, granulation, and fluid-bed drying blocks.'
            },
            {
              q: 'How do GPS synchronized digital clocks help during pharmaceutical audits?',
              a: 'By synchronizing all digital clocks across production blocks, QC testing labs, and packaging lines via GPS satellite, all batch manufacturing records (BMR) reflect identical, verifiable time stamps, satisfying USFDA 21 CFR Part 11 data integrity guidelines.'
            }
          ]
        };
      case 'perimeter-defense':
      case 'perimeter':
        return {
          title: 'Perimeter Defense & Traffic Control Systems',
          categoryName: 'Perimeter Defense',
          tagline: 'High-frequency boom barriers, crash-rated bollards, tyre killers, optical turnstiles & intelligent parking automation.',
          icon: ShieldCheck,
          badgeColor: 'badge-blue',
          heroGradient: 'hero-gradient-automation',
          stats: [
            { label: 'Barriers & Gates Installed', value: '320+' },
            { label: 'Continuous Duty Rating', value: '100% BLDC' },
            { label: 'Crash Resistance Standards', value: 'K4 / K12 / PAS 68' },
            { label: 'Throughput Capacity', value: '45 P/Min' }
          ],
          overviewText: 'HTI Perimeter Defense & Traffic Control Directorate delivers heavy-duty physical barriers and intelligent vehicle access solutions. From ultra-fast 1.5-second automated boom barriers and anti-terror crash-rated hydraulic bollards to biometric optical speed gates and automated multi-tier car parking lifts, our systems ensure rigorous boundary protection and frictionless transit flow across corporate IT parks, industrial complexes, toll plazas, and high-security government facilities.',
          sectors: ['Corporate IT Parks & Campuses', 'Industrial Complexes & Plants', 'Toll Plazas & Logistics Yards', 'Government & Defense Sites', 'Commercial Malls & Basements'],
          faqs: [
            {
              q: 'What makes HTI automatic boom barriers suitable for 24/7 continuous traffic?',
              a: 'Our boom barriers feature brushless DC (BLDC) motors and heavy-duty planetary gearboxes rated for 100% continuous duty (exceeding 5 million cycles) without thermal overload. They integrate auto-reversing safety loops and optical photocells for complete accident prevention.'
            },
            {
              q: 'Are HTI bollards and tyre killers crash-rated for high-security applications?',
              a: 'Yes. Our rising hydraulic bollards are available in K4, K8, and K12 crash ratings compliant with ASTM and PAS 68 standards, capable of stopping a 7.5-ton truck travelling up to 80 km/h. Tyre killers feature bidirectional hardened steel spikes designed to shred heavy vehicle tyres instantaneously.'
            },
            {
              q: 'How do optical turnstiles and flap barriers prevent tailgating?',
              a: 'HTI speed gates and optical turnstiles feature multi-beam infrared sensor matrices (6 to 12 pairs) along the passage corridor. The logic detects uncredentialed individuals attempting to follow an authorized user, triggers an audible warning alarm, and closes the acrylic wings.'
            },
            {
              q: 'Can the parking management system integrate with Indian FASTag RFID?',
              a: 'Yes. Our automated parking systems integrate long-range UHF RFID readers compatible with NPCI FASTag protocol, enabling seamless automated entry and exit without paper tickets or manual operator intervention.'
            }
          ]
        };
      case 'fire-protection':
      case 'fire':
      case 'fire-safety':
        return {
          title: 'Fire Protection & Life Safety Systems',
          categoryName: 'Fire Protection',
          tagline: 'Addressable fire alarm networks, turnkey hydrant & sprinkler arrays, certified fire doors & gas detection.',
          icon: Flame,
          badgeColor: 'badge-red',
          heroGradient: 'hero-gradient-cleanroom',
          stats: [
            { label: 'Turnkey Systems Deployed', value: '280+' },
            { label: 'Fire Rating Integrity', value: 'Up to 240 Min' },
            { label: 'Hydrant Working Pressure', value: '7 to 14 Bar' },
            { label: 'Compliance Standards', value: 'NBC 2016 / TAC' }
          ],
          overviewText: 'HTI Fire Protection & Life Safety Division delivers end-to-end turnkey fire protection infrastructure engineered in accordance with National Building Code (NBC 2016 Part 4) and CFO regulations. Our life-safety architecture encompasses micro-processed multi-loop addressable fire alarm panels, turnkey industrial fire hydrant pump skids, wet pipe automatic sprinkler grids, certified 120/240-minute fire containment doors, toxic and combustible gas leak transmitters, and integrated emergency audio voice evacuation systems.',
          sectors: ['Pharmaceutical & Chemical Plants', 'Commercial Towers & IT Parks', 'Industrial Warehouses & Logistics Hubs', 'Hospitals & Healthcare Facilities', 'Refineries & Hazardous Storage'],
          faqs: [
            {
              q: 'How does the Fire Alarm System integrate with cleanroom door interlocks and access doors?',
              a: 'All HTI addressable and conventional fire alarm panels feature certified potential-free dry relay trip contacts wired directly into door interlocking controllers and access control power supplies. Upon a verified detector or manual pull station trigger, power drops instantaneously to release all electromagnetic locks for unhindered emergency egress.'
            },
            {
              q: 'What statutory standards do HTI Fire Hydrant and Sprinkler systems conform to?',
              a: 'Our installations strictly comply with the National Building Code of India (NBC 2016), Tariff Advisory Committee (TAC) guidelines, and local Chief Fire Officer (CFO) statutory mandates, utilizing UL/FM approved sprinkler heads and heavy-class ISI certified piping.'
            },
            {
              q: 'What is the fire resistance rating of HTI Fire Doors and Shutters?',
              a: 'Our hollow metal fire doors and motorized fire shutters are independently tested and certified for 60, 120, and 240 minutes fire integrity in accordance with IS 3614 and BS 476 Part 20/22. They feature intumescent perimeter seals that expand under heat to block smoke infiltration.'
            },
            {
              q: 'Can the gas detection system trigger ventilation blowers automatically?',
              a: 'Yes. HTI gas transmitters feature configurable dual alarm setpoints (Warning at 20% LEL, Danger at 40% LEL). When gas thresholds are breached, onboard SPDT relays immediately trip industrial exhaust blowers, sound warning horns, and shut off fuel solenoid valves.'
            }
          ]
        };
      case 'hygiene':
      case 'hygiene solutions':
      default:
        return {
          title: 'Hygiene Solutions & Touchless Washroom Systems',
          categoryName: 'Hygiene',
          tagline: 'Touch-free sensor taps, high-velocity hand dryers, aerodynamic air curtains & Grade A+ PVC strip doors.',
          icon: Layers,
          badgeColor: 'badge-green',
          heroGradient: 'hero-gradient-hygiene',
          stats: [
            { label: 'Water Conservation', value: 'Up to 70%' },
            { label: 'Hand Dry Velocity', value: '90 m/sec' },
            { label: 'PVC Optical Clarity', value: '99.2%' },
            { label: 'Air Barrier Efficiency', value: 'Class A Laminar' }
          ],
          overviewText: 'Modern commercial restrooms and pharmaceutical gowning rooms demand pristine touchless hygiene to eliminate cross-contamination and minimize utility wastage. HTI provides commercial-grade sensor taps forged from solid-cast brass, high-speed dual-blower hand dryers with Thermal Overload Protection, dual-flush urinal sensor valves, precision thermo-zone air curtains, and Grade A+ UV-stabilized PVC strip curtains.',
          sectors: ['Corporate Campuses & Restrooms', 'Pharmaceutical Staff Airlocks', 'Food Processing & Dairies', 'Airports & Metro Restrooms', 'Five-Star Hospitality Suites'],
          faqs: [
            {
              q: 'How much water do HTI automatic sensor taps save compared to manual faucets?',
              a: 'HTI sensor taps cut water consumption by 50% to 70%. Because water flows strictly when hands are detected within the 10-18 cm infrared sensing zone, there is zero waste during soap lathering or brush scrubbing. Built-in auto-cutoff stops overflow after 60 seconds.'
            },
            {
              q: 'What is the drying speed and energy efficiency of HTI high-speed hand dryers?',
              a: 'Our high-velocity dual-blower hand dryers produce a 90 m/sec air curtain that dries hands thoroughly in 8 to 12 seconds. By cutting dry time significantly and switching heating elements based on ambient temperature, energy usage is reduced by up to 80% compared to conventional dryers.'
            },
            {
              q: 'How do industrial air curtains block insects and save air conditioning energy?',
              a: 'HTI air curtains use dynamically balanced centrifugal blowers and Thermo-Zone aerodynamic discharge nozzles to create an invisible, high-velocity laminar air barrier. This invisible barrier prevents chilled indoor air from escaping and stops flying insects, dust, and fumes from entering.'
            },
            {
              q: 'Are HTI PVC strip curtains resistant to chemical vapors and yellowing?',
              a: 'Yes. Our Grade A+ 3mm PVC strip curtains are formulated with UV stabilizers that prevent brittleness, yellowing, and optical clouding over years of usage. They offer exceptional chemical resistance to acids, alkalies, and alcohols with 99.2% transparency.'
            }
          ]
        };
    }
  }, [categoryKey]);

  // Fetch all products matching category (for other categories)
  const allCategoryProducts = useMemo(() => {
    return getProductsByCategory(categoryMeta.categoryName);
  }, [categoryMeta]);

  // Extract unique subcategories
  const subcategories = useMemo(() => {
    const set = new Set();
    allCategoryProducts.forEach(p => {
      if (p.subcategory) set.add(p.subcategory);
    });
    return ['All', ...Array.from(set)];
  }, [allCategoryProducts]);

  // Filter products by search and subcategory (for other categories)
  const filteredProducts = useMemo(() => {
    return allCategoryProducts.filter(p => {
      const matchSearch = (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.workSummary && p.workSummary.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const matchSubcat = selectedSubcat === 'All' || p.subcategory === selectedSubcat;
      return matchSearch && matchSubcat;
    });
  }, [allCategoryProducts, searchQuery, selectedSubcat]);

  const IconComponent = categoryMeta.icon;

  const toggleFaq = (idx) => {
    setActiveFaq(prev => prev === idx ? null : idx);
  };

  // =========================================================================
  // DEDICATED REFERENCE-ACCURATE INDUSTRIAL ACCESS AUTOMATION SERVICE PAGE
  // =========================================================================
  if (isAutomation) {
    return (
      <div className="auto-service-page">
        {/* Toast Feedback for Brochure Downloads */}
        {brochureToast && (
          <div className="auto-toast-notice">
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
            <span>{brochureToast}</span>
          </div>
        )}

        {/* Video Solutions Modal */}
        {videoModalOpen && (
          <div className="auto-video-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
            <div className="auto-video-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="auto-modal-header">
                <h3 className="auto-modal-title">HTI Industrial Access Solutions Overview</h3>
                <button className="auto-modal-close" onClick={() => setVideoModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="auto-modal-body">
                <img
                  src="/services/services-hero-access.jpg"
                  alt="Industrial Access Overview"
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  HTI executes high-throughput motorized entrance barriers, cantilever gate automation, telescopic systems, and rapid roll-up doors engineered for Indian climatic extremes and heavy-cycle traffic.
                </p>
                <div className="flex justify-end gap-3">
                  <button className="btn btn-secondary btn-sm" onClick={() => setVideoModalOpen(false)}>
                    Close
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => { setVideoModalOpen(false); onNavigate('contact'); }}>
                    Request Site Survey
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="auto-page-container">
          {/* 1. BREADCRUMBS BAR */}
          <div className="auto-breadcrumb-nav">
            <button className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Services</span>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-current">Industrial Access Automation</span>
          </div>

          {/* 2. HERO SECTION */}
          <section className="auto-hero-section">
            <div className="auto-hero-grid">
              {/* Left Column: Heading, Description, Stat Cards */}
              <div className="auto-hero-left">
                <div className="auto-hero-pill-badge">
                  <span className="auto-pulse-dot"></span>
                  <span>INDUSTRIAL ACCESS AUTOMATION</span>
                </div>

                <h1 className="auto-hero-title">
                  Industrial Access Automation <br />
                  <span className="text-blue-accent">&amp; Perimeter Defense</span>
                </h1>

                <p className="auto-hero-desc">
                  High-throughput motorized entrance doors, telescopic cantilever gates, rapid roll-up &amp; loading bay logistics solutions for industrial, commercial and infrastructure facilities.
                </p>

                {/* Four Compact Statistic Cards */}
                <div className="auto-hero-stats-grid">
                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Cpu size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">450+</div>
                      <div className="auto-stat-lbl">Projects Installed</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">100%</div>
                      <div className="auto-stat-lbl">Customized Solutions</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <SlidersHorizontal size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">Up to 25m</div>
                      <div className="auto-stat-lbl">Wide Gate Span</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Award size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">CE / EN 16005</div>
                      <div className="auto-stat-lbl">Compliant Systems</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Facility Image with Play Button */}
              <div className="auto-hero-right">
                <div className="auto-hero-media-wrapper">
                  <img
                    src="/services/services-hero-access.jpg"
                    alt="Industrial Facility Entrance Automation"
                    className="auto-hero-image"
                    loading="eager"
                  />
                  <button
                    className="auto-watch-video-btn"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <div className="auto-play-icon-circle">
                      <Play size={12} fill="#1d4ed8" />
                    </div>
                    <span>Watch Our Solutions</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. ENGINEERING INTRODUCTION SECTION */}
          <section className="auto-engineering-section">
            <div className="auto-engineering-card">
              <div className="auto-arch-header-row">
                <div className="auto-arch-badge-blue">
                  <span className="auto-subtle-dot"></span>
                  <span>COMPLETE ACCESS ARCHITECTURE</span>
                </div>
                <div className="auto-arch-badge-red">
                  <Wrench size={13} />
                  <span>End-to-End Support &amp; Customization</span>
                </div>
              </div>

              <h2 className="auto-arch-heading">
                Comprehensive Engineering &amp; Execution for Automation
              </h2>

              <p className="auto-arch-desc">
                HTI Automation delivers heavy-duty, high-throughput entrance automation systems engineered to withstand continuous commercial and industrial traffic. Our solutions combine smart motors, robust mechanical design, and advanced safety features to ensure reliable, secure, and efficient access for manufacturing plants, warehouses, logistics hubs, pharma facilities and corporate campuses.
              </p>

              {/* Five Application Chips */}
              <div className="auto-app-chips-row">
                <div className="auto-app-chip">
                  <Factory size={15} className="chip-icon" />
                  <span>Manufacturing Facilities</span>
                </div>
                <div className="auto-app-chip">
                  <Building2 size={15} className="chip-icon" />
                  <span>Corporate &amp; IT Parks</span>
                </div>
                <div className="auto-app-chip">
                  <Truck size={15} className="chip-icon" />
                  <span>Logistics &amp; Warehouses</span>
                </div>
                <div className="auto-app-chip">
                  <Layers size={15} className="chip-icon" />
                  <span>Pharma &amp; Healthcare</span>
                </div>
                <div className="auto-app-chip">
                  <Plane size={15} className="chip-icon" />
                  <span>Infrastructure &amp; Airports</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SEARCH AND FILTER SECTION */}
          <section className="auto-controls-section">
            <div className="auto-search-bar-row">
              <div className="auto-search-input-wrap">
                <Search size={17} className="auto-search-icon" />
                <input
                  type="text"
                  placeholder="Search services, solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="auto-search-field"
                />
                {searchQuery && (
                  <button className="auto-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              <div className="auto-results-count">
                <span>{filteredAutomationServices.length} services found</span>
              </div>
            </div>

            {/* Filter Chips by Application */}
            <div className="auto-filters-container">
              <div className="auto-filter-label">FILTER BY APPLICATION</div>
              <div className="auto-filter-chips-list">
                {FILTER_CATEGORIES.map((filter) => (
                  <button
                    key={filter}
                    className={`auto-filter-chip ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 5. 14 SERVICE CARDS & CUSTOM CTA */}
          <section className="auto-services-grid-section">
            {filteredAutomationServices.length === 0 ? (
              <div className="auto-empty-state">
                <Search size={36} className="text-slate-400 mb-2" />
                <h3>No services matching "{searchQuery}"</h3>
                <p>Try searching for doors, gates, roll-up, barriers, or clear filters.</p>
                <button
                  className="btn btn-secondary btn-sm mt-3"
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="auto-services-grid">
                {filteredAutomationServices.map((service) => (
                  <div key={service.num} className="auto-service-card">
                    {/* Card Media with Number and Category Badges */}
                    <div className="auto-card-media">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="auto-card-img"
                        loading="lazy"
                      />
                      <div className="auto-card-num-badge">
                        {service.num}
                      </div>
                      <div className="auto-card-cat-pill">
                        {service.categoryBadge}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="auto-card-body">
                      <h3 className="auto-card-title">{service.title}</h3>
                      <p className="auto-card-description">{service.description}</p>

                      {/* 3 Concise Feature Bullets */}
                      <ul className="auto-card-features">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="auto-feature-bullet">
                            <span className="auto-bullet-icon">
                              <Check size={11} strokeWidth={2.5} />
                            </span>
                            <span className="auto-bullet-text">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Button */}
                      <div className="auto-card-btn-row">
                        <button
                          className="auto-btn-view-details"
                          onClick={() => {
                            onNavigate('product', service.slug);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </button>

                        <button
                          className="auto-btn-brochure"
                          onClick={() => handleBrochureDownload(service)}
                          title={`Download ${service.title} Brochure`}
                        >
                          <Download size={13} />
                          <span>Brochure</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 15. CUSTOM SOLUTION CTA CARD (Completes the 4-column grid alongside cards 13 & 14) */}
                {(!searchQuery && (activeFilter === 'All' || activeFilter === 'Custom Solutions')) && (
                  <div className="auto-custom-cta-card">
                    <div className="auto-cta-inner">
                      <div className="auto-cta-left">
                        <div className="auto-cta-icon-box">
                          <Cpu size={22} className="text-blue-600" />
                        </div>

                        <h3 className="auto-cta-heading">Need a Custom Solution?</h3>
                        <p className="auto-cta-desc">
                          Our engineering team can design a tailored access automation solution for your facility.
                        </p>

                        <ul className="auto-cta-checklist">
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Site survey &amp; consultation</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Custom design &amp; manufacturing</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Installation &amp; commissioning</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>After-sales support</span>
                          </li>
                        </ul>

                        <button
                          className="auto-cta-btn"
                          onClick={() => {
                            onNavigate('contact');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>Contact Our Engineers</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="auto-cta-right-media">
                        <img
                          src="/services/services-hero-access.jpg"
                          alt="HTI Industrial Facility Automation"
                          className="auto-cta-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // DEDICATED CLEANROOM INTERLOCKS & PASS BOXES SERVICE PAGE
  // =========================================================================
  if (isCleanroom) {
    return (
      <div className="auto-service-page cleanroom-service-page">
        {/* Toast Notification */}
        {brochureToast && (
          <div className="auto-toast-notification">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>{brochureToast}</span>
          </div>
        )}

        {/* Video / Solutions Modal */}
        {videoModalOpen && (
          <div className="auto-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
            <div className="auto-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="auto-modal-header">
                <h3>Cleanroom Interlock &amp; Pass Box Solutions</h3>
                <button className="auto-modal-close" onClick={() => setVideoModalOpen(false)}>✕</button>
              </div>
              <div className="auto-modal-body">
                <img
                  src="/hero-cleanroom-interlock-chamber.jpg"
                  alt="Cleanroom Interlocks &amp; Pass Boxes Overview"
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  HTI executes USFDA 21 CFR Part 11 compliant 2 to 12 door interlocking logic, dynamic pass boxes with UV-C disinfection, and GPS master-slave clocks engineered for sterile pharma cleanrooms, OT suites, and containment labs.
                </p>
                <div className="flex justify-end gap-3">
                  <button className="btn btn-secondary btn-sm" onClick={() => setVideoModalOpen(false)}>
                    Close
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => { setVideoModalOpen(false); onNavigate('contact'); }}>
                    Consult Cleanroom Engineers
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="auto-page-container">
          {/* 1. BREADCRUMBS BAR */}
          <div className="auto-breadcrumb-nav">
            <button className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Services</span>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-current">Cleanroom Interlocks &amp; Pass Boxes</span>
          </div>

          {/* 2. HERO SECTION */}
          <section className="auto-hero-section">
            <div className="auto-hero-grid">
              {/* Left Column: Heading, Description, Stat Cards */}
              <div className="auto-hero-left">
                <div className="auto-hero-pill-badge">
                  <span className="auto-pulse-dot"></span>
                  <span>CLEANROOM INTERLOCKS &amp; PASS BOXES</span>
                </div>

                <h1 className="auto-hero-title">
                  Cleanroom Interlocks <br />
                  <span className="text-blue-accent">&amp; Pass Boxes</span>
                </h1>

                <p className="auto-hero-desc">
                  Advanced cleanroom access control, differential pressure preservation, and controlled material transfer systems engineered for pharmaceutical, healthcare, and containment environments.
                </p>

                {/* Four Compact Statistic Cards */}
                <div className="auto-hero-stats-grid">
                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">180+</div>
                      <div className="auto-stat-lbl">Pharma Blocks Protected</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Lock size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">2 to 12</div>
                      <div className="auto-stat-lbl">Doors per Controller</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <SlidersHorizontal size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">Micro-Sec</div>
                      <div className="auto-stat-lbl">Airlock Priority Logic</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Award size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">Ex-d / Safe</div>
                      <div className="auto-stat-lbl">Flameproof Options</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Facility Image with Play Button */}
              <div className="auto-hero-right">
                <div className="auto-hero-media-wrapper">
                  <img
                    src="/hero-cleanroom-interlock-chamber.jpg"
                    alt="Pharma Cleanroom Interlock Chamber"
                    className="auto-hero-image"
                    loading="eager"
                  />
                  <button
                    className="auto-watch-video-btn"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <div className="auto-play-icon-circle">
                      <Play size={12} fill="#1d4ed8" />
                    </div>
                    <span>Watch Cleanroom Demo</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. ENGINEERING INTRODUCTION SECTION */}
          <section className="auto-engineering-section">
            <div className="auto-engineering-card">
              <div className="auto-arch-header-row">
                <div className="auto-arch-badge-blue">
                  <span className="auto-subtle-dot"></span>
                  <span>PHARMA AIRLOCK ARCHITECTURE</span>
                </div>
                <div className="auto-arch-badge-red">
                  <Wrench size={13} />
                  <span>USFDA &amp; EU-GMP Validation Ready</span>
                </div>
              </div>

              <h2 className="auto-arch-heading">
                Comprehensive Engineering &amp; Execution for Cleanroom Airlocks
              </h2>

              <p className="auto-arch-desc">
                HTI specializes in cleanroom door interlocking systems, dynamic and static pass boxes, and precision environment controls engineered for sterile pharmaceutical manufacturing, biotechnology labs, and healthcare suites. Our multi-door controllers regulate differential air pressures, prevent particulate cross-contamination, and ensure full statutory audit compliance.
              </p>

              {/* Five Application Chips */}
              <div className="auto-app-chips-row">
                <div className="auto-app-chip">
                  <Factory size={15} className="chip-icon" />
                  <span>Sterile Injectables &amp; API</span>
                </div>
                <div className="auto-app-chip">
                  <Layers size={15} className="chip-icon" />
                  <span>Biotechnology &amp; Vaccines</span>
                </div>
                <div className="auto-app-chip">
                  <Building2 size={15} className="chip-icon" />
                  <span>Hospital Surgical OTs</span>
                </div>
                <div className="auto-app-chip">
                  <ShieldCheck size={15} className="chip-icon" />
                  <span>Microbiology &amp; QC Testing</span>
                </div>
                <div className="auto-app-chip">
                  <Cpu size={15} className="chip-icon" />
                  <span>Semiconductor Cleanrooms</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SEARCH AND FILTER SECTION */}
          <section className="auto-controls-section">
            <div className="auto-search-bar-row">
              <div className="auto-search-input-wrap">
                <Search size={17} className="auto-search-icon" />
                <input
                  type="text"
                  placeholder="Search cleanroom services, solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="auto-search-field"
                />
                {searchQuery && (
                  <button className="auto-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              <div className="auto-results-count">
                <span>{filteredCleanroomServices.length} services found</span>
              </div>
            </div>

            {/* Filter Chips by Application */}
            <div className="auto-filters-container">
              <div className="auto-filter-label">FILTER BY APPLICATION</div>
              <div className="auto-filter-chips-list">
                {CLEANROOM_FILTER_CATEGORIES.map((filter) => (
                  <button
                    key={filter}
                    className={`auto-filter-chip ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 5. 6 SERVICE CARDS & CUSTOM CLEANROOM CTA */}
          <section className="auto-services-grid-section">
            {filteredCleanroomServices.length === 0 ? (
              <div className="auto-empty-state">
                <Search size={36} className="text-slate-400 mb-2" />
                <h3>No cleanroom services matching "{searchQuery}"</h3>
                <p>Try searching for interlocks, pass box, clocks, doors, or reset filters.</p>
                <button
                  className="btn btn-secondary btn-sm mt-3"
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="auto-services-grid">
                {filteredCleanroomServices.map((service) => (
                  <div key={service.num} className="auto-service-card">
                    {/* Card Media with Number and Category Badges */}
                    <div className="auto-card-media">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="auto-card-img"
                        loading="lazy"
                      />
                      <div className="auto-card-num-badge">
                        {service.num}
                      </div>
                      <div className="auto-card-cat-pill">
                        {service.categoryBadge}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="auto-card-body">
                      <h3 className="auto-card-title">{service.title}</h3>
                      <p className="auto-card-description">{service.description}</p>

                      {/* 3 Concise Feature Bullets */}
                      <ul className="auto-card-features">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="auto-feature-bullet">
                            <span className="auto-bullet-icon">
                              <Check size={11} strokeWidth={2.5} />
                            </span>
                            <span className="auto-bullet-text">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Button */}
                      <div className="auto-card-btn-row">
                        <button
                          className="auto-btn-view-details"
                          onClick={() => {
                            if (service.slug) {
                              onNavigate('product', service.slug);
                            } else {
                              onNavigate('contact');
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </button>

                        <button
                          className="auto-btn-brochure"
                          onClick={() => handleBrochureDownload(service)}
                          title={`Download ${service.title} Brochure`}
                        >
                          <Download size={13} />
                          <span>Brochure</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CUSTOM CLEANROOM SOLUTION CTA CARD */}
                {(!searchQuery && (activeFilter === 'All' || activeFilter === 'Airlock Control' || activeFilter === 'Pressure Containment')) && (
                  <div className="auto-custom-cta-card">
                    <div className="auto-cta-inner">
                      <div className="auto-cta-left">
                        <div className="auto-cta-icon-box">
                          <Lock size={22} className="text-blue-600" />
                        </div>

                        <h3 className="auto-cta-heading">Need Custom Cleanroom Airlock Logic?</h3>
                        <p className="auto-cta-desc">
                          Our cleanroom automation specialists design tailored multi-door interlocking sequences, pass boxes, and flameproof stations for your facility.
                        </p>

                        <ul className="auto-cta-checklist">
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Cleanroom layout review</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Custom interlock logic programming</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>DQ, IQ &amp; OQ documentation</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>On-site commissioning</span>
                          </li>
                        </ul>

                        <button
                          className="auto-cta-btn"
                          onClick={() => {
                            onNavigate('contact');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>Consult Cleanroom Engineers</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="auto-cta-right-media">
                        <img
                          src="/hero-cleanroom-automation.jpg"
                          alt="HTI Cleanroom Automation &amp; Interlocks"
                          className="auto-cta-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // DEDICATED PERIMETER DEFENSE & TRAFFIC CONTROL SERVICE PAGE
  // =========================================================================
  if (isPerimeter) {
    return (
      <div className="auto-service-page perimeter-service-page">
        {/* Toast Feedback for Brochure Downloads */}
        {brochureToast && (
          <div className="auto-toast-notice">
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
            <span>{brochureToast}</span>
          </div>
        )}

        {/* Video Solutions Modal */}
        {videoModalOpen && (
          <div className="auto-video-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
            <div className="auto-video-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="auto-modal-header">
                <h3 className="auto-modal-title">HTI Perimeter Defense &amp; Traffic Control Overview</h3>
                <button className="auto-modal-close" onClick={() => setVideoModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="auto-modal-body">
                <img
                  src="/case-studies/case-boom-barrier.jpg"
                  alt="Perimeter Defense &amp; Traffic Control Overview"
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  HTI executes high-throughput electromechanical boom barriers, crash-rated bollards, tyre killers, optical turnstiles, and automated multi-level parking systems engineered for continuous duty and hostile vehicle mitigation.
                </p>
                <div className="flex justify-end gap-3">
                  <button className="btn btn-secondary btn-sm" onClick={() => setVideoModalOpen(false)}>
                    Close
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => { setVideoModalOpen(false); onNavigate('contact'); }}>
                    Request Perimeter Survey
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="auto-page-container">
          {/* 1. BREADCRUMBS BAR */}
          <div className="auto-breadcrumb-nav">
            <button className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Services</span>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-current">Perimeter Defense &amp; Traffic Control</span>
          </div>

          {/* 2. HERO SECTION */}
          <section className="auto-hero-section">
            <div className="auto-hero-grid">
              {/* Left Column: Heading, Description, Stat Cards */}
              <div className="auto-hero-left">
                <div className="auto-hero-pill-badge">
                  <span className="auto-pulse-dot"></span>
                  <span>PERIMETER DEFENSE &amp; TRAFFIC CONTROL</span>
                </div>

                <h1 className="auto-hero-title">
                  Perimeter Defense <br />
                  <span className="text-blue-accent">&amp; Traffic Control</span>
                </h1>

                <p className="auto-hero-desc">
                  High-frequency boom barriers, crash-rated anti-ram bollards, tyre killers, optical turnstiles &amp; multi-level car lift systems engineered for secure and efficient facility access.
                </p>

                {/* Four Compact Statistic Cards */}
                <div className="auto-hero-stats-grid">
                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">320+</div>
                      <div className="auto-stat-lbl">Barriers &amp; Gates Installed</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Cpu size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">100% BLDC</div>
                      <div className="auto-stat-lbl">Continuous Duty Motors</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Award size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">K4 / K12</div>
                      <div className="auto-stat-lbl">Crash Rated Standards</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <SlidersHorizontal size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">45 P/Min</div>
                      <div className="auto-stat-lbl">Pedestrian Throughput</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Facility Image with Play Button */}
              <div className="auto-hero-right">
                <div className="auto-hero-media-wrapper">
                  <img
                    src="/case-studies/case-boom-barrier.jpg"
                    alt="Perimeter Defense &amp; Traffic Control Infrastructure"
                    className="auto-hero-image"
                    loading="eager"
                  />
                  <button
                    className="auto-watch-video-btn"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <div className="auto-play-icon-circle">
                      <Play size={12} fill="#1d4ed8" />
                    </div>
                    <span>Watch Perimeter Demo</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. ENGINEERING INTRODUCTION SECTION */}
          <section className="auto-engineering-section">
            <div className="auto-engineering-card">
              <div className="auto-arch-header-row">
                <div className="auto-arch-badge-blue">
                  <span className="auto-subtle-dot"></span>
                  <span>PERIMETER &amp; TRAFFIC ARCHITECTURE</span>
                </div>
                <div className="auto-arch-badge-red">
                  <Wrench size={13} />
                  <span>Turnkey Physical Security Engineering</span>
                </div>
              </div>

              <h2 className="auto-arch-heading">
                Comprehensive Engineering &amp; Execution for Perimeter Defense
              </h2>

              <p className="auto-arch-desc">
                HTI Perimeter Defense &amp; Traffic Control Directorate delivers heavy-duty physical barriers and intelligent vehicle access solutions. From ultra-fast 1.5-second automated boom barriers and anti-terror crash-rated hydraulic bollards to biometric optical speed gates and automated multi-tier car parking lifts, our systems ensure rigorous boundary protection and frictionless transit flow across corporate IT parks, industrial complexes, toll plazas, and high-security government facilities.
              </p>

              {/* Five Application Chips */}
              <div className="auto-app-chips-row">
                <div className="auto-app-chip">
                  <Building2 size={15} className="chip-icon" />
                  <span>Corporate IT Parks &amp; Campuses</span>
                </div>
                <div className="auto-app-chip">
                  <Factory size={15} className="chip-icon" />
                  <span>Industrial Complexes &amp; Plants</span>
                </div>
                <div className="auto-app-chip">
                  <Truck size={15} className="chip-icon" />
                  <span>Toll Plazas &amp; Logistics Yards</span>
                </div>
                <div className="auto-app-chip">
                  <ShieldCheck size={15} className="chip-icon" />
                  <span>Government &amp; Defense Sites</span>
                </div>
                <div className="auto-app-chip">
                  <Layers size={15} className="chip-icon" />
                  <span>Commercial Malls &amp; Basements</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SEARCH AND FILTER SECTION */}
          <section className="auto-controls-section">
            <div className="auto-search-bar-row">
              <div className="auto-search-input-wrap">
                <Search size={17} className="auto-search-icon" />
                <input
                  type="text"
                  placeholder="Search perimeter services, solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="auto-search-field"
                />
                {searchQuery && (
                  <button className="auto-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              <div className="auto-results-count">
                <span>{filteredPerimeterServices.length} services found</span>
              </div>
            </div>

            {/* Filter Chips by Application */}
            <div className="auto-filters-container">
              <div className="auto-filter-label">FILTER BY APPLICATION</div>
              <div className="auto-filter-chips-list">
                {PERIMETER_FILTER_CATEGORIES.map((filter) => (
                  <button
                    key={filter}
                    className={`auto-filter-chip ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 5. 6 SERVICE CARDS & CUSTOM PERIMETER CTA */}
          <section className="auto-services-grid-section">
            {filteredPerimeterServices.length === 0 ? (
              <div className="auto-empty-state">
                <Search size={36} className="text-slate-400 mb-2" />
                <h3>No perimeter services matching "{searchQuery}"</h3>
                <p>Try searching for boom barriers, bollards, tyre killers, turnstiles, parking, or reset filters.</p>
                <button
                  className="btn btn-secondary btn-sm mt-3"
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="auto-services-grid">
                {filteredPerimeterServices.map((service) => (
                  <div key={service.num} className="auto-service-card">
                    {/* Card Media with Number and Category Badges */}
                    <div className="auto-card-media">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="auto-card-img"
                        loading="lazy"
                      />
                      <div className="auto-card-num-badge">
                        {service.num}
                      </div>
                      <div className="auto-card-cat-pill">
                        {service.categoryBadge}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="auto-card-body">
                      <h3 className="auto-card-title">{service.title}</h3>
                      <p className="auto-card-description">{service.description}</p>

                      {/* 3 Concise Feature Bullets */}
                      <ul className="auto-card-features">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="auto-feature-bullet">
                            <span className="auto-bullet-icon">
                              <Check size={11} strokeWidth={2.5} />
                            </span>
                            <span className="auto-bullet-text">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Buttons */}
                      <div className="auto-card-btn-row">
                        <button
                          className="auto-btn-view-details"
                          onClick={() => {
                            if (service.slug) {
                              onNavigate('product', service.slug);
                            } else {
                              onNavigate('contact');
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </button>

                        <button
                          className="auto-btn-brochure"
                          onClick={() => handleBrochureDownload(service)}
                          title={`Download ${service.title} Brochure`}
                        >
                          <Download size={13} />
                          <span>Brochure</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CUSTOM PERIMETER SOLUTION CTA CARD */}
                {(!searchQuery && (activeFilter === 'All' || activeFilter === 'Perimeter Defense' || activeFilter === 'Vehicle Access' || activeFilter === 'Custom Solutions')) && (
                  <div className="auto-custom-cta-card">
                    <div className="auto-cta-inner">
                      <div className="auto-cta-left">
                        <div className="auto-cta-icon-box">
                          <ShieldCheck size={22} className="text-blue-600" />
                        </div>

                        <h3 className="auto-cta-heading">Need Custom Perimeter Defense Architecture?</h3>
                        <p className="auto-cta-desc">
                          Our physical security and perimeter engineering team can design crash-rated defense arrays, automated bollards, and custom FASTag vehicle access for your campus.
                        </p>

                        <ul className="auto-cta-checklist">
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Perimeter threat &amp; traffic survey</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Crash-rated bollard &amp; barrier engineering</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Turnkey civil, electrical &amp; hydraulic works</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Comprehensive AMC &amp; maintenance support</span>
                          </li>
                        </ul>

                        <button
                          className="auto-cta-btn"
                          onClick={() => {
                            onNavigate('contact');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>Consult Perimeter Engineers</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="auto-cta-right-media">
                        <img
                          src="/case-studies/case-boom-barrier.jpg"
                          alt="HTI Perimeter Defense &amp; Traffic Control"
                          className="auto-cta-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // DEDICATED FIRE PROTECTION & LIFE SAFETY SERVICE PAGE
  // =========================================================================
  if (isFire) {
    return (
      <div className="auto-service-page fire-service-page">
        {/* Toast Feedback for Brochure Downloads */}
        {brochureToast && (
          <div className="auto-toast-notice">
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
            <span>{brochureToast}</span>
          </div>
        )}

        {/* Video Solutions Modal */}
        {videoModalOpen && (
          <div className="auto-video-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
            <div className="auto-video-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="auto-modal-header">
                <h3 className="auto-modal-title">HTI Fire Protection &amp; Life Safety Overview</h3>
                <button className="auto-modal-close" onClick={() => setVideoModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="auto-modal-body">
                <img
                  src="/case-studies/case-fire-hydrant.jpg"
                  alt="Fire Protection &amp; Life Safety Infrastructure"
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  HTI executes multi-loop addressable fire alarm networks, turnkey industrial fire hydrant pump stations, wet pipe sprinkler arrays, certified 120/240-minute fire doors, and toxic gas leak monitoring engineered to NBC 2016 Part 4.
                </p>
                <div className="flex justify-end gap-3">
                  <button className="btn btn-secondary btn-sm" onClick={() => setVideoModalOpen(false)}>
                    Close
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => { setVideoModalOpen(false); onNavigate('contact'); }}>
                    Request Fire Safety Audit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="auto-page-container">
          {/* 1. BREADCRUMBS BAR */}
          <div className="auto-breadcrumb-nav">
            <button className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-link" onClick={() => onNavigate('home')}>Services</span>
            <span className="auto-breadcrumb-sep">&gt;</span>
            <span className="auto-breadcrumb-current">Fire Protection &amp; Life Safety</span>
          </div>

          {/* 2. HERO SECTION */}
          <section className="auto-hero-section">
            <div className="auto-hero-grid">
              {/* Left Column: Heading, Description, Stat Cards */}
              <div className="auto-hero-left">
                <div className="auto-hero-pill-badge">
                  <span className="auto-pulse-dot"></span>
                  <span>FIRE PROTECTION &amp; LIFE SAFETY</span>
                </div>

                <h1 className="auto-hero-title">
                  Fire Protection <br />
                  <span className="text-blue-accent">&amp; Life Safety</span>
                </h1>

                <p className="auto-hero-desc">
                  Turnkey addressable fire detection networks, high-pressure hydrant &amp; sprinkler arrays, 120/240 min fire rated doors &amp; toxic gas monitoring engineered to NBC 2016 norms.
                </p>

                {/* Four Compact Statistic Cards */}
                <div className="auto-hero-stats-grid">
                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Flame size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">280+</div>
                      <div className="auto-stat-lbl">Turnkey Projects Deployed</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Award size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">Up to 240m</div>
                      <div className="auto-stat-lbl">Fire Rating Integrity</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <Activity size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">7-14 Bar</div>
                      <div className="auto-stat-lbl">Hydrant Working Pressure</div>
                    </div>
                  </div>

                  <div className="auto-stat-card">
                    <div className="auto-stat-icon-wrap">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="auto-stat-text">
                      <div className="auto-stat-val">NBC / TAC</div>
                      <div className="auto-stat-lbl">Statutory Compliance</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Facility Image with Play Button */}
              <div className="auto-hero-right">
                <div className="auto-hero-media-wrapper">
                  <img
                    src="/case-studies/case-fire-hydrant.jpg"
                    alt="Fire Protection &amp; Life Safety Infrastructure"
                    className="auto-hero-image"
                    loading="eager"
                  />
                  <button
                    className="auto-watch-video-btn"
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <div className="auto-play-icon-circle">
                      <Play size={12} fill="#1d4ed8" />
                    </div>
                    <span>Watch Fire Safety Demo</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. ENGINEERING INTRODUCTION SECTION */}
          <section className="auto-engineering-section">
            <div className="auto-engineering-card">
              <div className="auto-arch-header-row">
                <div className="auto-arch-badge-blue">
                  <span className="auto-subtle-dot"></span>
                  <span>FIRE SAFETY ARCHITECTURE</span>
                </div>
                <div className="auto-arch-badge-red">
                  <Wrench size={13} />
                  <span>Turnkey NBC 2016 &amp; TAC Compliance</span>
                </div>
              </div>

              <h2 className="auto-arch-heading">
                Comprehensive Engineering &amp; Execution for Fire Protection
              </h2>

              <p className="auto-arch-desc">
                HTI Fire Protection &amp; Life Safety Directorate delivers end-to-end turnkey fire protection infrastructure engineered in accordance with National Building Code (NBC 2016 Part 4) and CFO regulations. Our life-safety architecture encompasses micro-processed multi-loop addressable fire alarm panels, turnkey industrial fire hydrant pump skids, wet pipe automatic sprinkler grids, certified 120/240-minute fire containment doors, toxic and combustible gas leak transmitters, and integrated emergency audio voice evacuation systems.
              </p>

              {/* Five Application Chips */}
              <div className="auto-app-chips-row">
                <div className="auto-app-chip">
                  <Factory size={15} className="chip-icon" />
                  <span>Pharmaceutical &amp; Chemical Plants</span>
                </div>
                <div className="auto-app-chip">
                  <Building2 size={15} className="chip-icon" />
                  <span>Commercial Towers &amp; IT Parks</span>
                </div>
                <div className="auto-app-chip">
                  <Truck size={15} className="chip-icon" />
                  <span>Warehouses &amp; Logistics Hubs</span>
                </div>
                <div className="auto-app-chip">
                  <ShieldCheck size={15} className="chip-icon" />
                  <span>Hospitals &amp; Healthcare Facilities</span>
                </div>
                <div className="auto-app-chip">
                  <Layers size={15} className="chip-icon" />
                  <span>Refineries &amp; Hazardous Storage</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SEARCH AND FILTER SECTION */}
          <section className="auto-controls-section">
            <div className="auto-search-bar-row">
              <div className="auto-search-input-wrap">
                <Search size={17} className="auto-search-icon" />
                <input
                  type="text"
                  placeholder="Search fire protection services, solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="auto-search-field"
                />
                {searchQuery && (
                  <button className="auto-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              <div className="auto-results-count">
                <span>{filteredFireServices.length} services found</span>
              </div>
            </div>

            {/* Filter Chips by Application */}
            <div className="auto-filters-container">
              <div className="auto-filter-label">FILTER BY APPLICATION</div>
              <div className="auto-filter-chips-list">
                {FIRE_FILTER_CATEGORIES.map((filter) => (
                  <button
                    key={filter}
                    className={`auto-filter-chip ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 5. 6 SERVICE CARDS & CUSTOM FIRE SAFETY CTA */}
          <section className="auto-services-grid-section">
            {filteredFireServices.length === 0 ? (
              <div className="auto-empty-state">
                <Search size={36} className="text-slate-400 mb-2" />
                <h3>No fire safety services matching "{searchQuery}"</h3>
                <p>Try searching for fire alarms, hydrants, sprinklers, fire doors, gas detection, or reset filters.</p>
                <button
                  className="btn btn-secondary btn-sm mt-3"
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="auto-services-grid">
                {filteredFireServices.map((service) => (
                  <div key={service.num} className="auto-service-card">
                    {/* Card Media with Number and Category Badges */}
                    <div className="auto-card-media">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="auto-card-img"
                        loading="lazy"
                      />
                      <div className="auto-card-num-badge">
                        {service.num}
                      </div>
                      <div className="auto-card-cat-pill">
                        {service.categoryBadge}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="auto-card-body">
                      <h3 className="auto-card-title">{service.title}</h3>
                      <p className="auto-card-description">{service.description}</p>

                      {/* 3 Concise Feature Bullets */}
                      <ul className="auto-card-features">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="auto-feature-bullet">
                            <span className="auto-bullet-icon">
                              <Check size={11} strokeWidth={2.5} />
                            </span>
                            <span className="auto-bullet-text">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Buttons */}
                      <div className="auto-card-btn-row">
                        <button
                          className="auto-btn-view-details"
                          onClick={() => {
                            if (service.slug) {
                              onNavigate('product', service.slug);
                            } else {
                              onNavigate('contact');
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </button>

                        <button
                          className="auto-btn-brochure"
                          onClick={() => handleBrochureDownload(service)}
                          title={`Download ${service.title} Brochure`}
                        >
                          <Download size={13} />
                          <span>Brochure</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* CUSTOM FIRE SAFETY SOLUTION CTA CARD */}
                {(!searchQuery && (activeFilter === 'All' || activeFilter === 'Detection & Alarm' || activeFilter === 'Fire Suppression' || activeFilter === 'Turnkey Arrays' || activeFilter === 'Custom Solutions')) && (
                  <div className="auto-custom-cta-card">
                    <div className="auto-cta-inner">
                      <div className="auto-cta-left">
                        <div className="auto-cta-icon-box">
                          <Flame size={22} className="text-blue-600" />
                        </div>

                        <h3 className="auto-cta-heading">Need Turnkey Fire Protection Architecture?</h3>
                        <p className="auto-cta-desc">
                          Our certified fire engineers provide turnkey facility surveys, hydraulic calculations, FACP wiring diagrams, and statutory CFO compliance support.
                        </p>

                        <ul className="auto-cta-checklist">
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Site survey &amp; fire hazard risk assessment</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Hydraulic pipe sizing &amp; FACP loop design</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Turnkey mechanical, electrical &amp; civil execution</span>
                          </li>
                          <li>
                            <Check size={13} className="text-blue-600 flex-shrink-0" />
                            <span>Mandatory CFO sign-off &amp; annual maintenance</span>
                          </li>
                        </ul>

                        <button
                          className="auto-cta-btn"
                          onClick={() => {
                            onNavigate('contact');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <span>Consult Fire Engineers</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="auto-cta-right-media">
                        <img
                          src="/case-studies/case-fire-hydrant.jpg"
                          alt="HTI Turnkey Fire Hydrant &amp; Alarm Solutions"
                          className="auto-cta-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="category-dedicated-page">
      {/* 1. Breadcrumbs Bar */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button
              className="breadcrumb-link"
              onClick={() => onNavigate('home')}
            >
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <button
              className="breadcrumb-link"
              onClick={() => onNavigate('home', 'catalog')}
            >
              Products & Solutions
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{categoryMeta.categoryName}</span>
          </div>

          <button
            className="back-btn"
            onClick={() => onNavigate('home', 'catalog')}
          >
            <ArrowLeft size={15} />
            <span>Back to All Categories</span>
          </button>
        </div>
      </div>

      {/* 2. Category Hero Section (Light Gray Gradients & Dark Charcoal Typography) */}
      <div className={`category-hero ${categoryMeta.heroGradient}`}>
        <div className="container">
          <div className="category-hero-inner">
            <div className="category-hero-badge">
              <IconComponent size={16} />
              <span>OFFICIAL HTI PRODUCT DIVISION</span>
            </div>
            <h1 className="category-hero-title">{categoryMeta.title}</h1>
            <p className="category-hero-desc">{categoryMeta.tagline}</p>

            {/* Category Stats */}
            <div className="category-stats-grid">
              {categoryMeta.stats.map((st, idx) => (
                <div key={idx} className="category-stat-card">
                  <div className="stat-val">{st.value}</div>
                  <div className="stat-lbl">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Dive Engineering Overview */}
      <div className="category-overview-section section-sm">
        <div className="container">
          <div className="glass-card detail-card">
            <div className="card-top-row">
              <span className="cat-subcat-badge">DIVISION ARCHITECTURE & SCOPE</span>
              <span className="detail-highlight-badge">
                <ShieldCheck size={13} />
                Statutory Certified Engineering
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2 mb-3">
              Comprehensive Engineering & Execution for {categoryMeta.categoryName}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {categoryMeta.overviewText}
            </p>

            {/* Target Industry Sectors */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                Key Sector Applications:
              </span>
              <div className="applications-badge-grid">
                {categoryMeta.sectors.map((sec, sIdx) => (
                  <div key={sIdx} className="application-badge-item">
                    <Building2 size={15} className="text-sky-600" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Filter & Search Controls Bar */}
      <div className="category-controls-bar">
        <div className="container">
          <div className="controls-flex-row">
            {/* Search input */}
            <div className="category-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder={`Search within ${categoryMeta.categoryName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="category-search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Product Count */}
            <div className="category-count-badge">
              <span>Showing {filteredProducts.length} of {allCategoryProducts.length} Systems</span>
            </div>
          </div>

          {/* Subcategory Pills */}
          {subcategories.length > 2 && (
            <div className="subcategory-pills-row">
              <span className="pills-label">Filter by Discipline:</span>
              <div className="pills-scroll-wrapper">
                {subcategories.map((sub, idx) => (
                  <button
                    key={idx}
                    className={`subcat-pill-btn ${selectedSubcat === sub ? 'active-pill' : ''}`}
                    onClick={() => setSelectedSubcat(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Product Cards Grid */}
      <div className="category-products-grid-section section">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="empty-results-box glass-card text-center py-12">
              <Search size={40} className="text-slate-400 mb-3 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800">No products matching "{searchQuery}"</h3>
              <p className="text-slate-500 mt-2 mb-4">Try clearing your search term or selecting a different subcategory filter.</p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubcat('All');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="cat-products-cards-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="cat-product-card">
                  <div className="card-top-row">
                    <span className="cat-subcat-badge">{p.subcategory}</span>
                    {p.badge && (
                      <span className="cat-feature-badge">
                        <Sparkles size={11} />
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="cat-prod-title">{p.name}</h3>
                  <p className="cat-prod-tagline">{p.tagline}</p>

                  {p.workSummary && (
                    <div className="cat-work-summary">
                      <span className="summary-label">Work / Function:</span>
                      <p className="summary-text">{p.workSummary}</p>
                    </div>
                  )}

                  {/* Top Features */}
                  <div className="cat-card-features-list">
                    {p.features && p.features.slice(0, 3).map((f, fIdx) => (
                      <div key={fIdx} className="cat-card-feature-row">
                        <Check size={14} className="text-sky-600 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions Row */}
                  <div className="cat-card-action-row">
                    <button
                      className="btn btn-primary btn-sm flex-1"
                      onClick={() => {
                        onNavigate('product', p.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <span>Full Specifications</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      className="btn btn-outline-cyan btn-sm"
                      onClick={() => onQuickQuote(p.name, p.category)}
                      title="Request Quotation"
                    >
                      <Send size={13} />
                      <span>Quote</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 6. Turnkey Project Execution Methodology */}
      <div className="category-methodology-section section bg-white border-y border-slate-200">
        <div className="container">
          <div className="section-title-wrap text-center mb-10">
            <div className="section-tag inline-flex items-center gap-2">
              <Award size={14} />
              <span>Execution Integrity</span>
            </div>
            <h2 className="section-heading text-2xl font-bold text-slate-900 mt-2">
              Our 4-Phase Turnkey Engineering Lifecycle
            </h2>
            <p className="section-desc max-w-2xl mx-auto text-slate-600 mt-2">
              Every project awarded to HTI undergoes systematic site feasibility, CAD drawing approvals, factory testing, and statutory validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center mb-4">
                01
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Site Feasibility & CAD</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Physical opening measurement, wind load / cycle rate calculations, and CAD General Arrangement (GA) drawings.
              </p>
            </div>

            <div className="glass-card p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center mb-4">
                02
              </div>
              <h4 className="font-bold text-slate-900 mb-2">OEM Hardware Sourcing</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Procurement of certified tier-1 motors, sensors, microcontrollers, and Flameproof Ex-d cast enclosures.
              </p>
            </div>

            <div className="glass-card p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center mb-4">
                03
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Precision Integration</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Site installation, electrical wiring, FACP fire alarm trip integration, and differential pressure interlock calibration.
              </p>
            </div>

            <div className="glass-card p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center mb-4">
                04
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Testing & 24/7 SLA</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                100% cycle stress testing, documentation handover for USFDA / NBC audit sign-offs, and AMC service agreements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Technical FAQ Accordion */}
      {categoryMeta.faqs && categoryMeta.faqs.length > 0 && (
        <div className="category-faq-section section">
          <div className="container max-w-4xl">
            <div className="section-title-wrap text-center mb-8">
              <div className="section-tag inline-flex items-center gap-2">
                <HelpCircle size={14} />
                <span>Technical Clarifications</span>
              </div>
              <h3 className="section-heading text-2xl font-bold text-slate-900 mt-2">
                Frequently Asked Questions on {categoryMeta.categoryName}
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {categoryMeta.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="glass-card border border-slate-200 rounded-xl bg-white overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-slate-900 text-base"
                      onClick={() => toggleFaq(idx)}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} className="text-sky-600" /> : <ChevronDown size={18} className="text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 8. Bottom Consultation Banner */}
      <div className="category-bottom-cta section">
        <div className="container">
          <div className="category-cta-card">
            <div className="cta-content">
              <span className="cta-tag">TURNKEY ENGINEERING CONSULTATION</span>
              <h2 className="cta-heading">
                Need Turnkey Estimation for {categoryMeta.categoryName}?
              </h2>
              <p className="cta-desc">
                From initial site surveys in Mumbai to turnkey PAN-India commissioning, our technical teams provide detailed BOQs, CAD drawings, and statutory compliance assistance.
              </p>
              <div className="cta-buttons-row">
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate('contact')}
                >
                  <Send size={16} />
                  <span>Send Project BOQ / Requirement</span>
                </button>
                <a
                  href="tel:+919820112345"
                  className="btn btn-secondary"
                >
                  <PhoneCall size={16} />
                  <span>Speak with Mumbai Project Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
