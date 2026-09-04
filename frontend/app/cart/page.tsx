'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CartPage() {
  const { cart, loading, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-10 px-4 max-w-[1280px] mx-auto space-y-8">
      <div className="border-b border-[#E3DACB] pb-5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C3826] font-semibold block">
          Multi-Vendor Escrow Basket
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917] mt-1 tracking-tight">
          Your Artisan Craft Basket
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554E] font-mono mt-1">
          Products from different master artisans will be split into individual suborders at checkout for direct studio tracking.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-pulse">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex justify-between pb-4 border-b border-[#E3DACB]">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-[#EFE7DA] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
          <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full rounded-lg pt-2" />
          </div>
        </div>
      ) : !cart || cart.groups.length === 0 ? (
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-12 text-center shadow-xs max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-[#F7F2E7] text-[#8C3826] rounded-full flex items-center justify-center text-2xl mx-auto border border-[#E3DACB]">
            🧺
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-[#1C1917] mb-1">Your Cart is Empty</h3>
            <p className="text-xs text-[#5C554E] max-w-sm mx-auto leading-relaxed font-mono">
              Support verified hereditary artisans and discover authentic handcrafted treasures with digital provenance certificates.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8C3826] text-white rounded-lg text-xs font-mono font-medium hover:bg-[#6E2819] transition shadow-xs"
            >
              <span>🏺</span> Browse Craft Catalog
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Artisan Groups List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.groups.map((group: any) => (
              <div key={group.artisan_id} className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E3DACB] mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#8C3826] tracking-wider">Artisan Studio</span>
                    <h3 className="font-display font-bold text-[#1C1917] text-base">{group.artisan_name}</h3>
                    <p className="text-xs text-[#5C554E] font-mono">{group.craft_tradition}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#1B432E] bg-[#E8F0EA] px-2.5 py-1 rounded border border-[#BDD4C3]">
                    Direct Suborder Split
                  </span>
                </div>

                <div className="space-y-4">
                  {group.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img
                        src={item.image_url || '/images/crafts/craft-14.jpg'}
                        alt={item.product_title}
                        className="w-16 h-16 rounded-lg object-cover border border-[#E3DACB]"
                      />
                      <div className="flex-1">
                        <h4 className="font-display font-bold text-[#1C1917] text-xs">{item.product_title}</h4>
                        <p className="text-[11px] text-[#5C554E] font-mono">Variant: {item.variant_name} • Qty: {item.quantity}</p>
                        <p className="text-[11px] text-[#1B432E] font-mono">Artisan net share: ₹{item.artisan_share * item.quantity}</p>
                      </div>
                      <span className="font-display font-bold text-sm text-[#1C1917]">₹{item.item_total.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs space-y-4 font-mono">
            <h3 className="font-bold text-[#1C1917] uppercase text-xs tracking-wider">Order Summary</h3>

            <div className="space-y-2 text-xs text-[#5C554E]">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold text-[#1C1917]">{cart.total_items}</span>
              </div>
              <div className="flex justify-between">
                <span>Artisan Studios:</span>
                <span className="font-semibold text-[#1C1917]">{cart.groups.length}</span>
              </div>
              <div className="flex justify-between text-[#1B432E]">
                <span>Total Artisan Net Share:</span>
                <span className="font-bold">₹{cart.total_artisan_share.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3DACB] flex justify-between items-center">
              <span className="font-bold text-sm text-[#1C1917]">Grand Total:</span>
              <span className="text-xl font-display font-bold text-[#8C3826]">₹{cart.grand_total.toLocaleString('en-IN')}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3.5 bg-[#8C3826] text-white text-center rounded-lg font-mono font-semibold text-xs hover:bg-[#6E2819] transition shadow-xs"
            >
              Proceed to Multi-Vendor Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
