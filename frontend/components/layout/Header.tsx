'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import CuratorSidebar from '@/components/home/sidebar/CuratorSidebar';

/*
 * SCROLL-REACTIVE HEADER — HOME PAGE ONLY
 * ─────────────────────────────────────────────────────────────────────────────
 * The transparent/at-top behavior is scoped ONLY to the home page (pathname '/').
 * On all other pages, the header is always solid (visible state).
 *
 * Three states (home page only):
 *   at-top  → transparent, white nav text, overlays the hero
 *   hidden  → translateY(-100%), slides off on downward scroll
 *   visible → solid beige bg, dark nav text, on upward scroll
 *
 * On all other pages: always 'visible' (solid beige, never transparent).
 *
 * z-index [9999] + will-change:transform ensures header stacks above
 * any Three.js WebGL canvas compositing layer.
 * ─────────────────────────────────────────────────────────────────────────────
 */
type HeaderState = 'at-top' | 'hidden' | 'visible';

export default function Header() {
  const { cart, fetchCart } = useCartStore();
  const { user, isAuthenticated, logout, checkSession } = useAuthStore();
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderState>('visible');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Transparent behavior ONLY on home page
  const isHomePage = pathname === '/';

  // Scroll tracking refs — no re-renders, only used in rAF
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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

  // On route change: immediately reset to correct state
  useEffect(() => {
    if (!isHomePage) {
      setHeaderState('visible');
      lastScrollY.current = 0;
    } else {
      // On home page, check initial scroll position
      const currentY = window.scrollY;
      setHeaderState(currentY < 60 ? 'at-top' : 'visible');
      lastScrollY.current = currentY;
    }
  }, [isHomePage]);

  const handleScroll = useCallback(() => {
    // Non-home pages: header always stays visible
    if (!isHomePage) return;

    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 60) {
        setHeaderState('at-top');
      } else if (delta > 8) {
        // Meaningful downward scroll → hide
        setHeaderState('hidden');
      } else if (delta < -5) {
        // Any upward intent → show with solid bg
        setHeaderState('visible');
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, [isHomePage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  const isAtTop = headerState === 'at-top';
  const isHidden = headerState === 'hidden';

  // Background: transparent at-top (home only), solid everywhere else
  const headerBgStyle = isAtTop
    ? { backgroundColor: 'transparent', borderColor: 'transparent', boxShadow: 'none' }
    : { backgroundColor: 'rgba(245,240,235,0.96)', borderBottom: '1px solid #E2DAD0', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' };

  return (
    <>
      {/*
       * FIXED HEADER — z-[9999]
       * will-change:transform creates an isolated stacking context,
       * which guarantees this header renders above the Three.js WebGL
       * canvas compositing layer on the home page.
       */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ ...headerBgStyle, willChange: 'transform' }}
      >
        {/* Top Banner — hidden when transparent (at-top on home) */}
        {!isAtTop && (
          <div className="bg-[#1B2738] text-[#EBE5DC] text-[11px] font-mono py-1.5 px-4 text-center tracking-wide border-b border-[#E2DAD0]/10">
            🏺 <span className="font-semibold text-[#C29B38]">DIRECT ARTISAN GUARANTEE:</span> 85% of item price transfers directly to master artisan studio bank accounts. Free GI cryptographic verification on all orders.
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Left: Hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer shadow-xs group ${
                isAtTop
                  ? 'border-white/25 bg-white/10 text-white hover:bg-white/20 hover:border-white/50'
                  : 'border-[#E2DAD0] bg-white text-[#141312] hover:bg-[#EBE5DC] hover:text-[#842A1C] hover:border-[#842A1C]/40'
              }`}
              aria-label="Open Living Archives Directory and Categories"
            >
              <span className={`text-base leading-none font-bold ${isAtTop ? 'text-white' : 'text-[#141312] group-hover:text-[#842A1C]'}`}>
                ☰
              </span>
              <span className={`text-xs font-bold tracking-wider uppercase ${isAtTop ? 'text-white' : 'text-[#141312] group-hover:text-[#842A1C]'}`}>
                All
              </span>
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="text-2xl transition-transform group-hover:scale-105">🏺</span>
              <div>
                <span className={`font-display text-2xl font-bold tracking-tight transition-colors ${isAtTop ? 'text-white drop-shadow-md' : 'text-[#842A1C]'}`}>
                  कलाकृति
                </span>
                <span className={`text-[10px] font-mono tracking-widest block -mt-1 uppercase transition-colors ${isAtTop ? 'text-white/70' : 'text-[#5C5852]'}`}>
                  KALAKRITI • LIVING ARCHIVES
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider transition-colors ${isAtTop ? 'text-white/90' : 'text-[#141312]'}`}
            style={{ fontVariationSettings: '"opsz" 12, "wght" 500' }}
          >
            <Link href="/shop" className={`transition-colors ${isAtTop ? 'hover:text-white' : 'hover:text-[#842A1C]'}`}>
              {lang === 'EN' ? 'Craft Catalog' : 'शिल्प संग्रह'}
            </Link>
            <Link href="/traditions" className={`transition-colors ${isAtTop ? 'hover:text-white' : 'hover:text-[#842A1C]'}`}>
              {lang === 'EN' ? 'Heritage Traditions' : 'धरोहर परंपराएं'}
            </Link>
            <Link href="/craft-doctor" className={`flex items-center gap-1 font-bold transition-colors ${isAtTop ? 'text-[#6EE7B7] hover:text-white' : 'text-[#2D5A43] hover:text-[#1E3E2E]'}`}>
              <span>🩺</span> {lang === 'EN' ? 'Craft Doctor' : 'शिल्प चिकित्सक'}
            </Link>
            <Link href="/artisan/dashboard" className={`transition-colors ${isAtTop ? 'text-[#FDE68A] hover:text-white' : 'text-[#842A1C] hover:text-[#671E13]'}`}>
              {lang === 'EN' ? 'Artisan Studio' : 'कारीगर मंच'}
            </Link>
            {isAuthenticated && user?.roles?.includes('admin') && (
              <Link href="/admin/dashboard" className={`font-bold transition-colors ${isAtTop ? 'text-[#FDE68A] hover:text-white' : 'text-[#C29B38] hover:text-[#997624]'}`}>
                {lang === 'EN' ? '🛡️ Admin Hub' : '🛡️ प्रशासन'}
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className={`text-[11px] font-mono font-semibold px-2 py-1 rounded border transition-all ${
                isAtTop
                  ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                  : 'border-[#E2DAD0] bg-white text-[#141312] hover:bg-[#EBE5DC]'
              }`}
            >
              {lang === 'EN' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}
            </button>

            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`text-xs font-mono font-semibold transition px-3 py-1.5 rounded-lg border shadow-xs flex items-center gap-1.5 cursor-pointer ${
                    isAtTop
                      ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                      : 'text-[#141312] hover:text-[#842A1C] border-[#E2DAD0] bg-white'
                  }`}
                >
                  <span>👤</span>
                  <span className="max-w-[100px] truncate">{user.full_name?.split(' ')[0] || 'Account'}</span>
                  <span className="text-[10px] opacity-70">▼</span>
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
                      <Link href="/artisan/dashboard" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#2D2B28] hover:bg-[#F5F0EB] hover:text-[#842A1C] font-medium">
                        <span>🎨</span> Artisan Studio
                      </Link>
                    )}
                    {user.roles?.includes('admin') && (
                      <Link href="/admin/dashboard" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#2D2B28] hover:bg-[#F5F0EB] hover:text-[#842A1C] font-medium">
                        <span>🛡️</span> Admin Moderation
                      </Link>
                    )}
                    <Link href="/cart" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#2D2B28] hover:bg-[#F5F0EB] font-medium">
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
                className={`text-xs font-mono font-semibold transition px-3 py-1.5 rounded-lg border shadow-xs ${
                  isAtTop
                    ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                    : 'text-[#141312] hover:text-[#842A1C] border-[#E2DAD0] bg-white'
                }`}
              >
                Sign In
              </Link>
            )}

            <Link
              href="/cart"
              className="relative px-3.5 py-1.5 bg-[#842A1C] text-white rounded-lg font-mono font-bold text-xs hover:bg-[#671E13] transition flex items-center gap-1.5 shadow-xs"
            >
              <span>🧺</span>
              <span className="hidden sm:inline">Basket</span>
              {cart && cart.total_items > 0 && (
                <span className="bg-[#C29B38] text-[#141312] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                  {cart.total_items}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <CuratorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
