import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'Kalakriti (कलाकृति) | Living Indian Craft Archives & Direct Marketplace',
  description: 'Connecting genuine Indian craft artisans directly with global patrons. Experience authentic provenance, transparent pricing, and circular care.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#F5F0EB] text-[#141312] font-sans selection:bg-[#842A1C] selection:text-white">
        <ToastProvider>
          <Header />
          {/*
           * pt-16 = 64px = height of the fixed nav bar.
           * The home page hero is designed to start at top-0 behind the transparent
           * header, so it would look wrong with this padding — but it's applied here
           * globally because the hero section uses w-screen / translate-x trick to
           * escape. All inner pages need this offset so content doesn't hide behind
           * the fixed header.
           *
           * NOTE: The hero's own pt-20 on the mobile text column handles the
           * header offset inside the full-bleed section itself.
           */}
          <div className="flex-1 pt-16">
            {children}
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
