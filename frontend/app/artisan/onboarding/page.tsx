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
    <div className="min-h-screen bg-[#F7F2E7] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-8 sm:p-10 shadow-sm">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded bg-[#8C3826]/10 text-[#8C3826] font-mono text-[10px] font-semibold uppercase tracking-wider mb-3">
            Step 2 of 2 • Artisan Lineage Verification
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Master Studio Profile</h1>
          <p className="text-xs text-[#6E655F] mt-1.5 leading-relaxed">
            Record your craft tradition, ancestral cluster, and direct bank settlement details.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50/80 border border-red-200 text-red-800 text-xs rounded-lg font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#1C1917]">Craft Pedigree</h2>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Studio / Master Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Mithila Heritage Art Studio"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Craft Tradition</label>
                <select
                  value={craftTradition}
                  onChange={(e) => setCraftTradition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
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
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Region / Craft Village</label>
                <input
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="e.g. Madhubani, Bihar"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Years Practicing Craft</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={yearsActive}
                  onChange={(e) => setYearsActive(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Workshop Address</label>
                <input
                  type="text"
                  value={workshopAddress}
                  onChange={(e) => setWorkshopAddress(e.target.value)}
                  placeholder="Village / Cluster address"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Lineage Story & Bio</label>
              <textarea
                rows={4}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your lineage, how you learned the craft, and the traditional methods and natural materials you use..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[#E3DACB] space-y-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#1C1917]">Bank Account For Direct Escrow Transfers</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. State Bank of India"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="•••• •••• ••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">IFSC Code</label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  placeholder="SBIN0001234"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {loading ? 'Submitting Verification...' : 'Submit Studio Profile for Verification'}
          </button>
        </form>
      </div>
    </div>
  );
}
