export interface PriceBreakdownProps {
  basePrice: number;
  artisanShare: number;
  platformFee: number;
  deliveryFee: number;
  totalPrice: number;
}

export function ProductPriceBreakdown({
  basePrice,
  artisanShare,
  platformFee,
  deliveryFee,
  totalPrice,
}: PriceBreakdownProps) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 sm:p-4 text-xs space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-stone-200">
        <span className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
          🌱 Transparent Price Composition
        </span>
        <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          85% to Artisan
        </span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-stone-600">
        <span>Artisan Share (Direct Net Earning):</span>
        <span className="font-semibold text-stone-900">₹{artisanShare.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-stone-600">
        <span>Raw Material & Crafting Base:</span>
        <span>₹{basePrice.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-stone-600">
        <span>Kalakriti Platform & GI Verification:</span>
        <span>₹{platformFee.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-stone-600">
        <span>Insured Fragile Craft Transit:</span>
        <span>₹{deliveryFee.toLocaleString('en-IN')}</span>
      </div>

      <div className="pt-2 border-t border-stone-200 flex flex-wrap justify-between items-center gap-1 text-sm font-bold text-stone-900">
        <span>Final Patron Price:</span>
        <span className="text-base text-[#c55337]">₹{totalPrice.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

