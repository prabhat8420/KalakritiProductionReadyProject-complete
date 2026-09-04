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
    <div className="min-h-screen bg-[#F7F2E7] py-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E3DACB]">
          <div>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C3826]">
              Order Ledger Reference
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">{order.order_number}</h1>
          </div>
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider">
            {order.status}
          </span>
        </div>

        {/* Suborders breakdown */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1C1917]">
            Artisan Studio Suborders ({order.suborders?.length || 0})
          </h2>
          {order.suborders?.map((sub: any) => (
            <div key={sub.id} className="p-5 bg-[#F7F2E7] border border-[#E3DACB] rounded-2xl space-y-2">
              <div className="flex justify-between font-mono text-xs font-semibold text-[#1C1917]">
                <span>{sub.suborder_number}</span>
                <span className="text-emerald-900 font-bold">Direct Artisan Share: ₹{sub.artisan_earnings}</span>
              </div>
              <p className="font-mono text-[11px] text-[#6E655F]">Fulfillment Status: {sub.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
