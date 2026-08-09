import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const { siteConfig } = useContext(DataContext);
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-base overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-base/40 backdrop-blur-[2px] z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${siteConfig.heroImage}')` }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-accent font-medium tracking-widest uppercase mb-4 text-sm md:text-base"
        >
          {siteConfig.tagline}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-heading font-semibold text-text mb-6"
        >
          {siteConfig.name}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {siteConfig.subheading}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-block bg-accent hover:bg-accent-hover text-base text-white px-8 py-4 rounded-md font-medium transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
