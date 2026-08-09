import { useState, useEffect, memo } from 'react';

function Navbar({ data, resumeUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const name = data?.name || 'Bikram Chaurel';
  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#experience', label: 'Experience' },
    { href: '#workshops', label: 'Workshops' },
    { href: '#articles', label: 'Articles' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out border-b
      ${scrolled
        ? 'bg-white/92 border-border-mid/60 shadow-[0_2px_28px_rgba(0,0,0,0.07)]'
        : 'bg-white/60 border-white/40'}
      backdrop-blur-xl backdrop-saturate-200`}
    >
      <div className="max-w-[1120px] mx-auto px-7 flex items-center h-[68px] gap-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 font-serif font-bold text-[1.3rem] text-ink tracking-tight whitespace-nowrap shrink-0 group">
          <div className="w-[34px] h-[34px] bg-gradient-to-br from-merlot to-[#942727] rounded-xl flex items-center justify-center text-white text-[1rem] shadow-sm group-hover:shadow-md group-hover:-translate-y-[1px] transition-all duration-300">
            <i className="fa-solid fa-b" />
          </div>
          <span className="group-hover:text-merlot transition-colors duration-300">
            {name.split(' ')[0]} <span className="text-merlot group-hover:text-ink transition-colors duration-300">{name.split(' ').slice(1).join(' ')}</span>
          </span>
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-[5px] p-2 rounded-lg hover:bg-merlot-subtle transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          id="navbar-toggle-btn"
        >
          <span className={`block w-[21px] h-[1.8px] bg-ink rounded-full transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? 'translate-y-[6.8px] rotate-45' : ''}`} />
          <span className={`block w-[21px] h-[1.8px] bg-ink rounded-full transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-[21px] h-[1.8px] bg-ink rounded-full transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? '-translate-y-[6.8px] -rotate-45' : ''}`} />
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex list-none gap-1 ml-auto items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-4 py-2 rounded-lg text-[0.88rem] font-semibold text-ink-gray tracking-wide
                  hover:text-merlot hover:bg-merlot/5 transition-all duration-200
                  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[18px] after:h-[2.5px] after:bg-merlot after:rounded-full after:scale-x-0 after:transition-transform after:duration-200
                  hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
          {resumeUrl && (
            <li className="ml-3">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 bg-merlot/20 text-merlot px-5 py-2 rounded-xl font-semibold text-[0.88rem] hover:bg-merlot hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <i className="fa-regular fa-file-pdf" /> View Resume
              </a>
            </li>
          )}
        </ul>

        {/* Mobile Nav */}
        {menuOpen && (
          <ul className="md:hidden absolute top-[68px] left-0 right-0 flex flex-col list-none gap-0.5 px-4 py-3 pb-5
            bg-white/96 backdrop-blur-3xl border-b border-border-mid/50 shadow-[0_12px_40px_rgba(0,0,0,0.08)]
            animate-slide-down">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-[0.95rem] font-semibold text-ink-gray hover:text-merlot hover:bg-merlot-subtle transition-all duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {resumeUrl && (
              <li className="mt-2 px-3 pb-1">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
                   className="flex items-center justify-center gap-2 bg-merlot/20 text-merlot px-4 py-3 rounded-xl font-semibold text-[0.95rem] w-full active:bg-merlot active:text-white transition-colors">
                  <i className="fa-regular fa-file-pdf" /> View Resume
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default memo(Navbar);
