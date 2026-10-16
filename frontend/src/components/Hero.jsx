import React from 'react';
import { ShieldCheck, Cpu, Droplets, ArrowRight, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Hero({ stats, onExploreClick, onDemoClick, onQuoteClick }) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow-blob-1"></div>
      <div className="hero-glow-blob-2"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <span className="hero-badge">
              <span className="badge-dot"></span>
              HTI Automation & Security Systems Pvt. Ltd. • Established 2014
            </span>
          </div>

          <h1 className="hero-title">
            Advanced Industrial <span className="gradient-text-red">Automation</span>,{' '}
            Life-Safety <span className="gradient-text-cyan">Security</span> &{' '}
            Cleanroom <span className="text-white">Hygiene</span>
          </h1>

          <p className="hero-description">
            HTI is an engineering powerhouse delivering turnkey access automation, certified fire fighting infrastructure, multi-door clean room interlock controllers, and industrial hygiene systems to India’s leading corporate and pharmaceutical conglomerates.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={onQuoteClick}>
              <span>Get Turnkey Proposal</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={onExploreClick}>
              <span>Browse Catalog (30+ Systems)</span>
            </button>
            <button className="btn-demo-pill" onClick={onDemoClick}>
              <span className="pulse-indicator"></span>
              <span>Test Live Interlock Demo</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Key Value Highlights */}
          <div className="hero-checkmarks">
            <div className="check-item">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>Turnkey Design & Execution</span>
            </div>
            <div className="check-item">
              <CheckCircle2 size={16} className="text-red" />
              <span>USFDA 21 CFR & WHO-GMP Ready</span>
            </div>
            <div className="check-item">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>Dedicated Engineering Team</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Engineering Display */}
        <div className="hero-visual">
          <div className="system-status-card">
            <div className="status-header">
              <div className="status-title-box">
                <span className="status-led online"></span>
                <span className="status-label">HTI Central Facility Controller</span>
              </div>
              <span className="badge-pill badge-cyan">24/7 Monitored</span>
            </div>

            <div className="status-nodes-grid">
              <div className="node-box active-node">
                <div className="node-icon bg-red-glass">
                  <Cpu size={22} className="text-red" />
                </div>
                <div className="node-info">
                  <div className="node-title">Cleanroom Interlock</div>
                  <div className="node-sub">12-Door Differential Pressure</div>
                  <div className="node-status text-emerald">System Armed • Air Sealed</div>
                </div>
              </div>

              <div className="node-box">
                <div className="node-icon bg-cyan-glass">
                  <ShieldCheck size={22} className="text-cyan" />
                </div>
                <div className="node-info">
                  <div className="node-title">Fire Protection & FAS</div>
                  <div className="node-sub">Addressable Panels & Hydrant</div>
                  <div className="node-status text-emerald">Pumps Normal (8.5 kg/cm²)</div>
                </div>
              </div>

              <div className="node-box">
                <div className="node-icon bg-amber-glass">
                  <Droplets size={22} className="text-amber" />
                </div>
                <div className="node-info">
                  <div className="node-title">Hygiene & Air Barrier</div>
                  <div className="node-sub">Thermo-Zone Air Curtains</div>
                  <div className="node-status text-emerald">Velocity 22 m/s Active</div>
                </div>
              </div>
            </div>

            <div className="status-footer">
              <div className="status-mini-stat">
                <span className="mini-num">2014</span>
                <span className="mini-txt">Serving Corporate India</span>
              </div>
              <div className="status-mini-divider"></div>
              <div className="status-mini-stat">
                <span className="mini-num">100%</span>
                <span className="mini-txt">Engineering Compliance</span>
              </div>
              <div className="status-mini-divider"></div>
              <div className="status-mini-stat">
                <span className="mini-num">Mumbai</span>
                <span className="mini-txt">Headquarters (Goregaon W)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Banner */}
      <div className="container hero-stats-container">
        <div className="stats-glass-strip">
          <div className="stat-col">
            <div className="stat-number gradient-text-red">12+</div>
            <div className="stat-label">Years of Excellence (Since 2014)</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-col">
            <div className="stat-number gradient-text-cyan">{stats.total_products || 30}+</div>
            <div className="stat-label">Engineered Products & Systems</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-col">
            <div className="stat-number text-white">{stats.total_partners || 15}+</div>
            <div className="stat-label">Global Technology Brands</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-col">
            <div className="stat-number gradient-text-cyan">{stats.total_clients || 100}+</div>
            <div className="stat-label">Enterprise Corporate Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
