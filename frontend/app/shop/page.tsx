import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';

async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products?status=published`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase text-orange-800">Curated Marketplace</span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">Authentic Indian Handicrafts</h1>
        <p className="text-sm text-stone-600">Direct from verified master artisans across India with digital authenticity certificates.</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center">
          <p className="text-stone-600 mb-4">No published crafts found yet.</p>
          <Link href="/artisan/products/new" className="px-4 py-2 bg-[#c55337] text-white rounded-lg text-xs font-semibold">
            + List First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col"
            >
              <div className="aspect-square bg-stone-100 relative overflow-hidden">
                <img
                  src={p.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80'}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full text-stone-800">
                  GI Certified
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm group-hover:text-[#c55337] transition line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">{p.artisan?.display_name || 'Master Artisan'}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-900">₹{p.total_price?.toLocaleString('en-IN')}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">85% to Artisan</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
