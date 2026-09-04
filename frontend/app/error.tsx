'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F7F2E7]">
      <div className="w-16 h-16 rounded-full bg-[#8C3826]/10 text-[#8C3826] flex items-center justify-center text-3xl mx-auto mb-4 border border-[#8C3826]/20">
        ⚠️
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8C3826] font-bold">System Notice</span>
      <h2 className="text-2xl font-serif font-bold text-[#1C1917] mt-1 mb-2">Something interrupted the curatorial flow</h2>
      <p className="text-xs text-[#6E655F] mb-6 max-w-md">We encountered an issue loading this view. Please try reloading.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition shadow-sm cursor-pointer"
      >
        Retry Loading
      </button>
    </div>
  );
}
