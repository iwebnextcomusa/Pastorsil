import React, { useState } from 'react';
import { KeyRound, ShieldCheck, FileText, CheckCircle2, ChevronDown, ChevronUp, Phone, Mail, Sparkles, Building } from 'lucide-react';

interface BuyPageProps {
  setActiveTab: (tab: string) => void;
}

export const BuyPage: React.FC<BuyPageProps> = ({ setActiveTab }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const buyingSteps = [
    {
      num: '01',
      title: 'Initial Consultation & Strategy',
      desc: 'We define your dream location, budget parameters, architectural style preferences, and school district requirements across Hamilton or Warren County.',
    },
    {
      num: '02',
      title: 'Mortgage Pre-Approval',
      desc: 'We connect you with Cincinnati’s top mortgage lenders to secure competitive interest rates, pre-approval letters, and tax abatement eligibility.',
    },
    {
      num: '03',
      title: 'Curated Showings & Private Access',
      desc: 'Enjoy priority access to off-market inventory, coming-soon listings, and private tours guided by Broker Pastor Sil.',
    },
    {
      num: '04',
      title: 'Strategic Offer & Negotiation',
      desc: 'We craft airtight offer contracts leveraging market analytics to secure optimal purchase terms and protect your earnest deposit.',
    },
    {
      num: '05',
      title: 'Inspection, Appraisal & Closing',
      desc: 'We manage full home inspections, repair requests, title transfers, and closing day keys handing-over.',
    },
  ];

  const faqs = [
    {
      q: 'Why buy real estate in Cincinnati, Ohio?',
      a: 'Cincinnati offers an extraordinary blend of vibrant historic culture, world-class Fortune 500 job hubs (P&G, Kroger, Fifth Third), top-ranked hospital networks, and highly rated school systems at an accessible cost of living compared to national coastal markets.',
    },
    {
      q: 'What is a Cincinnati Property Tax Abatement?',
      a: 'The City of Cincinnati offers 10-to-15-year property tax abatements for newly constructed or substantially renovated homes in qualifying neighborhoods like Over-the-Rhine, Walnut Hills, and Northside. This caps tax bills and dramatically lowers monthly mortgage payments.',
    },
    {
      q: 'Do I pay a buyer agent fee when purchasing a home with Pastorsil?',
      a: 'In most residential purchases, buyer agent commissions are covered by the seller or structured cleanly through listing agreements. Having an experienced broker like Pastor Sil representing your interests costs you zero out-of-pocket guidance fee.',
    },
    {
      q: 'How quickly do desirable Cincinnati homes sell?',
      a: 'Well-priced homes in high-demand pockets like Hyde Park, Mount Adams, and Mason often receive multiple competitive offers within 3 to 7 days. Early pre-approval and quick response time are vital.',
    },
  ];

  return (
    <div className="pt-24 pb-16 space-y-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Buyer Representation & Roadmap</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-white">
          Buying Your Next Home in <span className="text-gold-gradient">Cincinnati, OH</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          From historic Hyde Park Tudors to luxury Mount Adams riverfront condominiums, Pastorsil Real Estate guides buyers through a seamless, highly rewarding transaction.
        </p>
      </div>

      {/* 5-Step Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif-display font-bold text-white">The Pastorsil 5-Step Buyer Process</h2>
          <p className="text-slate-400 text-xs">Structured clarity at every step from strategy to keys</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {buyingSteps.map((s, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-all">
              <span className="text-3xl font-serif-display font-bold text-gold-gradient block">{s.num}</span>
              <h3 className="text-white font-bold text-sm">{s.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-serif-display font-bold text-white mb-2">Frequently Asked Buyer Questions</h2>
          <p className="text-slate-400 text-xs">Essential insights for Cincinnati home buyers</p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4 text-left text-white font-semibold text-sm flex items-center justify-between gap-4"
              >
                <span>{f.q}</span>
                {openFaqIndex === i ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaqIndex === i && (
                <div className="px-4 pb-4 text-slate-300 text-xs leading-relaxed border-t border-slate-800/60 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-amber-500/30 text-center space-y-4 relative overflow-hidden">
          <h2 className="text-3xl font-serif-display font-bold text-white">Ready to Tour Cincinnati Homes?</h2>
          <p className="text-slate-300 text-xs max-w-lg mx-auto">
            Schedule an introductory consultation or tour with Principal Broker Pastor Sil today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setActiveTab('listings')}
              className="px-6 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-lg hover:brightness-110"
            >
              Explore Available Listings
            </button>
            <a
              href="tel:5137066312"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-xs hover:bg-slate-800"
            >
              Call Broker (513) 706-6312
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
