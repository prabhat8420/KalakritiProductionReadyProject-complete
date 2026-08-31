'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { artisanService } from '@/services/artisan.service';

export default function ArtisanDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    artisanService.getMyProfile().then((res) => {
      if (res.data) setProfile(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] p-6 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase text-orange-800 tracking-wider">Artisan Portal</span>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            {profile?.display_name || 'Artisan Studio Dashboard'}
          </h1>
          <p className="text-xs text-stone-600">
            Tradition: <span className="font-semibold text-stone-800">{profile?.craft_tradition || 'Master Artisan'}</span> • Region: {profile?.region || 'India'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/artisan/products/new"
            className="px-4 py-2 bg-[#c55337] text-white rounded-lg text-xs font-semibold hover:bg-[#a5402a] transition"
          >
            + Add Product (AI Cataloging)
          </Link>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            profile?.verification_status === 'verified'
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {profile?.verification_status || 'Pending Verification'}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">Total Products</span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1">0</h2>
          <span className="text-[11px] text-stone-400">0 published, 0 in moderation</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">Suborders Received</span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1">0</h2>
          <span className="text-[11px] text-stone-400">All fulfilled</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">Artisan Net Earnings</span>
          <h2 className="text-2xl font-bold text-[#c55337] mt-1">₹0.00</h2>
          <span className="text-[11px] text-stone-400">Escrow maturation: 7 days</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs text-stone-500 font-medium">Verified Craft Rating</span>
          <h2 className="text-2xl font-bold text-amber-600 mt-1">★ {profile?.avg_rating || '5.0'}</h2>
          <span className="text-[11px] text-stone-400">{profile?.review_count || 0} verified reviews</span>
        </div>
      </div>

      {/* Studio Quick Actions */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider mb-4">Quick Studio Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/artisan/products/new"
            className="p-4 border border-stone-200 rounded-lg hover:border-[#c55337] transition group"
          >
            <h4 className="font-semibold text-stone-900 group-hover:text-[#c55337] text-sm">📸 AI Product Cataloging</h4>
            <p className="text-xs text-stone-500 mt-1">Upload a photo to auto-generate bilingual title & description.</p>
          </Link>
          <Link
            href="/artisan/orders"
            className="p-4 border border-stone-200 rounded-lg hover:border-[#c55337] transition group"
          >
            <h4 className="font-semibold text-stone-900 group-hover:text-[#c55337] text-sm">📦 Manage Suborders</h4>
            <p className="text-xs text-stone-500 mt-1">Track suborders assigned specifically to your craft studio.</p>
          </Link>
          <Link
            href="/artisan/earnings"
            className="p-4 border border-stone-200 rounded-lg hover:border-[#c55337] transition group"
          >
            <h4 className="font-semibold text-stone-900 group-hover:text-[#c55337] text-sm">💳 Bank Payouts</h4>
            <p className="text-xs text-stone-500 mt-1">View transparent revenue breakdown and scheduled transfers.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
