'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cart.store';
import { useToast } from '@/components/ui/Toast';
import { apiClient } from '@/services/api-client';

interface AddToCartButtonProps {
  variantId?: string;
  productId: string;
  productTitle: string;
  price: number;
}

export function AddToCartButton({ variantId, productId, productTitle, price }: AddToCartButtonProps) {
  const { fetchCart } = useCartStore();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    const targetVariantId = variantId || productId;

    const res = await apiClient<any>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({
        product_variant_id: targetVariantId,
        quantity: 1
      })
    });

    setLoading(false);

    if (res.error) {
      toast.error(res.error, 'Could Not Add to Basket');
      return;
    }

    await fetchCart();
    toast.success(`"${productTitle}" added to your artisan basket!`, 'Added to Basket');
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleAddToCart}
      className="w-full py-4 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-xl font-mono text-xs uppercase tracking-widest font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 duration-200"
    >
      {loading ? (
        <>
          <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Adding to Basket...
        </>
      ) : (
        <>
          <span>🧺</span> Acquire Specimen • ₹{price.toLocaleString('en-IN')}
        </>
      )}
    </button>
  );
}
