import React, { useState } from 'react';
import { Property } from '../types';
import { MapPin, Navigation, Eye, ZoomIn, ZoomOut, Layers } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ properties, onSelectProperty }) => {
  const [selectedPin, setSelectedPin] = useState<Property | null>(properties[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Map viewport dimensions relative to Cincinnati lat/lng bounds:
  // Cincinnati center ~ (39.12, -84.45)
  // Lat range: 39.08 to 39.38
  // Lng range: -84.55 to -84.30
  const minLat = 39.08;
  const maxLat = 39.38;
  const minLng = -84.55;
  const maxLng = -84.30;

  const getPinPosition = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
    return { x: Math.max(5, Math.min(92, x)), y: Math.max(10, Math.min(88, y)) };
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl relative">
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-20 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-3">
        <Navigation className="w-4 h-4 text-amber-400" />
        <div>
          <h4 className="text-white text-xs font-bold font-serif-display">Interactive Cincinnati Map</h4>
          <p className="text-[10px] text-slate-400">Hamilton & Warren County Listings</p>
        </div>
      </div>

      {/* Map Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-1.5 rounded-xl">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Stylized Vector Map Canvas */}
      <div className="relative w-full aspect-[16/9] min-h-[420px] bg-slate-950 overflow-hidden cursor-grab">
        {/* Stylized Ohio River SVG path simulation */}
        <div
          className="absolute inset-0 transition-transform duration-300 pointer-events-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Grid lines */}
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />
            {/* River Curve */}
            <path
              d="M 0 320 C 150 280, 250 360, 400 340 C 550 320, 700 380, 900 360 L 1200 420"
              fill="none"
              stroke="#2563eb"
              strokeWidth="24"
              opacity="0.4"
            />
            {/* I-75 Highway line */}
            <path d="M 450 0 L 480 600" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            {/* I-71 Highway line */}
            <path d="M 600 0 L 350 600" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
          </svg>

          {/* Neighborhood Labels */}
          <div className="absolute top-[65%] left-[25%] text-[10px] uppercase tracking-widest text-blue-400/60 font-bold">
            Ohio River
          </div>
          <div className="absolute top-[48%] left-[45%] text-[11px] uppercase tracking-widest text-slate-500 font-bold">
            Hyde Park
          </div>
          <div className="absolute top-[62%] left-[38%] text-[11px] uppercase tracking-widest text-slate-500 font-bold">
            Mount Adams
          </div>
          <div className="absolute top-[35%] left-[65%] text-[11px] uppercase tracking-widest text-slate-500 font-bold">
            Indian Hill
          </div>
          <div className="absolute top-[60%] left-[32%] text-[11px] uppercase tracking-widest text-slate-500 font-bold">
            Over-the-Rhine
          </div>
          <div className="absolute top-[12%] left-[68%] text-[11px] uppercase tracking-widest text-slate-500 font-bold">
            Mason
          </div>

          {/* Map Pins for Properties */}
          {properties.map((prop) => {
            const pos = getPinPosition(prop.coordinates.lat, prop.coordinates.lng);
            const isSelected = selectedPin?.id === prop.id;

            return (
              <div
                key={prop.id}
                onClick={() => setSelectedPin(prop)}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
              >
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-xl transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 scale-110 shadow-amber-500/50 ring-4 ring-amber-500/30'
                      : 'bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 border border-amber-500/40'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>${prop.price ? `${Math.round(prop.price / 1000)}k` : `${prop.rentPricePerMonth}/m`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Property Callout Card */}
      {selectedPin && (
        <div className="p-4 bg-slate-950/95 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img
              src={selectedPin.images[0]}
              alt={selectedPin.title}
              className="w-20 h-16 object-cover rounded-xl shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                {selectedPin.address.neighborhood} • {selectedPin.specs.bedrooms} Beds • {selectedPin.specs.sqft.toLocaleString()} SqFt
              </span>
              <h4 className="text-white font-serif-display font-bold text-base line-clamp-1">
                {selectedPin.title}
              </h4>
              <div className="text-amber-400 font-bold text-sm">
                ${selectedPin.price ? selectedPin.price.toLocaleString() : selectedPin.rentPricePerMonth?.toLocaleString()}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectProperty(selectedPin)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg flex items-center justify-center gap-1.5 shrink-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Explore Full Listing</span>
          </button>
        </div>
      )}
    </div>
  );
};
