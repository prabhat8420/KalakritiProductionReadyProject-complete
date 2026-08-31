export interface Notification {
  id: string;
  user_id: string;
  type: 'order_update' | 'artisan_alert' | 'payout' | 'repair_update' | 'system';
  message: string;
  is_read: boolean;
  created_at: string;
}
