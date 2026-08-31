export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  order_item_id: string;
  rating: number;
  review_text: string;
  is_verified: boolean;
  images?: string[];
  created_at: string;
}
