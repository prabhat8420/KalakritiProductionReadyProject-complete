'use client';

import React from 'react';
import Link from 'next/link';
import { TextAnimate } from '@/registry/magicui/text-animate';

/*
 * HERITAGE HERO — Full-bleed, no Three.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The 3D CraftRelic3D pot has been removed entirely.
 * Right column replaced with a pure CSS/SVG decorative yantra mandala
 * and floating craft statistics — zero WebGL overhead, works everywhere.
 *
 * Layout:
 *  Mobile  — flex-col, text content only (mandala hidden on mobile)
 *  Desktop — flex-row: text 55% left, mandala 45% right
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function HeritageHero() {
  return (
    <section
      className="relative overflow-hidden text-[#F7F2E7] w-screen left-1/2 -translate-x-1/2 min-h-[90vh] lg:min-h-screen"
      style={{
        backgroundImage: "url('/images/hero/hero-mural-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark luxury vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(14,10,7,0.96) 0%, rgba(22,16,11,0.88) 55%, rgba(14,10,7,0.70) 100%)'
        }}
      />
      {/* Gold dot-grid texture */}
      <div className="absolute inset-0 z-[2] opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ── RESPONSIVE CONTENT GRID ── */}
      <div className="relative z-[10] flex flex-col lg:flex-row lg:items-center w-full min-h-[90vh] lg:min-h-screen">

        {/* ── LEFT COLUMN: Editorial text ── */}
        <div className="w-full lg:w-[55%] px-6 sm:px-10 lg:px-16 xl:px-24 py-10 lg:py-0 space-y-7 flex flex-col justify-center pt-24 lg:pt-0">

          {/* Provenance Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 text-[#D4AF37] text-[11px] font-semibold tracking-wider self-start"
            style={{ fontVariationSettings: '"opsz" 9, "wght" 600' }}
          >
            <span>🏺</span>
            <span>LIVING ARCHIVES • 100% MASTER ARTISAN OWNED</span>
          </div>

          {/* Hero Headline — TextAnimate blur-in loop */}
          <div className="space-y-3">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
              style={{ fontVariationSettings: '"opsz" 72, "wght" 800' }}
            >
              <TextAnimate
                animation="blurInUp"
                by="character"
                duration={5}
                loop={true}
                once={false}
                startOnView={false}
                className="inline-block text-[#FFFDF9]"
              >
                Direct From Master Studios.
              </TextAnimate>
            </h1>
            <p
              className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#D4AF37] font-normal leading-snug"
              style={{ fontVariationSettings: '"opsz" 24, "wght" 400' }}
            >
              Pure Ancestral Lineage, Mathematically Fair.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C29B38] to-[#997624] text-[#141312] font-bold text-sm tracking-wide hover:from-[#E5C158] hover:to-[#B8860B] transition-all duration-200 shadow-lg shadow-[#C29B38]/20 border border-[#FDF6B2]/50 flex items-center gap-2 group transform hover:-translate-y-0.5"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 700' }}
            >
              <span>Explore Living Catalog</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/craft-doctor"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#047857] text-white font-bold text-sm tracking-wide hover:from-[#115E59] hover:to-[#065F46] transition-all duration-200 shadow-lg shadow-[#047857]/25 border border-[#6EE7B7]/40 flex items-center gap-2 transform hover:-translate-y-0.5"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 700' }}
            >
              <span>🩺</span>
              <span>Craft Doctor (AI Damage Repair)</span>
            </Link>
            <Link
              href="/artisan/register"
              className="px-5 py-3.5 rounded-xl border border-[#E3DACB]/40 text-[#EFE7DA] text-sm font-medium tracking-wide hover:bg-white/10 hover:border-[#E3DACB] transition-all duration-200 hidden sm:block"
              style={{ fontVariationSettings: '"opsz" 14, "wght" 450' }}
            >
              Artisan Studio Onboarding
            </Link>
          </div>

          {/* Live Micro-Ledger Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#E3DACB]/15 max-w-sm">
            <div>
              <span className="text-xl font-bold font-mono text-[#F7F2E7]">85.0%</span>
              <p className="text-[10px] text-[#EFE7DA]/60 font-mono uppercase tracking-wide mt-0.5">Direct Studio Share</p>
            </div>
            <div>
              <span className="text-xl font-bold font-mono text-[#D4AF37]">SHA-256</span>
              <p className="text-[10px] text-[#EFE7DA]/60 font-mono uppercase tracking-wide mt-0.5">Craft DNA Seal</p>
            </div>
            <div>
              <span className="text-xl font-bold font-mono text-[#E8F0EA]">28</span>
              <p className="text-[10px] text-[#EFE7DA]/60 font-mono uppercase tracking-wide mt-0.5">GI Craft States</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Decorative Yantra Mandala (desktop only) ── */}
        <div className="hidden lg:flex w-full lg:w-[45%] items-center justify-center relative">
          <div className="relative w-[420px] h-[420px] xl:w-[500px] xl:h-[500px] flex items-center justify-center">

            {/* Outermost rotating ring */}
            <div
              className="absolute inset-0 rounded-full border border-[#D4AF37]/20"
              style={{ animation: 'spin 60s linear infinite' }}
            />
            {/* Outer ring with dashes */}
            <div
              className="absolute inset-[20px] rounded-full border border-dashed border-[#D4AF37]/30"
              style={{ animation: 'spin 40s linear infinite reverse' }}
            />
            {/* Middle double ring */}
            <div
              className="absolute inset-[60px] rounded-full border-2 border-[#B8860B]/40"
              style={{ animation: 'spin 25s linear infinite' }}
            />
            <div
              className="absolute inset-[80px] rounded-full border border-[#B8860B]/20"
            />

            {/* Inner octagon / star pattern via rotate divs */}
            {[0, 22.5, 45, 67.5].map((deg) => (
              <div
                key={deg}
                className="absolute inset-[110px] border border-[#C29B38]/25 rounded-sm"
                style={{ transform: `rotate(${deg}deg)` }}
              />
            ))}

            {/* Inner solid circle */}
            <div className="absolute inset-[140px] rounded-full bg-[#1C1512]/80 border-2 border-[#C29B38]/50 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              {/* Center GI seal text */}
              <div className="text-center px-4">
                <div className="text-3xl mb-2">🏺</div>
                <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold">GI Certified</div>
                <div className="text-[9px] font-mono text-[#EFE7DA]/50 mt-1">Master Studio</div>
              </div>
            </div>

            {/* 8 radial tick marks */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[2px] h-[16px] bg-[#C29B38]/40 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '1px 210px',
                  transform: `rotate(${i * 45}deg) translateX(-1px) translateY(-210px)`,
                }}
              />
            ))}

            {/* Floating craft stat badges around the mandala */}
            {[
              { label: 'Madhubani', sub: 'GI-187 Bihar', angle: -60, r: 210 },
              { label: 'Dhokra Bronze', sub: 'GI-82 Bastar', angle: 30, r: 210 },
              { label: 'Blue Pottery', sub: 'GI-244 Jaipur', angle: 120, r: 210 },
              { label: 'Ikat Silk', sub: 'GI-4 Pochampally', angle: 210, r: 210 },
            ].map(({ label, sub, angle, r }) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <div
                  key={label}
                  className="absolute pointer-events-none"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, top: '50%', left: '50%' }}
                >
                  <div className="px-2.5 py-1.5 rounded-lg bg-[#1C1512]/90 border border-[#C29B38]/40 backdrop-blur-sm text-center shadow-lg min-w-[90px]">
                    <div className="text-[10px] font-semibold text-[#F7F2E7] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 9, "wght" 600' }}>
                      {label}
                    </div>
                    <div className="text-[8px] font-mono text-[#D4AF37] whitespace-nowrap">{sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop scroll hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#EFE7DA]/30 pointer-events-none" style={{ animation: 'bounce 2s infinite' }}>
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Mobile scroll hint */}
        <div className="flex lg:hidden justify-center pb-6 text-[#EFE7DA]/30 pointer-events-none" style={{ animation: 'bounce 2s infinite' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
