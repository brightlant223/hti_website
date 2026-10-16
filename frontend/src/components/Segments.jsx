import React from 'react';
import { Cpu, ShieldCheck, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function Segments({ onSelectSegment }) {
  const pillars = [
    {
      id: 'Automation',
      title: 'Automation Solutions',
      subtitle: 'Precision access, high-speed industrial gates & logistics handling systems.',
      icon: Cpu,
      iconColor: '#0284c7',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      items: [
        'Automatic Doors, Gates & Barriers',
        'High Speed & Sectional Doors',
        'Dock Levellers & Dock Shelters',
        'Turnstiles, Flap Barriers & Car Lifts',
        'Industrial Doors & Rolling Shutters'
      ],
      linkText: 'Explore Automation Products'
    },
    {
      id: 'Security System',
      title: 'Security & Life Safety Systems',
      subtitle: 'Maintain safety, secure and compliant facilities with integrated security & fire solutions.',
      icon: ShieldCheck,
      iconColor: '#0284c7',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      items: [
        'Access Control & Time Attendance',
        'CCTV Surveillance (HD & IP)',
        'Fire Alarm System (Conventional/Addressable)',
        'Fire Fighting & Gas Detection System',
        'IP PBX & Parking Management'
      ],
      linkText: 'Explore Security Products'
    },
    {
      id: 'Hygiene',
      title: 'Hygiene & Cleanroom Solutions',
      subtitle: 'Touchless and hygienic solutions for clean rooms, healthcare and industrial facilities.',
      icon: Sparkles,
      iconColor: '#0d9488',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      items: [
        'Hand Dryers, Air Curtains & Air Barrier',
        'Auto Taps & Urinal Flush',
        'Liquid Soap & Aerosol Dispenser',
        'PVC Strip Curtains & Insect Killers',
        'Automatic Shoe Cover Dispenser'
      ],
      linkText: 'Explore Hygiene Products'
    }
  ];

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="container">
        {/* Section Header with Pill Badge */}
        <div className="section-header-center">
          <div className="pill-badge-blue">OUR CAPABILITIES</div>
          <h2 className="section-title-large">
            Three Pillars of <span className="title-highlight-blue">Engineering</span> Excellence
          </h2>
          <p className="section-subtitle-center">
            Explore our specialized domain divisions catering to commercial, industrial, pharmaceutical, healthcare and infrastructure projects.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="pillars-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className="pillar-card">
                {/* Top Image */}
                <div className="pillar-img-wrap">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="pillar-card-img"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="pillar-card-content">
                  <div className="pillar-title-row">
                    <div className="pillar-icon-box" style={{ color: pillar.iconColor }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="pillar-title">{pillar.title}</h3>
                  </div>

                  <p className="pillar-subtitle">{pillar.subtitle}</p>

                  {/* Bullet Points with Checkmarks */}
                  <ul className="pillar-checklist">
                    {pillar.items.map((item, idx) => (
                      <li key={idx} className="pillar-check-item">
                        <div className="check-bullet-circle">
                          <Check size={12} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Link */}
                  <button 
                    className="pillar-explore-link"
                    onClick={() => onSelectSegment(pillar.id)}
                  >
                    <span>{pillar.linkText}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
