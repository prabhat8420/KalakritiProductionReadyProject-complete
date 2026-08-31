import { apiClient } from './api-client';

export const productService = {
  async aiCatalogImage(imageUrl: string) {
    return apiClient<any>('/products/ai-catalog', {
      method: 'POST',
      body: JSON.stringify({ image_url: imageUrl }),
    });
  },

  async createProduct(data: any) {
    return apiClient<any>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async listProducts(params: { category_id?: string; tradition_id?: string; status?: string } = {}) {
    const query = new URLSearchParams(params as any).toString();
    return apiClient<any[]>(`/products?${query}`);
  },

  async getProductBySlug(slug: string) {
    return apiClient<any>(`/products/by-slug/${slug}`);
  },

  async getPendingModerationProducts() {
    return apiClient<any[]>('/moderation/products');
  },

  async moderateProduct(productId: string, action: 'approved' | 'rejected', notes?: string) {
    return apiClient<any>(`/moderation/products/${productId}/action`, {
      method: 'POST',
      body: JSON.stringify({ action, notes }),
    });
  }
};
