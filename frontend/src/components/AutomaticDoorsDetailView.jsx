import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Settings, 
  Send, 
  Play, 
  Pause, 
  Check, 
  FileText, 
  Radio, 
  Leaf,
  Award,
  Image as ImageIcon,
  ChevronLeft, 
  ChevronRight, 
  X,
  CheckCircle2,
  Zap,
  Layers,
  Lock,
  Cpu,
  RotateCcw,
  Activity,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import '../AutomaticDoorsDetail.css';
import { ACCESS_AUTOMATION_CONFIGS } from '../data/accessAutomationDetailData';
import PassBoxDemo from './PassBoxDemo';
import DigitalClockDemo from './DigitalClockDemo';
import ChillerCleanroomDoorDemo from './ChillerCleanroomDoorDemo';

// Helper to render dynamic icons cleanly
const renderDynamicIcon = (name, className = 'text-sky-600', size = 22) => {
  switch (name) {
    case 'Zap':
      return <Zap size={size} className={className} />;
    case 'Radio':
      return <Radio size={size} className={className} />;
    case 'Layers':
      return <Layers size={size} className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck size={size} className={className} />;
    case 'Settings':
      return <Settings size={size} className={className} />;
    case 'Leaf':
      return <Leaf size={size} className={className} />;
    case 'Wrench':
      return <Wrench size={size} className={className} />;
    case 'Award':
      return <Award size={size} className={className} />;
    case 'FileText':
      return <FileText size={size} className={className} />;
    case 'Lock':
      return <Lock size={size} className={className} />;
    case 'Cpu':
      return <Cpu size={size} className={className} />;
    case 'Activity':
      return <Activity size={size} className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 size={size} className={className} />;
    default:
      return <Settings size={size} className={className} />;
  }
};

