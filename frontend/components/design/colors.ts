/**
 * Kalakriti Material-Grounded Color Token Architecture
 * Derived directly from Indian mineral pigments, natural dye vats, metallurgical alloys, and handmade paper.
 */
export const CraftColors = {
  // Surfaces & Backgrounds
  paper: {
    mulberry: '#F5F0EB',      // Unbleached handmade rag paper & Kutch raw cotton canvas
    parchment: '#EBE5DC',     // Sun-dried palm leaf & treated handmade paper
    rawSilk: '#FDFBF7',       // Wild Tussar silk off-white
    card: '#FFFFFF',          // High-purity specimen surface
    border: '#E2DAD0',        // Architectural line rule
    borderDark: '#C9BEB0',    // Focused border rule
  },

  // Inks & Typography
  ink: {
    kohl: '#141312',          // Lampblack soot from earthen mustard-oil lamps (Kajal)
    charcoal: '#2D2B28',      // Crushed charcoal & mineral graphite
    slate: '#5C5852',         // Secondary descriptive ink
    muted: '#8A847C',         // Micro-captions & timestamps
  },

  // Pigments & Accents (Natural Vats & Minerals)
  pigment: {
    manjistha: '#842A1C',     // Fermented Rubia cordifolia (Madder root) natural crimson
    manjisthaDark: '#671E13', // Deep boiled madder root
    neel: '#1B2738',          // Indigofera tinctoria fermented vat blue (Ajrakh / Blue Pottery)
    neelLight: '#2A3C54',     // Light indigo wash
    dhokraBrass: '#C29B38',   // Lost-wax cast copper-tin-zinc bell metal gold
    dhokraDark: '#997624',    // Antique oxidized brass
    haldiTurmeric: '#D99B26', // Raw Kasturi turmeric yellow
    verdigris: '#2D5A43',     // Copper patina & neem botanical green (Craft Doctor)
    terracottaKutch: '#B85D38', // Fired Kutch earthenware clay
  },

  // Status & Provenance Badges
  status: {
    verifiedBg: '#EAF3ED',
    verifiedText: '#1E4834',
    verifiedBorder: '#BBD8C5',
    giBg: '#F8F3E6',
    giText: '#7B5E1A',
    giBorder: '#E2CF9F',
    artisanShareBg: '#FBF0ED',
    artisanShareText: '#732115',
    artisanShareBorder: '#EFCAC2',
  }
} as const;
