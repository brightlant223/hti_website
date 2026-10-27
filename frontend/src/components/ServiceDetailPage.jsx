/**
 * ServiceDetailPage.jsx
 * This view renders any service detail page from a data object passed in the
 * pagesData prop (industrial access, fire safety, future categories); default is INDUSTRIAL_ACCESS_PAGES.
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Shield,
  Activity,
  Zap,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  ArrowRight,
  X,
  Award,
  Layers,
  DoorClosed,
  Settings,
  Eye,
  SlidersHorizontal,
  Lock,
  Info,
  ChevronDown,
  ChevronUp,
  Radio,
  Cpu,
  Truck,
  User,
  Check,
  HelpCircle,
  Flame,
  Droplets,
  Bell,
  AlertTriangle
} from 'lucide-react';
import { INDUSTRIAL_ACCESS_PAGES } from '../data/industrialAccessPagesData';
import { CLEANROOM_PAGES } from '../data/cleanroomPagesData';
import { FIRE_SAFETY_PAGES } from '../data/fireSafetyPagesData';
import { PERIMETER_DEFENSE_PAGES } from '../data/perimeterDefensePagesData';
import { CCTV_BIOMETRICS_PAGES } from '../data/cctvBiometricsPagesData';
import { SERVER_MONITORING_PAGES } from '../data/serverMonitoringPagesData';
import './TouchlessEntryPage.css';

const ALL_PAGES = {
  ...INDUSTRIAL_ACCESS_PAGES,
  ...CLEANROOM_PAGES,
  ...FIRE_SAFETY_PAGES,
  ...PERIMETER_DEFENSE_PAGES,
  ...CCTV_BIOMETRICS_PAGES,
  ...SERVER_MONITORING_PAGES,

  // Universal Cross-Compatibility Aliases
  // Category 1: Industrial Access
  'automatic-sliding-swing-doors': INDUSTRIAL_ACCESS_PAGES['perimeter-gate'],
  'automatic-sliding-swing-gates': INDUSTRIAL_ACCESS_PAGES['perimeter-gate'],
  'touchless-entry-solutions': INDUSTRIAL_ACCESS_PAGES['perimeter-gate'],
  'touchless-entry': INDUSTRIAL_ACCESS_PAGES['perimeter-gate'],
  'telescopic-cantilever-gates': INDUSTRIAL_ACCESS_PAGES['trackless-gate'],
  'high-speed-roll-up-doors': INDUSTRIAL_ACCESS_PAGES['rapid-airlock'],
  'pvc-rapid-roll-up-doors': INDUSTRIAL_ACCESS_PAGES['rapid-airlock'],
  'dock-levellers-dock-shelters': INDUSTRIAL_ACCESS_PAGES['logistics-bridge'],
  'dock-levellers': INDUSTRIAL_ACCESS_PAGES['logistics-bridge'],
  'motorized-rolling-shutters': INDUSTRIAL_ACCESS_PAGES['heavy-security'],
  'motorized-industrial-rolling-shutters': INDUSTRIAL_ACCESS_PAGES['heavy-security'],

  // Category 2: Cleanroom Interlocks
  'door-interlock-system': CLEANROOM_PAGES['door-interlock-system'],
  'door-interlock-systems': CLEANROOM_PAGES['door-interlock-system'],
  'door-interlock-2-8-door': CLEANROOM_PAGES['door-interlock-system'],
  'cleanroom-door-interlocks': CLEANROOM_PAGES['door-interlock-system'],
  'pass-box-systems': CLEANROOM_PAGES['pass-box-systems'],
  'pass-box-system': CLEANROOM_PAGES['pass-box-systems'],
  'digital-clocks': CLEANROOM_PAGES['digital-clocks'],
  'digital-gps-clocks': CLEANROOM_PAGES['digital-clocks'],
  'digital-clock': CLEANROOM_PAGES['digital-clocks'],
  'chiller-cleanroom-doors': CLEANROOM_PAGES['chiller-cleanroom-doors'],
  'chiller-clean-room-doors': CLEANROOM_PAGES['chiller-cleanroom-doors'],
  'acoustic-sound-doors': CLEANROOM_PAGES['acoustic-sound-doors'],
  'sound-proof-doors': CLEANROOM_PAGES['acoustic-sound-doors'],
  'safety-override-buzzers': CLEANROOM_PAGES['safety-override-buzzers'],

  // Category 3: Perimeter Defense & Traffic Control
  'boom-barriers': PERIMETER_DEFENSE_PAGES['boom-barriers'],
  'boom-barrier': PERIMETER_DEFENSE_PAGES['boom-barriers'],
  'automatic-boom-barriers': PERIMETER_DEFENSE_PAGES['boom-barriers'],
  'electro-hydraulic-boom-barriers': PERIMETER_DEFENSE_PAGES['boom-barriers'],
  'turnstiles-flap-barriers-speed-gates': PERIMETER_DEFENSE_PAGES['turnstiles-flap-barriers-speed-gates'],
  'optical-turnstiles': PERIMETER_DEFENSE_PAGES['turnstiles-flap-barriers-speed-gates'],
  'optical-speed-turnstiles': PERIMETER_DEFENSE_PAGES['turnstiles-flap-barriers-speed-gates'],
  'speed-gates': PERIMETER_DEFENSE_PAGES['turnstiles-flap-barriers-speed-gates'],
  'flap-barriers': PERIMETER_DEFENSE_PAGES['turnstiles-flap-barriers-speed-gates'],
  'turnstiles-flap-barriers': PERIMETER_DEFENSE_PAGES['turnstiles-flap-barriers-speed-gates'],
  'crash-bollards-tyre-killers': PERIMETER_DEFENSE_PAGES['crash-bollards-tyre-killers'],
  'crash-bollards': PERIMETER_DEFENSE_PAGES['crash-bollards-tyre-killers'],
  'tyre-killers-bollards': PERIMETER_DEFENSE_PAGES['crash-bollards-tyre-killers'],
  'tyre-killers': PERIMETER_DEFENSE_PAGES['crash-bollards-tyre-killers'],
  'bollards-tyre-killers-car-lifts': PERIMETER_DEFENSE_PAGES['crash-bollards-tyre-killers'],
  'bollards-tyre-killers': PERIMETER_DEFENSE_PAGES['crash-bollards-tyre-killers'],
  'car-lift-systems': PERIMETER_DEFENSE_PAGES['car-lift-systems'],
  'car-lift': PERIMETER_DEFENSE_PAGES['car-lift-systems'],
  'car-lifts': PERIMETER_DEFENSE_PAGES['car-lift-systems'],
  'hydraulic-car-lifts': PERIMETER_DEFENSE_PAGES['car-lift-systems'],
  'parking-management-systems': PERIMETER_DEFENSE_PAGES['parking-management-systems'],
  'parking-management-system': PERIMETER_DEFENSE_PAGES['parking-management-systems'],
  'parking-management': PERIMETER_DEFENSE_PAGES['parking-management-systems'],
  'parking-intrusion-alarms': PERIMETER_DEFENSE_PAGES['parking-management-systems'],
  'visitor-management-system': PERIMETER_DEFENSE_PAGES['visitor-management-system'],
  'visitor-management-systems': PERIMETER_DEFENSE_PAGES['visitor-management-system'],
  'visitor-management': PERIMETER_DEFENSE_PAGES['visitor-management-system'],

  // Category 4: Fire Protection & Life Safety
  'addressable-fire-alarms': FIRE_SAFETY_PAGES['addressable-fire-alarms'],
  'fire-alarm-system': FIRE_SAFETY_PAGES['addressable-fire-alarms'],
  'fire-alarm-systems': FIRE_SAFETY_PAGES['addressable-fire-alarms'],
  'fire-alarm': FIRE_SAFETY_PAGES['addressable-fire-alarms'],
  'addressable-fire-alarm-system': FIRE_SAFETY_PAGES['addressable-fire-alarms'],
  'hydrant-sprinkler-arrays': FIRE_SAFETY_PAGES['hydrant-sprinkler-arrays'],
  'fire-hydrant-sprinkler-systems': FIRE_SAFETY_PAGES['hydrant-sprinkler-arrays'],
  'fire-hydrant-sprinklers': FIRE_SAFETY_PAGES['hydrant-sprinkler-arrays'],
  'hydrant-sprinkler-systems': FIRE_SAFETY_PAGES['hydrant-sprinkler-arrays'],
  'fire-rated-doors-shutters': FIRE_SAFETY_PAGES['fire-rated-doors-shutters'],
  'fire-rated-steel-doors': FIRE_SAFETY_PAGES['fire-rated-doors-shutters'],
  'fire-doors-shutters': FIRE_SAFETY_PAGES['fire-rated-doors-shutters'],
  'fire-rated-doors': FIRE_SAFETY_PAGES['fire-rated-doors-shutters'],
  'public-address-system': FIRE_SAFETY_PAGES['public-address-system'],
  'public-address-systems': FIRE_SAFETY_PAGES['public-address-system'],
  'public-address': FIRE_SAFETY_PAGES['public-address-system'],
  'gas-leak-detection': FIRE_SAFETY_PAGES['gas-leak-detection'],
  'gas-detection-systems': FIRE_SAFETY_PAGES['gas-leak-detection'],
  'gas-suppression-systems': FIRE_SAFETY_PAGES['gas-leak-detection'],
  'clean-agent-gas-suppression': FIRE_SAFETY_PAGES['gas-leak-detection'],
  'emergency-auto-trip': FIRE_SAFETY_PAGES['emergency-auto-trip'],
  'auto-trip-integration': FIRE_SAFETY_PAGES['emergency-auto-trip'],
  'emergency-trip-system': FIRE_SAFETY_PAGES['emergency-auto-trip'],

  // Category 5: CCTV Surveillance & Biometrics
  'cctv-surveillance-systems': CCTV_BIOMETRICS_PAGES['cctv-surveillance-systems'],
  'cctv-surveillance-system': CCTV_BIOMETRICS_PAGES['cctv-surveillance-systems'],
  'cctv-surveillance': CCTV_BIOMETRICS_PAGES['cctv-surveillance-systems'],
  '4k-ai-cctv-systems': CCTV_BIOMETRICS_PAGES['cctv-surveillance-systems'],
  'biometric-access-control': CCTV_BIOMETRICS_PAGES['biometric-access-control'],
  'biometric-access': CCTV_BIOMETRICS_PAGES['biometric-access-control'],
  'biometric-access-attendance': CCTV_BIOMETRICS_PAGES['biometric-access-control'],
  'biometric-attendance-access-terminals': CCTV_BIOMETRICS_PAGES['biometric-access-control'],
  'video-door-phones': CCTV_BIOMETRICS_PAGES['video-door-phones'],
  'video-door-phone': CCTV_BIOMETRICS_PAGES['video-door-phones'],
  'central-vms-command': CCTV_BIOMETRICS_PAGES['central-vms-command'],
  'central-vms-command-systems': CCTV_BIOMETRICS_PAGES['central-vms-command'],
  'central-vms': CCTV_BIOMETRICS_PAGES['central-vms-command'],
  'thermal-perimeter-beams': CCTV_BIOMETRICS_PAGES['thermal-perimeter-beams'],
  'thermal-perimeter-beam': CCTV_BIOMETRICS_PAGES['thermal-perimeter-beams'],
  'intrusion-detection-alarms': CCTV_BIOMETRICS_PAGES['intrusion-detection-alarms'],
  'intrusion-detection': CCTV_BIOMETRICS_PAGES['intrusion-detection-alarms'],
  'wireless-intrusion-detection': CCTV_BIOMETRICS_PAGES['intrusion-detection-alarms'],

  // Category 6: Server Room & Critical Monitoring
  'server-room-environment-monitoring': SERVER_MONITORING_PAGES['server-room-environment-monitoring'],
  'server-room-monitoring': SERVER_MONITORING_PAGES['server-room-environment-monitoring'],
  'server-room-ems': SERVER_MONITORING_PAGES['server-room-environment-monitoring'],
  'server-room-telemetry': SERVER_MONITORING_PAGES['server-room-environment-monitoring'],
  'server-room-alert-monitor': SERVER_MONITORING_PAGES['server-room-environment-monitoring'],
  'water-leak-detection-systems': SERVER_MONITORING_PAGES['water-leak-detection-systems'],
  'water-leak-detection': SERVER_MONITORING_PAGES['water-leak-detection-systems'],
  'underfloor-water-leak-detection': SERVER_MONITORING_PAGES['water-leak-detection-systems'],
  'hazardous-gas-detection-arrays': SERVER_MONITORING_PAGES['hazardous-gas-detection-arrays'],
  'hazardous-gas-detection': SERVER_MONITORING_PAGES['hazardous-gas-detection-arrays'],
  'gas-leak-detector': SERVER_MONITORING_PAGES['hazardous-gas-detection-arrays'],
  'battery-room-gas-detector': SERVER_MONITORING_PAGES['hazardous-gas-detection-arrays'],
  'alarm-annunciators': SERVER_MONITORING_PAGES['alarm-annunciators'],
  'alarm-annunciators-panel': SERVER_MONITORING_PAGES['alarm-annunciators'],
  'alarm-annunciator-panels': SERVER_MONITORING_PAGES['alarm-annunciators'],
  'microprocessor-annunciators': SERVER_MONITORING_PAGES['alarm-annunciators'],
  'differential-pressure-monitors': SERVER_MONITORING_PAGES['differential-pressure-monitors'],
  'differential-pressure-monitor': SERVER_MONITORING_PAGES['differential-pressure-monitors'],
  'rodent-repellent-systems': SERVER_MONITORING_PAGES['rodent-repellent-systems'],
  'rodent-repellent': SERVER_MONITORING_PAGES['rodent-repellent-systems'],
  'ultrasonic-rodent-repellent': SERVER_MONITORING_PAGES['rodent-repellent-systems'],
};

// Icon resolver mapping string names to Lucide components
const ICON_MAP = {
  ShieldCheck,
  Shield,
  Activity,
  Zap,
  Sparkles,
  Award,
  Layers,
  DoorClosed,
  Settings,
  SlidersHorizontal,
  Lock,
  Radio,
  Cpu,
  Truck,
  User,
  Check,
  HelpCircle,
  Eye,
  Flame,
  Droplets,
  Volume2,
  Bell,
  AlertTriangle
};

const resolveIcon = (iconInput, defaultIcon = ShieldCheck) => {
  if (!iconInput) return defaultIcon;
  if (typeof iconInput === 'string') {
    return ICON_MAP[iconInput] || defaultIcon;
  }
  return iconInput;
};

export default function ServiceDetailPage({
  slug = 'perimeter-gate',
  pagesData = ALL_PAGES,
  onNavigate,
  onQuoteSubmit
}) {
  const cleanSlug = (slug || '').trim().replace(/^\/|\/$/g, '');
  const pageData = (pagesData && pagesData[cleanSlug]) || ALL_PAGES[cleanSlug] || (pagesData && pagesData[slug]) || ALL_PAGES[slug] || (pagesData && pagesData[Object.keys(pagesData)[0]]) || INDUSTRIAL_ACCESS_PAGES['perimeter-gate'];

  // Video player state
  const videoRef = useRef(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  // prefers-reduced-motion media query hook
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(pageData.titleLine1 + ' Solution');

  // Interactive step in "How It Works"
  const [activeStep, setActiveStep] = useState(0);

  // Active technology tab
  const [selectedTechTab, setSelectedTechTab] = useState(0);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Form data for quote
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    application: 'Industrial Facilities',
    productType: pageData.titleLine1,
    quantity: '1-3 Units',
    message: `Hello HTI Engineering, please share technical datasheet, structural drawing, and turnkey quotation for ${pageData.titleLine1} Solutions.`
  });

  // Listen to prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
        userPausedRef.current = true;
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionChange);
      return () => mediaQuery.removeListener(handleMotionChange);
    }
  }, []);

  // Scroll to top and set page title on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${pageData.titleLine1} Solutions | HTI Automation & Security Systems`;
    setSelectedTechTab(0);
    setActiveStep(0);
    setOpenFaqIndex(0);
    setSelectedProductForQuote(pageData.titleLine1 + ' Solution');
    setVideoFailed(false);
    userPausedRef.current = prefersReducedMotion;
    setFormData(prev => ({
      ...prev,
      productType: pageData.titleLine1,
      message: `Hello HTI Engineering, please share technical datasheet, structural drawing, and turnkey quotation for ${pageData.titleLine1} Solutions.`
    }));
  }, [cleanSlug, pageData.titleLine1, prefersReducedMotion]);

  // Pause video when tab is hidden or hero video scrolls out of view
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      } else {
        if (!userPausedRef.current && !prefersReducedMotion && videoRef.current) {
          const rect = videoRef.current.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) {
            videoRef.current.play().catch(() => {});
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    let observer;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current) return;
            if (!entry.isIntersecting) {
              if (!videoRef.current.paused) {
                videoRef.current.pause();
              }
            } else {
              if (!userPausedRef.current && !prefersReducedMotion && !document.hidden) {
                videoRef.current.play().catch(() => {});
              }
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(videoEl);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [cleanSlug, prefersReducedMotion, videoFailed]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        userPausedRef.current = false;
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn('Playback error:', err);
        });
      } else {
        userPausedRef.current = true;
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const scrollToNextSection = () => {
    const targets = [
      'service-details-section',
      'service-workflow-section',
      'service-specs-section',
      'service-faq-section'
    ];
    for (const id of targets) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  };

  const handleOpenQuote = (productName) => {
    setSelectedProductForQuote(productName || (pageData.titleLine1 + ' Solution'));
    setQuoteSuccess(false);
    setIsQuoteModalOpen(true);
  };

  // Shared inquiry submission helper to eliminate duplicate logic
  const submitInquiryData = async (productName) => {
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          product_name: productName,
          category: pageData.categoryName || 'Service Enquiry',
          message: `Application: ${formData.application} | Qty: ${formData.quantity} | ${formData.message}`
        })
      });
    } catch (err) {
      console.warn('API submission fallback to local:', err);
    }

    if (onQuoteSubmit) {
      onQuoteSubmit({
        ...formData,
        product: productName,
        source: `${pageData.titleLine1} Page`
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await submitInquiryData(selectedProductForQuote);
    setQuoteSuccess(true);
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setQuoteSuccess(false);
    }, 2400);
  };

  const howItWorksSteps = Array.isArray(pageData.howItWorks)
    ? pageData.howItWorks
    : (pageData.howItWorks && Array.isArray(pageData.howItWorks.steps) ? pageData.howItWorks.steps : []);

  const rawVideoSrc = pageData.showcase && pageData.showcase.videoSrc ? pageData.showcase.videoSrc.trim() : '';
  const posterSrc = (pageData.showcase && pageData.showcase.poster) || pageData.heroImage;
  const showHeroVideo = Boolean(rawVideoSrc) && !videoFailed;

  return (
    <div className="touchless-page-root">
      {/* 1. TOP HERO SECTION */}
      <section className="touchless-hero-section">
        {/* Futuristic Mesh Background & Ambient Lighting */}
        <div className="touchless-hero-ambient-glow"></div>
        <div className="touchless-hero-mesh-grid"></div>

        <div className="touchless-container">
          {/* Breadcrumbs */}
          <nav className="touchless-breadcrumbs" aria-label="Breadcrumb">
            {(pageData.breadcrumbs || []).map((crumb, cIdx) => (
              <React.Fragment key={cIdx}>
                {cIdx > 0 && <span className="breadcrumb-sep">&gt;</span>}
                {crumb.isCurrent ? (
                  <span className="breadcrumb-current">{crumb.label}</span>
                ) : (
                  <span
                    className="breadcrumb-link"
                    onClick={() => onNavigate && onNavigate(crumb.page || 'home')}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="touchless-hero-layout">
            {/* Left Column: Heading, Badge, Description, Metrics & CTA */}
            <div className="touchless-hero-left">
              <div className="touchless-badge-pill">
                <span className="badge-dot"></span>
                <span>{pageData.badge}</span>
              </div>

              <h1 className="touchless-hero-title">
                {pageData.titleLine1}<br />
                <span className="touchless-title-accent">{pageData.titleLine2Accent}</span>
              </h1>

              <div className="touchless-hero-tagline">
                {pageData.tagline}
              </div>

              <p className="touchless-hero-desc">
                {pageData.description}
              </p>

              <div className="touchless-hero-metrics-pills">
                {(pageData.metrics || []).map((metric, mIdx) => {
                  const MetricIcon = resolveIcon(metric.icon, Zap);
                  return (
                    <div key={mIdx} className="metric-pill">
                      <MetricIcon size={13} className="pill-icon" />
                      <span>{metric.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="touchless-hero-actions">
                <button
                  className="touchless-btn-primary"
                  onClick={() => handleOpenQuote(pageData.titleLine1 + ' Solution')}
                >
                  <span>Request a Quote</span>
                  <ArrowRight size={18} className="btn-icon-right" />
                </button>

                <button
                  className="touchless-btn-secondary"
                  onClick={scrollToNextSection}
                >
                  <span>Explore Details</span>
                </button>
              </div>
            </div>

            {/* Center: Showcase Video (or Image Fallback) with Interactive Status Badge */}
            <div className="touchless-hero-center">
              <div className="touchless-door-showcase-frame">
                <div className="door-viewport">
                  {showHeroVideo ? (
                    <>
                      <video
                        ref={videoRef}
                        key={rawVideoSrc}
                        src={rawVideoSrc}
                        poster={posterSrc}
                        className="touchless-hero-door-img"
                        autoPlay={!prefersReducedMotion}
                        loop
                        muted={isMuted}
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onError={() => {
                          console.warn('Hero video load failed, falling back to static heroImage.');
                          setVideoFailed(true);
                        }}
                      />
                      {prefersReducedMotion && !isPlaying && (
                        <button
                          type="button"
                          className="hero-reduced-motion-play-btn"
                          onClick={togglePlay}
                          aria-label="Play video"
                        >
                          <Play size={22} fill="currentColor" />
                        </button>
                      )}
                      <div className="door-video-controls">
                        <button
                          type="button"
                          className="control-btn door-control-btn"
                          onClick={togglePlay}
                          aria-label={isPlaying ? "Pause video" : "Play video"}
                          title={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          type="button"
                          className="control-btn door-control-btn"
                          onClick={toggleMute}
                          aria-label={isMuted ? "Unmute video" : "Mute video"}
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={pageData.heroImage}
                      alt={`${pageData.titleLine1} Showcase`}
                      className="touchless-hero-door-img"
                    />
                  )}
                  <div className="door-reflection-overlay"></div>

                  <div className="door-interactive-badge">
                    <span className="door-pulse-live"></span>
                    <span>{pageData.heroStatusBadge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Key Benefits Cards */}
            <div className="touchless-hero-right">
              <div className="touchless-benefits-stack">
                {(pageData.benefits || []).map((benefit, bIdx) => {
                  const BenefitIcon = resolveIcon(benefit.icon, ShieldCheck);
                  return (
                    <div key={bIdx} className="benefit-card">
                      <div className="benefit-icon-box">
                        <BenefitIcon size={20} />
                      </div>
                      <div className="benefit-text">
                        <h3 className="benefit-title">{benefit.title}</h3>
                        <p className="benefit-desc">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Smooth Scroll Cue to Transition to Next Section */}
          <div className="hero-scroll-cue-wrapper">
            <button
              className="hero-scroll-cue"
              onClick={scrollToNextSection}
              aria-label="Scroll down to explore full system details"
            >
              <span>Scroll to explore full system details</span>
              <ChevronDown size={15} className="scroll-cue-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. ADVANCED TECHNOLOGY DEEP DIVE TABS */}
      {pageData.technologies && pageData.technologies.tabs && (
        <section className="touchless-sensors-deepdive-section" id="service-details-section">
          <div className="touchless-container">
            <div className="section-header-centered">
              <span className="section-eyebrow">{pageData.technologies.eyebrow}</span>
              <h2 className="section-title">{pageData.technologies.title}</h2>
              <div className="section-title-underline center-underline"></div>
              <p className="section-subtitle-desc">
                {pageData.technologies.subtitle}
              </p>
            </div>

            <div className="sensor-tabs-nav">
              {(pageData.technologies.tabs || []).map((tab, idx) => {
                const TabIcon = resolveIcon(tab.icon, Settings);
                return (
                  <button
                    key={tab.id || idx}
                    className={`sensor-tab-btn ${selectedTechTab === idx ? 'tab-active' : ''}`}
                    onClick={() => setSelectedTechTab(idx)}
                  >
                    <TabIcon size={16} />
                    <span>{(tab.name || '').split('(')[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {pageData.technologies.tabs[selectedTechTab] && (
              <div className="sensor-tab-content-card">
                <div className="sensor-content-left">
                  <span className="sensor-tech-badge">
                    {pageData.technologies.tabs[selectedTechTab].badge}
                  </span>
                  <h3 className="sensor-tech-name">
                    {pageData.technologies.tabs[selectedTechTab].name}
                  </h3>
                  <p className="sensor-tech-summary">
                    {pageData.technologies.tabs[selectedTechTab].summary}
                  </p>

                  <div className="sensor-highlights-list">
                    {(pageData.technologies.tabs[selectedTechTab].highlights || []).map((hl, hIdx) => (
                      <div key={hIdx} className="sensor-hl-item">
                        <CheckCircle2 size={16} className="hl-check-icon" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sensor-content-right">
                  <div className="sensor-spec-box">
                    <div className="spec-metric-row">
                      <span className="spec-metric-label">Capacity / Span:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].range}
                      </span>
                    </div>
                    <div className="spec-metric-row">
                      <span className="spec-metric-label">Drive Speed:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].speed}
                      </span>
                    </div>
                    <div className="spec-metric-row">
                      <span className="spec-metric-label">Regulatory Standard:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].standard || 'EN 12453 / CE Certified'}
                      </span>
                    </div>
                    <div className="spec-metric-row">
                      <span className="spec-metric-label">Protection Rating:</span>
                      <span className="spec-metric-val">
                        {pageData.technologies.tabs[selectedTechTab].ipRating || 'IP55 / IP65 Waterproof'}
                      </span>
                    </div>
                  </div>

                  <button
                    className="sensor-inquire-btn"
                    onClick={() => handleOpenQuote(pageData.technologies.tabs[selectedTechTab].name)}
                  >
                    <span>Request Technical Spec Sheet</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. HOW IT WORKS & IDEAL FOR MULTIPLE APPLICATIONS */}
      {howItWorksSteps.length > 0 && (
        <section className="touchless-workflow-app-section" id="service-workflow-section">
          {/* Responsive Styling for Mobile & Tablet - Scoped strictly to #service-workflow-section */}
          <style>{`
            /* Tablet (768px - 1024px) */
            @media (min-width: 768px) and (max-width: 1024px) {
              #service-workflow-section .workflow-and-app-grid {
                grid-template-columns: 1.15fr 1fr;
                gap: 24px;
              }
              #service-workflow-section .workflow-steps-horizontal {
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
              }
              #service-workflow-section .step-arrow-connector {
                display: none;
              }
              #service-workflow-section .application-tiles-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
              }
              #service-workflow-section .app-tile-label {
                white-space: normal;
                line-height: 1.3;
                min-height: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 6px 8px;
              }
            }

            /* Mobile Stacked Layout (below 768px) */
            @media (max-width: 767px) {
              #service-workflow-section {
                padding: 36px 0;
              }
              #service-workflow-section .touchless-container {
                padding-left: 16px;
                padding-right: 16px;
              }
              #service-workflow-section .workflow-and-app-grid {
                display: flex;
                flex-direction: column;
                gap: 36px;
                width: 100%;
              }
              #service-workflow-section .workflow-block,
              #service-workflow-section .applications-block {
                width: 100%;
                min-width: 0;
              }
              #service-workflow-section .section-subheading-wrap {
                margin-bottom: 18px;
              }
              #service-workflow-section .section-title {
                font-size: 20px;
                line-height: 1.3;
              }

              /* 1. How It Works Process Cards */
              #service-workflow-section .workflow-steps-horizontal {
                display: flex;
                flex-direction: column;
                gap: 14px;
                width: 100%;
                margin-bottom: 16px;
              }
              #service-workflow-section .workflow-step-card {
                width: 100%;
                box-sizing: border-box;
                padding: 18px 16px 16px 16px;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 12px;
                position: relative;
                min-height: unset;
                height: auto;
              }
              #service-workflow-section .step-num-badge {
                position: absolute;
                top: -8px;
                left: 14px;
                width: 22px;
                height: 22px;
                font-size: 11px;
                z-index: 2;
              }
              #service-workflow-section .step-icon-wrap {
                width: 48px;
                height: 48px;
                margin: 2px auto 10px auto;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              #service-workflow-section .step-name {
                font-size: 15px;
                font-weight: 700;
                line-height: 1.35;
                margin: 0 0 6px 0;
                color: #0f172a;
                white-space: normal;
                word-break: break-word;
              }
              #service-workflow-section .step-desc {
                font-size: 12.5px;
                line-height: 1.45;
                color: #64748b;
                margin: 0;
                white-space: normal;
                word-break: break-word;
                max-width: 100%;
              }
              #service-workflow-section .step-arrow-connector {
                display: none;
              }
              #service-workflow-section .step-active-callout {
                padding: 14px 16px;
                border-radius: 0 8px 8px 0;
                margin-top: 14px;
              }
              #service-workflow-section .callout-indicator {
                font-size: 13px;
                font-weight: 700;
                margin-bottom: 6px;
                gap: 6px;
                flex-wrap: wrap;
              }
              #service-workflow-section .step-active-callout p {
                font-size: 13px;
                line-height: 1.5;
                word-break: break-word;
              }

              /* 2. Ideal For Multiple Applications Gallery */
              #service-workflow-section .application-tiles-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
                width: 100%;
              }
              #service-workflow-section .app-tile {
                display: flex;
                flex-direction: column;
                border-radius: 10px;
                overflow: hidden;
                background: #ffffff;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                width: 100%;
                min-width: 0;
                box-sizing: border-box;
              }
              #service-workflow-section .app-tile-media {
                width: 100%;
                height: 110px;
                overflow: hidden;
                background-color: #0f172a;
                position: relative;
              }
              #service-workflow-section .app-tile-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
              }
              #service-workflow-section .app-tile-label {
                padding: 10px 8px;
                font-size: 12px;
                font-weight: 700;
                color: #1e293b;
                text-align: center;
                white-space: normal;
                overflow: visible;
                text-overflow: clip;
                word-break: break-word;
                min-height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1.35;
                box-sizing: border-box;
              }
            }

            /* Small Mobile (below 400px) */
            @media (max-width: 400px) {
              #service-workflow-section {
                padding: 28px 0;
              }
              #service-workflow-section .touchless-container {
                padding-left: 12px;
                padding-right: 12px;
              }
              #service-workflow-section .workflow-and-app-grid {
                gap: 28px;
              }
              #service-workflow-section .section-title {
                font-size: 18px;
              }
              #service-workflow-section .workflow-step-card {
                padding: 14px 12px 12px 12px;
              }
              #service-workflow-section .step-icon-wrap {
                width: 42px;
                height: 42px;
                margin-bottom: 8px;
              }
              #service-workflow-section .step-name {
                font-size: 14px;
              }
              #service-workflow-section .step-desc {
                font-size: 12px;
                line-height: 1.4;
              }
              #service-workflow-section .application-tiles-grid {
                gap: 8px;
              }
              #service-workflow-section .app-tile-media {
                height: 95px;
              }
              #service-workflow-section .app-tile-label {
                font-size: 11px;
                padding: 8px 4px;
                min-height: 36px;
              }
            }

            /* Extremely Narrow Mobile (below 320px) */
            @media (max-width: 320px) {
              #service-workflow-section .application-tiles-grid {
                grid-template-columns: 1fr;
              }
              #service-workflow-section .app-tile-media {
                height: 130px;
              }
            }
          `}</style>

          <div className="touchless-container">
            <div className="workflow-and-app-grid">
              {/* Left: How It Works */}
              <div className="workflow-block">
                <div className="section-subheading-wrap">
                  <h2 className="section-title">{pageData.howItWorks?.title || 'How It Works ?'}</h2>
                  <div className="section-title-underline"></div>
                </div>

                <div className="workflow-steps-horizontal">
                  {howItWorksSteps.map((st, sIdx) => {
                    const stepNum = st.step || st.num || (sIdx + 1);
                    return (
                      <div
                        key={sIdx}
                        className={`workflow-step-card ${activeStep === sIdx ? 'is-active-step' : ''}`}
                        onClick={() => setActiveStep(sIdx)}
                      >
                        <div className="step-num-badge">{stepNum}</div>

                        <div className="step-icon-wrap">
                          {sIdx === 0 && (
                            <div className="step-icon-svg radar-step">
                              <Activity size={26} />
                            </div>
                          )}
                          {sIdx === 1 && (
                            <div className="step-icon-svg controller-step">
                              <Settings size={26} />
                            </div>
                          )}
                          {sIdx === 2 && (
                            <div className="step-icon-svg door-open-step">
                              <DoorClosed size={26} />
                            </div>
                          )}
                          {sIdx === 3 && (
                            <div className="step-icon-svg door-close-step">
                              <Lock size={26} />
                            </div>
                          )}
                        </div>

                        <h4 className="step-name">{st.title}</h4>
                        <p className="step-desc">{st.desc || st.description}</p>

                        {sIdx < howItWorksSteps.length - 1 && (
                          <div className="step-arrow-connector" aria-hidden="true">
                            <ArrowRight size={18} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Step Detail Explanation Box */}
                {howItWorksSteps[activeStep] && (
                  <div className="step-active-callout">
                    <div className="callout-indicator">
                      <Info size={18} />
                      <strong>Step {howItWorksSteps[activeStep].step || howItWorksSteps[activeStep].num || (activeStep + 1)} Engineering Insight:</strong>
                    </div>
                    <p>
                      {howItWorksSteps[activeStep].detail ||
                        (Array.isArray(howItWorksSteps[activeStep].details) ? howItWorksSteps[activeStep].details.join(' • ') : '') ||
                        howItWorksSteps[activeStep].desc ||
                        howItWorksSteps[activeStep].description || ''}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Ideal For Multiple Applications */}
              <div className="applications-block">
                <div className="section-subheading-wrap">
                  <h2 className="section-title">Ideal For Multiple Applications</h2>
                  <div className="section-title-underline"></div>
                </div>

                <div className="application-tiles-grid">
                  {(pageData.applications || []).map((app, aIdx) => (
                    <div key={aIdx} className="app-tile">
                      <div className="app-tile-media">
                        <img
                          src={app.image || pageData.heroImage || '/head-office-building.jpg'}
                          alt={app.title}
                          className="app-tile-img"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = pageData.heroImage || '/head-office-building.jpg';
                          }}
                        />
                      </div>
                      <div className="app-tile-label">{app.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. TECHNICAL SPECIFICATIONS & STANDARDS */}
      <section className="touchless-specs-section" id="service-specs-section">
        <div className="touchless-container">
          <div className="specs-cert-grid">
            {/* Left: Technical Specifications */}
            <div className="specs-table-wrapper">
              <h2 className="section-title">Technical Specifications (Typical)</h2>
              <div className="specs-table-container">
                <table className="tech-specs-table">
                  <tbody>
                    {Array.isArray(pageData.specs) && pageData.specs.map((row, rIdx) => {
                      if (row.category && Array.isArray(row.items)) {
                        return (
                          <React.Fragment key={rIdx}>
                            <tr className="spec-category-header">
                              <th colSpan="2">{row.category}</th>
                            </tr>
                            {row.items.map((it, iIdx) => (
                              <tr key={`${rIdx}-${iIdx}`}>
                                <td className="spec-label">{it.label}</td>
                                <td className="spec-value">{it.value}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      }
                      return (
                        <tr key={rIdx}>
                          <td className="spec-label">{row.label}</td>
                          <td className="spec-value">{row.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Right: Standards & Statutory Certifications */}
            <div className="certs-wrapper">
              <h2 className="section-title">Standards &amp; Statutory Certifications</h2>

              <div className="certs-list">
                {(pageData.certs || pageData.standards || []).map((cert, cIdx) => (
                  <div key={cIdx} className="cert-item-card">
                    <div className="cert-icon-circle">
                      {cIdx % 2 === 0 ? <Award size={20} /> : <ShieldCheck size={20} />}
                    </div>
                    <div className="cert-text">
                      <h4 className="cert-name">{cert.name}</h4>
                      <p className="cert-sub">{cert.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="touchless-faq-section" id="service-faq-section">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">COMMON QUERIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              Key technical, installation, compliance, and maintenance questions answered by our engineering specialists.
            </p>
          </div>

          <div className="touchless-faq-accordion">
            {(pageData.faqs || []).map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div key={fIdx} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* QUICK QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="touchless-quote-modal-overlay" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="touchless-quote-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="quote-modal-header">
              <div>
                <span className="quote-header-badge">ENGINEERING INQUIRY</span>
                <h3 className="quote-modal-title">Request Quotation &amp; Technical Spec</h3>
                <p className="quote-modal-subtitle">Item: <strong>{selectedProductForQuote}</strong></p>
              </div>
              <button
                className="modal-close-icon-btn"
                onClick={() => setIsQuoteModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {quoteSuccess ? (
              <div className="quote-success-view">
                <div className="success-icon-badge">
                  <CheckCircle2 size={48} />
                </div>
                <h4>Quotation Request Received!</h4>
                <p>Thank you, {formData.name}. Our commercial automation engineer will send the customized technical proposal and pricing to <strong>{formData.email}</strong> shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="quote-modal-form">
                <div className="form-two-col">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@pharma.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Cipla Ltd / Tata Steel"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="form-group">
                    <label>Facility Application</label>
                    <select
                      value={formData.application}
                      onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                    >
                      <option value="Industrial Facilities">Industrial Manufacturing Plant</option>
                      <option value="Logistics & Warehouses">Logistics &amp; Cargo Hub</option>
                      <option value="Pharma Cleanrooms">Pharmaceutical Cleanroom</option>
                      <option value="Commercial Buildings">Commercial Tech Park</option>
                      <option value="Defense & High Security">Defense &amp; High Security</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estimated Quantity</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    >
                      <option value="1-3 Units">1-3 Units / Turnkey Opening</option>
                      <option value="4-10 Units">4-10 Units</option>
                      <option value="10+ Units">10+ Units (Enterprise Site)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Message / Site Specifications</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="form-modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsQuoteModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="touchless-btn-primary">
                    <span>Submit Request</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
