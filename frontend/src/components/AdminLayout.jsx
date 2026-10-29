import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Building2,
  Star,
  Briefcase,
  Mail,
  Sliders,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Bell
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/blogs', label: 'Blogs & Articles', icon: FileText },
  { path: '/admin/clients-partners', label: 'Clients & Partners', icon: Building2 },
  { path: '/admin/reviews', label: 'Reviews & Feedback', icon: Star },
  { path: '/admin/careers', label: 'Careers & Talent', icon: Briefcase },
  { path: '/admin/enquiries', label: 'Enquiries & Leads', icon: Mail, badge: 'New' },
  { path: '/admin/cms', label: 'Home Page CMS', icon: Sliders },
];

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const currentNav = NAV_ITEMS.find((item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );
  const pageTitle = currentNav ? currentNav.label : 'Admin Console';

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 antialiased overflow-hidden font-sans">
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 1. LEFT SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white shadow-sm transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 shadow-md shadow-sky-500/20 text-white font-extrabold text-lg tracking-wider">
              HTI
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight tracking-tight text-slate-900">
                HTI Control
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Enterprise BMS
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Operations & Control
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? 'text-sky-600'
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-200/60">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight size={14} className="text-sky-500 opacity-80" />
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-2.5 border border-slate-200/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-white font-bold text-xs shadow-xs">
              AD
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="truncate text-xs font-bold text-slate-900">
                admin@htisystems.in
              </span>
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                Root Administrator
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. RIGHT MAIN VIEW */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden cursor-pointer"
              aria-label="Open Sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>System: Online</span>
            </div>

            <button
              type="button"
              className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-xs">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xs font-bold text-sky-700">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50/60 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

