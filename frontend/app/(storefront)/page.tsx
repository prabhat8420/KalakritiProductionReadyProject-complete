'use client';

import React, { useState } from 'react';
import HeritageHero from '@/components/home/hero/HeritageHero';
import SpecimenGrid from '@/components/home/products/SpecimenGrid';
import LineageScrollSequence from '@/components/home/lineage/LineageScrollSequence';
import FairnessManifesto from '@/components/home/trust/FairnessManifesto';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    /*
     * -mt-16 cancels the global pt-16 from layout.tsx so the full-bleed
     * hero starts at the very top of the page, behind the transparent header.
     * Inner pages don't use this component so they keep their pt-16 offset.
     */
    <main className="flex flex-col w-full -mt-16">
      {/* Full-bleed Hero — escapes all container constraints */}
      <HeritageHero />

      {/* Below-fold content — contained with standard max-width */}
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Verified Living Craft Specimen Grid */}
        <SpecimenGrid categoryFilter={selectedCategory} />

        {/* Signature GSAP Pinned Lineage Story */}
        <LineageScrollSequence />

        {/* Trust & Direct Fairness Manifesto */}
        <FairnessManifesto />
      </div>
    </main>
  );
}

