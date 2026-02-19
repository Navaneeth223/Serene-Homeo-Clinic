import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
    Search, 
    Calendar, 
    User, 
    Phone, 
    MessageCircle, 
    RefreshCcw, 
    CheckCircle, 
    Clock, 
    AlertCircle,
    ArrowLeft,
    Trash2,
    Check,
    X
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [pwaInstalled, setPwaInstalled] = useState(false);
    const [pushSubscribed, setPushSubscribed] = useState(false);
    const navigate = useNavigate();

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            let apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
            apiBase = apiBase.replace(/\/$/, '');
            if (!apiBase.toLowerCase().endsWith('/api')) apiBase += '/api';

            await axios.put(`${apiBase}/appointments/${id}/status`, { status: newStatus });

            // Optimistic Update
            setAppointments(prev => prev.map(app =>
                app._id === id ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            console.error('Status update error:', err);
            alert('Failed to update status.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment? This cannot be undone.')) return;

        try {
            let apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
            apiBase = apiBase.replace(/\/$/, '');
            if (!apiBase.toLowerCase().endsWith('/api')) apiBase += '/api';

            await axios.delete(`${apiBase}/appointments/${id}`);

            // Remove from UI
            setAppointments(prev => prev.filter(app => app._id !== id));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete appointment.');
        }
    };

    // PWA Install Logic
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        });

        window.addEventListener('appinstalled', () => {
            setPwaInstalled(true);
            setDeferredPrompt(null);
        });

        // Check if already subbed
        checkPushSubscription();
    }, []);

    const checkPushSubscription = async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            setPushSubscribed(!!subscription);
        }
    };

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    const subscribeToPush = async () => {
        try {
            let apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
            apiBase = apiBase.replace(/\/$/, '');
            if (!apiBase.toLowerCase().endsWith('/api')) apiBase += '/api';

            // 1. Get Public Key
            const keyRes = await axios.get(`${apiBase}/push/key`);
            const publicKey = keyRes.data.publicKey;

            // 2. Register Service Worker
            const registration = await navigator.serviceWorker.register('/sw.js');

            // 3. Subscribe
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            });

            // 4. Send to backend
            await axios.post(`${apiBase}/push/subscribe`, subscription);
            setPushSubscribed(true);
            alert('Notifications enabled! You will now receive alerts for new bookings.');
        } catch (err) {
            console.error('Push error:', err);
            alert('Could not enable notifications. Please check site permissions.');
        }
    };

    const fetchAppointments = async () => {
        setLoading(true);
        setError('');
        try {
            let apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
            apiBase = apiBase.replace(/\/$/, '');

            if (!apiBase.toLowerCase().endsWith('/api')) {
                apiBase += '/api';
            }

            const finalURL = `${apiBase}/appointments`;
            console.log('Fetching from:', finalURL);

            const res = await axios.get(finalURL);
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch appointments. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             app.phone.includes(searchTerm);
        const matchesDate = dateFilter ? app.date.startsWith(dateFilter) : true;
        return matchesSearch && matchesDate;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-secondary p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link to="/" className="text-primary flex items-center gap-2 mb-2 hover:underline">
                            <ArrowLeft size={16} /> Back to Website
                        </Link>
                        <h1 className="text-3xl font-bold text-dark italic">Appointment <span className="text-primary">Dashboard</span></h1>
                        <p className="text-dark/60">Clinic Management System</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {deferredPrompt && (
                            <button
                                onClick={handleInstallClick}
                                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-all text-sm font-bold"
                            >
                                <span className="animate-bounce">📱</span> Install to Home Screen
                            </button>
                        )}

                        {!pushSubscribed && (
                            <button
                                onClick={subscribeToPush}
                                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-all text-sm font-bold"
                            >
                                <AlertCircle size={18} /> Enable Notifications
                            </button>
                        )}

                        <button
                            onClick={fetchAppointments}
                            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-primary/10 hover:bg-primary/5 transition-colors text-sm"
                        >
                            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
                            Refresh
                        </button>

                        <button
                            onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login'); }}
                            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors text-sm font-bold border border-red-100 shadow-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats & Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass p-6 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-dark/60 font-bold uppercase tracking-wider">Total Bookings</p>
                            <h3 className="text-2xl font-bold">{appointments.length}</h3>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-2xl md:col-span-2 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40" size={18} />
                            <input 
                                type="text"
                                placeholder="Search by name or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-transparent focus:border-primary/30 rounded-xl outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40" size={18} />
                            <input 
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-transparent focus:border-primary/30 rounded-xl outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="glass rounded-3xl overflow-hidden shadow-xl border border-white/20">
                    {loading ? (
                        <div className="p-20 text-center">
                            <RefreshCcw size={40} className="animate-spin mx-auto text-primary mb-4" />
                            <p className="text-dark/60">Loading appointments...</p>
                        </div>
                    ) : error ? (
                        <div className="p-20 text-center">
                            <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
                            <p className="text-dark/60">{error}</p>
                            <button onClick={fetchAppointments} className="mt-4 text-primary font-bold">Try Again</button>
                        </div>
                    ) : filteredAppointments.length === 0 ? (
                        <div className="p-20 text-center">
                            <Calendar size={40} className="mx-auto text-dark/20 mb-4" />
                            <p className="text-dark/60">No appointments found matches the criteria.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary/5 border-b border-primary/10">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-dark/60">Patient Details</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-dark/60">Date & Time</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-dark/60">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-dark/60">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((app) => (
                                        <tr key={app._id} className="border-b border-primary/5 hover:bg-white/40 transition-colors">
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                                        {app.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-dark">{app.name}</h4>
                                                        <p className="text-sm text-dark/60">{app.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold flex items-center gap-2">
                                                        <Calendar size={14} className="text-primary" />
                                                        {formatDate(app.date)}
                                                    </p>
                                                    <p className="text-xs text-dark/60 flex items-center gap-2">
                                                        <Clock size={14} className="text-primary" />
                                                        {app.time}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                {(() => {
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    const appDate = new Date(app.date);
                                                    appDate.setHours(0, 0, 0, 0);
                                                    const isPast = appDate < today && app.status === 'pending';

                                                    const statusStyles = {
                                                        pending: 'bg-yellow-100 text-yellow-700',
                                                        completed: 'bg-green-100 text-green-700',
                                                        'no-show': 'bg-red-100 text-red-700',
                                                        cancelled: 'bg-gray-100 text-gray-700'
                                                    };

                                                    return (
                                                        <div className="flex flex-col gap-1">
                                                            <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-tighter w-fit ${statusStyles[app.status || 'pending']}`}>
                                                                {app.status === 'completed' && <CheckCircle size={12} />}
                                                                {app.status === 'no-show' && <X size={12} />}
                                                                {app.status || 'Pending'}
                                                            </span>
                                                            {isPast && (
                                                                <span className="text-[10px] text-red-600 font-bold uppercase animate-pulse">
                                                                    ⚠️ Past Due
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {app.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusUpdate(app._id, 'completed')}
                                                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                                title="Mark Completed"
                                                            >
                                                                <Check size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(app._id, 'no-show')}
                                                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                                title="Mark No-Show"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </>
                                                    )}

                                                    <div className="h-6 w-[1px] bg-primary/10 mx-1"></div>

                                                    <a 
                                                        href={`tel:${app.phone}`}
                                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                        title="Call Patient"
                                                    >
                                                        <Phone size={18} />
                                                    </a>

                                                    <button
                                                        onClick={() => handleDelete(app._id)}
                                                        className="p-2 bg-gray-100 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                        title="Delete Appointment"
                                                    >
                                                        <Trash2 size={18} />
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
        </div>
    );
};

export default AdminDashboard;
