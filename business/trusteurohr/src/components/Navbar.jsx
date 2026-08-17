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
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 overflow-hidden shadow-xl z-50 origin-top"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href.substring(1))}
                  className="text-gray-800 font-semibold text-lg py-2 border-b border-gray-50 hover:text-brand-blue"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="mt-4 px-6 py-3 bg-brand-navy text-white text-center font-bold rounded-full shadow-md hover:bg-brand-blue transition-colors"
              >
                Get Started
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
