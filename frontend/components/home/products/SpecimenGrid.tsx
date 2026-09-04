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
      imageUrl: '/images/crafts/craft-14.jpg',
      category: 'plant-dyes'
    },
    {
      id: '2',
      slug: 'srikalahasti-sacred-pen-kalamkari',
      title: 'Srikalahasti Sacred Pen Kalamkari Silk',
      artisan: 'Master K. Ramaniah',
      region: 'Srikalahasti, Andhra Pradesh',
      giTag: 'GI-19 Certified',
      material: 'Freehand Bamboo Pen on Handloom Silk',
      price: 4830,
      artisanNet: 3570,
      imageUrl: '/images/crafts/craft-18.jpg',
      category: 'plant-dyes'
    },
    {
      id: '3',
      slug: 'kalamkari-hand-painted-floral-fabric',
      title: 'Kalamkari Hand-Painted Floral Vine Fabric',
      artisan: 'Lakshmi Narayana Studio',
      region: 'Andhra Pradesh',
      giTag: 'GI-19 Certified',
      material: 'Natural Indigo & Vegetable Dyes on Cotton',
      price: 2185,
      artisanNet: 1615,
      imageUrl: '/images/crafts/craft-13.jpg',
      category: 'plant-dyes'
    },
    {
      id: '4',
      slug: 'natural-vetiver-grass-coasters',
      title: 'Natural Vetiver & Kusa Grass Coasters (Set of 6)',
      artisan: 'Kaveri River Collective',
      region: 'Thanjavur, Tamil Nadu',
      giTag: 'Artisan Guild Certified',
      material: 'Wild Aromatic Vetiver Grass & Cotton Braiding',
      price: 775,
      artisanNet: 552,
      imageUrl: '/images/crafts/craft-2.jpg',
      category: 'earth-clay'
    },
    {
      id: '5',
      slug: 'handcrafted-heritage-thread-gift-set',
      title: 'Handcrafted Heritage Sacred Thread & Rakhi Gift Set',
      artisan: 'Kashi Sacred Crafts Collective',
      region: 'Varanasi, Uttar Pradesh',
      giTag: 'Kashi Guild Certified',
      material: 'Raw Cotton Cord with Natural Agate Gemstone',
      price: 1000,
      artisanNet: 722,
      imageUrl: '/images/crafts/craft-1.jpg',
      category: 'heritage-silks'
    },
    {
      id: '6',
      slug: 'imperial-persian-cobalt-urn',
      title: 'Imperial Persian Cobalt Ceramic Urn',
      artisan: 'Jaipur Royal Blue Pottery Studio',
      region: 'Amer, Rajasthan',
      giTag: 'GI-244 Certified',
      material: 'Crushed Quartz & Cobalt Glaze',
      price: 2875,
      artisanNet: 2125,
      imageUrl: '/images/crafts/craft-15.jpg',
      category: 'glazed-quartz'
    },
    {
      id: '7',
      slug: 'tribal-sun-deity-bell-metal',
      title: 'Tribal Sun Deity Lost-Wax Bell Metal Idol',
      artisan: 'Bastar Tribal Heritage Guild',
      region: 'Bastar, Chhattisgarh',
      giTag: 'GI-82 Certified',
      material: 'Lost-Wax Bell Metal Alloy',
      price: 3910,
      artisanNet: 2890,
      imageUrl: '/images/crafts/craft-8.jpg',
      category: 'lost-wax-bronze'
    }
  ];

  const filtered = categoryFilter === 'all'
    ? specimens
    : specimens.filter((s) => s.category === categoryFilter);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#E3DACB] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C3826] font-semibold block">
            Living Catalog Specimens
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1 tracking-tight">
            Curated Mastercraft Pieces
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-mono font-medium text-[#8C3826] hover:underline"
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
            className="group bg-[#FAF6EE] border border-[#E3DACB] rounded-xl overflow-hidden shadow-xs hover:border-[#1C1917] transition-colors flex flex-col"
          >
            <Link href={`/products/${item.slug}`} className="block relative aspect-square overflow-hidden bg-[#EFE7DA]">
              <CraftImage
                src={item.imageUrl}
                alt={item.title}
                aspectRatioClass="aspect-square"
                className="group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                <span className="px-2.5 py-1 bg-[#1C1917]/90 backdrop-blur-sm text-[#F7F2E7] rounded text-[10px] font-mono font-bold tracking-wider uppercase">
                  {item.giTag}
                </span>
                <span className="px-2 py-0.5 bg-[#8C3826] text-white rounded text-[9px] font-mono font-semibold uppercase">
                  {item.region}
                </span>
              </div>
            </Link>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#5C554E] uppercase block">
                  Studio: {item.artisan}
                </span>
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-display font-bold text-base text-[#1C1917] group-hover:text-[#8C3826] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-[#5C554E] font-mono">
                  {item.material}
                </p>
              </div>

              {/* Price & Artisan Escrow Breakdown */}
              <div className="pt-3 border-t border-[#E3DACB] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#5C554E] font-mono block">Patron Price</span>
                  <span className="font-display font-bold text-lg text-[#1C1917]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono font-bold text-[#8C3826] bg-[#8C3826]/10 px-2 py-0.5 rounded block">
                    85% DIRECT PAYOUT
                  </span>
                  <span className="text-[11px] font-mono text-[#5C554E] mt-0.5 block">
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
