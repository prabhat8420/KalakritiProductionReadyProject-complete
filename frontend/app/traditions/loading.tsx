import { TraditionCardSkeleton } from '@/components/ui/Skeleton';

export default function TraditionsLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-2 animate-pulse">
        <div className="h-4 w-36 bg-stone-200 rounded mx-auto" />
        <div className="h-9 w-80 bg-stone-200 rounded mx-auto" />
        <div className="h-4 w-96 bg-stone-200 rounded mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <TraditionCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
