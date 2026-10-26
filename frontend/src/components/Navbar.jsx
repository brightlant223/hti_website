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

// Custom precision SVG for Traffic & Perimeter Barrier matching uploaded reference image
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

// Custom precision SVG for Surveillance Camera matching uploaded reference image
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
  const [openMenu, setOpenMenu] = useState(null); // 'services' | 'products' | 'company' | null
  const activeDropdown = openMenu;
  const setActiveDropdown = setOpenMenu;
  // Tracks whether the open panel was opened by a click. A hover-opened panel
  // must NOT be closed by the subsequent click of the same nav button.
  const [openedByClick, setOpenedByClick] = useState(false);
  const [selectedServiceGroup, setSelectedServiceGroup] = useState(0);
  const [selectedProductGroup, setSelectedProductGroup] = useState(0);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const [mobileServiceGroup, setMobileServiceGroup] = useState(null);
  const [mobileProductGroup, setMobileProductGroup] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ left: 160, caretX: 180 });

  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const navBarRef = useRef(null);
  const servicesTriggerRef = useRef(null);
  const productsTriggerRef = useRef(null);
  const companyTriggerRef = useRef(null);
  const justClosedByEscRef = useRef(false);

  // Dynamically position dropdown panel and its pointer caret aligned with active trigger button
  useEffect(() => {
    if (!activeDropdown || (activeDropdown !== 'services' && activeDropdown !== 'products')) return;

    const updatePosition = () => {
      const triggerEl = activeDropdown === 'services' ? servicesTriggerRef.current : productsTriggerRef.current;
      const navEl = navBarRef.current;
      if (!triggerEl || !navEl) return;

      const triggerRect = triggerEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;

      const panelWidth = Math.min(800, window.innerWidth - 32);
      // In reference screenshot, the dropdown starts roughly under the HTI logo's right half, so triggerCenter is ~175px from panel left
      let left = triggerCenterX - 175;
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

  // STEP 2: ONE SHARED EFFECT for openMenu !== null
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
          if (menuToClose === 'services' && servicesTriggerRef.current) {
            servicesTriggerRef.current.focus();
          } else if (menuToClose === 'products' && productsTriggerRef.current) {
            productsTriggerRef.current.focus();
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

  // Which top-level section the current route belongs to. App.jsx already
  // passes `currentPage`, but it was never used, so the navigation never
  // showed where the visitor currently is.
  const activeSection = (() => {
    const p = (currentPage || '').toLowerCase();
    if (['automation', 'security-systems', 'cleanroom-interlocks',
      'perimeter-defense', 'fire-protection', 'hygiene'].includes(p)) return 'services';
    if (['catalog', 'product'].includes(p)) return 'products';
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

  const handleServiceClick = (slug) => {
    setActiveDropdown(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
    if (!slug) return;
    if (slug === 'touchless-entry' || slug === 'touchless-entry-solutions') {
      if (onNavigate) onNavigate('touchless-entry');
      return;
    }
    if (slug === 'perimeter-gate') {
      if (onNavigate) onNavigate('perimeter-gate');
      return;
    }
    if (slug === 'trackless-gate') {
      if (onNavigate) onNavigate('trackless-gate');
      return;
    }
    if (slug === 'rapid-airlock') {
      if (onNavigate) onNavigate('rapid-airlock');
      return;
    }
    if (slug === 'logistics-bridge') {
      if (onNavigate) onNavigate('logistics-bridge');
      return;
    }
    if (slug === 'heavy-security') {
      if (onNavigate) onNavigate('heavy-security');
      return;
    }
    if (onNavigate) {
      onNavigate(slug);
    }
  };

  const handleProductClick = (slug) => {
    setActiveDropdown(null);
    setOpenedByClick(false);
    setMobileMenuOpen(false);
    if (!slug) return;
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

  // 6 Services categories matching reference design exactly
  const serviceGroups = [
    {
      id: 'automation',
      title: 'Industrial Access Automation',
      icon: Settings,
      page: 'automation',
      subservices: [
        { title: 'Automatic Sliding Doors', slug: 'touchless-entry' },
        { title: 'Automatic Swing Doors', slug: 'touchless-entry' },
        { title: 'High Speed Doors', slug: 'rapid-airlock' },
        { title: 'Roll Up Doors', slug: 'heavy-security' },
        { title: 'Dock Levellers', slug: 'logistics-bridge' },
        { title: 'Turnstiles & Entrance Solutions', slug: 'perimeter-gate' },
        { title: 'Access Control Systems', slug: 'biometric-access-control' }
      ]
    },
    {
      id: 'perimeter',
      title: 'Traffic & Perimeter',
      icon: TrafficBarrierIcon,
      page: 'perimeter-defense',
      subservices: [
        { title: 'Boom Barriers', slug: 'boom-barriers' },
        { title: 'Optical Turnstiles', slug: 'turnstiles-flap-barriers-speed-gates' },
        { title: 'Tyre Killers & Bollards', slug: 'crash-bollards-tyre-killers' },
        { title: 'Car Lift Systems', slug: 'car-lift-systems' },
        { title: 'Parking Management', slug: 'parking-management-systems' },
        { title: 'Visitor Management', slug: 'visitor-management-system' }
      ]
    },
    {
      id: 'interlocks',
      title: 'Pharma Cleanroom',
      icon: FlaskConical,
      page: 'cleanroom-interlocks',
      subservices: [
        { title: 'Door Interlock (2-8 Door)', slug: 'door-interlock-system' },
        { title: 'Pass Box Systems', slug: 'pass-box-systems' },
        { title: 'Digital Clocks', slug: 'digital-clocks' },
        { title: 'Chiller & Cleanroom Doors', slug: 'chiller-cleanroom-doors' },
        { title: 'Acoustic Sound Doors', slug: 'acoustic-sound-doors' },
        { title: 'Safety Override Buzzers', slug: 'safety-override-buzzers' }
      ]
    },
    {
      id: 'fire',
      title: 'Fire & Life Safety',
      icon: Flame,
      page: 'fire-protection',
      subservices: [
        { title: 'Addressable Fire Alarms', slug: 'addressable-fire-alarms' },
        { title: 'Hydrant & Sprinkler Arrays', slug: 'hydrant-sprinkler-arrays' },
        { title: 'Fire Rated Doors & Shutters', slug: 'fire-rated-doors-shutters' },
        { title: 'Public Address (PA)', slug: 'public-address-system' },
        { title: 'Gas Leak Detection', slug: 'gas-leak-detection' },
        { title: 'Emergency Auto Trip', slug: 'emergency-auto-trip' }
      ]
    },
    {
      id: 'security',
      title: 'Surveillance & Alerts',
      icon: SurveillanceCameraIcon,
      page: 'security-systems',
      subservices: [
        { title: '4K AI CCTV Systems', slug: 'cctv-surveillance-systems' },
        { title: 'Biometric Access', slug: 'biometric-access-control' },
        { title: 'Video Door Phones', slug: 'video-door-phones' },
        { title: 'Central VMS Command', slug: 'central-vms-command' },
        { title: 'Thermal & Perimeter Beams', slug: 'thermal-perimeter-beams' },
        { title: 'Intrusion Detection Alarms', slug: 'intrusion-detection-alarms' }
      ]
    },
    {
      id: 'monitoring',
      title: 'Server Room & Monitoring',
      icon: Server,
      page: 'server-room-monitoring',
      subservices: [
        { title: 'Server Room EMS', slug: 'server-room-environment-monitoring' },
        { title: 'Underfloor Water Leak Detection', slug: 'water-leak-detection-systems' },
        { title: 'Hazardous Gas Arrays', slug: 'hazardous-gas-detection-arrays' },
        { title: 'Microprocessor Annunciators', slug: 'alarm-annunciators' },
        { title: 'Differential Pressure Monitors', slug: 'differential-pressure-monitors' },
        { title: 'Ultrasonic Rodent Repellent', slug: 'rodent-repellent-systems' }
      ]
    }
  ];

  const currentGroup = serviceGroups[selectedServiceGroup] || serviceGroups[0];

  // 5 Specialized Engineering Product Divisions (Matching Reference Architecture)
  const productGroups = [
    {
      id: 'access-automation',
      title: 'Access Automation',
      icon: Settings,
      page: 'automation',
      categoryId: 'access-automation',
      products: [
        { title: 'Automatic Sliding & Swing Doors', slug: 'automatic-sliding-swing-doors' },
        { title: 'Automatic Sliding & Swing Gates', slug: 'automatic-sliding-swing-gates' },
        { title: 'Telescopic & Cantilever Gates', slug: 'telescopic-cantilever-gates' },
        { title: 'Motorized Rolling Shutters', slug: 'motorized-industrial-rolling-shutters' },
        { title: 'PVC High Speed Roll Up Doors', slug: 'high-speed-roll-up-doors' }
      ]
    },
    {
      id: 'traffic-perimeter',
      title: 'Traffic & Perimeter',
      icon: TrafficBarrierIcon,
      page: 'perimeter-defense',
      categoryId: 'traffic-perimeter',
      products: [
        { title: 'Electro-Hydraulic Boom Barriers', slug: 'boom-barriers' },
        { title: 'Hydraulic Dock Levellers & Shelters', slug: 'dock-levellers-dock-shelters' },
        { title: 'Optical Speed Flap Turnstiles', slug: 'optical-flap-turnstiles' },
        { title: 'Anti-Ram Hydraulic Crash Bollards', slug: 'hydraulic-crash-bollards' },
        { title: 'Tyre Killers & Road Blockers', slug: 'tyre-killers-road-blockers' }
      ]
    },
    {
      id: 'pharma-cleanroom',
      title: 'Pharma Cleanroom',
      icon: FlaskConical,
      page: 'cleanroom-interlocks',
      categoryId: 'pharma-cleanroom',
      products: [
        { title: 'Door Interlock System (2-8 Door)', slug: 'door-interlock-systems' },
        { title: 'Dynamic & Static Pass Boxes', slug: 'dynamic-static-pass-boxes' },
        { title: 'Digital Master GPS Slave Clocks', slug: 'digital-gps-clocks' },
        { title: 'Cold Storage & Chiller Doors', slug: 'chiller-clean-room-doors' },
        { title: 'Hermetically Sealed Cleanroom Doors', slug: 'hermetic-cleanroom-doors' }
      ]
    },
    {
      id: 'fire-life-safety',
      title: 'Fire & Life Safety',
      icon: Flame,
      page: 'fire-protection',
      categoryId: 'fire-life-safety',
      products: [
        { title: 'Addressable Fire Alarm Systems', slug: 'addressable-fire-alarm-system' },
        { title: 'Industrial Fire Hydrant & Sprinklers', slug: 'fire-hydrant-sprinkler-systems' },
        { title: 'Fire Rated Steel Doors (120/240 Min)', slug: 'fire-rated-steel-doors' },
        { title: 'Clean Agent Gas Suppression', slug: 'gas-suppression-systems' },
        { title: 'Public Address & Voice Evacuation', slug: 'public-address-system' }
      ]
    },
    {
      id: 'surveillance-alerts',
      title: 'Surveillance & Alerts',
      icon: SurveillanceCameraIcon,
      page: 'security-systems',
      categoryId: 'surveillance-alerts',
      products: [
        { title: 'CCTV Surveillance (Analogue & IP 4K)', slug: 'cctv-surveillance-system' },
        { title: 'Biometric Attendance & Access Terminals', slug: 'biometric-access-attendance' },
        { title: 'Server Room Environment Telemetry', slug: 'server-room-monitoring' },
        { title: 'Microprocessor Alarm Annunciators', slug: 'alarm-annunciators' },
        { title: 'Wireless Intrusion Detection Systems', slug: 'wireless-intrusion-detection' }
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
                ref={servicesTriggerRef}
                className={`bright-nav-btn ${activeDropdown === 'services' ? 'services-pill-btn is-active-pill' : ''} ${activeSection === 'services' && activeDropdown !== 'products' && activeDropdown !== 'company' ? 'is-active-section' : ''}`}
                onClick={() => toggleDropdown('services')}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
                aria-current={activeSection === 'services' ? 'page' : undefined}
              >
                <span>Services</span>
                <ChevronDown size={15} className={activeDropdown === 'services' ? 'pill-chevron' : 'dropdown-arrow'} />
              </button>
            </div>

            {/* Products Dropdown */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => handleMouseEnterDropdown('products')}
              onMouseLeave={handleMouseLeaveDropdown}
              onFocus={() => handleFocusDropdown('products')}
            >
              <button
                ref={productsTriggerRef}
                className={`bright-nav-btn ${activeDropdown === 'products' ? 'services-pill-btn is-active-pill' : ''} ${activeSection === 'products' && activeDropdown !== 'services' && activeDropdown !== 'company' ? 'is-active-section' : ''}`}
                onClick={() => toggleDropdown('products')}
                aria-expanded={activeDropdown === 'products'}
                aria-haspopup="true"
                aria-current={activeSection === 'products' ? 'page' : undefined}
              >
                <span>Products</span>
                <ChevronDown size={15} className={activeDropdown === 'products' ? 'pill-chevron' : 'dropdown-arrow'} />
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
              title="Request a Technical Proposal & Quote"
              type="button"
              id="nav-get-a-quote-btn"
            >
              <span>Get a Quote</span>
              <ArrowRight size={14} className="nav-quote-arrow-icon" />
            </button>

            {/* Search Icon Button matching Reference Image */}
            <button
              className="bright-nav-search-btn"
              onClick={() => handleNavClick('catalog', 'all')}
              title="Search Products & Systems"
              aria-label="Search Products & Systems"
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
              title="Open Admin Portal (CMS & Inquiries)"
              aria-label="Admin Portal"
            >
              <User size={18} />
            </button>
          </div>

          {/* Mobile Actions: Theme Toggle Pill + Circular Menu/Close Toggle (Brightlant Style) */}
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
            TWO-COLUMN DROPDOWNS (Exact Match to Uploaded Reference Image)
            ========================================================================= */}

        {/* 1. SERVICES DROPDOWN (Reference-Matched Design) */}
        {activeDropdown === 'services' && (
          <div
            className="hti-dropdown-wrapper"
            style={{ left: `${dropdownPos.left}px` }}
            onMouseEnter={() => handleMouseEnterDropdown('services')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            {/* Pointer triangle caret pointing to the Services button */}
            <div className="hti-dropdown-caret" style={{ left: `${dropdownPos.caretX}px` }} />

            <div className="hti-dropdown-panel">
              {/* LEFT COLUMN: EXPLORE SERVICES */}
              <div className="hti-dropdown-left-col">
                <div className="hti-dropdown-col-header">
                  <span className="hti-dropdown-col-title">EXPLORE SERVICES</span>
                  <div className="hti-dropdown-blue-line" />
                </div>

                <div className="hti-category-list">
                  {serviceGroups.map((group, index) => {
                    const Icon = group.icon;
                    const isSelected = selectedServiceGroup === index;
                    return (
                      <div
                        key={group.id}
                        className={`hti-category-row ${isSelected ? 'is-active' : ''}`}
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
                        <div className="hti-category-row-left">
                          <div className="hti-category-icon-wrap">
                            <Icon size={22} className="hti-category-icon" />
                          </div>
                          <span className="hti-category-name">{group.title}</span>
                        </div>
                        <ChevronRight size={17} className="hti-category-chevron" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: CATEGORY SUBSERVICES */}
              <div className="hti-dropdown-right-col">
                <div className="hti-dropdown-col-header">
                  <span className="hti-dropdown-col-title">{currentGroup.title.toUpperCase()}</span>
                  <div className="hti-dropdown-blue-line" />
                </div>

                <div className="hti-subservices-list">
                  {currentGroup.subservices.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="hti-subservice-row"
                      onClick={() => {
                        if (sub.slug) {
                          handleServiceClick(sub.slug);
                        } else if (sub.page) {
                          handleNavClick(sub.page);
                        } else if (currentGroup.page) {
                          handleNavClick(currentGroup.page);
                        }
                      }}
                      onKeyDown={(e) => handleKeyActivate(e, () => {
                        if (sub.slug) {
                          handleServiceClick(sub.slug);
                        } else if (sub.page) {
                          handleNavClick(sub.page);
                        } else if (currentGroup.page) {
                          handleNavClick(currentGroup.page);
                        }
                      })}
                      role="button"
                      tabIndex={0}
                      aria-label={sub.title}
                    >
                      <span className="hti-subservice-name">{sub.title}</span>
                      <ChevronRight size={17} className="hti-subservice-chevron" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS DROPDOWN (Reference-Matched Design) */}
        {activeDropdown === 'products' && (
          <div
            className="hti-dropdown-wrapper"
            style={{ left: `${dropdownPos.left}px` }}
            onMouseEnter={() => handleMouseEnterDropdown('products')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            {/* Pointer triangle caret pointing to the Products button */}
            <div className="hti-dropdown-caret" style={{ left: `${dropdownPos.caretX}px` }} />

            <div className="hti-dropdown-panel">
              {/* LEFT COLUMN: EXPLORE PRODUCTS */}
              <div className="hti-dropdown-left-col">
                <div className="hti-dropdown-col-header">
                  <span className="hti-dropdown-col-title">EXPLORE PRODUCTS</span>
                  <div className="hti-dropdown-blue-line" />
                </div>

                <div className="hti-category-list">
                  {productGroups.map((group, index) => {
                    const Icon = group.icon;
                    const isSelected = selectedProductGroup === index;
                    return (
                      <div
                        key={group.id}
                        className={`hti-category-row ${isSelected ? 'is-active' : ''}`}
                        onMouseEnter={() => setSelectedProductGroup(index)}
                        onClick={() => {
                          setActiveDropdown(null);
                          if (group.page && onNavigate) {
                            handleNavClick(group.page);
                          } else if (onNavigate) {
                            handleNavClick('catalog', group.categoryId);
                          }
                        }}
                        onKeyDown={(e) => handleKeyActivate(e, () => {
                          setActiveDropdown(null);
                          if (group.page && onNavigate) {
                            handleNavClick(group.page);
                          } else if (onNavigate) {
                            handleNavClick('catalog', group.categoryId);
                          }
                        })}
                        role="button"
                        tabIndex={0}
                        aria-label={group.title}
                      >
                        <div className="hti-category-row-left">
                          <div className="hti-category-icon-wrap">
                            <Icon size={22} className="hti-category-icon" />
                          </div>
                          <span className="hti-category-name">{group.title}</span>
                        </div>
                        <ChevronRight size={17} className="hti-category-chevron" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: CATEGORY SUBPRODUCTS */}
              <div className="hti-dropdown-right-col">
                <div className="hti-dropdown-col-header">
                  <span className="hti-dropdown-col-title">{currentProductGroup.title.toUpperCase()}</span>
                  <div className="hti-dropdown-blue-line" />
                </div>

                <div className="hti-subservices-list">
                  {currentProductGroup.products.map((prod, pIdx) => (
                    <div
                      key={pIdx}
                      className="hti-subservice-row"
                      onClick={() => {
                        setActiveDropdown(null);
                        if (prod.slug) {
                          handleProductClick(prod.slug);
                        } else if (currentProductGroup.page) {
                          handleNavClick(currentProductGroup.page);
                        }
                      }}
                      onKeyDown={(e) => handleKeyActivate(e, () => {
                        setActiveDropdown(null);
                        if (prod.slug) {
                          handleProductClick(prod.slug);
                        } else if (currentProductGroup.page) {
                          handleNavClick(currentProductGroup.page);
                        }
                      })}
                      role="button"
                      tabIndex={0}
                      aria-label={prod.title}
                    >
                      <span className="hti-subservice-name">{prod.title}</span>
                      <ChevronRight size={17} className="hti-subservice-chevron" />
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
            {/* Accordion Item: Services */}
            <div className="mobile-accordion-group">
              <button
                className={`mobile-accordion-header ${activeSection === 'services' ? 'is-active-section' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                aria-expanded={mobileAccordion === 'services'}
                aria-current={activeSection === 'services' ? 'page' : undefined}
              >
                <span className="mobile-accordion-heading">
                  <span className="mobile-accordion-title">Services</span>
                  <span className="mobile-accordion-count" aria-hidden="true">{serviceGroups.length}</span>
                </span>
                {mobileAccordion === 'services' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {mobileAccordion === 'services' && (
                <div className="mobile-accordion-body">
                  {serviceGroups.map((g) => {
                    const GroupIcon = g.icon;
                    const isGroupExpanded = mobileServiceGroup === g.id;
                    return (
                      <div key={g.id} className={`mobile-product-group-block ${isGroupExpanded ? 'is-expanded' : ''}`}>
                        <button
                          className="mobile-product-group-header"
                          onClick={() => setMobileServiceGroup(isGroupExpanded ? null : g.id)}
                          aria-expanded={isGroupExpanded}
                        >
                          <div className="mobile-product-group-info">
                            <div className="mobile-product-group-icon">
                              <GroupIcon size={16} />
                            </div>
                            <span className="mobile-clean-title">{g.title}</span>
                          </div>
                          {isGroupExpanded ? <ChevronUp size={16} className="mobile-clean-arrow" /> : <ChevronDown size={16} className="mobile-clean-arrow" />}
                        </button>

                        {isGroupExpanded && (
                          <div className="mobile-product-sublist">
                            <button
                              className="mobile-product-overview-btn"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                if (g.page) handleNavClick(g.page);
                              }}
                            >
                              <span>Explore: {g.title}</span>
                              <ArrowRight size={13} />
                            </button>

                            {g.subservices.map((sub, sIdx) => (
                              <button
                                key={sIdx}
                                className="mobile-clean-sublink"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  if (sub.slug) handleServiceClick(sub.slug);
                                  else if (g.page) handleNavClick(g.page);
                                }}
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
                      handleNavClick('automation');
                    }}
                  >
                    <span className="mobile-clean-title">View All Services</span>
                    <ArrowRight size={16} className="mobile-clean-arrow" />
                  </button>
                </div>
              )}
            </div>

            {/* Accordion Item: Products */}
            <div className="mobile-accordion-group">
              <button
                className={`mobile-accordion-header ${activeSection === 'products' ? 'is-active-section' : ''}`}
                onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
                aria-expanded={mobileAccordion === 'products'}
                aria-current={activeSection === 'products' ? 'page' : undefined}
              >
                <span className="mobile-accordion-heading">
                  <span className="mobile-accordion-title">Products</span>
                  <span className="mobile-accordion-count" aria-hidden="true">{productGroups.length}</span>
                </span>
                {mobileAccordion === 'products' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {mobileAccordion === 'products' && (
                <div className="mobile-accordion-body">
                  {productGroups.map((group) => {
                    const GroupIcon = group.icon;
                    const isGroupExpanded = mobileProductGroup === group.id;
                    return (
                      <div key={group.id} className={`mobile-product-group-block ${isGroupExpanded ? 'is-expanded' : ''}`}>
                        <button
                          className="mobile-product-group-header"
                          onClick={() => setMobileProductGroup(isGroupExpanded ? null : group.id)}
                          aria-expanded={isGroupExpanded}
                        >
                          <div className="mobile-product-group-info">
                            <div className="mobile-product-group-icon">
                              <GroupIcon size={16} />
                            </div>
                            <span className="mobile-clean-title">{group.title}</span>
                          </div>
                          {isGroupExpanded ? <ChevronUp size={16} className="mobile-clean-arrow" /> : <ChevronDown size={16} className="mobile-clean-arrow" />}
                        </button>

                        {isGroupExpanded && (
                          <div className="mobile-product-sublist">
                            <button
                              className="mobile-product-overview-btn"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                if (group.page && onNavigate) {
                                  onNavigate(group.page);
                                } else if (onNavigate) {
                                  onNavigate('catalog', group.categoryId);
                                }
                              }}
                            >
                              <span>Explore: {group.title}</span>
                              <ArrowRight size={13} />
                            </button>

                            {group.products.map((prod, pIdx) => (
                              <button
                                key={pIdx}
                                className="mobile-clean-sublink"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  if (prod.slug) {
                                    handleProductClick(prod.slug);
                                  } else {
                                    if (onNavigate) onNavigate('catalog', group.categoryId);
                                  }
                                }}
                              >
                                <span className="mobile-clean-title">{prod.title}</span>
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
                    <span className="mobile-clean-title">View All Products</span>
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

            {/* Mobile Action Area - kept pinned to the bottom of the drawer so
                  the brochure, the quote CTA and the consultation link are
                  always one tap away, whatever the accordion content length. */}
            <div className="mobile-drawer-footer">

              {/* Compact Brochure Row - one line instead of a tall card */}
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
