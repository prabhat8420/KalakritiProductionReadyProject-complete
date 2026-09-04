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
        description: 'Ancient geometrical and nature-inspired paintings traditionally made using twigs, bamboo pens, and natural vegetable dyes on treated handmade paper.'
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
        region: 'Bastar, Chhattisgarh',
        heritage_origin: 'Indus Valley Civilization (Mohenjo-daro Dancing Girl tradition)',
        description: 'Non-ferrous metal casting using the ancient lost-wax technique, known for rustic tribal motifs and timeless primitive minimalism.'
      },
      {
        id: '4',
        name: 'Srikalahasti Pen Kalamkari',
        region: 'Chittoor, Andhra Pradesh',
        heritage_origin: 'Temple friezes & Chola Dynasty temple scrolls',
        description: 'Freehand mythological drawings crafted with sharp bamboo dip-pens, fermented jaggery mordants, and pure natural madder and myrobalan dye baths.'
      }
    ];
  }
}

export default async function TraditionsPage() {
  const traditions = await getTraditions();

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-12 px-4 max-w-[1360px] mx-auto space-y-10">
      <div className="border-b border-[#E3DACB] pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C3826] font-semibold block">
          Living Heritage Archives
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1C1917] mt-1 tracking-tight">
          Traditional Craft Lineages of India
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554E] font-mono mt-2 max-w-2xl leading-relaxed">
          Explore the indigenous crafting techniques, sacred motifs, and natural material traditions preserved across generations of hereditary artisan families.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {traditions.map((trad: any) => (
          <div key={trad.id} className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-6 shadow-xs space-y-5 flex flex-col justify-between hover:border-[#1C1917] transition-colors">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2 py-0.5 bg-[#8C3826]/10 text-[#8C3826] rounded font-mono font-bold text-[10px] uppercase">
                  📍 {trad.region}
                </span>
                <span className="text-[10px] text-[#5C554E] font-mono">GI Verified</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#1C1917] leading-snug">{trad.name}</h3>
              <p className="text-[11px] font-mono font-semibold text-[#8C3826]">Origin: {trad.heritage_origin}</p>
              <p className="text-xs text-[#5C554E] leading-relaxed font-normal">{trad.description}</p>
            </div>

            <div className="pt-4 border-t border-[#E3DACB] flex justify-between items-center">
              <Link href="/shop" className="text-xs font-mono font-semibold text-[#8C3826] hover:underline">
                Explore Studio Crafts
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
