export type PaymentStatus = 'created' | 'authorized' | 'captured' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  order_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
}
