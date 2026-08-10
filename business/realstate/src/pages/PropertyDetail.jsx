import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const { properties } = useContext(DataContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const property = properties.find(p => String(p.id) === String(id));

  // Scroll to top when loading the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-base text-center px-4">
        <h1 className="text-4xl font-heading font-bold text-text mb-4">Property Not Found</h1>
        <p className="text-text-muted mb-8">The property you are looking for does not exist.</p>
        <Link to="/properties" className="inline-flex items-center text-accent hover:text-accent-hover font-medium">
          <ArrowLeft size={16} className="mr-2" />
          Back to Properties
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'For Sale': return 'bg-accent/10 text-accent border-accent/20';
      case 'Available': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Sold': return 'bg-surface-border text-text-muted border-surface-border';
      default: return 'bg-surface-border text-text';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="pt-24 bg-base min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8 mt-4">
          <Link to="/properties" className="inline-flex items-center text-text hover:text-accent transition-all font-medium border border-surface-border hover:border-accent/50 bg-transparent hover:bg-accent/5 rounded-full px-4 py-2 text-sm w-fit">
            <ArrowLeft size={16} className="mr-2" />
            Back to Properties
          </Link>
        </div>

        {/* Title & Status */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium uppercase tracking-wider text-accent">{property.type}</span>
              <span className={`text-xs px-3 py-1 font-medium rounded-full bg-surface shadow-sm border ${getStatusColor(property.status)}`}>
                {property.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-text mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-text-muted text-lg mt-3">
              <MapPin size={20} className="mr-2 text-accent flex-shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-3xl md:text-4xl font-bold text-accent">{property.price}</p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-surface border border-surface-border rounded-xl overflow-hidden shadow-sm mb-12">
          <div className="relative w-full h-[50vh] min-h-[400px] bg-base-alt flex items-center justify-center group">
            {property.images && property.images.length > 0 ? (
              <>
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={`${property.title} - view ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-surface/80 hover:bg-surface text-text rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all border border-surface-border hover:border-accent"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-surface/80 hover:bg-surface text-text rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all border border-surface-border hover:border-accent"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-y-1/2 flex gap-3 p-2 bg-surface/60 rounded-full backdrop-blur-sm">
                      {property.images.map((_, idx) => (
                        <button
                          key={idx} 
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-accent scale-125' : 'bg-surface-border hover:bg-text-muted'}`} 
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <span className="text-text-muted">No Images Available</span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Main Description */}
          <div className="md:col-span-2">
            <div className="bg-surface border border-surface-border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-heading font-semibold text-text mb-6">Property Overview</h2>
              <div className="prose prose-lg text-text-muted max-w-none">
                <p className="whitespace-pre-line leading-relaxed text-justify">
                  {property.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-surface border border-surface-border rounded-xl p-8 sticky top-32 shadow-sm">
              <h3 className="font-heading font-semibold text-text mb-6 text-xl">Interested in this property?</h3>
              <p className="text-text-muted text-sm mb-6">
                Contact us today for more information, to schedule a viewing, or to make an offer.
              </p>
              
              <Link 
                to="/#contact" 
                className="block w-full bg-accent hover:bg-accent-hover text-white text-center font-medium py-4 px-6 rounded-md transition-colors shadow-sm mb-4"
              >
                Inquire Now
              </Link>
              
              <div className="pt-6 mt-6 border-t border-surface-border">
                <p className="text-sm text-text-muted font-medium mb-2">Or call us directly:</p>
                <p className="text-lg font-semibold text-text">+977 (123) 456-7890</p>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default PropertyDetail;
