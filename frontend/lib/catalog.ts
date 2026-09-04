export interface ProductData {
  id: string;
  title: string;
  slug: string;
  description_en: string;
  description_hi?: string;
  base_price: number;
  artisan_share: number;
  platform_fee: number;
  delivery_fee: number;
  total_price: number;
  status: string;
  is_gi_certified: boolean;
  tradition: {
    id: string;
    name: string;
    region: string;
    slug: string;
  };
  artisan: {
    id: string;
    display_name: string;
    region: string;
    craft_tradition: string;
    avg_rating: number;
    review_count: number;
    years_active: number;
    bio: string;
  };
  images: Array<{ id: string; image_url: string; is_primary: boolean }>;
  variants: Array<{ id: string; name: string; sku: string; price: number }>;
  certification?: {
    certificate_id: string;
    certificate_hash: string;
    qr_code_url: string;
    craft_tradition: string;
    artisan_name: string;
    origin_region: string;
    raw_materials: string;
    heritage_registry_badge: string;
    issued_at?: string;
  };
}

export const SEED_PRODUCTS: ProductData[] = [
  {
    id: "p1-tree-of-life",
    title: "Tree of Life Mithila Folk Art",
    slug: "tree-of-life-mithila-art",
    description_en: "Hand-painted on handmade treated paper using bamboo dip pens and organic mineral dyes by 5th-generation master artisans of Madhubani.",
    description_hi: "प्राकृतिक रंगों और बांस की कलम से हस्तनिर्मित मधुबनी जीवन वृक्ष चित्रकला।",
    base_price: 2800.0,
    artisan_share: 2380.0,
    platform_fee: 280.0,
    delivery_fee: 140.0,
    total_price: 3220.0,
    status: "published",
    is_gi_certified: true,
    tradition: {
      id: "t1",
      name: "Madhubani Painting",
      region: "Mithila, Bihar",
      slug: "madhubani"
    },
    artisan: {
      id: "art-1",
      display_name: "Mithila Heritage Guild (Ganesh Jha)",
      region: "Madhubani, Bihar",
      craft_tradition: "Madhubani Painting",
      avg_rating: 4.9,
      review_count: 42,
      years_active: 28,
      bio: "Master artisan with 28 years of hereditary Madhubani lineage, recognized for preserving ancient Kachni and Bharni line-art techniques."
    },
    images: [
      { id: "img-1", image_url: "/images/crafts/craft-14.jpg", is_primary: true }
    ],
    variants: [
      { id: "var-1", name: "Framed 24x18 Canvas", sku: "KLK-MAD-TOL-01", price: 3220.0 }
    ],
    certification: {
      certificate_id: "KLK-CERT-BR-MAD-202608-A91B3C5D",
      certificate_hash: "d8f24a1b0c9e7f53a2b4e8c1d5f7a9b0c2e4f6a8b1c3d5e7f9a1b3c5d7e9f1a3",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3DKLK-CERT-BR-MAD-202608-A91B3C5D",
      craft_tradition: "Madhubani Painting",
      artisan_name: "Ganesh Jha",
      origin_region: "Mithila, Bihar",
      raw_materials: "Handmade Paper, Natural Plant Pigments",
      heritage_registry_badge: "GI Registered Lineage (GI-105)"
    }
  },
  {
    id: "p2-kalamkari-art",
    title: "Srikalahasti Sacred Pen Kalamkari Silk",
    slug: "srikalahasti-sacred-pen-kalamkari",
    description_en: "Authentic freehand bamboo pen drawing with natural myrobalan and alum dye baths on pure handloom silk.",
    description_hi: "श्रीकालहस्ती की पारंपरिक कलमकारी हस्तचित्रित शुद्ध रेशम कला।",
    base_price: 4200.0,
    artisan_share: 3570.0,
    platform_fee: 420.0,
    delivery_fee: 210.0,
    total_price: 4830.0,
    status: "published",
    is_gi_certified: true,
    tradition: {
      id: "t4",
      name: "Srikalahasti Kalamkari",
      region: "Chittoor, Andhra Pradesh",
      slug: "kalamkari"
    },
    artisan: {
      id: "art-4",
      display_name: "Kalamkari Master Studio (Ramaniah)",
      region: "Srikalahasti, AP",
      craft_tradition: "Pen Kalamkari",
      avg_rating: 4.96,
      review_count: 58,
      years_active: 32,
      bio: "Heritage master drawing mythological themes using fermented natural jaggery and iron mordants."
    },
    images: [
      { id: "img-4", image_url: "/images/crafts/craft-18.jpg", is_primary: true }
    ],
    variants: [
      { id: "var-4", name: "Hand-Painted Silk Wall Hanging", sku: "KLK-KAL-SLK-01", price: 4830.0 }
    ],
    certification: {
      certificate_id: "KLK-CERT-AP-KAL-202609-C82D119A",
      certificate_hash: "3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3DKLK-CERT-AP-KAL-202609-C82D119A",
      craft_tradition: "Srikalahasti Kalamkari",
      artisan_name: "K. Ramaniah",
      origin_region: "Srikalahasti, Andhra Pradesh",
      raw_materials: "Mulberry Silk, Natural Madder, Myrobalan",
      heritage_registry_badge: "GI Registered Lineage (GI-19)"
    }
  },
  {
    id: "p3-floral-kalamkari",
    title: "Kalamkari Hand-Painted Floral Vine Fabric",
    slug: "kalamkari-hand-painted-floral-fabric",
    description_en: "Intricate botanical floral vine motifs crafted with natural indigo and vegetable extracts on handwoven cotton fabric.",
    description_hi: "हाथ से चित्रित पारंपरिक प्राकृतिक रंगों का कलमकारी सूती वस्त्र।",
    base_price: 1900.0,
    artisan_share: 1615.0,
    platform_fee: 190.0,
    delivery_fee: 95.0,
    total_price: 2185.0,
    status: "published",
    is_gi_certified: true,
    tradition: {
      id: "t4",
      name: "Srikalahasti Kalamkari",
      region: "Andhra Pradesh",
      slug: "kalamkari"
    },
    artisan: {
      id: "art-4",
      display_name: "Kalamkari Master Studio",
      region: "Andhra Pradesh",
      craft_tradition: "Pen Kalamkari",
      avg_rating: 4.9,
      review_count: 36,
      years_active: 22,
      bio: "Mastering natural block and pen botanical drawings for luxury heirloom textiles."
    },
    images: [
      { id: "img-13", image_url: "/images/crafts/craft-13.jpg", is_primary: true }
    ],
    variants: [
      { id: "var-13", name: "2.5 Meter Craft Fabric", sku: "KLK-KAL-FAB-02", price: 2185.0 }
    ],
    certification: {
      certificate_id: "KLK-CERT-AP-KAL-202609-F91A2B3C",
      certificate_hash: "9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3DKLK-CERT-AP-KAL-202609-F91A2B3C",
      craft_tradition: "Kalamkari Textile",
      artisan_name: "Lakshmi Narayana",
      origin_region: "Andhra Pradesh",
      raw_materials: "Handspun Cotton, Botanical Pigments",
      heritage_registry_badge: "GI Registered Lineage (GI-19)"
    }
  },
  {
    id: "p4-vetiver-coasters",
    title: "Natural Vetiver & Kusa Grass Coasters (Set of 6)",
    slug: "natural-vetiver-grass-coasters",
    description_en: "Hand-braided eco-friendly aromatic vetiver (Khus) and river kusa grass table coasters handcrafted by rural women artisan collectives.",
    description_hi: "प्राकृतिक खस और कुश घास से हस्तनिर्मित पर्यावरण-अनुकूल कोस्टर सेट।",
    base_price: 650.0,
    artisan_share: 552.5,
    platform_fee: 65.0,
    delivery_fee: 60.0,
    total_price: 775.0,
    status: "published",
    is_gi_certified: false,
    tradition: {
      id: "t5",
      name: "Natural Grass Weaving",
      region: "Tamil Nadu & Kerala",
      slug: "grass-weaving"
    },
    artisan: {
      id: "art-5",
      display_name: "Kaveri River Grass Artisans",
      region: "Thanjavur, Tamil Nadu",
      craft_tradition: "Grass Weaving",
      avg_rating: 4.85,
      review_count: 89,
      years_active: 16,
      bio: "Sustainably harvesting wild aromatic grass fibers to craft zero-waste daily living ware."
    },
    images: [
      { id: "img-2", image_url: "/images/crafts/craft-2.jpg", is_primary: true }
    ],
    variants: [
      { id: "var-2", name: "Set of 6 Coasters", sku: "KLK-VET-CST-06", price: 775.0 }
    ],
    certification: {
      certificate_id: "KLK-CERT-TN-GRS-202609-E4A28B10",
      certificate_hash: "2a4b6c8d0e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3DKLK-CERT-TN-GRS-202609-E4A28B10",
      craft_tradition: "Wild Grass Weaving",
      artisan_name: "Meenakshi Ammal",
      origin_region: "Tamil Nadu",
      raw_materials: "Aromatic Vetiver Grass, Cotton Thread",
      heritage_registry_badge: "Artisan Guild Certified"
    }
  },
  {
    id: "p5-sacred-thread-box",
    title: "Handcrafted Heritage Sacred Thread & Rakhi Gift Set",
    slug: "handcrafted-heritage-thread-gift-set",
    description_en: "Handmade unbleached cotton cord with natural agate gemstone and organic vermilion & rice keepsake glass vials in recyclable kraft gift box.",
    description_hi: "प्राकृतिक अकीक रत्न और जैविक सिंदूर के साथ हस्तनिर्मित पावन रक्षा सूत्र बॉक्स।",
    base_price: 850.0,
    artisan_share: 722.5,
    platform_fee: 85.0,
    delivery_fee: 65.0,
    total_price: 1000.0,
    status: "published",
    is_gi_certified: false,
    tradition: {
      id: "t6",
      name: "Handmade Cord & Stone Craft",
      region: "Varanasi, Uttar Pradesh",
      slug: "thread-craft"
    },
    artisan: {
      id: "art-6",
      display_name: "Kashi Sacred Crafts Collective",
      region: "Varanasi, UP",
      craft_tradition: "Sacred Thread Weaving",
      avg_rating: 4.92,
      review_count: 110,
      years_active: 20,
      bio: "Preserving sacred ceremonial cotton and semi-precious stone braiding traditions of Kashi."
    },
    images: [
      { id: "img-1", image_url: "/images/crafts/craft-1.jpg", is_primary: true }
    ],
    variants: [
      { id: "var-1b", name: "Complete Ceremony Gift Box", sku: "KLK-KSH-THD-01", price: 1000.0 }
    ],
    certification: {
      certificate_id: "KLK-CERT-UP-VAR-202609-B7C91D4E",
      certificate_hash: "5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3DKLK-CERT-UP-VAR-202609-B7C91D4E",
      craft_tradition: "Sacred Thread Craft",
      artisan_name: "Pandit Ramkishore",
      origin_region: "Varanasi, Uttar Pradesh",
      raw_materials: "Raw Cotton, Agate Stone, Organic Vermilion",
      heritage_registry_badge: "Kashi Guild Certified"
    }
  },
  {
    id: "p6-jaipur-urn",
    title: "Imperial Persian Cobalt Ceramic Urn",
    slug: "imperial-persian-cobalt-urn",
    description_en: "Hand-thrown quartz clay glazed with natural cobalt oxide and copper sulphate, refired in traditional wood kilns.",
    description_hi: "क्वार्ट्ज और प्राकृतिक कोबाल्ट ऑक्साइड से हस्तनिर्मित पारंपरिक जयपुर ब्लू पॉटरी फूलदान।",
    base_price: 2500.0,
    artisan_share: 2125.0,
    platform_fee: 250.0,
    delivery_fee: 125.0,
    total_price: 2875.0,
    status: "published",
    is_gi_certified: true,
    tradition: {
      id: "t2",
      name: "Jaipur Blue Pottery",
      region: "Jaipur, Rajasthan",
      slug: "jaipur-blue-pottery"
    },
    artisan: {
      id: "art-2",
      display_name: "Jaipur Royal Blue Pottery Studio",
      region: "Jaipur, Rajasthan",
      craft_tradition: "Jaipur Blue Pottery",
      avg_rating: 4.95,
      review_count: 68,
      years_active: 34,
      bio: "5th-generation master potter preserving the Sawai Ram Singh II royal craft lineage using non-clay quartz paste."
    },
    images: [
      { id: "img-15", image_url: "/images/crafts/craft-15.jpg", is_primary: true }
    ],
    variants: [
      { id: "var-2", name: "14-inch Glazed Urn", sku: "KLK-JBP-URN-01", price: 2875.0 }
    ],
    certification: {
      certificate_id: "KLK-CERT-RJ-POT-202608-F4C9D91E",
      certificate_hash: "a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3DKLK-CERT-RJ-POT-202608-F4C9D91E",
      craft_tradition: "Jaipur Blue Pottery",
      artisan_name: "Ram Narayan Kumbhar",
      origin_region: "Jaipur, Rajasthan",
      raw_materials: "Quartz Powder, Natural Cobalt Glaze",
      heritage_registry_badge: "GI Registered Lineage (GI-13)"
    }
  },
  {
    id: "p7-dhokra-sun",
    title: "Tribal Sun Deity Lost-Wax Bell Metal Idol",
    slug: "tribal-sun-deity-bell-metal",
    description_en: "Ancient lost-wax bell metal casting using beeswax threads, terracotta core molds, and riverbed clay from Bastar.",
    description_hi: "बस्तर की 4000 वर्ष प्राचीन ढोकरा ढलाई तकनीक से निर्मित पीतल सूर्य देव प्रतिमा।",
    base_price: 3400.0,
    artisan_share: 2890.0,
    platform_fee: 340.0,
    delivery_fee: 170.0,
    total_price: 3910.0,
    status: "published",
    is_gi_certified: true,
    tradition: {
      id: "t3",
      name: "Dhokra Lost-Wax Bell Metal",
      region: "Bastar, Chhattisgarh",
      slug: "dhokra"
    },
    artisan: {
      id: "art-3",
      display_name: "Bastar Tribal Heritage Guild",
      region: "Bastar, Chhattisgarh",
      craft_tradition: "Dhokra Bronze",
      avg_rating: 4.88,
      review_count: 54,
      years_active: 30,
      bio: "Hereditary metal smiths continuing the 4,000-year-old Indus Valley lost-wax casting craft."
    },
    images: [
      { id: "img-8", image_url: "/images/crafts/craft-8.jpg", is_primary: true }
    ],
    variants: [
      { id: "var-3", name: "10-inch Solid Bronze Idol", sku: "KLK-DHK-SUN-01", price: 3910.0 }
    ],
    certification: {
      certificate_id: "KLK-CERT-CG-DHK-202608-98B2C4E6",
      certificate_hash: "7f8e9d0c1b2a34567890abcdef1234567890abcdef1234567890abcdef123456",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3DKLK-CERT-CG-DHK-202608-98B2C4E6",
      craft_tradition: "Dhokra Lost-Wax Bronze",
      artisan_name: "Sukhram Ghadwa",
      origin_region: "Bastar, Chhattisgarh",
      raw_materials: "Bell Metal, Natural Beeswax",
      heritage_registry_badge: "GI Registered Lineage (GI-83)"
    }
  }
];
