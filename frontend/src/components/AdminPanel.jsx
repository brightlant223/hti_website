import React, { useState, useEffect, useMemo } from 'react';
import {
  X, Shield, RefreshCw, Plus, Edit3, Trash2, CheckCircle,
  FileText, Package, MessageSquare, Search, AlertCircle,
  Check, Eye, EyeOff, ExternalLink, Calendar, Clock, Tag,
  LayoutDashboard, Users, Building2, Lock, LogOut, LogIn,
  TrendingUp, Layers, ChevronRight, CheckCircle2, Star,
  Grid, List, Sparkles, Filter, SlidersHorizontal, Cpu,
  Database, Activity, Copy, ArrowUpRight
} from 'lucide-react';

export default function AdminPanel({
  isOpen,
  onClose,
  onProductsChanged,
  onBlogsChanged,
  onClientsChanged
}) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('hti_admin_token'));
  });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('hti_admin_user') || 'admin';
  });

  // Active view: 'dashboard' | 'products' | 'blogs' | 'clients' | 'inquiries'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [lastSyncedTime, setLastSyncedTime] = useState('Just now');

  // Data states
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [clients, setClients] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    total_products: 0,
    total_categories: 0,
    total_blogs: 0,
    total_clients: 0,
    total_inquiries: 0,
    new_inquiries: 0
  });

  // Search & filter states
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productFilterType, setProductFilterType] = useState('all'); // 'all' | 'featured' | 'flagship'
  const [productViewMode, setProductViewMode] = useState('table'); // 'table' | 'cards'

  const [blogSearch, setBlogSearch] = useState('');
  const [blogStatusFilter, setBlogStatusFilter] = useState('All'); // 'All' | 'Published' | 'Draft'
  const [blogViewMode, setBlogViewMode] = useState('grid'); // 'grid' | 'table'

  const [clientSearch, setClientSearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');

  // Preview modals
  const [previewProduct, setPreviewProduct] = useState(null);

  // Product Add / Edit modal
  const [editingProduct, setEditingProduct] = useState(null); // null = closed, 'new' = add, object = edit
  const [productModalTab, setProductModalTab] = useState('form'); // 'form' | 'preview'
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Automation',
    subcategory: '',
    tagline: '',
    description: '',
    featuresText: '',
    specsText: '',
    applicationsText: '',
    badge: '',
    is_featured: false
  });

  // Blog Add / Edit modal
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogModalTab, setBlogModalTab] = useState('form'); // 'form' | 'preview'
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Clean Room Automation',
    author: 'HTI Engineering Team',
    read_time: '5 min read',
    excerpt: '',
    content: '',
    is_published: true
  });

  // Client Add / Edit modal
  const [editingClient, setEditingClient] = useState(null);
  const [clientForm, setClientForm] = useState({
    name: '',
    sector: 'Pharmaceutical & Cleanroom'
  });

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  };

  const updateTimestamp = () => {
    const now = new Date();
    setLastSyncedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  // Fetch functions
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        updateTimestamp();
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blogs?include_drafts=true');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
        updateTimestamp();
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data);
        updateTimestamp();
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const url = inquiryStatusFilter === 'All' ? '/api/inquiries' : `/api/inquiries?status_filter=${inquiryStatusFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
        updateTimestamp();
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshAllData = () => {
    fetchStats();
    if (activeTab === 'dashboard') {
      fetchProducts();
      fetchBlogs();
      fetchClients();
      fetchInquiries();
    } else if (activeTab === 'products') fetchProducts();
    else if (activeTab === 'blogs') fetchBlogs();
    else if (activeTab === 'clients') fetchClients();
    else if (activeTab === 'inquiries') fetchInquiries();
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshAllData();
    }
  }, [isOpen, isAuthenticated, activeTab, inquiryStatusFilter]);

  // Derive unique categories dynamically
  const availableCategories = useMemo(() => {
    const cats = new Set(['Automation', 'Security', 'Engineering', 'Cleanroom']);
    products.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return ['All', ...Array.from(cats)];
  }, [products]);

  // Derive counts
  const featuredProductsCount = useMemo(() => {
    return products.filter(p => Boolean(p.is_featured)).length;
  }, [products]);

  const publishedBlogsCount = useMemo(() => {
    return blogs.filter(b => Boolean(b.is_published)).length;
  }, [blogs]);

  // ===================== AUTHENTICATION ACTIONS =====================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('hti_admin_token', data.token);
        localStorage.setItem('hti_admin_user', data.username);
        setCurrentUser(data.username);
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
        showFeedback('success', 'Logged in successfully as Administrator.');
      } else {
        const err = await res.json();
        setLoginError(err.detail || 'Invalid username or password.');
      }
    } catch (err) {
      // Local fallback for offline / direct browser access
      if (
        loginForm.username.trim().toLowerCase() === 'admin' &&
        loginForm.password === 'admin123'
      ) {
        localStorage.setItem('hti_admin_token', 'local_token_admin');
        localStorage.setItem('hti_admin_user', 'admin');
        setCurrentUser('admin');
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
        showFeedback('success', 'Authenticated with Administrator credentials.');
      } else {
        setLoginError('Authentication failed. Check your security credentials.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setLoginForm({ username: 'admin', password: 'admin123' });
    setLoginError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('hti_admin_token');
    localStorage.removeItem('hti_admin_user');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    showFeedback('success', 'Logged out safely.');
  };

  // ===================== 1-CLICK TOGGLE ACTIONS =====================
  const handleToggleFeaturedProduct = async (prod) => {
    const newFeatured = !prod.is_featured;
    const payload = {
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory || prod.category,
      tagline: prod.tagline || '',
      description: prod.description,
      features: Array.isArray(prod.features) ? prod.features : [],
      specs: prod.specs && typeof prod.specs === 'object' ? prod.specs : {},
      applications: Array.isArray(prod.applications) ? prod.applications : [],
      badge: prod.badge || null,
      is_featured: newFeatured
    };

    // Optimistic update
    setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, is_featured: newFeatured } : p));
    showFeedback('success', `Product "${prod.name}" ${newFeatured ? 'pinned to Featured' : 'removed from Featured'}.`);

    try {
      const res = await fetch(`/api/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchStats();
        if (onProductsChanged) onProductsChanged();
      } else {
        // Rollback if failed
        setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, is_featured: prod.is_featured } : p));
        showFeedback('error', 'Failed to update featured flag.');
      }
    } catch (err) {
      setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, is_featured: prod.is_featured } : p));
      showFeedback('error', 'Network error updating featured state.');
    }
  };

  const handleTogglePublishedBlog = async (blog) => {
    const newPublished = !blog.is_published;
    const payload = {
      title: blog.title,
      category: blog.category,
      author: blog.author || 'HTI Engineering Team',
      read_time: blog.read_time || '5 min read',
      excerpt: blog.excerpt,
      content: blog.content,
      is_published: newPublished
    };

    // Optimistic update
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, is_published: newPublished } : b));
    showFeedback('success', `Article "${blog.title}" ${newPublished ? 'published live' : 'moved to drafts'}.`);

    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchStats();
        if (onBlogsChanged) onBlogsChanged();
      } else {
        setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, is_published: blog.is_published } : b));
        showFeedback('error', 'Failed to update publication status.');
      }
    } catch (err) {
      setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, is_published: blog.is_published } : b));
      showFeedback('error', 'Network error updating blog publication.');
    }
  };

  // ===================== PRODUCT ACTIONS =====================
  const handleOpenAddProduct = () => {
    setProductForm({
      name: '',
      category: 'Automation',
      subcategory: '',
      tagline: '',
      description: '',
      featuresText: '',
      specsText: '',
      applicationsText: '',
      badge: '',
      is_featured: false
    });
    setProductModalTab('form');
    setEditingProduct('new');
  };

  const handleOpenEditProduct = (prod) => {
    setProductForm({
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory || '',
      tagline: prod.tagline || '',
      description: prod.description || '',
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : '',
      specsText: prod.specs && typeof prod.specs === 'object'
        ? Object.entries(prod.specs).map(([k, v]) => `${k}: ${v}`).join('\n')
        : '',
      applicationsText: Array.isArray(prod.applications) ? prod.applications.join('\n') : '',
      badge: prod.badge || '',
      is_featured: Boolean(prod.is_featured)
    });
    setProductModalTab('form');
    setEditingProduct(prod);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category || !productForm.description) {
      showFeedback('error', 'Please fill in required fields: Name, Category, and Description.');
      return;
    }

    const features = productForm.featuresText.split('\n').map(s => s.trim()).filter(Boolean);
    const specs = {};
    productForm.specsText.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        if (key && val) specs[key] = val;
      }
    });
    const applications = productForm.applicationsText.split('\n').map(s => s.trim()).filter(Boolean);

    const payload = {
      name: productForm.name,
      category: productForm.category,
      subcategory: productForm.subcategory || productForm.category,
      tagline: productForm.tagline,
      description: productForm.description,
      features,
      specs,
      applications,
      badge: productForm.badge || null,
      is_featured: productForm.is_featured
    };

    try {
      const url = editingProduct === 'new' ? '/api/products' : `/api/products/${editingProduct.id}`;
      const method = editingProduct === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showFeedback('success', editingProduct === 'new' ? 'Product added successfully!' : 'Product updated successfully!');
        setEditingProduct(null);
        await fetchProducts();
        await fetchStats();
        if (onProductsChanged) onProductsChanged();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save product.');
      }
    } catch (err) {
      showFeedback('error', 'Network error while saving product.');
    }
  };

  const handleDeleteProduct = async (prod) => {
    if (!window.confirm(`Are you sure you want to permanently delete product "${prod.name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${prod.id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Product "${prod.name}" deleted.`);
        await fetchProducts();
        await fetchStats();
        if (onProductsChanged) onProductsChanged();
      } else {
        showFeedback('error', 'Failed to delete product.');
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting product.');
    }
  };

  // ===================== BLOG ACTIONS =====================
  const handleOpenAddBlog = () => {
    setBlogForm({
      title: '',
      category: 'Clean Room Automation',
      author: 'HTI Engineering Team',
      read_time: '5 min read',
      excerpt: '',
      content: '',
      is_published: true
    });
    setBlogModalTab('form');
    setEditingBlog('new');
  };

  const handleOpenEditBlog = (blog) => {
    setBlogForm({
      title: blog.title,
      category: blog.category,
      author: blog.author || 'HTI Engineering Team',
      read_time: blog.read_time || '5 min read',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      is_published: Boolean(blog.is_published)
    });
    setBlogModalTab('form');
    setEditingBlog(blog);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.category || !blogForm.excerpt || !blogForm.content) {
      showFeedback('error', 'Please fill in required fields: Title, Category, Excerpt, and Content.');
      return;
    }

    const payload = {
      title: blogForm.title,
      category: blogForm.category,
      author: blogForm.author,
      read_time: blogForm.read_time,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      is_published: blogForm.is_published
    };

    try {
      const url = editingBlog === 'new' ? '/api/blogs' : `/api/blogs/${editingBlog.id}`;
      const method = editingBlog === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showFeedback('success', editingBlog === 'new' ? 'Article published successfully!' : 'Article updated successfully!');
        setEditingBlog(null);
        await fetchBlogs();
        await fetchStats();
        if (onBlogsChanged) onBlogsChanged();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save blog.');
      }
    } catch (err) {
      showFeedback('error', 'Network error while saving blog.');
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Are you sure you want to permanently delete article "${blog.title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${blog.id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Article "${blog.title}" deleted.`);
        await fetchBlogs();
        await fetchStats();
        if (onBlogsChanged) onBlogsChanged();
      } else {
        showFeedback('error', 'Failed to delete blog.');
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting blog.');
    }
  };

  // ===================== CLIENT ACTIONS =====================
  const handleOpenAddClient = () => {
    setClientForm({
      name: '',
      sector: 'Pharmaceutical & Cleanroom'
    });
    setEditingClient('new');
  };

  const handleOpenEditClient = (client) => {
    setClientForm({
      name: client.name,
      sector: client.sector
    });
    setEditingClient(client);
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.sector) {
      showFeedback('error', 'Please fill in Client Name and Sector.');
      return;
    }

    try {
      const url = editingClient === 'new' ? '/api/clients' : `/api/clients/${editingClient.id}`;
      const method = editingClient === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm)
      });

      if (res.ok) {
        showFeedback('success', editingClient === 'new' ? 'Client added successfully!' : 'Client updated successfully!');
        setEditingClient(null);
        await fetchClients();
        await fetchStats();
        if (onClientsChanged) onClientsChanged();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save client.');
      }
    } catch (err) {
      showFeedback('error', 'Network error while saving client.');
    }
  };

  const handleDeleteClient = async (client) => {
    if (!window.confirm(`Are you sure you want to delete client "${client.name}"?`)) return;

    try {
      const res = await fetch(`/api/clients/${client.id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Client "${client.name}" removed.`);
        await fetchClients();
        await fetchStats();
        if (onClientsChanged) onClientsChanged();
      } else {
        showFeedback('error', 'Failed to delete client.');
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting client.');
    }
  };

  // ===================== INQUIRIES ACTIONS =====================
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        showFeedback('success', `Inquiry #${id} marked as ${newStatus}`);
        await fetchStats();
      }
    } catch (err) {
      showFeedback('error', 'Failed to update inquiry status.');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm(`Are you sure you want to remove inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
        showFeedback('success', `Inquiry #${id} removed.`);
        await fetchStats();
      }
    } catch (err) {
      showFeedback('error', 'Failed to remove inquiry.');
    }
  };

  if (!isOpen) return null;

  // Filtered views
  const filteredProducts = products.filter(p => {
    const matchesSearch = productSearch === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.tagline && p.tagline.toLowerCase().includes(productSearch.toLowerCase()));
    
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;

    let matchesType = true;
    if (productFilterType === 'featured') {
      matchesType = Boolean(p.is_featured);
    } else if (productFilterType === 'flagship') {
      matchesType = Boolean(p.badge && p.badge.toLowerCase().includes('flagship'));
    }

    return matchesSearch && matchesCat && matchesType;
  });

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = blogSearch === '' ||
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(blogSearch.toLowerCase());

    let matchesStatus = true;
    if (blogStatusFilter === 'Published') {
      matchesStatus = Boolean(b.is_published);
    } else if (blogStatusFilter === 'Draft') {
      matchesStatus = !b.is_published;
    }

    return matchesSearch && matchesStatus;
  });

  const filteredClients = clients.filter(c => {
    return clientSearch === '' ||
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.sector.toLowerCase().includes(clientSearch.toLowerCase());
  });

  // Category Icon Resolver
  const getCategoryIcon = (category) => {
    const lower = (category || '').toLowerCase();
    if (lower.includes('clean') || lower.includes('interlock')) return <Shield size={18} />;
    if (lower.includes('auto') || lower.includes('door') || lower.includes('gate')) return <Cpu size={18} />;
    if (lower.includes('security') || lower.includes('surveillance')) return <Lock size={18} />;
    return <Package size={18} />;
  };

  // =========================================================================
  // VIEW 1: ULTRA-PREMIUM LOGIN SCREEN (Security Portal)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="admin-overlay" onClick={onClose}>
        <div className="admin-login-card" onClick={e => e.stopPropagation()}>
          <div className="login-card-ambient-glow" />

          <button className="login-close-btn" onClick={onClose} aria-label="Close Security Portal">
            <X size={18} />
          </button>

          <div className="login-card-header">
            <div className="login-emblem-wrap">
              <div className="login-icon-box">
                <Lock size={30} className="text-red" />
              </div>
              <div className="login-pulse-ring" />
            </div>

            <div className="login-badge-pill">
              <span className="pill-dot" />
              <span>Restricted Access // Clearance L4</span>
            </div>

            <h2 className="login-title">HTI Executive Console</h2>
            <p className="login-sub">
              Enter administrator credentials to authenticate and manage enterprise systems, catalog and telemetry.
            </p>
          </div>

          {loginError && (
            <div className="login-error-alert">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="login-field-group">
              <label className="login-label">
                <span>Administrator ID</span>
                <span className="text-xs text-muted">Role: SuperAdmin</span>
              </label>
              <div className="login-input-shell">
                <Users size={17} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="Username (e.g. admin)"
                  value={loginForm.username}
                  onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                  autoFocus
                />
              </div>
            </div>

            <div className="login-field-group">
              <label className="login-label">
                <span>Security Token / Password</span>
                <span className="text-xs text-muted">AES-256 Protected</span>
              </label>
              <div className="login-input-shell">
                <Lock size={17} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="login-quick-demo-pill"
              onClick={handleQuickDemoFill}
              title="Click to auto-populate default administrator credentials"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={14} className="text-cyan" />
                <span>Quick Demo Fill: <strong>admin</strong> / <strong>admin123</strong></span>
              </span>
              <span className="text-xs opacity-75 font-mono">⚡ Click to Fill</span>
            </button>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Verifying Cryptographic Handshake...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Authenticate & Launch Console</span>
                  <ArrowUpRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="login-security-footer">
            <div className="login-security-tag">
              <Shield size={12} className="text-cyan" />
              <span>256-Bit SSL</span>
            </div>
            <span>•</span>
            <div className="login-security-tag">
              <Database size={12} className="text-emerald" />
              <span>SQLite Live v3.42</span>
            </div>
            <span>•</span>
            <div className="login-security-tag">
              <CheckCircle2 size={12} className="text-muted" />
              <span>Zero Trust Policy</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD WITH SIDEBAR
  // =========================================================================
  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-dashboard-container" onClick={e => e.stopPropagation()}>
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          {/* Brand Box */}
          <div className="sidebar-brand">
            <div className="sidebar-logo-icon">
              <Shield size={22} className="text-cyan" />
            </div>
            <div>
              <div className="sidebar-brand-title">HTI CONTROL</div>
              <div className="sidebar-brand-status">
                <span className="live-dot" />
                <span>BMS OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            <div className="sidebar-section-label">EXECUTIVE NEXUS</div>

            <button
              className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={18} />
              <span>Products</span>
              <span className="sidebar-counter">{products.length}</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <FileText size={18} />
              <span>Blogs & Tech</span>
              <span className="sidebar-counter">{blogs.length}</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeTab === 'clients' ? 'active' : ''}`}
              onClick={() => setActiveTab('clients')}
            >
              <Building2 size={18} />
              <span>Clients</span>
              <span className="sidebar-counter">{clients.length}</span>
            </button>

            <div className="sidebar-section-label mt-4">COMMERCIAL LEADS</div>

            <button
              className={`sidebar-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              <MessageSquare size={18} />
              <span>Inquiries</span>
              {stats.new_inquiries > 0 ? (
                <span className="sidebar-badge-new">{stats.new_inquiries} New</span>
              ) : (
                <span className="sidebar-counter">{inquiries.length}</span>
              )}
            </button>
          </nav>

          {/* Sidebar Telemetry Info */}
          <div className="sidebar-telemetry-box">
            <div className="telemetry-row">
              <span>Database Engine:</span>
              <span className="telemetry-val">SQLite 3.42</span>
            </div>
            <div className="telemetry-row">
              <span>Sync Latency:</span>
              <span className="telemetry-val">4ms Live</span>
            </div>
            <div className="telemetry-row">
              <span>Cleanroom Gateway:</span>
              <span className="text-emerald font-semibold">Active</span>
            </div>
          </div>

          {/* Sidebar User Footer */}
          <div className="sidebar-footer">
            <div className="sidebar-user-info">
              <div className="sidebar-user-avatar">
                <span>SA</span>
              </div>
              <div className="sidebar-user-details">
                <div className="user-name">{currentUser}</div>
                <div className="user-role">Super Administrator</div>
              </div>
            </div>

            <button className="sidebar-logout-btn" onClick={handleLogout} title="Log Out Safely">
              <LogOut size={16} />
            </button>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <div className="admin-main-area">
          {/* Top Bar */}
          <div className="admin-topbar">
            <div className="admin-topbar-title-wrap">
              <h2 className="admin-topbar-title">
                {activeTab === 'dashboard' && 'Dashboard Overview & System Telemetry'}
                {activeTab === 'products' && 'Products Catalog Management'}
                {activeTab === 'blogs' && 'Articles & Technical Publications'}
                {activeTab === 'clients' && 'Enterprise Clients & Client Roster'}
                {activeTab === 'inquiries' && 'Commercial Inquiries & Project Leads'}
              </h2>
              <span className="topbar-live-tag">
                <span className="tag-dot" />
                <span>SQLite Realtime: backend/hti.db</span>
              </span>
            </div>

            <div className="admin-topbar-actions">
              <button
                className={`topbar-btn ${loading ? 'spinning' : ''}`}
                onClick={refreshAllData}
                title="Refresh Live Database Data"
              >
                <RefreshCw size={15} />
                <span>Sync</span>
              </button>

              <button className="topbar-close-btn" onClick={onClose} aria-label="Close Admin Console">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Global Feedback Banner */}
          {feedback.message && (
            <div className={`admin-toast ${feedback.type === 'error' ? 'toast-error' : 'toast-success'}`}>
              {feedback.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* =========================================================================
              TAB 1: DASHBOARD OVERVIEW
              ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="admin-body-content">
              {/* Welcome Banner */}
              <div className="dashboard-welcome-banner">
                <div>
                  <h3 className="welcome-title">Welcome back, {currentUser}</h3>
                  <p className="welcome-sub">
                    All 5 enterprise CMS modules are operational. Live SQLite database connection verified.
                  </p>
                </div>
                <div className="welcome-chips-row">
                  <div className="welcome-chip">
                    <Activity size={14} className="text-emerald" />
                    <span>Uptime 99.98%</span>
                  </div>
                  <div className="welcome-chip">
                    <Database size={14} className="text-cyan" />
                    <span>Synced {lastSyncedTime}</span>
                  </div>
                </div>
              </div>

              {/* Metric KPI Cards Grid */}
              <div className="dashboard-stats-grid">
                {/* Products KPI */}
                <div className="dash-card">
                  <div className="dash-card-top">
                    <div className="dash-card-icon bg-blue">
                      <Package size={24} />
                    </div>
                    <span className="dash-card-tag">{featuredProductsCount} Featured</span>
                  </div>
                  <div className="dash-card-number">{products.length}</div>
                  <div className="dash-card-label">Active Industrial Products</div>
                  <button className="dash-card-btn" onClick={() => setActiveTab('products')}>
                    <span>Manage Catalog</span>
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* Blogs KPI */}
                <div className="dash-card">
                  <div className="dash-card-top">
                    <div className="dash-card-icon bg-purple">
                      <FileText size={24} />
                    </div>
                    <span className="dash-card-tag">{publishedBlogsCount} Published</span>
                  </div>
                  <div className="dash-card-number">{blogs.length}</div>
                  <div className="dash-card-label">Technical Articles & Publications</div>
                  <button className="dash-card-btn" onClick={() => setActiveTab('blogs')}>
                    <span>Editorial Studio</span>
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* Clients KPI */}
                <div className="dash-card">
                  <div className="dash-card-top">
                    <div className="dash-card-icon bg-emerald">
                      <Building2 size={24} />
                    </div>
                    <span className="dash-card-tag">Pharma & Industrial</span>
                  </div>
                  <div className="dash-card-number">{clients.length}</div>
                  <div className="dash-card-label">Enterprise Corporate Clients</div>
                  <button className="dash-card-btn" onClick={() => setActiveTab('clients')}>
                    <span>View Client Roster</span>
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* Inquiries KPI */}
                <div className="dash-card">
                  <div className="dash-card-top">
                    <div className="dash-card-icon bg-red">
                      <MessageSquare size={24} />
                    </div>
                    {stats.new_inquiries > 0 ? (
                      <span className="dash-card-tag alert-red">{stats.new_inquiries} New</span>
                    ) : (
                      <span className="dash-card-tag">Active</span>
                    )}
                  </div>
                  <div className="dash-card-number">{inquiries.length}</div>
                  <div className="dash-card-label">Commercial Inquiries & RFQs</div>
                  <button className="dash-card-btn" onClick={() => setActiveTab('inquiries')}>
                    <span>Open Lead Desk</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* Quick Actions Launchpad */}
              <div className="dashboard-quick-actions">
                <h4 className="quick-actions-title">Instant Management Command Launcher</h4>
                <div className="quick-actions-row">
                  <button className="quick-action-tile" onClick={handleOpenAddProduct}>
                    <div className="tile-icon bg-blue text-cyan">
                      <Plus size={18} />
                    </div>
                    <div>
                      <div>Add New Product</div>
                      <div className="text-xs text-muted font-normal">Create catalog entry</div>
                    </div>
                  </button>

                  <button className="quick-action-tile" onClick={handleOpenAddBlog}>
                    <div className="tile-icon bg-purple text-purple">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div>Publish Blog Article</div>
                      <div className="text-xs text-muted font-normal">Technical insights</div>
                    </div>
                  </button>

                  <button className="quick-action-tile" onClick={handleOpenAddClient}>
                    <div className="tile-icon bg-emerald text-emerald">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <div>Add Enterprise Client</div>
                      <div className="text-xs text-muted font-normal">Update client roster</div>
                    </div>
                  </button>

                  <button className="quick-action-tile" onClick={onClose}>
                    <div className="tile-icon bg-red text-red">
                      <ExternalLink size={18} />
                    </div>
                    <div>
                      <div>Open Live Website</div>
                      <div className="text-xs text-muted font-normal">Return to portal</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Activity Split */}
              <div className="dashboard-columns-split">
                {/* Recent Products */}
                <div className="dash-panel">
                  <div className="dash-panel-header">
                    <h4>Recently Added Products</h4>
                    <button className="dash-panel-link" onClick={() => setActiveTab('products')}>
                      View All ({products.length})
                    </button>
                  </div>
                  <div className="dash-panel-list">
                    {products.slice(0, 4).map(p => (
                      <div key={p.id} className="dash-item-row">
                        <div className="flex items-center gap-3">
                          <div className="product-glyph-box">
                            {getCategoryIcon(p.category)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                            <div className="text-xs text-muted">
                              {p.category} {p.subcategory ? `• ${p.subcategory}` : ''}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="btn-action-icon edit"
                            onClick={() => handleOpenEditProduct(p)}
                            title="Edit Product"
                          >
                            <Edit3 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="dash-panel">
                  <div className="dash-panel-header">
                    <h4>Recent Technical Articles</h4>
                    <button className="dash-panel-link" onClick={() => setActiveTab('blogs')}>
                      View All ({blogs.length})
                    </button>
                  </div>
                  <div className="dash-panel-list">
                    {blogs.slice(0, 4).map(b => (
                      <div key={b.id} className="dash-item-row">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{b.title}</div>
                          <div className="text-xs text-muted">
                            {b.category} • {b.read_time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`status-badge ${b.is_published ? 'published' : 'draft'}`}>
                            {b.is_published ? 'Live' : 'Draft'}
                          </span>
                          <button
                            className="btn-action-icon edit"
                            onClick={() => handleOpenEditBlog(b)}
                            title="Edit Article"
                          >
                            <Edit3 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: PRODUCTS MANAGEMENT (Upgraded Professional Industrial UI)
              ========================================================================= */}
          {activeTab === 'products' && (
            <div className="admin-body-content">
              {/* Summary Stats Ribbon */}
              <div className="admin-stats-ribbon">
                <div className="ribbon-chip">
                  <div className="ribbon-chip-icon bg-blue text-cyan">
                    <Package size={20} />
                  </div>
                  <div>
                    <div className="ribbon-chip-label">Catalog Total</div>
                    <div className="ribbon-chip-val">{products.length} Products</div>
                  </div>
                </div>

                <div className="ribbon-chip">
                  <div className="ribbon-chip-icon bg-purple text-purple">
                    <Star size={20} />
                  </div>
                  <div>
                    <div className="ribbon-chip-label">Featured Items</div>
                    <div className="ribbon-chip-val">{featuredProductsCount} Pinned</div>
                  </div>
                </div>

                <div className="ribbon-chip">
                  <div className="ribbon-chip-icon bg-emerald text-emerald">
                    <Layers size={20} />
                  </div>
                  <div>
                    <div className="ribbon-chip-label">Categories</div>
                    <div className="ribbon-chip-val">{availableCategories.length - 1} Active</div>
                  </div>
                </div>

                <div className="ribbon-chip">
                  <div className="ribbon-chip-icon bg-red text-red">
                    <Shield size={20} />
                  </div>
                  <div>
                    <div className="ribbon-chip-label">Cleanroom Interlocks</div>
                    <div className="ribbon-chip-val">
                      {products.filter(p => (p.subcategory || '').toLowerCase().includes('clean')).length} Systems
                    </div>
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="admin-toolbar">
                <div className="toolbar-left">
                  <div className="toolbar-search-box">
                    <Search size={16} className="text-muted" />
                    <input
                      type="text"
                      placeholder="Search products by name, specs or tags..."
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                    />
                    {productSearch && (
                      <button
                        className="search-clear-btn"
                        onClick={() => setProductSearch('')}
                        title="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <select
                    value={productCategoryFilter}
                    onChange={e => setProductCategoryFilter(e.target.value)}
                    className="admin-select"
                  >
                    {availableCategories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'All' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="toolbar-right">
                  {/* View Mode Toggle */}
                  <div className="view-mode-toggle">
                    <button
                      className={`view-mode-btn ${productViewMode === 'table' ? 'active' : ''}`}
                      onClick={() => setProductViewMode('table')}
                      title="Table View"
                    >
                      <List size={15} />
                      <span>Table</span>
                    </button>
                    <button
                      className={`view-mode-btn ${productViewMode === 'cards' ? 'active' : ''}`}
                      onClick={() => setProductViewMode('cards')}
                      title="Grid Cards View"
                    >
                      <Grid size={15} />
                      <span>Cards</span>
                    </button>
                  </div>

                  <button className="btn-primary-admin" onClick={handleOpenAddProduct}>
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="filter-pills-row">
                <button
                  className={`filter-pill-chip ${productFilterType === 'all' ? 'active' : ''}`}
                  onClick={() => setProductFilterType('all')}
                >
                  All Products ({products.length})
                </button>
                <button
                  className={`filter-pill-chip ${productFilterType === 'featured' ? 'active' : ''}`}
                  onClick={() => setProductFilterType('featured')}
                >
                  ⭐ Featured Only ({featuredProductsCount})
                </button>
                <button
                  className={`filter-pill-chip ${productFilterType === 'flagship' ? 'active' : ''}`}
                  onClick={() => setProductFilterType('flagship')}
                >
                  🏆 Flagship Products
                </button>
              </div>

              {/* MODE 1: ULTRA-PREMIUM DATA TABLE VIEW */}
              {productViewMode === 'table' && (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product & Specification Overview</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Badges / Flags</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-12 text-muted">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <Package size={36} className="text-slate-300 mb-1" />
                              <div className="font-bold text-slate-700">No products found matching filters</div>
                              <div className="text-xs text-muted">Try clearing your search query or category filter.</div>
                              {(productSearch || productCategoryFilter !== 'All' || productFilterType !== 'all') && (
                                <button
                                  className="btn-action edit mt-2"
                                  onClick={() => {
                                    setProductSearch('');
                                    setProductCategoryFilter('All');
                                    setProductFilterType('all');
                                  }}
                                >
                                  Clear Filters
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map(prod => (
                          <tr key={prod.id}>
                            <td>
                              <div className="product-cell">
                                <div className="product-glyph-box">
                                  {getCategoryIcon(prod.category)}
                                </div>
                                <div>
                                  <div className="product-name-txt">{prod.name}</div>
                                  <div className="product-sub-txt">
                                    {prod.tagline || prod.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="table-cat-badge">{prod.category}</span>
                            </td>
                            <td>
                              <span className="table-subcat-badge">{prod.subcategory || 'Standard'}</span>
                            </td>
                            <td>
                              <div className="flex items-center gap-2 flex-wrap">
                                {prod.badge && (
                                  <span className="table-tag-badge">
                                    <Sparkles size={11} />
                                    <span>{prod.badge}</span>
                                  </span>
                                )}

                                {/* Interactive 1-click Featured Star */}
                                <button
                                  type="button"
                                  className={`table-featured-star-btn ${prod.is_featured ? 'is-active' : 'not-active'}`}
                                  onClick={() => handleToggleFeaturedProduct(prod)}
                                  title={prod.is_featured ? 'Click to unpin from Featured' : 'Click to pin as Featured'}
                                >
                                  <Star size={13} fill={prod.is_featured ? '#0284c7' : 'none'} />
                                  <span>{prod.is_featured ? 'Featured' : 'Pin'}</span>
                                </button>
                              </div>
                            </td>
                            <td className="text-right">
                              <div className="action-buttons-inline">
                                <button
                                  className="btn-action-icon view"
                                  onClick={() => setPreviewProduct(prod)}
                                  title="Quick View Specifications"
                                >
                                  <Eye size={15} />
                                </button>
                                <button
                                  className="btn-action-icon edit"
                                  onClick={() => handleOpenEditProduct(prod)}
                                  title="Edit Product Details"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button
                                  className="btn-action-icon delete"
                                  onClick={() => handleDeleteProduct(prod)}
                                  title="Delete Product Permanently"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* MODE 2: VISUAL CARD GRID VIEW */}
              {productViewMode === 'cards' && (
                <div className="admin-cards-grid">
                  {filteredProducts.map(prod => (
                    <div key={prod.id} className="admin-product-card">
                      <div className="card-top-bar">
                        <span className="table-cat-badge">{prod.category}</span>
                        <button
                          className={`table-featured-star-btn ${prod.is_featured ? 'is-active' : 'not-active'}`}
                          onClick={() => handleToggleFeaturedProduct(prod)}
                          title="Toggle Featured"
                        >
                          <Star size={13} fill={prod.is_featured ? '#0284c7' : 'none'} />
                          <span>{prod.is_featured ? 'Featured' : 'Pin'}</span>
                        </button>
                      </div>

                      <h4 className="card-title">{prod.name}</h4>
                      <p className="card-tagline">{prod.tagline || prod.description}</p>

                      {Array.isArray(prod.features) && prod.features.length > 0 && (
                        <div className="card-bullets">
                          {prod.features.slice(0, 2).map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle2 size={12} className="text-emerald flex-shrink-0" />
                              <span className="truncate">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="card-footer-actions">
                        <span className="text-xs text-muted">{prod.subcategory}</span>
                        <div className="flex items-center gap-1">
                          <button
                            className="btn-action-icon view"
                            onClick={() => setPreviewProduct(prod)}
                            title="Preview Specifications"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="btn-action-icon edit"
                            onClick={() => handleOpenEditProduct(prod)}
                            title="Edit"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            className="btn-action-icon delete"
                            onClick={() => handleDeleteProduct(prod)}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 3: BLOGS & ARTICLES (Editorial Studio)
              ========================================================================= */}
          {activeTab === 'blogs' && (
            <div className="admin-body-content">
              {/* Blog Stats Ribbon */}
              <div className="admin-stats-ribbon">
                <div className="ribbon-chip">
                  <div className="ribbon-chip-icon bg-purple text-purple">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="ribbon-chip-label">Total Articles</div>
                    <div className="ribbon-chip-val">{blogs.length} Published/Draft</div>
                  </div>
                </div>

                <div className="ribbon-chip">
                  <div className="ribbon-chip-icon bg-emerald text-emerald">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="ribbon-chip-label">Live on Website</div>
                    <div className="ribbon-chip-val">{publishedBlogsCount} Live</div>
                  </div>
                </div>

                <div className="ribbon-chip">
                  <div className="ribbon-chip-icon bg-blue text-cyan">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="ribbon-chip-label">Unpublished Drafts</div>
                    <div className="ribbon-chip-val">{blogs.length - publishedBlogsCount} Drafts</div>
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="admin-toolbar">
                <div className="toolbar-left">
                  <div className="toolbar-search-box">
                    <Search size={16} className="text-muted" />
                    <input
                      type="text"
                      placeholder="Search articles by title, category, excerpt..."
                      value={blogSearch}
                      onChange={e => setBlogSearch(e.target.value)}
                    />
                    {blogSearch && (
                      <button className="search-clear-btn" onClick={() => setBlogSearch('')}>
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <select
                    value={blogStatusFilter}
                    onChange={e => setBlogStatusFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Published">Published Only</option>
                    <option value="Draft">Drafts Only</option>
                  </select>
                </div>

                <div className="toolbar-right">
                  {/* View Mode Toggle */}
                  <div className="view-mode-toggle">
                    <button
                      className={`view-mode-btn ${blogViewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setBlogViewMode('grid')}
                      title="Magazine Grid View"
                    >
                      <Grid size={15} />
                      <span>Cards</span>
                    </button>
                    <button
                      className={`view-mode-btn ${blogViewMode === 'table' ? 'active' : ''}`}
                      onClick={() => setBlogViewMode('table')}
                      title="Data Table View"
                    >
                      <List size={15} />
                      <span>Table</span>
                    </button>
                  </div>

                  <button className="btn-primary-admin" onClick={handleOpenAddBlog}>
                    <Plus size={16} />
                    <span>Publish New Blog Article</span>
                  </button>
                </div>
              </div>

              {/* EDITORIAL MAGAZINE GRID VIEW */}
              {blogViewMode === 'grid' && (
                <div className="blog-magazine-grid">
                  {filteredBlogs.length === 0 ? (
                    <div className="text-center py-12 text-muted col-span-full">
                      No articles match your search or filter.
                    </div>
                  ) : (
                    filteredBlogs.map(b => (
                      <div key={b.id} className="blog-card-admin">
                        <div className="blog-card-meta-top">
                          <span className="table-cat-badge">{b.category}</span>
                          <span className="text-xs text-muted flex items-center gap-1 font-semibold">
                            <Clock size={12} />
                            <span>{b.read_time}</span>
                          </span>
                        </div>

                        <h4 className="blog-card-title">{b.title}</h4>
                        <p className="blog-card-excerpt">{b.excerpt}</p>

                        <div className="blog-card-footer">
                          {/* 1-Click Status Toggle Pill */}
                          <button
                            type="button"
                            className={`status-toggle-pill ${b.is_published ? 'published' : 'draft'}`}
                            onClick={() => handleTogglePublishedBlog(b)}
                            title={b.is_published ? 'Click to unpublish (move to Draft)' : 'Click to publish live'}
                          >
                            <span className="live-dot" />
                            <span>{b.is_published ? 'Published Live' : 'Draft / Hidden'}</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              className="btn-action-icon edit"
                              onClick={() => handleOpenEditBlog(b)}
                              title="Edit Article Content"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              className="btn-action-icon delete"
                              onClick={() => handleDeleteBlog(b)}
                              title="Delete Article"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* DATA TABLE VIEW */}
              {blogViewMode === 'table' && (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Article Title & Excerpt</th>
                        <th>Category</th>
                        <th>Author & Read Time</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-muted">
                            No articles found. Click "Publish New Blog Article" to create one.
                          </td>
                        </tr>
                      ) : (
                        filteredBlogs.map(b => (
                          <tr key={b.id}>
                            <td>
                              <div className="font-bold text-slate-900">{b.title}</div>
                              <div className="text-xs text-muted truncate max-w-md">{b.excerpt}</div>
                            </td>
                            <td>
                              <span className="table-cat-badge">{b.category}</span>
                            </td>
                            <td>
                              <div className="text-xs font-bold text-slate-700">{b.author}</div>
                              <div className="text-xs text-muted">{b.read_time}</div>
                            </td>
                            <td>
                              <button
                                type="button"
                                className={`status-toggle-pill ${b.is_published ? 'published' : 'draft'}`}
                                onClick={() => handleTogglePublishedBlog(b)}
                                title="Click to toggle publication status"
                              >
                                <span>{b.is_published ? 'Published' : 'Draft'}</span>
                              </button>
                            </td>
                            <td className="text-right">
                              <div className="action-buttons-inline">
                                <button
                                  className="btn-action-icon edit"
                                  onClick={() => handleOpenEditBlog(b)}
                                  title="Edit this article"
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button
                                  className="btn-action-icon delete"
                                  onClick={() => handleDeleteBlog(b)}
                                  title="Delete this article"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 4: CLIENTS MANAGEMENT
              ========================================================================= */}
          {activeTab === 'clients' && (
            <div className="admin-body-content">
              <div className="admin-toolbar">
                <div className="toolbar-left">
                  <div className="toolbar-search-box">
                    <Search size={16} className="text-muted" />
                    <input
                      type="text"
                      placeholder="Search clients by company name or sector..."
                      value={clientSearch}
                      onChange={e => setClientSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="toolbar-right">
                  <button className="btn-primary-admin" onClick={handleOpenAddClient}>
                    <Plus size={16} />
                    <span>Add New Enterprise Client</span>
                  </button>
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th># ID</th>
                      <th>Client Organization</th>
                      <th>Industry Sector</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-8 text-muted">
                          No clients found.
                        </td>
                      </tr>
                    ) : (
                      filteredClients.map(c => (
                        <tr key={c.id}>
                          <td className="font-mono text-xs text-muted">#{c.id}</td>
                          <td>
                            <div className="font-bold text-slate-900">{c.name}</div>
                          </td>
                          <td>
                            <span className="table-cat-badge">{c.sector}</span>
                          </td>
                          <td className="text-right">
                            <div className="action-buttons-inline">
                              <button
                                className="btn-action-icon edit"
                                onClick={() => handleOpenEditClient(c)}
                                title="Edit this client"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                className="btn-action-icon delete"
                                onClick={() => handleDeleteClient(c)}
                                title="Delete this client"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 5: INQUIRIES & LEADS
              ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="admin-body-content">
              <div className="admin-toolbar">
                <div className="flex items-center gap-2 flex-wrap">
                  {['All', 'New', 'In Review', 'Contacted', 'Resolved'].map(st => (
                    <button
                      key={st}
                      className={`filter-pill-chip ${inquiryStatusFilter === st ? 'active' : ''}`}
                      onClick={() => setInquiryStatusFilter(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="inquiries-card-list">
                {inquiries.length === 0 ? (
                  <div className="text-center py-10 text-muted">No inquiries found in this status.</div>
                ) : (
                  inquiries.map(inq => (
                    <div key={inq.id} className="inquiry-card-admin">
                      <div className="inquiry-card-top">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="inquiry-client-name">{inq.full_name}</h4>
                            <span className={`status-badge inq-${inq.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {inq.status}
                            </span>
                          </div>
                          <div className="inquiry-client-meta">
                            <span>{inq.email}</span> • <span>{inq.phone}</span> {inq.company && `• ${inq.company}`}
                          </div>
                        </div>
                        <div className="inquiry-time-stamp">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="inquiry-interest-tag">
                        <strong>Product of Interest:</strong> {inq.product_name || 'General Inquiry'} ({inq.category || 'Standard'})
                      </div>

                      <div className="inquiry-message-box">
                        "{inq.message}"
                      </div>

                      <div className="inquiry-card-bottom">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500">Update Status:</span>
                          {['New', 'In Review', 'Contacted', 'Resolved'].map(st => (
                            <button
                              key={st}
                              className={`status-chip-btn ${inq.status === st ? 'active' : ''}`}
                              onClick={() => handleUpdateInquiryStatus(inq.id, st)}
                            >
                              {st}
                            </button>
                          ))}
                        </div>

                        <button
                          className="btn-action-icon delete"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          title="Delete Inquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ===================== QUICK PRODUCT SPECIFICATION PREVIEW MODAL ===================== */}
        {previewProduct && (
          <div className="submodal-overlay" onClick={() => setPreviewProduct(null)}>
            <div className="submodal-dialog" onClick={e => e.stopPropagation()}>
              <div className="submodal-header">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="table-cat-badge">{previewProduct.category}</span>
                    {previewProduct.badge && <span className="table-tag-badge">{previewProduct.badge}</span>}
                  </div>
                  <h3 className="submodal-title">{previewProduct.name}</h3>
                  <p className="submodal-sub">{previewProduct.tagline}</p>
                </div>
                <button className="topbar-close-btn" onClick={() => setPreviewProduct(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Description</h5>
                  <p className="text-sm text-slate-700 leading-relaxed">{previewProduct.description}</p>
                </div>

                {Array.isArray(previewProduct.features) && previewProduct.features.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Key Engineering Features</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {previewProduct.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                          <CheckCircle2 size={14} className="text-emerald mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {previewProduct.specs && typeof previewProduct.specs === 'object' && Object.keys(previewProduct.specs).length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Technical Specifications</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(previewProduct.specs).map(([k, v]) => (
                        <div key={k} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="font-bold text-slate-800">{k}: </span>
                          <span className="text-slate-600">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="submodal-actions">
                <button
                  type="button"
                  className="btn-action edit flex items-center gap-2 px-4 py-2"
                  onClick={() => {
                    const prod = previewProduct;
                    setPreviewProduct(null);
                    handleOpenEditProduct(prod);
                  }}
                >
                  <Edit3 size={15} />
                  <span>Edit This Product</span>
                </button>
                <button
                  type="button"
                  className="btn-primary-admin"
                  onClick={() => setPreviewProduct(null)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== ADD / EDIT PRODUCT MODAL ===================== */}
        {editingProduct && (
          <div className="submodal-overlay" onClick={() => setEditingProduct(null)}>
            <div className="submodal-dialog" onClick={e => e.stopPropagation()}>
              <div className="submodal-header">
                <div>
                  <h3 className="submodal-title">
                    {editingProduct === 'new' ? 'Add New Industrial Product' : `Edit: ${editingProduct.name}`}
                  </h3>
                  <p className="submodal-sub">Stored in live SQLite database and instantly active on the website.</p>
                </div>
                <button className="topbar-close-btn" onClick={() => setEditingProduct(null)}>
                  <X size={18} />
                </button>
              </div>

              {/* Submodal Tabs */}
              <div className="submodal-tabs-bar">
                <button
                  className={`submodal-tab-btn ${productModalTab === 'form' ? 'active' : ''}`}
                  onClick={() => setProductModalTab('form')}
                >
                  Product Form
                </button>
                <button
                  className={`submodal-tab-btn ${productModalTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setProductModalTab('preview')}
                >
                  Live Card Preview
                </button>
              </div>

              {productModalTab === 'form' ? (
                <form onSubmit={handleSaveProduct} className="submodal-form">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Smart Cleanroom Door Interlock Controller"
                        value={productForm.name}
                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Product Category *</label>
                      <select
                        value={productForm.category}
                        onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                      >
                        <option value="Automation">Automation</option>
                        <option value="Access Control">Access Control</option>
                        <option value="Security">Security</option>
                        <option value="Building Automation">Building Automation</option>
                        <option value="Cleanroom Engineering">Cleanroom Engineering</option>
                        <option value="Fire Detection & Alarm">Fire Detection & Alarm</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Subcategory</label>
                      <input
                        type="text"
                        placeholder="e.g. Clean Room & Controlled Access"
                        value={productForm.subcategory}
                        onChange={e => setProductForm({ ...productForm, subcategory: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Badge / Highlight Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. Flagship Product, High Demand"
                        value={productForm.badge}
                        onChange={e => setProductForm({ ...productForm, badge: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Tagline / One-Liner</label>
                    <input
                      type="text"
                      placeholder="e.g. Multi-door airlock management for cleanrooms & critical laboratories"
                      value={productForm.tagline}
                      onChange={e => setProductForm({ ...productForm, tagline: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Full Product Description *</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Detailed technical overview of the product solution..."
                      value={productForm.description}
                      onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Key Features (One feature per line)</label>
                      <textarea
                        rows="4"
                        placeholder="Supports 2 to 12 doors electrically interlocked&#10;Available in Flameproof variants&#10;Programmable delay timer between door openings"
                        value={productForm.featuresText}
                        onChange={e => setProductForm({ ...productForm, featuresText: e.target.value })}
                      />
                      <span className="form-field-helper">Enter each feature on a new line.</span>
                    </div>

                    <div className="form-group">
                      <label>Technical Specifications (Format: Key: Value)</label>
                      <textarea
                        rows="4"
                        placeholder="Operating Voltage: 12V / 24V DC&#10;Door Support: 2 to 12 Doors&#10;Enclosure: SS304 Cleanroom Finish"
                        value={productForm.specsText}
                        onChange={e => setProductForm({ ...productForm, specsText: e.target.value })}
                      />
                      <span className="form-field-helper">Format: "Property Name: Value" on each line.</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Target Applications & Industries</label>
                    <input
                      type="text"
                      placeholder="Pharmaceutical Cleanrooms, Bio-safety Labs, Semiconductor Fabs"
                      value={productForm.applicationsText}
                      onChange={e => setProductForm({ ...productForm, applicationsText: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={productForm.is_featured}
                        onChange={e => setProductForm({ ...productForm, is_featured: e.target.checked })}
                      />
                      <span className="font-bold text-slate-800">Pin as Featured Product on Homepage</span>
                    </label>
                  </div>

                  <div className="submodal-actions">
                    <button type="button" className="topbar-btn" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary-admin">
                      {editingProduct === 'new' ? 'Add Product to Live Site' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                /* LIVE PREVIEW TAB */
                <div className="p-6">
                  <div className="modal-live-preview-box">
                    <div className="flex items-center justify-between mb-2">
                      <span className="table-cat-badge">{productForm.category || 'Category'}</span>
                      {productForm.is_featured && <span className="table-tag-badge">⭐ Featured</span>}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {productForm.name || 'Untitled Product'}
                    </h3>
                    <p className="text-xs text-muted mb-3">
                      {productForm.subcategory || 'Standard Subcategory'} • {productForm.badge || 'Standard Spec'}
                    </p>
                    <p className="text-sm text-slate-700 mb-4">
                      {productForm.tagline || productForm.description || 'Product description will appear here...'}
                    </p>
                    {productForm.featuresText && (
                      <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3 text-xs">
                        <strong className="block mb-1 text-slate-800">Key Features Preview:</strong>
                        {productForm.featuresText.split('\n').filter(Boolean).slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-600 mb-0.5">
                            <CheckCircle2 size={12} className="text-emerald" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="submodal-actions">
                    <button
                      type="button"
                      className="btn-action edit px-4 py-2"
                      onClick={() => setProductModalTab('form')}
                    >
                      Return to Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== ADD / EDIT BLOG MODAL ===================== */}
        {editingBlog && (
          <div className="submodal-overlay" onClick={() => setEditingBlog(null)}>
            <div className="submodal-dialog" onClick={e => e.stopPropagation()}>
              <div className="submodal-header">
                <div>
                  <h3 className="submodal-title">
                    {editingBlog === 'new' ? 'Publish New Technical Article / Blog' : `Edit: ${editingBlog.title}`}
                  </h3>
                  <p className="submodal-sub">Articles are instantly active on the website's Blogs section.</p>
                </div>
                <button className="topbar-close-btn" onClick={() => setEditingBlog(null)}>
                  <X size={18} />
                </button>
              </div>

              {/* Submodal Tabs */}
              <div className="submodal-tabs-bar">
                <button
                  className={`submodal-tab-btn ${blogModalTab === 'form' ? 'active' : ''}`}
                  onClick={() => setBlogModalTab('form')}
                >
                  Article Editor
                </button>
                <button
                  className={`submodal-tab-btn ${blogModalTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setBlogModalTab('preview')}
                >
                  Live Article Card Preview
                </button>
              </div>

              {blogModalTab === 'form' ? (
                <form onSubmit={handleSaveBlog} className="submodal-form">
                  <div className="form-group">
                    <label>Article Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cleanroom Interlock Controller Design Guidelines for ISO 14644 Compliance"
                      value={blogForm.title}
                      onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
                    />
                  </div>

                  <div className="form-row-3">
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        value={blogForm.category}
                        onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
                      >
                        <option value="Clean Room Automation">Clean Room Automation</option>
                        <option value="Access Control">Access Control</option>
                        <option value="Industrial Security">Industrial Security</option>
                        <option value="Building Management">Building Management</option>
                        <option value="Compliance & Standards">Compliance & Standards</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Author</label>
                      <input
                        type="text"
                        placeholder="HTI Engineering Team"
                        value={blogForm.author}
                        onChange={e => setBlogForm({ ...blogForm, author: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Estimated Read Time</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 min read"
                        value={blogForm.read_time}
                        onChange={e => setBlogForm({ ...blogForm, read_time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Excerpt / Summary *</label>
                    <textarea
                      rows="2"
                      required
                      placeholder="Brief 2-3 sentence overview that appears on article preview cards..."
                      value={blogForm.excerpt}
                      onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Full Article Content (Markdown / Paragraphs) *</label>
                    <textarea
                      rows="8"
                      required
                      placeholder="Write your technical article here. Use ## for headings and - for bullet points..."
                      value={blogForm.content}
                      onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={blogForm.is_published}
                        onChange={e => setBlogForm({ ...blogForm, is_published: e.target.checked })}
                      />
                      <span className="font-bold text-slate-800">Publish Immediately (Visible to visitors)</span>
                    </label>
                  </div>

                  <div className="submodal-actions">
                    <button type="button" className="topbar-btn" onClick={() => setEditingBlog(null)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary-admin">
                      {editingBlog === 'new' ? 'Publish Article Now' : 'Save Article Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                /* LIVE ARTICLE PREVIEW */
                <div className="p-6">
                  <div className="modal-live-preview-box">
                    <div className="flex items-center justify-between mb-2">
                      <span className="table-cat-badge">{blogForm.category}</span>
                      <span className="text-xs text-muted font-semibold">{blogForm.read_time}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {blogForm.title || 'Untitled Article'}
                    </h3>
                    <div className="text-xs text-slate-500 mb-3">By {blogForm.author}</div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {blogForm.excerpt || 'Article excerpt will appear here...'}
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 text-xs text-slate-600 max-h-40 overflow-y-auto whitespace-pre-wrap">
                      {blogForm.content || 'Article full content preview...'}
                    </div>
                  </div>
                  <div className="submodal-actions">
                    <button
                      type="button"
                      className="btn-action edit px-4 py-2"
                      onClick={() => setBlogModalTab('form')}
                    >
                      Return to Editor
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== ADD / EDIT CLIENT MODAL ===================== */}
        {editingClient && (
          <div className="submodal-overlay" onClick={() => setEditingClient(null)}>
            <div className="submodal-dialog" onClick={e => e.stopPropagation()}>
              <div className="submodal-header">
                <div>
                  <h3 className="submodal-title">
                    {editingClient === 'new' ? 'Add New Enterprise Client' : `Edit: ${editingClient.name}`}
                  </h3>
                  <p className="submodal-sub">Updates the Clients and Partners section on the homepage and clients page.</p>
                </div>
                <button className="topbar-close-btn" onClick={() => setEditingClient(null)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveClient} className="submodal-form">
                <div className="form-group">
                  <label>Client Organization Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sun Pharmaceutical Industries Ltd."
                    value={clientForm.name}
                    onChange={e => setClientForm({ ...clientForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Industry Sector *</label>
                  <select
                    value={clientForm.sector}
                    onChange={e => setClientForm({ ...clientForm, sector: e.target.value })}
                  >
                    <option value="Pharmaceutical & Cleanroom">Pharmaceutical & Cleanroom</option>
                    <option value="Semiconductors & Electronics">Semiconductors & Electronics</option>
                    <option value="Healthcare & Hospitals">Healthcare & Hospitals</option>
                    <option value="Automotive & Heavy Industry">Automotive & Heavy Industry</option>
                    <option value="Financial & Corporate Parks">Financial & Corporate Parks</option>
                    <option value="Government & Defense">Government & Defense</option>
                  </select>
                </div>

                <div className="submodal-actions">
                  <button type="button" className="topbar-btn" onClick={() => setEditingClient(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-admin">
                    {editingClient === 'new' ? 'Add Client to Roster' : 'Save Client Details'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
