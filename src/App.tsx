import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { PropertyCard } from './components/PropertyCard';
import { PropertyFilter } from './components/PropertyFilter';
import { InteractiveMap } from './components/InteractiveMap';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ScheduleShowingModal } from './components/ScheduleShowingModal';
import { PropertyComparisonModal } from './components/PropertyComparisonModal';
import { AiChatbot } from './components/AiChatbot';
import { ScrollToTop } from './components/ScrollToTop';

import { BuyPage } from './components/BuyPage';
import { SellPage } from './components/SellPage';
import { RentalsPage } from './components/RentalsPage';
import { NeighborhoodsPage } from './components/NeighborhoodsPage';
import { BlogPage } from './components/BlogPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';

import { CINCINNATI_PROPERTIES } from './data/properties';
import { Property, PropertyFilterState } from './types';
import { Building2, LayoutGrid, Map, Scale, Heart, Sparkles, Phone, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Filter State
  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: '',
    neighborhood: '',
    propertyType: '',
    status: 'all',
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: 'any',
    bathrooms: 'any',
    sortBy: 'featured',
  });

  // User Interactive Lists
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);

  // Modals State
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<Property | null>(null);
  const [scheduleShowingProperty, setScheduleShowingProperty] = useState<Property | null>(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return CINCINNATI_PROPERTIES.filter((p) => {
      // Keyword
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesAddress = `${p.address.street} ${p.address.neighborhood} ${p.address.city}`.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAddress && !matchesDesc) return false;
      }

      // Neighborhood
      if (filters.neighborhood && p.address.neighborhood !== filters.neighborhood) {
        return false;
      }

      // Property Type
      if (filters.propertyType && p.specs.propertyType !== filters.propertyType) {
        return false;
      }

      // Status
      if (filters.status !== 'all' && p.status !== filters.status) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'any') {
        const minBeds = parseInt(filters.bedrooms.replace('+', ''));
        if (p.specs.bedrooms < minBeds) return false;
      }

      // Bathrooms
      if (filters.bathrooms !== 'any') {
        const minBaths = parseFloat(filters.bathrooms.replace('+', ''));
        if (p.specs.bathrooms < minBaths) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'sqft-desc') return b.specs.sqft - a.specs.sqft;
      if (filters.sortBy === 'newest') return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters]);

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (property: Property) => {
    setComparedProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 properties at a time.');
        return prev;
      }
      return [...prev, property];
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      neighborhood: '',
      propertyType: '',
      status: 'all',
      minPrice: 0,
      maxPrice: 5000000,
      bedrooms: 'any',
      bathrooms: 'any',
      sortBy: 'featured',
    });
  };

  // Rental properties subset
  const rentalProperties = useMemo(() => {
    return CINCINNATI_PROPERTIES.filter((p) => p.status === 'For Rent' || p.specs.propertyType === 'Rental');
  }, []);

  return (
    <div className="min-h-screen bg-[#0A192F] text-white flex flex-col font-sans selection:bg-[#C5A059] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoriteCount={favorites.length}
        compareCount={comparedProperties.length}
        onOpenCompareModal={() => setIsComparisonModalOpen(true)}
      />

      {/* Main Page Router View Body with Framer Motion Page Transitions */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <div>
                <HeroSection
                  onSearchSubmit={(partialFilters) => {
                    setFilters((prev) => ({ ...prev, ...partialFilters }));
                  }}
                  setActiveTab={setActiveTab}
                />

                {/* Featured Listings Showcase Section */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                  <div className="flex justify-between items-end mb-6">
                    <div className="flex flex-col">
                      <h2 className="text-white text-3xl font-serif">Featured Collections</h2>
                      <div className="h-1 w-12 bg-[#C5A059] mt-2"></div>
                    </div>
                    <button
                      onClick={() => setActiveTab('listings')}
                      className="text-white text-xs font-bold uppercase tracking-widest border-b border-[#C5A059] text-[#C5A059] hover:text-[#b38f4d] flex items-center gap-1.5 pb-1"
                    >
                      <span>Explore All ({CINCINNATI_PROPERTIES.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Grid of Featured Homes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CINCINNATI_PROPERTIES.filter((p) => p.isFeatured).slice(0, 3).map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favorites.includes(property.id)}
                        onToggleFavorite={handleToggleFavorite}
                        isCompared={comparedProperties.some((p) => p.id === property.id)}
                        onToggleCompare={handleToggleCompare}
                        onSelectProperty={(p) => setSelectedPropertyDetail(p)}
                        onScheduleShowing={(p) => setScheduleShowingProperty(p)}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-white">
                      Cincinnati Real Estate <span className="text-gold-gradient">Listings</span>
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">
                      Browse luxury single family homes, riverfront condos, and townhomes across Hamilton County.
                    </p>
                  </div>

                  {/* Grid vs Map Toggle */}
                  <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'grid'
                          ? 'bg-gold-gradient text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Grid</span>
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'map'
                          ? 'bg-gold-gradient text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>Interactive Map</span>
                    </button>
                  </div>
                </div>

                {/* Filter Bar */}
                <PropertyFilter
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  totalResultsCount={filteredProperties.length}
                />

                {/* Content View: Grid or Map */}
                {viewMode === 'map' ? (
                  <InteractiveMap
                    properties={filteredProperties}
                    onSelectProperty={(p) => setSelectedPropertyDetail(p)}
                  />
                ) : (
                  <div>
                    {filteredProperties.length === 0 ? (
                      <div className="glass-panel rounded-2xl p-12 text-center space-y-4 border border-slate-800">
                        <Building2 className="w-12 h-12 text-amber-400 mx-auto" />
                        <h3 className="text-xl font-serif-display font-bold text-white">No properties match your filter criteria</h3>
                        <p className="text-slate-400 text-xs max-w-sm mx-auto">
                          Try adjusting price range, neighborhood selection, or resetting your filter options.
                        </p>
                        <button
                          onClick={handleResetFilters}
                          className="px-5 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                          <PropertyCard
                            key={property.id}
                            property={property}
                            isFavorite={favorites.includes(property.id)}
                            onToggleFavorite={handleToggleFavorite}
                            isCompared={comparedProperties.some((p) => p.id === property.id)}
                            onToggleCompare={handleToggleCompare}
                            onSelectProperty={(p) => setSelectedPropertyDetail(p)}
                            onScheduleShowing={(p) => setScheduleShowingProperty(p)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'buy' && <BuyPage setActiveTab={setActiveTab} />}
            {activeTab === 'sell' && <SellPage />}
            {activeTab === 'rentals' && (
              <RentalsPage
                rentals={rentalProperties}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                comparedProperties={comparedProperties}
                onToggleCompare={handleToggleCompare}
                onSelectProperty={(p) => setSelectedPropertyDetail(p)}
                onScheduleShowing={(p) => setScheduleShowingProperty(p)}
              />
            )}
            {activeTab === 'neighborhoods' && (
              <NeighborhoodsPage
                onSelectNeighborhood={(n) => {
                  setFilters((prev) => ({ ...prev, neighborhood: n }));
                }}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === 'blog' && <BlogPage />}
            {activeTab === 'about' && <AboutPage />}
            {activeTab === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Elements */}
      <AiChatbot onSelectProperty={(p) => setSelectedPropertyDetail(p)} />
      <ScrollToTop />

      {/* Modals */}
      <PropertyDetailModal
        property={selectedPropertyDetail}
        onClose={() => setSelectedPropertyDetail(null)}
        isFavorite={selectedPropertyDetail ? favorites.includes(selectedPropertyDetail.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isCompared={selectedPropertyDetail ? comparedProperties.some((p) => p.id === selectedPropertyDetail.id) : false}
        onToggleCompare={handleToggleCompare}
        onScheduleShowing={(p) => setScheduleShowingProperty(p)}
      />

      <ScheduleShowingModal
        property={scheduleShowingProperty}
        onClose={() => setScheduleShowingProperty(null)}
      />

      {isComparisonModalOpen && (
        <PropertyComparisonModal
          properties={comparedProperties}
          onClose={() => setIsComparisonModalOpen(false)}
          onRemoveProperty={(id) => {
            setComparedProperties((prev) => prev.filter((p) => p.id !== id));
          }}
          onSelectProperty={(p) => setSelectedPropertyDetail(p)}
        />
      )}
    </div>
  );
};

export default App;
