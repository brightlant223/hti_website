import React from 'react';
import { ArrowLeft, Handshake, ShieldCheck, CheckCircle2, ArrowRight, Award, FileCheck, Layers, Check } from 'lucide-react';

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
      <div className="partners-quality-banner section-sm">
        <div className="container">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                <FileCheck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Manufacturer Test Certificates (MTC)</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                  Every OEM motor, detector, and valve supplied by HTI is backed by genuine factory test reports and batch compliance certificates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Authorized System Integrator</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                  Certified technicians trained directly at OEM engineering facilities in Mumbai and international manufacturing centers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                <Layers size={22} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Ready OEM Spare Inventory</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
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
                <div className="mb-4 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Authorized Product Lines:</span>
                  <div className="flex flex-col gap-1">
                    {p.solutions.map((sol, sIdx) => (
                      <div key={sIdx} className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                        <Check size={12} className="text-sky-600 flex-shrink-0" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="partner-trust-line pt-3 border-t border-slate-100 mt-auto">
                  <CheckCircle2 size={14} className="text-sky-600" />
                  <span>Certified System Integrator & Distributor</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="partner-cta-box glass-card mt-16 text-center py-10 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <ShieldCheck size={36} className="text-sky-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-slate-900">Need a Specific OEM Specified in Your Project Tender?</h3>
            <p className="text-slate-600 max-w-xl mx-auto mt-2 mb-6 text-sm leading-relaxed">
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
