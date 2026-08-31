import { notFound } from 'next/navigation';
import { ProductPriceBreakdown } from '@/components/products/ProductPrice';
import { AuthenticityCertificate } from '@/components/products/AuthenticityCertificate';
import { API_BASE_URL } from '@/lib/config';
import { SEED_PRODUCTS } from '@/lib/catalog';

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/by-slug/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.title) return data;
    }
  } catch (err) {
    // Fallback
  }
  return SEED_PRODUCTS.find((p) => p.slug === slug) || null;
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Story & Purchase Block */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase">
                {product.tradition?.name || 'Heritage Craft'}
              </span>
              <span className="text-xs text-stone-500">• {product.artisan?.region || 'India'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
              {product.title}
            </h1>
            <p className="text-xs text-stone-600 mt-2">
              Artisan Studio: <span className="font-semibold text-stone-800">{product.artisan?.display_name || 'Master Artisan'}</span>
            </p>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">{product.description_en}</p>
          {product.description_hi && (
            <p className="text-xs text-stone-600 bg-stone-100 p-3 rounded-lg border border-stone-200 italic font-serif">
              "{product.description_hi}"
            </p>
          )}

          {/* Transparent Price Breakdown */}
          <ProductPriceBreakdown
            basePrice={product.base_price}
            artisanShare={product.artisan_share}
            platformFee={product.platform_fee}
            deliveryFee={product.delivery_fee}
            totalPrice={product.total_price}
          />

          {/* Authenticity Certificate Modal/Trigger */}
          {product.certification && (
            <AuthenticityCertificate
              certificateId={product.certification.certificate_id}
              certificateHash={product.certification.certificate_hash}
              qrCodeUrl={product.certification.qr_code_url}
              craftTradition={product.certification.craft_tradition}
              artisanName={product.certification.artisan_name}
              originRegion={product.certification.origin_region}
              rawMaterials={product.certification.raw_materials}
              badge={product.certification.heritage_registry_badge}
            />
          )}
        </div>
      </div>
    </div>
  );
}
