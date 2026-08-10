import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { MapPin, ArrowLeft, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { properties } = useContext(DataContext);
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateSort, setDateSort] = useState('Newest');
  const [priceSort, setPriceSort] = useState('Default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const extractPrice = (priceString) => {
    if (!priceString) return 0;
    const numbers = priceString.match(/\d+/g);
    if (!numbers) return 0;
    return parseInt(numbers.join(''), 10);
  };

  const filteredProperties = properties
    .filter(prop => {
      const matchType = filterType === 'All' || prop.type === filterType;
      const matchStatus = filterStatus === 'All' || prop.status === filterStatus;
      const matchSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prop.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchStatus && matchSearch;
    })
    .sort((a, b) => {
      // Base date sort (Newest vs Oldest)
      const timeA = a.createdAt || 0;
      const timeB = b.createdAt || 0;
      let dateDiff = dateSort === 'Newest' ? timeB - timeA : timeA - timeB;

      // If price sort is active, it takes priority, with date as tie-breaker
      if (priceSort !== 'Default') {
        const priceA = extractPrice(a.price);
        const priceB = extractPrice(b.price);
        
        if (priceSort === 'Low to High') {
          return priceA !== priceB ? priceA - priceB : dateDiff;
        } else if (priceSort === 'High to Low') {
          return priceA !== priceB ? priceB - priceA : dateDiff;
        }
      }
      
      // Default fallback to date sort
      return dateDiff;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'For Sale': return 'bg-accent/10 text-accent border-accent/20';
      case 'Available': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'Sold': return 'bg-surface-border text-text-muted border-surface-border';
      default: return 'bg-surface-border text-text';
    }
  };

  return (
    <div className="pt-24 pb-16 bg-base-alt min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8 mt-4">
          <Link to="/" className="inline-flex items-center text-text hover:text-accent transition-all font-medium border border-surface-border hover:border-accent/50 bg-transparent hover:bg-accent/5 rounded-full px-4 py-2 text-sm w-fit">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">Real Estate</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-4">
            Available Land & Properties
          </h3>
          <p className="text-text-muted">
            Explore our curated selection of verified land parcels and properties for sale.
          </p>
        </motion.div>

        {/* Search, Filters, and Sort */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-surface border border-surface-border rounded-xl p-6 mb-12 shadow-sm"
        >
          <div className="flex flex-col gap-6">
            
            {/* Search and Mobile Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-text-muted" />
                </div>
                <input
                  type="text"
                  placeholder="Search properties by title, description or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-base border border-surface-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all text-text shadow-sm"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:w-auto w-full lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-base border border-surface-border rounded-md text-text hover:text-accent hover:border-accent transition-colors shadow-sm"
              >
                <SlidersHorizontal size={18} />
                <span className="font-medium">{showFilters ? 'Hide Filters' : 'Filters'}</span>
              </button>
            </div>

            {/* Filters Row */}
            <div className={`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters ? 'grid' : 'hidden lg:grid'}`}>
              
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Property Type</span>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-base border border-surface-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="All">All Types</option>
                  <option value="Land">Land</option>
                  <option value="House">House</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Status</span>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-base border border-surface-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="All">All Statuses</option>
                  <option value="For Sale">For Sale</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Sort By Date</span>
                <select 
                  value={dateSort}
                  onChange={(e) => setDateSort(e.target.value)}
                  className="bg-base border border-surface-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Sort By Price</span>
                <select 
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="bg-base border border-surface-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="Default">Default</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop, index) => (
            <motion.div 
              key={prop.id} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
          {filteredProperties.length === 0 && (
            <div className="col-span-full text-center py-12 text-text-muted bg-surface border border-surface-border rounded-xl">
              <p className="text-lg font-medium text-text mb-2">No properties found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PropertiesPage;
