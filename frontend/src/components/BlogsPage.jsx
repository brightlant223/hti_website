import React, { useState, useMemo, useEffect } from 'react';
import './BlogsPage.css';
import { 
  Home, 
  ChevronRight, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Filter, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Flame, 
  DoorOpen, 
  FileCheck, 
  FileText, 
  CheckCircle2, 
  Send,
  Search,
  Sparkles,
  Wind,
  ScanLine,
  SprayCan,
  X
} from 'lucide-react';

export default function BlogsPage({ onNavigate, blogs = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Cleanroom Engineering',
    'Fire & Life Safety',
    'Hygiene & Energy Efficiency',
    'Entrance Automation'
  ];

  const defaultArticles = [
    {
      id: 1,
      slug: 'optimizing-cleanroom-differential-pressure',
      title: 'Optimizing Cleanroom Differential Pressure with Multi-Door Interlock Systems',
      category: 'Cleanroom Engineering',
      categorySlug: 'cleanroom',
      author: 'Er. H. Mishra',
      authorRole: 'Lead Systems Engineer',
      readTime: '6 min read',
      date: 'October 2026',
      badge: null,
      image: '/case-studies/case-cleanroom.jpg',
      icon: Layers,
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
      categorySlug: 'fire',
      author: 'HTI Technical Projects',
      authorRole: 'Directorate',
      readTime: '5 min read',
      date: 'September 2026',
      badge: 'NBC 2016 Compliance',
      image: '/case-studies/case-fire-hydrant.jpg',
      icon: Flame,
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
      categorySlug: 'hygiene',
      author: 'HTI Clean Environment',
      authorRole: 'Division',
      readTime: '4 min read',
      date: 'August 2026',
      badge: null,
      image: '/case-studies/case-air-curtain.jpg',
      icon: Wind,
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
      categorySlug: 'automation',
      author: 'HTI Automation Engineering',
      authorRole: 'Team',
      readTime: '5 min read',
      date: 'July 2026',
      badge: null,
      image: '/case-studies/case-boom-barrier.jpg',
      icon: ScanLine,
      excerpt: 'Integration of automatic number plate recognition (ANPR), radar anti-tailgating sensors, and brushless DC boom barriers for high-security industrial gate corridors.',
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
      categorySlug: 'hygiene',
      author: 'HTI Cleanroom Solutions',
      authorRole: 'Directorate',
      readTime: '4 min read',
      date: 'June 2026',
      badge: null,
      image: '/case-studies/case-ss304-mist.jpg',
      icon: SprayCan,
      excerpt: 'Zero-particulate transfer in personnel change rooms (PCR) using electro-polished SS304 motorized shoe polishers and HEPA mist air shower tunnels.',
      takeaways: [
        'Heavy-duty nylon horsehair brush cylinders rotate at 1200 RPM with sensor-activated automatic 15-second cycles.',
        'Electro-polished Grade 304/316 stainless steel prevents microbial biofilm adherence and withstands 70% IPA wiping.',
        'Integrated HEPA H14 filtration captures 99.995% of dislodged shoe sole particulates before personnel enter sterile suites.'
      ],
      content: `Over 80% of foreign contaminants in cleanrooms enter via the soles of personnel footwear. Traditional sticky mats quickly saturate after 10 to 15 footprints, losing adhesive capture efficacy and generating recurring consumable waste.

HTI's SS304 Heavy-Duty Motorized Shoe Polishers utilize dual infrared optical sensors that trigger automatically when a cleanroom operative places their boot in the chamber. Counter-rotating antistatic nylon brushes scrub both sides and soles simultaneously, while an integrated vacuum extraction drawer traps debris inside a sealed HEPA chamber.

Constructed without exposed screws or crevices, our hygiene units satisfy both USFDA cGMP and EU-GMP Annex 1 hygiene sanitation criteria.`,
      tags: ['cGMP Annex 1', 'SS304 Hygiene', 'Shoe Polishers', 'Zero-Particulate']
    },
    {
      id: 6,
      slug: 'air-shower-pass-box-contamination-control',
      title: 'Air Shower & Pass Box Integration for Contamination Control',
      category: 'Cleanroom Engineering',
      categorySlug: 'cleanroom',
      author: 'HTI Cleanroom Validation',
      authorRole: 'Cell',
      readTime: '6 min read',
      date: 'May 2026',
      badge: null,
      image: '/hero-cleanroom-interlock-chamber.jpg',
      icon: Layers,
      excerpt: 'Design and operational best practices for air showers, pass boxes, and personnel material flow in Grade B/C/D cleanrooms to minimize particulate transfer.',
      takeaways: [
        'High-velocity HEPA-filtered air nozzles (25-30 m/s) strip loose surface particulates from cleanroom garments in 15-second cycles.',
        'Dynamic pass boxes with interlocked electromagnetic doors and UV germicidal lamps prevent cross-contamination during material transfer.',
        'Differential pressure monitoring with magnehelic gauge integration ensures containment integrity across airlock boundaries.'
      ],
      content: `In pharmaceutical manufacturing, semiconductor fabrication, and biotechnology laboratories, personnel and materials entering critical areas represent the largest source of particulate contamination. Air showers and pass boxes serve as essential engineering controls at the boundary between different cleanliness classifications.

HTI air showers utilize adjustable stainless steel nozzles delivering HEPA-filtered air at velocities exceeding 25 m/s. This scrub action dislodges surface particulates from cleanroom garments, which are then captured by pre-filters and high-efficiency HEPA H14 filters recirculated through negative-pressure plenums.

Dynamic pass boxes equipped with HEPA filtration, magnehelic differential pressure gauges, and electronic door interlocking ensure that cleanroom grade classifications remain undisturbed during raw material and sampling transfer. Integrated UV-C germicidal lamps automatically cycle between door access events to maintain sterile contact surfaces.`,
      tags: ['Cleanroom Airlocks', 'Pass Box Systems', 'HEPA Filtration', 'ISO 14644-1']
    }
  ];

  // Map backend blogs if available, using defaultArticles metadata for visual enhancements
  const articles = useMemo(() => {
    if (blogs && blogs.length > 0) {
      return blogs.map((b, idx) => {
        const defaultMatch = defaultArticles.find(
          d => d.slug === b.slug || d.title.toLowerCase().trim() === (b.title || '').toLowerCase().trim()
        );
        return {
          id: b.id || `api-${idx}`,
          slug: b.slug || `article-${b.id || idx}`,
          title: b.title,
          category: b.category || defaultMatch?.category || 'Cleanroom Engineering',
          categorySlug: (b.category || defaultMatch?.category || '').toLowerCase().includes('clean') ? 'cleanroom' :
                        (b.category || defaultMatch?.category || '').toLowerCase().includes('fire') ? 'fire' :
                        (b.category || defaultMatch?.category || '').toLowerCase().includes('hyg') ? 'hygiene' :
                        (b.category || defaultMatch?.category || '').toLowerCase().includes('auto') ? 'automation' : 'cleanroom',
          author: b.author || defaultMatch?.author || 'HTI Technical Staff',
          authorRole: b.authorRole || defaultMatch?.authorRole || 'Engineering Division',
          readTime: b.read_time || b.readTime || defaultMatch?.readTime || `${Math.max(3, Math.ceil((b.content?.length || 500) / 400))} min read`,
          date: b.date || defaultMatch?.date || (b.created_at ? new Date(b.created_at.replace(' ', 'T')).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recent'),
          badge: b.badge || defaultMatch?.badge || null,
          image: b.image_url || b.image || defaultMatch?.image || defaultArticles[idx % defaultArticles.length]?.image || '/case-studies/case-cleanroom.jpg',
          icon: b.icon || defaultMatch?.icon || Layers,
          excerpt: b.excerpt || defaultMatch?.excerpt || b.content?.slice(0, 160) + '...',
          takeaways: b.takeaways || defaultMatch?.takeaways || [
            'High precision engineering standards compliant with ISO and GMP requirements.',
            'Fail-safe hardware logic integrated with facility BMS and fire alarm interfaces.'
          ],
          content: b.content || defaultMatch?.content || b.excerpt || '',
          tags: Array.isArray(b.tags) ? b.tags : (typeof b.tags === 'string' && b.tags ? b.tags.split(',').map(t => t.trim()) : (defaultMatch?.tags || ['HTI Engineering']))
        };
      });
    }
    return defaultArticles;
  }, [blogs]);

  // Fast category counts memoization
  const categoryCounts = useMemo(() => {
    const counts = { All: articles.length };
    categories.forEach(cat => {
      if (cat === 'All') return;
      const catNorm = cat.toLowerCase().replace(/[^a-z]/g, '');
      counts[cat] = articles.filter(art => {
        const artCat = (art.category || '').toLowerCase().replace(/[^a-z]/g, '');
        return artCat.includes(catNorm) || catNorm.includes(artCat);
      }).length;
    });
    return counts;
  }, [articles, categories]);

  // Normalize category comparison and search for instant filtering
  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return articles.filter(art => {
      // Category match
      let matchesCat = true;
      if (selectedCategory !== 'All') {
        const artCat = (art.category || '').toLowerCase().replace(/[^a-z]/g, '');
        const selCat = selectedCategory.toLowerCase().replace(/[^a-z]/g, '');
        matchesCat = artCat.includes(selCat) || selCat.includes(artCat);
      }

      // Search query match across title, excerpt, author, category, and tags
      let matchesSearch = true;
      if (query) {
        const tagsString = (art.tags || []).join(' ').toLowerCase();
        matchesSearch = 
          art.title.toLowerCase().includes(query) ||
          art.excerpt.toLowerCase().includes(query) ||
          art.author.toLowerCase().includes(query) ||
          (art.category || '').toLowerCase().includes(query) ||
          tagsString.includes(query);
      }

      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Escape key listener to close active article
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedArticle) {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  const handleSelectArticle = (art) => {
    setSelectedArticle(art);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <div className="blogs-dedicated-page">
      {/* 1. Breadcrumb Bar */}
      <div className="blogs-breadcrumb-bar">
        <div className="container">
          <div className="blogs-breadcrumb-inner">
            <nav className="blogs-breadcrumb-nav" aria-label="Breadcrumb">
              <button 
                className="blogs-breadcrumb-link" 
                onClick={() => onNavigate && onNavigate('home')}
                title="Navigate to Home"
              >
                <Home size={13} className="breadcrumb-home-icon" />
                <span>Home</span>
              </button>
              <ChevronRight size={12} className="blogs-breadcrumb-separator" />
              <span className="blogs-breadcrumb-current" aria-current="page">
                Engineering Insights & Technical Articles
              </span>
            </nav>
            <div className="blogs-breadcrumb-stats">
              <span>{articles.length} Authoritative Whitepapers Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Section: Two-Column Engineering Knowledge Portal */}
      <section className="blogs-knowledge-hero">
        <div className="hero-curved-bg-left" aria-hidden="true"></div>
        <div className="hero-curved-bg-right" aria-hidden="true"></div>

        <div className="container">
          <div className="blogs-hero-grid">
            {/* Left Column: Heading, Subtitle & Info Badges */}
            <div className="blogs-hero-content-col">
              <div className="hero-pill-badge">
                <BookOpen size={14} className="hero-badge-icon" />
                <span>TECHNICAL WHITEPAPERS & CASE STUDIES</span>
              </div>

              <h1 className="blogs-hero-main-heading">
                Engineering Knowledge & <br className="hero-break" />
                <span className="heading-royal-blue">Statutory Insights</span>
              </h1>

              <p className="blogs-hero-lead-text">
                Authoritative whitepapers written by HTI application engineers covering USFDA cleanroom standards, NBC 2016 fire protection codes, and industrial entrance automation.
              </p>

              {/* Two Horizontal Information Badges */}
              <div className="blogs-hero-capsules-row">
                <div className="hero-info-capsule">
                  <div className="capsule-icon-circle circle-blue">
                    <Users size={15} />
                  </div>
                  <span className="capsule-text">Peer-Reviewed by Senior Systems Engineers</span>
                </div>

                <div className="hero-info-capsule">
                  <div className="capsule-icon-circle circle-cyan">
                    <ShieldCheck size={15} />
                  </div>
                  <span className="capsule-text">USFDA cGMP & NBC 2016 Compliant Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic 3-Panel Angled Industrial Composition */}
            <div className="blogs-hero-composition-col">
              <div className="hero-skew-composition-wrapper">
                {/* Red Diagonal Accent Bar on the Left */}
                <div className="skew-red-accent-slash" aria-hidden="true"></div>

                {/* Panel 1: Cleanroom Engineering */}
                <div className="hero-skew-panel skew-panel-cleanroom">
                  <img 
                    src="/case-studies/case-cleanroom.jpg" 
                    alt="Cleanroom Engineering pharmaceutical facility" 
                    className="skew-panel-img"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="skew-panel-gradient-overlay"></div>
                  <div className="skew-panel-pill pill-navy">
                    <Layers size={13} className="pill-icon" />
                    <span>Cleanroom Engineering</span>
                  </div>
                </div>

                {/* Panel 2: Fire & Life Safety */}
                <div className="hero-skew-panel skew-panel-fire">
                  <img 
                    src="/case-studies/case-fire-hydrant.jpg" 
                    alt="Fire and Life Safety hydrant piping network" 
                    className="skew-panel-img"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="skew-panel-gradient-overlay"></div>
                  <div className="skew-panel-pill pill-red">
                    <Flame size={13} className="pill-icon" />
                    <span>Fire & Life Safety</span>
                  </div>
                </div>

                {/* Panel 3: Entrance Automation */}
                <div className="hero-skew-panel skew-panel-automation">
                  <img 
                    src="/hero-glass-atrium.jpg" 
                    alt="Entrance Automation automatic sliding glass doors" 
                    className="skew-panel-img"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="skew-panel-gradient-overlay"></div>
                  <div className="skew-panel-pill pill-navy">
                    <DoorOpen size={13} className="pill-icon" />
                    <span>Entrance Automation</span>
                  </div>
                </div>

                {/* Red Accent Dash at Bottom Right */}
                <div className="skew-red-accent-dash" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Search Bar & Horizontal Engineering Discipline Filter Bar */}
      {!selectedArticle && (
        <section className="blogs-filter-bar-section">
          <div className="container">
            <div className="blogs-control-hub">
              {/* Search Row */}
              <div className="blogs-search-row">
                <div className="blogs-search-input-box">
                  <Search size={16} className="search-input-icon" />
                  <input
                    type="text"
                    className="blogs-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search whitepapers, standards (USFDA, ISO, NBC 2016), systems..."
                    aria-label="Search technical whitepapers"
                  />
                  {searchQuery && (
                    <button
                      className="btn-clear-search"
                      onClick={() => setSearchQuery('')}
                      title="Clear search"
                      aria-label="Clear search query"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
                <div className="blogs-search-status-badge">
                  <BookOpen size={13} />
                  <span>Showing {filteredArticles.length} of {articles.length} Whitepapers</span>
                </div>
              </div>

              {/* Discipline Filter Card */}
              <div className="blogs-filter-bar-card">
                <div className="filter-lead-label">
                  <Filter size={15} className="filter-lead-icon" />
                  <span>Engineering Discipline:</span>
                </div>

                <div className="filter-pills-scroll-track" role="tablist">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    const count = categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        role="tab"
                        aria-selected={isActive}
                        className={`discipline-filter-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        <span>{cat}</span>
                        <span className="pill-count-bubble">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Article Detail Reader View (when user opens a whitepaper) */}
      {selectedArticle && (
        <section className="article-reader-section">
          <div className="container">
            <div className="article-reader-container">
              <div className="article-reading-sheet">
                <button 
                  className="btn-back-to-articles"
                  onClick={handleBackToArticles}
                  aria-label="Return to all whitepapers"
                >
                  <ArrowLeft size={14} />
                  <span>Back to All Articles</span>
                </button>

                <div className="reader-badge-row">
                  <span className="reader-category-pill">
                    {selectedArticle.category.toUpperCase()}
                  </span>
                  {selectedArticle.badge && (
                    <span className="reader-special-badge">{selectedArticle.badge}</span>
                  )}
                  <span className="reader-time-pill">
                    <Clock size={12} /> {selectedArticle.readTime}
                  </span>
                </div>

                <h1 className="reader-title">{selectedArticle.title}</h1>
                
                <div className="reader-meta-row">
                  <div className="reader-author-info">
                    <div className="reader-author-avatar">
                      <User size={15} />
                    </div>
                    <div className="reader-author-text">
                      <span className="author-name">{selectedArticle.author}</span>
                      <span className="author-role">{selectedArticle.authorRole}</span>
                    </div>
                  </div>
                  <div className="reader-date-stamp">{selectedArticle.date}</div>
                </div>

                {/* Header Image if available */}
                {selectedArticle.image && (
                  <div className="reader-featured-media">
                    <img 
                      src={selectedArticle.image} 
                      alt={selectedArticle.title} 
                      className="reader-cover-img"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                )}

                {/* Key Takeaways Card */}
                {selectedArticle.takeaways && selectedArticle.takeaways.length > 0 && (
                  <div className="reader-takeaways-card">
                    <h4 className="takeaways-header-title">
                      <CheckCircle2 size={18} className="takeaways-green-icon" />
                      <span>Key Engineering Takeaways</span>
                    </h4>
                    <ul className="takeaways-checklist">
                      {selectedArticle.takeaways.map((item, idx) => (
                        <li key={idx} className="takeaways-check-item">
                          <span className="takeaway-bullet">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Body Text */}
                <div className="reader-content-body">
                  {selectedArticle.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="reader-body-p">{paragraph}</p>
                  ))}
                </div>

                {/* Tags */}
                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <div className="reader-tags-strip">
                    {selectedArticle.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="reader-tag-chip">#{tag}</span>
                    ))}
                  </div>
                )}

                {/* Inquiry CTA */}
                <div className="reader-inquiry-box">
                  <div className="inquiry-text-col">
                    <h4>Have an Industrial or Pharma Project Requiring This Technology?</h4>
                    <p>Discuss statutory codes, equipment specs, and custom engineering with HTI specialists.</p>
                  </div>
                  <button 
                    className="btn-inquire-engineering"
                    onClick={() => onNavigate && onNavigate('contact')}
                  >
                    <Send size={15} />
                    <span>Inquire with Engineering Directorate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Articles Grid (3 Cols on Desktop/Laptop, 2 Cols on Tablet, 1 Col on Mobile) */}
      {!selectedArticle && (
        <section className="blogs-cards-grid-section">
          <div className="container">
            {filteredArticles.length === 0 ? (
              <div className="blogs-empty-state-card">
                <BookOpen size={42} className="empty-icon" />
                <h3>No whitepapers found matching your criteria</h3>
                <p>Try switching to another discipline or clear your search term.</p>
                <button 
                  className="btn-reset-filters"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                >
                  View All Whitepapers
                </button>
              </div>
            ) : (
              <div className="blogs-three-column-grid">
                {filteredArticles.map((art) => {
                  return (
                    <article key={art.id} className="engineering-whitepaper-card">
                      {/* Landscape Thumbnail (16:9 aspect ratio) */}
                      <div className="card-media-frame">
                        <img 
                          src={art.image} 
                          alt={art.title} 
                          className="card-media-image"
                          loading="lazy"
                          decoding="async"
                          width="480"
                          height="270"
                        />
                        {/* Overlay Badge (e.g. NBC 2016 Compliance on Card 2) */}
                        {art.badge && (
                          <div className="card-floating-compliance-badge">
                            <FileCheck size={14} className="badge-check-icon" />
                            <span>{art.badge}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="card-body-shell">
                        {/* Top Meta: Red Accent Category Pill & Reading Time */}
                        <div className="card-meta-line">
                          <span className="card-category-red-pill">
                            <span className="cat-text">{art.category.toUpperCase()} →</span>
                          </span>

                          <span className="card-read-time-indicator">
                            <Clock size={12} className="time-icon" />
                            <span>{art.readTime}</span>
                          </span>
                        </div>

                        {/* Article Title */}
                        <h2 className="card-article-title" title={art.title}>
                          {art.title}
                        </h2>

                        {/* Description */}
                        <p className="card-article-description">
                          {art.excerpt}
                        </p>

                        {/* Footer: Author Info on Left & Read Whitepaper Button on Right */}
                        <div className="card-footer-anchor">
                          <div className="card-author-identity">
                            <div className="author-avatar-badge">
                              <User size={13} />
                            </div>
                            <div className="author-identity-text">
                              <span className="author-name-bold">{art.author}</span>
                              {art.authorRole && (
                                <span className="author-role-sub">{art.authorRole}</span>
                              )}
                            </div>
                          </div>

                          <button 
                            className="btn-read-whitepaper-pill"
                            onClick={() => handleSelectArticle(art)}
                            aria-label={`Read whitepaper: ${art.title}`}
                          >
                            <span>Read Whitepaper</span>
                            <ArrowRight size={13} className="btn-arrow-icon" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
