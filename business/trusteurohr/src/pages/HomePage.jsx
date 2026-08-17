import React from 'react';
import Home from '../components/Home';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage = () => {
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
