import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans text-brand-navy min-h-screen bg-brand-white selection:bg-brand-sky/30 selection:text-brand-navy relative">
      
      {/* Subtle modern background gradient (optional, keeps it clean) */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-white via-white to-brand-sky/5 z-[-1]"></div>

      <Navbar />
      <main>
        <Home />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;