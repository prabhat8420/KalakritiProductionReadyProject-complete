'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface CuratorSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function CuratorSidebar({
  isOpen = false,
  onClose,
  activeCategory = 'all',
  onSelectCategory,
}: CuratorSidebarProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSelect = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
    if (onClose) {
      onClose();
    }
  };

  const materials = [
    { slug: 'all', label: 'All Living Lineages', count: '14', icon: '🏺' },
    { slug: 'earth-clay', label: 'Earth & Fired Clay', count: '4', icon: '🧱' },
    { slug: 'plant-dyes', label: 'Natural Botanical Dyes', count: '3', icon: '🌿' },
    { slug: 'lost-wax-bronze', label: 'Lost-Wax Bell Metal', count: '2', icon: '✨' },
    { slug: 'glazed-quartz', label: 'Glazed Quartz Paste', count: '3', icon: '🔵' },
    { slug: 'heritage-silks', label: 'Handspun Ahimsa Silks', count: '2', icon: '🧵' },
  ];

  const clusters = [
    { name: 'Mithila, Bihar', gi: 'GI-187', count: '3 crafts', desc: 'Madhubani Pigment Painting' },
    { name: 'Amer, Rajasthan', gi: 'GI-244', count: '4 crafts', desc: 'Jaipur Blue Quartz Pottery' },
    { name: 'Bastar, Chhattisgarh', gi: 'GI-82', count: '2 crafts', desc: 'Dhokra Lost-Wax Casting' },
    { name: 'Kutch, Gujarat', gi: 'GI-312', count: '3 crafts', desc: 'Ajrakh & Rogan Art' },
    { name: 'Varanasi, UP', gi: 'GI-29', count: '2 crafts', desc: 'Banarasi Zari Brocade' },
    { name: 'Pochampally, Telangana', gi: 'GI-4', count: '2 crafts', desc: 'Double Ikat Silk Weave' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Semi-transparent Dark Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[#141312]/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out High-Resolution Sidebar Drawer */}
      <aside
        className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] h-full bg-[#FAF6EE] border-r border-[#E3DACB] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="Kalakriti Living Archives Directory"
      >
        {/* Drawer Header Banner */}
        <div className="bg-[#1C1917] text-[#F7F2E7] px-5 py-4 flex items-center justify-between border-b border-[#C29B38]/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🏺</span>
            <div>
              <span className="font-display font-bold text-base tracking-tight text-[#F7F2E7] block">
                कलाकृति • CURATOR RAIL
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block -mt-0.5">
                LIVING HERITAGE DIRECTORY
              </span>
            </div>
          </div>

          {/* Close Button (✕) */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-[#F7F2E7] hover:text-white flex items-center justify-center text-lg font-mono transition cursor-pointer border border-white/10"
            aria-label="Close sidebar"
            title="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Rail */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Main Navigation Portals */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C3826] font-bold block">
              Core Platform Portals
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DACB] text-xs font-mono font-semibold text-[#1C1917] hover:border-[#8C3826] hover:bg-[#F7F2E7] transition shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base group-hover:scale-110 transition-transform">🛍️</span>
                  <span>Living Craft Catalog</span>
                </div>
                <span className="text-[#8C3826] text-xs">→</span>
              </Link>

              <Link
                href="/traditions"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DACB] text-xs font-mono font-semibold text-[#1C1917] hover:border-[#8C3826] hover:bg-[#F7F2E7] transition shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base group-hover:scale-110 transition-transform">📜</span>
                  <span>Heritage Traditions</span>
                </div>
                <span className="text-[#8C3826] text-xs">→</span>
              </Link>

              <Link
                href="/craft-doctor"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0F766E]/10 border border-[#0F766E]/30 text-xs font-mono font-bold text-[#0F766E] hover:bg-[#0F766E]/20 transition shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base group-hover:scale-110 transition-transform">🩺</span>
                  <span>Craft Doctor (AI Repair)</span>
                </div>
                <span className="text-xs">→</span>
              </Link>

              <Link
                href="/artisan/dashboard"
                onClick={onClose}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DACB] text-xs font-mono font-semibold text-[#1C1917] hover:border-[#8C3826] hover:bg-[#F7F2E7] transition shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base group-hover:scale-110 transition-transform">🎨</span>
                  <span>Master Artisan Studio</span>
                </div>
                <span className="text-[#8C3826] text-xs">→</span>
              </Link>
            </div>
          </div>

          {/* Material Lineages Taxonomy */}
          <div className="space-y-2 pt-2 border-t border-[#E3DACB]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C3826] font-bold block">
                Craft Materiality Filter
              </span>
              <span className="text-[10px] font-mono text-[#5C554E]">6 Lineages</span>
            </div>

            <div className="space-y-1">
              {materials.map((m) => {
                const isSelected = activeCategory === m.slug;
                return (
                  <button
                    key={m.slug}
                    type="button"
                    onClick={() => handleSelect(m.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-medium transition text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1917] text-[#F7F2E7] shadow-xs'
                        : 'text-[#2D2824] hover:bg-[#EFE7DA] bg-white/50 border border-transparent hover:border-[#E3DACB]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{m.icon}</span>
                      <span className="truncate">{m.label}</span>
                    </div>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#141312] font-bold'
                          : 'bg-[#EFE7DA] text-[#5C554E]'
                      }`}
                    >
                      {m.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* GI Certified Artisan Clusters */}
          <div className="space-y-2 pt-2 border-t border-[#E3DACB]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C3826] font-bold block">
                GI Artisan Geographic Clusters
              </span>
              <span className="text-[10px] font-mono text-[#5C554E]">Verified</span>
            </div>

            <div className="space-y-2">
              {clusters.map((c) => (
                <Link
                  key={c.gi}
                  href={`/shop?cluster=${encodeURIComponent(c.name)}`}
                  onClick={onClose}
                  className="block p-3 rounded-xl border border-[#E3DACB] bg-white hover:border-[#8C3826] hover:bg-[#F7F2E7] transition shadow-xs group"
                >
                  <div className="flex items-center justify-between text-xs font-medium text-[#1C1917]">
                    <span className="font-bold group-hover:text-[#8C3826] transition-colors">{c.name}</span>
                    <span className="text-[9px] font-mono font-bold text-[#8C3826] bg-[#8C3826]/10 px-1.5 py-0.5 rounded-full border border-[#8C3826]/20">
                      {c.gi}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5C554E] mt-0.5 truncate">{c.desc}</div>
                  <div className="text-[10px] text-[#8C3826] font-mono mt-1 font-semibold flex items-center gap-1">
                    <span>✓</span> {c.count} • Master Verified
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mathematical Escrow Guarantee Box */}
          <div className="p-4 bg-[#1C1917] text-[#F7F2E7] rounded-xl space-y-2 border border-[#C29B38]/30 shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] font-bold">
              <span>⚖️</span>
              <span>85% DIRECT ARTISAN ESCROW</span>
            </div>
            <p className="text-[11px] text-[#EFE7DA]/90 leading-relaxed font-sans">
              Every purchase triggers instant cryptographic transfer directly to master studio bank accounts with SHA-256 origin proof.
            </p>
            <Link
              href="/shop"
              onClick={onClose}
              className="text-[11px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 pt-1 font-semibold"
            >
              <span>Explore Live Certified Catalog</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#EFE7DA] border-t border-[#E3DACB] flex items-center justify-between text-xs font-mono shrink-0">
          <Link
            href="/cart"
            onClick={onClose}
            className="text-[#1C1917] hover:text-[#8C3826] font-semibold flex items-center gap-1.5"
          >
            <span>🧺</span> Basket & Checkout
          </Link>
          <span className="text-[10px] text-[#5C554E]">v2.4 • KALAKRITI</span>
        </div>
      </aside>
    </div>
  );
}

