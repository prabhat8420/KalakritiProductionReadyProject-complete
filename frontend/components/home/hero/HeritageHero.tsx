'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CraftRelic3D from './CraftRelic3D';

export default function HeritageHero() {
  const [activeMaterial, setActiveMaterial] = useState<'glazed_blue' | 'bronze' | 'terracotta'>('glazed_blue');

  return (
    <section className="relative overflow-hidden bg-[#241E19] text-[#F7F2E7] rounded-2xl border border-[#E3DACB]/20 shadow-sm">
      {/* Background Architectural Warm Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
        {/* Left Editorial Narrative (7 Columns) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Provenance Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-[11px] font-mono font-semibold tracking-wider">
            <span>🏺</span>
            <span>LIVING ARCHIVES • 100% MASTER ARTISAN OWNED</span>
          </div>

          {/* Master Headline with Shimmer Animation */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] bg-gradient-to-r from-[#FFFDF9] via-[#F3E5AB] via-[#D4AF37] to-[#FFFDF9] bg-[length:200%_auto] animate-shimmer-text bg-clip-text text-transparent drop-shadow-sm">
              Direct From Master Studios.
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] font-normal leading-snug">
              Pure Ancestral Lineage, Mathematically Fair.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C29B38] to-[#997624] text-[#141312] font-bold text-xs tracking-wide hover:from-[#E5C158] hover:to-[#B8860B] transition-all duration-200 shadow-md shadow-[#C29B38]/25 border border-[#FDF6B2]/50 font-mono flex items-center gap-2 group transform hover:-translate-y-0.5"
            >
              <span>Explore Living Catalog</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/craft-doctor"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#047857] text-white font-bold text-xs tracking-wide hover:from-[#115E59] hover:to-[#065F46] transition-all duration-200 shadow-md shadow-[#047857]/30 border border-[#6EE7B7]/40 flex items-center gap-2 font-mono transform hover:-translate-y-0.5"
            >
              <span className="text-sm">🩺</span>
              <span>Craft Doctor (AI Damage Repair)</span>
            </Link>
            <Link
              href="/artisan/register"
              className="px-5 py-3.5 rounded-xl border border-[#E3DACB]/40 text-[#EFE7DA] font-medium text-xs tracking-wide hover:bg-white/10 hover:border-[#E3DACB] transition-all duration-200 font-mono"
            >
              Artisan Studio Onboarding
            </Link>
          </div>

          {/* Live Micro-Ledger Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E3DACB]/15 max-w-lg">
            <div>
              <span className="text-lg sm:text-xl font-bold font-mono text-[#F7F2E7]">85.0%</span>
              <p className="text-[10px] text-[#EFE7DA]/70 font-mono uppercase">Direct Studio Share</p>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold font-mono text-[#D4AF37]">SHA-256</span>
              <p className="text-[10px] text-[#EFE7DA]/70 font-mono uppercase">Craft DNA Seal</p>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold font-mono text-[#E8F0EA]">28 States</span>
              <p className="text-[10px] text-[#EFE7DA]/70 font-mono uppercase">GI Craft Clusters</p>
            </div>
          </div>
        </div>

        {/* Right 3D Craft Relic & Visual Specimen (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full bg-[#1C1917]/70 border border-[#E3DACB]/20 rounded-2xl overflow-hidden p-3 backdrop-blur-md shadow-xl">
            <CraftRelic3D materialType={activeMaterial} />
            
            {/* Interactive Material Swatches for 3D Pot */}
            <div className="flex items-center justify-center gap-2 pt-3 border-t border-[#E3DACB]/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#EFE7DA]/60 mr-1">
                Relic Glaze:
              </span>
              <button
                type="button"
                onClick={() => setActiveMaterial('glazed_blue')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition cursor-pointer ${
                  activeMaterial === 'glazed_blue'
                    ? 'bg-[#1E3E62] text-[#93C5FD] border border-[#60A5FA]/60 shadow-xs'
                    : 'bg-white/5 text-[#EFE7DA]/70 hover:bg-white/10'
                }`}
              >
                🔵 Jaipur Blue
              </button>
              <button
                type="button"
                onClick={() => setActiveMaterial('bronze')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition cursor-pointer ${
                  activeMaterial === 'bronze'
                    ? 'bg-[#B8860B]/30 text-[#FDE047] border border-[#FDE047]/60 shadow-xs'
                    : 'bg-white/5 text-[#EFE7DA]/70 hover:bg-white/10'
                }`}
              >
                🟡 Bastar Bronze
              </button>
              <button
                type="button"
                onClick={() => setActiveMaterial('terracotta')}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition cursor-pointer ${
                  activeMaterial === 'terracotta'
                    ? 'bg-[#8C3826]/40 text-[#FCA5A5] border border-[#FCA5A5]/60 shadow-xs'
                    : 'bg-white/5 text-[#EFE7DA]/70 hover:bg-white/10'
                }`}
              >
                🔴 Kutch Clay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

