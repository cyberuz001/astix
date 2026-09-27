import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FinalCinematicCTAProps {
  onExploreCollection: () => void;
}

export const FinalCinematicCTA: React.FC<FinalCinematicCTAProps> = ({ onExploreCollection }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="cta"
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] bg-[#111111] text-white flex flex-col items-center justify-center overflow-hidden py-24 px-6 select-none transition-colors duration-700"
    >
      {/* Subtle Deep-Crimson Ambient Light Gradient (No neon) */}
      <div
        className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full blur-[160px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(181, 18, 34, 0.22) 0%, rgba(59, 17, 22, 0.08) 50%, transparent 70%)',
          transform: `translate3d(${mouseOffset.x * 40}px, ${-mouseOffset.y * 30}px, 0)`,
        }}
      />

      {/* Huge Dark ASTIX Icon in Background (5-10% brighter than #111111 background) */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[850px] md:h-[850px] pointer-events-none opacity-[0.07] select-none transition-transform duration-700 ease-out"
        style={{
          transform: `
            translate3d(${-mouseOffset.x * 20}px, ${mouseOffset.y * 15}px, 0)
            scale(${1 + mouseOffset.x * 0.03})
            rotate(${mouseOffset.x * 3}deg)
          `,
        }}
      >
        <img
          src="/astix-icon.png"
          alt="ASTIX Monolith"
          className="w-full h-full object-contain invert"
        />
      </div>

      {/* Centered Floating WHITE + CRIMSON Sneaker */}
      <div
        className="relative z-20 w-80 sm:w-96 md:w-[540px] my-6 transition-transform duration-300 ease-out group"
        style={{
          perspective: '1200px',
          transform: `
            translate3d(${mouseOffset.x * 25}px, ${-mouseOffset.y * 20}px, 0)
            rotateY(${mouseOffset.x * 8}deg)
            rotateX(${mouseOffset.y * 6}deg)
          `,
        }}
      >
        {/* Soft Contact Shadow on Deep Void */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-[100%] bg-black/60 blur-xl pointer-events-none" />

        <img
          src="/sneaker-white.png"
          alt="ASTIX V1 Floating"
          className="w-full h-full object-contain filter drop-shadow-[0_35px_45px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Editorial White Typography & Magnetic CTA */}
      <div className="relative z-30 text-center max-w-xl px-6 mt-4">
        <span className="text-xs font-mono tracking-[0.25em] text-[#B51222] uppercase block mb-3">
          PERPETUAL KINETIC ARCHITECTURE
        </span>

        <h2 className="section-audiowide text-white mb-6">
          STEP <br />
          <span className="text-[#B51222]">INTO ASTIX</span>
        </h2>

        <p className="text-xs md:text-sm text-neutral-400 font-sans tracking-wide max-w-md mx-auto mb-8 leading-relaxed">
          The debut collection is available in limited quantities worldwide. Engineered for those who move through the world with intention.
        </p>

        <div className="flex items-center justify-center">
          <button
            onClick={onExploreCollection}
            className="group relative px-10 py-4 bg-white text-[#111111] hover:bg-[#B51222] hover:text-white text-xs font-mono uppercase tracking-widest rounded transition-all duration-300 shadow-2xl flex items-center gap-3"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
