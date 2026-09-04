'use client';

import Link from 'next/link';
import { AdminGuard } from '@/components/admin/AdminGuard';

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F7F2E7] py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C3826]">
            Operational Command
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-1">Admin Governance & Provenance</h1>
          <p className="text-xs text-[#6E655F] mt-1.5">
            Manage product authenticity approvals, observe financial payouts, and review audit trail compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: Product Moderation */}
          <Link
            href="/admin/moderation"
            className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm hover:border-[#8C3826] hover:shadow-md transition space-y-3"
          >
            <span className="text-3xl">🛡️</span>
            <h3 className="font-serif font-bold text-[#1C1917] text-base">Product Moderation Queue</h3>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Review pending AI catalog submissions, inspect natural dye formulas, and issue immutable SHA-256 Craft DNA certificates.
            </p>
            <span className="font-mono text-xs font-bold text-[#8C3826] block pt-2 uppercase tracking-wider">Open Moderation →</span>
          </Link>

          {/* Module 2: Operational Analytics */}
          <Link
            href="/admin/analytics"
            className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm hover:border-emerald-700 hover:shadow-md transition space-y-3"
          >
            <span className="text-3xl">📊</span>
            <h3 className="font-serif font-bold text-[#1C1917] text-base">Marketplace Analytics</h3>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Live Gross Marketplace Volume (GMV), 85% artisan direct payouts ledger, and cluster health monitoring.
            </p>
            <span className="font-mono text-xs font-bold text-emerald-800 block pt-2 uppercase tracking-wider">View Analytics →</span>
          </Link>

          {/* Module 3: Artisan Management */}
          <Link
            href="/shop"
            className="bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-6 shadow-sm hover:border-[#8C3826] hover:shadow-md transition space-y-3"
          >
            <span className="text-3xl">🏺</span>
            <h3 className="font-serif font-bold text-[#1C1917] text-base">Live Storefront Catalog</h3>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Inspect all active products across 28 states with live Craft DNA QR codes and verified purchase reviews.
            </p>
            <span className="font-mono text-xs font-bold text-[#8C3826] block pt-2 uppercase tracking-wider">View Storefront →</span>
          </Link>
        </div>
      </div>
    </AdminGuard>
  );
}

