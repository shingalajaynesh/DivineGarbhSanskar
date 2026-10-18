import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import QRCode from 'qrcode';
import {
  Lock, CheckCircle2, XCircle, Search, RefreshCw, Download,
  ExternalLink, Eye, EyeOff, Trash2, Camera, Settings, Users,
  ShieldAlert, ShieldCheck, LogOut, Check, X, AlertTriangle,
  QrCode, Upload, Clock, Phone, MessageCircle, Copy,
  ZoomIn, ZoomOut, RotateCw, Plus, LayoutGrid, LayoutList, Flag,
  FileText, CheckCheck, Maximize2, UserPlus, Sparkles, AlertCircle,
  RotateCcw
} from 'lucide-react';

import { API_BASE } from '../../utils/apiConfig';

// Safely resolve backend asset and API URLs
const resolveApiUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/api')) {
    if (API_BASE.startsWith('http')) {
      return `${API_BASE}${url.replace(/^\/api/, '')}`;
    }
    return url;
  }
  return `${API_BASE}/${url.replace(/^\/+/, '')}`;
};

// Formatter for Indian Standard Time (IST) readable format
const formatISTDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return 'N/A';
  }
};

// Relative time calculation
const formatTimeAgo = (dateStr) => {
  if (!dateStr) return '';
  try {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'હમણાં જ';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays === 1) return 'ગઈકાલે';
    return `${diffDays}d ago`;
  } catch {
    return '';
  }
};

