import React from 'react';
import { PropertyFilterState } from '../types';
import { Search, SlidersHorizontal, RotateCcw, Building2, MapPin, DollarSign, Filter } from 'lucide-react';

interface PropertyFilterProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: PropertyFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}) => {
  const neighborhoods = [
    'All Neighborhoods',
    'Hyde Park',
    'Mount Adams',
    'Indian Hill',
    'Over-the-Rhine',
    'Mason',
    'Columbia-Tusculum',
    'Walnut Hills',
    'Downtown',
  ];

  const propertyTypes = [
    'All Types',
    'Single Family',
    'Luxury Condo',
    'Townhome',
    'Multi-Family',
    'Rental',
  ];

  const handleChange = (key: keyof PropertyFilterState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-amber-500/20 shadow-xl mb-8">
      {/* Search Bar & Primary Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Keyword Search */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Search Keywords
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Address, street, key features..."
              value={filters.searchQuery}
              onChange={(e) => handleChange('searchQuery', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Neighborhood Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Cincinnati Neighborhood
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
            <select
              value={filters.neighborhood}
              onChange={(e) => handleChange('neighborhood', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
            >
              {neighborhoods.map((n) => (
                <option key={n} value={n === 'All Neighborhoods' ? '' : n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Property Type
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
            <select
              value={filters.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
            >
              {propertyTypes.map((t) => (
                <option key={t} value={t === 'All Types' ? '' : t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listing Status Toggle */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Intent
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700">
            {['all', 'For Sale', 'For Rent'].map((st) => (
              <button
                key={st}
                onClick={() => handleChange('status', st)}
                className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                  filters.status === st
                    ? 'bg-gold-gradient text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st === 'all' ? 'All' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Filters: Beds, Baths, Sort, Reset */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 items-center">
        {/* Bedrooms selector */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Bedrooms
          </label>
          <div className="flex gap-1">
            {['any', '1+', '2+', '3+', '4+', '5+'].map((b) => (
              <button
                key={b}
                onClick={() => handleChange('bedrooms', b)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold border ${
                  filters.bedrooms === b
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms selector */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Bathrooms
          </label>
          <div className="flex gap-1">
            {['any', '1+', '2+', '3+', '4+'].map((ba) => (
              <button
                key={ba}
                onClick={() => handleChange('bathrooms', ba)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold border ${
                  filters.bathrooms === ba
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                }`}
              >
                {ba}
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Listings</option>
            <option value="sqft-desc">Largest SqFt</option>
          </select>
        </div>

        {/* Result Counter & Reset Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-4">
          <span className="text-xs text-slate-400 font-medium">
            Found <strong className="text-amber-400">{totalResultsCount}</strong> properties
          </span>
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
