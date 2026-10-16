import React, { useEffect } from 'react';
import { X, CheckCircle2, Sliders, Layers, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ProductModal({ product, onClose, onInquire }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!product) return null;

  const categoryColorClass =
    product.category === 'Automation'
      ? 'badge-red'
      : product.category === 'Hygiene'
      ? 'badge-emerald'
      : 'badge-cyan';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-badges">
              <span className={`badge-pill ${categoryColorClass}`}>
                {product.category}
              </span>
              <span className="badge-pill badge-dim">
                {product.subcategory}
              </span>
              {product.badge && (
                <span className="badge-pill badge-amber">
                  {product.badge}
                </span>
              )}
            </div>
            <h2 className="modal-title">{product.name}</h2>
            {product.tagline && <p className="modal-tagline">{product.tagline}</p>}
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {/* Detailed Description */}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <ShieldCheck size={16} className="text-cyan" />
              <span>Engineering Overview</span>
            </h4>
            <p className="modal-description-text">{product.description}</p>
          </div>

          {/* Key Features */}
          {product.features && product.features.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Key Features & Functional Highlights</span>
              </h4>
              <ul className="modal-features-list">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <CheckCircle2 size={15} className="text-cyan flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specifications Table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <Sliders size={16} className="text-amber" />
                <span>Technical Specifications</span>
              </h4>
              <div className="specs-table-wrapper">
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={idx} className="spec-row">
                        <td className="spec-key">{key}</td>
                        <td className="spec-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Target Applications */}
          {product.applications && product.applications.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <Layers size={16} className="text-red" />
                <span>Recommended Industry Applications</span>
              </h4>
              <div className="applications-pills-wrap">
                {product.applications.map((app, idx) => (
                  <span key={idx} className="app-pill">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="modal-footer-note">
            Custom engineered options & turnkey installation available across India.
          </div>
          <div className="modal-footer-actions">
            <button className="btn-secondary" onClick={onClose}>
              Back to Catalog
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onInquire(product.name, product.category);
                onClose();
              }}
            >
              <span>Inquire for {product.name}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
