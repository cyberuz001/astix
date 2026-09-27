import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { productAssets } from './three/productAssets';

gsap.registerPlugin(ScrollTrigger);
const AstixScene = React.lazy(() => import('./three/AstixScene').then(module => ({ default: module.AstixScene })));
type ColorIndex = 0 | 1 | 2;
const rise = (p: number, a: number, b: number) => Math.max(0, Math.min(1, (p - a) / (b - a)));
const visible = (p: number, a: number, b: number, c: number, d: number) => rise(p, a, b) * (1 - rise(p, c, d));

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

function canRenderWebGL() {
  try {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (memory !== undefined && memory <= 2) return false;
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch { return false; }
}

class SceneErrorBoundary extends React.Component<{ onError: () => void; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function StaticHero() {
  const { addToCart, setQuickViewProduct } = useCart();
  return (
    <div className="bg-[#F5F3EF] text-[#111111]">
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <img src={productAssets.icon} alt="ASTIX insignia" className="w-36 sm:w-52 h-auto" />
        <h1 className="font-audiowide text-3xl sm:text-5xl tracking-[0.16em] mt-6">ASTIX</h1>
        <p className="text-xs sm:text-sm tracking-[0.32em] text-neutral-500 mt-3">DESIGNED TO MOVE</p>
      </section>
      <section className="min-h-screen grid lg:grid-cols-2 items-center gap-8 max-w-[1520px] mx-auto px-6 sm:px-10 md:px-16 py-20">
        <div>
          <h2 className="hero-audiowide mb-6">DESIGNED <br /><span className="text-[#B41624]">TO MOVE</span></h2>
          <p className="text-sm md:text-base text-neutral-600 max-w-md mb-8">Modern footwear engineered around movement, architectural form, and everyday life.</p>
          <button onClick={() => setQuickViewProduct(PRODUCTS[0])} className="px-7 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest rounded">Discover ASTIX</button>
        </div>
        <img src={productAssets.sneakers[0]} alt="ASTIX V1 White / Crimson" className="w-full max-w-[650px] mx-auto object-contain" />
      </section>
      <section className="min-h-screen grid lg:grid-cols-2 items-center gap-8 max-w-[1520px] mx-auto px-6 sm:px-10 md:px-16 py-20">
        <div>
          <span className="text-xs tracking-widest text-[#B41624]">ASTIX SHELL 01</span>
          <h2 className="hero-audiowide my-5">BUILT <br /><span className="text-[#B41624]">TO MOVE</span></h2>
          <p className="text-sm text-neutral-600 max-w-md mb-8">Japanese 3-layer waterproof storm membrane engineered with welded seam architecture and articulated motion contouring.</p>
          <button onClick={() => addToCart(PRODUCTS[3])} className="px-7 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest rounded">Order Shell 01 — ${PRODUCTS[3].price}</button>
        </div>
        <img src={productAssets.jackets[0]} alt="ASTIX Shell 01 White / Crimson" className="w-full max-w-[620px] mx-auto object-contain" />
      </section>
      <section className="min-h-[80vh] flex flex-col justify-center px-6 sm:px-10 md:px-16 py-20 max-w-[1520px] mx-auto">
        <h2 className="section-audiowide mb-10">THE FAMILY</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          {[...productAssets.sneakers, productAssets.jackets[0]].map((src, i) =>
            <img key={src} src={src} alt={'ASTIX product ' + (i + 1)} className="w-full object-contain" />)}
        </div>
      </section>
    </div>
  );
}

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneProgress = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(true);
  const [webgl] = useState(canRenderWebGL);
  const reducedMotion = useReducedMotion();
  const [sneakerColor, setSneakerColor] = useState<ColorIndex | null>(null);
  const [jacketColor, setJacketColor] = useState<ColorIndex | null>(null);
  const { addToCart, setQuickViewProduct } = useCart();
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setFailed(true), []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [reducedMotion, webgl, failed]);

  useEffect(() => {
    if (reducedMotion || !webgl || failed || !containerRef.current) return;
    const state = { value: 0 };
    // One master timeline. Lenis remains the page's scroll source.
    const timeline = gsap.timeline({ scrollTrigger: {
      trigger: containerRef.current, start: 'top top', end: 'bottom bottom',
      scrub: 2, invalidateOnRefresh: true,
    } });
    timeline.to(state, { value: 1, duration: 1, ease: 'none', onUpdate: () => {
      sceneProgress.current = state.value;
      setProgress(Math.round(state.value * 1000) / 1000);
    } });
    ScrollTrigger.refresh();
    return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
  }, [reducedMotion, webgl, failed]);

  if (reducedMotion || !webgl || failed) return <StaticHero />;

  const introOpacity = 1 - rise(progress, 0.24, 0.40);
  const sneakerHeadlineOpacity = visible(progress, 0.53, 0.59, 0.78, 0.84);
  const jacketHeadlineOpacity = visible(progress, 0.82, 0.87, 0.935, 0.96);
  const galleryOpacity = visible(progress, 0.96, 0.978, 0.99, 1);
  const sneakerActive = sneakerColor ?? (progress < 0.66 ? 0 : progress < 0.72 ? 1 : progress < 0.77 ? 2 : 0);
  const jacketActive = jacketColor ?? (progress < 0.885 ? 0 : progress < 0.91 ? 1 : 2);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F5F3EF]" style={{ height: '950vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F5F3EF] select-none">
        <SceneErrorBoundary onError={onError}>
          <React.Suspense fallback={null}>
            <AstixScene progress={sceneProgress} sneakerColor={sneakerColor} jacketColor={jacketColor} onReady={onReady} onFailure={onError} active={active} />
          </React.Suspense>
        </SceneErrorBoundary>
        {!ready && <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center pointer-events-none bg-[#F5F3EF]">
          <img src={productAssets.icon} alt="" className="w-36 sm:w-52" />
        </div>}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center" style={{ opacity: introOpacity }}>
          <div className="mt-[clamp(190px,24vw,270px)] text-center">
            <h1 className="font-audiowide text-3xl sm:text-4xl md:text-5xl tracking-[0.16em] text-[#111111]">ASTIX</h1>
            <p className="text-xs sm:text-sm tracking-[0.32em] text-neutral-500 font-medium mt-3">DESIGNED TO MOVE</p>
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center px-6 sm:px-10 md:px-16 pointer-events-none cinematic-copy"
          style={{ opacity: sneakerHeadlineOpacity, pointerEvents: sneakerHeadlineOpacity > 0.8 ? 'auto' : 'none' }}>
          <div className="w-full max-w-[1520px] mx-auto"><div className="max-w-md lg:max-w-lg">
            <h2 className="hero-audiowide text-[#111111] mb-6">DESIGNED <br /><span className="text-[#B41624]">TO MOVE</span></h2>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md mb-8">Modern footwear engineered around movement, architectural form, and everyday life.</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-widest rounded hover:bg-[#B41624] flex items-center gap-2.5">
                Explore Collection <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <button onClick={() => setQuickViewProduct(PRODUCTS[sneakerActive])}
                className="px-6 py-3.5 border border-black/20 hover:border-black text-[#111111] text-xs uppercase tracking-widest rounded">Discover ASTIX</button>
            </div>
          </div></div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center px-6 sm:px-10 md:px-16 pointer-events-none cinematic-copy"
          style={{ opacity: jacketHeadlineOpacity, pointerEvents: jacketHeadlineOpacity > 0.8 ? 'auto' : 'none' }}>
          <div className="w-full max-w-[1520px] mx-auto"><div className="max-w-md">
            <span className="text-xs tracking-widest text-[#B41624] uppercase block mb-2 font-semibold">ASTIX SHELL 01</span>
            <h2 className="hero-audiowide text-[#111111] mb-4">BUILT <br /><span className="text-[#B41624]">TO MOVE</span></h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">Japanese 3-layer waterproof storm membrane engineered with welded seam architecture and articulated motion contouring.</p>
            <button onClick={() => addToCart(PRODUCTS[3 + jacketActive])}
              className="px-8 py-3 bg-[#111111] hover:bg-[#B41624] text-white text-xs uppercase tracking-widest rounded">Order Shell 01 — ${PRODUCTS[3 + jacketActive].price}</button>
          </div></div>
        </div>
        <div className="absolute inset-0 z-20 flex items-start justify-center pt-[12vh] pointer-events-none" style={{ opacity: galleryOpacity }}>
          <h2 className="section-audiowide text-[#111111]">THE FAMILY</h2>
        </div>
        <div className="absolute bottom-10 inset-x-0 z-30 flex justify-center pointer-events-none" style={{ opacity: sneakerHeadlineOpacity, pointerEvents: sneakerHeadlineOpacity > 0.8 ? 'auto' : 'none' }}>
          <div className="flex gap-2 sm:gap-4 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-black/5 shadow-sm">
            {(['White / Crimson', 'Black / Crimson', 'Crimson / Black'] as const).map((label, i) =>
              <button key={label} onClick={() => setSneakerColor(i as ColorIndex)} aria-label={'View ' + label + ' sneaker'}
                className={'px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider ' + (sneakerActive === i ? 'bg-[#111111] text-white' : 'text-neutral-500 hover:text-black')}>
                <span className="sm:hidden">{i + 1}</span><span className="hidden sm:inline">{label}</span>
              </button>)}
          </div>
        </div>
        <div className="absolute bottom-10 inset-x-0 z-30 flex justify-center pointer-events-none" style={{ opacity: jacketHeadlineOpacity, pointerEvents: jacketHeadlineOpacity > 0.8 ? 'auto' : 'none' }}>
          <div className="flex gap-2 sm:gap-4 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-black/5 shadow-sm">
            {(['White Shell', 'Obsidian Shell', 'Crimson Atelier'] as const).map((label, i) =>
              <button key={label} onClick={() => setJacketColor(i as ColorIndex)} aria-label={'View ' + label}
                className={'px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider ' + (jacketActive === i ? 'bg-[#111111] text-white' : 'text-neutral-500 hover:text-black')}>
                <span className="sm:hidden">{i + 1}</span><span className="hidden sm:inline">{label}</span>
              </button>)}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none" style={{ opacity: 1 - rise(progress, 0.01, 0.05) }}>
          <span className="text-[10px] tracking-[0.28em] text-neutral-400 uppercase">SCROLL ↓</span>
        </div>
      </div>
    </div>
  );
};
