import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Play,
  X,
  Settings,
  ShieldCheck,
  Leaf,
  Award,
  Cpu,
  Building2,
  Users
} from 'lucide-react';
import './Hero.css';

// Snappy animated counter component from 0 to target number on scroll
function AnimatedNumber({ target, suffix = "+", duration = 550, isVisible }) {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false);
  const spanRef = useRef(null);

  useEffect(() => {
    if (animatedRef.current) return;

    const startAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const startVal = 0;
      const endVal = Number(target) || 0;
      const startTime = performance.now();
      let frameId;

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Snappy cubic ease-out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startVal + (endVal - startVal) * easeOut);

        setCount(current);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setCount(endVal);
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    if (isVisible) {
      startAnimation();
      return;
    }

    // Direct element observer as a guarantee
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined' && spanRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            startAnimation();
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0, rootMargin: '60px 0px 60px 0px' }
      );
      observer.observe(spanRef.current);
    }

    // Fallback: If still not triggered after 600ms, start anyway
    const fallbackTimer = setTimeout(() => {
      if (!animatedRef.current) {
        startAnimation();
      }
    }, 600);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [isVisible, target, duration]);

  const displayCount = animatedRef.current && count === 0 ? target : count;

  return (
    <span ref={spanRef}>
      {displayCount}{suffix}
    </span>
  );
}

export default function Hero({ stats = {}, onExploreClick, onDemoClick, onQuoteClick, onNavigate }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const videoRef = useRef(null);
  const modalCloseRef = useRef(null);

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
      // Move focus into the dialog for keyboard / screen-reader users
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

  // Observer for stats visibility
  useEffect(() => {
    if (statsVisible) return;
    const el = statsRef.current;
    if (!el) return;

    const markVisible = () => setStatsVisible(true);

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            markVisible();
            observer.disconnect();
          }
        },
        { threshold: 0, rootMargin: '60px 0px 60px 0px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      const timer = setTimeout(markVisible, 500);
      return () => clearTimeout(timer);
    }
  }, [statsVisible]);

  const handlePillarClick = (categorySlug) => {
    if (onNavigate) {
      onNavigate(categorySlug);
    } else {
      window.location.href = `/${categorySlug}`;
    }
  };

  // Keyboard activation for elements rendered as `role="button"`
  const handleKeyActivate = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <section id="hero" className="hero-modern-section">
      {/* Ambient Glows & Dot Patterns matching reference */}
      <div className="hero-ambient-wrap">
        <div className="hero-ambient-glow-coral"></div>
        <div className="hero-ambient-glow-soft"></div>
        <div className="hero-dot-grid hero-dot-grid-top"></div>
        <div className="hero-dot-grid hero-dot-grid-bottom"></div>
      </div>

      <div className="container hero-modern-container">
        {/* Left Column: Heading, Subtitle, Dual CTAs, 3 Pillars */}
        <div className="hero-modern-content">
          {/* Top Tag: Red Dash + SINCE 2014 */}
          <div className="hero-since-tag">
            <span className="hero-since-dash"></span>
            <span className="hero-since-text">SINCE 2014</span>
          </div>

          {/* Main Heading matching reference */}
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

          {/* 3 Bottom Feature Pillars matching reference */}
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

        {/* Right Column: Composite Art & Interactive Cards Hotspots */}
        <div className="hero-modern-visual">
          <div className="hero-art-stage">
            <img
              src="/hero-hti-building-collage.png"
              alt="HTi Modern Corporate Facility, Automatic Doors, CCTV Security, and Hygiene Solutions"
              className="hero-collage-img"
              loading="eager"
            />

            {/* Interactive Hotspot 1: Automatic Doors & Gates */}
            <div
              className="hero-hotspot hotspot-doors"
              onClick={() => handlePillarClick('automation')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('automation'))}
              role="button"
              tabIndex={0}
              aria-label="View Automatic Doors and Gates"
              title="View Automatic Doors & Gates"
            >
              <span className="hotspot-tooltip">View Doors &amp; Gates →</span>
            </div>

            {/* Interactive Hotspot 2: CCTV & Access Control */}
            <div
              className="hero-hotspot hotspot-security"
              onClick={() => handlePillarClick('security-systems')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('security-systems'))}
              role="button"
              tabIndex={0}
              aria-label="View CCTV and Access Control"
              title="View CCTV & Access Control"
            >
              <span className="hotspot-tooltip">View Security Systems →</span>
            </div>

            {/* Interactive Hotspot 3: Hygiene Solutions */}
            <div
              className="hero-hotspot hotspot-hygiene"
              onClick={() => handlePillarClick('hygiene')}
              onKeyDown={(e) => handleKeyActivate(e, () => handlePillarClick('hygiene'))}
              role="button"
              tabIndex={0}
              aria-label="View Cleanroom Hygiene Solutions"
              title="View Cleanroom Hygiene Solutions"
            >
              <span className="hotspot-tooltip">View Hygiene Solutions →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Banner Below Hero */}
      <div ref={statsRef} className="container hero-stats-container">
        <div className="stats-glass-strip">
          <div className="stat-col">
            <div className="stat-icon-circle">
              <Award size={22} />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-red">
                <AnimatedNumber target={12} isVisible={statsVisible} duration={500} />
              </div>
              <div className="stat-label">Years of Excellence</div>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-col">
            <div className="stat-icon-circle">
              <Cpu size={22} />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-blue">
                <AnimatedNumber target={30} isVisible={statsVisible} duration={550} />
              </div>
              <div className="stat-label">Systems Delivered</div>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-col">
            <div className="stat-icon-circle">
              <Building2 size={22} />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-blue">
                <AnimatedNumber target={15} isVisible={statsVisible} duration={500} />
              </div>
              <div className="stat-label">Industries Served</div>
            </div>
          </div>

          <div className="stat-divider"></div>

          <div className="stat-col">
            <div className="stat-icon-circle">
              <Users size={22} />
            </div>
            <div className="stat-text-box">
              <div className="stat-number stat-blue">
                <AnimatedNumber target={500} isVisible={statsVisible} duration={650} />
              </div>
              <div className="stat-label">Happy Clients</div>
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
