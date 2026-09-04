'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { artisanService } from '@/services/artisan.service';
import { DashboardSkeleton } from '@/components/ui/Skeleton';

export default function ArtisanDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    artisanService.getMyProfile().then((res) => {
      if (res.data) setProfile(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F7F2E7] p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E3DACB]">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C3826]">
            Artisan Registry • Studio Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">
            {profile?.display_name || 'Master Artisan Studio'}
          </h1>
          <p className="font-mono text-xs text-[#6E655F] mt-1">
            Tradition: <span className="font-semibold text-[#1C1917]">{profile?.craft_tradition || 'Heritage Craft'}</span> • Region: {profile?.region || 'India'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/artisan/products/new"
            className="px-4 py-2.5 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-mono text-xs uppercase tracking-wider transition shadow-sm"
          >
            + Add Craft Specimen (AI Vision)
          </Link>
          <span className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider ${
            profile?.verification_status === 'verified'
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}>
            {profile?.verification_status || 'Pending Verification'}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 shadow-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E655F]">Total Masterworks</span>
          <h2 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">0</h2>
          <span className="font-mono text-[10px] text-[#6E655F]">0 certified, 0 in queue</span>
        </div>

        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 shadow-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E655F]">Suborders Received</span>
          <h2 className="font-serif text-2xl font-bold text-[#1C1917] mt-1">0</h2>
          <span className="font-mono text-[10px] text-[#6E655F]">100% direct fulfillment</span>
        </div>

        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 shadow-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E655F]">Artisan Net Escrow</span>
          <h2 className="font-serif text-2xl font-bold text-[#8C3826] mt-1">₹0.00</h2>
          <span className="font-mono text-[10px] text-[#6E655F]">85% direct payout guarantee</span>
        </div>

        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 shadow-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#6E655F]">Lineage Rating</span>
          <h2 className="font-serif text-2xl font-bold text-[#B8860B] mt-1">★ {profile?.avg_rating || '5.0'}</h2>
          <span className="font-mono text-[10px] text-[#6E655F]">{profile?.review_count || 0} verified patron reviews</span>
        </div>
      </div>

      {/* Studio Quick Actions */}
      <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs">
        <h3 className="font-mono text-xs font-bold text-[#1C1917] uppercase tracking-[0.2em] mb-4">Studio Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/artisan/products/new"
            className="p-4 bg-[#F7F2E7] border border-[#E3DACB] rounded-lg hover:border-[#8C3826] transition group"
          >
            <h4 className="font-serif font-bold text-[#1C1917] group-hover:text-[#8C3826] text-sm">📸 AI Multimodal Cataloging</h4>
            <p className="font-mono text-[11px] text-[#6E655F] mt-1">Upload a photo to generate bilingual provenance & fair price breakdown.</p>
          </Link>
          <Link
            href="/artisan/orders"
            className="p-4 bg-[#F7F2E7] border border-[#E3DACB] rounded-lg hover:border-[#8C3826] transition group"
          >
            <h4 className="font-serif font-bold text-[#1C1917] group-hover:text-[#8C3826] text-sm">📦 Manage Patron Suborders</h4>
            <p className="font-mono text-[11px] text-[#6E655F] mt-1">Fulfill and track suborders assigned directly to your studio.</p>
          </Link>
          <Link
            href="/artisan/earnings"
            className="p-4 bg-[#F7F2E7] border border-[#E3DACB] rounded-lg hover:border-[#8C3826] transition group"
          >
            <h4 className="font-serif font-bold text-[#1C1917] group-hover:text-[#8C3826] text-sm">💳 Bank Escrow Settlements</h4>
            <p className="font-mono text-[11px] text-[#6E655F] mt-1">Inspect transparent 85% revenue shares and scheduled transfers.</p>
          </Link>
        </div>
      </div>

      {/* Studio Crafts Inventory Empty State */}
      <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-10 shadow-xs text-center">
        <div className="w-14 h-14 bg-[#8C3826]/10 text-[#8C3826] rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
          🎨
        </div>
        <h3 className="font-serif font-bold text-[#1C1917] text-lg mb-1">No Crafts Cataloged in Studio Yet</h3>
        <p className="text-xs text-[#6E655F] max-w-md mx-auto mb-6 leading-relaxed">
          Upload your handcrafted creations with AI-assisted cataloging. Automatic GI certification tags, bilingual descriptions, and 85% net earnings guarantee.
        </p>
        <Link
          href="/artisan/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition shadow-sm"
        >
          <span>📸</span> + List First Heritage Craft
        </Link>
      </div>
    </div>
  );
}
