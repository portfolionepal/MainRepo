import React from 'react';
import logoImg from '../assets/logo.png';
import { FaPhone, FaEnvelope, FaLocationDot, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
const instagramIcon = "https://img.icons8.com/color/96/instagram-new--v1.png";
const whatsappIcon = "https://img.icons8.com/color/96/whatsapp--v1.png";
const mobileIcon = "https://img.icons8.com/color/96/phone.png";
const gmailIcon = "https://img.icons8.com/color/96/gmail-new.png";
const googleMapsIcon = "https://img.icons8.com/color/96/google-maps-new.png";

const Footer = () => {
  return (
    <footer className="bg-brand-dark relative z-10 pt-10 sm:pt-16 pb-6 sm:pb-8">
      {/* Thin gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-sky to-brand-navy"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          
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
                <FaLocationDot size={18} className="text-brand-blue shrink-0 mt-0.5" />
                <span>Basundhara (Opp. Chirayu Hospital)<br />Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone size={16} className="text-brand-blue shrink-0" />
                <a href="tel:+9779744978667" className="hover:text-brand-white transition-colors">+977 9744978667</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope size={16} className="text-brand-blue shrink-0" />
                <a href="mailto:trusteurohrconsultancy2026@gmail.com" className="hover:text-brand-white transition-colors">trusteurohrconsultancy2026@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Connect With Us</h5>
            <div className="flex flex-wrap gap-5">
              <a href="https://www.facebook.com/profile.php?id=61593522176279" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white shadow-[0_4px_15px_rgb(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-[#1877F2] hover:-translate-y-1 group">
                <FaFacebook className="text-xl text-[#1877F2] group-hover:text-white transition-colors duration-300" />
              </a>
              
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white shadow-[0_4px_15px_rgb(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-[#E1306C] hover:-translate-y-1 group"
                onClick={(e) => {
                  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    e.preventDefault();
                    window.location.href = 'instagram://app';
                    setTimeout(() => { window.open('https://www.instagram.com', '_blank'); }, 500);
                  }
                }}
              >
                <FaInstagram className="text-xl text-[#E1306C] group-hover:text-white transition-colors duration-300" />
              </a>

              <a href="https://wa.me/message/QOSVCIZQZEMJC1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white shadow-[0_4px_15px_rgb(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-[#25D366] hover:-translate-y-1 group">
                <FaWhatsapp className="text-xl text-[#25D366] group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-white/50 font-medium text-xs">
            &copy; {new Date().getFullYear()} TrustEuroHR Consultancy. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
