import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';
import { SEED_PRODUCTS } from '@/lib/catalog';
import { CraftImage } from '@/components/ui/CraftImage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products?status=published`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    // Fallback gracefully
  }
  return SEED_PRODUCTS;
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-8 sm:py-10 px-4 max-w-[1360px] mx-auto space-y-8">
      <div className="border-b border-[#E3DACB] pb-5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C3826] font-semibold block">
          Living Craft Archives
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1C1917] mt-1 tracking-tight">
          Authentic Indian Handicrafts
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554E] font-mono mt-1">
          Direct from verified master artisans across India with digital authenticity certificates.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-12 text-center shadow-xs max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-[#F7F2E7] text-[#8C3826] rounded-full flex items-center justify-center text-2xl mx-auto border border-[#E3DACB]">
            🏺
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-[#1C1917] mb-1">No Published Crafts Found</h3>
            <p className="text-xs text-[#5C554E] max-w-sm mx-auto leading-relaxed font-mono">
              Our master curators are currently reviewing fresh craft submissions from hereditary artisan studios.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/traditions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8C3826] text-white rounded-lg text-xs font-mono font-medium hover:bg-[#6E2819] transition shadow-xs"
            >
              <span>📜</span> Explore Heritage Traditions
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl overflow-hidden shadow-xs hover:border-[#1C1917] transition group flex flex-col"
            >
              <div className="relative overflow-hidden aspect-square bg-[#EFE7DA]">
                <CraftImage
                  src={p.images?.[0]?.image_url || '/images/crafts/craft-14.jpg'}
                  alt={p.title}
                  aspectRatioClass="aspect-square"
                  className="w-full h-full object-cover group-hover:scale-104 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1C1917]/90 backdrop-blur-sm text-[10px] font-mono font-bold px-2 py-0.5 rounded text-[#F7F2E7]">
                  GI Certified
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#8C8379] uppercase block">
                    {p.artisan?.display_name || 'Master Artisan'}
                  </span>
                  <h3 className="font-display font-bold text-[#1C1917] text-sm group-hover:text-[#8C3826] transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[#E3DACB] flex items-center justify-between">
                  <span className="text-sm font-bold font-display text-[#1C1917]">
                    ₹{p.total_price?.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono text-[#8C3826] bg-[#8C3826]/10 px-1.5 py-0.5 rounded font-bold">
                    85% to Studio
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
