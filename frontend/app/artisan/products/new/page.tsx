'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productService } from '@/services/product.service';
import { ProductPriceBreakdown } from '@/components/products/ProductPrice';
import { useToast } from '@/components/ui/Toast';

export default function NewProductPage() {
  const router = useRouter();
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionHi, setDescriptionHi] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [traditionId, setTraditionId] = useState('');
  const [basePrice, setBasePrice] = useState(2500);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);

  const sampleImages = [
    { label: 'Madhubani Painting', url: '/images/crafts/craft-14.jpg' },
    { label: 'Jaipur Blue Pottery', url: '/images/crafts/craft-15.jpg' },
    { label: 'Dhokra Bronze Cast', url: '/images/crafts/craft-8.jpg' }
  ];

  const handleAIAnalysis = async (imgToAnalyze?: string) => {
    const targetUrl = imgToAnalyze || imageUrl;
    if (!targetUrl) return;

    setError('');
    setAnalyzing(true);

    const res = await productService.aiCatalogImage(targetUrl);
    setAnalyzing(false);

    if (res.error) {
      setError(res.error);
      toast.error(res.error, 'AI Cataloging Notice');
      return;
    }

    if (res.data) {
      setTitle(res.data.suggested_title_en);
      setTitleHi(res.data.suggested_title_hi);
      setDescriptionEn(res.data.description_en);
      setDescriptionHi(res.data.description_hi);
      setCategoryId(res.data.category_id);
      setTraditionId(res.data.tradition_id);
      setBasePrice(res.data.recommended_base_price);
      setConfidenceScore(res.data.ai_confidence_score);
      toast.info('AI Vision populated bilingual descriptions and fair artisan pricing.', 'AI Curated');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const res = await productService.createProduct({
      title,
      title_hi: titleHi,
      description_en: descriptionEn,
      description_hi: descriptionHi,
      category_id: categoryId || '786c3cc3-5bc3-422e-9056-b7d781ec62ce',
      tradition_id: traditionId || '8e37f21b-ac1d-48fc-8e71-a045c5b47222',
      base_price: basePrice,
      image_urls: [imageUrl || sampleImages[0].url],
      ai_confidence_score: confidenceScore || 0.95
    });

    setSubmitting(false);

    if (res.error) {
      setError(res.error);
      toast.error(res.error, 'Submission Failed');
      return;
    }

    toast.success('Craft product submitted for master curator review!', 'Listing Submitted');
    router.push('/artisan/dashboard');
  };

  const breakdown = {
    basePrice: basePrice,
    artisanShare: Math.round(basePrice * 0.85),
    platformFee: Math.round(basePrice * 0.10),
    deliveryFee: Math.round(basePrice * 0.05),
    totalPrice: Math.round(basePrice * 1.15)
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-[#FAF6EE] border border-[#E3DACB] rounded-2xl p-8 sm:p-10 shadow-sm">
        <div className="mb-8 pb-6 border-b border-[#E3DACB]">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C3826]">
            Smart Cataloging Flow
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917] mt-1">
            List a New Heritage Handcraft
          </h1>
          <p className="text-xs text-[#6E655F] mt-1.5 leading-relaxed">
            Upload your craft photograph. Our Multimodal AI will auto-classify your tradition, generate bilingual titles & descriptions, and calculate transparent pricing.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50/80 border border-red-200 text-red-800 text-xs rounded-lg font-mono">
            {error}
          </div>
        )}

        {/* AI Vision Photo Uploader */}
        <div className="bg-[#F7F2E7] border-2 border-dashed border-[#E3DACB] rounded-xl p-6 sm:p-8 mb-8 text-center space-y-4">
          <div>
            <h3 className="font-serif font-bold text-[#1C1917] text-base mb-1">📸 Step 1: Upload Craft Photograph</h3>
            <p className="font-mono text-[11px] text-[#6E655F]">Select a real photo from your device/camera or paste an image URL to run AI cataloging</p>
          </div>

          <div className="max-w-xl mx-auto">
            <input
              type="file"
              id="artisan-craft-file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setError('');
                setAnalyzing(true);
                const { uploadImage } = await import('@/services/api-client');
                const uploadRes = await uploadImage(file);
                if (uploadRes.error || !uploadRes.url) {
                  setAnalyzing(false);
                  setError(uploadRes.error || 'Failed to upload photo');
                  return;
                }
                setImageUrl(uploadRes.url);
                await handleAIAnalysis(uploadRes.url);
              }}
            />
            <label
              htmlFor="artisan-craft-file"
              className="border border-dashed border-[#8C3826] bg-[#FAF6EE] hover:bg-[#FAF6EE]/80 rounded-xl p-4 cursor-pointer transition flex items-center justify-center gap-3 font-mono text-xs font-semibold text-[#8C3826] shadow-2xs"
            >
              <span className="text-lg">📷</span>
              <span>Click to select craft photo from device or camera</span>
            </label>
          </div>

          <div className="flex gap-2 max-w-xl mx-auto">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste image URL: https://example.com/craft.jpg"
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#E3DACB] text-xs bg-[#FAF6EE] text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
            />
            <button
              type="button"
              onClick={() => handleAIAnalysis()}
              disabled={analyzing || !imageUrl}
              className="px-5 py-2.5 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-mono text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
            >
              {analyzing ? 'Analyzing...' : '✨ Run AI Vision'}
            </button>
          </div>

          {imageUrl && (
            <div className="max-w-xs mx-auto h-40 rounded-lg overflow-hidden border border-[#E3DACB] bg-[#FAF6EE]">
              <img src={imageUrl} alt="Uploaded Craft" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex flex-wrap justify-center items-center gap-2 font-mono text-[11px] text-[#6E655F]">
            <span>Or try sample:</span>
            {sampleImages.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setImageUrl(s.url);
                  handleAIAnalysis(s.url);
                }}
                className="px-3 py-1 bg-[#FAF6EE] border border-[#E3DACB] rounded text-[#1C1917] hover:border-[#8C3826] transition cursor-pointer"
              >
                {s.label}
              </button>
            ))}
          </div>

          {confidenceScore && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-xs font-semibold">
              <span>✓ AI Vision Classified with {(confidenceScore * 100).toFixed(0)}% Confidence</span>
            </div>
          )}
        </div>

        {/* Product Details Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1C1917]">English Listing Details</h3>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Title (English)</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">Craft Description (English)</label>
                <textarea
                  rows={5}
                  required
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1C1917]">Hindi Heritage Copy (हिंदी)</h3>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">शीर्षक (Hindi Title)</label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">कला का विवरण (Hindi Description)</label>
                <textarea
                  rows={5}
                  value={descriptionHi}
                  onChange={(e) => setDescriptionHi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E3DACB]">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-4">Pricing & Revenue Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#6E655F] mb-1.5 font-medium">
                  Artisan Base Cost (₹)
                </label>
                <input
                  type="number"
                  min="100"
                  required
                  value={basePrice}
                  onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3DACB] bg-[#F7F2E7] text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#8C3826] focus:border-[#8C3826]"
                />
                <p className="font-mono text-[11px] text-[#6E655F] mt-1.5">
                  You receive 85% directly to your bank account upon patron delivery.
                </p>
              </div>

              <ProductPriceBreakdown {...breakdown} />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !title}
            className="w-full py-3.5 bg-[#8C3826] hover:bg-[#722D1E] text-white rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {submitting ? 'Submitting for Curatorial Review...' : 'Submit Craft for Provenance Certification & Publishing'}
          </button>
        </form>
      </div>
    </div>
  );
}
