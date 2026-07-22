import React, { useState } from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Building, KeyRound, FileCheck, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface RentalsPageProps {
  rentals: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  comparedProperties: Property[];
  onToggleCompare: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleShowing: (property: Property) => void;
}

export const RentalsPage: React.FC<RentalsPageProps> = ({
  rentals,
  favorites,
  onToggleFavorite,
  comparedProperties,
  onToggleCompare,
  onSelectProperty,
  onScheduleShowing,
}) => {
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    phone: '',
    moveInDate: '',
    employer: '',
    annualIncome: '',
  });
  const [appSubmitted, setAppSubmitted] = useState(false);

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Cincinnati Rental Listings & Management</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-white">
          Luxury Rental Residences in <span className="text-gold-gradient">Cincinnati</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          From high-rise apartments at The Banks to artisanal lofts in Walnut Hills, browse luxury rental properties curated by Pastorsil.
        </p>
        <button
          onClick={() => setAppModalOpen(true)}
          className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-lg hover:brightness-110"
        >
          Submit Tenant Application
        </button>
      </div>

      {/* Rentals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              isCompared={comparedProperties.some((p) => p.id === property.id)}
              onToggleCompare={onToggleCompare}
              onSelectProperty={onSelectProperty}
              onScheduleShowing={onScheduleShowing}
            />
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {appModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-amber-500/30 shadow-2xl relative">
            <button
              onClick={() => {
                setAppModalOpen(false);
                setAppSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {appSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-serif-display font-bold text-white">Rental Application Logged!</h3>
                <p className="text-slate-300 text-xs">
                  Thank you, {appForm.name}. Pastor Sil's property management team will review your application details and reach out at {appForm.email}.
                </p>
                <button
                  onClick={() => {
                    setAppModalOpen(false);
                    setAppSubmitted(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-serif-display font-bold text-white mb-4">Rental Pre-Application</h3>
                <form onSubmit={handleAppSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Applicant Name *</label>
                    <input
                      type="text"
                      required
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={appForm.phone}
                        onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Desired Move-In Date</label>
                      <input
                        type="date"
                        value={appForm.moveInDate}
                        onChange={(e) => setAppForm({ ...appForm, moveInDate: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Annual Household Income</label>
                      <input
                        type="text"
                        placeholder="e.g. $95,000"
                        value={appForm.annualIncome}
                        onChange={(e) => setAppForm({ ...appForm, annualIncome: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs"
                  >
                    Submit Pre-Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
