import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, User, ArrowRight, Send, CheckCircle2, Filter, FileText, Download, ShieldCheck, Zap } from 'lucide-react';

export default function BlogsPage({ onNavigate }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Cleanroom Engineering',
    'Fire & Life Safety',
    'Hygiene & Energy Efficiency',
    'Entrance Automation'
  ];

  const articles = [
    {
      id: 1,
      slug: 'optimizing-cleanroom-differential-pressure',
      title: 'Optimizing Cleanroom Differential Pressure with Multi-Door Interlock Systems',
      category: 'Cleanroom Engineering',
      author: 'Er. H. Mishra, Lead Systems Engineer',
      readTime: '6 min read',
      date: 'October 2026',
      badge: 'FDA & ISO Compliance',
      excerpt: 'Understanding the role of 2-to-12 door electrical interlocking, air cascade pressure balancing, and programmable delay timers in maintaining air classification under USFDA and ISO 14644-1 guidelines.',
      takeaways: [
        'Differential pressure gradient must be maintained between +15 Pa to +30 Pa between adjacent ISO class rooms.',
        'Programmable delay timers (3–5 seconds) allow AHU to re-establish laminar air cascades before allowing the secondary door strike release.',
        'Emergency FACP fire integration drops 12V/24V power instantly, releasing all locks for safe zero-delay personnel egress.'
      ],
      content: `In sterile pharmaceutical manufacturing, preventing cross-contamination between adjacent processing blocks is the primary objective of facility engineering. When personnel move between grey areas and Grade A/B cleanrooms, opening a door creates an instantaneous pressure drop. Without an automated interlock controller, simultaneous opening of adjoining airlock doors causes turbulent particulate ingress.

HTI's multi-door interlocking architecture incorporates programmable delays between door activations. This engineered pause gives the HVAC air handling unit (AHU) the requisite 3 to 5 seconds to re-establish the critical differential pressure barrier (+15 to +30 Pascals) before allowing the secondary door strike to release.

Furthermore, for hazardous solvent storage areas, intrinsically safe and flameproof (Ex-d) door stations provide explosion protection while maintaining full integration with emergency evacuation override switches. In the event of a fire alarm trigger, all locks release immediately to enable unhindered egress.

Key Engineering Formula:
• ΔP = (Q / (Cd × A))² × (ρ / 2)
Where Q is air leakage rate through door gaps, Cd is discharge coefficient, A is crack perimeter area, and ρ is air density. Calibrated door perimeter silicone seals combined with HTI interlock synchronization reduce unintentional air loss by over 74%.`,
      tags: ['USFDA Compliance', 'ISO 14644-1', 'Differential Pressure', 'Flameproof Ex-d']
    },
    {
      id: 2,
      slug: 'turnkey-fire-hydrant-nbc-compliance',
      title: 'Turnkey Fire Hydrant & FAS Compliance under National Building Code (NBC 2016)',
      category: 'Fire & Life Safety',
      author: 'HTI Technical Projects Directorate',
      readTime: '5 min read',
      date: 'September 2026',
      badge: 'Statutory Standard',
      excerpt: 'Key technical considerations for designing, installing, and commissioning high-pressure fire hydrant piping networks and addressable fire panels for industrial plants.',
      takeaways: [
        'Part 4 of NBC 2016 mandates dedicated fire water storage coupled with electric main, diesel standby, and jockey pumps.',
        'Piping networks must withstand hydrostatic pressure test of minimum 14 kg/cm² for 2 hours with zero gauge pressure drop.',
        'FACP trip relays must automatically trigger AHU smoke damper shut-off and release all security turnstiles/locks.'
      ],
      content: `A robust fire protection infrastructure is non-negotiable for industrial warehouses, corporate campuses, and pharmaceutical API synthesis blocks. Under Part 4 of NBC 2016, industrial occupancies require a dedicated fire water storage capacity coupled with electric main, diesel standby, and pressure-sustaining jockey pumps capable of delivering 7 to 14 kg/cm² pressure.

HTI provides turnkey execution—from hydraulic pipe sizing calculations, installation of ISI-certified landing valves and canvas hose reels, to linking addressable fire alarm control panels (FACP) with automatic AHU trip dampers and emergency door releases.

Integrating the fire alarm system directly with door interlocks ensures that upon a validated smoke or heat detector trip, all electromagnetic access locks immediately drop power to enable unhindered personnel evacuation without relying on manual keys.

Pump Room Sizing Guidelines:
• Main Electric Pump: 2850 LPM capacity @ 7.0 kg/cm² head (IS 1520 compliance)
• Diesel Standby Engine: Direct mechanical drive with automatic 12V cranking sequence upon electric power phase failure.
• Jockey Pump: 180 LPM @ 7.5 kg/cm² to maintain static line pressurization without running heavy main engines for trivial micro-leaks.`,
      tags: ['NBC 2016', 'Fire Hydrant', 'Addressable Fire Alarm', 'Industrial Safety']
    },
    {
      id: 3,
      slug: 'thermo-zone-air-curtains-energy-savings',
      title: 'Thermo-Zone Air Curtains: Slashing HVAC Energy Losses in Pharmaceutical Facilities',
      category: 'Hygiene & Energy Efficiency',
      author: 'HTI Clean Environment Division',
      readTime: '4 min read',
      date: 'August 2026',
      badge: 'Energy Savings',
      excerpt: 'How calibrated laminar air curtains prevent cold air escape, block flying insect ingress, and reduce corporate energy expenditures by up to 35%.',
      takeaways: [
        'Centrifugal twin-shaft blowers produce a laminar jet velocity of 18–24 m/s at the nozzle discharge plane.',
        'Creates an aerodynamic boundary layer that repels 85%+ of ambient heat transfer during repeated door opening cycles.',
        'Reduces compressor cycling frequency, extending chiller compressor operational lifespan by 2.5x.'
      ],
      content: `Loading bays, staff entrances, and packaging corridors experience hundreds of door cycles daily. In air-conditioned and humidity-regulated spaces, each door opening allows chilled air to cascade out while humid, dusty outside air rushes in.

HTI's industrial air curtains utilize precision Thermo-Zone aerodynamic nozzles with balanced centrifugal blowers generating an air velocity of 18 to 24 m/sec. This creates an invisible, impermeable pressure curtain that stops flying insects, outdoor particulate matter, and ambient summer heat from entering.

Available in flameproof configurations for chemical atmospheres and whisper-quiet designs for corporate lobbies, air curtains typically pay for themselves within 8 to 14 months through HVAC electricity reduction alone.

Aerodynamic Discharge Geometry:
The air jet angle is calibrated at 15° outward tilt relative to the door opening plane. This angled jet deflects external headwind pressure vectors (up to 12 km/h ambient gusts) without entraining airborne floor dust into clean production rooms.`,
      tags: ['Energy Efficiency', 'HVAC Optimization', 'Cleanroom Hygiene', 'Insect Barrier']
    },
    {
      id: 4,
      slug: 'ai-video-analytics-boom-barriers-logistics',
      title: 'AI Video Analytics & Dual-Loop Boom Barriers: Securing Industrial Gate Corridors',
      category: 'Entrance Automation',
      author: 'HTI Automation Engineering Team',
      readTime: '5 min read',
      date: 'July 2026',
      badge: 'High Security Automation',
      excerpt: 'Integration of automatic number plate recognition (ANPR), radar anti-tailgating sensors, and brushless DC boom barriers for high-throughput logistics hubs.',
      takeaways: [
        'Brushless DC (BLDC) torque motors achieve 0.9 to 1.5 second opening speeds with 100% duty cycle rating.',
        'Dual inductive magnetic loops combined with microwave radar beams prevent arm drop on trailing trailers and tailgating vehicles.',
        'Seamless API bridge with SAP ERP, WMS, and FASTag automated tolling platforms.'
      ],
      content: `Modern multi-acre logistics hubs and manufacturing plants process upwards of 2,000 heavy commercial vehicles per shift. Manual guard inspection at entry gates creates vehicle queuing backlogs extending onto public highways.

HTI deploys high-speed BLDC boom barrier systems paired with AI ANPR cameras capable of reading Indian state HSRP number plates at 98.4% accuracy even under torrential rain or headlight glare.

Safety is paramount: HTI utilizes dual inductive loops embedded in concrete paired with a 24 GHz microwave radar sensor. Even if a vehicle stops directly under the descending boom arm, the anti-smash algorithm halts descent and auto-reverses the boom within 12 milliseconds, eliminating vehicle damage liability.`,
      tags: ['ANPR Cameras', 'BLDC Motors', 'Anti-Tailgating', 'Logistics Automation']
    },
    {
      id: 5,
      slug: 'ss304-shoe-polishers-mist-air-showers',
      title: 'Static Dissipative SS304 Shoe Polishers & Mist Air Showers in Sterile Pharma Production',
      category: 'Hygiene & Energy Efficiency',
      author: 'HTI Cleanroom Solutions Directorate',
      readTime: '4 min read',
      date: 'June 2026',
      badge: 'Cleanroom Hygiene Protocol',
      excerpt: 'Achieving zero-particulate transfer in personnel change rooms (PCR) using electro-polished SS304 motorized shoe polishers and HEPA mist air shower tunnels.',
      takeaways: [
        'Heavy-duty nylon horsehair brush cylinders rotate at 1200 RPM with sensor-activated automatic 15-second cycles.',
        'Electro-polished Grade 304/316 stainless steel prevents microbial biofilm adherence and withstands 70% IPA wiping.',
        'Integrated HEPA H14 filtration captures 99.995% of dislodged shoe sole particulates before personnel enter sterile suites.'
      ],
      content: `Over 80% of foreign contaminants in cleanrooms enter via the soles of personnel footwear. Traditional sticky mats quickly saturate after 10 to 15 footprints, losing adhesive capture efficacy and generating recurring consumable waste.

HTI's SS304 Heavy-Duty Motorized Shoe Polishers utilize dual infrared optical sensors that trigger automatically when a cleanroom operative places their boot in the chamber. Counter-rotating antistatic nylon brushes scrub both sides and soles simultaneously, while an integrated vacuum extraction drawer traps debris inside a sealed HEPA chamber.

Constructed without exposed screws or crevices, our hygiene units satisfy both USFDA cGMP and EU-GMP Annex 1 hygiene sanitation criteria.`,
      tags: ['cGMP Annex 1', 'SS304 Hygiene', 'Shoe Polishers', 'Zero-Particulate']
    }
  ];

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="blogs-dedicated-page">
      {/* 1. Breadcrumbs */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button className="breadcrumb-link" onClick={() => onNavigate('home')}>Home</button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Engineering Insights & Technical Articles</span>
          </div>
          <button className="back-btn" onClick={() => onNavigate('home')}>
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* 2. Hero */}
      <div className="blogs-page-hero">
        <div className="container">
          <div className="blogs-hero-inner">
            <div className="category-hero-badge">
              <BookOpen size={16} />
              <span>TECHNICAL WHITEPAPERS & CASE STUDIES</span>
            </div>
            <h1 className="blogs-hero-title">Engineering Knowledge & Statutory Insights</h1>
            <p className="blogs-hero-desc">
              Authoritative whitepapers written by HTI application engineers covering USFDA cleanroom standards, NBC 2016 fire protection codes, and industrial entrance automation.
            </p>

            {/* Quick Stat Bar */}
            <div className="blogs-hero-stats mt-6">
              <div className="blogs-stat-pill">
                <ShieldCheck size={16} className="text-cyan" />
                <span>Peer-Reviewed by Senior Systems Engineers</span>
              </div>
              <div className="blogs-stat-pill">
                <Zap size={16} className="text-cyan" />
                <span>USFDA cGMP & NBC 2016 Compliant Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      {!selectedArticle && (
        <div className="blogs-filter-section">
          <div className="container">
            <div className="blogs-filter-row">
              <div className="filter-label-wrap">
                <Filter size={15} />
                <span>Filter by Engineering Discipline:</span>
              </div>
              <div className="filter-pills-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Article Detail View */}
      {selectedArticle && (
        <div className="article-reader-section section">
          <div className="container">
            <div className="glass-card article-reading-card">
              <button 
                className="btn btn-secondary btn-sm mb-6"
                onClick={() => setSelectedArticle(null)}
              >
                <ArrowLeft size={14} />
                <span>Back to All Articles</span>
              </button>

              <div className="reader-badge-row">
                <span className="detail-category-badge">{selectedArticle.category}</span>
                <span className="detail-highlight-badge">{selectedArticle.badge}</span>
                <span className="reader-time"><Clock size={13} /> {selectedArticle.readTime}</span>
              </div>

              <h1 className="reader-title mt-3">{selectedArticle.title}</h1>
              
              <div className="reader-meta-row mt-4 mb-8">
                <div className="reader-author">
                  <User size={16} className="text-cyan" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="reader-date">{selectedArticle.date}</div>
              </div>

              {/* Key Takeaways Card */}
              {selectedArticle.takeaways && (
                <div className="article-takeaways-box mb-8">
                  <h4 className="takeaways-title">
                    <CheckCircle2 size={18} className="text-emerald" />
                    Key Engineering Takeaways
                  </h4>
                  <ul className="takeaways-list">
                    {selectedArticle.takeaways.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="reader-body-content">
                {selectedArticle.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="reader-paragraph">{paragraph}</p>
                ))}
              </div>

              <div className="reader-tags-row mt-8">
                {selectedArticle.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="reader-tag-pill">#{tag}</span>
                ))}
              </div>

              <div className="reader-cta-box glass-card mt-10">
                <h4>Have a Project Requiring This Technology?</h4>
                <p>Discuss technical specifications with the authoring engineering team at HTI.</p>
                <button 
                  className="btn btn-primary mt-4"
                  onClick={() => onNavigate('contact')}
                >
                  <Send size={15} />
                  <span>Inquire with Engineering Directorate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Articles Grid */}
      {!selectedArticle && (
        <div className="blogs-grid-section section">
          <div className="container">
            <div className="blogs-cards-grid">
              {filteredArticles.map((art) => (
                <div key={art.id} className="glass-card blog-article-card">
                  <div className="article-top-row">
                    <span className="article-cat-badge">{art.category}</span>
                    <span className="article-read-time">
                      <Clock size={12} />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="article-card-title">{art.title}</h3>
                  <p className="article-excerpt-text">{art.excerpt}</p>

                  <div className="article-footer-row mt-6">
                    <span className="article-author-name">{art.author}</span>
                    <button 
                      className="btn btn-outline-cyan btn-sm"
                      onClick={() => {
                        setSelectedArticle(art);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                    >
                      <span>Read Whitepaper</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
