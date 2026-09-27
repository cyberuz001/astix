import React from 'react';

export const CraftSection: React.FC = () => {
  return (
    <section id="craft" className="py-24 md:py-36 bg-[#F2F0EB] text-[#111111] overflow-hidden relative border-t border-black/5">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-24">
          <span className="text-xs font-mono tracking-[0.28em] text-[#B51222] uppercase block mb-3 font-semibold">
            MATERIAL SCIENCE & ARCHITECTURE
          </span>
          <h2 className="section-audiowide text-[#111111] mb-6">
            DETAILS <br />
            MATTER
          </h2>
          <p className="text-sm md:text-base text-neutral-600 font-sans leading-relaxed">
            Every millimeter of ASTIX silhouettes is calculated. From engineered airflow geometry to taped hydrophobic membranes, we design fashion for perpetual motion.
          </p>
        </div>

        {/* Asymmetrical High-Fashion Grid with Product Overflow */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch pt-6">
          {/* Card 1: Kinetic Breathability (7 cols) */}
          <div className="md:col-span-7 bg-[#ECEAE5] rounded-[30px] p-8 md:p-12 border border-black/[0.04] flex flex-col justify-between group hover:bg-[#E8E6E0] transition-all duration-500 shadow-sm relative pt-12">
            {/* Visual: Full Sneaker floating with overflow */}
            <div className="relative h-64 md:h-80 flex items-center justify-center my-4 overflow-visible">
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[100%] bg-black/10 blur-lg pointer-events-none transition-transform duration-500 group-hover:scale-110" />
              <img
                src="/sneaker-white.png"
                alt="Kinetic Breathability Matrix"
                className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-[1.03] group-hover:-translate-y-2 transition-transform duration-500 select-none"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-black/5">
              <h3 className="font-audiowide text-xl md:text-2xl uppercase tracking-wide mb-3 text-[#111111]">
                KINETIC BREATHABILITY
              </h3>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                Custom woven dual-layer textile engineered to deliver directional elasticity and maximum airflow across dynamic foot flexing zones.
              </p>
            </div>
          </div>

          {/* Card 2: Architectural Midsole (5 cols) */}
          <div className="md:col-span-5 bg-[#ECEAE5] rounded-[30px] p-8 md:p-12 border border-black/[0.04] flex flex-col justify-between group hover:bg-[#E8E6E0] transition-all duration-500 shadow-sm relative pt-12">
            {/* Visual: Obsidian Sneaker floating */}
            <div className="relative h-64 md:h-80 flex items-center justify-center my-4 overflow-visible">
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[100%] bg-black/10 blur-lg pointer-events-none transition-transform duration-500 group-hover:scale-110" />
              <img
                src="/sneaker-black.png"
                alt="Architectural Midsole"
                className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-[1.03] group-hover:-translate-y-2 transition-transform duration-500 select-none"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-black/5">
              <h3 className="font-audiowide text-xl md:text-2xl uppercase tracking-wide mb-3 text-[#111111]">
                ARCHITECTURAL MIDSOLE
              </h3>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                Multi-density EVA geometry with integrated crimson dampener core that absorbs impact while preserving structural elegance.
              </p>
            </div>
          </div>

          {/* Card 3: Hydrophobic Shell (5 cols) */}
          <div className="md:col-span-5 bg-[#ECEAE5] rounded-[30px] p-8 md:p-12 border border-black/[0.04] flex flex-col justify-between group hover:bg-[#E8E6E0] transition-all duration-500 shadow-sm relative pt-12">
            {/* Visual: Full Technical Shell with visible hood and sleeves */}
            <div className="relative h-64 md:h-80 flex items-center justify-center my-4 overflow-visible">
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[100%] bg-black/10 blur-lg pointer-events-none transition-transform duration-500 group-hover:scale-110" />
              <img
                src="/jacket-white.png"
                alt="Hydrophobic Storm Membrane"
                className="w-full h-full object-contain filter drop-shadow-xl transform group-hover:scale-[1.03] group-hover:-translate-y-2 transition-transform duration-500 select-none"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-black/5">
              <h3 className="font-audiowide text-xl md:text-2xl uppercase tracking-wide mb-3 text-[#111111]">
                HYDROPHOBIC SHELL
              </h3>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                Japanese 3-layer nylon shell with fluorocarbon-free water-repellent finish and taped thermal seam welding.
              </p>
            </div>
          </div>

          {/* Card 4: Iconic Symbol Integration (7 cols) */}
          <div className="md:col-span-7 bg-[#111111] text-white rounded-[30px] p-8 md:p-12 border border-white/10 flex flex-col justify-between group transition-all duration-500 shadow-md relative pt-12">
            {/* Visual: Embossed ASTIX Insignia */}
            <div className="relative h-64 md:h-80 flex items-center justify-center my-4">
              <div className="w-36 h-36 md:w-44 md:h-44 relative flex items-center justify-center">
                <img
                  src="/astix-icon.png"
                  alt="ASTIX Insignia"
                  className="w-full h-full object-contain invert opacity-90 group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_20px_40px_rgba(255,255,255,0.08)] select-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="font-audiowide text-xl md:text-2xl uppercase tracking-wide mb-3 text-white">
                THE ASTIX GLYPH
              </h3>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                Seamlessly integrated into zipper pulls, side quarters, and internal hood linings. A discreet mark of engineering purity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
