'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/product.service';

export default function AdminModerationPage() {
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadPending = async () => {
    setLoading(true);
    const res = await productService.getPendingModerationProducts();
    if (res.data) setPendingProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleAction = async (productId: string, action: 'approved' | 'rejected') => {
    const res = await productService.moderateProduct(productId, action, 'Curated and verified by Kalakriti admin');
    if (res.data) {
      setMessage(`Product successfully ${action}!`);
      loadPending();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] p-8 max-w-6xl mx-auto">
      <div className="mb-8 pb-4 border-b border-stone-200">
        <span className="text-xs font-semibold uppercase text-stone-500">Admin Control Center</span>
        <h1 className="text-2xl font-serif font-bold text-stone-900 mt-1">Product Moderation Queue</h1>
        <p className="text-xs text-stone-600">Review artisan submissions, verify craft authenticity, and issue provenance certificates.</p>
      </div>

      {message && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-stone-500 text-sm">Loading moderation queue...</p>
      ) : pendingProducts.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center">
          <h3 className="font-semibold text-stone-800 mb-1">Queue is Clear</h3>
          <p className="text-xs text-stone-500">All submitted crafts have been moderated.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingProducts.map((p) => (
            <div key={p.id} className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
              <img
                src={p.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80'}
                alt={p.title}
                className="w-32 h-32 rounded-lg object-cover border border-stone-200"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Pending Review
                  </span>
                  <span className="text-xs text-stone-500">AI Confidence: {(p.ai_confidence_score * 100).toFixed(0)}%</span>
                </div>

                <h3 className="font-bold text-stone-900 text-base">{p.title}</h3>
                <p className="text-xs text-stone-600 line-clamp-2">{p.description_en}</p>

                <div className="flex flex-wrap gap-4 text-xs text-stone-500 pt-2">
                  <span>Base: ₹{p.base_price}</span>
                  <span>Artisan Share: ₹{p.artisan_share}</span>
                  <span>Total Patron Price: ₹{p.total_price}</span>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 w-full md:w-auto">
                <button
                  onClick={() => handleAction(p.id, 'approved')}
                  className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition"
                >
                  ✓ Approve & Certify
                </button>
                <button
                  onClick={() => handleAction(p.id, 'rejected')}
                  className="flex-1 px-4 py-2 bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold hover:bg-red-100 hover:text-red-700 transition"
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
