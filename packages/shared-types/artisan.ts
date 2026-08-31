export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface Artisan {
  id: string;
  user_id: string;
  display_name: string;
  bio: string;
  region: string;
  craft_tradition: string;
  verification_status: VerificationStatus;
  years_active: number;
  avg_rating: number;
  review_count: number;
  state_id?: string;
  created_at: string;
}

export interface ArtisanDocument {
  id: string;
  artisan_id: string;
  document_type: 'aadhaar' | 'artisan_card' | 'craft_certificate' | 'bank_passbook';
  file_url: string;
  uploaded_at: string;
}
