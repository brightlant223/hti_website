import React, { useState, useEffect } from 'react';
import {
  X, Shield, RefreshCw, Plus, Edit3, Trash2, CheckCircle,
  FileText, Package, MessageSquare, Search, AlertCircle,
  Check, Eye, ExternalLink, Calendar, Clock, Tag
} from 'lucide-react';

export default function AdminPanel({ isOpen, onClose, onProductsChanged, onBlogsChanged }) {
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'blogs' | 'inquiries'
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Data states
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Search & filter states
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [blogSearch, setBlogSearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');

  // Modals for Add/Edit
  const [editingProduct, setEditingProduct] = useState(null); // null = modal closed, 'new' = add, object = edit
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Access Control',
    subcategory: '',
    tagline: '',
    description: '',
    featuresText: '',
    specsText: '',
    applicationsText: '',
    badge: '',
    is_featured: false
  });

  const [editingBlog, setEditingBlog] = useState(null); // null = modal closed, 'new' = add, object = edit
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'Clean Room Automation',
    author: 'HTI Engineering Team',
    read_time: '5 min read',
    excerpt: '',
    content: '',
    is_published: true
  });

  // Show auto-dismiss feedback
  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  };

  // Fetch functions
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
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
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
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
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'services') fetchProducts();
      else if (activeTab === 'blogs') fetchBlogs();
      else if (activeTab === 'inquiries') fetchInquiries();
    }
  }, [isOpen, activeTab, inquiryStatusFilter]);

  // ===================== PRODUCT / SERVICE ACTIONS =====================
  const handleOpenAddProduct = () => {
    setProductForm({
      name: '',
      category: 'Access Control',
      subcategory: '',
      tagline: '',
      description: '',
      featuresText: '',
      specsText: '',
      applicationsText: '',
      badge: '',
      is_featured: false
    });
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
    setEditingProduct(prod);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category || !productForm.description) {
      showFeedback('error', 'Please fill in required fields: Name, Category, and Description.');
      return;
    }

    // Parse features (newline separated)
    const features = productForm.featuresText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    // Parse specs ("Key: Value" per line)
    const specs = {};
    productForm.specsText.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        if (key && val) specs[key] = val;
      }
    });

    // Parse applications (newline separated)
    const applications = productForm.applicationsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

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
      let res;
      if (editingProduct === 'new') {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        showFeedback('success', editingProduct === 'new' ? 'Service added successfully!' : 'Service updated successfully!');
        setEditingProduct(null);
        await fetchProducts();
        if (onProductsChanged) onProductsChanged();
      } else {
        const errData = await res.json();
        showFeedback('error', errData.detail || 'Failed to save service.');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      showFeedback('error', 'Network error while saving service.');
    }
  };

  const handleDeleteProduct = async (prod) => {
    if (!window.confirm(`Are you sure you want to permanently delete service "${prod.name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${prod.id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Service "${prod.name}" deleted.`);
        await fetchProducts();
        if (onProductsChanged) onProductsChanged();
      } else {
        showFeedback('error', 'Failed to delete service.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      showFeedback('error', 'Network error deleting service.');
    }
  };

  // ===================== BLOG / ARTICLE ACTIONS =====================
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
      let res;
      if (editingBlog === 'new') {
        res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`/api/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        showFeedback('success', editingBlog === 'new' ? 'Article published successfully!' : 'Article updated successfully!');
        setEditingBlog(null);
        await fetchBlogs();
        if (onBlogsChanged) onBlogsChanged();
      } else {
        const errData = await res.json();
        showFeedback('error', errData.detail || 'Failed to save blog.');
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      showFeedback('error', 'Network error while saving blog.');
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (!window.confirm(`Are you sure you want to permanently delete article "${blog.title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${blog.id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Article "${blog.title}" deleted.`);
        await fetchBlogs();
        if (onBlogsChanged) onBlogsChanged();
      } else {
        showFeedback('error', 'Failed to delete blog.');
      }
    } catch (err) {
      console.error('Error deleting blog:', err);
      showFeedback('error', 'Network error deleting blog.');
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
      (p.subcategory && p.subcategory.toLowerCase().includes(productSearch.toLowerCase()));
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredBlogs = blogs.filter(b => {
    return blogSearch === '' ||
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(blogSearch.toLowerCase());
  });

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal glass-card" onClick={e => e.stopPropagation()}>
        {/* Admin Header */}
        <div className="admin-header">
          <div className="admin-brand-info">
            <div className="admin-icon-box">
              <Shield size={24} className="text-cyan" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="admin-title">HTI Administration CMS</h2>
                <span className="admin-badge-live">LIVE DATABASE</span>
              </div>
              <p className="admin-sub">Full control to Add, Edit, and Delete Services, Technical Blogs & Inquiries without modifying source code.</p>
            </div>
          </div>

          <div className="admin-header-actions">
            <button className="btn-icon" onClick={() => {
              if (activeTab === 'services') fetchProducts();
              else if (activeTab === 'blogs') fetchBlogs();
              else if (activeTab === 'inquiries') fetchInquiries();
            }} title="Refresh Database Data">
              <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            </button>
            <button className="btn-icon close-btn" onClick={onClose} aria-label="Close Admin Panel">
              <X size={20} />
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

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Package size={17} />
            <span>Services & Products ({products.length})</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <FileText size={17} />
            <span>Articles & Blogs ({blogs.length})</span>
          </button>

          <button
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <MessageSquare size={17} />
            <span>Customer Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: SERVICES & PRODUCTS MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="admin-tab-content">
            {/* Toolbar */}
            <div className="admin-toolbar">
              <div className="toolbar-search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search services by title, spec or tag..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                />
              </div>

              <div className="toolbar-filters">
                <select
                  value={productCategoryFilter}
                  onChange={e => setProductCategoryFilter(e.target.value)}
                  className="admin-select"
                >
                  <option value="All">All Categories</option>
                  <option value="Access Control">Access Control</option>
                  <option value="Building Automation">Building Automation</option>
                  <option value="Security Surveillance">Security Surveillance</option>
                  <option value="Fire Detection & Alarm">Fire Detection & Alarm</option>
                  <option value="Cleanroom Engineering">Cleanroom Engineering</option>
                </select>

                <button className="btn btn-red btn-sm flex items-center gap-2" onClick={handleOpenAddProduct}>
                  <Plus size={16} />
                  <span>Add New Service</span>
                </button>
              </div>
            </div>

            {/* Services Table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Service / Product</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Badge / Highlights</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-muted">
                        No services found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(prod => (
                      <tr key={prod.id}>
                        <td>
                          <div className="font-semibold text-slate-900">{prod.name}</div>
                          <div className="text-xs text-muted truncate max-w-md">{prod.tagline || prod.description}</div>
                        </td>
                        <td>
                          <span className="table-cat-badge">{prod.category}</span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-600">{prod.subcategory || 'Standard'}</span>
                        </td>
                        <td>
                          {prod.badge && <span className="table-tag-badge">{prod.badge}</span>}
                          {prod.is_featured && <span className="table-featured-badge">Featured</span>}
                        </td>
                        <td className="text-right">
                          <div className="action-buttons-inline">
                            <button
                              className="btn-action edit"
                              onClick={() => handleOpenEditProduct(prod)}
                              title="Edit this service"
                            >
                              <Edit3 size={15} />
                              <span>Edit</span>
                            </button>
                            <button
                              className="btn-action delete"
                              onClick={() => handleDeleteProduct(prod)}
                              title="Delete this service"
                            >
                              <Trash2 size={15} />
                              <span>Delete</span>
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

        {/* TAB 2: BLOGS & ARTICLES MANAGEMENT */}
        {activeTab === 'blogs' && (
          <div className="admin-tab-content">
            {/* Toolbar */}
            <div className="admin-toolbar">
              <div className="toolbar-search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search articles by title, category, excerpt..."
                  value={blogSearch}
                  onChange={e => setBlogSearch(e.target.value)}
                />
              </div>

              <div className="toolbar-filters">
                <button className="btn btn-red btn-sm flex items-center gap-2" onClick={handleOpenAddBlog}>
                  <Plus size={16} />
                  <span>Add New Blog / Article</span>
                </button>
              </div>
            </div>

            {/* Blogs Table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Article Title</th>
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
                        No articles found. Click "Add New Blog / Article" to create one.
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map(b => (
                      <tr key={b.id}>
                        <td>
                          <div className="font-semibold text-slate-900">{b.title}</div>
                          <div className="text-xs text-muted truncate max-w-md">{b.excerpt}</div>
                        </td>
                        <td>
                          <span className="table-cat-badge">{b.category}</span>
                        </td>
                        <td>
                          <div className="text-xs font-medium text-slate-700">{b.author}</div>
                          <div className="text-xs text-muted">{b.read_time}</div>
                        </td>
                        <td>
                          <span className={`status-badge ${b.is_published ? 'published' : 'draft'}`}>
                            {b.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="action-buttons-inline">
                            <button
                              className="btn-action edit"
                              onClick={() => handleOpenEditBlog(b)}
                              title="Edit this article"
                            >
                              <Edit3 size={15} />
                              <span>Edit</span>
                            </button>
                            <button
                              className="btn-action delete"
                              onClick={() => handleDeleteBlog(b)}
                              title="Delete this article"
                            >
                              <Trash2 size={15} />
                              <span>Delete</span>
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

        {/* TAB 3: CUSTOMER INQUIRIES & LEADS */}
        {activeTab === 'inquiries' && (
          <div className="admin-tab-content">
            <div className="admin-toolbar">
              <div className="status-filter-pills">
                {['All', 'New', 'In Review', 'Contacted', 'Resolved'].map(st => (
                  <button
                    key={st}
                    className={`filter-pill-btn ${inquiryStatusFilter === st ? 'pill-active' : ''}`}
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
                      <strong>Product of Interest:</strong> {inq.product_name} ({inq.category})
                    </div>

                    <div className="inquiry-message-box">
                      "{inq.message}"
                    </div>

                    <div className="inquiry-card-bottom">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Update Status:</span>
                        {['New', 'Contacted', 'Resolved'].map(st => (
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
                        className="btn-action delete"
                        onClick={() => handleDeleteInquiry(inq.id)}
                        title="Delete Inquiry"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ===================== ADD / EDIT PRODUCT MODAL ===================== */}
        {editingProduct && (
          <div className="submodal-overlay" onClick={() => setEditingProduct(null)}>
            <div className="submodal-dialog glass-card" onClick={e => e.stopPropagation()}>
              <div className="submodal-header">
                <div>
                  <h3 className="submodal-title">
                    {editingProduct === 'new' ? 'Add New Service / Product' : `Edit: ${editingProduct.name}`}
                  </h3>
                  <p className="submodal-sub">Changes are stored directly in SQLite and immediately reflected live on the site.</p>
                </div>
                <button className="btn-icon" onClick={() => setEditingProduct(null)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="submodal-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Service / Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Smart Cleanroom Door Interlock Controller"
                      value={productForm.name}
                      onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Core Segment / Category *</label>
                    <select
                      value={productForm.category}
                      onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    >
                      <option value="Access Control">Access Control</option>
                      <option value="Building Automation">Building Automation</option>
                      <option value="Security Surveillance">Security Surveillance</option>
                      <option value="Fire Detection & Alarm">Fire Detection & Alarm</option>
                      <option value="Cleanroom Engineering">Cleanroom Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Subcategory</label>
                    <input
                      type="text"
                      placeholder="e.g., Clean Room Interlocks, Turnstiles, Controllers"
                      value={productForm.subcategory}
                      onChange={e => setProductForm({ ...productForm, subcategory: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Badge / Highlight</label>
                    <input
                      type="text"
                      placeholder="e.g., Enterprise Grade, Bestseller, Patented"
                      value={productForm.badge}
                      onChange={e => setProductForm({ ...productForm, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tagline / One-Liner</label>
                  <input
                    type="text"
                    placeholder="e.g., Fail-safe pneumatic and magnetic interlocking system for sterile suites"
                    value={productForm.tagline}
                    onChange={e => setProductForm({ ...productForm, tagline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Full Description *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Detailed technical overview of the service or product solution..."
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Key Features (One feature per line)</label>
                    <textarea
                      rows="4"
                      placeholder="Fail-safe electromagnetic lock integration&#10;Emergency door override push button&#10;Audio-visual siren and LED indicator status&#10;BMS integration through dry contacts"
                      value={productForm.featuresText}
                      onChange={e => setProductForm({ ...productForm, featuresText: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Technical Specifications (Format: Key: Value per line)</label>
                    <textarea
                      rows="4"
                      placeholder="Operating Voltage: 12V DC / 24V DC&#10;Relay Output: 5A NO/NC contact&#10;Door Configuration: 2-Door to 8-Door Matrix&#10;Enclosure: SS304 Cleanroom Finish"
                      value={productForm.specsText}
                      onChange={e => setProductForm({ ...productForm, specsText: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Target Applications & Industries (One per line)</label>
                  <input
                    type="text"
                    placeholder="Pharmaceutical Cleanrooms, Semiconductor Fabs, Hospital ICUs, Research Labs"
                    value={productForm.applicationsText}
                    onChange={e => setProductForm({ ...productForm, applicationsText: e.target.value })}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.is_featured}
                      onChange={e => setProductForm({ ...productForm, is_featured: e.target.checked })}
                    />
                    <span className="font-semibold text-slate-800">Pin as Featured Service on Homepage</span>
                  </label>
                </div>

                <div className="submodal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setEditingProduct(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-red">
                    {editingProduct === 'new' ? 'Add Service to Live Site' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================== ADD / EDIT BLOG MODAL ===================== */}
        {editingBlog && (
          <div className="submodal-overlay" onClick={() => setEditingBlog(null)}>
            <div className="submodal-dialog glass-card" onClick={e => e.stopPropagation()}>
              <div className="submodal-header">
                <div>
                  <h3 className="submodal-title">
                    {editingBlog === 'new' ? 'Publish New Technical Article / Blog' : `Edit: ${editingBlog.title}`}
                  </h3>
                  <p className="submodal-sub">Articles are instantly published to the website's Blogs section.</p>
                </div>
                <button className="btn-icon" onClick={() => setEditingBlog(null)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="submodal-form">
                <div className="form-group">
                  <label>Article Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Cleanroom Interlock Controller Design Guidelines for ISO 14644 Compliance"
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
                      placeholder="e.g., 5 min read"
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

                <div className="form-group checkbox-group">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blogForm.is_published}
                      onChange={e => setBlogForm({ ...blogForm, is_published: e.target.checked })}
                    />
                    <span className="font-semibold text-slate-800">Publish Immediately (Visible to visitors)</span>
                  </label>
                </div>

                <div className="submodal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setEditingBlog(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-red">
                    {editingBlog === 'new' ? 'Publish Article Now' : 'Save Article Changes'}
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
