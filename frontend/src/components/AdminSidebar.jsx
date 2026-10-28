import React, { useState } from 'react';
import './AdminSidebar.css';
import {
  Home,
  LayoutDashboard,
  FileText,
  Users,
  Globe,
  MessageSquare,
  ShieldCheck,
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  currentUser = 'Admin',
  userRole = 'Administrator',
  handleLogout,
  blogs = [],
  clients = [],
  partners = [],
  inquiries = [],
  unansweredInquiries = [],
  adminUsers = [],
  careerApplications = []
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const totalClientsAndPartners = clients.length + partners.length;
  const newInquiriesCount = unansweredInquiries.length > 0
    ? unansweredInquiries.length
    : inquiries.filter(i => (i.status || '').toLowerCase() === 'new').length;
  const newCareerCount = careerApplications.filter(a => (a.status || '').toLowerCase() === 'new').length;

  const avatarInitials = (currentUser || 'AD').slice(0, 2).toUpperCase();

  // Navigation Items matching Concept 2 — Premium Glass (Light Blue)
  const navigationSections = [
    {
      section: 'EXECUTIVE NEXUS',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          subtitle: 'View overall system status',
          icon: Home,
          accent: 'blue',
          badge: null
        },
        {
          id: 'blogs',
          label: 'Blogs & Tech',
          subtitle: 'Articles & technical insights',
          icon: FileText,
          accent: 'pink',
          badge: {
            text: blogs.length || 6,
            variant: 'pale-pink'
          }
        },
        {
          id: 'clients_partners',
          label: 'Clients & Partners',
          subtitle: 'Enterprise partner network',
          icon: Users,
          accent: 'green',
          badge: {
            text: totalClientsAndPartners || 27,
            variant: 'pale-green'
          }
        },
        {
          id: 'content',
          label: 'Website Content',
          subtitle: 'CMS copy & hero settings',
          icon: Globe,
          accent: 'violet',
          badge: {
            text: 'CMS',
            variant: 'pale-purple'
          }
        }
      ]
    },
    {
      section: 'OPERATIONS & CONTROL',
      items: [
        {
          id: 'inquiries',
          label: 'Enquiries & Leads',
          subtitle: 'Commercial lead pipeline',
          icon: MessageSquare,
          accent: 'coral',
          badge: newInquiriesCount > 0
            ? { text: `${newInquiriesCount} New`, variant: 'red-solid' }
            : { text: inquiries.length || 4, variant: 'red-solid' }
        },
        {
          id: 'careers',
          label: 'Careers & Talent',
          subtitle: 'Candidate & MySQL pipeline',
          icon: UserCheck,
          accent: 'blue',
          badge: newCareerCount > 0
            ? { text: `${newCareerCount} New`, variant: 'red-solid' }
            : { text: careerApplications.length || 0, variant: 'pale-blue' }
        },
        {
          id: 'users',
          label: 'Users & Security',
          subtitle: 'Access control & audit log',
          icon: ShieldCheck,
          accent: 'blue',
          badge: {
            text: adminUsers.length || 3,
            variant: 'blue-solid'
          }
        }
      ]
    }
  ];

  return (
    <aside
      className={`concept2-glass-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}
      aria-label="HTI Control Navigation Sidebar"
    >
      {/* 1. TOP BRANDING HEADER */}
      <div className="concept2-header">
        {/* Subtle Decorative Wave Accents in Header */}
        <div className="concept2-header-wave" aria-hidden="true">
          <svg viewBox="0 0 260 85" fill="none" preserveAspectRatio="none">
            <path
              d="M0 40 C80 18 160 65 260 22 L260 0 L0 0 Z"
              fill="url(#c2HeaderGrad1)"
              opacity="0.65"
            />
            <path
              d="M0 60 C90 32 175 75 260 45 L260 0 L0 0 Z"
              fill="url(#c2HeaderGrad2)"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="c2HeaderGrad1" x1="0" y1="0" x2="260" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D9ECFE" stopOpacity="0.8" />
                <stop stopColor="#C4E2FE" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="c2HeaderGrad2" x1="0" y1="0" x2="260" y2="85" gradientUnits="userSpaceOnUse">
                <stop stopColor="#BAE0FE" stopOpacity="0.45" />
                <stop stopColor="#EFF6FF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="concept2-header-content">
          {/* Logo in White Rounded-Square Box */}
          <div className="concept2-logo-box" title="HTI Control Enterprise BMS">
            <img src="/hti-logo.png" alt="HTI Logo" className="concept2-logo-img" />
          </div>

          {/* Branding Text (Expanded Mode) */}
          {!isCollapsed && (
            <div className="concept2-brand-text">
              <h1 className="concept2-brand-title">HTI CONTROL</h1>
              <div className="concept2-bms-status">
                <span className="concept2-live-pulse-dot" />
                <span className="concept2-bms-label">BMS OPERATIONAL</span>
              </div>
            </div>
          )}

          {/* Circular Collapse Toggle Button */}
          <button
            type="button"
            className="concept2-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        </div>
      </div>

      {/* 2. SCROLLABLE NAVIGATION SECTIONS */}
      <nav className="concept2-nav-scroll" aria-label="Modules Navigation">
        {navigationSections.map((sec, secIdx) => (
          <div key={sec.section} className={`concept2-section-group ${secIdx > 0 ? 'section-divider' : ''}`}>
            {!isCollapsed && (
              <div className="concept2-section-title">
                {sec.section}
              </div>
            )}

            <div className="concept2-items-list">
              {sec.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <div
                    key={item.id}
                    className="concept2-item-wrapper"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      type="button"
                      className={`concept2-nav-item ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      title={isCollapsed ? item.label : undefined}
                    >
                      {/* Active Left Indicator Bar */}
                      {isActive && <span className="concept2-active-indicator-bar" />}

                      {/* Pastel-Colored Icon Container */}
                      <span className={`concept2-icon-box accent-${item.accent} ${isActive ? 'active-icon-box' : ''}`}>
                        <IconComponent size={19} strokeWidth={isActive ? 2.4 : 2} />
                      </span>

                      {/* Item Label (Expanded Mode) */}
                      {!isCollapsed && (
                        <span className="concept2-item-label">
                          {item.label}
                        </span>
                      )}

                      {/* Dynamic Badge (Expanded Mode) */}
                      {!isCollapsed && item.badge && (
                        <span className={`concept2-badge badge-${item.badge.variant}`}>
                          {item.badge.text}
                        </span>
                      )}

                      {/* Active Item Right Chevron Arrow (Expanded Mode) */}
                      {!isCollapsed && isActive && (
                        <ChevronRight size={17} className="concept2-active-chevron" />
                      )}

                      {/* Collapsed Active Blue Dot */}
                      {isCollapsed && isActive && (
                        <span className="concept2-collapsed-active-dot" />
                      )}
                    </button>

                    {/* Collapsed Mode Hover Flyout Tooltip Card */}
                    {isCollapsed && hoveredItem === item.id && (
                      <div className="concept2-tooltip-flyout" role="tooltip">
                        <div className="concept2-tooltip-inner">
                          <span className={`concept2-icon-box accent-${item.accent}`}>
                            <IconComponent size={16} />
                          </span>
                          <div className="concept2-tooltip-text">
                            <div className="concept2-tooltip-label">{item.label}</div>
                            <div className="concept2-tooltip-sub">{item.subtitle}</div>
                          </div>
                          {item.badge && (
                            <span className={`concept2-badge badge-${item.badge.variant}`}>
                              {item.badge.text}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. ADMINISTRATOR PROFILE CARD */}
      <div className="concept2-profile-container">
        <div className="concept2-profile-card">
          {/* Subtle inner wave shine */}
          <div className="profile-inner-wave-glow" aria-hidden="true" />

          <div className="concept2-profile-inner">
            {/* Avatar Circle with Online Dot */}
            <div className="concept2-avatar-wrap">
              <div className="concept2-avatar-circle">
                <span>{avatarInitials}</span>
              </div>
              <span className="concept2-online-dot" title="Admin Active & Online" />
            </div>

            {/* User Details (Expanded Mode) */}
            {!isCollapsed && (
              <div className="concept2-user-details">
                <div className="concept2-user-name" title={currentUser}>
                  {currentUser}
                </div>
                <div className="concept2-user-role" title={userRole}>
                  {userRole}
                </div>
              </div>
            )}

            {/* Logout Action Button */}
            <button
              type="button"
              className="concept2-logout-btn"
              onClick={handleLogout}
              title="Log Out Safely"
              aria-label="Log Out Safely"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
