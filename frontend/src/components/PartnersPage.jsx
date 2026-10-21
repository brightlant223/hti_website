import React from 'react';
import { ArrowLeft, Handshake, ShieldCheck, CheckCircle2, ArrowRight, Award, FileCheck, Layers, Check } from 'lucide-react';
import './PartnersPage.css';

export default function PartnersPage({ onNavigate }) {
  const partners = [
    { 
      name: 'Honeywell', 
      category: 'Fire Safety & Building Management', 
      desc: 'Global benchmark in building management controls, life-safety sensors, and addressable Morley-IAS fire panels.',
      solutions: ['Addressable Fire Alarm Panels', 'BMS Automation Interfaces', 'Life Safety Multi-Detectors']
    },
    { 
      name: 'Bosch', 
      category: 'Security & Surveillance', 
      desc: 'German precision CCTV optics, public address voice evacuation systems, and high-frequency access control.',
      solutions: ['4K IP Starlight Cameras', 'Plena Voice Alarm (PA/VA)', 'Access Professional Edition']
    },
    { 
      name: 'Metaflex', 
      category: 'Cleanroom & Medical Doors', 
      desc: 'European specialized airtight hermetic and medical cleanroom door systems compliant with healthcare hygiene norms.',
      solutions: ['Hermetic Sliding Hospital Doors', 'Cold Storage Chiller Doors', 'Airtight Airlock Systems']
    },
    { 
      name: 'Hikvision', 
      category: 'AI Video Analytics & CCTV', 
      desc: 'World-leading AI smart surveillance cameras, deep-learning perimeter protection, and enterprise NVR platforms.',
      solutions: ['ColorVu Night Vision IP Cameras', 'DeepInMind Perimeter Analytics', 'Explosion-Proof Stainless Domes']
    },
    { 
      name: 'FAAC', 
      category: 'Gate & Barrier Automation', 
      desc: 'Italian high-speed hydraulic gate operators, crash-rated automatic rising bollards, and rapid traffic boom barriers.',
      solutions: ['Continuous-Duty Hydraulic Motors', 'Anti-Terror PAS 68 Bollards', 'Toll Plaza High-Speed Barriers']
    },
    { 
      name: 'Dorma (dormakaba)', 
      category: 'Architectural Hardware & Access', 
      desc: 'Architectural-grade automatic sliding door operators, heavy-duty panic exit hardware, and hydraulic door closers.',
      solutions: ['ES 200 Heavy Door Operators', 'UL Panic Crash Exit Hardware', 'Concealed Overhead Closers']
    },
    { 
      name: 'Siemens', 
      category: 'Industrial Automation & Life Safety', 
      desc: 'German engineering excellence in industrial PLCs, building management networks, and life-safety systems.',
      solutions: ['Cerberus PRO Fire Detection', 'Desigo CC Building Management', 'S7-1200 Industrial PLCs']
    },
    { 
      name: 'Johnson Controls', 
      category: 'HVAC & Security Controls', 
      desc: 'Enterprise building automation, HVAC temperature controls, Metasys integration, and electronic access systems.',
      solutions: ['Metasys BMS Building Controls', 'Specialized Actuators & Dampers', 'Facility Explorer Interfaces']
    },
    { 
      name: 'L&T (Larsen & Toubro)', 
      category: 'Electrical & Switchgear Giants', 
      desc: 'India’s most trusted electrical switchgear, distribution panels, motor starters, and power management technology.',
      solutions: ['Motor Control Centers (MCC)', 'Air Circuit Breakers (ACB)', 'Direct-on-Line (DOL) Starters']
    },
    { 
      name: 'Cisco Systems', 
      category: 'Enterprise Unified Communications', 
      desc: 'Enterprise-grade IP-PBX communication platforms, secure VoIP gateways, and mission-critical network switches.',
      solutions: ['Cisco Unified CallManager', 'Catalyst PoE Network Switches', 'Enterprise Executive IP Phones']
    },
    { 
      name: 'Eaton', 
      category: 'Power Management & Safety', 
      desc: 'Mission-critical electrical protection, emergency lighting systems, UPS battery reserves, and surge protection hardware.',
      solutions: ['Industrial Online UPS Reserves', 'Surge Protection Devices (SPD)', 'Emergency Evacuation Lights']
    },
    { 
      name: 'Ravel Electronics', 
      category: 'Micro-Processed Fire Panels', 
      desc: 'Reliable micro-processed conventional and addressable fire alarm control panels certified to IS and UL standards.',
      solutions: ['Avani Addressable Panels', 'Conventional Zone Fire Panels', 'Addressable Optical Detectors']
    },
    { 
      name: 'Nice Group', 
      category: 'Perimeter Gate Automation', 
      desc: 'Italian precision residential and commercial sliding, swing gate automation motors, remote receivers, and barriers.',
      solutions: ['Robus Sliding Gate Motors', 'Toona Heavy Swing Actuators', 'Signo Parking Barriers']
    },
    { 
      name: 'Avtech', 
      category: 'Data Center Monitoring', 
      desc: 'Room Alert environmental temperature, humidity, power loss, and under-floor water leak monitoring for IT server rooms.',
      solutions: ['Room Alert 32E Hardware', 'Fluid Sensor Leak Cable Ropes', 'Room Alert Manager Telemetry']
    },
    { 
      name: 'Zoloto Valves', 
      category: 'Fire Hydrant & Pipeline Valves', 
      desc: 'Standard certified brass, gunmetal, and cast steel landing valves, air release valves, and fire fighting hardware.',
      solutions: ['ISI Landing Hydrant Valves', 'Double Outlet Fire Brigade Inlets', 'Quick-Release Canvas Couplings']
    }
  ];

  return (
    <div className="partners-dedicated-page">
      {/* 1. Breadcrumbs */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button className="breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Technology Partners</span>
          </div>
          <button className="back-btn" onClick={() => onNavigate('home')}>
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* 2. Hero */}
      <div className="partners-page-hero">
        <div className="container">
          <div className="partners-hero-inner">
            <div className="category-hero-badge">
              <Handshake size={16} />
              <span>GLOBAL OEM ALLIANCES</span>
            </div>
            <h1 className="partners-hero-title">World-Class OEM Engineering Partnerships</h1>
            <p className="partners-hero-desc">
              HTI integrates tier-1 global hardware and specialized industrial software to deliver certified, zero-compromise automation, fire safety, and surveillance systems.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Alliance Quality Assurance Banner */}
      <div className="partners-quality-banner">
        <div className="container">
          <div className="partners-qa-grid">
            <div className="partners-qa-item">
              <div className="partners-qa-icon">
                <FileCheck size={22} />
              </div>
              <div>
                <h2 className="partners-qa-title">Manufacturer Test Certificates (MTC)</h2>
                <p className="partners-qa-text">
                  Every OEM motor, detector, and valve supplied by HTI is backed by genuine factory test reports and batch compliance certificates.
                </p>
              </div>
            </div>

            <div className="partners-qa-item">
              <div className="partners-qa-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 className="partners-qa-title">Authorized System Integrator</h2>
                <p className="partners-qa-text">
                  Certified technicians trained directly at OEM engineering facilities in Mumbai and international manufacturing centers.
                </p>
              </div>
            </div>

            <div className="partners-qa-item">
              <div className="partners-qa-icon">
                <Layers size={22} />
              </div>
              <div>
                <h2 className="partners-qa-title">Ready OEM Spare Inventory</h2>
                <p className="partners-qa-text">
                  Comprehensive spare parts warehouse maintained in Mumbai ensuring immediate replacement under SLA maintenance contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Partners Grid */}
      <div className="partners-grid-section section">
        <div className="container">
          <div className="partners-cards-grid">
            {partners.map((p, idx) => (
              <div key={idx} className="partner-detail-card">
                <div className="partner-logo-box">
                  <span className="partner-brand-name">{p.name}</span>
                </div>
                <div className="partner-cat-badge">{p.category}</div>
                <p className="partner-desc-text">{p.desc}</p>
                
                {/* Specific Integrated Solutions */}
                <div className="partner-solutions">
                  <span className="partner-solutions-label">Authorized Product Lines:</span>
                  <div className="partner-solutions-list">
                    {p.solutions.map((sol, sIdx) => (
                      <div key={sIdx} className="partner-solution-item">
                        <Check size={12} className="partner-solution-check" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="partner-trust-line">
                  <CheckCircle2 size={14} className="partner-trust-icon" />
                  <span>Certified System Integrator & Distributor</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="partner-cta-box glass-card">
            <ShieldCheck size={36} className="partner-cta-icon" />
            <h2 className="partner-cta-title">Need a Specific OEM Specified in Your Project Tender?</h2>
            <p className="partner-cta-text">
              We supply original OEM components with manufacturer test certificates, warranty sign-offs, and factory authorization letters for corporate and government tenders.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('contact')}
            >
              <span>Contact Engineering Procurement Desk</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
