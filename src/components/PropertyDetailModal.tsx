import React, { useState } from 'react';
import { Property } from '../types';
import {
  X,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Scale,
  Compass,
  CheckCircle2,
  Share2,
  Sparkles,
  Calculator,
  Eye,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { MortgageCalculator } from './MortgageCalculator';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
  onScheduleShowing: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  onScheduleShowing,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'tour' | 'calculator'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-amber-500/30 shadow-2xl relative my-auto overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 sticky top-0 z-30">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
              {property.status} • {property.address.neighborhood}, Cincinnati, OH
            </span>
            <h2 className="text-white font-serif-display text-lg sm:text-2xl font-bold line-clamp-1">
              {property.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleCompare(property)}
              className={`p-2 rounded-xl border transition-all ${
                isCompared
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
              }`}
              title="Compare Property"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-slate-900 text-slate-300 hover:text-rose-400 hover:bg-slate-800 border-slate-800'
              }`}
              title="Save Favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {copiedLink && (
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-2.5 rounded-xl text-xs text-center font-medium">
              Listing link copied to clipboard!
            </div>
          )}

          {/* Photo Gallery Viewer */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 group">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Navigation Arrows */}
              {property.images.length > 1 && (
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
                    }
                    className="p-2 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
                    className="p-2 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Price Tag Overlay */}
              <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-amber-500/40 px-4 py-2 rounded-xl">
                <div className="text-amber-400 font-serif-display text-2xl font-bold">
                  ${property.price ? property.price.toLocaleString() : property.rentPricePerMonth?.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">MLS# {property.mlsNumber} • Listed {property.dateListed}</div>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-amber-400 ring-2 ring-amber-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex border-b border-slate-800 gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Property Overview
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'tour'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              3D Virtual Walkthrough
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'calculator'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Mortgage Calculator
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                {/* Key Specs Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                    <Bed className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{property.specs.bedrooms} Beds</div>
                    <div className="text-[10px] text-slate-500">Bedrooms</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                    <Bath className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{property.specs.bathrooms} Baths</div>
                    <div className="text-[10px] text-slate-500">Bathrooms</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                    <Maximize2 className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{property.specs.sqft.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500">Square Feet</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                    <Compass className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{property.specs.yearBuilt}</div>
                    <div className="text-[10px] text-slate-500">Year Built</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-white font-serif-display text-lg font-bold mb-2">Description</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                {/* Features & Amenities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-serif-display text-base font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Property Highlights</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {property.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-serif-display text-base font-bold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Amenities & Services</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Agent Contact & Tour Booking Box */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-amber-500/30 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <img
                      src={property.agent.image}
                      alt={property.agent.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                    />
                    <div>
                      <h4 className="text-white font-bold text-sm">{property.agent.name}</h4>
                      <p className="text-amber-400 text-xs font-medium">{property.agent.title}</p>
                      <p className="text-slate-500 text-[10px]">Pastorsil Real Estate</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onScheduleShowing(property);
                    }}
                    className="w-full py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Private Tour</span>
                  </button>

                  <a
                    href="tel:5137066312"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-amber-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call (513) 706-6312</span>
                  </a>

                  <a
                    href="mailto:pastorsilcotlg@gmail.com"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Pastor Sil</span>
                  </a>

                  <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800 flex items-center gap-1.5 justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified Pastorsil Exclusive Listing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Virtual Tour */}
          {activeTab === 'tour' && (
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 mx-auto flex items-center justify-center">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif-display font-bold text-white">Interactive 3D Virtual Tour</h3>
              <p className="text-slate-300 text-xs max-w-md mx-auto">
                Explore every room, floorplan measurement, and architectural detail in high definition 3D space.
              </p>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img
                  src={property.images[0]}
                  alt="3D Floorplan preview"
                  className="w-full h-full object-cover opacity-40 filter blur-sm"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <button
                    onClick={() => alert('Launching Matterport 3D Tour Environment...')}
                    className="px-6 py-3 rounded-full bg-gold-gradient text-slate-950 font-bold text-xs shadow-2xl hover:scale-105 transition-transform"
                  >
                    Click to Start 3D Walkthrough
                  </button>
                  <span className="text-[10px] text-slate-400">Powered by Matterport 3D Scanning</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Mortgage Calculator */}
          {activeTab === 'calculator' && (
            <MortgageCalculator initialPrice={property.price || 850000} initialHoa={property.specs.hoaFeeMonthly || 0} />
          )}
        </div>
      </div>
    </div>
  );
};
