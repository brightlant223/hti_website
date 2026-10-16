import React from 'react';
import { Cpu, ShieldCheck, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function Segments({ onSelectSegment }) {
  const segmentsData = [
    {
      id: 'Automation',
      title: 'Automation Solutions',
      tagline: 'Precision access, high-speed industrial gates & logistics handling',
      icon: Cpu,
      accentClass: 'segment-card-red',
      badge: 'Industrial Automation',
      items: [
        'Automatic Sliding & Swing Doors',
        'Automatic Sliding & Swing Gates',
        'Telescopic & Cantilever Trackless Gates',
        'Fire Rated Doors & High-Speed PVC Roll Up Doors',
        'Sectional Overhead Doors & Dock Levellers',
        'Boom Barriers (Electromechanical / Hydraulic)',
        'Turnstiles, Flap Barriers & Bollards',
        'RFID Long Range Vehicle Readers & Car Lifts'
      ],
      description: 'Engineered for high-throughput traffic control, energy retention, and perimeter security across corporate campuses, manufacturing bays, and logistics warehouses.'
    },
    {
      id: 'Security System',
      title: 'Security & Life Safety Systems',
      tagline: 'Pharma cleanroom interlocks, turnkey fire protection & intelligent surveillance',
      icon: ShieldCheck,
      accentClass: 'segment-card-cyan',
      badge: 'Life Safety & Control',
      items: [
        'Cleanroom Door Interlock & Pass Box Systems (Ex-d & Safe)',
        'Biometric Access Control & Time Attendance',
        'CCTV Surveillance (Analogue HD, IP 4K, PTZ, Intrinsically Safe)',
        'Fire Alarm Systems (Conventional & Addressable Panels)',
        'Turnkey Fire Fighting & Hydrant Pump Infrastructure',
        'Gas Detection Systems (Toxic, Combustible & VOC)',
        'GPS Master-Slave Digital Clocks (USFDA Compliant)',
        'Server Room Environmental Alert & Monitoring Systems'
      ],
      description: 'Comprehensive defense, life-safety, and audit-grade monitoring systems protecting critical assets, personnel, and compliance in pharmaceutical and industrial setups.'
    },
    {
      id: 'Hygiene',
      title: 'Hygiene & Cleanroom Solutions',
      tagline: 'Touchless washroom automation, air curtains & contamination control',
      icon: Sparkles,
      accentClass: 'segment-card-emerald',
      badge: 'Sanitary Engineering',
      items: [
        'High Speed Hand Dryers (Single & Double Blower, T.O.P. Protected)',
        'Industrial Air Curtains (Flameproof & Thermo-Zone Barrier)',
        'Solid-Cast Brass Touchless Sensor Taps',
        'Automatic Concealed & Exposed Urinal Flush Valves',
        'Touchless Liquid Soap & Sanitizer Dispensers',
        'Lockable Automatic Roll Tissue Dispensers',
        'Heavy-Duty Two-Brush Automatic Shoe Shine Machines',
        'UV Stabilized 3mm Grade A+ Transparent PVC Strip Curtains'
      ],
      description: 'Preventing cross-contamination and reducing operational utility costs with sensor-driven water, air, and surface sanitary technology.'
    }
  ];

  return (
    <section id="segments" className="section segments-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-tag">Core Capabilities</div>
          <h2 className="section-heading">
            Three Pillars of <span className="gradient-text-red">Engineering</span> Excellence
          </h2>
          <p className="section-desc">
            Explore our specialized domain divisions catering to commercial conglomerates, pharmaceuticals, healthcare, and industrial infrastructure.
          </p>
        </div>

        <div className="segments-grid">
          {segmentsData.map((segment) => {
            const Icon = segment.icon;
            return (
              <div key={segment.id} className={`glass-card segment-card ${segment.accentClass}`}>
                <div className="segment-header">
                  <div className="segment-icon-wrap">
                    <Icon size={28} />
                  </div>
                  <span className="badge-pill segment-badge">{segment.badge}</span>
                </div>

                <h3 className="segment-title">{segment.title}</h3>
                <p className="segment-tagline">{segment.tagline}</p>
                <p className="segment-desc">{segment.description}</p>

                <div className="segment-list-title">Core Systems Include:</div>
                <ul className="segment-items-list">
                  {segment.items.map((item, idx) => (
                    <li key={idx} className="segment-item">
                      <Check size={14} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn-segment-explore"
                  onClick={() => onSelectSegment(segment.id)}
                >
                  <span>Explore {segment.id} Products</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
