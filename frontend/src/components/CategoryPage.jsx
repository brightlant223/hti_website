import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Filter, ShieldCheck, ArrowRight, 
  Send, Sparkles, Cpu, Layers, Flame, Lock, CheckCircle2,
  PhoneCall, FileText, Check, ChevronDown, ChevronUp, Wrench,
  Clock, Award, HelpCircle, CheckSquare, Factory, Building2
} from 'lucide-react';
import { getProductsByCategory } from '../data/productsData';

export default function CategoryPage({ 
  categoryKey, 
  onNavigate, 
  onQuickQuote 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);

  // Category metadata configurations with rich content
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
          sectors: ['Pharmaceutical Manufacturing', 'Corporate Tech Parks', 'Logistics & Warehouses', 'Heavy Manufacturing', 'Airports & Transit'],
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

  // Fetch all products matching category
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

  // Filter products by search and subcategory
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
