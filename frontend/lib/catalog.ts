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
      { id: "img-1", image_url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80", is_primary: true }
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
    id: "p2-jaipur-urn",
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
      { id: "img-2", image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", is_primary: true }
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
    id: "p3-dhokra-sun",
    title: "Tribal Sun Deity Bell Metal Idol",
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
      { id: "img-3", image_url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80", is_primary: true }
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
