import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Download, Send, PhoneCall, 
  MessageSquare, Layers, Cpu, Flame, Wrench, Share2, Sparkles, Building2,
  Check, FileText, ExternalLink, ArrowRight, AlertTriangle, BatteryCharging,
  Settings, CheckSquare, Zap, Clock, Play, Pause, RotateCcw, Volume2, VolumeX,
  Maximize2, Eye, Activity, Info, Sliders, PlayCircle
} from 'lucide-react';
import { productsData, getProductMedia } from '../data/productsData';
import AutomaticDoorsDetailView from './AutomaticDoorsDetailView';

// Exact 1:1 image mapping for all 14 Industrial Access Automation services
export const SERVICE_CARD_IMAGES = {
  'automatic-sliding-swing-doors': '/services/services-touchless-entry.jpg',
  'automatic-sliding-swing-gates': '/services/services-perimeter-gate.jpg',
  'telescopic-cantilever-gates': '/services/services-trackless-gate.jpg',
  'pvc-rapid-roll-up-doors': '/services/services-rapid-airlock.jpg',
  'sectional-overhead-doors': '/services/service-sectional-doors.jpg',
  'fire-rated-doors-shutters': '/services/service-fire-doors.jpg',
  'motorized-rolling-shutters': '/services/services-heavy-security.jpg',
  'boom-barriers': '/services/service-boom-barrier.jpg',
  'dock-levellers-dock-shelters': '/services/services-logistics-bridge.jpg',
  'industrial-air-curtains': '/services/service-air-curtain.jpg',
  'door-interlock-systems': '/services/service-cleanroom.jpg',
  'bollards-tyre-killers-car-lifts': '/services/service-bollards-blockers.jpg',
  'high-speed-industrial-doors': '/services/service-high-speed-doors.jpg',
  'hangar-doors': '/services/service-hangar-doors.jpg'
};

