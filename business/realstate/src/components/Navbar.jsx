import { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => {
    return typeof window !== 'undefined' ? window.scrollY > 50 : false;
  });
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Services', href: '/#services', id: 'services' },
    { name: 'Properties', href: '/#properties', id: 'properties' },
    { name: 'Project', href: '/#gallery', id: 'gallery' },
    { name: 'FAQ', href: '/#faq', id: 'faq' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
  ];

  useLayoutEffect(() => {
    setScrolled(window.scrollY > 50);
    setIsOpen(false); // also make sure mobile menu never stays open across navigation
  }, [location.pathname]);

  useEffect(() => {
    const syncScrolled = () => setScrolled(window.scrollY > 50);

    window.addEventListener('scroll', syncScrolled, { passive: true });

    // Also re-sync on bfcache restore (mobile back/forward), which can skip
    // firing a "scroll" event entirely.
    const handlePageShow = () => {
      syncScrolled();
      setIsOpen(false);
    };
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('scroll', syncScrolled);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is exactly in the middle of the screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          // Optional: Update URL without jumping
          window.history.replaceState(null, null, `/#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navLinks, location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-[padding,background-color,box-shadow,backdrop-filter] duration-300 ${scrolled ? 'bg-base/95 backdrop-blur-md shadow-lg shadow-black/20 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-[32px]">
          <div className="flex-shrink-0 flex items-center">
            <a href="/#home" className="block font-heading font-semibold text-2xl text-accent leading-none">
              GodMoon<span className="text-text">.</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === link.id ? 'text-accent' : 'text-text hover:text-accent'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text hover:text-text focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-surface-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === link.id ? 'text-accent bg-surface-alt' : 'text-text hover:text-accent'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;