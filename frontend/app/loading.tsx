import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#F7F2E7] py-16 px-4 sm:px-6 max-w-7xl mx-auto animate-pulse">
      <div className="mb-10 space-y-3">
        <div className="h-4 w-32 bg-[#EFE7DA] rounded" />
        <div className="h-8 w-64 bg-[#EFE7DA] rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
