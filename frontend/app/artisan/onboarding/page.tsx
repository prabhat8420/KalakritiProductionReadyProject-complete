'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { artisanService } from '@/services/artisan.service';

export default function ArtisanOnboardingPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [craftTradition, setCraftTradition] = useState('Madhubani Painting');
  const [region, setRegion] = useState('');
  const [yearsActive, setYearsActive] = useState('5');
  const [bio, setBio] = useState('');
  const [workshopAddress, setWorkshopAddress] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await artisanService.registerArtisan({
      display_name: displayName,
      craft_tradition: craftTradition,
      region,
      years_active: parseInt(yearsActive) || 1,
      bio,
      workshop_address: workshopAddress,
      bank_name: bankName || undefined,
      account_number: accountNumber || undefined,
      ifsc_code: ifscCode || undefined,
    });

    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    router.push('/artisan/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        <div className="mb-8">
          <span className="inline-block px-2.5 py-1 rounded bg-orange-100 text-orange-900 text-xs font-semibold uppercase mb-2">
            Step 2 of 2 • Artisan Verification
          </span>
          <h1 className="text-2xl font-serif font-bold text-stone-900">Artisan Studio Profile</h1>
          <p className="text-sm text-stone-600">
            Tell us about your heritage craft, regional roots, and payout preferences.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase text-stone-800 tracking-wider">Craft Pedigree</h2>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Studio / Brand Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Mithila Heritage Art Studio"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Craft Tradition</label>
                <select
                  value={craftTradition}
                  onChange={(e) => setCraftTradition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                >
                  <option value="Madhubani Painting">Madhubani Painting (Bihar)</option>
                  <option value="Jaipur Blue Pottery">Jaipur Blue Pottery (Rajasthan)</option>
                  <option value="Dhokra Bell Metal">Dhokra Bell Metal (Chhattisgarh/Odisha)</option>
                  <option value="Pattachitra Scroll Painting">Pattachitra (Odisha)</option>
                  <option value="Banarasi Silk Weaving">Banarasi Silk (Varanasi)</option>
                  <option value="Saharanpur Wood Carving">Saharanpur Wood Carving (UP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Region / Craft Village</label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="e.g. Madhubani, Bihar"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Years Practicing Craft</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={yearsActive}
                  onChange={(e) => setYearsActive(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Workshop Address</label>
                <input
                  type="text"
                  value={workshopAddress}
                  onChange={(e) => setWorkshopAddress(e.target.value)}
                  placeholder="Village / Cluster address"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Craft Story & Artisan Bio</label>
              <textarea
                rows={4}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your lineage, how you learned the craft, and the traditional methods and natural materials you use..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 space-y-4">
            <h2 className="text-sm font-bold uppercase text-stone-800 tracking-wider">Bank Account For Direct Payouts</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. State Bank of India"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="•••• •••• ••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  placeholder="SBIN0001234"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#c55337] text-white rounded-lg font-medium text-sm hover:bg-[#a5402a] transition disabled:opacity-50 shadow-sm"
          >
            {loading ? 'Submitting Verification...' : 'Submit Studio Profile for Verification'}
          </button>
        </form>
      </div>
    </div>
  );
}
