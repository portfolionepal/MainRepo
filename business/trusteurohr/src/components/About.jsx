import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Globe2, TrendingUp, Headphones, Eye, UserCheck, ShieldCheck } from 'lucide-react';

const AnimatedCounter = ({ from = 0, to }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, inView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

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
    { num: 5, suffix: '+', label: 'European Countries', icon: Globe2 },
    { num: 98, suffix: '%', label: 'Success Rate', icon: TrendingUp },
    { num: 24, suffix: '/7', label: 'Client Support', icon: Headphones }
  ];

  const values = [
    { icon: Eye, title: 'Transparency', desc: 'Clear processes and upfront communication every step of the way.' },
    { icon: UserCheck, title: 'Personalized Guidance', desc: 'Tailored visa strategies based on your unique profile and goals.' },
    { icon: ShieldCheck, title: 'Proven Track Record', desc: 'Hundreds of successful cases handled with the utmost security and care.' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-sky/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
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
            <div className="relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/20 to-brand-sky/20 blur-xl rounded-[2rem]"></div>
              <div className="relative bg-[#F7F9FC]/90 backdrop-blur-md border-l-4 border-l-brand-gold border-y border-r border-white/60 p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(6,97,221,0.15)] h-full flex flex-col">
                
                {/* Supporting Visual inside the card */}
                <div className="w-full h-48 md:h-56 mb-8 rounded-xl overflow-hidden relative shadow-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop" 
                    alt="European Travel Passport" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent"></div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-1 bg-gradient-to-r from-brand-blue to-brand-sky rounded-full"></div>
                  <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm">Who We Are</h2>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-6 leading-tight">
                  Your Reliable Partner for European Visas
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    TrustEuroHR is a premier foreign visa consultancy dedicated to helping clients navigate the complex immigration processes of select European nations. 
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Based in Kathmandu, Nepal, we provide transparent, professional, and personalized assistance to ensure your travel and work ambitions are met with success.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Stat Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-5/12 flex flex-col gap-6 justify-center"
          >
            {stats.map((stat, i) => (
              <motion.div 
                variants={itemVariants}
                key={i} 
                className="bg-white/80 backdrop-blur-md border border-white/60 p-6 md:p-8 rounded-[2rem] flex items-center gap-6 transform transition-all duration-300 hover:scale-[1.02] shadow-[0_10px_40px_-15px_rgba(6,97,221,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(6,97,221,0.2)] group"
              >
                <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-sky/20 border border-brand-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-brand-blue" size={28} strokeWidth={1.75} />
                </div>
                
                <div>
                  <h4 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-sky flex items-baseline">
                    <AnimatedCounter to={stat.num} />
                    <span className="text-brand-gold text-2xl md:text-3xl ml-1">{stat.suffix}</span>
                  </h4>
                  <p className="text-lg font-bold text-brand-navy mt-1">{stat.label}</p>
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
              className="bg-[#F7F9FC]/60 border border-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-brand-blue">
                <val.icon size={24} strokeWidth={2} />
              </div>
              <h5 className="text-xl font-bold text-brand-navy mb-3">{val.title}</h5>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
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
