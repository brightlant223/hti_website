import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowDown,
  Sparkles,
  Check
} from 'lucide-react';
import './CareersProcess.css';

/**
 * TypeScript Type Definitions (JSDoc)
 * 
 * @typedef {'STANDBY' | 'ACTIVE' | 'PASSED'} StepStatus
 * 
 * @typedef {Object} ProcessStep
 * @property {string} num - Step index e.g. '01'
 * @property {string} pill - Tag identifier e.g. 'APPLICATION'
 * @property {string} title - Step title
 * @property {string} desc - Main process description
 * @property {string} whatWeCheck - Monospace detail: criteria reviewed
 * @property {string} prepare - Monospace detail: candidate preparation tip
 * @property {string} time - Estimated turnaround time
 */

/** @type {ProcessStep[]} */
const PROCESS_STEPS = [
  {
    num: '01',
    pill: 'APPLICATION',
    title: 'Apply Online',
    desc: 'Submit your application via the form below or email your CV to careers@htisystems.in. We review every application personally.',
    whatWeCheck: 'CV alignment, core technical competencies & project background',
    prepare: 'Updated CV (PDF/DOCX) & portfolio or links to live engineering projects',
    time: 'Day 1'
  },
  {
    num: '02',
    pill: 'SCREENING',
    title: 'HR Screening Call',
    desc: 'Our HR team will contact you within 3–5 working days to verify your profile, experience, and availability.',
    whatWeCheck: 'Availability, role expectations, communication & culture fit',
    prepare: 'Notice period timeline, compensation expectations & career goals',
    time: 'Day 3–5'
  },
  {
    num: '03',
    pill: 'TECHNICAL',
    title: 'Technical Interview',
    desc: 'A focused discussion with the department head to assess your domain knowledge, hands-on skills, and problem-solving approach.',
    whatWeCheck: 'Domain knowledge, hands-on control systems & circuit troubleshooting',
    prepare: 'Explain past automation projects & core engineering fundamentals',
    time: 'Day 7–10'
  },
  {
    num: '04',
    pill: 'OFFER',
    title: 'Decision & Offer',
    desc: 'We communicate our decision promptly. If selected, we discuss compensation, joining date, and onboarding directly with you.',
    whatWeCheck: 'Role fit confirmation, compensation package & joining timeline',
    prepare: 'Academic certificates, identity proofs & previous employment docs',
    time: 'Day 14'
  }
];

/**
 * CareersProcess Component
 * Industrial Commissioning Sequence aesthetic for HTI Automation "How We Hire".
 * 
 * Features:
 *  1. Commissioning sequence track: signal pulse travels through 4 stages tied to scroll progress.
 *  2. Status LED + Monospace label: STANDBY (grey) -> ACTIVE (pulsing blue) -> PASSED (green).
 *  3. Dynamic number styling: Outlined in standby, filled with gradient when active/passed.
 *  4. Single-step hover/focus: only ONE step highlighted at a time, clears on mouse leave.
 *  5. Expanding detail panel: 3 monospace rows (WHAT WE CHECK, PREPARE, TIME) with smooth grid animation.
 *  6. SYSTEM LIVE final state: green beacon + pure CSS spark/confetti burst + smooth scroll "Apply Now" CTA.
 *  7. Telemetry summary strip & blueprint CAD background with ambient glowing nodes.
 *  8. Responsive: 4 columns desktop, 2x2 tablet, vertical timeline mobile (<640px).
 */
