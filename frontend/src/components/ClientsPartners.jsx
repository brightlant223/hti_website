import React, { useState, useMemo } from 'react';
import {
  Building2,
  HeartHandshake,
  Database,
  Search,
  Plus,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Globe
} from 'lucide-react';

const INITIAL_RECORDS = [
  {
    id: 1,
    name: 'Ferrero',
    type: 'Client',
    category: 'Global Food & Confectionery',
    authorization_status: 'Authorized',
    is_active: true,
    website_url: 'https://www.ferrero.com',
    initials: 'F',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 2,
    name: 'Alembic Pharmaceuticals',
    type: 'Client',
    category: 'Pharmaceuticals & Cleanrooms',
    authorization_status: 'Authorized',
    is_active: true,
    website_url: 'https://www.alembicpharmaceuticals.com',
    initials: 'A',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    name: 'IIT Bombay',
    type: 'Client',
    category: 'Premier Educational & Research Institution',
    authorization_status: 'Authorized',
    is_active: true,
    website_url: 'https://www.iitb.ac.in',
    initials: 'I',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 4,
    name: 'FSC Logistics',
    type: 'Client',
    category: 'Supply Chain & High-Speed Warehousing',
    authorization_status: 'Authorized',
    is_active: true,
    website_url: 'https://www.fsc.co.in',
    initials: 'F',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 5,
    name: 'Alkem Laboratories',
    type: 'Client',
    category: 'Global Life Sciences & Formulation Units',
    authorization_status: 'Authorized',
    is_active: true,
    website_url: 'https://www.alkemlabs.com',
    initials: 'A',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 6,
    name: 'Honeywell Commercial',
    type: 'Partner',
    category: 'Fire Automation & BMS Field Devices',
    authorization_status: 'Certified OEM',
    is_active: true,
    website_url: 'https://www.honeywell.com',
    initials: 'H',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 7,
    name: 'Siemens Building Tech',
    type: 'Partner',
    category: 'Critical Industrial Sensors & PLCs',
    authorization_status: 'Certified OEM',
    is_active: true,
    website_url: 'https://www.siemens.com',
    initials: 'S',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 8,
    name: 'Dormakaba Systems',
    type: 'Partner',
    category: 'High-Frequency Automatic Revolving & Sliding Gates',
    authorization_status: 'Certified OEM',
    is_active: true,
    website_url: 'https://www.dormakaba.com',
    initials: 'D',
    color: 'from-teal-500 to-emerald-600',
  },
];

export default function ClientsPartners() {
  const [activeTab, setActiveTab] = useState('Client');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState('All');
  const [records, setRecords] = useState(INITIAL_RECORDS);

  const stats = useMemo(() => {
    const clientsCount = records.filter((r) => r.type === 'Client').length;
    const partnersCount = records.filter((r) => r.type === 'Partner').length;
    return {
      clients: clientsCount,
      partners: partnersCount,
      total: records.length,
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      if (item.type !== activeTab) return false;
      if (filterState === 'Active' && !item.is_active) return false;
      if (filterState === 'Inactive' && item.is_active) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    });
  }, [records, activeTab, filterState, searchQuery]);

  const toggleStatus = (id) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_active: !r.is_active } : r))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this enterprise record from roster?')) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6 text-slate-100 antialiased">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            Enterprise Directory & Partnerships
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
            Clients & Partners
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage approved enterprise clients, OEM technology ecosystems, and public trust logos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 border border-slate-800 px-3 py-1.5 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Synced Just now</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <RefreshCw size={13} className="text-slate-400" />
            <span>Sync Roster</span>
          </button>
        </div>
      </div>

      {/* 2. TOP SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 p-5 border border-slate-800/80 shadow-lg shadow-black/20 backdrop-blur-xl">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Enterprise Clients
              </span>
              <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                {stats.clients}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {stats.clients} authorized for public portfolio
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shadow-inner">
              <Building2 size={22} />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 p-5 border border-slate-800/80 shadow-lg shadow-black/20 backdrop-blur-xl">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Technology Partners
              </span>
              <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                {stats.partners}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {stats.partners} active in hardware integrations
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
              <HeartHandshake size={22} />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 p-5 border border-slate-800/80 shadow-lg shadow-black/20 backdrop-blur-xl">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Total Directory Records
              </span>
              <div className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                {stats.total}
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Verified compliance & NDA approved
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-inner">
              <Database size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEGMENTED TAB CONTROL & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="inline-flex rounded-xl bg-slate-900/80 p-1 border border-slate-800 shadow-inner backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('Client')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'Client'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 size={15} className={activeTab === 'Client' ? 'text-sky-400' : 'text-slate-500'} />
            <span>Enterprise Clients</span>
            <span className="ml-1 rounded-full bg-slate-700/80 px-2 py-0.5 text-[10px] text-slate-300 font-semibold">
              {stats.clients}
            </span>
          </button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Approved {activeTab}</span>
        </button>
      </div>

      {/* 4. SEARCH & FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
            <Search size={15} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab.toLowerCase()}s by name or industry sector...`}
            className="w-full rounded-xl bg-slate-900/60 border border-slate-800/80 py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Active', 'Inactive'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterState(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                filterState === status
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 5. DATA TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800/90 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/70">
                <th className="py-3.5 pl-6 pr-3 w-12 text-slate-500">#</th>
                <th className="py-3.5 px-4">{activeTab} / Organization</th>
                <th className="py-3.5 px-4">Sector / Industry</th>
                <th className="py-3.5 px-4 text-center">Authorization</th>
                <th className="py-3.5 px-4 text-center">Web Status</th>
                <th className="py-3.5 px-4 text-center">Public Link</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/50">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No matching records found for "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-4 pl-6 pr-3 text-slate-500 font-mono text-[11px]">
                      {idx + 1}
                    </td>

                    <td className="py-4 px-4 font-semibold text-slate-200">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr ${item.color} text-white font-bold text-xs shadow-sm`}
                        >
                          {item.initials}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                            {item.name}
                          </span>
                          <span className="block text-[11px] font-normal text-slate-500">
                            ID: #HTI-0{item.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center rounded-md bg-slate-800/60 px-2.5 py-1 text-[11px] text-slate-300 border border-slate-700/50 font-medium">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>{item.authorization_status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleStatus(item.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                          item.is_active
                            ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        }`}
                        title="Click to toggle website visibility"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.is_active ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'
                          }`}
                        />
                        <span>{item.is_active ? 'Visible on Web' : 'Hidden'}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4 text-center">
                      {item.website_url ? (
                        <a
                          href={item.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-sky-400 transition-colors"
                        >
                          <Globe size={13} />
                          <span>Link</span>
                          <ExternalLink size={10} className="opacity-70" />
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>

                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
                          aria-label="Edit record"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer"
                          aria-label="Delete record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800/80 px-6 py-3.5 text-[11px] text-slate-500 bg-slate-900/50">
          <span>
            Showing <strong className="font-semibold text-slate-300">{filteredRecords.length}</strong> of{' '}
            <strong className="font-semibold text-slate-300">{records.filter((r) => r.type === activeTab).length}</strong> {activeTab.toLowerCase()} records
          </span>
          <span>NDA compliance verified</span>
        </div>
      </div>
    </div>
  );
}

