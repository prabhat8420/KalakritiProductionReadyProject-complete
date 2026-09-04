'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await authService.login({ email, password });
    setLoading(false);

    if (res.error) {
      setError(res.error);
      toast.error(res.error, 'Sign In Failed');
      return;
    }

    if (res.data && res.data.user) {
      setAuth(res.data.user, res.data.access_token);
      toast.success(`Welcome back, ${res.data.user.full_name?.split(' ')[0] || 'Patron'}!`, 'Signed In');
      const roles = res.data.user.roles || [];
      if (roles.includes('artisan')) {
        router.push('/artisan/dashboard');
      } else if (roles.includes('admin')) {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
      router.refresh();
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
          <h1 className="font-serif text-xl font-bold text-[#1C1917]">Patron & Artisan Portal</h1>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#6E655F] mt-1">Authenticate verified lineage account</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50/80 border border-red-200 text-red-800 text-xs rounded-lg font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patron@kalakriti.org"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] placeholder:text-[#6E655F]/50 focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826] transition"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#6E655F] font-medium">
                Password
              </label>
              <Link href="/auth/forgot-password" className="font-mono text-[10px] text-[#8C3826] hover:underline uppercase tracking-wider">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] placeholder:text-[#6E655F]/50 focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-medium text-xs uppercase tracking-widest transition duration-200 shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Authenticating Heritage...' : 'Sign In to Archive'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E3DACB] text-center text-xs text-[#6E655F]">
          New patron or master artisan?{' '}
          <Link href="/auth/register" className="font-semibold text-[#8C3826] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
