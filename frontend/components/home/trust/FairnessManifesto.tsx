'use client';

import React from 'react';
import Link from 'next/link';

export default function FairnessManifesto() {
  const pillars = [
    {
      num: '01',
      title: '85% Direct Studio Payout',
      badge: 'Mathematical Transparency',
      desc: 'Middlemen take up to 70% in conventional retail. Kalakriti enforces a transparent, publicly audited price formula on every product: 85% directly to the artisan studio, 10% platform fee, and 5% insured fragile logistics.',
      actionText: 'Explore Price Anatomy',
      actionHref: '/shop',
    },
    {
      num: '02',
      title: 'Craft DNA™ Provenance Seal',
      badge: 'Cryptographic GI Lineage',
      desc: 'Every certified item receives an immutable SHA-256 digital certificate, geo-located master artisan origin coordinates, and natural pigment verification that cannot be replicated by factory machines.',
      actionText: 'Inspect Provenance Certificates',
      actionHref: '/traditions',
    },
    {
      num: '03',
      title: 'Craft Doctor: Circular Repair',
      badge: 'Multimodal AI & Master Guilds',
      desc: 'Heirloom art should outlive generations. When damage occurs, upload a photo to receive instant Multimodal AI structural diagnostics and matching with certified restoration guilds for physical restoration.',
      actionText: 'Submit Craft for Repair',
      actionHref: '/craft-doctor',
    },
  ];

  return (
    <section className="my-16 space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#E2DAD0] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#842A1C] font-semibold block">
            The Kalakriti Manifesto
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141312] mt-1 tracking-tight">
            Built For Cultural Preservation & Direct Fairness
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p) => (
          <div
            key={p.num}
            className="bg-[#FFFFFF] border border-[#E2DAD0] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs hover:border-[#141312] transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#842A1C] bg-[#842A1C]/10 px-2 py-0.5 rounded uppercase">
                  {p.badge}
                </span>
                <span className="font-mono text-base font-bold text-[#C9BEB0]">
                  {p.num}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#141312]">
                {p.title}
              </h3>

              <p className="text-xs text-[#5C5852] leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E2DAD0]">
              <Link
                href={p.actionHref}
                className="text-xs font-mono font-semibold text-[#842A1C] hover:underline"
              >
                {p.actionText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
