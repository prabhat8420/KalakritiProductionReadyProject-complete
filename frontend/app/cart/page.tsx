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
    <div className="min-h-screen bg-[#faf8f5] py-10 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase text-orange-800">Multi-Vendor Cart</span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">Your Artisan Craft Basket</h1>
        <p className="text-xs text-stone-600">
          Products from different master artisans will be split into individual suborders at checkout for direct studio tracking.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-pulse">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between pb-4 border-b border-stone-100">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-stone-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full rounded-xl pt-2" />
          </div>
        </div>
      ) : !cart || cart.groups.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-orange-50 text-[#c55337] rounded-full flex items-center justify-center text-2xl mx-auto shadow-2xs">
            🧺
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">Your Cart is Empty</h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Support verified hereditary artisans and discover authentic handcrafted treasures with digital provenance certificates.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c55337] text-white rounded-xl text-xs font-bold hover:bg-[#a5402a] transition shadow-sm"
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
              <div key={group.artisan_id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#a5402a] tracking-wider">Artisan Studio</span>
                    <h3 className="font-serif font-bold text-stone-900 text-base">{group.artisan_name}</h3>
                    <p className="text-xs text-stone-500">{group.craft_tradition}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Direct Suborder Split
                  </span>
                </div>

                <div className="space-y-4">
                  {group.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img
                        src={item.image_url || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80'}
                        alt={item.product_title}
                        className="w-16 h-16 rounded-lg object-cover border border-stone-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-900 text-xs">{item.product_title}</h4>
                        <p className="text-[11px] text-stone-500">Variant: {item.variant_name} • Qty: {item.quantity}</p>
                        <p className="text-[11px] text-emerald-700">Artisan net share: ₹{item.artisan_share * item.quantity}</p>
                      </div>
                      <span className="font-bold text-sm text-stone-900">₹{item.item_total.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 uppercase text-xs tracking-wider">Order Summary</h3>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-semibold text-stone-800">{cart.total_items}</span>
              </div>
              <div className="flex justify-between">
                <span>Artisan Studios Involved:</span>
                <span className="font-semibold text-stone-800">{cart.groups.length}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Total Artisan Net Earnings:</span>
                <span className="font-bold">₹{cart.total_artisan_share.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
              <span className="font-bold text-sm text-stone-900">Grand Total:</span>
              <span className="text-xl font-bold text-[#c55337]">₹{cart.grand_total.toLocaleString('en-IN')}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3.5 bg-[#c55337] text-white text-center rounded-xl font-semibold text-sm hover:bg-[#a5402a] transition shadow-sm"
            >
              Proceed to Multi-Vendor Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
