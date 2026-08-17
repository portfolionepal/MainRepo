import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaXmark, FaArrowRight } from 'react-icons/fa6';

import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Slight delay to allow the mobile menu to visually close before scrolling
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        // Calculate position relative to document, minus sticky header offset
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-brand-navy to-brand-dark rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,97,221,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(6,97,221,0.5)] overflow-hidden">
            <img 
              src={logoImg} 
              alt="TrustEuroHR Logo" 
              className="h-full w-full object-cover" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="hidden text-white font-bold text-xs text-center leading-tight">TEHR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-brand-navy leading-none">
              TRUSTEURO<span className="text-brand-blue">HR</span>
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Your Gateway to Europe</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href.substring(1))}
              className="text-brand-navy font-bold text-[13px] tracking-wide uppercase transition-colors hover:text-brand-blue"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="ml-4 px-6 py-2.5 bg-brand-blue text-white text-sm font-bold tracking-wider rounded-full shadow-md hover:shadow-lg hover:bg-brand-navy hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            Get Started
            <FaArrowRight size={14} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-brand-navy hover:text-brand-sky p-2 focus:outline-none transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaXmark size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-[100] bg-white flex flex-col h-dvh overflow-hidden shadow-2xl"
          >
            {/* Header section with pattern */}
            <div className="relative bg-[#F4F9FF] border-b border-[#E5F0FF] px-6 py-5 flex items-center justify-between overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-pattern-grid opacity-40 pointer-events-none mix-blend-overlay"></div>
               
               <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="relative z-10 flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-brand-navy to-brand-dark rounded-xl flex items-center justify-center shadow-md overflow-hidden shrink-0">
                    <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black tracking-tight text-brand-navy leading-none">
                      TRUSTEURO<span className="text-brand-blue">HR</span>
                    </span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Your Gateway to Europe</span>
                  </div>
               </a>

               <button onClick={() => setMobileMenuOpen(false)} className="relative z-10 text-brand-navy p-2 hover:bg-black/5 rounded-full transition-colors shrink-0">
                 <FaXmark size={26} />
               </button>
            </div>

            {/* Links section */}
            <div className="flex-1 flex flex-col py-6 px-4 bg-white overflow-y-auto">
              <div className="flex flex-col space-y-1 mb-10">
                {navLinks.map((link, index) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href.substring(1))}
                    className="text-brand-navy font-bold text-[19px] py-4 border-b border-gray-100 flex items-center justify-between active:bg-gray-50 px-4 rounded-lg transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-auto mb-8 px-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="block w-full py-4 bg-[#0F172A] text-white text-center font-bold text-lg rounded-2xl shadow-xl hover:bg-brand-blue transition-colors hover:-translate-y-1 active:scale-95"
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
