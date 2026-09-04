'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/product.service';
import { Skeleton } from '@/components/ui/Skeleton';
import { AdminGuard } from '@/components/admin/AdminGuard';

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
    <AdminGuard>
      <div className="min-h-screen bg-[#F7F2E7] p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        <div className="pb-4 border-b border-[#E3DACB]">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C3826]">
            Curatorial Oversight
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">Product Provenance Moderation</h1>
          <p className="text-xs text-[#6E655F] mt-1">Review artisan submissions, verify natural materials, and issue immutable SHA-256 Craft DNA certificates.</p>
        </div>

        {message && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 font-mono text-xs rounded-lg">
            {message}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 bg-[#EFE7DA] rounded-lg animate-pulse" />
                <div className="flex-1 space-y-3 w-full">
                  <Skeleton className="h-4 w-36 bg-[#EFE7DA]" />
                  <Skeleton className="h-6 w-3/4 bg-[#EFE7DA]" />
                  <Skeleton className="h-3.5 w-full bg-[#EFE7DA]" />
                  <Skeleton className="h-3.5 w-2/3 bg-[#EFE7DA]" />
                </div>
                <div className="w-full md:w-36 space-y-2">
                  <Skeleton className="h-9 w-full rounded-lg bg-[#EFE7DA]" />
                  <Skeleton className="h-9 w-full rounded-lg bg-[#EFE7DA]" />
                </div>
              </div>
            ))}
          </div>
        ) : pendingProducts.length === 0 ? (
          <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-12 text-center">
            <h3 className="font-serif font-bold text-[#1C1917] text-lg mb-1">Queue is Clear</h3>
            <p className="font-mono text-xs text-[#6E655F]">All submitted crafts have been authenticated and issued Craft DNA certificates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingProducts.map((p) => (
              <div key={p.id} className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={p.images?.[0]?.image_url || '/images/crafts/craft-14.jpg'}
                  alt={p.title}
                  className="w-32 h-32 rounded-lg object-cover border border-[#E3DACB]"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
                      Pending Curatorial Review
                    </span>
                    <span className="font-mono text-xs text-[#6E655F]">AI Confidence: {(p.ai_confidence_score * 100).toFixed(0)}%</span>
                  </div>

                  <h3 className="font-serif font-bold text-[#1C1917] text-lg">{p.title}</h3>
                  <p className="text-xs text-[#6E655F] line-clamp-2 leading-relaxed">{p.description_en}</p>

                  <div className="flex flex-wrap gap-4 font-mono text-xs text-[#6E655F] pt-2">
                    <span>Base: ₹{p.base_price}</span>
                    <span className="text-[#8C3826] font-semibold">Artisan Share (85%): ₹{p.artisan_share}</span>
                    <span>Total Patron Price: ₹{p.total_price}</span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleAction(p.id, 'approved')}
                    className="flex-1 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    ✓ Certify & Issue DNA
                  </button>
                  <button
                    onClick={() => handleAction(p.id, 'rejected')}
                    className="flex-1 px-4 py-2.5 bg-[#EFE7DA] border border-[#E3DACB] text-[#6E655F] hover:text-red-700 hover:border-red-300 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
