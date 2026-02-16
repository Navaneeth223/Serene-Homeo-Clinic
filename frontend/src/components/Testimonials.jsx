import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Anjali Menon',
        role: 'Piles Patient',
        content: 'The treatment here is truly life-changing. I had chronic sinus issues for 5 years, and within 3 months of homeopathic care, I feel completely relieved.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5
    },
    {
        name: 'Rahul Sharma',
        role: 'Allergy Care',
        content: 'Dr. Sreenath is very patient-friendly. He explains things clearly and the natural remedies worked wonders for my daughter skin allergy.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5
    },
    {
        name: 'Meera Nair',
        role: 'Migraine Patient',
        content: 'Professional, calm, and effective. The clinic environment itself makes you feel 50% better. Highly recommend for any chronic health issues.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
        rating: 5
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="section-padding bg-secondary/30 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl mb-6 font-serif"
                    >
                        What Our <span className="text-primary italic">Patients Say</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-xl relative"
                        >
                            <div className="absolute top-6 right-8 text-primary/10">
                                <Quote size={48} />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-accent text-accent" />
                                ))}
                            </div>

                            <p className="text-dark/70 italic font-sans mb-8 leading-relaxed">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full border-2 border-primary/20 object-cover shadow-md" />
                                <div>
                                    <h4 className="font-bold">{item.name}</h4>
                                    <p className="text-xs text-primary font-medium tracking-wider uppercase">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
