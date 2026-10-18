import React, { useState, useRef } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Leaf, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ArrowRight, 
  ChevronRight, 
  Lightbulb, 
  Award, 
  Users, 
  Headphones,
  CheckCircle2,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import '../Aboutus.css';

export default function AboutPage({ onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNav = (page, section = null) => {
    if (onNavigate) {
      onNavigate(page, section);
    } else {
      window.location.href = `/${page}`;
    }
  };

  // Partner brands matching the 14 logos in the reference design
  const partnerBrands = [
    { name: 'Honeywell', logo: '/logos/honeywell.png' },
    { name: 'Bosch', logo: '/logos/bosch.png' },
    { name: 'Cisco', logo: '/logos/cisco.png' },
    { name: 'Eaton', logo: '/logos/eaton.png' },
    { name: 'Hikvision', logo: '/logos/hikvision.png' },
    { name: 'L&T', logo: '/logos/lt.png' },
    { name: 'FAAC', logo: '/logos/faac.jpg' },
    { name: 'Ravel', logo: '/logos/ravel.png' },
    { name: 'Dorma', logo: '/logos/dorma.jpg' },
    { name: 'Nice', logo: '/logos/nice.png' },
    { name: 'Avtech', logo: '/logos/avtech.png' },
    { name: 'Johnson Controls', logo: '/logos/johnson-controls.png' },
    { name: 'Siemens', logo: '/logos/Siemens.png' },
    { name: 'Zoloto Valves', logo: '/logos/zoloto.jpg' }
  ];

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
              <div className="about-hero-badge-pill">
                <Settings size={14} className="animate-spin-slow text-sky-600" />
                <span>SERVING CLIENTS SINCE 2014</span>
              </div>

              <h1 className="about-hero-heading">
                Reliable Automation,<br />
                Hygiene & Security Solutions
              </h1>

              <p className="about-hero-desc">
                HTI Automation & Security Systems Pvt. Ltd. is a reliable automation and security system provider serving clients since 2014. We deliver quality products to the corporate sector, backed by experienced engineering and dedicated service.
              </p>

              <div className="about-hero-solutions-row">
                <button 
                  className="hero-solution-chip"
                  onClick={() => handleNav('automation')}
                >
                  <Settings size={18} className="text-sky-600" />
                  <span>Automation Solutions</span>
                </button>

                <button 
                  className="hero-solution-chip"
                  onClick={() => handleNav('security-systems')}
                >
                  <ShieldCheck size={18} className="text-sky-600" />
                  <span>Security Systems</span>
                </button>

                <button 
                  className="hero-solution-chip chip-hygiene"
                  onClick={() => handleNav('hygiene')}
                >
                  <Leaf size={18} className="text-emerald-600" />
                  <span>Hygiene Solutions</span>
                </button>
              </div>
            </div>

            {/* Right Cleanroom & Automation Showcase Video */}
            <div className="about-hero-image-col">
              <div className="about-hero-image-wrap">
                <video 
                  ref={videoRef}
                  src="/gemini_generated_video_02f233ca.mp4" 
                  poster="/about-hero-cleanroom.jpg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="about-hero-img about-hero-video"
                />

                {/* Top Left Status Badge */}
                <div className="video-top-tag">
                  <span className="video-live-dot"></span>
                  <span>HTI In Action</span>
                </div>

                {/* Top Right Video Playback & Sound Controls */}
                <div className="video-overlay-controls">
                  <button
                    type="button"
                    className="video-control-btn"
                    onClick={togglePlay}
                    title={isPlaying ? "Pause video" : "Play video"}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                  </button>

                  <button
                    type="button"
                    className="video-control-btn"
                    onClick={toggleMute}
                    title={isMuted ? "Unmute sound" : "Mute sound"}
                    aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  </button>
                </div>
                
                {/* Floating Badge */}
                <div className="hero-floating-badge">
                  <div className="floating-badge-title">Engineering</div>
                  <div className="floating-badge-sub">for safer, cleaner spaces</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BACKGROUND & HTI AT A GLANCE
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
                Built on Engineering, Service & Quality
              </h2>

              <p className="about-lead-desc">
                A dynamic organization catering high-quality products to the corporate sector. Known for delivering quality products with a focus on service, bolstered by experienced engineering. A rapidly growing company specializing in automation, hygiene, and security, distinguished for its exceptional service and the expertise of its well-trained engineering team.
              </p>

              {/* Numbered 01, 02, 03 List */}
              <div className="about-features-stack">
                {/* 01: Automation */}
                <div 
                  className="about-feat-item"
                  onClick={() => handleNav('automation')}
                >
                  <div className="about-feat-num-box">01</div>
                  <div className="about-feat-icon-wrap">
                    <Settings size={22} />
                  </div>
                  <div className="about-feat-text">
                    <div className="about-feat-title">Automation</div>
                    <p className="about-feat-p">
                      Wide range of automatic doors, gates, barriers and industrial doors for commercial and industrial facilities. Automatic sliding/swing doors, gates, boom barriers, fire rated doors and shutters, dock levellers and more.
                    </p>
                  </div>
                  <ChevronRight size={20} className="about-feat-arrow" />
                </div>

                {/* 02: Security Systems */}
                <div 
                  className="about-feat-item"
                  onClick={() => handleNav('security-systems')}
                >
                  <div className="about-feat-num-box">02</div>
                  <div className="about-feat-icon-wrap">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="about-feat-text">
                    <div className="about-feat-title">Security Systems</div>
                    <p className="about-feat-p">
                      Advanced security and access control solutions for safer and smarter premises. Door interlock systems, access control, CCTV surveillance, fire alarm, fire fighting, gas detection and more.
                    </p>
                  </div>
                  <ChevronRight size={20} className="about-feat-arrow" />
                </div>

                {/* 03: Hygiene Solutions */}
                <div 
                  className="about-feat-item feat-hygiene"
                  onClick={() => handleNav('hygiene')}
                >
                  <div className="about-feat-num-box">03</div>
                  <div className="about-feat-icon-wrap">
                    <Leaf size={22} />
                  </div>
                  <div className="about-feat-text">
                    <div className="about-feat-title">Hygiene Solutions</div>
                    <p className="about-feat-p">
                      Cleanroom and hygiene products for cleaner and healthier environments. Hand dryers, air curtains, automatic taps, urinal flush, soap dispensers, PVC strip curtains and more.
                    </p>
                  </div>
                  <ChevronRight size={20} className="about-feat-arrow" />
                </div>
              </div>
            </div>

            {/* Right Column: HTI at a Glance Card */}
            <div className="about-glance-col">
              <div className="about-glance-card">
                <div className="glance-header">
                  <h3 className="glance-title">HTI at a Glance</h3>
                  <img 
                    src="/about-glance-building.jpg" 
                    alt="HTI Corporate Building" 
                    className="glance-header-img"
                  />
                </div>

                <div className="glance-table">
                  {/* Established */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Calendar size={17} className="glance-label-icon" />
                      <span>Established</span>
                    </div>
                    <div className="glance-val">2014</div>
                  </div>

                  {/* Office Address */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <MapPin size={17} className="glance-label-icon" />
                      <span>Office Address</span>
                    </div>
                    <div className="glance-val">
                      Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC, Turbhe, Navi Mumbai, Maharashtra - 400703
                    </div>
                  </div>

                  {/* Email */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Mail size={17} className="glance-label-icon" />
                      <span>Email</span>
                    </div>
                    <div className="glance-val">
                      <a href="mailto:hti@htisystems.in">hti@htisystems.in</a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Phone size={17} className="glance-label-icon" />
                      <span>Phone</span>
                    </div>
                    <div className="glance-val">
                      <a href="tel:+919892756077">9892756077</a> / <a href="tel:+919594917010">9594917010</a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="glance-row">
                    <div className="glance-label">
                      <Globe size={17} className="glance-label-icon" />
                      <span>Website</span>
                    </div>
                    <div className="glance-val">
                      <a href="https://www.htisystems.in" target="_blank" rel="noopener noreferrer">
                        www.htisystems.in
                      </a>
                    </div>
                  </div>
                </div>

                <button 
                  className="glance-cta-btn"
                  onClick={() => handleNav('contact')}
                >
                  <Mail size={17} />
                  <span>Contact Our Team →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. OUR CORE VALUES (4 Cards)
          ===================================================================== */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="section-kicker-red">
            <span className="kicker-line"></span>
            <span>OUR CORE VALUES</span>
          </div>

          <div className="values-grid">
            {/* Value 1: Innovation */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Lightbulb size={24} />
              </div>
              <h4 className="value-card-title">Innovation</h4>
              <p className="value-card-desc">
                We embrace innovation to deliver advanced and reliable solutions.
              </p>
            </div>

            {/* Value 2: Commitment to Quality */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Award size={24} />
              </div>
              <h4 className="value-card-title">Commitment to Quality</h4>
              <p className="value-card-desc">
                We focus on delivering high-quality products with perfection.
              </p>
            </div>

            {/* Value 3: Engineering Expertise */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Users size={24} />
              </div>
              <h4 className="value-card-title">Engineering Expertise</h4>
              <p className="value-card-desc">
                Backed by experienced and well-trained engineering team with domain knowledge.
              </p>
            </div>

            {/* Value 4: Dedicated Customer Service */}
            <div className="value-card">
              <div className="value-icon-circle">
                <Headphones size={24} />
              </div>
              <h4 className="value-card-title">Dedicated Customer Service</h4>
              <p className="value-card-desc">
                Our satisfied customers are a testament to our dedicated and helpful team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SOLUTIONS ACROSS THREE KEY SEGMENTS (3 Large Cards)
          ===================================================================== */}
      <section className="about-solutions-section">
        <div className="about-container">
          <div className="section-kicker-red" style={{ color: '#0f2942' }}>
            <span className="kicker-line"></span>
            <span style={{ color: '#0f2942' }}>Solutions Across Three Key Segments</span>
          </div>

          <div className="solutions-grid">
            {/* Card 1: Automation */}
            <div 
              className="solution-segment-card"
              onClick={() => handleNav('automation')}
              style={{ cursor: 'pointer' }}
            >
              <div className="solution-card-img-wrap">
                <img 
                  src="/about-automation-doors.jpg" 
                  alt="HTI Automation Sliding Doors" 
                  className="solution-card-img"
                  loading="lazy"
                />
              </div>

              <div className="solution-badge-row">
                <div className="segment-pill-tag">
                  <Settings size={15} />
                  <span>Automation</span>
                </div>
                <div className="segment-arrow-btn">
                  <ArrowRight size={15} />
                </div>
              </div>

              <div className="solution-card-body">
                <p className="solution-items-desc">
                  Automatic Sliding Doors, Automatic Swing Doors, Sliding & Swing Gates, Telescopic Gates, Cantilever Gates, Boom Barriers, Fire Rated Doors & Shutters, High Speed Doors, Sectional Over Head Doors, Dock Levellers, Turnstiles, Motorized Rolling Shutters, Clean Room Doors and more.
                </p>
              </div>
            </div>

            {/* Card 2: Security Systems */}
            <div 
              className="solution-segment-card"
              onClick={() => handleNav('security-systems')}
              style={{ cursor: 'pointer' }}
            >
              <div className="solution-card-img-wrap">
                <img 
                  src="/about-security-camera.jpg" 
                  alt="HTI Security Surveillance Systems" 
                  className="solution-card-img"
                  loading="lazy"
                />
              </div>

              <div className="solution-badge-row">
                <div className="segment-pill-tag">
                  <ShieldCheck size={15} />
                  <span>Security Systems</span>
                </div>
                <div className="segment-arrow-btn">
                  <ArrowRight size={15} />
                </div>
              </div>

              <div className="solution-card-body">
                <p className="solution-items-desc">
                  Door Interlock Systems, Biometric Access Control, Time Attendance System, CCTV Surveillance (Analogue, HD & IP), Fire Alarm System (Conventional & Addressable), Fire Fighting System, Gas Detection System, Video Door Phone (IP/Non-IP), Public Address System, IP PBX & EPABX, Parking Management System and more.
                </p>
              </div>
            </div>

            {/* Card 3: Hygiene */}
            <div 
              className="solution-segment-card"
              onClick={() => handleNav('hygiene')}
              style={{ cursor: 'pointer' }}
            >
              <div className="solution-card-img-wrap">
                <img 
                  src="/about-hygiene-washroom.jpg" 
                  alt="HTI Hygiene Cleanroom Washroom Solutions" 
                  className="solution-card-img"
                  loading="lazy"
                />
              </div>

              <div className="solution-badge-row">
                <div className="segment-pill-tag hygiene-tag">
                  <Leaf size={15} />
                  <span>Hygiene</span>
                </div>
                <div className="segment-arrow-btn">
                  <ArrowRight size={15} />
                </div>
              </div>

              <div className="solution-card-body">
                <p className="solution-items-desc">
                  Hand Dryers, Air Curtains, Fly Killers, Insect Killers, Automatic Taps, Auto Urinal Flush, Liquid Soap Dispensers, Aerosol Dispensers, Automatic Shoe Shine Machine, PVC Strip Curtains, Spot Extractors, Industrial Blowers and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. TECHNOLOGY PARTNERSHIPS (14 Logos)
          ===================================================================== */}
      <section className="about-partners-section">
        <div className="about-container">
          <div className="section-kicker-red" style={{ color: '#0f2942' }}>
            <span className="kicker-line"></span>
            <span style={{ color: '#0f2942' }}>Technology Partnerships</span>
          </div>

          <p className="partners-subtitle">
            Working with established technology brands to support dependable solutions.
          </p>

          <div className="partners-logos-grid">
            {partnerBrands.map((brand, bIdx) => (
              <div key={bIdx} className="partner-logo-tile" title={brand.name}>
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="partner-logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. BOTTOM CALL TO ACTION BANNER
          ===================================================================== */}
      <section className="about-cta-banner">
        <div className="about-container">
          <div className="about-cta-inner">
            <div className="cta-banner-text">
              <h3 className="cta-banner-heading">
                <span className="kicker-line" style={{ width: 28, height: 4 }}></span>
                <span>Let's Build Safer, Smarter Environments</span>
              </h3>
              <p className="cta-banner-desc">
                Talk to HTI about your automation, security or hygiene requirements.
              </p>
            </div>

            <button 
              className="cta-contact-btn"
              onClick={() => handleNav('contact')}
            >
              <span>Contact HTI →</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
