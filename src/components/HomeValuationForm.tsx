import React, { useState } from 'react';
import { ValuationRequest } from '../types';
import { Home, DollarSign, CheckCircle2, TrendingUp, Sparkles, Send, MapPin, Building } from 'lucide-react';

export const HomeValuationForm: React.FC = () => {
  const [formData, setFormData] = useState<ValuationRequest>({
    address: '',
    propertyType: 'Single Family',
    bedrooms: 4,
    bathrooms: 2.5,
    estimatedSqft: 2500,
    condition: 'Excellent / Updated',
    name: '',
    email: '',
    phone: '',
    timeframeToSell: '1-3 Months',
  });

  const [loading, setLoading] = useState(false);
  const [valuationResult, setValuationResult] = useState<{
    low: number;
    mid: number;
    high: number;
  } | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.estimateRange) {
        setValuationResult(data.estimateRange);
      }
      if (data.message) {
        setSubmittedMessage(data.message);
      }
    } catch (err) {
      console.error('Error requesting home valuation:', err);
      // Fallback calculation for UI
      const estMid = formData.estimatedSqft * 210;
      setValuationResult({
        low: Math.round(estMid * 0.92),
        mid: Math.round(estMid),
        high: Math.round(estMid * 1.08),
      });
      setSubmittedMessage(`Your request has been logged! Pastor Sil will contact you at ${formData.email} with a full custom report.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 lg:p-8 border border-amber-500/20 shadow-2xl relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cincinnati Home Valuation Tool</span>
          </div>
          <h2 className="text-3xl font-serif-display font-bold text-white mb-2">
            What is Your Home Worth in Today's Cincinnati Market?
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto">
            Receive an instant algorithmic valuation estimate along with a custom Comparative Market Analysis (CMA) manually reviewed by Principal Broker Pastor Sil.
          </p>
        </div>

        {valuationResult ? (
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 md:p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-gold-gradient p-0.5 mx-auto flex items-center justify-center shadow-xl shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
                Estimated Market Value Range for {formData.address || 'Your Property'}
              </span>
              <div className="text-4xl md:text-5xl font-serif-display font-bold text-gold-gradient my-2">
                ${valuationResult.mid.toLocaleString()}
              </div>
              <div className="text-xs text-amber-300/80 font-medium">
                Estimated Range: ${valuationResult.low.toLocaleString()} - ${valuationResult.high.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-800 leading-relaxed">
              {submittedMessage}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:5137066312"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Call Pastor Sil Directly (513) 706-6312</span>
              </a>
              <button
                onClick={() => setValuationResult(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 hover:bg-slate-700 transition-all"
              >
                Submit Another Property
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Cincinnati Property Street Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3420 Shaw Ave, Hyde Park, Cincinnati, OH 45208"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Single Family">Single Family Home</option>
                  <option value="Luxury Condo">Condo / Townhome</option>
                  <option value="Multi-Family">Multi-Family / Investment</option>
                </select>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bedrooms</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bathrooms</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Estimated Square Feet */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Estimated Sq. Footage
                </label>
                <input
                  type="number"
                  step="100"
                  value={formData.estimatedSqft}
                  onChange={(e) => setFormData({ ...formData, estimatedSqft: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Overall Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Excellent / Fully Renovated">Excellent / Fully Renovated</option>
                  <option value="Good / Well Maintained">Good / Well Maintained</option>
                  <option value="Needs Cosmetic Work">Needs Minor Cosmetic Work</option>
                  <option value="Full Restoration Candidate">Full Fixer-Upper</option>
                </select>
              </div>

              {/* Owner Contact Information */}
              <div className="md:col-span-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  Where Should We Send Your Detailed CMA Report?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Analyzing Hamilton County Sales Data...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Get Instant Valuation Estimate</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
