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
import AboutUs from './components/AboutUs';
import ContactInquiry from './components/ContactInquiry';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_products: 30,
    total_categories: 3,
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

  // Fetch product list from SQLite backend
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
      console.warn('Note: Could not refresh products from API', err);
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

  // Load initial data from SQLite backend
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

  const handleSelectSegment = (segmentId) => {
    setSelectedCategory(segmentId);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickQuote = (productName, category) => {
    setPrefilledProduct(productName);
    setPrefilledCategory(category);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemo = () => {
    const demoEl = document.getElementById('interlock-demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmitted = () => {
    setInquiryCount((prev) => prev + 1);
    fetchStats();
  };

  return (
    <div className="app-root">
      {/* Main Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        inquiryCount={inquiryCount}
        onSelectCategory={handleSelectSegment}
      />

      <main>
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
          onSelectProduct={(p) => setActiveProductModal(p)}
          onQuickQuote={handleQuickQuote}
        />

        {/* Interactive Cleanroom Interlock Simulator */}
        <DoorInterlockSimulator
          onInquireInterlock={(name) => handleQuickQuote(name, 'Automation')}
        />

        {/* Technology Partners & Clients */}
        <PartnersClients partners={partners} clients={clients} />

        {/* Technical Blogs & Industry Insights */}
        <BlogsSection blogs={blogs} />

        {/* Corporate Heritage & Core Values */}
        <AboutUs />

        {/* Quote Request Form & Mumbai Contact */}
        <ContactInquiry
          selectedProduct={prefilledProduct}
          selectedCategory={prefilledCategory}
          onInquirySubmitted={handleInquirySubmitted}
        />
      </main>

      {/* Product Deep-Dive Modal */}
      {activeProductModal && (
        <ProductModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onInquire={handleQuickQuote}
        />
      )}

      {/* Admin Panel (Full CMS Dashboard for Products, Blogs, Clients & Inquiries) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onProductsChanged={handleRefreshProducts}
        onBlogsChanged={handleRefreshBlogs}
        onClientsChanged={handleRefreshClients}
      />

      {/* Footer */}
      <Footer onCategoryClick={handleSelectSegment} />
    </div>
  );
}
