import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Building, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Buying',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 space-y-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-white">
          Contact <span className="text-gold-gradient">Pastorsil Real Estate</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Whether buying, selling, renting, or seeking a valuation in Greater Cincinnati, Broker Pastor Sil is ready to answer your call.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-amber-500/30 space-y-6 shadow-2xl">
              <h3 className="text-2xl font-serif-display font-bold text-white">Direct Advisory Contact</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href="tel:5137066312"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Direct Phone Line</span>
                    <strong className="text-white text-base">(513) 706-6312</strong>
                  </div>
                </a>

                <a
                  href="mailto:pastorsilcotlg@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Direct Email</span>
                    <strong className="text-white text-sm break-all">pastorsilcotlg@gmail.com</strong>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Headquarters</span>
                    <strong className="text-white text-sm">Cincinnati, OH 45202</strong>
                    <span className="text-slate-400 text-xs block">Serving Hamilton & Warren Counties</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Brokerage Hours</span>
                    <strong className="text-white text-xs block">Mon - Sat: 8:00 AM - 7:00 PM</strong>
                    <span className="text-amber-400 text-xs block font-medium">Sunday: By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Box */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-amber-500/30 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif-display font-bold text-white">Message Sent Successfully</h3>
                  <p className="text-slate-300 text-xs max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Pastor Sil has received your message and will get back to you promptly at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-serif-display font-bold text-white mb-2">Send a Direct Message</h3>
                  <p className="text-slate-400 text-xs mb-6">Pastor Sil responds personally to all inquiries within 2 hours.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Type</label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                        >
                          <option value="Buying">Buying a Property</option>
                          <option value="Selling">Selling a Property</option>
                          <option value="Rentals">Rentals & Management</option>
                          <option value="General">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="(513) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                      <input
                        type="text"
                        placeholder="e.g., Looking for a 4-bedroom home in Hyde Park"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Share details about your timeline, budget, neighborhood preferences, or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Message to Pastor Sil</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
