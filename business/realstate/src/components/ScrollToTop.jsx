import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Your app never handled scroll position on route change. On mobile Chrome,
// that lets the browser's native scroll-restoration fight with React Router's
// instant content swap, which is the other half of the navbar-squish bug.
// This forces a clean, predictable scroll position on every route change.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;