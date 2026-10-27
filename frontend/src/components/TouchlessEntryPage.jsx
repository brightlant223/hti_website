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
  User,
  Award,
  DoorClosed,
  Settings,
  Lock,
  Info,
  ChevronDown,
  ChevronUp,
  Radio,
  Cpu
} from 'lucide-react';
import './TouchlessEntryPage.css';

export default function TouchlessEntryPage({
  onNavigate,
  onQuoteSubmit
}) {
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
  const [selectedProductForQuote, setSelectedProductForQuote] = useState('Touchless Entry Solution');

  // Active step in "How It Works"
  const [activeStep, setActiveStep] = useState(0);

  // Active sensor tab
  const [selectedSensorTab, setSelectedSensorTab] = useState(0);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Form data for quote
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    application: 'Offices & Corporate',
    doorType: 'Automatic Sliding Door',
    quantity: '1-3 Doors',
    message: 'Hello HTI Engineering, please share technical datasheet, CAD drawing, and turnkey quotation for Touchless Entry Solutions.'
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Touchless Entry Solutions | HTI Automation & Security Systems';
    setVideoFailed(false);
    userPausedRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

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
  }, [prefersReducedMotion, videoFailed]);

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

  // Open quote modal with prefilled product
  const handleOpenQuote = (productName = 'Touchless Entry Solution') => {
    setSelectedProductForQuote(productName);
    setFormData((prev) => ({
      ...prev,
      doorType: productName,
      message: `Hello HTI Engineering, please provide technical datasheet and competitive quotation for ${productName}.`
    }));
    setIsQuoteModalOpen(true);
    setQuoteSuccess(false);
  };

  // Submit quote request
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          product_name: selectedProductForQuote,
          category: 'Industrial Access Automation',
          message: `Application: ${formData.application} | Qty: ${formData.quantity} | ${formData.message}`
        })
      });
    } catch (err) {
      console.warn('API submission fallback to local:', err);
    }

    setQuoteSuccess(true);
    if (onQuoteSubmit) onQuoteSubmit();
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setQuoteSuccess(false);
    }, 2400);
  };

  const rawVideoSrc = '/automatic_sliding.mp4';
  const posterSrc = '/services/services-touchless-entry.jpg';
  const showHeroVideo = Boolean(rawVideoSrc) && !videoFailed;

  // Step information
  const steps = [
    {
      step: 1,
      title: 'Approach the Door',
      desc: 'Sensor detects your presence',
      detail: 'High-frequency microwave Doppler radar detects movement up to 4 meters away with directional filter.'
    },
    {
      step: 2,
      title: 'Signal to Controller',
      desc: 'Sensor sends signal to control unit',
      detail: '32-bit microprocessor receives activation trigger, validates safety curtain clearance, and signals motor drive.'
    },
    {
      step: 3,
      title: 'Door Opens Automatically',
      desc: 'Door opens without physical contact',
      detail: 'Brushless DC motor accelerates smoothly up to 500 mm/sec with active infrared anti-pinch safety curtain active.'
    },
    {
      step: 4,
      title: 'Auto Close',
      desc: 'After preset time, door closes automatically',
      detail: 'After a programmable 0-60 second hold-open time, leaves gently glide closed with soft deceleration curve.'
    }
  ];

  const sensorTechnologies = [
    {
      id: 'microwave',
      name: 'Microwave Doppler Radar (24.125 GHz)',
      badge: 'Directional Approach Radar',
      icon: Radio,
      range: '1.0 m – 4.5 m (Adjustable)',
      speed: '< 50 ms trigger',
      summary: 'Directional microwave radar detects approaching pedestrians while ignoring cross-traffic, preventing unnecessary door openings and reducing HVAC energy loss.',
      highlights: [
        'Uni-directional detection filters out cross-traffic walking past',
        'Immune to ambient sunlight, steam, fog, and fluctuating lobby shadows',
        'Wide or narrow detection field angle easily tuned via potentiometer or remote'
      ]
    },
    {
      id: 'active-ir',
      name: 'Active Infrared (AIR) Safety Curtains',
      badge: 'EN 16005 Threshold Safety',
      icon: ShieldCheck,
      range: '0 – 2.8 m doorway threshold',
      speed: 'Instantaneous optical hold-open',
      summary: 'Multi-beam infrared safety grid projected directly into the door opening prevents closure whenever pedestrians, wheelchairs, or stretchers are present.',
      highlights: [
        'Compliant with European pedestrian door standard EN 16005 & DIN 18650',
        'Self-monitoring optical arrays test safety circuits before every door close cycle',
        'Provides dense anti-pinch protection across the entire door slide zone'
      ]
    },
    {
      id: 'wave-switch',
      name: 'Contactless Wave-to-Open Switches',
      badge: 'Sterile Touchless Activation',
      icon: Sparkles,
      range: '3 cm – 10 cm near-field',
      speed: 'Microsecond capacitive response',
      summary: 'Ideal for sterile surgical suites, pharma washrooms, and food manufacturing where zero physical surface contact is mandatory.',
      highlights: [
        'Dual-color LED feedback ring (Blue = Standby, Green = Door Activated)',
        'Stainless steel SS304 or antimicrobial polycarbonate faceplate (IP65)',
        'Eliminates germ and pathogen transmission completely from touchpoints'
      ]
    },
    {
      id: 'face-ai',
      name: 'AI Facial Recognition & Contactless RFID',
      badge: 'High-Security Access Control',
      icon: Cpu,
      range: '0.3 m – 2.0 m distance',
      speed: '0.2s ultra-fast verification',
      summary: 'High-throughput access validation paired with automatic sliding/swing doors or speed gates for enterprise campuses, corporate towers, and data centers.',
      highlights: [
        'Deep learning dual-lens camera with live anti-spoofing (detects printed photos & screens)',
        'Mask detection and optional contactless body temperature screening',
        'Direct TCP/IP & Wiegand integration with building BMS and attendance software'
      ]
    }
  ];

  const faqs = [
    {
      q: 'What happens to the automatic doors during a power failure?',
      a: 'HTI automatic doors feature integrated battery backup (UPS) systems that provide 200+ continuous open/close cycles during mains power loss. Additionally, they comply with fail-safe standards—automatically sliding open or allowing mechanical breakout pressure (<30 N) for rapid emergency egress.'
    },
    {
      q: 'Can touchless sensors and automatic operators be retrofitted to existing manual doors?',
      a: 'Yes. Both our automatic sliding header track units and surface-mounted swing door operators can be retrofitted onto existing glass, wooden, aluminium, or stainless steel doors without replacing the structural door frames.'
    },
    {
      q: 'What is the difference between Microwave Doppler Radar and Active Infrared (AIR) safety sensors?',
      a: 'Microwave radar operates at 24.125 GHz for long-range directional movement detection (detecting approaching pedestrians while ignoring cross-traffic). Active Infrared (AIR) creates a dense safety curtain directly in the threshold path to prevent closing while people or objects are in the doorway (EN 16005 compliance).'
    },
    {
      q: 'How does the Door Interlock System maintain cleanroom pressure cascades?',
      a: 'In ISO 14644 and USFDA pharmaceutical cleanrooms, the microcontroller interlock prevents multiple doors in an airlock from opening simultaneously. Audio-visual LED traffic indicators inform operators when the airlock is safe to enter, maintaining positive/negative differential pressure cascades.'
    },
    {
      q: 'What maintenance is required and what is the typical design lifespan?',
      a: 'Designed for high-frequency corporate and hospital traffic, HTI brushless DC drive mechanisms are tested for over 2,000,000 continuous cycles. HTI provides scheduled quarterly preventive maintenance (AMC) and 24/7 service support across all major Indian cities.'
    }
  ];

  return (
    <div className="touchless-page-root">
      {/* 1. TOP HERO SECTION (MATCHING REFERENCE DESIGN EXACTLY) */}
      <section className="touchless-hero-section">
        {/* Futuristic Mesh Background & Lighting */}
        <div className="touchless-hero-ambient-glow"></div>
        <div className="touchless-hero-mesh-grid"></div>

        <div className="touchless-container">
          {/* Breadcrumbs */}
          <nav className="touchless-breadcrumbs" aria-label="Breadcrumb">
            <span 
              className="breadcrumb-link" 
              onClick={() => onNavigate && onNavigate('home')}
            >
              Home
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span 
              className="breadcrumb-link" 
              onClick={() => onNavigate && onNavigate('automation')}
            >
              Services
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span 
              className="breadcrumb-link"
              onClick={() => onNavigate && onNavigate('automation')}
            >
              Industrial Access Automation
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">Touchless Entry Solution</span>
          </nav>

          <div className="touchless-hero-layout">
            {/* Left Column: Heading, Badge, Description, CTA Buttons */}
            <div className="touchless-hero-left">
              <div className="touchless-badge-pill">
                <span className="badge-dot"></span>
                <span>AUTOMATION | SECURITY | HYGIENE</span>
              </div>

              <h1 className="touchless-hero-title">
                Touchless Entry<br />
                <span className="touchless-title-accent">Solution</span>
              </h1>

              <div className="touchless-hero-tagline">
                Safe. Hygienic. Smart. Automated.
              </div>

              <p className="touchless-hero-desc">
                Experience a cleaner, safer and smarter way to enter. Our Touchless Entry Solutions enable automatic door operation without physical contact, helping to maintain hygiene, prevent germ transmission and improve access convenience.
              </p>

              <div className="touchless-hero-metrics-pills">
                <div className="metric-pill">
                  <Zap size={13} className="pill-icon" />
                  <span>0.2s Detection</span>
                </div>
                <div className="metric-pill">
                  <ShieldCheck size={13} className="pill-icon" />
                  <span>EN 16005 Safety</span>
                </div>
                <div className="metric-pill">
                  <Award size={13} className="pill-icon" />
                  <span>2M+ Tested Cycles</span>
                </div>
                <div className="metric-pill">
                  <Sparkles size={13} className="pill-icon" />
                  <span>100% Touchless</span>
                </div>
              </div>

              <div className="touchless-hero-actions">
                <button
                  className="touchless-btn-primary"
                  onClick={() => handleOpenQuote('Touchless Entry Solution')}
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
                          console.warn('Hero video load failed, falling back to static hero image.');
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
                      src="/services/services-touchless-entry.jpg"
                      alt="Touchless Entry Showcase"
                      className="touchless-hero-door-img"
                    />
                  )}
                  <div className="door-reflection-overlay"></div>

                  <div className="door-interactive-badge">
                    <span className="door-pulse-live"></span>
                    <span>Radar Sensor Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Key Benefits Cards */}
            <div className="touchless-hero-right">
              <div className="touchless-benefits-stack">
                <div className="benefit-card">
                  <div className="benefit-icon-box">
                    <Shield size={20} />
                  </div>
                  <div className="benefit-text">
                    <h3 className="benefit-title">Touchless &amp; Hygienic</h3>
                    <p className="benefit-desc">No physical contact</p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon-box">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="benefit-text">
                    <h3 className="benefit-title">Enhanced Safety</h3>
                    <p className="benefit-desc">Ideal for hospitals, clean rooms &amp; corporate spaces</p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon-box">
                    <User size={20} />
                  </div>
                  <div className="benefit-text">
                    <h3 className="benefit-title">Better Accessibility</h3>
                    <p className="benefit-desc">Easy access for all users</p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon-box">
                    <Zap size={20} />
                  </div>
                  <div className="benefit-text">
                    <h3 className="benefit-title">Energy Efficient</h3>
                    <p className="benefit-desc">Operates only when needed</p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="benefit-icon-box">
                    <Sparkles size={20} />
                  </div>
                  <div className="benefit-text">
                    <h3 className="benefit-title">Modern Design</h3>
                    <p className="benefit-desc">Stylish &amp; professional look</p>
                  </div>
                </div>
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

      {/* 3B. ADVANCED SENSOR & DETECTION TECHNOLOGIES (NEW TECHNICAL DEEP DIVE) */}
      <section className="touchless-sensors-deepdive-section" id="service-details-section">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">RADAR &amp; OPTICAL PRECISION</span>
            <h2 className="section-title">Advanced Sensor &amp; Detection Technologies</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              High-frequency Doppler microwave arrays, active infrared anti-pinch curtains, and contactless biometrics engineered for 100% zero-touch reliability and pedestrian safety.
            </p>
          </div>

          <div className="sensor-tabs-nav">
            {sensorTechnologies.map((st, idx) => {
              const TabIcon = st.icon;
              return (
                <button
                  key={st.id}
                  className={`sensor-tab-btn ${selectedSensorTab === idx ? 'tab-active' : ''}`}
                  onClick={() => setSelectedSensorTab(idx)}
                >
                  <TabIcon size={16} />
                  <span>{st.id === 'microwave' ? 'Microwave Radar' : st.id === 'active-ir' ? 'Active IR Curtain' : st.id === 'wave-switch' ? 'Wave Switches' : 'AI Face Biometrics'}</span>
                </button>
              );
            })}
          </div>

          <div className="sensor-tab-content-card">
            <div className="sensor-content-left">
              <span className="sensor-tech-badge">{sensorTechnologies[selectedSensorTab].badge}</span>
              <h3 className="sensor-tech-name">{sensorTechnologies[selectedSensorTab].name}</h3>
              <p className="sensor-tech-summary">{sensorTechnologies[selectedSensorTab].summary}</p>
              
              <div className="sensor-highlights-list">
                {sensorTechnologies[selectedSensorTab].highlights.map((hl, hIdx) => (
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
                  <span className="spec-metric-label">Detection Zone:</span>
                  <span className="spec-metric-val">{sensorTechnologies[selectedSensorTab].range}</span>
                </div>
                <div className="spec-metric-row">
                  <span className="spec-metric-label">Trigger Latency:</span>
                  <span className="spec-metric-val">{sensorTechnologies[selectedSensorTab].speed}</span>
                </div>
                <div className="spec-metric-row">
                  <span className="spec-metric-label">Regulatory Standard:</span>
                  <span className="spec-metric-val">EN 16005 &amp; CE Certified</span>
                </div>
                <div className="spec-metric-row">
                  <span className="spec-metric-label">Protection Rating:</span>
                  <span className="spec-metric-val">IP54 / IP65 Waterproof</span>
                </div>
              </div>

              <button
                className="sensor-inquire-btn"
                onClick={() => handleOpenQuote(sensorTechnologies[selectedSensorTab].name)}
              >
                <span>Request Sensor Technical Spec</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS & IDEAL FOR MULTIPLE APPLICATIONS */}
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
            {/* Left: How It Works ? */}
            <div className="workflow-block">
              <div className="section-subheading-wrap">
                <h2 className="section-title">How It Works ?</h2>
                <div className="section-title-underline"></div>
              </div>

              <div className="workflow-steps-horizontal">
                {steps.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className={`workflow-step-card ${activeStep === sIdx ? 'is-active-step' : ''}`}
                    onClick={() => setActiveStep(sIdx)}
                  >
                    <div className="step-num-badge">{st.step}</div>
                    
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
                    <p className="step-desc">{st.desc}</p>

                    {sIdx < steps.length - 1 && (
                      <div className="step-arrow-connector" aria-hidden="true">
                        <ArrowRight size={18} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step Detail Explanation Box */}
              <div className="step-active-callout">
                <div className="callout-indicator">
                  <Info size={18} />
                  <strong>Step {steps[activeStep].step} Engineering Insight:</strong>
                </div>
                <p>{steps[activeStep].detail}</p>
              </div>
            </div>

            {/* Right: Ideal For Multiple Applications */}
            <div className="applications-block">
              <div className="section-subheading-wrap">
                <h2 className="section-title">Ideal For Multiple Applications</h2>
                <div className="section-title-underline"></div>
              </div>

              <div className="application-tiles-grid">
                <div className="app-tile">
                  <div className="app-tile-media">
                    <img src="/products/automatic-doors-hospital.jpg" alt="Hospitals" className="app-tile-img" />
                  </div>
                  <div className="app-tile-label">Hospitals</div>
                </div>

                <div className="app-tile">
                  <div className="app-tile-media">
                    <img src="/hero-cleanroom-automation.jpg" alt="Pharma & Clean Rooms" className="app-tile-img" />
                  </div>
                  <div className="app-tile-label">Pharma &amp; Clean Rooms</div>
                </div>

                <div className="app-tile">
                  <div className="app-tile-media">
                    <img src="/hero-glass-atrium.jpg" alt="Offices & Corporate" className="app-tile-img" />
                  </div>
                  <div className="app-tile-label">Offices &amp; Corporate</div>
                </div>

                <div className="app-tile">
                  <div className="app-tile-media">
                    <img src="/case-studies/case-air-curtain.jpg" alt="Hotels & Retail" className="app-tile-img" />
                  </div>
                  <div className="app-tile-label">Hotels &amp; Retail</div>
                </div>

                <div className="app-tile">
                  <div className="app-tile-media">
                    <img src="/hero-industrial-doors-dock.jpg" alt="Industrial Facilities" className="app-tile-img" />
                  </div>
                  <div className="app-tile-label">Industrial Facilities</div>
                </div>

                <div className="app-tile">
                  <div className="app-tile-media">
                    <img src="/head-office-building.jpg" alt="Commercial Buildings" className="app-tile-img" />
                  </div>
                  <div className="app-tile-label">Commercial Buildings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL SPECIFICATIONS & STANDARDS */}
      <section className="touchless-specs-section" id="service-specs-section">
        <div className="touchless-container">
          <div className="specs-cert-grid">
            {/* Left: Technical Specifications (Typical) */}
            <div className="specs-table-wrapper">
              <h2 className="section-title">Technical Specifications (Typical)</h2>
              <div className="specs-table-container">
                <table className="tech-specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Door Configuration</td>
                      <td className="spec-value">Single Slide, Bi-Parting Slide or Swing (Single/Double)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Door Leaf Weight Capacity</td>
                      <td className="spec-value">Up to 150 kg (depending on configuration)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Opening / Closing Speed</td>
                      <td className="spec-value">100 – 500 mm/sec (adjustable)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Power Supply</td>
                      <td className="spec-value">230V AC, 50Hz, 1Φ</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Hold-Open Duration</td>
                      <td className="spec-value">0 – 60 seconds (adjustable)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Activation &amp; Safety Sensors</td>
                      <td className="spec-value">Microwave, Infrared, Safety Beam Sensors</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Operating Temperature</td>
                      <td className="spec-value">-15°C to +50°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            {/* Right: Standards & Statutory Certifications */}
            <div className="certs-wrapper">
              <h2 className="section-title">Standards &amp; Statutory Certifications</h2>
              
              <div className="certs-list">
                <div className="cert-item-card">
                  <div className="cert-icon-circle">
                    <Award size={20} />
                  </div>
                  <div className="cert-text">
                    <h4 className="cert-name">EN 16005 – Pedestrian Door Safety</h4>
                    <p className="cert-sub">Stringent safety requirements for power-operated pedestrian doors</p>
                  </div>
                </div>

                <div className="cert-item-card">
                  <div className="cert-icon-circle">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="cert-text">
                    <h4 className="cert-name">CE Conformity – Machinery Directive</h4>
                    <p className="cert-sub">Certified compliance with EU health and electrical safety directives</p>
                  </div>
                </div>

                <div className="cert-item-card">
                  <div className="cert-icon-circle">
                    <Award size={20} />
                  </div>
                  <div className="cert-text">
                    <h4 className="cert-name">ISO 9001:2015 – Quality Management</h4>
                    <p className="cert-sub">Standardized engineering, testing, and lifecycle maintenance</p>
                  </div>
                </div>

                <div className="cert-item-card">
                  <div className="cert-icon-circle">
                    <Shield size={20} />
                  </div>
                  <div className="cert-text">
                    <h4 className="cert-name">Fire Safety Compliance (as applicable)</h4>
                    <p className="cert-sub">Automated fail-safe integration with building fire alarm panels</p>
                  </div>
                </div>

                <div className="cert-item-card">
                  <div className="cert-icon-circle">
                    <Zap size={20} />
                  </div>
                  <div className="cert-text">
                    <h4 className="cert-name">RoHS – Environmental Compliance</h4>
                    <p className="cert-sub">Eco-friendly components, low idle power, and lead-free microcontrollers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="touchless-faq-section" id="service-faq-section">
        <div className="touchless-container">
          <div className="section-header-centered">
            <span className="section-eyebrow">COMMON QUERIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="section-title-underline center-underline"></div>
            <p className="section-subtitle-desc">
              Key engineering, installation, compliance, and safety questions answered by our automated entrance systems team.
            </p>
          </div>

          <div className="touchless-faq-accordion">
            {faqs.map((faq, fIdx) => {
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
                      placeholder="e.g. Cipla Ltd / Sun Pharma"
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
                      <option value="Offices & Corporate">Offices &amp; Corporate</option>
                      <option value="Hospitals & Healthcare">Hospitals &amp; Healthcare</option>
                      <option value="Pharma Cleanrooms">Pharma Cleanrooms</option>
                      <option value="Hotels & Retail">Hotels &amp; Retail</option>
                      <option value="Industrial Facilities">Industrial Facilities</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estimated Quantity</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    >
                      <option value="1-3 Doors">1-3 Doors / Turnkey Site</option>
                      <option value="4-10 Doors">4-10 Doors</option>
                      <option value="10+ Doors">10+ Doors (Enterprise Campus)</option>
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
