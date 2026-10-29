import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Download,
  Sun,
  Moon,
  Search,
  Monitor,
  Settings,
  Cpu,
  Lock,
  ShieldCheck,
  Flame,
  FlaskConical,
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
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  FileText,
  DoorClosed,
  SlidersHorizontal,
  Layers,
  Truck,
  Droplets,
  Volume2,
  Camera,
  Fingerprint,
  Server,
  Bell,
  Radio
} from 'lucide-react';
import { TOTAL_PRODUCT_COUNT } from '../data/productCatalogueData';

// Custom precision SVG for Traffic & Perimeter Barrier matching reference aesthetic
function TrafficBarrierIcon({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="10" width="3.5" height="11" rx="0.8" />
      <line x1="2" y1="21" x2="9.5" y2="21" />
      <circle cx="5.25" cy="11.5" r="1.5" />
      <path d="M6.75 11.5L21.5 5.5" strokeWidth="2.4" />
      <line x1="11.5" y1="8.5" x2="11.5" y2="11.5" strokeWidth="1.8" />
      <line x1="16.5" y1="6.8" x2="16.5" y2="9.8" strokeWidth="1.8" />
    </svg>
  );
}

// Custom precision SVG for Surveillance Camera matching reference aesthetic
function SurveillanceCameraIcon({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 19h4" />
      <path d="M4 19v-5" />
      <path d="M4 14l3.5-2" />
      <path d="M6 8.5l11-4.5 4 6-11 4.5z" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

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
  const [openMenu, setOpenMenu] = useState(null); // 'products-services' | 'company' | null
  const activeDropdown = openMenu;
  const setActiveDropdown = setOpenMenu;
  // Tracks whether the open panel was opened by a click. A hover-opened panel
  // must NOT be closed by the subsequent click of the same nav button.
  const [openedByClick, setOpenedByClick] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [mobileCategoryGroup, setMobileCategoryGroup] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ left: 160, caretX: 180 });

  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const navBarRef = useRef(null);
  const productsServicesTriggerRef = useRef(null);
  const companyTriggerRef = useRef(null);
  const justClosedByEscRef = useRef(false);

  // Dynamically position dropdown panel and its pointer caret aligned with active trigger button
  useEffect(() => {
    if (!activeDropdown || activeDropdown !== 'products-services') return;

    const updatePosition = () => {
      const triggerEl = productsServicesTriggerRef.current;
      const navEl = navBarRef.current;
      if (!triggerEl || !navEl) return;

      const triggerRect = triggerEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;

      const panelWidth = Math.min(880, window.innerWidth - 32);
      let left = triggerCenterX - 180;
      if (left < 16) left = 16;
      if (left + panelWidth > window.innerWidth - 16) {
        left = window.innerWidth - panelWidth - 16;
      }

      const caretX = triggerCenterX - left;
      setDropdownPos({ left: left - navRect.left, caretX });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [activeDropdown]);

  // The header height changes with the logo size, the scroll state and the
  // breakpoint. Measure it so the mobile drawer/backdrop always start exactly
  // under the header instead of overlapping it.
  const [navHeight, setNavHeight] = useState(81);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return undefined;

    const update = () => {
      const height = Math.round(el.getBoundingClientRect().height);
      setNavHeight(height);
      document.documentElement.style.setProperty('--header-height', `${height}px`);
      document.documentElement.style.setProperty('--hti-nav-h', `${height}px`);
    };
    update();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update);
      ro.observe(el);
    }
    window.addEventListener('resize', update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const handleMouseEnterDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (name === 'products-services') {
      // Default to Pharma Cleanroom (index 0) if not set
      setSelectedCategoryIndex((prev) => (prev >= 0 && prev < 5 ? prev : 0));
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
    if (justClosedByEscRef.current) {
      return;
    }
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (name === 'products-services') {
      setSelectedCategoryIndex((prev) => (prev >= 0 && prev < 5 ? prev : 0));
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

  // Close open dropdown or mobile drawer on route change
  useEffect(() => {
    setOpenMenu(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
  }, [currentPage]);

  // DESKTOP (>1024px): close on scroll > 10px from where menu opened, click outside, focus outside
  useEffect(() => {
    if (!openMenu) return;

    const initialScrollY = window.scrollY;

    const handleScroll = (e) => {
      if (window.innerWidth <= 1024) return;
      // Ignore scroll events originating inside the open menu panel
      if (e.target && e.target !== document && e.target !== window) {
        if (navRef.current && navRef.current.contains(e.target)) {
          return;
        }
      }
      if (Math.abs(window.scrollY - initialScrollY) > 10) {
        setOpenMenu(null);
        setOpenedByClick(false);
      }
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setOpenedByClick(false);
      }
    };

    const handleFocusIn = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setOpenedByClick(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [openMenu]);

  // Esc key closes open dropdown and/or mobile drawer, and restores focus without reopening
  useEffect(() => {
    if (!openMenu && !mobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (openMenu) {
          const menuToClose = openMenu;
          justClosedByEscRef.current = true;
          setOpenMenu(null);
          setOpenedByClick(false);
          if (menuToClose === 'products-services' && productsServicesTriggerRef.current) {
            productsServicesTriggerRef.current.focus();
          } else if (menuToClose === 'company' && companyTriggerRef.current) {
            companyTriggerRef.current.focus();
          }
          requestAnimationFrame(() => {
            justClosedByEscRef.current = false;
          });
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openMenu, mobileMenuOpen]);

  // MOBILE / TABLET (<=1024px): Lock background scroll without layout shift
  useEffect(() => {
    const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth <= 1024;
    const isLocked = mobileMenuOpen || (openMenu !== null && isMobileOrTablet);

    if (isLocked) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const prevOverflow = document.body.style.overflow;
      const prevPaddingRight = document.body.style.paddingRight;

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('mobile-menu-active');

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPaddingRight;
        document.documentElement.classList.remove('mobile-menu-active');
      };
    }
  }, [mobileMenuOpen, openMenu, currentPage]);

  // Focus first focusable element in drawer ONLY when mobileMenuOpen changes to true (stops focus-steal on accordion changes)
  useEffect(() => {
    if (mobileMenuOpen && mobileDrawerRef.current) {
      const firstFocusable = mobileDrawerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) firstFocusable.focus();
    }
  }, [mobileMenuOpen]);

  // Return focus to the hamburger button when the drawer closes.
  const wasMobileMenuOpenRef = useRef(false);
  useEffect(() => {
    if (mobileMenuOpen) {
      wasMobileMenuOpenRef.current = true;
      return;
    }
    if (wasMobileMenuOpenRef.current) {
      wasMobileMenuOpenRef.current = false;
      if (mobileToggleRef.current) mobileToggleRef.current.focus();
    }
  }, [mobileMenuOpen]);

  // Which top-level section the current route belongs to
  const activeSection = (() => {
    const p = (currentPage || '').toLowerCase();
    if ([
      'automation', 'access-automation', 'security-systems', 'cleanroom-interlocks',
      'perimeter-defense', 'fire-protection', 'hygiene', 'server-room-monitoring',
      'catalog', 'product',
      'touchless-entry', 'perimeter-gate', 'trackless-gate', 'rapid-airlock',
      'logistics-bridge', 'heavy-security'
    ].includes(p)) return 'products-services';
    if (['about', 'clients', 'partners', 'blogs', 'careers', 'contact'].includes(p)) return 'company';
    return null;
  })();

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
    } else if (page === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryNavigation = (pageKey) => {
    setActiveDropdown(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
    if (!pageKey) return;
    if (onNavigate) {
      onNavigate(pageKey);
    }
  };

  // Keyboard activation for elements rendered as `role="button"` or `role="tab"`
  const handleKeyActivate = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      callback();
    }
  };

  const handleSubProductClick = (item) => {
    setActiveDropdown(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
    if (!item || !item.slug) return;

    // Dedicated special pages check
    const dedicatedSpecialPages = [
      'touchless-entry',
      'perimeter-gate',
      'trackless-gate',
      'rapid-airlock',
      'logistics-bridge',
      'heavy-security'
    ];

    if (dedicatedSpecialPages.includes(item.slug)) {
      if (onNavigate) onNavigate(item.slug);
      return;
    }

    if (item.routeType === 'service') {
      if (onNavigate) onNavigate(item.slug);
      return;
    }

    if (onNavigate) {
      onNavigate('product', item.slug);
    }
  };

  const toggleDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    if (name === 'products-services') {
      setSelectedCategoryIndex((prev) => (prev >= 0 && prev < 5 ? prev : 0));
    }
    if (activeDropdown === name && openedByClick) {
      setActiveDropdown(null);
      setOpenedByClick(false);
    } else {
      setActiveDropdown(name);
      setOpenedByClick(true);
    }
  };

  // =========================================================================
  // EXACT FIVE MAIN CATEGORIES IN REQUESTED ORDER WITH ALL EXISTING SUB-PRODUCTS
  // 1. Pharma Cleanroom
  // 2. Fire and Life Safety
  // 3. Access Automation
  // 4. Traffic & Perimeter
  // 5. Surveillance & Alerts
  // =========================================================================
  const productsServicesCategories = [
    {
      id: 'pharma-cleanroom',
      title: 'Pharma Cleanroom',
      icon: FlaskConical,
      page: 'cleanroom-interlocks',
      tagline: 'USFDA 21 CFR Part 11 compliant sterile airlock logic & cleanroom doors',
      items: [
        {
          title: 'Door Interlock System (2-8 Door)',
          slug: 'door-interlock-systems',
          routeType: 'product',
          desc: 'USFDA 21 CFR Part 11 compliant 2–8 door airlock logic',
          image: '/products/cleanroom-interlocks.jpg'
        },
        {
          title: 'Dynamic & Static Pass Boxes',
          slug: 'pass-box-systems',
          routeType: 'product',
          desc: 'Contamination-free material transfer with UV-C sterilization',
          image: '/products/pass-box-system.jpg'
        },
        {
          title: 'Digital Master GPS Slave Clocks',
          slug: 'digital-gps-clocks',
          routeType: 'product',
          desc: 'GPS master-slave pharma batch time synchronization',
          image: '/products/digital-clock-hero.jpg'
        },
        {
          title: 'Cold Storage & Chiller Doors',
          slug: 'chiller-clean-room-doors',
          routeType: 'product',
          desc: 'Hermetically sealed insulated doors for cold rooms',
          image: '/products/chiller-door-hero.jpg'
        },
        {
          title: 'Hermetically Sealed Cleanroom Doors',
          slug: 'hermetic-cleanroom-doors',
          routeType: 'product',
          desc: 'Flush doors maintaining differential pressure cascades',
          image: '/products/cleanroom-door-pharma.jpg'
        },
        {
          title: 'Acoustic Sound Doors',
          slug: 'acoustic-sound-doors',
          routeType: 'service',
          desc: 'Certified noise transmission loss up to 52 dB',
          image: '/services/service-acoustic-sound-doors.jpg'
        },
        {
          title: 'Safety Override Buzzers',
          slug: 'safety-override-buzzers',
          routeType: 'service',
          desc: 'Instant lock release & high-visibility alerts on fire trip',
          image: '/services/service-safety-override-buzzers.jpg'
        }
      ]
    },
    {
      id: 'fire-life-safety',
      title: 'Fire and Life Safety',
      icon: Flame,
      page: 'fire-protection',
      tagline: 'Multi-loop addressable fire alarms, turnkey sprinkler networks & certified fire doors',
      items: [
        {
          title: 'Addressable Fire Alarm Systems',
          slug: 'addressable-fire-alarms',
          routeType: 'service',
          desc: 'Multi-loop addressable smoke & thermal sensor networks',
          image: '/products/fire-alarm-system.jpg'
        },
        {
          title: 'Industrial Fire Hydrant & Sprinklers',
          slug: 'hydrant-sprinkler-arrays',
          routeType: 'service',
          desc: 'High-pressure hydrant valves, sprinkler grids & pump skids',
          image: '/case-studies/case-fire-hydrant.jpg'
        },
        {
          title: 'Fire Rated Steel Doors & Shutters',
          slug: 'fire-rated-doors-shutters',
          routeType: 'service',
          desc: 'Certified 120/240 minute fire containment barriers',
          image: '/products/fire-rated-steel-doors.jpg'
        },
        {
          title: 'Public Address & Voice Evacuation',
          slug: 'public-address-system',
          routeType: 'service',
          desc: 'EN 54-16 zoned audio broadcast & emergency paging',
          image: '/products/public-address-evac.jpg'
        },
        {
          title: 'Gas Leak Detection Systems',
          slug: 'gas-leak-detection',
          routeType: 'service',
          desc: 'Flameproof transmitters for toxic, combustible & VOC gases',
          image: '/services/service-gas-leak-detector.jpg'
        },
        {
          title: 'Clean Agent Gas Suppression',
          slug: 'clean-agent-gas-suppression',
          routeType: 'service',
          desc: 'Total flooding clean agent protection for server rooms',
          image: '/services/service-gas-leak-detector.jpg'
        },
        {
          title: 'Emergency Auto Trip & Interlocks',
          slug: 'emergency-auto-trip',
          routeType: 'service',
          desc: 'Fail-safe relay integration releasing doors on fire trip',
          image: '/services/service-emergency-trip.jpg'
        }
      ]
    },
    {
      id: 'access-automation',
      title: 'Access Automation',
      icon: Cpu,
      page: 'automation',
      tagline: 'Touchless pedestrian entry, motorized security gates & high-speed barriers',
      items: [
        {
          title: 'Automatic Sliding & Swing Doors',
          slug: 'automatic-sliding-swing-doors',
          routeType: 'product',
          desc: 'Touchless microwave radar entry for commercial lobbies',
          image: '/products/automatic-doors.jpg'
        },
        {
          title: 'Automatic Sliding & Swing Gates',
          slug: 'automatic-sliding-swing-gates',
          routeType: 'product',
          desc: 'Rugged motorized perimeter security entrance gates',
          image: '/services/services-perimeter-gate.jpg'
        },
        {
          title: 'Telescopic & Cantilever Gates',
          slug: 'telescopic-cantilever-gates',
          routeType: 'product',
          desc: 'Trackless and space-saving gates for wide openings',
          image: '/services/services-trackless-gate.jpg'
        },
        {
          title: 'PVC High Speed Roll Up Doors',
          slug: 'high-speed-roll-up-doors',
          routeType: 'product',
          desc: 'Fast-action flexible curtains preserving conditioned air',
          image: '/products/rapid-doors.jpg'
        },
        {
          title: 'Motorized Industrial Rolling Shutters',
          slug: 'motorized-industrial-rolling-shutters',
          routeType: 'product',
          desc: 'Heavy-gauge galvanized steel security bay protection',
          image: '/services/services-heavy-security.jpg'
        },
        {
          title: 'Sectional Overhead Doors',
          slug: 'sectional-overhead-doors',
          routeType: 'product',
          desc: 'Double-walled insulated panels maximizing dock space',
          image: '/services/service-sectional-doors.jpg'
        },
        {
          title: 'Dock Levellers & Shelters',
          slug: 'dock-levellers-dock-shelters',
          routeType: 'product',
          desc: 'Electro-hydraulic loading bridges for logistics warehouses',
          image: '/services/services-logistics-bridge.jpg'
        }
      ]
    },
    {
      id: 'traffic-perimeter',
      title: 'Traffic & Perimeter',
      icon: TrafficBarrierIcon,
      page: 'perimeter-defense',
      tagline: 'Electro-hydraulic boom barriers, optical turnstiles & anti-ram bollards',
      items: [
        {
          title: 'Electro-Hydraulic Boom Barriers',
          slug: 'boom-barriers',
          routeType: 'product',
          desc: 'High-frequency corporate parking & toll plaza barriers',
          image: '/products/boom-barriers.jpg'
        },
        {
          title: 'Optical Speed Flap Turnstiles',
          slug: 'optical-flap-turnstiles',
          routeType: 'product',
          desc: 'High-throughput pedestrian speed gates with biometric sync',
          image: '/hero-glass-atrium.jpg'
        },
        {
          title: 'Anti-Ram Crash Bollards & Tyre Killers',
          slug: 'hydraulic-crash-bollards',
          routeType: 'product',
          desc: 'K4/K8/K12 rising hydraulic bollards & tyre spike barriers',
          image: '/services/service-bollards-blockers.jpg'
        },
        {
          title: 'Hydraulic Car Lift Systems',
          slug: 'car-lift-systems',
          routeType: 'service',
          desc: 'Heavy hydraulic multi-tier scissor vehicle elevators',
          image: '/services/service-car-lift-systems.jpg'
        },
        {
          title: 'Parking Management Systems',
          slug: 'parking-management-systems',
          routeType: 'service',
          desc: 'Automated FASTag guidance, ticket billing & bay sensors',
          image: '/services/service-parking-management.jpg'
        },
        {
          title: 'Visitor Management Systems',
          slug: 'visitor-management-system',
          routeType: 'service',
          desc: 'Digital touchless visitor screening & thermal QR badge print',
          image: '/services/service-visitor-management.jpg'
        }
      ]
    },
    {
      id: 'surveillance-alerts',
      title: 'Surveillance & Alerts',
      icon: SurveillanceCameraIcon,
      page: 'security-systems',
      tagline: '4K AI IP surveillance, biometric face access & server room telemetry',
      items: [
        {
          title: 'CCTV Surveillance (Analogue & IP 4K)',
          slug: 'cctv-surveillance-system',
          routeType: 'product',
          desc: 'Ultra-HD AI analytics, Starlight color optics & PTZ domes',
          image: '/products/cctv-ip-4k-surveillance.jpg'
        },
        {
          title: 'Biometric Attendance & Access Terminals',
          slug: 'biometric-access-attendance',
          routeType: 'product',
          desc: 'Contactless face verification, optical fingerprint & RFID',
          image: '/cctv-featured-biometric.jpg'
        },
        {
          title: 'IP Video Door Phones & Intercom',
          slug: 'video-door-phones',
          routeType: 'service',
          desc: 'Full HD door stations with capacitive color touchscreens',
          image: '/services/service-video-door-phones.jpg'
        },
        {
          title: 'Central VMS Command & Video Walls',
          slug: 'central-vms-command',
          routeType: 'service',
          desc: 'Enterprise VMS command with multi-site wall decoders',
          image: '/hero-security-command-center.jpg'
        },
        {
          title: 'Server Room Environment Telemetry',
          slug: 'server-room-monitoring',
          routeType: 'product',
          desc: '24/7 tracking of rack temperatures, humidity & power health',
          image: '/products/server-room-telemetry.jpg'
        },
        {
          title: 'Microprocessor Alarm Annunciators',
          slug: 'alarm-annunciators',
          routeType: 'product',
          desc: 'ISA-18.1 LED window annunciators for industrial machinery',
          image: '/products/alarm-annunciators-panel.jpg'
        },
        {
          title: 'Thermal Imaging & Perimeter Beams',
          slug: 'thermal-perimeter-beams',
          routeType: 'service',
          desc: 'Active infrared multi-beam perimeter fence sensors',
          image: '/cctv-featured-barrier.jpg'
        },
        {
          title: 'Wireless Intrusion Detection Systems',
          slug: 'wireless-intrusion-detection',
          routeType: 'product',
          desc: 'Multi-zone burglar alarm panels & outdoor deterrent sirens',
          image: '/products/wireless-intrusion-detection.jpg'
        },
        {
          title: 'Underfloor Water Leak Detection',
          slug: 'water-leak-detection-systems',
          routeType: 'service',
          desc: 'Conductive sensor ropes with meter-accurate location',
          image: '/services/service-water-leak-detection.jpg'
        }
      ]
    }
  ];

  const currentCategory = productsServicesCategories[selectedCategoryIndex] || productsServicesCategories[0];

  const handleDownloadBrochure = (e) => {
    e.preventDefault();
    setActiveDropdown(null);
    // Smooth scroll to contact or open inquiry with prefill
    handleNavClick('home', 'contact');
  };

  return (
    <header className="navbar-wrapper" ref={navRef} style={{ '--hti-nav-h': `${navHeight}px` }}>
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
      <nav className={`bright-main-nav ${isScrolled ? 'nav-scrolled' : ''}`} aria-label="Main navigation" ref={navBarRef}>
        {/* Full-bleed veil behind an open mega panel so page content never
            peeks out from behind it. Sits below the nav bar (z-index 10001). */}
        {activeDropdown === 'products-services' && (
          <div
            className="mega-panel-veil"
            onClick={() => { setActiveDropdown(null); setOpenedByClick(false); }}
            aria-hidden="true"
          />
        )}

        <div className="bright-container main-nav-inner">
          {/* Logo Section with HTI Brand Identity */}
          <a
            href="/"
            className="bright-brand"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
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
                <span>&amp; SECURITY SYSTEMS</span>
                <span className="brand-badge-pill">PVT. LTD.</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="bright-nav-links desktop-only">
            {/* Unified Products & Services Mega Menu Trigger */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnterDropdown('products-services')}
              onMouseLeave={handleMouseLeaveDropdown}
              onFocus={() => handleFocusDropdown('products-services')}
            >
              <button
                ref={productsServicesTriggerRef}
                className={`bright-nav-btn ${activeDropdown === 'products-services' ? 'services-pill-btn is-active-pill' : ''} ${activeSection === 'products-services' && activeDropdown !== 'company' ? 'is-active-section' : ''}`}
                onClick={() => toggleDropdown('products-services')}
                aria-expanded={activeDropdown === 'products-services'}
                aria-haspopup="true"
                aria-current={activeSection === 'products-services' ? 'page' : undefined}
              >
                <span>Products &amp; Services</span>
                <ChevronDown size={15} className={activeDropdown === 'products-services' ? 'pill-chevron' : 'dropdown-arrow'} />
              </button>
            </div>

            {/* Company Dropdown (Horizontal - exactly like Brightlant design) */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnterDropdown('company')}
              onMouseLeave={handleMouseLeaveDropdown}
              onFocus={() => handleFocusDropdown('company')}
            >
              <button
                ref={companyTriggerRef}
                className={`bright-nav-btn ${activeDropdown === 'company' ? 'services-pill-btn is-active-pill' : ''} ${activeSection === 'company' ? 'is-active-section' : ''}`}
                onClick={() => toggleDropdown('company')}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
                aria-current={activeSection === 'company' ? 'page' : undefined}
              >
                <span>Company</span>
                <ChevronDown size={14} className={activeDropdown === 'company' ? 'pill-chevron' : 'dropdown-arrow'} />
              </button>
            </div>

            {/* Brochure Link with Download Icon */}
            <button
              className="bright-nav-btn brochure-btn"
              onClick={handleDownloadBrochure}
              title="Download Company Brochure PDF"
              type="button"
            >
              <Download size={14} className="brochure-icon" />
              <span>Brochure</span>
              <span className="brochure-shimmer" aria-hidden="true"></span>
            </button>
          </div>

          {/* Right Action Group: Get a Quote CTA + Search + Theme Toggle + Admin Portal */}
          <div className="bright-nav-actions desktop-only">
            {/* Direct Get a Quote CTA Button matching Reference Image */}
            <button
              className="bright-nav-quote-btn"
              onClick={() => handleNavClick('contact')}
              title="Request a Technical Proposal &amp; Quote"
              type="button"
              id="nav-get-a-quote-btn"
            >
              <span>Get a Quote</span>
              <ArrowRight size={14} className="nav-quote-arrow-icon" />
            </button>

            {/* Search Icon Button */}
            <button
              className="bright-nav-search-btn"
              onClick={() => handleNavClick('catalog', 'all')}
              title="Search Products &amp; Systems"
              aria-label="Search Products &amp; Systems"
              type="button"
            >
              <Search size={19} />
            </button>

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
              title="Open Admin Portal (CMS &amp; Inquiries)"
              aria-label="Admin Portal"
            >
              <User size={18} />
            </button>
          </div>

          {/* Mobile Actions: Theme Toggle Pill + Circular Menu/Close Toggle */}
          <div className="bright-mobile-actions mobile-only">
            <button
              type="button"
              className="bright-mobile-theme-pill"
              onClick={() => {
                const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
                if (onThemeChange) onThemeChange(nextTheme);
              }}
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {resolvedTheme === 'dark' ? (
                <Moon size={16} className="mobile-theme-icon" />
              ) : (
                <Sun size={16} className="mobile-theme-icon" />
              )}
            </button>

            <button
              type="button"
              className={`bright-mobile-circle-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              ref={mobileToggleRef}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* =========================================================================
            PRODUCTS & SERVICES MEGA MENU (Exact 5 Categories with Right Sub-Products)
            ========================================================================= */}
        {activeDropdown === 'products-services' && (
          <div
            className="hti-dropdown-wrapper"
            style={{ left: `${dropdownPos.left}px` }}
            onMouseEnter={() => handleMouseEnterDropdown('products-services')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            {/* Pointer triangle caret pointing to the Products & Services button */}
            <div className="hti-dropdown-caret" style={{ left: `${dropdownPos.caretX}px` }} />

            <div className="hti-dropdown-panel">
              {/* LEFT COLUMN: 5 MAIN CATEGORIES IN EXACT ORDER */}
              <div className="hti-dropdown-left-col">
                <div className="hti-dropdown-col-header">
                  <span className="hti-dropdown-col-title">MAIN CATEGORIES</span>
                  <div className="hti-dropdown-blue-line" />
                </div>

                <div className="hti-category-list" role="tablist" aria-label="Product and Service Categories">
                  {productsServicesCategories.map((group, index) => {
                    const Icon = group.icon;
                    const isSelected = selectedCategoryIndex === index;
                    return (
                      <div
                        key={group.id}
                        className={`hti-category-row ${isSelected ? 'is-active' : ''}`}
                        onMouseEnter={() => setSelectedCategoryIndex(index)}
                        onClick={() => handleCategoryNavigation(group.page)}
                        onKeyDown={(e) => handleKeyActivate(e, () => handleCategoryNavigation(group.page))}
                        role="tab"
                        aria-selected={isSelected}
                        tabIndex={0}
                        aria-label={group.title}
                      >
                        <div className="hti-category-row-left">
                          <div className="hti-category-icon-wrap">
                            <Icon size={20} className="hti-category-icon" />
                          </div>
                          <span className="hti-category-name">{group.title}</span>
                        </div>
                        <ChevronRight size={16} className="hti-category-chevron" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: DYNAMIC EXISTING SUB-PRODUCTS */}
              <div className="hti-dropdown-right-col" role="tabpanel" aria-label={`${currentCategory.title} sub-products`}>
                <div className="hti-dropdown-header-row">
                  <div className="hti-dropdown-col-header" style={{ marginBottom: 0 }}>
                    <span className="hti-dropdown-col-title">{currentCategory.title.toUpperCase()}</span>
                    <div className="hti-dropdown-blue-line" />
                  </div>

                  <button
                    type="button"
                    className="hti-explore-category-link"
                    onClick={() => handleCategoryNavigation(currentCategory.page)}
                    title={`View dedicated ${currentCategory.title} page`}
                  >
                    <span>View Division Overview</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="hti-subproducts-grid">
                  {currentCategory.items.map((item, pIdx) => (
                    <div
                      key={item.slug || pIdx}
                      className="hti-subproduct-card"
                      onClick={() => handleSubProductClick(item)}
                      onKeyDown={(e) => handleKeyActivate(e, () => handleSubProductClick(item))}
                      role="button"
                      tabIndex={0}
                      aria-label={item.title}
                    >
                      {item.image && (
                        <div className="hti-subproduct-thumb-wrap">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="hti-subproduct-thumb"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="hti-subproduct-text">
                        <span className="hti-subproduct-title">{item.title}</span>
                        {item.desc && (
                          <span className="hti-subproduct-desc">{item.desc}</span>
                        )}
                      </div>
                      <ChevronRight size={15} className="hti-subproduct-arrow" />
                    </div>
                  ))}
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="bright-mobile-drawer mobile-menu-drawer"
            id="mobile-menu-drawer"
            ref={mobileDrawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Accordion Item: Products & Services */}
            <div className="mobile-accordion-group">
              <button
                className={`mobile-accordion-header ${activeSection === 'products-services' ? 'is-active-section' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'products-services' ? null : 'products-services')}
                aria-expanded={mobileAccordion === 'products-services'}
                aria-current={activeSection === 'products-services' ? 'page' : undefined}
              >
                <span className="mobile-accordion-heading">
                  <span className="mobile-accordion-title">Products &amp; Services</span>
                  <span className="mobile-accordion-count" aria-hidden="true">{productsServicesCategories.length}</span>
                </span>
                {mobileAccordion === 'products-services' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {mobileAccordion === 'products-services' && (
                <div className="mobile-accordion-body">
                  {productsServicesCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    const isCatExpanded = mobileCategoryGroup === cat.id;
                    return (
                      <div key={cat.id} className={`mobile-product-group-block ${isCatExpanded ? 'is-expanded' : ''}`}>
                        <button
                          className="mobile-product-group-header"
                          onClick={() => setMobileCategoryGroup(isCatExpanded ? null : cat.id)}
                          aria-expanded={isCatExpanded}
                        >
                          <div className="mobile-product-group-info">
                            <div className="mobile-product-group-icon">
                              <CatIcon size={16} />
                            </div>
                            <span className="mobile-clean-title">{cat.title}</span>
                          </div>
                          {isCatExpanded ? <ChevronUp size={16} className="mobile-clean-arrow" /> : <ChevronDown size={16} className="mobile-clean-arrow" />}
                        </button>

                        {isCatExpanded && (
                          <div className="mobile-product-sublist">
                            <button
                              className="mobile-product-overview-btn"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                handleCategoryNavigation(cat.page);
                              }}
                            >
                              <span>Explore All: {cat.title}</span>
                              <ArrowRight size={13} />
                            </button>

                            {cat.items.map((sub, sIdx) => (
                              <button
                                key={sIdx}
                                className="mobile-clean-sublink"
                                onClick={() => handleSubProductClick(sub)}
                              >
                                <span className="mobile-clean-title">{sub.title}</span>
                                <ChevronRight size={15} className="mobile-clean-arrow" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <button
                    className="mobile-clean-sublink mobile-clean-all"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onNavigate) onNavigate('catalog', 'all');
                    }}
                  >
                    <span className="mobile-clean-title">View All Products Catalog</span>
                    <ArrowRight size={16} className="mobile-clean-arrow" />
                  </button>
                </div>
              )}
            </div>

            {/* Accordion Item: Company */}
            <div className="mobile-accordion-group">
              <button
                className={`mobile-accordion-header ${activeSection === 'company' ? 'is-active-section' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
                aria-expanded={mobileAccordion === 'company'}
                aria-current={activeSection === 'company' ? 'page' : undefined}
              >
                <span className="mobile-accordion-heading">
                  <span className="mobile-accordion-title">Company</span>
                  <span className="mobile-accordion-count" aria-hidden="true">5</span>
                </span>
                {mobileAccordion === 'company' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {mobileAccordion === 'company' && (
                <div className="mobile-accordion-body mobile-company-cards-body">
                  <button
                    type="button"
                    className={`mobile-company-card ${currentPage === 'about' ? 'is-active' : ''}`}
                    onClick={() => { setMobileMenuOpen(false); handleNavClick('about'); }}
                  >
                    <div className="mobile-company-card-icon">
                      <Building2 size={18} />
                    </div>
                    <div className="mobile-company-card-content">
                      <div className="mobile-company-card-title">About Us</div>
                      <div className="mobile-company-card-desc">Our story, values &amp; engineering ethos since 2014</div>
                    </div>
                    <ChevronRight size={16} className="mobile-company-card-arrow" />
                  </button>

                  <button
                    type="button"
                    className={`mobile-company-card ${currentPage === 'clients' ? 'is-active' : ''}`}
                    onClick={() => { setMobileMenuOpen(false); handleNavClick('clients'); }}
                  >
                    <div className="mobile-company-card-icon">
                      <Users size={18} />
                    </div>
                    <div className="mobile-company-card-content">
                      <div className="mobile-company-card-title">Our Clients</div>
                      <div className="mobile-company-card-desc">100+ prestigious pharma &amp; commercial installations</div>
                    </div>
                    <ChevronRight size={16} className="mobile-company-card-arrow" />
                  </button>

                  <button
                    type="button"
                    className={`mobile-company-card ${currentPage === 'careers' ? 'is-active' : ''}`}
                    onClick={() => { setMobileMenuOpen(false); handleNavClick('careers'); }}
                  >
                    <div className="mobile-company-card-icon">
                      <Briefcase size={18} />
                    </div>
                    <div className="mobile-company-card-content">
                      <div className="mobile-company-card-title">Careers</div>
                      <div className="mobile-company-card-desc">Explore engineering careers &amp; join our growing team</div>
                    </div>
                    <ChevronRight size={16} className="mobile-company-card-arrow" />
                  </button>

                  <button
                    type="button"
                    className={`mobile-company-card ${currentPage === 'blogs' ? 'is-active' : ''}`}
                    onClick={() => { setMobileMenuOpen(false); handleNavClick('blogs'); }}
                  >
                    <div className="mobile-company-card-icon">
                      <BookOpen size={18} />
                    </div>
                    <div className="mobile-company-card-content">
                      <div className="mobile-company-card-title">Blogs</div>
                      <div className="mobile-company-card-desc">Cleanroom standards, USFDA compliance &amp; notes</div>
                    </div>
                    <ChevronRight size={16} className="mobile-company-card-arrow" />
                  </button>

                  <button
                    type="button"
                    className={`mobile-company-card mobile-company-card-contact ${currentPage === 'contact' ? 'is-active' : ''}`}
                    onClick={() => { setMobileMenuOpen(false); handleNavClick('contact'); }}
                  >
                    <div className="mobile-company-card-icon contact-icon-box">
                      <PhoneCall size={18} />
                    </div>
                    <div className="mobile-company-card-content">
                      <div className="mobile-company-card-title">Contact Us</div>
                      <div className="mobile-company-card-desc">Talk to our engineering team in Navi Mumbai</div>
                    </div>
                    <ArrowRight size={16} className="mobile-company-card-arrow" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Action Area - pinned to bottom */}
            <div className="mobile-drawer-footer">
              {/* Compact Brochure Row */}
              <button
                className="mobile-brochure-row"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleDownloadBrochure(e);
                }}
                type="button"
                aria-label="Request the HTI product brochure PDF"
              >
                <span className="mobile-brochure-icon">
                  <FileText size={16} />
                </span>
                <span className="mobile-brochure-heading">Product Brochure</span>
                <span className="mobile-brochure-pill">
                  <Download size={12} />
                  PDF
                </span>
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

              {/* Secondary CTA - the proposal form on the home page */}
              <button
                className="mobile-consultation-btn"
                onClick={() => { setMobileMenuOpen(false); handleNavClick('home', 'insights-and-quote'); }}
                type="button"
              >
                <Sparkles size={15} />
                <span>Get Free Consultation</span>
              </button>

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
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}