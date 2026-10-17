import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Cpu,
  Lock,
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Building2
} from 'lucide-react';

// Animated counter component from 0 to target number on scroll (runs fast, stops, never resets)
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

  // Guaranteed display: if animation ran or ended, always show target if count is somehow 0
  const displayCount = animatedRef.current && count === 0 ? target : count;

  return (
    <span ref={spanRef}>
      {displayCount}{suffix}
    </span>
  );
}

const ROTATING_DOMAINS = [
  { word: "Automation", sub: "Life-Safety, Security & Cleanroom Hygiene" },
  { word: "Life-Safety", sub: "Automation, Security & Cleanroom Hygiene" },
  { word: "Security", sub: "Automation, Life-Safety & Cleanroom Hygiene" },
  { word: "Cleanroom Hygiene", sub: "Automation, Life-Safety & Security Systems" }
];

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Pharma Cleanroom Robotics & Biometric Access",
    image: "/hero-cleanroom-automation.jpg",
    alt: "HTI Cleanroom Robotic Automation and Biometric Terminal",
    tag: "Pharma Cleanroom & Access"
  },
  {
    id: 2,
    title: "Integrated Security Operations & CCTV Command Center",
    image: "/hero-security-command-center.jpg",
    alt: "HTI Integrated Security Operations and Surveillance Command Center",
    tag: "AI CCTV & Security Operations"
  },
  {
    id: 3,
    title: "Automated High-Speed Sectional Doors & Logistics Docks",
    image: "/hero-industrial-doors-dock.jpg",
    alt: "HTI High-Speed Spiral Roll-up Doors and Dock Levellers",
    tag: "Access Automation & Dock Systems"
  },
  {
    id: 4,
    title: "Multi-Door Cleanroom Interlock Airlock Systems",
    image: "/hero-cleanroom-interlock-chamber.jpg",
    alt: "HTI Cleanroom Interlock Corridor with Differential Pressure Display",
    tag: "Air Barrier & Interlock Control"
  }
];

