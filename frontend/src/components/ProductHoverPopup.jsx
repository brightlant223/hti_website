import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle, 
  ShieldCheck, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { getProductMedia } from '../data/productsData';

export default function ProductHoverPopup({
  product,
  media: customMedia,
  position,
  onNavigate,
  onMouseEnter,
  onMouseLeave
}) {
  if (!product) return null;

  const media = customMedia || getProductMedia(product);
  const primaryImg = media?.primaryImage || '/products/automatic-doors.jpg';

  // Extract up to 2 key specs for quick preview
  const specEntries = product.specs ? Object.entries(product.specs).slice(0, 2) : [];

  return (
    <div
      className="hti-product-hover-popup animate-popover"
      style={{
        position: 'fixed',
        top: `${position?.top ?? 100}px`,
        left: `${position?.left ?? 200}px`,
        zIndex: 99999,
        pointerEvents: 'auto'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onNavigate && onNavigate('product', product.slug)}
    >
      <div className="popup-card-glass">
        {/* Top Badges Bar */}
        <div className="popup-top-bar">
          <span className="popup-category-badge">
            <span className="popup-pulse-dot" />
            {product.category || 'HTI Industrial'}
          </span>
          <span className="popup-media-badge">
            <Sparkles size={11} />
            <span>{media?.badge || '4K Corporate Spec'}</span>
          </span>
        </div>

        {/* Corporate Generated Image Preview */}
        <div className="popup-image-container">
          <img 
            src={primaryImg} 
            alt={product.name} 
            className="popup-product-img"
            loading="eager"
          />
          <div className="popup-img-gradient-overlay" />
          
          <div className="popup-video-pill">
            <PlayCircle size={13} className="text-sky-400" />
            <span>4K Video Demo</span>
          </div>
          
          {product.badge && (
            <div className="popup-demand-pill">
              {product.badge}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="popup-body">
          <h4 className="popup-title">{product.name}</h4>
          <p className="popup-summary">
            {product.workSummary || product.tagline || 'Certified industrial automation and security solution.'}
          </p>

          {/* Quick Specs Snippet */}
          {specEntries.length > 0 && (
            <div className="popup-specs-grid">
              {specEntries.map(([label, val], idx) => (
                <div key={idx} className="popup-spec-pill">
                  <span className="spec-lbl">{label}:</span>
                  <span className="spec-val">{val}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action CTA */}
          <div className="popup-footer">
            <div className="popup-cta-text">
              <span>View 4K video, gallery & specs</span>
              <ArrowRight size={13} className="popup-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
