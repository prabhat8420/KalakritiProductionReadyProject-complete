import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#141312] text-[#EBE5DC] pt-16 pb-12 border-t border-[#E2DAD0]/20 mt-auto">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#E2DAD0]/15">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🏺</span>
              <div>
                <span className="font-display text-2xl font-bold text-[#F5F0EB]">कलाकृति</span>
                <span className="text-[10px] font-mono tracking-widest text-[#C29B38] block -mt-1 uppercase">
                  LIVING CRAFT ARCHIVES
                </span>
              </div>
            </div>
            <p className="text-xs text-[#EBE5DC]/80 leading-relaxed font-normal">
              India's first direct-to-artisan multi-vendor craft ecosystem. Verified Geographical Indications (GI), cryptographic provenance certificates, transparent 85% artisan payouts, and circular repair care.
            </p>
            <div className="text-[11px] font-mono font-medium text-[#C29B38] bg-[#C29B38]/10 px-2.5 py-1 rounded inline-block">
              🇮🇳 Preserving 28 Indian State Craft Lineages
            </div>
          </div>

          {/* Customer Explorer */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C29B38]">
              Discover Crafts
            </h4>
            <ul className="space-y-2 text-xs text-[#EBE5DC]/80 font-mono">
              <li><Link href="/shop" className="hover:text-white transition-colors">All GI-Tagged Products</Link></li>
              <li><Link href="/traditions" className="hover:text-white transition-colors">Mithila & Madhubani Art</Link></li>
              <li><Link href="/traditions" className="hover:text-white transition-colors">Jaipur Blue Pottery</Link></li>
              <li><Link href="/traditions" className="hover:text-white transition-colors">Bastar Lost-Wax Bronze</Link></li>
              <li><Link href="/craft-doctor" className="text-[#52B788] hover:text-[#74C69D] font-semibold">Craft Doctor (Restoration)</Link></li>
            </ul>
          </div>

          {/* Artisan Collective */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C29B38]">
              Artisan Studio
            </h4>
            <ul className="space-y-2 text-xs text-[#EBE5DC]/80 font-mono">
              <li><Link href="/artisan/register" className="hover:text-white transition-colors">Apply for Master Verification</Link></li>
              <li><Link href="/artisan/products/new" className="hover:text-white transition-colors">AI Multimodal Cataloging</Link></li>
              <li><Link href="/artisan/dashboard" className="hover:text-white transition-colors">Studio Orders & Escrow</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Artisan Login</Link></li>
            </ul>
          </div>

          {/* Admin & Trust */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C29B38]">
              Trust & Governance
            </h4>
            <ul className="space-y-2 text-xs text-[#EBE5DC]/80 font-mono">
              <li><Link href="/admin/moderation" className="hover:text-white transition-colors">GI Moderation Queue</Link></li>
              <li><Link href="/admin/analytics" className="hover:text-white transition-colors">Live Marketplace Metrics</Link></li>
              <li><span className="block text-[#EBE5DC]/60">SHA-256 Cryptographic Provenance</span></li>
              <li><span className="block text-[#EBE5DC]/60">Razorpay Encrypted Escrow</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#EBE5DC]/60">
          <p>© {new Date().getFullYear()} Kalakriti (कलाकृति) Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#EBE5DC] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#EBE5DC] cursor-pointer">Terms of Fair Craft Trade</span>
            <span className="hover:text-[#EBE5DC] cursor-pointer">Artisan Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
