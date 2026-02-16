import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AppointmentForm from './components/AppointmentForm';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';

function App() {
    return (
        <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <AppointmentForm />
            <Testimonials />
            <Location />
            <Footer />

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 active:scale-95 transition-transform"
            >
                <MessageCircle size={32} />
            </a>
        </div>
    );
}

export default App;
