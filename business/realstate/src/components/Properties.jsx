import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Properties = () => {
  const navigate = useNavigate();
  const { properties } = useContext(DataContext);
  
  // Show only up to 3 properties on the home page
  const featuredProperties = properties.slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case 'For Sale': return 'bg-accent/10 text-accent border-accent/20';
      case 'Available': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Sold': return 'bg-surface-border text-text-muted border-surface-border';
      default: return 'bg-surface-border text-text';
    }
  };

  return (
    <section id="properties" className="py-24 bg-base-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">Real Estate</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-4">
            Available Land & Properties
          </h3>
          <p className="text-text-muted mb-8">
            Explore our curated selection of verified land parcels and properties for sale.
          </p>
        </motion.div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((prop, index) => (
            <motion.div 
              key={prop.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-surface-border rounded-md overflow-hidden hover:border-accent/50 transition-all cursor-pointer shadow-sm hover:shadow-md group flex flex-col"
              onClick={() => navigate(`/property/${prop.id}`)}
            >
              <div className="w-full h-56 bg-base-alt relative overflow-hidden">
                {prop.images && prop.images.length > 0 ? (
                  <img 
                    src={prop.images[0]} 
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-base-alt flex items-center justify-center">
                    <span className="text-text-muted text-xs">No Image</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`text-xs px-3 py-1 font-medium rounded-full bg-surface shadow-sm border ${getStatusColor(prop.status)}`}>
                    {prop.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-accent">{prop.type}</span>
                  </div>
                  <h4 className="text-lg font-heading font-semibold text-text mb-2 line-clamp-2">{prop.title}</h4>
                  <p className="text-text font-medium mb-3">{prop.price}</p>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2 text-justify">{prop.description}</p>
                </div>
                
                <div className="flex items-center pt-4 border-t border-surface-border/50 text-text-muted text-sm mt-auto">
                  <MapPin size={16} className="mr-2 text-accent" />
                  <span className="truncate">{prop.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/properties')}
            className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-medium transition-colors shadow-sm inline-flex items-center"
          >
            View All Properties
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Properties;
