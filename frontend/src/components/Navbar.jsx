import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Download,
  Sun,
  Moon,
  Monitor,
  Check,
  Settings,
  Cpu,
  Lock,
  ShieldCheck,
  Flame,
  Sparkles,
  Activity,
  CheckCircle2,
  Building2,
  Users,
  User,
  Handshake,
  BookOpen,
  PhoneCall,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  DoorClosed,
  SlidersHorizontal,
  Layers,
  Truck
} from 'lucide-react';

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
  const [selectedServiceGroup, setSelectedServiceGroup] = useState(0);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  const navRef = useRef(null);
  const themeMenuRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnterDropdown = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
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
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleNavClick = (page, sectionId = null) => {
    setActiveDropdown(null);
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
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    } else {
      handleNavClick('home', 'catalog');
    }
  };

  const handleProductClick = (slug) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('product', slug);
    }
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
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
          image: '/hero-cleanroom-automation.jpg',
          icon: Layers,
          slug: 'pass-box-systems'
        },
        { 
          title: 'Digital Clocks',
          description: 'GPS master-slave synchronized clocks with flameproof housings.',
          image: '/case-studies/case-cleanroom.jpg',
          icon: Activity,
          slug: 'door-interlock-systems'
        },
        { 
          title: 'Cleanroom Doors',
          description: 'Hermetically sealed flush doors preventing airborne particulate leaks.',
          image: '/services/services-touchless-entry.jpg',
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
      <nav className={`bright-main-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
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
            >
              <button
                className={`bright-nav-btn ${activeDropdown === 'services' ? 'services-pill-btn is-active-pill' : ''}`}
                onClick={() => toggleDropdown('services')}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                {activeDropdown === 'services' ? (
                  <ChevronUp size={15} className="pill-chevron" />
                ) : (
                  <ChevronDown size={15} className="dropdown-arrow" />
                )}
              </button>
            </div>

            {/* Products Dropdown (Horizontal) */}
            <div className="nav-item-dropdown">
              <button
                className={`bright-nav-btn ${activeDropdown === 'products' ? 'services-pill-btn is-active-pill' : ''}`}
                onClick={() => toggleDropdown('products')}
                aria-expanded={activeDropdown === 'products'}
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
            <div className="nav-item-dropdown">
              <button
                className={`bright-nav-btn ${activeDropdown === 'company' ? 'services-pill-btn is-active-pill' : ''}`}
                onClick={() => toggleDropdown('company')}
                aria-expanded={activeDropdown === 'company'}
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
          <div className="bright-nav-actions desktop-only">
            {/* Theme / Mode Switcher with Interactive Dropdown */}
            <div className="theme-toggle-container" ref={themeMenuRef}>
              <button
                className={`bright-theme-toggle ${themeDropdownOpen ? 'active' : ''} ${resolvedTheme === 'dark' ? 'is-dark' : 'is-light'}`}
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                title={`Current theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)} mode (Click to switch)`}
                aria-label="Toggle display theme"
                aria-expanded={themeDropdownOpen}
              >
                {resolvedTheme === 'dark' ? (
                  <Moon size={16} className="sun-icon moon-icon" />
                ) : (
                  <Sun size={16} className="sun-icon" />
                )}
                <ChevronDown size={12} className={`theme-chevron ${themeDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {themeDropdownOpen && (
                <div className="theme-dropdown-menu" role="menu">
                  <div className="theme-menu-header">Display Theme</div>
                  <button
                    className={`theme-menu-item ${theme === 'light' ? 'selected' : ''}`}
                    onClick={() => {
                      if (onThemeChange) onThemeChange('light');
                      setThemeDropdownOpen(false);
                    }}
                    role="menuitem"
                  >
                    <div className="theme-item-left">
                      <Sun size={15} className="sun-icon" />
                      <span>Light Mode</span>
                    </div>
                    {theme === 'light' && <Check size={14} className="theme-check-icon" />}
                  </button>

                  <button
                    className={`theme-menu-item ${theme === 'dark' ? 'selected' : ''}`}
                    onClick={() => {
                      if (onThemeChange) onThemeChange('dark');
                      setThemeDropdownOpen(false);
                    }}
                    role="menuitem"
                  >
                    <div className="theme-item-left">
                      <Moon size={15} className="moon-icon" />
                      <span>Dark Mode</span>
                    </div>
                    {theme === 'dark' && <Check size={14} className="theme-check-icon" />}
                  </button>


                </div>
              )}
            </div>

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

          {/* Mobile Hamburger Toggle */}
          <button
            className="bright-mobile-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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

        {/* 2. PRODUCTS HORIZONTAL DROPDOWN (Direct Link to Each Product's Dedicated Page) */}
        {activeDropdown === 'products' && (
          <div className="bright-horizontal-dropdown products-mega-dropdown desktop-only">
            <div className="bright-container">
              <div className="products-horizontal-grid">
                {/* Col 1: Access Automation */}
                <div className="prod-col-group">
                  <div className="prod-col-header text-blue">
                    <Cpu size={16} />
                    <span>ACCESS AUTOMATION</span>
                  </div>
                  <div className="prod-col-items">
                    <button className="prod-item-btn" onClick={() => handleProductClick('automatic-sliding-swing-doors')}>
                      <div className="prod-item-name">Automatic Sliding & Swing Doors</div>
                      <div className="prod-item-work">Touchless sensor entry for offices & hospitals</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('automatic-sliding-swing-gates')}>
                      <div className="prod-item-name">Automatic Sliding & Swing Gates</div>
                      <div className="prod-item-work">Motorized perimeter gates for factory estates</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('telescopic-cantilever-gates')}>
                      <div className="prod-item-name">Telescopic & Cantilever Gates</div>
                      <div className="prod-item-work">Trackless space-saving sliding barriers</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('pvc-rapid-roll-up-doors')}>
                      <div className="prod-item-name">High Speed Roll Up & Sectional Doors</div>
                      <div className="prod-item-work">Rapid thermal & airlock environmental retention</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('motorized-rolling-shutters')}>
                      <div className="prod-item-name">Motorized Rolling Shutters</div>
                      <div className="prod-item-work">Heavy-gauge galvanized security bay protection</div>
                    </button>
                  </div>
                </div>

                {/* Col 2: Traffic & Perimeter */}
                <div className="prod-col-group">
                  <div className="prod-col-header text-amber">
                    <ShieldCheck size={16} />
                    <span>TRAFFIC & PERIMETER</span>
                  </div>
                  <div className="prod-col-items">
                    <button className="prod-item-btn" onClick={() => handleProductClick('boom-barriers')}>
                      <div className="prod-item-name">Boom Barriers (Electro / Hydraulic)</div>
                      <div className="prod-item-work">High-frequency corporate parking & toll gates</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('dock-levellers-dock-shelters')}>
                      <div className="prod-item-name">Dock Levellers & Dock Shelters</div>
                      <div className="prod-item-work">Logistics loading bridge between trucks & bay</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('turnstiles-flap-barriers-speed-gates')}>
                      <div className="prod-item-name">Turnstiles & Flap Barriers</div>
                      <div className="prod-item-work">Pedestrian biometric lobby speed gates</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('bollards-tyre-killers-car-lifts')}>
                      <div className="prod-item-name">Bollards, Tyre Killers & Car Lifts</div>
                      <div className="prod-item-work">Anti-ram vehicle defense & multi-level elevators</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('visitor-management-system')}>
                      <div className="prod-item-name">Parking & Visitor Management</div>
                      <div className="prod-item-work">Automated RFID guidance & QR digital pass</div>
                    </button>
                  </div>
                </div>

                {/* Col 3: Cleanroom Engineering */}
                <div className="prod-col-group">
                  <div className="prod-col-header text-red">
                    <Lock size={16} />
                    <span>PHARMA CLEANROOM</span>
                  </div>
                  <div className="prod-col-items">
                    <button className="prod-item-btn" onClick={() => handleProductClick('door-interlock-systems')}>
                      <div className="prod-item-name">Door Interlock System (Ex-d & Safe)</div>
                      <div className="prod-item-work">USFDA 21 CFR Part 11 compliant 2-8 door logic</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('pass-box-systems')}>
                      <div className="prod-item-name">Pass Box System (Static & Dynamic)</div>
                      <div className="prod-item-work">Contamination-free material transfer with UV</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('digital-gps-clocks')}>
                      <div className="prod-item-name">Digital Clocks (Flameproof / Safe)</div>
                      <div className="prod-item-work">GPS master-slave pharma time synchronization</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('chiller-clean-room-doors')}>
                      <div className="prod-item-name">Chiller Doors & Clean Room Doors</div>
                      <div className="prod-item-work">Hermetically sealed cold storage & lab barriers</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('sound-proof-doors')}>
                      <div className="prod-item-name">Sound Proof Acoustic Doors</div>
                      <div className="prod-item-work">Heavy acoustic decibel dampening for machinery</div>
                    </button>
                  </div>
                </div>

                {/* Col 4: Fire & Life Safety */}
                <div className="prod-col-group">
                  <div className="prod-col-header text-orange">
                    <Flame size={16} />
                    <span>FIRE & LIFE SAFETY</span>
                  </div>
                  <div className="prod-col-items">
                    <button className="prod-item-btn" onClick={() => handleProductClick('fire-alarm-system')}>
                      <div className="prod-item-name">Fire Alarm (Conventional & Addr)</div>
                      <div className="prod-item-work">Multi-loop smoke, heat & flame sensor network</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('fire-hydrant-sprinkler-systems')}>
                      <div className="prod-item-name">Fire Hydrant & Sprinkler System</div>
                      <div className="prod-item-work">Turnkey industrial fire fighting water distribution</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('fire-rated-doors-shutters')}>
                      <div className="prod-item-name">Fire Rated Door & Fire Rated Shutter</div>
                      <div className="prod-item-work">Certified 120/240 min containment barrier</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('public-address-system')}>
                      <div className="prod-item-name">Public Address (PA) System</div>
                      <div className="prod-item-work">Zoned emergency voice evacuation broadcast</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('gas-detection-systems')}>
                      <div className="prod-item-name">Gas Detection Systems</div>
                      <div className="prod-item-work">Toxic, combustible LPG/CNG & VOC leak alerts</div>
                    </button>
                  </div>
                </div>

                {/* Col 5: Surveillance & Monitoring */}
                <div className="prod-col-group">
                  <div className="prod-col-header text-emerald">
                    <Activity size={16} />
                    <span>SURVEILLANCE & ALERTS</span>
                  </div>
                  <div className="prod-col-items">
                    <button className="prod-item-btn" onClick={() => handleProductClick('cctv-surveillance-system')}>
                      <div className="prod-item-name">CCTV Surveillance (Analogue & IP 4K)</div>
                      <div className="prod-item-work">Ultra-HD AI analytics & flameproof camera arrays</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('biometric-access-attendance')}>
                      <div className="prod-item-name">Biometric Access & Time Attendance</div>
                      <div className="prod-item-work">Facial recognition & fingerprint shift logging</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('video-door-phones')}>
                      <div className="prod-item-name">Video Door Phone (IP & Non-IP)</div>
                      <div className="prod-item-work">2-way video intercom with remote door release</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('server-room-monitoring')}>
                      <div className="prod-item-name">Server Room Monitoring</div>
                      <div className="prod-item-work">24/7 Temp, RH, water leak & fire SMS dialer</div>
                    </button>
                    <button className="prod-item-btn" onClick={() => handleProductClick('fault-alarm-systems')}>
                      <div className="prod-item-name">Fault & Intrusion Alarm Systems</div>
                      <div className="prod-item-work">Central pump trip & perimeter breach annunciator</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="prod-mega-bottom">
                <div className="flex-center-gap">
                  <span className="prod-badge-tag">OFFICIAL CATALOG</span>
                  <span className="prod-count-text">33+ Precision Systems Installed Across India • Certified Compliance</span>
                </div>
                <button className="btn-explore-catalog-link" onClick={() => handleNavClick('home', 'catalog')}>
                  <span>Open Interactive Product Catalog</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPANY HORIZONTAL DROPDOWN (Dedicated Separate Pages) */}
        {activeDropdown === 'company' && (
          <div className="bright-horizontal-dropdown desktop-only">
            <div className="bright-container">
              <div className="horizontal-columns-grid">
                <button
                  className="horiz-col-item"
                  onClick={() => handleNavClick('about')}
                >
                  <div className="horiz-col-title">About Us</div>
                  <div className="horiz-col-desc">Our story, values & engineering ethos since 2014</div>
                </button>

                <button
                  className="horiz-col-item"
                  onClick={() => handleNavClick('clients')}
                >
                  <div className="horiz-col-title">Our Clients</div>
                  <div className="horiz-col-desc">100+ prestigious pharma & commercial corporate installations</div>
                </button>


                <button
                  className="horiz-col-item"
                  onClick={() => handleNavClick('careers')}
                >
                  <div className="horiz-col-title">Careers</div>
                  <div className="horiz-col-desc">
                    Explore career opportunities and grow with HTI Automation
                  </div>
                </button>


                <button
                  className="horiz-col-item"
                  onClick={() => handleNavClick('blogs')}
                >
                  <div className="horiz-col-title">Technical Blogs</div>
                  <div className="horiz-col-desc">Cleanroom standards, USFDA compliance & engineering notes</div>
                </button>

                <button
                  className="horiz-col-item"
                  onClick={() => handleNavClick('contact')}
                >
                  <div className="horiz-col-title">Contact Office</div>
                  <div className="horiz-col-desc">Talk to our engineering team in Turbhe, Navi Mumbai</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="bright-mobile-drawer">
            {/* Accordion Item: Services */}
            <div className="mobile-accordion-group">
              <button
                className="mobile-accordion-header"
                onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
              >
                <div className="flex-center-gap">
                  <span className="mobile-pill-tag">SERVICES</span>
                  <span className="font-semibold text-slate-900">Automation & Cleanroom</span>
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
                        <div className="font-medium text-slate-800 text-sm">{g.title}</div>
                        <div className="text-xs text-slate-500">{g.tagline}</div>
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
              >
                <span className="font-semibold text-slate-900">Products Catalog</span>
                {mobileAccordion === 'products' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {mobileAccordion === 'products' && (
                <div className="mobile-accordion-body">
                  <button className="mobile-sublink" onClick={() => handleCategoryClick('Automation')}>
                    Automation Solutions
                  </button>
                  <button className="mobile-sublink" onClick={() => handleCategoryClick('Security System')}>
                    Security & Life Safety Systems
                  </button>
                  <button className="mobile-sublink" onClick={() => handleCategoryClick('Hygiene')}>
                    Hygiene & Cleanroom Automation
                  </button>
                  <button className="mobile-sublink text-cyan font-semibold" onClick={() => handleNavClick('home', 'interlock-demo')}>
                    Interactive Cleanroom Interlock Demo ↗
                  </button>
                </div>
              )}
            </div>

            {/* Accordion Item: Company */}
            <div className="mobile-accordion-group">
              <button
                className="mobile-accordion-header"
                onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
              >
                <span className="font-semibold text-slate-900">Company & Clients</span>
                {mobileAccordion === 'company' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {mobileAccordion === 'company' && (
                <div className="mobile-accordion-body">
                  <button className="mobile-sublink" onClick={() => handleNavClick('about')}>
                    About HTI Automation
                  </button>
                  <button className="mobile-sublink" onClick={() => handleNavClick('clients')}>
                    Our Clients (100+ Pharma & Commercial)
                  </button>
                  <button
                    className="mobile-sublink"
                    onClick={() => handleNavClick('careers')}
                  >
                    Careers
                  </button>
                  <button className="mobile-sublink" onClick={() => handleNavClick('partners')}>
                    Technology Partners
                  </button>
                  <button className="mobile-sublink" onClick={() => handleNavClick('blogs')}>
                    Technical Blogs
                  </button>
                  <button className="mobile-sublink font-semibold text-orange-600" onClick={() => handleNavClick('contact')}>
                    Contact Office (Turbhe, Navi Mumbai)
                  </button>
                </div>
              )}
            </div>

            {/* Brochure Direct Link */}
            <button
              className="mobile-direct-link"
              onClick={handleDownloadBrochure}
            >
              <div className="flex-center-gap">
                <Download size={16} className="text-cyan" />
                <span>Download Product Brochure</span>
              </div>
              <ArrowRight size={16} />
            </button>

            {/* Mobile CTAs */}
            <div className="mobile-drawer-footer">
              {/* Mobile Theme Bar */}
              <div className="mobile-theme-bar">
                <span className="mobile-theme-label">Theme Mode</span>
                <div className="mobile-theme-segments">
                  <button
                    className={`mobile-theme-pill ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => onThemeChange && onThemeChange('light')}
                  >
                    <Sun size={14} className="sun-icon" />
                    <span>Light</span>
                  </button>
                  <button
                    className={`mobile-theme-pill ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => onThemeChange && onThemeChange('dark')}
                  >
                    <Moon size={14} className="moon-icon" />
                    <span>Dark</span>
                  </button>

                </div>
              </div>

              <button
                className="bright-admin-btn w-full justify-center py-3"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmin) onOpenAdmin();
                }}
              >
                <User size={17} />
                <span>Open Admin Portal</span>
                {inquiryCount > 0 && (
                  <span className="admin-badge-count">{inquiryCount}</span>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
