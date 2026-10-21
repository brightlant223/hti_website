import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Download,
  Sun,
  Moon,
  Monitor,
  Settings,
  Cpu,
  Lock,
  ShieldCheck,
  Flame,
  Sparkles,
  Activity,
  CheckCircle2,
  Building2,
  Briefcase,
  Users,
  User,
  BookOpen,
  PhoneCall,
  ArrowRight,
  MessageSquare,
  DoorClosed,
  SlidersHorizontal,
  Layers,
  Truck
} from 'lucide-react';
import { TOTAL_PRODUCT_COUNT } from '../data/productCatalogueData';

export default function Navbar({
  currentPage = 'home',
  onNavigate,
  onOpenAdmin,
  isAdminOpen = false,
  inquiryCount = 0,
  onSelectCategory,
  theme = 'light',
  resolvedTheme = 'light',
  onThemeChange
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'products' | 'company' | null
  // Tracks whether the open panel was opened by a click. A hover-opened panel
  // must NOT be closed by the subsequent click of the same nav button.
  const [openedByClick, setOpenedByClick] = useState(false);
  const [selectedServiceGroup, setSelectedServiceGroup] = useState(0);
  const [selectedProductGroup, setSelectedProductGroup] = useState(0);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const mobileDrawerRef = useRef(null);

  const handleMouseEnterDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown((prev) => {
      if (prev !== name) setOpenedByClick(false);
      return name;
    });
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setOpenedByClick(false);
    }, 220);
  };

  // Keyboard users tabbing to a nav item should get the same panel a mouse
  // user gets on hover.
  const handleFocusDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
    setOpenedByClick(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setOpenedByClick(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close the open panel when keyboard focus moves completely outside the nav
  useEffect(() => {
    const handleFocusIn = (e) => {
      if (!activeDropdown) return;
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setOpenedByClick(false);
      }
    };
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, [activeDropdown]);

  // Lock body scroll and set class when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('mobile-menu-active');
      // Move focus into the drawer so keyboard users are not stranded behind it
      if (mobileDrawerRef.current) {
        const firstFocusable = mobileDrawerRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) firstFocusable.focus();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('mobile-menu-active');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('mobile-menu-active');
    };
  }, [mobileMenuOpen]);

  // Return focus to the hamburger button when the drawer closes
  useEffect(() => {
    if (!mobileMenuOpen && mobileToggleRef.current && document.activeElement === mobileToggleRef.current) {
      mobileToggleRef.current.focus();
    }
  }, [mobileMenuOpen]);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setThemeDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (page, sectionId = null, e = null) => {
    if (e && e.preventDefault) e.preventDefault();
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCategoryClick = (categoryName) => {
    setActiveDropdown(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    } else {
      handleNavClick('home', 'catalog');
    }
  };

  // Keyboard activation for elements rendered as `role="button"`
  const handleKeyActivate = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      callback();
    }
  };

  const handleProductClick = (slug) => {
    setActiveDropdown(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('product', slug);
    }
  };

  const toggleDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    // Clicking the button of an already-hover-opened panel must keep it open
    // (the user is trying to reach the panel, not dismiss it).
    if (activeDropdown === name && openedByClick) {
      setActiveDropdown(null);
      setOpenedByClick(false);
    } else {
      setActiveDropdown(name);
      setOpenedByClick(true);
    }
  };

  // Mega menu services data matching reference design
  const serviceGroups = [
    {
      id: 'automation',
      title: 'Industrial Access Automation',
      tagline: 'Automatic doors, telescopic gates, high-speed roll-up & dock levellers.',
      icon: Cpu,
      color: '#0284c7',
      page: 'automation',
      badge: 'INDUSTRIAL ACCESS AUTOMATION',
      headingPrimary: 'High-Throughput Industrial',
      headingAccent: 'Access & Gates.',
      heroImage: '/services/services-hero-access.jpg',
      overviewDesc: 'Heavy-duty motorized access automation designed for corporate entrances, logistics warehouses, and pharma bays with 24/7 reliability.',
      features: [
        { 
          title: 'Touchless Entry',
          description: 'Automatic Sliding & Swing Doors for hygienic and seamless access.',
          image: '/services/services-touchless-entry.jpg',
          icon: DoorClosed,
          slug: 'automatic-sliding-swing-doors'
        },
        { 
          title: 'Perimeter Gate',
          description: 'Automatic Sliding & Swing Gates for industrial and commercial sites.',
          image: '/services/services-perimeter-gate.jpg',
          icon: ShieldCheck,
          slug: 'automatic-sliding-swing-gates'
        },
        { 
          title: 'Trackless Gate',
          description: 'Telescopic & Cantilever Gates for wide and heavy-duty openings.',
          image: '/services/services-trackless-gate.jpg',
          icon: SlidersHorizontal,
          slug: 'telescopic-cantilever-gates'
        },
        { 
          title: 'Rapid Airlock',
          description: 'High Speed Roll Up & Sectional Doors for high-traffic zones.',
          image: '/services/services-rapid-airlock.jpg',
          icon: Layers,
          slug: 'pvc-rapid-roll-up-doors'
        },
        { 
          title: 'Logistics Bridge',
          description: 'Dock Levellers & Dock Shelters for efficient loading operations.',
          image: '/services/services-logistics-bridge.jpg',
          icon: Truck,
          slug: 'dock-levellers-dock-shelters'
        },
        { 
          title: 'Heavy Security',
          description: 'Motorized Rolling Shutters for maximum site protection.',
          image: '/services/services-heavy-security.jpg',
          icon: Settings,
          slug: 'motorized-rolling-shutters'
        }
      ]
    },
    {
      id: 'interlocks',
      title: 'Cleanroom Interlocks & Pass Boxes',
      tagline: 'Flameproof/Safe door interlocks, pass boxes & digital clocks.',
      icon: Lock,
      color: '#0284c7',
      page: 'cleanroom-interlocks',
      badge: 'PHARMA CLEANROOM ENGINEERING',
      headingPrimary: 'USFDA Cleanroom Interlock &',
      headingAccent: 'Contamination Control.',
      heroImage: '/hero-cleanroom-interlock-chamber.jpg',
      overviewDesc: 'Microcontroller and PLC cleanroom interlocking logic, dynamic pass box hatches, and GPS master-slave clocks built for sterile pharma compliance.',
      features: [
        { 
          title: 'Door Interlock (2-8 Door)',
          description: 'Flameproof & safe programmable interlocking for sterile cascades.',
          image: '/hero-cleanroom-interlock-chamber.jpg',
          icon: Lock,
          slug: 'door-interlock-systems'
        },
        { 
          title: 'Pass Box Systems',
          description: 'Static & dynamic material transfer hatches with UV disinfection.',
          image: '/products/pass-box-system.jpg',
          icon: Layers,
          slug: 'pass-box-systems'
        },
        { 
          title: 'Digital Clocks',
          description: 'GPS master-slave synchronized clocks with flameproof housings.',
          image: '/products/digital-clock-hero.jpg',
          icon: Activity,
          slug: 'digital-gps-clocks'
        },
        { 
          title: 'Chiller & Cleanroom Doors',
          description: 'Insulated chiller doors and hermetically sealed flush cleanroom doors.',
          image: '/products/chiller-door-hero.jpg',
          icon: DoorClosed,
          slug: 'chiller-clean-room-doors'
        },
        { 
          title: 'Acoustic Sound Doors',
          description: 'Heavy noise-dampening acoustic barrier doors for plant rooms.',
          image: '/case-studies/case-air-curtain.jpg',
          icon: Settings,
          slug: 'sound-proof-doors'
        },
        { 
          title: 'Safety Override Buzzers',
          description: 'Emergency release logic and integrated audio buzzer alerts.',
          image: '/case-studies/case-ss304-mist.jpg',
          icon: ShieldCheck,
          slug: 'door-interlock-systems'
        }
      ]
    },
    {
      id: 'perimeter',
      title: 'Perimeter Defense & Traffic Control',
      tagline: 'Boom barriers, tyre killers, car lifts, turnstiles & flap barriers.',
      icon: ShieldCheck,
      color: '#0284c7',
      page: 'perimeter-defense',
      badge: 'TRAFFIC & PERIMETER DEFENSE',
      headingPrimary: 'Vehicle Access, Tyre Killers &',
      headingAccent: 'Pedestrian Speed Gates.',
      heroImage: '/case-studies/case-boom-barrier.jpg',
      overviewDesc: 'High-frequency electromechanical boom barriers, optical turnstiles, anti-ram tyre killers, and multi-level car lifts for secure facilities.',
      features: [
        { 
          title: 'Boom Barriers',
          description: 'High-duty electromechanical & hydraulic automated barrier arms.',
          image: '/services/service-boom-barrier.jpg',
          icon: SlidersHorizontal,
          slug: 'boom-barriers'
        },
        { 
          title: 'Optical Turnstiles',
          description: 'Biometric speed gates & swing flap barriers for corporate lobbies.',
          image: '/hero-glass-atrium.jpg',
          icon: User,
          slug: 'turnstiles-flap-barriers-speed-gates'
        },
        { 
          title: 'Tyre Killers & Bollards',
          description: 'Heavy hydraulic tyre spikes & crash-rated anti-ram bollards.',
          image: '/services/service-bollards-blockers.jpg',
          icon: ShieldCheck,
          slug: 'bollards-tyre-killers-car-lifts'
        },
        { 
          title: 'Car Lift Systems',
          description: 'Hydraulic multi-tier car parking lifts & heavy goods vehicle lifts.',
          image: '/services/services-trackless-gate.jpg',
          icon: Truck,
          slug: 'bollards-tyre-killers-car-lifts'
        },
        { 
          title: 'Parking Management',
          description: 'FASTag RFID tolling, ticket dispensers & bay occupancy sensors.',
          image: '/services/services-hero-access.jpg',
          icon: Cpu,
          slug: 'parking-intrusion-alarms'
        },
        { 
          title: 'Visitor Management',
          description: 'QR digital gate passes, facial recognition & badge printing.',
          image: '/hero-security-command-center.jpg',
          icon: CheckCircle2,
          slug: 'visitor-management-system'
        }
      ]
    },
    {
      id: 'fire',
      title: 'Fire Protection & Life Safety',
      tagline: 'Fire alarms, hydrant sprinkler arrays & fire rated containment.',
      icon: Flame,
      color: '#0284c7',
      page: 'fire-protection',
      badge: 'TURNKEY LIFE SAFETY',
      headingPrimary: 'Complete Industrial Fire Fighting &',
      headingAccent: 'Alarm Systems.',
      heroImage: '/case-studies/case-fire-hydrant.jpg',
      overviewDesc: 'Comprehensive life safety infrastructure covering conventional & addressable fire alarm panels, fire hydrant networks, and certified fire doors.',
      features: [
        { 
          title: 'Addressable Fire Alarms',
          description: 'Multi-zone detection panels, optical smoke sensors & heat probes.',
          image: '/services/service-fire-alarm.jpg',
          icon: Flame,
          slug: 'fire-alarm-system'
        },
        { 
          title: 'Hydrant & Sprinkler Arrays',
          description: 'Water deluge networks, certified landing valves & pump skids.',
          image: '/case-studies/case-fire-hydrant.jpg',
          icon: Activity,
          slug: 'fire-hydrant-sprinkler-systems'
        },
        { 
          title: 'Fire Rated Doors & Shutters',
          description: '120-240 minute certified fire-resistant doors & auto drop shutters.',
          image: '/services/service-fire-doors.jpg',
          icon: Lock,
          slug: 'fire-rated-doors-shutters'
        },
        { 
          title: 'Public Address (PA)',
          description: 'Voice evacuation systems, emergency sirens & plant horns.',
          image: '/hero-security-command-center.jpg',
          icon: MessageSquare,
          slug: 'public-address-system'
        },
        { 
          title: 'Gas Leak Detection',
          description: 'Toxic, combustible, VOC & ammonia gas monitoring sensors.',
          image: '/case-studies/case-ss304-mist.jpg',
          icon: ShieldCheck,
          slug: 'gas-detection-systems'
        },
        { 
          title: 'Emergency Auto Trip',
          description: 'Relay integration with access doors, AHU shut-off & fire pumps.',
          image: '/services/service-emergency-trip.jpg',
          icon: Settings,
          slug: 'door-interlock-systems'
        }
      ]
    },
    {
      id: 'security',
      title: 'CCTV Surveillance & Biometrics',
      tagline: 'Analogue & IP 4K surveillance, biometric access & video door phones.',
      icon: Cpu,
      color: '#0284c7',
      page: 'security-systems',
      category: 'Security System',
      badge: 'INTELLIGENT SURVEILLANCE',
      headingPrimary: '4K AI Surveillance, Biometrics &',
      headingAccent: 'Video Intercom.',
      heroImage: '/hero-security-command-center.jpg',
      overviewDesc: 'High-definition IP surveillance, biometric time attendance, multi-zone video door phones, and central security control room infrastructure.',
      features: [
        { 
          title: '4K AI CCTV Systems',
          description: 'Network IP dome/bullet cameras, ANPR & thermal perimeter beams.',
          image: '/hero-security-command-center.jpg',
          icon: Cpu,
          category: 'Security System'
        },
        { 
          title: 'Biometric Access',
          description: 'Contactless face verification, fingerprint & RFID attendance.',
          image: '/hero-glass-atrium.jpg',
          icon: User,
          category: 'Security System'
        },
        { 
          title: 'Video Door Phones',
          description: 'IP multi-channel video intercom & electronic door release.',
          image: '/services/services-touchless-entry.jpg',
          icon: PhoneCall,
          category: 'Security System'
        },
        { 
          title: 'Central VMS Command',
          description: 'Multi-screen enterprise video management & surveillance hardware.',
          image: '/hero-security-command-center.jpg',
          icon: Monitor,
          category: 'Security System'
        },
        { 
          title: 'Fault Annunciators',
          description: 'Visual window annunciator systems for critical machine alerts.',
          image: '/case-studies/case-fire-hydrant.jpg',
          icon: Activity,
          category: 'Security System'
        },
        { 
          title: 'Remote Gate Release',
          description: 'Smartphone relay triggers & cloud perimeter entrance controls.',
          image: '/services/services-perimeter-gate.jpg',
          icon: SlidersHorizontal,
          category: 'Security System'
        }
      ]
    },
    {
      id: 'monitoring',
      title: 'Server Room & Critical Monitoring',
      tagline: 'Server room alert monitoring, gas detection & hygiene systems.',
      icon: Activity,
      color: '#0284c7',
      category: 'Security System',
      badge: 'CRITICAL FACILITY MONITORING',
      headingPrimary: 'Data Center Environment &',
      headingAccent: 'Facility Protection.',
      heroImage: '/case-studies/case-air-curtain.jpg',
      overviewDesc: '24/7 environmental monitoring for server rooms, toxic & combustible gas detection arrays, and touchless washroom sanitary engineering.',
      features: [
        { 
          title: 'Server Room Alert Monitor',
          description: 'Temperature, humidity, water leak & power trip SMS/email alerts.',
          image: '/hero-security-command-center.jpg',
          icon: Activity,
          category: 'Security System'
        },
        { 
          title: 'Toxic Gas Detection',
          description: 'Catalytic & electrochemical sensors for hazardous plant rooms.',
          image: '/case-studies/case-cleanroom.jpg',
          icon: Flame,
          category: 'Security System'
        },
        { 
          title: 'Industrial Air Curtains',
          description: 'Thermal & insect air barriers for warehouse entry thresholds.',
          image: '/case-studies/case-air-curtain.jpg',
          icon: Layers,
          category: 'Hygiene'
        },
        { 
          title: 'Touchless Sensor Taps',
          description: 'Commercial brass infrared automatic faucets & urinal flushes.',
          image: '/case-studies/case-ss304-mist.jpg',
          icon: Sparkles,
          category: 'Hygiene'
        },
        { 
          title: 'Dual Hand Dryers',
          description: 'High-speed HEPA filtered hygienic touchless hand dryers.',
          image: '/case-studies/case-ss304-mist.jpg',
          icon: ShieldCheck,
          category: 'Hygiene'
        },
        { 
          title: 'Trip Alarm Annunciators',
          description: 'Real-time telemetry for pump failure & chiller room exceptions.',
          image: '/services/services-heavy-security.jpg',
          icon: Settings,
          category: 'Security System'
        }
      ]
    }
  ];

  const currentGroup = serviceGroups[selectedServiceGroup] || serviceGroups[0];

  // 5 Specialized Engineering Product Divisions (Matching Services Architecture - "see like service")
  const productGroups = [
    {
      id: 'access-automation',
      title: 'Access Automation',
      tagline: 'Touchless sliding glass doors, motorized perimeter gates & high-speed doors.',
      icon: Cpu,
      color: '#0284c7',
      page: 'automation',
      categoryId: 'access-automation',
      badge: 'ARCHITECTURAL ACCESS & GATES',
      headingPrimary: 'Touchless & Industrial',
      headingAccent: 'Pedestrian & Gate Automation.',
      heroImage: '/products/automatic-doors.jpg',
      overviewDesc: 'High-throughput microprocessor automated sliding & swing doors, heavy motorized perimeter gates, and high-speed rapid airlocks for corporate and pharma facilities.',
      products: [
        {
          title: 'Automatic Sliding & Swing Doors',
          description: 'Touchless microwave radar entry for corporate offices & healthcare.',
          image: '/products/automatic-doors.jpg',
          icon: DoorClosed,
          slug: 'automatic-sliding-swing-doors'
        },
        {
          title: 'Automatic Sliding & Swing Gates',
          description: 'Heavy-duty motorized perimeter security gates for commercial sites.',
          image: '/services/services-perimeter-gate.jpg',
          icon: ShieldCheck,
          slug: 'automatic-sliding-swing-gates'
        },
        {
          title: 'Telescopic & Cantilever Gates',
          description: 'Trackless cantilever and space-saving telescopic automated gates.',
          image: '/services/services-trackless-gate.jpg',
          icon: SlidersHorizontal,
          slug: 'telescopic-cantilever-gates'
        },
        {
          title: 'Motorized Rolling Shutters',
          description: 'Heavy-gauge motorized roll-up shutters for industrial site defense.',
          image: '/services/services-heavy-security.jpg',
          icon: Layers,
          slug: 'motorized-industrial-rolling-shutters'
        },
        {
          title: 'PVC High Speed Roll Up Doors',
          description: 'PVC high-speed rapid roll-up airlock doors for logistics & clean areas.',
          image: '/services/services-rapid-airlock.jpg',
          icon: Truck,
          slug: 'high-speed-roll-up-doors'
        }
      ]
    },
    {
      id: 'traffic-perimeter',
      title: 'Traffic & Perimeter',
      tagline: 'Boom barriers, dock levellers, optical speed turnstiles & crash bollards.',
      icon: ShieldCheck,
      color: '#0284c7',
      page: 'perimeter-defense',
      categoryId: 'traffic-perimeter',
      badge: 'VEHICLE & PERIMETER DEFENSE',
      headingPrimary: 'Industrial Traffic Control &',
      headingAccent: 'Perimeter Security.',
      heroImage: '/products/boom-barriers.jpg',
      overviewDesc: 'Electro-hydraulic high-frequency boom barriers, logistics loading dock levellers, optical turnstiles, and anti-ram hydraulic bollards.',
      products: [
        {
          title: 'Electro-Hydraulic Boom Barriers',
          description: '1.5s high-speed electromechanical & hydraulic automated barrier arms.',
          image: '/products/boom-barriers.jpg',
          icon: SlidersHorizontal,
          slug: 'boom-barriers'
        },
        {
          title: 'Hydraulic Dock Levellers & Shelters',
          description: 'Heavy-capacity hydraulic dock bridges and weather-seal dock shelters.',
          image: '/services/services-logistics-bridge.jpg',
          icon: Truck,
          slug: 'dock-levellers-dock-shelters'
        },
        {
          title: 'Optical Speed Flap Turnstiles',
          description: 'Biometric pedestrian speed gates & optical barriers for corporate lobbies.',
          image: '/services/services-heavy-security.jpg',
          icon: Users,
          slug: 'optical-flap-turnstiles'
        },
        {
          title: 'Anti-Ram Hydraulic Crash Bollards',
          description: 'K4/K12 crash-certified retractable bollards for high-security portals.',
          image: '/services/service-bollards-blockers.jpg',
          icon: Lock,
          slug: 'hydraulic-crash-bollards'
        },
        {
          title: 'Tyre Killers & Road Blockers',
          description: 'Heavy-duty electro-hydraulic road blockers and steel tyre shredders.',
          image: '/case-studies/case-boom-barrier.jpg',
          icon: Flame,
          slug: 'tyre-killers-road-blockers'
        }
      ]
    },
    {
      id: 'pharma-cleanroom',
      title: 'Pharma Cleanroom',
      tagline: 'USFDA 21 CFR Part 11 door interlocks, pass boxes, GPS clocks & chiller doors.',
      icon: Lock,
      color: '#0284c7',
      page: 'cleanroom-interlocks',
      categoryId: 'pharma-cleanroom',
      badge: 'USFDA CFR PART 11 CLEANROOM',
      headingPrimary: 'USFDA 21 CFR Part 11',
      headingAccent: 'Cleanroom & Interlock Logic.',
      heroImage: '/products/cleanroom-interlocks.jpg',
      overviewDesc: 'Certified 2–8 door programmable interlocking logic, dynamic UV pass boxes, GPS synchronized clocks, and hermetic cleanroom doors.',
      products: [
        {
          title: 'Door Interlock System (2-8 Door)',
          description: 'Flameproof & safe programmable airlock cascading interlock controllers.',
          image: '/products/cleanroom-interlocks.jpg',
          icon: Lock,
          slug: 'door-interlock-systems'
        },
        {
          title: 'Dynamic & Static Pass Boxes',
          description: 'SS 304/316 cleanroom material transfer hatches with UV disinfection.',
          image: '/products/pass-box-system.jpg',
          icon: Layers,
          slug: 'dynamic-static-pass-boxes'
        },
        {
          title: 'Digital Master GPS Slave Clocks',
          description: 'GPS synchronized cleanroom digital display clocks with pharma housing.',
          image: '/products/digital-clock-hero.jpg',
          icon: Activity,
          slug: 'digital-gps-clocks'
        },
        {
          title: 'Cold Storage & Chiller Doors',
          description: 'Heavy thermal-insulated sliding cold storage & refrigeration doors.',
          image: '/products/chiller-door-hero.jpg',
          icon: DoorClosed,
          slug: 'chiller-clean-room-doors'
        },
        {
          title: 'Hermetically Sealed Cleanroom Doors',
          description: 'Airtight flush-fit antimicrobial cleanroom swing and sliding doors.',
          image: '/hero-cleanroom-interlock-chamber.jpg',
          icon: Sparkles,
          slug: 'hermetic-cleanroom-doors'
        }
      ]
    },
    {
      id: 'fire-life-safety',
      title: 'Fire & Life Safety',
      tagline: 'Multi-loop addressable fire alarms, turnkey sprinkler networks & fire doors.',
      icon: Flame,
      color: '#0284c7',
      page: 'fire-protection',
      categoryId: 'fire-life-safety',
      badge: 'TURNKEY LIFE SAFETY & DETECTION',
      headingPrimary: 'Addressable Fire Detection &',
      headingAccent: 'Life-Safety Suppression.',
      heroImage: '/products/fire-alarm.jpg',
      overviewDesc: 'Certified multi-loop addressable fire alarms, industrial hydrant networks, 120/240-minute certified fire-rated doors, and gas suppression.',
      products: [
        {
          title: 'Addressable Fire Alarm Systems',
          description: 'Multi-loop microprocessor addressable fire panels with smoke sensors.',
          image: '/products/fire-alarm.jpg',
          icon: Flame,
          slug: 'addressable-fire-alarm-system'
        },
        {
          title: 'Industrial Fire Hydrant & Sprinklers',
          description: 'Turnkey diesel hydrant booster pumps, deluge valves & sprinkler piping.',
          image: '/services/service-emergency-trip.jpg',
          icon: Activity,
          slug: 'fire-hydrant-sprinkler-systems'
        },
        {
          title: 'Fire Rated Steel Doors (120/240 Min)',
          description: 'CBRI/UL certified galvanised steel fire exit doors with panic hardware.',
          image: '/services/service-fire-doors.jpg',
          icon: DoorClosed,
          slug: 'fire-rated-steel-doors'
        },
        {
          title: 'Clean Agent Gas Suppression',
          description: 'Novec 1230 & FM-200 waterless fire extinguishing for server rooms.',
          image: '/case-studies/case-fire-hydrant.jpg',
          icon: Sparkles,
          slug: 'gas-suppression-systems'
        },
        {
          title: 'Public Address & Voice Evacuation',
          description: 'Zoned emergency acoustic voice alarm and paging audio networks.',
          image: '/services/service-fire-alarm.jpg',
          icon: Settings,
          slug: 'public-address-system'
        }
      ]
    },
    {
      id: 'surveillance-alerts',
      title: 'Surveillance & Alerts',
      tagline: '4K AI IP surveillance, biometric face recognition, server room sensors & alerts.',
      icon: Activity,
      color: '#0284c7',
      page: 'security-systems',
      categoryId: 'surveillance-alerts',
      badge: '4K AI TELEMETRY & SECURITY',
      headingPrimary: 'Enterprise 4K AI Surveillance &',
      headingAccent: 'Biometric Access Control.',
      heroImage: '/products/cctv-biometrics.jpg',
      overviewDesc: 'High-resolution AI-powered IP surveillance cameras, facial recognition biometric terminals, and 24/7 server room environment telemetry.',
      products: [
        {
          title: 'CCTV Surveillance (Analogue & IP 4K)',
          description: 'Ultra-HD 4K AI analytics cameras, perimeter intrusion & central VMS.',
          image: '/products/cctv-biometrics.jpg',
          icon: Activity,
          slug: 'cctv-surveillance-system'
        },
        {
          title: 'Biometric Attendance & Access Terminals',
          description: 'Multi-modal touchless face recognition, fingerprint & RFID access.',
          image: '/products/cctv-biometrics.jpg',
          icon: Users,
          slug: 'biometric-access-attendance'
        },
        {
          title: 'Server Room Environment Telemetry',
          description: '24/7 temperature, humidity, water leak, and smoke SNMP sensors.',
          image: '/hero-security-command-center.jpg',
          icon: Cpu,
          slug: 'server-room-monitoring'
        },
        {
          title: 'Microprocessor Alarm Annunciators',
          description: 'Industrial multi-window visual annunciators with audio buzzer alerts.',
          image: '/about-security-camera.jpg',
          icon: ShieldCheck,
          slug: 'alarm-annunciators'
        },
        {
          title: 'Wireless Intrusion Detection Systems',
          description: 'Grade-2 perimeter vibration, magnetic reed, and microwave beam barriers.',
          image: '/services/services-heavy-security.jpg',
          icon: Lock,
          slug: 'wireless-intrusion-detection'
        }
      ]
    }
  ];

  const currentProductGroup = productGroups[selectedProductGroup] || productGroups[0];

  const handleDownloadBrochure = (e) => {
    e.preventDefault();
    setActiveDropdown(null);
    // Smooth scroll to contact or open inquiry with prefill
    handleNavClick('home', 'contact');
  };

  return (
    <header className="navbar-wrapper" ref={navRef}>
      {/* 1. Sleek Top Bar (Hidden on Mobile) */}
      <div className="bright-top-bar desktop-only">
        <div className="bright-container top-bar-inner">
          <div className="top-bar-left">
            <a href="mailto:info@htisystems.in" className="top-link">
              <Mail size={13} className="top-icon" />
              <span>info@htisystems.in</span>
            </a>
            <span className="top-sep">|</span>
            <button 
              className="top-link-btn" 
              onClick={() => handleNavClick('contact')}
            >
              <span>Contact Us</span>
            </button>
            <span className="top-sep">|</span>
            <a href="tel:+919992756077" className="top-link">
              <Phone size={13} className="top-icon text-red" />
              <span>+91 9992756077</span>
            </a>
          </div>

          <div className="top-bar-right">
            <span className="top-location">
              <MapPin size={13} className="top-icon location-pin" />
              <span>Turbhe, Navi Mumbai - 400703</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className={`bright-main-nav ${isScrolled ? 'nav-scrolled' : ''}`} aria-label="Main navigation">
        {/* Full-bleed veil behind an open mega panel so page content never
            peeks out from behind it. Sits below the nav bar (z-index 10001). */}
        {(activeDropdown === 'services' || activeDropdown === 'products') && (
          <div
            className="mega-panel-veil"
            onClick={() => { setActiveDropdown(null); setOpenedByClick(false); }}
            aria-hidden="true"
          />
        )}

        <div className="bright-container main-nav-inner">
          {/* Logo Section with User's Uploaded HTI Logo */}
          <a
            href="/"
            className="bright-brand"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home', 'hero');
            }}
          >
            <div className="hti-logo-container">
              <img
                src="/hti-logo.png"
                alt="HTI Systems Logo"
                className="hti-logo-img"
              />
            </div>

            <div className="brand-divider-line"></div>

            <div className="bright-brand-text">
              <div className="bright-brand-main">
                <span className="brand-word-bold">AUTOMATION</span>
              </div>
              <div className="bright-brand-sub">
                <span>& SECURITY SYSTEMS</span>
                <span className="brand-badge-pill">PVT. LTD.</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="bright-nav-links desktop-only">
            {/* Services Pill / Dropdown */}
            <div 
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnterDropdown('services')}
              onMouseLeave={handleMouseLeaveDropdown}
              onFocus={() => handleFocusDropdown('services')}
            >
              <button
                className={`bright-nav-btn ${activeDropdown === 'services' ? 'services-pill-btn is-active-pill' : ''}`}
                onClick={() => toggleDropdown('services')}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Services</span>
                {activeDropdown === 'services' ? (
                  <ChevronUp size={15} className="pill-chevron" />
                ) : (
                  <ChevronDown size={15} className="dropdown-arrow" />
                )}
              </button>
            </div>

            {/* Products Dropdown (Horizontal Mega Menu) */}
            <div 
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnterDropdown('products')}
              onMouseLeave={handleMouseLeaveDropdown}
              onFocus={() => handleFocusDropdown('products')}
            >
              <button
                className={`bright-nav-btn ${activeDropdown === 'products' ? 'services-pill-btn is-active-pill' : ''}`}
                onClick={() => toggleDropdown('products')}
                aria-expanded={activeDropdown === 'products'}
                aria-haspopup="true"
              >
                <span>Products</span>
                {activeDropdown === 'products' ? (
                  <ChevronUp size={15} className="pill-chevron" />
                ) : (
                  <ChevronDown size={14} className="dropdown-arrow" />
                )}
              </button>
            </div>

            {/* Company Dropdown (Horizontal - exactly like Brightlant screenshot) */}
            <div 
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnterDropdown('company')}
              onMouseLeave={handleMouseLeaveDropdown}
              onFocus={() => handleFocusDropdown('company')}
            >
              <button
                className={`bright-nav-btn ${activeDropdown === 'company' ? 'services-pill-btn is-active-pill' : ''}`}
                onClick={() => toggleDropdown('company')}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
              >
                <span>Company</span>
                {activeDropdown === 'company' ? (
                  <ChevronUp size={15} className="pill-chevron" />
                ) : (
                  <ChevronDown size={14} className="dropdown-arrow" />
                )}
              </button>
            </div>

            {/* Brochure Link with Download Icon */}
            <button
              className="bright-nav-btn brochure-btn"
              onClick={handleDownloadBrochure}
              title="Download Product Catalog & Specs"
            >
              <span>Brochure</span>
              <Download size={14} className="brochure-icon" />
            </button>
          </div>

          {/* Right Action Group: Theme Toggle + Consultation CTA */}
          {/* Right Action Group: Theme Toggle + Admin Portal */}
          {/* Right Action Group: Theme Toggle + Admin Portal */}
          <div className="bright-nav-actions desktop-only">
            {/* Direct 1-Click Theme Toggle: Only 1 Icon, Instant Dark/Light Switch */}
            <button
              className={`bright-theme-toggle ${resolvedTheme === 'dark' ? 'is-dark' : 'is-light'}`}
              onClick={() => onThemeChange && onThemeChange(resolvedTheme === 'dark' ? 'light' : 'dark')}
              title={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              type="button"
            >
              {resolvedTheme === 'dark' ? (
                <Sun size={21} className="sun-icon" />
              ) : (
                <Moon size={21} className="moon-icon" />
              )}
            </button>

            {/* Sleek Admin Icon Portal Button */}
            <button
              className={`bright-admin-icon-btn ${isAdminOpen ? 'admin-active' : ''}`}
              onClick={onOpenAdmin}
              title="Open Admin Portal (CMS & Inquiries)"
              aria-label="Admin Portal"
            >
              <User size={18} />
              {inquiryCount > 0 && (
                <span className="admin-icon-badge" title={`${inquiryCount} active inquiries`}>
                  {inquiryCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions: 1-Click Theme Toggle + Hamburger Menu */}
          <div className="bright-mobile-actions mobile-only">
            <button
              className={`bright-theme-toggle ${resolvedTheme === 'dark' ? 'is-dark' : 'is-light'}`}
              onClick={() => onThemeChange && onThemeChange(resolvedTheme === 'dark' ? 'light' : 'dark')}
              title={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              type="button"
            >
              {resolvedTheme === 'dark' ? (
                <Sun size={20} className="sun-icon" />
              ) : (
                <Moon size={20} className="moon-icon" />
              )}
            </button>
            <button
              className="bright-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="hti-mobile-drawer"
              ref={mobileToggleRef}
              type="button"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* =========================================================================
            HORIZONTAL DROPDOWNS (Brightlant full-width horizontal bar style)
            ========================================================================= */}

        {/* 1. SERVICES MEGA DROPDOWN (Reference-Matched Premium Panel) */}
        {activeDropdown === 'services' && (
          <div 
            className="bright-mega-panel-wrapper"
            onMouseEnter={() => handleMouseEnterDropdown('services')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <div className="mega-body-grid">
              {/* Left Column: 6 Services List */}
              <div className="mega-left-col">
                {serviceGroups.map((group, index) => {
                  const Icon = group.icon;
                  const isSelected = selectedServiceGroup === index;
                  return (
                    <div
                      key={group.id}
                      className={`mega-service-item ${isSelected ? 'mega-item-active' : ''}`}
                      onMouseEnter={() => setSelectedServiceGroup(index)}
                      onClick={() => {
                        if (group.page) {
                          handleNavClick(group.page);
                        } else if (group.section) {
                          handleNavClick('home', group.section);
                        } else if (group.category) {
                          handleCategoryClick(group.category);
                        }
                      }}
                      onKeyDown={(e) => handleKeyActivate(e, () => {
                        if (group.page) {
                          handleNavClick(group.page);
                        } else if (group.section) {
                          handleNavClick('home', group.section);
                        } else if (group.category) {
                          handleCategoryClick(group.category);
                        }
                      })}
                      role="button"
                      tabIndex={0}
                      aria-label={group.title}
                    >
                      <div className="mega-item-icon-box">
                        <Icon size={17} />
                      </div>
                      <div className="mega-item-text">
                        <div className="mega-item-title">{group.title}</div>
                        <div className="mega-item-tagline">{group.tagline}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Panel: Header (Text + Feature Image) & 6 Image Cards */}
              <div className="mega-right-panel">
                {/* Top Section: Text Info on Left + Hero Feature Image on Right */}
                <div className="mega-right-header-row">
                  <div className="mega-right-header-text">
                    <div className="mega-pill-badge-row">
                      <div className="mega-pill-badge">
                        <span className="mega-pulse-dot"></span>
                        <span>{currentGroup.badge}</span>
                      </div>
                      <button
                        className="mega-overview-link"
                        onClick={() => {
                          if (currentGroup.page) {
                            handleNavClick(currentGroup.page);
                          } else if (currentGroup.section) {
                            handleNavClick('home', currentGroup.section);
                          } else {
                            handleCategoryClick(currentGroup.category);
                          }
                        }}
                        title={`View ${currentGroup.title} Overview`}
                      >
                        <span>Overview</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <h3 className="mega-panel-heading">
                      {currentGroup.headingPrimary}{' '}
                      <span className="heading-blue-accent">{currentGroup.headingAccent}</span>
                    </h3>
                    
                    <p className="mega-panel-desc">{currentGroup.overviewDesc}</p>
                  </div>

                  {currentGroup.heroImage && (
                    <div className="mega-feature-hero-media">
                      <img 
                        src={currentGroup.heroImage} 
                        alt={currentGroup.title} 
                        className="mega-hero-img"
                        loading="eager"
                      />
                    </div>
                  )}
                </div>

                {/* 6 Sub-Service Cards Grid (3 Columns x 2 Rows) */}
                <div className="mega-subservice-cards-grid">
                  {currentGroup.features.map((feat, fIdx) => {
                    const CardIcon = feat.icon || Cpu;
                    return (
                      <div 
                        key={fIdx} 
                        className="mega-subservice-card"
                        onClick={() => {
                          if (feat.slug) {
                            handleProductClick(feat.slug);
                          } else if (feat.section) {
                            handleNavClick('home', feat.section);
                          } else if (feat.category) {
                            handleCategoryClick(feat.category);
                          } else {
                            handleNavClick('automation');
                          }
                        }}
                        onKeyDown={(e) => handleKeyActivate(e, () => {
                          if (feat.slug) {
                            handleProductClick(feat.slug);
                          } else if (feat.section) {
                            handleNavClick('home', feat.section);
                          } else if (feat.category) {
                            handleCategoryClick(feat.category);
                          } else {
                            handleNavClick('automation');
                          }
                        })}
                        role="button"
                        tabIndex={0}
                        aria-label={feat.title}
                      >
                        {/* Landscape Image with Overlapping Icon Badge */}
                        <div className="subservice-card-media">
                          <img 
                            src={feat.image || currentGroup.heroImage} 
                            alt={feat.title} 
                            className="subservice-card-img"
                            loading="lazy"
                          />
                          <div className="subservice-icon-badge">
                            <CardIcon size={14} />
                          </div>
                        </div>

                        {/* Card Content & Action Button */}
                        <div className="subservice-card-body">
                          <div className="subservice-text-content">
                            <h4 className="subservice-card-title">{feat.title}</h4>
                            <p className="subservice-card-desc">{feat.description}</p>
                          </div>
                          <div className="subservice-arrow-btn" aria-hidden="true">
                            <ArrowRight size={13} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS MEGA DROPDOWN (Reference-Matched Premium Panel - Exactly like Services) */}
        {activeDropdown === 'products' && (
          <div 
            className="bright-mega-panel-wrapper"
            onMouseEnter={() => handleMouseEnterDropdown('products')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <div className="mega-body-grid">
              {/* Left Column: 5 Product Divisions List */}
              <div className="mega-left-col">
                {productGroups.map((group, index) => {
                  const Icon = group.icon;
                  const isSelected = selectedProductGroup === index;
                  return (
                    <div
                      key={group.id}
                      className={`mega-service-item ${isSelected ? 'mega-item-active' : ''}`}
                      onMouseEnter={() => setSelectedProductGroup(index)}
                      onClick={() => {
                        setActiveDropdown(null);
                        if (group.page && onNavigate) {
                          onNavigate(group.page);
                        } else if (onNavigate) {
                          onNavigate('catalog', group.categoryId);
                        }
                      }}
                      onKeyDown={(e) => handleKeyActivate(e, () => {
                        setActiveDropdown(null);
                        if (group.page && onNavigate) {
                          onNavigate(group.page);
                        } else if (onNavigate) {
                          onNavigate('catalog', group.categoryId);
                        }
                      })}
                      role="button"
                      tabIndex={0}
                      aria-label={group.title}
                    >
                      <div className="mega-item-icon-box">
                        <Icon size={17} />
                      </div>
                      <div className="mega-item-text">
                        <div className="mega-item-title">{group.title}</div>
                        <div className="mega-item-tagline">{group.tagline}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Panel: Header (Text + Feature Image) & 6 Product Cards */}
              <div className="mega-right-panel">
                {/* Top Section: Text Info on Left + Hero Feature Image on Right */}
                <div className="mega-right-header-row">
                  <div className="mega-right-header-text">
                    <div className="mega-pill-badge-row">
                      <div className="mega-pill-badge">
                        <span className="mega-pulse-dot"></span>
                        <span>{currentProductGroup.badge}</span>
                      </div>
                      <button
                        className="mega-overview-link"
                        onClick={() => {
                          setActiveDropdown(null);
                          if (currentProductGroup.page && onNavigate) {
                            onNavigate(currentProductGroup.page);
                          } else if (onNavigate) {
                            onNavigate('catalog', currentProductGroup.categoryId);
                          }
                        }}
                        title={`View ${currentProductGroup.title} Overview`}
                      >
                        <span>Overview</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <h3 className="mega-panel-heading">
                      {currentProductGroup.headingPrimary}{' '}
                      <span className="heading-blue-accent">{currentProductGroup.headingAccent}</span>
                    </h3>
                    
                    <p className="mega-panel-desc">{currentProductGroup.overviewDesc}</p>
                  </div>

                  {currentProductGroup.heroImage && (
                    <div className="mega-feature-hero-media">
                      <img 
                        src={currentProductGroup.heroImage} 
                        alt={currentProductGroup.title} 
                        className="mega-hero-img"
                        loading="eager"
                      />
                    </div>
                  )}
                </div>

                {/* 5 Product Cards Grid (Balanced 3 + 2 Layout) */}
                <div className="mega-subservice-cards-grid mega-products-cards-grid">
                  {currentProductGroup.products.map((prod, pIdx) => {
                    const CardIcon = prod.icon || Cpu;
                    return (
                      <div 
                        key={pIdx} 
                        className="mega-subservice-card"
                        onClick={() => {
                          setActiveDropdown(null);
                          if (prod.isCatalogLink) {
                            if (onNavigate) onNavigate('catalog', currentProductGroup.categoryId);
                          } else if (prod.slug) {
                            handleProductClick(prod.slug);
                          } else {
                            if (onNavigate) onNavigate('catalog', currentProductGroup.categoryId);
                          }
                        }}
                        onKeyDown={(e) => handleKeyActivate(e, () => {
                          setActiveDropdown(null);
                          if (prod.isCatalogLink) {
                            if (onNavigate) onNavigate('catalog', currentProductGroup.categoryId);
                          } else if (prod.slug) {
                            handleProductClick(prod.slug);
                          } else {
                            if (onNavigate) onNavigate('catalog', currentProductGroup.categoryId);
                          }
                        })}
                        role="button"
                        tabIndex={0}
                        aria-label={prod.title}
                      >
                        {/* Landscape Image with Overlapping Icon Badge */}
                        <div className="subservice-card-media">
                          <img 
                            src={prod.image || currentProductGroup.heroImage} 
                            alt={prod.title} 
                            className="subservice-card-img"
                            loading="lazy"
                          />
                          <div className="subservice-icon-badge">
                            <CardIcon size={14} />
                          </div>
                        </div>

                        {/* Card Content & Action Button */}
                        <div className="subservice-card-body">
                          <div className="subservice-text-content">
                            <h4 className="subservice-card-title">{prod.title}</h4>
                            <p className="subservice-card-desc">{prod.description}</p>
                          </div>
                          <div className="subservice-arrow-btn" aria-hidden="true">
                            <ArrowRight size={13} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPANY HORIZONTAL DROPDOWN (Dedicated Separate Pages) */}
        {activeDropdown === 'company' && (
          <div 
            className="bright-horizontal-dropdown desktop-only"
            onMouseEnter={() => handleMouseEnterDropdown('company')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <div className="bright-container">
              <div className="horizontal-columns-grid">
                <button
                  type="button"
                  className="horiz-col-item"
                  onClick={(e) => handleNavClick('about', null, e)}
                >
                  <div className="horiz-col-icon-box">
                    <Building2 size={18} />
                  </div>
                  <div className="horiz-col-text">
                    <div className="horiz-col-title">About Us</div>
                    <div className="horiz-col-desc">Our story, values &amp; engineering ethos since 2014</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="horiz-col-item"
                  onClick={(e) => handleNavClick('clients', null, e)}
                >
                  <div className="horiz-col-icon-box">
                    <Users size={18} />
                  </div>
                  <div className="horiz-col-text">
                    <div className="horiz-col-title">Our Clients</div>
                    <div className="horiz-col-desc">100+ prestigious pharma &amp; commercial installations</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="horiz-col-item"
                  onClick={(e) => handleNavClick('careers', null, e)}
                >
                  <div className="horiz-col-icon-box">
                    <Briefcase size={18} />
                  </div>
                  <div className="horiz-col-text">
                    <div className="horiz-col-title">Careers</div>
                    <div className="horiz-col-desc">Explore engineering careers &amp; join our growing team</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="horiz-col-item"
                  onClick={(e) => handleNavClick('blogs', null, e)}
                >
                  <div className="horiz-col-icon-box">
                    <BookOpen size={18} />
                  </div>
                  <div className="horiz-col-text">
                    <div className="horiz-col-title">Blogs</div>
                    <div className="horiz-col-desc">Cleanroom standards, USFDA compliance &amp; notes</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="horiz-col-item horiz-col-contact"
                  onClick={(e) => handleNavClick('contact', null, e)}
                >
                  <div className="horiz-col-icon-box contact-icon-box">
                    <PhoneCall size={18} />
                  </div>
                  <div className="horiz-col-text">
                    <div className="horiz-col-title">Contact Us</div>
                    <div className="horiz-col-desc">Talk to our engineering team in Navi Mumbai</div>
                  </div>
                  <ArrowRight size={14} className="horiz-col-arrow" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Mobile Slide-down Navigation Drawer with Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className="bright-mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              className="bright-mobile-drawer"
              id="hti-mobile-drawer"
              ref={mobileDrawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Accordion Item: Services */}
              <div className="mobile-accordion-group">
                <button
                  className="mobile-accordion-header"
                  onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                  aria-expanded={mobileAccordion === 'services'}
                >
                  <div className="flex-center-gap">
                    <span className="mobile-pill-tag">SERVICES</span>
                    <span className="mobile-accordion-title">Automation & Cleanroom</span>
                  </div>
                  {mobileAccordion === 'services' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {mobileAccordion === 'services' && (
                  <div className="mobile-accordion-body">
                    {serviceGroups.map((g) => (
                      <button
                        key={g.id}
                        className="mobile-service-sublink"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (g.page) {
                            handleNavClick(g.page);
                          } else if (g.section) {
                            handleNavClick('home', g.section);
                          } else {
                            handleCategoryClick(g.category);
                          }
                        }}
                      >
                        <g.icon size={16} style={{ color: g.color }} />
                        <div className="text-left">
                          <div className="mobile-service-title">{g.title}</div>
                          <div className="mobile-service-tagline">{g.tagline}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion Item: Products */}
              <div className="mobile-accordion-group">
                <button
                  className="mobile-accordion-header"
                  onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
                  aria-expanded={mobileAccordion === 'products'}
                >
                  <div className="flex-center-gap">
                    <span className="mobile-pill-tag">PRODUCTS</span>
                    <span className="mobile-accordion-title">5 Categories • {TOTAL_PRODUCT_COUNT} Systems</span>
                  </div>
                  {mobileAccordion === 'products' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {mobileAccordion === 'products' && (
                  <div className="mobile-accordion-body">
                    {productGroups.map((group) => {
                      const Icon = group.icon || Cpu;
                      return (
                        <button
                          key={group.id}
                          className="mobile-service-sublink"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            if (group.page && onNavigate) {
                              onNavigate(group.page);
                            } else if (onNavigate) {
                              onNavigate('catalog', group.categoryId);
                            }
                          }}
                        >
                          <Icon size={16} style={{ color: group.color || '#0284c7' }} />
                          <div className="text-left">
                            <div className="mobile-service-title">{group.title}</div>
                            <div className="mobile-service-tagline">{group.tagline}</div>
                          </div>
                        </button>
                      );
                    })}
                    <button
                      className="mobile-service-sublink"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onNavigate) onNavigate('catalog', 'all');
                      }}
                    >
                      <Layers size={16} style={{ color: '#0284c7' }} />
                      <div className="text-left">
                        <div className="mobile-service-title">View All {TOTAL_PRODUCT_COUNT} Products</div>
                        <div className="mobile-service-tagline">Complete industrial automation & security catalogue.</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion Item: Company */}
              <div className="mobile-accordion-group">
                <button
                  className="mobile-accordion-header"
                  onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
                  aria-expanded={mobileAccordion === 'company'}
                >
                  <div className="flex-center-gap">
                    <span className="mobile-pill-tag">COMPANY</span>
                    <span className="mobile-accordion-title">Company & Clients</span>
                  </div>
                  {mobileAccordion === 'company' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {mobileAccordion === 'company' && (
                  <div className="mobile-accordion-body">
                    <button className="mobile-sublink" onClick={() => { setMobileMenuOpen(false); handleNavClick('about'); }}>
                      About HTI Automation
                    </button>
                    <button className="mobile-sublink" onClick={() => { setMobileMenuOpen(false); handleNavClick('clients'); }}>
                      Our Clients (100+ Pharma & Commercial)
                    </button>
                    <button
                      className="mobile-sublink"
                      onClick={() => { setMobileMenuOpen(false); handleNavClick('careers'); }}
                    >
                      Careers
                    </button>
                    <button className="mobile-sublink" onClick={() => { setMobileMenuOpen(false); handleNavClick('partners'); }}>
                      Technology Partners
                    </button>
                    <button className="mobile-sublink" onClick={() => { setMobileMenuOpen(false); handleNavClick('blogs'); }}>
                      Blogs
                    </button>
                    <button className="mobile-sublink font-semibold text-primary" onClick={() => { setMobileMenuOpen(false); handleNavClick('contact'); }}>
                      Contact Us
                    </button>
                  </div>
                )}
              </div>

              {/* Brochure Direct Link */}
              <button
                className="mobile-direct-link"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleDownloadBrochure(e);
                }}
              >
                <div className="flex-center-gap">
                  <Download size={16} className="text-cyan" />
                  <span>Download Product Brochure</span>
                </div>
                <ArrowRight size={16} />
              </button>

              {/* Primary CTA - Request a Quote */}
              <button
                className="mobile-cta-primary"
                onClick={() => { setMobileMenuOpen(false); handleNavClick('contact'); }}
                type="button"
              >
                <PhoneCall size={16} />
                <span>Request a Technical Quote</span>
                <ArrowRight size={16} />
              </button>

              {/* Mobile CTAs */}
              <div className="mobile-drawer-footer">

                <button
                  className="bright-admin-btn w-full justify-center py-3"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  type="button"
                >
                  <User size={17} />
                  <span>Open Admin Portal</span>
                  {inquiryCount > 0 && (
                    <span className="admin-badge-count">{inquiryCount}</span>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
