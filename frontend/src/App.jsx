import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Segments from './components/Segments';
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

// Dedicated Separate Pages
import ProductDetailPage from './components/ProductDetailPage';
import CategoryPage from './components/CategoryPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PartnersPage from './components/PartnersPage';
import BlogsPage from './components/BlogsPage';

// Complete static seed data fallback for resilient offline loading
import { productsData, getProductBySlug } from './data/productsData';

// Helper to determine initial page and parameter from URL path
const parseUrlRoute = () => {
  if (typeof window === 'undefined') return { page: 'home', param: null };
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Check product detail route /product/:slug
  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '').replace(/\/$/, '');
    return { page: 'product', param: slug };
  }
  if (hash.startsWith('#/product/')) {
    const slug = hash.replace('#/product/', '');
    return { page: 'product', param: slug };
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
  if (path === '/hygiene' || path === '/hygiene/' || hash === '#/hygiene') {
    return { page: 'hygiene', param: null };
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

  // Centralized page, category, and product navigation
  const navigateTo = (page, paramOrSection = null) => {
    let targetUrl = '/';
    let targetPage = page;
    let targetParam = null;

    if (page === 'product') {
      targetUrl = `/product/${paramOrSection}`;
      targetParam = paramOrSection;
    } else if (['automation', 'security-systems', 'cleanroom-interlocks', 'hygiene', 'clients', 'about', 'contact', 'partners', 'blogs'].includes(page)) {
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
      setTimeout(() => {
        const el = document.getElementById(paramOrSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    navigateTo('home', 'catalog');
  };

  const scrollToDemo = () => {
    navigateTo('cleanroom-interlocks');
  };

  const handleInquirySubmitted = () => {
    setInquiryCount((prev) => prev + 1);
    fetchStats();
  };

  // Find active product for product detail route
  const activeProduct = routeState.page === 'product' 
    ? (getProductBySlug(routeState.param) || products.find(p => p.slug === routeState.param) || productsData[0])
    : null;

  return (
    <div className="app-root">
      {/* Main Brightlant-Style Header & Mega Menus */}
      <Navbar
        currentPage={routeState.page}
        onNavigate={navigateTo}
        onOpenAdmin={() => setIsAdminOpen(false) /* or true */}
        inquiryCount={inquiryCount}
        onSelectCategory={handleSelectSegment}
      />

      <main>
        {/* ROUTE 1: Product Detail Page (/product/:slug) */}
        {routeState.page === 'product' && (
          <ProductDetailPage
            product={activeProduct}
            onNavigate={navigateTo}
            onQuoteSubmit={handleInquirySubmitted}
          />
        )}

        {/* ROUTE 2: Category Pages (/automation, /security-systems, /cleanroom-interlocks, /hygiene) */}
        {['automation', 'security-systems', 'cleanroom-interlocks', 'hygiene'].includes(routeState.page) && (
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
          <BlogsPage onNavigate={navigateTo} />
        )}

        {/* ROUTE 8: Default Landing Home Page (/) */}
        {routeState.page === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              stats={stats}
              onExploreClick={scrollToCatalog}
              onDemoClick={scrollToDemo}
              onQuoteClick={scrollToContact}
            />

            {/* 3 Core Product Segments */}
            <Segments onSelectSegment={handleSelectSegment} />

            {/* Product Catalog with Realtime Search & Category Tabs */}
            <ProductsCatalog
              products={products}
              loading={loading}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onSelectProduct={(p) => navigateTo('product', p.slug)}
              onQuickQuote={handleQuickQuote}
            />

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
      />

      {/* Footer */}
      <Footer 
        onCategoryClick={handleSelectSegment} 
        onNavigate={navigateTo}
      />
    </div>
  );
}
