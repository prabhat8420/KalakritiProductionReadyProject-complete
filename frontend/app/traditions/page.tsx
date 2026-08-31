import Link from 'next/link';
import { API_BASE_URL } from '@/lib/config';

async function getTraditions() {
  try {
    const res = await fetch(`${API_BASE_URL}/traditions`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [
      {
        id: '1',
        name: 'Madhubani Painting',
        region: 'Mithila, Bihar',
        heritage_origin: 'Mithila Kingdom (8th Century BCE)',
        description: 'Ancient geometrical and nature-inspired paintings traditionally made using twigs, brushes, and natural vegetable dyes on treated cloth and handmade paper.'
      },
      {
        id: '2',
        name: 'Jaipur Blue Pottery',
        region: 'Jaipur, Rajasthan',
        heritage_origin: 'Turko-Persian origins adopted in 19th Century Jaipur',
        description: 'A unique style of glazed pottery using quartz powder and Egyptian paste rather than traditional clay, famed for cobalt blue floral motifs.'
      },
      {
        id: '3',
        name: 'Dhokra Bell Metal',
        region: 'Bastar, Chhattisgarh / Odisha',
        heritage_origin: 'Indus Valley Civilization (Mohenjo-daro Dancing Girl tradition)',
        description: 'Non-ferrous metal casting using the ancient lost-wax technique, known for rustic tribal motifs and timeless primitive minimalism.'
      }
    ];
  }
}

export default async function TraditionsPage() {
  const traditions = await getTraditions();

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase text-[#c55337] tracking-wider">Living Heritage Archives</span>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2 mb-3">Traditional Craft Lineages of India</h1>
        <p className="text-xs text-stone-600 leading-relaxed">
          Explore the indigenous crafting techniques, sacred motifs, and natural material traditions preserved across generations of hereditary artisan families.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {traditions.map((trad: any) => (
          <div key={trad.id} className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded font-bold text-[10px] uppercase">
                  📍 {trad.region}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">GI Verified</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">{trad.name}</h3>
              <p className="text-[11px] font-semibold text-[#a5402a]">Origin: {trad.heritage_origin}</p>
              <p className="text-xs text-stone-600 leading-relaxed">{trad.description}</p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
              <Link href="/shop" className="text-xs font-bold text-[#c55337] hover:underline">
                View Studio Crafts →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
