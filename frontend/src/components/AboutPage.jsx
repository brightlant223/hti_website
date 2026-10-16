import React from 'react';
import { 
  ArrowLeft, Compass, ShieldCheck, Award, Users, CheckCircle2, 
  Zap, Target, Building2, MapPin, PhoneCall, Send, FileText, Check,
  Wrench, Activity, Factory, HeartHandshake, CheckSquare
} from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const milestones = [
    {
      year: '2014',
      title: 'Foundation in Mumbai',
      desc: 'Established in Goregaon (West), Mumbai with a vision to deliver reliable industrial automation and perimeter access solutions for commercial real estate.'
    },
    {
      year: '2017',
      title: 'Cleanroom Interlock Breakthrough',
      desc: 'Engineered specialized flameproof (Ex-d) and multi-door interlock logic controllers compliant with USFDA 21 CFR Part 11 for leading pharma plants.'
    },
    {
      year: '2020',
      title: 'Touchless Hygiene Infrastructure',
      desc: 'Introduced high-velocity double-blower hand dryers, solid-cast brass sensor taps, and aerodynamic thermo-zone air curtains nationwide.'
    },
    {
      year: '2023',
      title: 'AI Surveillance & Turnkey Fire Safety',
      desc: 'Expanded into 4K AI perimeter video analytics, addressable fire alarm panels, and turnkey NBC 2016 fire hydrant pumping infrastructure.'
    },
    {
      year: '2026',
      title: 'Trusted Partner to 450+ Corporates',
      desc: 'Providing 24/7 mission-critical maintenance and turnkey execution across Maharashtra, Gujarat, Goa, Telangana, and pan-India industrial clusters.'
    }
  ];

  const corePillars = [
    {
      icon: Zap,
      title: 'Precision Engineering',
      desc: 'Micro-processed brushless DC drives, high-pressure hydraulic manifolds, and custom GA mechanical fabrication engineered down to the millimetre.'
    },
    {
      icon: ShieldCheck,
      title: 'Statutory Code Compliance',
      desc: 'Zero-compromise adherence to NBC 2016 Part 4, USFDA 21 CFR Part 11, EN 16005 pedestrian safety, and PESO / ATEX flameproof norms.'
    },
    {
      icon: Wrench,
      title: 'Turnkey Responsibility',
      desc: 'From initial site surveys in Mumbai to turnkey PAN-India commissioning, testing, civil foundations, electrical cabling, and statutory sign-offs.'
    },
    {
      icon: HeartHandshake,
      title: 'Service Continuity & SLA',
      desc: 'Dedicated round-the-clock emergency assistance, resident maintenance engineers, and guaranteed spare parts availability in Mumbai.'
    }
  ];

  const qualityProtocols = [
    {
      title: '50,000 Cycle Continuous Load Stress Test',
      detail: 'All gate and door motor operators are endurance-tested under full mechanical load before site delivery.'
    },
    {
      title: 'Hydrostatic Pressure & Fire Burn Integrity',
      detail: 'Fire rated doors and fire hydrant valves undergo testing compliant with IS 3614, BS 476, and TAC norms.'
    },
    {
      title: 'Airtight Leakage Calibration (EN 12207)',
      detail: 'Chiller doors and cleanroom hermetic seals undergo positive and negative pressure decay testing.'
    },
    {
      title: 'High-Voltage Dielectric Insulation Test',
      detail: 'Interlocking controllers, timers, and power packs undergo high-voltage surge and insulation resistance checks.'
    },
    {
      title: 'Optical Sensor Sensitivity & Auto-Reverse Check',
      detail: 'Safety photocells and bottom wireless edges are calibrated to reverse traversal within 0.15 seconds of obstruction.'
    },
    {
      title: 'Flameproof Explosion-Containment Inspection',
      detail: 'Cast enclosures undergo hydrostatic pressure containment tests compliant with IS/IEC 60079-1 standards.'
    }
  ];

  const certifications = [
    { title: 'ISO 9001:2015', desc: 'Certified Quality Management System for design, supply, fabrication & turnkey commissioning.' },
    { title: 'USFDA 21 CFR Part 11', desc: 'Compliant cleanroom door interlocking logic, electronic batch audit trails, and GPS clocks.' },
    { title: 'NBC 2016 Part 4', desc: 'Turnkey compliance for industrial fire hydrant pumping networks, piping, and addressable fire alarm panels.' },
    { title: 'CE & EN 16005', desc: 'European safety directives for automatic pedestrian sliding and swing doors with anti-pinch technology.' },
    { title: 'Flameproof Ex-d Group IIA, IIB', desc: 'PESO / ATEX certified enclosures for hazardous chemical, solvent synthesis, and explosive atmospheres.' },
    { title: 'IS 3614 / BS 476 Part 20/22', desc: 'Certified 60, 120, and 240-minute fire resistant hollow metal doors and motorized rolling shutters.' }
  ];

  return (
    <div className="about-dedicated-page">
      {/* 1. Breadcrumbs */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button className="breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">About Us</span>
          </div>
          <button className="back-btn" onClick={() => onNavigate('home')}>
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="about-page-hero">
        <div className="container">
          <div className="about-hero-inner">
            <div className="category-hero-badge">
              <Compass size={16} />
              <span>ENGINEERING HERITAGE SINCE 2014</span>
            </div>
            <h1 className="about-hero-title">
              Pioneering Industrial Automation, Cleanroom Hygiene & Life Safety
            </h1>
            <p className="about-hero-desc">
              HTI Automation & Security Systems Pvt. Ltd. is an Indian engineering enterprise dedicated to mission-critical access automation, sterile pharma contamination control, and life-safety systems.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Corporate Overview */}
      <div className="about-content-section section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-card">
              <div className="story-badge">MUMBAI HEADQUARTERS</div>
              <h2 className="story-title">Over a Decade of Engineering Trust Across Indian Industry</h2>
              <p className="story-p">
                Founded in 2014 in Mumbai, HTI Automation began with a single core philosophy: <strong>engineering precision paired with dependable, responsive after-sales service</strong>. What began as a perimeter gate automation specialist has matured into one of India’s most trusted turnkey solution providers across three critical sectors:
              </p>
              
              <div className="story-disciplines-list mt-6">
                <div className="discipline-item">
                  <div className="disc-num">01</div>
                  <div>
                    <h4>Industrial Access Automation</h4>
                    <p>High-speed roll-up doors, telescopic cantilever gates, dock levellers, and optical speed gates engineered for continuous heavy-duty industrial cycles.</p>
                  </div>
                </div>

                <div className="discipline-item">
                  <div className="disc-num">02</div>
                  <div>
                    <h4>Cleanroom & Environmental Hygiene</h4>
                    <p>USFDA-compliant multi-door interlocks, dynamic pass boxes, touchless sensor taps, and aerodynamic air curtains preventing cleanroom contamination.</p>
                  </div>
                </div>

                <div className="discipline-item">
                  <div className="disc-num">03</div>
                  <div>
                    <h4>Perimeter Defense & Life Safety</h4>
                    <p>Turnkey fire hydrant networks, addressable fire alarm panels, anti-ram rising bollards, and 4K AI video surveillance installations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Corporate Facts Card */}
            <div className="about-stats-sidebar">
              <div className="facts-card">
                <h3 className="facts-title">HTI at a Glance</h3>
                <div className="facts-list">
                  <div className="fact-row">
                    <span className="fact-lbl">Year Established</span>
                    <span className="fact-val">2014</span>
                  </div>
                  <div className="fact-row">
                    <span className="fact-lbl">Corporate Office</span>
                    <span className="fact-val">Goregaon (West), Mumbai</span>
                  </div>
                  <div className="fact-row">
                    <span className="fact-lbl">Clients Served</span>
                    <span className="fact-val">450+ Enterprises</span>
                  </div>
                  <div className="fact-row">
                    <span className="fact-lbl">Active Products</span>
                    <span className="fact-val">33+ Engineered Systems</span>
                  </div>
                  <div className="fact-row">
                    <span className="fact-lbl">Geographic Reach</span>
                    <span className="fact-val">Pan-India Support</span>
                  </div>
                  <div className="fact-row">
                    <span className="fact-lbl">SLA Uptime</span>
                    <span className="fact-val">99.8% Guaranteed</span>
                  </div>
                </div>

                <div className="facts-contact-box mt-6">
                  <p className="contact-prompt text-sm text-slate-600 mb-3">
                    Have a corporate tender, site survey requirement, or turnkey project?
                  </p>
                  <button 
                    className="btn btn-primary w-full"
                    onClick={() => onNavigate('contact')}
                  >
                    <Send size={15} />
                    <span>Contact Project Directorate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Core Pillars */}
          <div className="core-pillars-section mt-16">
            <div className="section-title-wrap text-center mb-8">
              <div className="section-tag inline-flex items-center gap-2">
                <Target size={14} />
                <span>Foundational Values</span>
              </div>
              <h2 className="section-heading text-2xl font-bold text-slate-900 mt-2">
                Our Core Engineering Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {corePillars.map((pil, idx) => {
                const Icon = pil.icon;
                return (
                  <div key={idx} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{pil.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{pil.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Milestones Timeline */}
          <div className="milestones-section mt-16">
            <div className="section-title-wrap text-center mb-8">
              <div className="section-tag inline-flex items-center gap-2">
                <Award size={14} />
                <span>Our Track Record</span>
              </div>
              <h2 className="section-heading text-2xl font-bold text-slate-900 mt-2">
                Milestones in Our Journey
              </h2>
            </div>

            <div className="milestones-timeline-grid">
              {milestones.map((m, idx) => (
                <div key={idx} className="milestone-card">
                  <div className="milestone-year">{m.year}</div>
                  <h4 className="milestone-title">{m.title}</h4>
                  <p className="milestone-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Quality Testing Protocols */}
          <div className="quality-protocols-section mt-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="section-title-wrap mb-6">
              <div className="section-tag inline-flex items-center gap-2">
                <CheckSquare size={14} />
                <span>Rigorous Quality Control</span>
              </div>
              <h3 className="section-heading text-2xl font-bold text-slate-900 mt-2">
                Factory Acceptance Testing (FAT) Protocols
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Before any motorized door, barrier, or interlock panel leaves our facility, it passes 6 mandatory validation benchmarks:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qualityProtocols.map((qp, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{qp.title}</h5>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">{qp.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Standards & Certifications */}
          <div className="certifications-section mt-16">
            <div className="section-title-wrap text-center mb-8">
              <div className="section-tag inline-flex items-center gap-2">
                <ShieldCheck size={14} />
                <span>Quality & Compliance</span>
              </div>
              <h2 className="section-heading text-2xl font-bold text-slate-900 mt-2">
                Statutory Certifications & Statutory Codes
              </h2>
            </div>

            <div className="cert-cards-grid">
              {certifications.map((c, idx) => (
                <div key={idx} className="cert-card">
                  <div className="cert-icon-wrap">
                    <CheckCircle2 size={24} className="text-sky-600" />
                  </div>
                  <h4 className="cert-title">{c.title}</h4>
                  <p className="cert-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
