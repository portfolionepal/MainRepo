import { useContext, useEffect, useRef, Fragment } from 'react';
import { DataContext } from '../context/DataContext';
import { motion, useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ from = 0, to, suffix = '+' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, from, to, suffix]);

  return <span ref={ref}>{from}{suffix}</span>;
};

const About = () => {
  const { siteConfig } = useContext(DataContext);

  return (
    <section id="about" className="py-24 bg-base-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Image / Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[3/4] md:aspect-square bg-surface border border-surface-border rounded-md overflow-hidden relative z-10">
              <img 
                src={siteConfig.aboutImage} 
                alt={siteConfig.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-surface border border-surface-border p-6 rounded-md z-20 shadow-xl flex flex-col gap-4">
              {siteConfig.statistics?.map((stat, index) => (
                <Fragment key={stat.id}>
                  <div>
                    <p className="text-3xl font-heading font-semibold text-accent mb-1"><AnimatedCounter to={stat.value} /></p>
                    <p className="text-text-muted text-xs uppercase tracking-wider">{stat.label}</p>
                  </div>
                  {index < (siteConfig.statistics?.length || 0) - 1 && (
                    <div className="w-full h-px bg-surface-border"></div>
                  )}
                </Fragment>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-6">
              {siteConfig.aboutTitle}
            </h3>
            
            <div className="space-y-4 text-text-muted mb-8 leading-relaxed text-left whitespace-pre-line">
              {siteConfig.aboutText}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
