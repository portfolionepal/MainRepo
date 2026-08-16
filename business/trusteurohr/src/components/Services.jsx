import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Briefcase, CheckCircle2, ArrowRight, Shield, Clock, Users, Globe } from 'lucide-react';

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
    <section id="services" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background gradient blob for texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-sky/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-brand-gold to-brand-red rounded-full mb-3 shadow-[0_0_10px_rgba(251,228,40,0.5)]"></div>
            <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm">Our Expertise</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-6 tracking-tight">Dedicated Visa Services</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
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
          <motion.div variants={itemVariants} className="group h-full">
            <div className="bg-[#F7F9FC]/80 backdrop-blur-sm border border-white p-8 md:p-10 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-sky hover:shadow-[0_20px_60px_-15px_rgba(6,97,221,0.25)] h-full shadow-[0_10px_40px_-15px_rgba(6,97,221,0.1)] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-brand-sky/10 transition-colors"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-sky rounded-2xl flex items-center justify-center mb-8 shadow-[0_8px_16px_rgba(6,97,221,0.3)]">
                <Plane className="text-white" size={32} strokeWidth={1.75} />
              </div>
              
              <h4 className="text-2xl font-bold text-brand-navy mb-4">Travel Visa</h4>
              <p className="text-gray-600 mb-8 leading-relaxed">
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
                  <motion.li variants={listItemVariants} key={i} className="flex items-center text-gray-700 font-medium">
                    <CheckCircle2 size={20} className="text-brand-blue mr-3 shrink-0 drop-shadow-sm" strokeWidth={2} />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <a href="#contact" className="inline-flex items-center text-brand-blue font-bold text-sm uppercase tracking-wider group/link mt-auto w-fit">
                Get Started
                <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Work Visa */}
          <motion.div variants={itemVariants} className="group h-full">
            <div className="bg-[#F7F9FC]/80 backdrop-blur-sm border border-white p-8 md:p-10 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-navy hover:shadow-[0_20px_60px_-15px_rgba(2,25,91,0.2)] h-full shadow-[0_10px_40px_-15px_rgba(2,25,91,0.08)] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-navy/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-brand-navy/10 transition-colors"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl flex items-center justify-center mb-8 shadow-[0_8px_16px_rgba(2,25,91,0.3)]">
                <Briefcase className="text-white" size={32} strokeWidth={1.75} />
              </div>
              
              <h4 className="text-2xl font-bold text-brand-navy mb-4">Work Visa</h4>
              <p className="text-gray-600 mb-8 leading-relaxed">
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
                  <motion.li variants={listItemVariants} key={i} className="flex items-center text-gray-700 font-medium">
                    <CheckCircle2 size={20} className="text-brand-navy mr-3 shrink-0 drop-shadow-sm" strokeWidth={2} />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <a href="#contact" className="inline-flex items-center text-brand-navy font-bold text-sm uppercase tracking-wider group/link mt-auto w-fit">
                Learn More
                <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1.5 transition-transform" />
              </a>
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
              { icon: Shield, label: 'Trusted Process' },
              { icon: Clock, label: 'Fast Turnaround' },
              { icon: Users, label: 'Personalized Support' },
              { icon: Globe, label: '5 Countries Covered' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7F9FC] to-gray-100 flex items-center justify-center border border-gray-200/60 shadow-inner">
                  <item.icon size={18} className="text-brand-blue" strokeWidth={2} />
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
