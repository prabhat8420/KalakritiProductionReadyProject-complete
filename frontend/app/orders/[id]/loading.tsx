import { Skeleton } from '@/components/ui/Skeleton';

export default function OrderDetailLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4 max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-6 border-b border-stone-200">
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-7 w-48" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
