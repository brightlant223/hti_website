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

// Complete static seed data fallback for resilient offline loading
import { productsData } from './data/productsData';
import { getProductBySlug } from './data/productCatalogueData';
import { scrollToTop, scrollToElement } from './utils/scroll';

// Helper to determine initial page and parameter from URL path
const parseUrlRoute = () => {
  if (typeof window === 'undefined') return { page: 'home', param: null };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Check product detail route /product/:slug or /products/:slug
  if (path.startsWith('/product/') || path.startsWith('/products/') || hash.startsWith('#/product/') || hash.startsWith('#/products/')) {
    const rawSlug = (path.startsWith('/product/') ? path.replace('/product/', '') : path.startsWith('/products/') ? path.replace('/products/', '') : hash.startsWith('#/product/') ? hash.replace('#/product/', '') : hash.replace('#/products/', '')).replace(/\/$/, '');
    if (rawSlug === 'touchless-entry' || rawSlug === 'touchless-entry-solutions') return { page: 'touchless-entry', param: null };
    if (rawSlug === 'perimeter-gate' || rawSlug === 'automatic-sliding-swing-gates') return { page: 'perimeter-gate', param: null };
    if (rawSlug === 'trackless-gate' || rawSlug === 'telescopic-cantilever-gates') return { page: 'trackless-gate', param: null };
    if (rawSlug === 'rapid-airlock' || rawSlug === 'pvc-rapid-roll-up-doors' || rawSlug === 'high-speed-roll-up-doors') return { page: 'rapid-airlock', param: null };
    if (rawSlug === 'logistics-bridge' || rawSlug === 'dock-levellers-dock-shelters') return { page: 'logistics-bridge', param: null };
    if (rawSlug === 'heavy-security' || rawSlug === 'motorized-rolling-shutters' || rawSlug === 'motorized-industrial-rolling-shutters') return { page: 'heavy-security', param: null };
    return { page: 'product', param: rawSlug };
  }

  // Check dedicated product catalogue route (/catalog or /products)
  if (path === '/catalog' || path === '/catalog/' || path === '/catalogue' || path === '/products' || path === '/products/' || hash === '#/catalog' || hash === '#catalog') {
    return { page: 'catalog', param: null };
  }

  // Check dedicated category pages
  if (path === '/automation' || path === '/automation/' || hash === '#/automation') {
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

  // Check dedicated company and client pages
  if (path === '/clients' || path === '/clients/' || hash === '#/clients') {
    return { page: 'clients', param: null };
  }
  if (path === '/about' || path === '/about/' || hash === '#/about') {
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
    return { page: 'product', param: 'door-interlock-system' };
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

  return { page: 'home', param: null };
};

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
    total_blogs: 3
  });
  const [partners, setPartners] = useState([]);
  const [clients, setClients] = useState([]);
  const [inquiryCount, setInquiryCount] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProductModal, setActiveProductModal] = useState(null);

  const [prefilledProduct, setPrefilledProduct] = useState('');
  const [prefilledCategory, setPrefilledCategory] = useState('');

  const [isAdminOpen, setIsAdminOpen] = useState(false);

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
      targetUrl = `/product/${paramOrSection}`;
      targetParam = paramOrSection;
    } else if (page === 'catalog') {
      targetUrl = '/catalog';
      targetParam = paramOrSection;
    } else if (page === 'home' && paramOrSection === 'catalog') {
      targetUrl = '/catalog';
      targetPage = 'catalog';
      targetParam = 'all';
    } else if (page === 'touchless-entry') {
      targetUrl = '/touchless-entry';
    } else if (['perimeter-gate', 'trackless-gate', 'rapid-airlock', 'logistics-bridge', 'heavy-security'].includes(page)) {
      targetUrl = `/${page}`;
    } else if (['automation', 'security-systems', 'cleanroom-interlocks', 'perimeter-defense', 'fire-protection', 'hygiene', 'server-room-monitoring', 'clients', 'about', 'contact', 'partners', 'blogs', 'careers'].includes(page)) {
      targetUrl = `/${page}`;
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
        {/* ROUTE 0: Dedicated Reference-Matched Touchless Entry Solutions Page */}
        {(routeState.page === 'touchless-entry' || (routeState.page === 'product' && (routeState.param === 'touchless-entry' || routeState.param === 'touchless-entry-solutions'))) && (
          <TouchlessEntryPage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {/* Dedicated Industrial Access Product Pages */}
        {(routeState.page === 'perimeter-gate' || (routeState.page === 'product' && (routeState.param === 'perimeter-gate' || routeState.param === 'automatic-sliding-swing-gates'))) && (
          <PerimeterGatePage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {(routeState.page === 'trackless-gate' || (routeState.page === 'product' && (routeState.param === 'trackless-gate' || routeState.param === 'telescopic-cantilever-gates'))) && (
          <TracklessGatePage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {(routeState.page === 'rapid-airlock' || (routeState.page === 'product' && (routeState.param === 'rapid-airlock' || routeState.param === 'pvc-rapid-roll-up-doors' || routeState.param === 'high-speed-roll-up-doors'))) && (
          <RapidAirlockPage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {(routeState.page === 'logistics-bridge' || (routeState.page === 'product' && (routeState.param === 'logistics-bridge' || routeState.param === 'dock-levellers-dock-shelters'))) && (
          <LogisticsBridgePage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {(routeState.page === 'heavy-security' || (routeState.page === 'product' && (routeState.param === 'heavy-security' || routeState.param === 'motorized-rolling-shutters' || routeState.param === 'motorized-industrial-rolling-shutters'))) && (
          <HeavySecurityPage
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {/* ROUTE 1: Product Detail Page (/product/:slug) */}
        {routeState.page === 'product' && 
          !['touchless-entry', 'touchless-entry-solutions', 'perimeter-gate', 'trackless-gate', 'rapid-airlock', 'logistics-bridge', 'heavy-security', 'automatic-sliding-swing-gates', 'telescopic-cantilever-gates', 'pvc-rapid-roll-up-doors', 'high-speed-roll-up-doors', 'dock-levellers-dock-shelters', 'motorized-rolling-shutters', 'motorized-industrial-rolling-shutters'].includes(routeState.param) && (
          (routeState.param === 'door-interlock-system' || routeState.param === 'door-interlock-systems') ? (
            <PharmaCleanroomDetailView
              product={activeProduct || { slug: 'door-interlock-system' }}
              onNavigate={navigateTo}
              onQuoteSubmit={handleInquirySubmitted}
            />
          ) : (
            <ProductDetailPage
              product={activeProduct}
              onNavigate={navigateTo}
              onQuoteSubmit={handleInquirySubmitted}
            />
          )
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
        {['automation', 'security-systems', 'cleanroom-interlocks', 'perimeter-defense', 'fire-protection', 'hygiene', 'server-room-monitoring'].includes(routeState.page) && (
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

        {/* ROUTE 4: Dedicated About Us Page (/about) */}
        {routeState.page === 'about' && (
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
      </main>

      {/* Product Deep-Dive Modal (if triggered from catalog) */}
      {activeProductModal && (
        <ProductModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onInquire={handleQuickQuote}
        />
      )}

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onProductsChanged={handleRefreshProducts}
        onBlogsChanged={handleRefreshBlogs}
        onClientsChanged={handleRefreshClients}
        onProjectsChanged={handleRefreshProjects}
        onContentChanged={handleRefreshContent}
      />

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
