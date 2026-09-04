'use client';

import React, { useState } from 'react';
import HeritageHero from '@/components/home/hero/HeritageHero';
import CuratorSidebar from '@/components/home/sidebar/CuratorSidebar';
import SpecimenGrid from '@/components/home/products/SpecimenGrid';
import LineageScrollSequence from '@/components/home/lineage/LineageScrollSequence';
import FairnessManifesto from '@/components/home/trust/FairnessManifesto';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Top Hero & Curator Taxonomy Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Persistent Curator Sidebar Rail on Desktop */}
        <CuratorSidebar
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Central Editorial Canvas */}
        <div className="flex-1 w-full space-y-12 min-w-0">
          <HeritageHero />
          <SpecimenGrid categoryFilter={selectedCategory} />
        </div>
      </div>

      {/* Signature GSAP Pinned Lineage Story */}
      <LineageScrollSequence />

      {/* Trust & Direct Fairness Manifesto */}
      <FairnessManifesto />
    </main>
  );
}
