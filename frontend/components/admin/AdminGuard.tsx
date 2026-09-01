'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { DashboardSkeleton } from '@/components/ui/Skeleton';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, checkSession } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkSession();
    const timer = setTimeout(() => {
      setChecking(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [checkSession]);

  if (checking) {
    return <DashboardSkeleton />;
  }

  const isAdmin = isAuthenticated && user?.roles?.includes('admin');

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#faf8f5]">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-full flex items-center justify-center text-3xl mx-auto shadow-2xs">
            🛡️
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full">
              Access Restricted
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900 mt-2 mb-1">
              Admin Privileges Required
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              This operational section is restricted to Kalakriti Master Curators and platform administrators.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/auth/login"
              className="w-full py-3 bg-[#c55337] text-white rounded-xl text-xs font-bold hover:bg-[#a5402a] transition shadow-sm"
            >
              Sign In as Administrator
            </Link>
            <Link
              href="/shop"
              className="w-full py-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-200 transition"
            >
              Return to Craft Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
