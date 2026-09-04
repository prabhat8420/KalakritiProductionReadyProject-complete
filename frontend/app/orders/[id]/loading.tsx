import { Skeleton } from '@/components/ui/Skeleton';

export default function OrderDetailLoading() {
  return (
    <div className="min-h-screen bg-[#F7F2E7] py-16 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-6 border-b border-[#E3DACB]">
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24 bg-[#EFE7DA]" />
            <Skeleton className="h-7 w-48 bg-[#EFE7DA]" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full bg-[#EFE7DA]" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-40 bg-[#EFE7DA]" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-5 bg-[#F7F2E7] border border-[#E3DACB] rounded-2xl space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 bg-[#EFE7DA]" />
                <Skeleton className="h-4 w-28 bg-[#EFE7DA]" />
              </div>
              <Skeleton className="h-3 w-20 bg-[#EFE7DA]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
