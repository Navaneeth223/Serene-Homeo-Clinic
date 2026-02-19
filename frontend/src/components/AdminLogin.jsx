import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, LogIn, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
            apiBase = apiBase.replace(/\/$/, '');
            if (!apiBase.toLowerCase().endsWith('/api')) apiBase += '/api';

            const res = await axios.post(`${apiBase}/auth/login`, { password });
            if (res.data.success) {
                localStorage.setItem('adminToken', res.data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid password or server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass p-8 rounded-3xl shadow-2xl border border-white/20"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="text-primary inline-flex items-center gap-2 mb-4 hover:underline text-sm font-bold">
                        <ArrowLeft size={16} /> Back to Website
                    </Link>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-dark italic">Sanjeevani <span className="text-primary">Admin</span></h1>
                    <p className="text-dark/60 mt-2">Secure access restricted to clinic staff</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-dark/70 mb-2 uppercase tracking-wider">Passcode</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full px-4 py-4 bg-white/50 border border-transparent focus:border-primary/30 rounded-xl outline-none transition-all text-center text-xl tracking-[0.2em]"
                                required
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm italic"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Login to Dashboard'}
                        {!loading && <LogIn size={20} />}
                    </button>
                </form>

                <p className="text-center text-dark/40 text-xs mt-8">
                    &copy; {new Date().getFullYear()} Sanjeevani Homeo Clinic. All Rights Reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
