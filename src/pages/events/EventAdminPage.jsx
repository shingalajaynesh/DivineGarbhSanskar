import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import QRCode from 'qrcode';
import { 
  Lock, Unlock, CheckCircle2, XCircle, Search, RefreshCw, Download, 
  ExternalLink, Eye, EyeOff, Trash2, Camera, Settings, Users, 
  IndianRupee, ShieldAlert, ShieldCheck, Shield, LogOut, Check, X, 
  AlertTriangle, QrCode, Upload, Calendar, Clock, MapPin, 
  Phone, MessageCircle, Sliders, Database, Crown, Copy, ZoomIn, 
  Share2, ChevronRight, Sparkles
} from 'lucide-react';

import { API_BASE } from '../../utils/apiConfig';

export default function EventAdminPage({ defaultRole }) {
  const location = useLocation();
  const isSuperAdminRoute = location.pathname.includes('superadmin') || defaultRole === 'superadmin';

  // Session Authentication
  const [password, setPassword] = useState(() => sessionStorage.getItem('divineAdminPassword') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // 'admin' | 'superadmin'
  const [authError, setAuthError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab: 'registrations' | 'settings'
  const [activeTab, setActiveTab] = useState('registrations');

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

  // Fullscreen Lightbox for payment screenshot / couple photo zoom
  const [lightboxImage, setLightboxImage] = useState(null); // { url, title }
  const [copiedNotification, setCopiedNotification] = useState('');

  // Dynamic Settings State
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsToast, setSettingsToast] = useState({ type: '', message: '' });

  // Event Settings Fields
  const [eventSettings, setEventSettings] = useState({
    title: 'દિવ્ય ગર્ભયાત્રા',
    subtitle: 'Couple Seminar • The Divine Garbh Sanskar',
    dateGujarati: '19 December 2026, શનિવાર',
    dateIso: '2026-12-19',
    time: 'રાત્રે 8:30 PM થી 12:00 PM',
    venue: 'જમના બા ભવન, સુરત',
    venueAddress: 'Jamna Baa Bhavan, Surat, Gujarat',
    venueMapUrl: '',
    speaker: 'નેહલ ગઢવી',
    speakerTitle: 'Life Coach & Garbh Sanskar Expert',
    speakerBio: 'Vedic Prenatal Science Guide & Inspirational Speaker',
    upiId: 'jayneshshingala2005-2@okicici',
    payeeName: 'Shingala Jaynesh',
    customQrImage: '/events/divy-garbhyatra/primary-upi-qr.jpg',
    useCustomQr: true,
    upiAccounts: [
      {
        id: '1',
        upiId: 'jayneshshingala2005-2@okicici',
        payeeName: 'Shingala Jaynesh',
        customQrImage: '/events/divy-garbhyatra/primary-upi-qr.jpg',
        limit: 50,
        bookingsCount: 0,
        isActive: true
      }
    ],
    autoRotateUpi: true,
    upiRollingThreshold: 50,
    activeUpiIndex: 0,
    totalCoupleCapacity: 250,
    supportPhone: '+91 94285 24890',
    supportWhatsapp: '919586979897',
    isRegistrationOpen: true,
    registrationClosedNotice: 'દિલગીર છીએ, આ ઇવેન્ટનું રજીસ્ટ્રેશન હાલ પૂર્ણ થયેલ છે.',
    passNotice: 'કૃપા કરીને સમયસર પહોંચવું. ગેટ પર ડિજિટલ પાસ QR કોડ બતાવવો ફરજિયાત છે.',
    tiers: [
      { tierNumber: 1, name: 'Early Access (પહેલા 50 કપલ માટે)', minCouple: 1, maxCouple: 50, price: 600 },
      { tierNumber: 2, name: 'Phase 2 (51 થી 250 કપલ માટે)', minCouple: 51, maxCouple: 250, price: 900 }
    ]
  });

  // Dynamic QR Preview in Settings
  const [previewQrUrl, setPreviewQrUrl] = useState('');
  const qrFileInputRef = useRef(null);

  // Super Admin Reset Modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [resettingData, setResettingData] = useState(false);

  // Copy helper with visual toast
  const handleCopyText = (text, label = 'કોપી થયું!') => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      setCopiedNotification(label);
      setTimeout(() => setCopiedNotification(''), 2200);
    } catch {
      // Fallback
    }
  };

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
        fetchSettings(p);
      } else {
        setAuthError(data.error || 'ખોટો પાસવર્ડ! કૃપા કરીને સાચો પાસવર્ડ નાખો.');
        sessionStorage.removeItem('divineAdminPassword');
      }
    } catch {
      setAuthError('સર્વર સાથે જોડાણ થઈ શક્યું નથી. કૃપા કરીને થોડીવાર પછી પ્રયત્ન કરો.');
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
        headers: { 'Authorization': activePass }
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

  // Fetch Settings
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
        setEventSettings((prev) => ({
          ...prev,
          ...json.setting
        }));
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setSettingsLoading(false);
    }
  };

  // Generate Preview QR in settings whenever UPI info changes
  useEffect(() => {
    if (eventSettings.useCustomQr && eventSettings.customQrImage) {
      setPreviewQrUrl(eventSettings.customQrImage);
      return;
    }

    const testPrice = eventSettings.tiers?.[0]?.price || 900;
    const upiUri = `upi://pay?pa=${encodeURIComponent(eventSettings.upiId)}&pn=${encodeURIComponent(eventSettings.payeeName)}&am=${testPrice}&cu=INR&tn=Divya%20Garbh%20Yatra%20Couple%20Pass`;
    
    QRCode.toDataURL(upiUri, {
      margin: 1,
      width: 260,
      color: { dark: '#120208', light: '#FFFFFF' }
    }).then((url) => {
      setPreviewQrUrl(url);
    }).catch(() => {
      // Fallback
    });
  }, [eventSettings.upiId, eventSettings.payeeName, eventSettings.useCustomQr, eventSettings.customQrImage, eventSettings.tiers]);

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

  // Custom QR Image Upload handler
  const handleQrFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('કૃપા કરીને માન્ય ઈમેજ ફાઈલ (JPG અથવા PNG) પસંદ કરો.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (base64) {
        setEventSettings((prev) => ({
          ...prev,
          customQrImage: base64,
          useCustomQr: true
        }));
        setPreviewQrUrl(base64);
        setSettingsToast({ type: 'success', message: 'કસ્ટમ QR કોડ પસંદ થયો! સેટિંગ્સ સેવ કરવાનું ભૂલશો નહીં.' });
      }
    };
    reader.readAsDataURL(file);
  };

  // Tier pricing input change handler
  const handleTierChange = (index, field, value) => {
    setEventSettings((prev) => {
      const updatedTiers = [...prev.tiers];
      updatedTiers[index] = {
        ...updatedTiers[index],
        [field]: field === 'price' || field === 'minCouple' || field === 'maxCouple' ? Number(value) : value
      };
      return { ...prev, tiers: updatedTiers };
    });
  };

  const handleAddTier = () => {
    setEventSettings((prev) => {
      const currentTiers = prev.tiers || [];
      const nextNum = currentTiers.length + 1;
      const lastTier = currentTiers[currentTiers.length - 1];
      const min = lastTier ? lastTier.maxCouple + 1 : 1;
      const max = min + 49;
      return {
        ...prev,
        tiers: [
          ...currentTiers,
          { tierNumber: nextNum, name: `Phase ${nextNum}`, minCouple: min, maxCouple: max, price: 1000 }
        ]
      };
    });
  };

  const handleRemoveTier = (idx) => {
    if ((eventSettings.tiers?.length || 0) <= 1) {
      alert('ઓછામાં ઓછો એક પ્રાઇસિંગ સ્લેબ હોવો જરૂરી છે.');
      return;
    }
    setEventSettings((prev) => ({
      ...prev,
      tiers: prev.tiers.filter((_, i) => i !== idx).map((t, i) => ({ ...t, tierNumber: i + 1 }))
    }));
  };

  // Multi-UPI Account Pool Handlers
  const handleAddUpiAccount = () => {
    const newAccount = {
      id: Date.now().toString(),
      upiId: '',
      payeeName: 'Shingala Jaynesh',
      customQrImage: '',
      limit: 50,
      bookingsCount: 0,
      isActive: true
    };
    setEventSettings((prev) => ({
      ...prev,
      upiAccounts: [...(prev.upiAccounts || []), newAccount]
    }));
  };

  const handleRemoveUpiAccount = (idx) => {
    if ((eventSettings.upiAccounts?.length || 0) <= 1) {
      alert('ઓછામાં ઓછું એક પ્રાથમિક UPI એકાઉન્ટ હોવું જરૂરી છે.');
      return;
    }
    setEventSettings((prev) => ({
      ...prev,
      upiAccounts: prev.upiAccounts.filter((_, i) => i !== idx)
    }));
  };

  const handleUpiAccountChange = (idx, field, value) => {
    setEventSettings((prev) => {
      const updated = [...(prev.upiAccounts || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, upiAccounts: updated };
    });
  };

  // Save All Settings Dynamically to Database
  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    setSettingsSaving(true);
    setSettingsToast({ type: '', message: '' });

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
        setSettingsToast({ type: 'success', message: 'તમામ સેટિંગ્સ ડેટાબેઝમાં સફળતાપૂર્વક સાચવવામાં આવ્યા!' });
        if (json.setting) setEventSettings(json.setting);
        setTimeout(() => setSettingsToast({ type: '', message: '' }), 4000);
      } else {
        setSettingsToast({ type: 'error', message: json.error || 'સેટિંગ્સ સેવ કરવામાં ભૂલ આવી.' });
      }
    } catch {
      setSettingsToast({ type: 'error', message: 'સર્વર સાથે જોડાણ થઈ શક્યું નથી.' });
    } finally {
      setSettingsSaving(false);
    }
  };

  // Super Admin Reset Database to Zero
  const handleSuperReset = async () => {
    if (resetConfirmText !== 'RESET-ZERO') {
      alert('કૃપા કરીને કન્ફર્મ કરવા માટે RESET-ZERO લખો.');
      return;
    }
    setResettingData(true);
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
    } catch {
      alert('રીસેટ કરવામાં ભૂલ આવી.');
    } finally {
      setResettingData(false);
    }
  };

  // Quick stat filter change
  const handleStatCardClick = (filterKey) => {
    setActiveFilter(filterKey);
    fetchRegistrations(password, filterKey, searchQuery);
  };

  // ==========================================
  // LOGIN SCREEN (MOBILE-FIRST LUXURY THEME)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col justify-between items-center p-3.5 sm:p-6 relative overflow-hidden font-sans">
        <Helmet>
          <title>Admin Portal - The Divine Garbh Sanskar</title>
        </Helmet>

        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[300px] bg-gradient-to-b from-rose-200/40 via-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[250px] bg-gradient-to-t from-rose-100/30 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <header className="w-full max-w-md pt-2 sm:pt-6 flex items-center justify-between z-10">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="The Divine Garbh Sanskar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-md shrink-0"
            />
            <span className="font-extrabold text-stone-900 text-xs sm:text-sm tracking-tight font-serif truncate">
              The Divine Garbh Sanskar
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 tracking-wider">
              Secure Ops
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-md">
              v2.5
            </span>
          </div>
        </header>

        {/* Central Luxury Login Card */}
        <main className="max-w-md w-full my-auto z-10 py-4 sm:py-6 space-y-4">
          <div className="bg-white border border-stone-200/90 rounded-3xl p-5 sm:p-8 shadow-xl shadow-stone-200/60 space-y-5">
            <div className="text-center space-y-1.5">
              <div className={`inline-flex p-3 rounded-2xl border shadow-xs mb-1 ${
                isSuperAdminRoute 
                  ? 'bg-purple-50 border-purple-200 text-purple-800' 
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                {isSuperAdminRoute ? <Crown className="w-6 h-6 sm:w-7 sm:h-7" /> : <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-serif">
                {isSuperAdminRoute ? 'Super Admin Console' : 'Event Admin Operations'}
              </h1>
              <p className="text-xs text-stone-500 font-medium leading-relaxed px-2">
                {isSuperAdminRoute 
                  ? 'દિવ્ય ગર્ભયાત્રા • સંપૂર્ણ કંટ્રોલ અને ડેટાબેઝ રીસેટ અધિકાર' 
                  : 'દિવ્ય ગર્ભયાત્રા • કપલ સેમિનાર વેરિફિકેશન & ડેશબોર્ડ'}
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  એડમિન / સુપર એડમિન પાસવર્ડ
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="પાસવર્ડ દાખલ કરો..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm focus:outline-none focus:border-rose-700 focus:bg-white transition-all pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] text-stone-400 block mt-1.5">
                  * રોલ (Admin અથવા Super Admin) પાસવર્ડ મુજબ આપમેળે નક્કી થશે.
                </span>
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-800 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-extrabold text-sm shadow-lg shadow-rose-900/15 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>ચકાસણી ચાલુ છે...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>લૉગિન કરો (Sign In)</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <Link to="/divy-garbhyatra" className="hover:text-rose-700 font-medium transition-colors">
                ← ઇવેન્ટ પેજ
              </Link>
              <div className="flex items-center gap-3">
                {isSuperAdminRoute ? (
                  <Link to="/admin" className="text-rose-700 hover:text-rose-900 font-bold">
                    એડમિન (/admin)
                  </Link>
                ) : (
                  <Link to="/superadmin" className="text-purple-700 hover:text-purple-900 font-bold">
                    સુપર એડમિન (/superadmin)
                  </Link>
                )}
                <Link to="/scanner" className="text-stone-700 hover:text-stone-900 font-bold flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-lg">
                  <Camera className="w-3.5 h-3.5 text-purple-700" />
                  <span>સ્કેનર</span>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full max-w-md pb-2 text-center text-[10px] sm:text-[11px] text-stone-400">
          The Divine Garbh Sanskar • Event Operations System
        </footer>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED DASHBOARD (MOBILE-FIRST)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans antialiased pb-28 sm:pb-20">
      <Helmet>
        <title>
          {role === 'superadmin' ? 'Super Admin Console' : 'Event Operations'} - The Divine Garbh Sanskar
        </title>
      </Helmet>

      {/* Copied Notification Toast */}
      {copiedNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5 animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Top Mobile-Optimized Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/90 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          {/* Brand & Role */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link to="/divy-garbhyatra" className="flex items-center gap-2 shrink-0">
              <img
                src="/logo.jpg"
                alt="The Divine Garbh Sanskar"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-0.5 bg-white object-contain border border-amber-400 shadow-md shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-black text-stone-900 block font-serif tracking-tight leading-tight truncate">
                  દિવ્ય ગર્ભયાત્રા
                </span>
                <span className="text-[9px] sm:text-[10px] text-stone-500 font-semibold block font-sans truncate">
                  {role === 'superadmin' ? 'Super Admin Portal' : 'Admin Portal'}
                </span>
              </div>
            </Link>

            {/* Role Badge */}
            <span className={`text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border flex items-center gap-1 shrink-0 ${
              role === 'superadmin' 
                ? 'bg-purple-50 border-purple-200 text-purple-900 ring-1 ring-purple-300' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {role === 'superadmin' ? (
                <>
                  <Crown className="w-3 h-3 text-purple-700" />
                  <span className="hidden xs:inline">Super Admin</span>
                  <span className="xs:hidden">Super</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3 h-3 text-rose-700" />
                  <span>Admin</span>
                </>
              )}
            </span>

            {/* Live Database Status (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Database Connected</span>
            </div>
          </div>

          {/* Quick Actions (Desktop Tabs & Mobile Icons) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop Tabs */}
            <div className="hidden sm:flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('registrations')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'registrations' 
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200/60' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>રજીસ્ટ્રેશન ({stats.total})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'settings' 
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200/60' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>સેટિંગ્સ &amp; QR કોડ</span>
              </button>
            </div>

            {/* Gate Scanner Quick Button (Available on BOTH mobile and desktop) */}
            <Link
              to="/scanner"
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs shrink-0"
              title="ઓપન ગેટ પાસ સ્કેનર"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ગેટ સ્કેનર</span>
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 sm:p-2 text-stone-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Viewport Secondary Tab Bar (Under Header) */}
        <div className="sm:hidden px-3.5 py-1.5 bg-stone-50 border-t border-stone-200/80 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('registrations')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'registrations'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>રજીસ્ટ્રેશન ({stats.total})</span>
            {stats.pending > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>સેટિંગ્સ &amp; QR</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6 space-y-4 sm:space-y-6">

        {/* Super Admin Status Banner (if Super Admin role active) */}
        {role === 'superadmin' && (
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Crown className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-bold block font-serif">
                  સુપર એડમિન મોડ સક્રિય (Super Admin Privileges)
                </strong>
                <span className="text-[10px] sm:text-xs text-purple-200 block">
                  તમારી પાસે ડેટાબેઝ વાઇપ, QR કોડ અને તમામ સિસ્ટમ સેટિંગ્સ બદલવાના સંપૂર્ણ અધિકારો છે.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveTab('settings');
                setTimeout(() => {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }, 100);
              }}
              className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-[10px] sm:text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              ડેન્જર ઝોન ↓
            </button>
          </div>
        )}

        {/* ========================================================
            INTERACTIVE STAT OVERVIEW CARDS (TAP TO FILTER ON MOBILE)
        ======================================================== */}
        <section className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
              લાઇવ મેટ્રિક્સ (Tap Card to Filter)
            </span>
            <span className="text-[10px] text-stone-400">
              લક્ષ્યાંક: {eventSettings.totalCoupleCapacity || 250} કપલ
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {/* 1. Total Registrations */}
            <div
              onClick={() => handleStatCardClick('all')}
              className={`bg-white border rounded-2xl p-3 sm:p-4 shadow-xs cursor-pointer transition-all active:scale-[0.98] ${
                activeFilter === 'all'
                  ? 'border-rose-700 ring-2 ring-rose-600/20 bg-rose-50/20'
                  : 'border-stone-200/90 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase text-stone-500 tracking-wider">
                  કુલ રજીસ્ટ્રેશન
                </span>
                {activeFilter === 'all' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-700" />
                )}
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <strong className="text-xl sm:text-2xl font-black text-stone-900">
                  {stats.total}
                </strong>
                <span className="text-[9px] sm:text-[10px] text-stone-400 font-semibold">
                  / {eventSettings.totalCoupleCapacity || 250}
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-1 mt-1.5 overflow-hidden">
                <div 
                  className="bg-rose-700 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, ((stats.total) / (eventSettings.totalCoupleCapacity || 250)) * 100)}%` }}
                />
              </div>
            </div>

            {/* 2. Verification Pending */}
            <div
              onClick={() => handleStatCardClick('pending')}
              className={`bg-white border rounded-2xl p-3 sm:p-4 shadow-xs cursor-pointer transition-all active:scale-[0.98] ${
                activeFilter === 'pending'
                  ? 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/30'
                  : 'border-stone-200/90 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase text-amber-700 tracking-wider">
                  પેન્ડિંગ વેરિફિકેશન
                </span>
                {stats.pending > 0 && (
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-extrabold animate-pulse">
                    Action
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-xl sm:text-2xl font-black text-amber-700">
                  {stats.pending}
                </strong>
              </div>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-1 truncate">
                ચકાસણી બાકી સ્લોટ્સ
              </span>
            </div>

            {/* 3. Approved Passes */}
            <div
              onClick={() => handleStatCardClick('approved')}
              className={`bg-white border rounded-2xl p-3 sm:p-4 shadow-xs cursor-pointer transition-all active:scale-[0.98] ${
                activeFilter === 'approved'
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/30'
                  : 'border-stone-200/90 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                  એપ્રુવ્ડ પાસ
                </span>
                {activeFilter === 'approved' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-xl sm:text-2xl font-black text-emerald-700">
                  {stats.approved}
                </strong>
              </div>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-1 truncate">
                માન્ય ડિજિટલ પાસ
              </span>
            </div>

            {/* 4. Gate Entry (Checked-In) */}
            <div
              onClick={() => {
                // Focus gate scanner or filter
                setActiveFilter('approved');
                fetchRegistrations(password, 'approved', searchQuery);
              }}
              className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 shadow-xs cursor-pointer hover:border-stone-300 transition-all active:scale-[0.98]"
            >
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-blue-700 block tracking-wider truncate">
                ગેટ એન્ટ્રી (In Hall)
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-xl sm:text-2xl font-black text-blue-700">
                  {stats.checkedIn}
                </strong>
              </div>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-1 truncate">
                હોલમાં હાજર કપલ
              </span>
            </div>

            {/* 5. Rejected */}
            <div
              onClick={() => handleStatCardClick('rejected')}
              className={`bg-white border rounded-2xl p-3 sm:p-4 shadow-xs cursor-pointer transition-all active:scale-[0.98] ${
                activeFilter === 'rejected'
                  ? 'border-rose-600 ring-2 ring-rose-500/20 bg-rose-50/30'
                  : 'border-stone-200/90 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase text-stone-500 tracking-wider">
                  રિજેક્ટ થયેલા
                </span>
                {activeFilter === 'rejected' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-xl sm:text-2xl font-black text-rose-700">
                  {stats.rejected}
                </strong>
              </div>
              <span className="text-[9px] sm:text-[10px] text-stone-400 block mt-1 truncate">
                અમાન્ય પેમેન્ટ
              </span>
            </div>

            {/* 6. Total Revenue */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 shadow-xs bg-gradient-to-br from-amber-50/60 to-white">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-amber-900 block tracking-wider">
                કુલ આવક (Revenue)
              </span>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="text-xs sm:text-sm font-bold text-amber-800">₹</span>
                <strong className="text-lg sm:text-2xl font-black text-stone-900 truncate">
                  {stats.totalRevenue.toLocaleString('en-IN')}
                </strong>
              </div>
              <span className="text-[9px] sm:text-[10px] text-amber-700 font-semibold block mt-1 truncate">
                એપ્રુવ્ડ પાસમાંથી
              </span>
            </div>
          </div>
        </section>

        {/* ==========================================
            TAB 1: REGISTRATIONS MANAGEMENT
        =========================================== */}
        {activeTab === 'registrations' && (
          <div className="space-y-3 sm:space-y-4">
            {/* Mobile Filter Pills + Search Toolbar */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
              {/* Horizontal Filter Scroll Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                {[
                  { key: 'all', label: 'તમામ (All)', count: stats.total },
                  { key: 'pending', label: 'પેન્ડિંગ (Pending)', count: stats.pending },
                  { key: 'approved', label: 'એપ્રુવ્ડ (Approved)', count: stats.approved },
                  { key: 'rejected', label: 'રિજેક્ટ (Rejected)', count: stats.rejected }
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => {
                      setActiveFilter(f.key);
                      fetchRegistrations(password, f.key, searchQuery);
                    }}
                    className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      activeFilter === f.key
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'bg-stone-50 border border-stone-200/80 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      activeFilter === f.key ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Bar & Mobile Action Buttons */}
              <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      fetchRegistrations(password, activeFilter, e.target.value);
                    }}
                    placeholder="નામ, CPL-ID, મોબાઇલ, UTR..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-8 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        fetchRegistrations(password, activeFilter, '');
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* CSV Download */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
                  title="Export Attendees to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CSV એક્સપોર્ટ</span>
                </button>

                {/* Refresh */}
                <button
                  type="button"
                  onClick={() => fetchRegistrations(password, activeFilter, searchQuery)}
                  className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all cursor-pointer shrink-0"
                  title="રીફ્રેશ કરો"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingList ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Registrations List (Mobile Cards Layout) */}
            {loadingList ? (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-10 text-center text-stone-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-rose-700" />
                <p className="text-xs font-semibold">ડેટા લોડ થઈ રહ્યો છે...</p>
              </div>
            ) : registrations.length === 0 ? (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-10 text-center text-stone-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-stone-300" />
                <h3 className="text-sm font-bold text-stone-700">કોઈ રજીસ્ટ્રેશન મળ્યું નથી</h3>
                <p className="text-xs">પસંદ કરેલ ફિલ્ટર અથવા સર્ચ ક્વેરી મુજબ કોઈ રેકોર્ડ ઉપલબ્ધ નથી.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((item) => (
                  <div
                    key={item.inquiryId}
                    className="bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all space-y-3"
                  >
                    {/* Top Row: Inquiry ID + Status Badge + Gate Tag + Price */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[11px] font-black px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-800">
                          {item.inquiryId}
                        </span>
                        <span className={`text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                          item.status === 'approved'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : item.status === 'rejected'
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}>
                          {item.status === 'approved' ? 'Approved' : item.status === 'rejected' ? 'Rejected' : 'Pending'}
                        </span>
                        {item.attendance?.checkedIn && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800">
                            Checked-In
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-black text-amber-950 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                          ₹{item.amount}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.inquiryId)}
                          className="p-1 text-stone-300 hover:text-rose-700 transition-colors"
                          title="ડિલીટ કરો"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Middle Row: Photo + Couple Info + Phone + UTR */}
                    <div className="flex items-start gap-3">
                      {/* Couple Photo (Tap to Inspect) */}
                      <button
                        type="button"
                        onClick={() => setInspectItem(item)}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0 cursor-pointer group hover:ring-2 hover:ring-rose-500 transition-all"
                        title="ફોટો જુઓ"
                      >
                        {item.couplePhoto ? (
                          <>
                            <img
                              src={item.couplePhoto}
                              alt="Couple"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <ZoomIn className="w-4 h-4 text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <Users className="w-6 h-6" />
                          </div>
                        )}
                      </button>

                      {/* Couple Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className="text-sm sm:text-base font-black text-stone-900 truncate font-serif">
                          {item.husbandName} &amp; {item.wifeName} {item.surname}
                        </h3>

                        {/* Phone & WhatsApp Contacts */}
                        <div className="flex items-center gap-2 flex-wrap text-xs">
                          <a
                            href={`tel:+91${item.phoneNumber}`}
                            className="text-stone-700 hover:text-stone-900 font-bold flex items-center gap-1 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200/60"
                          >
                            <Phone className="w-3 h-3 text-stone-400" />
                            <span>+91 {item.phoneNumber}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${item.phoneNumber}?text=${encodeURIComponent(`નમસ્તે ${item.husbandName}જી, The Divine Garbh Sanskar દ્વારા આયોજિત દિવ્ય ગર્ભયાત્રા સેમિનાર માટે તમારી ઇન્ક્વાયરી ID: ${item.inquiryId} બાબતે...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        {/* UTR Number with 1-tap copy */}
                        {item.utr && (
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <span className="text-[10px] text-stone-400">UTR:</span>
                            <button
                              type="button"
                              onClick={() => handleCopyText(item.utr, 'UTR કોપી થયું!')}
                              className="font-mono text-[10px] font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors"
                              title="Click to copy UTR"
                            >
                              <span>{item.utr}</span>
                              <Copy className="w-2.5 h-2.5 text-stone-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar (Thumb-Friendly Mobile Grid) */}
                    <div className="pt-2 border-t border-stone-100 flex items-center gap-2 flex-wrap">
                      {/* Inspect Button */}
                      <button
                        type="button"
                        onClick={() => setInspectItem(item)}
                        className="flex-1 min-w-[120px] py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>ચકાસણી (Inspect)</span>
                      </button>

                      {/* Approve Button (if pending/rejected) */}
                      {item.status !== 'approved' && (
                        <button
                          type="button"
                          onClick={() => handleApprove(item.inquiryId)}
                          disabled={actionLoading}
                          className="flex-1 min-w-[130px] py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.98]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>એપ્રુવ કરો</span>
                        </button>
                      )}

                      {/* View Digital Pass Button (if approved) */}
                      {item.status === 'approved' && (
                        <Link
                          to={`/pass/${item.inquiryId}`}
                          target="_blank"
                          className="flex-1 min-w-[120px] py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>પાસ જુઓ</span>
                        </Link>
                      )}

                      {/* Reject Button (if pending/approved) */}
                      {item.status !== 'rejected' && (
                        <button
                          type="button"
                          onClick={() => {
                            setInspectItem(item);
                            setShowRejectInput(true);
                          }}
                          className="py-2 px-3 rounded-xl bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-stone-200 text-xs font-bold transition-all cursor-pointer"
                        >
                          રિજેક્ટ
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB 2: DYNAMIC SETTINGS & QR CODE MANAGER
        =========================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Settings Header Alert & Notice */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <h2 className="text-base sm:text-lg font-black text-stone-900 font-serif">
                    ડાયનેમિક ઇવેન્ટ સેટિંગ્સ &amp; QR કોડ મેનેજર
                  </h2>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  અહીંથી તમે UPI QR કોડ, 5 સ્લેબ પ્રાઇસિંગ, ઇવેન્ટ તારીખ અને વક્તાની વિગતો લાઈવ બદલી શકો છો.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveSettings}
                disabled={settingsSaving}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 via-rose-800 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-black text-xs sm:text-sm shadow-md shadow-rose-900/15 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                {settingsSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>સેવ થઈ રહ્યું છે...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>સેટિંગ્સ સેવ કરો (Save Settings)</span>
                  </>
                )}
              </button>
            </div>

            {settingsToast.message && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                settingsToast.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {settingsToast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                <span>{settingsToast.message}</span>
              </div>
            )}

            {/* SECTION 1: QR CODE & PAYMENT CONFIGURATION */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-6 shadow-xs space-y-5">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2 font-serif">
                  <QrCode className="w-5 h-5 text-rose-700" />
                  <span>1. UPI અને QR કોડ સેટઅપ (Payment &amp; QR Settings)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  અહીંથી તમે તમારો બેંક/GPay/PhonePe QR કોડ અપલોડ કરી શકો છો અથવા ડાયનેમિક લાઈવ QR પસંદ કરી શકો છો.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left Controls (8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        UPI ID (VPA)
                      </label>
                      <input
                        type="text"
                        value={eventSettings.upiId}
                        onChange={(e) => setEventSettings({ ...eventSettings, upiId: e.target.value })}
                        placeholder="e.g. thedivinegarbhsanskar@okaxis"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 font-mono focus:outline-none focus:border-rose-700 focus:bg-white"
                      />
                      <span className="text-[10px] text-stone-400 block mt-1">
                        આ UPI આઈડી પર કપલ પેમેન્ટ કરશે.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Payee Name (બેંક ખાતા મુજબ નામ)
                      </label>
                      <input
                        type="text"
                        value={eventSettings.payeeName}
                        onChange={(e) => setEventSettings({ ...eventSettings, payeeName: e.target.value })}
                        placeholder="e.g. The Divine Garbh Sanskar"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                      />
                      <span className="text-[10px] text-stone-400 block mt-1">
                        UPI એપમાં આ નામ દેખાશે.
                      </span>
                    </div>
                  </div>

                  {/* UPI Auto-Rolling Pool (Google Pay Velocity Protection) */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <strong className="text-xs font-bold text-amber-950">
                            Google Pay વેલોસિટી લિમિટ પ્રોટેક્શન (Auto-Rolling UPI Pool)
                          </strong>
                        </div>
                        <p className="text-[11px] text-amber-800 mt-0.5">
                          GPay/PhonePe ના દૈનિક ટ્રાન્ઝેક્શન બ્લોકથી બચવા દર ૫૦ કપલ રજીસ્ટ્રેશન પછી સિસ્ટમ આપોઆપ બીજા UPI ID / QR પર સ્વિચ કરે છે.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEventSettings({ ...eventSettings, autoRotateUpi: !eventSettings.autoRotateUpi })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto ${
                          eventSettings.autoRotateUpi
                            ? 'bg-amber-700 text-white shadow-xs'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {eventSettings.autoRotateUpi ? 'ઓટો-રોલિંગ ચાલુ (ACTIVE)' : 'બંધ (OFF)'}
                      </button>
                    </div>

                    {/* Connected Pool Accounts */}
                    <div className="pt-2 border-t border-amber-200/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-900">
                          કનેક્ટેડ UPI એકાઉન્ટ્સ પૂલ ({eventSettings.upiAccounts?.length || 1})
                        </span>
                        <button
                          type="button"
                          onClick={handleAddUpiAccount}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold transition-colors cursor-pointer"
                        >
                          + બેકઅપ UPI ઉમેરો
                        </button>
                      </div>

                      {eventSettings.upiAccounts?.map((acc, aIdx) => (
                        <div key={acc.id || aIdx} className="bg-white p-3 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                              #{aIdx + 1}
                            </span>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={acc.upiId}
                                onChange={(e) => handleUpiAccountChange(aIdx, 'upiId', e.target.value)}
                                placeholder="UPI ID (e.g. name@okaxis)"
                                className="font-mono text-xs font-bold text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1"
                              />
                              <input
                                type="text"
                                value={acc.payeeName}
                                onChange={(e) => handleUpiAccountChange(aIdx, 'payeeName', e.target.value)}
                                placeholder="Payee Name"
                                className="text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                              લિમિટ: {acc.limit || 50} કપલ
                            </span>
                            {eventSettings.upiAccounts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveUpiAccount(aIdx)}
                                className="text-stone-400 hover:text-rose-700 p-1 cursor-pointer"
                                title="એકાઉન્ટ કાઢી નાખો"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* QR Code Mode Selector */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                    <span className="text-xs font-bold text-stone-800 block">
                      QR કોડ મોડ પસંદ કરો:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setEventSettings({ ...eventSettings, useCustomQr: false })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          !eventSettings.useCustomQr
                            ? 'bg-white border-rose-600 shadow-sm ring-1 ring-rose-500'
                            : 'bg-white/60 border-stone-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-xs font-black text-stone-900">ઓટો-જનરેટેડ લાઈવ QR</strong>
                          {!eventSettings.useCustomQr && <Check className="w-4 h-4 text-rose-700" />}
                        </div>
                        <p className="text-[11px] text-stone-500">
                          કપલના નામે લાઈવ સ્લેબ પ્રાઇસ (₹600, ₹900 વગેરે) આપોઆપ એન્કોડ થાય છે.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEventSettings({ ...eventSettings, useCustomQr: true })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          eventSettings.useCustomQr
                            ? 'bg-white border-rose-600 shadow-sm ring-1 ring-rose-500'
                            : 'bg-white/60 border-stone-200 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-xs font-black text-stone-900">કસ્ટમ અપલોડ કરેલ QR કોડ</strong>
                          {eventSettings.useCustomQr && <Check className="w-4 h-4 text-rose-700" />}
                        </div>
                        <p className="text-[11px] text-stone-500">
                          તમારી સંસ્થા/બેંકનો QR કોડ ઈમેજ અપલોડ કરી વાપરો (Shingala Jaynesh).
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Upload Custom QR Box */}
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <Upload className="w-4 h-4 text-rose-700" />
                        <span>કસ્ટમ QR કોડ ઈમેજ અપલોડ કરો</span>
                      </span>
                      {eventSettings.customQrImage && (
                        <button
                          type="button"
                          onClick={() => {
                            setEventSettings({ ...eventSettings, customQrImage: '', useCustomQr: false });
                          }}
                          className="text-[11px] text-rose-700 hover:underline font-bold"
                        >
                          રિમૂવ કરો (Clear)
                        </button>
                      )}
                    </div>

                    <input
                      ref={qrFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleQrFileUpload}
                      className="hidden"
                    />

                    <div
                      onClick={() => qrFileInputRef.current?.click()}
                      className="border-2 border-dashed border-stone-200 rounded-xl p-4 sm:p-5 text-center bg-white hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400 mx-auto mb-1.5" />
                      <p className="text-xs font-bold text-stone-800">
                        અહીં ક્લિક કરી QR કોડ ઈમેજ પસંદ કરો
                      </p>
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        PNG, JPG અથવા JPEG (કેમેરા અથવા ગેલેરીમાંથી)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Preview Card (4 cols) */}
                <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                    કપલ રજીસ્ટ્રેશન સ્ક્રીન પ્રિવ્યૂ
                  </span>

                  <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-sm inline-block mx-auto">
                    {previewQrUrl ? (
                      <img
                        src={previewQrUrl}
                        alt="QR Preview"
                        className="w-44 h-44 sm:w-48 sm:h-48 object-contain mx-auto rounded-lg"
                      />
                    ) : (
                      <div className="w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center text-stone-400 bg-stone-100 rounded-lg">
                        <QrCode className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  <div className="text-left text-xs space-y-1 bg-white p-3 rounded-xl border border-stone-200/70">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-500">મોડ:</span>
                      <strong className="text-stone-900 font-bold">
                        {eventSettings.useCustomQr ? 'Custom Uploaded QR' : 'Auto Live UPI QR'}
                      </strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-500">UPI ID:</span>
                      <span className="font-mono text-stone-800 text-[10px] truncate max-w-[140px]">
                        {eventSettings.upiId}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-500">Payee:</span>
                      <span className="font-medium text-stone-800 truncate max-w-[140px]">
                        {eventSettings.payeeName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: DYNAMIC PRICING SLABS (MOBILE CARDS + DESKTOP TABLE) */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2 font-serif">
                    <IndianRupee className="w-5 h-5 text-amber-700" />
                    <span>2. ડાયનેમિક પ્રાઇસિંગ સ્લેબ મેનેજર (Pricing Slabs)</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    હાલમાં Early Access (₹600) અને Phase 2 (₹900) સક્રિય છે.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleAddTier}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-all cursor-pointer"
                  >
                    + નવો સ્લેબ ઉમેરો
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] text-stone-400">કુલ:</span>
                    <input
                      type="number"
                      value={eventSettings.totalCoupleCapacity}
                      onChange={(e) => setEventSettings({ ...eventSettings, totalCoupleCapacity: Number(e.target.value) })}
                      className="w-16 bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs text-stone-900 font-bold text-center"
                    />
                    <span className="text-xs font-bold text-stone-700">કપલ</span>
                  </div>
                </div>
              </div>

              {/* Mobile Viewport: Touch-Friendly Slab Cards */}
              <div className="sm:hidden space-y-3">
                {eventSettings.tiers.map((tier, idx) => {
                  const isCurrent = stats.total >= tier.minCouple - 1 && stats.total < tier.maxCouple;
                  return (
                    <div
                      key={tier.tierNumber}
                      className={`p-3.5 rounded-2xl border ${
                        isCurrent
                          ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400'
                          : 'bg-stone-50 border-stone-200'
                      } space-y-2.5`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-900 font-bold text-xs flex items-center justify-center">
                            #{tier.tierNumber}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-extrabold text-[9px] uppercase">
                              Live Active
                            </span>
                          )}
                        </div>

                        {eventSettings.tiers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTier(idx)}
                            className="text-stone-400 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-stone-500 block mb-0.5">સ્લેબ નામ</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => handleTierChange(idx, 'name', e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-stone-500 block mb-0.5">કપલ રેન્જ</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={tier.minCouple}
                              onChange={(e) => handleTierChange(idx, 'minCouple', e.target.value)}
                              className="w-full bg-white border border-stone-200 rounded-lg p-1.5 text-xs text-center font-bold"
                            />
                            <span className="text-xs text-stone-400">-</span>
                            <input
                              type="number"
                              value={tier.maxCouple}
                              onChange={(e) => handleTierChange(idx, 'maxCouple', e.target.value)}
                              className="w-full bg-white border border-stone-200 rounded-lg p-1.5 text-xs text-center font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-stone-500 block mb-0.5">કિંમત (₹)</label>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-xs">₹</span>
                            <input
                              type="number"
                              value={tier.price}
                              onChange={(e) => handleTierChange(idx, 'price', e.target.value)}
                              className="w-full bg-white border border-stone-200 rounded-lg pl-5 pr-2 py-1.5 text-xs font-black text-stone-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Viewport: Full Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">સ્લેબ</th>
                      <th className="py-2.5 px-3">સ્લેબ નામ (Title)</th>
                      <th className="py-2.5 px-3">કપલ રેન્જ</th>
                      <th className="py-2.5 px-3">કિંમત ₹</th>
                      <th className="py-2.5 px-3 text-center">લાઈવ સ્ટેટસ</th>
                      <th className="py-2.5 px-3 text-center">એક્શન</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {eventSettings.tiers.map((tier, idx) => {
                      const isCurrent = stats.total >= tier.minCouple - 1 && stats.total < tier.maxCouple;
                      return (
                        <tr key={tier.tierNumber} className={isCurrent ? 'bg-amber-50/60 font-medium' : ''}>
                          <td className="py-3 px-3">
                            <span className="w-6 h-6 rounded-full bg-stone-100 font-bold text-stone-800 flex items-center justify-center text-[11px]">
                              {tier.tierNumber}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={tier.name}
                              onChange={(e) => handleTierChange(idx, 'name', e.target.value)}
                              className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-900"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                value={tier.minCouple}
                                onChange={(e) => handleTierChange(idx, 'minCouple', e.target.value)}
                                className="w-16 bg-white border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-center"
                              />
                              <span className="text-stone-400">થી</span>
                              <input
                                type="number"
                                value={tier.maxCouple}
                                onChange={(e) => handleTierChange(idx, 'maxCouple', e.target.value)}
                                className="w-16 bg-white border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-center"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="relative w-28">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold">₹</span>
                              <input
                                type="number"
                                value={tier.price}
                                onChange={(e) => handleTierChange(idx, 'price', e.target.value)}
                                className="w-full bg-white border border-stone-200 rounded-lg pl-6 pr-2 py-1.5 text-xs font-black text-stone-900"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            {isCurrent ? (
                              <span className="px-2 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[10px] uppercase shadow-xs">
                                Live Active
                              </span>
                            ) : stats.total >= tier.maxCouple ? (
                              <span className="text-stone-400 text-[11px]">પૂર્ણ (Filled)</span>
                            ) : (
                              <span className="text-stone-400 text-[11px]">આગામી (Upcoming)</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {eventSettings.tiers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveTier(idx)}
                                className="p-1 text-stone-400 hover:text-rose-700 cursor-pointer"
                                title="સ્લેબ ડિલીટ કરો"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 3: EVENT METADATA & SPEAKER DETAILS */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2 font-serif">
                  <Calendar className="w-5 h-5 text-rose-700" />
                  <span>3. ઇવેન્ટ &amp; વક્તા વિગતો (Event Details &amp; Speaker)</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ઇવેન્ટ શીર્ષક (Title)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.title}
                    onChange={(e) => setEventSettings({ ...eventSettings, title: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ઇવેન્ટ સબટાઈટલ (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.subtitle}
                    onChange={(e) => setEventSettings({ ...eventSettings, subtitle: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    તારીખ (ગુજરાતીમાં)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.dateGujarati}
                    onChange={(e) => setEventSettings({ ...eventSettings, dateGujarati: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    સમય (Time)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.time}
                    onChange={(e) => setEventSettings({ ...eventSettings, time: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    સ્થળ (Venue Name)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.venue}
                    onChange={(e) => setEventSettings({ ...eventSettings, venue: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    સ્થળનું સરનામું (Full Address)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.venueAddress}
                    onChange={(e) => setEventSettings({ ...eventSettings, venueAddress: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    મુખ્ય વક્તા (Speaker Name)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.speaker}
                    onChange={(e) => setEventSettings({ ...eventSettings, speaker: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    વક્તાનું પદવી (Speaker Title)
                  </label>
                  <input
                    type="text"
                    value={eventSettings.speakerTitle}
                    onChange={(e) => setEventSettings({ ...eventSettings, speakerTitle: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    સપોર્ટ હેલ્પલાઇન ફોન નંબર
                  </label>
                  <input
                    type="text"
                    value={eventSettings.supportPhone}
                    onChange={(e) => setEventSettings({ ...eventSettings, supportPhone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: REGISTRATION STATUS & PASS RULES */}
            <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2 font-serif">
                  <Sliders className="w-5 h-5 text-rose-700" />
                  <span>4. રજીસ્ટ્રેશન કંટ્રોલ &amp; પાસ નિયમો (Registration Controls)</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200 gap-3">
                  <div>
                    <strong className="text-xs font-black text-stone-900 block">
                      રજીસ્ટ્રેશન ચાલુ / બંધ ટોગલ (Registration Status)
                    </strong>
                    <span className="text-[11px] text-stone-500">
                      જો બંધ કરશો તો વેબસાઇટ પર ફોર્મની જગ્યાએ રજીસ્ટ્રેશન બંધ હોવાની નોટિસ દેખાશે.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEventSettings({ ...eventSettings, isRegistrationOpen: !eventSettings.isRegistrationOpen })}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto ${
                      eventSettings.isRegistrationOpen
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-rose-700 text-white shadow-xs'
                    }`}
                  >
                    {eventSettings.isRegistrationOpen ? 'ચાલુ છે (OPEN)' : 'બંધ છે (CLOSED)'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    પાસ પર દર્શાવવાના નિયમો (Pass Guidelines)
                  </label>
                  <textarea
                    rows={2}
                    value={eventSettings.passNotice}
                    onChange={(e) => setEventSettings({ ...eventSettings, passNotice: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-rose-700 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: SUPER ADMIN DANGER ZONE (SUPER ADMIN ONLY) */}
            {role === 'superadmin' && (
              <div className="bg-rose-50/60 border border-rose-300 rounded-3xl p-4 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0" />
                  <span>ડેન્જર ઝોન: ડેટા રીસેટ (Super Admin Danger Zone)</span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  આ ઓપ્શન તમામ રજીસ્ટ્રેશન કાયમ માટે ડિલીટ કરી કાઉન્ટર 0 પર રીસેટ કરશે. આ ક્રિયા રિવર્સ થઈ શકતી નથી.
                </p>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  તમામ રજીસ્ટ્રેશન રીસેટ કરો (Wipe Data to Zero)
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================
          MOBILE BOTTOM FLOATING DOCK (TOUCH-FRIENDLY SUB-640px)
      ======================================================== */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-2xl px-2 py-1.5 flex items-center justify-around">
        {/* Tab 1: Registrations */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('registrations');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
            activeTab === 'registrations' ? 'text-rose-700 font-bold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <Users className="w-5 h-5" />
            {stats.pending > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-500 text-white font-extrabold text-[8px] px-1 rounded-full">
                {stats.pending}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">રજીસ્ટ્રેશન</span>
        </button>

        {/* Tab 2: Settings */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('settings');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeTab === 'settings' ? 'text-rose-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">સેટિંગ્સ</span>
        </button>

        {/* Tab 3: Gate Scanner Link */}
        <Link
          to="/scanner"
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-purple-700 hover:text-purple-900 transition-all"
        >
          <Camera className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-bold">સ્કેનર</span>
        </Link>

        {/* Tab 4: Refresh */}
        <button
          type="button"
          onClick={() => fetchRegistrations(password, activeFilter, searchQuery)}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-stone-500 hover:text-stone-800 transition-all"
        >
          <RefreshCw className={`w-5 h-5 ${loadingList ? 'animate-spin' : ''}`} />
          <span className="text-[10px] mt-0.5">રીફ્રેશ</span>
        </button>
      </nav>

      {/* Sticky Save Settings Floating Bar (Mobile Viewport in Settings tab) */}
      {activeTab === 'settings' && (
        <div className="sm:hidden fixed bottom-14 left-3 right-3 z-30">
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={settingsSaving}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-700 via-rose-800 to-amber-700 text-white font-black text-xs shadow-xl shadow-rose-900/30 flex items-center justify-center gap-2 active:scale-95"
          >
            {settingsSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>સેવિંગ...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>સેટિંગ્સ સેવ કરો (Save Settings)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* ========================================================
          MOBILE-FIRST INSPECTION MODAL (FULLSCREEN RESPONSIVE SHEET)
      ======================================================== */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white border-t sm:border border-stone-200 rounded-t-3xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-stone-100 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 shrink-0">
                  {inspectItem.inquiryId}
                </span>
                <h3 className="text-sm sm:text-base font-black text-stone-900 font-serif truncate">
                  {inspectItem.husbandName} &amp; {inspectItem.wifeName} {inspectItem.surname}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setInspectItem(null);
                  setShowRejectInput(false);
                }}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-5 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
                {/* Couple Photo Card */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700">
                      કપલ ફોટો (Tap to Zoom)
                    </span>
                    <span className="text-[10px] text-stone-400">
                      પ્રવેશ પાસ પર પ્રિન્ટ થશે
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      if (inspectItem.couplePhoto) {
                        setLightboxImage({
                          url: inspectItem.couplePhoto,
                          title: `${inspectItem.husbandName} & ${inspectItem.wifeName} (Couple Photo)`
                        });
                      }
                    }}
                    className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-square max-h-64 sm:max-h-72 cursor-pointer group"
                  >
                    {inspectItem.couplePhoto ? (
                      <>
                        <img
                          src={inspectItem.couplePhoto}
                          alt="Couple"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                        <span className="absolute bottom-2 right-2 bg-stone-900/70 text-white text-[9px] px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                          <ZoomIn className="w-2.5 h-2.5" /> ઝૂમ કરો
                        </span>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                        ફોટો ઉપલબ્ધ નથી
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-stone-500">મોબાઇલ:</span>
                      <strong className="text-stone-900 font-bold">+91 {inspectItem.phoneNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">સ્લેબ:</span>
                      <strong className="text-amber-900 font-bold">₹{inspectItem.amount} ({inspectItem.tierName || `Tier ${inspectItem.tier}`})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">સ્ટેટસ:</span>
                      <strong className="uppercase font-extrabold text-stone-800">{inspectItem.status}</strong>
                    </div>
                  </div>
                </div>

                {/* Payment Proof & OCR Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-700">
                      પેમેન્ટ સ્ક્રીનશોટ (Tap to Zoom)
                    </span>
                    <span className="text-[10px] text-stone-400">
                      બેંક રસીદ / UPI Receipt
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      if (inspectItem.paymentScreenshot) {
                        setLightboxImage({
                          url: inspectItem.paymentScreenshot,
                          title: `પેમેન્ટ સ્ક્રીનશોટ - ${inspectItem.inquiryId}`
                        });
                      }
                    }}
                    className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 max-h-64 sm:max-h-72 overflow-y-auto cursor-pointer group"
                  >
                    {inspectItem.paymentScreenshot ? (
                      <>
                        <img
                          src={inspectItem.paymentScreenshot}
                          alt="Receipt"
                          className="w-full h-auto object-contain"
                        />
                        <span className="absolute bottom-2 right-2 bg-stone-900/70 text-white text-[9px] px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                          <ZoomIn className="w-2.5 h-2.5" /> પૂર્ણ સ્ક્રીનમાં જુઓ
                        </span>
                      </>
                    ) : (
                      <div className="p-10 text-center text-stone-400 text-xs">
                        સ્ક્રીનશોટ ઉપલબ્ધ નથી
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">OCR UTR:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-stone-900">{inspectItem.utr || 'Not detected'}</span>
                        {inspectItem.utr && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(inspectItem.utr, 'UTR કોપી થયું!')}
                            className="p-1 hover:bg-stone-200 rounded"
                            title="Copy UTR"
                          >
                            <Copy className="w-3 h-3 text-stone-500" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">OCR Payee:</span>
                      <span className="font-medium text-stone-900 truncate max-w-[200px]">
                        {inspectItem.payeeNameFromReceipt || 'Not detected'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reject Reason Slide-Down */}
              {showRejectInput && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <label className="block text-xs font-bold text-rose-900">
                    રિજેક્શનનું કારણ (Rejection Reason):
                  </label>
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="e.g. અમાન્ય UTR / પેમેન્ટ મળેલ નથી..."
                    className="w-full bg-white border border-rose-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejectInput(false)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                    >
                      કેન્સલ
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(inspectItem.inquiryId)}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-700 text-white text-xs font-bold"
                    >
                      કન્ફર્મ રિજેક્ટ
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Sticky Actions */}
            <div className="sticky bottom-0 bg-white px-4 sm:px-6 py-3 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <a
                href={`https://wa.me/91${inspectItem.phoneNumber}?text=${encodeURIComponent(`નમસ્તે ${inspectItem.husbandName}જી, The Divine Garbh Sanskar દ્વારા આયોજિત દિવ્ય ગર્ભયાત્રા સેમિનાર માટે તમારી ઇન્ક્વાયરી ID: ${inspectItem.inquiryId} બાબતે...`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp પર સંપર્ક કરો</span>
              </a>

              <div className="flex items-center gap-2">
                {inspectItem.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => handleApprove(inspectItem.inquiryId)}
                    disabled={actionLoading}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>એપ્રુવ કરો &amp; પાસ ઇસ્યુ કરો</span>
                  </button>
                )}
                {inspectItem.status !== 'rejected' && !showRejectInput && (
                  <button
                    type="button"
                    onClick={() => setShowRejectInput(true)}
                    className="px-4 py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold cursor-pointer"
                  >
                    રિજેક્ટ
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FULLSCREEN IMAGE LIGHTBOX (MOBILE PINCH/ZOOM FRIENDLY)
      ======================================================== */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="flex items-center justify-between text-white py-2">
            <span className="text-xs font-bold truncate pr-4">
              {lightboxImage.title}
            </span>
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-2">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-h-[85vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="text-center text-stone-400 text-[11px] pb-2">
            બંધ કરવા માટે ક્યાંય પણ ક્લિક કરો
          </div>
        </div>
      )}

      {/* ==========================================
          RESET DATABASE MODAL (SUPER ADMIN ONLY)
      =========================================== */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-rose-200 rounded-3xl max-w-md w-full shadow-2xl p-5 sm:p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-black text-stone-900 font-serif">
                ડેટાબેઝ રીસેટ કન્ફર્મેશન
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                આ તમામ ૨૫૦ કપલના રજીસ્ટ્રેશન અને કાઉન્ટર કાયમ માટે ઝીરો (0) કરશે. કન્ફર્મ કરવા નીચે <strong>RESET-ZERO</strong> લખો:
              </p>
            </div>

            <input
              type="text"
              value={resetConfirmText}
              onChange={(e) => setResetConfirmText(e.target.value)}
              placeholder="RESET-ZERO"
              className="w-full bg-stone-50 border border-rose-300 rounded-xl px-4 py-2.5 text-center font-mono font-bold text-xs text-stone-900 focus:outline-none"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  setResetConfirmText('');
                }}
                className="w-1/2 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold"
              >
                કેન્સલ
              </button>
              <button
                type="button"
                disabled={resetConfirmText !== 'RESET-ZERO' || resettingData}
                onClick={handleSuperReset}
                className="w-1/2 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-black disabled:opacity-40 cursor-pointer"
              >
                {resettingData ? 'રીસેટ થઈ રહ્યું છે...' : 'વાઇપ કરો (Wipe)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
