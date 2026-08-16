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
    <div className="font-sans text-brand-navy min-h-screen selection:bg-brand-blue/20 selection:text-brand-navy relative">
      {/* Background Texture & Noise */}
      <div className="fixed inset-0 pointer-events-none bg-noise opacity-[0.03] z-[-1]"></div>
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-blue/15 blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-sky/15 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-brand-blue/10 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

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