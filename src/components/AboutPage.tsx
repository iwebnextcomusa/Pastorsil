import React from 'react';
import { TEAM_MEMBERS } from '../data/team';
import { ShieldCheck, Award, Building2, Heart, CheckCircle2, Phone, Mail, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 space-y-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>About Pastorsil Real Estate</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-white">
          Integrity, Excellence & <span className="text-gold-gradient">Local Mastery</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Founded by Principal Broker Pastor Sil, Pastorsil Real Estate was built on the fundamental belief that every property transaction deserves bespoke care, total transparency, and high-performance market strategy.
        </p>
      </div>

      {/* Founder Spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl">
              <img
                src={TEAM_MEMBERS[0].image}
                alt="Pastor Sil Principal Broker"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-slate-950 border border-amber-500/40 p-4 rounded-xl shadow-xl">
              <div className="text-amber-400 font-serif-display text-2xl font-bold">{TEAM_MEMBERS[0].salesVolume}</div>
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Lifetime Closed Sales</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Founder & Managing Broker</span>
            <h2 className="text-3xl font-serif-display font-bold text-white">Pastor Sil</h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              With over 18 years serving the Greater Cincinnati market, Pastor Sil has guided hundreds of families, luxury estate buyers, commercial investors, and developers across Hyde Park, Indian Hill, Mount Adams, Over-the-Rhine, and Mason.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              "Our mission is simple: to represent our clients with unyielding integrity, leverage cutting-edge market analytics, and maximize every dollar of equity for sellers while securing dream addresses for buyers."
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Licensed Ohio Real Estate Broker</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hamilton County Realtor Association</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Client Trust Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Personal Broker Access</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="tel:5137066312"
                className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call (513) 706-6312</span>
              </a>
              <a
                href="mailto:pastorsilcotlg@gmail.com"
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-semibold text-xs hover:bg-slate-800 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email Pastor Sil</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif-display font-bold text-white">Our Senior Advisory Team</h2>
          <p className="text-slate-400 text-xs">Dedicated professionals serving Cincinnati, OH</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="glass-card rounded-2xl overflow-hidden border border-slate-800 p-5 space-y-4 hover:border-amber-500/40 transition-all">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-serif-display text-xl font-bold">{member.name}</h3>
                <p className="text-amber-400 text-xs font-semibold">{member.title}</p>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">{member.bio}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
                <div className="text-slate-500 text-[10px] uppercase font-bold">Specialties:</div>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
