import React from 'react';
import { motion } from 'framer-motion';

import bgGif from '../assets/flags/bulgaria.gif';
import grGif from '../assets/flags/greece.gif';
import skGif from '../assets/flags/slovakia.gif';
import roGif from '../assets/flags/romania.gif';
import rsGif from '../assets/flags/serbia.gif';

const flags = [
  { img: bgGif, name: 'Bulgaria' },
  { img: grGif, name: 'Greece' },
  { img: skGif, name: 'Slovakia' },
  { img: roGif, name: 'Romania' },
  { img: rsGif, name: 'Serbia' },
];

const AnimatedFlags = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 80 }}
      className="absolute top-24 right-4 md:right-8 xl:right-16 z-20 hidden md:flex flex-col items-center bg-white/40 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/50"
    >
      <span className="text-[11px] font-bold uppercase tracking-widest text-brand-navy mb-4 opacity-80 text-center leading-tight">
        Now accepting<br/>applications for
      </span>
      <div className="flex flex-col gap-4">
        {flags.map((flag, index) => (
          <div
            key={flag.name}
            className="relative group cursor-pointer"
          >
            <div className="w-16 h-12 md:w-20 md:h-14 rounded-lg shadow-md overflow-hidden border-2 border-white bg-gray-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,97,221,0.4)] group-hover:border-brand-blue">
              <img src={flag.img} alt={`${flag.name} flag`} className="w-full h-full object-cover" />
            </div>
            
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-white text-brand-navy text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-gray-100 translate-x-2 group-hover:translate-x-0">
              {flag.name}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-sky rounded-b-lg"></div>
              {/* Tooltip triangle tail */}
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-brand-blue border-r-4 border-r-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedFlags;
