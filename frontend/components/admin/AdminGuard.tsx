'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { DashboardSkeleton } from '@/components/ui/Skeleton';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
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
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#F7F2E7]">
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-3xl p-8 sm:p-10 shadow-sm max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 bg-[#8C3826]/10 text-[#8C3826] rounded-full flex items-center justify-center text-3xl mx-auto border border-[#8C3826]/20">
            🛡️
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C3826] bg-[#8C3826]/10 px-3 py-1 rounded-full border border-[#8C3826]/20">
              Access Restricted
            </span>
            <h2 className="text-xl font-serif font-bold text-[#1C1917] mt-3 mb-1">
              Curator Privileges Required
            </h2>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              This operational section is restricted to Kalakriti Master Curators and platform administrators.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/auth/login"
              className="w-full py-3 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition shadow-sm"
            >
              Sign In as Administrator
            </Link>
            <Link
              href="/shop"
              className="w-full py-3 bg-[#EFE7DA] border border-[#E3DACB] text-[#1C1917] hover:bg-[#E3DACB] rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition"
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

export { AdminGuard };

