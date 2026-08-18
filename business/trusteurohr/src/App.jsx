import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import WorkVisa from './pages/WorkVisa';
import TravelVisa from './pages/TravelVisa';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-brand-navy min-h-screen bg-brand-white selection:bg-brand-sky/30 selection:text-brand-navy relative overflow-x-hidden w-full">
        {/* Subtle modern background gradient (optional, keeps it clean) */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-white via-white to-brand-sky/5 z-[-1]"></div>

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work-visa" element={<WorkVisa />} />
          <Route path="/travel-visa" element={<TravelVisa />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;