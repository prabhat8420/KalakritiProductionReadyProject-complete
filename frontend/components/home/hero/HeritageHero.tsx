'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CraftRelic3D from './CraftRelic3D';
import { TextAnimate } from '@/registry/magicui/text-animate';

export default function HeritageHero() {
  const [activeMaterial, setActiveMaterial] = useState<'glazed_blue' | 'bronze' | 'terracotta'>('glazed_blue');

  return (
    /*
     * TRUE FULL-BLEED SECTION
     * ─────────────────────────────────────────────────────────────────────────
     * • w-screen + relative left-[50%] + -translate-x-1/2 guarantees the section
     *   breaks out of any ancestor padding or max-width, no matter how deep in
     *   the tree it sits.
     * • min-h-screen ensures it fills the viewport.
     * • The background image is the static WebGL-failure fallback; if Three.js
     *   inits successfully the canvas renders on top and covers it exactly.
     * • z-0 on this element; Header is fixed z-[9999] — no conflict.
     */
    <section
      className="relative w-screen left-1/2 -translate-x-1/2 min-h-screen overflow-hidden"
      style={{ backgroundImage: "url('/images/hero/hero-mural-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* ── Layer 0: Dark luxury vignette — always present, even on WebGL fail ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to right, rgba(14,10,7,0.93) 0%, rgba(22,16,11,0.86) 55%, rgba(14,10,7,0.80) 100%)'
        }}
      />

      {/* Subtle gold dot-grid texture overlay */}
      <div className="absolute inset-0 z-[2] opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ── Layer 1: Three.js WebGL canvas — fills the right half of the hero ── */}
      {/*
       * The canvas sits at z-[3] — above the gradient overlay so the 3D scene
       * renders through, but below the text overlay at z-[10].
       * On the right half: positioned absolute right-0, width ~50%, full height.
       * The canvas itself renders transparently over the mural bg.
       */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] z-[3] pointer-events-auto">
        <CraftRelic3D materialType={activeMaterial} />
      </div>

      {/* ── Layer 2: Editorial text content — absolutely overlaid left side ── */}
      <div className="absolute inset-0 z-[10] flex items-center pointer-events-none">
        <div className="w-full lg:w-[52%] px-8 sm:px-12 lg:px-16 xl:px-20 space-y-6 pointer-events-auto pt-24 pb-16">

          {/* Provenance Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-[11px] font-semibold tracking-wider"
            style={{ fontVariationSettings: '"opsz" 9, "wght" 600' }}
          >
            <span>🏺</span>
            <span>LIVING ARCHIVES • 100% MASTER ARTISAN OWNED</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-2">
            <h1 className="font-nasyhama text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#F7F2E7] drop-shadow-lg">
              <TextAnimate
                animation="blurInUp"
                by="character"
                duration={5}
                loop={true}
                className="inline-block text-[#FFFDF9] font-nasyhama"
              >
                Direct From Master Studios.
              </TextAnimate>
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] font-normal leading-snug">
              Pure Ancestral Lineage, Mathematically Fair.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C29B38] to-[#997624] text-[#141312] font-bold text-sm tracking-wide hover:from-[#E5C158] hover:to-[#B8860B] transition-all duration-200 shadow-md shadow-[#C29B38]/25 border border-[#FDF6B2]/50 flex items-center gap-2 group transform hover:-translate-y-0.5"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 700' }}
            >
              <span>Explore Living Catalog</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/craft-doctor"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#047857] text-white font-bold text-sm tracking-wide hover:from-[#115E59] hover:to-[#065F46] transition-all duration-200 shadow-md shadow-[#047857]/30 border border-[#6EE7B7]/40 flex items-center gap-2 transform hover:-translate-y-0.5"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 700' }}
            >
              <span className="text-sm">🩺</span>
              <span>Craft Doctor (AI Damage Repair)</span>
            </Link>
            <Link
              href="/artisan/register"
              className="px-5 py-3.5 rounded-xl border border-[#E3DACB]/40 text-[#EFE7DA] font-medium text-sm tracking-wide hover:bg-white/10 hover:border-[#E3DACB] transition-all duration-200"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 450' }}
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
      </div>

      {/* ── Layer 3: Material swatch pills — floating absolute, bottom-right ── */}
      {/*
       * No container box. Pills float directly over the 3D scene.
       * pointer-events-auto so clicks register through the overlay.
       */}
      <div className="absolute bottom-8 right-8 z-[20] flex items-center gap-2 pointer-events-auto">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#EFE7DA]/50 mr-1">
          Relic:
        </span>
        <button
          type="button"
          onClick={() => setActiveMaterial('glazed_blue')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold transition-all duration-200 cursor-pointer border backdrop-blur-sm ${
            activeMaterial === 'glazed_blue'
              ? 'bg-[#1E3E62]/80 text-[#93C5FD] border-[#60A5FA]/60 shadow-lg shadow-blue-500/20'
              : 'bg-black/30 text-[#EFE7DA]/60 border-white/10 hover:bg-black/50 hover:text-[#EFE7DA]'
          }`}
        >
          🔵 Jaipur Blue
        </button>
        <button
          type="button"
          onClick={() => setActiveMaterial('bronze')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold transition-all duration-200 cursor-pointer border backdrop-blur-sm ${
            activeMaterial === 'bronze'
              ? 'bg-[#B8860B]/50 text-[#FDE047] border-[#FDE047]/50 shadow-lg shadow-yellow-500/20'
              : 'bg-black/30 text-[#EFE7DA]/60 border-white/10 hover:bg-black/50 hover:text-[#EFE7DA]'
          }`}
        >
          🟡 Bastar Bronze
        </button>
        <button
          type="button"
          onClick={() => setActiveMaterial('terracotta')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-semibold transition-all duration-200 cursor-pointer border backdrop-blur-sm ${
            activeMaterial === 'terracotta'
              ? 'bg-[#8C3826]/50 text-[#FCA5A5] border-[#FCA5A5]/50 shadow-lg shadow-red-500/20'
              : 'bg-black/30 text-[#EFE7DA]/60 border-white/10 hover:bg-black/50 hover:text-[#EFE7DA]'
          }`}
        >
          🔴 Kutch Clay
        </button>
      </div>

      {/* ── Scroll hint arrow at bottom-center ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-1 text-[#EFE7DA]/40 animate-bounce pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
          <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
