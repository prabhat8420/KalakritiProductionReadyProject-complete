'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CuratorSidebarProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function CuratorSidebar({
  activeCategory = 'all',
  onSelectCategory
}: CuratorSidebarProps) {
  const [selected, setSelected] = useState(activeCategory);

  const handleSelect = (slug: string) => {
    setSelected(slug);
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
  };

  const materials = [
    { slug: 'all', label: 'All Living Lineages', count: '14' },
    { slug: 'earth-clay', label: 'Earth & Fired Clay', count: '4' },
    { slug: 'plant-dyes', label: 'Natural Botanical Dyes', count: '3' },
    { slug: 'lost-wax-bronze', label: 'Lost-Wax Bell Metal', count: '2' },
    { slug: 'glazed-quartz', label: 'Glazed Quartz Paste', count: '3' },
    { slug: 'heritage-silks', label: 'Handspun Ahimsa Silks', count: '2' },
  ];

  const clusters = [
    { name: 'Mithila, Bihar', gi: 'GI-187', count: '3 crafts' },
    { name: 'Amer, Rajasthan', gi: 'GI-244', count: '4 crafts' },
    { name: 'Bastar, Chhattisgarh', gi: 'GI-82', count: '2 crafts' },
    { name: 'Kutch, Gujarat', gi: 'GI-312', count: '3 crafts' },
  ];

  return (
    <aside className="w-full lg:w-[260px] shrink-0 space-y-6">
      {/* Curator Box */}
      <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 shadow-xs space-y-5">
        <div className="border-b border-[#E3DACB] pb-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C3826] font-semibold block">
            Archival Taxonomy
          </span>
          <h3 className="font-display font-bold text-base text-[#1C1917] mt-0.5 tracking-tight">
            Heritage Curator Rail
          </h3>
        </div>

        {/* Material Lineages */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C554E] block">
            Craft Materiality
          </span>
          <div className="space-y-1">
            {materials.map((m) => {
              const isSelected = selected === m.slug;
              return (
                <button
                  key={m.slug}
                  onClick={() => handleSelect(m.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono font-medium transition text-left ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#F7F2E7] shadow-xs'
                      : 'text-[#2D2824] hover:bg-[#EFE7DA]'
                  }`}
                >
                  <span className="truncate">{m.label}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-[#F7F2E7]'
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

        {/* GI Cluster Pinpoints */}
        <div className="space-y-2 pt-3 border-t border-[#E3DACB]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C554E] block">
            GI Artisan Clusters
          </span>
          <div className="space-y-2">
            {clusters.map((c) => (
              <div
                key={c.gi}
                className="p-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#1C1917]">{c.name}</span>
                  <span className="text-[9px] font-mono font-bold text-[#8C3826] bg-[#8C3826]/10 px-1 py-0.5 rounded">
                    {c.gi}
                  </span>
                </div>
                <div className="text-[10px] text-[#5C554E] font-mono">
                  {c.count} • Master Verified
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Assurance Card */}
        <div className="p-3 bg-[#1C1917] text-[#F7F2E7] rounded-lg space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#D4AF37] font-bold">
            <span>⚖️</span>
            <span>85% DIRECT ESCROW</span>
          </div>
          <p className="text-[11px] text-[#EFE7DA] leading-relaxed">
            Every transaction is mathematically bound to direct artisan studio bank accounts.
          </p>
          <Link
            href="/shop"
            className="text-[10px] font-mono text-[#D4AF37] hover:underline block pt-1"
          >
            View Live Escrow Ledger
          </Link>
        </div>
      </div>
    </aside>
  );
}
