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
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80';

  return (
    <div className="min-h-screen bg-[#F5F0EB] py-8 sm:py-10 px-4 max-w-[1280px] mx-auto space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Gallery with Image Fallback & Ratio */}
        <div className="md:sticky md:top-24">
          <div className="bg-white border border-[#E2DAD0] rounded-xl overflow-hidden shadow-xs">
            <CraftImage
              src={primaryImage}
              alt={product.title}
              aspectRatioClass="aspect-square"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#5C5852] px-1">
            <span>Natural Pigment Specification</span>
            <span className="text-[#842A1C] font-semibold">100% Handcrafted</span>
          </div>
        </div>

        {/* Product Story & Purchase Block */}
        <div className="space-y-6">
          <div className="space-y-2 border-b border-[#E2DAD0] pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#842A1C]/10 text-[#842A1C] text-[10px] font-mono font-bold uppercase tracking-wider">
                {product.tradition?.name || 'Heritage Craft'}
              </span>
              <span className="text-xs font-mono text-[#5C5852]">• {product.artisan?.region || 'India'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#141312] leading-tight tracking-tight">
              {product.title}
            </h1>

            <p className="text-xs font-mono text-[#5C5852]">
              Artisan Studio: <span className="font-semibold text-[#141312]">{product.artisan?.display_name || 'Master Artisan'}</span>
            </p>
          </div>

          <p className="text-sm text-[#2D2B28] leading-relaxed font-normal">{product.description_en}</p>
          {product.description_hi && (
            <p className="text-xs text-[#5C5852] bg-[#FDFBF7] p-3.5 rounded-lg border border-[#E2DAD0] italic font-serif leading-relaxed">
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
      <div className="pt-8 border-t border-[#E2DAD0]">
        <ProductReviews
          productId={product.id}
          productTitle={product.title}
        />
      </div>
    </div>
  );
}
