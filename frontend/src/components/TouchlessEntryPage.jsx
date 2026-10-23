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
  Maximize2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  Phone,
  Mail,
  Building2,
  User,
  Check,
  Award,
  Layers,
  DoorClosed,
  Settings,
  Eye,
  SlidersHorizontal,
  Lock,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
  Radio,
  Cpu,
  HelpCircle
} from 'lucide-react';
import './TouchlessEntryPage.css';

export default function TouchlessEntryPage({
  onNavigate,
  onQuoteSubmit
}) {
  // Video player state
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('2:16');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState('Touchless Entry Solution');

  // Interactive door simulator state in Hero
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [sensorActive, setSensorActive] = useState(true);

  // Active step in "How It Works"
  const [activeStep, setActiveStep] = useState(0);

  // Active sensor tab
  const [selectedSensorTab, setSelectedSensorTab] = useState(0);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Lightbox for gallery
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
  }, []);

  // Video progress handling
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 136;
      setProgress((current / total) * 100);
      
      const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      };
      setCurrentTime(formatTime(current));
      if (videoRef.current.duration) {
        setDuration(formatTime(videoRef.current.duration));
      }
    }
  };

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

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
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

  // Gallery items matching reference design
  const galleryItems = [
    {
      title: 'Corporate Office Entrance',
      image: '/hero-glass-atrium.jpg',
      category: 'Commercial & Corporate',
      desc: 'Frameless glass automatic bi-parting sliding doors with microwave radar'
    },
    {
      title: 'Hospital Entrance Solution',
      image: '/products/automatic-doors-hospital.jpg',
      category: 'Healthcare & Cleanroom',
      desc: 'Hermetically sealed hygienic touchless doors with anti-collision safety'
    },
    {
      title: 'Retail Store Automatic Doors',
      image: '/services/services-touchless-entry.jpg',
      category: 'Retail & Hospitality',
      desc: 'High-throughput sensor sliding doors with emergency panic breakout'
    },
    {
      title: 'Clean Room Entry',
      image: '/products/cleanroom-door-pharma.jpg',
      category: 'Pharmaceutical',
      desc: 'Flush cleanroom door with touchless wave sensors and airlock interlock'
    },
    {
      title: 'Access Control Integration',
      image: '/products/biometric-access-terminal.jpg',
      category: 'Security Integration',
      desc: 'AI face recognition terminal paired with automated swing barrier'
    },
    {
      title: 'Door Interlock Installation',
      image: '/products/cleanroom-interlocks.jpg',
      category: 'Pharma Cascades',
      desc: 'Multi-door programmable airlock system maintaining sterile room pressure'
    }
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxImage(galleryItems[index]);
  };

  const nextLightbox = () => {
    const nextIdx = (lightboxIndex + 1) % galleryItems.length;
    setLightboxIndex(nextIdx);
    setLightboxImage(galleryItems[nextIdx]);
  };

  const prevLightbox = () => {
    const prevIdx = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxIndex(prevIdx);
    setLightboxImage(galleryItems[prevIdx]);
  };

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
                  onClick={() => {
                    const el = document.getElementById('touchless-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Explore Products</span>
                </button>
              </div>
            </div>

            {/* Center: Showcase Image of Automatic Sliding Doors with Sensor */}
            <div className="touchless-hero-center">
              <div className="touchless-door-showcase-frame">
                {/* Microwave radar wave animation */}
                <div className={`radar-sensor-assembly ${sensorActive ? 'sensor-active' : ''}`}>
                  <div className="sensor-hardware-box">
                    <div className="sensor-lens"></div>
                    <div className="sensor-led-indicator"></div>
                  </div>
                  <div className="radar-wave wave-1"></div>
                  <div className="radar-wave wave-2"></div>
                  <div className="radar-wave wave-3"></div>
                </div>

                <div className="door-viewport">
                  <img
                    src="/services/services-touchless-entry.jpg"
                    alt="Automatic Sliding Door in Modern Atrium Lobby"
                    className="touchless-hero-door-img"
                  />
                  <div className="door-reflection-overlay"></div>
                  
                  {/* Subtle Interactive Trigger overlay */}
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
        </div>
      </section>

      {/* 2. OPERATIONAL SHOWCASE ("Touchless Entry in Action") */}
      <section className="touchless-showcase-section">
        <div className="touchless-container">
          <div className="showcase-content-grid">
            {/* Left: Custom Video Showcase Player */}
            <div className="showcase-video-card">
              <div className="video-player-wrapper">
                <video
                  ref={videoRef}
                  src="/automatic_sliding.mp4"
                  poster="/services/services-touchless-entry.jpg"
                  className="showcase-video-element"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  muted={isMuted}
                  playsInline
                />

                {/* Big Center Play Button when paused */}
                {!isPlaying && (
                  <button 
                    className="video-center-play-btn"
                    onClick={togglePlay}
                    aria-label="Play video"
                  >
                    <div className="play-triangle"></div>
                  </button>
                )}

                {/* Scrubber and Video Controls Bar */}
                <div className="video-controls-bar">
                  <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  
                  <div className="video-time-display">
                    {currentTime} / {duration}
                  </div>

                  <div className="video-progress-track" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    if (videoRef.current && videoRef.current.duration) {
                      videoRef.current.currentTime = pos * videoRef.current.duration;
                    }
                  }}>
                    <div className="video-progress-filled" style={{ width: `${progress}%` }}></div>
                  </div>

                  <button className="control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <button className="control-btn" onClick={handleFullscreen} aria-label="Fullscreen">
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Operational Details & Features */}
            <div className="showcase-info-col">
              <div className="showcase-matrix-dots" aria-hidden="true">
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
              </div>

              <div className="showcase-eyebrow">OPERATIONAL SHOWCASE</div>
              <h2 className="showcase-heading">Touchless Entry in Action</h2>
              
              <p className="showcase-description">
                Watch how our automatic doors and access control systems create a safer, cleaner and smarter entry experience for your facility.
              </p>

              <div className="showcase-features-list">
                <div className="showcase-feature-item">
                  <div className="check-circle-icon">
                    <Check size={16} />
                  </div>
                  <span>Smooth and silent operation</span>
                </div>

                <div className="showcase-feature-item">
                  <div className="check-circle-icon">
                    <Check size={16} />
                  </div>
                  <span>Advanced sensor technology</span>
                </div>

                <div className="showcase-feature-item">
                  <div className="check-circle-icon">
                    <Check size={16} />
                  </div>
                  <span>Reliable and durable</span>
                </div>

                <div className="showcase-feature-item">
                  <div className="check-circle-icon">
                    <Check size={16} />
                  </div>
                  <span>Ideal for high-traffic areas</span>
                </div>
              </div>

              <div className="showcase-action-row">
                <button 
                  className="showcase-watch-btn"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <span>Watch Full Video</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR TOUCHLESS ENTRY PRODUCTS */}
      <section className="touchless-products-section" id="touchless-products-section">
        <div className="touchless-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Our Touchless Entry Products</h2>
              <div className="section-title-underline"></div>
            </div>

            <button
              className="view-all-link"
              onClick={() => onNavigate && onNavigate('catalog')}
            >
              <span>View All Products</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="touchless-products-grid">
            {/* Card 1: Automatic Sliding Door */}
            <div className="touchless-product-card">
              <div className="product-card-media">
                <img
                  src="/products/automatic-doors.jpg"
                  alt="Automatic Sliding Door"
                  className="product-card-img"
                />
                <span className="product-card-badge">Sliding</span>
              </div>
              <div className="product-card-body">
                <div className="product-mini-chips">
                  <span className="mini-chip">24GHz Radar</span>
                  <span className="mini-chip">Anti-Pinch IR</span>
                  <span className="mini-chip">Brushless DC</span>
                </div>
                <h3 className="product-card-title">Automatic Sliding Door</h3>
                <p className="product-card-desc">
                  Motion sensor based operation with sleek and modern design. Ideal for commercial, hospital, clean room and retail spaces.
                </p>
                <ul className="product-card-bullets">
                  <li><Check size={13} className="bullet-check" /> 100–500 mm/s high-speed bi-parting glide</li>
                  <li><Check size={13} className="bullet-check" /> 150 kg leaf weight capacity with reinforced track</li>
                  <li><Check size={13} className="bullet-check" /> Fail-safe emergency panic breakout &amp; UPS backup</li>
                </ul>
                <div className="product-card-footer">
                  <button
                    className="learn-more-btn"
                    onClick={() => handleOpenQuote('Automatic Sliding Door')}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Automatic Swing Door */}
            <div className="touchless-product-card">
              <div className="product-card-media">
                <img
                  src="/products/automatic-doors-swing.jpg"
                  alt="Automatic Swing Door"
                  className="product-card-img"
                />
                <span className="product-card-badge">Swing</span>
              </div>
              <div className="product-card-body">
                <div className="product-mini-chips">
                  <span className="mini-chip">Wave Sensor</span>
                  <span className="mini-chip">Push &amp; Go</span>
                  <span className="mini-chip">Low Energy</span>
                </div>
                <h3 className="product-card-title">Automatic Swing Door</h3>
                <p className="product-card-desc">
                  Touchless sensor or switch operation. Suitable for single or double leaf doors and high-traffic areas.
                </p>
                <ul className="product-card-bullets">
                  <li><Check size={13} className="bullet-check" /> Touchless wave switch (3–10 cm detection range)</li>
                  <li><Check size={13} className="bullet-check" /> Easily retrofitted onto existing timber/glass frames</li>
                  <li><Check size={13} className="bullet-check" /> Intelligent obstacle rebound safety protection</li>
                </ul>
                <div className="product-card-footer">
                  <button
                    className="learn-more-btn"
                    onClick={() => handleOpenQuote('Automatic Swing Door')}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Touchless Access Control */}
            <div className="touchless-product-card">
              <div className="product-card-media">
                <img
                  src="/products/biometric-access-terminal.jpg"
                  alt="Touchless Access Control Terminal"
                  className="product-card-img"
                />
                <span className="product-card-badge">Access Control</span>
              </div>
              <div className="product-card-body">
                <div className="product-mini-chips">
                  <span className="mini-chip">0.2s AI Face</span>
                  <span className="mini-chip">RFID / NFC</span>
                  <span className="mini-chip">Cloud Logs</span>
                </div>
                <h3 className="product-card-title">Touchless Access Control</h3>
                <p className="product-card-desc">
                  Face recognition, RFID / Proximity card, Fingerprint (optional) and Time Attendance Integration.
                </p>
                <ul className="product-card-bullets">
                  <li><Check size={13} className="bullet-check" /> 0.2s verification with anti-spoofing dual cameras</li>
                  <li><Check size={13} className="bullet-check" /> 50,000 face capacity &amp; mask detection alerts</li>
                  <li><Check size={13} className="bullet-check" /> Wiegand &amp; TCP/IP integration with turnstiles/doors</li>
                </ul>
                <div className="product-card-footer">
                  <button
                    className="learn-more-btn"
                    onClick={() => handleOpenQuote('Touchless Access Control')}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Door Interlock System */}
            <div className="touchless-product-card">
              <div className="product-card-media">
                <img
                  src="/products/cleanroom-interlocks.jpg"
                  alt="Door Interlock System"
                  className="product-card-img"
                />
                <span className="product-card-badge">Cleanroom Airlock</span>
              </div>
              <div className="product-card-body">
                <div className="product-mini-chips">
                  <span className="mini-chip">2–8 Doors</span>
                  <span className="mini-chip">Airlock Cascade</span>
                  <span className="mini-chip">LED Indicators</span>
                </div>
                <h3 className="product-card-title">Door Interlock System</h3>
                <p className="product-card-desc">
                  Prevents multiple doors from opening together and maintains required pressure in clean rooms, pharma and laboratories.
                </p>
                <ul className="product-card-bullets">
                  <li><Check size={13} className="bullet-check" /> Compliant with USFDA &amp; cGMP cleanroom protocols</li>
                  <li><Check size={13} className="bullet-check" /> Audio-visual Red/Green traffic status panels</li>
                  <li><Check size={13} className="bullet-check" /> Programmable release timer with emergency override</li>
                </ul>
                <div className="product-card-footer">
                  <button
                    className="learn-more-btn"
                    onClick={() => handleOpenQuote('Door Interlock System')}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. ADVANCED SENSOR & DETECTION TECHNOLOGIES (NEW TECHNICAL DEEP DIVE) */}
      <section className="touchless-sensors-deepdive-section">
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
      <section className="touchless-workflow-app-section">
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
      <section className="touchless-specs-section">
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

              <div className="specs-table-actions">
                <button
                  className="download-spec-btn"
                  onClick={() => handleOpenQuote('Technical Data Sheet & CAD')}
                >
                  <Download size={16} />
                  <span>Download Spec Sheet &amp; CAD</span>
                </button>
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

      {/* 6. RELATED GALLERY */}
      <section className="touchless-gallery-section">
        <div className="touchless-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Related Gallery</h2>
              <div className="section-title-underline"></div>
            </div>

            <button
              className="view-all-link"
              onClick={() => openLightbox(0)}
            >
              <span>View All Images</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="gallery-grid">
            {galleryItems.map((item, gIdx) => (
              <div
                key={gIdx}
                className="gallery-item-card"
                onClick={() => openLightbox(gIdx)}
              >
                <div className="gallery-media">
                  <img src={item.image} alt={item.title} className="gallery-img" />
                  <div className="gallery-hover-overlay">
                    <Eye size={24} className="gallery-zoom-icon" />
                    <span>View Photo</span>
                  </div>
                </div>
                <div className="gallery-caption">
                  <h4 className="gallery-title">{item.title}</h4>
                  <span className="gallery-category">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6B. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="touchless-faq-section">
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

      {/* 7. BOTTOM TURNKEY CTA BANNER */}
      <section className="touchless-cta-banner-section">
        <div className="touchless-container">
          <div className="touchless-cta-box">
            <div className="cta-left-content">
              <span className="cta-tag">TURNKEY ENGINEERING SOLUTIONS</span>
              <h3 className="cta-title">Upgrade Your Facility with Touchless Smart Entry</h3>
              <p className="cta-desc">
                From architectural glass doors to pharma cleanroom interlocks and biometric speed gates, HTI provides end-to-end site consultation, supply, and installation across India.
              </p>
            </div>
            <div className="cta-right-action">
              <button
                className="touchless-btn-primary cta-btn-lg"
                onClick={() => handleOpenQuote('Turnkey Touchless Entry Solution')}
              >
                <span>Request a Quote Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR GALLERY */}
      {lightboxImage && (
        <div className="touchless-lightbox-modal" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setLightboxImage(null)} aria-label="Close image">
              <X size={24} />
            </button>

            <button className="lightbox-nav-btn prev-btn" onClick={prevLightbox} aria-label="Previous image">
              <ChevronLeft size={28} />
            </button>
            <button className="lightbox-nav-btn next-btn" onClick={nextLightbox} aria-label="Next image">
              <ChevronRight size={28} />
            </button>

            <img src={lightboxImage.image} alt={lightboxImage.title} className="lightbox-main-img" />
            <div className="lightbox-caption-bar">
              <h4>{lightboxImage.title}</h4>
              <p>{lightboxImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* CINEMATIC VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="touchless-video-modal" onClick={() => setIsVideoModalOpen(false)}>
          <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h3>Touchless Automatic Doors - Operational Showcase</h3>
              <button className="modal-close-icon-btn" onClick={() => setIsVideoModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="video-modal-body">
              <video
                src="/automatic_sliding.mp4"
                controls
                autoPlay
                className="modal-fullscreen-video"
              />
            </div>
          </div>
        </div>
      )}

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
