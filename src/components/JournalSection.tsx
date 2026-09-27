import React, { useState } from 'react';
import { JOURNAL_STORIES } from '../data/products';
import { ArrowUpRight, Clock, Calendar, X } from 'lucide-react';
import { StoryArticle } from '../types';

export const JournalSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<StoryArticle | null>(null);

  return (
    <section id="journal" className="py-24 md:py-36 bg-[#F6F4EF] text-[#111111] relative border-t border-black/5">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B51222] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#B51222]" />
              <span>DISCOURSE & RESEARCH</span>
            </div>
            <h2 className="section-audiowide text-[#111111]">
              ASTIX JOURNAL
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest max-w-xs text-right hidden md:block">
            ARCHITECTURAL EXPLORATION, DESIGN DISPATCHES &amp; MATERIAL DIALOGUE
          </p>
        </div>

        {/* 3 Large Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {JOURNAL_STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer bg-[#FAF9F6] rounded-[28px] overflow-hidden border border-black/5 hover:border-black/20 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Top Image Container */}
              <div className="relative h-64 sm:h-72 w-full bg-[#F2F0EB] overflow-hidden flex items-center justify-center p-6">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-xs font-mono font-semibold uppercase tracking-wider rounded-full shadow-sm text-[#111111]">
                  {story.tag}
                </span>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#B51222]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-4">
                    <span>{story.date}</span>
                    <span>&bull;</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className="font-extrabold text-xl md:text-2xl uppercase font-display tracking-tight text-[#111111] group-hover:text-[#B51222] transition-colors mb-3 leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-sm text-neutral-600 font-sans leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#111111]">
                  <span>READ DISPATCH</span>
                  <span className="text-[#B51222] group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#FAF9F6] text-[#111111] max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-[28px] p-8 md:p-12 shadow-2xl relative border border-black/10">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-neutral-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono font-bold text-[#B51222] uppercase tracking-widest">
              {selectedStory.tag} &bull; {selectedStory.date}
            </span>

            <h2 className="text-2xl md:text-3xl font-extrabold uppercase font-display tracking-tight mt-3 mb-6">
              {selectedStory.title}
            </h2>

            <div className="h-64 bg-[#F2F0EB] rounded-2xl p-6 flex items-center justify-center mb-8">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="h-full object-contain filter drop-shadow-xl"
              />
            </div>

            <div className="space-y-4 text-sm md:text-base text-neutral-700 leading-relaxed font-sans">
              <p className="font-semibold text-black">{selectedStory.excerpt}</p>
              <p>
                In our Milan atelier, the ASTIX V1 project began not on paper, but on kinetic pressure plates. We analyzed gait vectors across dynamic urban surfaces: cobblestones, polished concrete, asphalt, and subway stairs.
              </p>
              <p>
                Rather than stacking multiple layers of disconnected foam, we sculpted a unified structural chassis with variable densities. The signature crimson dampener core provides progressive resistance without deadening the foot's natural proprioceptive feedback.
              </p>
              <p>
                "When you strip away the branding noise typical of sports footwear," notes lead designer Marco Vane, "what remains is pure kinetic architecture. The shoe doesn't scream for attention; it commands presence through proportional perfection."
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 flex justify-between items-center text-xs font-mono text-neutral-500">
              <span>AUTHORED BY ASTIX EDITORIAL</span>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-[#B51222] font-bold hover:underline"
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
