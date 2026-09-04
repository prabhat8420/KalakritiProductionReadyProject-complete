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
    <div className="bg-[#FFFFFF] border border-[#E2DAD0] rounded-xl p-4 text-xs space-y-2.5 shadow-xs font-mono">
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2.5 border-b border-[#E2DAD0]">
        <span className="font-bold text-[#141312] uppercase tracking-wider text-[11px] flex items-center gap-1">
          <span>⚖️</span>
          <span>Transparent Price Composition</span>
        </span>
        <span className="text-[#842A1C] font-bold text-[10px] bg-[#842A1C]/10 px-2 py-0.5 rounded">
          85% to Master Studio
        </span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-[#5C5852]">
        <span>Artisan Share (Direct Net Escrow):</span>
        <span className="font-bold text-[#141312]">₹{artisanShare.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-[#5C5852]">
        <span>Raw Material & Crafting Base:</span>
        <span>₹{basePrice.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-[#5C5852]">
        <span>Kalakriti GI Verification & Platform:</span>
        <span>₹{platformFee.toLocaleString('en-IN')}</span>
      </div>

      <div className="flex flex-wrap justify-between items-baseline gap-1 text-[#5C5852]">
        <span>Insured Fragile Transit & Insurance:</span>
        <span>₹{deliveryFee.toLocaleString('en-IN')}</span>
      </div>

      <div className="pt-2.5 border-t border-[#E2DAD0] flex flex-wrap justify-between items-center gap-1 text-sm font-bold text-[#141312]">
        <span>Final Patron Price:</span>
        <span className="text-base text-[#842A1C] font-display">₹{totalPrice.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}
