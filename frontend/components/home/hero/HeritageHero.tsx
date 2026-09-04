'use client';

import React from 'react';
import Link from 'next/link';
import CraftRelic3D from './CraftRelic3D';

export default function HeritageHero() {
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

          {/* Master Headline */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F2E7] leading-[1.08]">
              Direct From Master Studios.
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] font-normal leading-snug">
              Pure Ancestral Lineage, Mathematically Fair.
            </p>
          </div>

          {/* Editorial Paragraph */}
          <p className="text-sm sm:text-base text-[#EFE7DA]/90 max-w-xl font-normal leading-relaxed">
            Discover rare GI-certified Madhubani paintings, Kalamkari hand-painted silk textiles, and Bastar lost-wax bronze castings. Every piece features cryptographic proof of origin, transparent 85% artisan payouts, and circular restoration.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-lg bg-[#8C3826] text-white font-medium text-xs tracking-wide hover:bg-[#6E2819] transition shadow-xs font-mono"
            >
              Explore Living Catalog
            </Link>
            <Link
              href="/craft-doctor"
              className="px-6 py-3 rounded-lg bg-[#2D5A43] text-white font-medium text-xs tracking-wide hover:bg-[#1E3E2E] transition shadow-xs flex items-center gap-2 font-mono"
            >
              <span>🩺</span>
              <span>Craft Doctor (AI Damage Repair)</span>
            </Link>
            <Link
              href="/artisan/register"
              className="px-6 py-3 rounded-lg border border-[#E3DACB]/40 text-[#EFE7DA] font-medium text-xs tracking-wide hover:bg-white/10 transition font-mono"
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
          <div className="w-full bg-[#1C1917]/50 border border-[#E3DACB]/20 rounded-xl overflow-hidden p-2 backdrop-blur-sm">
            <CraftRelic3D materialType="glazed_blue" />
          </div>
        </div>
      </div>
    </section>
  );
}
