import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from '../components/Home';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <Home />
      <Services />
      <About />
      <Contact />
    </main>
  );
};

export default HomePage;
