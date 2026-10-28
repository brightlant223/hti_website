import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Segments from './components/Segments';
import ProductShowcase from './components/ProductShowcase';
import ProductsCatalog from './components/ProductsCatalog';
import ProductModal from './components/ProductModal';
import DoorInterlockSimulator from './components/DoorInterlockSimulator';
import PartnersClients from './components/PartnersClients';
import BlogsSection from './components/BlogsSection';
import InsightsAndQuote from './components/InsightsAndQuote';
import ClientsPage from './components/ClientsPage';
import AboutUs from './components/AboutUs';
import ContactInquiry from './components/ContactInquiry';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import WhatsAppAndChatbot from './components/WhatsAppAndChatbot';

// Dedicated Separate Pages
import ProductDetailPage from './components/ProductDetailPage';
import CategoryPage from './components/CategoryPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PartnersPage from './components/PartnersPage';
import BlogsPage from './components/BlogsPage';
import CareersPage from './components/CareersPage';
import PharmaCleanroomDetailView from './components/PharmaCleanroomDetailView';
import TouchlessEntryPage from './components/TouchlessEntryPage';
import PerimeterGatePage from './components/PerimeterGatePage';
import TracklessGatePage from './components/TracklessGatePage';
import RapidAirlockPage from './components/RapidAirlockPage';
import LogisticsBridgePage from './components/LogisticsBridgePage';
import HeavySecurityPage from './components/HeavySecurityPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import { FIRE_SAFETY_PAGES } from './data/fireSafetyPagesData';

// Slug list for Fire Protection & Life Safety detail pages
const FIRE_SAFETY_SLUGS = [
  'addressable-fire-alarms',
  'hydrant-sprinkler-arrays',
  'fire-rated-doors-shutters',
  'public-address-system',
  'gas-leak-detection',
  'emergency-auto-trip'
];

// Unified list of all 36 service slugs across all 6 categories + aliases
const ALL_SERVICE_SLUGS = [
  ...FIRE_SAFETY_SLUGS,
  'fire-alarm-system',
  'fire-alarm-systems',
  'fire-alarm',
  'addressable-fire-alarm-system',
  'fire-hydrant-sprinkler-systems',
  'fire-hydrant-sprinklers',
  'hydrant-sprinkler-systems',
  'fire-rated-doors-shutters',
  'fire-rated-steel-doors',
  'fire-doors-shutters',
  'fire-rated-doors',
  'public-address-systems',
  'public-address',
  'pa-voice-evacuation',
  'gas-detection-systems',
  'gas-suppression-systems',
  'clean-agent-gas-suppression',
  'auto-trip-integration',
  'emergency-trip-system',

  // Cleanroom Interlocks & Pass Boxes
  'door-interlock-system',
  'door-interlock-systems',
  'door-interlock-2-8-door',
  'cleanroom-door-interlocks',
  'pass-box-systems',
  'pass-box-system',
  'digital-clocks',
  'digital-gps-clocks',
  'digital-clock',
  'chiller-cleanroom-doors',
  'chiller-clean-room-doors',
  'acoustic-sound-doors',
  'sound-proof-doors',
  'safety-override-buzzers',

  // Perimeter Defense & Traffic Control
  'boom-barriers',
  'boom-barrier',
  'automatic-boom-barriers',
  'electro-hydraulic-boom-barriers',
  'turnstiles-flap-barriers-speed-gates',
  'optical-turnstiles',
  'optical-speed-turnstiles',
  'speed-gates',
  'flap-barriers',
  'turnstiles',
  'turnstiles-flap-barriers',
  'crash-bollards-tyre-killers',
  'crash-bollards',
  'tyre-killers-bollards',
  'tyre-killers',
  'bollards-tyre-killers-car-lifts',
  'bollards-tyre-killers',
  'car-lift-systems',
  'car-lift',
  'car-lifts',
  'hydraulic-car-lifts',
  'parking-management-systems',
  'parking-management-system',
  'parking-management',
  'parking-intrusion-alarms',
  'visitor-management-system',
  'visitor-management-systems',
  'visitor-management',

  // CCTV Surveillance & Biometrics
  'cctv-surveillance-systems',
  'cctv-surveillance-system',
  'cctv-surveillance',
  '4k-ai-cctv-systems',
  'biometric-access-control',
  'biometric-access',
  'biometric-access-attendance',
  'biometric-attendance-access-terminals',
  'video-door-phones',
  'video-door-phone',
  'central-vms-command',
  'central-vms-command-systems',
  'central-vms',
  'thermal-perimeter-beams',
  'thermal-perimeter-beam',
  'intrusion-detection-alarms',
  'intrusion-detection',
  'wireless-intrusion-detection',

  // Server Room & Critical Monitoring
  'server-room-environment-monitoring',
  'server-room-monitoring',
  'server-room-ems',
  'server-room-telemetry',
  'server-room-alert-monitor',
  'water-leak-detection-systems',
  'water-leak-detection',
  'water-leak-detector',
  'underfloor-water-leak-detection',
  'hazardous-gas-detection-arrays',
  'hazardous-gas-detection',
  'gas-leak-detector',
  'battery-room-gas-detector',
  'alarm-annunciators',
  'alarm-annunciators-panel',
  'alarm-annunciator-panels',
  'microprocessor-annunciators',
  'differential-pressure-monitors',
  'differential-pressure-monitor',
  'rodent-repellent-systems',
  'rodent-repellent',
  'ultrasonic-rodent-repellent'
];

