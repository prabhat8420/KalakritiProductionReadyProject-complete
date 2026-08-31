import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Kalakriti (कलाकृति) | Authentic Indian Handcrafted Marketplace',
  description: 'Connecting genuine Indian craft artisans directly with global patrons. Experience authentic provenance, transparent pricing, and circular care.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917] font-sans">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
