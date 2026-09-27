import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-12 border-t border-white/10 select-none">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <img src="/astix-icon.png" alt="ASTIX" className="w-full h-full object-contain invert" />
              </div>
              <span className="font-audiowide tracking-wider text-base md:text-lg uppercase">
                ASTIX
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm">
              Architectural footwear and technical storm shells engineered around human movement, material restraint, and contemporary visual culture.
            </p>
            <div className="sacramento-regular text-2xl md:text-3xl text-neutral-300 tracking-wide select-none pt-1">
              powered by astro
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-xs font-mono uppercase tracking-widest">
            <div className="space-y-3.5">
              <span className="text-[#B51222] font-bold block mb-4">ARCHIVE</span>
              <div>
                <button onClick={() => scrollTo('collection')} className="text-neutral-400 hover:text-white transition-colors">
                  Shop All
                </button>
              </div>
              <div>
                <button onClick={() => scrollTo('sneakers')} className="text-neutral-400 hover:text-white transition-colors">
                  Sneakers
                </button>
              </div>
              <div>
                <button onClick={() => scrollTo('jackets')} className="text-neutral-400 hover:text-white transition-colors">
                  Jackets
                </button>
              </div>
              <div>
                <button onClick={() => scrollTo('craft')} className="text-neutral-400 hover:text-white transition-colors">
                  Craft Details
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              <span className="text-[#B51222] font-bold block mb-4">DISPATCH</span>
              <div>
                <button onClick={() => scrollTo('journal')} className="text-neutral-400 hover:text-white transition-colors">
                  Journal
                </button>
              </div>
              <div>
                <a href="#instagram" onClick={(e) => e.preventDefault()} className="text-neutral-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
              <div>
                <a href="#contact" onClick={(e) => e.preventDefault()} className="text-neutral-400 hover:text-white transition-colors">
                  Client Service
                </a>
              </div>
              <div>
                <a href="#press" onClick={(e) => e.preventDefault()} className="text-neutral-400 hover:text-white transition-colors">
                  Press &amp; Media
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B51222] font-bold block">
              PRIVATE DISPATCH
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Receive confidential notifications regarding limited silhouette drops and architectural exhibitions.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 px-4 py-3 text-xs font-mono tracking-wider text-white placeholder:text-neutral-500 rounded outline-none focus:border-[#B51222] transition-colors"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-white text-black hover:bg-[#B51222] hover:text-white rounded transition-colors flex items-center justify-center"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] font-mono text-[#B51222] block animate-fadeIn">
                YOU HAVE ENTERED THE PRIVATE REGISTRY.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
          <div>
            &copy; {new Date().getFullYear()} ASTIX DESIGN ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">PRIVACY POLICY</span>
            <span>&bull;</span>
            <span className="hover:text-neutral-300 cursor-pointer">TERMS OF SERVICE</span>
            <span>&bull;</span>
            <span className="hover:text-neutral-300 cursor-pointer">ACCESSIBILITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
