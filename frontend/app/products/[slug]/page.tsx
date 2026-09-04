import { notFound } from 'next/navigation';
import { ProductPriceBreakdown } from '@/components/products/ProductPrice';
import { AuthenticityCertificate } from '@/components/products/AuthenticityCertificate';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { ProductReviews } from '@/components/products/ProductReviews';
import { CraftImage } from '@/components/ui/CraftImage';
import { API_BASE_URL } from '@/lib/config';
import { SEED_PRODUCTS } from '@/lib/catalog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  const primaryImage =
    product.images?.[0]?.image_url ||
    '/images/crafts/craft-14.jpg';

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-10 sm:py-14 px-4 sm:px-6 max-w-[1280px] mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Gallery with Image Fallback & Ratio */}
        <div className="md:sticky md:top-24">
          <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl overflow-hidden shadow-xs">
            <CraftImage
              src={primaryImage}
              alt={product.title}
              aspectRatioClass="aspect-square"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#6E655F] px-1">
            <span>Natural Pigment Specification</span>
            <span className="text-[#8C3826] font-semibold">100% Handcrafted</span>
          </div>
        </div>

        {/* Product Story & Purchase Block */}
        <div className="space-y-6">
          <div className="space-y-2 border-b border-[#E3DACB] pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-[#8C3826]/10 text-[#8C3826] font-mono text-[10px] font-bold uppercase tracking-wider">
                {product.tradition?.name || 'Heritage Craft'}
              </span>
              <span className="font-mono text-xs text-[#6E655F]">• {product.artisan?.region || 'India'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1C1917] leading-tight tracking-tight">
              {product.title}
            </h1>

            <p className="font-mono text-xs text-[#6E655F]">
              Artisan Studio: <span className="font-semibold text-[#1C1917]">{product.artisan?.display_name || 'Master Artisan'}</span>
            </p>
          </div>

          <p className="text-sm text-[#1C1917] leading-relaxed font-normal">{product.description_en}</p>
          {product.description_hi && (
            <p className="text-xs text-[#6E655F] bg-[#FAF6EE] p-4 rounded-xl border border-[#E3DACB] italic font-serif leading-relaxed">
              "{product.description_hi}"
            </p>
          )}

          {/* Add to Basket Action */}
          <AddToCartButton
            productId={product.id}
            variantId={product.variants?.[0]?.id || product.id}
            productTitle={product.title}
            price={product.total_price || product.base_price || 2500}
          />

          {/* Transparent Price Breakdown */}
          <ProductPriceBreakdown
            basePrice={product.base_price}
            artisanShare={product.artisan_share}
            platformFee={product.platform_fee}
            deliveryFee={product.delivery_fee}
            totalPrice={product.total_price}
          />

          {/* Authenticity Certificate */}
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

      {/* Patron Reviews */}
      <div className="pt-8 border-t border-[#E3DACB]">
        <ProductReviews
          productId={product.id}
          productTitle={product.title}
        />
      </div>
    </div>
  );
}
