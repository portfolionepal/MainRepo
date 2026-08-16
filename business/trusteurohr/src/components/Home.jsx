import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, TrendingUp, Clock, Users } from 'lucide-react';
import AnimatedFlags from './AnimatedFlags';

const Home = () => {
  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-transparent">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_bg.png" 
            alt="European City background" 
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F9FC]/80 to-[#F7F9FC]"></div>
          
          {/* Subtle hero-specific blob behind headline */}
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-brand-sky/10 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob pointer-events-none"></div>
        </div>

        <AnimatedFlags />

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Column: Text & CTA */}
          <div className="w-full lg:w-1/2 max-w-2xl mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/30 mb-6 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(211,26,28,0.6)]"></span>
                <span className="text-brand-blue font-bold tracking-widest uppercase text-xs">
                  Premium Foreign Consultancy
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-navy leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                Your Gateway to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-sky to-brand-navy">
                  European Opportunities
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed"
            >
              TrustEuroHR provides expert, end-to-end guidance for securing travel and work visas in top European destinations. We turn your global ambitions into reality with trust, transparency, and unparalleled service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#services"
                className="px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-sky text-white font-bold rounded-full shadow-[0_4px_14px_0_rgba(6,97,221,0.39)] hover:shadow-[0_6px_20px_rgba(6,97,221,0.6)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 group"
              >
                Explore Services
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-transparent border-[1.5px] border-brand-navy text-brand-navy hover:bg-brand-navy/5 font-bold rounded-full transition-all duration-300 flex items-center gap-2"
              >
                Contact Us
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Image & Stat Card */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative max-w-[500px] w-full"
            >
              {/* Image Frame */}
              <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden p-2 bg-gradient-to-br from-brand-sky/40 via-brand-blue/20 to-transparent shadow-[0_20px_60px_-15px_rgba(6,97,221,0.3)]">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop" 
                  alt="Professional Team handshake" 
                  className="rounded-[1.5rem] md:rounded-[2.5rem] w-full h-[450px] md:h-[600px] object-cover"
                />
              </div>

              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, y: 40, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 md:-left-12 bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-2xl shadow-[0_10px_40px_-15px_rgba(6,97,221,0.25)] flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-sky flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="text-white" size={24} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-navy leading-none">500+</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Visas Approved</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-white border-y border-gray-100 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[
              { icon: Globe, value: '5+', label: 'European Countries' },
              { icon: TrendingUp, value: '98%', label: 'Success Rate' },
              { icon: Users, value: '1000+', label: 'Happy Clients' },
              { icon: Clock, value: '24/7', label: 'Dedicated Support' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 px-4 md:px-8 w-full md:w-auto pt-6 md:pt-0 first:pt-0"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-sky/20 flex items-center justify-center shrink-0 border border-brand-blue/10">
                  <stat.icon className="text-brand-blue" size={20} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-xl font-bold text-brand-navy leading-none">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
