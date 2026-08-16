import React from 'react';
import logoImg from '../assets/logo.png';
import { FaInstagram, FaTiktok, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark relative z-10 pt-16 pb-8">
      {/* Thin gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-sky to-brand-navy"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 group w-fit">
              <img 
                src={logoImg} 
                alt="TrustEuroHR Logo" 
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-xl font-black tracking-tight text-white">
                TRUSTEURO<span className="text-brand-blue">HR</span>
              </span>
            </div>
            <p className="text-brand-white/70 text-sm leading-relaxed max-w-xs">
              Your reliable partner for navigating European visa applications. We turn global ambitions into reality with transparent, personalized guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Quick Links</h5>
            <ul className="space-y-3 text-brand-white/70 text-sm font-medium">
              <li><a href="#home" className="hover:text-brand-sky transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-sky transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-sky transition-colors">Visa Services</a></li>
              <li><a href="#contact" className="hover:text-brand-sky transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Contact Us</h5>
            <ul className="space-y-4 text-brand-white/70 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-blue shrink-0 mt-0.5" />
                <span>New Baneshwor<br />Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone size={16} className="text-brand-blue shrink-0" />
                <span>+977 (Phone Number)</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope size={16} className="text-brand-blue shrink-0" />
                <span>info@trusteurohr.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Connect With Us</h5>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-[#f09433] hover:-translate-y-1 transition-all shadow-sm">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-black hover:-translate-y-1 transition-all shadow-sm">
                <FaTiktok size={16} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-[#25D366] hover:-translate-y-1 transition-all shadow-sm">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-white/50 font-medium text-xs">
            &copy; {new Date().getFullYear()} TrustEuroHR Consultancy. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-semibold text-brand-white/50">
            <a href="#" className="hover:text-brand-sky transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-sky transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
