'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productService } from '@/services/product.service';
import { ProductPriceBreakdown } from '@/components/products/ProductPrice';

export default function NewProductPage() {
  const router = useRouter();

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
    { label: 'Madhubani Painting', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80' },
    { label: 'Jaipur Blue Pottery', url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
    { label: 'Dhokra Bronze Cast', url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80' }
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const res = await productService.createProduct({
      title,
      description_en: descriptionEn,
      description_hi: descriptionHi,
      category_id: categoryId,
      tradition_id: traditionId,
      base_price: basePrice,
      image_urls: [imageUrl || sampleImages[0].url],
      ai_confidence_score: confidenceScore || 0.95
    });

    setSubmitting(false);

    if (res.error) {
      setError(res.error);
      return;
    }

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
    <div className="min-h-screen bg-[#faf8f5] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
        <div className="mb-8 pb-6 border-b border-stone-200">
          <span className="text-xs font-semibold uppercase text-orange-800">Smart Cataloging Flow</span>
          <h1 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            List a New Heritage Handcraft
          </h1>
          <p className="text-sm text-stone-600">
            Upload your craft photograph. Our Multimodal AI will auto-classify your tradition, generate bilingual titles & descriptions, and calculate transparent pricing.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        {/* AI Vision Photo Uploader */}
        <div className="bg-orange-50/50 border-2 border-dashed border-orange-200 rounded-xl p-6 mb-8 text-center space-y-4">
          <div>
            <h3 className="text-sm font-bold text-stone-900 mb-1">📸 Step 1: Upload Craft Photograph</h3>
            <p className="text-xs text-stone-600">Select a real photo from your device/camera or paste an image URL to run AI cataloging</p>
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
              className="border border-dashed border-[#c55337] bg-white hover:bg-orange-50/80 rounded-xl p-4 cursor-pointer transition flex items-center justify-center gap-3 text-xs font-semibold text-[#c55337] shadow-sm"
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
              className="flex-1 px-3.5 py-2 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c55337]"
            />
            <button
              type="button"
              onClick={() => handleAIAnalysis()}
              disabled={analyzing || !imageUrl}
              className="px-4 py-2 bg-[#c55337] text-white rounded-lg text-xs font-semibold hover:bg-[#a5402a] transition disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : '✨ Run AI Vision'}
            </button>
          </div>

          {imageUrl && (
            <div className="max-w-xs mx-auto h-36 rounded-lg overflow-hidden border border-stone-200 bg-white">
              <img src={imageUrl} alt="Uploaded Craft" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-stone-500">
            <span>Or try sample:</span>
            {sampleImages.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setImageUrl(s.url);
                  handleAIAnalysis(s.url);
                }}
                className="px-2.5 py-1 bg-white border border-stone-200 rounded text-stone-700 hover:border-[#c55337]"
              >
                {s.label}
              </button>
            ))}
          </div>

          {confidenceScore && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <span>✓ AI Vision Classified with {(confidenceScore * 100).toFixed(0)}% Confidence</span>
            </div>
          )}
        </div>

        {/* Product Details Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-stone-800">English Listing Details</h3>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Title (English)</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">Craft Description (English)</label>
                <textarea
                  rows={5}
                  required
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-stone-800">Hindi Heritage Copy (हिंदी)</h3>
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">शीर्षक (Hindi Title)</label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">कला का विवरण (Hindi Description)</label>
                <textarea
                  rows={5}
                  value={descriptionHi}
                  onChange={(e) => setDescriptionHi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200">
            <h3 className="text-sm font-bold uppercase text-stone-800 mb-4">Pricing & Revenue Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Artisan Base Cost (₹)
                </label>
                <input
                  type="number"
                  min="100"
                  required
                  value={basePrice}
                  onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#c55337]"
                />
                <p className="text-xs text-stone-500 mt-1">
                  You receive 85% directly to your bank account after delivery.
                </p>
              </div>

              <ProductPriceBreakdown {...breakdown} />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !title}
            className="w-full py-3.5 bg-[#c55337] text-white rounded-lg font-medium text-sm hover:bg-[#a5402a] transition disabled:opacity-50"
          >
            {submitting ? 'Submitting for Moderation...' : 'Submit Craft for Admin Verification & Publishing'}
          </button>
        </form>
      </div>
    </div>
  );
}