// Complete static seed data fallback for resilient offline loading
import { productsData } from './data/productsData';
import { getProductBySlug } from './data/productCatalogueData';
import { scrollToTop, scrollToElement } from './utils/scroll';

// Helper to determine initial page and parameter from URL path
const parseUrlRoute = () => {
  if (typeof window === 'undefined') return { page: 'home', param: null };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Check dedicated product detail route /product/:slug or /products/:slug
  if (path.startsWith('/product/') || path.startsWith('/products/') || hash.startsWith('#/product/') || hash.startsWith('#/products/')) {
    const rawSlug = (
      path.startsWith('/product/') ? path.replace('/product/', '') :
        path.startsWith('/products/') ? path.replace('/products/', '') :
          hash.startsWith('#/product/') ? hash.replace('#/product/', '') :
            hash.replace('#/products/', '')
    ).replace(/\/$/, '');

    if (ALL_SERVICE_SLUGS.includes(rawSlug)) {
      return { page: rawSlug, param: null };
    }
    return { page: 'product', param: rawSlug };
  }

  // Check service detail route /services/:slug
  if (path.startsWith('/services/') || hash.startsWith('#/services/')) {
    const rawSlug = (
      path.startsWith('/services/') ? path.replace('/services/', '') :
        hash.replace('#/services/', '')
    ).replace(/\/$/, '');

    if (rawSlug === 'touchless-entry' || rawSlug === 'touchless-entry-solutions') return { page: 'touchless-entry', param: null };
    if (rawSlug === 'perimeter-gate') return { page: 'perimeter-gate', param: null };
    if (rawSlug === 'trackless-gate') return { page: 'trackless-gate', param: null };
    if (rawSlug === 'rapid-airlock') return { page: 'rapid-airlock', param: null };
    if (rawSlug === 'logistics-bridge') return { page: 'logistics-bridge', param: null };
    if (rawSlug === 'heavy-security') return { page: 'heavy-security', param: null };
    return { page: rawSlug, param: null };
  }

  // Direct service slug route check (e.g. /boom-barriers, /pass-box-systems)
  const cleanPath = path.replace(/^\/|\/$/g, '');
  if (ALL_SERVICE_SLUGS.includes(cleanPath)) {
    return { page: cleanPath, param: null };
  }

  // Check dedicated product catalogue route (/catalog or /products)
  if (path === '/catalog' || path === '/catalog/' || path === '/catalogue' || path === '/products' || path === '/products/' || hash === '#/catalog' || hash === '#catalog') {
    return { page: 'catalog', param: null };
  }

  // Check dedicated category pages
  if (path === '/automation' || path === '/automation/' || path === '/access-automation' || path === '/access-automation/' || hash === '#/automation' || hash === '#/access-automation') {
    return { page: 'automation', param: null };
  }
  if (path === '/security-systems' || path === '/security-systems/' || path === '/security' || hash === '#/security-systems') {
    return { page: 'security-systems', param: null };
  }
  if (path === '/cleanroom-interlocks' || path === '/cleanroom-interlocks/' || path === '/interlocks' || hash === '#/cleanroom-interlocks') {
    return { page: 'cleanroom-interlocks', param: null };
  }
  if (path === '/perimeter-defense' || path === '/perimeter-defense/' || path === '/perimeter' || hash === '#/perimeter-defense') {
    return { page: 'perimeter-defense', param: null };
  }
  if (path === '/fire-protection' || path === '/fire-protection/' || path === '/fire' || path === '/fire-safety' || hash === '#/fire-protection') {
    return { page: 'fire-protection', param: null };
  }
  if (path === '/hygiene' || path === '/hygiene/' || hash === '#/hygiene') {
    return { page: 'hygiene', param: null };
  }
  if (path === '/server-room-monitoring' || path === '/server-room-monitoring/' || path === '/critical-monitoring' || path === '/critical-monitoring/' || path === '/monitoring' || hash === '#/server-room-monitoring') {
    return { page: 'server-room-monitoring', param: null };
  }

  // Check admin portal route (/admin, /admin-login, /login, /admin/login)
  const cleanPathLower = (path || '').toLowerCase().replace(/\/$/, '');
  const cleanHashLower = (hash || '').toLowerCase().replace(/\/$/, '');
  if (
    cleanPathLower === '/admin' ||
    cleanPathLower === '/admin-login' ||
    cleanPathLower === '/login' ||
    cleanPathLower === '/admin/login' ||
    cleanHashLower === '#/admin' ||
    cleanHashLower === '#admin' ||
    cleanHashLower === '#/admin-login' ||
    cleanHashLower === '#admin-login' ||
    cleanHashLower === '#/login' ||
    cleanHashLower === '#login'
  ) {
    return { page: 'home', param: null, openAdmin: true };
  }

  // Check dedicated company and client pages
  if (path === '/clients' || path === '/clients/' || hash === '#/clients') {
    return { page: 'clients', param: null };
  }
  if (path === '/about' || path === '/about/' || hash === '#/about' || path === '/company' || path === '/company/' || hash === '#/company' || hash === '#company') {
    return { page: 'about', param: null };
  }
  if (path === '/contact' || path === '/contact/' || hash === '#/contact') {
    return { page: 'contact', param: null };
  }
  if (path === '/partners' || path === '/partners/' || hash === '#/partners') {
    return { page: 'partners', param: null };
  }
  if (path === '/blogs' || path === '/blogs/' || hash === '#/blogs') {
    return { page: 'blogs', param: null };
  }
  if (path === '/careers' || path === '/careers/' || hash === '#/careers') {
    return { page: 'careers', param: null };
  }
  if (path === '/door-interlock-system' || path === '/door-interlock-system/' || path === '/door-interlock-systems' || hash === '#/door-interlock-system') {
    return { page: 'door-interlock-system', param: null };
  }
  if (path === '/touchless-entry' || path === '/touchless-entry/' || path === '/touchless-entry-solutions' || path === '/services/touchless-entry' || hash === '#/touchless-entry' || hash === '#touchless-entry') {
    return { page: 'touchless-entry', param: null };
  }
  if (path === '/perimeter-gate' || path === '/perimeter-gate/' || path === '/automatic-sliding-swing-gates' || path === '/services/perimeter-gate' || hash === '#/perimeter-gate') {
    return { page: 'perimeter-gate', param: null };
  }
  if (path === '/trackless-gate' || path === '/trackless-gate/' || path === '/telescopic-cantilever-gates' || path === '/services/trackless-gate' || hash === '#/trackless-gate') {
    return { page: 'trackless-gate', param: null };
  }
  if (path === '/rapid-airlock' || path === '/rapid-airlock/' || path === '/pvc-rapid-roll-up-doors' || path === '/high-speed-roll-up-doors' || path === '/services/rapid-airlock' || hash === '#/rapid-airlock') {
    return { page: 'rapid-airlock', param: null };
  }
  if (path === '/logistics-bridge' || path === '/logistics-bridge/' || path === '/dock-levellers-dock-shelters' || path === '/services/logistics-bridge' || hash === '#/logistics-bridge') {
    return { page: 'logistics-bridge', param: null };
  }
  if (path === '/heavy-security' || path === '/heavy-security/' || path === '/motorized-rolling-shutters' || path === '/motorized-industrial-rolling-shutters' || path === '/services/heavy-security' || hash === '#/heavy-security') {
    return { page: 'heavy-security', param: null };
  }

  // Check Fire Protection & Life Safety detail pages
  if (path === '/addressable-fire-alarms' || path === '/addressable-fire-alarms/' || path === '/services/addressable-fire-alarms' || path === '/fire-alarm-system' || hash === '#/addressable-fire-alarms') {
    return { page: 'addressable-fire-alarms', param: null };
  }
  if (path === '/hydrant-sprinkler-arrays' || path === '/hydrant-sprinkler-arrays/' || path === '/services/hydrant-sprinkler-arrays' || path === '/fire-hydrant-sprinklers' || path === '/fire-hydrant-sprinkler-systems' || hash === '#/hydrant-sprinkler-arrays') {
    return { page: 'hydrant-sprinkler-arrays', param: null };
  }
  if (path === '/fire-rated-doors-shutters' || path === '/fire-rated-doors-shutters/' || path === '/services/fire-rated-doors-shutters' || path === '/fire-rated-doors' || hash === '#/fire-rated-doors-shutters') {
    return { page: 'fire-rated-doors-shutters', param: null };
  }
  if (path === '/public-address-system' || path === '/public-address-system/' || path === '/services/public-address-system' || path === '/public-address' || hash === '#/public-address-system') {
    return { page: 'public-address-system', param: null };
  }
  if (path === '/gas-leak-detection' || path === '/gas-leak-detection/' || path === '/services/gas-leak-detection' || path === '/gas-detection' || path === '/gas-detection-systems' || hash === '#/gas-leak-detection') {
    return { page: 'gas-leak-detection', param: null };
  }
  if (path === '/emergency-auto-trip' || path === '/emergency-auto-trip/' || path === '/services/emergency-auto-trip' || path === '/auto-trip-integration' || hash === '#/emergency-auto-trip') {
    return { page: 'emergency-auto-trip', param: null };
  }

  return { page: 'home', param: null };
};

