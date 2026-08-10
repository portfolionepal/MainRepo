import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { siteConfig } = useContext(DataContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-alt border-t border-surface-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block font-heading font-semibold text-2xl text-accent mb-4">
              GodMoon<span className="text-text">.</span>
            </a>
            <p className="text-text-muted mb-6 text-sm leading-relaxed">
              {siteConfig.subheading}
            </p>
            <div className="flex space-x-4">
              <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0a66c2] hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <FaLinkedinIn size={20} />
              </a>
              <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-[#1877f2] hover:opacity-80 transition-opacity" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:opacity-80 transition-opacity" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href={siteConfig.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-[#ff0000] hover:opacity-80 transition-opacity" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
              <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:opacity-80 transition-opacity" aria-label="WhatsApp">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
          
          {/* Information Links */}
          <div>
            <h4 className="text-text font-heading font-semibold mb-4">Information</h4>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-text-muted hover:text-accent text-sm transition-colors">About Us</a></li>
              <li><a href="/#gallery" className="text-text-muted hover:text-accent text-sm transition-colors">Projects</a></li>
              <li><a href="/#faq" className="text-text-muted hover:text-accent text-sm transition-colors">FAQ</a></li>
              <li><a href="/#contact" className="text-text-muted hover:text-accent text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Services Links */}
          <div>
            <h4 className="text-text font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/#services" className="text-text-muted hover:text-accent text-sm transition-colors">Land Purchase & Sale</a></li>
              <li><a href="/#services" className="text-text-muted hover:text-accent text-sm transition-colors">Land Consultation</a></li>
              <li><a href="/#services" className="text-text-muted hover:text-accent text-sm transition-colors">Cadastral Survey</a></li>
              <li><a href="/#services" className="text-text-muted hover:text-accent text-sm transition-colors">Topographical Survey</a></li>
            </ul>
          </div>
          
          {/* Contact Details */}
          <div>
            <h4 className="text-text font-heading font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-accent transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Copyright */}
        <div className="border-t border-surface-border pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
          <p>© {currentYear} {siteConfig.name}. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
