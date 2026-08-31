export type UserRole = 'customer' | 'artisan' | 'admin';

export interface User {
  id: string;
  email: string;
  phone?: string;
  full_name: string;
  roles: UserRole[];
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface AuthSession {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
