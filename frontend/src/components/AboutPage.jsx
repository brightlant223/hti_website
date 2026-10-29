import React, { useState, useRef, useEffect } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Leaf, 
  Calendar, 
  MapPin, 
  Briefcase,
  Wrench,
  Award, 
  Users, 
  Headphones,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';
import '../Aboutus.css';

export default function AboutPage({ onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState('02:15');
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll scale-up effect: increases container size on scroll, then reveals full scale
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (videoSectionRef.current) {
            const rect = videoSectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Starts expanding when section top enters near viewport bottom (95%)
            // Reaches full 100% scale and presentation when top reaches around 28% from viewport top
            const startOffset = windowHeight * 0.95;
            const endOffset = windowHeight * 0.28;
            
            const raw = (startOffset - rect.top) / (startOffset - endOffset);
            const clamped = Math.min(Math.max(raw, 0), 1);
            setScrollProgress(clamped);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNav = (page, section = null) => {
    if (onNavigate) {
      onNavigate(page, section);
    } else {
      window.location.href = `/${page}`;
    }
  };

  // The solution segment cards are clickable cards, so they must also respond
  // to Enter / Space when they are focused.
  const handleSegmentKey = (event, page) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      handleNav(page);
    }
  };

  const scrollToSolutions = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '02:15';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(formatTime(videoRef.current.duration - videoRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  // 14 Global Technology Partners split into two uniform rows for the train marquee animation
  const partnerBrandsRow1 = [
    { name: 'Honeywell', logo: '/logos/honeywell.png' },
    { name: 'Bosch', logo: '/logos/bosch.png' },
    { name: 'Cisco', logo: '/logos/cisco.png' },
    { name: 'Eaton', logo: '/logos/eaton.png' },
    { name: 'ABB', type: 'text', markClass: 'mark-abb', color: '#ff000f', text: 'ABB' },
    { name: 'GE', type: 'text', markClass: 'mark-ge', color: '#005eb8', text: 'GE' },
    { name: 'Hitachi', type: 'text', markClass: 'mark-hitachi', color: '#e60012', text: 'HITACHI' }
  ];

  const partnerBrandsRow2 = [
    { name: 'SICK', type: 'text', markClass: 'mark-sick', color: '#007bc0', text: 'SICK' },
    { name: 'Legrand', type: 'text', markClass: 'mark-legrand', color: '#e60000', text: 'legrand' },
    { name: 'Nice', logo: '/logos/nice.png' },
    { name: 'Avtech', logo: '/logos/avtech.png' },
    { name: 'Johnson Controls', logo: '/logos/johnson-controls.png' },
    { name: 'Siemens', logo: '/logos/Siemens.png' },
    { name: 'Vanderlande', type: 'text', markClass: 'mark-vanderlande', color: '#d4111e', text: 'VANDERLANDE' }
  ];

  // Quadruple to guarantee a perfectly seamless infinite loop when translating -50%
  const trainList1 = [...partnerBrandsRow1, ...partnerBrandsRow1, ...partnerBrandsRow1, ...partnerBrandsRow1];
  const trainList2 = [...partnerBrandsRow2, ...partnerBrandsRow2, ...partnerBrandsRow2, ...partnerBrandsRow2];

  return (
    <div className="about-page-wrapper">
      {/* =====================================================================
          1. HERO SECTION: Reliable Automation, Hygiene & Security Solutions
          ===================================================================== */}
      <section className="about-hero-section">
        <div className="about-container">
          <div className="about-hero-grid">
            {/* Left Content */}
            <div className="about-hero-left">
              <div className="section-kicker-blue">
                <span className="kicker-line-blue"></span>
                <span>HTI AUTOMATION &amp; SECURITY SYSTEM PVT. LTD.</span>
              </div>

              <h1 className="about-hero-heading">
                Reliable Automation,<br />
                Hygiene &amp; Security<br />
                Solutions
              </h1>

              <p className="about-hero-desc">
                HTI delivers advanced automation, life-safety, security and hygiene solutions for critical facilities. We combine innovation, quality and service excellence to build safer, smarter and cleaner environments.
              </p>

              {/* 4 Feature Badges in Hero */}
              <div className="about-hero-badges-row">
                <div className="hero-pill-badge">
                  <ShieldCheck size={16} className="hero-pill-icon" />
                  <span>Trusted Expertise</span>
                </div>

                <div className="hero-pill-badge">
                  <Settings size={16} className="hero-pill-icon" />
                  <span>Industrial Solutions</span>
                </div>

                <div className="hero-pill-badge">
                  <Leaf size={16} className="hero-pill-icon hero-pill-icon-emerald" />
                  <span>Hygiene Excellence</span>
                </div>

                <div className="hero-pill-badge">
                  <Headphones size={16} className="hero-pill-icon" />
                  <span>End-to-End Support</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Column with Floating Card */}
            <div className="about-hero-image-col">
              <div className="about-hero-image-wrap">
                <img 
                  src="/about-hero-cleanroom.jpg" 
                  alt="HTI Cleanroom Automated Glass Doors and Engineer" 
                  className="about-hero-img"
                  loading="eager"
                />

                {/* Floating Card in Bottom Right */}
                <div className="hero-floating-card">
                  <div className="floating-card-text">
                    <div className="floating-card-title">Engineering</div>
                    <div className="floating-card-sub">Cleaner, Safer<br />and Smarter Spaces</div>
                  </div>
                  <div className="floating-card-arrow-btn" aria-hidden="true">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Cue to Next Section */}
          <div className="about-hero-scroll-cue" onClick={scrollToSolutions} role="button" tabIndex={0}>
            <span>Scroll to explore solutions</span>
            <ChevronDown size={18} className="scroll-chevron-bounce" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. VIDEO PLAYER SECTION: See Our Solutions in Action
          ===================================================================== */}
      <section className="about-video-section" ref={videoSectionRef}>
        <div className="about-container">
          <div 
            className="video-section-header"
            style={{
              transform: `scale(${(0.94 + scrollProgress * 0.06).toFixed(3)}) translateY(${((1 - scrollProgress) * 8).toFixed(1)}px)`,
              opacity: (0.75 + scrollProgress * 0.25).toFixed(2),
              transformOrigin: 'left bottom',
              transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.15s ease'
            }}
          >
            <div className="section-kicker-blue">
              <span className="kicker-line-blue"></span>
              <span>SEE OUR SOLUTIONS IN ACTION</span>
            </div>
            <h2 className="video-section-heading">See Our Solutions in Action</h2>
            <p className="video-section-sub">
              Discover how HTI delivers reliable automation, hygiene and security solutions.
            </p>
          </div>

          {/* Interactive 16:9 Video Player Card with Smooth Scroll Expansion */}
          <div 
            className={`video-player-container ${scrollProgress >= 0.92 ? 'is-revealed' : ''}`}
            style={{
              transform: `scale(${(0.88 + scrollProgress * 0.12).toFixed(3)})`,
              borderRadius: `${(26 - scrollProgress * 12).toFixed(1)}px`,
              boxShadow: scrollProgress > 0.6 
                ? '0 24px 60px rgba(11, 26, 46, 0.22), 0 4px 20px rgba(2, 132, 199, 0.14)' 
                : '0 12px 30px rgba(11, 26, 46, 0.12)',
              transition: 'transform 0.16s cubic-bezier(0.25, 0.8, 0.25, 1), border-radius 0.16s ease, box-shadow 0.25s ease',
              transformOrigin: 'center top'
            }}
          >
            <video
              ref={videoRef}
              src="/gemini_generated_video_02f233ca.mp4"
              poster="/about-hero-cleanroom.jpg"
              className="about-main-video"
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            />

            {/* Video Scrim Overlay */}
            <div 
              className={`video-overlay-scrim ${isPlaying ? 'is-playing' : ''}`}
              onClick={togglePlay}
            >
              <div></div>

              {/* Center Play/Pause Button */}
              <button 
                type="button" 
                className="video-play-btn-center"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? (
                  <Pause size={28} />
                ) : (
                  <Play size={28} fill="currentColor" className="play-triangle-icon" />
                )}
              </button>

              {/* Bottom Info Bar */}
              <div className="video-bottom-bar">
                <div className="video-bottom-info">
                  <span className="video-tag">COMPANY OVERVIEW</span>
                  <div className="video-title">Inside HTI Automation &amp; Security</div>
                </div>

                <div className="video-duration-pill">
                  <span>{duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. BACKGROUND & HTI AT A GLANCE (2 Columns)
          ===================================================================== */}
      <section className="about-bg-section">
        <div className="about-container">
          <div className="about-bg-grid">
            {/* Left Column: Our Background */}
            <div className="about-bg-left">
              <div className="section-kicker-red">
                <span className="kicker-line"></span>
                <span>OUR BACKGROUND</span>
              </div>

              <h2 className="about-section-heading">
                Built on Engineering, Service &amp; Quality
              </h2>

              <p className="about-lead-desc">
                HTI Automation &amp; Security System Pvt. Ltd. is a trusted provider of automation, hygiene and security solutions, serving diverse industries with advanced technology, reliable service and a commitment to quality, safety and customer satisfaction.
              </p>

              {/* 3 Numbered Feature Cards (01, 02, 03) */}
              <div className="about-features-stack">
                {/* 01: Automation */}
                <div 
                  className="about-feat-item"
                  onClick={() => handleNav('automation')}
                >
                  <div className="about-feat-icon-wrap">
                    <Settings size={20} />
                  </div>
                  <div className="about-feat-num">01</div>
                  <div className="about-feat-text">
                    <div className="about-feat-title">Automation</div>
                    <p className="about-feat-p">
                      Advanced and customized automation solutions to improve efficiency, accuracy and operational control across industries.
                    </p>
                  </div>
                  <ChevronRight size={18} className="about-feat-arrow" />
                </div>

                {/* 02: Security Systems */}
                <div 
                  className="about-feat-item"
                  onClick={() => handleNav('security-systems')}
                >
                  <div className="about-feat-icon-wrap">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="about-feat-num">02</div>
                  <div className="about-feat-text">
                    <div className="about-feat-title">Security Systems</div>
                    <p className="about-feat-p">
                      Integrated security and surveillance solutions to ensure safety, compliance and peace of mind.
                    </p>
                  </div>
                  <ChevronRight size={18} className="about-feat-arrow" />
                </div>

                {/* 03: Hygiene Solutions */}
                <div 
                  className="about-feat-item feat-hygiene"
                  onClick={() => handleNav('hygiene')}
                >
                  <div className="about-feat-icon-wrap">
                    <Leaf size={20} />
                  </div>
                  <div className="about-feat-num">03</div>
                  <div className="about-feat-text">
                    <div className="about-feat-title">Hygiene Solutions</div>
                    <p className="about-feat-p">
                      Specialized hygiene and cleanroom solutions designed for critical environments with strict cleanliness and quality standards.
                    </p>
                  </div>
                  <ChevronRight size={18} className="about-feat-arrow" />
                </div>
              </div>
            </div>

            {/* Right Column: HTI at a Glance Card */}
            <div className="about-bg-right">
              <div className="about-glance-card">
                <div className="glance-header">
                  <h3 className="glance-title">HTI at a Glance</h3>
                  <img 
                    src="/about-glance-building.jpg" 
                    alt="HTI Corporate Headquarters" 
                    className="glance-header-img"
                  />
                </div>

                <div className="glance-table">
                  {/* Established */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Calendar size={15} className="glance-label-icon" />
                      <span>Established</span>
                    </div>
                    <div className="glance-val">2012</div>
                  </div>

                  {/* Industries */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Briefcase size={15} className="glance-label-icon" />
                      <span>Industries</span>
                    </div>
                    <div className="glance-val">
                      Pharmaceutical, Biotech, Healthcare, Food &amp; Beverage, Electronics, Research &amp; Laboratories, Industrial
                    </div>
                  </div>

                  {/* Head Office */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <MapPin size={15} className="glance-label-icon" />
                      <span>Head Office</span>
                    </div>
                    <div className="glance-val">
                      Maharashtra, India
                    </div>
                  </div>

                  {/* Service */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Wrench size={15} className="glance-label-icon" />
                      <span>Service</span>
                    </div>
                    <div className="glance-val">
                      Design • Supply • Installation • AMC • Validation
                    </div>
                  </div>

                  {/* Commitment */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Award size={15} className="glance-label-icon" />
                      <span>Commitment</span>
                    </div>
                    <div className="glance-val">
                      Quality, Safety &amp; Innovation
                    </div>
                  </div>
                </div>

                {/* Get in Touch CTA */}
                <button 
                  className="glance-cta-btn"
                  onClick={() => handleNav('contact')}
                >
                  <span>Get in Touch with Us</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. OUR CORE VALUES (5 Cards)
          ===================================================================== */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="section-kicker-red">
            <span className="kicker-line"></span>
            <span>OUR CORE VALUES</span>
          </div>

          <div className="values-grid">
            {/* Value 1: Integrity */}
            <div className="value-card">
              <div className="value-icon-circle">
                <ShieldCheck size={18} />
              </div>
              <h4 className="value-card-title">Integrity</h4>
              <p className="value-card-desc">
                Transparent business practices & long-term trust.
              </p>
            </div>

            {/* Value 2: Customer Focus */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Users size={18} />
              </div>
              <h4 className="value-card-title">Customer Focus</h4>
              <p className="value-card-desc">
                Our customers' success drives everything we do.
              </p>
            </div>

            {/* Value 3: Engineering Excellence */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Settings size={18} />
              </div>
              <h4 className="value-card-title">Engineering Excellence</h4>
              <p className="value-card-desc">
                Innovative and reliable turnkey solutions.
              </p>
            </div>

            {/* Value 4: Quality Commitment */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Award size={18} />
              </div>
              <h4 className="value-card-title">Quality Commitment</h4>
              <p className="value-card-desc">
                Highest standards in products & services.
              </p>
            </div>

            {/* Value 5: Sustainable Growth */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Leaf size={18} />
              </div>
              <h4 className="value-card-title">Sustainable Growth</h4>
              <p className="value-card-desc">
                A safer, cleaner & healthier future for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. EXECUTIONS ACROSS THREE KEY SEGMENTS (3 Cards)
          ===================================================================== */}
      <section className="about-solutions-section">
        <div className="about-container">
          <div className="section-kicker-red">
            <span className="kicker-line"></span>
            <span>EXECUTIONS ACROSS THREE KEY SEGMENTS</span>
          </div>

          <div className="solutions-grid">
            {/* Segment 1: Automation */}
            <div 
              className="solution-segment-card solution-segment-card-link"
              role="button"
              tabIndex={0}
              onClick={() => handleNav('automation')}
              onKeyDown={(e) => handleSegmentKey(e, 'automation')}
            >
              <div className="solution-card-media">
                <img 
                  src="/about-automation-doors.jpg" 
                  alt="Industrial Access Automation" 
                  className="solution-card-img"
                  loading="lazy"
                />
              </div>
              <div className="solution-card-body">
                <div className="solution-tag-pill-row">
                  <div className="segment-name-badge">
                    <Settings size={12} />
                    <span>AUTOMATION</span>
                  </div>
                  <div className="solution-arrow-btn" aria-hidden="true">
                    <ArrowRight size={13} />
                  </div>
                </div>
                <p className="solution-card-desc">
                  Customized automation solutions for process control, manufacturing, utilities and critical environments, designed to improve efficiency, accuracy and reliability.
                </p>
              </div>
            </div>

            {/* Segment 2: Security Systems */}
            <div 
              className="solution-segment-card solution-segment-card-link"
              role="button"
              tabIndex={0}
              onClick={() => handleNav('security-systems')}
              onKeyDown={(e) => handleSegmentKey(e, 'security-systems')}
            >
              <div className="solution-card-media">
                <img 
                  src="/about-security-camera.jpg" 
                  alt="Security Systems & Surveillance" 
                  className="solution-card-img"
                  loading="lazy"
                />
              </div>
              <div className="solution-card-body">
                <div className="solution-tag-pill-row">
                  <div className="segment-name-badge">
                    <ShieldCheck size={12} />
                    <span>SECURITY SYSTEMS</span>
                  </div>
                  <div className="solution-arrow-btn" aria-hidden="true">
                    <ArrowRight size={13} />
                  </div>
                </div>
                <p className="solution-card-desc">
                  Integrated security and surveillance solutions including access control, CCTV, fire detection and life-safety systems to ensure complete protection and compliance.
                </p>
              </div>
            </div>

            {/* Segment 3: Hygiene */}
            <div 
              className="solution-segment-card solution-segment-card-link"
              role="button"
              tabIndex={0}
              onClick={() => handleNav('hygiene')}
              onKeyDown={(e) => handleSegmentKey(e, 'hygiene')}
            >
              <div className="solution-card-media">
                <img 
                  src="/about-hygiene-washroom.jpg" 
                  alt="Cleanroom Hygiene Automation" 
                  className="solution-card-img"
                  loading="lazy"
                />
              </div>
              <div className="solution-card-body">
                <div className="solution-tag-pill-row">
                  <div className="segment-name-badge">
                    <Leaf size={12} />
                    <span>HYGIENE</span>
                  </div>
                  <div className="solution-arrow-btn" aria-hidden="true">
                    <ArrowRight size={13} />
                  </div>
                </div>
                <p className="solution-card-desc">
                  Cleanroom design, HVAC, contamination control and hygiene solutions for pharmaceutical, healthcare and research facilities with global standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. TECHNOLOGY PARTNERSHIPS (Smooth Train Marquee Animation)
          ===================================================================== */}
      <section className="about-partners-section">
        <div className="about-container">
          <div className="partners-section-header">
            <div className="section-kicker-red">
              <span className="kicker-line"></span>
              <span>TECHNOLOGY PARTNERSHIPS</span>
            </div>
            <p className="partners-section-sub">
              We collaborate with globally trusted technology partners to deliver the best solutions.
            </p>
          </div>
        </div>

        {/* Full-width continuous train marquee */}
        <div className="partners-train-wrapper">
          <div className="partners-train-fade-left"></div>
          <div className="partners-train-fade-right"></div>

          {/* Rail 1 - Train moving smoothly to the Left */}
          <div className="partners-train-rail">
            <div className="partners-train-track train-left">
              {trainList1.map((brand, bIdx) => (
                <div key={`about-r1-${bIdx}`} className="partner-logo-tile" title={brand.name}>
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="partner-tile-img" 
                      loading="lazy"
                    />
                  ) : (
                    <span 
                      className={`partner-text-mark ${brand.markClass || ''}`}
                      style={{ color: brand.color }}
                    >
                      {brand.text || brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rail 2 - Train moving smoothly to the Right */}
          <div className="partners-train-rail">
            <div className="partners-train-track train-right">
              {trainList2.map((brand, bIdx) => (
                <div key={`about-r2-${bIdx}`} className="partner-logo-tile" title={brand.name}>
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="partner-tile-img" 
                      loading="lazy"
                    />
                  ) : (
                    <span 
                      className={`partner-text-mark ${brand.markClass || ''}`}
                      style={{ color: brand.color }}
                    >
                      {brand.text || brand.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
