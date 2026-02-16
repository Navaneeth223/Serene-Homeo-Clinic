import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-20 pb-10 px-6">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-xl">
                                S
                            </div>
                            <span>Sanjeevani <span className="text-accent underline decoration-accent/30">Homeo</span></span>
                        </div>
                        <p className="text-white/50 leading-relaxed font-sans">
                            Providing gentle, natural, and effective homeopathic care for the families of Kerala since 2010.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 font-serif">Quick Links</h4>
                        <ul className="space-y-4 text-white/50 font-sans">
                            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-primary transition-colors">About Doctor</a></li>
                            <li><a href="#treatments" className="hover:text-primary transition-colors">Treatments</a></li>
                            <li><a href="#testimonials" className="hover:text-primary transition-colors">Patient Stories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 font-serif">Legal</h4>
                        <ul className="space-y-4 text-white/50 font-sans">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Use</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Medical Disclaimer</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 font-serif">Newsletter</h4>
                        <p className="text-white/50 mb-4 text-sm font-sans">Join our health community for natural tips.</p>
                        <form className="flex">
                            <input
                                type="email" placeholder="Email"
                                className="bg-white/5 border-none outline-none py-3 px-4 rounded-l-xl w-full text-sm font-sans"
                            />
                            <button className="bg-primary px-4 py-3 rounded-r-xl border-none font-bold text-sm">Join</button>
                        </form>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-xs font-sans tracking-widest uppercase">
                    <p>© 2026 Sanjeevani Homeo Clinic. All Rights Reserved.</p>
                    <p>Designed for Portfolio Showcase</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
