import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Droplets, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Users, 
  Building2, 
  Sparkles 
} from 'lucide-react';

export default function Hero({ stats = {}, onExploreClick, onDemoClick, onQuoteClick }) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow-blob-1"></div>
      <div className="hero-glow-blob-2"></div>

      <div className="container hero-container">
        {/* Left Column: Headline, Copy, Actions & Trust Highlights */}
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <span className="hero-badge-pill">
              <span className="badge-since-pill">★ SINCE 2014</span>
              <span className="badge-tagline">
                <span className="badge-text-full">Your Trusted Partner in Automation, Security & Hygiene</span>
                <span className="badge-text-compact">Automation, Security & Hygiene</span>
              </span>
            </span>
          </div>

          <h1 className="hero-title">
            Advanced Industrial <span className="hero-highlight-red">Automation</span>,{' '}
            Life-Safety <span className="hero-highlight-navy">Security</span> &{' '}
            Cleanroom <span className="hero-highlight-navy">Hygiene</span>
          </h1>

          <p className="hero-description">
            HTI is an engineering powerhouse delivering turnkey access automation, certified fire fighting infrastructure, multi-door clean room interlock control and industrial hygiene systems to India’s leading corporate and pharmaceutical conglomerates.
          </p>

          <div className="hero-cta-group">
            <button className="btn-hero-red" onClick={onQuoteClick}>
              <span>Get Enquiry / Proposal</span>
              <ArrowRight size={17} />
            </button>
            <button className="btn-hero-outline" onClick={onExploreClick}>
              <span>Browse Catalog (30+ Systems)</span>
            </button>
          </div>

          {/* Key Value Highlights with soft-blue circle checkmarks */}
          <div className="hero-checkmarks">
            <div className="check-item">
              <div className="check-icon-circle">
                <CheckCircle2 size={16} />
              </div>
              <span>Turnkey Design & Execution</span>
            </div>
            <div className="check-item">
              <div className="check-icon-circle">
                <CheckCircle2 size={16} />
              </div>
              <span>USFDA / cGMP & WHO-GMP Ready</span>
            </div>
            <div className="check-item">
              <div className="check-icon-circle">
                <CheckCircle2 size={16} />
              </div>
              <span>Dedicated Engineering Team</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Glass Atrium with Floating Engineering Status Card */}
        <div className="hero-visual">
          <div className="hero-atrium-backdrop">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
              alt="HTI Corporate Engineering Facility" 
              className="atrium-bg-img"
            />
            <div className="atrium-overlay"></div>

            {/* Floating Glass Status Card */}
            <div className="system-status-card">
              {/* Card Row 1: Central Controller & Cleanroom Interlock */}
              <div className="status-node-row">
                <div className="node-icon-box bg-icon-red">
                  <Cpu size={20} className="icon-red" />
                </div>
                <div className="node-text-col">
                  <div className="node-header-flex">
                    <span className="node-main-title">HTI Central Facility Controller</span>
                    <span className="pill-status-cyan">24/7 Monitoring</span>
                  </div>
                  <div className="node-category-label">Cleanroom Interlock</div>
                  <div className="node-sub-detail">For Clean Room & Pharma Areas (Prevent Cross Contamination)</div>
                </div>
              </div>

              {/* Card Row 2: Fire Protection & FAS */}
              <div className="status-node-row">
                <div className="node-icon-box bg-icon-fire">
                  <ShieldCheck size={20} className="icon-fire" />
                </div>
                <div className="node-text-col">
                  <span className="node-main-title">Fire Protection & FAS</span>
                  <div className="node-sub-detail">Fire Alarm & Fire Fighting Systems (Complete Safety Solution)</div>
                </div>
              </div>

              {/* Card Row 3: Hygiene & Air Barrier */}
              <div className="status-node-row">
                <div className="node-icon-box bg-icon-amber">
                  <Droplets size={20} className="icon-amber" />
                </div>
                <div className="node-text-col">
                  <span className="node-main-title">Hygiene & Air Barrier</span>
                  <div className="node-sub-detail">Hand Dryers, Air Curtains, Dispensers • Clean Rooms</div>
                </div>
              </div>

              {/* Card Row 4: Security & Access Control */}
              <div className="status-node-row">
                <div className="node-icon-box bg-icon-emerald">
                  <Lock size={20} className="icon-emerald" />
                </div>
                <div className="node-text-col">
                  <span className="node-main-title">Security & Access Control</span>
                  <div className="node-sub-detail">Biometric, RFID, CCTV, Time Attendance • Parking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Banner Matching Reference Image */}
      <div className="container hero-stats-container">
        <div className="stats-glass-strip">
          <div className="stat-col">
            <div className="stat-icon-circle">
              <Award size={22} className="stat-circle-icon" />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-red">12+</div>
              <div className="stat-label">Years of Excellence (Since 2014)</div>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-col">
            <div className="stat-icon-circle">
              <Cpu size={22} className="stat-circle-icon" />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-blue">{stats.total_products || 30}+</div>
              <div className="stat-label">Engineered Products & Systems</div>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-col">
            <div className="stat-icon-circle">
              <Building2 size={22} className="stat-circle-icon" />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-blue">{stats.total_partners || 15}+</div>
              <div className="stat-label">Global Technology Brands</div>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-col">
            <div className="stat-icon-circle">
              <Users size={22} className="stat-circle-icon" />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-blue">{(stats.total_clients && stats.total_clients > 50) ? stats.total_clients : 500}+</div>
              <div className="stat-label">Satisfied Corporate Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
