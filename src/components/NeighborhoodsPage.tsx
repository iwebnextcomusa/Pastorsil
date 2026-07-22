import React from 'react';
import { NEIGHBORHOOD_PROFILES } from '../data/neighborhoods';
import { PropertyFilterState } from '../types';
import { MapPin, Star, GraduationCap, DollarSign, ArrowRight, Compass } from 'lucide-react';

interface NeighborhoodsPageProps {
  onSelectNeighborhood: (neighborhoodName: string) => void;
  setActiveTab: (tab: string) => void;
}

export const NeighborhoodsPage: React.FC<NeighborhoodsPageProps> = ({ onSelectNeighborhood, setActiveTab }) => {
  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Cincinnati Neighborhood Guides</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-white">
          Explore Cincinnati's <span className="text-gold-gradient">Iconic Communities</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          From historic cobblestones and riverfront dining to multi-acre suburban estates and top-ranked schools, discover the neighborhood that fits your lifestyle.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEIGHBORHOOD_PROFILES.map((n) => (
            <div
              key={n.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      {n.vibe}
                    </span>
                    <h3 className="text-white font-serif-display text-2xl font-bold">{n.name}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-slate-300 text-xs leading-relaxed">{n.description}</p>

                  <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">Median Home</span>
                      <strong className="text-amber-400">{n.medianPrice}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">School Rating</span>
                      <strong className="text-emerald-400">{n.schoolRating}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Highlights</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {n.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    onSelectNeighborhood(n.name);
                    setActiveTab('listings');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-gold-gradient hover:text-slate-950 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <span>View {n.name} Homes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