// Robust Error Boundary to guarantee no white screens on unexpected component errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured UI runtime error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '30px',
          margin: '20px auto',
          maxWidth: '600px',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #fecaca',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          textAlign: 'center',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          <h3 style={{ color: '#b91c1c', marginBottom: '8px', fontSize: '1.25rem' }}>
            {this.props.fallbackTitle || 'Unable to render component'}
          </h3>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '16px' }}>
            An unexpected error occurred: {this.state.error?.message || 'Unknown runtime error'}.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
              else window.location.reload();
            }}
            style={{
              padding: '10px 20px',
              background: '#075be8',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Retry / Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [routeState, setRouteState] = useState(parseUrlRoute);
  const [products, setProducts] = useState(productsData);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total_products: 33,
    total_categories: 4,
    total_partners: 15,
    total_clients: 100,
    total_inquiries: 1,
    total_blogs: 6
  });
  const [partners, setPartners] = useState([]);
  const [clients, setClients] = useState([]);
  const [inquiryCount, setInquiryCount] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProductModal, setActiveProductModal] = useState(null);

  const [prefilledProduct, setPrefilledProduct] = useState('');
  const [prefilledCategory, setPrefilledCategory] = useState('');

  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    try {
      return Boolean(parseUrlRoute().openAdmin);
    } catch {
      return false;
    }
  });

  // Theme management ('light' | 'dark' | 'system')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hti_theme') || 'light';
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    const saved = localStorage.getItem('hti_theme') || 'light';
    if (saved === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return saved;
  });

  useEffect(() => {
    const applyTheme = (themeName) => {
      let resolved = themeName;
      if (themeName === 'system') {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolved = prefersDark ? 'dark' : 'light';
      }
      setResolvedTheme(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
      if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('hti_theme', themeName);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (theme === 'system') {
        const resolved = e.matches ? 'dark' : 'light';
        setResolvedTheme(resolved);
        document.documentElement.setAttribute('data-theme', resolved);
        if (resolved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    // Listen for tab sync
    const handleStorageChange = (e) => {
      if (e.key === 'hti_theme' && e.newValue) {
        setTheme(e.newValue);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [theme]);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parseUrlRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Open admin login modal if requested by URL route
  useEffect(() => {
    if (routeState.openAdmin) {
      setIsAdminOpen(true);
    }
  }, [routeState]);

  // Fetch product list from SQLite backend if available
  const fetchProducts = async () => {
    try {
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (Array.isArray(prodData) && prodData.length > 0) {
          setProducts(prodData);
        }
      }
    } catch (err) {
      console.warn('Note: Using integrated products catalog', err);
    }
  };

  // Fetch blogs list from SQLite backend
  const fetchBlogs = async () => {
    try {
      const blogRes = await fetch('/api/blogs');
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        if (Array.isArray(blogData)) {
          setBlogs(blogData);
        }
      }
    } catch (err) {
      console.warn('Note: Could not refresh blogs from API', err);
    }
  };

  // Fetch stats from SQLite backend
  const fetchStats = async () => {
    try {
      const statsRes = await fetch('/api/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
        if (statsData.total_inquiries !== undefined) {
          setInquiryCount(statsData.total_inquiries);
        }
      }
    } catch (err) {
      console.warn('Note: Could not refresh stats from API', err);
    }
  };

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await Promise.allSettled([
          fetchProducts(),
          fetchBlogs(),
          fetchStats(),
          (async () => {
            const partRes = await fetch('/api/partners');
            if (partRes.ok) {
              const partData = await partRes.json();
              if (Array.isArray(partData) && partData.length > 0) setPartners(partData);
            }
          })(),
          (async () => {
            const clientRes = await fetch('/api/clients');
            if (clientRes.ok) {
              const clientData = await clientRes.json();
              if (Array.isArray(clientData) && clientData.length > 0) setClients(clientData);
            }
          })()
        ]);
      } catch (err) {
        console.warn('Backend API connection note: Using integrated state fallback', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleRefreshProducts = () => {
    fetchProducts();
    fetchStats();
  };

  const handleRefreshBlogs = () => {
    fetchBlogs();
    fetchStats();
  };

  const fetchClients = async () => {
    try {
      const clientRes = await fetch('/api/clients');
      if (clientRes.ok) {
        const clientData = await clientRes.json();
        if (Array.isArray(clientData)) setClients(clientData);
      }
    } catch (err) {
      console.warn('Note: Could not refresh clients from API', err);
    }
  };

  const handleRefreshClients = () => {
    fetchClients();
    fetchStats();
  };

  const handleRefreshProjects = () => {
    fetchStats();
  };

  const handleRefreshContent = () => {
    fetchStats();
  };

  // Centralized page, category, and product navigation
  const navigateTo = (page, paramOrSection = null) => {
    let targetUrl = '/';
    let targetPage = page;
    let targetParam = null;

    if (page === 'product') {
      if (paramOrSection && ALL_SERVICE_SLUGS.includes(paramOrSection)) {
        targetUrl = `/${paramOrSection}`;
        targetPage = paramOrSection;
        targetParam = null;
      } else {
        targetUrl = `/product/${paramOrSection}`;
        targetPage = 'product';
        targetParam = paramOrSection;
      }
    } else if (page === 'catalog') {
      targetUrl = '/catalog';
      targetParam = paramOrSection;
    } else if (page === 'home' && paramOrSection === 'catalog') {
      targetUrl = '/catalog';
      targetPage = 'catalog';
      targetParam = 'all';
    } else if (page === 'touchless-entry') {
      targetUrl = '/touchless-entry';
    } else if (['perimeter-gate', 'trackless-gate', 'rapid-airlock', 'logistics-bridge', 'heavy-security', ...ALL_SERVICE_SLUGS].includes(page)) {
      targetUrl = `/${page}`;
    } else if (['automation', 'access-automation', 'security-systems', 'cleanroom-interlocks', 'perimeter-defense', 'fire-protection', 'hygiene', 'server-room-monitoring', 'clients', 'about', 'contact', 'partners', 'blogs', 'careers'].includes(page)) {
      const canonicalPage = page === 'access-automation' ? 'automation' : page;
      targetUrl = `/${canonicalPage}`;
      targetPage = canonicalPage;
    } else if (page === 'admin' || page === 'admin-login' || page === 'login') {
      targetUrl = '/admin';
      targetPage = 'home';
      setIsAdminOpen(true);
      setRouteState({ page: 'home', param: null, openAdmin: true });
      if (window.location.pathname !== '/admin') {
        window.history.pushState({}, '', '/admin');
      }
      return;
    } else if (page === 'home') {
      targetUrl = '/';
    }

    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }

    setRouteState({ page: targetPage, param: targetParam });

    // Handle scroll to specific ID if navigating to home section
    if (page === 'home' && typeof paramOrSection === 'string' && !paramOrSection.includes('/')) {
      if (paramOrSection === 'hero') {
        scrollToTop();
      } else {
        setTimeout(() => {
          const el = document.getElementById(paramOrSection);
          if (el) {
            scrollToElement(el);
          } else {
            scrollToTop();
          }
        }, 60);
      }
    } else {
      scrollToTop();
    }
  };

  const handleSelectSegment = (segmentId) => {
    // If user clicked category, navigate directly to that category's dedicated page!
    const cleanId = segmentId.toLowerCase();
    if (cleanId.includes('auto')) {
      navigateTo('automation');
    } else if (cleanId.includes('sec')) {
      navigateTo('security-systems');
    } else if (cleanId.includes('interlock')) {
      navigateTo('cleanroom-interlocks');
    } else if (cleanId.includes('perim')) {
      navigateTo('perimeter-defense');
    } else if (cleanId.includes('fire')) {
      navigateTo('fire-protection');
    } else if (cleanId.includes('monitor') || cleanId.includes('server')) {
      navigateTo('server-room-monitoring');
    } else if (cleanId.includes('hyg')) {
      navigateTo('hygiene');
    } else {
      setSelectedCategory(segmentId);
      navigateTo('home', 'catalog');
    }
  };

  const handleQuickQuote = (productName, category) => {
    setPrefilledProduct(productName);
    setPrefilledCategory(category);
    navigateTo('contact');
  };

  const scrollToContact = () => {
    navigateTo('contact');
  };

  const scrollToCatalog = () => {
    navigateTo('catalog', 'all');
  };

  const scrollToDemo = () => {
    navigateTo('cleanroom-interlocks');
  };

  const handleInquirySubmitted = () => {
    setInquiryCount((prev) => prev + 1);
    fetchStats();
  };

  // Find active product for product detail route (prioritize live database product)
  const activeProduct = routeState.page === 'product'
    ? (products.find(p => p.slug === routeState.param) || getProductBySlug(routeState.param) || productsData[0])
    : null;

  return (
    <div className="app-root">
      {/* Main Brightlant-Style Header & Mega Menus */}
      <Navbar
        currentPage={routeState.page}
        onNavigate={navigateTo}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminOpen={isAdminOpen}
        inquiryCount={inquiryCount}
        onSelectCategory={handleSelectSegment}
        theme={theme}
        resolvedTheme={resolvedTheme}
        onThemeChange={setTheme}
      />

      <main>
        {/* ROUTE 1: Dedicated Product Detail Page (/product/:slug) */}
        {routeState.page === 'product' && !ALL_SERVICE_SLUGS.includes(routeState.param) && (
          <ProductDetailPage
            product={activeProduct}
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {/* ROUTE 0: Dedicated Reference-Matched Touchless Entry Solutions Page */}
        {routeState.page === 'touchless-entry' && (
          <TouchlessEntryPage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {/* Dedicated Industrial Access Service Pages */}
        {routeState.page === 'perimeter-gate' && (
          <PerimeterGatePage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {routeState.page === 'trackless-gate' && (
          <TracklessGatePage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {routeState.page === 'rapid-airlock' && (
          <RapidAirlockPage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {routeState.page === 'logistics-bridge' && (
          <LogisticsBridgePage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {routeState.page === 'heavy-security' && (
          <HeavySecurityPage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {/* ROUTE: Dynamic Service Detail Pages across all categories */}
        {(ALL_SERVICE_SLUGS.includes(routeState.page) || (routeState.page === 'product' && ALL_SERVICE_SLUGS.includes(routeState.param))) && (
          <ServiceDetailPage
            slug={routeState.page === 'product' ? routeState.param : routeState.page}
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {/* ROUTE 2: Dedicated Full Product Catalogue (/catalog) */}
        {routeState.page === 'catalog' && (
          <div className="dedicated-catalog-page-wrapper">
            <ProductsCatalog
              initialCategory={routeState.param || selectedCategory || 'all'}
              isDedicatedPage={true}
              onSelectProduct={(p) => navigateTo('product', typeof p === 'string' ? p : (p?.slug || 'automatic-sliding-swing-doors'))}
              onNavigate={navigateTo}
              onQuickQuote={handleQuickQuote}
              dbProducts={products}
            />
          </div>
        )}

        {/* ROUTE 2: Category Pages (/automation, /security-systems, /cleanroom-interlocks, /perimeter-defense, /fire-protection, /hygiene, /server-room-monitoring) */}
        {['automation', 'access-automation', 'security-systems', 'cleanroom-interlocks', 'perimeter-defense', 'fire-protection', 'hygiene', 'server-room-monitoring'].includes(routeState.page) && (
          <CategoryPage
            categoryKey={routeState.page}
            onNavigate={navigateTo}
            onQuickQuote={handleQuickQuote}
          />
        )}

        {/* ROUTE 3: Dedicated Clients Page (/clients) */}
        {routeState.page === 'clients' && (
          <ClientsPage
            onNavigate={navigateTo}
            onQuoteClick={scrollToContact}
            onExploreCatalog={scrollToCatalog}
          />
        )}

        {/* ROUTE 4: Dedicated About Us / Company Page (/about, /company) */}
        {(routeState.page === 'about' || routeState.page === 'company') && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {/* ROUTE 5: Dedicated Contact Us Page (/contact) */}
        {routeState.page === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
            onInquirySubmitted={handleInquirySubmitted}
          />
        )}

        {/* ROUTE 6: Dedicated Technology Partners Page (/partners) */}
        {routeState.page === 'partners' && (
          <PartnersPage onNavigate={navigateTo} />
        )}

        {/* ROUTE 7: Dedicated Technical Blogs Page (/blogs) */}
        {routeState.page === 'blogs' && (
          <BlogsPage onNavigate={navigateTo} blogs={blogs} />
        )}

        {/* ROUTE 8: Dedicated Careers Page (/careers) */}
        {routeState.page === 'careers' && (
          <CareersPage onNavigate={navigateTo} />
        )}

        {/* ROUTE 9: Default Landing Home Page (/) */}
        {routeState.page === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              stats={stats}
              onExploreClick={scrollToCatalog}
              onDemoClick={scrollToDemo}
              onQuoteClick={scrollToContact}
              onNavigate={navigateTo}
            />

            {/* Concise, Image-Led Homepage Product Showcase */}
            <ProductShowcase
              onSelectCategory={(catId) => navigateTo('catalog', catId)}
              onSelectProduct={(slug) => navigateTo('product', slug)}
              onExploreCatalog={() => navigateTo('catalog', 'all')}
              onNavigate={navigateTo}
              onQuickQuote={handleQuickQuote}
            />

            {/* 3 Core Product Segments */}
            <Segments onSelectSegment={handleSelectSegment} />

            {/* Door Interlock Logic Simulator & Why Choose HTI */}
            <DoorInterlockSimulator
              onInquireInterlock={(name) => handleQuickQuote(name, 'Automation')}
            />

            {/* Global Technology Partners & Our Esteemed Clients */}
            <PartnersClients
              partners={partners}
              clients={clients}
              onViewAllClients={() => navigateTo('clients')}
              onNavigate={navigateTo}
            />

            {/* Engineering Insights & Case Studies AND Request a Technical Proposal / Quote */}
            <InsightsAndQuote
              onInquirySubmitted={handleInquirySubmitted}
              onNavigate={navigateTo}
            />
          </>
        )}

        {/* Fallback to Home if unknown route */}
        {![
          'product', 'catalog', 'automation', 'security-systems', 'cleanroom-interlocks',
          'perimeter-defense', 'fire-protection', 'hygiene', 'server-room-monitoring',
          'clients', 'about', 'contact', 'partners', 'blogs', 'careers', 'home',
          ...ALL_SERVICE_SLUGS
        ].includes(routeState.page) && (
          <Hero
            onQuoteClick={scrollToContact}
            onCatalogClick={scrollToCatalog}
            onDemoClick={scrollToDemo}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Product Deep-Dive Modal (if triggered from catalog) */}
      {activeProductModal && (
        <ProductModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onInquire={handleQuickQuote}
        />
      )}

      {/* Admin Panel wrapped in ErrorBoundary to guarantee graceful recovery */}
      <ErrorBoundary
        fallbackTitle="Admin Console Initialization Notice"
        onReset={() => setIsAdminOpen(false)}
      >
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => {
            setIsAdminOpen(false);
            if (
              window.location.pathname === '/admin' ||
              window.location.pathname === '/admin/' ||
              window.location.pathname === '/admin-login' ||
              window.location.pathname === '/login' ||
              window.location.hash.includes('admin') ||
              window.location.hash.includes('login')
            ) {
              window.history.pushState({}, '', '/');
            }
          }}
          onProductsChanged={handleRefreshProducts}
          onBlogsChanged={handleRefreshBlogs}
          onClientsChanged={handleRefreshClients}
          onProjectsChanged={handleRefreshProjects}
          onContentChanged={handleRefreshContent}
        />
      </ErrorBoundary>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Quick Connect & AI Chatbot Assistant */}
      <WhatsAppAndChatbot
        onNavigate={navigateTo}
        onQuoteClick={scrollToContact}
      />
    </div>
  );
}
