import React from 'react';
import { Property } from '../types';
import { X, Scale, Check, Trash2, Bed, Bath, Maximize2, MapPin, DollarSign, Calendar, Eye } from 'lucide-react';

interface PropertyComparisonModalProps {
  properties: Property[];
  onClose: () => void;
  onRemoveProperty: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  properties,
  onClose,
  onRemoveProperty,
  onSelectProperty,
}) => {
  if (properties.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-5xl rounded-2xl p-6 border border-amber-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-serif-display text-xl font-bold">Property Comparison Matrix</h3>
              <p className="text-slate-400 text-xs">Comparing {properties.length} selected Cincinnati homes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between relative group"
            >
              <button
                onClick={() => onRemoveProperty(prop.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-rose-400 hover:bg-slate-900 z-10 transition-all"
                title="Remove from comparison"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                {/* Image */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 relative">
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-slate-950/85 px-2.5 py-1 rounded text-amber-400 font-bold text-sm">
                    ${prop.price ? prop.price.toLocaleString() : prop.rentPricePerMonth?.toLocaleString()}
                  </div>
                </div>

                {/* Title & Location */}
                <div>
                  <h4 className="text-white font-bold text-sm font-serif-display line-clamp-1">{prop.title}</h4>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{prop.address.neighborhood}, {prop.address.city}</span>
                  </div>
                </div>

                {/* Comparison Details Table */}
                <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Property Type</span>
                    <span className="text-white font-semibold">{prop.specs.propertyType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Bedrooms</span>
                    <span className="text-amber-400 font-bold">{prop.specs.bedrooms}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Bathrooms</span>
                    <span className="text-amber-400 font-bold">{prop.specs.bathrooms}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Square Feet</span>
                    <span className="text-white font-semibold">{prop.specs.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Price / SqFt</span>
                    <span className="text-emerald-400 font-semibold">
                      ${Math.round(prop.price / prop.specs.sqft)} / sqft
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Year Built</span>
                    <span className="text-white font-semibold">{prop.specs.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Garage Spaces</span>
                    <span className="text-white font-semibold">{prop.specs.garageSpaces}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    onClose();
                    onSelectProperty(prop);
                  }}
                  className="w-full py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Listing</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
