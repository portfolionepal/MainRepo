import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { DataContext } from '../context/DataContext';
import * as LucideIcons from 'lucide-react';

const ServiceDetail = () => {
  const { slug } = useParams();
  const { services } = React.useContext(DataContext);

  const service = services.find(s => 
    String(s.id) === String(slug) || 
    s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') === slug
  );

  // Scroll to top when loading the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-base text-center px-4">
        <h1 className="text-4xl font-heading font-bold text-text mb-4">Service Not Found</h1>
        <p className="text-text-muted mb-8">The service you are looking for does not exist.</p>
        <Link to="/" className="inline-flex items-center text-text hover:text-accent transition-all font-medium border border-surface-border hover:border-accent/50 bg-transparent hover:bg-accent/5 rounded-full px-4 py-2 text-sm w-fit mt-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-base min-h-screen">
      {/* Hero Header for Service */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-base-alt">
        <img 
          src={service.image} 
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base to-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
            <Link to="/#services" className="inline-flex items-center text-white/90 hover:text-white transition-all font-medium border border-white/30 hover:border-white/60 bg-transparent hover:bg-white/10 rounded-full px-4 py-2 text-sm w-fit -mt-4 mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Back to Services
            </Link>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="hidden sm:flex w-16 h-16 bg-accent rounded-full items-center justify-center shadow-lg border-2 border-white/20">
                {(() => {
                  let IconComponent = LucideIcons.HelpCircle;
                  if (service.iconName && LucideIcons[service.iconName]) {
                    IconComponent = LucideIcons[service.iconName];
                  } else if (typeof service.icon === 'string' && LucideIcons[service.icon]) {
                    IconComponent = LucideIcons[service.icon];
                  } else if (typeof service.icon === 'function' || typeof service.icon === 'object') {
                    IconComponent = service.icon;
                  }
                  return <IconComponent className="text-white" size={32} strokeWidth={2} />;
                })()}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-lg max-w-3xl">
                {service.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Service Details Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2">
            <span className="inline-block px-3 py-1 rounded-full bg-surface border border-surface-border text-accent text-xs font-medium uppercase tracking-wider mb-6">
              Detailed Service Overview
            </span>
            
            <div className="prose prose-lg text-text-muted max-w-none">
              <p className="text-xl font-medium text-text mb-6 leading-relaxed text-justify">
                {service.description}
              </p>
              <p className="whitespace-pre-line leading-relaxed text-justify">
                {service.fullDescription}
              </p>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-surface border border-surface-border rounded-xl p-8 sticky top-32 shadow-sm">
              <h3 className="font-heading font-semibold text-text mb-6 text-xl">What's Included:</h3>
              <ul className="space-y-4 mb-8">
                {service.detailedFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 size={20} className="text-accent mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/#contact" 
                className="block w-full bg-accent hover:bg-accent-hover text-white text-center font-medium py-4 px-6 rounded-md transition-colors shadow-sm"
              >
                Request this Service
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
