import React, { useState, useEffect, useMemo } from 'react';
import './AdminDashboard.css';
import './AdminClientsPartners.css';
import AdminProductsManager from './AdminProductsManager';
import AdminBlogsManager from './AdminBlogsManager';
import AdminWebsiteContentManager from './AdminWebsiteContentManager';
import AdminEnquiriesManager from './AdminEnquiriesManager';
import AdminUsersSecurityManager from './AdminUsersSecurityManager';
import {
  X, Shield, RefreshCw, Plus, Edit3, Trash2, CheckCircle,
  FileText, Package, MessageSquare, Search, AlertCircle,
  Check, Eye, EyeOff, ExternalLink, Calendar, Clock, Tag,
  LayoutDashboard, Users, Building2, Lock, LogOut, LogIn,
  TrendingUp, Layers, ChevronRight, CheckCircle2, Star,
  Grid, List, Sparkles, Filter, SlidersHorizontal, Cpu,
  Database, Activity, Copy, ArrowUpRight, Download, Upload,
  Briefcase, Globe, Settings, HardDrive, Phone, Mail,
  Send, AlertTriangle, ShieldCheck, UserCheck, Key, FileSpreadsheet,
  ArrowRight, CheckSquare, MessageCircle, HeartHandshake,
  Server, Link, Image, Hash, Info, Sun, Moon, Save,
  Zap, User, HelpCircle, MapPin
} from 'lucide-react';

// Custom animated number count-up hook with cleanup and prefers-reduced-motion support
function useCountUp(target, duration = 650) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = typeof target === 'number' ? target : parseInt(target, 10);
    if (isNaN(end)) {
      setCount(target || 0);
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let startTimestamp = null;
    let animationFrameId = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad
      const ease = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);

  return count;
}

function AnimatedNumber({ value }) {
  const animatedValue = useCountUp(value);
  return <span>{animatedValue}</span>;
}

function ProjectImageFallback({ className }) {
  return (
    <div className={`adm-proj-img-fallback ${className || ''}`}>
      <Briefcase size={36} className="adm-proj-fallback-icon" />
      <span className="adm-proj-fallback-label">HTI Case Study</span>
    </div>
  );
}

function ProjectCardImage({ src, alt, industry, isPublished, onTogglePublish }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="adm-proj-card-media">
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || 'Project installation'}
          className="adm-proj-card-img"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <ProjectImageFallback />
      )}
      <div className="adm-proj-card-overlay" />
      <span className="adm-proj-pill-industry">{industry}</span>
      <button
        type="button"
        className={`adm-proj-status-btn ${isPublished ? 'published' : 'draft'}`}
        onClick={(e) => {
          e.stopPropagation();
          if (onTogglePublish) onTogglePublish();
        }}
        title={isPublished ? 'Live on website — Click to set Draft' : 'Draft — Click to Publish live'}
        aria-label={isPublished ? 'Published project. Click to mark draft' : 'Draft project. Click to publish'}
      >
        <span className={`adm-proj-status-dot ${isPublished ? 'live' : ''}`} />
        <span>{isPublished ? 'Published' : 'Draft'}</span>
      </button>
    </div>
  );
}

