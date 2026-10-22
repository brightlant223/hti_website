import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Play,
  X,
  Settings,
  ShieldCheck,
  Leaf,
  Award,
  Building2,
  Users,
  Globe
} from 'lucide-react';
import './Hero.css';

// Six stationary metrics matching Reference Image
const METRICS_DATA = [
  {
    id: 'projects-delivered',
    target: 500,
    suffix: '+',
    label: 'Projects Delivered',
    icon: Building2,
    colorClass: 'metric-icon-blue'
  },
  {
    id: 'satisfied-clients',
    target: 300,
    suffix: '+',
    label: 'Satisfied Clients',
    icon: Users,
    colorClass: 'metric-icon-purple'
  },
  {
    id: 'years-experience',
    target: 10,
    suffix: '+',
    label: 'Years of Experience',
    icon: Award,
    colorClass: 'metric-icon-red'
  },
  {
    id: 'industry-verticals',
    target: 12,
    suffix: '+',
    label: 'Industry Verticals',
    icon: Settings,
    colorClass: 'metric-icon-cyan'
  },
  {
    id: 'team-members',
    target: 30,
    suffix: '+',
    label: 'Team Members',
    icon: Users,
    colorClass: 'metric-icon-amber'
  },
  {
    id: 'global-partners',
    target: 15,
    suffix: '+',
    label: 'Global Partners',
    icon: Globe,
    colorClass: 'metric-icon-green'
  }
];

