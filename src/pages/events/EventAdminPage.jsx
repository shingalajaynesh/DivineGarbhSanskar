import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Lock, CheckCircle2, XCircle, Search, RefreshCw, Download, 
  ExternalLink, Eye, Trash2, Camera, Settings, Users, 
  IndianRupee, ShieldAlert, LogOut, Check, X, AlertTriangle
} from 'lucide-react';

import { API_BASE } from '../../utils/apiConfig';

export default function EventAdminPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('divineAdminPassword') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // 'admin' | 'superadmin'
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Registrations & Stats
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    checkedIn: 0,
    totalRevenue: 0
  });
  const [loadingList, setLoadingList] = useState(false);

  // Filters & Search
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Inspection Modal (Side-by-side view)
  const [inspectItem, setInspectItem] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Settings Modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [upiIdInput, setUpiIdInput] = useState('');
  const [payeeNameInput, setPayeeNameInput] = useState('');
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState('');

  // Super Admin Reset Modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');

  // Verify auth on mount if password in session
  useEffect(() => {
    if (password) {
      handleLogin(password);
    }
  }, []);

  const handleLogin = async (passVal) => {
    const p = passVal || password;
    if (!p) return;

    setLoggingIn(true);
    setAuthError('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: p })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setRole(data.role);
        sessionStorage.setItem('divineAdminPassword', p);
        fetchRegistrations(p, activeFilter, searchQuery);
      } else {
        setAuthError(data.error || 'ખોટો પાસવર્ડ! કૃપા કરીને સાચો પાસવર્ડ નાખો.');
        sessionStorage.removeItem('divineAdminPassword');
      }
    } catch (err) {
      setAuthError('સર્વર સાથે જોડાણ થઈ શક્યું નથી.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('divineAdminPassword');
    setPassword('');
    setIsAuthenticated(false);
    setRole(null);
    setRegistrations([]);
  };

  // Fetch registrations
  const fetchRegistrations = async (passVal = password, statusVal = activeFilter, searchVal = searchQuery) => {
    const activePass = passVal || password;
    if (!activePass) return;

    setLoadingList(true);
    try {
      const params = new URLSearchParams();
      if (statusVal && statusVal !== 'all') params.append('status', statusVal);
      if (searchVal) params.append('search', searchVal);

      const res = await fetch(`${API_BASE}/admin/registrations?${params.toString()}`, {
        headers: {
          'Authorization': activePass
        }
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setRegistrations(json.registrations || []);
        if (json.stats) setStats(json.stats);
      }
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setLoadingList(false);
    }
  };

  // 1-Click Approve
  const handleApprove = async (inquiryId) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inquiryId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': password }
      });
      if (res.ok) {
        fetchRegistrations();
        if (inspectItem?.inquiryId === inquiryId) {
          setInspectItem((prev) => ({ ...prev, status: 'approved' }));
        }
      }
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // 1-Click Reject
  const handleReject = async (inquiryId) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inquiryId}/reject`, {
        method: 'POST',
        headers: { 
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: rejectReason || 'પેમેન્ટ વેરિફિકેશન અમાન્ય.' })
      });
      if (res.ok) {
        fetchRegistrations();
        if (inspectItem?.inquiryId === inquiryId) {
          setInspectItem((prev) => ({ ...prev, status: 'rejected', rejectionReason: rejectReason }));
        }
        setShowRejectInput(false);
        setRejectReason('');
      }
    } catch (err) {
      console.error('Rejection failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete registration
  const handleDelete = async (inquiryId) => {
    if (!window.confirm(`શું તમે ખરેખર ઇન્ક્વાયરી ${inquiryId} કાયમ માટે ડિલીટ કરવા માંગો છો?`)) return;
    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inquiryId}`, {
        method: 'DELETE',
        headers: { 'Authorization': password }
      });
      if (res.ok) {
        fetchRegistrations();
        if (inspectItem?.inquiryId === inquiryId) setInspectItem(null);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Download CSV
  const handleExportCSV = () => {
    window.open(`${API_BASE}/admin/export/csv?auth=${encodeURIComponent(password)}`, '_blank');
  };

  // Settings Save
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsMessage('');
    try {
      const res = await fetch(`${API_BASE}/admin/settings`, {
        method: 'POST',
        headers: {
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          upiId: upiIdInput,
          payeeName: payeeNameInput
        })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSettingsMessage('સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવ્યા!');
        setTimeout(() => setShowSettingsModal(false), 1500);
      }
    } catch (err) {
      setSettingsMessage('સેટિંગ્સ સેવ કરવામાં ભૂલ આવી.');
    } finally {
      setSettingsLoading(false);
    }
  };

  // Super Admin Reset Database to Zero
  const handleSuperReset = async () => {
    if (resetConfirmText !== 'RESET-ZERO') {
      alert('કૃપા કરીને કન્ફર્મ કરવા માટે RESET-ZERO લખો.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/reset-data`, {
        method: 'POST',
        headers: { 'Authorization': password }
      });
      if (res.ok) {
        alert('ડેટાબેઝ સફળતાપૂર્વક ઝીરો (0) પર રીસેટ થઈ ગયો!');
        setShowResetModal(false);
        setResetConfirmText('');
        fetchRegistrations();
      }
    } catch (err) {
      alert('રીસેટ કરવામાં ભૂલ આવી.');
    }
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0106] text-slate-100 flex items-center justify-center p-4">
        <Helmet>
          <title>Admin Login - Divya Garbh Yatra</title>
        </Helmet>
        <div className="bg-[#18040E] border-2 border-amber-500/40 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-amber-400">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-black text-white">Event Admin Portal</h1>
            <p className="text-xs text-rose-300 mt-1">
              દિવ્ય ગર્ભયાત્રા • વેરિફિકેશન & એડમિન ડેશબોર્ડ
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">
                એડમિન પાસવર્ડ (Admin Password)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="એડમિન પાસવર્ડ દાખલ કરો..."
                className="w-full bg-[#0C0106] border border-rose-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500 text-white font-extrabold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {loggingIn ? 'ચકાસણી ચાલુ છે...' : 'લૉગિન કરો (Login)'}
            </button>
          </form>

          <div className="text-center">
            <Link to="/divy-garbhyatra" className="text-xs text-slate-400 hover:text-white">
              ← ઇવેન્ટ પેજ પર પાછા જાઓ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0C0106] text-slate-100 font-sans p-4 md:p-8">
      <Helmet>
        <title>Event Admin Dashboard - Divya Garbh Yatra</title>
      </Helmet>

      {/* Top Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-950 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase">
              {role === 'superadmin' ? 'Super Admin' : 'Admin'} Mode
            </span>
            <span className="text-xs text-slate-400">દિવ્ય ગર્ભયાત્રા (19 Dec 2026)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
            Couple Event Management
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/event-admin/scanner"
            className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Camera className="w-4 h-4" />
            <span>ગેટ સ્કેનર (Gate Scanner)</span>
          </Link>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>CSV એક્સપોર્ટ</span>
          </button>

          <button
            onClick={() => setShowSettingsModal(true)}
            className="px-3 py-2 rounded-xl bg-[#1C0510] border border-rose-900 text-amber-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>UPI સેટિંગ્સ</span>
          </button>

          {role === 'superadmin' && (
            <button
              onClick={() => setShowResetModal(true)}
              className="px-3 py-2 rounded-xl bg-red-950/80 border border-red-500 text-red-300 hover:bg-red-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>રીસેટ 0</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl bg-black border border-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>લૉગઆઉટ</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-[#18040E] border border-rose-950 rounded-2xl p-4">
            <span className="text-[11px] text-slate-400 block font-medium">કુલ રજીસ્ટ્રેશન</span>
            <span className="text-2xl font-black text-white">{stats.total}</span>
            <span className="text-[10px] text-slate-500 block">ક્ષમતા: 250 કપલ</span>
          </div>

          <div className="bg-[#18040E] border border-amber-500/40 rounded-2xl p-4 shadow-lg shadow-amber-950/20">
            <span className="text-[11px] text-amber-300 block font-bold">પેન્ડિંગ વેરિફિકેશન</span>
            <span className="text-2xl font-black text-amber-400">{stats.pending}</span>
            <span className="text-[10px] text-amber-500/80 block">ચકાસણી બાકી</span>
          </div>

          <div className="bg-[#18040E] border border-emerald-500/40 rounded-2xl p-4">
            <span className="text-[11px] text-emerald-300 block font-bold">એપ્રુવ્ડ કપલ</span>
            <span className="text-2xl font-black text-emerald-400">{stats.approved}</span>
            <span className="text-[10px] text-emerald-500/80 block">પાસ જનરેટેડ</span>
          </div>

          <div className="bg-[#18040E] border border-rose-950 rounded-2xl p-4">
            <span className="text-[11px] text-rose-300 block font-medium">રિજેક્ટેડ</span>
            <span className="text-2xl font-black text-rose-400">{stats.rejected}</span>
            <span className="text-[10px] text-rose-500/80 block">અમાન્ય પેમેન્ટ</span>
          </div>

          <div className="bg-[#18040E] border border-purple-500/40 rounded-2xl p-4">
            <span className="text-[11px] text-purple-300 block font-bold">ગેટ એન્ટ્રી હાજરી</span>
            <span className="text-2xl font-black text-purple-400">{stats.checkedIn}</span>
            <span className="text-[10px] text-purple-400/80 block">સ્કેન થઈ ગયા</span>
          </div>

          <div className="bg-[#18040E] border border-amber-500/40 rounded-2xl p-4">
            <span className="text-[11px] text-amber-300 block font-bold">કુલ આવક</span>
            <span className="text-2xl font-black text-amber-300">₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-slate-400 block">એપ્રુવ્ડ પેમેન્ટ્સ</span>
          </div>
        </div>

        {/* CONTROLS & FILTER ROW */}
        <div className="bg-[#18040E] border border-rose-950 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: `બધા (${stats.total})` },
              { id: 'pending', label: `પેન્ડિંગ (${stats.pending})` },
              { id: 'approved', label: `એપ્રુવ્ડ (${stats.approved})` },
              { id: 'rejected', label: `રિજેક્ટેડ (${stats.rejected})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  fetchRegistrations(password, tab.id, searchQuery);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-[#0C0106] text-slate-400 hover:text-white border border-rose-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  fetchRegistrations(password, activeFilter, e.target.value);
                }}
                placeholder="નામ, મોબાઇલ, ID, UTR..."
                className="w-full bg-[#0C0106] border border-rose-900/60 rounded-xl pl-9 pr-4 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              onClick={() => fetchRegistrations()}
              className="p-2 rounded-xl bg-[#0C0106] border border-rose-900 text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* REGISTRATIONS TABLE */}
        <div className="bg-[#18040E] border border-rose-950 rounded-2xl overflow-hidden shadow-2xl">
          {loadingList ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
              રેકોર્ડ્સ લોડ થઈ રહ્યા છે...
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              કોઈ રજીસ્ટ્રેશન રેકોર્ડ મળ્યો નથી.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#120208] text-amber-300 uppercase tracking-wider font-bold border-b border-rose-950 text-[11px]">
                  <tr>
                    <th className="p-3.5">ID / તારીખ</th>
                    <th className="p-3.5">કપલ ફોટો</th>
                    <th className="p-3.5">કપલ નામ</th>
                    <th className="p-3.5">મોબાઇલ નંબર</th>
                    <th className="p-3.5">સ્લેબ / રકમ</th>
                    <th className="p-3.5">પેમેન્ટ સ્ક્રીનશોટ (Receipt)</th>
                    <th className="p-3.5">સ્ટેટસ</th>
                    <th className="p-3.5 text-right">ઍક્શન</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-950/60 text-slate-300">
                  {registrations.map((r) => (
                    <tr key={r.inquiryId} className="hover:bg-rose-950/20 transition-colors">
                      {/* ID / Date */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-mono font-bold text-amber-400 block text-xs">{r.inquiryId}</span>
                        <span className="text-[10px] text-slate-500 block">
                          {new Date(r.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Couple Photo Thumbnail */}
                      <td className="p-3.5">
                        <div 
                          onClick={() => setInspectItem(r)}
                          className="w-12 h-12 rounded-xl overflow-hidden border border-rose-900 cursor-pointer hover:scale-105 transition-transform"
                        >
                          <img
                            src={r.couplePhoto}
                            alt="Couple"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Couple Names */}
                      <td className="p-3.5">
                        <div className="font-bold text-white text-xs">
                          {r.husbandName} & {r.wifeName} {r.surname}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="p-3.5 font-mono text-xs">
                        <a href={`tel:${r.phoneNumber}`} className="text-slate-300 hover:text-amber-300">
                          {r.phoneNumber}
                        </a>
                      </td>

                      {/* Tier & Amount */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-bold text-amber-300 block">₹{r.amount}</span>
                        <span className="text-[10px] text-slate-400 block">{r.tierName}</span>
                      </td>

                      {/* Payment Screenshot Thumbnail & OCR info */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <div 
                            onClick={() => setInspectItem(r)}
                            className="w-12 h-12 rounded-xl overflow-hidden border border-rose-900 cursor-pointer hover:scale-105 transition-transform shrink-0"
                          >
                            <img
                              src={r.paymentScreenshot}
                              alt="Receipt"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-[10px]">
                            {r.utr ? (
                              <span className="font-mono text-emerald-400 block">UTR: {r.utr}</span>
                            ) : (
                              <span className="text-slate-500 block">UTR Not detected</span>
                            )}
                            <span className="text-slate-400 block truncate max-w-[120px]">
                              To: {r.payeeNameFromReceipt}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          r.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : r.status === 'rejected'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        }`}>
                          {r.status}
                        </span>
                        {r.attendance?.checkedIn && (
                          <span className="block mt-1 text-[9px] text-purple-300 font-semibold">
                            ✓ Entered Gate
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setInspectItem(r)}
                            title="Side-by-side Inspection"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {r.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(r.inquiryId)}
                                title="Approve Registration"
                                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setInspectItem(r);
                                  setShowRejectInput(true);
                                }}
                                title="Reject Registration"
                                className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          {r.status === 'approved' && (
                            <Link
                              to={`/pass/${r.inquiryId}`}
                              target="_blank"
                              title="Open Pass"
                              className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}

                          <button
                            onClick={() => handleDelete(r.inquiryId)}
                            title="Delete"
                            className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================
          SIDE-BY-SIDE INSPECTION MODAL
      ======================================================== */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#18040E] border-2 border-amber-500/40 rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-rose-950 pb-4">
              <div>
                <span className="font-mono font-bold text-amber-400 text-lg block">{inspectItem.inquiryId}</span>
                <h3 className="text-base font-bold text-white">
                  {inspectItem.husbandName} & {inspectItem.wifeName} {inspectItem.surname}
                </h3>
              </div>
              <button
                onClick={() => {
                  setInspectItem(null);
                  setShowRejectInput(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Side-by-side Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Couple Photo */}
              <div className="bg-[#0C0106] border border-rose-950 rounded-2xl p-4 text-center space-y-2">
                <span className="text-xs font-bold text-amber-300 block">કપલ ફોટો (Couple Photo)</span>
                <div className="w-full h-72 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={inspectItem.couplePhoto}
                    alt="Couple"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Payment Receipt */}
              <div className="bg-[#0C0106] border border-rose-950 rounded-2xl p-4 text-center space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">પેમેન્ટ સ્ક્રીનશોટ (Receipt)</span>
                <div className="w-full h-72 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={inspectItem.paymentScreenshot}
                    alt="Payment Receipt"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* OCR Extracted Information */}
            <div className="bg-[#0C0106] border border-rose-950 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">રકમ:</span>
                <span className="font-bold text-amber-400 text-sm">₹{inspectItem.amount}</span>
              </div>
              <div>
                <span className="text-slate-500 block">સ્લેબ:</span>
                <span className="font-bold text-white">{inspectItem.tierName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">OCR શોધાયેલ UTR:</span>
                <span className="font-mono font-bold text-emerald-400">{inspectItem.utr || 'None'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">OCR Payee:</span>
                <span className="font-bold text-white">{inspectItem.payeeNameFromReceipt || 'None'}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-t border-rose-950 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  inspectItem.status === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : inspectItem.status === 'rejected'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  Status: {inspectItem.status}
                </span>
                {inspectItem.status === 'approved' && (
                  <Link
                    to={`/pass/${inspectItem.inquiryId}`}
                    target="_blank"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>પાસ ખોલો</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleApprove(inspectItem.inquiryId)}
                  disabled={actionLoading}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>મંજૂર કરો (Approve)</span>
                </button>

                <button
                  onClick={() => setShowRejectInput(!showRejectInput)}
                  disabled={actionLoading}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                >
                  <XCircle className="w-4 h-4" />
                  <span>નામંજૂર કરો (Reject)</span>
                </button>
              </div>
            </div>

            {/* Rejection Reason Form */}
            {showRejectInput && (
              <div className="bg-[#0C0106] border border-rose-900 rounded-xl p-4 space-y-3">
                <label className="block text-xs font-bold text-rose-300">
                  રિજેક્ટ કરવાનું કારણ લખો (કારણ યુઝરને દેખાશે):
                </label>
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="દા.ત. અમાન્ય પેમેન્ટ સ્ક્રીનશોટ અથવા રકમ મેળ ખાતી નથી."
                  className="w-full bg-[#18040E] border border-rose-900/60 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-rose-400"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowRejectInput(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    રદ કરો
                  </button>
                  <button
                    onClick={() => handleReject(inspectItem.inquiryId)}
                    disabled={actionLoading}
                    className="px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                  >
                    કન્ફર્મ રિજેક્ટ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          SETTINGS MODAL
      ======================================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18040E] border-2 border-amber-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button onClick={() => setShowSettingsModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-400" />
              UPI પેમેન્ટ સેટિંગ્સ
            </h2>

            {settingsMessage && (
              <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs">
                {settingsMessage}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  UPI ID (VPA)
                </label>
                <input
                  type="text"
                  required
                  value={upiIdInput}
                  onChange={(e) => setUpiIdInput(e.target.value)}
                  placeholder="thedivinegarbhsanskar@okaxis"
                  className="w-full bg-[#0C0106] border border-rose-900 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1">
                  Payee Name (નામ)
                </label>
                <input
                  type="text"
                  required
                  value={payeeNameInput}
                  onChange={(e) => setPayeeNameInput(e.target.value)}
                  placeholder="The Divine Garbh Sanskar"
                  className="w-full bg-[#0C0106] border border-rose-900 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={settingsLoading}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors"
              >
                {settingsLoading ? 'સાચવી રહ્યું છે...' : 'સાચવો (Save Settings)'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          SUPER ADMIN RESET CONFIRM MODAL
      ======================================================== */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C050B] border-2 border-red-500 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button onClick={() => setShowResetModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-red-950 flex items-center justify-center text-red-500 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">ડેન્જર ઝોન: ડેટાબેઝ રીસેટ</h2>
              <p className="text-xs text-red-300 mt-1">
                આ કરવાથી તમામ રજીસ્ટ્રેશન ડિલીટ થશે અને ઇન્ક્વાયરી કાઉન્ટર ૧૦૦૦ પર પાછું સેટ થઈ જશે!
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-slate-400">
                કન્ફર્મ કરવા માટે <strong>RESET-ZERO</strong> લખો:
              </label>
              <input
                type="text"
                value={resetConfirmText}
                onChange={(e) => setResetConfirmText(e.target.value)}
                placeholder="RESET-ZERO"
                className="w-full bg-black border border-red-900 rounded-xl px-4 py-2 text-white text-xs font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                રદ કરો
              </button>
              <button
                onClick={handleSuperReset}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-500"
              >
                કાયમ માટે ડિલીટ કરો
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
