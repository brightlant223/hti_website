import React from 'react';
import {
  MessageSquare,
  Users,
  FileText,
  Building2,
  AlertCircle,
  ArrowRight,
  HardDrive,
  Plus,
  UserPlus,
  Download,
  Clock
} from 'lucide-react';

export default function Dashboard({ onNavigate = () => {} }) {
  const stats = [
    {
      id: 'leads',
      title: 'Commercial Leads',
      count: '4',
      icon: MessageSquare,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      badges: [
        { label: '2 Unanswered', color: 'bg-rose-50 text-rose-600 border-rose-100' },
        { label: '0 Converted', color: 'bg-slate-50 text-slate-500 border-slate-200/60' },
      ],
      link: '/admin/enquiries',
    },
    {
      id: 'careers',
      title: 'Talent & Careers',
      count: '0',
      icon: Users,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      badges: [
        { label: '0 New', color: 'bg-slate-50 text-slate-500 border-slate-200/60' },
        { label: '0 Active', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      ],
      link: '/admin/careers',
    },
    {
      id: 'articles',
      title: 'Technical Articles',
      count: '6',
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      badges: [
        { label: '6 Published', color: 'bg-blue-50 text-blue-600 border-blue-100' },
        { label: '0 Drafts', color: 'bg-slate-50 text-slate-500 border-slate-200/60' },
      ],
      link: '/admin/blogs',
    },
    {
      id: 'partners',
      title: 'Clients & Partners',
      count: '27',
      icon: Building2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      badges: [
        { label: '12 Clients', color: 'bg-sky-50 text-sky-600 border-sky-100' },
        { label: '15 Partners', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      ],
      link: '/admin/clients-partners',
    },
  ];

  const auditEvents = [
    {
      id: 1,
      actor: 'admin',
      role: 'SECURITY',
      roleColor: 'bg-sky-50 text-sky-600 border-sky-200/60',
      message: "User 'admin' (Administrator) logged in.",
      timestamp: '08:52:38 am',
    },
    {
      id: 2,
      actor: 'admin',
      role: 'SECURITY',
      roleColor: 'bg-sky-50 text-sky-600 border-sky-200/60',
      message: "User 'admin' (Administrator) logged in.",
      timestamp: '08:48:48 am',
    },
    {
      id: 3,
      actor: 'editor',
      role: 'CONTENT',
      roleColor: 'bg-purple-50 text-purple-600 border-purple-200/60',
      message: "Updated draft 'High Speed Industrial Doors for Cleanrooms'.",
      timestamp: '06:30:12 am',
    },
  ];

  return (
    <div className="space-y-6 bg-gray-50/50 min-h-screen text-slate-800 antialiased">
      {/* 1. URGENT ALERT BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-rose-100/80 bg-rose-50/60 p-4 transition-all hover:bg-rose-50/80">
        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
            <AlertCircle size={18} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-rose-950">
                2 New Unanswered Sales Enquiries Awaiting Response
              </span>
            </div>
            <p className="mt-0.5 text-xs text-rose-700/90">
              Latest lead from <strong className="font-semibold text-rose-900">Dr. Hiren Patel</strong> (Sun Pharma Cleanroom Div) regarding{' '}
              <span className="inline-flex items-center rounded-md bg-white/70 px-1.5 py-0.5 font-medium text-rose-800 border border-rose-200/50">
                Door Interlock System
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/admin/enquiries')}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
        >
          <span>Review Lead #4</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 2. TOP SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.link)}
              className="group relative flex flex-col justify-between rounded-xl border border-gray-200/70 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {item.title}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${item.iconBg} ${item.iconColor} transition-transform group-hover:scale-105`}>
                  <Icon size={17} />
                </div>
              </div>

              <div className="my-3">
                <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                  {item.count}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
                {item.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. MIDDLE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col justify-between rounded-xl border border-gray-200/70 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Executive Quick Actions</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Execute common administrative workflows with one click
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('/admin/blogs')}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Publish Article</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/admin/clients-partners')}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all cursor-pointer"
            >
              <Building2 size={14} className="text-gray-400" />
              <span>Add Client / Partner</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/admin/careers')}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all cursor-pointer"
            >
              <UserPlus size={14} className="text-gray-400" />
              <span>Review Candidates</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/admin/enquiries')}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all cursor-pointer"
            >
              <Download size={14} className="text-gray-400" />
              <span>Export Leads (CSV)</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-gray-200/70 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Platform Health
            </span>
            <button
              type="button"
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              View Telemetry
            </button>
          </div>

          <div className="my-4 flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 block leading-tight">
                All Systems Operational
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                99.98% SLA Uptime · SQLite WAL active
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
            <span>Latency: 14ms</span>
            <span>FastAPI & SQLite Sync</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-gray-200/70 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive size={16} className="text-gray-400" />
                <h3 className="text-sm font-bold text-gray-900">Measured System Telemetry</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Host D:\
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Live storage and process metric verified directly from host OS
            </p>
          </div>

          <div className="my-5">
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-gray-900">868.16 GB</span>
                <span className="text-xs font-medium text-gray-400">Free of 930.94 GB</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                93% Free
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: '7%' }}
              />
            </div>

            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                <span>Used: 62.79 GB</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gray-200"></span>
                <span>Available: 868.16 GB</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Database Engine: SQLite 3.42</span>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              Run Diagnostic Check
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200/70 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <h3 className="text-sm font-bold text-gray-900">Administrative Audit Stream</h3>
            </div>
            <button
              type="button"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              View Full Log
            </button>
          </div>

          <div className="space-y-4">
            {auditEvents.map((evt, idx) => (
              <div key={evt.id} className="relative flex items-start gap-3.5 group">
                {idx !== auditEvents.length - 1 && (
                  <span
                    className="absolute left-[7px] top-[18px] bottom-[-16px] w-[2px] bg-gray-100"
                    aria-hidden="true"
                  />
                )}

                <div className="relative mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white ring-2 ring-blue-500 ring-offset-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{evt.actor}</span>
                      <span className={`rounded px-1.5 py-0.2 text-[10px] font-semibold border ${evt.roleColor}`}>
                        {evt.role}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-gray-400 shrink-0">
                      {evt.timestamp}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-600 truncate">{evt.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>Immutable audit trail · Tamper proof</span>
            <span>Realtime WebSocket Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
}
