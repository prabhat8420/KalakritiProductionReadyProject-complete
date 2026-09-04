'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'artisan'>('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await authService.register({
      email,
      password,
      full_name: fullName,
      phone: phone || undefined,
      role
    });
    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (res.data) {
      setAuth(res.data.user, res.data.access_token);
      if (role === 'artisan') {
        router.push('/artisan/onboarding');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F2E7] relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#E3DACB]/50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-[#E3DACB]/50 pointer-events-none" />

      <div className="w-full max-w-md bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-8 sm:p-10 shadow-sm relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-serif text-2xl tracking-[0.2em] font-semibold text-[#1C1917] hover:text-[#8C3826] transition mb-3">
            KALAKRITI
          </Link>
          <div className="w-8 h-[1.5px] bg-[#8C3826] mx-auto mb-4" />
          <h1 className="font-serif text-xl font-bold text-[#1C1917]">Create Heritage Account</h1>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#6E655F] mt-1">Join the authentic handmade craft registry</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50/80 border border-red-200 text-red-800 text-xs rounded-lg font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">I want to join as</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2.5 text-xs font-mono uppercase tracking-wider rounded-lg border text-center transition cursor-pointer ${
                  role === 'customer'
                    ? 'border-[#8C3826] bg-[#8C3826]/10 text-[#8C3826] font-semibold'
                    : 'border-[#E3DACB] bg-[#F7F2E7] text-[#6E655F] hover:bg-[#EFE7DA]'
                }`}
              >
                Patron / Collector
              </button>
              <button
                type="button"
                onClick={() => setRole('artisan')}
                className={`py-2.5 text-xs font-mono uppercase tracking-wider rounded-lg border text-center transition cursor-pointer ${
                  role === 'artisan'
                    ? 'border-[#8C3826] bg-[#8C3826]/10 text-[#8C3826] font-semibold'
                    : 'border-[#E3DACB] bg-[#F7F2E7] text-[#6E655F] hover:bg-[#EFE7DA]'
                }`}
              >
                Master Artisan
              </button>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Sita Devi or Aarav Sharma"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] placeholder:text-[#6E655F]/50 focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826] transition"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] placeholder:text-[#6E655F]/50 focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826] transition"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Phone Number (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] placeholder:text-[#6E655F]/50 focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826] transition"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] placeholder:text-[#6E655F]/50 focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-medium text-xs uppercase tracking-widest transition duration-200 shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Registering Heritage Profile...' : 'Complete Registration'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E3DACB] text-center text-xs text-[#6E655F]">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-semibold text-[#8C3826] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
