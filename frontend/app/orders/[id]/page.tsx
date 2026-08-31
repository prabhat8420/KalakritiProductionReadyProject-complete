import { notFound } from 'next/navigation';
import { API_BASE_URL } from '@/lib/config';

async function getOrder(orderId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);
  if (!order) notFound();

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4 max-w-4xl mx-auto space-y-8">
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase text-stone-500">Order Reference</span>
            <h1 className="text-2xl font-serif font-bold text-stone-900">{order.order_number}</h1>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase">
            {order.status}
          </span>
        </div>

        {/* Suborders breakdown */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700">Artisan Suborders ({order.suborders?.length || 0})</h2>
          {order.suborders?.map((sub: any) => (
            <div key={sub.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
              <div className="flex justify-between text-xs font-semibold text-stone-800">
                <span>{sub.suborder_number}</span>
                <span className="text-emerald-700">Artisan Payout: ₹{sub.artisan_earnings}</span>
              </div>
              <p className="text-xs text-stone-500">Status: {sub.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
