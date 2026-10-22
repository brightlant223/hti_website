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
  DoorClosed,
  Globe
} from 'lucide-react';
import './Hero.css';

// Six stationary metrics matching Reference Image 2 exactly
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
        // ease-out quad curve
        const ease = 1 - (1 - progress) * (1 - progress);

        setMetricCounts(METRICS_DATA.map((m) => Math.round(m.target * ease)));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          // Reached target: hold then loop
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

  // Stop playback when the modal closes so audio never continues in the background
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

  // Keyboard activation for interactive cards/buttons
  const handleKeyActivate = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <section id="hero" className="hero-modern-section">
      {/* Ambient Glows & Dot Matrix matching Reference Image 2 */}
      <div className="hero-ambient-wrap" aria-hidden="true">
        <div className="hero-ambient-glow-coral"></div>
        <div className="hero-ambient-glow-soft"></div>
        <div className="hero-dot-grid hero-dot-grid-top"></div>
        <div className="hero-dot-grid hero-dot-grid-bottom"></div>
      </div>

      {/* Main Two-Part Composition: Left Content & Edge-to-Edge Right Visual */}
      <div className="hero-stage-layout">
        {/* Left Column: Heading, Subtitle, Dual CTAs, 3 Pillars */}
        <div className="hero-left-column">
          {/* Top Tag: Red Dash + SINCE 2014 */}
          <div className="hero-since-tag">
            <span className="hero-since-dash"></span>
            <span className="hero-since-text">SINCE 2014</span>
          </div>

          {/* Main Heading matching Reference Image 2 */}
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

          {/* 3 Bottom Feature Pillars matching Reference Image 2 */}
          <div className="hero-pillars-grid">
            {/* Pillar 1: Automation */}
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

            {/* Pillar 2: Security Systems */}
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

            {/* Pillar 3: Hygiene Solutions */}
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

        {/* Right Column: Architectural Building Visual + 3 Native HTML Overlapping Cards (55–60% width) */}
        <div className="hero-right-visual-area">
          <div className="hero-composition-stage">
            {/* Architectural Building Graphic organically integrated into the background */}
            <img
              src="/hero-hti-building-collage.png"
              alt="HTI Modern Automation & Security Corporate Headquarters"
              className="hero-building-backdrop-img"
              loading="eager"
              width={1108}
              height={920}
            />

            {/* Clickable Hotspots over the 3 service cards in the building image (zero overlapping image elements) */}
            <div className="hero-cards-hotspots" aria-label="Service Divisions Navigation">
              <button
                type="button"
                className="hero-hotspot hotspot-doors"
                onClick={() => handlePillarClick('automation')}
                aria-label="Automatic Doors & Gates"
                title="Automatic Doors & Gates"
              />
              <button
                type="button"
                className="hero-hotspot hotspot-security"
                onClick={() => handlePillarClick('security-systems')}
                aria-label="CCTV & Access Control"
                title="CCTV & Access Control"
              />
              <button
                type="button"
                className="hero-hotspot hotspot-hygiene"
                onClick={() => handlePillarClick('hygiene')}
                aria-label="Hygiene Solutions"
                title="Hygiene Solutions"
              />
            </div>
          </div>
        </div>
      </div>

      {/* KEY METRICS SECTION — STATIONARY LOOPING NUMBER COUNTERS (Reference Image 2) */}
      <div className="hero-metrics-banner-wrap">
        {/* Organic Curved Wave Connector matching Reference Image 2 */}
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
            {/* Six Evenly Spaced Stationary Metrics Columns */}
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
          aria-label="HTI Corporate Automation and Facility Tour"
        >
          <div
            className="hero-video-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hero-video-modal-header">
              <div className="hero-video-modal-title">
                <Play size={18} className="text-red-500" fill="currentColor" />
                <span>HTI Corporate Automation &amp; Facility Tour</span>
              </div>
              <button
                className="hero-video-close-btn"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close Video"
                ref={modalCloseRef}
              >
                <X size={20} />
              </button>
            </div>
            <video
              ref={videoRef}
              src="/gemini_generated_video_02f233ca.mp4"
              controls
              autoPlay
              playsInline
              className="hero-video-element"
            />
          </div>
        </div>
      )}
    </section>
  );
}
