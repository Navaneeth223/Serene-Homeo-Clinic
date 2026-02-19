import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Loader2, CheckCircle } from 'lucide-react';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            // Sanitize: ensure no trailing slash
            API_URL = API_URL.replace(/\/$/, '');

            // If the URL doesn't end with /api, append it to match the backend expectation
            if (!API_URL.endsWith('/api')) {
                API_URL = `${API_URL}/api`;
            }

            const res = await axios.post(`${API_URL}/appointments`, formData);
            if (res.data.success) {
                setSuccess(true);
                setFormData({ name: '', phone: '', email: '', date: '', time: '', message: '' });
            }
        } catch (err) {
            console.error('Submission error:', err);
            const errorMessage = err.response?.data?.error || err.message || 'Something went wrong. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-3xl text-center max-w-2xl mx-auto border-primary/20"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl mb-4">Request Received!</h2>
                <p className="text-dark/60 mb-8 font-sans">
                    Your appointment request has been sent successfully. <br />
                    We will contact you shortly to confirm the scheduled time.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="btn-primary"
                >
                    Book Another
                </button>
            </motion.div>
        );
    }

    return (
        <section id="appointment" className="section-padding bg-white relative">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Easy Booking</span>
                        <h2 className="text-4xl md:text-5xl mb-6">Schedule Your <span className="text-primary">Visit</span></h2>
                        <p className="text-lg text-dark/70 mb-10 leading-relaxed font-sans">
                            Take the first step towards natural healing. Fill out the form, and our coordinator will get back to you within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Quick Call</h4>
                                    <p className="text-dark/60">+91 0000 0000 00</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Email Us</h4>
                                    <p className="text-dark/60">care@sanjeevani.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark/60 uppercase ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                                        <input
                                            type="text" required name="name" value={formData.name} onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full bg-secondary/50 border border-transparent focus:border-primary/30 focus:bg-white outline-none py-3 pl-12 pr-4 rounded-xl transition-all font-sans"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark/60 uppercase ml-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                                        <input
                                            type="tel" required name="phone" value={formData.phone} onChange={handleChange}
                                            placeholder="Mobile Number"
                                            className="w-full bg-secondary/50 border border-transparent focus:border-primary/30 focus:bg-white outline-none py-3 pl-12 pr-4 rounded-xl transition-all font-sans"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark/60 uppercase ml-1">Preferred Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                                        <input
                                            type="date" required name="date" value={formData.date} onChange={handleChange}
                                            className="w-full bg-secondary/50 border border-transparent focus:border-primary/30 focus:bg-white outline-none py-3 pl-12 pr-4 rounded-xl transition-all font-sans"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-dark/60 uppercase ml-1">Preferred Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                                        <select
                                            required name="time" value={formData.time} onChange={handleChange}
                                            className="w-full bg-secondary/50 border border-transparent focus:border-primary/30 focus:bg-white outline-none py-3 pl-12 pr-4 rounded-xl transition-all font-sans appearance-none"
                                        >
                                            <option value="">Select Time</option>
                                            <option value="Morning (9AM - 1PM)">Morning (9AM - 1PM)</option>
                                            <option value="Evening (4PM - 9PM)">Evening (4PM - 9PM)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-dark/60 uppercase ml-1">Symptoms (Optional)</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 text-primary/40" size={18} />
                                    <textarea
                                        name="message" value={formData.message} onChange={handleChange}
                                        rows="3" placeholder="Briefly describe your health concern..."
                                        className="w-full bg-secondary/50 border border-transparent focus:border-primary/30 focus:bg-white outline-none py-3 pl-12 pr-4 rounded-xl transition-all font-sans resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm font-sans">{error}</p>}

                            <button
                                type="submit" disabled={loading}
                                className="w-full btn-primary py-4 text-lg flex justify-center items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentForm;
