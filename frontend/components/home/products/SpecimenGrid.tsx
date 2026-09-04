'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CraftImage } from '@/components/ui/CraftImage';

interface SpecimenGridProps {
  categoryFilter?: string;
}

export default function SpecimenGrid({ categoryFilter = 'all' }: SpecimenGridProps) {
  const specimens = [
    {
      id: '1',
      slug: 'tree-of-life-mithila-art',
      title: 'Tree of Life Mithila Folk Art',
      artisan: 'Master Ganesh Jha',
      region: 'Mithila, Bihar',
      giTag: 'GI-187 Certified',
      material: 'Organic Mineral & Plant Dyes',
      price: 3220,
      artisanNet: 2380,
      artisanSharePct: '85%',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
      category: 'plant-dyes'
    },
    {
      id: '2',
      slug: 'royal-jaipur-blue-pottery-vase',
      title: 'Royal Glazed Blue Pottery Urn',
      artisan: 'Kripal Studio Master Artisans',
      region: 'Amer, Rajasthan',
      giTag: 'GI-244 Certified',
      material: 'Crushed Quartz & Cobalt Glaze',
      price: 4850,
      artisanNet: 4122,
      artisanSharePct: '85%',
      imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
      category: 'glazed-quartz'
    },
    {
      id: '3',
      slug: 'bastar-dhokra-tribal-bronze',
      title: 'Bastar Dhokra Lost-Wax Bronze',
      artisan: 'Devnath Baghel',
      region: 'Bastar, Chhattisgarh',
      giTag: 'GI-82 Certified',
      material: 'Lost-Wax Bell Metal Alloy',
      price: 5600,
      artisanNet: 4760,
      artisanSharePct: '85%',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
      category: 'lost-wax-bronze'
    }
  ];

  const filtered = categoryFilter === 'all'
    ? specimens
    : specimens.filter((s) => s.category === categoryFilter);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#E2DAD0] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#842A1C] font-semibold block">
            Living Catalog Specimens
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141312] mt-1 tracking-tight">
            Curated Mastercraft Pieces
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-mono font-medium text-[#842A1C] hover:underline"
        >
          Explore All 28 States Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-[#FFFFFF] border border-[#E2DAD0] rounded-xl overflow-hidden shadow-xs hover:border-[#141312] transition-colors flex flex-col"
          >
            <Link href={`/products/${item.slug}`} className="block relative aspect-square overflow-hidden bg-[#EBE5DC]">
              <CraftImage
                src={item.imageUrl}
                alt={item.title}
                aspectRatioClass="aspect-square"
                className="group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                <span className="px-2.5 py-1 bg-[#141312]/90 backdrop-blur-sm text-[#F5F0EB] rounded text-[10px] font-mono font-bold tracking-wider uppercase">
                  {item.giTag}
                </span>
                <span className="px-2 py-0.5 bg-[#842A1C] text-white rounded text-[9px] font-mono font-semibold uppercase">
                  {item.region}
                </span>
              </div>
            </Link>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#5C5852] uppercase block">
                  Studio: {item.artisan}
                </span>
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-display font-bold text-base text-[#141312] group-hover:text-[#842A1C] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-[#5C5852] font-mono">
                  {item.material}
                </p>
              </div>

              {/* Price & Artisan Escrow Breakdown */}
              <div className="pt-3 border-t border-[#E2DAD0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#5C5852] font-mono block">Patron Price</span>
                  <span className="font-display font-bold text-lg text-[#141312]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono font-bold text-[#842A1C] bg-[#842A1C]/10 px-2 py-0.5 rounded block">
                    85% DIRECT PAYOUT
                  </span>
                  <span className="text-[11px] font-mono text-[#5C5852] mt-0.5 block">
                    ₹{item.artisanNet.toLocaleString('en-IN')} to Studio
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
