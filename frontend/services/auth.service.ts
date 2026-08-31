import { apiClient } from './api-client';

export const authService = {
  async register(data: { email: string; password: string; full_name: string; phone?: string; role?: string }) {
    return apiClient<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: { email: string; password: string }) {
    return apiClient<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getProfile() {
    return apiClient<any>('/users/me');
  }
};
