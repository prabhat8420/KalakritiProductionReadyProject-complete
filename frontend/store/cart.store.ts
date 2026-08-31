import { create } from 'zustand';
import { apiClient } from '@/services/api-client';

interface CartState {
  cart: any | null;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productVariantId: string, quantity?: number) => Promise<boolean>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,
  fetchCart: async () => {
    set({ loading: true });
    const res = await apiClient<any>('/cart');
    if (res.data) {
      set({ cart: res.data, loading: false });
    } else {
      set({ loading: false });
    }
  },
  addItem: async (productVariantId: string, quantity = 1) => {
    const res = await apiClient<any>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ product_variant_id: productVariantId, quantity })
    });
    if (res.data) {
      const updated = await apiClient<any>('/cart');
      if (updated.data) set({ cart: updated.data });
      return true;
    }
    return false;
  }
}));
