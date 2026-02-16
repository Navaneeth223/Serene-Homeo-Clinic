import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PhoneCall } from 'lucide-react';


const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F1F5F2]">
            {/* Background Shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/5 rounded-r-full blur-3xl -z-10" />

            {/* Floating Herbal Elements (Abstract) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10"
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl -z-10"
            />

            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                        Welcome to Sanjeevani Homeo Clinic
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
                        Gentle <span className="text-primary italic">Healing</span>, <br />
                        Natural Care.
                    </h1>
                    <p className="text-lg md:text-xl text-dark/70 mb-10 max-w-lg font-sans leading-relaxed">
                        Personalized homeopathic treatments for long-lasting health. Rooted in nature, proven by experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#appointment" className="btn-primary text-center py-4 text-lg">
                            Book Appointment
                        </a>
                        <div className="flex gap-4">
                            <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer" className="flex items-center justify-center w-14 h-14 rounded-full glass text-green-600 hover:scale-110 transition-transform">
                                <MessageSquare />
                            </a>
                            <a href="tel:+910000000000" className="flex items-center justify-center w-14 h-14 rounded-full glass text-primary hover:scale-110 transition-transform">
                                <PhoneCall />
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[
                                "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100&h=100",
                                "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100&h=100",
                                "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100&h=100",
                                "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100&h=100"
                            ].map((url, i) => (
                                <img key={i} src={url} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" alt={`Patient ${i + 1}`} />
                            ))}
                        </div>
                        <p className="text-sm font-medium">
                            <span className="text-primary font-bold text-lg">5K+</span> Happy Patients
                        </p>
                    </div>
                </motion.div>

                {/* Hero Image / Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                >
                    <div className="aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-slate-300 relative shadow-2xl">
                        <img src="/clinic-interior.png" alt="Sanjeevani Clinic Interior" className="w-full h-full object-cover" />
                    </div>

                    {/* Glass Card Overlay */}
                    <motion.div
                        initial={{ x: 50, y: 50, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="absolute bottom-6 -left-6 md:-left-12 glass p-6 rounded-2xl max-w-[240px] hidden sm:block"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-dark/60">Expert Care</span>
                        </div>
                        <h3 className="text-xl mb-1">Dr. Sreenath K.</h3>
                        <p className="text-sm text-dark/60">Consultant Homeopath <br /> 15+ Yrs Experience</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
