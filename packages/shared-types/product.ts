export type ProductStatus = 'draft' | 'pending_review' | 'published' | 'rejected';

export interface PriceBreakdown {
  base_price: number;
  artisan_share: number;
  platform_fee: number;
  delivery_fee: number;
  tax: number;
  total_price: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  price_delta: number;
  stock_quantity: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
}

export interface ProductCertification {
  id: string;
  product_id: string;
  certificate_id: string;
  certificate_hash: string;
  qr_code_url: string;
  craft_tradition: string;
  artisan_name: string;
  origin_region: string;
  issued_at: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  artisan?: {
    id: string;
    display_name: string;
    region: string;
    avg_rating: number;
    verification_status: string;
  };
  title: string;
  description_en: string;
  description_hi?: string;
  category_id: string;
  subcategory_id?: string;
  tradition_id: string;
  pricing: PriceBreakdown;
  ai_confidence_score?: number;
  status: ProductStatus;
  images: ProductImage[];
  variants: ProductVariant[];
  certification?: ProductCertification;
  created_at: string;
}
