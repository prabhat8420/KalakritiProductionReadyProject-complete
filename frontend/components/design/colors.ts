/**
 * Kalakriti Warm Heritage Beige Color Token Architecture
 * Derived directly from Indian raw linen, sandalwood, mineral pigments, natural dye vats, and handmade parchment.
 */
export const CraftColors = {
  // Surfaces & Backgrounds (Warm Heritage Beige)
  paper: {
    mulberry: '#F7F2E7',      // Primary warm beige canvas
    parchment: '#EFE7DA',     // Secondary warm sand/parchment surface
    rawSilk: '#FAF6EE',       // Card surface off-white warm beige
    card: '#FAF6EE',          // High-purity warm beige specimen card
    border: '#E3DACB',        // Soft architectural beige line rule
    borderDark: '#CFC3B0',    // Focused border rule
  },

  // Inks & Typography
  ink: {
    kohl: '#1C1917',          // Warm lampblack kohl
    charcoal: '#2D2824',      // Deep bistre ink
    slate: '#5C554E',         // Secondary descriptive warm slate
    muted: '#8C8379',         // Micro-captions & timestamps
  },

  // Pigments & Accents (Natural Vats & Minerals)
  pigment: {
    manjistha: '#8C3826',     // Warm Madder root crimson
    manjisthaDark: '#6E2819', // Deep boiled madder
    neel: '#1E2C3D',          // Indigo vat blue
    neelLight: '#2F435C',     // Indigo wash
    dhokraBrass: '#B8860B',   // Antique brass / Dhokra bell metal gold
    dhokraDark: '#8F6808',    // Oxidized brass
    haldiTurmeric: '#D49726', // Raw Kasturi turmeric yellow
    verdigris: '#2D5A43',     // Copper patina & neem green (Craft Doctor)
    terracottaKutch: '#B85D38', // Fired Kutch earthenware clay
  },

  // Status & Provenance Badges
  status: {
    verifiedBg: '#E8F0EA',
    verifiedText: '#1B432E',
    verifiedBorder: '#BDD4C3',
    giBg: '#F5EFE0',
    giText: '#7A5B15',
    giBorder: '#DEC997',
    artisanShareBg: '#F7EDE9',
    artisanShareText: '#7A2617',
    artisanShareBorder: '#E8BFB6',
  }
} as const;