export default function ProductDetailPage({ 
  product, 
  onNavigate, 
  onQuoteSubmit 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    quantity: '1 Unit / Turnkey Site',
    accessories: [],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Media & Gallery state
  const media = getProductMedia(product);
  const gallery = media.gallery && media.gallery.length > 0 
    ? media.gallery 
    : [{ url: media.primaryImage, title: 'Corporate Facade', subtitle: 'Turnkey Installation' }];
  
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Video & Simulation Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [simScenario, setSimScenario] = useState('standard'); // 'standard' | 'obstacle' | 'fire' | 'battery'
  const [simProgress, setSimProgress] = useState(38);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'video' | 'specs' | 'applications'
  const [cycleCount, setCycleCount] = useState(14820);

  const progressIntervalRef = useRef(null);

  // Available add-ons / engineering accessories
  const availableAccessories = [
    'Emergency Battery Backup Unit (24V)',
    'Active Infrared Presence & Safety Curtain',
    'Certified Flameproof (Ex-d) Enclosure',
    'FACP Fire Alarm Auto-Trip Interface Relay',
    'Touchless Wave Sensor / Proximity Switch',
    'Annual Maintenance Contract (AMC 24/7 SLA)'
  ];

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmitted(false);
    setActiveImgIdx(0);
    setSimScenario('standard');
    setFormData(prev => ({
      ...prev,
      accessories: [],
      message: `Hello HTI Engineering, please share technical data sheet, CAD GA drawing, and turnkey quotation for ${product?.name || 'this system'}.`
    }));
  }, [product]);

  // Video Progress Simulation Timer
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setSimProgress(prev => {
          if (prev >= 100) {
            setCycleCount(c => c + 1);
            return 0;
          }
          return prev + 1.2;
        });
      }, 100);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying]);

  if (!product) {
    return (
      <div className="product-detail-page section">
        <div className="container text-center py-16">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Product Not Found</h2>
          <p className="text-slate-500 mb-6">The product you are looking for is either archived or unavailable.</p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('home', 'catalog')}
          >
            <ArrowLeft size={16} /> Return to Products Catalog
          </button>
        </div>
      </div>
    );
  }

  // Find related products in the same category (excluding current)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccessoryToggle = (acc) => {
    setFormData(prev => {
      const exists = prev.accessories.includes(acc);
      return {
        ...prev,
        accessories: exists ? prev.accessories.filter(a => a !== acc) : [...prev.accessories, acc]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your Name, Email, and Phone number.');
      return;
    }
    
    // Simulate inquiry dispatch
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not specified',
        category: product.category,
        product_name: product.name,
        message: `${formData.message} [Location: ${formData.location || 'Pan-India'}] [Qty: ${formData.quantity}] [Selected Add-ons: ${formData.accessories.join(', ') || 'Standard'}]`
      })
    }).catch(() => {
      // Offline fallback
    });

    setSubmitted(true);
    if (onQuoteSubmit) onQuoteSubmit();
  };

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleBrochureDownload = () => {
    alert(`Technical specification dossier & CAD schematic for "${product.name}" is being prepared. Our engineering office will email the PDF package to your registered address.`);
  };

  // Telemetry status variables based on selected test scenario
  const getTelemetryData = () => {
    switch (simScenario) {
      case 'obstacle':
        return {
          statusBadge: 'OBSTACLE AUTO-REVERSING',
          badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-500/40',
          radarStatus: 'OBSTACLE DETECTED (50mm)',
          motorStatus: 'TORQUE LIMIT TRIP • INSTANT REVERSE',
          safetyStatus: 'TRIPPED (EN 16005 COMPLIANT)',
          facpStatus: 'ARMED • STANDBY',
          batteryStatus: '100% HEALTHY'
        };
      case 'fire':
        return {
          statusBadge: 'FACP FIRE ALARM RELAY RELEASE',
          badgeColor: 'text-red-400 bg-red-950/80 border-red-500/40',
          radarStatus: 'OVERRIDDEN BY FIRE SIGNAL',
          motorStatus: 'EMERGENCY FAIL-SAFE FULL OPEN',
          safetyStatus: 'LIFE SAFETY EVACUATION ACTIVE',
          facpStatus: 'ALARM ACTIVE • NO-DELAY RELEASE',
          batteryStatus: 'STANDBY ENGAGED'
        };
      case 'battery':
        return {
          statusBadge: 'GRID MAINS CUT • BATTERY ACTIVE',
          badgeColor: 'text-sky-400 bg-sky-950/80 border-sky-500/40',
          radarStatus: 'BATTERY POWERED SENSING',
          motorStatus: '24V DC BRUSHLESS CONTINUOUS',
          safetyStatus: 'LOW-VOLTAGE FAIL SAFE OK',
          facpStatus: 'ARMED • NORMAL',
          batteryStatus: '24V LINEAR DISCHARGE (98%)'
        };
      case 'standard':
      default:
        return {
          statusBadge: 'CONTINUOUS 100% OPERATIONAL CYCLE',
          badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40',
          radarStatus: 'ACTIVE • RADAR SWEEP CLEAR',
          motorStatus: '24V BLDC • 450 RPM • 18.2 Nm',
          safetyStatus: 'ZERO RESISTANCE (ALL CLEAR)',
          facpStatus: 'ARMED • NORMAL STANDBY',
          batteryStatus: '100% FLOAT CHARGE'
        };
    }
  };

  const telemetry = getTelemetryData();
  const activeImage = gallery[activeImgIdx] || gallery[0];

  const REDESIGNED_PRODUCT_SLUGS = [
    // Access Automation Products
    'automatic-sliding-swing-doors',
    'automatic-sliding-swing-gates',
    'telescopic-cantilever-gates',
    'pvc-rapid-roll-up-doors',
    'motorized-rolling-shutters',
    // Cleanroom Products
    'door-interlock-systems',
    'pharma-cleanroom-door-interlock-system',
    'cleanroom-door-interlock-system',
    // Traffic & Perimeter Products
    'boom-barriers',
    'dock-levellers-dock-shelters',
    'turnstiles-flap-barriers-speed-gates',
    'bollards-tyre-killers-car-lifts',
    'visitor-management-system',
    'parking-intrusion-alarms'
  ];

  if (
    REDESIGNED_PRODUCT_SLUGS.includes(product?.slug) ||
    REDESIGNED_PRODUCT_SLUGS.includes(product?.id) ||
    product?.id === 17 ||
    product?.id === 'door-interlock-systems' ||
    product?.id === 'automatic-doors'
  ) {
    return (
      <AutomaticDoorsDetailView
        product={product}
        onNavigate={onNavigate}
        onQuoteSubmit={onQuoteSubmit}
      />
    );
  }

  return (
    <div className="product-detail-page">
      {/* 1. Breadcrumb Bar */}
      <div className="detail-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <button 
              className="breadcrumb-link" 
              onClick={() => onNavigate('home')}
            >
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <button 
              className="breadcrumb-link"
              onClick={() => {
                const catPage = product.category.toLowerCase().includes('automation') 
                  ? 'automation' 
                  : product.category.toLowerCase().includes('security') 
                  ? 'security-systems' 
                  : 'hygiene';
                onNavigate(catPage);
              }}
            >
              {product.category}
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>

          <button 
            className="back-btn"
            onClick={() => {
              if (product.category?.toLowerCase().includes('automation')) {
                onNavigate('automation');
              } else {
                onNavigate('home', 'catalog');
              }
            }}
          >
            <ArrowLeft size={15} />
            <span>{product.category?.toLowerCase().includes('automation') ? 'Back to Services' : 'Back to All Products'}</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Header & High-Definition Image Showcase */}
      <div className="detail-hero-banner">
        <div className="container">
          <div className="detail-hero-grid">
            
            {/* Left Col: Info & Badges */}
            <div className="detail-hero-content">
              <div className="detail-tag-row">
                <span className="detail-category-badge">{product.category}</span>
                <span className="detail-subcat-badge">{product.subcategory}</span>
                {product.badge && (
                  <span className="detail-highlight-badge">
                    <Sparkles size={13} />
                    {product.badge}
                  </span>
                )}
                <span className="detail-4k-badge">
                  <PlayCircle size={13} />
                  4K Video Simulation
                </span>
              </div>

              <h1 className="detail-title">{product.name}</h1>
              <p className="detail-tagline">{product.tagline}</p>

              <div className="detail-hero-cta-row">
                <a 
                  href="#quote-form"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Send size={16} />
                  <span>Request Instant Quotation</span>
                </a>

                <button 
                  className="btn btn-secondary"
                  onClick={handleBrochureDownload}
                >
                  <Download size={16} />
                  <span>Download Specs PDF</span>
                </button>

                <button 
                  className="btn-share-icon" 
                  onClick={handleCopyShare}
                  title="Share Product Page"
                >
                  {copiedLink ? <Check size={18} className="text-emerald-600" /> : <Share2 size={18} />}
                </button>
              </div>

              <div className="detail-quick-stats">
                <div className="quick-stat-item">
                  <ShieldCheck size={18} className="text-sky-600" />
                  <span>USFDA & CE Certified</span>
                </div>
                <div className="quick-stat-item">
                  <Wrench size={18} className="text-sky-600" />
                  <span>Turnkey PAN-India Installation</span>
                </div>
                <div className="quick-stat-item">
                  <Cpu size={18} className="text-sky-600" />
                  <span>Continuous 100% Duty BLDC Drive</span>
                </div>
              </div>
            </div>

            {/* Right Col: High-Res Multi-Angle Image Gallery Showcase */}
            <div className="detail-preview-visual">
              <div className="detail-gallery-container">
                {/* Primary Large Image Viewer */}
                <div className="detail-gallery-main">
                  <img 
                    src={activeImage.url} 
                    alt={activeImage.title}
                    className="gallery-main-img" 
                  />
                  <div className="gallery-img-gradient" />
                  
                  <div className="gallery-caption-overlay">
                    <div className="gallery-caption-title">{activeImage.title}</div>
                    <div className="gallery-caption-sub">{activeImage.subtitle}</div>
                  </div>

                  <div className="gallery-tag-pill">
                    <Sparkles size={12} className="text-amber-400" />
                    <span>Corporate High-Resolution Spec</span>
                  </div>
                </div>

                {/* 4-Angle Thumbnail Selector Strip */}
                <div className="detail-gallery-thumbs">
                  {gallery.map((thumb, idx) => (
                    <button
                      key={idx}
                      className={`gallery-thumb-btn ${activeImgIdx === idx ? 'thumb-active' : ''}`}
                      onClick={() => setActiveImgIdx(idx)}
                    >
                      <img src={thumb.url} alt={thumb.title} className="thumb-img" />
                      <div className="thumb-hover-overlay">
                        <span>{idx + 1}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE 4K CORPORATE VIDEO & 3D SIMULATION PLAYER */}
      <section className="detail-video-section section">
        <div className="container">
          
          <div className="video-section-header">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="section-pill-tag">
                  <PlayCircle size={14} />
                  INTERACTIVE 4K VIDEO DEMONSTRATION
                </span>
                <span className="hd-tag">4K UHD 60FPS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                {media.video?.title || `${product.name} Engineering Demonstration & Safety Stress Test`}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Experience real-time automated cycles, microwave radar presence detection, and statutory fail-safe triggers.
              </p>
            </div>

            {/* Simulation Scenarios Switcher */}
            <div className="scenario-switcher-bar">
              <span className="scenario-lbl">Test Scenario:</span>
              <div className="scenario-btns-group">
                <button 
                  className={`scenario-btn ${simScenario === 'standard' ? 'scenario-active' : ''}`}
                  onClick={() => setSimScenario('standard')}
                >
                  <Activity size={13} />
                  <span>Standard 100% Cycle</span>
                </button>
                <button 
                  className={`scenario-btn ${simScenario === 'obstacle' ? 'scenario-active' : ''}`}
                  onClick={() => setSimScenario('obstacle')}
                >
                  <Zap size={13} />
                  <span>Anti-Pinch Reversal</span>
                </button>
                <button 
                  className={`scenario-btn ${simScenario === 'fire' ? 'scenario-active' : ''}`}
                  onClick={() => setSimScenario('fire')}
                >
                  <Flame size={13} />
                  <span>FACP Fire Alarm Release</span>
                </button>
                <button 
                  className={`scenario-btn ${simScenario === 'battery' ? 'scenario-active' : ''}`}
                  onClick={() => setSimScenario('battery')}
                >
                  <BatteryCharging size={13} />
                  <span>Battery Fail-Safe</span>
                </button>
              </div>
            </div>
          </div>

          {/* Video Player Box with Live Telemetry HUD */}
          <div className="video-player-container">
            {/* Video Canvas / Visual Area */}
            <div className="video-canvas-stage">
              <img 
                src={activeImage.url} 
                alt="Product in Action" 
                className="video-bg-media"
              />
              <div className="video-cinematic-dim" />

              {/* Live Telemetry Heads-Up Display (HUD) */}
              <div className="video-hud-overlay">
                
                {/* Top HUD Bar */}
                <div className="hud-top-bar">
                  <div className={`hud-badge ${telemetry.badgeColor}`}>
                    <span className="hud-rec-dot" />
                    <span>{telemetry.statusBadge}</span>
                  </div>

                  <div className="hud-metric-pill">
                    <span className="text-slate-400">Total Validated Cycles:</span>
                    <span className="text-emerald-400 font-mono font-bold">{cycleCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Center Animation Overlay: Radar Beams & Moving Indicator */}
                <div className="hud-center-visual">
                  {simScenario === 'obstacle' && (
                    <div className="hud-obstacle-alert">
                      <AlertTriangle size={32} className="text-amber-400 animate-bounce" />
                      <div className="alert-text">SAFETY BEAM INTERRUPTED • EN 16005 AUTO REVERSAL ACTIVATED</div>
                    </div>
                  )}

                  {simScenario === 'fire' && (
                    <div className="hud-fire-alert">
                      <Flame size={32} className="text-red-400 animate-pulse" />
                      <div className="alert-text">CENTRAL FIRE ALARM (FACP) SIGNAL CONFIRMED • LOCKS RELEASED</div>
                    </div>
                  )}

                  {/* Pulsing Radar Ring */}
                  <div className="hud-radar-sweep-box">
                    <div className="radar-sweep-cone" />
                    <div className="radar-scanner-line" />
                    <div className="radar-pulse-ring ring-1" />
                    <div className="radar-pulse-ring ring-2" />
                  </div>
                </div>

                {/* Bottom HUD Telemetry Dashboard */}
                <div className="hud-telemetry-panel">
                  <div className="hud-param-col">
                    <span className="hud-lbl">RADAR SENSOR</span>
                    <span className="hud-val text-sky-400">{telemetry.radarStatus}</span>
                  </div>
                  <div className="hud-param-col">
                    <span className="hud-lbl">MOTOR TORQUE</span>
                    <span className="hud-val text-slate-100">{telemetry.motorStatus}</span>
                  </div>
                  <div className="hud-param-col">
                    <span className="hud-lbl">SAFETY EDGE</span>
                    <span className="hud-val text-emerald-400">{telemetry.safetyStatus}</span>
                  </div>
                  <div className="hud-param-col">
                    <span className="hud-lbl">FACP FIRE RELAY</span>
                    <span className="hud-val text-amber-400">{telemetry.facpStatus}</span>
                  </div>
                  <div className="hud-param-col">
                    <span className="hud-lbl">BATTERY BACKUP</span>
                    <span className="hud-val text-emerald-300">{telemetry.batteryStatus}</span>
                  </div>
                </div>

              </div>

              {/* Play / Pause Big Center Trigger */}
              <button 
                className={`video-center-play-btn ${isPlaying ? 'btn-faded' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? "Pause Demonstration" : "Play Demonstration"}
              >
                {isPlaying ? <Pause size={34} /> : <Play size={34} className="ml-1" />}
              </button>
            </div>

            {/* Video Controls Bar */}
            <div className="video-controls-bar">
              <button 
                className="v-ctrl-btn"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              </button>

              <button 
                className="v-ctrl-btn"
                onClick={() => setSimProgress(0)}
                title="Replay from start"
              >
                <RotateCcw size={15} />
              </button>

              {/* Interactive Scrub Bar */}
              <div 
                className="v-timeline-wrapper"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
                  setSimProgress(newPercent);
                }}
              >
                <div className="v-timeline-rail">
                  <div 
                    className="v-timeline-fill"
                    style={{ width: `${simProgress}%` }}
                  />
                  <div 
                    className="v-timeline-thumb"
                    style={{ left: `${simProgress}%` }}
                  />
                </div>
              </div>

              <div className="v-time-display font-mono">
                <span>00:{Math.floor(simProgress * 0.6).toString().padStart(2, '0')}</span>
                <span className="text-slate-500"> / </span>
                <span className="text-slate-400">{media.video?.duration || '01:45'}</span>
              </div>

              <button 
                className="v-ctrl-btn"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute Audio Track" : "Mute Audio Track"}
              >
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>

              <div className="v-hd-badge">
                <span>4K HDR</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Main Engineering Tabs, Technical Specs & Inquiry Form */}
      <div className="detail-main-body section pt-0">
        <div className="container">
          <div className="detail-columns-grid">
            
            {/* Left 65%: Overview, Features, Specs, Safety & Applications */}
            <div className="detail-info-column">
              
              {/* Engineering Overview */}
              <div className="detail-card">
                <h2 className="detail-section-title">
                  <FileText size={20} className="text-sky-600" />
                  <span>Engineering & Technical Overview</span>
                </h2>
                <p className="detail-description-text">{product.description}</p>

                <div className="overview-badges-list mt-4">
                  <div className="overview-badge-item">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Microprocessor Brushless DC Motor drive with whisper-quiet planetary gear</span>
                  </div>
                  <div className="overview-badge-item">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Pre-engineered for seamless BMS, SCADA, Access Control & Fire Alarm integration</span>
                  </div>
                  <div className="overview-badge-item">
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    <span>Heavy-duty architectural Grade 304 Stainless Steel / Toughened Glass finish</span>
                  </div>
                </div>
              </div>

              {/* Key Features & System Capabilities */}
              <div className="detail-card mt-6">
                <h2 className="detail-section-title">
                  <CheckCircle2 size={20} className="text-sky-600" />
                  <span>Key Engineering Features</span>
                </h2>
                <div className="detail-features-grid">
                  {product.features && product.features.map((feat, idx) => (
                    <div key={idx} className="detail-feature-item">
                      <div className="feature-check-icon">
                        <Check size={16} />
                      </div>
                      <span className="feature-text">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Technical Specifications Table */}
              <div className="detail-card mt-6">
                <h2 className="detail-section-title">
                  <Cpu size={20} className="text-sky-600" />
                  <span>Technical Specifications & Standards</span>
                </h2>
                <div className="specs-table-wrapper">
                  <table className="specs-table">
                    <tbody>
                      {product.specs && Object.entries(product.specs).map(([specKey, specVal], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                          <td className="spec-key-col">{specKey}</td>
                          <td className="spec-val-col">{specVal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fail-Safe & Life Safety Mechanisms */}
              <div className="detail-card mt-6">
                <h2 className="detail-section-title">
                  <ShieldCheck size={20} className="text-red-500" />
                  <span>Fail-Safe & Statutory Life-Safety Mechanisms</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <BatteryCharging size={18} className="text-emerald-600" />
                      <span>Emergency Power Auto-Release</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Integrated 24V linear battery reserve automatically operates or holds open the door/gate leaf during sudden grid failure.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <Flame size={18} className="text-red-500" />
                      <span>Fire Alarm Panel (FACP) Trip Relay</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Direct integration with building fire alarm panels ensures instantaneous lock drop and barrier opening upon smoke detection.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <Zap size={18} className="text-amber-500" />
                      <span>Anti-Pinch Obstacle Auto-Reverse</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Microprocessor-driven electronic torque monitoring detects the slightest resistance and reverses curtain or leaf traversal in &lt;0.2 sec.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                      <CheckCircle2 size={18} className="text-sky-600" />
                      <span>Compliance Documentation Dossier</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Furnished with certified Factory Acceptance Test (FAT), Material Test Certificates (MTC), and CE/ISO declarations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Applications & Industry Deployments */}
              {product.applications && product.applications.length > 0 && (
                <div className="detail-card mt-6">
                  <h2 className="detail-section-title">
                    <Building2 size={20} className="text-sky-600" />
                    <span>Target Applications & Architectural Deployments</span>
                  </h2>
                  <div className="applications-pills-wrap mt-3">
                    {product.applications.map((app, idx) => (
                      <span key={idx} className="application-pill-tag">
                        <Check size={14} className="text-sky-600" />
                        <span>{app}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right 35%: Quotation & Engineering Inquiry Card (Sticky) */}
            <div className="detail-sidebar-column">
              <div className="quote-sidebar-card" id="quote-form">
                <div className="quote-sidebar-header">
                  <div className="flex items-center justify-between">
                    <span className="quote-badge">Instant Project Inquiry</span>
                    <span className="quote-response-time">Average SLA: &lt; 2 Hours</span>
                  </div>
                  <h3 className="quote-sidebar-title">Request Turnkey Quotation</h3>
                  <p className="quote-sidebar-desc">
                    Get customized technical documentation, CAD general arrangement (GA) layout, and project pricing.
                  </p>
                </div>

                {submitted ? (
                  <div className="quote-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={44} className="text-emerald-500" />
                    </div>
                    <h4 className="success-title">Inquiry Registered Successfully!</h4>
                    <p className="success-desc">
                      Thank you, <strong>{formData.name}</strong>. Our industrial project engineering team has received your request for <strong>{product.name}</strong> and will contact you at <strong>{formData.phone}</strong> shortly.
                    </p>
                    <button 
                      className="btn btn-outline-primary w-full mt-4"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form className="quote-form-body" onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rajesh Sharma"
                        className="form-input" 
                        required 
                      />
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">Work Email *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="rajesh@company.com"
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone / WhatsApp *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="form-input" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">Company / Client</label>
                        <input 
                          type="text" 
                          name="company" 
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. Cipla / L&T"
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Site Location</label>
                        <input 
                          type="text" 
                          name="location" 
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g. Mumbai / Pan-India"
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Project Scope / Quantity</label>
                      <select 
                        name="quantity" 
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="form-input form-select"
                      >
                        <option value="1 Unit / Turnkey Site">1 Unit (Pilot / Replacement)</option>
                        <option value="2 to 5 Units (Facility Block)">2 to 5 Units (Facility Block)</option>
                        <option value="6 to 20 Units (Expansion Project)">6 to 20 Units (Expansion Project)</option>
                        <option value="Full Turnkey Facility Contract">Full Turnkey Facility Contract</option>
                      </select>
                    </div>

                    {/* Engineering Add-ons Checklist */}
                    <div className="form-group">
                      <label className="form-label">Select Engineering Options:</label>
                      <div className="accessories-checklist">
                        {availableAccessories.map((acc, idx) => (
                          <label key={idx} className="accessory-checkbox-item">
                            <input 
                              type="checkbox"
                              checked={formData.accessories.includes(acc)}
                              onChange={() => handleAccessoryToggle(acc)}
                              className="acc-checkbox"
                            />
                            <span className="acc-label-text">{acc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Technical Notes & Requirements</label>
                      <textarea 
                        name="message" 
                        rows="3"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-input form-textarea"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full btn-submit-quote">
                      <Send size={16} />
                      <span>Dispatch Technical Quotation Request</span>
                    </button>

                    <div className="quote-reassurance">
                      <div className="reassurance-item">
                        <ShieldCheck size={14} className="text-sky-600" />
                        <span>Direct OEM Pricing</span>
                      </div>
                      <div className="reassurance-item">
                        <Wrench size={14} className="text-sky-600" />
                        <span>Factory Trained Engineers</span>
                      </div>
                    </div>

                  </form>
                )}

                {/* Direct Emergency Contact */}
                <div className="quote-sidebar-footer">
                  <div className="sidebar-contact-callout">
                    <PhoneCall size={18} className="text-sky-600" />
                    <div>
                      <div className="callout-label">Need immediate sizing advice?</div>
                      <a href="tel:+919820000000" className="callout-number">+91 (022) 2850-HTI / +91 98200 12345</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. Related Engineering Systems Showcase */}
      {relatedProducts.length > 0 && (
        <section className="detail-related-section section bg-slate-50">
          <div className="container">
            <div className="section-header text-center mb-10">
              <span className="section-pill-tag">COMPLEMENTARY SYSTEMS</span>
              <h2 className="section-title">Related {product.category} Solutions</h2>
              <p className="section-subtitle">
                Engineered to seamlessly interface with {product.name} for integrated facility management.
              </p>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((relProd) => {
                const relMedia = getProductMedia(relProd);
                return (
                  <div key={relProd.id} className="related-prod-card">
                    <div className="related-prod-media">
                      <img 
                        src={relMedia.primaryImage} 
                        alt={relProd.name} 
                        className="related-prod-img" 
                      />
                      <span className="related-cat-badge">{relProd.category}</span>
                      <div className="related-video-tag">
                        <PlayCircle size={12} />
                        <span>4K Video</span>
                      </div>
                    </div>
                    <div className="related-prod-body">
                      <h4 className="related-prod-name">{relProd.name}</h4>
                      <p className="related-prod-work">{relProd.workSummary}</p>
                      <button 
                        className="btn-related-link"
                        onClick={() => onNavigate('product', relProd.slug)}
                      >
                        <span>Explore Full System Specs</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
