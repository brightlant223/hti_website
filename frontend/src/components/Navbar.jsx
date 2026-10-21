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
  FileText
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

  // Mega menu services data matching user's official Product & Services list
  const serviceGroups = [
    {
      id: 'automation',
      title: 'Industrial Access Automation',
      tagline: 'Automatic doors, telescopic gates, high-speed roll-up & dock levellers.',
      icon: Cpu,
      color: '#0284c7',
      category: 'Automation',
      badge: 'INDUSTRIAL AUTOMATION',
      heading: 'High-Throughput Industrial Access & Gates.',
      overviewDesc: 'Heavy-duty motorized access automation designed for corporate entrances, logistics warehouses, and pharma bays with 24/7 reliability.',
      features: [
        { label: 'Automatic Sliding & Swing Doors', type: 'TOUCHLESS ENTRY' },
        { label: 'Automatic Sliding & Swing Gates', type: 'PERIMETER GATE' },
        { label: 'Telescopic & Cantilever Gates', type: 'TRACKLESS GATE' },
        { label: 'High Speed Roll Up & Sectional Doors', type: 'RAPID AIRLOCK' },
        { label: 'Dock Levellers & Dock Shelters', type: 'LOGISTICS BRIDGE' },
        { label: 'Motorized Rolling Shutters', type: 'HEAVY SECURITY' }
      ]
    },
    {
      id: 'interlocks',
      title: 'Cleanroom Interlocks & Pass Boxes',
      tagline: 'Flameproof/Safe door interlocks, pass boxes & digital clocks.',
      icon: Lock,
      color: '#ef4444',
      section: 'interlock-demo',
      badge: 'PHARMA CLEANROOM ENGINEERING',
      heading: 'USFDA Cleanroom Interlock & Contamination Control.',
      overviewDesc: 'Microcontroller and PLC cleanroom interlocking logic, dynamic pass box hatches, and GPS master-slave clocks built for sterile pharma compliance.',
      features: [
        { label: 'Door Interlock (Flameproof / Safe)', type: '2-8 DOOR LOGIC' },
        { label: 'Pass Box System (Static & Dynamic)', type: 'MATERIAL TRANSFER' },
        { label: 'Digital Clock (Flameproof / Safe)', type: 'GPS MASTER-SLAVE' },
        { label: 'Chiller Doors & Clean Room Doors', type: 'HERMETIC SEAL' },
        { label: 'Sound Proof Acoustic Doors', type: 'NOISE REDUCTION' },
        { label: 'Emergency Override & Audio Buzzer', type: 'SAFETY OVERRIDE' }
      ]
    },
    {
      id: 'perimeter',
      title: 'Perimeter Defense & Traffic Control',
      tagline: 'Boom barriers, tyre killers, car lifts, turnstiles & flap barriers.',
      icon: ShieldCheck,
      color: '#0284c7',
      category: 'Automation',
      badge: 'TRAFFIC & PERIMETER DEFENSE',
      heading: 'Vehicle Access, Tyre Killers & Pedestrian Speed Gates.',
      overviewDesc: 'High-frequency electromechanical boom barriers, optical turnstiles, anti-ram tyre killers, and multi-level car lifts for secure facilities.',
      features: [
        { label: 'Boom Barrier (Electro / Hydraulic)', type: 'VEHICLE ACCESS' },
        { label: 'Turnstiles & Optical Flap Barriers', type: 'PEDESTRIAN FLOW' },
        { label: 'Bollards, Tyre Killers & Car Lifts', type: 'ANTI-RAM DEFENSE' },
        { label: 'Parking Management Systems', type: 'RFID GUIDANCE' },
        { label: 'Visitor Management Systems', type: 'QR DIGITAL BADGE' },
        { label: 'Intrusion Alarm Systems', type: 'PERIMETER BEAM' }
      ]
    },
    {
      id: 'fire',
      title: 'Fire Protection & Life Safety',
      tagline: 'Fire alarms, hydrant sprinkler arrays & fire rated containment.',
      icon: Flame,
      color: '#f97316',
      category: 'Security System',
      badge: 'TURNKEY LIFE SAFETY',
      heading: 'Complete Industrial Fire Fighting & Alarm Systems.',
      overviewDesc: 'Comprehensive life safety infrastructure covering conventional & addressable fire alarm panels, fire hydrant networks, and certified fire doors.',
      features: [
        { label: 'Fire Alarm (Conventional & Addressable)', type: 'SMOKE & HEAT' },
        { label: 'Fire Hydrant & Sprinkler System', type: 'WATER DELUGE' },
        { label: 'Fire Rated Door & Fire Rated Shutter', type: '120-240 MIN' },
        { label: 'Public Address (PA) Systems', type: 'VOICE EVACUATION' },
        { label: 'Gas Detection Systems (Toxic & Combustible)', type: 'GAS ALERT' },
        { label: 'Emergency Fire Integration', type: 'AUTO RELAY TRIP' }
      ]
    },
    {
      id: 'security',
      title: 'CCTV Surveillance & Biometrics',
      tagline: 'Analogue & IP 4K surveillance, biometric access & video door phones.',
      icon: Cpu,
      color: '#6366f1',
      category: 'Security System',
      badge: 'INTELLIGENT SURVEILLANCE',
      heading: '4K AI Surveillance, Biometrics & Video Intercom.',
      overviewDesc: 'High-definition IP surveillance, biometric time attendance, multi-zone video door phones, and central security control room infrastructure.',
      features: [
        { label: 'CCTV Surveillance (Analogue & IP 4K)', type: '24/7 MONITORING' },
        { label: 'Biometric Access & Attendance System', type: 'MULTI-SPECTRAL' },
        { label: 'Video Door Phone (IP & Non-IP)', type: '2-WAY INTERCOM' },
        { label: 'Fault Alarm Annunciator Systems', type: 'EQUIPMENT TRIP' },
        { label: 'Remote Mobile Gate / Door Release', type: 'SMART RELAY' },
        { label: 'Central Video Management (VMS)', type: 'MULTI-CAMPUS' }
      ]
    },
    {
      id: 'monitoring',
      title: 'Server Room & Critical Monitoring',
      tagline: 'Server room alert monitoring, gas detection & hygiene systems.',
      icon: Activity,
      color: '#10b981',
      category: 'Security System',
      badge: 'CRITICAL FACILITY MONITORING',
      heading: 'Data Center Environment & Facility Protection.',
      overviewDesc: '24/7 environmental monitoring for server rooms, toxic & combustible gas detection arrays, and touchless washroom sanitary engineering.',
      features: [
        { label: 'Server Room Monitoring (Temp/RH/Water)', type: 'SMS & EMAIL ALERT' },
        { label: 'Gas Detection System (Toxic, LPG, VOC)', type: 'LEAK DEFENSE' },
        { label: 'Fault Alarm System (Pump/Power Trip)', type: 'ANNUNCIATOR' },
        { label: 'Touchless Brass Sensor Taps', type: 'WATER SAVING' },
        { label: 'High Speed PVC Air Curtains', type: 'THERMAL BARRIER' },
        { label: 'High-Speed Dual Hand Dryers', type: 'RAPID DRYING' }
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
              <span>Goregaon (West), Mumbai - 400104</span>
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
          {/* Desktop Nav Items */}
          <div className="bright-nav-links desktop-only">
            {/* Services Pill / Dropdown */}
            <div className="nav-item-dropdown">
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

          {/* Mobile Actions: Theme Toggle Pill + Circular Menu/Close Toggle (Brightlant Style) */}
          <div className="bright-mobile-actions mobile-only">
            <button
              type="button"
              className="bright-mobile-theme-pill"
              onClick={() => {
                const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
                if (onThemeChange) onThemeChange(nextTheme);
              }}
              title={`Switch theme (Current: ${resolvedTheme})`}
              aria-label="Toggle display theme"
            >
              {resolvedTheme === 'dark' ? (
                <Moon size={15} className="mobile-theme-icon" />
              ) : (
                <Sun size={15} className="mobile-theme-icon" />
              )}
              <ChevronDown size={12} className="mobile-theme-chevron" />
            </button>

            <button
              type="button"
              className={`bright-mobile-circle-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* =========================================================================
            HORIZONTAL DROPDOWNS (Brightlant full-width horizontal bar style)
            ========================================================================= */}

        {/* 1. SERVICES MEGA DROPDOWN */}
        {activeDropdown === 'services' && (
          <div className="bright-horizontal-dropdown bright-mega-horizontal desktop-only">
            <div className="bright-container">
              <div className="mega-header-tag">
                SERVICES · 6 SPECIALIZED GROUPS
              </div>

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
                          if (group.section) {
                            handleNavClick('home', group.section);
                          } else if (group.category) {
                            handleCategoryClick(group.category);
                          }
                        }}
                      >
                        <div className="mega-item-icon-box" style={{ color: group.color }}>
                          <Icon size={18} />
                        </div>
                        <div className="mega-item-text">
                          <div className="mega-item-title">{group.title}</div>
                          <div className="mega-item-tagline">{group.tagline}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Panel */}
                <div className="mega-right-panel">
                  <div className="mega-panel-top">
                    <div className="mega-pill-badge">
                      <span className="mega-pulse-dot" style={{ backgroundColor: currentGroup.color }}></span>
                      <span>• {currentGroup.badge}</span>
                    </div>
                    <button
                      className="mega-overview-link"
                      onClick={() => {
                        if (currentGroup.section) {
                          handleNavClick('home', currentGroup.section);
                        } else {
                          handleCategoryClick(currentGroup.category);
                        }
                      }}
                    >
                      <span>Overview</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>

                  <h3 className="mega-panel-heading">{currentGroup.heading}</h3>
                  <p className="mega-panel-desc">{currentGroup.overviewDesc}</p>

                  <div className="mega-features-grid">
                    {currentGroup.features.map((feat, fIdx) => (
                      <div 
                        key={fIdx} 
                        className="mega-feature-card"
                        onClick={() => {
                          if (currentGroup.section) {
                            handleNavClick('home', currentGroup.section);
                          } else {
                            handleCategoryClick(currentGroup.category);
                          }
                        }}
                      >
                        <span className="mega-feature-label">{feat.type}</span>
                        <span className="mega-feature-name">{feat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mega-panel-cta-wrap">
                    <button
                      className="bright-btn-blue mega-cta-btn"
                      onClick={() => {
                        if (currentGroup.id === 'automation' || currentGroup.id === 'perimeter') {
                          handleNavClick('automation');
                        } else if (currentGroup.id === 'interlocks') {
                          handleNavClick('cleanroom-interlocks');
                        } else if (currentGroup.id === 'fire' || currentGroup.id === 'security') {
                          handleNavClick('security-systems');
                        } else {
                          handleNavClick('hygiene');
                        }
                      }}
                    >
                      <span>Explore Dedicated {currentGroup.title} Page</span>
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mega-bottom-footer">
                <span className="mega-footer-text">
                  Every project includes a free consultation, site survey, and project roadmap.
                </span>
                <button 
                  className="mega-talk-btn"
                  onClick={() => handleNavClick('contact')}
                >
                  <MessageSquare size={14} />
                  <span>Talk to our engineers</span>
                </button>
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
                  onClick={() => handleNavClick('partners')}
                >
                  <div className="horiz-col-title">Partners & Alliances</div>
                  <div className="horiz-col-desc">Global OEM alliances, certifications & technology standards</div>
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
                  <div className="horiz-col-desc">Talk to our engineering team in Goregaon (West), Mumbai</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Mobile Slide-down Navigation Drawer (Exact Brightlant Design) */}
        {mobileMenuOpen && (
          <div className="bright-mobile-drawer">
            {/* 1. SERVICES Accordion (6) */}
            <div className="mobile-bright-section">
              <button
                type="button"
                className="mobile-bright-header"
                onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                aria-expanded={mobileAccordion === 'services'}
              >
                <div className="mobile-bright-title-wrap">
                  <span className="mobile-bright-title">SERVICES</span>
                  <span className="mobile-bright-badge">6</span>
                </div>
                {mobileAccordion === 'services' ? (
                  <ChevronUp size={18} className="mobile-bright-chevron" />
                ) : (
                  <ChevronDown size={18} className="mobile-bright-chevron" />
                )}
              </button>

              {mobileAccordion === 'services' && (
                <div className="mobile-bright-sublist">
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('automation')}
                  >
                    Industrial Access Automation
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('cleanroom-interlocks')}
                  >
                    Cleanroom Interlocks & Pass Boxes
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('security-systems')}
                  >
                    Traffic & Perimeter Control
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('security-systems')}
                  >
                    Fire & Life Safety Systems
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('security-systems')}
                  >
                    Surveillance & Biometrics
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('hygiene')}
                  >
                    Cold Storage & Cleanroom Doors
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem-all"
                    onClick={() => handleNavClick('home', 'catalog')}
                  >
                    All services
                  </button>
                </div>
              )}
            </div>

            {/* 2. PRODUCTS Accordion (5) */}
            <div className="mobile-bright-section">
              <button
                type="button"
                className="mobile-bright-header"
                onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
                aria-expanded={mobileAccordion === 'products'}
              >
                <div className="mobile-bright-title-wrap">
                  <span className="mobile-bright-title">PRODUCTS</span>
                  <span className="mobile-bright-badge">5</span>
                </div>
                {mobileAccordion === 'products' ? (
                  <ChevronUp size={18} className="mobile-bright-chevron" />
                ) : (
                  <ChevronDown size={18} className="mobile-bright-chevron" />
                )}
              </button>

              {mobileAccordion === 'products' && (
                <div className="mobile-bright-sublist">
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleCategoryClick('Automation')}
                  >
                    Access Automation & Doors
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleCategoryClick('Security System')}
                  >
                    Traffic & Perimeter Barriers
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleCategoryClick('Hygiene')}
                  >
                    Cleanroom Interlocks & Pass Boxes
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleCategoryClick('Fire & Life Safety')}
                  >
                    Fire & Life Safety Systems
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleCategoryClick('Surveillance')}
                  >
                    Surveillance & Biometrics
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem-all"
                    onClick={() => handleNavClick('home', 'catalog')}
                  >
                    All products
                  </button>
                </div>
              )}
            </div>

            {/* 3. COMPANY Accordion (5) */}
            <div className="mobile-bright-section">
              <button
                type="button"
                className="mobile-bright-header"
                onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
                aria-expanded={mobileAccordion === 'company'}
              >
                <div className="mobile-bright-title-wrap">
                  <span className="mobile-bright-title">COMPANY</span>
                  <span className="mobile-bright-badge">5</span>
                </div>
                {mobileAccordion === 'company' ? (
                  <ChevronUp size={18} className="mobile-bright-chevron" />
                ) : (
                  <ChevronDown size={18} className="mobile-bright-chevron" />
                )}
              </button>

              {mobileAccordion === 'company' && (
                <div className="mobile-bright-sublist">
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('about')}
                  >
                    About Us
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('clients')}
                  >
                    Our Clients
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('partners')}
                  >
                    Partners & Alliances
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('blogs')}
                  >
                    Technical Blogs
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem"
                    onClick={() => handleNavClick('contact')}
                  >
                    Contact Office
                  </button>
                  <button 
                    type="button"
                    className="mobile-bright-subitem-all"
                    onClick={() => handleNavClick('about')}
                  >
                    Company overview
                  </button>
                </div>
              )}
            </div>

            {/* 4. Brochure Row with PDF Download Pill (Matches screenshot) */}
            <div className="mobile-bright-brochure-row" onClick={handleDownloadBrochure}>
              <div className="mobile-brochure-left">
                <FileText size={18} className="mobile-brochure-icon" />
                <span className="mobile-brochure-text">Brochure</span>
              </div>
              <button 
                type="button"
                className="mobile-brochure-pdf-pill"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadBrochure(e);
                }}
                aria-label="Download PDF Brochure"
              >
                <Download size={13} />
                <span>PDF</span>
              </button>
            </div>

            {/* 5. Primary CTA: Get Free Consultation (Matches screenshot) */}
            <button
              type="button"
              className="mobile-bright-consultation-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('home', 'contact');
              }}
            >
              <span>Get Free Consultation</span>
              <ArrowUpRight size={18} />
            </button>

            {/* 6. Admin Portal link */}
            <div className="mobile-bright-admin-wrap">
              <button
                type="button"
                className="mobile-bright-admin-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmin) onOpenAdmin();
                }}
              >
                <User size={15} />
                <span>Admin Portal</span>
                {inquiryCount > 0 && (
                  <span className="mobile-admin-count">{inquiryCount}</span>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
