import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { MapPin, ArrowLeft, Search, SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Count active filters (excluding defaults)
  const activeFilterCount = [
    filterType !== 'All',
    filterStatus !== 'All',
    dateSort !== 'Newest',
    priceSort !== 'Default',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setFilterType('All');
    setFilterStatus('All');
    setSearchTerm('');
    setDateSort('Newest');
    setPriceSort('Default');
  };

  // Pill-style filter option component
  const FilterPill = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-[7px] rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
        isActive 
          ? 'bg-accent text-white shadow-sm' 
          : 'bg-base text-text-muted border border-surface-border hover:border-accent/40 hover:text-accent'
      }`}
    >
      {label}
    </button>
  );

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
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">Real Estate</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-4">
            Available Land & Properties
          </h3>
          <p className="text-text-muted">
            Explore our curated selection of verified land parcels and properties for sale.
          </p>
        </motion.div>

        {/* ── Search + Collapsible Filters ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          {/* Search Bar — always visible */}
          <div className="flex gap-3 items-stretch">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full pl-11 pr-10 py-3.5 bg-surface border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 transition-all text-text text-[15px] placeholder:text-text-muted/50 shadow-sm"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-accent transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer shrink-0 ${
                showFilters 
                  ? 'bg-accent text-white shadow-sm' 
                  : 'bg-surface border border-surface-border text-text-muted hover:text-accent hover:border-accent/40 shadow-sm'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && !showFilters && (
                <span className="w-5 h-5 rounded-full bg-accent text-white text-[11px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''} ${showFilters ? 'text-white/70' : 'text-text-muted'}`} 
              />
            </button>
          </div>

          {/* ── Collapsible Filter Panel ── */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-3 bg-surface border border-surface-border rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6 space-y-5">

                    {/* Row 1: Type + Status pills */}
                    <div className="flex flex-col sm:flex-row gap-5">
                      
                      {/* Property Type */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2.5">Type</p>
                        <div className="flex flex-wrap gap-2">
                          {['All', 'Land', 'House'].map(t => (
                            <FilterPill 
                              key={t} 
                              label={t === 'All' ? 'All Types' : t} 
                              isActive={filterType === t} 
                              onClick={() => setFilterType(t)} 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Vertical divider (desktop only) */}
                      <div className="hidden sm:block w-px bg-surface-border self-stretch" />

                      {/* Status */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2.5">Status</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'All', label: 'All' },
                            { value: 'For Sale', label: 'For Sale' },
                            { value: 'Available', label: 'Available' },
                            { value: 'Sold', label: 'Sold' },
                          ].map(s => (
                            <FilterPill 
                              key={s.value} 
                              label={s.label} 
                              isActive={filterStatus === s.value} 
                              onClick={() => setFilterStatus(s.value)} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-surface-border/60" />

                    {/* Row 2: Sort selects + Clear */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                      
                      {/* Sort by Date */}
                      <div className="w-full sm:w-auto sm:min-w-[180px]">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Sort by Date</p>
                        <div className="relative">
                          <select 
                            value={dateSort}
                            onChange={(e) => setDateSort(e.target.value)}
                            className="w-full appearance-none bg-base border border-surface-border rounded-lg px-4 py-2.5 pr-9 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 transition-all cursor-pointer"
                          >
                            <option value="Newest">Newest First</option>
                            <option value="Oldest">Oldest First</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                        </div>
                      </div>

                      {/* Sort by Price */}
                      <div className="w-full sm:w-auto sm:min-w-[180px]">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Sort by Price</p>
                        <div className="relative">
                          <select 
                            value={priceSort}
                            onChange={(e) => setPriceSort(e.target.value)}
                            className="w-full appearance-none bg-base border border-surface-border rounded-lg px-4 py-2.5 pr-9 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40 transition-all cursor-pointer"
                          >
                            <option value="Default">Default</option>
                            <option value="Low to High">Low to High</option>
                            <option value="High to Low">High to Low</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                        </div>
                      </div>

                      {/* Spacer + Clear all */}
                      <div className="sm:ml-auto flex items-center gap-3 pt-1 sm:pt-0">
                        {activeFilterCount > 0 && (
                          <button
                            onClick={clearAllFilters}
                            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors font-medium cursor-pointer"
                          >
                            <RotateCcw size={13} />
                            Clear all
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom results bar */}
                  <div className="px-5 sm:px-6 py-3 bg-base/50 border-t border-surface-border/50 flex items-center justify-between">
                    <span className="text-[13px] text-text-muted">
                      Showing <span className="font-semibold text-text">{filteredProperties.length}</span> of{' '}
                      <span className="font-semibold text-text">{properties.length}</span> properties
                    </span>
                    {activeFilterCount > 0 && (
                      <span className="text-[11px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                        {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <div className="w-full aspect-[16/10] bg-base-alt relative overflow-hidden">
                {prop.images && prop.images.length > 0 ? (
                  <img 
                    src={prop.images[0]} 
                    alt={prop.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
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
