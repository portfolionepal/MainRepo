import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const { projects: gallery } = useContext(DataContext);
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', ...new Set(gallery.map(item => item.category))];

  const filteredGallery = filter === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-4">
            Recent Projects & Work
          </h3>
        </motion.div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-surface border border-accent text-accent shadow-sm' 
                  : 'bg-transparent border border-surface-border text-text-muted hover:text-text hover:border-text-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredGallery.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4 }}
                key={item.id} 
                className="group flex flex-col bg-surface border border-surface-border rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setSelectedImage(item)}
              >
                <div className="w-full h-56 relative overflow-hidden bg-base-alt">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-xs px-3 py-1 font-medium rounded-full bg-surface shadow-sm border border-surface-border text-accent">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="text-xl font-heading font-semibold text-text mb-2 group-hover:text-accent transition-colors line-clamp-1">{item.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2 text-left">{item.description}</p>
                  </div>
                  <div className="flex items-center text-accent text-sm font-medium mt-auto">
                    View Project <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-base/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-text hover:text-accent transition-colors bg-surface p-2 rounded-full shadow-md"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="max-w-5xl w-full max-h-[90vh] bg-surface border border-surface-border rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 bg-base-alt flex items-center justify-center relative min-h-[300px]">
                {selectedImage.imageUrl ? (
                  <img 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.title}
                    className="w-full h-full object-cover max-h-[40vh] md:max-h-full"
                  />
                ) : (
                  <span className="text-text-muted">No Image</span>
                )}
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
                <span className="inline-block px-3 py-1 rounded-full bg-base border border-surface-border text-accent text-xs font-medium uppercase tracking-wider mb-4 w-fit shrink-0">
                  {selectedImage.category}
                </span>
                <h4 className="text-2xl font-heading font-semibold text-text mb-4 shrink-0">{selectedImage.title}</h4>
                <div className="text-sm text-text-muted leading-relaxed mb-8 text-left">
                  {selectedImage.description}
                </div>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="mt-auto w-full bg-base hover:bg-base-alt border border-surface-border text-text font-medium py-3 px-4 rounded-md transition-colors shrink-0"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
