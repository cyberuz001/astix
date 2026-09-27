import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavigationProps {
  isDarkSection?: boolean;
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isDarkSection = false }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible at the very top (first 60px)
      if (currentScrollY <= 60) {
        setIsVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);
        // Scrolling down: disappear
        if (currentScrollY > lastScrollY.current + 6) {
          setIsVisible(false);
        }
        // Scrolling up: reappear
        else if (currentScrollY < lastScrollY.current - 6) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible || mobileMenuOpen || searchOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled
            ? isDarkSection
              ? 'bg-[#111111]/85 backdrop-blur-md py-4 border-b border-white/10 text-white shadow-sm'
              : 'bg-[#F6F4EF]/85 backdrop-blur-md py-4 border-b border-black/5 text-[#111111] shadow-sm'
            : isDarkSection
            ? 'bg-transparent py-6 text-white'
            : 'bg-transparent py-6 text-[#111111]'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 select-none"
          >
            <div className="w-8 h-8 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src="/astix-icon.png"
                alt="ASTIX"
                className={`w-full h-full object-contain transition-all duration-300 ${
                  isDarkSection ? 'invert' : ''
                }`}
              />
            </div>
            <span className="font-audiowide tracking-wider text-base md:text-lg uppercase">
              ASTIX
            </span>
          </a>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase">
            <button
              onClick={() => scrollToSection('collection')}
              className="hover:text-[#B51222] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B51222] hover:after:w-full after:transition-all after:duration-300"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('sneakers')}
              className="hover:text-[#B51222] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B51222] hover:after:w-full after:transition-all after:duration-300"
            >
              Sneakers
            </button>
            <button
              onClick={() => scrollToSection('jackets')}
              className="hover:text-[#B51222] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B51222] hover:after:w-full after:transition-all after:duration-300"
            >
              Jackets
            </button>
            <button
              onClick={() => scrollToSection('craft')}
              className="hover:text-[#B51222] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B51222] hover:after:w-full after:transition-all after:duration-300"
            >
              Craft
            </button>
            <button
              onClick={() => scrollToSection('journal')}
              className="hover:text-[#B51222] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B51222] hover:after:w-full after:transition-all after:duration-300"
            >
              Journal
            </button>
          </nav>

          {/* Right Action Icons: Search & Bag */}
          <div className="flex items-center gap-6">

            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search collection"
              className="hover:text-[#B51222] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bag trigger with counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping bag"
              className="relative flex items-center gap-2 group hover:text-[#B51222] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-xs font-semibold tracking-wider font-mono">
                BAG {totalItems > 0 && `(${totalItems})`}
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 w-2 h-2 bg-[#B51222] rounded-full animate-ping" />
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden hover:text-[#B51222] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden px-6 py-8 border-b ${
              isDarkSection
                ? 'bg-[#111111] text-white border-white/10'
                : 'bg-[#F6F4EF] text-[#111111] border-black/10'
            }`}
          >
            <div className="flex flex-col gap-6 text-sm font-semibold tracking-widest uppercase">
              <button
                onClick={() => scrollToSection('collection')}
                className="text-left hover:text-[#B51222] transition-colors"
              >
                Collection
              </button>
              <button
                onClick={() => scrollToSection('sneakers')}
                className="text-left hover:text-[#B51222] transition-colors"
              >
                Sneakers
              </button>
              <button
                onClick={() => scrollToSection('jackets')}
                className="text-left hover:text-[#B51222] transition-colors"
              >
                Jackets
              </button>
              <button
                onClick={() => scrollToSection('craft')}
                className="text-left hover:text-[#B51222] transition-colors"
              >
                Craft
              </button>
              <button
                onClick={() => scrollToSection('journal')}
                className="text-left hover:text-[#B51222] transition-colors"
              >
                Journal
              </button>
              <button
                onClick={() => scrollToSection('cta')}
                className="text-left text-[#B51222] transition-colors"
              >
                Step Into ASTIX
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 px-6 animate-fadeIn">
          <div className="bg-[#FAF9F6] text-[#111111] max-w-xl w-full rounded-2xl p-6 shadow-2xl border border-black/10 relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-[#B51222] mb-3">
              Search ASTIX Archive
            </div>
            <div className="flex items-center gap-3 border-b border-black/20 pb-3">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search sneakers, jackets, craft..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-lg outline-none placeholder:text-neutral-400 font-sans"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="text-neutral-400">Suggestions:</span>
              {['ASTIX V1 White', 'Shell 01 Storm Jacket', 'Crimson Mono', 'Ballistic Mesh'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    scrollToSection('collection');
                    setSearchOpen(false);
                  }}
                  className="px-3 py-1 bg-black/5 hover:bg-[#B51222] hover:text-white rounded-full transition-colors font-mono"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
