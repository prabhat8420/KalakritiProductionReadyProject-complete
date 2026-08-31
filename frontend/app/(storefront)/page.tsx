import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1b2d44] text-white py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-stone-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <span>🏺</span>
            <span>Preserving Indian Heritage Crafts with Transparent Provenance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-stone-50 leading-tight">
            Direct From Master Artisans. <br />
            <span className="text-amber-300 font-serif italic">Pure Lineage, No Middlemen.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Discover rare GI-certified Madhubani paintings, Jaipur glazed blue pottery, and Bastar tribal bronze castings. Every piece features cryptographic proof of origin, transparent pricing, and circular restoration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl bg-[#c55337] text-white font-bold text-sm hover:bg-[#a5402a] transition shadow-lg"
            >
              Explore Craft Catalog
            </Link>
            <Link
              href="/craft-doctor"
              className="px-8 py-3.5 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition shadow-lg flex items-center gap-2"
            >
              <span>🩺</span> Craft Doctor (Damage Repair)
            </Link>
            <Link
              href="/artisan/register"
              className="px-8 py-3.5 rounded-xl border border-stone-500 text-stone-200 font-bold text-sm hover:bg-white/10 transition"
            >
              Join as Master Artisan
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase text-[#c55337] tracking-wider">Why Kalakriti?</span>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Built For Cultural Preservation & Fairness</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Transparent Pricing */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl text-[#c55337]">
              💰
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">85% Direct Artisan Share</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We mathematically display our exact price breakdown on every product page: 85% to the artisan studio, 10% platform fee, and 5% insured fragile logistics.
            </p>
          </div>

          {/* Pillar 2: Craft DNA Certificate */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl text-blue-800">
              📜
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">Craft DNA™ Certificate</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Each approved item receives an immutable SHA-256 provenance hash and dynamic QR code linking to natural pigment verification and hereditary master credentials.
            </p>
          </div>

          {/* Pillar 3: Craft Doctor */}
          <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl text-emerald-800">
              🩺
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">Craft Doctor (Restoration)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Circular economy for handmade crafts. Upload a photo of damaged craftwork to receive Multimodal AI damage diagnosis and matching with certified restoration guilds.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Traditions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase text-[#c55337] tracking-wider">Heritage Lineages</span>
            <h2 className="text-2xl font-serif font-bold text-stone-900">Explore Timeless Traditions</h2>
          </div>
          <Link href="/traditions" className="text-xs font-bold text-[#c55337] hover:underline">
            View All 28 States →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tradition 1 */}
          <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="h-48 bg-stone-200 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"
                alt="Madhubani Painting"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-900/90 text-amber-200 rounded text-[10px] font-bold uppercase tracking-wider">
                Bihar • GI Tagged
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#c55337] transition">
                Madhubani Folk Painting
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2">
                Ancient geometric line art using natural plant dyes, bamboo twigs, and organic turmeric pigments.
              </p>
              <Link href="/shop" className="text-xs font-bold text-[#c55337] block pt-2">
                Browse Collection →
              </Link>
            </div>
          </div>

          {/* Tradition 2 */}
          <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="h-48 bg-stone-200 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                alt="Jaipur Blue Pottery"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-blue-900/90 text-blue-200 rounded text-[10px] font-bold uppercase tracking-wider">
                Rajasthan • GI Tagged
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#c55337] transition">
                Jaipur Blue Pottery
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2">
                Non-clay glazed pottery handcrafted from quartz stone powder, raw Egyptian paste, and cobalt blue glazes.
              </p>
              <Link href="/shop" className="text-xs font-bold text-[#c55337] block pt-2">
                Browse Collection →
              </Link>
            </div>
          </div>

          {/* Tradition 3 */}
          <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="h-48 bg-stone-200 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80"
                alt="Dhokra Bell Metal"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-950/90 text-amber-200 rounded text-[10px] font-bold uppercase tracking-wider">
                Chhattisgarh • 4,000 Yr Lineage
              </span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#c55337] transition">
                Bastar Dhokra Bronze
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2">
                Ancient non-ferrous lost-wax bell metal casting dating back to the Indus Valley Dancing Girl tradition.
              </p>
              <Link href="/shop" className="text-xs font-bold text-[#c55337] block pt-2">
                Browse Collection →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