export default function EventAdminPage({ defaultRole }) {
  const location = useLocation();
  const isSuperAdminRoute = location.pathname.includes('superadmin') || defaultRole === 'superadmin';

  // Authentication State
  const [password, setPassword] = useState(() => sessionStorage.getItem('divineAdminPassword') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // 'admin' | 'superadmin'
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Tab & View Controls
  const [activeTab, setActiveTab] = useState('registrations'); // 'registrations' | 'settings'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'amount'

  // Registrations & Metrics
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(() => {
    try {
      const cached = sessionStorage.getItem('divineAdminStats');
      if (cached) return JSON.parse(cached);
    } catch {}
    return {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
      checkedIn: 0,
      flagged: 0,
      manual: 0,
      totalRevenue: 0
    };
  });
  const [loadingList, setLoadingList] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Filters
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [searchQuery, setSearchQuery] = useState('');

  // Inspection Modal (Payment SS & Couple Verification)
  const [inspectItem, setInspectItem] = useState(null);
  const [screenshotZoom, setScreenshotZoom] = useState(1);
  const [screenshotRotation, setScreenshotRotation] = useState(0);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Dedicated Couple Photo Lightbox (Blurred background, click outside to close)
  const [couplePhotoModal, setCouplePhotoModal] = useState(null);

  // Dedicated Receipt Fullscreen Lightbox (Blurred background, click outside to close)
  const [lightboxImage, setLightboxImage] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Manual Entry Modal
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    husbandName: '',
    wifeName: '',
    surname: '',
    phoneNumber: '',
    tier: 1,
    amount: 900,
    paymentMethod: 'CASH',
    status: 'approved',
    adminNotes: '',
    utr: ''
  });
  const [manualSubmitting, setManualSubmitting] = useState(false);

  // Flag Fraud Modal
  const [showFakeModal, setShowFakeModal] = useState(false);
  const [fakeTargetItem, setFakeTargetItem] = useState(null);
  const [fakeReasonText, setFakeReasonText] = useState('ખોટો / એડિટ કરેલ પેમેન્ટ સ્ક્રીનશોટ (Fake Receipt)');

  // Event Settings State
  const [eventSettings, setEventSettings] = useState({
    upiId: 'jayneshshingala2005-2@okicici',
    payeeName: 'Shingala Jaynesh',
    totalCoupleCapacity: 500,
    isRegistrationOpen: true,
    supportWhatsapp: '919586979897',
    customQrImage: '',
    useCustomQr: true,
    tiers: [
      { tierNumber: 1, name: 'કપલ પ્રવેશ પાસ (Couple Pass)', price: 900, minCouple: 1, maxCouple: 500 }
    ]
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [previewQrUrl, setPreviewQrUrl] = useState('');
  const qrFileInputRef = useRef(null);

  // Show quick toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Copy text to clipboard
  const handleCopy = (text, label = 'Copied') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast(`${label}: ${text}`);
  };

  // Open dedicated Couple Photo Modal
  const handleOpenCouplePhoto = (e, item) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!item.couplePhoto && !item.hasPhoto) return;
    setCouplePhotoModal({
      url: resolveApiUrl(item.couplePhoto),
      name: `${item.husbandName} & ${item.wifeName} ${item.surname}`,
      id: item.inquiryId,
      phone: item.phoneNumber,
      date: item.createdAt
    });
  };

  // Login handler
  const handleLogin = async (passToTry = password) => {
    if (!passToTry) {
      setAuthError('કૃપા કરીને એડમિન પાસવર્ડ દાખલ કરો.');
      return;
    }
    setLoggingIn(true);
    setAuthError('');

    try {
      const res = await fetch(`${API_BASE}/admin/registrations?limit=1`, {
        headers: { 'Authorization': passToTry }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('divineAdminPassword', passToTry);

        if (passToTry === 'ADMIN_RESET_2026' || isSuperAdminRoute) {
          setRole('superadmin');
        } else {
          setRole('admin');
        }

        if (data.stats) {
          setStats(data.stats);
          try { sessionStorage.setItem('divineAdminStats', JSON.stringify(data.stats)); } catch {}
        }
        fetchRegistrations(passToTry, activeFilter, searchQuery);
        fetchSettings(passToTry);
      } else {
        setAuthError(data.error || 'ખોટો પાસવર્ડ. ફરી પ્રયાસ કરો.');
      }
    } catch {
      setAuthError('સર્વર સાથે જોડાણ થઈ શક્યું નથી. કૃપા કરીને બેકએન્ડ તપાસો.');
    } finally {
      setLoggingIn(false);
    }
  };

  // Auto-login if password in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('divineAdminPassword');
    if (saved) {
      handleLogin(saved);
    }
  }, []);

  // Fetch registrations list with filters
  const fetchRegistrations = async (passVal = password, filterVal = activeFilter, queryVal = searchQuery) => {
    const activePass = passVal || password;
    if (!activePass) return;

    setLoadingList(true);
    setFetchError('');

    try {
      const params = new URLSearchParams();
      if (filterVal && filterVal !== 'all') params.append('status', filterVal);
      if (queryVal && queryVal.trim()) params.append('search', queryVal.trim());

      const res = await fetch(`${API_BASE}/admin/registrations?${params.toString()}`, {
        headers: { 'Authorization': activePass }
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setRegistrations(data.registrations || []);
        if (data.stats) {
          setStats(data.stats);
          try { sessionStorage.setItem('divineAdminStats', JSON.stringify(data.stats)); } catch {}
        }
      } else {
        setFetchError(data.error || 'રજીસ્ટ્રેશન લિસ્ટ લાવવામાં ભૂલ આવી.');
      }
    } catch {
      setFetchError('સર્વર જોડાણ નિષ્ફળ ગયું.');
    } finally {
      setLoadingList(false);
    }
  };

  // Open Inspection Modal for a couple
  const handleOpenInspect = (item) => {
    setInspectItem(item);
    setScreenshotZoom(1);
    setScreenshotRotation(0);
    setAdminNoteInput(item.adminNotes || '');
    setShowRejectBox(false);
    setRejectReason('');
  };

  // Quick Approve Registration
  const handleApprove = async (inquiryId) => {
    const prevRegs = [...registrations];
    const prevStats = { ...stats };
    setActionLoading(true);

    // Optimistic UI update
    setRegistrations(prev => prev.map(r => r.inquiryId === inquiryId ? { ...r, status: 'approved' } : r));
    setStats(prev => ({
      ...prev,
      approved: (prev.approved || 0) + 1,
      pending: Math.max(0, (prev.pending || 0) - 1)
    }));
    if (inspectItem?.inquiryId === inquiryId) {
      setInspectItem(prev => ({ ...prev, status: 'approved' }));
    }

    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inquiryId}/approve`, {
        method: 'POST',
        headers: { 'Authorization': password }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`ઇન્ક્વાયરી ${inquiryId} સફળતાપૂર્વક એપ્રુવ થઈ! પાસ ઇસ્યુ થયો.`);
      } else {
        setRegistrations(prevRegs);
        setStats(prevStats);
        alert(data.error || 'એપ્રુવ કરવામાં ભૂલ આવી.');
      }
    } catch {
      setRegistrations(prevRegs);
      setStats(prevStats);
      alert('સર્વર સાથે જોડાણ થઈ શક્યું નથી.');
    } finally {
      setActionLoading(false);
    }
  };

  // Reject Registration
  const handleReject = async (inquiryId) => {
    const reason = rejectReason.trim() || 'પેમેન્ટ રસીદ અમાન્ય અથવા રકમ મેળ ખાતી નથી.';
    setActionLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inquiryId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations(prev => prev.map(r => r.inquiryId === inquiryId ? { ...r, status: 'rejected', rejectionReason: reason } : r));
        setStats(prev => ({
          ...prev,
          rejected: (prev.rejected || 0) + 1,
          pending: Math.max(0, (prev.pending || 0) - 1)
        }));
        if (inspectItem?.inquiryId === inquiryId) {
          setInspectItem(prev => ({ ...prev, status: 'rejected', rejectionReason: reason }));
        }
        setShowRejectBox(false);
        showToast(`ઇન્ક્વાયરી ${inquiryId} રિજેક્ટ કરવામાં આવી.`);
      } else {
        alert(data.error || 'રિજેક્ટ કરવામાં ભૂલ આવી.');
      }
    } catch {
      alert('સર્વર એરર.');
    } finally {
      setActionLoading(false);
    }
  };

  // Flag as Fake / Fraud
  const handleConfirmFlagFake = async () => {
    if (!fakeTargetItem) return;
    const inquiryId = fakeTargetItem.inquiryId;
    setActionLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inquiryId}/flag-fake`, {
        method: 'POST',
        headers: {
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: fakeReasonText, isFake: true })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations(prev => prev.map(r => r.inquiryId === inquiryId ? {
          ...r,
          status: 'rejected',
          isFlaggedFake: true,
          fakeReason: fakeReasonText
        } : r));
        setStats(prev => ({
          ...prev,
          flagged: (prev.flagged || 0) + 1,
          rejected: (prev.rejected || 0) + 1,
          pending: Math.max(0, (prev.pending || 0) - 1)
        }));
        if (inspectItem?.inquiryId === inquiryId) {
          setInspectItem(prev => ({ ...prev, status: 'rejected', isFlaggedFake: true, fakeReason: fakeReasonText }));
        }
        setShowFakeModal(false);
        setFakeTargetItem(null);
        showToast(`ઇન્ક્વાયરી ${inquiryId} ફેક તરીકે ફ્લેગ થઈ.`);
      } else {
        alert('ફેક ફ્લેગ કરવામાં ભૂલ આવી.');
      }
    } catch {
      alert('સર્વર એરર.');
    } finally {
      setActionLoading(false);
    }
  };

  // Save Admin Notes
  const handleSaveNote = async () => {
    if (!inspectItem) return;
    setSavingNote(true);
    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inspectItem.inquiryId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: adminNoteInput })
      });
      if (res.ok) {
        setRegistrations(prev => prev.map(r => r.inquiryId === inspectItem.inquiryId ? { ...r, adminNotes: adminNoteInput } : r));
        setInspectItem(prev => ({ ...prev, adminNotes: adminNoteInput }));
        showToast('નોટ સાચવવામાં આવી!');
      }
    } catch {
      alert('નોટ સેવ કરવામાં ભૂલ આવી.');
    } finally {
      setSavingNote(false);
    }
  };

  // Manual Entry Submission
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualForm.husbandName || !manualForm.wifeName || !manualForm.surname || !manualForm.phoneNumber) {
      alert('કૃપા કરીને પતિનું નામ, પત્નીનું નામ, અટક અને ૧૦ આંકડાનો મોબાઇલ નંબર ભરો.');
      return;
    }

    setManualSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(manualForm).forEach(k => {
        formData.append(k, manualForm[k]);
      });

      const res = await fetch(`${API_BASE}/admin/registrations/manual`, {
        method: 'POST',
        headers: { 'Authorization': password },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`સફળતા! નવું રજીસ્ટ્રેશન ${data.data?.inquiryId} સેવ થયું.`);
        setShowManualModal(false);
        setManualForm({
          husbandName: '',
          wifeName: '',
          surname: '',
          phoneNumber: '',
          tier: 1,
          amount: 900,
          paymentMethod: 'CASH',
          status: 'approved',
          adminNotes: '',
          utr: ''
        });
        fetchRegistrations(password, activeFilter, searchQuery);
      } else {
        alert(data.error || 'મેન્યુઅલ એન્ટ્રી સેવ કરવામાં ભૂલ આવી.');
      }
    } catch {
      alert('સર્વર સાથે જોડાણ થઈ શક્યું નથી.');
    } finally {
      setManualSubmitting(false);
    }
  };

  // Delete registration
  const handleDelete = async (inquiryId) => {
    if (!window.confirm(`શું તમે ખરેખર ${inquiryId} કાયમ માટે ડિલીટ કરવા માંગો છો?`)) return;
    const prevRegs = [...registrations];

    setRegistrations(prev => prev.filter(r => r.inquiryId !== inquiryId));
    if (inspectItem?.inquiryId === inquiryId) setInspectItem(null);

    try {
      const res = await fetch(`${API_BASE}/admin/registrations/${inquiryId}`, {
        method: 'DELETE',
        headers: { 'Authorization': password }
      });
      if (res.ok) {
        showToast(`રજીસ્ટ્રેશન ${inquiryId} ડિલીટ થયું.`);
        fetchRegistrations(password, activeFilter, searchQuery);
      } else {
        setRegistrations(prevRegs);
        alert('ડિલીટ કરવામાં ભૂલ આવી.');
      }
    } catch {
      setRegistrations(prevRegs);
      alert('સર્વર એરર.');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    window.open(`${API_BASE}/admin/export/csv?auth=${encodeURIComponent(password)}`, '_blank');
  };

  // Load Settings
  const fetchSettings = async (passVal = password) => {
    const activePass = passVal || password;
    if (!activePass) return;
    setSettingsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/settings`, {
        headers: { 'Authorization': activePass }
      });
      const json = await res.json();
      if (res.ok && json.setting) {
        setEventSettings(prev => ({ ...prev, ...json.setting }));
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setSettingsLoading(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    setSettingsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/admin/settings`, {
        method: 'POST',
        headers: {
          'Authorization': password,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventSettings)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast('સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવ્યા!');
        if (json.setting) setEventSettings(json.setting);
      } else {
        alert(json.error || 'સેટિંગ્સ સેવ કરવામાં ભૂલ આવી.');
      }
    } catch {
      alert('સર્વર એરર.');
    } finally {
      setSettingsSaving(false);
    }
  };

  // Dynamic QR Code Preview
  useEffect(() => {
    if (eventSettings.useCustomQr && eventSettings.customQrImage) {
      setPreviewQrUrl(eventSettings.customQrImage);
      return;
    }
    const testPrice = eventSettings.tiers?.[0]?.price || 900;
    const upiUri = `upi://pay?pa=${encodeURIComponent(eventSettings.upiId)}&pn=${encodeURIComponent(eventSettings.payeeName)}&am=${testPrice}&cu=INR&tn=Divya%20Garbh%20Yatra%20Pass`;
    QRCode.toDataURL(upiUri, {
      margin: 1,
      width: 260,
      color: { dark: '#0F172A', light: '#FFFFFF' }
    }).then((url) => setPreviewQrUrl(url)).catch(() => {});
  }, [eventSettings.upiId, eventSettings.payeeName, eventSettings.useCustomQr, eventSettings.customQrImage, eventSettings.tiers]);

  // Upload Custom QR
  const handleQrUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('qrImage', file);
    try {
      const res = await fetch(`${API_BASE}/admin/upload-qr`, {
        method: 'POST',
        headers: { 'Authorization': password },
        body: formData
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setEventSettings(prev => ({
          ...prev,
          customQrImage: json.customQrImage,
          useCustomQr: true
        }));
        showToast('કસ્ટમ QR કોડ અપલોડ સફળ!');
      } else {
        alert(json.error || 'QR કોડ અપલોડ કરવામાં ભૂલ આવી.');
      }
    } catch {
      alert('સર્વર એરર.');
    }
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem('divineAdminPassword');
    sessionStorage.removeItem('divineAdminStats');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Sort & Filter registrations list
  const filteredRegistrations = useMemo(() => {
    let list = [...registrations];
    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else if (sortBy === 'amount') {
      list.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    }
    return list;
  }, [registrations, sortBy]);

  // ==========================================
  // 1. CLEAN MODERN WHITE/SLATE LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-center items-center p-4 font-sans">
        <Helmet>
          <title>Admin Portal - The Divine Garbh Sanskar</title>
        </Helmet>

        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/logo.jpg"
              alt="Divine Garbh Sanskar"
              className="w-14 h-14 rounded-full object-contain mx-auto p-0.5 bg-white border border-slate-200 shadow-xs"
            />
            <h1 className="text-lg font-bold text-slate-900 font-serif">
              The Divine Garbh Sanskar
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              દિવ્ય ગર્ભયાત્રા • એડમિન પોર્ટલ
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                એડમિન પાસવર્ડ (Admin Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>ચકાસણી થઈ રહી છે...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-white" />
                  <span>લૉગિન કરો (Sign In)</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100">
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors">
              &larr; મુખ્ય વેબસાઇટ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED DASHBOARD (CLEAN LIGHT THEME)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans w-full max-w-full overflow-x-hidden">
      <Helmet>
        <title>Admin Dashboard - The Divine Garbh Sanskar</title>
      </Helmet>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 border border-slate-800 animate-fade-in max-w-[90vw]">
          <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          CLEAN WHITE HEADER (100% Mobile Responsive, No Overflow)
      ======================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs w-full max-w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
          {/* Brand Logo & Portal Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link to="/" className="shrink-0 flex items-center gap-2 min-w-0">
              <img
                src="/logo.jpg"
                alt="Divine Logo"
                className="w-8 h-8 rounded-full object-contain border border-slate-200 p-0.5 bg-white shrink-0"
              />
              <div className="min-w-0">
                <span className="font-bold text-xs sm:text-base text-slate-900 block leading-tight truncate">
                  The Divine Garbh Sanskar
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium flex items-center gap-1 truncate">
                  <span className="text-rose-700 font-semibold">દિવ્ય ગર્ભયાત્રા</span>
                  <span className="text-slate-300">•</span>
                  <span>Admin</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View Switcher Tabs (Desktop) */}
            <div className="hidden md:flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('registrations')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'registrations' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-rose-700" />
                <span>રજીસ્ટ્રેશન ({stats.total})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'settings' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5 text-slate-600" />
                <span>સેટિંગ્સ &amp; QR</span>
              </button>
            </div>

            {/* + Add Entry Button */}
            <button
              type="button"
              onClick={() => setShowManualModal(true)}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-semibold transition-all shadow-2xs flex items-center gap-1 cursor-pointer shrink-0"
              title="Add Manual Registration"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+ નવી એન્ટ્રી</span>
              <span className="sm:hidden">ઉમેરો</span>
            </button>

            {/* Gate Scanner */}
            <Link
              to="/scanner"
              className="px-2 sm:px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0"
              title="Open Gate Scanner"
            >
              <Camera className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">સ્કેનર</span>
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('registrations')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'registrations' ? 'bg-white text-slate-900 shadow-2xs border border-slate-200' : 'text-slate-600'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-rose-700" />
            <span>રજીસ્ટ્રેશન ({stats.total})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'settings' ? 'bg-white text-slate-900 shadow-2xs border border-slate-200' : 'text-slate-600'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>સેટિંગ્સ &amp; QR</span>
          </button>
        </div>
      </header>

      {/* ========================================================
          MAIN CONTENT AREA (No horizontal scroll guarantee)
      ======================================================== */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-3.5 sm:py-5 space-y-3.5 sm:space-y-4 w-full max-w-full overflow-x-hidden">

        {/* ========================================================
            1. KPI METRIC CARDS (Mobile Ergonomic 2-Col Grid)
        ======================================================== */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 w-full">
          {/* Total Registrations */}
          <div
            onClick={() => { setActiveFilter('all'); fetchRegistrations(password, 'all', searchQuery); }}
            className={`bg-white border rounded-xl p-3 sm:p-3.5 shadow-2xs cursor-pointer transition-all active:scale-[0.98] select-none ${
              activeFilter === 'all' ? 'ring-2 ring-slate-800 border-slate-800' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">કુલ રજીસ્ટ્રેશન</span>
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg sm:text-2xl font-bold text-slate-900 tabular-nums">{stats.total}</span>
              <span className="text-[11px] text-slate-500 font-medium">કપલ</span>
            </div>
          </div>

          {/* Pending Verification */}
          <div
            onClick={() => { setActiveFilter('pending'); fetchRegistrations(password, 'pending', searchQuery); }}
            className={`bg-white border rounded-xl p-3 sm:p-3.5 shadow-2xs cursor-pointer transition-all active:scale-[0.98] select-none ${
              activeFilter === 'pending' ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/20' : 'border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-semibold text-amber-700 uppercase tracking-wide truncate">વેરિફિકેશન બાકી</span>
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg sm:text-2xl font-bold text-amber-900 tabular-nums">{stats.pending}</span>
              <span className="text-[11px] text-amber-600 font-medium">બાકી</span>
            </div>
          </div>

          {/* Approved & Passes Issued */}
          <div
            onClick={() => { setActiveFilter('approved'); fetchRegistrations(password, 'approved', searchQuery); }}
            className={`bg-white border rounded-xl p-3 sm:p-3.5 shadow-2xs cursor-pointer transition-all active:scale-[0.98] select-none ${
              activeFilter === 'approved' ? 'ring-2 ring-emerald-600 border-emerald-600 bg-emerald-50/20' : 'border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 uppercase tracking-wide truncate">એપ્રુવ્ડ (Approved)</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg sm:text-2xl font-bold text-emerald-900 tabular-nums">{stats.approved}</span>
              <span className="text-[11px] text-emerald-600 font-medium">પાસ ઇસ્યુ</span>
            </div>
          </div>

          {/* Gate Attendance Checked In */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">ગેટ પર હાજરી</span>
              <Camera className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg sm:text-2xl font-bold text-slate-900 tabular-nums">{stats.checkedIn}</span>
              <span className="text-[11px] text-slate-400 font-medium">પ્રવેશ થયો</span>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 shadow-2xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wide">કુલ જમા રકમ</span>
              <span className="text-[10px] font-bold text-slate-400">INR</span>
            </div>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-xs font-semibold text-slate-500">₹</span>
              <span className="text-lg sm:text-2xl font-bold text-slate-900 tabular-nums truncate">
                {(stats.totalRevenue || 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            TAB 1: REGISTRATIONS MANAGEMENT
        ======================================================== */}
        {activeTab === 'registrations' && (
          <div className="space-y-3 w-full">
            {/* Filter & Search Toolbar (Optimized for Mobile Ergonomics) */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 sm:p-3 shadow-2xs space-y-2.5 md:space-y-0 md:flex md:items-center md:justify-between md:gap-3 w-full">
              {/* Row 1 on Mobile: Full-width search bar */}
              <div className="relative w-full md:w-64 order-1 md:order-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    fetchRegistrations(password, activeFilter, e.target.value);
                  }}
                  placeholder="નામ, ફોન, CPL ID, UTR..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-8 py-2 md:py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      fetchRegistrations(password, activeFilter, '');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Row 2 on Mobile: Filter Pills with smooth touch scroll */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs no-scrollbar w-full md:w-auto order-2 md:order-1 -mx-0.5 px-0.5">
                {[
                  { key: 'all', label: 'બધા', count: stats.total },
                  { key: 'pending', label: 'બાકી', count: stats.pending },
                  { key: 'approved', label: 'એપ્રુવ્ડ', count: stats.approved },
                  { key: 'rejected', label: 'રિજેક્ટ', count: stats.rejected }
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f.key);
                      fetchRegistrations(password, f.key, searchQuery);
                    }}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      activeFilter === f.key
                        ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                      activeFilter === f.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Row 3 on Mobile: Sort & Action Buttons */}
              <div className="flex items-center gap-1.5 w-full md:w-auto justify-between md:justify-end order-3">
                {/* Sort Option */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer flex-1 md:flex-none"
                  title="Sort registrations"
                >
                  <option value="newest">નવી એન્ટ્રી</option>
                  <option value="oldest">જૂની એન્ટ્રી</option>
                  <option value="amount">રકમ મુજબ</option>
                </select>

                {/* View Switcher (Desktop Only) */}
                <div className="hidden md:flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded transition-all ${
                      viewMode === 'table' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Table View"
                  >
                    <LayoutList className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('cards')}
                    className={`p-1.5 rounded transition-all ${
                      viewMode === 'cards' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Cards View"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Export CSV */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  title="Export to CSV"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline text-xs font-semibold">CSV</span>
                </button>

                {/* Refresh Button */}
                <button
                  type="button"
                  onClick={() => fetchRegistrations(password, activeFilter, searchQuery)}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingList ? 'animate-spin text-slate-900' : 'text-slate-600'}`} />
                  <span className="hidden sm:inline text-xs font-semibold">રિફ્રેશ</span>
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {fetchError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{fetchError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => fetchRegistrations(password, activeFilter, searchQuery)}
                  className="px-3 py-1 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading Skeleton */}
            {loadingList ? (
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3 animate-pulse">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded-xl" />
                ))}
              </div>
            ) : filteredRegistrations.length === 0 ? (
              /* Empty State */
              <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 text-center space-y-3">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-sm font-semibold text-slate-800">કોઈ રજીસ્ટ્રેશન મળ્યું નથી</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  પસંદ કરેલ ફિલ્ટર અથવા સર્ચ મુજબ કોઈ રેકોર્ડ ઉપલબ્ધ નથી.
                </p>
                <button
                  type="button"
                  onClick={() => setShowManualModal(true)}
                  className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
                >
                  + નવી એન્ટ્રી ઉમેરો
                </button>
              </div>
            ) : (
              <>
                {/* ========================================================
                   A. MOBILE TOUCH-FRIENDLY CARDS (Always used on screens < md)
                   100% Mobile Focused, Zero Horizontal Scroll, Thumb Friendly
                ======================================================== */}
                <div className="block md:hidden space-y-2.5 w-full">
                  {filteredRegistrations.map((item) => (
                    <div
                      key={item.inquiryId}
                      className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs space-y-2.5 hover:border-slate-300 transition-all w-full"
                    >
                      {/* Top Header: ID + Status + Timestamp */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <button
                            type="button"
                            onClick={() => handleCopy(item.inquiryId, 'Inquiry ID')}
                            className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 active:bg-slate-200 text-slate-800 flex items-center gap-1 cursor-pointer shrink-0"
                            title="Click to copy ID"
                          >
                            <span>{item.inquiryId}</span>
                            <Copy className="w-2.5 h-2.5 text-slate-400" />
                          </button>
                          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                            item.status === 'approved'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : item.status === 'rejected'
                              ? 'bg-red-50 border-red-200 text-red-700'
                              : 'bg-amber-50 border-amber-200 text-amber-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-semibold text-slate-700 block">
                            {formatISTDateTime(item.createdAt)}
                          </span>
                          <span className="text-[10px] text-slate-400 block -mt-0.5">
                            {formatTimeAgo(item.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Couple Photo + Names + Call & WhatsApp Buttons */}
                      <div className="flex items-center gap-3 pt-0.5">
                        {/* Couple Photo thumbnail: Tap opens lightbox */}
                        <button
                          type="button"
                          onClick={(e) => handleOpenCouplePhoto(e, item)}
                          className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 cursor-pointer active:scale-95 transition-transform"
                          title="કપલ ફોટો જોવા ક્લિક કરો"
                        >
                          {item.couplePhoto ? (
                            <img
                              src={resolveApiUrl(item.couplePhoto)}
                              alt="Couple"
                              loading="lazy"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full ${item.couplePhoto ? 'hidden' : 'flex'} items-center justify-center font-bold text-slate-600 text-xs bg-slate-100`}>
                            {item.husbandName?.slice(0, 1)}{item.wifeName?.slice(0, 1)}
                          </div>
                          {item.couplePhoto && (
                            <div className="absolute bottom-0 right-0 p-0.5 bg-black/60 rounded-tl text-[8px] text-white">
                              <Eye className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => handleOpenInspect(item)}
                            className="font-bold text-slate-900 text-sm truncate hover:text-slate-700 text-left block w-full cursor-pointer leading-tight"
                          >
                            {item.husbandName} &amp; {item.wifeName} {item.surname}
                          </button>
                          
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <a
                              href={`tel:+91${item.phoneNumber}`}
                              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 px-2 py-0.5 rounded transition-colors"
                              title="Direct Phone Call"
                            >
                              <Phone className="w-2.5 h-2.5 text-slate-500" />
                              <span>+91 {item.phoneNumber}</span>
                            </a>
                            <a
                              href={`https://wa.me/91${item.phoneNumber}?text=${encodeURIComponent(`નમસ્તે ${item.husbandName}જી, The Divine Garbh Sanskar દ્વારા આયોજિત દિવ્ય ગર્ભયાત્રા સેમિનાર માટે તમારી ઇન્ક્વાયરી ID: ${item.inquiryId} બાબતે...`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded transition-colors"
                              title="WhatsApp Message"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>WA</span>
                            </a>
                            {item.isManualEntry && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                                Manual
                              </span>
                            )}
                            {item.isFlaggedFake && (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-red-100 text-red-700 border border-red-200">
                                Fake
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Payment & UTR Row */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase block">રકમ</span>
                          <div className="flex items-baseline gap-1">
                            <strong className="text-sm font-bold text-slate-900">₹{item.amount}</strong>
                            <span className="text-[10px] text-slate-400 font-medium">({item.paymentMethod || 'UPI'})</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-semibold uppercase block">UTR નંબર</span>
                          {item.utr ? (
                            <div className="flex items-center justify-end gap-1">
                              <span className={`font-mono text-xs ${item.isDuplicateUtr ? 'text-red-700 font-bold' : 'text-slate-800 font-medium'}`}>
                                {item.utr}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(item.utr, 'UTR')}
                                className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-700"
                                title="Copy UTR"
                              >
                                <Copy className="w-2.5 h-2.5" />
                              </button>
                              {item.isDuplicateUtr && (
                                <span className="text-[8px] font-bold uppercase text-red-700 bg-red-100 px-1 rounded">
                                  DUP
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-xs">રસીદમાં UTR જુઓ</span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Touch Action Bar */}
                      <div className="pt-1 border-t border-slate-100 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenInspect(item)}
                          className="flex-1 min-h-[38px] py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                          <span>રસીદ જુઓ</span>
                        </button>

                        {item.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleApprove(item.inquiryId)}
                            disabled={actionLoading}
                            className="flex-1 min-h-[38px] py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Check className="w-4 h-4 text-white" />
                            <span>એપ્રુવ કરો</span>
                          </button>
                        )}

                        {item.status === 'approved' && (
                          <Link
                            to={`/pass/${item.inquiryId}`}
                            target="_blank"
                            className="min-h-[38px] py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                            <span>પાસ જુઓ</span>
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(item.inquiryId)}
                          className="min-h-[38px] min-w-[38px] p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ========================================================
                   B. DESKTOP VIEW (Screens >= md: Table or Cards view via viewMode)
                ======================================================== */}
                <div className="hidden md:block w-full">
                  {viewMode === 'table' ? (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse text-xs min-w-[760px]">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="py-2.5 px-3.5 w-[32%]">કપલ &amp; સંપર્ક</th>
                            <th className="py-2.5 px-3 w-[11%]">Inquiry ID</th>
                            <th className="py-2.5 px-3 w-[16%]">રજીસ્ટ્રેશન સમય</th>
                            <th className="py-2.5 px-3 w-[18%]">પેમેન્ટ / UTR</th>
                            <th className="py-2.5 px-3 w-[10%]">સ્ટેટસ</th>
                            <th className="py-2.5 px-3.5 text-right w-[13%]">ઍક્શન</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {filteredRegistrations.map((item) => (
                            <tr
                              key={item.inquiryId}
                              className="hover:bg-slate-50/80 transition-colors"
                            >
                              {/* 1. Couple & Contact Details */}
                              <td className="py-2.5 px-3.5">
                                <div className="flex items-center gap-2.5">
                                  {/* Couple Photo thumbnail: Clicking opens dedicated Photo Lightbox */}
                                  <button
                                    type="button"
                                    onClick={(e) => handleOpenCouplePhoto(e, item)}
                                    className="relative w-9 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 group cursor-pointer hover:ring-2 hover:ring-slate-400 transition-all"
                                    title="કપલ ફોટો જોવા ક્લિક કરો (View Photo)"
                                  >
                                    {item.couplePhoto ? (
                                      <img
                                        src={resolveApiUrl(item.couplePhoto)}
                                        alt="Couple"
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div className={`w-full h-full ${item.couplePhoto ? 'hidden' : 'flex'} items-center justify-center font-bold text-slate-600 text-[11px] bg-slate-100`}>
                                      {item.husbandName?.slice(0, 1)}{item.wifeName?.slice(0, 1)}
                                    </div>
                                  </button>

                                  <div className="min-w-0 flex-1">
                                    {/* Clicking name opens inspect */}
                                    <button
                                      type="button"
                                      onClick={() => handleOpenInspect(item)}
                                      className="font-semibold text-slate-900 block truncate text-xs hover:text-slate-700 text-left cursor-pointer"
                                    >
                                      {item.husbandName} &amp; {item.wifeName} {item.surname}
                                    </button>
                                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                                      <a
                                        href={`tel:+91${item.phoneNumber}`}
                                        className="font-mono text-slate-600 hover:text-slate-900"
                                      >
                                        +91 {item.phoneNumber}
                                      </a>
                                      <a
                                        href={`https://wa.me/91${item.phoneNumber}?text=${encodeURIComponent(`નમસ્તે ${item.husbandName}જી, The Divine Garbh Sanskar દ્વારા આયોજિત દિવ્ય ગર્ભયાત્રા સેમિનાર માટે તમારી ઇન્ક્વાયરી ID: ${item.inquiryId} બાબતે...`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-0.5"
                                        title="WhatsApp"
                                      >
                                        <MessageCircle className="w-3 h-3" />
                                        <span>WA</span>
                                      </a>
                                      {item.isManualEntry && (
                                        <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-indigo-50 text-indigo-700">
                                          Manual
                                        </span>
                                      )}
                                      {item.isFlaggedFake && (
                                        <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-red-100 text-red-700">
                                          Fake
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* 2. Inquiry ID */}
                              <td className="py-2.5 px-3">
                                <button
                                  type="button"
                                  onClick={() => handleCopy(item.inquiryId, 'Inquiry ID')}
                                  className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                                  title="Click to copy ID"
                                >
                                  <span>{item.inquiryId}</span>
                                  <Copy className="w-2.5 h-2.5 text-slate-400" />
                                </button>
                              </td>

                              {/* 3. Registered Time (IST Date & Time) */}
                              <td className="py-2.5 px-3">
                                <span className="font-medium text-slate-800 block text-xs">
                                  {formatISTDateTime(item.createdAt)}
                                </span>
                                <span className="text-[10px] text-slate-400 block">
                                  {formatTimeAgo(item.createdAt)}
                                </span>
                              </td>

                              {/* 4. Payment & UTR */}
                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-900 text-xs">
                                    ₹{item.amount}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    ({item.paymentMethod || 'UPI'})
                                  </span>
                                </div>
                                {item.utr ? (
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <span className={`font-mono text-[10px] ${item.isDuplicateUtr ? 'text-red-700 font-bold' : 'text-slate-600'}`}>
                                      {item.utr}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(item.utr, 'UTR')}
                                      className="p-0.5 hover:text-slate-900 text-slate-400"
                                      title="Copy UTR"
                                    >
                                      <Copy className="w-2.5 h-2.5" />
                                    </button>
                                    {item.isDuplicateUtr && (
                                      <span className="text-[8px] font-bold uppercase text-red-700 bg-red-100 px-1 rounded">
                                        DUP
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-slate-400 italic">No UTR</span>
                                )}
                              </td>

                              {/* 5. Status Badge */}
                              <td className="py-2.5 px-3">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                  item.status === 'approved'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : item.status === 'rejected'
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    item.status === 'approved' ? 'bg-emerald-500' : item.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                                  }`} />
                                  <span>{item.status}</span>
                                </span>
                              </td>

                              {/* 6. Action Buttons */}
                              <td className="py-2.5 px-3.5 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {/* View Receipt / Inspect */}
                                  <button
                                    type="button"
                                    onClick={() => handleOpenInspect(item)}
                                    className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                                    title="રસીદ ચકાસો"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                                    <span>ચકાસો</span>
                                  </button>

                                  {/* Quick Approve Button */}
                                  {item.status !== 'approved' && (
                                    <button
                                      type="button"
                                      onClick={() => handleApprove(item.inquiryId)}
                                      disabled={actionLoading}
                                      className="p-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                                      title="Approve & Generate Pass"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                  {/* Pass Link if approved */}
                                  {item.status === 'approved' && (
                                    <Link
                                      to={`/pass/${item.inquiryId}`}
                                      target="_blank"
                                      className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                      title="ડિજિટલ પાસ જુઓ"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                                    </Link>
                                  )}

                                  {/* Delete button */}
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(item.inquiryId)}
                                    className="p-1 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                    title="Delete"
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
                  ) : (
                    /* Desktop Cards Grid View */
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                      {filteredRegistrations.map((item) => (
                        <div
                          key={item.inquiryId}
                          className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                        >
                          {/* Top Row: Inquiry ID + Time + Status */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleCopy(item.inquiryId, 'Inquiry ID')}
                                className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 flex items-center gap-1 cursor-pointer"
                              >
                                <span>{item.inquiryId}</span>
                                <Copy className="w-2.5 h-2.5 text-slate-400" />
                              </button>
                              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                                item.status === 'approved'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                  : item.status === 'rejected'
                                  ? 'bg-red-50 border-red-200 text-red-700'
                                  : 'bg-amber-50 border-amber-200 text-amber-800'
                              }`}>
                                {item.status}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-[11px] font-medium text-slate-700 block">
                                {formatISTDateTime(item.createdAt)}
                              </span>
                            </div>
                          </div>

                          {/* Middle: Couple Photo + Name + Phone */}
                          <div className="flex items-center gap-2.5 pt-0.5">
                            <button
                              type="button"
                              onClick={(e) => handleOpenCouplePhoto(e, item)}
                              className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 cursor-pointer hover:ring-2 hover:ring-slate-400 transition-all"
                              title="Click to view photo"
                            >
                              {item.couplePhoto ? (
                                <img
                                  src={resolveApiUrl(item.couplePhoto)}
                                  alt="Couple"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-slate-600 text-xs bg-slate-100">
                                  {item.husbandName?.slice(0, 1)}{item.wifeName?.slice(0, 1)}
                                </div>
                              )}
                            </button>

                            <div className="min-w-0 flex-1">
                              <button
                                type="button"
                                onClick={() => handleOpenInspect(item)}
                                className="font-semibold text-slate-900 text-xs truncate hover:text-slate-700 text-left block w-full cursor-pointer"
                              >
                                {item.husbandName} &amp; {item.wifeName} {item.surname}
                              </button>
                              <div className="flex items-center gap-2 mt-0.5">
                                <a
                                  href={`tel:+91${item.phoneNumber}`}
                                  className="text-xs font-mono font-medium text-slate-600 hover:text-slate-900"
                                >
                                  +91 {item.phoneNumber}
                                </a>
                                <a
                                  href={`https://wa.me/91${item.phoneNumber}?text=${encodeURIComponent(`નમસ્તે ${item.husbandName}જી, The Divine Garbh Sanskar દ્વારા આયોજિત દિવ્ય ગર્ભયાત્રા સેમિનાર માટે તમારી ઇન્ક્વાયરી ID: ${item.inquiryId} બાબતે...`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-emerald-600 font-semibold hover:underline"
                                  title="WhatsApp"
                                >
                                  WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Payment Row */}
                          <div className="bg-slate-50 rounded-lg p-2 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] text-slate-400 font-semibold uppercase block">રકમ</span>
                              <strong className="text-xs font-bold text-slate-900">₹{item.amount}</strong>
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 font-semibold uppercase block">UTR નંબર</span>
                              {item.utr ? (
                                <span className={`font-mono text-xs ${item.isDuplicateUtr ? 'text-red-700 font-bold' : 'text-slate-700'}`}>
                                  {item.utr}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic text-xs">No UTR</span>
                              )}
                            </div>
                          </div>

                          {/* Bottom Action Bar */}
                          <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenInspect(item)}
                              className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-600" />
                              <span>રસીદ જુઓ</span>
                            </button>

                            {item.status !== 'approved' && (
                              <button
                                type="button"
                                onClick={() => handleApprove(item.inquiryId)}
                                disabled={actionLoading}
                                className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>એપ્રુવ કરો</span>
                              </button>
                            )}

                            {item.status === 'approved' && (
                              <Link
                                to={`/pass/${item.inquiryId}`}
                                target="_blank"
                                className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                                <span>પાસ</span>
                              </Link>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDelete(item.inquiryId)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: SETTINGS & QR CODE MANAGER
        ======================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            {/* Header */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  ઇવેન્ટ સેટિંગ્સ &amp; UPI QR કોડ
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  UPI ID, પ્રાઇસિંગ અને બેંક ખાતાની વિગતો અહીંથી બદલો.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveSettings}
                disabled={settingsSaving}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {settingsSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>સેવ થઈ રહ્યું છે...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>સેટિંગ્સ સાચવો (Save)</span>
                  </>
                )}
              </button>
            </div>

            {/* UPI & QR Gateway */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-slate-600" />
                <span>UPI પેમેન્ટ ગેટવે સેટઅપ</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">UPI ID (VPA)</label>
                  <input
                    type="text"
                    value={eventSettings.upiId}
                    onChange={(e) => setEventSettings({ ...eventSettings, upiId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">કપલ પેમેન્ટ કરશે તે UPI ID.</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payee Name</label>
                  <input
                    type="text"
                    value={eventSettings.payeeName}
                    onChange={(e) => setEventSettings({ ...eventSettings, payeeName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">બેંક ખાતા મુજબનું નામ.</span>
                </div>
              </div>

              {/* QR Upload & Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">લાઇવ QR કોડ પ્રિવ્યુ</span>
                  <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-center">
                    {previewQrUrl ? (
                      <img src={previewQrUrl} alt="QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <QrCode className="w-10 h-10 text-slate-300" />
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-semibold text-slate-800 block">કસ્ટમ QR કોડ ઈમેજ અપલોડ</span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    તમારો PhonePe/GPay QR કોડ અપલોડ કરવાથી સેમિનાર પેજ પર આ QR કોડ દેખાશે.
                  </p>
                  <input
                    ref={qrFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleQrUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => qrFileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-600" />
                    <span>QR ઈમેજ ફાઈલ પસંદ કરો</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Event Capacity */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">ક્ષમતા &amp; સપોર્ટ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">કુલ કપલ લિમિટ</label>
                  <input
                    type="number"
                    value={eventSettings.totalCoupleCapacity}
                    onChange={(e) => setEventSettings({ ...eventSettings, totalCoupleCapacity: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">રજીસ્ટ્રેશન સ્થિતિ</label>
                  <button
                    type="button"
                    onClick={() => setEventSettings({ ...eventSettings, isRegistrationOpen: !eventSettings.isRegistrationOpen })}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      eventSettings.isRegistrationOpen ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-red-50 text-red-700 border border-red-300'
                    }`}
                  >
                    {eventSettings.isRegistrationOpen ? 'ચાલુ છે (OPEN)' : 'બંધ છે (CLOSED)'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">સપોર્ટ વોટ્સએપ નંબર</label>
                  <input
                    type="text"
                    value={eventSettings.supportWhatsapp}
                    onChange={(e) => setEventSettings({ ...eventSettings, supportWhatsapp: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          3. PAYMENT SCREENSHOT & VERIFICATION MODAL
          (Fixed Desktop Dialog, Independent Left Scroll, Pinned Actions)
      ======================================================== */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white border-t sm:border border-slate-200 rounded-t-2xl sm:rounded-2xl max-w-5xl w-full h-[95vh] sm:h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800 shrink-0">
                  {inspectItem.inquiryId}
                </span>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                  {inspectItem.husbandName} &amp; {inspectItem.wifeName} {inspectItem.surname}
                </h3>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                  inspectItem.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  inspectItem.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {inspectItem.status}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setInspectItem(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer shrink-0"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Responsive Scroll (Scrollable on Mobile, Dual Column on Desktop) */}
            <div className="flex-1 overflow-y-auto lg:overflow-hidden p-3 sm:p-5 min-h-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 lg:h-full">
                {/* Left Column: Dedicated Vertical Phone Receipt Frame (7 cols) */}
                <div className="lg:col-span-7 flex flex-col space-y-2 lg:h-full lg:min-h-0 shrink-0">
                  <div className="flex items-center justify-between shrink-0">
                    <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>પેમેન્ટ સ્ક્રીનશોટ (Receipt)</span>
                    </span>

                    {/* Clean Simple Controls: Rotate, Zoom, Lightbox, Download */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setScreenshotRotation(prev => (prev + 90) % 360)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                        title="Rotate 90 degrees"
                      >
                        <RotateCw className="w-3 h-3 text-slate-600" />
                        <span>{screenshotRotation !== 0 ? `${screenshotRotation}°` : 'ફેરવો'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScreenshotZoom(prev => Math.min(prev + 0.25, 3))}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setScreenshotZoom(prev => Math.max(prev - 0.25, 0.75))}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      {(screenshotZoom !== 1 || screenshotRotation !== 0) && (
                        <button
                          type="button"
                          onClick={() => { setScreenshotZoom(1); setScreenshotRotation(0); }}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                          title="Reset"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {(inspectItem.paymentScreenshot || inspectItem.receiptUrl) && (
                        <button
                          type="button"
                          onClick={() => setLightboxImage({
                            url: resolveApiUrl(inspectItem.receiptUrl || inspectItem.paymentScreenshot),
                            title: `Payment Receipt - ${inspectItem.inquiryId}`
                          })}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                          title="Fullscreen Lightbox"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Natural Full Portrait Receipt Frame: Independent Smooth Scroll */}
                  <div className="w-full h-72 sm:h-80 lg:h-full lg:min-h-0 rounded-xl bg-slate-100 border border-slate-200 overflow-y-auto overflow-x-hidden p-3 flex flex-col items-center">
                    {inspectItem.paymentScreenshot || inspectItem.receiptUrl ? (
                      <div
                        onClick={() => setLightboxImage({
                          url: resolveApiUrl(inspectItem.receiptUrl || inspectItem.paymentScreenshot),
                          title: `Payment Receipt - ${inspectItem.inquiryId}`
                        })}
                        className="w-full max-w-[340px] bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden transition-transform duration-200 my-auto cursor-zoom-in group"
                        title="Click to view in fullscreen lightbox"
                        style={{
                          transform: `scale(${screenshotZoom}) rotate(${screenshotRotation}deg)`,
                          transformOrigin: 'top center'
                        }}
                      >
                        <img
                          src={resolveApiUrl(inspectItem.receiptUrl || inspectItem.paymentScreenshot)}
                          alt="Payment Receipt"
                          className="w-full h-auto object-contain block select-none bg-white group-hover:opacity-95 transition-opacity"
                        />
                      </div>
                    ) : (
                      <div className="my-auto text-center text-slate-400 text-xs">
                        આ એન્ટ્રી માટે કોઈ રસીદ અપલોડ થયેલ નથી.
                      </div>
                    )}
                  </div>

                  {/* Direct Link and instructions */}
                  {(inspectItem.paymentScreenshot || inspectItem.receiptUrl) && (
                    <div className="flex justify-between items-center text-xs shrink-0 pt-0.5">
                      <span className="text-[11px] text-slate-400">
                        💡 ટેપ કરીને ફુલસ્ક્રીન જુઓ અથવા ડાઉનલોડ કરો.
                      </span>
                      <a
                        href={resolveApiUrl(inspectItem.receiptUrl || inspectItem.paymentScreenshot)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-800 hover:underline font-semibold flex items-center gap-1 shrink-0"
                      >
                        <Download className="w-3 h-3 text-slate-600" />
                        <span>ડાઉનલોડ</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column: Verification Data, OCR & Actions (5 cols) */}
                <div className="lg:col-span-5 flex flex-col space-y-3 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:pr-1">
                  {/* Registered Timestamp */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>રજીસ્ટ્રેશન સમય (IST)</span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <strong className="font-semibold text-slate-900">{formatISTDateTime(inspectItem.createdAt)}</strong>
                      <span className="text-[11px] text-slate-500">{formatTimeAgo(inspectItem.createdAt)}</span>
                    </div>
                  </div>

                  {/* Couple Info Card: Clicking photo opens Couple Photo Modal */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleOpenCouplePhoto(e, inspectItem)}
                      className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 cursor-pointer hover:ring-2 hover:ring-slate-400 transition-all group"
                      title="કપલ ફોટો મોટો જોવા ક્લિક કરો"
                    >
                      {inspectItem.couplePhoto ? (
                        <img
                          src={resolveApiUrl(inspectItem.couplePhoto)}
                          alt="Couple"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-600 text-xs">
                          {inspectItem.husbandName?.slice(0, 1)}{inspectItem.wifeName?.slice(0, 1)}
                        </div>
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <strong className="text-xs font-semibold text-slate-900 block truncate">
                        {inspectItem.husbandName} &amp; {inspectItem.wifeName} {inspectItem.surname}
                      </strong>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`tel:+91${inspectItem.phoneNumber}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded hover:bg-slate-50"
                        >
                          <Phone className="w-2.5 h-2.5 text-slate-500" />
                          <span>+91 {inspectItem.phoneNumber}</span>
                        </a>
                        <a
                          href={`https://wa.me/91${inspectItem.phoneNumber}?text=${encodeURIComponent(`નમસ્તે ${inspectItem.husbandName}જી, The Divine Garbh Sanskar દ્વારા આયોજિત દિવ્ય ગર્ભયાત્રા સેમિનાર માટે તમારી ઇન્ક્વાયરી ID: ${inspectItem.inquiryId} બાબતે...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 font-semibold px-2 py-0.5 rounded hover:bg-emerald-100"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Transaction & UTR Audit */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-600 block text-[11px] uppercase tracking-wide">
                      ટ્રાન્ઝેક્શન વિગત
                    </span>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200">
                      <span className="text-slate-500">રકમ:</span>
                      <strong className="text-slate-900 font-bold text-sm">
                        ₹{inspectItem.amount} <span className="text-xs text-slate-400 font-normal">({inspectItem.tierName || `Tier ${inspectItem.tier}`})</span>
                      </strong>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200">
                      <span className="text-slate-500">UTR નંબર:</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono font-semibold ${inspectItem.isDuplicateUtr ? 'text-red-700' : 'text-slate-900'}`}>
                          {inspectItem.utr || 'Not detected'}
                        </span>
                        {inspectItem.utr && (
                          <button
                            type="button"
                            onClick={() => handleCopy(inspectItem.utr, 'UTR')}
                            className="p-0.5 hover:bg-slate-200 rounded"
                            title="Copy UTR"
                          >
                            <Copy className="w-3 h-3 text-slate-400" />
                          </button>
                        )}
                      </div>
                    </div>

                    {inspectItem.isDuplicateUtr && (
                      <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] font-medium flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>ચેતવણી: આ UTR નંબર પહેલેથી જ વપરાયેલ છે! (DUPLICATE)</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-500">પેમેન્ટ મોડ:</span>
                      <span className="font-medium text-slate-900">
                        {inspectItem.paymentMethod || 'UPI'}
                      </span>
                    </div>
                  </div>

                  {/* Admin Notes Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-700">એડમિન નોટ</label>
                      <button
                        type="button"
                        onClick={handleSaveNote}
                        disabled={savingNote}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800 cursor-pointer"
                      >
                        {savingNote ? 'સેવિંગ...' : 'સાચવો'}
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      placeholder="અહીં નોંધ લખો (e.g. બેંક સ્ટેટમેન્ટ ચેક કર્યું)..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* Reject Reason Field */}
                  {showRejectBox && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-2">
                      <label className="block text-xs font-semibold text-red-900">રિજેક્શનનું કારણ:</label>
                      <input
                        type="text"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="e.g. અમાન્ય UTR / પેમેન્ટ મળેલ નથી..."
                        className="w-full bg-white border border-red-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowRejectBox(false)}
                          className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(inspectItem.inquiryId)}
                          className="px-3 py-1 bg-red-700 text-white text-xs font-semibold rounded-lg"
                        >
                          Confirm Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions (Sticky Bottom, Mobile-Friendly) */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0 z-10 sticky bottom-0">
              <button
                type="button"
                onClick={() => {
                  setFakeTargetItem(inspectItem);
                  setShowFakeModal(true);
                }}
                className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer order-2 sm:order-1"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                <span>ફેક / ફ્રોડ ફ્લેગ કરો</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
                {inspectItem.status !== 'rejected' && !showRejectBox && (
                  <button
                    type="button"
                    onClick={() => setShowRejectBox(true)}
                    className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-lg bg-slate-200 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-semibold transition-all cursor-pointer min-h-[42px]"
                  >
                    રિજેક્ટ કરો
                  </button>
                )}

                {inspectItem.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => handleApprove(inspectItem.inquiryId)}
                    disabled={actionLoading}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px]"
                  >
                    <Check className="w-4 h-4 text-white" />
                    <span>એપ્રુવ કરો &amp; પાસ આપો</span>
                  </button>
                )}

                {inspectItem.status === 'approved' && (
                  <Link
                    to={`/pass/${inspectItem.inquiryId}`}
                    target="_blank"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-2xs flex items-center justify-center gap-1.5 min-h-[42px]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                    <span>ડિજિટલ પાસ જુઓ</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. DEDICATED COUPLE PHOTO MODAL (BLURRED BACKDROP, CLICK OUTSIDE TO CLOSE)
      ======================================================== */}
      {couplePhotoModal && (
        <div
          onClick={() => setCouplePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-3.5 sm:p-5 space-y-2.5 cursor-default border border-slate-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  {couplePhotoModal.id}
                </span>
                <h3 className="font-bold text-sm text-slate-900 truncate">
                  {couplePhotoModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCouplePhotoModal(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Couple Photo Container */}
            <div className="w-full flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden p-2">
              <img
                src={couplePhotoModal.url}
                alt={couplePhotoModal.name}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>સંપર્ક: +91 {couplePhotoModal.phone}</span>
              <span className="text-[11px] text-slate-400">💡 બહાર ખાલી જગ્યા પર ક્લિક કરવાથી બંધ થશે</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          5. MANUAL / OFFLINE ENTRY MODAL
      ======================================================== */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-3 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-xl p-4 sm:p-5 space-y-3.5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">નવી ઓફલાઇન / મેન્યુઅલ એન્ટ્રી</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">પતિનું નામ *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.husbandName}
                    onChange={(e) => setManualForm({ ...manualForm, husbandName: e.target.value })}
                    placeholder="Rahul"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">પત્નીનું નામ *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.wifeName}
                    onChange={(e) => setManualForm({ ...manualForm, wifeName: e.target.value })}
                    placeholder="Pooja"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">અટક *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.surname}
                    onChange={(e) => setManualForm({ ...manualForm, surname: e.target.value })}
                    placeholder="Patel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">મોબાઇલ નંબર (10 આંકડા) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={manualForm.phoneNumber}
                    onChange={(e) => setManualForm({ ...manualForm, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
                    placeholder="9876543210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">રકમ (₹)</label>
                  <input
                    type="number"
                    value={manualForm.amount}
                    onChange={(e) => setManualForm({ ...manualForm, amount: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">પેમેન્ટ મોડ</label>
                  <select
                    value={manualForm.paymentMethod}
                    onChange={(e) => setManualForm({ ...manualForm, paymentMethod: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="CASH">કેશ / રોકડા (Cash)</option>
                    <option value="UPI">ડાયરેક્ટ UPI</option>
                    <option value="VIP">VIP ગેસ્ટ (Complimentary)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">UTR નંબર</label>
                  <input
                    type="text"
                    value={manualForm.utr}
                    onChange={(e) => setManualForm({ ...manualForm, utr: e.target.value })}
                    placeholder="Optional UTR..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">સ્ટેટસ</label>
                  <select
                    value={manualForm.status}
                    onChange={(e) => setManualForm({ ...manualForm, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="approved">Approved (પાસ ઇસ્યુ થશે)</option>
                    <option value="pending">Pending (બાકી)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">એડમિન નોટ</label>
                <input
                  type="text"
                  value={manualForm.adminNotes}
                  onChange={(e) => setManualForm({ ...manualForm, adminNotes: e.target.value })}
                  placeholder="e.g. હોલ પર કેશ મળ્યા..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="w-1/2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={manualSubmitting}
                  className="w-1/2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {manualSubmitting ? 'સેવિંગ...' : 'રજીસ્ટ્રેશન સેવ કરો'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          6. FLAG AS FAKE MODAL
      ======================================================== */}
      {showFakeModal && fakeTargetItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-3 animate-fade-in">
          <div className="bg-white border border-red-200 rounded-2xl max-w-sm w-full shadow-xl p-4 sm:p-5 space-y-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">ફેક / ફ્રોડ એન્ટ્રી ફ્લેગ કરો</h3>
              <p className="text-xs text-slate-500">
                ઇન્ક્વાયરી <span className="font-mono font-semibold text-slate-900">{fakeTargetItem.inquiryId}</span> રિજેક્ટ થશે અને પાસ બ્લોક થશે.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">કારણ (Fraud Reason):</label>
              <select
                value={fakeReasonText}
                onChange={(e) => setFakeReasonText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-medium focus:outline-none"
              >
                <option value="ખોટો / એડિટ કરેલ પેમેન્ટ સ્ક્રીનશોટ (Fake Receipt)">ખોટો / એડિટ કરેલ પેમેન્ટ સ્ક્રીનશોટ</option>
                <option value="ડુપ્લિકેટ UTR નંબર (પહેલેથી વપરાયેલ)">ડુપ્લિકેટ UTR નંબર</option>
                <option value="બેંક ખાતામાં રકમ જમા થયેલ નથી">બેંક ખાતામાં રકમ જમા થયેલ નથી</option>
                <option value="રસીદમાં રકમ મેળ ખાતી નથી">રસીદમાં રકમ મેળ ખાતી નથી</option>
              </select>
            </div>

            <div className="flex gap-2 pt-1.5">
              <button
                type="button"
                onClick={() => {
                  setShowFakeModal(false);
                  setFakeTargetItem(null);
                }}
                className="w-1/2 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmFlagFake}
                disabled={actionLoading}
                className="w-1/2 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold shadow-2xs cursor-pointer"
              >
                {actionLoading ? 'પ્રોસેસિંગ...' : 'કન્ફર્મ ફ્લેગ & રિજેક્ટ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          7. FULLSCREEN RECEIPT LIGHTBOX (BLURRED BACKDROP, CLICK OUTSIDE TO CLOSE)
      ======================================================== */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-3 sm:p-4 cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between text-white py-1 px-1 sm:px-2"
          >
            <span className="text-xs font-medium truncate pr-4">{lightboxImage.title}</span>
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-1 sm:p-2">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-h-[85vh] max-w-[95vw] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="text-center text-slate-400 text-xs pb-1">
            💡 ખાલી જગ્યા પર ક્લિક કરવાથી વિન્ડો બંધ થશે
          </div>
        </div>
      )}
    </div>
  );
}
