import React from 'react';
import { motion } from 'framer-motion';

import bgGif from '../assets/flags/bulgaria.gif';
import grGif from '../assets/flags/greece.gif';
import skGif from '../assets/flags/slovakia.gif';
import roGif from '../assets/flags/romania.gif';
import rsGif from '../assets/flags/serbia.gif';

const flags = [
  { img: bgGif, name: 'Bulgaria' },
  { img: roGif, name: 'Romania' },
  { img: grGif, name: 'Greece' },
  { img: rsGif, name: 'Serbia' },
  { img: skGif, name: 'Slovakia' },
];

const AnimatedFlags = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { 
          opacity: 1, y: 0,
          transition: { type: 'spring', stiffness: 80, delayChildren: 0.5, staggerChildren: 0.15 }
        }
      }}
      className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 z-20 flex flex-row lg:flex-col items-center gap-3 lg:gap-0 bg-white/90 backdrop-blur-md lg:bg-white rounded-2xl lg:rounded-l-none lg:rounded-r-[1.5rem] px-4 py-2 lg:p-4 lg:py-6 shadow-md lg:shadow-[10px_0_30px_rgba(0,0,0,0.03)] border border-white lg:border-gray-100 lg:border-l-0 w-max mx-auto mt-8 lg:mt-0"
    >
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.8 } }} className="text-[10px] lg:text-[9px] font-black uppercase tracking-widest text-brand-navy lg:mb-5 text-center lg:text-left leading-tight">
        <span className="hidden lg:inline">Accepting<br/>applications<br/>for</span>
        <span className="lg:hidden">Visas For:</span>
      </motion.div>
      <div className="flex flex-row lg:flex-col gap-3 lg:gap-5 lg:mb-5 items-center">
        {flags.map((flag, index) => (
          <motion.div
            key={flag.name}
            variants={{
              hidden: { opacity: 0, scale: 0.5, y: 10 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 10 } }
            }}
            className="relative group cursor-pointer"
          >
            <div className="w-8 h-6 lg:w-16 lg:h-12 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
              <img 
                src={flag.img} 
                alt={`${flag.name} flag`} 
                className="w-full h-full object-contain drop-shadow-md animate-flag-swing" 
                style={{ animationDelay: `${index * 0.3}s` }}
              />
            </div>
            
            <div className="absolute left-1/2 lg:left-full top-full lg:top-1/2 -translate-x-1/2 lg:-translate-x-2 lg:-translate-y-1/2 mt-3 lg:mt-0 lg:ml-4 px-3 py-1.5 bg-white text-brand-navy text-xs lg:text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-gray-100 z-50">
              {flag.name}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-navy rounded-b-lg"></div>
              {/* Tooltip triangle tail */}
              <div className="hidden lg:block absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-white border-l-4 border-l-transparent"></div>
              <div className="lg:hidden absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-white border-t-4 border-t-transparent"></div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.5 } }} className="hidden lg:block text-[10px] font-bold text-brand-navy">
        and more...
      </motion.div>
    </motion.div>
  );
};

export default AnimatedFlags;
