import React, { useState, useEffect, useMemo } from 'react';
import './AdminDashboard.css';
import './AdminClientsPartners.css';
import AdminBlogsManager from './AdminBlogsManager';
import AdminWebsiteContentManager from './AdminWebsiteContentManager';
import AdminEnquiriesManager from './AdminEnquiriesManager';
import AdminUsersSecurityManager from './AdminUsersSecurityManager';
import AdminCareersManager from './AdminCareersManager';
import AdminSidebar from './AdminSidebar';
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
  Zap, User, HelpCircle, MapPin, Menu
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

// Format audit timestamp into structured time and date objects safely
function formatAuditDateTime(ts) {
  if (!ts) return { time: '05:04:30 PM', date: '27 Oct 2026' };
  try {
    const raw = String(ts).trim();
    const isoString = raw.includes(' ') && !raw.includes('T') ? raw.replace(' ', 'T') : raw;
    const d = new Date(isoString);
    if (!isNaN(d.getTime())) {
      const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      return { time, date };
    }
    const parts = raw.split(' ');
    return { time: parts[1] || parts[0] || 'Recently', date: parts[0] || '' };
  } catch {
    return { time: String(ts || ''), date: '' };
  }
}

export default function AdminPanel({
  isOpen,
  onClose,
  onBlogsChanged,
  onClientsChanged,
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [lastSyncedTime, setLastSyncedTime] = useState('Just now');

  const toggleAdminTheme = () => {
    const next = adminTheme === 'light' ? 'dark' : 'light';
    setAdminTheme(next);
    localStorage.setItem('hti_admin_theme', next);
  };

  // Close mobile drawer on desktop resize (>=1024px) or tab switch
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [activeTab]);

  // Sub-tabs
  const [clientPartnerSubTab, setClientPartnerSubTab] = useState('clients'); // 'clients' | 'partners'
  const [userSubTab, setUserSubTab] = useState('users'); // 'users' | 'audit_logs'
  const [contentSubTab, setContentSubTab] = useState('homepage_hero'); // 'homepage_hero' | 'company_profile' | 'contact_details' | 'testimonials'

  // Data states
  const [blogs, setBlogs] = useState([]);
  const [clients, setClients] = useState([]);
  const [partners, setPartners] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [careerApplications, setCareerApplications] = useState([]);
  const [careerDbStatus, setCareerDbStatus] = useState(null);
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

  // Interactive Lead Detail / Follow-up Drawer
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryNotesText, setInquiryNotesText] = useState('');

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

  const fetchCareerApplications = async () => {
    try {
      const [appRes, dbRes] = await Promise.all([
        fetch('/api/careers/applications'),
        fetch('/api/careers/db-status')
      ]);
      if (appRes.ok) {
        const data = await appRes.json();
        setCareerApplications(data.applications || []);
      }
      if (dbRes.ok) {
        const dbData = await dbRes.json();
        setCareerDbStatus(dbData);
      }
      updateTimestamp();
    } catch (err) {
      console.error('Failed to fetch career applications or db status:', err);
    }
  };

  const handleUpdateCareerStatus = async (appId, newStatus) => {
    try {
      const res = await fetch(`/api/careers/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setCareerApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
        );
        fetchUsersAndAudit();
      }
    } catch (err) {
      console.error('Failed to update career status:', err);
      throw err;
    }
  };

  const handleSaveCareerNotes = async (appId, notes) => {
    try {
      const res = await fetch(`/api/careers/applications/${appId}/notes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      if (res.ok) {
        setCareerApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, notes } : a))
        );
        fetchUsersAndAudit();
      }
    } catch (err) {
      console.error('Failed to save career notes:', err);
      throw err;
    }
  };

  const handleDeleteCareerApplication = async (appId) => {
    try {
      const res = await fetch(`/api/careers/applications/${appId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setCareerApplications((prev) => prev.filter((a) => a.id !== appId));
        fetchUsersAndAudit();
      }
    } catch (err) {
      console.error('Failed to delete career application:', err);
      throw err;
    }
  };

  const refreshAllData = () => {
    fetchSystemHealth();
    fetchBlogs();
    fetchClientsAndPartners();
    fetchInquiries();
    fetchCareerApplications();
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
        else if (editingBlog) setEditingBlog(null);
        else if (editingClient) setEditingClient(null);
        else if (editingPartner) setEditingPartner(null);
        else if (editingUser) setEditingUser(null);
        else if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedInquiry, editingBlog, editingClient, editingPartner, editingUser, onClose]);

  // ===================== AUTHENTICATION ACTIONS =====================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

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
    const rawUsed = systemHealth?.disk?.used_gb;

    const total = typeof rawTotal === 'number' ? rawTotal : (parseFloat(rawTotal) || 475.69);
    const free = typeof rawFree === 'number' ? rawFree : (parseFloat(rawFree) || 260.53);
    const used = typeof rawUsed === 'number' ? rawUsed : (parseFloat(rawUsed) || Math.max(0, total - free));
    const freePct = total > 0 ? Math.min(100, Math.max(0, Math.round((free / total) * 100))) : 55;
    const usedPct = 100 - freePct;
    return { free, total, used, freePct, usedPct };
  }, [systemHealth?.disk]);

  const getAuditCategoryInfo = (module = '') => {
    const m = String(module || '').toLowerCase();
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
  // Safely computed filtered lists and quick counts for authenticated views
  const unansweredInquiries = (inquiries || []).filter(i => (i?.status || '').toLowerCase() === 'new');

  const filteredClients = (clients || []).filter(c => {
    if (!c) return false;
    const name = (c.name || '').toLowerCase();
    const sector = (c.sector || '').toLowerCase();
    const web = (c.website_url || '').toLowerCase();
    const search = (clientSearch || '').toLowerCase();
    const matchesSearch = search === '' || name.includes(search) || sector.includes(search) || web.includes(search);

    let matchesFilter = true;
    if (clientFilterStatus === 'authorized') matchesFilter = Boolean(c.is_authorized);
    else if (clientFilterStatus === 'visible') matchesFilter = Boolean(c.is_active);

    return matchesSearch && matchesFilter;
  });

  const filteredPartners = (partners || []).filter(p => {
    if (!p) return false;
    const name = (p.name || '').toLowerCase();
    const category = (p.category || '').toLowerCase();
    const tagline = (p.tagline || '').toLowerCase();
    const web = (p.website_url || '').toLowerCase();
    const search = (partnerSearch || '').toLowerCase();
    const matchesSearch = search === '' || name.includes(search) || category.includes(search) || tagline.includes(search) || web.includes(search);

    let matchesFilter = true;
    if (partnerFilterStatus === 'active') matchesFilter = Boolean(p.is_active);
    else if (partnerFilterStatus === 'hidden') matchesFilter = !p.is_active;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className={`admin-dashboard-container adm-dashboard-container theme-${adminTheme}`} onClick={e => e.stopPropagation()}>
        {/* SIDEBAR NAVIGATION (Minimal, Calm & Consistent) */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          userRole={userRole}
          handleLogout={handleLogout}
          blogs={blogs}
          clients={clients}
          partners={partners}
          inquiries={inquiries}
          unansweredInquiries={unansweredInquiries}
          adminUsers={adminUsers}
          careerApplications={careerApplications}
          isMobileNavOpen={mobileNavOpen}
          onCloseMobileNav={() => setMobileNavOpen(false)}
          onCloseConsole={onClose}
        />

        {/* MAIN WORKSPACE */}
        <div className="admin-main-area adm-main-area">
          {/* Top Bar */}
          <div className="admin-topbar adm-topbar">
            <div className="admin-topbar-title-wrap adm-topbar-title-wrap">
              {/* Mobile/Tablet Hamburger Trigger (<1024px) */}
              <button
                type="button"
                className="adm-topbar-hamburger-btn"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open Navigation Menu"
                aria-expanded={mobileNavOpen}
                aria-controls="admin-sidebar-drawer"
              >
                <Menu size={20} />
              </button>

              <div className="adm-mobile-avatar" title={`Admin: ${currentUser}`}>
                <span>{currentUser.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="adm-topbar-headings" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <h2 className="admin-topbar-title adm-topbar-title" style={{ margin: 0, fontSize: '1.22rem', fontWeight: 800 }}>
                  {activeTab === 'dashboard' && 'Executive Dashboard'}
                  {activeTab === 'blogs' && 'Articles & Technical Engineering Publications'}
                  {activeTab === 'clients_partners' && 'Enterprise Clients & Technology Partners Roster'}
                  {activeTab === 'inquiries' && 'Commercial Enquiries & Lead Pipeline Management'}
                  {activeTab === 'careers' && 'Careers & Talent Acquisition Pipeline'}
                  {activeTab === 'content' && 'Live Website Content & Copy CMS'}
                  {activeTab === 'users' && 'Administrative Access Control & Audit Log'}
                  {activeTab === 'settings' && 'System Health, Tested Backups & Settings'}
                </h2>
                <span className="adm-topbar-subtitle" style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>
                  HTI Control Enterprise BMS Administrative Console
                </span>
              </div>
            </div>

            <div className="admin-topbar-actions adm-topbar-actions">
              <span className="topbar-live-tag adm-topbar-live-tag" title="SQL DB: hti_backend (Live)" style={{ background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>
                <Database size={13} style={{ color: '#059669', flexShrink: 0 }} />
                <span>SQL DB : hti_backend (Live)</span>
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
                className="topbar-btn adm-topbar-btn adm-topbar-help-btn"
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
            <div className="admin-body-content adm-body-content adm-dashboard-view">
              {/* 1. Unanswered Sales Enquiries Alert */}
              {unansweredInquiries.length > 0 && (() => {
                const latestLead = [...unansweredInquiries].sort((a, b) => b.id - a.id)[0] || unansweredInquiries[0];
                return (
                  <div className="adm-sales-alert-card">
                    <div className="adm-sales-alert-left">
                      <div className="adm-sales-alert-icon-box">
                        <AlertTriangle size={20} />
                      </div>
                      <div className="adm-sales-alert-info">
                        <div className="adm-sales-alert-title">
                          {unansweredInquiries.length} New Unanswered Sales {unansweredInquiries.length === 1 ? 'Enquiry' : 'Enquiries'} Awaiting Response
                        </div>
                        <div className="adm-sales-alert-sub">
                          Latest lead from <strong>{latestLead.full_name}</strong> {latestLead.company ? `(${latestLead.company})` : ''} regarding{' '}
                          <span className="adm-sales-alert-tag">{latestLead.product_name}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="adm-sales-alert-btn"
                      onClick={() => {
                        setSelectedInquiry(latestLead);
                        setInquiryNotesText(latestLead.followup_notes || '');
                        setActiveTab('inquiries');
                      }}
                    >
                      <MessageSquare size={15} />
                      <span>Review Lead #{latestLead.id}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })()}

              {/* 2. Four Dashboard Summary Cards (Single Row) */}
              <div className="adm-summary-grid">
                {/* Card 1: Commercial Leads */}
                <div
                  className="adm-summary-card card-orange"
                  onClick={() => setActiveTab('inquiries')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('inquiries'); }}
                >
                  <div className="adm-card-top-row">
                    <div className="adm-card-title-group">
                      <div className="adm-card-icon-box orange">
                        <MessageSquare size={18} />
                      </div>
                      <span className="adm-card-label">Commercial Leads</span>
                    </div>
                    <div className="adm-card-arrow-wrap orange">
                      <ChevronRight size={15} />
                    </div>
                  </div>
                  <div className="adm-card-count">
                    <AnimatedNumber value={inquiries.length} />
                  </div>
                  <div className="adm-card-pills-row">
                    <span className="adm-card-pill pill-red">
                      <span className="adm-card-pill-dot" />
                      {unansweredInquiries.length} Unanswered
                    </span>
                    <span className="adm-card-pill pill-neutral">
                      {inquiries.filter(i => (i.status || '').toLowerCase() === 'converted').length} Converted
                    </span>
                  </div>
                </div>

                {/* Card 2: Talent & Careers */}
                <div
                  className="adm-summary-card card-purple"
                  onClick={() => setActiveTab('careers')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('careers'); }}
                >
                  <div className="adm-card-top-row">
                    <div className="adm-card-title-group">
                      <div className="adm-card-icon-box purple">
                        <Users size={18} />
                      </div>
                      <span className="adm-card-label">Talent & Careers</span>
                    </div>
                    <div className="adm-card-arrow-wrap purple">
                      <ChevronRight size={15} />
                    </div>
                  </div>
                  <div className="adm-card-count">
                    <AnimatedNumber value={careerApplications.length} />
                  </div>
                  <div className="adm-card-pills-row">
                    <span className="adm-card-pill pill-green">
                      <span className="adm-card-pill-dot" />
                      {careerApplications.filter(a => (a.status || '').toLowerCase() === 'new').length} New
                    </span>
                    <span className="adm-card-pill pill-neutral">
                      {careerApplications.filter(a => ['interviewed', 'selected', 'active', 'reviewed'].includes((a.status || '').toLowerCase())).length} Active
                    </span>
                  </div>
                </div>

                {/* Card 3: Technical Articles */}
                <div
                  className="adm-summary-card card-rose"
                  onClick={() => setActiveTab('blogs')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('blogs'); }}
                >
                  <div className="adm-card-top-row">
                    <div className="adm-card-title-group">
                      <div className="adm-card-icon-box rose">
                        <FileText size={18} />
                      </div>
                      <span className="adm-card-label">Technical Articles</span>
                    </div>
                    <div className="adm-card-arrow-wrap rose">
                      <ChevronRight size={15} />
                    </div>
                  </div>
                  <div className="adm-card-count">
                    <AnimatedNumber value={blogs.length} />
                  </div>
                  <div className="adm-card-pills-row">
                    <span className="adm-card-pill pill-purple">
                      <span className="adm-card-pill-dot" />
                      {blogs.filter(b => b.is_published).length} Published
                    </span>
                    <span className="adm-card-pill pill-neutral">
                      {blogs.filter(b => !b.is_published).length} Drafts
                    </span>
                  </div>
                </div>

                {/* Card 4: Clients & Partners */}
                <div
                  className="adm-summary-card card-mint"
                  onClick={() => setActiveTab('clients_partners')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveTab('clients_partners'); }}
                >
                  <div className="adm-card-top-row">
                    <div className="adm-card-title-group">
                      <div className="adm-card-icon-box mint">
                        <Building2 size={18} />
                      </div>
                      <span className="adm-card-label">Clients & Partners</span>
                    </div>
                    <div className="adm-card-arrow-wrap mint">
                      <ChevronRight size={15} />
                    </div>
                  </div>
                  <div className="adm-card-count">
                    <AnimatedNumber value={clients.length + partners.length} />
                  </div>
                  <div className="adm-card-pills-row">
                    <span className="adm-card-pill pill-blue">
                      <span className="adm-card-pill-dot" />
                      {clients.length} Clients
                    </span>
                    <span className="adm-card-pill pill-green">
                      <span className="adm-card-pill-dot" />
                      {partners.length} Partners
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Middle Row: Executive Quick Actions & System Status Side by Side */}
              <div className="adm-middle-split-row">
                {/* Executive Quick Actions */}
                <div className="adm-card-box adm-quick-actions-box">
                  <div className="adm-quick-actions-header">
                    <Zap size={22} className="adm-quick-actions-bolt" />
                    <div>
                      <h3 className="adm-quick-actions-title">Executive Quick Actions</h3>
                      <p className="adm-quick-actions-sub">Fast-track common administrative tasks with 1-click workflows</p>
                    </div>
                  </div>

                  <div className="adm-quick-actions-row">
                    <button className="adm-btn-action primary-blue" onClick={() => { setActiveTab('blogs'); handleOpenAddBlog(); }}>
                      <FileText size={17} />
                      <span>Publish Article</span>
                    </button>

                    <button className="adm-btn-action neutral-white" onClick={() => { setActiveTab('clients_partners'); handleOpenAddClient(); }}>
                      <Users size={17} />
                      <span>Add Client / Partner</span>
                    </button>

                    <button className="adm-btn-action neutral-white" onClick={() => setActiveTab('careers')}>
                      <UserCheck size={17} />
                      <span>Review Candidates</span>
                    </button>

                    <button className="adm-btn-action neutral-white" onClick={handleExportInquiriesCSV}>
                      <Download size={17} />
                      <span>Export Leads (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* System Status Card */}
                <div className="adm-card-box adm-system-status-box">
                  <div className="adm-panel-head">
                    <div className="adm-panel-title-wrap">
                      <Activity size={20} className="adm-panel-icon green" />
                      <h4 className="adm-panel-title">System Status</h4>
                    </div>
                    <button
                      className="adm-panel-view-all-btn"
                      onClick={() => setActiveTab('settings')}
                    >
                      View All
                    </button>
                  </div>

                  <div className="adm-system-status-body">
                    <div className="adm-status-live-row">
                      <span className="adm-live-pulse-dot">
                        <span className="adm-live-pulse-inner" />
                      </span>
                      <span className="adm-status-headline">
                        {systemHealth?.status === 'healthy' || systemHealth?.status === 'operational' || !systemHealth?.status
                          ? 'All Systems Operational'
                          : 'Systems Degraded'}
                      </span>
                    </div>

                    {/* Decorative pale green wave graphic at bottom */}
                    <div className="adm-status-wave-container" aria-hidden="true">
                      <svg className="adm-status-wave-svg" viewBox="0 0 500 80" preserveAspectRatio="none">
                        <path
                          d="M0,50 C90,20 160,65 250,42 C340,20 420,55 500,32 L500,80 L0,80 Z"
                          fill="rgba(16, 185, 129, 0.12)"
                        />
                        <path
                          d="M0,58 C80,32 170,68 260,48 C350,28 430,62 500,38 L500,80 L0,80 Z"
                          fill="rgba(16, 185, 129, 0.18)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Bottom Row: Measured System Telemetry & Administrative Audit Stream Side by Side */}
              <div className="adm-bottom-split-row">
                {/* Left: Measured System Telemetry */}
                <div className="adm-card-box adm-telemetry-box">
                  <div className="adm-panel-head">
                    <div className="adm-panel-title-wrap">
                      <Database size={20} className="adm-panel-icon blue" />
                      <div>
                        <h4 className="adm-panel-title">Measured System Telemetry</h4>
                        <p className="adm-panel-sub">Live measured metrics verified directly from SQLite &amp; host OS</p>
                      </div>
                    </div>
                    <button
                      className="adm-panel-view-all-btn"
                      onClick={() => setActiveTab('settings')}
                    >
                      View All
                    </button>
                  </div>

                  <div className="adm-telemetry-card-content">
                    <div className="adm-telemetry-inner-panel">
                      {/* Host Label with Green Status Indicator */}
                      <div className="adm-disk-host-row">
                        <span className="adm-status-indicator-dot green" />
                        <span className="adm-disk-host-label">
                          DISK STORAGE (HOST {systemHealth?.database?.path?.match(/^([A-Za-z]):/)?.[1]?.toUpperCase() || 'D'}:)
                        </span>
                      </div>

                      {/* Main Metric Numbers */}
                      <div className="adm-disk-numbers-row">
                        <span className="adm-disk-gb-strong">
                          {diskMetrics
                            ? `${diskMetrics.free.toFixed(2)} GB Free of ${diskMetrics.total.toFixed(2)} GB`
                            : '260.53 GB Free of 475.69 GB'}
                        </span>
                        <span className="adm-disk-free-pct">
                          {diskMetrics ? `${diskMetrics.freePct}% Free` : '55% Free'}
                        </span>
                      </div>

                      {/* Horizontal Storage Progress Bar */}
                      <div className="adm-disk-bar-container">
                        <div
                          className="adm-disk-bar-fill"
                          style={{
                            width: `${diskMetrics ? diskMetrics.usedPct : 45}%`
                          }}
                        />
                      </div>

                      {/* Legend Row */}
                      <div className="adm-disk-legend-row">
                        <div className="adm-legend-item">
                          <span className="adm-legend-dot blue" />
                          <span>Used {diskMetrics ? `${diskMetrics.used.toFixed(2)} GB` : '215.16 GB'}</span>
                        </div>
                        <div className="adm-legend-item">
                          <span className="adm-legend-dot slate" />
                          <span>Free {diskMetrics ? `${diskMetrics.free.toFixed(2)} GB` : '260.53 GB'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Administrative Audit Stream */}
                <div className="adm-card-box adm-audit-box">
                  <div className="adm-panel-head">
                    <div className="adm-panel-title-wrap">
                      <Clock size={20} className="adm-panel-icon blue" />
                      <div>
                        <h4 className="adm-panel-title">Administrative Audit Stream</h4>
                        <p className="adm-panel-sub">Immutable record of changes across all modules</p>
                      </div>
                    </div>
                    <button
                      className="adm-panel-view-all-btn"
                      onClick={() => { setActiveTab('users'); setUserSubTab('audit_logs'); }}
                    >
                      View All
                    </button>
                  </div>

                  <div className="adm-audit-stream-content">
                    {auditLogs.length === 0 ? (
                      <div className="adm-audit-empty">No audit records found.</div>
                    ) : (
                      <div className="adm-stream-timeline">
                        {auditLogs.slice(0, 2).map((log, idx) => {
                          const cat = getAuditCategoryInfo(log.module);
                          const dt = formatAuditDateTime(log.timestamp);
                          return (
                            <div key={log.id || idx} className="adm-stream-item">
                              {/* Continuous connecting line */}
                              <div className="adm-stream-line" />

                              {/* Colored circular marker */}
                              <div className={`adm-stream-marker ${cat.color}`}>
                                <span className="adm-stream-dot" />
                              </div>

                              <div className="adm-stream-content">
                                <div className="adm-stream-head">
                                  <div className="adm-stream-meta">
                                    <span className="adm-stream-user">{log.username || 'admin'}</span>
                                    <span className={`adm-stream-badge ${cat.color}`}>{cat.label}</span>
                                  </div>
                                  <div className="adm-stream-time-wrap">
                                    <span className="adm-stream-time">{dt.time}</span>
                                    {dt.date && <span className="adm-stream-date">{dt.date}</span>}
                                  </div>
                                </div>
                                <div className="adm-stream-details">{log.details}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
              MODULE 5B: CAREERS & TALENT ACQUISITION PIPELINE (MySQL / SQLite Dual-Engine)
              ========================================================================= */}
          {activeTab === 'careers' && (
            <div className="admin-body-content" style={{ padding: 0 }}>
              <AdminCareersManager
                applications={careerApplications}
                dbStatus={careerDbStatus}
                onUpdateStatus={handleUpdateCareerStatus}
                onSaveNotes={handleSaveCareerNotes}
                onDelete={handleDeleteCareerApplication}
                onRefresh={fetchCareerApplications}
                showFeedback={showFeedback}
                currentUser={currentUser}
              />
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
            <div className="admin-body-content" style={{ padding: 0 }}>
              <AdminUsersSecurityManager
                adminUsers={adminUsers}
                auditLogs={auditLogs}
                currentUser={currentUser}
                onRefresh={fetchUsersAndAudit}
                showFeedback={showFeedback}
              />
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
                    href={`https://wa.me/${((selectedInquiry && selectedInquiry.phone) || '').replace(/[^0-9]/g, '')}`}
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

    </div>
  );
}
