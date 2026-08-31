'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart.store';
import { orderService } from '@/services/order.service';
import { apiClient } from '@/services/api-client';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, fetchCart } = useCartStore();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // New address form state
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('+919811122233');
  const [streetAddress, setStreetAddress] = useState('42 Heritage Residency, Amer Road');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('302001');

  useEffect(() => {
    fetchCart();
    apiClient<any[]>('/addresses').then((res) => {
      if (res.data && res.data.length > 0) {
        setAddresses(res.data);
        setSelectedAddressId(res.data[0].id);
      }
    });
  }, [fetchCart]);

  const handleCreateAddress = async () => {
    const res = await apiClient<any>('/addresses', {
      method: 'POST',
      body: JSON.stringify({
        label: 'Home',
        full_name: fullName,
        phone,
        street_address: streetAddress,
        city,
        state,
        pincode,
        is_default: true,
      })
    });
    if (res.data) {
      setAddresses([res.data, ...addresses]);
      setSelectedAddressId(res.data.id);
      return res.data.id;
    }
    return null;
  };

  const handleCheckout = async () => {
    setError('');
    setLoading(true);

    let addressId = selectedAddressId;
    if (!addressId) {
      addressId = await handleCreateAddress();
    }

    if (!addressId) {
      setError('Please provide a delivery address');
      setLoading(false);
      return;
    }

    const orderRes = await orderService.checkout(addressId);
    if (orderRes.error) {
      setError(orderRes.error);
      setLoading(false);
      return;
    }

    const order = orderRes.data;

    // Simulate Razorpay payment confirmation
    const verifyRes = await orderService.verifyPayment({
      order_id: order.id,
      razorpay_order_id: order.razorpay_order_id,
      razorpay_payment_id: `pay_mock_${Date.now()}`,
      razorpay_signature: 'valid_mock_signature_for_dev'
    });

    setLoading(false);

    if (verifyRes.data) {
      router.push(`/orders/${order.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 px-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase text-orange-800">Secure Split Checkout</span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">Multi-Vendor Fulfillment</h1>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Delivery Address */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase text-stone-800">1. Delivery Address</h3>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Recipient Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Street Address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Payment & Split Preview */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase text-stone-800">2. Payment & Suborder Splitting</h3>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-950 space-y-1">
            <span className="font-bold block">✨ Automated Suborder Partitioning</span>
            <p>
              Your payment of ₹{cart?.grand_total || 0} will be securely processed and partitioned into {cart?.groups?.length || 1} independent artisan suborders.
            </p>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <button
              type="button"
              disabled={loading}
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#c55337] text-white rounded-xl font-bold text-sm hover:bg-[#a5402a] transition disabled:opacity-50 shadow-sm"
            >
              {loading ? 'Processing Split Checkout...' : `Pay ₹${cart?.grand_total || 0} with Razorpay`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
