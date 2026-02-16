import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Facebook, Share2 } from 'lucide-react';

const Location = () => {
    return (
        <section id="contact" className="section-padding bg-white">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Visit Us</span>
                        <h2 className="text-4xl md:text-5xl mb-10 font-serif">Reach Our <span className="text-primary italic">Clinic</span></h2>

                        <div className="space-y-10">
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-110">
                                    <MapPin size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Clinic Address</h4>
                                    <p className="text-dark/60 font-sans leading-relaxed">
                                        KV HOMOEOS<br />
                                        Opposite Town Hall, Taliparamba,<br />
                                        Kannur, Kerala - 670141
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-110">
                                    <Clock size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Working Hours</h4>
                                    <div className="grid grid-cols-2 gap-8 text-dark/60 font-sans">
                                        <div>
                                            <p className="font-bold text-dark">Morning</p>
                                            <p>9:00 AM - 1:00 PM</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-dark">Evening</p>
                                            <p>4:00 PM - 8:30 PM</p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm italic text-primary font-medium">Sunday: 9:00 AM - 12:00 PM (By Appointment Only)</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-110">
                                    <Share2 size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Facebook size={20} /></a>
                                        <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"><Instagram size={20} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map Embed */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden bg-secondary relative shadow-2xl h-[450px] lg:h-auto min-h-[450px] border-4 border-white"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15613.844356453162!2d75.3606759!3d12.0347902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43fa6da746d45%3A0xcedb597bcdc02b3b!2sKV%20HOMOEOS!5e0!3m2!1sen!2sin!4v1708870000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="KV HOMOEOS Location"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Location;