// ── Interactive Cleanroom Door Interlock Demonstration ──
function CleanroomInterlockDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [warningMsg, setWarningMsg] = useState(null);

  const INTERLOCK_STEPS = [
    {
      stepNum: 1,
      shortTitle: '01 Request',
      label: 'Stage 1: Access Request via Sensor',
      detail: 'A user requests entry at Door 1 (Corridor Side) using a touchless wave sensor or push button.',
      controllerText: 'ACCESS REQUEST: Pulse detected at Door 1. Central PLC evaluates interlock conditions...',
      door1: { state: 'requesting', statusText: 'Requesting Access', isLocked: false, isAjar: false, emLock: 'Ready to Release' },
      door2: { state: 'locked', statusText: 'Interlocked & Locked', isLocked: true, isAjar: false, emLock: '600 lbs EM-Lock Active' },
      pressure: '+10 Pa (Normal Baseline)',
      activePill: 'ACCESS REQUEST RECEIVED'
    },
    {
      stepNum: 2,
      shortTitle: '02 Check',
      label: 'Stage 2: Controller Checks Interlock Conditions',
      detail: 'The controller verifies Door 2 magnetic reed contacts are closed, airlock is clear, and emergency fire trip is normal.',
      controllerText: 'CONDITION CHECK: Door 2 verified CLOSED & LOCKED. Mutual exclusion safety condition satisfied.',
      door1: { state: 'verifying', statusText: 'Verification Passed', isLocked: false, isAjar: false, emLock: 'Release Permitted' },
      door2: { state: 'locked', statusText: 'Held Locked (Interlocked)', isLocked: true, isAjar: false, emLock: '600 lbs EM-Lock Active' },
      pressure: '+10 Pa (Stable)',
      activePill: 'SAFETY INTERLOCK VERIFIED'
    },
    {
      stepNum: 3,
      shortTitle: '03 Door 1 Open',
      label: 'Stage 3: Door 1 Opens while Door 2 Remains Interlocked',
      detail: 'Door 1 electromagnetic lock releases and opens. Door 2 EM-lock is held energized to prevent simultaneous access.',
      controllerText: 'DOOR 1 OPEN: Door 1 unlocked. Door 2 EM-Lock powered ON (600 lbs hold) to prevent cross-draft.',
      door1: { state: 'open', statusText: 'Unlocked & Open', isLocked: false, isAjar: true, emLock: 'EM-Lock Released' },
      door2: { state: 'locked', statusText: 'Held Locked (Interlocked)', isLocked: true, isAjar: false, emLock: '600 lbs EM-Lock Active' },
      pressure: '+13 Pa (Airlock Pressurized)',
      activePill: 'DOOR 1 OPEN · DOOR 2 INTERLOCKED'
    },
    {
      stepNum: 4,
      shortTitle: '04 Door 1 Close',
      label: 'Stage 4: Door 1 Closes & Controller Evaluates Status',
      detail: 'Door 1 closes via hydraulic closer. Controller verifies magnetic contacts and runs delay timer for pressure retention.',
      controllerText: 'STATUS CHECK: Door 1 closed & sealed. Running pressure stabilization delay timer (3s)...',
      door1: { state: 'closed', statusText: 'Closed & Locked', isLocked: true, isAjar: false, emLock: 'EM-Lock Re-Energized' },
      door2: { state: 'standby', statusText: 'Awaiting Purge Timer', isLocked: true, isAjar: false, emLock: 'EM-Lock Energized' },
      pressure: '+15 Pa (Differential Peak)',
      activePill: 'PRESSURE STABILIZATION CHECK'
    },
    {
      stepNum: 5,
      shortTitle: '05 Door 2 Open',
      label: 'Stage 5: Door 2 Permitted to Open into Cleanroom',
      detail: 'Configured delay satisfied. Door 2 EM-lock releases; personnel enters cleanroom while Door 1 remains locked.',
      controllerText: 'ACCESS PERMITTED: Door 2 unlocked. Door 1 firmly locked. Controlled entry into cleanroom permitted.',
      door1: { state: 'locked', statusText: 'Interlocked & Locked', isLocked: true, isAjar: false, emLock: '600 lbs EM-Lock Active' },
      door2: { state: 'open', statusText: 'Unlocked & Open', isLocked: false, isAjar: true, emLock: 'EM-Lock Released' },
      pressure: '+15 Pa (ISO Iso Level)',
      activePill: 'CLEANROOM ENTRY PERMITTED'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev >= 5 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeStage = INTERLOCK_STEPS[currentStep - 1];

  const handleTestDoorClick = (doorNum) => {
    if (doorNum === 2 && currentStep === 3) {
      setWarningMsg('INTERLOCK ACTIVE: Door 2 is locked because Door 1 is currently open!');
      setTimeout(() => setWarningMsg(null), 2500);
      return;
    }
    if (doorNum === 1) {
      setCurrentStep(1);
    } else {
      setCurrentStep(5);
    }
  };

  const handleReplay = () => {
    setCurrentStep(1);
    setIsPlaying(true);
  };

  return (
    <div className="cleanroom-demo-panel">
      {/* Top Header Bar */}
      <div className="demo-top-bar">
        <div className="demo-badge-wrap">
          <span className="demo-live-dot" />
          <span className="demo-pill-tag">ILLUSTRATIVE PRODUCT DEMONSTRATION</span>
        </div>
        <div className="demo-controls-btns">
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={() => setIsPlaying(p => !p)}
            aria-label={isPlaying ? 'Pause interlock demonstration' : 'Play interlock demonstration'}
          >
            {isPlaying ? (
              <>
                <Pause size={12} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={12} />
                <span>Play</span>
              </>
            )}
          </button>
          <button
            type="button"
            className="demo-ctrl-btn"
            onClick={handleReplay}
            aria-label="Replay interlock demonstration sequence"
          >
            <RotateCcw size={12} />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* Warning Alert if User Tests Blocked Condition */}
      {warningMsg && (
        <div className="demo-warning-banner" role="alert">
          <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
          <span>{warningMsg}</span>
        </div>
      )}

      {/* Two-Door Airlock Graphic Stage */}
      <div className="demo-airlock-stage">
        
        {/* Door 1 (Corridor Entry) */}
        <div className={`demo-door-box ${activeStage.door1.isAjar ? 'is-open' : 'is-locked'}`}>
          <div className="demo-door-header">
            <span className="demo-door-label">DOOR 1 · ENTRY</span>
            <span 
              className={`demo-door-led ${activeStage.door1.isAjar ? 'led-green' : 'led-red'}`} 
              title={activeStage.door1.isAjar ? 'Door 1 Unlocked (Green LED)' : 'Door 1 Locked (Red LED)'}
            />
          </div>

          <div className="demo-door-graphic">
            <div className={`demo-door-leaf ${activeStage.door1.isAjar ? 'open' : ''}`} />
          </div>

          <span className={`demo-door-status-text ${activeStage.door1.isAjar ? 'text-green' : 'text-red'}`}>
            {activeStage.door1.statusText}
          </span>
          <span className="demo-door-em-lock">{activeStage.door1.emLock}</span>

          <button
            type="button"
            className="demo-door-trigger-btn"
            onClick={() => handleTestDoorClick(1)}
            title="Click to simulate touchless sensor trigger on Door 1"
          >
            Trigger Door 1
          </button>
        </div>

        {/* Central Controller & Airlock Chamber */}
        <div className="demo-chamber-box">
          <div className="demo-chamber-top">
            <span className="demo-chamber-badge">AIRLOCK ZONE</span>
            <div className="demo-pressure-badge">
              <Activity size={12} />
              <span>{activeStage.pressure}</span>
            </div>
          </div>

          <div className="demo-controller-screen">
            <p className="demo-controller-text">{activeStage.controllerText}</p>
          </div>

          <div className="demo-sequence-pill">
            <span>{activeStage.activePill}</span>
          </div>
        </div>

        {/* Door 2 (Cleanroom Suite) */}
        <div className={`demo-door-box ${activeStage.door2.isAjar ? 'is-open' : 'is-locked'}`}>
          <div className="demo-door-header">
            <span className="demo-door-label">DOOR 2 · CLEANROOM</span>
            <span 
              className={`demo-door-led ${activeStage.door2.isAjar ? 'led-green' : 'led-red'}`} 
              title={activeStage.door2.isAjar ? 'Door 2 Unlocked (Green LED)' : 'Door 2 Locked (Red LED)'}
            />
          </div>

          <div className="demo-door-graphic">
            <div className={`demo-door-leaf ${activeStage.door2.isAjar ? 'open' : ''}`} />
          </div>

          <span className={`demo-door-status-text ${activeStage.door2.isAjar ? 'text-green' : 'text-red'}`}>
            {activeStage.door2.statusText}
          </span>
          <span className="demo-door-em-lock">{activeStage.door2.emLock}</span>

          <button
            type="button"
            className="demo-door-trigger-btn"
            onClick={() => handleTestDoorClick(2)}
            title="Click to simulate sensor trigger on Door 2"
          >
            Trigger Door 2
          </button>
        </div>

      </div>

      {/* Step Description Row */}
      <div className="demo-stage-desc-row">
        <span className="demo-stage-title">{activeStage.label}</span>
        <p className="demo-stage-detail">{activeStage.detail}</p>
      </div>

      {/* 5-Step Timeline Navigation Rail */}
      <div className="demo-steps-rail" role="tablist" aria-label="Interlock Sequence Steps">
        {INTERLOCK_STEPS.map(s => (
          <button
            key={s.stepNum}
            type="button"
            role="tab"
            aria-selected={currentStep === s.stepNum}
            className={`demo-step-pill-btn ${currentStep === s.stepNum ? 'active' : ''}`}
            onClick={() => {
              setCurrentStep(s.stepNum);
              setIsPlaying(false);
            }}
          >
            {s.shortTitle}
          </button>
        ))}
      </div>

      {/* Technical Disclaimer Note */}
      <p className="demo-disclaimer-note">
        Illustrative sequence demonstration. System controllers support 2 to 12 doors with configurable sequential or priority logic, AHU delay timers, and emergency fire-trip release per cleanroom specification.
      </p>
    </div>
  );
}


