'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart.store';
import { orderService } from '@/services/order.service';
import { apiClient } from '@/services/api-client';
import { useToast } from '@/components/ui/Toast';

export default function CheckoutPage() {
  const router = useRouter();
  const toast = useToast();
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
    setLoading(true);
    setError('');

    let addrId = selectedAddressId;
    if (!addrId) {
      addrId = (await handleCreateAddress()) || '';
    }

    if (!addrId) {
      setError('Please provide a valid shipping address.');
      toast.error('Please provide a valid shipping address.', 'Address Required');
      setLoading(false);
      return;
    }

    // 1. Create Order & Escrow
    const orderRes = await orderService.createOrder(addrId);
    if (!orderRes.data) {
      setError(orderRes.error || 'Failed to initialize order.');
      toast.error(orderRes.error || 'Failed to initialize order.', 'Checkout Error');
      setLoading(false);
      return;
    }

    const orderId = orderRes.data.id;
    const orderNum = orderRes.data.order_number;

    // 2. Simulate Razorpay Payment & Verify
    const mockPaymentId = `pay_sim_${Date.now()}`;
    const mockSignature = `sig_sim_${Date.now()}`;

    const verifyRes = await orderService.verifyPayment({
      order_id: orderId,
      razorpay_order_id: orderRes.data.payment?.razorpay_order_id || 'order_sim_123',
      razorpay_payment_id: mockPaymentId,
      razorpay_signature: mockSignature,
    });

    setLoading(false);

    if (verifyRes.data) {
      await fetchCart(); // Clear cart
      toast.success(
        `Order ${orderNum} placed successfully! Escrow secured for master artisan studios.`,
        'Payment Confirmed'
      );
      router.push(`/orders/${orderId}`);
    } else {
      setError(verifyRes.error || 'Payment verification failed.');
      toast.error(verifyRes.error || 'Payment verification failed.', 'Payment Error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-10 px-3.5 sm:px-4 max-w-[1280px] mx-auto space-y-8">
      <div className="border-b border-[#E3DACB] pb-5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C3826] font-semibold block">
          Secure Split Checkout
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917] mt-1 tracking-tight">
          Multi-Vendor Fulfillment & Escrow
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554E] font-mono mt-1">
          Direct artisan payments secured by Razorpay encrypted escrow.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-[#F7EDE9] border border-[#E8BFB6] text-[#7A2617] rounded-xl text-xs font-mono">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Shipping Address */}
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-display font-bold uppercase text-[#1C1917]">
            1. Delivery Address
          </h3>

          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase text-[#5C554E] mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-xs font-mono text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase text-[#5C554E] mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-xs font-mono text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase text-[#5C554E] mb-1">
              Street Address
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-xs font-mono text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-[#5C554E] mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-xs font-mono text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-[#5C554E] mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-xs font-mono text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-[#5C554E] mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-xs font-mono text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826]"
              />
            </div>
          </div>
        </div>

        {/* Payment & Split Preview */}
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 sm:p-6 shadow-xs space-y-4 font-mono">
          <h3 className="text-sm font-display font-bold uppercase text-[#1C1917]">
            2. Payment & Suborder Splitting
          </h3>

          <div className="p-4 bg-[#F7EDE9] border border-[#E8BFB6] rounded-xl text-xs text-[#7A2617] space-y-1">
            <span className="font-bold block">⚖️ Automated Suborder Partitioning</span>
            <p className="leading-relaxed">
              Your payment of ₹{cart?.grand_total || 0} will be securely processed and partitioned into {cart?.groups?.length || 1} independent artisan suborders with 85% net escrow guarantee.
            </p>
          </div>

          <div className="pt-2 border-t border-[#E3DACB]">
            <button
              type="button"
              disabled={loading}
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#8C3826] text-white rounded-lg font-mono font-bold text-xs hover:bg-[#6E2819] transition disabled:opacity-50 shadow-xs"
            >
              {loading ? 'Processing Split Checkout...' : `Pay ₹${cart?.grand_total || 0} with Razorpay`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
