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
          <div className="flex-1 pt-0">
            {children}
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
