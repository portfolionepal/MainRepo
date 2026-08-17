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
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { 
          opacity: 1, x: 0,
          transition: { type: 'spring', stiffness: 80, delayChildren: 0.5, staggerChildren: 0.15 }
        }
      }}
      className="absolute top-1/2 -translate-y-1/2 left-0 z-20 hidden lg:flex flex-col items-center bg-white rounded-r-[1.5rem] p-4 py-6 shadow-[10px_0_30px_rgba(0,0,0,0.03)] border border-gray-100 border-l-0"
    >
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.8 } }} className="text-[9px] font-black uppercase tracking-widest text-brand-navy mb-5 text-left leading-tight w-full max-w-[80px]">
        Accepting<br/>applications<br/>for
      </motion.div>
      <div className="flex flex-col gap-5 mb-5">
        {flags.map((flag, index) => (
          <motion.div
            key={flag.name}
            variants={{
              hidden: { opacity: 0, scale: 0.5, y: 10 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 10 } }
            }}
            className="relative group cursor-pointer"
          >
            <div className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
              <img 
                src={flag.img} 
                alt={`${flag.name} flag`} 
                className="w-full h-full object-contain drop-shadow-md animate-flag-swing" 
                style={{ animationDelay: `${index * 0.3}s` }}
              />
            </div>
            
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-white text-brand-navy text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-gray-100 -translate-x-2 group-hover:translate-x-0">
              {flag.name}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-navy rounded-b-lg"></div>
              {/* Tooltip triangle tail */}
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-white border-l-4 border-l-transparent"></div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.5 } }} className="text-[10px] font-bold text-brand-navy">
        and more...
      </motion.div>
    </motion.div>
  );
};

export default AnimatedFlags;
