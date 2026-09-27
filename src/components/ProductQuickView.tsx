import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, RotateCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0];
  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.image];
  const currentImg = images[selectedImageIdx] || quickViewProduct.image;

  const handleAdd = () => {
    addToCart(quickViewProduct, currentSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] text-[#111111] rounded-[32px] overflow-hidden shadow-2xl border border-black/10 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-500 hover:text-black shadow transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Inspection Area */}
        <div className="md:w-1/2 bg-[#F2F0EB] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B51222]" />
            <span className="text-[11px] font-mono tracking-widest text-[#B51222] uppercase font-bold">
              {quickViewProduct.category} &bull; ATELIER INSPECTION
            </span>
          </div>

          {/* Main Visual */}
          <div className="relative w-full h-64 md:h-80 flex items-center justify-center my-6 group">
            <div className="absolute bottom-2 w-3/4 h-8 rounded-[100%] bg-black/15 blur-lg" />
            <img
              src={currentImg}
              alt={quickViewProduct.name}
              className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Colorway / Angle thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIdx(i)}
                  className={`w-14 h-14 rounded-xl p-1 bg-white border transition-all duration-200 ${
                    selectedImageIdx === i
                      ? 'border-[#B51222] ring-2 ring-[#B51222]/20 scale-105'
                      : 'border-black/10 hover:border-black/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Angle" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase Form */}
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase font-display tracking-tight text-[#111111]">
                {quickViewProduct.name}
              </h2>
              <span className="text-xl font-bold font-mono text-[#111111]">
                ${quickViewProduct.price}
              </span>
            </div>

            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-6">
              {quickViewProduct.colorway}
            </p>

            <p className="text-sm text-neutral-600 font-sans leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {/* Technical Specifications */}
            <div className="mb-6 space-y-2 pt-4 border-t border-black/10">
              <span className="text-[11px] font-mono tracking-widest text-[#B51222] uppercase font-bold block mb-2">
                ARCHITECTURAL SPECIFICATIONS
              </span>
              {quickViewProduct.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-600 font-mono">
                  <span className="w-1 h-1 rounded-full bg-[#111111]" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Sizing Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2.5 text-xs font-mono">
                <span className="text-neutral-500 uppercase">SELECT SIZE</span>
                <span className="text-[#B51222] cursor-pointer hover:underline">SIZE GUIDE</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-mono rounded-lg border transition-all duration-200 ${
                      currentSize === size
                        ? 'bg-[#111111] text-white border-[#111111] font-bold'
                        : 'bg-white text-neutral-700 border-black/10 hover:border-black/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-black/10">
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 ${
                added
                  ? 'bg-[#B51222] text-white'
                  : 'bg-[#111111] hover:bg-[#B51222] text-white shadow-lg'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>CONFIRMED IN BAG</span>
                </>
              ) : (
                <>
                  <span>ACQUIRE PIECE &bull; ${quickViewProduct.price}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>COMPLIMENTARY WORLDWIDE DELIVERY &bull; INSURED ATELIER SHIPMENT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
