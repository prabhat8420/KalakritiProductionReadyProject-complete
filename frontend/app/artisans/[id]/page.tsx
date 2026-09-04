import { notFound } from 'next/navigation';
import { API_BASE_URL } from '@/lib/config';

async function getArtisan(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/artisans/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default async function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const artisan = await getArtisan(params.id);
  if (!artisan) notFound();

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="w-28 h-28 rounded-full bg-[#8C3826]/10 flex items-center justify-center text-4xl border border-[#8C3826]/30 shadow-inner">
          🏺
        </div>
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">{artisan.display_name}</h1>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider">
              Verified Master
            </span>
          </div>
          <p className="font-mono text-xs text-[#8C3826] font-semibold uppercase tracking-wider">
            📍 {artisan.region} • {artisan.craft_tradition}
          </p>
          <p className="text-sm text-[#6E655F] max-w-2xl leading-relaxed">{artisan.bio}</p>
          <div className="pt-3 flex flex-wrap gap-6 font-mono text-xs text-[#6E655F]">
            <span>⭐ {artisan.avg_rating} Rating ({artisan.review_count} Reviews)</span>
            <span>🏛️ {artisan.years_active} Years Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
