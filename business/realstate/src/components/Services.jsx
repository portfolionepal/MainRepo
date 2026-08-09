import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Services = () => {
  const { services } = useContext(DataContext);

  return (
    <section id="services" className="py-24 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">Professional Services</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-4">
            Expert solutions for your land and surveying needs
          </h3>
          <p className="text-text-muted">
            From preliminary land consultation to precise cadastral mapping, we offer a comprehensive range of surveying services across Nepal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            // For dynamically added services from context that save the icon as a string name:
            const IconComponent = typeof service.icon === 'string' ? LucideIcons[service.iconName || service.icon] : service.icon;

            return (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-surface border border-surface-border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Section */}
              <Link to={`/service/${slug}`} className="w-full h-48 relative bg-base-alt overflow-hidden block">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </Link>

              {/* Content Section */}
              <div className="p-6 pt-10 flex flex-col flex-grow">
                <Link to={`/service/${slug}`} className="text-xl font-heading font-bold text-text mb-3 hover:text-accent transition-colors block">
                  {service.title}
                </Link>
                <p className="text-sm text-text-muted leading-relaxed mb-6 text-justify">
                  {service.description}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    to={`/service/${slug}`}
                    className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-hover transition-colors group/link"
                  >
                    Learn More 
                    <ArrowRight size={16} className="ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Decorative Bottom Line */}
              <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-accent transform origin-left scale-x-100 opacity-80 group-hover:scale-x-110 transition-transform duration-300"></div>
            </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
