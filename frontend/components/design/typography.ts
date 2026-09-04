/**
 * Kalakriti Typography Architecture
 * - Display / Titles: Cinzel & Cormorant Garamond (Chiseled epigraphic dignity & archival script)
 * - Narrative / UI: Plus Jakarta Sans (Geometric legibility)
 * - Provenance / Hashes: JetBrains Mono (Cryptographic integrity)
 */
export const CraftTypography = {
  fonts: {
    display: 'var(--font-cinzel), serif',
    editorial: 'var(--font-cormorant), serif',
    sans: 'var(--font-jakarta), sans-serif',
    mono: 'var(--font-mono), monospace',
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    tighter: '-0.03em',
    tight: '-0.015em',
    normal: '0em',
    wide: '0.04em',
    widest: '0.12em',
  }
} as const;
