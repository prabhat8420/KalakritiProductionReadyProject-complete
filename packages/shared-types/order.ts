export type OrderStatus = 'pending' | 'paid' | 'processing' | 'partially_shipped' | 'completed' | 'cancelled';
export type SubOrderStatus = 'placed' | 'confirmed' | 'in_crafting' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderItemPriceBreakdown {
  base_price: number;
  artisan_share: number;
  platform_fee: number;
  delivery_fee: number;
}

export interface OrderItem {
  id: string;
  suborder_id: string;
  product_variant_id: string;
  product_title: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  price_breakdown: OrderItemPriceBreakdown;
}

export interface SubOrder {
  id: string;
  order_id: string;
  artisan_id: string;
  artisan_name: string;
  subtotal: number;
  status: SubOrderStatus;
  items: OrderItem[];
  tracking_number?: string;
  carrier?: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: OrderStatus;
  suborders: SubOrder[];
  razorpay_order_id?: string;
  created_at: string;
}
