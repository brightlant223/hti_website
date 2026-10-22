import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  ArrowRight,
  Heart,
  Cpu,
  ShieldCheck,
  Award
} from 'lucide-react';
import './CareersHero.css';

/**
 * Commands cycled through the monospace industrial terminal typing line.
 */
const TERMINAL_COMMANDS = [
  '> plc.commission()',
  '> cleanroom.interlock()',
  '> build(your_career)'
];

/**
 * CareersHero Component
 * Engineering Blueprint / Industrial Control Room aesthetic for HTI Automation.
 * Features:
 *  1. Animated background (faint CAD grid, drifting ambient blobs, 6 circuit pulses).
 *  2. Headline entrance + gradient shimmer on "Engineering Career" + looping terminal typing line.
 *  3. Interactive buttons (View Open Positions & Life at HTI with hover glow / heart pulse).
 *  4. Hero image card with 3D tilt tracking, drawn-in CAD brackets, async floating tags, and 0-countups.
 *  5. Hero-scoped mouse radial spotlight glow.
 *  6. Staggered bottom chips with hover lifts and colored borders.
 */
export default function CareersHero({ scrollTo }) {
  // ── Effect 2: Terminal typing & erasing loop ──────────────────────────────
  const [cmdIndex, setCmdIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingText, setTypingText] = useState('');

  // ── Effect 4: Metric Numbers Count-Up (0 -> 10, 0 -> 500) ─────────────────
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  // ── Effect 4: Ref for 3D Tilt Card ────────────────────────────────────────
  const cardRef = useRef(null);

  // ── Effect 5: Ref for Section Mouse Radial Glow ───────────────────────────
  const glowRef = useRef(null);

  // ── 1. Monospace Typing Effect Loop ───────────────────────────────────────
  useEffect(() => {
    // Immediate fallback for users who prefer reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypingText(TERMINAL_COMMANDS[0]);
      return;
    }

    const currentPhrase = TERMINAL_COMMANDS[cmdIndex];
    let timeout;

    if (!isDeleting && subIndex <= currentPhrase.length) {
      // Typing forward
      setTypingText(currentPhrase.substring(0, subIndex));
      if (subIndex === currentPhrase.length) {
        // Pause at completion of command before backspacing
        timeout = setTimeout(() => setIsDeleting(true), 1700);
      } else {
        timeout = setTimeout(() => setSubIndex((prev) => prev + 1), 72);
      }
    } else if (isDeleting && subIndex >= 0) {
      // Deleting backward
      setTypingText(currentPhrase.substring(0, subIndex));
      if (subIndex === 0) {
        // Pause when erased, then advance to next command
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCmdIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length);
          setSubIndex(1);
        }, 360);
      } else {
        timeout = setTimeout(() => setSubIndex((prev) => prev - 1), 36);
      }
    }

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, cmdIndex]);

  // ── 2. Metric Numbers Count-Up on Load (0 to 10+ and 0 to 500+) ───────────
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setYearsCount(10);
      setProjectsCount(500);
      return;
    }

    let rafId;
    const duration = 1450;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Snappy cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);

      setYearsCount(Math.round(10 * ease));
      setProjectsCount(Math.round(500 * ease));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const delayTimer = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, 220);

    return () => {
      clearTimeout(delayTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ── 3. Smooth-Scroll Button Handlers ─────────────────────────────────────
  const handleViewPositions = (e) => {
    e.preventDefault();
    // Scroll to #open-positions if present, or to the job cards carousel (#life-at-hti)
    const targetId = document.getElementById('open-positions') ? 'open-positions' : 'life-at-hti';
    if (scrollTo) {
      scrollTo(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLifeAtHti = (e) => {
    e.preventDefault();
    if (scrollTo) {
      scrollTo('life-at-hti');
    } else {
      const el = document.getElementById('life-at-hti');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── 4. 3D Tilt on Right-side Image Card (Effect 4) ────────────────────────
  const handleCardMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 992 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt angle: 6.8 degrees for subtle, refined feel
    const rotateX = ((y - centerY) / centerY) * -6.8;
    const rotateY = ((x - centerX) / centerX) * 6.8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.08s ease-out';
  };

  const handleCardMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  // ── 5. Mouse Radial Glow Follower inside Hero (Effect 5) ──────────────────
  const handleHeroMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 992 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(550px circle at ${x}px ${y}px, rgba(2, 132, 199, 0.09) 0%, rgba(239, 68, 68, 0.045) 35%, transparent 70%)`;
    glow.style.opacity = '1';
  };

  const handleHeroMouseLeave = () => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.opacity = '0';
  };

  return (
    <section
      className="hero-careers-section"
      aria-label="Careers Hero"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      {/* ── Background: Tech hairline, mouse glow, grid & blobs ─────────── */}
      <div className="hero-tech-hairline" aria-hidden="true" />
      <div className="hero-cursor-glow" ref={glowRef} aria-hidden="true" />

      <div className="hero-bg-wrapper" aria-hidden="true">
        {/* Soft drifting gradient blobs (Red & Blue) */}
        <div className="hero-blob-cyan" />
        <div className="hero-blob-red" />

        {/* Faint blueprint CAD grid */}
        <div className="hero-grid-pattern" />

        {/* Inline SVG Circuit-Lines & 6 Traveling Glowing Pulses (Effect 1) */}
        <svg
          className="hero-circuit-svg"
          viewBox="0 0 1440 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Soft glow filter for cyan pulses */}
            <filter id="hero-pulse-glow-cyan" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Soft glow filter for red pulses */}
            <filter id="hero-pulse-glow-red" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Faint engineering circuit traces */}
          <g className="hero-circuit-traces">
            <path d="M 0 90 L 360 90 L 440 170 L 740 170" />
            <path d="M 50 0 L 50 240 L 170 360 L 540 360" />
            <path d="M 0 530 L 320 530 L 420 430 L 700 430" />
            <path d="M 1440 120 L 1120 120 L 1030 210 L 1030 490" />
            <path d="M 1290 0 L 1290 170 L 1150 310 L 880 310" />
            <path d="M 1440 550 L 1080 550 L 990 460 L 660 460" />
          </g>

          {/* Circuit solder / junction pads */}
          <g className="hero-circuit-nodes">
            <circle cx="360" cy="90" r="3" />
            <circle cx="440" cy="170" r="3" />
            <circle cx="170" cy="360" r="3" />
            <circle cx="540" cy="360" r="3" />
            <circle cx="320" cy="530" r="3" />
            <circle cx="420" cy="430" r="3" />
            <circle cx="1120" cy="120" r="3" />
            <circle cx="1030" cy="210" r="3" />
            <circle cx="1290" cy="170" r="3" />
            <circle cx="1150" cy="310" r="3" />
            <circle cx="1080" cy="550" r="3" />
            <circle cx="990" cy="460" r="3" />
          </g>

          {/* 6 Traveling glowing pulses (3 cyan, 3 red) at varied intervals */}
          {/* Pulse 1: Cyan traveling trace 1 */}
          <circle r="4.5" className="hero-circuit-pulse hero-pulse-cyan" filter="url(#hero-pulse-glow-cyan)">
            <animateMotion
              path="M 0 90 L 360 90 L 440 170 L 740 170"
              dur="8.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Pulse 2: Red traveling trace 2 */}
          <circle r="4.5" className="hero-circuit-pulse hero-pulse-red" filter="url(#hero-pulse-glow-red)">
            <animateMotion
              path="M 50 0 L 50 240 L 170 360 L 540 360"
              dur="10.5s"
              begin="1.2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Pulse 3: Cyan traveling trace 3 */}
          <circle r="4.5" className="hero-circuit-pulse hero-pulse-cyan" filter="url(#hero-pulse-glow-cyan)">
            <animateMotion
              path="M 0 530 L 320 530 L 420 430 L 700 430"
              dur="11.5s"
              begin="2.6s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Pulse 4: Red traveling trace 4 */}
          <circle r="4.5" className="hero-circuit-pulse hero-pulse-red" filter="url(#hero-pulse-glow-red)">
            <animateMotion
              path="M 1440 120 L 1120 120 L 1030 210 L 1030 490"
              dur="9.8s"
              begin="0.7s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Pulse 5: Cyan traveling trace 5 */}
          <circle r="4.5" className="hero-circuit-pulse hero-pulse-cyan" filter="url(#hero-pulse-glow-cyan)">
            <animateMotion
              path="M 1290 0 L 1290 170 L 1150 310 L 880 310"
              dur="12.2s"
              begin="3.1s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Pulse 6: Red traveling trace 6 */}
          <circle r="4.5" className="hero-circuit-pulse hero-pulse-red" filter="url(#hero-pulse-glow-red)">
            <animateMotion
              path="M 1440 550 L 1080 550 L 990 460 L 660 460"
              dur="10.8s"
              begin="4.2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* ── Main 2-Column Hero Container ─────────────────────────────────── */}
      <div className="hero-container">

        {/* ── Left Column: Headline, Monospace Terminal & Actions ─────────── */}
        <div className="hero-content">

          {/* Eyebrow Badge */}
          <div className="hero-eyebrow-badge">
            <span className="hero-badge-pulse" aria-hidden="true">
              <span className="hero-badge-ping" />
              <span className="hero-badge-dot" />
            </span>
            <Briefcase size={13} className="hero-badge-icon" aria-hidden="true" />
            <span>CAREERS AT HTI AUTOMATION</span>
            <span className="hero-badge-sep" aria-hidden="true">·</span>
            <span className="hero-badge-tag">ENGINEERING &amp; TECH</span>
          </div>

          {/* Monospace Control-Room Typing Terminal Line (Effect 2) */}
          <div className="hero-terminal-pill" aria-live="polite">
            <span className="hero-terminal-prompt">SYS //</span>
            <span className="hero-terminal-code">{typingText}</span>
            <span className="hero-terminal-cursor" aria-hidden="true">_</span>
          </div>

          {/* Staggered Animated Headline with Shimmer on "Engineering Career" (Effect 2) */}
          <h1 className="hero-title" aria-label="Build Your Engineering Career at HTI Automation">
            <span className="hero-title-line">
              <span className="hero-title-word hero-word-1">Build</span>{' '}
              <span className="hero-title-word hero-word-2">Your</span>{' '}
              <span className="hero-title-word hero-word-highlight">
                <span className="hero-shimmer-text">Engineering Career</span>
              </span>
            </span>
            <span className="hero-title-break hero-title-word hero-word-break">
              at HTI Automation
            </span>
          </h1>

          {/* Paragraph Description */}
          <p className="hero-desc">
            Join a Mumbai-based engineering team that has been delivering mission-critical industrial
            automation, pharma cleanroom interlocks, and life-safety infrastructure since 2014.
            Do meaningful work. Grow fast. Make a real impact.
          </p>

          {/* Action Buttons (Effect 3) */}
          <div className="hero-actions">
            <a
              href="#open-positions"
              className="hero-btn-primary"
              onClick={handleViewPositions}
              id="careers-hero-explore-btn"
            >
              <span>View Open Positions</span>
              <ArrowRight size={17} className="hero-btn-arrow" aria-hidden="true" />
            </a>
            <a
              href="#life-at-hti"
              className="hero-btn-secondary"
              onClick={handleLifeAtHti}
              id="careers-hero-life-btn"
            >
              <Heart size={16} className="hero-btn-heart" aria-hidden="true" />
              <span>Life at HTI</span>
            </a>
          </div>

          {/* Staggered Bottom Chips with Colored Hover Lift (Effect 6) */}
          <div className="hero-chips-wrap">
            <div className="hero-chip hero-chip-1">
              <div className="hero-chip-icon"><Cpu size={15} aria-hidden="true" /></div>
              <span>PLC &amp; Industrial Automation</span>
            </div>
            <div className="hero-chip hero-chip-2">
              <div className="hero-chip-icon"><ShieldCheck size={15} aria-hidden="true" /></div>
              <span>Pharma Cleanroom Systems</span>
            </div>
            <div className="hero-chip hero-chip-3">
              <div className="hero-chip-icon"><Award size={15} aria-hidden="true" /></div>
              <span>Pan-India Project Deployments</span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Visual Image with 3D Tilt & Overlays (Effect 4) ─ */}
        <div className="hero-visual">
          <div className="hero-backdrop-plate" aria-hidden="true" />

          {/* 3D Tilt-Enabled Image Frame */}
          <div
            className="hero-image-frame"
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <img
              src="/careers-hero-team.jpg"
              alt="HTI Automation engineering team at work"
              className="hero-image"
              loading="eager"
              width="1280"
              height="720"
            />

            {/* Protective vignette layer for clean text overlay contrast */}
            <div className="hero-image-overlay" aria-hidden="true" />

            {/* Moving Laser Scanline */}
            <div className="hero-scanline" aria-hidden="true" />

            {/* Blueprint Corner Brackets that animate (draw in) on load (Effect 4) */}
            <svg className="hero-corner-bracket hero-corner-tl" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M 2 20 L 2 2 L 20 2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="hero-corner-bracket hero-corner-tr" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M 4 2 L 22 2 L 22 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="hero-corner-bracket hero-corner-bl" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M 2 4 L 2 22 L 20 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="hero-corner-bracket hero-corner-br" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M 4 22 L 22 22 L 22 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Floating Tag 1: Multidisciplinary Engineering Team (Gentle float) */}
            <div className="hero-float-team">
              <span className="hero-status-dot" aria-hidden="true" />
              <span>Multidisciplinary Engineering Team</span>
            </div>

            {/* Floating Tag 2: CAD Reference Metadata Badge (Different float speed) */}
            <div className="hero-float-cad" aria-hidden="true">
              <span className="hero-cad-dot" />
              <span>CAD REF // HTI-ENG-2026</span>
            </div>

            {/* Floating Tag 3: Pharma & Industrial Systems Pill (Different float speed) */}
            <div className="hero-float-pharma">
              <ShieldCheck size={13} className="hero-pharma-icon" aria-hidden="true" />
              <span>Pharma &amp; Industrial Systems</span>
            </div>

            {/* Floating Card 4: Animated Count-up Numbers (10+ and 500+) (Effect 4) */}
            <div className="hero-float-metric">
              <div className="hero-metric-row">
                <div className="hero-metric-icon-shell" aria-hidden="true">
                  <Award size={18} />
                </div>
                <div className="hero-metric-num">{yearsCount}+</div>
                <div className="hero-metric-info">
                  <span className="hero-metric-title">Years of Innovation</span>
                  <span className="hero-metric-sub">Serving India Since 2014</span>
                </div>
              </div>
              <div className="hero-metric-footer">
                <span className="hero-metric-footer-badge">{projectsCount}+ Projects</span>
                <span className="hero-metric-footer-sep" aria-hidden="true">·</span>
                <span className="hero-metric-footer-text">Pan-India Deployments</span>
              </div>
            </div>
          </div>

          {/* Blueprint Axis Coordinate Line beneath frame */}
          <div className="hero-axis-line" aria-hidden="true">
            <span>AXIS // 19.0760° N, 72.8777° E</span>
            <span className="hero-axis-dash" />
            <span>FIELD COMMISSIONING HQ</span>
          </div>
        </div>

      </div>
    </section>
  );
}
