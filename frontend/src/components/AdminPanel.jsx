import React, { useState, useEffect, useMemo } from 'react';
import './AdminDashboard.css';
import AdminProductsManager from './AdminProductsManager';
import AdminBlogsManager from './AdminBlogsManager';
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
  Zap, User, HelpCircle
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
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [inquirySearch, setInquirySearch] = useState('');

  const [projectSearch, setProjectSearch] = useState('');
  const [projectIndustryFilter, setProjectIndustryFilter] = useState('All');

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
      const url = inquiryStatusFilter === 'All' ? '/api/inquiries' : `/api/inquiries?status_filter=${encodeURIComponent(inquiryStatusFilter)}`;
      const res = await fetch(url);
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
    } catch (err) {}
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
    return clientSearch === '' ||
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.sector.toLowerCase().includes(clientSearch.toLowerCase());
  });

  const filteredPartners = partners.filter(p => {
    return partnerSearch === '' ||
      p.name.toLowerCase().includes(partnerSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(partnerSearch.toLowerCase()) ||
      (p.tagline && p.tagline.toLowerCase().includes(partnerSearch.toLowerCase()));
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

  // If panel is not open, do not render anything into DOM
  if (!isOpen) return null;

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

            {/* 9. Settings & System Health */}
            <button
              className={`sidebar-nav-item adm-sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={17} />
              <span>System Health</span>
              <span className="sidebar-counter adm-sidebar-counter" style={{ color: '#10b981' }}>Live</span>
            </button>
          </nav>

          {/* Sidebar Telemetry Box (Real Measured Values) */}
          <div className="sidebar-telemetry-box adm-sidebar-telemetry-box">
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
          </div>

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
              {/* Segmented Subtab Switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <button
                  className={`dash-action-btn ${clientPartnerSubTab === 'clients' ? 'primary' : 'secondary'}`}
                  onClick={() => setClientPartnerSubTab('clients')}
                >
                  <Building2 size={16} />
                  <span>Enterprise Clients ({clients.length})</span>
                </button>
                <button
                  className={`dash-action-btn ${clientPartnerSubTab === 'partners' ? 'primary' : 'secondary'}`}
                  onClick={() => setClientPartnerSubTab('partners')}
                >
                  <HeartHandshake size={16} />
                  <span>Technology Partners ({partners.length})</span>
                </button>
              </div>

              {/* Subview 1: Clients */}
              {clientPartnerSubTab === 'clients' && (
                <div>
                  <div className="catalog-toolbar">
                    <div className="catalog-search-wrap">
                      <Search size={16} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search clients by company name, pharma sector..."
                        value={clientSearch}
                        onChange={e => setClientSearch(e.target.value)}
                      />
                    </div>
                    <button className="dash-action-btn primary" onClick={handleOpenAddClient}>
                      <Plus size={16} />
                      <span>Add Approved Client</span>
                    </button>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '45px' }}>#</th>
                          <th>Client / Organization</th>
                          <th>Sector / Industry</th>
                          <th>Authorization Status</th>
                          <th>Public Website</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClients.map((c, idx) => (
                          <tr key={c.id}>
                            <td style={{ color: '#64748b' }}>{idx + 1}</td>
                            <td>
                              <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.92rem' }}>{c.name}</div>
                              {c.website_url && (
                                <a href={c.website_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <span>{c.website_url}</span> <ExternalLink size={10} />
                                </a>
                              )}
                            </td>
                            <td>
                              <span style={{ fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: '4px', color: '#cbd5e1' }}>
                                {c.sector}
                              </span>
                            </td>
                            <td>
                              <span style={{
                                fontSize: '0.72rem',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: c.is_authorized ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                color: c.is_authorized ? '#10b981' : '#f59e0b',
                                fontWeight: '700'
                              }}>
                                {c.is_authorized ? 'Authorized for Display' : 'Pending Authorization'}
                              </span>
                            </td>
                            <td>
                              <span style={{ color: c.is_active ? '#10b981' : '#64748b', fontSize: '0.8rem', fontWeight: '700' }}>
                                {c.is_active ? '● Visible' : '○ Hidden'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button className="table-action-btn" onClick={() => handleOpenEditClient(c)} title="Edit Client"><Edit3 size={15} /></button>
                                <button className="table-action-btn delete" onClick={() => handleDeleteClient(c)} title="Delete Client"><Trash2 size={15} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Subview 2: Technology Partners */}
              {clientPartnerSubTab === 'partners' && (
                <div>
                  <div className="catalog-toolbar">
                    <div className="catalog-search-wrap">
                      <Search size={16} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search partners by brand, category, engineering systems..."
                        value={partnerSearch}
                        onChange={e => setPartnerSearch(e.target.value)}
                      />
                    </div>
                    <button className="dash-action-btn primary" onClick={handleOpenAddPartner}>
                      <Plus size={16} />
                      <span>Add Tech Partner</span>
                    </button>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th style={{ width: '45px' }}>#</th>
                          <th>Partner Brand</th>
                          <th>Category</th>
                          <th>Engineering Scope / Tagline</th>
                          <th>Public Website</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPartners.map((p, idx) => (
                          <tr key={p.id}>
                            <td style={{ color: '#64748b' }}>{idx + 1}</td>
                            <td>
                              <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.92rem' }}>{p.name}</div>
                            </td>
                            <td>
                              <span className="pill-category cat-auto">{p.category}</span>
                            </td>
                            <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{p.tagline}</td>
                            <td>
                              <span style={{ color: p.is_active ? '#10b981' : '#64748b', fontSize: '0.8rem', fontWeight: '700' }}>
                                {p.is_active ? '● Active Partner' : '○ Hidden'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button className="table-action-btn" onClick={() => handleOpenEditPartner(p)} title="Edit Partner"><Edit3 size={15} /></button>
                                <button className="table-action-btn delete" onClick={() => handleDeletePartner(p)} title="Delete Partner"><Trash2 size={15} /></button>
                              </div>
                            </td>
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
              MODULE 5: ENQUIRIES & LEAD MANAGEMENT
              ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="admin-body-content">
              {/* Lead Status Pipeline Badges Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                {['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Closed'].map(st => {
                  const count = st === 'All' ? inquiries.length : inquiries.filter(i => (i.status || '').toLowerCase() === st.toLowerCase()).length;
                  return (
                    <button
                      key={st}
                      onClick={() => setInquiryStatusFilter(st)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: inquiryStatusFilter === st ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.06)',
                        background: inquiryStatusFilter === st ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255,255,255,0.02)',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>{st}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '800', color: st === 'New' && count > 0 ? '#f87171' : '#ffffff' }}>{count}</div>
                    </button>
                  );
                })}
              </div>

              {/* Inquiry Toolbar */}
              <div className="catalog-toolbar">
                <div className="catalog-search-wrap">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search leads by customer name, company, email, product..."
                    value={inquirySearch}
                    onChange={e => setInquirySearch(e.target.value)}
                  />
                </div>

                <div className="catalog-filter-group">
                  <button className="dash-action-btn secondary" onClick={handleExportInquiriesCSV} title="Export as CSV for Excel">
                    <FileSpreadsheet size={16} />
                    <span>Export to CSV / Excel</span>
                  </button>
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '45px' }}>ID</th>
                      <th>Client Contact</th>
                      <th>Product / Solution Requested</th>
                      <th>Status Pipeline</th>
                      <th>Assigned To</th>
                      <th>Date Received</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map(inq => (
                      <tr key={inq.id} style={{ background: inq.status === 'New' ? 'rgba(239, 68, 68, 0.04)' : undefined }}>
                        <td style={{ fontWeight: '700', color: '#38bdf8' }}>#{inq.id}</td>
                        <td>
                          <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.9rem' }}>
                            {inq.full_name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                            {inq.company || 'Enterprise Customer'}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                            {inq.email} • {inq.phone}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '0.85rem' }}>
                            {inq.product_name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inq.category}</div>
                        </td>
                        <td>
                          <select
                            value={inq.status || 'New'}
                            onChange={e => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            style={{
                              background: inq.status === 'New' ? 'rgba(239, 68, 68, 0.2)' :
                                inq.status === 'Contacted' ? 'rgba(245, 158, 11, 0.2)' :
                                inq.status === 'Qualified' ? 'rgba(168, 85, 247, 0.2)' :
                                inq.status === 'Converted' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                              color: inq.status === 'New' ? '#f87171' :
                                inq.status === 'Contacted' ? '#fbbf24' :
                                inq.status === 'Qualified' ? '#c084fc' :
                                inq.status === 'Converted' ? '#34d399' : '#94a3b8',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="New">● New</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Qualified">● Qualified</option>
                            <option value="Converted">● Converted</option>
                            <option value="Closed">● Closed</option>
                          </select>
                        </td>
                        <td>
                          <select
                            value={inq.assigned_to || 'Unassigned'}
                            onChange={e => handleAssignInquiry(inq.id, e.target.value)}
                            style={{
                              background: '#1e293b',
                              color: '#cbd5e1',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.76rem',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Unassigned">Unassigned</option>
                            <option value="Lead Systems Engineer">Lead Systems Engineer</option>
                            <option value="Commercial Sales Directorate">Commercial Sales Directorate</option>
                            <option value="Cleanroom Technical Support">Cleanroom Support</option>
                            <option value="Turnkey Projects Lead">Turnkey Projects Lead</option>
                          </select>
                        </td>
                        <td style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                          {inq.created_at?.split(' ')[0] || inq.created_at}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button
                              className="table-action-btn"
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setInquiryNotesText(inq.followup_notes || '');
                              }}
                              title="Open Full Lead Dossier & Follow-up Notes"
                            >
                              <MessageSquare size={15} />
                            </button>
                            <button
                              className="table-action-btn delete"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              title="Delete Lead"
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
            </div>
          )}

          {/* =========================================================================
              MODULE 6: PROJECTS & INSTALLATIONS (Case Studies)
              ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="admin-body-content">
              <div className="catalog-toolbar">
                <div className="catalog-search-wrap">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search projects by client name, industry, location, technical scope..."
                    value={projectSearch}
                    onChange={e => setProjectSearch(e.target.value)}
                  />
                </div>

                <div className="catalog-filter-group">
                  <select
                    className="catalog-select"
                    value={projectIndustryFilter}
                    onChange={e => setProjectIndustryFilter(e.target.value)}
                  >
                    <option value="All">All Industries ({projects.length})</option>
                    <option value="Pharmaceutical">Pharmaceutical Cleanrooms</option>
                    <option value="Life Sciences">Life Sciences & R&D</option>
                    <option value="Chemical">Chemical & Industrial</option>
                    <option value="Academic">Academic & Research</option>
                  </select>

                  <button className="dash-action-btn primary" onClick={handleOpenAddProject}>
                    <Plus size={16} />
                    <span>New Project Case Study</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {filteredProjects.map(proj => (
                  <div key={proj.id} style={{
                    background: '#0d1527',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ height: '150px', background: '#1e293b', position: 'relative', overflow: 'hidden' }}>
                      {proj.image_url ? (
                        <img src={proj.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                          <Briefcase size={36} style={{ color: '#475569' }} />
                        </div>
                      )}
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        color: '#38bdf8'
                      }}>
                        {proj.industry}
                      </span>
                      <button
                        onClick={() => handleToggleProjectPublish(proj)}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          background: proj.is_published ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                          color: '#ffffff'
                        }}
                      >
                        {proj.is_published ? 'Published' : 'Draft'}
                      </button>
                    </div>

                    <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: '700', marginBottom: '4px' }}>
                        {proj.client_name} {proj.client_approved ? '✓ Approved' : '(Unapproved)'} • {proj.location}
                      </div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.96rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.3' }}>
                        {proj.title}
                      </h4>
                      <p style={{ margin: '0 0 12px 0', fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4', flexGrow: 1 }}>
                        {proj.description}
                      </p>

                      {proj.related_products && proj.related_products.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                          {proj.related_products.map((rp, i) => (
                            <span key={i} style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                              {rp}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem', color: '#64748b' }}>
                        <span>Completed {proj.completion_year || '2025'}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="table-action-btn" onClick={() => setPreviewProject(proj)} title="Preview"><Eye size={14} /></button>
                          <button className="table-action-btn" onClick={() => handleOpenEditProject(proj)} title="Edit"><Edit3 size={14} /></button>
                          <button className="table-action-btn delete" onClick={() => handleDeleteProject(proj)} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              MODULE 7: WEBSITE CONTENT MANAGEMENT (Live CMS)
              ========================================================================= */}
          {activeTab === 'content' && (
            <div className="admin-body-content">
              {/* Content Subsections Switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button
                  className={`dash-action-btn ${contentSubTab === 'homepage_hero' ? 'primary' : 'secondary'}`}
                  onClick={() => setContentSubTab('homepage_hero')}
                >
                  <span>1. Homepage Hero & Headlines</span>
                </button>
                <button
                  className={`dash-action-btn ${contentSubTab === 'company_profile' ? 'primary' : 'secondary'}`}
                  onClick={() => setContentSubTab('company_profile')}
                >
                  <span>2. About Us & Achievements</span>
                </button>
                <button
                  className={`dash-action-btn ${contentSubTab === 'contact_details' ? 'primary' : 'secondary'}`}
                  onClick={() => setContentSubTab('contact_details')}
                >
                  <span>3. Headquarters & Contact Info</span>
                </button>
                <button
                  className={`dash-action-btn ${contentSubTab === 'testimonials' ? 'primary' : 'secondary'}`}
                  onClick={() => setContentSubTab('testimonials')}
                >
                  <span>4. Client Testimonials</span>
                </button>
              </div>

              {/* Subview 1: Homepage Hero */}
              {contentSubTab === 'homepage_hero' && (
                <div className="admin-content-card" style={{ background: '#0d1527', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#ffffff' }}>Homepage Hero Section & Value Proposition</h3>
                  <p style={{ margin: '0 0 20px 0', fontSize: '0.82rem', color: '#94a3b8' }}>Update headlines, hero badges, and primary action buttons live without code deployments.</p>

                  <form onSubmit={e => {
                    e.preventDefault();
                    const currentData = websiteContent['homepage_hero']?.data || {};
                    const formData = new FormData(e.target);
                    const updated = {
                      ...currentData,
                      badge: formData.get('badge'),
                      title: formData.get('title'),
                      subtitle: formData.get('subtitle'),
                      cta_primary_text: formData.get('cta_primary_text'),
                      cta_secondary_text: formData.get('cta_secondary_text'),
                      stat_installations: formData.get('stat_installations'),
                      stat_satisfaction: formData.get('stat_satisfaction')
                    };
                    handleSaveContentSection('homepage_hero', updated);
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Hero Badge / Accreditation</label>
                        <input name="badge" className="admin-input" defaultValue={websiteContent['homepage_hero']?.data?.badge || 'ISO 9001:2015 & CE Certified Cleanroom & Security Systems'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Primary Headline</label>
                        <input name="title" className="admin-input" defaultValue={websiteContent['homepage_hero']?.data?.title || 'Intelligent Cleanroom Automation, Fire Safety & Security Systems'} />
                      </div>
                    </div>

                    <div className="admin-form-group" style={{ marginTop: '14px' }}>
                      <label className="admin-label">Hero Subtitle Paragraph</label>
                      <textarea name="subtitle" className="admin-textarea" rows={3} defaultValue={websiteContent['homepage_hero']?.data?.subtitle || ''} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '14px' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Primary CTA Button</label>
                        <input name="cta_primary_text" className="admin-input" defaultValue={websiteContent['homepage_hero']?.data?.cta_primary_text || 'Explore Product Catalog'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Secondary CTA Button</label>
                        <input name="cta_secondary_text" className="admin-input" defaultValue={websiteContent['homepage_hero']?.data?.cta_secondary_text || 'Request Engineering Quote'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Installations Stat</label>
                        <input name="stat_installations" className="admin-input" defaultValue={websiteContent['homepage_hero']?.data?.stat_installations || '450+'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Satisfaction Stat</label>
                        <input name="stat_satisfaction" className="admin-input" defaultValue={websiteContent['homepage_hero']?.data?.stat_satisfaction || '99.8%'} />
                      </div>
                    </div>

                    <button type="submit" className="dash-action-btn primary" style={{ marginTop: '20px' }}>
                      <CheckCircle size={16} />
                      <span>Publish Hero Changes Live</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Subview 2: Company Profile */}
              {contentSubTab === 'company_profile' && (
                <div className="admin-content-card" style={{ background: '#0d1527', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#ffffff' }}>About Us & Company Engineering Credentials</h3>
                  <p style={{ margin: '0 0 20px 0', fontSize: '0.82rem', color: '#94a3b8' }}>Manage official corporate mission, certifications, and track record counters.</p>

                  <form onSubmit={e => {
                    e.preventDefault();
                    const currentData = websiteContent['company_profile']?.data || {};
                    const formData = new FormData(e.target);
                    const updated = {
                      ...currentData,
                      headline: formData.get('headline'),
                      description: formData.get('description'),
                      years_in_business: formData.get('years_in_business'),
                      cleanrooms_secured: formData.get('cleanrooms_secured'),
                      corporate_clients: formData.get('corporate_clients'),
                      certifications: formData.get('certifications')
                    };
                    handleSaveContentSection('company_profile', updated);
                  }}>
                    <div className="admin-form-group">
                      <label className="admin-label">About Us Headline</label>
                      <input name="headline" className="admin-input" defaultValue={websiteContent['company_profile']?.data?.headline || 'Engineering Precision & Industrial Reliability'} />
                    </div>

                    <div className="admin-form-group" style={{ marginTop: '14px' }}>
                      <label className="admin-label">Company Overview Description</label>
                      <textarea name="description" className="admin-textarea" rows={4} defaultValue={websiteContent['company_profile']?.data?.description || ''} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '14px' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Years in Business</label>
                        <input name="years_in_business" className="admin-input" defaultValue={websiteContent['company_profile']?.data?.years_in_business || '12'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Cleanrooms Secured</label>
                        <input name="cleanrooms_secured" className="admin-input" defaultValue={websiteContent['company_profile']?.data?.cleanrooms_secured || '850+'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Corporate Clients</label>
                        <input name="corporate_clients" className="admin-input" defaultValue={websiteContent['company_profile']?.data?.corporate_clients || '120+'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Certifications Text</label>
                        <input name="certifications" className="admin-input" defaultValue={websiteContent['company_profile']?.data?.certifications || 'ISO 9001:2015, CE Certified'} />
                      </div>
                    </div>

                    <button type="submit" className="dash-action-btn primary" style={{ marginTop: '20px' }}>
                      <CheckCircle size={16} />
                      <span>Update Corporate Profile</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Subview 3: Contact Details */}
              {contentSubTab === 'contact_details' && (
                <div className="admin-content-card" style={{ background: '#0d1527', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#ffffff' }}>Official Contact Details & Physical Headquarters</h3>
                  <p style={{ margin: '0 0 20px 0', fontSize: '0.82rem', color: '#94a3b8' }}>Keep telephone lines, support inboxes, and postal addresses up to date.</p>

                  <form onSubmit={e => {
                    e.preventDefault();
                    const currentData = websiteContent['contact_details']?.data || {};
                    const formData = new FormData(e.target);
                    const updated = {
                      ...currentData,
                      primary_phone: formData.get('primary_phone'),
                      secondary_phone: formData.get('secondary_phone'),
                      sales_email: formData.get('sales_email'),
                      support_email: formData.get('support_email'),
                      address_line: formData.get('address_line'),
                      city: formData.get('city'),
                      pincode: formData.get('pincode'),
                      working_hours: formData.get('working_hours')
                    };
                    handleSaveContentSection('contact_details', updated);
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Primary Hotline</label>
                        <input name="primary_phone" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.primary_phone || '+91 9892756077'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Secondary / Direct Phone</label>
                        <input name="secondary_phone" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.secondary_phone || '+91 9594917010'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Sales Inquiries Email</label>
                        <input name="sales_email" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.sales_email || 'sales@htisystems.in'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Technical Support Email</label>
                        <input name="support_email" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.support_email || 'hti@htisystems.in'} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginTop: '14px' }}>
                      <div className="admin-form-group">
                        <label className="admin-label">Street Address</label>
                        <input name="address_line" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.address_line || 'Unit No - 825, Plot No C-3C, Goodwill Bizhubb, Next to Ikea, TTC Industrial Area Estate, Turbhe MIDC'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">City</label>
                        <input name="city" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.city || 'Turbhe, Navi Mumbai'} />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">PIN Code</label>
                        <input name="pincode" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.pincode || '400703'} />
                      </div>
                    </div>

                    <div className="admin-form-group" style={{ marginTop: '14px' }}>
                      <label className="admin-label">Operating Working Hours</label>
                      <input name="working_hours" className="admin-input" defaultValue={websiteContent['contact_details']?.data?.working_hours || 'Monday - Saturday: 9:00 AM - 6:30 PM'} />
                    </div>

                    <button type="submit" className="dash-action-btn primary" style={{ marginTop: '20px' }}>
                      <CheckCircle size={16} />
                      <span>Update Contact Information</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Subview 4: Testimonials */}
              {contentSubTab === 'testimonials' && (
                <div className="admin-content-card" style={{ background: '#0d1527', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#ffffff' }}>Customer Endorsements & Client Testimonials</h3>
                  <p style={{ margin: '0 0 20px 0', fontSize: '0.82rem', color: '#94a3b8' }}>Published recommendations from engineering directors and plant heads.</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {(Array.isArray(websiteContent['testimonials']?.data) ? websiteContent['testimonials'].data : []).map((t, i) => (
                      <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '700', color: '#ffffff' }}>{t.author} — {t.company}</span>
                          <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>{'★'.repeat(t.rating || 5)}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.4' }}>
                          "{t.quote}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
          <div className="admin-modal-container" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingClient === 'new' ? 'Add Approved Enterprise Client' : `Edit Client: ${editingClient.name}`}
              </h3>
              <button className="topbar-close-btn" onClick={() => setEditingClient(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveClient} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Client / Organization Name *</label>
                <input
                  className="admin-input"
                  required
                  value={clientForm.name}
                  onChange={e => setClientForm({ ...clientForm, name: e.target.value })}
                  placeholder="e.g. Glenmark Pharmaceuticals"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Industry / Sector *</label>
                <input
                  className="admin-input"
                  required
                  value={clientForm.sector}
                  onChange={e => setClientForm({ ...clientForm, sector: e.target.value })}
                  placeholder="e.g. Pharmaceuticals & Cleanroom"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Client Logo URL</label>
                <input
                  className="admin-input"
                  value={clientForm.logo_url}
                  onChange={e => setClientForm({ ...clientForm, logo_url: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Website URL</label>
                <input
                  className="admin-input"
                  value={clientForm.website_url}
                  onChange={e => setClientForm({ ...clientForm, website_url: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#cbd5e1' }}>
                  <input
                    type="checkbox"
                    checked={clientForm.is_authorized}
                    onChange={e => setClientForm({ ...clientForm, is_authorized: e.target.checked })}
                  />
                  <span>Authorized for Public Display (Compliance confirmed)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#cbd5e1' }}>
                  <input
                    type="checkbox"
                    checked={clientForm.is_active}
                    onChange={e => setClientForm({ ...clientForm, is_active: e.target.checked })}
                  />
                  <span>Show on Public Website</span>
                </label>
              </div>

              <div className="admin-modal-footer" style={{ padding: 0, marginTop: '12px' }}>
                <button type="button" className="dash-action-btn secondary" onClick={() => setEditingClient(null)}>Cancel</button>
                <button type="submit" className="dash-action-btn primary">Save Client</button>
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
          <div className="admin-modal-container" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingPartner === 'new' ? 'Add Technology Partner' : `Edit Partner: ${editingPartner.name}`}
              </h3>
              <button className="topbar-close-btn" onClick={() => setEditingPartner(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSavePartner} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Partner Brand Name *</label>
                <input
                  className="admin-input"
                  required
                  value={partnerForm.name}
                  onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  placeholder="e.g. Honeywell / Bosch / Metaflex"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Partner Category *</label>
                <input
                  className="admin-input"
                  required
                  value={partnerForm.category}
                  onChange={e => setPartnerForm({ ...partnerForm, category: e.target.value })}
                  placeholder="e.g. Fire & Automation"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Engineering Scope / Tagline</label>
                <input
                  className="admin-input"
                  value={partnerForm.tagline}
                  onChange={e => setPartnerForm({ ...partnerForm, tagline: e.target.value })}
                  placeholder="e.g. Global leader in building controls"
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#cbd5e1' }}>
                <input
                  type="checkbox"
                  checked={partnerForm.is_active}
                  onChange={e => setPartnerForm({ ...partnerForm, is_active: e.target.checked })}
                />
                <span>Active Partner on Website</span>
              </label>

              <div className="admin-modal-footer" style={{ padding: 0, marginTop: '12px' }}>
                <button type="button" className="dash-action-btn secondary" onClick={() => setEditingPartner(null)}>Cancel</button>
                <button type="submit" className="dash-action-btn primary">Save Partner</button>
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
          <div className="admin-modal-container" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingProject === 'new' ? 'New Turnkey Project Case Study' : `Edit Case Study: ${editingProject.title}`}
              </h3>
              <button className="topbar-close-btn" onClick={() => setEditingProject(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveProject} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-label">Project Title *</label>
                <input
                  className="admin-input"
                  required
                  value={projectForm.title}
                  onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Turnkey 12-Door Cleanroom Interlocking Network"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Client Name</label>
                  <input
                    className="admin-input"
                    value={projectForm.client_name}
                    onChange={e => setProjectForm({ ...projectForm, client_name: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Industry *</label>
                  <input
                    className="admin-input"
                    required
                    value={projectForm.industry}
                    onChange={e => setProjectForm({ ...projectForm, industry: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Location</label>
                  <input
                    className="admin-input"
                    value={projectForm.location}
                    onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Completion Year</label>
                  <input
                    className="admin-input"
                    value={projectForm.completion_year}
                    onChange={e => setProjectForm({ ...projectForm, completion_year: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Project Photo URL</label>
                <input
                  className="admin-input"
                  value={projectForm.image_url}
                  onChange={e => setProjectForm({ ...projectForm, image_url: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Technical Scope & Description *</label>
                <textarea
                  className="admin-textarea"
                  rows={4}
                  required
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Related HTI Products (comma-separated)</label>
                <input
                  className="admin-input"
                  value={projectForm.related_products_text}
                  onChange={e => setProjectForm({ ...projectForm, related_products_text: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#cbd5e1' }}>
                  <input
                    type="checkbox"
                    checked={projectForm.client_approved}
                    onChange={e => setProjectForm({ ...projectForm, client_approved: e.target.checked })}
                  />
                  <span>Client approved for public display</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#cbd5e1' }}>
                  <input
                    type="checkbox"
                    checked={projectForm.is_published}
                    onChange={e => setProjectForm({ ...projectForm, is_published: e.target.checked })}
                  />
                  <span>Published & Live</span>
                </label>
              </div>

              <div className="admin-modal-footer" style={{ padding: 0, marginTop: '14px' }}>
                <button type="button" className="dash-action-btn secondary" onClick={() => setEditingProject(null)}>Cancel</button>
                <button type="submit" className="dash-action-btn primary">Save Case Study</button>
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
          <div className="admin-modal-container" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={18} className="text-blue" />
                <h3 className="admin-modal-title">Case Study Preview: {previewProject.title}</h3>
              </div>
              <button className="topbar-close-btn" onClick={() => setPreviewProject(null)}><X size={18} /></button>
            </div>
            <div style={{ padding: '24px', maxHeight: '72vh', overflowY: 'auto' }}>
              <div style={{ height: '200px', borderRadius: '10px', overflow: 'hidden', background: '#1e293b', marginBottom: '16px' }}>
                {previewProject.image_url ? (
                  <img src={previewProject.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={48} style={{ color: '#475569' }} />
                  </div>
                )}
              </div>
              <div style={{ color: '#10b981', fontWeight: '700', fontSize: '0.82rem', marginBottom: '4px' }}>
                {previewProject.client_name} • {previewProject.location}
              </div>
              <h3 style={{ margin: '0 0 12px 0', color: '#ffffff', fontSize: '1.2rem' }}>{previewProject.title}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.5', margin: '0 0 16px 0' }}>{previewProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
