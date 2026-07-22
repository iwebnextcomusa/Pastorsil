import React from 'react';
import { HomeValuationForm } from './HomeValuationForm';
import { TrendingUp, Camera, Share2, Award, CheckCircle2, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

export const SellPage: React.FC = () => {
  const marketingPillars = [
    {
      icon: Camera,
      title: 'Architectural Photography & 4K Drone Video',
      desc: 'We capture your property using high-end HDR camera gear, evening twilight lighting, and FAA-certified aerial drone videography.',
    },
    {
      icon: Share2,
      title: 'Precision Digital & Social Targeting',
      desc: 'Your listing is promoted directly to high-net-worth buyers and relocation executives across Google, Meta, Instagram, and LinkedIn.',
    },
    {
      icon: Award,
      title: 'MLS Syndication & Luxury Portals',
      desc: 'Instant distribution across MLS, Zillow, Realtor.com, Trulia, and global luxury real estate partner networks.',
    },
    {
      icon: ShieldCheck,
      title: 'Expert Negotiation & Escrow Supervision',
      desc: 'Pastor Sil personally handles every buyer offer, appraisal defense, and closing detail to ensure maximum net proceed retention.',
    },
  ];

  return (
    <div className="pt-24 pb-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Seller Representation & Marketing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-white">
          Sell Your Cincinnati Property for <span className="text-gold-gradient">Top Value</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Leverage Pastorsil’s bespoke marketing suite, luxury presentation, and proven negotiation power to achieve top sale price in record time.
        </p>
      </div>

      {/* Instant Home Valuation Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeValuationForm />
      </div>

      {/* Marketing Pillars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif-display font-bold text-white">The Pastorsil Listing Advantage</h2>
          <p className="text-slate-400 text-xs">How we position your home to outshine the competition</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketingPillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-sm">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