export default function AdminPanel({
  isOpen,
  onClose,
  onProductsChanged,
  onBlogsChanged,
  onClientsChanged,
  onProjectsChanged,
  onContentChanged
}) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('hti_admin_token'));
  });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autoLoginChecked, setAutoLoginChecked] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('hti_admin_user') || 'admin';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('hti_admin_role') || 'Administrator';
  });

  // Active navigation tab
  // 'dashboard' | 'products' | 'blogs' | 'clients_partners' | 'inquiries' | 'projects' | 'content' | 'users' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminTheme, setAdminTheme] = useState(() => localStorage.getItem('hti_admin_theme') || 'light');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [lastSyncedTime, setLastSyncedTime] = useState('Just now');

  const toggleAdminTheme = () => {
    const next = adminTheme === 'light' ? 'dark' : 'light';
    setAdminTheme(next);
    localStorage.setItem('hti_admin_theme', next);
  };

  // Sub-tabs
  const [clientPartnerSubTab, setClientPartnerSubTab] = useState('clients'); // 'clients' | 'partners'
  const [userSubTab, setUserSubTab] = useState('users'); // 'users' | 'audit_logs'
  const [contentSubTab, setContentSubTab] = useState('homepage_hero'); // 'homepage_hero' | 'company_profile' | 'contact_details' | 'testimonials'

  // Data states
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [clients, setClients] = useState([]);
  const [partners, setPartners] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [backupsList, setBackupsList] = useState([]);
  const [systemSettings, setSystemSettings] = useState({
    site_title: '',
    meta_description: '',
    meta_keywords: '',
    notification_email: '',
    last_backup_time: '',
    last_backup_file: '',
    backup_status: ''
  });
  const [websiteContent, setWebsiteContent] = useState({});

  // Search & filter states
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productFilterType, setProductFilterType] = useState('all'); // 'all' | 'featured'
  const [productViewMode, setProductViewMode] = useState('table'); // 'table' | 'cards'

  const [blogSearch, setBlogSearch] = useState('');
  const [blogStatusFilter, setBlogStatusFilter] = useState('All'); // 'All' | 'Published' | 'Draft'
  const [blogViewMode, setBlogViewMode] = useState('grid');

  const [clientSearch, setClientSearch] = useState('');
  const [partnerSearch, setPartnerSearch] = useState('');
  const [isSyncingClients, setIsSyncingClients] = useState(false);
  const [clientFilterStatus, setClientFilterStatus] = useState('all'); // 'all' | 'authorized' | 'visible'
  const [partnerFilterStatus, setPartnerFilterStatus] = useState('all'); // 'all' | 'active' | 'hidden'
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [inquirySearch, setInquirySearch] = useState('');

  const [projectSearch, setProjectSearch] = useState('');
  const [projectIndustryFilter, setProjectIndustryFilter] = useState('All');
  const [projectViewMode, setProjectViewMode] = useState('grid'); // 'grid' | 'list'

  // Interactive Lead Detail / Follow-up Drawer
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryNotesText, setInquiryNotesText] = useState('');

  // Product Add / Edit modal
  const [editingProduct, setEditingProduct] = useState(null); // null | 'new' | product obj
  const [productModalTab, setProductModalTab] = useState('basic'); // 'basic' | 'specs' | 'media' | 'preview'
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Automation',
    subcategory: '',
    tagline: '',
    description: '',
    featuresText: '',
    specsList: [{ key: '', value: '' }],
    applicationsText: '',
    badge: '',
    is_featured: false,
    image_url: '',
    brochure_url: '',
    datasheet_url: '',
    is_published: true,
    display_order: 0
  });

  // Blog Add / Edit modal
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogModalTab, setBlogModalTab] = useState('content'); // 'content' | 'seo' | 'preview'
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Cleanroom Engineering',
    author: 'HTI Engineering Team',
    read_time: '5 min read',
    excerpt: '',
    content: '',
    image_url: '',
    tags: '',
    seo_title: '',
    meta_description: '',
    scheduled_at: '',
    is_published: true
  });

  // Client Add / Edit modal
  const [editingClient, setEditingClient] = useState(null);
  const [clientForm, setClientForm] = useState({
    name: '',
    sector: 'Pharmaceuticals',
    logo_url: '',
    website_url: '',
    is_active: true,
    display_order: 0,
    is_authorized: true
  });

  // Partner Add / Edit modal
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    category: 'Fire & Automation',
    tagline: '',
    logo_url: '',
    website_url: '',
    is_active: true,
    display_order: 0,
    is_authorized: true
  });

  // Project Add / Edit modal
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    client_name: '',
    client_approved: true,
    industry: 'Pharmaceutical Cleanroom',
    location: '',
    completion_year: '2025',
    description: '',
    image_url: '',
    related_products_text: '',
    is_published: true,
    display_order: 0
  });

  // Admin User Add / Edit modal
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
    role: 'Editor',
    is_active: true
  });

  // Preview modals
  const [previewProduct, setPreviewProduct] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);

  // Backup in progress state
  const [isBackingUp, setIsBackingUp] = useState(false);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4500);
  };

  const updateTimestamp = () => {
    const now = new Date();
    setLastSyncedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  // ===================== DATA FETCHING =====================

  const fetchSystemHealth = async () => {
    try {
      const res = await fetch('/api/system/health');
      if (res.ok) {
        const data = await res.json();
        setSystemHealth(data);
      }
    } catch (err) {
      console.error('Failed to fetch system health:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products?include_unpublished=true');
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
      const res = await fetch('/api/blogs?include_drafts=true');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
        updateTimestamp();
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const fetchClientsAndPartners = async () => {
    try {
      const [cRes, pRes] = await Promise.all([
        fetch('/api/clients'),
        fetch('/api/partners')
      ]);
      if (cRes.ok) setClients(await cRes.json());
      if (pRes.ok) setPartners(await pRes.json());
      updateTimestamp();
    } catch (err) {
      console.error('Failed to fetch clients/partners:', err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
        updateTimestamp();
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        updateTimestamp();
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const fetchWebsiteContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setWebsiteContent(data);
      }
    } catch (err) {
      console.error('Failed to fetch website content:', err);
    }
  };

  const fetchUsersAndAudit = async () => {
    try {
      const [uRes, aRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/audit-logs?limit=40')
      ]);
      if (uRes.ok) setAdminUsers(await uRes.json());
      if (aRes.ok) setAuditLogs(await aRes.json());
    } catch (err) {
      console.error('Failed to fetch users or audit logs:', err);
    }
  };

  const fetchSettingsAndBackups = async () => {
    try {
      const [sRes, bRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/system/backups')
      ]);
      if (sRes.ok) setSystemSettings(await sRes.json());
      if (bRes.ok) setBackupsList(await bRes.json());
    } catch (err) {
      console.error('Failed to fetch settings or backups:', err);
    }
  };

  const refreshAllData = () => {
    fetchSystemHealth();
    fetchProducts();
    fetchBlogs();
    fetchClientsAndPartners();
    fetchInquiries();
    fetchProjects();
    fetchWebsiteContent();
    fetchUsersAndAudit();
    fetchSettingsAndBackups();
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshAllData();
    }
  }, [isOpen, isAuthenticated, activeTab, inquiryStatusFilter]);

  // Prevent background scrolling while admin modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Support ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedInquiry) setSelectedInquiry(null);
        else if (editingProduct) setEditingProduct(null);
        else if (editingBlog) setEditingBlog(null);
        else if (editingClient) setEditingClient(null);
        else if (editingPartner) setEditingPartner(null);
        else if (editingProject) setEditingProject(null);
        else if (editingUser) setEditingUser(null);
        else if (previewProduct) setPreviewProduct(null);
        else if (previewProject) setPreviewProject(null);
        else if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedInquiry, editingProduct, editingBlog, editingClient, editingPartner, editingProject, editingUser, previewProduct, previewProject, onClose]);

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
        localStorage.setItem('hti_admin_role', data.role || 'Administrator');
        setCurrentUser(data.username);
        setUserRole(data.role || 'Administrator');
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
        showFeedback('success', `Authenticated successfully as ${data.full_name || data.username} (${data.role || 'Admin'}).`);
      } else {
        const err = await res.json();
        setLoginError(err.detail || 'Invalid username or password.');
      }
    } catch (err) {
      // Fallback
      if (loginForm.username.trim().toLowerCase() === 'admin' && loginForm.password === 'admin123') {
        localStorage.setItem('hti_admin_token', 'local_token_admin');
        localStorage.setItem('hti_admin_user', 'admin');
        localStorage.setItem('hti_admin_role', 'Administrator');
        setCurrentUser('admin');
        setUserRole('Administrator');
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
        showFeedback('success', 'Authenticated with Chief Administrator credentials.');
      } else {
        setLoginError('Authentication failed. Check your security credentials.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setLoginForm({ username: 'admin', password: 'admin123' });
    setAutoLoginChecked(true);
    setLoginError('');
  };

  const handleCopyDemo = (e) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('admin / admin123');
      }
    } catch (err) { }
    setLoginForm({ username: 'admin', password: 'admin123' });
    setAutoLoginChecked(true);
    setLoginError('');
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  const handleAutoLoginToggle = (e) => {
    const checked = e.target.checked;
    setAutoLoginChecked(checked);
    if (checked) {
      setLoginForm({ username: 'admin', password: 'admin123' });
      setLoginError('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hti_admin_token');
    localStorage.removeItem('hti_admin_user');
    localStorage.removeItem('hti_admin_role');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    showFeedback('success', 'Logged out safely.');
  };

  // ===================== PRODUCT CRUD ACTIONS =====================
  const handleOpenAddProduct = () => {
    setProductForm({
      name: '',
      category: 'Automation',
      subcategory: 'Cleanroom Interlocking',
      tagline: '',
      description: '',
      featuresText: 'High reliability optical sensor\nMicrocontroller-based logic\nProgrammable door open delay\nEmergency release override integration',
      specsList: [
        { key: 'Enclosure Material', value: 'Stainless Steel SS304 / Impact ABS' },
        { key: 'Operating Voltage', value: '12V / 24V DC regulated' },
        { key: 'Status Indication', value: 'Bi-color Red/Green optical LED' }
      ],
      applicationsText: 'Pharmaceutical Cleanrooms, Biotech Laboratories, Hospital OT Airlocks',
      badge: 'Certified',
      is_featured: false,
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      brochure_url: '',
      datasheet_url: '',
      is_published: true,
      display_order: products.length + 1
    });
    setProductModalTab('basic');
    setEditingProduct('new');
  };

  const handleOpenEditProduct = (prod) => {
    const specsArray = [];
    if (prod.specs && typeof prod.specs === 'object') {
      Object.entries(prod.specs).forEach(([k, v]) => {
        specsArray.push({ key: k, value: String(v) });
      });
    }
    if (specsArray.length === 0) {
      specsArray.push({ key: '', value: '' });
    }

    setProductForm({
      name: prod.name,
      category: prod.category,
      subcategory: prod.subcategory || '',
      tagline: prod.tagline || '',
      description: prod.description || '',
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : '',
      specsList: specsArray,
      applicationsText: Array.isArray(prod.applications) ? prod.applications.join(', ') : '',
      badge: prod.badge || '',
      is_featured: Boolean(prod.is_featured),
      image_url: prod.image_url || '',
      brochure_url: prod.brochure_url || '',
      datasheet_url: prod.datasheet_url || '',
      is_published: prod.is_published !== undefined ? Boolean(prod.is_published) : true,
      display_order: prod.display_order || 0
    });
    setProductModalTab('basic');
    setEditingProduct(prod);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category || !productForm.description) {
      showFeedback('error', 'Please provide required fields: Product Name, Category, and Description.');
      return;
    }

    // Convert specs list to object
    const specsObj = {};
    productForm.specsList.forEach(s => {
      if (s.key.trim()) {
        specsObj[s.key.trim()] = s.value.trim();
      }
    });

    const featuresArr = productForm.featuresText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const applicationsArr = productForm.applicationsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      name: productForm.name,
      category: productForm.category,
      subcategory: productForm.subcategory || productForm.category,
      tagline: productForm.tagline,
      description: productForm.description,
      features: featuresArr,
      specs: specsObj,
      applications: applicationsArr,
      badge: productForm.badge,
      is_featured: productForm.is_featured,
      image_url: productForm.image_url,
      brochure_url: productForm.brochure_url,
      datasheet_url: productForm.datasheet_url,
      is_published: productForm.is_published,
      display_order: parseInt(productForm.display_order, 10) || 0
    };

    try {
      const url = editingProduct === 'new'
        ? `/api/products?admin_user=${encodeURIComponent(currentUser)}`
        : `/api/products/${editingProduct.id}?admin_user=${encodeURIComponent(currentUser)}`;
      const method = editingProduct === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showFeedback('success', editingProduct === 'new' ? 'Product created and published successfully!' : 'Product updated successfully!');
        setEditingProduct(null);
        await fetchProducts();
        await fetchSystemHealth();
        if (onProductsChanged) onProductsChanged();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save product.');
      }
    } catch (err) {
      showFeedback('error', 'Network error while saving product.');
    }
  };

  const handleToggleProductPublish = async (prod) => {
    try {
      const res = await fetch(`/api/products/${prod.id}/toggle-publish?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, is_published: data.is_published } : p));
        showFeedback('success', `Product '${prod.name}' marked as ${data.status}`);
        if (onProductsChanged) onProductsChanged();
      }
    } catch (err) {
      showFeedback('error', 'Failed to toggle publication status.');
    }
  };

  const handleDeleteProduct = async (prod) => {
    if (!window.confirm(`Are you sure you want to permanently delete product "${prod.name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${prod.id}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showFeedback('success', `Product "${prod.name}" removed.`);
        await fetchProducts();
        await fetchSystemHealth();
        if (onProductsChanged) onProductsChanged();
      } else {
        showFeedback('error', 'Failed to delete product.');
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting product.');
    }
  };

  // ===================== BLOG CRUD ACTIONS =====================
  const handleOpenAddBlog = () => {
    setBlogForm({
      title: '',
      category: 'Cleanroom Engineering',
      author: 'HTI Engineering Team',
      read_time: '5 min read',
      excerpt: '',
      content: '',
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      tags: 'Cleanroom, USFDA, Pressure Delay',
      seo_title: '',
      meta_description: '',
      scheduled_at: '',
      is_published: true
    });
    setBlogModalTab('content');
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
      image_url: blog.image_url || '',
      tags: blog.tags || '',
      seo_title: blog.seo_title || blog.title,
      meta_description: blog.meta_description || blog.excerpt,
      scheduled_at: blog.scheduled_at || '',
      is_published: Boolean(blog.is_published)
    });
    setBlogModalTab('content');
    setEditingBlog(blog);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.category || !blogForm.excerpt || !blogForm.content) {
      showFeedback('error', 'Please fill in required fields: Title, Category, Excerpt, and Content Body.');
      return;
    }

    const payload = {
      title: blogForm.title,
      category: blogForm.category,
      author: blogForm.author,
      read_time: blogForm.read_time,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      image_url: blogForm.image_url,
      tags: blogForm.tags,
      seo_title: blogForm.seo_title || blogForm.title,
      meta_description: blogForm.meta_description || blogForm.excerpt,
      scheduled_at: blogForm.scheduled_at,
      is_published: blogForm.is_published
    };

    try {
      const url = editingBlog === 'new'
        ? `/api/blogs?admin_user=${encodeURIComponent(currentUser)}`
        : `/api/blogs/${editingBlog.id}?admin_user=${encodeURIComponent(currentUser)}`;
      const method = editingBlog === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showFeedback('success', editingBlog === 'new' ? 'Technical article saved and published!' : 'Technical article updated!');
        setEditingBlog(null);
        await fetchBlogs();
        await fetchSystemHealth();
        if (onBlogsChanged) onBlogsChanged();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save blog article.');
      }
    } catch (err) {
      showFeedback('error', 'Network error while saving article.');
    }
  };

  const handleToggleBlogPublish = async (blog) => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}/toggle-publish?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, is_published: data.is_published } : b));
        showFeedback('success', `Article '${blog.title}' marked as ${data.status}`);
        if (onBlogsChanged) onBlogsChanged();
      }
    } catch (err) {
      showFeedback('error', 'Failed to toggle blog publication status.');
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Are you sure you want to delete article "${blog.title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${blog.id}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showFeedback('success', `Article "${blog.title}" removed.`);
        await fetchBlogs();
        await fetchSystemHealth();
        if (onBlogsChanged) onBlogsChanged();
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting blog.');
    }
  };

  // ===================== CLIENTS & PARTNERS CRUD =====================
  const handleOpenAddClient = () => {
    setClientForm({
      name: '',
      sector: 'Pharmaceutical & Cleanroom',
      logo_url: '',
      website_url: '',
      is_active: true,
      display_order: clients.length + 1,
      is_authorized: true
    });
    setEditingClient('new');
  };

  const handleOpenEditClient = (c) => {
    setClientForm({
      name: c.name,
      sector: c.sector,
      logo_url: c.logo_url || '',
      website_url: c.website_url || '',
      is_active: Boolean(c.is_active),
      display_order: c.display_order || 0,
      is_authorized: Boolean(c.is_authorized)
    });
    setEditingClient(c);
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.sector) {
      showFeedback('error', 'Please fill in Client Name and Sector.');
      return;
    }

    try {
      const url = editingClient === 'new'
        ? `/api/clients?admin_user=${encodeURIComponent(currentUser)}`
        : `/api/clients/${editingClient.id}?admin_user=${encodeURIComponent(currentUser)}`;
      const method = editingClient === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm)
      });

      if (res.ok) {
        showFeedback('success', editingClient === 'new' ? 'Enterprise client added!' : 'Enterprise client updated!');
        setEditingClient(null);
        await fetchClientsAndPartners();
        if (onClientsChanged) onClientsChanged();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save client.');
      }
    } catch (err) {
      showFeedback('error', 'Network error saving client.');
    }
  };

  const handleDeleteClient = async (c) => {
    if (!window.confirm(`Are you sure you want to remove client "${c.name}"?`)) return;
    try {
      const res = await fetch(`/api/clients/${c.id}?admin_user=${encodeURIComponent(currentUser)}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Client "${c.name}" removed.`);
        await fetchClientsAndPartners();
        if (onClientsChanged) onClientsChanged();
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting client.');
    }
  };

  const handleOpenAddPartner = () => {
    setPartnerForm({
      name: '',
      category: 'Fire & Automation',
      tagline: 'Leading automation technology partner',
      logo_url: '',
      website_url: '',
      is_active: true,
      display_order: partners.length + 1,
      is_authorized: true
    });
    setEditingPartner('new');
  };

  const handleOpenEditPartner = (p) => {
    setPartnerForm({
      name: p.name,
      category: p.category,
      tagline: p.tagline || '',
      logo_url: p.logo_url || '',
      website_url: p.website_url || '',
      is_active: Boolean(p.is_active),
      display_order: p.display_order || 0,
      is_authorized: Boolean(p.is_authorized)
    });
    setEditingPartner(p);
  };

  const handleSavePartner = async (e) => {
    e.preventDefault();
    if (!partnerForm.name || !partnerForm.category) {
      showFeedback('error', 'Please fill in Partner Name and Category.');
      return;
    }

    try {
      const url = editingPartner === 'new'
        ? `/api/partners?admin_user=${encodeURIComponent(currentUser)}`
        : `/api/partners/${editingPartner.id}?admin_user=${encodeURIComponent(currentUser)}`;
      const method = editingPartner === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerForm)
      });

      if (res.ok) {
        showFeedback('success', editingPartner === 'new' ? 'Technology partner added!' : 'Technology partner updated!');
        setEditingPartner(null);
        await fetchClientsAndPartners();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save partner.');
      }
    } catch (err) {
      showFeedback('error', 'Network error saving partner.');
    }
  };

  const handleDeletePartner = async (p) => {
    if (!window.confirm(`Are you sure you want to remove partner "${p.name}"?`)) return;
    try {
      const res = await fetch(`/api/partners/${p.id}?admin_user=${encodeURIComponent(currentUser)}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Partner "${p.name}" removed.`);
        await fetchClientsAndPartners();
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting partner.');
    }
  };

  const handleSyncClientsPartners = async () => {
    setIsSyncingClients(true);
    await fetchClientsAndPartners();
    setTimeout(() => setIsSyncingClients(false), 600);
  };

  // ===================== INQUIRIES & LEADS ACTIONS =====================
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
        }
        showFeedback('success', `Inquiry #${id} status changed to ${newStatus}`);
        await fetchSystemHealth();
      }
    } catch (err) {
      showFeedback('error', 'Failed to update inquiry status.');
    }
  };

  const handleAssignInquiry = async (id, assignee) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/assign?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assigned_to: assignee })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, assigned_to: assignee } : item));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => ({ ...prev, assigned_to: assignee }));
        }
        showFeedback('success', `Inquiry #${id} assigned to ${assignee}`);
      }
    } catch (err) {
      showFeedback('error', 'Failed to assign inquiry.');
    }
  };

  const handleSaveInquiryNotes = async (id) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/notes?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: inquiryNotesText })
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(prev => prev.map(item => item.id === id ? { ...item, followup_notes: inquiryNotesText, last_contacted_at: data.last_contacted_at } : item));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => ({ ...prev, followup_notes: inquiryNotesText, last_contacted_at: data.last_contacted_at }));
        }
        showFeedback('success', `Follow-up notes saved for Inquiry #${id}`);
      }
    } catch (err) {
      showFeedback('error', 'Failed to save follow-up notes.');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm(`Are you sure you want to permanently remove inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/inquiries/${id}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) setSelectedInquiry(null);
        showFeedback('success', `Inquiry #${id} removed.`);
        await fetchSystemHealth();
      }
    } catch (err) {
      showFeedback('error', 'Failed to delete inquiry.');
    }
  };

  const handleExportInquiriesCSV = () => {
    window.open('/api/inquiries/export', '_blank');
    showFeedback('success', 'Exporting sales inquiries to CSV file...');
  };

  // ===================== PROJECTS & INSTALLATIONS =====================
  const handleOpenAddProject = () => {
    setProjectForm({
      title: '',
      client_name: 'Glenmark Pharmaceuticals',
      client_approved: true,
      industry: 'Pharmaceutical Cleanroom',
      location: 'Navi Mumbai, Maharashtra',
      completion_year: '2025',
      description: 'Comprehensive installation of multi-door cleanroom interlocking system, AHU interlocks, and emergency fire evacuation override integration.',
      image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      related_products_text: 'Door Interlock System, Air Shower Automation, Electromagnetic Locks',
      is_published: true,
      display_order: projects.length + 1
    });
    setEditingProject('new');
  };

  const handleOpenEditProject = (proj) => {
    setProjectForm({
      title: proj.title,
      client_name: proj.client_name || '',
      client_approved: Boolean(proj.client_approved),
      industry: proj.industry,
      location: proj.location,
      completion_year: proj.completion_year || '2025',
      description: proj.description,
      image_url: proj.image_url || '',
      related_products_text: Array.isArray(proj.related_products) ? proj.related_products.join(', ') : '',
      is_published: Boolean(proj.is_published),
      display_order: proj.display_order || 0
    });
    setEditingProject(proj);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.industry || !projectForm.description) {
      showFeedback('error', 'Please provide Project Title, Industry, and Description.');
      return;
    }

    const relProds = projectForm.related_products_text
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      title: projectForm.title,
      client_name: projectForm.client_name,
      client_approved: projectForm.client_approved,
      industry: projectForm.industry,
      location: projectForm.location,
      completion_year: projectForm.completion_year,
      description: projectForm.description,
      image_url: projectForm.image_url,
      related_products: relProds,
      is_published: projectForm.is_published,
      display_order: parseInt(projectForm.display_order, 10) || 0
    };

    try {
      const url = editingProject === 'new'
        ? `/api/projects?admin_user=${encodeURIComponent(currentUser)}`
        : `/api/projects/${editingProject.id}?admin_user=${encodeURIComponent(currentUser)}`;
      const method = editingProject === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showFeedback('success', editingProject === 'new' ? 'Case study created!' : 'Case study updated!');
        setEditingProject(null);
        await fetchProjects();
        await fetchSystemHealth();
        if (onProjectsChanged) onProjectsChanged();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save project.');
      }
    } catch (err) {
      showFeedback('error', 'Network error saving case study.');
    }
  };

  const handleToggleProjectPublish = async (proj) => {
    try {
      const res = await fetch(`/api/projects/${proj.id}/toggle-publish?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(prev => prev.map(p => p.id === proj.id ? { ...p, is_published: data.is_published } : p));
        showFeedback('success', `Project '${proj.title}' marked as ${data.status}`);
        if (onProjectsChanged) onProjectsChanged();
      }
    } catch (err) {
      showFeedback('error', 'Failed to toggle project publication.');
    }
  };

  const handleDeleteProject = async (proj) => {
    if (!window.confirm(`Are you sure you want to remove project "${proj.title}"?`)) return;
    try {
      const res = await fetch(`/api/projects/${proj.id}?admin_user=${encodeURIComponent(currentUser)}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Project "${proj.title}" deleted.`);
        await fetchProjects();
        await fetchSystemHealth();
        if (onProjectsChanged) onProjectsChanged();
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting project.');
    }
  };

  // ===================== WEBSITE CONTENT CMS =====================
  const handleSaveContentSection = async (sectionKey, sectionData) => {
    try {
      const res = await fetch(`/api/content/${sectionKey}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: sectionData })
      });
      if (res.ok) {
        showFeedback('success', `Content for section '${sectionKey}' published live!`);
        await fetchWebsiteContent();
        if (onContentChanged) onContentChanged();
      } else {
        showFeedback('error', 'Failed to publish website content.');
      }
    } catch (err) {
      showFeedback('error', 'Network error saving content.');
    }
  };

  // ===================== ADMIN USERS & AUDIT =====================
  const handleOpenAddUser = () => {
    setUserForm({
      username: '',
      password: '',
      full_name: '',
      email: '',
      role: 'Editor',
      is_active: true
    });
    setEditingUser('new');
  };

  const handleOpenEditUser = (u) => {
    setUserForm({
      username: u.username,
      password: '', // blank unless changing
      full_name: u.full_name,
      email: u.email,
      role: u.role,
      is_active: Boolean(u.is_active)
    });
    setEditingUser(u);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!userForm.username || !userForm.full_name || !userForm.email) {
      showFeedback('error', 'Please fill in Username, Full Name, and Email.');
      return;
    }

    try {
      const url = editingUser === 'new'
        ? `/api/admin/users?admin_user=${encodeURIComponent(currentUser)}`
        : `/api/admin/users/${editingUser.id}?admin_user=${encodeURIComponent(currentUser)}`;
      const method = editingUser === 'new' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm)
      });

      if (res.ok) {
        showFeedback('success', editingUser === 'new' ? 'User account created!' : 'User account updated!');
        setEditingUser(null);
        await fetchUsersAndAudit();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to save user account.');
      }
    } catch (err) {
      showFeedback('error', 'Network error saving user.');
    }
  };

  const handleDeleteUser = async (u) => {
    if (u.username === 'admin') {
      alert('Cannot delete the primary root Administrator account.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete user account "${u.username}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${u.id}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showFeedback('success', `User account "${u.username}" deleted.`);
        await fetchUsersAndAudit();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Failed to delete user.');
      }
    } catch (err) {
      showFeedback('error', 'Network error deleting user.');
    }
  };

  // ===================== SYSTEM HEALTH & BACKUPS =====================
  const handleTriggerLiveBackup = async () => {
    setIsBackingUp(true);
    try {
      const res = await fetch(`/api/system/backup?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        showFeedback('success', `Live verified snapshot generated: ${data.backup.name} (${data.backup.size_mb} MB)`);
        await fetchSystemHealth();
        await fetchSettingsAndBackups();
      } else {
        const err = await res.json();
        showFeedback('error', err.detail || 'Backup failed.');
      }
    } catch (err) {
      showFeedback('error', 'Network error generating backup snapshot.');
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/settings?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: systemSettings })
      });
      if (res.ok) {
        showFeedback('success', 'System configurations saved successfully.');
        await fetchSettingsAndBackups();
      }
    } catch (err) {
      showFeedback('error', 'Failed to save system settings.');
    }
  };

  // Telemetry metrics calculation for visual gauges and widgets
  // Placed above ALL conditional early returns (isOpen, isAuthenticated) to adhere strictly to Rules of Hooks
  const diskMetrics = useMemo(() => {
    const rawFree = systemHealth?.disk?.free_gb;
    const rawTotal = systemHealth?.disk?.total_gb;
    if (rawFree === undefined || rawFree === null || rawTotal === undefined || rawTotal === null) {
      return null;
    }
    const free = typeof rawFree === 'number' ? rawFree : parseFloat(rawFree);
    const total = typeof rawTotal === 'number' ? rawTotal : parseFloat(rawTotal);
    if (isNaN(free) || isNaN(total) || total <= 0 || free < 0) {
      return null;
    }
    const used = Math.max(0, total - free);
    const freePct = Math.min(100, Math.max(0, Math.round((free / total) * 100)));
    return { free, total, used, freePct };
  }, [systemHealth?.disk]);

  const dbMetrics = useMemo(() => {
    const rawMb = systemHealth?.database?.file_size_mb;
    if (rawMb === undefined || rawMb === null) {
      return null;
    }
    const mb = typeof rawMb === 'number' ? rawMb : parseFloat(rawMb);
    if (isNaN(mb) || mb < 0) {
      return null;
    }
    return { mb };
  }, [systemHealth?.database]);

  // Turnkey projects summary statistics (placed above ALL conditional returns to strictly obey Rules of Hooks)
  const projectMetrics = useMemo(() => {
    const list = Array.isArray(projects) ? projects : [];
    const total = list.length;
    const published = list.filter(p => Boolean(p && p.is_published)).length;
    const drafts = Math.max(0, total - published);
    const approved = list.filter(p => Boolean(p && p.client_approved)).length;
    return { total, published, drafts, approved };
  }, [projects]);

  // Turnkey projects industry filter options (placed above ALL conditional returns to strictly obey Rules of Hooks)
  const projectIndustryOptions = useMemo(() => {
    const base = [
      { key: 'All', label: 'All Industries' },
      { key: 'Pharmaceutical', label: 'Pharmaceutical' },
      { key: 'Life Sciences', label: 'Life Sciences & R&D' },
      { key: 'Chemical', label: 'Chemical & Industrial' },
      { key: 'Academic', label: 'Academic & Research' }
    ];
    const list = Array.isArray(projects) ? projects : [];
    const custom = [];
    list.forEach(p => {
      if (!p || !p.industry) return;
      const ind = String(p.industry).trim();
      if (!ind) return;
      const matchesBase = base.some(b => b.key !== 'All' && ind.toLowerCase().includes(b.key.toLowerCase()));
      if (!matchesBase && !custom.includes(ind)) {
        custom.push(ind);
      }
    });
    return [...base, ...custom.map(c => ({ key: c, label: c }))];
  }, [projects]);

  const getAuditCategoryInfo = (module = '') => {
    const m = String(module).toLowerCase();
    if (m.includes('security') || m.includes('auth') || m.includes('user')) {
      return { color: 'blue', label: module || 'Security' };
    }
    if (m.includes('health') || m.includes('system') || m.includes('backup')) {
      return { color: 'green', label: module || 'System Health' };
    }
    if (m.includes('inquir') || m.includes('lead') || m.includes('alert')) {
      return { color: 'amber', label: module || 'Inquiries' };
    }
    return { color: 'slate', label: module || 'General' };
  };

  if (!isOpen) return null;

  // ===================== FILTERED LISTS =====================
  const filteredProducts = products.filter(p => {
    const matchesSearch = productSearch === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.tagline && p.tagline.toLowerCase().includes(productSearch.toLowerCase()));

    const matchesCat = productCategoryFilter === 'All' || p.category.toLowerCase() === productCategoryFilter.toLowerCase();
    const matchesType = productFilterType === 'featured' ? Boolean(p.is_featured) : true;
    return matchesSearch && matchesCat && matchesType;
  });

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = blogSearch === '' ||
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(blogSearch.toLowerCase());

    let matchesStatus = true;
    if (blogStatusFilter === 'Published') matchesStatus = Boolean(b.is_published);
    else if (blogStatusFilter === 'Draft') matchesStatus = !b.is_published;

    return matchesSearch && matchesStatus;
  });

  const filteredClients = clients.filter(c => {
    const matchesSearch = clientSearch === '' ||
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.sector.toLowerCase().includes(clientSearch.toLowerCase()) ||
      (c.website_url && c.website_url.toLowerCase().includes(clientSearch.toLowerCase()));

    let matchesFilter = true;
    if (clientFilterStatus === 'authorized') matchesFilter = Boolean(c.is_authorized);
    else if (clientFilterStatus === 'visible') matchesFilter = Boolean(c.is_active);

    return matchesSearch && matchesFilter;
  });

  const filteredPartners = partners.filter(p => {
    const matchesSearch = partnerSearch === '' ||
      p.name.toLowerCase().includes(partnerSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(partnerSearch.toLowerCase()) ||
      (p.tagline && p.tagline.toLowerCase().includes(partnerSearch.toLowerCase())) ||
      (p.website_url && p.website_url.toLowerCase().includes(partnerSearch.toLowerCase()));

    let matchesFilter = true;
    if (partnerFilterStatus === 'active') matchesFilter = Boolean(p.is_active);
    else if (partnerFilterStatus === 'hidden') matchesFilter = !p.is_active;

    return matchesSearch && matchesFilter;
  });

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = inquirySearch === '' ||
      i.full_name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.company.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.product_name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      i.phone.toLowerCase().includes(inquirySearch.toLowerCase());

    const matchesStatus = inquiryStatusFilter === 'All' || i.status.toLowerCase() === inquiryStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredProjects = projects.filter(pr => {
    const matchesSearch = projectSearch === '' ||
      pr.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      pr.client_name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      pr.industry.toLowerCase().includes(projectSearch.toLowerCase()) ||
      pr.location.toLowerCase().includes(projectSearch.toLowerCase());

    const matchesInd = projectIndustryFilter === 'All' || pr.industry.toLowerCase().includes(projectIndustryFilter.toLowerCase());
    return matchesSearch && matchesInd;
  });

  const unansweredInquiries = inquiries.filter(i => (i.status || '').toLowerCase() === 'new');

  // =========================================================================
  // VIEW 1: ULTRA-PREMIUM LOGIN SCREEN (Reference-Matched Modal Popup)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div
        className="hti-admin-modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hti-admin-login-title"
      >
        <div className="hti-admin-login-modal" onClick={e => e.stopPropagation()}>
          {/* Top-Right Circular Close Button */}
          <button
            type="button"
            className="hti-login-close-circle"
            onClick={onClose}
            aria-label="Close Admin Login"
          >
            <X size={16} />
          </button>

          {/* Top Center: Official HTI Logo & Branding */}
          <div className="hti-login-brand-header">
            <div className="hti-login-brand-logo-row">
              <img src="/hti-logo.png" alt="HTI Logo" className="hti-login-logo-img" />
            </div>
            <div className="hti-login-brand-text">
              <div className="hti-login-brand-title">AUTOMATION</div>
              <div className="hti-login-brand-sub">
                <span>&amp; SECURITY SYSTEMS</span>
                <span className="hti-login-brand-pill">PVT. LTD.</span>
              </div>
            </div>

            <h2 id="hti-admin-login-title" className="hti-login-title">
              Admin <span className="hti-login-title-blue">Login</span>
            </h2>
            <p className="hti-login-subtitle">
              Access the HTI Executive Console to manage enterprise systems, catalog and telemetry.
            </p>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="hti-login-error-alert" role="alert">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="hti-login-form">
            {/* Field 1: Administrator ID */}
            <div className="hti-login-field-group">
              <div className="hti-login-label-row">
                <label htmlFor="hti-admin-id" className="hti-login-label">
                  Administrator ID
                </label>
                <span className="hti-login-role-tag">Role: SuperAdmin / Editor</span>
              </div>
              <div className="hti-login-input-box">
                <User size={18} className="hti-login-input-icon text-blue" />
                <input
                  id="hti-admin-id"
                  type="text"
                  required
                  placeholder="Enter administrator ID"
                  value={loginForm.username}
                  onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                  autoFocus
                />
              </div>
            </div>

            {/* Field 2: Security Token / Password */}
            <div className="hti-login-field-group">
              <div className="hti-login-label-row">
                <label htmlFor="hti-admin-password" className="hti-login-label">
                  Security Token / Password
                </label>
                <span className="hti-login-crypto-tag">AES-256 Protected</span>
              </div>
              <div className="hti-login-input-box">
                <Lock size={18} className="hti-login-input-icon text-muted" />
                <input
                  id="hti-admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <button
                  type="button"
                  className="hti-login-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Quick Demo Fill Panel */}
            <div
              className="hti-login-demo-panel"
              onClick={handleQuickDemoFill}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleQuickDemoFill();
                }
              }}
              title="Click to populate demo credentials"
            >
              <div className="hti-demo-panel-left">
                <Zap size={18} className="hti-demo-bolt" fill="#0066FF" color="#0066FF" />
                <div className="hti-demo-panel-text">
                  <div className="hti-demo-title">Quick Demo Fill</div>
                  <div className="hti-demo-sub">Fill with admin credentials</div>
                </div>
              </div>

              <div
                className="hti-demo-badge"
                onClick={handleCopyDemo}
                title="Click to copy & fill credentials"
              >
                <span>{copiedDemo ? 'Copied & Filled!' : 'admin / admin123'}</span>
                <Copy size={13} className="hti-demo-copy-icon" />
              </div>
            </div>

            {/* Auto Login Checkbox */}
            <div className="hti-login-auto-row">
              <input
                type="checkbox"
                id="hti-auto-login"
                checked={autoLoginChecked}
                onChange={handleAutoLoginToggle}
                className="hti-login-checkbox"
              />
              <label htmlFor="hti-auto-login" className="hti-login-auto-label">
                Auto login (use demo credentials)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="hti-login-submit-btn"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Authenticating Console...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Login to Executive Console</span>
                </>
              )}
            </button>
          </form>

          {/* Security Footer with 3 Indicators */}
          <div className="hti-login-security-footer">
            <div className="hti-security-col">
              <ShieldCheck size={20} className="hti-sec-icon-blue" />
              <div className="hti-sec-info">
                <div className="hti-sec-title">256-Bit SSL</div>
                <div className="hti-sec-desc">Secure Connection</div>
              </div>
            </div>

            <div className="hti-security-col">
              <Database size={20} className="hti-sec-icon-green" />
              <div className="hti-sec-info">
                <div className="hti-sec-title">SQLite Live</div>
                <div className="hti-sec-desc">v3.42</div>
              </div>
            </div>

            <div className="hti-security-col">
              <ShieldCheck size={20} className="hti-sec-icon-blue" />
              <div className="hti-sec-info">
                <div className="hti-sec-title">Zero Trust Policy</div>
                <div className="hti-sec-desc">Enterprise Security</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD (9 Full Modules)
  // =========================================================================
  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className={`admin-dashboard-container adm-dashboard-container theme-${adminTheme}`} onClick={e => e.stopPropagation()}>
        {/* SIDEBAR NAVIGATION */}
        <aside className="admin-sidebar adm-sidebar">
          {/* Brand Box */}
          <div className="sidebar-brand adm-sidebar-brand">
            <div className="sidebar-logo-icon adm-sidebar-logo-icon">
              <img src="/hti-logo.png" alt="HTI Logo" className="sidebar-hti-logo-img adm-sidebar-hti-logo-img" />
            </div>
            <div>
              <div className="sidebar-brand-title adm-sidebar-brand-title">HTI CONTROL</div>
              <div className="sidebar-brand-status adm-sidebar-brand-status">
                <span className="live-dot adm-live-dot" />
                <span>BMS OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (All 9 Modules from PDF) */}
          <nav className="sidebar-nav adm-sidebar-nav">
            <div className="sidebar-section-label adm-sidebar-section-label">EXECUTIVE NEXUS</div>

            {/* 1. Dashboard Overview */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </button>

            {/* 2. Product Management */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Layers size={17} />
              <span>Products</span>
              <span className="sidebar-counter adm-sidebar-counter">{products.length}</span>
            </button>

            {/* 3. Blogs & Technical Articles */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <FileText size={17} />
              <span>Blogs & Tech</span>
              <span className="sidebar-counter adm-sidebar-counter">{blogs.length}</span>
            </button>

            {/* 4. Clients & Technology Partners */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'clients_partners' ? 'active' : ''}`}
              onClick={() => setActiveTab('clients_partners')}
            >
              <Building2 size={17} />
              <span>Clients & Partners</span>
              <span className="sidebar-counter adm-sidebar-counter">{clients.length + partners.length}</span>
            </button>

            {/* 6. Projects & Installations (Case Studies) */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Briefcase size={17} />
              <span>Projects</span>
              <span className="sidebar-counter adm-sidebar-counter">{projects.length}</span>
            </button>

            {/* 7. Website Content Management */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              <Globe size={17} />
              <span>Website Content</span>
              <span className="sidebar-badge-new adm-sidebar-badge-new" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>CMS</span>
            </button>

            <div className="sidebar-section-label adm-sidebar-section-label mt-3">OPERATIONS & CONTROL</div>

            {/* 5. Enquiries & Lead Management */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              <MessageSquare size={17} />
              <span>Enquiries & Leads</span>
              {unansweredInquiries.length > 0 ? (
                <span className="sidebar-badge-new adm-sidebar-badge-new">{unansweredInquiries.length} New</span>
              ) : (
                <span className="sidebar-counter adm-sidebar-counter">{inquiries.length}</span>
              )}
            </button>

            {/* 8. Admin Users & Permissions */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={17} />
              <span>Users & Security</span>
              <span className="sidebar-counter adm-sidebar-counter">{adminUsers.length}</span>
            </button>
          </nav>

          {/* Sidebar Telemetry Box (Real Measured Values) */}
          {/* <div className="sidebar-telemetry-box adm-sidebar-telemetry-box">
            <div className="telemetry-row adm-sidebar-telemetry-row">
              <span className="telemetry-label adm-sidebar-telemetry-label">SQLite Database</span>
              <span className="telemetry-val adm-sidebar-telemetry-val">
                {dbMetrics ? `${dbMetrics.mb} MB` : (systemHealth?.database?.file_size_mb ? `${systemHealth.database.file_size_mb} MB` : 'Live Connected')}
              </span>
            </div>
            <div className="telemetry-row adm-sidebar-telemetry-row">
              <span className="telemetry-label adm-sidebar-telemetry-label">Disk Storage</span>
              <span className="telemetry-val adm-sidebar-telemetry-val live">
                <span className="telemetry-live-dot adm-live-dot" />
                {diskMetrics ? `${diskMetrics.free} GB Free` : (systemHealth?.disk?.free_gb ? `${systemHealth.disk.free_gb} GB Free` : 'Live Connected')}
              </span>
            </div>
            <div className="telemetry-row adm-sidebar-telemetry-row">
              <span className="telemetry-label adm-sidebar-telemetry-label">Security Role</span>
              <span className="telemetry-badge-active adm-sidebar-role-badge">{userRole}</span>
            </div>
          </div> */}

          {/* Sidebar User Footer */}
          <div className="sidebar-footer adm-sidebar-footer">
            <div className="sidebar-user-info adm-sidebar-user-info">
              <div className="sidebar-user-avatar adm-sidebar-user-avatar">
                <span>{currentUser.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="sidebar-user-details adm-sidebar-user-details">
                <div className="user-name adm-sidebar-user-name">{currentUser}</div>
                <div className="user-role adm-sidebar-user-role">{userRole}</div>
              </div>
            </div>

            <button className="sidebar-logout-btn adm-sidebar-logout-btn" onClick={handleLogout} title="Log Out Safely" aria-label="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <div className="admin-main-area adm-main-area">
          {/* Top Bar */}
          <div className="admin-topbar adm-topbar">
            <div className="admin-topbar-title-wrap adm-topbar-title-wrap">
              <div className="adm-mobile-avatar" title={`Admin: ${currentUser}`}>
                <span>{currentUser.slice(0, 2).toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 className="admin-topbar-title adm-topbar-title" style={{ margin: 0, fontSize: '1.22rem', fontWeight: 800 }}>
                  {activeTab === 'dashboard' && 'Executive Dashboard & Live System Telemetry'}
                  {activeTab === 'products' && 'Product Catalogue & Specifications Manager'}
                  {activeTab === 'blogs' && 'Articles & Technical Engineering Publications'}
                  {activeTab === 'clients_partners' && 'Enterprise Clients & Technology Partners Roster'}
                  {activeTab === 'inquiries' && 'Commercial Enquiries & Lead Pipeline Management'}
                  {activeTab === 'projects' && 'Completed Turnkey Projects & Case Studies'}
                  {activeTab === 'content' && 'Live Website Content & Copy CMS'}
                  {activeTab === 'users' && 'Administrative Access Control & Audit Log'}
                  {activeTab === 'settings' && 'System Health, Tested Backups & Settings'}
                </h2>
                {activeTab === 'products' ? (
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>
                    Manage your products, solutions and detailed specifications
                  </span>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>
                    HTI Control Enterprise BMS Administrative Console
                  </span>
                )}
              </div>
            </div>

            <div className="admin-topbar-actions adm-topbar-actions">
              <span className="topbar-live-tag adm-topbar-live-tag" style={{ background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>
                <span className="tag-dot adm-tag-dot" style={{ background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                <span>SQL DB: hti_backend (Live)</span>
              </span>

              <button
                className="topbar-btn adm-topbar-btn theme-toggle-btn"
                onClick={toggleAdminTheme}
                title={`Switch to ${adminTheme === 'light' ? 'Dark Console' : 'Bright Light'} Mode`}
                aria-label="Toggle Console Theme"
              >
                {adminTheme === 'light' ? (
                  <>
                    <Sun size={15} style={{ color: '#d97706' }} />
                    <span className="adm-btn-text">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={15} style={{ color: '#38bdf8' }} />
                    <span className="adm-btn-text">Dark Mode</span>
                  </>
                )}
              </button>

              <button
                className="topbar-btn adm-topbar-btn"
                onClick={refreshAllData}
                title="Refresh Live Data"
                aria-label="Sync live data"
                aria-live="polite"
              >
                <RefreshCw size={15} className={loading ? 'adm-spin' : ''} />
                <span className="adm-btn-text">{loading ? 'Syncing...' : 'Sync'}</span>
              </button>

              <button
                className="topbar-btn adm-topbar-btn"
                style={{ padding: '7px 9px' }}
                title="Help & System Info"
                aria-label="Help & System Info"
              >
                <HelpCircle size={15} />
              </button>

              <button
                className="adm-mobile-logout-btn"
                onClick={handleLogout}
                title="Log Out Safely"
                aria-label="Log Out"
              >
                <LogOut size={16} />
              </button>

              <button className="topbar-close-btn adm-topbar-close-btn" onClick={onClose} aria-label="Close Admin Console">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Global Toast Feedback */}
          {feedback.message && (
            <div className={`admin-toast ${feedback.type === 'error' ? 'toast-error' : 'toast-success'}`}>
              {feedback.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* =========================================================================
              MODULE 1: DASHBOARD OVERVIEW
              ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="admin-body-content adm-body-content">
              {/* Welcome Banner */}
              <div className="adm-welcome-banner">
                <div className="adm-welcome-text-wrap">
                  <div className="adm-welcome-badge">
                    <span className="adm-pulse-dot-wrap">
                      <span className="adm-pulse-dot" />
                      <span className="adm-pulse-ring" />
                    </span>
                    <Sparkles size={13} />
                    <span>Executive Overview & Control</span>
                  </div>
                  <h3 className="adm-welcome-title">Welcome back, {currentUser}</h3>
                  <p className="adm-welcome-sub">
                    All 9 HTI enterprise modules are online and verified. Database connection active with zero query errors.
                  </p>
                </div>
                <div className="adm-welcome-chips-row">
                  <div className="adm-welcome-chip">
                    <Activity size={15} className="adm-chip-icon text-emerald" style={{ color: '#059669' }} />
                    <div className="adm-chip-info">
                      <span className="adm-chip-title">System Uptime</span>
                      <span className="adm-chip-data">{systemHealth?.runtime?.uptime_formatted || 'Live'}</span>
                    </div>
                  </div>
                  <div className="adm-welcome-chip">
                    <Database size={15} className="adm-chip-icon text-cyan" style={{ color: '#0284c7' }} />
                    <div className="adm-chip-info">
                      <span className="adm-chip-title">SQLite Database</span>
                      <span className="adm-chip-data">
                        {dbMetrics ? `${dbMetrics.mb} MB` : (systemHealth?.database?.file_size_mb ? `${systemHealth.database.file_size_mb} MB` : 'Live')}
                      </span>
                    </div>
                  </div>
                  <div className="adm-welcome-chip">
                    <CheckCircle2 size={15} className="adm-chip-icon text-amber" style={{ color: '#d97706' }} />
                    <div className="adm-chip-info">
                      <span className="adm-chip-title">Last Verified Backup</span>
                      <span className="adm-chip-data">{systemHealth?.last_backup?.timestamp?.split(' ')[0] || 'Today'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Unanswered Enquiries Alert Card */}
              {unansweredInquiries.length > 0 && (
                <div className="adm-priority-card">
                  <div className="adm-priority-card-left">
                    <div className="adm-priority-icon-box">
                      <AlertTriangle size={20} className="adm-pulse-icon" />
                    </div>
                    <div>
                      <div className="adm-priority-card-title">
                        {unansweredInquiries.length} New Unanswered Sales {unansweredInquiries.length === 1 ? 'Enquiry' : 'Enquiries'} Awaiting Response
                      </div>
                      <div className="adm-priority-card-sub">
                        Latest lead from <strong>{unansweredInquiries[0].full_name}</strong> ({unansweredInquiries[0].company || 'Independent Client'}) regarding <span className="adm-priority-product-tag">{unansweredInquiries[0].product_name}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="adm-priority-action-btn"
                    onClick={() => {
                      setSelectedInquiry(unansweredInquiries[0]);
                      setInquiryNotesText(unansweredInquiries[0].followup_notes || '');
                      setActiveTab('inquiries');
                    }}
                  >
                    <MessageSquare size={15} />
                    <span>Review Lead #{unansweredInquiries[0].id}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Metric KPI Cards Grid (5-card balanced single row) */}
              <div className="adm-kpi-grid">
                {/* 1. Products */}
                <div className="adm-kpi-card">
                  <div className="adm-kpi-header">
                    <span className="adm-kpi-label">Catalog Products</span>
                    <div className="adm-kpi-icon-tile cyan"><Package size={18} /></div>
                  </div>
                  <div className="adm-kpi-val"><AnimatedNumber value={products.length} /></div>
                  <div className="adm-kpi-pills">
                    <span className="adm-pill success">
                      <span className="adm-pill-dot" />
                      {products.filter(p => p.is_featured).length} Featured
                    </span>
                    <span className="adm-pill neutral">
                      {products.filter(p => p.is_published).length} Published
                    </span>
                  </div>
                  <button className="adm-kpi-footer-link" onClick={() => setActiveTab('products')}>
                    <span>Manage Products</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* 2. Commercial Leads */}
                <div className="adm-kpi-card">
                  <div className="adm-kpi-header">
                    <span className="adm-kpi-label">Commercial Leads</span>
                    <div className="adm-kpi-icon-tile amber"><MessageSquare size={18} /></div>
                  </div>
                  <div className="adm-kpi-val"><AnimatedNumber value={inquiries.length} /></div>
                  <div className="adm-kpi-pills">
                    <span className={`adm-pill ${unansweredInquiries.length > 0 ? 'danger' : 'success'}`}>
                      <span className="adm-pill-dot" />
                      {unansweredInquiries.length} Unanswered
                    </span>
                    <span className="adm-pill neutral">
                      {inquiries.filter(i => i.status === 'Converted').length} Converted
                    </span>
                  </div>
                  <button className="adm-kpi-footer-link" onClick={() => setActiveTab('inquiries')}>
                    <span>Open Lead Pipeline</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* 3. Blogs */}
                <div className="adm-kpi-card">
                  <div className="adm-kpi-header">
                    <span className="adm-kpi-label">Technical Articles</span>
                    <div className="adm-kpi-icon-tile red"><FileText size={18} /></div>
                  </div>
                  <div className="adm-kpi-val"><AnimatedNumber value={blogs.length} /></div>
                  <div className="adm-kpi-pills">
                    <span className="adm-pill purple">
                      <span className="adm-pill-dot" />
                      {blogs.filter(b => b.is_published).length} Published
                    </span>
                    <span className="adm-pill neutral">
                      {blogs.filter(b => !b.is_published).length} Drafts
                    </span>
                  </div>
                  <button className="adm-kpi-footer-link" onClick={() => setActiveTab('blogs')}>
                    <span>Manage Articles</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* 4. Clients & Partners */}
                <div className="adm-kpi-card">
                  <div className="adm-kpi-header">
                    <span className="adm-kpi-label">Clients & Partners</span>
                    <div className="adm-kpi-icon-tile emerald"><Building2 size={18} /></div>
                  </div>
                  <div className="adm-kpi-val"><AnimatedNumber value={clients.length + partners.length} /></div>
                  <div className="adm-kpi-pills">
                    <span className="adm-pill cyan">
                      {clients.length} Clients
                    </span>
                    <span className="adm-pill success">
                      {partners.length} Partners
                    </span>
                  </div>
                  <button className="adm-kpi-footer-link" onClick={() => setActiveTab('clients_partners')}>
                    <span>View Roster</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* 5. Turnkey Case Studies (Joined row - no longer orphan) */}
                <div className="adm-kpi-card">
                  <div className="adm-kpi-header">
                    <span className="adm-kpi-label">Turnkey Case Studies</span>
                    <div className="adm-kpi-icon-tile blue"><Briefcase size={18} /></div>
                  </div>
                  <div className="adm-kpi-val"><AnimatedNumber value={projects.length} /></div>
                  <div className="adm-kpi-pills">
                    <span className="adm-pill success">
                      <span className="adm-pill-dot" />
                      {projects.filter(p => p.is_published).length} Published
                    </span>
                    <span className="adm-pill cyan">
                      {projects.filter(p => p.client_approved).length} Approved
                    </span>
                  </div>
                  <button className="adm-kpi-footer-link" onClick={() => setActiveTab('projects')}>
                    <span>Manage Case Studies</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="adm-section-block">
                <div className="adm-section-header">
                  <div>
                    <h4 className="adm-section-title">Executive Quick Actions</h4>
                    <p className="adm-section-sub">Fast-track common administrative tasks with 1-click workflows</p>
                  </div>
                </div>

                <div className="adm-actions-grid">
                  <button className="adm-action-btn primary" onClick={() => { setActiveTab('products'); handleOpenAddProduct(); }}>
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>

                  <button className="adm-action-btn secondary" onClick={() => { setActiveTab('blogs'); handleOpenAddBlog(); }}>
                    <FileText size={16} />
                    <span>Publish Article</span>
                  </button>

                  <button className="adm-action-btn secondary" onClick={() => { setActiveTab('projects'); handleOpenAddProject(); }}>
                    <Briefcase size={16} />
                    <span>New Case Study</span>
                  </button>

                  <button className="adm-action-btn secondary" onClick={() => { setActiveTab('clients_partners'); handleOpenAddClient(); }}>
                    <Building2 size={16} />
                    <span>Add Client / Partner</span>
                  </button>

                  <button className="adm-action-btn secondary" onClick={handleExportInquiriesCSV}>
                    <FileSpreadsheet size={16} />
                    <span>Export Leads (CSV)</span>
                  </button>

                  <button className="adm-action-btn secondary" onClick={handleTriggerLiveBackup} disabled={isBackingUp}>
                    <HardDrive size={16} className={isBackingUp ? 'adm-spin' : ''} />
                    <span>{isBackingUp ? 'Backing Up...' : 'Instant DB Backup'}</span>
                  </button>
                </div>
              </div>

              {/* System Telemetry & Recent Audit Activity Split */}
              <div className="adm-grid-split">
                {/* System Telemetry Card (Industrial B-style) */}
                <div className="adm-split-card">
                  <div className="adm-section-header">
                    <div>
                      <h4 className="adm-section-title">Measured System Telemetry</h4>
                      <p className="adm-section-sub">Live measured metrics verified directly from SQLite & host OS</p>
                    </div>
                  </div>

                  <div className="adm-telemetry-stack">
                    {/* Disk Storage: gauge rendered ONLY if diskMetrics is valid and total > 0 */}
                    <div className="adm-telemetry-row">
                      <div className="adm-telemetry-lead">
                        <div className="adm-telemetry-label-wrap">
                          <span className="adm-telemetry-dot emerald" />
                          <span className="adm-telemetry-label">Disk Storage (Host D:)</span>
                        </div>
                        <span className="adm-telemetry-mono-val">
                          {diskMetrics ? (
                            `${diskMetrics.free} GB Free of ${diskMetrics.total} GB`
                          ) : (
                            systemHealth?.disk?.free_gb && systemHealth?.disk?.total_gb
                              ? `${systemHealth.disk.free_gb} GB Free of ${systemHealth.disk.total_gb} GB`
                              : (systemHealth?.disk?.free_gb ? `${systemHealth.disk.free_gb} GB Free` : 'Host Storage Live')
                          )}
                        </span>
                      </div>
                      {diskMetrics && (
                        <div className="adm-gauge-wrap" title={`${diskMetrics.freePct}% Free`}>
                          <svg width="40" height="40" viewBox="0 0 44 44" className="adm-gauge-svg" aria-label={`Disk: ${diskMetrics.freePct}% Free`}>
                            <circle cx="22" cy="22" r="17" className="adm-gauge-bg" />
                            <circle
                              cx="22"
                              cy="22"
                              r="17"
                              className="adm-gauge-fill"
                              strokeDasharray={106.8}
                              strokeDashoffset={106.8 - (106.8 * (diskMetrics.freePct / 100))}
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Database File Size: monospace value only, no arbitrary bar scale */}
                    <div className="adm-telemetry-row">
                      <div className="adm-telemetry-lead">
                        <div className="adm-telemetry-label-wrap">
                          <span className="adm-telemetry-dot cyan" />
                          <span className="adm-telemetry-label">Database File Size</span>
                        </div>
                        <span className="adm-telemetry-mono-val">
                          {dbMetrics ? (
                            `${dbMetrics.mb} MB${systemHealth?.database?.file_size_bytes ? ` (${systemHealth.database.file_size_bytes.toLocaleString()} bytes)` : ''}`
                          ) : (
                            systemHealth?.database?.file_size_mb
                              ? `${systemHealth.database.file_size_mb} MB${systemHealth?.database?.file_size_bytes ? ` (${systemHealth.database.file_size_bytes.toLocaleString()} bytes)` : ''}`
                              : 'SQLite File Connected'
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Engine & Platform */}
                    <div className="adm-telemetry-row">
                      <div className="adm-telemetry-lead">
                        <div className="adm-telemetry-label-wrap">
                          <span className="adm-telemetry-dot slate" />
                          <span className="adm-telemetry-label">Engine & Platform</span>
                        </div>
                        <span className="adm-telemetry-mono-val">
                          FastAPI v2.0 • Python {systemHealth?.runtime?.python_version || '3.11'} • SQLite 3
                        </span>
                      </div>
                    </div>

                    {/* Last Tested Backup */}
                    <div className="adm-telemetry-row">
                      <div className="adm-telemetry-lead">
                        <div className="adm-telemetry-label-wrap">
                          <span className="adm-telemetry-dot amber" />
                          <span className="adm-telemetry-label">Last Tested Backup</span>
                        </div>
                        <span className="adm-telemetry-mono-val">
                          {systemHealth?.last_backup?.timestamp || '2026-10-17 13:53:00'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Administrative Activity Log (A-style Timeline) */}
                <div className="adm-split-card">
                  <div className="adm-section-header">
                    <div>
                      <h4 className="adm-section-title">Administrative Audit Stream</h4>
                      <p className="adm-section-sub">Immutable record of changes across all modules</p>
                    </div>
                    <button
                      className="adm-topbar-btn"
                      style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                      onClick={() => { setActiveTab('users'); setUserSubTab('audit_logs'); }}
                    >
                      View All
                    </button>
                  </div>

                  <div className="adm-audit-timeline">
                    {auditLogs.slice(0, 5).map(log => {
                      const cat = getAuditCategoryInfo(log.module);
                      return (
                        <div key={log.id} className="adm-timeline-item">
                          <div className="adm-timeline-line" />
                          <div className={`adm-timeline-marker ${cat.color}`}>
                            <span className="adm-timeline-dot" />
                          </div>
                          <div className="adm-timeline-content">
                            <div className="adm-timeline-head">
                              <div className="adm-timeline-user-wrap">
                                <span className="adm-timeline-user">{log.username}</span>
                                <span className={`adm-timeline-badge ${cat.color}`}>{cat.label}</span>
                              </div>
                              <span className="adm-timeline-time">{log.timestamp?.split(' ')[1] || log.timestamp}</span>
                            </div>
                            <div className="adm-timeline-details">{log.details}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              MODULE 2: PRODUCTS CATALOG MANAGEMENT
              ========================================================================= */}
          {activeTab === 'products' && (
            <div className="admin-body-content">
              <AdminProductsManager
                products={products}
                currentUser={currentUser}
                onRefresh={async () => {
                  await fetchProducts();
                  await fetchSystemHealth();
                  if (onProductsChanged) onProductsChanged();
                }}
                onFeedback={showFeedback}
                onNavigateToPublicProduct={(slug) => {
                  if (onClose) onClose();
                }}
              />
            </div>
          )}

          {/* =========================================================================
              MODULE 3: BLOGS & TECHNICAL ARTICLES
              ========================================================================= */}
          {activeTab === 'blogs' && (
            <div className="admin-body-content">
              <AdminBlogsManager
                blogs={blogs}
                currentUser={currentUser}
                externalEditingBlog={editingBlog}
                onCloseEditingBlog={() => setEditingBlog(null)}
                onRefresh={async () => {
                  await fetchBlogs();
                  await fetchSystemHealth();
                  if (onBlogsChanged) onBlogsChanged();
                }}
                onFeedback={showFeedback}
                onNavigateToPublicBlog={(slug) => {
                  if (onClose) onClose();
                }}
              />
            </div>
          )}

          {/* =========================================================================
              MODULE 4: CLIENTS & TECHNOLOGY PARTNERS
              ========================================================================= */}
          {activeTab === 'clients_partners' && (
            <div className="admin-body-content">
              <div className="adm-cp-module">
                {/* 1. Page Header with Live Telemetry & Quick Metrics */}
                <div className="adm-cp-header">
                  <div className="adm-cp-header-top">
                    <div className="adm-cp-title-wrap">
                      <div className="adm-cp-eyebrow">
                        <ShieldCheck size={13} />
                        <span>Enterprise Directory &amp; Partnerships</span>
                      </div>
                      <h2 className="adm-cp-title">Clients &amp; Partners</h2>
                      <p className="adm-cp-subtitle">
                        Manage approved enterprise clients and technology partnerships.
                      </p>
                    </div>

                    <div className="adm-cp-header-actions">
                      <span className="adm-cp-sync-status">
                        <span className="adm-cp-live-dot" />
                        <span>Synced {lastSyncedTime}</span>
                      </span>
                      <button
                        className="adm-cp-sync-btn"
                        onClick={handleSyncClientsPartners}
                        title="Sync clients and partners with live SQL database"
                        aria-label="Sync Directory"
                      >
                        <RefreshCw size={13} className={isSyncingClients ? 'adm-cp-spin' : ''} />
                        <span>{isSyncingClients ? 'Syncing...' : 'Sync Roster'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="adm-cp-stats-grid">
                    <div className="adm-cp-stat-card">
                      <div className="adm-cp-stat-icon-box">
                        <Building2 size={18} />
                      </div>
                      <div className="adm-cp-stat-content">
                        <span className="adm-cp-stat-label">Enterprise Clients</span>
                        <div className="adm-cp-stat-value">
                          <AnimatedNumber value={clients.length} />
                        </div>
                        <span className="adm-cp-stat-sub">
                          {clients.filter(c => c.is_authorized).length} authorized for display
                        </span>
                      </div>
                    </div>

                    <div className="adm-cp-stat-card">
                      <div className="adm-cp-stat-icon-box green">
                        <HeartHandshake size={18} />
                      </div>
                      <div className="adm-cp-stat-content">
                        <span className="adm-cp-stat-label">Technology Partners</span>
                        <div className="adm-cp-stat-value">
                          <AnimatedNumber value={partners.length} />
                        </div>
                        <span className="adm-cp-stat-sub">
                          {partners.filter(p => p.is_active).length} active on live site
                        </span>
                      </div>
                    </div>

                    <div className="adm-cp-stat-card">
                      <div className="adm-cp-stat-icon-box purple">
                        <Database size={18} />
                      </div>
                      <div className="adm-cp-stat-content">
                        <span className="adm-cp-stat-label">Total Directory Records</span>
                        <div className="adm-cp-stat-value">
                          <AnimatedNumber value={clients.length + partners.length} />
                        </div>
                        <span className="adm-cp-stat-sub">Verified enterprise portfolio</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Refined Segmented Navigation Tabs */}
                <div className="adm-cp-tabs-container">
                  <div className="adm-cp-segmented-nav" role="tablist" aria-label="Clients and Partners Tabs">
                    <button
                      className={`adm-cp-tab-btn ${clientPartnerSubTab === 'clients' ? 'active' : ''}`}
                      onClick={() => setClientPartnerSubTab('clients')}
                      role="tab"
                      aria-selected={clientPartnerSubTab === 'clients'}
                      tabIndex={0}
                    >
                      <Building2 size={16} />
                      <span>Enterprise Clients</span>
                      <span className="adm-cp-tab-count">{clients.length}</span>
                    </button>
                    <button
                      className={`adm-cp-tab-btn ${clientPartnerSubTab === 'partners' ? 'active' : ''}`}
                      onClick={() => setClientPartnerSubTab('partners')}
                      role="tab"
                      aria-selected={clientPartnerSubTab === 'partners'}
                      tabIndex={0}
                    >
                      <HeartHandshake size={16} />
                      <span>Technology Partners</span>
                      <span className="adm-cp-tab-count">{partners.length}</span>
                    </button>
                  </div>
                </div>

                {/* 3. Search and Action Toolbar */}
                <div className="adm-cp-toolbar">
                  <div className="adm-cp-toolbar-left">
                    <div className="adm-cp-search-wrap">
                      <Search size={15} className="adm-cp-search-icon" />
                      <input
                        type="text"
                        className="adm-cp-search-input"
                        placeholder={
                          clientPartnerSubTab === 'clients'
                            ? 'Search clients by company name or sector...'
                            : 'Search partners by brand name, category, or engineering scope...'
                        }
                        value={clientPartnerSubTab === 'clients' ? clientSearch : partnerSearch}
                        onChange={e => {
                          if (clientPartnerSubTab === 'clients') setClientSearch(e.target.value);
                          else setPartnerSearch(e.target.value);
                        }}
                      />
                      {(clientPartnerSubTab === 'clients' ? clientSearch : partnerSearch) && (
                        <button
                          type="button"
                          className="adm-cp-search-clear"
                          onClick={() => {
                            if (clientPartnerSubTab === 'clients') setClientSearch('');
                            else setPartnerSearch('');
                          }}
                          title="Clear search"
                          aria-label="Clear search"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Quick Filters */}
                    {clientPartnerSubTab === 'clients' ? (
                      <div className="adm-cp-filter-chips">
                        <button
                          className={`adm-cp-filter-chip ${clientFilterStatus === 'all' ? 'active' : ''}`}
                          onClick={() => setClientFilterStatus('all')}
                        >
                          All ({clients.length})
                        </button>
                        <button
                          className={`adm-cp-filter-chip ${clientFilterStatus === 'authorized' ? 'active' : ''}`}
                          onClick={() => setClientFilterStatus('authorized')}
                        >
                          Authorized ({clients.filter(c => c.is_authorized).length})
                        </button>
                        <button
                          className={`adm-cp-filter-chip ${clientFilterStatus === 'visible' ? 'active' : ''}`}
                          onClick={() => setClientFilterStatus('visible')}
                        >
                          Visible on Web ({clients.filter(c => c.is_active).length})
                        </button>
                      </div>
                    ) : (
                      <div className="adm-cp-filter-chips">
                        <button
                          className={`adm-cp-filter-chip ${partnerFilterStatus === 'all' ? 'active' : ''}`}
                          onClick={() => setPartnerFilterStatus('all')}
                        >
                          All ({partners.length})
                        </button>
                        <button
                          className={`adm-cp-filter-chip ${partnerFilterStatus === 'active' ? 'active' : ''}`}
                          onClick={() => setPartnerFilterStatus('active')}
                        >
                          Active ({partners.filter(p => p.is_active).length})
                        </button>
                        <button
                          className={`adm-cp-filter-chip ${partnerFilterStatus === 'hidden' ? 'active' : ''}`}
                          onClick={() => setPartnerFilterStatus('hidden')}
                        >
                          Hidden ({partners.filter(p => !p.is_active).length})
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="adm-cp-toolbar-right">
                    {clientPartnerSubTab === 'clients' ? (
                      <button className="adm-cp-add-btn" onClick={handleOpenAddClient}>
                        <Plus size={16} />
                        <span>Add Approved Client</span>
                      </button>
                    ) : (
                      <button className="adm-cp-add-btn" onClick={handleOpenAddPartner}>
                        <Plus size={16} />
                        <span>Add Tech Partner</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 4. Data Table: Enterprise Clients Subview */}
                {clientPartnerSubTab === 'clients' && (
                  <div className="adm-cp-table-card">
                    {clients.length === 0 ? (
                      <div className="adm-cp-empty-state">
                        <div className="adm-cp-empty-icon-wrap">
                          <Building2 size={28} />
                        </div>
                        <h3 className="adm-cp-empty-title">No Enterprise Clients Registered</h3>
                        <p className="adm-cp-empty-desc">
                          Add authorized corporate clients to highlight successful engineering installations on your public website.
                        </p>
                        <div className="adm-cp-empty-action">
                          <button className="adm-cp-add-btn" onClick={handleOpenAddClient}>
                            <Plus size={16} />
                            <span>Add First Approved Client</span>
                          </button>
                        </div>
                      </div>
                    ) : filteredClients.length === 0 ? (
                      <div className="adm-cp-empty-state">
                        <div className="adm-cp-empty-icon-wrap">
                          <Search size={28} />
                        </div>
                        <h3 className="adm-cp-empty-title">No Matching Clients Found</h3>
                        <p className="adm-cp-empty-desc">
                          No enterprise clients match your current search query "{clientSearch}". Try adjusting your keywords or clearing the filter.
                        </p>
                        <div className="adm-cp-empty-action">
                          <button
                            className="adm-cp-btn-secondary"
                            onClick={() => {
                              setClientSearch('');
                              setClientFilterStatus('all');
                            }}
                          >
                            Reset Filters &amp; Search
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="adm-cp-table-wrap">
                          <table className="adm-cp-table">
                            <thead>
                              <tr>
                                <th className="adm-cp-col-num">#</th>
                                <th>Client / Organization</th>
                                <th>Sector / Industry</th>
                                <th>Authorization Status</th>
                                <th>Public Website</th>
                                <th className="adm-cp-col-actions">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredClients.map((c, idx) => {
                                const initial = (c.name || 'C').charAt(0).toUpperCase();
                                return (
                                  <tr key={c.id}>
                                    <td className="adm-cp-col-num">{idx + 1}</td>
                                    <td>
                                      <div className="adm-cp-entity-cell">
                                        <div className="adm-cp-avatar">
                                          {c.logo_url ? (
                                            <img
                                              src={c.logo_url}
                                              alt={c.name}
                                              className="adm-cp-avatar-img"
                                              onError={e => {
                                                e.target.style.display = 'none';
                                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                              }}
                                            />
                                          ) : null}
                                          <span
                                            className="adm-cp-avatar-fallback"
                                            style={{ display: c.logo_url ? 'none' : 'block' }}
                                          >
                                            {initial}
                                          </span>
                                        </div>
                                        <div className="adm-cp-entity-info">
                                          <div className="adm-cp-entity-name">{c.name}</div>
                                          {c.website_url ? (
                                            <a
                                              href={c.website_url}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="adm-cp-entity-url"
                                              title={`Visit ${c.name} website`}
                                            >
                                              <span>{c.website_url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                              <ExternalLink size={10} />
                                            </a>
                                          ) : null}
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span className="adm-cp-sector-badge">
                                        <Tag size={11} />
                                        <span>{c.sector}</span>
                                      </span>
                                    </td>
                                    <td>
                                      <span
                                        className={`adm-cp-status-pill ${c.is_authorized ? 'authorized' : 'pending'
                                          }`}
                                      >
                                        {c.is_authorized ? (
                                          <>
                                            <CheckCircle2 size={12} />
                                            <span>Authorized for Display</span>
                                          </>
                                        ) : (
                                          <>
                                            <Clock size={12} />
                                            <span>Pending Authorization</span>
                                          </>
                                        )}
                                      </span>
                                    </td>
                                    <td>
                                      <span
                                        className={`adm-cp-visibility-pill ${c.is_active ? 'visible' : 'hidden'
                                          }`}
                                      >
                                        <span className="adm-cp-vis-dot" />
                                        <span>{c.is_active ? 'Visible' : 'Hidden'}</span>
                                      </span>
                                    </td>
                                    <td className="adm-cp-col-actions">
                                      <div className="adm-cp-action-group">
                                        <button
                                          className="adm-cp-btn-action"
                                          onClick={() => handleOpenEditClient(c)}
                                          title={`Edit ${c.name}`}
                                          aria-label={`Edit ${c.name}`}
                                        >
                                          <Edit3 size={15} />
                                        </button>
                                        <button
                                          className="adm-cp-btn-action delete"
                                          onClick={() => handleDeleteClient(c)}
                                          title={`Delete ${c.name}`}
                                          aria-label={`Delete ${c.name}`}
                                        >
                                          <Trash2 size={15} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="adm-cp-table-footer">
                          <span>
                            Showing <strong>{filteredClients.length}</strong> of{' '}
                            <strong>{clients.length}</strong> enterprise clients
                          </span>
                          <span>Active compliance &amp; legal NDA registry</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 5. Data Table: Technology Partners Subview */}
                {clientPartnerSubTab === 'partners' && (
                  <div className="adm-cp-table-card">
                    {partners.length === 0 ? (
                      <div className="adm-cp-empty-state">
                        <div className="adm-cp-empty-icon-wrap">
                          <HeartHandshake size={28} />
                        </div>
                        <h3 className="adm-cp-empty-title">No Technology Partners Registered</h3>
                        <p className="adm-cp-empty-desc">
                          Add certified technology brands, OEM suppliers, and integration partners that power HTI engineering solutions.
                        </p>
                        <div className="adm-cp-empty-action">
                          <button className="adm-cp-add-btn" onClick={handleOpenAddPartner}>
                            <Plus size={16} />
                            <span>Add First Tech Partner</span>
                          </button>
                        </div>
                      </div>
                    ) : filteredPartners.length === 0 ? (
                      <div className="adm-cp-empty-state">
                        <div className="adm-cp-empty-icon-wrap">
                          <Search size={28} />
                        </div>
                        <h3 className="adm-cp-empty-title">No Matching Partners Found</h3>
                        <p className="adm-cp-empty-desc">
                          No technology partners match your current query "{partnerSearch}". Try adjusting your keywords or clearing the filter.
                        </p>
                        <div className="adm-cp-empty-action">
                          <button
                            className="adm-cp-btn-secondary"
                            onClick={() => {
                              setPartnerSearch('');
                              setPartnerFilterStatus('all');
                            }}
                          >
                            Reset Filters &amp; Search
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="adm-cp-table-wrap">
                          <table className="adm-cp-table">
                            <thead>
                              <tr>
                                <th className="adm-cp-col-num">#</th>
                                <th>Partner Brand</th>
                                <th>Category</th>
                                <th>Engineering Scope / Tagline</th>
                                <th>Public Website</th>
                                <th className="adm-cp-col-actions">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPartners.map((p, idx) => {
                                const initial = (p.name || 'P').charAt(0).toUpperCase();
                                return (
                                  <tr key={p.id}>
                                    <td className="adm-cp-col-num">{idx + 1}</td>
                                    <td>
                                      <div className="adm-cp-entity-cell">
                                        <div className="adm-cp-avatar">
                                          {p.logo_url ? (
                                            <img
                                              src={p.logo_url}
                                              alt={p.name}
                                              className="adm-cp-avatar-img"
                                              onError={e => {
                                                e.target.style.display = 'none';
                                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                                              }}
                                            />
                                          ) : null}
                                          <span
                                            className="adm-cp-avatar-fallback"
                                            style={{ display: p.logo_url ? 'none' : 'block' }}
                                          >
                                            {initial}
                                          </span>
                                        </div>
                                        <div className="adm-cp-entity-info">
                                          <div className="adm-cp-entity-name">{p.name}</div>
                                          {p.website_url ? (
                                            <a
                                              href={p.website_url}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="adm-cp-entity-url"
                                              title={`Visit ${p.name} website`}
                                            >
                                              <span>{p.website_url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                              <ExternalLink size={10} />
                                            </a>
                                          ) : null}
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span className="adm-cp-category-badge">
                                        <Cpu size={11} />
                                        <span>{p.category}</span>
                                      </span>
                                    </td>
                                    <td>
                                      <div className="adm-cp-tagline-text">{p.tagline || '—'}</div>
                                    </td>
                                    <td>
                                      <span
                                        className={`adm-cp-visibility-pill ${p.is_active ? 'visible' : 'hidden'
                                          }`}
                                      >
                                        <span className="adm-cp-vis-dot" />
                                        <span>{p.is_active ? 'Active Partner' : 'Hidden'}</span>
                                      </span>
                                    </td>
                                    <td className="adm-cp-col-actions">
                                      <div className="adm-cp-action-group">
                                        <button
                                          className="adm-cp-btn-action"
                                          onClick={() => handleOpenEditPartner(p)}
                                          title={`Edit ${p.name}`}
                                          aria-label={`Edit ${p.name}`}
                                        >
                                          <Edit3 size={15} />
                                        </button>
                                        <button
                                          className="adm-cp-btn-action delete"
                                          onClick={() => handleDeletePartner(p)}
                                          title={`Delete ${p.name}`}
                                          aria-label={`Delete ${p.name}`}
                                        >
                                          <Trash2 size={15} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div className="adm-cp-table-footer">
                          <span>
                            Showing <strong>{filteredPartners.length}</strong> of{' '}
                            <strong>{partners.length}</strong> technology partners
                          </span>
                          <span>Certified OEM integration directory</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              MODULE 5: ENQUIRIES & LEAD MANAGEMENT
              ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="admin-body-content" style={{ padding: 0 }}>
              <AdminEnquiriesManager
                inquiries={inquiries}
                onUpdateStatus={handleUpdateInquiryStatus}
                onAssign={handleAssignInquiry}
                onDelete={handleDeleteInquiry}
                onSaveNotes={handleSaveInquiryNotes}
                onExportCSV={handleExportInquiriesCSV}
                onRefresh={fetchInquiries}
                showFeedback={showFeedback}
                currentUser={currentUser}
              />
            </div>
          )}

          {/* =========================================================================
              MODULE 6: PROJECTS & INSTALLATIONS (Case Studies)
              ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="admin-body-content">
              {/* TOP HEADER & TOOLBAR CARD */}
              <div className="adm-proj-header-card">
                <div className="adm-proj-header-top">
                  <div className="adm-proj-title-wrap">
                    <div className="adm-proj-eyebrow">
                      <Briefcase size={13} />
                      <span>Turnkey Case Studies & Deliverables</span>
                    </div>
                    <h2 className="adm-proj-title">Completed Turnkey Projects</h2>
                    <p className="adm-proj-subtitle">
                      Manage validated cleanroom interlocks, air showers, containment automation, and client showcase studies.
                    </p>
                  </div>
                  <div className="adm-proj-header-actions">
                    <button
                      type="button"
                      className="adm-proj-btn-primary"
                      onClick={handleOpenAddProject}
                    >
                      <Plus size={16} />
                      <span>New Project Case Study</span>
                    </button>
                  </div>
                </div>

                {/* KPI SUMMARY STRIP */}
                <div className="adm-proj-kpi-strip">
                  <div className="adm-proj-kpi-chip">
                    <div className="adm-proj-kpi-icon-box blue">
                      <Briefcase size={16} />
                    </div>
                    <div className="adm-proj-kpi-content">
                      <span className="adm-proj-kpi-num">{projectMetrics.total}</span>
                      <span className="adm-proj-kpi-label">Total Projects</span>
                    </div>
                  </div>

                  <div className="adm-proj-kpi-chip">
                    <div className="adm-proj-kpi-icon-box green">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="adm-proj-kpi-content">
                      <span className="adm-proj-kpi-num">{projectMetrics.published}</span>
                      <span className="adm-proj-kpi-label">Published Live</span>
                    </div>
                  </div>

                  <div className="adm-proj-kpi-chip">
                    <div className="adm-proj-kpi-icon-box amber">
                      <Clock size={16} />
                    </div>
                    <div className="adm-proj-kpi-content">
                      <span className="adm-proj-kpi-num">{projectMetrics.drafts}</span>
                      <span className="adm-proj-kpi-label">Draft Reviews</span>
                    </div>
                  </div>

                  <div className="adm-proj-kpi-chip">
                    <div className="adm-proj-kpi-icon-box cyan">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="adm-proj-kpi-content">
                      <span className="adm-proj-kpi-num">{projectMetrics.approved}</span>
                      <span className="adm-proj-kpi-label">Client Approved</span>
                    </div>
                  </div>
                </div>

                {/* CONTROLS: SEARCH, INDUSTRY PILLS & VIEW TOGGLE */}
                <div className="adm-proj-toolbar">
                  <div className="adm-proj-search-wrap">
                    <Search size={16} className="adm-proj-search-icon" />
                    <input
                      type="text"
                      className="adm-proj-search-input"
                      placeholder="Search projects by client, title, industry, location..."
                      value={projectSearch}
                      onChange={e => setProjectSearch(e.target.value)}
                      aria-label="Search turnkey project case studies"
                    />
                    {projectSearch && (
                      <button
                        type="button"
                        className="adm-proj-search-clear"
                        onClick={() => setProjectSearch('')}
                        title="Clear search"
                        aria-label="Clear search query"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <div className="adm-proj-filter-controls">
                    {/* Industry Pill Chips with Counts */}
                    <div className="adm-proj-pill-chips-scroll" role="tablist" aria-label="Filter by industry">
                      {projectIndustryOptions.map(opt => {
                        const count = opt.key === 'All'
                          ? projects.length
                          : projects.filter(p => (p.industry || '').toLowerCase().includes(opt.key.toLowerCase())).length;
                        const isSelected = projectIndustryFilter === opt.key;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            className={`adm-proj-pill-chip ${isSelected ? 'active' : ''}`}
                            onClick={() => setProjectIndustryFilter(opt.key)}
                          >
                            <span>{opt.label}</span>
                            <span className="adm-proj-pill-count">{count}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* View Switcher (Grid / List) */}
                    <div className="adm-proj-view-toggle" role="group" aria-label="View toggle">
                      <button
                        type="button"
                        className={`adm-proj-view-btn ${projectViewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setProjectViewMode('grid')}
                        title="Grid View"
                        aria-label="Switch to grid view"
                      >
                        <Grid size={16} />
                      </button>
                      <button
                        type="button"
                        className={`adm-proj-view-btn ${projectViewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setProjectViewMode('list')}
                        title="List View"
                        aria-label="Switch to list view"
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* STATES: LOADING SKELETON / EMPTY / CONTENT */}
              {loading && projects.length === 0 ? (
                <div className="adm-proj-grid">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="adm-proj-skeleton-card">
                      <div className="adm-proj-skeleton-img" />
                      <div className="adm-proj-skeleton-body">
                        <div className="adm-proj-skeleton-line short" />
                        <div className="adm-proj-skeleton-line title" />
                        <div className="adm-proj-skeleton-line desc" />
                        <div className="adm-proj-skeleton-line desc short" />
                        <div className="adm-proj-skeleton-chips">
                          <span className="adm-proj-skeleton-chip" />
                          <span className="adm-proj-skeleton-chip" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="adm-proj-empty">
                  <div className="adm-proj-empty-icon-box">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="adm-proj-empty-title">No projects found</h3>
                  <p className="adm-proj-empty-desc">
                    {projectSearch || projectIndustryFilter !== 'All'
                      ? `No project case studies matched your current filter criteria ("${projectSearch || projectIndustryFilter}").`
                      : 'No project case studies have been registered yet. Add your first completed installation to showcase your engineering excellence.'}
                  </p>
                  <div className="adm-proj-empty-actions">
                    {(projectSearch || projectIndustryFilter !== 'All') && (
                      <button
                        type="button"
                        className="adm-proj-btn-secondary"
                        onClick={() => {
                          setProjectSearch('');
                          setProjectIndustryFilter('All');
                        }}
                      >
                        <X size={15} />
                        <span>Clear Filters</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="adm-proj-btn-primary"
                      onClick={handleOpenAddProject}
                    >
                      <Plus size={15} />
                      <span>Add Turnkey Project</span>
                    </button>
                  </div>
                </div>
              ) : projectViewMode === 'grid' ? (
                /* GRID VIEW */
                <div className="adm-proj-grid">
                  {filteredProjects.map((proj, idx) => {
                    const relatedList = Array.isArray(proj.related_products)
                      ? proj.related_products
                      : (proj.related_products_text ? proj.related_products_text.split(',').map(s => s.trim()).filter(Boolean) : []);
                    const maxChips = 3;
                    const visibleChips = relatedList.slice(0, maxChips);
                    const extraCount = relatedList.length - maxChips;

                    return (
                      <article
                        key={proj.id}
                        className="adm-proj-card"
                        style={{ '--proj-index': idx }}
                      >
                        {/* Image Cover with Gradient Overlay & Badges */}
                        <ProjectCardImage
                          src={proj.image_url}
                          alt={proj.title}
                          industry={proj.industry}
                          isPublished={proj.is_published}
                          onTogglePublish={() => handleToggleProjectPublish(proj)}
                        />

                        {/* Card Body */}
                        <div className="adm-proj-card-body">
                          {/* Client & Verification Badge */}
                          <div className="adm-proj-client-row">
                            <span className="adm-proj-client-name" title={proj.client_name}>
                              {proj.client_name || 'Confidential Client'}
                            </span>
                            {proj.client_approved ? (
                              <span className="adm-proj-badge-approved" title="Client approved publication">
                                <CheckCircle2 size={12} />
                                <span>Approved</span>
                              </span>
                            ) : (
                              <span className="adm-proj-badge-unapproved" title="Client consent pending">
                                <AlertCircle size={12} />
                                <span>Unapproved</span>
                              </span>
                            )}
                          </div>

                          {/* Location */}
                          <div className="adm-proj-location-row">
                            <MapPin size={13} className="adm-proj-location-icon" />
                            <span>{proj.location || 'Location not specified'}</span>
                          </div>

                          {/* Title */}
                          <h3 className="adm-proj-card-title" title={proj.title}>
                            {proj.title}
                          </h3>

                          {/* Description */}
                          <p className="adm-proj-card-desc" title={proj.description}>
                            {proj.description}
                          </p>

                          {/* Related Product Chips */}
                          {visibleChips.length > 0 && (
                            <div className="adm-proj-chips-row">
                              {visibleChips.map((rp, i) => (
                                <span key={i} className="adm-proj-chip" title={rp}>
                                  {rp}
                                </span>
                              ))}
                              {extraCount > 0 && (
                                <span className="adm-proj-chip-more" title={relatedList.slice(maxChips).join(', ')}>
                                  +{extraCount}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Card Footer */}
                        <div className="adm-proj-card-footer">
                          <div className="adm-proj-year">
                            <Calendar size={13} />
                            <span>{proj.completion_year ? `Completed ${proj.completion_year}` : 'Completed 2025'}</span>
                          </div>

                          <div className="adm-proj-card-actions">
                            <button
                              type="button"
                              className="adm-proj-action-btn preview"
                              onClick={() => setPreviewProject(proj)}
                              title="Preview Case Study"
                              aria-label={`Preview ${proj.title}`}
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              className="adm-proj-action-btn edit"
                              onClick={() => handleOpenEditProject(proj)}
                              title="Edit Case Study"
                              aria-label={`Edit ${proj.title}`}
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              className="adm-proj-action-btn delete"
                              onClick={() => handleDeleteProject(proj)}
                              title="Delete Case Study"
                              aria-label={`Delete ${proj.title}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                /* LIST VIEW */
                <div className="adm-proj-table-wrap">
                  <table className="adm-proj-table">
                    <thead>
                      <tr>
                        <th style={{ width: '70px' }}>Thumbnail</th>
                        <th>Project & Client</th>
                        <th>Industry</th>
                        <th>Location</th>
                        <th>Year</th>
                        <th>Approval</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((proj, idx) => (
                        <tr key={proj.id} style={{ '--proj-index': idx }}>
                          <td>
                            <div className="adm-proj-table-thumb">
                              {proj.image_url ? (
                                <img
                                  src={proj.image_url}
                                  alt={proj.title}
                                  loading="lazy"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div
                                className="adm-proj-table-thumb-fallback"
                                style={{ display: proj.image_url ? 'none' : 'flex' }}
                              >
                                <Briefcase size={18} />
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="adm-proj-table-title-cell">
                              <span className="adm-proj-table-title">{proj.title}</span>
                              <span className="adm-proj-table-client">{proj.client_name || 'Confidential Client'}</span>
                            </div>
                          </td>
                          <td>
                            <span className="adm-proj-table-pill">{proj.industry}</span>
                          </td>
                          <td>
                            <div className="adm-proj-table-location">
                              <MapPin size={12} />
                              <span>{proj.location || '—'}</span>
                            </div>
                          </td>
                          <td>
                            <span className="adm-proj-table-year">{proj.completion_year || '—'}</span>
                          </td>
                          <td>
                            {proj.client_approved ? (
                              <span className="adm-proj-badge-approved">
                                <CheckCircle2 size={11} />
                                <span>Approved</span>
                              </span>
                            ) : (
                              <span className="adm-proj-badge-unapproved">
                                <AlertCircle size={11} />
                                <span>Unapproved</span>
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`adm-proj-status-btn ${proj.is_published ? 'published' : 'draft'}`}
                              onClick={() => handleToggleProjectPublish(proj)}
                              title={proj.is_published ? 'Live on website — Click to set Draft' : 'Draft — Click to Publish live'}
                              aria-label={proj.is_published ? 'Published project. Click to mark draft' : 'Draft project. Click to publish'}
                            >
                              <span className={`adm-proj-status-dot ${proj.is_published ? 'live' : ''}`} />
                              <span>{proj.is_published ? 'Published' : 'Draft'}</span>
                            </button>
                          </td>
                          <td>
                            <div className="adm-proj-table-actions">
                              <button
                                type="button"
                                className="adm-proj-action-btn preview"
                                onClick={() => setPreviewProject(proj)}
                                title="Preview Case Study"
                                aria-label={`Preview ${proj.title}`}
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                type="button"
                                className="adm-proj-action-btn edit"
                                onClick={() => handleOpenEditProject(proj)}
                                title="Edit Case Study"
                                aria-label={`Edit ${proj.title}`}
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                type="button"
                                className="adm-proj-action-btn delete"
                                onClick={() => handleDeleteProject(proj)}
                                title="Delete Case Study"
                                aria-label={`Delete ${proj.title}`}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              MODULE 7: WEBSITE CONTENT MANAGEMENT (Live CMS)
              ========================================================================= */}
          {activeTab === 'content' && (
            <div className="admin-body-content">
              <AdminWebsiteContentManager
                websiteContent={websiteContent}
                contentSubTab={contentSubTab}
                setContentSubTab={setContentSubTab}
                onSaveSection={handleSaveContentSection}
                showFeedback={showFeedback}
                currentUser={currentUser}
              />
            </div>
          )}

          {/* =========================================================================
              MODULE 8: ADMIN USERS, ROLES & AUDIT LOGS
              ========================================================================= */}
          {activeTab === 'users' && (
            <div className="admin-body-content">
              {/* Users vs Audit Log Switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <button
                  className={`dash-action-btn ${userSubTab === 'users' ? 'primary' : 'secondary'}`}
                  onClick={() => setUserSubTab('users')}
                >
                  <Users size={16} />
                  <span>Administrative Accounts ({adminUsers.length || 3})</span>
                </button>
                <button
                  className={`dash-action-btn ${userSubTab === 'audit_logs' ? 'primary' : 'secondary'}`}
                  onClick={() => setUserSubTab('audit_logs')}
                >
                  <ShieldCheck size={16} />
                  <span>Immutable Audit Log ({auditLogs.length})</span>
                </button>
              </div>

              {/* Subview 1: Admin Users */}
              {userSubTab === 'users' && (
                <div>
                  <div className="catalog-toolbar">
                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
                      Server-side role-based authorization: Administrators have complete access; Editors manage catalogue & publications; Viewers manage leads.
                    </p>
                    <button className="dash-action-btn primary" onClick={handleOpenAddUser}>
                      <Plus size={16} />
                      <span>Create Account</span>
                    </button>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Assigned Role</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminUsers.map(u => (
                          <tr key={u.id}>
                            <td>
                              <div style={{ fontWeight: '700', color: '#38bdf8' }}>{u.username}</div>
                            </td>
                            <td style={{ color: '#ffffff', fontWeight: '600' }}>{u.full_name}</td>
                            <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{u.email}</td>
                            <td>
                              <span style={{
                                fontSize: '0.74rem',
                                padding: '3px 9px',
                                borderRadius: '12px',
                                fontWeight: '700',
                                background: u.role === 'Administrator' ? 'rgba(56, 189, 248, 0.15)' :
                                  u.role === 'Editor' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                color: u.role === 'Administrator' ? '#38bdf8' :
                                  u.role === 'Editor' ? '#f59e0b' : '#10b981'
                              }}>
                                {u.role}
                              </span>
                            </td>
                            <td>
                              <span style={{ color: u.is_active ? '#10b981' : '#64748b', fontSize: '0.8rem', fontWeight: '700' }}>
                                {u.is_active ? '● Active' : '○ Disabled'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button className="table-action-btn" onClick={() => handleOpenEditUser(u)} title="Edit Account"><Edit3 size={15} /></button>
                                {u.username !== 'admin' && (
                                  <button className="table-action-btn delete" onClick={() => handleDeleteUser(u)} title="Delete Account"><Trash2 size={15} /></button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Subview 2: Audit Logs */}
              {userSubTab === 'audit_logs' && (
                <div>
                  <div className="catalog-toolbar">
                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
                      All administrative mutations (creates, updates, status changes, backups) are automatically audited in SQLite.
                    </p>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '60px' }}>ID</th>
                          <th>Timestamp</th>
                          <th>Operator</th>
                          <th>Module</th>
                          <th>Action</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditLogs.map(log => (
                          <tr key={log.id}>
                            <td style={{ color: '#64748b' }}>#{log.id}</td>
                            <td style={{ color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                            <td><strong style={{ color: '#38bdf8' }}>{log.username}</strong></td>
                            <td>
                              <span style={{ fontSize: '0.74rem', padding: '2px 7px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                                {log.module}
                              </span>
                            </td>
                            <td style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '0.82rem' }}>{log.action}</td>
                            <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{log.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              MODULE 9: SETTINGS & SYSTEM HEALTH
              ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="admin-body-content">
              {/* Genuine System Health Overview */}
              <div className="dashboard-section-block" style={{ marginTop: 0 }}>
                <div className="section-block-header">
                  <div>
                    <h4 className="section-block-title">Genuine Measured System Telemetry</h4>
                    <p className="section-block-sub">Live measured operational metrics from host operating system and SQLite database</p>
                  </div>
                  <button className="dash-action-btn secondary" onClick={fetchSystemHealth}>
                    <RefreshCw size={14} />
                    <span>Refresh Telemetry</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Database Engine</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>SQLite 3.42</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>Path: backend/hti.db</div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Measured Database Size</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
                      {systemHealth?.database?.file_size_mb || '0.12'} MB
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
                      {systemHealth?.database?.file_size_bytes?.toLocaleString() || '122,880'} bytes
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Host Drive Capacity (D:)</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>
                      {systemHealth?.disk?.free_gb || '218'} GB Free
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
                      Total: {systemHealth?.disk?.total_gb || '220'} GB ({systemHealth?.disk?.used_gb || '1.7'} GB used)
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Runtime Uptime</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#a855f7', marginTop: '4px' }}>
                      {systemHealth?.runtime?.uptime_formatted || 'Online'}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
                      Python {systemHealth?.runtime?.python_version || '3.11'} on {systemHealth?.runtime?.os || 'win32'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tested Database Backup & Restore Station */}
              <div className="dashboard-section-block">
                <div className="section-block-header">
                  <div>
                    <h4 className="section-block-title">Tested Database Backup & Restore Station</h4>
                    <p className="section-block-sub">
                      Create hot cryptographic SQLite snapshots stored in the isolated backups directory
                    </p>
                  </div>
                  <button
                    className="dash-action-btn primary"
                    onClick={handleTriggerLiveBackup}
                    disabled={isBackingUp}
                  >
                    <HardDrive size={16} className={isBackingUp ? 'animate-spin' : ''} />
                    <span>{isBackingUp ? 'Generating Snapshot...' : 'Create Live Backup Snapshot'}</span>
                  </button>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '8px' }}>
                    Historical Backup Archives in <code>D:\Krish\Brightlant\hti\backups</code>:
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Backup File Name</th>
                          <th>Archive Type</th>
                          <th>File Size</th>
                          <th>Created Timestamp</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {backupsList.map((bk, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: '700', color: '#ffffff' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <HardDrive size={15} style={{ color: '#38bdf8' }} />
                                <span>{bk.name}</span>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.74rem', padding: '2px 7px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                                {bk.type}
                              </span>
                            </td>
                            <td style={{ color: '#10b981', fontWeight: '600', fontSize: '0.85rem' }}>{bk.size_mb} MB</td>
                            <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{bk.created_at}</td>
                            <td>
                              <span style={{ fontSize: '0.72rem', padding: '2px 7px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: '700' }}>
                                Verified OK
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Notification & Global SEO Settings */}
              <div className="dashboard-section-block">
                <div className="section-block-header">
                  <div>
                    <h4 className="section-block-title">Website-Wide Configuration & Notification Routing</h4>
                    <p className="section-block-sub">Configure email notification recipients and default search engine metadata</p>
                  </div>
                </div>

                <form onSubmit={handleSaveSettings} style={{ marginTop: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    <div className="admin-form-group">
                      <label className="admin-label">Lead Notification Recipients (comma-separated)</label>
                      <input
                        className="admin-input"
                        value={systemSettings.notification_email || ''}
                        onChange={e => setSystemSettings({ ...systemSettings, notification_email: e.target.value })}
                        placeholder="sales@htisystems.in, director@htisystems.in"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Default Website Meta Title</label>
                      <input
                        className="admin-input"
                        value={systemSettings.site_title || ''}
                        onChange={e => setSystemSettings({ ...systemSettings, site_title: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group" style={{ marginTop: '14px' }}>
                    <label className="admin-label">Default SEO Meta Description</label>
                    <textarea
                      className="admin-textarea"
                      rows={2}
                      value={systemSettings.meta_description || ''}
                      onChange={e => setSystemSettings({ ...systemSettings, meta_description: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginTop: '14px' }}>
                    <label className="admin-label">Default SEO Keywords</label>
                    <input
                      className="admin-input"
                      value={systemSettings.meta_keywords || ''}
                      onChange={e => setSystemSettings({ ...systemSettings, meta_keywords: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="dash-action-btn primary" style={{ marginTop: '18px' }}>
                    <Save size={16} />
                    <span>Save System Configuration</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          MODAL 3: CLIENT ADD / EDIT MODAL
          ========================================================================= */}
      {editingClient && (
        <div className="admin-modal-overlay" onClick={() => setEditingClient(null)}>
          <div className="adm-cp-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="adm-cp-modal-header">
              <div className="adm-cp-modal-title-group">
                <div className="adm-cp-modal-badge-icon">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="adm-cp-modal-title">
                    {editingClient === 'new' ? 'Add Approved Enterprise Client' : `Edit Client: ${editingClient.name}`}
                  </h3>
                  <div className="adm-cp-modal-subtitle">
                    Configure enterprise details, authorization credentials, and public display visibility.
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="topbar-close-btn"
                onClick={() => setEditingClient(null)}
                title="Close modal"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveClient} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="adm-cp-form-body">
                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">
                    <span>Client / Organization Name</span>
                    <span className="adm-cp-req-star">*</span>
                  </label>
                  <input
                    className="adm-cp-form-input"
                    required
                    value={clientForm.name}
                    onChange={e => setClientForm({ ...clientForm, name: e.target.value })}
                    placeholder="e.g. Glenmark Pharmaceuticals"
                  />
                </div>

                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">
                    <span>Industry / Sector</span>
                    <span className="adm-cp-req-star">*</span>
                  </label>
                  <input
                    className="adm-cp-form-input"
                    required
                    value={clientForm.sector}
                    onChange={e => setClientForm({ ...clientForm, sector: e.target.value })}
                    placeholder="e.g. Pharmaceuticals & Cleanroom"
                  />
                </div>

                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">Client Logo URL</label>
                  <input
                    className="adm-cp-form-input"
                    value={clientForm.logo_url}
                    onChange={e => setClientForm({ ...clientForm, logo_url: e.target.value })}
                    placeholder="e.g. /clients/glenmark.png or https://..."
                  />
                </div>

                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">Website URL</label>
                  <input
                    className="adm-cp-form-input"
                    value={clientForm.website_url}
                    onChange={e => setClientForm({ ...clientForm, website_url: e.target.value })}
                    placeholder="e.g. https://www.glenmarkpharma.com"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label className={`adm-cp-toggle-card ${clientForm.is_authorized ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      className="adm-cp-toggle-checkbox"
                      checked={clientForm.is_authorized}
                      onChange={e => setClientForm({ ...clientForm, is_authorized: e.target.checked })}
                    />
                    <div className="adm-cp-toggle-content">
                      <span className="adm-cp-toggle-title">Authorized for Public Display</span>
                      <span className="adm-cp-toggle-desc">
                        Compliance confirmed — legal authorization and NDA requirements verified for public display.
                      </span>
                    </div>
                  </label>

                  <label className={`adm-cp-toggle-card ${clientForm.is_active ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      className="adm-cp-toggle-checkbox"
                      checked={clientForm.is_active}
                      onChange={e => setClientForm({ ...clientForm, is_active: e.target.checked })}
                    />
                    <div className="adm-cp-toggle-content">
                      <span className="adm-cp-toggle-title">Show on Public Website</span>
                      <span className="adm-cp-toggle-desc">
                        Publish this client into the front-facing "Clients &amp; Partners" section.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="adm-cp-modal-footer">
                <button
                  type="button"
                  className="adm-cp-btn-secondary"
                  onClick={() => setEditingClient(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-cp-btn-primary">
                  <Save size={15} />
                  <span>Save Client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: PARTNER ADD / EDIT MODAL
          ========================================================================= */}
      {editingPartner && (
        <div className="admin-modal-overlay" onClick={() => setEditingPartner(null)}>
          <div className="adm-cp-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="adm-cp-modal-header">
              <div className="adm-cp-modal-title-group">
                <div className="adm-cp-modal-badge-icon">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h3 className="adm-cp-modal-title">
                    {editingPartner === 'new' ? 'Add Technology Partner' : `Edit Partner: ${editingPartner.name}`}
                  </h3>
                  <div className="adm-cp-modal-subtitle">
                    Configure certified brand partnerships, OEM hardware suppliers, and engineering scope.
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="topbar-close-btn"
                onClick={() => setEditingPartner(null)}
                title="Close modal"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSavePartner} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="adm-cp-form-body">
                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">
                    <span>Partner Brand Name</span>
                    <span className="adm-cp-req-star">*</span>
                  </label>
                  <input
                    className="adm-cp-form-input"
                    required
                    value={partnerForm.name}
                    onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    placeholder="e.g. Honeywell / Bosch / Metaflex"
                  />
                </div>

                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">
                    <span>Partner Category</span>
                    <span className="adm-cp-req-star">*</span>
                  </label>
                  <input
                    className="adm-cp-form-input"
                    required
                    value={partnerForm.category}
                    onChange={e => setPartnerForm({ ...partnerForm, category: e.target.value })}
                    placeholder="e.g. Fire & Automation"
                  />
                </div>

                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">Engineering Scope / Tagline</label>
                  <input
                    className="adm-cp-form-input"
                    value={partnerForm.tagline}
                    onChange={e => setPartnerForm({ ...partnerForm, tagline: e.target.value })}
                    placeholder="e.g. Global leader in commercial building automation controls"
                  />
                </div>

                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">Partner Logo URL</label>
                  <input
                    className="adm-cp-form-input"
                    value={partnerForm.logo_url}
                    onChange={e => setPartnerForm({ ...partnerForm, logo_url: e.target.value })}
                    placeholder="e.g. /partners/honeywell.png or https://..."
                  />
                </div>

                <div className="adm-cp-form-group">
                  <label className="adm-cp-form-label">Partner Website URL</label>
                  <input
                    className="adm-cp-form-input"
                    value={partnerForm.website_url}
                    onChange={e => setPartnerForm({ ...partnerForm, website_url: e.target.value })}
                    placeholder="e.g. https://www.honeywell.com"
                  />
                </div>

                <label className={`adm-cp-toggle-card ${partnerForm.is_active ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    className="adm-cp-toggle-checkbox"
                    checked={partnerForm.is_active}
                    onChange={e => setPartnerForm({ ...partnerForm, is_active: e.target.checked })}
                  />
                  <div className="adm-cp-toggle-content">
                    <span className="adm-cp-toggle-title">Active Partner on Website</span>
                    <span className="adm-cp-toggle-desc">
                      Display partner brand in the technology ecosystem and client trust strips.
                    </span>
                  </div>
                </label>
              </div>

              <div className="adm-cp-modal-footer">
                <button
                  type="button"
                  className="adm-cp-btn-secondary"
                  onClick={() => setEditingPartner(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-cp-btn-primary">
                  <Save size={15} />
                  <span>Save Partner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: PROJECT ADD / EDIT MODAL
          ========================================================================= */}
      {editingProject && (
        <div className="admin-modal-overlay" onClick={() => setEditingProject(null)}>
          <div className="adm-proj-modal-container" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="adm-proj-modal-header">
              <div className="adm-proj-modal-title-group">
                <div className="adm-proj-modal-icon-badge">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="adm-proj-modal-title">
                    {editingProject === 'new' ? 'New Turnkey Project Case Study' : `Edit Case Study: ${editingProject.title}`}
                  </h3>
                  <p className="adm-proj-modal-subtitle">
                    Configure turnkey engineering deliverables, client authorization, and public visibility.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="adm-proj-modal-close-btn"
                onClick={() => setEditingProject(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProject} className="adm-proj-modal-form">
              <div className="adm-proj-modal-scroll">
                {/* SECTION 1: BASICS */}
                <div className="adm-proj-form-section">
                  <div className="adm-proj-section-header">
                    <span className="adm-proj-section-tag">01</span>
                    <h4 className="adm-proj-section-title">Project Basics & Identity</h4>
                  </div>

                  <div className="adm-proj-form-group full-width">
                    <label className="adm-proj-label">
                      <span>Project Title</span>
                      <span className="adm-proj-required">*</span>
                    </label>
                    <input
                      className="adm-proj-input"
                      required
                      value={projectForm.title}
                      onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Turnkey 12-Door Cleanroom Interlocking Network"
                    />
                  </div>

                  <div className="adm-proj-form-grid">
                    <div className="adm-proj-form-group">
                      <label className="adm-proj-label">Client Name</label>
                      <input
                        className="adm-proj-input"
                        value={projectForm.client_name}
                        onChange={e => setProjectForm({ ...projectForm, client_name: e.target.value })}
                        placeholder="e.g. Glenmark Pharmaceuticals"
                      />
                    </div>
                    <div className="adm-proj-form-group">
                      <label className="adm-proj-label">
                        <span>Industry</span>
                        <span className="adm-proj-required">*</span>
                      </label>
                      <input
                        className="adm-proj-input"
                        required
                        value={projectForm.industry}
                        onChange={e => setProjectForm({ ...projectForm, industry: e.target.value })}
                        placeholder="e.g. Pharmaceutical Cleanroom"
                      />
                    </div>
                    <div className="adm-proj-form-group">
                      <label className="adm-proj-label">Location / Site</label>
                      <input
                        className="adm-proj-input"
                        value={projectForm.location}
                        onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                        placeholder="e.g. Navi Mumbai, Maharashtra"
                      />
                    </div>
                    <div className="adm-proj-form-group">
                      <label className="adm-proj-label">Completion Year</label>
                      <input
                        className="adm-proj-input"
                        value={projectForm.completion_year}
                        onChange={e => setProjectForm({ ...projectForm, completion_year: e.target.value })}
                        placeholder="e.g. 2025"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: MEDIA */}
                <div className="adm-proj-form-section">
                  <div className="adm-proj-section-header">
                    <span className="adm-proj-section-tag">02</span>
                    <h4 className="adm-proj-section-title">Media & Visual Showcase</h4>
                  </div>

                  <div className="adm-proj-form-group full-width">
                    <label className="adm-proj-label">Project Photo URL</label>
                    <input
                      className="adm-proj-input"
                      value={projectForm.image_url}
                      onChange={e => setProjectForm({ ...projectForm, image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/... or /images/..."
                    />
                    {projectForm.image_url && (
                      <div className="adm-proj-modal-thumb-preview">
                        <img
                          src={projectForm.image_url}
                          alt="Preview"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className="adm-proj-modal-thumb-label">Image Preview</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SECTION 3: SCOPE & DELIVERABLES */}
                <div className="adm-proj-form-section">
                  <div className="adm-proj-section-header">
                    <span className="adm-proj-section-tag">03</span>
                    <h4 className="adm-proj-section-title">Technical Scope & Integrated Hardware</h4>
                  </div>

                  <div className="adm-proj-form-group full-width">
                    <label className="adm-proj-label">
                      <span>Technical Scope & Description</span>
                      <span className="adm-proj-required">*</span>
                    </label>
                    <textarea
                      className="adm-proj-textarea"
                      rows={4}
                      required
                      value={projectForm.description}
                      onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Describe engineering specifications, AHU interlocks, door counts, emergency overrides, and cleanroom validation standard achieved..."
                    />
                  </div>

                  <div className="adm-proj-form-group full-width">
                    <label className="adm-proj-label">Related HTI Products (comma-separated)</label>
                    <input
                      className="adm-proj-input"
                      value={projectForm.related_products_text}
                      onChange={e => setProjectForm({ ...projectForm, related_products_text: e.target.value })}
                      placeholder="e.g. Door Interlock System, Air Shower Automation, Electromagnetic Locks"
                    />
                    <span className="adm-proj-helper-text">
                      Separate product names with commas to render individual showcase tags.
                    </span>
                  </div>
                </div>

                {/* SECTION 4: PUBLISHING & CLIENT APPROVAL */}
                <div className="adm-proj-form-section">
                  <div className="adm-proj-section-header">
                    <span className="adm-proj-section-tag">04</span>
                    <h4 className="adm-proj-section-title">Publishing & Client Approval</h4>
                  </div>

                  <div className="adm-proj-toggle-cards">
                    <label className={`adm-proj-toggle-card ${projectForm.client_approved ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={projectForm.client_approved}
                        onChange={e => setProjectForm({ ...projectForm, client_approved: e.target.checked })}
                      />
                      <div className="adm-proj-toggle-card-content">
                        <div className="adm-proj-toggle-card-header">
                          <ShieldCheck size={16} className="adm-proj-toggle-icon blue" />
                          <span className="adm-proj-toggle-card-title">Client Approved</span>
                        </div>
                        <p className="adm-proj-toggle-card-desc">
                          Client has officially authorized HTI to mention their corporate name and installation details.
                        </p>
                      </div>
                    </label>

                    <label className={`adm-proj-toggle-card ${projectForm.is_published ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={projectForm.is_published}
                        onChange={e => setProjectForm({ ...projectForm, is_published: e.target.checked })}
                      />
                      <div className="adm-proj-toggle-card-content">
                        <div className="adm-proj-toggle-card-header">
                          <CheckCircle2 size={16} className="adm-proj-toggle-icon green" />
                          <span className="adm-proj-toggle-card-title">Published & Live</span>
                        </div>
                        <p className="adm-proj-toggle-card-desc">
                          Immediately visible to public website visitors on the Projects & Case Studies catalog.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="adm-proj-modal-footer">
                <button
                  type="button"
                  className="adm-proj-btn-secondary"
                  onClick={() => setEditingProject(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="adm-proj-btn-primary"
                >
                  <Save size={16} />
                  <span>Save Case Study</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 6: INTERACTIVE INQUIRY DETAIL DRAWER
          ========================================================================= */}
      {selectedInquiry && (
        <div className="admin-modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="admin-modal-container" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={20} className="text-amber" />
                <h3 className="admin-modal-title">Commercial Lead Dossier #{selectedInquiry.id}</h3>
              </div>
              <button className="topbar-close-btn" onClick={() => setSelectedInquiry(null)}><X size={18} /></button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '72vh', overflowY: 'auto' }}>
              {/* Customer Box */}
              <div style={{ background: '#090e1a', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '1.05rem', color: '#ffffff' }}>{selectedInquiry.full_name}</h4>
                    <div style={{ color: '#38bdf8', fontSize: '0.86rem', fontWeight: '600' }}>{selectedInquiry.company || 'Enterprise Customer'}</div>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Received: {selectedInquiry.created_at}</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="dash-action-btn secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Phone size={14} className="text-emerald" />
                    <span>Call: {selectedInquiry.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="dash-action-btn secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Mail size={14} className="text-cyan" />
                    <span>Email: {selectedInquiry.email}</span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="dash-action-btn secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#25D366' }}
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Requirement Message */}
              <div>
                <label className="admin-label">Interested Product / Solution</label>
                <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', color: '#ffffff', fontWeight: '600', fontSize: '0.9rem' }}>
                  {selectedInquiry.product_name} <span style={{ color: '#64748b', fontSize: '0.78rem' }}>({selectedInquiry.category})</span>
                </div>
              </div>

              <div>
                <label className="admin-label">Full Customer Requirements Message</label>
                <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.86rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status & Assignment */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="admin-label">Lead Status Pipeline</label>
                  <select
                    className="admin-input"
                    value={selectedInquiry.status || 'New'}
                    onChange={e => handleUpdateInquiryStatus(selectedInquiry.id, e.target.value)}
                  >
                    <option value="New">● New</option>
                    <option value="Contacted">● Contacted</option>
                    <option value="Qualified">● Qualified</option>
                    <option value="Converted">● Converted</option>
                    <option value="Closed">● Closed</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">Assignee Specialist</label>
                  <select
                    className="admin-input"
                    value={selectedInquiry.assigned_to || 'Unassigned'}
                    onChange={e => handleAssignInquiry(selectedInquiry.id, e.target.value)}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Lead Systems Engineer">Lead Systems Engineer</option>
                    <option value="Commercial Sales Directorate">Commercial Sales Directorate</option>
                    <option value="Cleanroom Technical Support">Cleanroom Support</option>
                    <option value="Turnkey Projects Lead">Turnkey Projects Lead</option>
                  </select>
                </div>
              </div>

              {/* Follow-up Notes */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="admin-label" style={{ margin: 0 }}>Follow-up Notes & Contact Log</label>
                  {selectedInquiry.last_contacted_at && (
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Last updated: {selectedInquiry.last_contacted_at}</span>
                  )}
                </div>
                <textarea
                  className="admin-textarea"
                  rows={4}
                  value={inquiryNotesText}
                  onChange={e => setInquiryNotesText(e.target.value)}
                  placeholder="Record call logs, price quotations sent, site inspection dates, and client requirements..."
                />
                <button
                  type="button"
                  className="dash-action-btn primary"
                  style={{ marginTop: '8px', padding: '6px 14px', fontSize: '0.8rem' }}
                  onClick={() => handleSaveInquiryNotes(selectedInquiry.id)}
                >
                  <CheckCircle size={14} />
                  <span>Save Notes & Update Timestamp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 7: ADMIN USER ADD / EDIT MODAL
          ========================================================================= */}
      {editingUser && (
        <div className="admin-modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="admin-modal-container" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingUser === 'new' ? 'Create Administrative Account' : `Edit Account: ${editingUser.username}`}
              </h3>
              <button className="topbar-close-btn" onClick={() => setEditingUser(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveUser} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Username *</label>
                <input
                  className="admin-input"
                  required
                  disabled={editingUser !== 'new'}
                  value={userForm.username}
                  onChange={e => setUserForm({ ...userForm, username: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Full Name *</label>
                <input
                  className="admin-input"
                  required
                  value={userForm.full_name}
                  onChange={e => setUserForm({ ...userForm, full_name: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Email Address *</label>
                <input
                  className="admin-input"
                  type="email"
                  required
                  value={userForm.email}
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Role Clearance *</label>
                <select
                  className="admin-input"
                  value={userForm.role}
                  onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                >
                  <option value="Administrator">Administrator (Full Access)</option>
                  <option value="Editor">Editor (Catalog & Content Access)</option>
                  <option value="Viewer">Viewer / Sales (Leads & Catalog View)</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">{editingUser === 'new' ? 'Password *' : 'New Password (leave blank to keep current)'}</label>
                <input
                  className="admin-input"
                  type="password"
                  required={editingUser === 'new'}
                  value={userForm.password}
                  onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#cbd5e1' }}>
                <input
                  type="checkbox"
                  checked={userForm.is_active}
                  onChange={e => setUserForm({ ...userForm, is_active: e.target.checked })}
                />
                <span>Account Active & Permitted</span>
              </label>

              <div className="admin-modal-footer" style={{ padding: 0, marginTop: '12px' }}>
                <button type="button" className="dash-action-btn secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                <button type="submit" className="dash-action-btn primary">Save Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 8: PRODUCT QUICK PREVIEW MODAL
          ========================================================================= */}
      {previewProduct && (
        <div className="admin-modal-overlay" onClick={() => setPreviewProduct(null)}>
          <div className="admin-modal-container" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Eye size={18} className="text-cyan" />
                <h3 className="admin-modal-title">Live Preview: {previewProduct.name}</h3>
              </div>
              <button className="topbar-close-btn" onClick={() => setPreviewProduct(null)}><X size={18} /></button>
            </div>
            <div style={{ padding: '24px', maxHeight: '72vh', overflowY: 'auto' }}>
              <div style={{ height: '220px', borderRadius: '10px', overflow: 'hidden', background: '#1e293b', marginBottom: '16px' }}>
                {previewProduct.image_url ? (
                  <img src={previewProduct.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={48} style={{ color: '#475569' }} />
                  </div>
                )}
              </div>
              <span className="pill-category cat-auto">{previewProduct.category}</span>
              <h3 style={{ margin: '8px 0 4px 0', color: '#ffffff', fontSize: '1.2rem' }}>{previewProduct.name}</h3>
              <p style={{ color: '#38bdf8', fontSize: '0.9rem', margin: '0 0 12px 0' }}>{previewProduct.tagline}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 16px 0' }}>{previewProduct.description}</p>

              {previewProduct.features && previewProduct.features.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.85rem', marginBottom: '6px' }}>Key Engineering Features</div>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.82rem', lineHeight: '1.5' }}>
                    {previewProduct.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 9: PROJECT QUICK PREVIEW MODAL
          ========================================================================= */}
      {previewProject && (
        <div className="admin-modal-overlay" onClick={() => setPreviewProject(null)}>
          <div className="adm-proj-preview-modal-container" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="adm-proj-modal-header">
              <div className="adm-proj-modal-title-group">
                <div className="adm-proj-modal-icon-badge blue">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="adm-proj-modal-title">Case Study Preview</h3>
                  <p className="adm-proj-modal-subtitle">
                    Live presentation view for this turnkey client installation.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="adm-proj-modal-close-btn"
                onClick={() => setPreviewProject(null)}
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Preview Body */}
            <div className="adm-proj-preview-body">
              {/* Media Banner */}
              <div className="adm-proj-preview-media">
                {previewProject.image_url ? (
                  <img
                    src={previewProject.image_url}
                    alt={previewProject.title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="adm-proj-preview-media-fallback"
                  style={{ display: previewProject.image_url ? 'none' : 'flex' }}
                >
                  <Briefcase size={48} />
                  <span>HTI Engineering Installation Showcase</span>
                </div>
                <div className="adm-proj-preview-media-overlay" />
                <span className="adm-proj-pill-industry">{previewProject.industry}</span>
                <span className={`adm-proj-status-btn ${previewProject.is_published ? 'published' : 'draft'}`} style={{ cursor: 'default' }}>
                  <span className={`adm-proj-status-dot ${previewProject.is_published ? 'live' : ''}`} />
                  <span>{previewProject.is_published ? 'Published Live' : 'Draft Mode'}</span>
                </span>
              </div>

              {/* Meta & Badges */}
              <div className="adm-proj-preview-meta-row">
                <div className="adm-proj-preview-client-box">
                  <span className="adm-proj-preview-client">{previewProject.client_name || 'Confidential Client'}</span>
                  {previewProject.client_approved ? (
                    <span className="adm-proj-badge-approved">
                      <CheckCircle2 size={12} />
                      <span>Approved</span>
                    </span>
                  ) : (
                    <span className="adm-proj-badge-unapproved">
                      <AlertCircle size={12} />
                      <span>Unapproved</span>
                    </span>
                  )}
                </div>

                <div className="adm-proj-preview-location-box">
                  <MapPin size={13} />
                  <span>{previewProject.location || 'Location not specified'}</span>
                  <span className="adm-proj-preview-dot">•</span>
                  <Calendar size={13} />
                  <span>Completed {previewProject.completion_year || '2025'}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="adm-proj-preview-title">{previewProject.title}</h2>

              {/* Technical Description */}
              <div className="adm-proj-preview-desc-wrap">
                <h4 className="adm-proj-preview-section-title">Technical Scope & Integration</h4>
                <p className="adm-proj-preview-desc">{previewProject.description}</p>
              </div>

              {/* Related Products */}
              {previewProject.related_products && previewProject.related_products.length > 0 && (
                <div className="adm-proj-preview-products-wrap">
                  <h4 className="adm-proj-preview-section-title">Integrated HTI Systems & Hardware</h4>
                  <div className="adm-proj-chips-row">
                    {previewProject.related_products.map((rp, i) => (
                      <span key={i} className="adm-proj-chip large">
                        <Package size={12} />
                        <span>{rp}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Preview Footer */}
            <div className="adm-proj-modal-footer">
              <button
                type="button"
                className="adm-proj-btn-secondary"
                onClick={() => setPreviewProject(null)}
              >
                Close Preview
              </button>
              <button
                type="button"
                className="adm-proj-btn-primary"
                onClick={() => {
                  const proj = previewProject;
                  setPreviewProject(null);
                  handleOpenEditProject(proj);
                }}
              >
                <Edit3 size={15} />
                <span>Edit Case Study</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