export default function CareersProcess({ scrollTo }) {
  const sectionRef = useRef(null);

  // Track scroll progress (0.0 to 1.0) through the section
  const [signalProgress, setSignalProgress] = useState(0);

  // Viewport entrance visibility flag for staggered entrance animation
  const [isInView, setIsInView] = useState(false);

  // Hover or keyboard-focused step index (strictly single active step; null on mouse leave)
  const [focusedStep, setFocusedStep] = useState(null);

  // Final state trigger
  const [isSystemLive, setIsSystemLive] = useState(false);

  // ── 1. Scroll Position & Viewport Observer ──────────────────────────────────
  useEffect(() => {
    // Immediate fallback for users who prefer reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setSignalProgress(1);
      setIsInView(true);
      setIsSystemLive(true);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Start signal when section top reaches ~80% down the screen
          const startOffset = windowHeight * 0.8;
          // Finish signal when section top reaches ~15% from screen top
          const travelDistance = rect.height + (windowHeight * 0.4);
          const currentDistance = startOffset - rect.top;

          const rawProgress = currentDistance / travelDistance;
          const clamped = Math.max(0, Math.min(1, rawProgress));

          setSignalProgress(clamped);

          if (clamped >= 0.88) {
            setIsSystemLive(true);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // IntersectionObserver to detect when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            handleScroll();
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      if (currentSection) observer.unobserve(currentSection);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // ── 2. Derive Status for Each Step (STANDBY | ACTIVE | PASSED) ─────────────
  /**
   * @param {number} index - Step index (0 to 3)
   * @returns {StepStatus}
   */
  const getStepStatus = (index) => {
    // If prefers-reduced-motion or live
    if (signalProgress >= 0.95) return 'PASSED';

    // Step-by-step threshold brackets
    const thresholds = [
      { active: 0.05, passed: 0.28 },
      { active: 0.28, passed: 0.54 },
      { active: 0.54, passed: 0.78 },
      { active: 0.78, passed: 0.95 }
    ];

    const current = thresholds[index];
    if (signalProgress < current.active) return 'STANDBY';
    if (signalProgress >= current.passed) return 'PASSED';
    return 'ACTIVE';
  };

  // ── 3. Smooth Scroll to Apply Now Section ──────────────────────────────────
  const handleScrollToApply = () => {
    if (scrollTo) {
      scrollTo('application-form');
    } else {
      const el = document.getElementById('application-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // ── 4. Keyboard Navigation (Enter / Space to Toggle Details) ───────────────
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFocusedStep((prev) => (prev === index ? null : index));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="process-commissioning-section"
      id="hiring-process"
      aria-label="How We Hire - Commissioning Sequence"
    >
      {/* Background blueprint grid */}
      <div className="process-blueprint-grid" aria-hidden="true" />

      {/* Ambient glowing radial light nodes */}
      <div className="process-ambient-glow-blue" aria-hidden="true" />
      <div className="process-ambient-glow-red" aria-hidden="true" />

      <div className="process-container">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="process-header">
          <div className="process-eyebrow">
            <span className="process-eyebrow-line" aria-hidden="true" />
            <span className="process-eyebrow-text">HOW WE HIRE</span>
          </div>

          <h2 className="process-heading">Simple. Transparent. Fast.</h2>

          <p className="process-intro-text">
            Our process is respectful of your time — typically completed within 1–2 weeks.
          </p>

          {/* Thin Summary Strip */}
          <div className="process-telemetry-strip" role="status" aria-label="Process Overview">
            <div className="process-telemetry-item">
              <span className="process-telemetry-dot" aria-hidden="true" />
              <span className="process-telemetry-text">4 STEPS</span>
            </div>
            <span className="process-telemetry-sep" aria-hidden="true">|</span>
            <div className="process-telemetry-item">
              <Clock size={12} className="process-telemetry-icon" aria-hidden="true" />
              <span className="process-telemetry-text">1–2 WEEKS</span>
            </div>
            <span className="process-telemetry-sep" aria-hidden="true">|</span>
            <div className="process-telemetry-item">
              <ShieldCheck size={12} className="process-telemetry-icon" aria-hidden="true" />
              <span className="process-telemetry-text">EVERY APPLICATION REVIEWED PERSONALLY</span>
            </div>
          </div>
        </div>

        {/* ── SEQUENCE TRACK & STEPS ─────────────────────────── */}
        <div
          className="process-sequence-wrapper"
          style={{
            '--signal-progress': signalProgress,
            '--signal-percent': `${Math.round(signalProgress * 100)}%`
          }}
        >
          {/* Horizontal Connection Track (Desktop) */}
          <div className="process-track-container" aria-hidden="true">
            {/* Base grey line */}
            <div className="process-track-base" />
            {/* Animated dashed line */}
            <div className="process-track-dashed" />
            {/* Gradient filled line tied to scroll */}
            <div
              className="process-track-fill"
              style={{ width: `${Math.min(100, Math.max(0, signalProgress * 100))}%` }}
            />
            {/* Glowing signal pulse travelling along the track */}
            <div
              className="process-track-pulse"
              style={{ left: `${Math.min(100, Math.max(0, signalProgress * 100))}%` }}
            >
              <span className="process-pulse-core" />
              <span className="process-pulse-ring" />
            </div>
          </div>

          {/* Steps Grid */}
          <div
            className="process-steps-grid"
            role="list"
            onMouseLeave={() => setFocusedStep(null)}
          >
            {PROCESS_STEPS.map((step, index) => {
              const status = getStepStatus(index);
              const isExpanded = focusedStep === index;
              const isPassed = status === 'PASSED';
              const isActive = status === 'ACTIVE';

              return (
                <div
                  key={step.num}
                  className={[
                    'process-step-card',
                    `process-step-${step.num}`,
                    `is-status-${status.toLowerCase()}`,
                    isActive ? 'is-active' : '',
                    isPassed ? 'is-passed' : '',
                    isExpanded ? 'is-expanded' : '',
                    isInView ? 'is-visible' : ''
                  ].filter(Boolean).join(' ')}
                  role="listitem"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`process-detail-${index}`}
                  style={{ '--step-idx': index }}
                  onMouseEnter={() => setFocusedStep(index)}
                  onMouseLeave={() => setFocusedStep((prev) => (prev === index ? null : prev))}
                  onClick={() => setFocusedStep((prev) => (prev === index ? null : index))}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  {/* Top gradient border on hover/active */}
                  <div className="process-card-top-border" aria-hidden="true" />

                  {/* Top Row: Status LED + Monospace Label & Phase Pill */}
                  <div className="process-step-header-row">
                    <div className={`process-status-badge status-${status.toLowerCase()}`}>
                      <span className="process-status-led" aria-hidden="true">
                        {isPassed && <Check size={8} className="process-led-check" />}
                      </span>
                      <span className="process-status-text">{status}</span>
                    </div>
                    <span className="process-accent-pill">{step.pill}</span>
                  </div>

                  {/* Large Number with Outline/Gradient Fill Transition */}
                  <div className="process-num-row">
                    <span className="process-step-num" aria-hidden="true">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Title & Main Description */}
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.desc}</p>

                  {/* Expanding Detail Panel (Single Active Step Only) */}
                  <div
                    id={`process-detail-${index}`}
                    className={`process-detail-panel ${isExpanded ? 'is-open' : ''}`}
                    aria-hidden={!isExpanded}
                  >
                    <div className="process-detail-inner">
                      <div className="process-detail-divider" aria-hidden="true" />

                      {/* Row 1: WHAT WE CHECK */}
                      <div className="process-detail-row">
                        <span className="process-detail-tag">WHAT WE CHECK</span>
                        <p className="process-detail-val">{step.whatWeCheck}</p>
                      </div>

                      {/* Row 2: PREPARE */}
                      <div className="process-detail-row">
                        <span className="process-detail-tag">PREPARE</span>
                        <p className="process-detail-val">{step.prepare}</p>
                      </div>

                      {/* Row 3: TIME */}
                      <div className="process-detail-row process-time-row">
                        <span className="process-detail-tag">TIME</span>
                        <span className="process-time-badge">{step.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual expand hint for keyboard & mobile touch */}
                  <div className="process-expand-hint" aria-hidden="true">
                    <span>{isExpanded ? 'Click to collapse' : 'Hover / tap for details'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FINAL STATE: SYSTEM LIVE & APPLY NOW ──────────── */}
        <div className={`process-system-live-wrap ${isSystemLive ? 'is-live-active' : ''}`}>

          {/* Pure CSS Confetti & Spark Burst (Plays once when live unlocks) */}
          {isSystemLive && (
            <div className="process-spark-burst" aria-hidden="true">
              <span className="process-spark-particle spark-1" />
              <span className="process-spark-particle spark-2" />
              <span className="process-spark-particle spark-3" />
              <span className="process-spark-particle spark-4" />
              <span className="process-spark-particle spark-5" />
              <span className="process-spark-particle spark-6" />
              <span className="process-spark-particle spark-7" />
              <span className="process-spark-particle spark-8" />
              <span className="process-spark-particle spark-9" />
              <span className="process-spark-particle spark-10" />
            </div>
          )}

          {/* SYSTEM LIVE Badge */}
          <div className="process-system-live-badge" role="status">
            <span className="process-live-beacon" aria-hidden="true">
              <span className="process-beacon-core" />
              <span className="process-beacon-ring" />
            </span>
            <span className="process-live-text">SYSTEM LIVE — Welcome to HTI</span>
          </div>

          {/* Smooth-scroll to Application Form CTA */}
          <button
            type="button"
            className="process-apply-now-btn"
            onClick={handleScrollToApply}
            aria-label="Scroll down to application form"
          >
            <span>Apply Now</span>
            <ArrowDown size={14} className="process-btn-arrow" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
}
