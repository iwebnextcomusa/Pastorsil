import React, { useState } from 'react';
import { PropertyFilterState } from '../types';
import { Search, MapPin, Building2, ShieldCheck, Award, ArrowRight, Sparkles, KeyRound, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onSearchSubmit: (filter: Partial<PropertyFilterState>) => void;
  setActiveTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit, setActiveTab }) => {
  const [searchIntent, setSearchIntent] = useState<'buy' | 'rent' | 'valuation'>('buy');
  const [neighborhood, setNeighborhood] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchIntent === 'valuation') {
      setActiveTab('sell');
      return;
    }

    onSearchSubmit({
      neighborhood: neighborhood === 'All Neighborhoods' ? '' : neighborhood,
      propertyType: propertyType === 'All Types' ? '' : propertyType,
      status: searchIntent === 'rent' ? 'For Rent' : 'For Sale',
    });
    setActiveTab('listings');
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0A192F]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920"
          alt="Cincinnati Luxury Real Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/80 to-[#0A192F]/60 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#112240] border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold tracking-widest uppercase shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Cincinnati’s Premier Luxury Real Estate Brokerage</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight leading-[1.1]">
            Defining Cincinnati <br />
            <span className="text-[#C5A059] italic font-medium">Living Excellence.</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Expert guidance for buyers, sellers, and investors across the Greater Cincinnati market. Discover your dream home with Pastor Sil. Over $350M+ in career sales volume.
          </p>

          {/* Interactive Search Bar Box */}
          <div className="pt-4 max-w-4xl mx-auto">
            {/* Intent Selector Tabs */}
            <div className="flex justify-center gap-2 mb-3">
              <button
                onClick={() => setSearchIntent('buy')}
                className={`px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                  searchIntent === 'buy'
                    ? 'bg-[#C5A059] text-white shadow-lg'
                    : 'bg-[#112240] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                Buy a Home
              </button>
              <button
                onClick={() => setSearchIntent('rent')}
                className={`px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                  searchIntent === 'rent'
                    ? 'bg-[#C5A059] text-white shadow-lg'
                    : 'bg-[#112240] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                Find Rentals
              </button>
              <button
                onClick={() => setSearchIntent('valuation')}
                className={`px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                  searchIntent === 'valuation'
                    ? 'bg-[#C5A059] text-white shadow-lg'
                    : 'bg-[#112240] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                Instant Home Valuation
              </button>
            </div>

            {/* Quick Filter Form Container */}
            <form
              onSubmit={handleSearch}
              className="bg-[#112240]/90 backdrop-blur-md rounded-sm p-4 sm:p-5 border border-[#C5A059]/30 shadow-2xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-left"
            >
              <div className="lg:col-span-3">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                  Neighborhood
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C5A059] absolute left-3 top-2.5" />
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-[#0A192F] border border-white/20 rounded-sm pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    <option value="">All Cincinnati Neighborhoods</option>
                    <option value="Hyde Park">Hyde Park</option>
                    <option value="Mount Adams">Mount Adams</option>
                    <option value="Indian Hill">Indian Hill</option>
                    <option value="Over-the-Rhine">Over-the-Rhine</option>
                    <option value="Mason">Mason</option>
                    <option value="Walnut Hills">Walnut Hills</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                  Property Type
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#C5A059] absolute left-3 top-2.5" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#0A192F] border border-white/20 rounded-sm pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    <option value="">All Property Types</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Luxury Condo">Luxury Condo</option>
                    <option value="Townhome">Townhome</option>
                    <option value="Rental">Rental</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-sm bg-[#C5A059] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#b38f4d] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{searchIntent === 'valuation' ? 'Get Valuation' : 'Search Homes'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Market Statistics Counter Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 max-w-4xl mx-auto">
            <div className="bg-[#112240] p-4 rounded-sm border border-white/10">
              <div className="text-[#C5A059] font-serif text-2xl sm:text-3xl font-bold">$350M+</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Career Sales Volume</div>
            </div>
            <div className="bg-[#112240] p-4 rounded-sm border border-white/10">
              <div className="text-[#C5A059] font-serif text-2xl sm:text-3xl font-bold">18+ Yrs</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Cincinnati Expertise</div>
            </div>
            <div className="bg-[#112240] p-4 rounded-sm border border-white/10">
              <div className="text-[#C5A059] font-serif text-2xl sm:text-3xl font-bold">14 Days</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">Avg Days on Market</div>
            </div>
            <div className="bg-[#112240] p-4 rounded-sm border border-white/10">
              <div className="text-[#C5A059] font-serif text-2xl sm:text-3xl font-bold">99.2%</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider mt-1">List-to-Sale Ratio</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
