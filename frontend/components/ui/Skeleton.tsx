import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-stone-200/80 rounded-md ${className}`}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="aspect-square bg-stone-200/70 animate-pulse relative" />
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-10 px-4 max-w-6xl mx-auto animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-stone-200 rounded-2xl" />
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="h-8 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-6 w-1/2 pt-2" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function TraditionCardSkeleton() {
  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between animate-pulse">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
          <Skeleton className="h-3.5 w-4/6" />
        </div>
      </div>
      <div className="pt-4 border-t border-stone-100">
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-stone-100 animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === 0 ? 'w-1/3' : 'flex-1'}`} />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8f5] p-6 max-w-6xl mx-auto space-y-8 animate-pulse">
      <div className="flex justify-between items-center pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm space-y-4">
        <Skeleton className="h-5 w-44" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
