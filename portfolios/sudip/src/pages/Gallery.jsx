import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/upload';

const GalleryCard = ({ item, onAlbumClick }) => {
  const images = (item.images || [item.image1, item.image2, item.image3, item.url, item.image, item.imageUrl])
    .filter(Boolean)
    .map(getImageUrl)
    .filter((v, i, a) => a.indexOf(v) === i);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div 
      className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-[350px] flex flex-col bg-white cursor-pointer"
      onClick={() => onAlbumClick(item)}
    >
      <div className="w-full h-full relative bg-gray-100">
        {images.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              src={images[currentIndex]}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          </AnimatePresence>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none z-20">
        <span className="text-accent text-sm font-bold tracking-wider uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.category}
        </span>
        <h3 className="text-white text-xl font-serif font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {item.title}
        </h3>
        {images.length > 1 && (
          <span className="text-white/80 text-xs mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            {images.length} Photos
          </span>
        )}
      </div>
    </div>
  );
};

const AlbumPopup = ({ item, onClose }) => {
  const images = (item.images || [item.image1, item.image2, item.image3, item.url, item.image, item.imageUrl])
    .filter(Boolean)
    .map(getImageUrl)
    .filter((v, i, a) => a.indexOf(v) === i);

  const [activeIndex, setActiveIndex] = useState(0);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-black rounded-full p-2 transition-colors z-[60]"
      >
        <X className="w-8 h-8" />
      </button>

      <div 
        className="w-full h-[90vh] max-w-[1400px] flex flex-col md:flex-row gap-6 md:gap-8 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnails */}
        <div className="w-full md:w-32 shrink-0 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hide p-2 max-h-[15vh] md:max-h-full">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 w-20 h-20 md:w-full md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                idx === activeIndex 
                  ? 'border-white scale-100 opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'border-transparent opacity-40 hover:opacity-100 hover:scale-[0.98]'
              }`}
            >
              <img src={img} alt={`${item.title} - thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Big Image Viewer */}
        <div className="flex-1 w-full h-full relative flex items-center justify-center overflow-hidden group bg-[#0a0a0a] rounded-2xl shadow-2xl border border-white/5">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={images[activeIndex]}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-6 md:p-10 text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-2xl md:text-4xl font-serif font-bold mb-2 drop-shadow-lg">{item.title}</h3>
            {item.category && <p className="text-white/80 text-sm md:text-base font-semibold tracking-wide uppercase drop-shadow-md">{item.category}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Gallery() {
  const { siteContent } = useAdminContext();
  const galleryItems = siteContent.gallery.items || [];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const categories = ['All', ...new Set(galleryItems.map(item => item.category).filter(Boolean))];

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">{siteContent.gallery.pageTitle || 'Our Gallery'}</h1>
          <p className="text-xl text-gray-600">
            {siteContent.gallery.pageSubtitle || 'A visual journey of our transformative training programs, seminars, and coaching sessions.'}
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.05}>
              <GalleryCard item={item} onAlbumClick={setSelectedAlbum} />
            </AnimatedSection>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No images found for this category.
          </div>
        )}

      </div>

      {/* Album Lightbox / Popup */}
      <AnimatePresence>
        {selectedAlbum && (
          <AlbumPopup item={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
