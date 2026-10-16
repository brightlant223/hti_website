import React from 'react';
import { Target, Award, Users, Compass, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function AboutUs() {
  const points = [
    {
      title: 'Serving Clients Since 2014',
      desc: 'Over a decade of reliable automation, perimeter security, and contamination control across corporate India.'
    },
    {
      title: 'Dedicated Corporate Sector Focus',
      desc: 'Specialized systems engineered specifically for pharmaceutical manufacturing, FMCG, and corporate real estate.'
    },
    {
      title: 'Experienced Engineering Team',
      desc: 'Distinguished for exceptional after-sales service and deep technical expertise of well-trained site execution engineers.'
    },
    {
      title: 'Turnkey Solution Execution',
      desc: 'From initial site surveys, mechanical fabrication, electrical integration, to commissioning and statutory sign-offs.'
    }
  ];

  const coreValues = [
    {
      icon: Zap,
      title: 'Innovation',
      desc: 'Continuously adopting state-of-the-art micro-processing, wireless IoT, and energy-conserving automation.'
    },
    {
      icon: Target,
      title: 'Perfection',
      desc: 'Meticulous precision in clean room pressure management, life-safety fire protection, and millimetric access control.'
    },
    {
      icon: ShieldCheck,
      title: 'Commitment to Quality',
      desc: 'Adherence to stringent safety codes, flameproof norms, and dependable commercial-grade equipment standards.'
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-tag">
            <Compass size={14} />
            <span>Corporate Heritage</span>
          </div>
          <h2 className="section-heading">
            About <span className="gradient-text-red">HTI Automation</span> & Security Systems
          </h2>
          <p className="section-desc">
            A dynamic engineering enterprise specializing in automation, hygiene, and life-safety systems tailored for the corporate sector.
          </p>
        </div>

        {/* Story Grid */}
        <div className="about-grid">
          <div className="glass-card about-main-card">
            <div className="about-badge-established">
              <span>Established 2014 • Mumbai, India</span>
            </div>
            <h3 className="about-lead">
              Bolstered by Experienced Engineering & Unwavering Focus on Service
            </h3>
            <p className="about-text">
              HTI Automation is a reliable automation and security system provider, serving prestigious clients since 2014. As a rapidly growing organization, we specialize across three critical interconnected disciplines: <strong>Facility Automation</strong>, <strong>Cleanroom Hygiene</strong>, and <strong>Perimeter & Life Safety Security</strong>.
            </p>
            <p className="about-text mt-4">
              Satisfied customers—including India’s most respected pharmaceutical manufacturers and Fortune 500 multinationals—are a living testament to our dedicated, helpful engineering team. We deliver end-to-end turnkey solutions designed to comply with stringent USFDA, WHO-GMP, and NBC statutory codes.
            </p>

            <div className="about-points-grid mt-6">
              {points.map((pt, idx) => (
                <div key={idx} className="about-point-item">
                  <CheckCircle2 size={18} className="text-cyan flex-shrink-0" />
                  <div>
                    <h5 className="point-title">{pt.title}</h5>
                    <p className="point-desc">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values Column */}
          <div className="about-values-col">
            <h4 className="values-header-title">Our Guiding Core Values</h4>
            <div className="values-list">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="glass-card value-card">
                    <div className="value-icon-box">
                      <Icon size={24} className="text-red" />
                    </div>
                    <div>
                      <h4 className="value-title">{val.title}</h4>
                      <p className="value-desc">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Contact Highlight */}
            <div className="office-location-card glass-card">
              <div className="loc-label">Corporate Office & Service HQ</div>
              <div className="loc-address">
                407 DR-4 Ram Mandir Road, Goregaon (West), Mumbai 400104, Maharashtra, India
              </div>
              <div className="loc-meta">
                <span>Direct Support: 9892756077 / 9594917010</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
