import { apiClient } from './api-client';

export const orderService = {
  async checkout(addressId: string) {
    return apiClient<any>('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify({ address_id: addressId }),
    });
  },

  async verifyPayment(paymentData: {
    order_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    return apiClient<any>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  async listMyOrders() {
    return apiClient<any[]>('/orders');
  },

  async getOrderById(orderId: string) {
    return apiClient<any>(`/orders/${orderId}`);
  }
};
