import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaBriefcase, FaCircleCheck, FaArrowRight, FaShieldHalved, FaClock, FaUsers, FaEarthEurope } from 'react-icons/fa6';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-pattern-dots opacity-[0.04] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-brand-accent to-brand-gold rounded-full mb-3 shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div>
            <h2 className="text-brand-accent font-bold tracking-widest uppercase text-sm font-sans">Our Expertise</h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-6 tracking-tight">Dedicated Visa Services</h3>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We specialize in streamlining your journey to Europe, ensuring a smooth and hassle-free visa application process.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20"
        >
          {/* Travel Visa */}
          <motion.div variants={itemVariants} className="h-full">
            <div className="bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-premium h-full flex flex-col overflow-hidden group/card relative z-10">
              <div className="w-full h-56 overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop" 
                  alt="Travel Visa" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Travel Visa</h4>
                <p className="text-gray-500 mb-8 leading-relaxed text-base">
                  Expert assistance for securing tourist and short-stay visas. We handle the complexities of documentation and appointments so you can focus on your itinerary.
                </p>
                
                <motion.ul 
                  variants={listContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4 mb-10 flex-grow"
                >
                  {['Document Verification', 'Application Processing', 'Interview Preparation'].map((item, i) => (
                    <motion.li variants={listItemVariants} key={i} className="flex items-center text-gray-600 font-medium text-sm">
                      <FaCircleCheck size={18} className="text-brand-blue mr-3 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                <a href="#contact" className="relative inline-flex items-center justify-center px-6 py-3 text-brand-blue font-bold text-sm uppercase tracking-wider rounded-full border-2 border-brand-blue/20 overflow-hidden group/link mt-auto w-fit transition-all duration-300 hover:border-transparent hover:shadow-[0_6px_20px_rgba(6,97,221,0.4)] hover:-translate-y-0.5">
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-sky opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center group-hover/link:text-white transition-colors duration-300">
                    Get Started
                    <FaArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Work Visa */}
          <motion.div variants={itemVariants} className="h-full">
            <div className="bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-premium h-full flex flex-col overflow-hidden group/card relative z-10">
              <div className="w-full h-56 overflow-hidden bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Work Visa" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Work Visa</h4>
                <p className="text-gray-500 mb-8 leading-relaxed text-base">
                  Comprehensive support for employment and long-stay visas. Navigate European labor regulations and consulate requirements with our specialized guidance.
                </p>
                
                <motion.ul 
                  variants={listContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4 mb-10 flex-grow"
                >
                  {['Contract Review Assistance', 'Legalization & Translation', 'Permit Navigation'].map((item, i) => (
                    <motion.li variants={listItemVariants} key={i} className="flex items-center text-gray-600 font-medium text-sm">
                      <FaCircleCheck size={18} className="text-brand-blue mr-3 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>

                <a href="#contact" className="relative inline-flex items-center justify-center px-6 py-3 text-brand-blue font-bold text-sm uppercase tracking-wider rounded-full border-2 border-brand-blue/20 overflow-hidden group/link mt-auto w-fit transition-all duration-300 hover:border-transparent hover:shadow-[0_6px_20px_rgba(6,97,221,0.4)] hover:-translate-y-0.5">
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-sky opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center group-hover/link:text-white transition-colors duration-300">
                    Learn More
                    <FaArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Credibility Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl border border-white p-6 shadow-sm"
        >
          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6">
            {[
              { icon: FaShieldHalved, label: 'Trusted Process' },
              { icon: FaClock, label: 'Fast Turnaround' },
              { icon: FaUsers, label: 'Personalized Support' },
              { icon: FaEarthEurope, label: '5 Countries Covered' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7F9FC] to-gray-100 flex items-center justify-center border border-gray-200/60 shadow-inner">
                  <item.icon size={18} className="text-brand-blue" />
                </div>
                <span className="text-sm font-bold text-brand-navy tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
