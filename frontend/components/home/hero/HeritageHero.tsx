'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CraftRelic3D from './CraftRelic3D';
import { TextAnimate } from '@/registry/magicui/text-animate';

export default function HeritageHero() {
  const [activeMaterial, setActiveMaterial] = useState<'glazed_blue' | 'bronze' | 'terracotta'>('glazed_blue');

  return (
    /*
     * FULL-BLEED SECTION
     * ─────────────────────────────────────────────────────────────────────────
     * • -mx-[calc((100vw-100%)/2)] negative margin breaks out of any ancestor
     *   padding / max-width without breaking the document flow (no translate trick).
     *   This is the safest full-bleed escape hatch — works on mobile too.
     * • min-h-screen on desktop, min-h-[90vh] on mobile (leaves room for scroll hint)
     * • Responsive layout: stacked on mobile (3D pot first, text below),
     *   side-by-side on lg+ (text left, pot right)
     * • No absolute overlays on mobile — everything is in-flow
     * • Static mural bg-image = WebGL fallback (always present)
     * • Header is fixed z-[9999] above this section
     * ─────────────────────────────────────────────────────────────────────────
     */
    <section
      className="relative overflow-hidden text-[#F7F2E7] w-screen relative left-1/2 -translate-x-1/2 min-h-[90vh] lg:min-h-screen"
      style={{
        backgroundImage: "url('/images/hero/hero-mural-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* ── Dark luxury vignette overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(14,10,7,0.95) 0%, rgba(22,16,11,0.88) 50%, rgba(14,10,7,0.75) 100%)'
        }}
      />
      {/* Gold dot-grid texture */}
      <div className="absolute inset-0 z-[2] opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ── RESPONSIVE CONTENT GRID ── */}
      {/*
       * Mobile: flex-col — pot on top (with pt for fixed header), text below
       * Desktop lg+: flex-row — text left (55%), pot right (45%)
       */}
      <div className="relative z-[10] flex flex-col lg:flex-row lg:items-center w-full min-h-[90vh] lg:min-h-screen">

        {/* ── MOBILE: 3D pot at top, sized for mobile ── */}
        <div className="block lg:hidden w-full pt-20 px-4">
          {/* Mobile pot — compact height */}
          <div className="w-full h-[280px]">
            <CraftRelic3D materialType={activeMaterial} />
          </div>
          {/* Mobile material swatches — inline below pot */}
          <div className="flex items-center justify-center gap-2 pt-2 pb-1">
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#EFE7DA]/50 mr-1">Relic:</span>
            {(['glazed_blue', 'bronze', 'terracotta'] as const).map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => setActiveMaterial(mat)}
                className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-semibold transition-all duration-200 cursor-pointer border backdrop-blur-sm ${
                  activeMaterial === mat
                    ? mat === 'glazed_blue'
                      ? 'bg-[#1E3E62]/80 text-[#93C5FD] border-[#60A5FA]/60'
                      : mat === 'bronze'
                      ? 'bg-[#B8860B]/50 text-[#FDE047] border-[#FDE047]/50'
                      : 'bg-[#8C3826]/50 text-[#FCA5A5] border-[#FCA5A5]/50'
                    : 'bg-black/30 text-[#EFE7DA]/60 border-white/10'
                }`}
              >
                {mat === 'glazed_blue' ? '🔵 Jaipur Blue' : mat === 'bronze' ? '🟡 Bronze' : '🔴 Kutch Clay'}
              </button>
            ))}
          </div>
        </div>

        {/* ── LEFT COLUMN: Editorial text (full width mobile, 55% desktop) ── */}
        <div className="w-full lg:w-[55%] px-6 sm:px-8 lg:px-16 xl:px-20 py-8 lg:py-0 space-y-5 flex flex-col justify-center">

          {/* Provenance Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-[11px] font-semibold tracking-wider self-start"
            style={{ fontVariationSettings: '"opsz" 9, "wght" 600' }}
          >
            <span>🏺</span>
            <span>LIVING ARCHIVES • 100% MASTER ARTISAN OWNED</span>
          </div>

          {/* Master Headline with animation */}
          <div className="space-y-2">
            <h1 className="font-nasyhama text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08] text-[#F7F2E7] drop-shadow-lg">
              <TextAnimate
                animation="blurInUp"
                by="character"
                duration={5}
                loop={true}
                once={false}
                startOnView={false}
                className="inline-block text-[#FFFDF9] font-nasyhama"
              >
                Direct From Master Studios.
              </TextAnimate>
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#D4AF37] font-normal leading-snug">
              Pure Ancestral Lineage, Mathematically Fair.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C29B38] to-[#997624] text-[#141312] font-bold text-sm tracking-wide hover:from-[#E5C158] hover:to-[#B8860B] transition-all duration-200 shadow-md shadow-[#C29B38]/25 border border-[#FDF6B2]/50 flex items-center gap-2 group transform hover:-translate-y-0.5"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 700' }}
            >
              <span>Explore Living Catalog</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/craft-doctor"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#047857] text-white font-bold text-sm tracking-wide hover:from-[#115E59] hover:to-[#065F46] transition-all duration-200 shadow-md shadow-[#047857]/30 border border-[#6EE7B7]/40 flex items-center gap-2 transform hover:-translate-y-0.5"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 700' }}
            >
              <span>🩺</span>
              <span>Craft Doctor (AI Damage Repair)</span>
            </Link>
            <Link
              href="/artisan/register"
              className="px-4 py-3 rounded-xl border border-[#E3DACB]/40 text-[#EFE7DA] font-medium text-sm tracking-wide hover:bg-white/10 hover:border-[#E3DACB] transition-all duration-200 hidden sm:block"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 450' }}
            >
              Artisan Studio Onboarding
            </Link>
          </div>

          {/* Live Micro-Ledger Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#E3DACB]/15 max-w-md">
            <div>
              <span className="text-base sm:text-lg font-bold font-mono text-[#F7F2E7]">85.0%</span>
              <p className="text-[10px] text-[#EFE7DA]/70 font-mono uppercase">Direct Studio Share</p>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-mono text-[#D4AF37]">SHA-256</span>
              <p className="text-[10px] text-[#EFE7DA]/70 font-mono uppercase">Craft DNA Seal</p>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-mono text-[#E8F0EA]">28 States</span>
              <p className="text-[10px] text-[#EFE7DA]/70 font-mono uppercase">GI Craft Clusters</p>
            </div>
          </div>

          {/* Scroll hint — mobile only, below the metrics */}
          <div className="flex flex-col items-start gap-1 text-[#EFE7DA]/40 animate-bounce pointer-events-none lg:hidden">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
              <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3D pot — desktop only ── */}
        <div className="hidden lg:flex w-full lg:w-[45%] items-center justify-center relative py-12">
          {/* Full height canvas — no card wrapper */}
          <div className="w-full h-[520px] xl:h-[600px] relative">
            <CraftRelic3D materialType={activeMaterial} />
          </div>

          {/* Desktop floating pill swatches — bottom-right of the pot column */}
          <div className="absolute bottom-8 right-8 flex items-center gap-2 z-[5]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#EFE7DA]/50 mr-1">Relic:</span>
            {([
              { mat: 'glazed_blue', label: '🔵 Jaipur Blue', active: 'bg-[#1E3E62]/80 text-[#93C5FD] border-[#60A5FA]/60 shadow-blue-500/20' },
              { mat: 'bronze',      label: '🟡 Bastar Bronze', active: 'bg-[#B8860B]/50 text-[#FDE047] border-[#FDE047]/50 shadow-yellow-500/20' },
              { mat: 'terracotta',  label: '🔴 Kutch Clay',   active: 'bg-[#8C3826]/50 text-[#FCA5A5] border-[#FCA5A5]/50 shadow-red-500/20' },
            ] as const).map(({ mat, label, active }) => (
              <button
                key={mat}
                type="button"
                onClick={() => setActiveMaterial(mat)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold transition-all duration-200 cursor-pointer border backdrop-blur-sm ${
                  activeMaterial === mat
                    ? `${active} shadow-lg`
                    : 'bg-black/30 text-[#EFE7DA]/60 border-white/10 hover:bg-black/50 hover:text-[#EFE7DA]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Desktop scroll hint ── */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex-col items-center gap-1 text-[#EFE7DA]/40 animate-bounce pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
            <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
