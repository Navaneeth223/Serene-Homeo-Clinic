import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users } from 'lucide-react';

const About = () => {
    const stats = [
        { icon: <Users className="text-primary" />, label: 'Happy Patients', value: '5000+' },
        { icon: <Award className="text-accent" />, label: 'Years Experience', value: '15+' },
        { icon: <CheckCircle2 className="text-primary" />, label: 'Success Cases', value: '10K+' },
    ];

    return (
        <section id="about" className="section-padding bg-white relative overflow-hidden">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="rounded-3xl overflow-hidden aspect-video lg:aspect-square bg-secondary relative shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800" alt="Dr. Sreenath K." className="w-full h-full object-cover" />
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-8 -right-8 bg-accent p-8 rounded-2xl text-white shadow-2xl hidden md:block">
                            <p className="text-4xl font-bold">15+</p>
                            <p className="text-sm opacity-80 uppercase tracking-widest">Years of <br /> Excellence</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">About the Clinic</span>
                        <h2 className="text-4xl md:text-5xl mb-6">Healing with a <span className="text-primary">Personal Touch</span></h2>
                        <p className="text-lg text-dark/70 mb-8 leading-relaxed">
                            At Sanjeevani Homeo Clinic, we believe in treating the person, not just the disease. Our holistic approach combines traditional homeopathic principles with modern clinical insights to provide safe, effective, and permanent relief for various chronic and acute conditions.
                        </p>

                        <div className="space-y-4 mb-10">
                            {['Holistic Diagnosis', 'Natural Remedies', 'No Side Effects', 'Personalized Care Plans'].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-primary" size={20} />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-4 rounded-2xl bg-secondary">
                                    <div className="flex justify-center mb-2">{stat.icon}</div>
                                    <h4 className="text-xl font-bold">{stat.value}</h4>
                                    <p className="text-xs text-dark/60 uppercase">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
