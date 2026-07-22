import React, { useState } from 'react';
import { Property } from '../types';
import { Heart, Scale, Bed, Bath, Maximize2, MapPin, ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleShowing: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  onSelectProperty,
  onScheduleShowing,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="group bg-[#112240] rounded-sm overflow-hidden border border-white/10 hover:border-[#C5A059]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#C5A059]/5 flex flex-col h-full relative">
      {/* Property Image Header with Controls */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A192F] cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.images[currentImageIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest ${
                property.status === 'For Rent'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#C5A059] text-white shadow-md'
              }`}
            >
              {property.status}
            </span>
            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-sm bg-[#0A192F]/90 text-[#C5A059] border border-[#C5A059]/40 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md">
                Featured
              </span>
            )}
          </div>

          {/* Top Actions: Favorite & Compare */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
              }}
              title={isCompared ? 'Remove from Comparison' : 'Add to Compare'}
              className={`p-2 rounded-sm backdrop-blur-md transition-all ${
                isCompared
                  ? 'bg-[#C5A059] text-white shadow-lg'
                  : 'bg-[#0A192F]/80 text-gray-300 hover:bg-[#0A192F] hover:text-white border border-white/20'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              title={isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
              className={`p-2 rounded-sm backdrop-blur-md transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-[#0A192F]/80 text-gray-300 hover:bg-[#0A192F] hover:text-rose-400 border border-white/20'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image Gallery Navigation Arrows */}
        {property.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-sm bg-[#0A192F]/80 text-white hover:bg-[#0A192F] pointer-events-auto transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-sm bg-[#0A192F]/80 text-white hover:bg-[#0A192F] pointer-events-auto transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Image Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 pointer-events-none">
          <div className="bg-[#0A192F]/90 backdrop-blur-md border border-[#C5A059]/40 px-3 py-1 rounded-sm">
            <div className="text-[#C5A059] font-serif text-xl font-bold">
              {property.status === 'For Rent'
                ? `$${property.rentPricePerMonth?.toLocaleString()}/mo`
                : `$${property.price.toLocaleString()}`}
            </div>
          </div>
          <span className="text-[10px] text-gray-300 bg-[#0A192F]/80 px-2 py-0.5 rounded-sm backdrop-blur-sm">
            MLS# {property.mlsNumber}
          </span>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-white">
        <div>
          <div className="flex items-center gap-1 text-[#C5A059] text-xs font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{property.address.neighborhood}, Cincinnati, OH {property.address.zip}</span>
          </div>

          <h3
            onClick={() => onSelectProperty(property)}
            className="text-white font-serif text-lg font-bold hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>
          <p className="text-gray-300 text-xs line-clamp-2 mt-1 leading-relaxed">
            {property.tagline || property.description}
          </p>
        </div>

        {/* Key Property Specs Bar */}
        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/10 text-gray-300 text-xs">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span><strong className="text-white">{property.specs.bedrooms}</strong> BD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span><strong className="text-white">{property.specs.bathrooms}</strong> BA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span><strong className="text-white">{property.specs.sqft.toLocaleString()}</strong> SQFT</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-sm bg-[#0A192F] hover:bg-[#1a2c4e] text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Details</span>
          </button>
          <button
            onClick={() => onScheduleShowing(property)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-sm bg-[#C5A059] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b38f4d] shadow-md transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
};
