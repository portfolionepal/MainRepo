import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useAdminContext } from '../context/AdminContext';

export default function Footer() {
  const { siteContent } = useAdminContext();
  const contact = siteContent.contact || {};
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif font-bold text-2xl tracking-tight text-white">Sudeep Basnet</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering individuals and organizations to reach new heights through high-impact training, leadership development, and certified coaching.
            </p>
            <div className="flex space-x-4">
              <a href={contact.facebookUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1877F2] hover:bg-gray-100 transition-colors shadow-sm group">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href={contact.linkedinUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0A66C2] hover:bg-gray-100 transition-colors shadow-sm group">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={contact.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#E4405F] hover:bg-gray-100 transition-colors shadow-sm group">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={contact.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#FF0000] hover:bg-gray-100 transition-colors shadow-sm group">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About Sudeep</Link></li>
              <li><Link to="/trainings" className="text-sm text-gray-300 hover:text-white transition-colors">Corporate Trainings</Link></li>
              <li><Link to="/coaching" className="text-sm text-gray-300 hover:text-white transition-colors">Life & Leadership Coaching</Link></li>
              <li><Link to="/gallery" className="text-sm text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-white">Popular Programs</h3>
            <ul className="space-y-3">
              <li><Link to="/trainings/leadership" className="text-sm text-gray-300 hover:text-white transition-colors">Leadership Development</Link></li>
              <li><Link to="/trainings/sales" className="text-sm text-gray-300 hover:text-white transition-colors">Let's Play Sales</Link></li>
              <li><Link to="/trainings/motivational" className="text-sm text-gray-300 hover:text-white transition-colors">Motivational Speaking</Link></li>
              <li><Link to="/trainings/manager-coach" className="text-sm text-gray-300 hover:text-white transition-colors">Manager as a Coach</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-white">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">{contact.address || 'Sangam Chowk, New Baneshwor, Kathmandu'}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">{contact.phone || '01-4599799'}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">{contact.email || 'bd@successinc.com.np'}</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Sudeep Basnet. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-400">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
