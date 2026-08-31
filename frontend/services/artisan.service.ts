import { apiClient } from './api-client';

export const artisanService = {
  async registerArtisan(data: {
    display_name: string;
    bio: string;
    region: string;
    craft_tradition: string;
    years_active: number;
    workshop_address?: string;
    bank_name?: string;
    account_number?: string;
    ifsc_code?: string;
  }) {
    return apiClient<any>('/artisans/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getMyProfile() {
    return apiClient<any>('/artisans/me');
  },

  async listArtisans(status = 'verified') {
    return apiClient<any[]>(`/artisans?status=${status}`);
  },

  async getArtisanById(id: string) {
    return apiClient<any>(`/artisans/${id}`);
  }
};
