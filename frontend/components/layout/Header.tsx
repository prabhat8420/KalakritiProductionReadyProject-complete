'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';

export default function Header() {
  const { cart, fetchCart } = useCartStore();
  const { user, isAuthenticated, logout, checkSession } = useAuthStore();
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCart();
    checkSession();
  }, [fetchCart, checkSession]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F5F0EB]/95 backdrop-blur-md border-b border-[#E2DAD0]">
      {/* Top Banner: Direct Artisan Pledge */}
      <div className="bg-[#1B2738] text-[#EBE5DC] text-[11px] font-mono py-1.5 px-4 text-center tracking-wide border-b border-[#E2DAD0]/10">
        🏺 <span className="font-semibold text-[#C29B38]">DIRECT ARTISAN GUARANTEE:</span> 85% of item price transfers directly to master artisan studio bank accounts. Free GI cryptographic verification on all orders.
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl transition-transform group-hover:scale-105">🏺</span>
          <div>
            <span className="font-display text-2xl font-bold tracking-tight text-[#842A1C]">कलाकृति</span>
            <span className="text-[10px] font-mono tracking-widest text-[#5C5852] block -mt-1 uppercase">
              KALAKRITI • LIVING ARCHIVES
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium uppercase tracking-wider text-[#141312]">
          <Link href="/shop" className="hover:text-[#842A1C] transition-colors">
            {lang === 'EN' ? 'Craft Catalog' : 'शिल्प संग्रह'}
          </Link>
          <Link href="/traditions" className="hover:text-[#842A1C] transition-colors">
            {lang === 'EN' ? 'Heritage Traditions' : 'धरोहर परंपराएं'}
          </Link>
          <Link href="/craft-doctor" className="flex items-center gap-1 text-[#2D5A43] hover:text-[#1E3E2E] font-semibold">
            <span>🩺</span> {lang === 'EN' ? 'Craft Doctor' : 'शिल्प चिकित्सक'}
          </Link>
          <Link href="/artisan/dashboard" className="text-[#842A1C] hover:text-[#671E13]">
            {lang === 'EN' ? 'Artisan Studio' : 'कारीगर मंच'}
          </Link>
          {isAuthenticated && user?.roles?.includes('admin') && (
            <Link href="/admin/dashboard" className="text-[#C29B38] hover:text-[#997624] font-bold">
              {lang === 'EN' ? '🛡️ Admin Hub' : '🛡️ प्रशासन'}
            </Link>
          )}
        </nav>

        {/* Right Actions: Lang Switcher, User Menu, Cart */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
            className="text-[11px] font-mono font-semibold px-2 py-1 rounded border border-[#E2DAD0] bg-white text-[#141312] hover:bg-[#EBE5DC] transition"
            title="Toggle English / हिन्दी"
          >
            {lang === 'EN' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}
          </button>

          {/* User Sign In / Profile Dropdown */}
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="text-xs font-mono font-semibold text-[#141312] hover:text-[#842A1C] transition px-3 py-1.5 rounded-lg border border-[#E2DAD0] bg-white shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>👤</span>
                <span className="max-w-[100px] truncate">{user.full_name?.split(' ')[0] || 'Account'}</span>
                <span className="text-[10px] text-[#8A847C]">▼</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E2DAD0] rounded-xl shadow-md py-1.5 z-50 animate-in fade-in duration-100">
                  <div className="px-3.5 py-2 border-b border-[#E2DAD0]">
                    <p className="text-xs font-bold text-[#141312] truncate">{user.full_name}</p>
                    <p className="text-[11px] text-[#5C5852] truncate font-mono">{user.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#842A1C]/10 text-[#842A1C] text-[10px] font-mono font-bold uppercase tracking-wider">
                      {user.roles?.[0] || 'Patron'}
                    </span>
                  </div>

                  {user.roles?.includes('artisan') && (
                    <Link
                      href="/artisan/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#2D2B28] hover:bg-[#F5F0EB] hover:text-[#842A1C] font-medium"
                    >
                      <span>🎨</span> Artisan Studio
                    </Link>
                  )}

                  {user.roles?.includes('admin') && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#2D2B28] hover:bg-[#F5F0EB] hover:text-[#842A1C] font-medium"
                    >
                      <span>🛡️</span> Admin Moderation
                    </Link>
                  )}

                  <Link
                    href="/cart"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#2D2B28] hover:bg-[#F5F0EB] font-medium"
                  >
                    <span>🧺</span> My Basket & Orders
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs text-red-700 hover:bg-red-50 font-medium border-t border-[#E2DAD0] cursor-pointer font-mono"
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-xs font-mono font-semibold text-[#141312] hover:text-[#842A1C] transition px-3 py-1.5 rounded-lg border border-[#E2DAD0] bg-white shadow-xs"
            >
              Sign In
            </Link>
          )}

          {/* Multi-Vendor Cart Drawer Link */}
          <Link
            href="/cart"
            className="relative px-3.5 py-1.5 bg-[#842A1C] text-white rounded-lg font-mono font-bold text-xs hover:bg-[#671E13] transition flex items-center gap-1.5 shadow-xs"
          >
            <span>🧺</span>
            <span className="hidden sm:inline">Basket</span>
            {cart && cart.total_items > 0 && (
              <span className="bg-[#C29B38] text-[#141312] text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                {cart.total_items}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
