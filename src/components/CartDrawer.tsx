import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 300;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F6] text-[#111111] h-full shadow-2xl flex flex-col z-10 animate-slideLeft border-l border-black/10">
        {/* Header */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-widest uppercase font-display">
              Shopping Bag
            </span>
            <span className="text-xs font-mono px-2 py-0.5 bg-[#B51222]/10 text-[#B51222] font-semibold rounded-full">
              {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            className="p-2 hover:text-[#B51222] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-3 bg-[#F2F0EB] border-b border-black/5">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 mb-1.5">
            <Truck className="w-3.5 h-3.5 text-[#B51222]" />
            {remainingForFreeShipping > 0 ? (
              <span>Add <strong className="text-black">${remainingForFreeShipping}</strong> more for complimentary worldwide shipping</span>
            ) : (
              <span className="text-[#B51222] font-bold">Complimentary Worldwide Shipping Unlocked</span>
            )}
          </div>
          <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#B51222] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-black/10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <img src="/astix-icon.png" alt="ASTIX" className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-sm font-semibold tracking-wider uppercase text-neutral-500">Your bag is empty</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Explore our debut collection of technical footwear and outerwear.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 px-6 py-2.5 bg-[#111111] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#B51222] transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4 items-center">
                <div className="w-20 h-20 bg-[#F2F0EB] rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm tracking-tight truncate">{item.product.name}</h4>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    {item.product.colorway} &bull; {item.size}
                  </p>
                  <p className="text-xs font-mono font-bold mt-1 text-[#111111]">
                    ${item.product.price}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-black/15 rounded text-xs font-mono">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-black/10"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-black/10"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-neutral-400 hover:text-[#B51222] transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-black/10 bg-[#F2F0EB]/60">
            <div className="space-y-2 mb-4 text-xs font-mono">
              <div className="flex justify-between text-neutral-500">
                <span>SUBTOTAL</span>
                <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>ESTIMATED TAX & DUTIES</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-black/10">
                <span>TOTAL</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Order confirmed for ASTIX archive! Total: $${subtotal.toFixed(2)}. Proceeding to secure gateway...`);
              }}
              className="w-full py-4 bg-[#111111] hover:bg-[#B51222] text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-3 transition-colors duration-300 rounded"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-mono text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>SECURE ENCRYPTED TRANSACTION &bull; 30-DAY ATELIER RETURNS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
