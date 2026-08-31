import { create } from 'zustand';

export interface UserState {
  id: string;
  email: string;
  full_name: string;
  roles: string[];
  artisan_id?: string | null;
}

interface AuthStore {
  user: UserState | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserState, token: string) => void;
  logout: () => void;
  checkSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kalakriti_token', token);
      localStorage.setItem('kalakriti_user', JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kalakriti_token');
      localStorage.removeItem('kalakriti_user');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
  checkSession: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('kalakriti_token');
      const userStr = localStorage.getItem('kalakriti_user');
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ user, token, isAuthenticated: true });
        } catch (e) {
          localStorage.removeItem('kalakriti_token');
          localStorage.removeItem('kalakriti_user');
        }
      }
    }
  }
}));
