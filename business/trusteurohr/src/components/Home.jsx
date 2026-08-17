import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaGlobe, FaCircleCheck, FaUserGroup, FaShieldHalved, FaEarthEurope, FaHeadset, FaWhatsapp, FaPlane } from 'react-icons/fa6';
import AnimatedFlags from './AnimatedFlags';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';

// Memoized Airplane component to prevent re-renders when mousePos changes in Home
const FlyingAirplane = React.memo(() => {
  return (
    <motion.div
      className="absolute top-[60%] lg:top-[55%] left-0 text-brand-blue z-50 pointer-events-none"
      initial={{ x: '-20vw', y: 0 }}
      animate={{ x: '130vw', y: typeof window !== 'undefined' && window.innerWidth < 768 ? -550 : -300 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <img src="/airplane.png" alt="Flying Airplane" className="w-32 md:w-64 h-auto opacity-70 rotate-[-10deg]" />
    </motion.div>
  );
});

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <>
      <section id="home" className="relative w-full pt-32 lg:pt-40 pb-16 lg:pb-40 bg-gradient-to-br from-[#EAF4FC] to-[#D9EAF7]" onMouseMove={handleMouseMove}>
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute inset-[-10%] z-0"
            animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {/* Faint map pattern placeholder */}
            <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>
          </motion.div>

          <FlyingAirplane />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col xl:flex-row items-center gap-12 xl:gap-8">

          {/* Left Column: Text & CTA */}
          <div className="w-full xl:w-5/12 max-w-2xl mt-8 xl:mt-0 lg:pl-28 xl:pl-32 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-brand-accent"></div>
                <span className="text-brand-accent font-bold tracking-[0.2em] uppercase text-[11px] font-sans">
                  Premium Foreign Consultancy
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-brand-blue leading-[1.1] mb-6 tracking-tight font-serif drop-shadow-sm">
                Your Gateway to <br />
                European Opportunities
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base md:text-lg text-brand-navy/70 mb-10 max-w-lg leading-relaxed font-medium"
            >
              Expert guidance for securing work and travel visas across Europe. We turn your global ambitions into reality with trust, transparency, and unparalleled service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#services"
                className="px-8 py-3.5 bg-brand-blue text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 group"
              >
                Explore Services
                <FaArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </MagneticButton>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-white text-brand-navy hover:bg-gray-50 font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 border border-gray-100"
              >
                Contact Us
              </a>
            </motion.div>
          </div>

          {/* Right Column: Skewed Image Composition */}
          <div className="w-full xl:w-7/12 relative h-[500px] md:h-[650px] z-10 flex justify-center xl:justify-end mt-12 xl:mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[800px] h-full"
              animate={{ x: mousePos.x * 1, y: mousePos.y * 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 75, damping: 20 }}
            >

              {/* Main Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute right-0 top-0 w-[55%] h-full z-10 -skew-x-[10deg] rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-white/40"
              >
                <div className="absolute top-0 -left-[30%] w-[160%] h-full skew-x-[10deg]">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Oia_sunset_-_panoramio_%282%29.jpg/1280px-Oia_sunset_-_panoramio_%282%29.jpg" alt="Santorini, Greece" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Top Left Image */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute left-[12%] top-[5%] w-[35%] h-[35%] z-20 -skew-x-[10deg] rounded-3xl overflow-hidden shadow-xl border-[6px] border-white/60 bg-white"
              >
                <div className="absolute top-0 -left-[30%] w-[160%] h-full skew-x-[10deg]">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Castelul_Bran2.jpg/1280px-Castelul_Bran2.jpg" alt="Bran Castle, Romania" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Bottom Left Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute left-[5%] bottom-[5%] w-[40%] h-[40%] z-20 -skew-x-[10deg] rounded-3xl overflow-hidden shadow-xl border-[6px] border-white/60 bg-white"
              >
                <div className="absolute top-0 -left-[30%] w-[160%] h-full skew-x-[10deg]">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Russian_church_%2837591925970%29.jpg/1280px-Russian_church_%2837591925970%29.jpg" alt="Sofia, Bulgaria" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Floating Glass Widget */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9, type: 'spring' }}
                viewport={{ once: true }}
                className="absolute top-[40%] left-[25%] z-30 bg-white/95 backdrop-blur-md rounded-[1.5rem] p-5 shadow-2xl border border-white"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <FaGlobe size={20} />
                  </div>
                  <div className="font-bold text-brand-navy leading-tight">
                    European<br />Visa Experts
                  </div>
                </div>
                <ul className="space-y-3">
                  {['Working Visa', 'Travel Visa'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-brand-navy/80">
                      <FaCircleCheck className="text-brand-blue" size={16} /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <AnimatedFlags />

        {/* Bottom Stats Bar */}
        <div className="relative lg:absolute lg:bottom-0 left-0 right-0 px-6 md:px-12 z-40 lg:transform lg:translate-y-1/2 mt-16 lg:mt-0">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-visible relative">
              {/* Left Stats Section */}
              <div className="flex-1 bg-white rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none flex flex-wrap lg:flex-nowrap items-center py-6 px-8 gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {[
                  { icon: FaUserGroup, num: '500', title: 'Visas Approved' },
                  { icon: FaShieldHalved, num: '98', title: 'Success Rate', suffix: '%' },
                  { icon: FaEarthEurope, num: '25', title: 'European Countries' },
                  { icon: FaHeadset, num: '24/7', title: 'Support Assistance', prefix: '' }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4 w-full lg:w-1/4 px-4 pt-4 lg:pt-0 first:pt-0">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <stat.icon className="text-brand-blue" size={20} />
                    </div>
                    <div>
                      <div className="text-xl font-black text-brand-navy flex items-baseline">
                        {stat.num !== '24/7' ? <><AnimatedCounter to={parseInt(stat.num)} />+</> : stat.num}
                        {stat.suffix && <span>{stat.suffix}</span>}
                      </div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Trust Section */}
              <div className="bg-brand-blue rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none text-white py-6 px-8 flex items-center justify-center gap-4 min-w-[300px]">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <FaCircleCheck size={20} />
                </div>
                <div>
                  <div className="font-bold text-lg">Trusted by Thousands</div>
                  <div className="text-xs text-white/70">Your journey, our commitment.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
