import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { X } from 'lucide-react';

const FloatingWhatsApp = () => {
  const [showCallout, setShowCallout] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Show callout on initial load after a delay
    const initialTimer = setTimeout(() => {
      setShowCallout(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    let hideTimer;
    if (showCallout) {
      hideTimer = setTimeout(() => {
        setShowCallout(false);
      }, 5000);
    }
    return () => clearTimeout(hideTimer);
  }, [showCallout]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Trigger at roughly 30%, 60%, 90% scroll depth
    if (latest > 0.3 && latest < 0.31) setShowCallout(true);
    if (latest > 0.6 && latest < 0.61) setShowCallout(true);
    if (latest > 0.9 && latest < 0.91) setShowCallout(true);
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {showCallout && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="bg-white text-brand-navy px-4 py-3 rounded-2xl shadow-xl border border-gray-100 mr-2 max-w-[220px] pointer-events-auto relative"
          >
            <button 
              onClick={() => setShowCallout(false)}
              className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-gray-600 rounded-full p-0.5 shadow-md border border-gray-100 transition-colors"
            >
              <X size={14} />
            </button>
            <p className="text-sm font-semibold leading-tight pr-2">
              Need direct assistance? Chat with us on WhatsApp! 💬
            </p>
            {/* Callout Tail */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white border-r-8 border-r-transparent drop-shadow-md"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/9779800000000" // Placeholder phone number
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto relative group flex items-center justify-center w-[60px] h-[60px]"
        onMouseEnter={() => setShowCallout(true)}
      >
        {/* Continuous Soft Pulse Ring */}
        <div className="absolute inset-0 rounded-full animate-[pulse-ring_2.5s_cubic-bezier(0.215,0.61,0.355,1)_infinite] pointer-events-none"></div>
        
        {/* Main Button */}
        <div className="relative w-full h-full bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.6)]">
          <FaWhatsapp className="w-8 h-8" />
        </div>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
