import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Award, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#0A192F] border-t border-white/10 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C5A059]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#0A192F] border border-[#C5A059]/40 flex items-center justify-center">
                <span className="text-[#C5A059] font-bold text-lg">P</span>
              </div>
              <span className="font-serif-display text-2xl font-bold tracking-tight text-white uppercase">
                PASTORSIL <span className="text-[#C5A059] font-sans text-xs tracking-widest block font-medium">REAL ESTATE</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Pastorsil Real Estate is Cincinnati’s premier luxury brokerage. Serving buyers, sellers, luxury estates, and rental investors across Hyde Park, Mount Adams, Indian Hill, Over-the-Rhine, and Mason, OH.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#C5A059] font-medium pt-2">
              <div className="flex items-center gap-1.5 bg-[#112240] border border-[#C5A059]/30 px-3 py-1 rounded-sm">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Licensed OH Broker</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#112240] border border-[#C5A059]/30 px-3 py-1 rounded-sm">
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span>$350M+ Sales Volume</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-display text-lg font-semibold tracking-wide border-b border-[#C5A059]/40 pb-2 inline-block">
              Explore Properties
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab('listings')} className="hover:text-[#C5A059] transition-colors">
                  Featured Listings
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('buy')} className="hover:text-[#C5A059] transition-colors">
                  Buyer Guide & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sell')} className="hover:text-[#C5A059] transition-colors">
                  Instant Home Valuation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rentals')} className="hover:text-[#C5A059] transition-colors">
                  Cincinnati Rentals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('neighborhoods')} className="hover:text-[#C5A059] transition-colors">
                  Neighborhood Profiles
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-display text-lg font-semibold tracking-wide border-b border-[#C5A059]/40 pb-2 inline-block">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <span className="text-gray-300">Cincinnati, Ohio 45208</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="tel:5137066312" className="text-[#C5A059] font-semibold hover:underline">
                  (513) 706-6312
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:pastorsilcotlg@gmail.com" className="hover:text-[#C5A059] transition-colors text-xs break-all">
                  pastorsilcotlg@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Cincinnati Market Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-display text-lg font-semibold tracking-wide border-b border-[#C5A059]/40 pb-2 inline-block">
              Market Intelligence
            </h4>
            <p className="text-xs text-gray-400">
              Subscribe for monthly Cincinnati luxury real estate reports and off-market listing alerts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#112240] border border-white/20 rounded-sm px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C5A059] pr-9"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#C5A059] rounded-sm text-white font-bold hover:bg-[#b38f4d] transition-all flex items-center justify-center"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              {newsletterSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to Cincinnati Market Brief!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar Requirement */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2 text-center text-xs text-gray-400 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} Pastorsil Real Estate. All rights reserved. Equal Housing Opportunity.
          </div>
          <div className="text-center font-medium">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline font-semibold">iWebNext</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
