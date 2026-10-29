import React, { useState, useEffect, useRef } from 'react';
import './AdminSidebar.css';
import {
  LayoutDashboard,
  FileText,
  Users,
  Globe,
  MessageSquare,
  ShieldCheck,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  UserCheck,
  X,
  HelpCircle,
  Star
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
  careerApplications = [],
  testimonials = [],
  isMobileNavOpen = false,
  onCloseMobileNav = () => {},
  onCloseConsole,
  onOpenHelp
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  // Background scroll lock when mobile drawer is open
  useEffect(() => {
    if (isMobileNavOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileNavOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    if (!isMobileNavOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseMobileNav();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileNavOpen, onCloseMobileNav]);

  // Focus trap inside drawer and return focus on close
  useEffect(() => {
    if (isMobileNavOpen && sidebarRef.current) {
      const focusable = sidebarRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }

      const handleFocusTrap = (e) => {
        if (e.key !== 'Tab') return;
        const nodes = Array.from(
          sidebarRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      const drawerEl = sidebarRef.current;
      drawerEl.addEventListener('keydown', handleFocusTrap);
      return () => {
        drawerEl.removeEventListener('keydown', handleFocusTrap);
        const trigger = document.querySelector('.adm-topbar-hamburger-btn');
        if (trigger) {
          trigger.focus();
        }
      };
    }
  }, [isMobileNavOpen]);

  const handleNavSelect = (id) => {
    setActiveTab(id);
    if (onCloseMobileNav) {
      onCloseMobileNav();
    }
  };

  const totalClientsAndPartners = clients.length + partners.length;
  const newInquiriesCount = unansweredInquiries.length > 0
    ? unansweredInquiries.length
    : inquiries.filter(i => (i.status || '').toLowerCase() === 'new').length;
  const newCareerCount = careerApplications.filter(a => (a.status || '').toLowerCase() === 'new').length;
  const testimonialsCount = Array.isArray(testimonials) ? testimonials.length : 0;

  const avatarInitials = (currentUser || 'AD').slice(0, 2).toUpperCase();

  const navigationSections = [
    {
      section: 'MAIN WORKSPACE',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'inquiries',
          label: 'Sales Enquiries',
          icon: MessageSquare,
          badge: newInquiriesCount > 0
            ? { text: `${newInquiriesCount} New`, isAttention: true }
            : null
        },
        {
          id: 'careers',
          label: 'Talent & Careers',
          icon: UserCheck,
          badge: newCareerCount > 0
            ? { text: `${newCareerCount} New`, isAttention: true }
            : null
        },
        {
          id: 'blogs',
          label: 'Articles',
          icon: FileText,
          badge: blogs.length > 0 ? { text: `${blogs.length}` } : null
        },
        {
          id: 'clients_partners',
          label: 'Clients & Partners',
          icon: Users,
          badge: totalClientsAndPartners > 0 ? { text: `${totalClientsAndPartners}` } : null
        },
        {
          id: 'reviews',
          label: 'Reviews',
          icon: Star,
          badge: testimonialsCount > 0 ? { text: `${testimonialsCount}` } : null
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: HelpCircle,
          badge: null
        }
      ]
    }
  ];
  return (
    <>
      {/* Mobile/Tablet Backdrop (<1024px) */}
      <div
        className={`adm-sidebar-backdrop ${isMobileNavOpen ? 'is-open' : ''}`}
        onClick={onCloseMobileNav}
        aria-hidden="true"
      />

      <aside
        id="admin-sidebar-drawer"
        ref={sidebarRef}
        className={`concept2-glass-sidebar adm-sidebar ${isCollapsed ? 'collapsed' : 'expanded'} ${isMobileNavOpen ? 'mobile-open' : ''}`}
        aria-label="Admin Navigation"
        role={isMobileNavOpen ? 'dialog' : undefined}
        aria-modal={isMobileNavOpen ? 'true' : undefined}
      >
      {/* 1. BRAND / HEADER BLOCK */}
      <div className="adm-sidebar-header">
        <div className="adm-brand-block">
          <div className="adm-brand-logo-wrap">
            <img src="/hti-logo.png" alt="HTI Logo" className="adm-brand-logo" />
          </div>

          {!isCollapsed && (
            <div className="adm-brand-text">
              <span className="adm-brand-title">HTI CONTROL</span>

            </div>
          )}
        </div>

        {/* Mobile/Tablet Drawer Close Button (<1024px) */}
        <button
          type="button"
          className="adm-sidebar-close-btn"
          onClick={onCloseMobileNav}
          title="Close drawer"
          aria-label="Close navigation drawer"
        >
          <X size={18} />
        </button>

        {/* Desktop Collapse Button (>=1024px) */}
        <button
          type="button"
          className="adm-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      {/* 2. SCROLLABLE NAVIGATION LIST */}
      <nav className="adm-sidebar-nav" aria-label="Modules Navigation">
        {navigationSections.map((sec, secIdx) => (
          <div key={sec.section} className="adm-section-group">
            {!isCollapsed && secIdx > 0 && (
              <div className="adm-section-label">
                {sec.section}
              </div>
            )}

            <div className="adm-items-list">
              {sec.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                const badgeText = item.badge?.text;
                const isAttention = item.badge?.isAttention;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`adm-nav-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleNavSelect(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.label}
                    title={isCollapsed ? (badgeText ? `${item.label} (${badgeText})` : item.label) : undefined}
                  >
                    <IconComponent size={18} className="adm-nav-icon" aria-hidden="true" />

                    {!isCollapsed && (
                      <span className="adm-nav-label">
                        {item.label}
                      </span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className={`adm-badge ${isAttention ? 'badge-attention' : 'badge-neutral'}`}>
                        {badgeText}
                      </span>
                    )}

                    {isCollapsed && item.badge && (
                      <span
                        className={`adm-collapsed-dot ${isAttention ? 'dot-attention' : 'dot-neutral'}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. PROFILE ROW AT BOTTOM */}
      <div className="adm-sidebar-footer">
        <div className="adm-profile-row">
          <div className="adm-profile-avatar" title={`Admin: ${currentUser}`} aria-hidden="true">
            <span>{avatarInitials}</span>
          </div>

          {!isCollapsed && (
            <div className="adm-profile-info">
              <div className="adm-profile-name" title={currentUser}>
                {currentUser}
              </div>
              <div className="adm-profile-role" title={userRole}>
                {userRole}
              </div>
            </div>
          )}

          <button
            type="button"
            className="adm-logout-btn"
            onClick={handleLogout}
            title="Log out"
            aria-label="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Mobile/Tablet Drawer Actions (<1024px) */}
        <div className="adm-drawer-footer-actions">
          <button
            type="button"
            className="adm-drawer-action-btn"
            onClick={() => {
              if (onOpenHelp) onOpenHelp();
              else alert('HTI Control System BMS - Help & Documentation');
            }}
            aria-label="Help & System Info"
          >
            <HelpCircle size={15} />
            <span>Help & Info</span>
          </button>

          {onCloseConsole && (
            <button
              type="button"
              className="adm-drawer-action-btn adm-drawer-close-console-btn"
              onClick={() => {
                onCloseMobileNav();
                onCloseConsole();
              }}
              aria-label="Close console"
            >
              <X size={15} />
              <span>Close Console</span>
            </button>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
