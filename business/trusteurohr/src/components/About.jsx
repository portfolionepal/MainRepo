import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { FaEarthEurope, FaArrowTrendUp, FaHeadset, FaEye, FaUserCheck, FaShieldHalved } from 'react-icons/fa6';

import AnimatedCounter from './AnimatedCounter';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { num: 5, suffix: '+', label: 'European Countries', icon: FaEarthEurope },
    { num: 98, suffix: '%', label: 'Success Rate', icon: FaArrowTrendUp },
    { num: 24, suffix: '/7', label: 'Client Support', icon: FaHeadset }
  ];

  const values = [
    { icon: FaEye, title: 'Transparency', desc: 'Clear processes and upfront communication every step of the way.' },
    { icon: FaUserCheck, title: 'Personalized Guidance', desc: 'Tailored visa strategies based on your unique profile and goals.' },
    { icon: FaShieldHalved, title: 'Proven Track Record', desc: 'Hundreds of successful cases handled with the utmost security and care.' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none opacity-[0.4]"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          
          {/* Left Column: Who We Are Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-7/12"
          >
            <div className="relative bg-white border border-gray-100 p-8 md:p-12 rounded-[1.5rem] shadow-premium h-full flex flex-col">
                
                {/* Supporting Visual inside the card */}
                <div className="w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] -ml-4 md:-ml-8 -mt-12 md:-mt-20 h-56 md:h-64 mb-8 rounded-2xl overflow-hidden relative shadow-2xl z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop" 
                    alt="European Travel Passport" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent pointer-events-none"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 border border-white/40">
                    <span className="text-brand-accent font-black text-2xl font-sans leading-none">6+</span>
                    <span className="text-[10px] font-bold text-brand-navy uppercase leading-tight tracking-wider font-sans">Years<br/>Experience</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-[2px] bg-brand-accent"></div>
                  <h2 className="text-brand-accent font-bold tracking-[0.2em] uppercase text-xs font-sans">Who We Are</h2>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#1c2b36] mb-6 leading-[1.1] tracking-tight">
                  Your Reliable Partner for European Visas
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    TrustEuroHR is a premier foreign visa consultancy dedicated to helping clients navigate the complex immigration processes of select European nations. 
                  </p>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Based in Kathmandu, Nepal, we provide transparent, professional, and personalized assistance to ensure your travel and work ambitions are met with success.
                  </p>
                </div>
              </div>
          </motion.div>

          {/* Right Column: Animated Stat Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-5/12 flex flex-col gap-5 justify-center"
          >
            {stats.map((stat, i) => (
              <motion.div 
                variants={itemVariants}
                key={i} 
                className="bg-white p-6 md:p-8 rounded-[1rem] flex items-center gap-6 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group relative z-10"
              >
                <div className="relative w-14 h-14 shrink-0 rounded-full bg-[#f4f7fb] border border-[#e8edf4] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50" cy="50" r="48"
                      fill="none"
                      stroke="#0070ba"
                      strokeWidth="3"
                      strokeDasharray="301"
                      initial={{ strokeDashoffset: 301 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                      viewport={{ once: true }}
                      className="opacity-40"
                    />
                  </svg>
                  <stat.icon className="text-[#0070ba] z-10" size={22} />
                </div>
                
                <div>
                  <h4 className="text-3xl md:text-4xl font-black text-[#0070ba] flex items-baseline tracking-tight">
                    <AnimatedCounter to={stat.num} />
                    <span className="text-[#facc15] text-xl md:text-2xl ml-1">{stat.suffix}</span>
                  </h4>
                  <p className="text-sm font-bold text-[#1c2b36] mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Our Values Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((val, i) => (
            <motion.div 
              variants={itemVariants}
              key={i} 
              className="bg-white p-6 md:p-8 rounded-[1rem] shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-[0.8rem] border border-gray-100 flex items-center justify-center mb-5 group-hover:bg-[#f4f7fb] transition-colors">
                <val.icon size={18} className="text-[#0070ba]" />
              </div>
              <h5 className="text-lg md:text-xl font-bold text-[#1c2b36] mb-2">{val.title}</h5>
              <p className="text-gray-500 leading-relaxed text-base">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
