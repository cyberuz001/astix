import React, { useState } from 'react';
import { Plus, Eye, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const CollectionSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sneakers' | 'jackets' | 'accessories'>('all');
  const [selectedColorways, setSelectedColorways] = useState<Record<string, number>>({});
  const { addToCart, setQuickViewProduct } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'ALL SILHOUETTES' },
    { id: 'sneakers', label: 'SNEAKERS' },
    { id: 'jackets', label: 'JACKETS' },
    { id: 'accessories', label: 'ACCESSORIES' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="collection" className="py-24 md:py-36 bg-[#F5F3EF] text-[#111111] relative border-t border-black/5">
      <div className="max-w-[1520px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-black/10 pb-8">
          <div>
            <span className="text-xs font-mono tracking-[0.28em] text-[#B51222] uppercase block mb-3 font-semibold">
              AUTONOMOUS SILHOUETTES
            </span>
            <h2 className="section-audiowide text-[#111111]">
              THE COLLECTION
            </h2>
          </div>

          {/* Minimal Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-white/80 text-neutral-600 hover:text-black hover:bg-black/5 border border-black/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Sneakers Spotlight Anchor */}
        <div id="sneakers" className="pt-2" />

        {/* Product Grid with Dimensional Escaping Visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 md:gap-x-10 pt-8">
          {filteredProducts.map((product) => {
            const activeColorIdx = selectedColorways[product.id] || 0;
            const currentImg = product.images ? product.images[activeColorIdx] || product.image : product.image;

            return (
              <div
                key={product.id}
                className="relative pt-16 flex flex-col justify-end group select-none"
              >
                {/* The Card Pedestal Background (#ECEAE5, rounded-[28px]) */}
                <div className="relative bg-[#ECEAE5] rounded-[28px] p-6 md:p-8 flex flex-col justify-between transition-all duration-400 group-hover:bg-[#E8E6E0] border border-black/[0.04] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)]">
                  
                  {/* Product Visual Container (overflow: visible - breaks 60-80px outside top edge) */}
                  <div
                    className="relative w-full h-64 sm:h-72 -mt-20 md:-mt-24 mb-4 flex items-center justify-center cursor-pointer overflow-visible"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    {/* Studio Floor Contact Shadow */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[100%] bg-black/10 blur-lg pointer-events-none transition-transform duration-400 group-hover:scale-110" />

                    {/* Overflowing Product Image */}
                    <img
                      src={currentImg}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out transform group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:rotate-1"
                    />
                  </div>

                  {/* Swatches (if multiple exist) */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex items-center gap-2 mb-4">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedColorways((prev) => ({ ...prev, [product.id]: idx }));
                          }}
                          className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                            activeColorIdx === idx
                              ? 'border-[#B51222] scale-125 ring-2 ring-[#B51222]/20'
                              : 'border-black/20 hover:border-black'
                          }`}
                          style={{
                            backgroundColor: idx === 0 ? '#FFFFFF' : idx === 1 ? '#1A1A1A' : '#B51222',
                          }}
                          title={`Colorway ${idx + 1}`}
                        />
                      ))}
                      <span className="text-[10px] font-mono text-neutral-400 ml-1">
                        {product.images.length} COLORS
                      </span>
                    </div>
                  )}

                  {/* Product Information */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="font-audiowide text-base md:text-lg uppercase tracking-wide text-[#111111]">
                        {product.name}
                      </h3>
                      <p className="text-xs font-mono text-neutral-500 uppercase mt-1">
                        {product.colorway}
                      </p>
                    </div>
                    <span className="text-sm md:text-base font-mono font-bold text-[#111111]">
                      ${product.price}
                    </span>
                  </div>

                  {/* Minimal CTA Action */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                        addedId === product.id
                          ? 'bg-[#B51222] text-white shadow-md'
                          : 'bg-[#111111] text-white hover:bg-[#B51222]'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>ACQUIRE</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="p-3 rounded-xl bg-white/70 hover:bg-white text-neutral-600 hover:text-black border border-black/5 transition-colors"
                      title="Inspect piece"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jacket Section Anchor */}
        <div id="jackets" className="pt-12" />
      </div>
    </section>
  );
};
