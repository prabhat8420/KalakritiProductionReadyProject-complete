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
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-4xl border border-orange-200">
          🏺
        </div>
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <h1 className="font-serif text-3xl font-bold text-stone-900">{artisan.display_name}</h1>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase">
              Verified Master
            </span>
          </div>
          <p className="text-xs text-[#c55337] font-semibold">📍 {artisan.region} • {artisan.craft_tradition}</p>
          <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">{artisan.bio}</p>
          <div className="pt-2 flex gap-6 text-xs text-stone-500">
            <span>⭐ {artisan.avg_rating} Rating ({artisan.review_count} Reviews)</span>
            <span>🏛️ {artisan.years_active} Years Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
