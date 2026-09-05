'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import CuratorSidebar from '@/components/home/sidebar/CuratorSidebar';

/*
 * THREE-STATE SCROLL MACHINE
 * ─────────────────────────────────────────────────────────────────────────────
 * at-top  : scrollY < 60px  → fully transparent, no bg, no border, no shadow
 * hidden  : scrolling down past 80px delta  → translateY(-100%), slides off screen
 * visible : any upward scroll > 10px delta  → slides back, blurred bg (if past hero)
 *
 * z-index: [9999] — explicitly above the Three.js WebGL canvas compositing layer.
 * Three.js canvases can create their own GPU compositing layer. A z-index alone
 * is not always sufficient without also ensuring the header's stacking context
 * is established by `transform` or `will-change`. The CSS `translate` on the
 * header (from the slide animation) already creates an isolated stacking context
 * which resolves any canvas layer conflict.
 * ─────────────────────────────────────────────────────────────────────────────
 */
type HeaderState = 'at-top' | 'hidden' | 'visible';

export default function Header() {
  const { cart, fetchCart } = useCartStore();
  const { user, isAuthenticated, logout, checkSession } = useAuthStore();
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderState>('at-top');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll tracking refs — never trigger re-renders, only used in rAF callback
  const lastScrollY = useRef(0);
  const lastScrollDir = useRef<'up' | 'down'>('down');
  const ticking = useRef(false);
  const heroHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 800);

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

  // Scroll state machine — uses rAF to batch updates and prevent jitter
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      if (currentY < 60) {
        // Always at-top when near the very top of the page
        setHeaderState('at-top');
      } else if (isScrollingDown && Math.abs(delta) > 8) {
        // Hide on meaningful downward scroll (8px threshold prevents jitter)
        setHeaderState('hidden');
        lastScrollDir.current = 'down';
      } else if (isScrollingUp && Math.abs(delta) > 5) {
        // Reappear on any genuine upward intent (5px — low, intentional)
        setHeaderState('visible');
        lastScrollDir.current = 'up';
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Update heroHeight on resize
  useEffect(() => {
    const onResize = () => { heroHeight.current = window.innerHeight; };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  // Derive CSS classes from the 3-state machine
  const isAtTop = headerState === 'at-top';
  const isHidden = headerState === 'hidden';
  // "past hero" = scrolled more than one viewport height down
  const isPastHero = lastScrollY.current >= heroHeight.current;

  const headerBgClass = isAtTop
    ? 'bg-transparent border-transparent shadow-none'
    : 'bg-[#F5F0EB]/92 backdrop-blur-md border-b border-[#E2DAD0] shadow-sm';

  const headerTransformClass = isHidden
    ? '-translate-y-full'
    : 'translate-y-0';

  // Top banner: hide when at-top (transparent) so it doesn't fight the hero visually
  const bannerClass = isAtTop
    ? 'opacity-0 pointer-events-none'
    : 'opacity-100';

  return (
    <>
      {/*
       * FIXED HEADER — z-[9999]
       * This z-index explicitly places the header above any Three.js canvas.
       * The `transform` property on this element (from the slide animation)
       * ensures the stacking context is isolated, preventing the WebGL canvas
       * from bleeding over the header regardless of GPU compositing.
       */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${headerBgClass} ${headerTransformClass}`}
        style={{ willChange: 'transform' }}
      >
        {/* Top Banner: Direct Artisan Pledge */}
        <div className={`bg-[#1B2738] text-[#EBE5DC] text-[11px] font-mono py-1.5 px-4 text-center tracking-wide border-b border-[#E2DAD0]/10 transition-opacity duration-300 ${bannerClass}`}>
          🏺 <span className="font-semibold text-[#C29B38]">DIRECT ARTISAN GUARANTEE:</span> 85% of item price transfers directly to master artisan studio bank accounts. Free GI cryptographic verification on all orders.
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Hamburger Three-Line Menu & Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Top-Left Hamburger Three-Line Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer shadow-xs group ${
                isAtTop
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/40'
                  : 'border-[#E2DAD0] bg-white text-[#141312] hover:bg-[#EBE5DC] hover:text-[#842A1C] hover:border-[#842A1C]/40'
              }`}
              aria-label="Open Living Archives Directory and Categories"
              title="All Categories & Lineages"
            >
              <span className={`text-base leading-none font-bold transition-colors ${isAtTop ? 'text-white' : 'text-[#141312] group-hover:text-[#842A1C]'}`}>
                ☰
              </span>
              <span className={`text-xs font-bold tracking-wider uppercase ${isAtTop ? 'text-white' : 'text-[#141312] group-hover:text-[#842A1C]'}`}>
                All
              </span>
            </button>

            {/* Brand Logo */}
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

          {/* Right Actions: Lang Switcher, User Menu, Cart */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className={`text-[11px] font-mono font-semibold px-2 py-1 rounded border transition-all ${
                isAtTop
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                  : 'border-[#E2DAD0] bg-white text-[#141312] hover:bg-[#EBE5DC]'
              }`}
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
                  className={`text-xs font-mono font-semibold transition px-3 py-1.5 rounded-lg border shadow-xs flex items-center gap-1.5 cursor-pointer ${
                    isAtTop
                      ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
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
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'text-[#141312] hover:text-[#842A1C] border-[#E2DAD0] bg-white'
                }`}
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
                <span className="bg-[#C29B38] text-[#141312] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                  {cart.total_items}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Top-Left Hamburger Activated Slide-Over Drawer */}
      <CuratorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
