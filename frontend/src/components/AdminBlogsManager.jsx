import React, { useState, useMemo, useEffect } from 'react';
import './AdminBlogManagement.css';
import AdminDropdown from './AdminDropdown';
import {
  Search, X, Plus, Edit3, Trash2, Eye, EyeOff,
  FileText, Calendar, Clock, List, Grid, ExternalLink,
  MoreVertical, CheckCircle2, ArrowRight, ArrowLeft,
  Image as ImageIcon, Tag, Globe, Sparkles, RefreshCw
} from 'lucide-react';

// Preset standard categories matching reference screenshot
const PRESET_CATEGORIES = [
  'Hygiene & Energy Efficiency',
  'Fire & Life Safety',
  'Cleanroom Engineering',
  'Entrance Automation',
  'Industrial Access Automation',
  'Surveillance & Security Systems'
];

// Helper to format date nicely as "Oct 16, 2025" matching Reference Image 1
function formatArticleDate(dateStr) {
  if (!dateStr) return 'Oct 16, 2025';
  try {
    const d = new Date(dateStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

// Helper to extract author avatar initials matching Reference Image 1 (e.g. "HT", "EH")
function getAuthorInitials(author) {
  if (!author) return 'HT';
  // Strip prefixes like Er., Dr., Mr.
  const cleaned = author.replace(/^(Er\.|Dr\.|Mr\.|Ms\.)\s*/i, '').trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

// Helper to determine category color theme
function getCategoryClass(category) {
  const c = (category || '').toLowerCase();
  if (c.includes('hygiene') || c.includes('energy') || c.includes('hvac')) return 'hygiene';
  if (c.includes('fire') || c.includes('safety') || c.includes('life')) return 'fire';
  if (c.includes('cleanroom') || c.includes('pharma') || c.includes('interlock')) return 'cleanroom';
  return 'default';
}

export default function AdminBlogsManager({
  blogs = [],
  currentUser = 'admin',
  externalEditingBlog = null,
  onCloseEditingBlog,
  onRefresh,
  onFeedback,
  onNavigateToPublicBlog
}) {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All'); // 'All' | 'Published' | 'Draft'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  // Popover menu state
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // Modal & Edit Form States
  const [editingBlog, setEditingBlog] = useState(null); // null | 'new' | blog obj
  const [activeStep, setActiveStep] = useState(1); // 1: Article Content, 2: SEO & Scheduling
  const [isSaving, setIsSaving] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Form Initial State
  const initialFormState = {
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
  };

  const [formData, setFormData] = useState(initialFormState);

  // Sync with external editing state if provided (e.g. from Dashboard quick action)
  useEffect(() => {
    if (externalEditingBlog) {
      if (externalEditingBlog === 'new') {
        handleOpenAddModal();
      } else {
        handleOpenEditModal(externalEditingBlog);
      }
    }
  }, [externalEditingBlog]);

  const handleCloseModal = () => {
    setEditingBlog(null);
    if (onCloseEditingBlog) onCloseEditingBlog();
  };

  // Close more actions popover on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.adm-article-more-wrap')) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Category counts computed dynamically from real database data
  const categoryCounts = useMemo(() => {
    const counts = {};
    blogs.forEach((b) => {
      const cat = b.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [blogs]);

  // Unique list of categories in database
  const distinctCategories = useMemo(() => {
    const set = new Set([...Object.keys(categoryCounts)]);
    // Ensure primary presets appear in chips if they match
    PRESET_CATEGORIES.forEach((c) => {
      if (categoryCounts[c]) set.add(c);
    });
    return Array.from(set);
  }, [categoryCounts]);

  // Filtered Articles
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = (b.title || '').toLowerCase().includes(q);
        const matchesExcerpt = (b.excerpt || '').toLowerCase().includes(q);
        const matchesCategory = (b.category || '').toLowerCase().includes(q);
        const matchesAuthor = (b.author || '').toLowerCase().includes(q);
        const matchesTags = (b.tags || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesAuthor && !matchesTags) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All') {
        if ((b.category || '').toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Status Filter
      if (selectedStatus === 'Published' && !b.is_published) return false;
      if (selectedStatus === 'Draft' && b.is_published) return false;

      return true;
    });
  }, [blogs, searchQuery, selectedCategory, selectedStatus]);

  // Open Add Article Modal
  const handleOpenAddModal = () => {
    setFormData({
      ...initialFormState,
      category: distinctCategories[0] || 'Cleanroom Engineering'
    });
    setActiveStep(1);
    setEditingBlog('new');
  };

  // Open Edit Article Modal
  const handleOpenEditModal = (blog) => {
    setFormData({
      title: blog.title || '',
      category: blog.category || 'Cleanroom Engineering',
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
    setActiveStep(1);
    setEditingBlog(blog);
  };

  // Save Article (handles both Step 1 and Step 2 saves)
  const handleSaveArticle = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.title.trim() || !formData.category.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      if (onFeedback) onFeedback('error', 'Please complete all required fields: Title, Category, Excerpt, and Body Content.');
      setActiveStep(1);
      return;
    }

    setIsSaving(true);
    const payload = {
      title: formData.title.trim(),
      category: formData.category.trim(),
      author: formData.author.trim() || 'HTI Engineering Team',
      read_time: formData.read_time.trim() || '5 min read',
      excerpt: formData.excerpt.trim(),
      content: formData.content.trim(),
      image_url: formData.image_url.trim(),
      tags: formData.tags.trim(),
      seo_title: formData.seo_title.trim() || formData.title.trim(),
      meta_description: formData.meta_description.trim() || formData.excerpt.trim(),
      scheduled_at: formData.scheduled_at || '',
      is_published: Boolean(formData.is_published)
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
        if (onFeedback) {
          onFeedback('success', editingBlog === 'new' ? 'Technical article published successfully!' : 'Technical article updated!');
        }
        handleCloseModal();
        if (onRefresh) onRefresh();
      } else {
        const err = await res.json();
        if (onFeedback) onFeedback('error', err.detail || 'Failed to save technical article.');
      }
    } catch (err) {
      if (onFeedback) onFeedback('error', 'Network error while saving article.');
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Publish / Draft
  const handleTogglePublish = async (blog) => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}/toggle-publish?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const data = await res.json();
        if (onFeedback) onFeedback('success', `Article "${blog.title}" marked as ${data.status}!`);
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      if (onFeedback) onFeedback('error', 'Failed to toggle publication status.');
    }
  };

  // Confirm Delete Article
  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;
    try {
      const res = await fetch(`/api/blogs/${blogToDelete.id}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        if (onFeedback) onFeedback('success', `Article "${blogToDelete.title}" permanently removed.`);
        setBlogToDelete(null);
        if (onRefresh) onRefresh();
      } else {
        const err = await res.json();
        if (onFeedback) onFeedback('error', err.detail || 'Failed to delete article.');
      }
    } catch (err) {
      if (onFeedback) onFeedback('error', 'Network error deleting article.');
    }
  };

  return (
    <div className="adm-blogs-container">
      {/* -----------------------------------------------------------------------
          1. TOP TOOLBAR (Search, Status Filter, + New Article)
          ----------------------------------------------------------------------- */}
      <div className="adm-blogs-toolbar">
        {/* Search Field */}
        <div className="adm-blogs-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="adm-blogs-search-input"
            placeholder="Search articles, topics, tags or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="adm-blogs-search-clear"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter & New Article Button */}
        <div className="adm-blogs-toolbar-actions">
          <AdminDropdown
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            options={[
              { value: 'All', label: 'All Statuses' },
              { value: 'Published', label: `Published (${blogs.filter((b) => b.is_published).length})`, color: '#16a34a' },
              { value: 'Draft', label: `Drafts (${blogs.filter((b) => !b.is_published).length})`, color: '#eab308' }
            ]}
            className="adm-blogs-bs5-select"
          />

          <button
            className="adm-btn-new-article"
            onClick={handleOpenAddModal}
          >
            <Plus size={16} />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
          2. CATEGORY FILTER CHIPS ROW & VIEW TOGGLE (Reference Image 1)
          ----------------------------------------------------------------------- */}
      <div className="adm-blogs-chips-bar">
        <div className="adm-blogs-chips-list">
          {/* All Articles Chip */}
          <button
            className={`adm-category-chip all ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All Articles ({blogs.length})
          </button>

          {/* Dynamic Category Chips matching Reference Image 1 */}
          {distinctCategories.map((cat) => {
            const cls = getCategoryClass(cat);
            const count = categoryCounts[cat] || 0;
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                className={`adm-category-chip ${cls} ${cls === 'default' ? 'default-cat' : ''} ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(isActive ? 'All' : cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* List / Grid View Switcher */}
        <div className="adm-blogs-view-toggle">
          <button
            className={`adm-blogs-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Horizontal List View"
          >
            <List size={15} />
          </button>
          <button
            className={`adm-blogs-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Card Grid View"
          >
            <Grid size={15} />
          </button>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
          3. ARTICLES LIST (Concept 1 Horizontal Cards - Reference Image 1)
          ----------------------------------------------------------------------- */}
      {filteredBlogs.length === 0 ? (
        <div style={{
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          padding: '60px 20px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
        }}>
          <FileText size={42} style={{ color: '#cbd5e1', marginBottom: '12px' }} />
          <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            No technical articles found
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.86rem', color: '#64748b' }}>
            No articles match your current search and filter criteria.
          </p>
          <button
            className="adm-pub-btn-secondary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="adm-blogs-list">
          {filteredBlogs.map((b) => {
            const catCls = getCategoryClass(b.category);
            const initials = getAuthorInitials(b.author);
            const formattedDate = formatArticleDate(b.created_at || b.scheduled_at);
            const isMenuOpen = openActionMenuId === b.id;

            return (
              <div key={b.id} className="adm-article-card-horizontal">
                {/* Left Thumbnail with Status Badge */}
                <div className="adm-article-thumb-wrap">
                  {b.image_url ? (
                    <img
                      src={b.image_url}
                      alt={b.title}
                      className="adm-article-thumb-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="adm-article-thumb-fallback">
                      <FileText size={36} />
                    </div>
                  )}

                  {/* Status Pill Overlay */}
                  <button
                    className={`adm-article-status-pill ${b.is_published ? 'published' : 'draft'}`}
                    onClick={() => handleTogglePublish(b)}
                    title="Click to toggle Published / Draft"
                  >
                    <span className="adm-article-status-dot" />
                    <span>{b.is_published ? 'Published' : 'Draft'}</span>
                  </button>
                </div>

                {/* Right Content Area */}
                <div className="adm-article-content-wrap">
                  {/* Top Meta: Category Badge + Date + Read Time */}
                  <div className="adm-article-meta-row">
                    <span className={`adm-article-category-badge ${catCls}`}>
                      {b.category}
                    </span>

                    <div className="adm-article-read-meta">
                      <span className="adm-article-meta-item">
                        <Calendar size={13} style={{ color: '#94a3b8' }} />
                        <span>{formattedDate}</span>
                      </span>
                      <span className="adm-article-meta-item">
                        <Clock size={13} style={{ color: '#94a3b8' }} />
                        <span>{b.read_time || '5 min read'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="adm-article-title-block">
                    <h3
                      className="adm-article-title"
                      onClick={() => handleOpenEditModal(b)}
                      title="Click to edit article"
                    >
                      {b.title}
                    </h3>
                    <p className="adm-article-excerpt">
                      {b.excerpt}
                    </p>
                  </div>

                  {/* Bottom: Author Info and Action Buttons */}
                  <div className="adm-article-foot-row">
                    <div className="adm-article-author-info">
                      <div className="adm-article-author-avatar">
                        <span>{initials}</span>
                      </div>
                      <span className="adm-article-author-name">
                        {b.author || 'HTI Engineering Team'}
                      </span>
                    </div>

                    <div className="adm-article-actions-group">
                      {/* Edit Button */}
                      <button
                        className="adm-article-action-btn"
                        onClick={() => handleOpenEditModal(b)}
                        title="Edit Technical Publication"
                      >
                        <Edit3 size={15} />
                      </button>

                      {/* Delete Button */}
                      <button
                        className="adm-article-action-btn delete"
                        onClick={() => setBlogToDelete(b)}
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>

                      {/* More Actions Dropdown */}
                      <div className="adm-article-more-wrap">
                        <button
                          className="adm-article-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionMenuId(isMenuOpen ? null : b.id);
                          }}
                          title="More Actions"
                        >
                          <MoreVertical size={15} />
                        </button>

                        {isMenuOpen && (
                          <div className="adm-article-dropdown-menu">
                            <button
                              className="adm-article-menu-item"
                              onClick={() => {
                                setOpenActionMenuId(null);
                                handleTogglePublish(b);
                              }}
                            >
                              {b.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                              <span>{b.is_published ? 'Unpublish (Draft)' : 'Publish Live'}</span>
                            </button>

                            {onNavigateToPublicBlog && (
                              <button
                                className="adm-article-menu-item"
                                onClick={() => {
                                  setOpenActionMenuId(null);
                                  onNavigateToPublicBlog(b.slug || b.id);
                                }}
                              >
                                <ExternalLink size={14} />
                                <span>View on Website</span>
                              </button>
                            )}

                            <div style={{ height: '1px', background: '#f1f5f9', margin: '4px 0' }} />

                            <button
                              className="adm-article-menu-item danger"
                              onClick={() => {
                                setOpenActionMenuId(null);
                                setBlogToDelete(b);
                              }}
                            >
                              <Trash2 size={14} />
                              <span>Delete Article</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid View */
        <div className="adm-blogs-grid">
          {filteredBlogs.map((b) => {
            const catCls = getCategoryClass(b.category);
            const initials = getAuthorInitials(b.author);
            const formattedDate = formatArticleDate(b.created_at || b.scheduled_at);

            return (
              <div key={b.id} className="adm-article-card-grid">
                <div className="adm-article-grid-thumb">
                  {b.image_url ? (
                    <img src={b.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={36} style={{ color: '#cbd5e1' }} />
                    </div>
                  )}
                  <span className={`adm-article-category-badge ${catCls}`} style={{ position: 'absolute', top: 10, left: 10 }}>
                    {b.category}
                  </span>
                  <button
                    className={`adm-article-status-pill ${b.is_published ? 'published' : 'draft'}`}
                    style={{ position: 'absolute', top: 10, right: 10 }}
                    onClick={() => handleTogglePublish(b)}
                  >
                    <span className="adm-article-status-dot" />
                    <span>{b.is_published ? 'Published' : 'Draft'}</span>
                  </button>
                </div>

                <div className="adm-article-grid-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.74rem', color: '#94a3b8', marginBottom: '8px' }}>
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span>{b.read_time || '5 min read'}</span>
                  </div>

                  <h4 style={{ margin: '0 0 8px 0', fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35 }}>
                    {b.title}
                  </h4>
                  <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: '#64748b', lineHeight: 1.45, flexGrow: 1 }}>
                    {b.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="adm-article-author-avatar" style={{ width: '24px', height: '24px', fontSize: '0.65rem' }}>
                        <span>{initials}</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>
                        {b.author || 'HTI Team'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="adm-article-action-btn" onClick={() => handleOpenEditModal(b)} title="Edit"><Edit3 size={14} /></button>
                      <button className="adm-article-action-btn delete" onClick={() => setBlogToDelete(b)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* -----------------------------------------------------------------------
          4. CREATE / EDIT TECHNICAL PUBLICATION MODAL (Reference Image 2 Redesign)
          ----------------------------------------------------------------------- */}
      {editingBlog && (
        <div className="adm-pub-modal-backdrop" onClick={handleCloseModal}>
          <div className="adm-pub-modal-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="adm-pub-modal-header">
              <div className="adm-pub-header-lead">
                <div className="adm-pub-icon-wrap">
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className="adm-pub-header-title">
                    {editingBlog === 'new' ? 'Create Technical Publication' : `Edit Article: ${editingBlog.title}`}
                  </h3>
                  <p className="adm-pub-header-sub">
                    Create and manage technical engineering content for HTI.
                  </p>
                </div>
              </div>

              <button
                className="adm-pub-close-btn"
                onClick={handleCloseModal}
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* 2-Step Horizontal Progress Indicator */}
            <div className="adm-pub-steps-bar">
              <button
                type="button"
                className={`adm-pub-step-tab ${activeStep === 1 ? 'active' : activeStep > 1 ? 'completed' : 'inactive'}`}
                onClick={() => setActiveStep(1)}
              >
                {activeStep > 1 ? <CheckCircle2 size={15} /> : null}
                <span>1. Article Content</span>
              </button>

              <button
                type="button"
                className={`adm-pub-step-tab ${activeStep === 2 ? 'active' : 'inactive'}`}
                onClick={() => setActiveStep(2)}
              >
                <span>2. SEO & Scheduling</span>
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveArticle} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
              <div className="adm-pub-modal-body">
                {/* STEP 1: ARTICLE CONTENT */}
                {activeStep === 1 && (
                  <>
                    {/* A. Article Title */}
                    <div className="adm-pub-form-group">
                      <label className="adm-pub-label">
                        Article Title <span className="adm-pub-req">*</span>
                      </label>
                      <input
                        type="text"
                        className="adm-pub-input"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Optimizing Cleanroom Differential Pressure with Multi-Door Interlock Systems"
                      />
                    </div>

                    {/* B & C: Category & Author (Two Columns) */}
                    <div className="adm-pub-grid-2">
                      <div className="adm-pub-form-group">
                        <label className="adm-pub-label">
                          Category <span className="adm-pub-req">*</span>
                        </label>
                        <AdminDropdown
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          options={[
                            ...PRESET_CATEGORIES.map(cat => ({ value: cat, label: cat })),
                            ...distinctCategories.filter(c => !PRESET_CATEGORIES.includes(c)).map(cat => ({ value: cat, label: cat }))
                          ]}
                          size="md"
                          className="w-100"
                        />
                      </div>

                      <div className="adm-pub-form-group">
                        <label className="adm-pub-label">Author</label>
                        <input
                          type="text"
                          className="adm-pub-input"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          placeholder="e.g. HTI Engineering Team"
                        />
                      </div>
                    </div>

                    {/* D & E: Estimated Read Time & Cover Image URL (Two Columns) */}
                    <div className="adm-pub-grid-2">
                      <div className="adm-pub-form-group">
                        <label className="adm-pub-label">Estimated Read Time</label>
                        <input
                          type="text"
                          className="adm-pub-input"
                          value={formData.read_time}
                          onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                          placeholder="e.g. 5 min read"
                        />
                      </div>

                      <div className="adm-pub-form-group">
                        <label className="adm-pub-label">Cover Image URL</label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <ImageIcon size={16} style={{ position: 'absolute', left: 12, color: '#94a3b8' }} />
                          <input
                            type="text"
                            className="adm-pub-input"
                            style={{ paddingLeft: '38px' }}
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Live Image Preview Card if URL is provided */}
                    {formData.image_url && (
                      <div className="adm-pub-img-preview-box">
                        <img
                          src={formData.image_url}
                          alt="Cover Preview"
                          className="adm-pub-preview-img"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="adm-pub-preview-text">
                          <strong>Live Cover Image Preview</strong>
                          <div>The image will render on the technical publication card and full engineering article page.</div>
                        </div>
                      </div>
                    )}

                    {/* F. Excerpt / Brief Summary */}
                    <div className="adm-pub-form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="adm-pub-label">
                          Excerpt / Brief Summary <span className="adm-pub-req">*</span>
                        </label>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                          {formData.excerpt.length} / 500 characters
                        </span>
                      </div>
                      <textarea
                        className="adm-pub-textarea"
                        rows={3}
                        required
                        maxLength={500}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Provide a concise 1-2 sentence executive engineering abstract summarizing the technical solution and its commercial impact..."
                      />
                    </div>

                    {/* G. Article Body Content */}
                    <div className="adm-pub-form-group">
                      <label className="adm-pub-label">
                        Article Body Content <span className="adm-pub-req">*</span>
                      </label>
                      <textarea
                        className="adm-pub-textarea"
                        rows={9}
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter full technical article content, system specifications, architectural considerations, engineering diagrams, and industrial use-cases..."
                      />
                    </div>
                  </>
                )}

                {/* STEP 2: SEO & SCHEDULING */}
                {activeStep === 2 && (
                  <>
                    {/* SEO Meta Title */}
                    <div className="adm-pub-form-group">
                      <label className="adm-pub-label">SEO Meta Title</label>
                      <input
                        type="text"
                        className="adm-pub-input"
                        value={formData.seo_title}
                        onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                        placeholder={formData.title || 'Optimizing Cleanroom Differential Pressure | HTI Systems'}
                      />
                    </div>

                    {/* SEO Meta Description */}
                    <div className="adm-pub-form-group">
                      <label className="adm-pub-label">SEO Meta Description</label>
                      <textarea
                        className="adm-pub-textarea"
                        rows={2}
                        value={formData.meta_description}
                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        placeholder={formData.excerpt || 'Concise description snippet for Google SERP results...'}
                      />
                    </div>

                    {/* SERP Search Preview Box */}
                    <div className="adm-pub-serp-card">
                      <div className="adm-pub-serp-url">
                        <Globe size={13} style={{ color: '#059669' }} />
                        <span>https://htisystems.in › blogs › {formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'technical-article'}</span>
                      </div>
                      <div className="adm-pub-serp-title">
                        {formData.seo_title || formData.title || 'Technical Engineering Publication Title'} | HTI Systems
                      </div>
                      <div className="adm-pub-serp-desc">
                        {formData.meta_description || formData.excerpt || 'Technical considerations, engineering specifications, and architectural compliance for enterprise industrial installations.'}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="adm-pub-form-group">
                      <label className="adm-pub-label">Tags (comma-separated)</label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Tag size={15} style={{ position: 'absolute', left: 12, color: '#94a3b8' }} />
                        <input
                          type="text"
                          className="adm-pub-input"
                          style={{ paddingLeft: '38px' }}
                          value={formData.tags}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          placeholder="Cleanroom, Pressure Control, USFDA, HVAC, Life Safety"
                        />
                      </div>
                    </div>

                    {/* Optional Schedule Date */}
                    <div className="adm-pub-form-group">
                      <label className="adm-pub-label">Optional Schedule Date (Future Publication)</label>
                      <input
                        type="date"
                        className="adm-pub-input"
                        value={formData.scheduled_at}
                        onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                      />
                    </div>

                    {/* Publish Immediately Switch */}
                    <label className="adm-pub-toggle-label">
                      <input
                        type="checkbox"
                        className="adm-pub-toggle-checkbox"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      />
                      <span>Publish Immediately (Make article live on public website)</span>
                    </label>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="adm-pub-modal-footer">
                <button
                  type="button"
                  className="adm-pub-btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <div className="adm-pub-footer-right">
                  {activeStep === 2 && (
                    <button
                      type="button"
                      className="adm-pub-btn-secondary"
                      onClick={() => setActiveStep(1)}
                    >
                      <ArrowLeft size={15} />
                      <span>Back to Content</span>
                    </button>
                  )}

                  {activeStep === 1 && (
                    <button
                      type="button"
                      className="adm-pub-btn-secondary"
                      onClick={() => setActiveStep(2)}
                    >
                      <span>Continue to SEO</span>
                      <ArrowRight size={15} />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="adm-pub-btn-primary"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw size={15} className="adm-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        <span>{editingBlog === 'new' ? 'Save Article' : 'Update Article'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          5. DELETE CONFIRMATION MODAL
          ----------------------------------------------------------------------- */}
      {blogToDelete && (
        <div className="adm-pub-modal-backdrop" onClick={() => setBlogToDelete(null)}>
          <div
            className="adm-pub-modal-container"
            style={{ maxWidth: '440px', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#fef2f2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Trash2 size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                Delete Technical Article?
              </h3>
            </div>

            <p style={{ margin: '0 0 20px 0', fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5 }}>
              Are you sure you want to permanently delete <strong>"{blogToDelete.title}"</strong>? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="adm-pub-btn-secondary"
                onClick={() => setBlogToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-pub-btn-primary"
                style={{ background: '#dc2626', borderColor: '#b91c1c' }}
                onClick={handleConfirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
