import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase text-orange-800">Operational Command</span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">Admin Governance & Moderation</h1>
        <p className="text-xs text-stone-600 mt-1">
          Manage product authenticity approvals, observe financial payouts, and review audit trail compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module 1: Product Moderation */}
        <Link
          href="/admin/moderation"
          className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-[#c55337] hover:shadow-md transition space-y-3"
        >
          <span className="text-3xl">🛡️</span>
          <h3 className="font-serif font-bold text-stone-900 text-base">Product Moderation Queue</h3>
          <p className="text-xs text-stone-600">
            Review pending AI catalog submissions, inspect natural dye formulas, and issue immutable SHA-256 Craft DNA certificates.
          </p>
          <span className="text-xs font-bold text-[#c55337] block pt-2">Open Moderation →</span>
        </Link>

        {/* Module 2: Operational Analytics */}
        <Link
          href="/admin/analytics"
          className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-emerald-700 hover:shadow-md transition space-y-3"
        >
          <span className="text-3xl">📊</span>
          <h3 className="font-serif font-bold text-stone-900 text-base">Marketplace Analytics</h3>
          <p className="text-xs text-stone-600">
            Live Gross Marketplace Volume (GMV), 85% artisan direct payouts ledger, and cluster health monitoring.
          </p>
          <span className="text-xs font-bold text-emerald-800 block pt-2">View Analytics →</span>
        </Link>

        {/* Module 3: Artisan Management */}
        <Link
          href="/shop"
          className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-blue-700 hover:shadow-md transition space-y-3"
        >
          <span className="text-3xl">🏺</span>
          <h3 className="font-serif font-bold text-stone-900 text-base">Live Storefront Catalog</h3>
          <p className="text-xs text-stone-600">
            Inspect all active products across 28 states with live Craft DNA QR codes and verified purchase reviews.
          </p>
          <span className="text-xs font-bold text-blue-800 block pt-2">View Storefront →</span>
        </Link>
      </div>
    </div>
  );
}
