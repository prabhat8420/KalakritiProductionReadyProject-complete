'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function LineageScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Mitti & Vanaspati: Raw Material Levigation',
      element: 'Kutch Clay & Madder Root',
      desc: 'Mineral clays, river silt, and fermented botanical dyes (Manjistha, Turmeric, Indigo) are hand-levigated according to 400-year-old hereditary treatises.',
      tag: 'Phase 1 • Earth Levigation',
      color: '#B85D38',
      icon: '🌿',
      metrics: '100% Organic Minerals • Zero Petrochemicals'
    },
    {
      num: '02',
      title: 'Hath Ka Kaam: Bamboo Pen & Lost-Wax Casting',
      element: 'Indus Valley Lineage',
      desc: 'Master artisans draw freehand lines with frayed bamboo twigs or cast molten bell metal in beeswax moulds without industrial stencils or assembly lines.',
      tag: 'Phase 2 • Sacred Handcrafting',
      color: '#C29B38',
      icon: '✍️',
      metrics: '42 to 90 Hours of Hereditary Labor Per Piece'
    },
    {
      num: '03',
      title: 'Provenance & Nyaya: Craft DNA & 85% Direct Escrow',
      element: 'Digital Authenticity',
      desc: 'Every completed specimen receives an immutable SHA-256 digital certificate, QR verification tag, and an automated 85% direct payout split to the artisan studio.',
      tag: 'Phase 3 • Fair Provenance',
      color: '#842A1C',
      icon: '📜',
      metrics: 'SHA-256 Provenance Hash • 85% Escrow Release'
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Step trigger transitions
      steps.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `#lineage-card-${index}`,
          start: 'top center+=100',
          end: 'bottom center-=100',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="my-16 space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#E2DAD0] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#842A1C] font-semibold block">
            Signature Lineage Sequence
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141312] mt-1 tracking-tight">
            Mitti Se Murti: The Three Sacred Stages
          </h2>
        </div>
        <p className="text-xs text-[#5C5852] font-mono max-w-sm">
          Scroll to explore the transformative lifecycle of GI-certified Indian crafts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Progress Compass (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 bg-[#FFFFFF] border border-[#E2DAD0] rounded-xl p-6 shadow-sm space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#5C5852] block">
            Lineage Progression
          </span>

          <div className="space-y-4">
            {steps.map((s, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer p-3.5 rounded-lg border transition ${
                    isActive
                      ? 'border-[#141312] bg-[#F5F0EB] shadow-xs'
                      : 'border-transparent hover:bg-[#FDFBF7] text-[#5C5852]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#141312] text-[#F5F0EB]' : 'bg-[#EBE5DC] text-[#5C5852]'
                      }`}
                    >
                      {s.num}
                    </span>
                    <span className="font-display text-sm font-semibold text-[#141312]">
                      {s.element}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-[#FDFBF7] border border-[#E2DAD0] rounded-lg text-xs space-y-1">
            <span className="font-mono text-[10px] uppercase text-[#842A1C] font-bold block">
              Direct Value Guarantee
            </span>
            <p className="text-[11px] text-[#5C5852] leading-tight">
              Unlike industrial middlemen taking 70% markups, 85% of patron price transfers directly to the studio.
            </p>
          </div>
        </div>

        {/* Right Scrollable Story Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              id={`lineage-card-${idx}`}
              className={`p-6 sm:p-8 rounded-xl border transition-all duration-300 bg-[#FFFFFF] ${
                activeStep === idx
                  ? 'border-[#141312] shadow-md'
                  : 'border-[#E2DAD0] opacity-80'
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#E2DAD0] pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#842A1C] font-bold">
                      {s.tag}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#141312]">
                      {s.title}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xl font-bold text-[#EBE5DC]">{s.num}</span>
              </div>

              <p className="text-sm text-[#2D2B28] leading-relaxed mb-6 font-normal">
                {s.desc}
              </p>

              <div className="p-3.5 bg-[#F5F0EB] rounded-lg border border-[#E2DAD0] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#141312] font-semibold">{s.metrics}</span>
                <span className="text-[#842A1C] font-bold">Verified Archival Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
