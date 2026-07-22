import React, { useState, useEffect } from 'react';
import { Building2, Heart, Scale, Phone, Mail, Menu, X, Compass, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  compareCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  compareCount,
  onOpenCompare,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'listings', label: 'Properties' },
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' },
    { id: 'rentals', label: 'Rentals' },
    { id: 'neighborhoods', label: 'Neighborhoods' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-[#0A192F] border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-[#0A192F] border border-[#C5A059]/50 flex items-center justify-center rounded-sm">
              <span className="text-[#C5A059] font-bold text-lg">P</span>
            </div>
            <div>
              <div className="font-serif-display text-xl font-extrabold tracking-tight text-white uppercase">
                PASTORSIL
              </div>
              <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">Cincinnati, Ohio</p>
            </div>
          </div>

          {/* Desktop Navigation Links - Sophisticated Uppercase Links with Gold Hover */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-widest">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-[#C5A059] border-b-2 border-[#C5A059]'
                      : 'text-gray-200 hover:text-[#C5A059]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Counters & Contact Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Property Comparison Counter */}
            <button
              onClick={onOpenCompare}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all ${
                compareCount > 0
                  ? 'border-[#C5A059] bg-[#112240] text-[#C5A059]'
                  : 'border-white/20 bg-[#0A192F] text-gray-300 hover:border-[#C5A059]'
              }`}
              title="Compare Properties"
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Compare</span>
              {compareCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C5A059] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Saved Favorites Counter */}
            <button
              onClick={() => handleNavClick('favorites')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'favorites'
                  ? 'border-[#C5A059] bg-[#112240] text-[#C5A059]'
                  : 'border-white/20 bg-[#0A192F] text-gray-300 hover:border-[#C5A059]'
              }`}
              title="Saved Favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden md:inline">Saved</span>
              {favoritesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Call Direct Contact Button */}
            <a
              href="tel:5137066312"
              className="bg-[#C5A059] text-white px-5 py-2 text-xs font-bold uppercase rounded-sm hover:bg-[#b38f4d] transition-all tracking-wider flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>(513) 706-6312</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('favorites')}
              className="p-2 text-gray-300 rounded-sm hover:bg-[#112240] relative"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 rounded-sm hover:bg-[#112240] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C5A059]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-b border-white/10 px-4 pt-3 pb-6 mt-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2.5 rounded-sm text-xs uppercase font-bold tracking-wider text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-[#C5A059] text-white'
                    : 'bg-[#112240] text-gray-200 hover:bg-[#1a2c4e]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="tel:5137066312"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-[#C5A059] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#b38f4d] shadow-md"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call (513) 706-6312</span>
            </a>
            <a
              href="mailto:pastorsilcotlg@gmail.com"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm bg-[#112240] text-gray-200 font-medium text-xs border border-white/10"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>pastorsilcotlg@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
