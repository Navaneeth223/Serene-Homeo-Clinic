import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Zap, Activity, Heart, Scissors, Thermometer } from 'lucide-react';

const treatments = [
    { icon: <Droplets />, title: 'Skin Disorders', desc: 'Natural treatment for acne, eczema, and psoriasis.' },
    { icon: <Scissors />, title: 'Hair Fall', desc: 'Root-level solutions for hair thinning and scalp health.' },
    { icon: <Wind />, title: 'Allergy Care', desc: 'Strengthening immunity to fight seasonal and dust allergies.' },
    { icon: <Activity />, title: 'Migraine Relief', desc: 'Holistic management of chronic headaches and stress.' },
    { icon: <Thermometer />, title: 'Sinus Treatment', desc: 'Effective relief from chronic sinusitis and congestion.' },
    { icon: <Heart />, title: 'Diabetes Support', desc: 'Supportive homeopathic care for metabolic balance.' },
];

const Services = () => {
    return (
        <section id="treatments" className="section-padding bg-secondary/50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
                    >
                        Our Specializations
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl mb-6"
                    >
                        Specialized <span className="text-primary italic">Treatments</span>
                    </motion.h2>
                    <p className="text-dark/60 max-w-2xl mx-auto font-sans">
                        We provide evidence-based homeopathic care for a wide range of chronic and acute health conditions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {treatments.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="glass p-8 rounded-3xl group hover:border-primary/30 transition-all"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                {React.cloneElement(item.icon, { size: 28 })}
                            </div>
                            <h3 className="text-2xl mb-4">{item.title}</h3>
                            <p className="text-dark/60 font-sans leading-relaxed">
                                {item.desc}
                            </p>
                            <motion.button
                                whileHover={{ x: 5 }}
                                className="mt-6 text-primary font-bold flex items-center gap-2 group-hover:text-accent"
                            >
                                Learn More <span>→</span>
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
