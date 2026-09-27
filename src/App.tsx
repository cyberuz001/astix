import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { CartProvider } from './context/CartContext';
import { Navigation } from './components/Navigation';
import { CinematicHero } from './components/CinematicHero';
import { CollectionSection } from './components/CollectionSection';
import { CraftSection } from './components/CraftSection';
import { BrandStorySection } from './components/BrandStorySection';
import { JournalSection } from './components/JournalSection';
import { FinalCinematicCTA } from './components/FinalCinematicCTA';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickView } from './components/ProductQuickView';
import { AudioAtmosphere } from './components/AudioAtmosphere';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Intersection observer or scroll detector for Dark Section (#cta and footer)
    const handleScroll = () => {
      const ctaEl = document.getElementById('cta');
      if (ctaEl) {
        const rect = ctaEl.getBoundingClientRect();
        // If top of CTA is near top of viewport or visible
        if (rect.top <= 80) {
          setIsDarkSection(true);
        } else {
          setIsDarkSection(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleSound = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const handleExploreCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#F6F4EF] text-[#111111] overflow-x-clip selection:bg-[#B51222] selection:text-white">
        {/* Custom Luxury Pointer */}
        <CustomCursor />

        {/* Ambient Web Audio Atmosphere */}
        <AudioAtmosphere isPlaying={isAudioPlaying} />

        {/* Persistent Navigation Bar */}
        <Navigation
          isDarkSection={isDarkSection}
          isMuted={!isAudioPlaying}
          onToggleSound={handleToggleSound}
        />

        {/* Main Pinned Cinematic 3D Experience (0.00 -> 0.95) */}
        <main>
          <CinematicHero />

          {/* Section 22 & 23: Collection & Featured Products */}
          <CollectionSection />

          {/* Section 24: Craft & Material Architecture */}
          <CraftSection />

          {/* Section 25: Brand Manifesto & Story */}
          <BrandStorySection />

          {/* Section 26: Journal & Editorial Dispatches */}
          <JournalSection />

          {/* Section 27: Final Cinematic CTA (Dark #111111 Void) */}
          <FinalCinematicCTA onExploreCollection={handleExploreCollection} />
        </main>

        {/* Section 28: Minimal Dark Footer */}
        <Footer />

        {/* Slide-over Bag Drawer */}
        <CartDrawer />

        {/* High-Res Product Inspection Modal */}
        <ProductQuickView />
      </div>
    </CartProvider>
  );
}

export default App;