export default function Hero({ stats = {}, onExploreClick, onDemoClick, onQuoteClick }) {
  // Scroll-triggered counter visibility - triggers once, counts fast, never resets
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (statsVisible) return;

    const el = statsRef.current;
    if (!el) return;

    const markVisible = () => {
      setStatsVisible(true);
    };

    // 1. Direct bounding check
    const checkBounding = () => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 1.15 && rect.bottom >= -50) {
        markVisible();
        return true;
      }
      return false;
    };

    if (checkBounding()) return;

    // 2. IntersectionObserver (reliable across all browsers)
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            markVisible();
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0, rootMargin: '80px 0px 80px 0px' }
      );
      observer.observe(el);
    }

    // 3. Scroll & resize listeners fallback
    const handleScroll = () => {
      if (checkBounding()) {
        clean();
      }
    };

    const clean = () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('scroll', handleScroll, true);
      if (observer) observer.disconnect();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    // 4. Safety fallback so numbers never stay stuck at 0
    const safetyTimer = setTimeout(() => {
      markVisible();
    }, 700);

    return () => {
      clean();
      clearTimeout(safetyTimer);
    };
  }, [statsVisible]);

  // Heading Typewriter State
  const [domainIndex, setDomainIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(ROTATING_DOMAINS[0].word.length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [subFading, setSubFading] = useState(false);

  // 3D Card-Flip Carousel State (auto flip every 3.5s)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [faceASlide, setFaceASlide] = useState(0);
  const [faceBSlide, setFaceBSlide] = useState(1);
  const [frontFace, setFrontFace] = useState('A');

  // Automatic 3D card flip every 3.5 seconds
  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setRotationDeg(prev => prev + 180);
      setFrontFace(prev => (prev === 'A' ? 'B' : 'A'));
      setCurrentSlide(prev => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 3500);

    return () => clearInterval(carouselTimer);
  }, []);

  // Update hidden back face silently after 3D flip finishes (850ms)
  useEffect(() => {
    const swapTimer = setTimeout(() => {
      if (frontFace === 'B') {
        setFaceASlide((currentSlide + 1) % CAROUSEL_SLIDES.length);
      } else {
        setFaceBSlide((currentSlide + 1) % CAROUSEL_SLIDES.length);
      }
    }, 850);

    return () => clearTimeout(swapTimer);
  }, [frontFace, currentSlide]);

  useEffect(() => {
    const currentWord = ROTATING_DOMAINS[domainIndex].word;

    // Handle pause state when word is fully typed or fully deleted
    if (isPaused) {
      const pauseDuration = isDeleting ? 300 : (domainIndex === 0 && charIndex === currentWord.length ? 2600 : 2000);
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (charIndex === currentWord.length) {
          setIsDeleting(true);
          setSubFading(true);
        } else if (charIndex === 0) {
          setIsDeleting(false);
          setDomainIndex((prev) => (prev + 1) % ROTATING_DOMAINS.length);
          setSubFading(false);
        }
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    // Typing speed vs Deleting speed
    const stepSpeed = isDeleting ? 45 : 85;
    const typeTimer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setCharIndex((prev) => prev + 1);
          if (charIndex + 1 === currentWord.length) {
            setIsPaused(true);
          }
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
          if (charIndex - 1 === 0) {
            setIsPaused(true);
          }
        }
      }
    }, stepSpeed);

    return () => clearTimeout(typeTimer);
  }, [charIndex, isDeleting, isPaused, domainIndex]);

  const displayedWord = ROTATING_DOMAINS[domainIndex].word.substring(0, charIndex);

  return (
    <section id="hero" className="hero-section">
      {/* Background Soft Glows */}
      <div className="hero-glow-blob-1"></div>
      <div className="hero-glow-blob-2"></div>

      <div className="container hero-container">
        {/* Left Column: Headline, Copy, Actions & Trust Highlights */}
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <span className="hero-badge-pill">
              <span className="badge-since-pill">★ SINCE 2014</span>
              <span className="badge-tagline">
                <span className="badge-text-full">Your Trusted Partner in Automation, Security & Hygiene</span>
                <span className="badge-text-compact">Automation, Security & Hygiene</span>
              </span>
            </span>
          </div>

          <h1 className="hero-title">
            Advanced Industrial{' '}
            <span className="hero-typing-slot">
              <span className="hero-highlight-red">{displayedWord}</span>
              <span className="hero-typing-cursor">|</span>
            </span>
            <br className="hero-title-br" />
            <span className={`hero-title-sub ${subFading ? 'sub-fade-out' : 'sub-fade-in'}`}>
              {ROTATING_DOMAINS[domainIndex].sub}
            </span>
          </h1>

          <p className="hero-description">
            Advanced Industrial Automation, Life-Safety, Security & Cleanroom Hygiene

            HTI delivers advanced automation, fire safety, security, and cleanroom hygiene solutions with quality products and expert engineering, helping corporate and pharmaceutical industries achieve safer, smarter, and more efficient operations.          </p>

          <div className="hero-cta-group">
            <button className="btn-hero-red" onClick={onQuoteClick}>
              <span>Get Enquiry / Proposal</span>
              <ArrowRight size={17} />
            </button>
            <button className="btn-hero-outline" onClick={onExploreClick}>
              <span>Browse Catalog (30+ Systems)</span>
            </button>
          </div>

          {/* Key Value Highlights with soft-blue circle checkmarks */}
          <div className="hero-checkmarks">
            <div className="check-item">
              <div className="check-icon-circle">
                <CheckCircle2 size={16} />
              </div>
              <span>Turnkey Design & Execution</span>
            </div>
            <div className="check-item">
              <div className="check-icon-circle">
                <CheckCircle2 size={16} />
              </div>
              <span>USFDA / cGMP & WHO-GMP Ready</span>
            </div>
            <div className="check-item">
              <div className="check-icon-circle">
                <CheckCircle2 size={16} />
              </div>
              <span>Dedicated Engineering Team</span>
            </div>
          </div>
        </div>

        {/* Right Column: Cleanroom Automation Facility with 3D Flip Image Carousel */}
        <div className="hero-visual">
          <div className="hero-visual-frame">
            {/* 3D Flip Carousel Scene */}
            <div 
              className="hero-carousel-3d-scene" 
              style={{ transform: `rotateY(${rotationDeg}deg)` }}
            >
              {/* Face A */}
              <div className="hero-flip-face hero-flip-face-a">
                <img 
                  src={CAROUSEL_SLIDES[faceASlide].image} 
                  alt={CAROUSEL_SLIDES[faceASlide].alt} 
                  className="hero-cleanroom-img"
                  loading="eager"
                />
              </div>

              {/* Face B (rotated 180deg) */}
              <div className="hero-flip-face hero-flip-face-b">
                <img 
                  src={CAROUSEL_SLIDES[faceBSlide].image} 
                  alt={CAROUSEL_SLIDES[faceBSlide].alt} 
                  className="hero-cleanroom-img"
                  loading="eager"
                />
              </div>
            </div>

            {/* Dynamic White & Red Wave Swoop Divider */}
            <div className="hero-swoop-container">
              <svg className="hero-swoop-svg" viewBox="0 0 120 400" preserveAspectRatio="none">
                <path d="M 0,0 C 70,120 20,260 120,400 L 0,400 Z" fill="#ffffff" />
                <path d="M 0,0 C 70,120 20,260 120,400" stroke="#e63946" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Floating Top-Left Glass Card: Smart Automation. Safer Tomorrow. */}
            <div className="floating-smart-card">
              <div className="smart-card-icon-box">
                <div className="smart-shield-outer">
                  <ShieldCheck size={28} className="smart-shield-icon" />
                </div>
              </div>
              <div className="smart-card-text-block">
                <div className="smart-heading-1">Smart Automation.</div>
                <div className="smart-heading-2">Safer Tomorrow.</div>
                <div className="smart-red-accent-line"></div>
              </div>
            </div>

            {/* Glowing Translucent Shield Lock Badge overlaid on terminal */}
            <div className="floating-shield-lock-badge">
              <svg viewBox="0 0 70 82" className="shield-svg-shape">
                <path
                  d="M 35,4 C 55,4 66,14 66,32 C 66,54 48,72 35,78 C 22,72 4,54 4,32 C 4,14 15,4 35,4 Z"
                  fill="rgba(255, 255, 255, 0.22)"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="shield-lock-icon-wrap">
                <Lock size={26} className="shield-lock-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Banner Matching Reference Image */}
      <div ref={statsRef} className="container hero-stats-container">
        <div className="stats-glass-strip">
          <div className="stat-col">
            <div className="stat-icon-circle">
              <Award size={22} className="stat-circle-icon" />
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
              <Cpu size={22} className="stat-circle-icon" />
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
              <Building2 size={22} className="stat-circle-icon" />
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
              <Users size={22} className="stat-circle-icon" />
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

      {/* Decorative Bottom Right Red Corner Swoop */}
      <div className="hero-corner-swoop">
        <svg viewBox="0 0 200 60" preserveAspectRatio="none">
          <path d="M 0,60 C 80,60 120,20 200,0 L 200,60 Z" fill="#e63946" />
        </svg>
      </div>
    </section>
  );
}

