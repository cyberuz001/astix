import React from 'react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-24 md:py-40 bg-[#F5F3EF] text-[#111111] relative overflow-hidden border-t border-black/5">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Audiowide Typography & Manifesto */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono tracking-[0.28em] text-[#B51222] uppercase block mb-3 font-semibold">
              BRAND MANIFESTO
            </span>

            <h2 className="section-audiowide text-[#111111] mb-8">
              MORE THAN <br />
              <span className="text-[#B51222]">A PRODUCT</span>
            </h2>

            <div className="space-y-6 max-w-xl text-neutral-700 font-sans text-base md:text-lg leading-relaxed">
              <p className="font-medium text-black">
                ASTIX explores the space between movement, everyday fashion and modern visual culture. Every silhouette is designed to feel relevant today and familiar tomorrow.
              </p>
              <p className="text-sm md:text-base text-neutral-600">
                We reject seasonal obsolescence. Our footwear and technical shells are conceived through reductive architectural principles: strip away decorative superfluousness, enhance biomechanical compliance, and let the purity of form dictate the silhouette.
              </p>
            </div>

            {/* Atelier Metrics in Audiowide */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-black/10">
              <div>
                <span className="text-3xl md:text-4xl font-audiowide uppercase tracking-tight text-[#111111]">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mt-2">
                  RECYCLED MEMBRANES
                </span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-audiowide uppercase tracking-tight text-[#B51222]">
                  450
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mt-2">
                  ATELIER LIMITED PAIRS
                </span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-audiowide uppercase tracking-tight text-[#111111]">
                  02
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mt-2">
                  CORE SILHOUETTES
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Card with Floating Crimson Sneaker */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Architectural Backdrop Card */}
              <div className="bg-[#ECEAE5] rounded-[32px] p-8 md:p-12 border border-black/[0.04] shadow-sm relative overflow-hidden">
                <div className="w-14 h-14 mb-8 opacity-25">
                  <img src="/astix-icon.png" alt="ASTIX" className="w-full h-full object-contain" />
                </div>

                <blockquote className="text-xl md:text-2xl font-serif italic text-neutral-800 leading-snug mb-8">
                  "Form is not applied to movement; movement generates the form."
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-black/10 text-xs font-mono">
                  <span className="uppercase text-neutral-500">ASTIX DESIGN LAB</span>
                  <span className="text-[#B51222] font-bold">MILAN &bull; 2026</span>
                </div>
              </div>

              {/* Overlapping Floating Crimson Sneaker with uncropped generous breathing space */}
              <div className="relative -mt-16 sm:-mt-20 -mr-4 md:-mr-8 flex justify-end">
                <img
                  src="/sneaker-crimson.png"
                  alt="ASTIX Crimson Silhouette"
                  className="w-72 sm:w-80 md:w-96 object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)] hover:scale-105 transition-transform duration-500 select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