export default function Hero({ stats = {}, onExploreClick, onDemoClick, onQuoteClick, onNavigate }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);
  const modalCloseRef = useRef(null);

  // Six stationary metric counters looping smoothly in place (0 -> target -> hold -> loop)
  const [metricCounts, setMetricCounts] = useState(() => METRICS_DATA.map((m) => m.target));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setMetricCounts(METRICS_DATA.map((m) => m.target));
      return;
    }

    let animationFrameId;
    let cycleTimeout;
    let isCancelled = false;
    const ANIMATION_DURATION = 1800; // 1.8s count up
    const HOLD_DURATION = 2600;      // 2.6s hold at target value
    const RESET_PAUSE = 400;         // 0.4s pause before restart

    const runCycle = () => {
      if (isCancelled) return;
      const startTime = performance.now();

      const step = (currentTime) => {
        if (isCancelled) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
        const ease = 1 - (1 - progress) * (1 - progress);

        setMetricCounts(METRICS_DATA.map((m) => Math.round(m.target * ease)));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          cycleTimeout = setTimeout(() => {
            if (isCancelled) return;
            setMetricCounts(METRICS_DATA.map(() => 0));
            cycleTimeout = setTimeout(() => {
              if (isCancelled) return;
              runCycle();
            }, RESET_PAUSE);
          }, HOLD_DURATION);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    };

    runCycle();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(cycleTimeout);
    };
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };
    if (isVideoOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      if (modalCloseRef.current) modalCloseRef.current.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  useEffect(() => {
    if (!isVideoOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVideoOpen]);

  const handlePillarClick = (categorySlug) => {
    if (onNavigate) {
      onNavigate(categorySlug);
    } else {
      window.location.href = `/${categorySlug}`;
    }
  };

  const handleKeyActivate = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <section id="hero" className="hero-modern-section">
      {/* Ambient Glows & Dot Matrix matching Reference Image */}
      <div className="hero-ambient-wrap" aria-hidden="true">
        <div className="hero-ambient-glow-coral"></div>
        <div className="hero-ambient-glow-soft"></div>
        <div className="hero-dot-grid hero-dot-grid-top"></div>
        <div className="hero-dot-grid hero-dot-grid-bottom"></div>
      </div>

      {/* Main Two-Part Composition: Left Content & Right Interactive Visual */}
      <div className="hero-stage-layout">
        {/* Left Column: Heading, Subtitle, Dual CTAs, 3 Feature Highlights */}
        <div className="hero-left-column">
          {/* Top Tag: Red Dash + SINCE 2014 */}
          <div className="hero-since-tag">
            <span className="hero-since-dash"></span>
            <span className="hero-since-text">SINCE 2014</span>
          </div>

          {/* Main Heading matching Reference Image */}
          <h1 className="hero-modern-title">
            <span className="hero-title-dark">Automation &amp;</span>
            <span className="hero-title-red">Security Solutions</span>
          </h1>

          {/* Subtitle Description */}
          <p className="hero-modern-description">
            A reliable automation and security system provider, delivering high-quality products for industries, businesses and modern infrastructure.
          </p>

          {/* Dual CTAs: Explore Our Solutions & Watch Video */}
          <div className="hero-modern-cta-row">
            <button
              className="btn-hero-explore"
              onClick={onExploreClick || onQuoteClick}
              id="btn-hero-explore-solutions"
            >
              <span>Explore Our Solutions</span>
              <ArrowRight size={18} className="explore-arrow-icon" />
            </button>

            <button
              className="btn-hero-video-play"
              onClick={() => setIsVideoOpen(true)}
              id="btn-hero-watch-video"
            >
              <span className="video-play-icon">
                <Play size={16} fill="currentColor" />
              </span>
              <span>Watch Video</span>
            </button>
          </div>

          {/* 3 Bottom Feature Highlights matching Reference Image */}
          <div className="hero-pillars-grid">
            {/* Feature 1: Automation */}
            <div
              className="hero-pillar-item"
              onClick={() => handlePillarClick('automation')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('automation'))}
              role="button"
              tabIndex={0}
              title="Explore Automation Solutions"
            >
              <div className="pillar-icon-box pillar-icon-red">
                <Settings size={22} />
              </div>
              <div className="pillar-text-group">
                <span className="pillar-label">Automation</span>
                <span className="pillar-desc">Smart &amp; Efficient Solutions</span>
              </div>
            </div>

            {/* Feature 2: Security Systems */}
            <div
              className="hero-pillar-item"
              onClick={() => handlePillarClick('security-systems')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('security-systems'))}
              role="button"
              tabIndex={0}
              title="Explore Security Systems"
            >
              <div className="pillar-icon-box pillar-icon-blue">
                <ShieldCheck size={22} />
              </div>
              <div className="pillar-text-group">
                <span className="pillar-label">Security Systems</span>
                <span className="pillar-desc">Safety You Can Trust</span>
              </div>
            </div>

            {/* Feature 3: Hygiene Solutions */}
            <div
              className="hero-pillar-item"
              onClick={() => handlePillarClick('hygiene')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('hygiene'))}
              role="button"
              tabIndex={0}
              title="Explore Hygiene Solutions"
            >
              <div className="pillar-icon-box pillar-icon-green">
                <Leaf size={22} />
              </div>
              <div className="pillar-text-group">
                <span className="pillar-label">Hygiene Solutions</span>
                <span className="pillar-desc">Clean &amp; Healthy Environments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Building Visual + 3 Interactive Floating Service Cards */}
        <div className="hero-right-visual-area">
          {/* Decorative Backdrop SVG Shapes (Soft Coral & Dynamic Red Arc) */}
          <div className="hero-right-backdrop-shape" aria-hidden="true">
            <svg className="hero-backdrop-svg" viewBox="0 0 680 580" fill="none" preserveAspectRatio="none">
              <path
                d="M180,40 C360,-30 600,30 660,220 C710,380 610,530 440,560 C270,590 100,510 50,370 C5,240 40,110 180,40 Z"
                fill="url(#heroCoralGrad)"
              />
              <path
                d="M60,410 Q160,545 340,540"
                stroke="#dc2626"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="heroCoralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fee2e2" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="#fecaca" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Central Glass Building Container with HTI Logo */}
          <div className="hero-building-frame-wrap">
            <div className="hero-building-frame">
              <img
                src="/hero-building-hti.jpg"
                alt="HTI Modern Automation & Security Headquarters"
                className="hero-building-img"
                loading="eager"
              />
            </div>
          </div>

          {/* Three Stacked Interactive Service Cards on the Right */}
          <div className="hero-floating-cards-column" aria-label="HTI Service Divisions">
            {/* Card 1: Automatic Doors & Gates */}
            <div
              className="hero-service-card card-doors"
              onClick={() => handlePillarClick('automation')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('automation'))}
              role="button"
              tabIndex={0}
              title="Explore Automatic Doors & Gates"
            >
              <div className="service-card-media">
                <img
                  src="/hero-card-doors.jpg"
                  alt="Automatic Doors & Gates"
                  className="service-card-img"
                  loading="eager"
                />
              </div>
              <div className="service-card-pill pill-dark">
                <div className="pill-left-content">
                  <div className="pill-icon-box icon-box-dark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="8" height="18" rx="1.5" />
                      <rect x="13" y="3" width="8" height="18" rx="1.5" />
                      <line x1="8" y1="11" x2="8" y2="13" />
                      <line x1="16" y1="11" x2="16" y2="13" />
                    </svg>
                  </div>
                  <span className="pill-text">Automatic Doors &amp; Gates</span>
                </div>
                <div className="pill-arrow-btn">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* Card 2: CCTV & Access Control */}
            <div
              className="hero-service-card card-cctv"
              onClick={() => handlePillarClick('security-systems')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('security-systems'))}
              role="button"
              tabIndex={0}
              title="Explore CCTV & Access Control"
            >
              <div className="service-card-media">
                <img
                  src="/hero-card-cctv.jpg"
                  alt="CCTV & Access Control"
                  className="service-card-img"
                  loading="eager"
                />
              </div>
              <div className="service-card-pill pill-light">
                <div className="pill-left-content">
                  <div className="pill-icon-box icon-box-blue">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="pill-text">CCTV &amp; Access Control</span>
                </div>
                <div className="pill-arrow-btn">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* Card 3: Hygiene Solutions */}
            <div
              className="hero-service-card card-hygiene"
              onClick={() => handlePillarClick('hygiene')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('hygiene'))}
              role="button"
              tabIndex={0}
              title="Explore Hygiene Solutions"
            >
              <div className="service-card-media">
                <img
                  src="/hero-card-hygiene.jpg"
                  alt="Hygiene Solutions"
                  className="service-card-img"
                  loading="eager"
                />
              </div>
              <div className="service-card-pill pill-light">
                <div className="pill-left-content">
                  <div className="pill-icon-box icon-box-green">
                    <Leaf size={16} />
                  </div>
                  <span className="pill-text">Hygiene Solutions</span>
                </div>
                <div className="pill-arrow-btn">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KEY METRICS SECTION — STATIONARY LOOPING NUMBER COUNTERS */}
      <div className="hero-metrics-banner-wrap">
        <div className="hero-metrics-wave-top" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
            <path
              d="M0,60 C240,12 480,2 720,28 C960,54 1240,58 1440,60 L1440,60 L0,60 Z"
              fill="#081736"
            />
          </svg>
        </div>

        <div className="hero-metrics-banner">
          <div className="hero-metrics-inner">
            <div className="hero-metrics-grid" role="region" aria-label="Key Company Metrics">
              {METRICS_DATA.map((metric, index) => {
                const IconComponent = metric.icon;
                const currentCount = metricCounts[index] ?? metric.target;
                return (
                  <div key={metric.id} className="hero-metric-item">
                    <div className={`metric-icon-bubble ${metric.colorClass}`}>
                      <IconComponent size={20} />
                    </div>
                    <div className="metric-loop-data">
                      <div className="metric-loop-number">
                        {currentCount}
                        {metric.suffix}
                      </div>
                      <div className="metric-loop-label">{metric.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Video Modal */}
      {isVideoOpen && (
        <div
          className="hero-video-modal-backdrop"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="hero-video-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-modal-close"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close Video"
              ref={modalCloseRef}
            >
              <X size={20} />
            </button>
            <div className="hero-video-player-wrap">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="hero-modal-video"
                src="/gemini_generated_video_02f233ca.mp4"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
