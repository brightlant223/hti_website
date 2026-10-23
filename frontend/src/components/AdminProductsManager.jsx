import React, { useState, useMemo, useEffect, useRef } from 'react';
import './AdminProductManagement.css';
import {
  Search, X, Plus, Edit3, Trash2, CheckCircle, Eye, EyeOff,
  Star, List, Grid, Upload, FileText, ChevronLeft, ChevronRight,
  Check, AlertCircle, Sparkles, ExternalLink, RefreshCw, Layers,
  Cpu, ShieldCheck, Flame, Lock, Activity, Video, Download,
  CheckCircle2, ArrowRight, Image as ImageIcon, HelpCircle
} from 'lucide-react';

// Preset standard badges
const BADGE_PRESETS = [
  'Popular Product',
  'High Demand',
  'Featured',
  'New Launch',
  'Bestseller',
  'Certified',
  'Energy Efficient',
  'Heavy Duty',
  'USFDA CFR 21'
];

// Preset categories
const DEFAULT_CATEGORIES = [
  'Automation',
  'Security System',
  'Hygiene',
  'Software',
  'Fire & Life Safety',
  'Cleanroom & Pharma',
  'Traffic & Perimeter'
];

// Auto-generate clean slug
const slugify = (text) => {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function AdminProductsManager({
  products = [],
  currentUser = 'admin',
  onRefresh,
  onFeedback,
  onNavigateToPublicProduct
}) {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'published' | 'draft'
  const [selectedFeatured, setSelectedFeatured] = useState('all'); // 'all' | 'featured'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals state
  const [editingProduct, setEditingProduct] = useState(null); // null | 'new' | product obj
  const [activeStep, setActiveStep] = useState(1); // 1: Basic, 2: Specs, 3: Media, 4: Preview
  const [previewProduct, setPreviewProduct] = useState(null); // quick eye preview
  const [productToDelete, setProductToDelete] = useState(null); // delete confirmation dialog
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null); // null | 'image_url' | 'brochure_url' | 'datasheet_url' | 'gallery'
  const [formErrors, setFormErrors] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);

  // Add/Edit Product Form Data
  const initialFormState = {
    name: '',
    slug: '',
    category: 'Automation',
    subcategory: '',
    badge: 'Popular Product',
    tagline: '',
    description: '',
    featuresText: '',
    specsList: [
      { key: 'Operating Voltage', value: '230V AC ± 10%, 50Hz' },
      { key: 'Duty Cycle', value: '100% Continuous Industrial Duty' }
    ],
    applicationsText: 'Pharmaceutical Cleanrooms, Corporate Towers, Industrial Facilities',
    is_featured: false,
    is_published: true,
    image_url: '',
    gallery: [],
    brochure_url: '',
    datasheet_url: '',
    video_url: '',
    display_order: 0
  };

  const [formData, setFormData] = useState(initialFormState);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // File input refs for instant uploads
  const imageFileInputRef = useRef(null);
  const brochureFileInputRef = useRef(null);
  const datasheetFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);

  // Category counts and list from DB products
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      const cat = p.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  const allCategoryNames = useMemo(() => {
    const set = new Set([...DEFAULT_CATEGORIES, ...Object.keys(categoryCounts)]);
    return Array.from(set).filter(Boolean);
  }, [categoryCounts]);

  // Real database summary counts (KPIs)
  const summaryCounts = useMemo(() => {
    return {
      total: products.length,
      published: products.filter(p => p.is_published).length,
      drafts: products.filter(p => !p.is_published).length,
      featured: products.filter(p => p.is_featured).length
    };
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = (p.name || '').toLowerCase().includes(q);
        const matchesDesc = (p.description || '').toLowerCase().includes(q);
        const matchesCat = (p.category || '').toLowerCase().includes(q);
        const matchesSubcat = (p.subcategory || '').toLowerCase().includes(q);
        const matchesTagline = (p.tagline || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesSubcat && !matchesTagline) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'All') {
        if ((p.category || '').toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Status (Published vs Draft)
      if (selectedStatus === 'published' && !p.is_published) return false;
      if (selectedStatus === 'draft' && p.is_published) return false;

      // 4. Featured
      if (selectedFeatured === 'featured' && !p.is_featured) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedFeatured]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStatus, selectedFeatured]);

  // Helpers for styling categories and badges matching Reference Image 1
  const getCategoryClass = (category) => {
    const c = (category || '').toLowerCase();
    if (c.includes('soft') || c.includes('iot')) return 'software';
    if (c.includes('auto') || c.includes('door') || c.includes('gate')) return 'automation';
    if (c.includes('sec') || c.includes('cctv') || c.includes('surveil')) return 'security';
    if (c.includes('fire') || c.includes('life') || c.includes('safe')) return 'safety';
    if (c.includes('hyg') || c.includes('wash')) return 'hygiene';
    return 'default';
  };

  const getBadgeClass = (badge) => {
    const b = (badge || '').toLowerCase().replace(/\s+/g, '');
    if (b.includes('popular')) return 'popular';
    if (b.includes('demand')) return 'highdemand';
    if (b.includes('featured')) return 'featured';
    if (b.includes('launch') || b.includes('new')) return 'newlaunch';
    if (b.includes('seller') || b.includes('best')) return 'bestseller';
    if (b.includes('cert') || b.includes('iso')) return 'certified';
    return 'default';
  };

  // Open Add Product Modal
  const handleOpenAddModal = () => {
    setFormData({
      ...initialFormState,
      category: allCategoryNames[0] || 'Automation',
      display_order: products.length + 1
    });
    setSlugManuallyEdited(false);
    setActiveStep(1);
    setFormErrors({});
    setIsFormDirty(false);
    setEditingProduct('new');
  };

  // Open Edit Product Modal
  const handleOpenEditModal = (prod) => {
    const specsArray = [];
    if (prod.specs && typeof prod.specs === 'object') {
      Object.entries(prod.specs).forEach(([k, v]) => {
        specsArray.push({ key: k, value: String(v) });
      });
    }
    if (specsArray.length === 0) {
      specsArray.push({ key: '', value: '' });
    }

    setFormData({
      name: prod.name || '',
      slug: prod.slug || slugify(prod.name),
      category: prod.category || 'Automation',
      subcategory: prod.subcategory || '',
      badge: prod.badge || '',
      tagline: prod.tagline || '',
      description: prod.description || '',
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : '',
      specsList: specsArray,
      applicationsText: Array.isArray(prod.applications) ? prod.applications.join(', ') : '',
      is_featured: Boolean(prod.is_featured),
      is_published: prod.is_published !== undefined ? Boolean(prod.is_published) : true,
      image_url: prod.image_url || '',
      gallery: Array.isArray(prod.gallery) ? prod.gallery : [],
      brochure_url: prod.brochure_url || '',
      datasheet_url: prod.datasheet_url || '',
      video_url: prod.video_url || '',
      display_order: prod.display_order || 0
    });
    setSlugManuallyEdited(true);
    setActiveStep(1);
    setFormErrors({});
    setIsFormDirty(false);
    setEditingProduct(prod);
  };

  // Close modal safely with unsaved changes check
  const handleCloseModal = () => {
    if (isFormDirty) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to exit without saving?')) {
        return;
      }
    }
    setEditingProduct(null);
    setIsFormDirty(false);
  };

  // Auto-generate slug when title changes
  const handleNameChange = (val) => {
    setIsFormDirty(true);
    setFormData(prev => {
      const next = { ...prev, name: val };
      if (!slugManuallyEdited) {
        next.slug = slugify(val);
      }
      return next;
    });
    if (formErrors.name) {
      setFormErrors(prev => ({ ...prev, name: null }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.category.trim()) errors.category = 'Category is required';
    if (!formData.description.trim()) errors.description = 'Detailed description is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Media File Upload Handler
  const handleFileUpload = async (file, fieldType) => {
    if (!file) return;
    try {
      setUploadingField(fieldType);
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch(`/api/upload?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'POST',
        body: fd
      });

      if (res.ok) {
        const data = await res.json();
        setIsFormDirty(true);
        if (fieldType === 'image_url') {
          setFormData(prev => ({ ...prev, image_url: data.url }));
        } else if (fieldType === 'brochure_url') {
          setFormData(prev => ({ ...prev, brochure_url: data.url }));
        } else if (fieldType === 'datasheet_url') {
          setFormData(prev => ({ ...prev, datasheet_url: data.url }));
        } else if (fieldType === 'gallery') {
          setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), data.url] }));
        }
        if (onFeedback) onFeedback('success', `File "${data.filename}" uploaded successfully!`);
      } else {
        const err = await res.json();
        if (onFeedback) onFeedback('error', err.detail || 'Upload failed.');
      }
    } catch (err) {
      if (onFeedback) onFeedback('error', 'Network error during file upload.');
    } finally {
      setUploadingField(null);
    }
  };

  // Save Product (as published or draft)
  const handleSaveProduct = async (saveAsDraft = false) => {
    if (!validateForm()) {
      setActiveStep(1);
      if (onFeedback) onFeedback('error', 'Please fill in required fields: Product Name, Category, and Description.');
      return;
    }

    try {
      setIsSaving(true);

      // Convert specs to dict
      const specsObj = {};
      formData.specsList.forEach(s => {
        if (s.key && s.key.trim()) {
          specsObj[s.key.trim()] = (s.value || '').trim();
        }
      });

      // Convert features to array
      const featuresArr = formData.featuresText
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      // Convert applications to array
      const applicationsArr = formData.applicationsText
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const isPublished = saveAsDraft ? false : Boolean(formData.is_published);

      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim() || slugify(formData.name),
        category: formData.category.trim(),
        subcategory: formData.subcategory.trim() || formData.category.trim(),
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        features: featuresArr,
        specs: specsObj,
        applications: applicationsArr,
        badge: formData.badge.trim(),
        is_featured: Boolean(formData.is_featured),
        image_url: formData.image_url.trim(),
        gallery: formData.gallery || [],
        brochure_url: formData.brochure_url.trim(),
        datasheet_url: formData.datasheet_url.trim(),
        video_url: formData.video_url.trim(),
        is_published: isPublished,
        display_order: parseInt(formData.display_order, 10) || 0
      };

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
        const data = await res.json();
        const actionStr = editingProduct === 'new'
          ? (isPublished ? 'Product created & published to public website!' : 'Product saved as Draft!')
          : 'Product updated successfully!';
        if (onFeedback) onFeedback('success', actionStr);
        setIsFormDirty(false);
        setEditingProduct(null);
        if (onRefresh) onRefresh();
      } else {
        const err = await res.json();
        if (onFeedback) onFeedback('error', err.detail || 'Failed to save product.');
      }
    } catch (err) {
      if (onFeedback) onFeedback('error', 'Network error while saving product.');
    } finally {
      setIsSaving(false);
    }
  };

  // Quick Toggle Publish / Draft
  const handleTogglePublish = async (prod) => {
    try {
      const res = await fetch(`/api/products/${prod.id}/toggle-publish?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const data = await res.json();
        if (onFeedback) onFeedback('success', `Product "${prod.name}" status updated to ${data.status}!`);
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      if (onFeedback) onFeedback('error', 'Failed to toggle publication status.');
    }
  };

  // Delete Product
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch(`/api/products/${productToDelete.id}?admin_user=${encodeURIComponent(currentUser)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        if (onFeedback) onFeedback('success', `Product "${productToDelete.name}" permanently removed.`);
        setProductToDelete(null);
        if (onRefresh) onRefresh();
      } else {
        const err = await res.json();
        if (onFeedback) onFeedback('error', err.detail || 'Failed to delete product.');
      }
    } catch (err) {
      if (onFeedback) onFeedback('error', 'Network error deleting product.');
    }
  };

  return (
    <div className="adm-products-container">
      {/* -----------------------------------------------------------------------
          1. PRODUCT SUMMARY KPI CARDS (Requirement 1)
          ----------------------------------------------------------------------- */}
      <div className="adm-products-summary-grid">
        <div className="adm-prod-stat-card">
          <div className="adm-prod-stat-info">
            <span className="adm-prod-stat-label">Total Products</span>
            <span className="adm-prod-stat-val">{summaryCounts.total}</span>
            <span className="adm-prod-stat-sub">Across {Object.keys(categoryCounts).length} categories</span>
          </div>
          <div className="adm-prod-stat-icon-wrap blue">
            <Layers size={22} />
          </div>
        </div>

        <div className="adm-prod-stat-card">
          <div className="adm-prod-stat-info">
            <span className="adm-prod-stat-label">Published Products</span>
            <span className="adm-prod-stat-val" style={{ color: '#059669' }}>{summaryCounts.published}</span>
            <span className="adm-prod-stat-sub">Live on public website</span>
          </div>
          <div className="adm-prod-stat-icon-wrap green">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="adm-prod-stat-card">
          <div className="adm-prod-stat-info">
            <span className="adm-prod-stat-label">Draft Products</span>
            <span className="adm-prod-stat-val" style={{ color: '#64748b' }}>{summaryCounts.drafts}</span>
            <span className="adm-prod-stat-sub">Hidden from public view</span>
          </div>
          <div className="adm-prod-stat-icon-wrap slate">
            <EyeOff size={22} />
          </div>
        </div>

        <div className="adm-prod-stat-card">
          <div className="adm-prod-stat-info">
            <span className="adm-prod-stat-label">Featured Products</span>
            <span className="adm-prod-stat-val" style={{ color: '#d97706' }}>{summaryCounts.featured}</span>
            <span className="adm-prod-stat-sub">Highlighted in showcase</span>
          </div>
          <div className="adm-prod-stat-icon-wrap amber">
            <Star size={22} fill="#d97706" />
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
          2. SEARCH & FILTERS TOOLBAR (Reference Image 1)
          ----------------------------------------------------------------------- */}
      <div className="adm-products-toolbar">
        {/* Search Input */}
        <div className="adm-products-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="adm-products-search-input"
            placeholder="Search products, solutions or specifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="adm-search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="adm-products-actions-group">
          {/* Dynamic Category Dropdown */}
          <select
            className="adm-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories ({products.length})</option>
            {allCategoryNames.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({categoryCounts[cat] || 0})
              </option>
            ))}
          </select>

          {/* Publication Status Dropdown */}
          <select
            className="adm-status-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published ({summaryCounts.published})</option>
            <option value="draft">Drafts ({summaryCounts.drafts})</option>
          </select>

          {/* Featured Filter Pill */}
          <button
            className={`adm-filter-pill-btn ${selectedFeatured === 'featured' ? 'active' : ''}`}
            onClick={() => setSelectedFeatured(selectedFeatured === 'featured' ? 'all' : 'featured')}
            title="Filter Featured Products"
          >
            <Star size={13} fill={selectedFeatured === 'featured' ? 'currentColor' : 'none'} />
            <span>Featured</span>
          </button>

          {/* View Mode Toggle (Table / Grid) */}
          <div className="adm-view-toggle">
            <button
              className={`adm-view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={15} />
            </button>
            <button
              className={`adm-view-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Card Grid View"
            >
              <Grid size={15} />
            </button>
          </div>

          {/* Add Product Primary Button (Reference Image 1) */}
          <button
            className="adm-btn-add-product"
            onClick={handleOpenAddModal}
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
          3. PRODUCT LIST TABLE (Reference Image 1)
          ----------------------------------------------------------------------- */}
      <div className="adm-products-table-card" style={{ marginTop: '16px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
            <Layers size={40} style={{ color: '#cbd5e1', marginBottom: '12px' }} />
            <h4 style={{ margin: '0 0 6px 0', color: '#1e293b', fontSize: '1.05rem', fontWeight: 700 }}>No products found</h4>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.86rem' }}>
              No products match your current search and filter criteria.
            </p>
            <button
              className="adm-btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('all');
                setSelectedFeatured('all');
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <div className="adm-table-scroll-container">
            <table className="adm-modern-table">
              <thead>
                <tr>
                  <th style={{ width: '45px', textAlign: 'center' }}>#</th>
                  <th>Product / Solution</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Badge</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>Order</th>
                  <th style={{ textAlign: 'right', paddingRight: '20px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((p, idx) => {
                  const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <tr key={p.id}>
                      {/* # Number */}
                      <td style={{ textAlign: 'center', color: '#64748b', fontWeight: 600, fontSize: '0.8rem' }}>
                        {globalIdx}
                      </td>

                      {/* Product Thumbnail + Name + Short Description */}
                      <td>
                        <div className="adm-table-product-cell">
                          <div className="adm-table-thumb">
                            {p.image_url ? (
                              <img
                                src={p.image_url}
                                alt={p.name}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <Layers size={20} style={{ color: '#94a3b8' }} />
                            )}
                          </div>
                          <div className="adm-table-product-titles">
                            <span className="adm-table-product-name">{p.name}</span>
                            <span className="adm-table-product-desc">
                              {p.tagline || p.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td>
                        <span className={`adm-cat-pill ${getCategoryClass(p.category)}`}>
                          {p.category}
                        </span>
                      </td>

                      {/* Subcategory */}
                      <td style={{ color: '#475569', fontSize: '0.82rem', fontWeight: 500 }}>
                        {p.subcategory || '—'}
                      </td>

                      {/* Badge Label */}
                      <td>
                        {p.badge ? (
                          <span className={`adm-badge-pill ${getBadgeClass(p.badge)}`}>
                            {p.badge}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>

                      {/* Publication Status (Clickable Toggle) */}
                      <td>
                        <button
                          className={`adm-status-toggle-btn ${p.is_published ? 'published' : 'draft'}`}
                          onClick={() => handleTogglePublish(p)}
                          title="Click to toggle Published / Draft"
                        >
                          <span className={`adm-status-dot ${p.is_published ? 'green' : 'neutral'}`} />
                          <span>{p.is_published ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Display Order */}
                      <td style={{ textAlign: 'center', color: '#475569', fontWeight: 600 }}>
                        {p.display_order ?? globalIdx}
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                        <div className="adm-table-actions">
                          {/* View Product */}
                          <button
                            className="adm-action-icon-btn"
                            onClick={() => setPreviewProduct(p)}
                            title="Preview Product Details"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Edit Product */}
                          <button
                            className="adm-action-icon-btn"
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Product"
                          >
                            <Edit3 size={15} />
                          </button>

                          {/* Delete Product */}
                          <button
                            className="adm-action-icon-btn delete"
                            onClick={() => setProductToDelete(p)}
                            title="Delete Product"
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
        ) : (
          /* Cards Grid View */
          <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
            {paginatedProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  background: '#ffffff',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ height: '140px', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
                  {p.image_url ? (
                    <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Layers size={36} style={{ color: '#cbd5e1' }} />
                    </div>
                  )}
                  <span className={`adm-cat-pill ${getCategoryClass(p.category)}`} style={{ position: 'absolute', top: 10, left: 10 }}>
                    {p.category}
                  </span>
                  {p.badge && (
                    <span className={`adm-badge-pill ${getBadgeClass(p.badge)}`} style={{ position: 'absolute', top: 10, right: 10 }}>
                      {p.badge}
                    </span>
                  )}
                </div>

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>
                    {p.name}
                  </h4>
                  <p style={{ margin: '0 0 14px 0', fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4, flexGrow: 1 }}>
                    {p.tagline || (p.description ? p.description.slice(0, 85) + '...' : '')}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                    <button
                      className={`adm-status-toggle-btn ${p.is_published ? 'published' : 'draft'}`}
                      onClick={() => handleTogglePublish(p)}
                    >
                      <span className={`adm-status-dot ${p.is_published ? 'green' : 'neutral'}`} />
                      <span>{p.is_published ? 'Published' : 'Draft'}</span>
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="adm-action-icon-btn" onClick={() => setPreviewProduct(p)} title="Preview"><Eye size={14} /></button>
                      <button className="adm-action-icon-btn" onClick={() => handleOpenEditModal(p)} title="Edit"><Edit3 size={14} /></button>
                      <button className="adm-action-icon-btn delete" onClick={() => setProductToDelete(p)} title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {filteredProducts.length > 0 && (
          <div className="adm-table-pagination">
            <span>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </span>

            <div className="adm-pagination-btns">
              <button
                className="adm-page-nav-btn"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`adm-page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                className="adm-page-nav-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* -----------------------------------------------------------------------
          4. ADD / EDIT PRODUCT MODAL (Reference Image 2 - Multi-step)
          ----------------------------------------------------------------------- */}
      {editingProduct && (
        <div className="adm-modal-backdrop" onClick={handleCloseModal}>
          <div className="adm-modal-card-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="adm-modal-header">
              <div className="adm-modal-header-titles">
                <div className="adm-modal-header-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="adm-modal-title">
                    {editingProduct === 'new' ? 'Add New Product or System' : `Edit Product: ${editingProduct.name}`}
                  </h3>
                  <p className="adm-modal-subtitle">
                    Configure technical specifications, verified compliance, and website publishing.
                  </p>
                </div>
              </div>
              <button className="adm-modal-close-btn" onClick={handleCloseModal} title="Close Modal">
                <X size={18} />
              </button>
            </div>

            {/* Step Progress Tabs (Reference Image 2) */}
            <div className="adm-step-progress-bar">
              <button
                className={`adm-step-tab-btn ${activeStep === 1 ? 'active' : ''}`}
                onClick={() => setActiveStep(1)}
              >
                <span className="adm-step-num">1.</span> Basic Info
              </button>

              <button
                className={`adm-step-tab-btn ${activeStep === 2 ? 'active' : ''}`}
                onClick={() => setActiveStep(2)}
              >
                <span className="adm-step-num">2.</span> Specs &amp; Features
              </button>

              <button
                className={`adm-step-tab-btn ${activeStep === 3 ? 'active' : ''}`}
                onClick={() => setActiveStep(3)}
              >
                <span className="adm-step-num">3.</span> Media &amp; Downloads
              </button>

              <button
                className={`adm-step-tab-btn ${activeStep === 4 ? 'active' : ''}`}
                onClick={() => setActiveStep(4)}
              >
                <Eye size={14} />
                <span>Customer Preview</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="adm-modal-body-content">
              {/* STEP 1: BASIC INFORMATION */}
              {activeStep === 1 && (
                <div>
                  <div className="adm-form-grid-2">
                    {/* Product Name */}
                    <div className="adm-field-group">
                      <label className="adm-field-label">
                        Product Name <span className="adm-field-req">*</span>
                      </label>
                      <input
                        type="text"
                        className={`adm-field-input ${formErrors.name ? 'has-error' : ''}`}
                        placeholder="e.g. Door Interlock System"
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                      />
                      {formErrors.name && (
                        <span className="adm-field-error-msg">{formErrors.name}</span>
                      )}
                    </div>

                    {/* Category Dropdown */}
                    <div className="adm-field-group">
                      <label className="adm-field-label">
                        Category <span className="adm-field-req">*</span>
                      </label>
                      <select
                        className="adm-field-select"
                        value={formData.category}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, category: e.target.value });
                        }}
                      >
                        {allCategoryNames.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Subcategory */}
                    <div className="adm-field-group">
                      <label className="adm-field-label">Subcategory</label>
                      <input
                        type="text"
                        className="adm-field-input"
                        placeholder="e.g. Cleanroom Interlocking"
                        value={formData.subcategory}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, subcategory: e.target.value });
                        }}
                      />
                    </div>

                    {/* Badge Label */}
                    <div className="adm-field-group">
                      <label className="adm-field-label">Badge Label</label>
                      <select
                        className="adm-field-select"
                        value={formData.badge}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, badge: e.target.value });
                        }}
                      >
                        <option value="">No Badge</option>
                        {BADGE_PRESETS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Slug / URL identifier */}
                  <div className="adm-field-group">
                    <label className="adm-field-label">
                      URL Slug
                      <span style={{ fontWeight: 400, color: '#64748b', fontSize: '0.74rem' }}>
                        (Auto-generated from name, editable)
                      </span>
                    </label>
                    <input
                      type="text"
                      className="adm-field-input"
                      placeholder="e.g. door-interlock-system"
                      value={formData.slug}
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setSlugManuallyEdited(true);
                        setFormData({ ...formData, slug: slugify(e.target.value) });
                      }}
                    />
                    <div className="adm-slug-preview">
                      Public URL: /product/{formData.slug || 'slug-placeholder'}
                    </div>
                  </div>

                  {/* Short Tagline */}
                  <div className="adm-field-group">
                    <label className="adm-field-label">Short Tagline</label>
                    <input
                      type="text"
                      className="adm-field-input"
                      placeholder="One-line value proposition (e.g. Architectural-grade touchless entry solutions)"
                      value={formData.tagline}
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setFormData({ ...formData, tagline: e.target.value });
                      }}
                    />
                  </div>

                  {/* Detailed Description */}
                  <div className="adm-field-group">
                    <label className="adm-field-label">
                      Detailed Engineering Description <span className="adm-field-req">*</span>
                    </label>
                    <textarea
                      className={`adm-field-textarea ${formErrors.description ? 'has-error' : ''}`}
                      rows={5}
                      placeholder="Comprehensive technical overview, mechanical properties, and engineering advantages..."
                      value={formData.description}
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setFormData({ ...formData, description: e.target.value });
                        if (formErrors.description) setFormErrors(prev => ({ ...prev, description: null }));
                      }}
                    />
                    {formErrors.description && (
                      <span className="adm-field-error-msg">{formErrors.description}</span>
                    )}
                  </div>

                  {/* Checkboxes: Featured & Publish */}
                  <div className="adm-checkbox-row">
                    <label className="adm-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, is_featured: e.target.checked });
                        }}
                      />
                      <span>Mark as Featured Product (Showcase)</span>
                    </label>

                    <label className="adm-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.is_published}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, is_published: e.target.checked });
                        }}
                      />
                      <span>Publish on Website (Active)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 2: SPECS & FEATURES */}
              {activeStep === 2 && (
                <div>
                  {/* Dynamic Technical Specifications Table */}
                  <div className="adm-specs-table-builder">
                    <div className="adm-specs-table-header">
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#0f172a' }}>
                          Technical Specifications (Key - Value Pairs)
                        </span>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          Configure flexible engineering specifications tailored for this product.
                        </div>
                      </div>

                      <button
                        type="button"
                        className="adm-btn-secondary"
                        style={{ padding: '5px 12px', fontSize: '0.8rem' }}
                        onClick={() => {
                          setIsFormDirty(true);
                          setFormData(prev => ({
                            ...prev,
                            specsList: [...prev.specsList, { key: '', value: '' }]
                          }));
                        }}
                      >
                        <Plus size={13} style={{ marginRight: 4 }} />
                        Add Specification
                      </button>
                    </div>

                    <div className="adm-specs-rows">
                      {formData.specsList.map((spec, i) => (
                        <div key={i} className="adm-spec-row">
                          <input
                            type="text"
                            className="adm-field-input adm-spec-key-input"
                            placeholder="Parameter (e.g. Door Leaf Capacity)"
                            value={spec.key}
                            onChange={(e) => {
                              setIsFormDirty(true);
                              const updated = [...formData.specsList];
                              updated[i].key = e.target.value;
                              setFormData({ ...formData, specsList: updated });
                            }}
                          />

                          <input
                            type="text"
                            className="adm-field-input adm-spec-val-input"
                            placeholder="Value / Rating (e.g. Up to 150 kg per leaf)"
                            value={spec.value}
                            onChange={(e) => {
                              setIsFormDirty(true);
                              const updated = [...formData.specsList];
                              updated[i].value = e.target.value;
                              setFormData({ ...formData, specsList: updated });
                            }}
                          />

                          {formData.specsList.length > 1 && (
                            <button
                              type="button"
                              className="adm-spec-del-btn"
                              onClick={() => {
                                setIsFormDirty(true);
                                setFormData(prev => ({
                                  ...prev,
                                  specsList: prev.specsList.filter((_, idx) => idx !== i)
                                }));
                              }}
                              title="Remove specification row"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Features (Bullet Points) */}
                  <div className="adm-field-group">
                    <label className="adm-field-label">
                      Key Engineering Features (One bullet per line)
                    </label>
                    <textarea
                      className="adm-field-textarea"
                      rows={5}
                      placeholder="Heavy-duty brushless DC motor with high-efficiency gearbox&#10;Integrated battery backup for emergency fail-safe opening&#10;Direct integration with biometric terminals and fire alarms"
                      value={formData.featuresText}
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setFormData({ ...formData, featuresText: e.target.value });
                      }}
                    />
                  </div>

                  {/* Industrial Applications & Use Cases */}
                  <div className="adm-field-group">
                    <label className="adm-field-label">
                      Industrial Applications (Comma-separated)
                    </label>
                    <input
                      type="text"
                      className="adm-field-input"
                      placeholder="Pharmaceutical Cleanrooms, Hospital ICUs, Airports, IT Parks"
                      value={formData.applicationsText}
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setFormData({ ...formData, applicationsText: e.target.value });
                      }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: MEDIA & DOWNLOADS */}
              {activeStep === 3 && (
                <div>
                  {/* Main Product Thumbnail */}
                  <div className="adm-field-group">
                    <label className="adm-field-label">Product Cover Image / Thumbnail</label>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="adm-field-input"
                        placeholder="Image URL (e.g. /products/automatic-doors.jpg or https://...)"
                        value={formData.image_url}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, image_url: e.target.value });
                        }}
                      />

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={imageFileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], 'image_url');
                          }
                        }}
                      />

                      <button
                        type="button"
                        className="adm-btn-secondary"
                        style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}
                        onClick={() => imageFileInputRef.current && imageFileInputRef.current.click()}
                        disabled={uploadingField === 'image_url'}
                      >
                        <Upload size={14} />
                        <span>{uploadingField === 'image_url' ? 'Uploading...' : 'Upload Image'}</span>
                      </button>
                    </div>

                    {/* Image Preview Box */}
                    {formData.image_url && (
                      <div className="adm-media-preview-container">
                        <img
                          src={formData.image_url}
                          alt="Cover Preview"
                          className="adm-media-preview-img"
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                            Image Preview Verified
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                            {formData.image_url}
                          </div>
                          <button
                            type="button"
                            style={{ border: 'none', background: 'none', color: '#dc2626', fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 4 }}
                            onClick={() => {
                              setIsFormDirty(true);
                              setFormData({ ...formData, image_url: '' });
                            }}
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Multiple Gallery Images */}
                  <div className="adm-field-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label className="adm-field-label">Additional Gallery Images</label>

                      {/* Hidden Gallery File Input */}
                      <input
                        type="file"
                        ref={galleryFileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], 'gallery');
                          }
                        }}
                      />

                      <button
                        type="button"
                        className="adm-btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                        onClick={() => galleryFileInputRef.current && galleryFileInputRef.current.click()}
                        disabled={uploadingField === 'gallery'}
                      >
                        <Plus size={12} style={{ marginRight: 4 }} />
                        {uploadingField === 'gallery' ? 'Uploading...' : 'Add Gallery Photo'}
                      </button>
                    </div>

                    {formData.gallery && formData.gallery.length > 0 ? (
                      <div className="adm-gallery-previews-grid">
                        {formData.gallery.map((imgUrl, gIdx) => (
                          <div key={gIdx} className="adm-gallery-thumb-item">
                            <img src={imgUrl} alt={`Gallery ${gIdx}`} />
                            <button
                              type="button"
                              className="adm-gallery-del-btn"
                              onClick={() => {
                                setIsFormDirty(true);
                                setFormData(prev => ({
                                  ...prev,
                                  gallery: prev.gallery.filter((_, idx) => idx !== gIdx)
                                }));
                              }}
                              title="Delete Photo"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '4px 0 0 0' }}>
                        No gallery photos added yet.
                      </p>
                    )}
                  </div>

                  {/* Documents & Video URLs */}
                  <div className="adm-form-grid-2">
                    {/* Brochure PDF */}
                    <div className="adm-field-group">
                      <label className="adm-field-label">Technical Brochure PDF URL / Upload</label>
                      <input
                        type="text"
                        className="adm-field-input"
                        placeholder="/brochures/product-brochure.pdf"
                        value={formData.brochure_url}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, brochure_url: e.target.value });
                        }}
                      />
                    </div>

                    {/* Datasheet PDF */}
                    <div className="adm-field-group">
                      <label className="adm-field-label">Datasheet PDF URL / Upload</label>
                      <input
                        type="text"
                        className="adm-field-input"
                        placeholder="/datasheets/technical-specs.pdf"
                        value={formData.datasheet_url}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, datasheet_url: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  {/* Demo Video URL & Display Order */}
                  <div className="adm-form-grid-2">
                    <div className="adm-field-group">
                      <label className="adm-field-label">Product Demo Video URL</label>
                      <input
                        type="text"
                        className="adm-field-input"
                        placeholder="e.g. /automatic_sliding.mp4 or YouTube URL"
                        value={formData.video_url}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, video_url: e.target.value });
                        }}
                      />
                    </div>

                    <div className="adm-field-group">
                      <label className="adm-field-label">Display Order Priority (Integer)</label>
                      <input
                        type="number"
                        className="adm-field-input"
                        value={formData.display_order}
                        onChange={(e) => {
                          setIsFormDirty(true);
                          setFormData({ ...formData, display_order: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CUSTOMER PREVIEW (Live Interactive Recreation) */}
              {activeStep === 4 && (
                <div>
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                      Live Public Website Customer Preview
                    </span>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                      Here is how this product will be presented to visitors on the public catalogue and product details pages.
                    </p>
                  </div>

                  <div className="adm-customer-preview-box">
                    <div className="adm-preview-card-wrap">
                      <div className="adm-preview-left">
                        <div className="adm-preview-img-box">
                          {formData.image_url ? (
                            <img src={formData.image_url} alt="Product" />
                          ) : (
                            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                              <Layers size={40} style={{ color: '#475569' }} />
                            </div>
                          )}
                          {formData.badge && (
                            <span
                              className={`adm-badge-pill ${getBadgeClass(formData.badge)}`}
                              style={{ position: 'absolute', top: 12, right: 12 }}
                            >
                              {formData.badge}
                            </span>
                          )}
                        </div>

                        {formData.gallery && formData.gallery.length > 0 && (
                          <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
                            {formData.gallery.slice(0, 3).map((g, i) => (
                              <img
                                key={i}
                                src={g}
                                alt=""
                                style={{ width: 50, height: 40, borderRadius: 6, objectFit: 'cover' }}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="adm-preview-right">
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                          <span className={`adm-cat-pill ${getCategoryClass(formData.category)}`}>
                            {formData.category}
                          </span>
                          {formData.subcategory && (
                            <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>
                              • {formData.subcategory}
                            </span>
                          )}
                        </div>

                        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                          {formData.name || 'Untitled Product System'}
                        </h3>

                        {formData.tagline && (
                          <p style={{ margin: '0 0 10px 0', fontSize: '0.86rem', color: '#0284c7', fontWeight: 600 }}>
                            {formData.tagline}
                          </p>
                        )}

                        <p style={{ margin: '0 0 16px 0', fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                          {formData.description || 'No description entered yet.'}
                        </p>

                        {/* Bullet Points Preview */}
                        {formData.featuresText && (
                          <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                              Key Features:
                            </div>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                              {formData.featuresText.split('\n').filter(Boolean).slice(0, 4).map((feat, fIdx) => (
                                <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.8rem', color: '#334155' }}>
                                  <CheckCircle2 size={14} style={{ color: '#2563eb', flexShrink: 0, marginTop: 2 }} />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Specs Table Preview */}
                        {formData.specsList.some(s => s.key && s.value) && (
                          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                            <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
                              <tbody>
                                {formData.specsList.filter(s => s.key && s.value).slice(0, 4).map((s, idx) => (
                                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                                    <td style={{ padding: '6px 12px', fontWeight: 700, color: '#334155', width: '40%' }}>{s.key}</td>
                                    <td style={{ padding: '6px 12px', color: '#475569' }}>{s.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer (Reference Image 2) */}
            <div className="adm-modal-footer">
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="adm-btn-draft"
                  onClick={() => handleSaveProduct(true)}
                  disabled={isSaving}
                >
                  <EyeOff size={14} />
                  <span>Save as Draft</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {activeStep > 1 && (
                  <button
                    type="button"
                    className="adm-btn-secondary"
                    onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                )}

                {activeStep < 4 ? (
                  <button
                    type="button"
                    className="adm-btn-publish"
                    onClick={() => {
                      if (activeStep === 1 && !validateForm()) {
                        if (onFeedback) onFeedback('error', 'Please fill in required fields.');
                        return;
                      }
                      setActiveStep(prev => Math.min(prev + 1, 4));
                    }}
                  >
                    <span>Next Step</span>
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="adm-btn-publish"
                    onClick={() => handleSaveProduct(false)}
                    disabled={isSaving}
                  >
                    <CheckCircle size={16} />
                    <span>{editingProduct === 'new' ? 'Save & Publish Product' : 'Save Changes'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          5. QUICK VIEW / PREVIEW MODAL
          ----------------------------------------------------------------------- */}
      {previewProduct && (
        <div className="adm-modal-backdrop" onClick={() => setPreviewProduct(null)}>
          <div className="adm-modal-card-dialog" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Eye size={20} style={{ color: '#2563eb' }} />
                <h3 className="adm-modal-title">{previewProduct.name}</h3>
              </div>
              <button className="adm-modal-close-btn" onClick={() => setPreviewProduct(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="adm-modal-body-content">
              <div style={{ height: '220px', borderRadius: 10, overflow: 'hidden', background: '#f1f5f9', marginBottom: 16 }}>
                {previewProduct.image_url ? (
                  <img src={previewProduct.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Layers size={48} style={{ color: '#94a3b8' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span className={`adm-cat-pill ${getCategoryClass(previewProduct.category)}`}>
                  {previewProduct.category}
                </span>
                {previewProduct.badge && (
                  <span className={`adm-badge-pill ${getBadgeClass(previewProduct.badge)}`}>
                    {previewProduct.badge}
                  </span>
                )}
                <span className={`adm-status-toggle-btn ${previewProduct.is_published ? 'published' : 'draft'}`}>
                  <span className={`adm-status-dot ${previewProduct.is_published ? 'green' : 'neutral'}`} />
                  <span>{previewProduct.is_published ? 'Published' : 'Draft'}</span>
                </span>
              </div>

              {previewProduct.tagline && (
                <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#0284c7', fontWeight: 600 }}>
                  {previewProduct.tagline}
                </p>
              )}

              <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                {previewProduct.description}
              </p>

              {previewProduct.specs && Object.keys(previewProduct.specs).length > 0 && (
                <div>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>
                    Engineering Specifications
                  </h5>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                    <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
                      <tbody>
                        {Object.entries(previewProduct.specs).map(([k, v], sIdx) => (
                          <tr key={sIdx} style={{ background: sIdx % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                            <td style={{ padding: '6px 12px', fontWeight: 700, color: '#334155', width: '40%' }}>{k}</td>
                            <td style={{ padding: '6px 12px', color: '#475569' }}>{String(v)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-btn-secondary"
                onClick={() => setPreviewProduct(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="adm-btn-publish"
                onClick={() => {
                  const p = previewProduct;
                  setPreviewProduct(null);
                  handleOpenEditModal(p);
                }}
              >
                <Edit3 size={15} />
                <span>Edit Product</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          6. DELETE CONFIRMATION MODAL
          ----------------------------------------------------------------------- */}
      {productToDelete && (
        <div className="adm-modal-backdrop" onClick={() => setProductToDelete(null)}>
          <div className="adm-modal-card-dialog" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header" style={{ borderBottomColor: '#fecaca', background: '#fff5f5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <AlertCircle size={22} style={{ color: '#dc2626' }} />
                <h3 className="adm-modal-title" style={{ color: '#991b1b' }}>Delete Product</h3>
              </div>
              <button className="adm-modal-close-btn" onClick={() => setProductToDelete(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="adm-modal-body-content">
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                Are you sure you want to permanently delete <strong>"{productToDelete.name}"</strong>?
              </p>
              <p style={{ margin: '10px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                This product will be immediately removed from the SQLite database and public website catalogue. This action cannot be undone.
              </p>
            </div>

            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-btn-secondary"
                onClick={() => setProductToDelete(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                style={{
                  padding: '9px 18px',
                  borderRadius: 8,
                  border: '1px solid #b91c1c',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
                onClick={handleConfirmDelete}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