export default function AutomaticDoorsDetailView({ 
  product, 
  onNavigate, 
  onQuoteSubmit 
}) {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Match configuration for current product, fallback to automatic-sliding-swing-doors
  const cfg = ACCESS_AUTOMATION_CONFIGS[product?.slug] || ACCESS_AUTOMATION_CONFIGS[product?.id] || ACCESS_AUTOMATION_CONFIGS['automatic-sliding-swing-doors'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '1 Turnkey Site',
    message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${cfg.name}.`
  });

  // Carousel index for Related Images
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Sync state when product slug changes
  useEffect(() => {
    setIsVideoPlaying(false);
    setCarouselIndex(0);
    setModalSubmitted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setFormData(prev => ({
      ...prev,
      message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${cfg.name}.`
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.slug, cfg.name]);

  const relatedImagesList = cfg.relatedImages.images;

  const handleVideoPlayToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your Name, Email, and Phone number.');
      return;
    }

    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not specified',
        category: product?.category || 'Automation',
        product_name: cfg.name,
        message: `${formData.message} [Qty: ${formData.quantity}]`
      })
    }).catch(() => {
      // Offline fallback
    });

    setModalSubmitted(true);
    if (onQuoteSubmit) onQuoteSubmit();
    setTimeout(() => {
      setModalSubmitted(false);
      setIsQuoteModalOpen(false);
    }, 2400);
  };

  const handlePrevRelated = () => {
    setCarouselIndex(prev => (prev === 0 ? relatedImagesList.length - 1 : prev - 1));
  };

  const handleNextRelated = () => {
    setCarouselIndex(prev => (prev === relatedImagesList.length - 1 ? 0 : prev + 1));
  };

  // Rotate images based on carouselIndex for the 3 slots
  const displayedRelatedImages = [
    relatedImagesList[carouselIndex % relatedImagesList.length],
    relatedImagesList[(carouselIndex + 1) % relatedImagesList.length],
    relatedImagesList[(carouselIndex + 2) % relatedImagesList.length]
  ];

  return (
    <div className="auto-doors-page-container">
      
      {/* 1. Header & Navigation Breadcrumbs */}
      <nav className="auto-doors-breadcrumb" aria-label="Breadcrumb">
        <button 
          className="auto-breadcrumb-btn"
          onClick={() => onNavigate && onNavigate('home')}
        >
          Home
        </button>
        <span className="auto-breadcrumb-sep">&gt;</span>
        <button 
          className="auto-breadcrumb-btn"
          onClick={() => onNavigate && onNavigate(cfg.categoryRoute || cfg.categoryPage || 'automation')}
        >
          {cfg.categoryName || 'Automation'}
        </button>
        <span className="auto-breadcrumb-sep">&gt;</span>
        <span className="auto-breadcrumb-curr">{cfg.breadcrumbName}</span>
      </nav>

      {/* 2. Hero Section: Left Content & Right High-Res Image */}
      <section className="auto-doors-hero-section">
        <div className="auto-doors-hero-grid">
          
          {/* Left Column: Badges, Heading, Description, Buttons, Trust Indicators */}
          <div className="auto-doors-hero-left">
            <div className="auto-badge-row">
              {cfg.badges.map((b, idx) => (
                <span key={idx} className={`auto-badge-${b.type}`}>
                  {b.text}
                </span>
              ))}
            </div>

            <h1 className="auto-doors-hero-title">{cfg.heading}</h1>

            <p className="auto-doors-hero-desc">
              {cfg.heroDescription}
            </p>

            <div className="auto-btn-row">
              <button 
                className="auto-btn-primary"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <Send size={16} />
                <span>Request Instant Quotation</span>
              </button>
            </div>

            <div className="auto-trust-row">
              {cfg.trustIndicators.map((item, idx) => (
                <div key={idx} className="auto-trust-item">
                  {renderDynamicIcon(item.icon, "text-sky-600", 18)}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Showcase Image with Carousel Indicator */}
          <div className="auto-doors-hero-right">
            <img 
              src={cfg.heroImage} 
              alt={`${cfg.name} Showcase`} 
              className="auto-hero-main-img"
              loading="eager"
            />
            <div className="auto-hero-dots">
              <span className="auto-hero-dot active"></span>
              <span className="auto-hero-dot"></span>
              <span className="auto-hero-dot"></span>
              <span className="auto-hero-dot"></span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Product Demonstration / Video Section */}
      <section className="auto-wide-card">
        <div className="auto-doors-video-grid">
          
          {/* Left Column: Interactive Demonstration (Cleanroom Pass Box OR Door Interlock) OR Video Player */}
          {cfg.video.isInteractiveDemo ? (
            cfg.video.demoType === 'pass-box' ? (
              <PassBoxDemo />
            ) : cfg.video.demoType === 'digital-clock' ? (
              <DigitalClockDemo />
            ) : cfg.video.demoType === 'chiller-cleanroom-door' ? (
              <ChillerCleanroomDoorDemo />
            ) : (
              <CleanroomInterlockDemo />
            )
          ) : (
            <div className="auto-video-wrapper">
              {cfg.video.hasVideoFile ? (
                <>
                  <video 
                    ref={videoRef}
                    src={cfg.video.videoSrc} 
                    poster={cfg.video.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="auto-html5-video"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                  {!isVideoPlaying && (
                    <>
                      <button 
                        className="auto-video-play-overlay"
                        onClick={handleVideoPlayToggle}
                        aria-label={`Play ${cfg.name} Video`}
                      >
                        <div className="auto-play-circle">
                          <Play size={28} className="fill-white text-white ml-1" />
                        </div>
                      </button>
                      <div className="auto-video-fallback-pill" style={{ pointerEvents: 'none' }}>
                        HD Product Showcase
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <img 
                    src={cfg.video.poster} 
                    alt={`${cfg.name} Video Preview`}
                    className="auto-html5-video" 
                  />
                  <div className="auto-video-play-overlay" style={{ cursor: 'default' }}>
                    <div className="auto-play-circle" style={{ opacity: 0.9 }}>
                      <Play size={28} className="fill-white text-white ml-1" />
                    </div>
                  </div>
                  <div className="auto-video-fallback-pill">
                    HD Product Showcase
                  </div>
                </>
              )}
            </div>
          )}

          {/* Right Column: Video Details & Features */}
          <div className="auto-doors-video-content">
            <span className="auto-badge-soft-pink">{cfg.video.badge}</span>
            
            <h2 className="auto-card-heading">
              {cfg.video.heading}
            </h2>

            <p className="auto-card-desc">
              {cfg.video.description}
            </p>

            <div className="auto-video-bullets-list">
              {cfg.video.bullets.map((bullet, idx) => (
                <div key={idx} className="auto-video-bullet-item">
                  <div className="auto-check-circle">
                    <Check size={13} className="text-white" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Engineering & Technical Overview Section */}
      <section className="auto-wide-card">
        <div className="auto-doors-engineering-grid">
          
          {/* Left Column: Heading & Description */}
          <div className="auto-engineering-col-left">
            <div className="auto-heading-with-icon">
              <FileText size={26} className="text-sky-600" />
              <h3>{cfg.engineering.heading}</h3>
            </div>
            
            <p className="auto-card-desc leading-relaxed">
              {cfg.engineering.description}
            </p>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="auto-feature-cards-grid">
            {cfg.engineering.cards.map((c, idx) => (
              <div key={idx} className="auto-feature-box">
                <div className={`auto-feature-icon-circle ${c.circleClass}`}>
                  {renderDynamicIcon(c.iconName, c.iconClass, 22)}
                </div>
                <div className="auto-feature-content">
                  <h5>{c.title}</h5>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Technical Specifications & Standards Section */}
      <section className="auto-wide-card">
        <div className="auto-doors-specs-grid">
          
          {/* Left Column: Specifications Table */}
          <div className="auto-specs-col-left">
            <div className="auto-heading-with-icon">
              <Settings size={26} className="text-sky-600" />
              <h3>{cfg.specs.heading}</h3>
            </div>

            <p className="auto-card-desc">
              {cfg.specs.description}
            </p>

            <div className="auto-specs-table-container">
              <table className="auto-specs-table">
                <tbody>
                  {cfg.specs.tableRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "even-row" : ""}>
                      <td className="auto-spec-label">{row.label}</td>
                      <td className="auto-spec-value">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Standards & Compliance Card */}
          <div className="auto-specs-col-right">
            <div className="auto-compliance-card">
              <div className="auto-heading-with-icon">
                <Award size={24} className="text-sky-600" />
                <h4>{cfg.specs.complianceTitle}</h4>
              </div>

              <div className="auto-compliance-list">
                {cfg.specs.complianceItems.map((item, idx) => (
                  <div key={idx} className="auto-compliance-item">
                    <div className="auto-check-circle">
                      <Check size={13} className="text-white" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Related Images Section */}
      <section className="auto-doors-related-section">
        <div className="auto-related-header">
          <div className="auto-related-header-text">
            <div className="auto-heading-with-icon">
              <ImageIcon size={24} className="text-sky-600" />
              <h3>{cfg.relatedImages.heading}</h3>
            </div>
            <p className="auto-card-desc mb-0">
              {cfg.relatedImages.description}
            </p>
          </div>

          <div className="auto-arrow-btns-group">
            <button 
              className="auto-arrow-btn" 
              onClick={handlePrevRelated}
              aria-label="Previous Related Images"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              className="auto-arrow-btn" 
              onClick={handleNextRelated}
              aria-label="Next Related Images"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="auto-related-grid">
          {displayedRelatedImages.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="auto-related-card">
              <div className="auto-related-media">
                <img 
                  src={item.src} 
                  alt={item.caption} 
                  loading="lazy"
                />
              </div>
              <div className="auto-related-caption">{item.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Instant Quotation Modal */}
      {isQuoteModalOpen && (
        <div className="auto-modal-backdrop" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="auto-modal-box" onClick={(e) => e.stopPropagation()}>
            <button 
              className="auto-modal-close-btn"
              onClick={() => setIsQuoteModalOpen(false)}
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>

            {modalSubmitted ? (
              <div className="auto-modal-success">
                <CheckCircle2 size={54} className="text-emerald-500 mx-auto" />
                <h4>Quotation Request Received!</h4>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our industrial automation engineering team will email the technical data dossier and custom project BOQ for <strong>{cfg.name}</strong> promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit}>
                <h3 className="auto-modal-title">Request Instant Quotation</h3>
                <div className="auto-modal-subtitle">{cfg.name}</div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Official Work Email *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    placeholder="name@company.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Phone / WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    placeholder="+91 98200 00000" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Company &amp; Project Site Location</label>
                  <input 
                    type="text" 
                    name="company" 
                    placeholder="e.g., Godrej One, Mumbai / Navi Mumbai" 
                    value={formData.company}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  />
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Estimated Quantity</label>
                  <select 
                    name="quantity" 
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="auto-form-input"
                  >
                    <option value="1 Turnkey Site">1 Unit / Turnkey Site</option>
                    <option value="2-5 Units">2 - 5 Units</option>
                    <option value="6-20 Units (Industrial Campus)">6 - 20 Units (Industrial Campus)</option>
                    <option value="20+ Units (Enterprise Rollout)">20+ Units (Enterprise Rollout)</option>
                  </select>
                </div>

                <div className="auto-form-group">
                  <label className="auto-form-label">Technical Notes / Opening Dimensions</label>
                  <textarea 
                    name="message" 
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="auto-form-textarea"
                  />
                </div>

                <button type="submit" className="auto-modal-submit-btn">
                  <Send size={16} />
                  <span>Submit Quotation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
