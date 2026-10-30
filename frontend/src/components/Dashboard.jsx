import React from 'react';
import {
  MessageSquare,
  Users,
  FileText,
  Building2,
  AlertCircle,
  ArrowRight,
  Plus,
  UserPlus,
  Download,
  Clock,
  Star,
  CheckCircle,
  Briefcase,
  Zap,
  Mail,
  ChevronRight
} from 'lucide-react';

export default function Dashboard({ onNavigate = () => {} }) {
  const stats = [
    {
      id: 'leads',
      title: 'Contact & Leads',
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
      title: 'Career Enquiries',
      count: '3',
      icon: Users,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      badges: [
        { label: '2 New', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        { label: '1 Active', color: 'bg-purple-50 text-purple-600 border-purple-100' },
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
    {
      id: 'reviews',
      title: 'Customer Reviews',
      count: '14',
      icon: Star,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      badges: [
        { label: '5.0 ★ Rating', color: 'bg-amber-50 text-amber-700 border-amber-200' },
        { label: 'Verified', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      ],
      link: '/admin/reviews',
    },
  ];

  const recentInquiries = [
    {
      id: 4,
      name: 'Dr. Hiren Patel',
      company: 'Sun Pharma Cleanroom Div',
      product: 'Door Interlock System',
      message: 'Need 12-door flameproof interlocking system quote with programmable differential pressure delay for sterile manufacturing unit.',
      time: '12 mins ago',
      status: 'New',
    },
    {
      id: 3,
      name: 'Rajesh Sharma',
      company: 'Glenmark Pharmaceuticals',
      product: 'Rapid Cleanroom Air Shower',
      message: 'Looking for automatic motorized high-speed roll up doors with interlocking optical interlock sensor integration.',
      time: '2 hours ago',
      status: 'New',
    },
    {
      id: 2,
      name: 'Ananya Deshmukh',
      company: 'Cipla Global R&D',
      product: 'Dynamic Pass Box Unit',
      message: 'Require HEPA filtration pass box validation report and FAT inspection timeline for our Kurkumbh facility.',
      time: 'Yesterday',
      status: 'Contacted',
    },
  ];

  const recentCareers = [
    {
      id: 1,
      name: 'Vikramaditya Sengupta',
      role: 'Senior Automation Engineer',
      exp: '5+ Years • PLC & SCADA',
      contact: '+91 98201 44321 • vikram.s@engineer.com',
      time: '35 mins ago',
      status: 'New Applicant',
    },
    {
      id: 2,
      name: 'Pooja Iyer',
      role: 'Cleanroom HVAC Systems Specialist',
      exp: '4 Years • Cleanroom BMS',
      contact: '+91 97112 55432 • pooja.iyer@automation.in',
      time: '3 hours ago',
      status: 'Under Review',
    },
  ];

  const recentReviews = [
    {
      author: 'Vice President - Engineering',
      company: 'Leading Pharmaceutical Multinational',
      location: 'Navi Mumbai',
      rating: 5,
      quote: 'HTI delivered our 12-door cleanroom interlocking system on an aggressive schedule. The programmable pressure delays and flameproof controllers passed our USFDA audit with zero observations.',
    },
    {
      author: 'Plant Operations Head',
      company: 'Chemical Manufacturing Plant',
      location: 'Gujarat',
      rating: 5,
      quote: 'The industrial air curtains and high-speed PVC curtains drastically cut thermal losses across our packaging docks. Outstanding craftsmanship and reliable support.',
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
      role: 'ENQUIRIES',
      roleColor: 'bg-amber-50 text-amber-600 border-amber-200/60',
      message: "Updated inquiry #4 status to 'Contacted'.",
      timestamp: '08:48:48 am',
    },
    {
      id: 3,
      actor: 'editor',
      role: 'CONTENT',
      roleColor: 'bg-purple-50 text-purple-600 border-purple-200/60',
      message: "Published new client testimonial 'Cipla Cleanroom Automation'.",
      timestamp: '06:30:12 am',
    },
  ];

  return (
    <div className="space-y-6 bg-gray-50/50 min-h-screen text-slate-800 antialiased p-6">
      {/* 1. URGENT ALERT BANNER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-rose-100/80 bg-rose-50/60 p-4 transition-all hover:bg-rose-50/80 shadow-sm">
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
          className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-95 cursor-pointer shrink-0"
        >
          <span>Review Lead #4</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 2. TOP SUMMARY 5 CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              onClick={() => onNavigate(stat.link)}
              className="group relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(6,81,237,0.1)] hover:border-gray-200 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {stat.title}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor} transition-transform group-hover:scale-110`}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {stat.count}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-gray-50">
                {stat.badges.map((b, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${b.color}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. EXECUTIVE QUICK ACTIONS */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-blue-600" />
          <h3 className="text-sm font-bold text-gray-900">Executive Quick Actions</h3>
          <span className="text-xs text-gray-400">• 1-Click Operations</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('/admin/enquiries')}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
          >
            <MessageSquare size={13} />
            <span>Review Leads</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/admin/careers')}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Users size={13} />
            <span>Candidates</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/admin/blogs')}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <FileText size={13} />
            <span>Publish Article</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/admin/clients-partners')}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Building2 size={13} />
            <span>Add Client</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/admin/reviews')}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Star size={13} className="text-amber-500" />
            <span>Add Review</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/admin/enquiries')}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Download size={13} />
            <span>Export (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4. SPLIT ROW 1: LIVE INQUIRIES & CAREERS APPLICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Live Enquiries Feed */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <MessageSquare size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Live Contact &amp; Sales Enquiries</h3>
                  <p className="text-[11px] text-gray-400">Incoming messages submitted from website form</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/admin/enquiries')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {recentInquiries.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">
                      {lead.name} <span className="font-normal text-gray-400">• {lead.company}</span>
                    </span>
                    <span className="text-[11px] text-gray-400">{lead.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 italic">
                    "{lead.message}"
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                      {lead.product}
                    </span>
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold ${
                      lead.status === 'New' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Careers Applications Feed */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Users size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Recent Careers &amp; Talent Applications</h3>
                  <p className="text-[11px] text-gray-400">Candidates applying through the Careers portal</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/admin/careers')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {recentCareers.map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">
                      {app.name}
                    </span>
                    <span className="text-[11px] text-gray-400">{app.time}</span>
                  </div>
                  <p className="text-xs text-purple-900 font-medium">
                    Applied: {app.role}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {app.exp} • {app.contact}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {app.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('/admin/careers')}
                      className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Review CV →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. SPLIT ROW 2: CUSTOMER REVIEWS & AUDIT STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Customer Reviews Showcase */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                <Star size={15} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Featured Customer Reviews</h3>
                <p className="text-[11px] text-gray-400">Verified client testimonials shown on website</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/admin/reviews')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Manage Reviews
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {recentReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-amber-100/60 bg-amber-50/20 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">
                    {rev.author}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 italic">
                  "{rev.quote}"
                </p>
                <span className="text-[10px] text-gray-400">
                  {rev.company} • {rev.location}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Administrative Audit Stream */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Clock size={15} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Administrative Audit Stream</h3>
                <p className="text-[11px] text-gray-400">Security &amp; activity timeline</p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Live Sync
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            {auditEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 text-xs">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-600 ring-4 ring-blue-50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900">{event.actor}</span>
                      <span className={`rounded px-1.5 py-0.2 text-[10px] font-semibold border ${event.roleColor}`}>
                        {event.role}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0">{event.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-gray-600 truncate">{event.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
