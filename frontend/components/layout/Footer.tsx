import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1b2d44] text-stone-300 pt-16 pb-12 border-t border-stone-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-700">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏺</span>
              <span className="font-serif text-2xl font-bold text-amber-200">कलाकृति</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              India's first direct-to-artisan multi-vendor craft ecosystem. Verified Geographical Indications (GI), cryptographic provenance certificates, transparent 85% artisan payouts, and circular repair care.
            </p>
            <div className="text-[11px] font-semibold text-amber-300">
              🇮🇳 Celebrating 28 Indian Craft States & Union Territories
            </div>
          </div>

          {/* Customer Explorer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">Discover Crafts</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/shop" className="hover:text-white transition">All GI-Tagged Products</Link></li>
              <li><Link href="/traditions" className="hover:text-white transition">Mithila & Madhubani Art</Link></li>
              <li><Link href="/traditions" className="hover:text-white transition">Jaipur Blue Pottery</Link></li>
              <li><Link href="/traditions" className="hover:text-white transition">Bastar Lost-Wax Bronze</Link></li>
              <li><Link href="/craft-doctor" className="text-emerald-400 hover:text-emerald-300 font-semibold">Craft Doctor (Restoration)</Link></li>
            </ul>
          </div>

          {/* Artisan Collective */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">Artisan Studio</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/artisan/register" className="hover:text-white transition">Apply for Master Verification</Link></li>
              <li><Link href="/artisan/products/new" className="hover:text-white transition">AI Multimodal Cataloging</Link></li>
              <li><Link href="/artisan/dashboard" className="hover:text-white transition">Studio Orders & Escrow</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition">Artisan Login</Link></li>
            </ul>
          </div>

          {/* Admin & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">Trust & Governance</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/admin/moderation" className="hover:text-white transition">GI Moderation Queue</Link></li>
              <li><Link href="/admin/analytics" className="hover:text-white transition">Live Marketplace Metrics</Link></li>
              <li><span className="block text-stone-400">SHA-256 Cryptographic Provenance</span></li>
              <li><span className="block text-stone-400">Razorpay Encrypted Escrow</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Kalakriti (कलाकृति) Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Fair Craft Trade</span>
            <span>Artisan Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
