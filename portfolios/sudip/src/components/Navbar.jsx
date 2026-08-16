import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'About', 
    path: '/about',
    dropdown: [
      { name: 'About Sudeep', path: '/about' },
      { name: 'Training Process', path: '/about/process' },
      { name: 'Mission, Vision & Values', path: '/about/mission' }
    ]
  },
  {
    name: 'Trainings',
    path: '/trainings',
    dropdown: [
      { name: 'Manager as a Coach', path: '/trainings/manager-coach' },
      { name: 'Leadership Development', path: '/trainings/leadership' },
      { name: 'Let\'s Play Sales', path: '/trainings/sales' },
      { name: 'Together We Can', path: '/trainings/team-building' },
      { name: 'Yes, I Can Do It!', path: '/trainings/motivational' },
      { name: 'Training of Trainers', path: '/trainings/tot' },
      { name: 'Wellbeing at Workplace', path: '/trainings/wellbeing' },
      { name: 'Customer Service', path: '/trainings/customer-service' }
    ]
  },
  {
    name: 'Coaching',
    path: '/coaching',
    dropdown: [
      { name: 'What is Coaching?', path: '/coaching/what-is' },
      { name: 'Life Coaching', path: '/coaching/life' },
      { name: 'Leadership Coaching', path: '/coaching/leadership' }
    ]
  },
  { name: 'Clientele', path: '/clients' },
  { name: 'Testimonials', path: '/testimonials' },
  {
    name: 'Resources',
    path: '#',
    dropdown: [
      { name: 'Events', path: '/events' },
      { name: 'Blog', path: '/blog' }
    ]
  },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-surface/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img 
              src="/sudeep-sign.png" 
              alt="Sudeep Basnet Signature" 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex space-x-6 items-center">
            {navLinks.map((link, index) => (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-accent' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {/* Desktop Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 rounded-2xl shadow-lg bg-white ring-1 ring-black/5 focus:outline-none"
                      >
                        <div className="p-1.5 space-y-0.5">
                          {link.dropdown.map((item, i) => (
                            <Link
                              key={i}
                              to={item.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors rounded-full"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <Link to="/contact" className="ml-4 px-5 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors">
              Book Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 h-[80vh] overflow-y-auto">
              {navLinks.map((link, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center px-3 py-2">
                    <Link
                      to={link.path}
                      className={`block text-base font-medium ${
                        location.pathname === link.path ? 'text-accent' : 'text-gray-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                        className="p-1"
                      >
                        <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {/* Mobile Dropdown */}
                  {link.dropdown && activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pl-6 pb-2 space-y-2"
                    >
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          to={item.path}
                          className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="px-3 pt-4">
                <Link to="/contact" className="w-full flex justify-center py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-accent hover:bg-accent-hover">
                  Book a Training
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
