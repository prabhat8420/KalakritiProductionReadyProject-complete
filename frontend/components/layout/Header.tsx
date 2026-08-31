'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';

export default function Header() {
  const { cart, fetchCart } = useCartStore();
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchCart();
    const stored = localStorage.getItem('kalakriti_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    }
  }, [fetchCart]);

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner: Direct Artisan Pledge */}
      <div className="bg-[#1b2d44] text-amber-200 text-[11px] font-medium py-1.5 px-4 text-center tracking-wide">
        🏺 <span className="font-semibold text-white">Direct Artisan Guarantee:</span> 85% of item price goes directly to hereditary Indian craft masters. Free GI-certification verification on all orders.
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform group-hover:scale-110">🏺</span>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#c55337]">कलाकृति</span>
            <span className="text-xs font-serif italic text-stone-600 block -mt-1 tracking-wider">KALAKRITI</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-700">
          <Link href="/shop" className="hover:text-[#c55337] transition">
            {lang === 'EN' ? 'Craft Catalog' : 'शिल्प संग्रह'}
          </Link>
          <Link href="/traditions" className="hover:text-[#c55337] transition">
            {lang === 'EN' ? 'Heritage Traditions' : 'धरोहर परंपराएं'}
          </Link>
          <Link href="/craft-doctor" className="flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold">
            <span>🩺</span> {lang === 'EN' ? 'Craft Doctor' : 'शिल्प चिकित्सक'}
          </Link>
          <Link href="/artisan/dashboard" className="text-[#a5402a] hover:text-orange-950">
            {lang === 'EN' ? 'Artisan Studio' : 'कारीगर मंच'}
          </Link>
          <Link href="/admin/dashboard" className="text-stone-500 hover:text-stone-900">
            {lang === 'EN' ? 'Admin Hub' : 'प्रशासन'}
          </Link>
        </nav>

        {/* Right Actions: Lang Switcher, User Menu, Cart */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
            className="text-[11px] font-bold px-2 py-1 rounded border border-stone-300 text-stone-700 hover:bg-stone-100 transition"
            title="Toggle English / हिन्दी"
          >
            {lang === 'EN' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}
          </button>

          {/* User Sign In / Profile */}
          <Link
            href="/auth/login"
            className="text-xs font-semibold text-stone-800 hover:text-[#c55337] transition px-3 py-1.5 rounded-lg border border-stone-200 bg-white shadow-2xs"
          >
            {user ? `👤 ${user.full_name?.split(' ')[0] || 'Account'}` : 'Sign In'}
          </Link>

          {/* Multi-Vendor Cart Drawer Link */}
          <Link
            href="/cart"
            className="relative px-3 py-1.5 bg-[#c55337] text-white rounded-lg font-bold text-xs hover:bg-[#a5402a] transition flex items-center gap-1.5 shadow-sm"
          >
            <span>🧺</span>
            <span className="hidden sm:inline">Basket</span>
            {cart && cart.total_items > 0 && (
              <span className="bg-amber-300 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {cart.total_items}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
