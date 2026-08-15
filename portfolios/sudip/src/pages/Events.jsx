import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Calendar, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

export default function Events() {
  const { siteContent } = useAdminContext();
  const events = siteContent.events.items;
  const pastEvents = siteContent.events.pastItems || [];
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const getDisplayedEvents = () => {
    if (filterType === 'upcoming') return events;
    if (filterType === 'previous') return pastEvents;
    return [...events, ...pastEvents];
  };

  const displayedEvents = getDisplayedEvents();

  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">Events</h1>
          <p className="text-xl text-gray-600">
            Join Sudeep Basnet for transformative public seminars, webinars, and interactive workshops.
          </p>
        </AnimatedSection>

        {/* Filter Buttons */}
        <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Upcoming', 'Previous'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type.toLowerCase())}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filterType === type.toLowerCase()
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </AnimatedSection>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <AnimatePresence mode="popLayout">
            {displayedEvents.map((event, index) => {
              const isPast = pastEvents.some(p => p.id === event.id);
              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedEvent(event)}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col group relative overflow-hidden cursor-pointer hover:-translate-y-1 duration-300 ${isPast ? 'opacity-90 hover:opacity-100' : ''}`}
                >
                  {/* Image Section */}
                  <div className="h-48 w-full overflow-hidden relative">
                    <img 
                      src={getImageUrl(event.image || event.imageUrl)} 
                      alt={event.title} 
                      className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${isPast ? 'grayscale group-hover:grayscale-0' : ''}`}
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isPast && (
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                        Past Event
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-[60px] -z-10 group-hover:bg-accent/10 transition-colors"></div>
                    <div className="flex items-center text-gray-500 text-sm font-bold mb-4">
                      <Calendar className={`w-4 h-4 mr-2 ${!isPast ? 'text-accent' : ''}`} />
                      {event.date}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-2">{event.title}</h3>
                    <p className="text-gray-500 mb-6 flex-grow">{event.location}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">{event.type}</span>
                      <button className="text-primary font-medium group-hover:text-accent transition-colors">View Details</button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {displayedEvents.length === 0 && (
             <div className="col-span-full text-center py-12">
               <p className="text-gray-500 text-lg">No events found for this category.</p>
             </div>
          )}
        </div>

        {/* Modal Popup */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedEvent(null)}
              />
              
              {/* Modal Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden z-10 flex flex-col"
              >
                {/* Header Image */}
                <div className="relative h-64 sm:h-80 w-full">
                  <img 
                    src={getImageUrl(selectedEvent.image || selectedEvent.imageUrl)} 
                    alt={selectedEvent.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-6 left-8 right-8">
                    <span className="inline-block px-3 py-1 bg-accent text-white rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                      {selectedEvent.type}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                      {selectedEvent.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-700 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="flex items-center"><Calendar className="w-5 h-5 mr-2 text-accent"/> {selectedEvent.date}</span>
                    <span className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-accent"/> {selectedEvent.location}</span>
                  </div>
                  
                  <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
                    <p className="whitespace-pre-wrap">{selectedEvent.description}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-end gap-4 mt-auto pt-6 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedEvent(null)} 
                      className="px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 hover:text-primary text-gray-600 rounded-full font-medium transition-all"
                    >
                      Close
                    </button>
                    <button className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                      Reserve Spot Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
