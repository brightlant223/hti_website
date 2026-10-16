import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function ProductsCatalog({
  products = [],
  loading = false,
  selectedCategory = 'All Products',
  onCategoryChange,
  onSelectProduct,
  onQuickQuote
}) {
  const [activeTab, setActiveTab] = useState('All Products');

  const filterTabs = [
    'All Products',
    'Automation',
    'Security Systems',
    'Hygiene Solutions',
    'Fire & Life Safety',
    'Cleanroom Solutions'
  ];

  // Curated showcase products matching the 5 cards in the reference image
  const referenceProducts = [
    {
      id: 'prod-1',
      slug: 'automatic-sliding-swing-doors',
      name: 'Automatic Sliding Door',
      category: 'Automation',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      bullets: [
        'Sensor Operated Operation',
        'Safe & Reliable',
        'Suitable for Commercial & Industrial Use'
      ]
    },
    {
      id: 'prod-2',
      slug: 'cctv-surveillance-analogue-ip',
      name: 'CCTV Surveillance System',
      category: 'Security Systems',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80',
      bullets: [
        'Analogue, HD & IP Solution',
        'Indoor & Outdoor Cameras',
        'Remote Monitoring'
      ]
    },
    {
      id: 'prod-3',
      slug: 'biometric-access-control-time-attendance',
      name: 'Access Control System',
      category: 'Security Systems',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
      bullets: [
        'Biometric, RFID, Card Based',
        'Time Attendance Integration',
        'Secure Entry Management'
      ]
    },
    {
      id: 'prod-4',
      slug: 'fire-alarm-system-conventional-addressable',
      name: 'Fire Alarm System',
      category: 'Fire & Life Safety',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
      bullets: [
        'Conventional & Addressable',
        'Detectors & Panels',
        'Complete FAS Solution'
      ]
    },
    {
      id: 'prod-5',
      slug: 'high-speed-hand-dryers-top-protected',
      name: 'Hand Dryer',
      category: 'Hygiene Solutions',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      bullets: [
        'Touchless & Hygienic',
        'Ideal for Clean Rooms',
        'Energy Efficient'
      ]
    }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onCategoryChange) {
      if (tab === 'All Products') onCategoryChange('All');
      else if (tab === 'Security Systems') onCategoryChange('Security System');
      else if (tab === 'Hygiene Solutions') onCategoryChange('Hygiene');
      else onCategoryChange(tab);
    }
  };

  const displayedProducts = activeTab === 'All Products'
    ? referenceProducts
    : referenceProducts.filter(p => {
        if (activeTab === 'Automation') return p.category === 'Automation';
        if (activeTab === 'Security Systems') return p.category === 'Security Systems';
        if (activeTab === 'Hygiene Solutions') return p.category === 'Hygiene Solutions';
        if (activeTab === 'Fire & Life Safety') return p.category === 'Fire & Life Safety';
        if (activeTab === 'Cleanroom Solutions') return p.category === 'Automation' || p.category === 'Hygiene Solutions';
        return true;
      });

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        {/* Top Header Row with Title and Right Action Button */}
        <div className="catalog-header-row">
          <div className="catalog-header-left">
            <div className="pill-badge-blue">COMPLETE RANGE</div>
            <h2 className="section-title-large">
              Commercial & Industrial <span className="title-highlight-blue">Product Catalog</span>
            </h2>
            <p className="catalog-subtitle">
              Explore our comprehensive range of automation, security and hygiene solutions.
            </p>
          </div>

          <div className="catalog-header-right">
            <button 
              className="btn-view-all-products"
              onClick={() => onCategoryChange && onCategoryChange('All')}
            >
              <span>View All Products</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="catalog-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              className={`filter-pill-btn ${activeTab === tab ? 'pill-active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 5-Column Product Cards Grid */}
        <div className="catalog-products-grid">
          {displayedProducts.map((prod) => (
            <div key={prod.id} className="catalog-product-card">
              {/* Product Image */}
              <div className="product-thumb-wrap">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="product-thumb-img"
                  loading="lazy"
                />
              </div>

              {/* Product Info */}
              <div className="product-card-body">
                <h4 className="product-card-name">{prod.name}</h4>

                <ul className="product-card-bullets">
                  {prod.bullets.map((bullet, idx) => (
                    <li key={idx} className="product-bullet-item">
                      <div className="bullet-check-circle">
                        <Check size={11} />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn-product-details"
                  onClick={() => {
                    const match = products.find(p => p.slug === prod.slug || p.name.toLowerCase().includes(prod.name.toLowerCase()));
                    if (onSelectProduct && match) {
                      onSelectProduct(match);
                    } else if (onQuickQuote) {
                      onQuickQuote(prod.name, prod.category);
                    }
                  }}
                >
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
