import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/upload';

const GalleryCard = ({ item, onImageClick }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract unlimited images, supporting new images array and falling back to legacy keys
  const images = (item.images || [item.image1, item.image2, item.image3, item.url, item.image, item.imageUrl])
    .filter(Boolean)
    .map(getImageUrl)
    .filter((v, i, a) => a.indexOf(v) === i);

  // Handle manual scroll to update dots
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollPosition / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollLeft = (e) => {
    e.stopPropagation();
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: -width, behavior: 'smooth' });
    }
  };

  const scrollRight = (e) => {
    e.stopPropagation();
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({ left: width, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-[350px] flex flex-col bg-white">
      {/* Scrollable Image Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.length > 0 ? (
          images.map((img, idx) => (
            <div 
              key={idx} 
              className="w-full h-full shrink-0 snap-center relative cursor-pointer"
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt={item.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
          ))
        ) : (
          <div className="w-full h-full shrink-0 snap-center bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button 
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Pagination Dots (The "Scroll Bar" indicator) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none z-20">
        <span className="text-accent text-sm font-bold tracking-wider uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.category}
        </span>
        <h3 className="text-white text-xl font-serif font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {item.title}
        </h3>
      </div>
    </div>
  );
};

export default function Gallery() {
  const { siteContent } = useAdminContext();
  const galleryItems = siteContent.gallery.items || [];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

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
              <GalleryCard item={item} onImageClick={setSelectedImage} />
            </AnimatedSection>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No images found for this category.
          </div>
        )}

      </div>

      {/* Lightbox / Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-black rounded-full p-2 transition-colors z-[60]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged gallery view"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl z-[55]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
