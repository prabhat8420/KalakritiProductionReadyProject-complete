'use client';

import { useState, useRef } from 'react';
import { apiClient, uploadImage } from '@/services/api-client';

export default function CraftDoctorPage() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [orderItemId, setOrderItemId] = useState('sample-order-item-id');
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rejectionError, setRejectionError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleDamagedCrafts = [
    { label: 'Broken Jaipur Urn', url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80' },
    { label: 'Scuffed Bronze Figurine', url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80' },
    { label: 'Faded Madhubani Scroll', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80' }
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setRejectionError('');
    setDiagnosis(null);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);
    setUploadSuccess(false);

    try {
      const res = await uploadImage(file);
      setUploading(false);
      if (res.error || !res.url) {
        setError(res.error || 'Failed to upload photo to storage');
      } else {
        setPhotoUrl(res.url);
        setUploadSuccess(true);
      }
    } catch (err: any) {
      setUploading(false);
      setError(err.message || 'Upload failed');
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setError('');
    setRejectionError('');
    setDiagnosis(null);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);
    setUploadSuccess(false);

    try {
      const res = await uploadImage(file);
      setUploading(false);
      if (res.error || !res.url) {
        setError(res.error || 'Failed to upload photo to storage');
      } else {
        setPhotoUrl(res.url);
        setUploadSuccess(true);
      }
    } catch (err: any) {
      setUploading(false);
      setError(err.message || 'Upload failed');
    }
  };

  const handleSelectSample = (url: string) => {
    setError('');
    setRejectionError('');
    setDiagnosis(null);
    setPreviewUrl(url);
    setPhotoUrl(url);
    setUploadSuccess(true);
  };

  const handleDiagnose = async () => {
    const targetUrl = photoUrl || previewUrl;
    if (!targetUrl) {
      setError('Please upload a damage photo or select a sample craft first.');
      return;
    }

    setError('');
    setRejectionError('');
    setDiagnosis(null);
    setLoading(true);

    const res = await apiClient<any>('/repair/diagnose', {
      method: 'POST',
      body: JSON.stringify({
        order_item_id: orderItemId,
        damage_photo_url: targetUrl
      })
    });
    setLoading(false);

    if (res.data) {
      setDiagnosis(res.data);
    } else {
      const errMsg = res.error || 'Failed to get diagnosis from AI Craft Doctor.';
      if (errMsg.includes("doesn't appear to be a photo") || errMsg.includes('screenshot') || errMsg.includes('handcrafted')) {
        setRejectionError(errMsg);
      } else {
        setError(errMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase tracking-wider">
          Circular Economy & Heritage Restoration
        </span>
        <h1 className="text-4xl font-serif font-bold text-stone-900 mt-3 mb-3">
          Craft Doctor (शिल्प चिकित्सक)
        </h1>
        <p className="text-xs text-stone-600 leading-relaxed">
          Accidents happen to delicate handcrafted items. Instead of discarding, our Multimodal AI analyzes damage from your photo, verifies craft authenticity, and connects you directly to registered heritage restoration masters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload & Damage Submission */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">1. Upload Damaged Craft Photo</h3>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          {/* Device File Upload Widget */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg group-hover:scale-110 transition">
                📷
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800">
                  Click to select photo from device or camera
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Drag & drop image file here (PNG, JPG, WEBP)
                </p>
              </div>
            </div>
          </div>

          {/* Upload Status Indicator */}
          {uploading && (
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 py-2 rounded-lg border border-emerald-200">
              <span className="inline-block w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
              Uploading photo to Cloudinary storage...
            </div>
          )}

          {uploadSuccess && photoUrl && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-900 flex items-center justify-between">
              <span className="font-semibold">✓ Photo uploaded to Cloudinary</span>
              <span className="font-mono text-[10px] text-emerald-700 truncate max-w-[150px]">{photoUrl}</span>
            </div>
          )}

          {/* Photo Preview */}
          {(previewUrl || photoUrl) && (
            <div className="relative h-48 rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
              <img
                src={previewUrl || photoUrl}
                alt="Damage Preview"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-stone-900/80 text-white rounded text-[10px] font-medium backdrop-blur-sm">
                Photo Preview
              </span>
            </div>
          )}

          {/* Sample damaged items */}
          <div className="pt-2 border-t border-stone-100">
            <span className="block text-[11px] text-stone-500 mb-1.5">Or try with sample damaged items:</span>
            <div className="flex flex-wrap gap-1.5">
              {sampleDamagedCrafts.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(s.url)}
                  className="px-2 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200 rounded text-[10px] text-stone-700 transition"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={loading || uploading || (!photoUrl && !previewUrl)}
            onClick={handleDiagnose}
            className="w-full py-3.5 bg-emerald-800 text-white rounded-xl font-bold text-xs hover:bg-emerald-900 transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                AI Verifying Craft & Diagnosing Damage...
              </>
            ) : (
              '✨ Run Multimodal AI Damage Diagnosis'
            )}
          </button>
        </div>

        {/* Diagnosis & Matching Results */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">2. Diagnostic Certificate & Partner Match</h3>

          {/* Non-Craft Photo Rejection Message */}
          {rejectionError && (
            <div className="p-5 bg-rose-50 border border-rose-200 text-rose-900 rounded-xl space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-bold text-xs text-rose-800">
                <span className="text-base">⚠️</span>
                <span>Craft Photo Validation Failed</span>
              </div>
              <p className="text-xs leading-relaxed text-rose-700">{rejectionError}</p>
              <div className="pt-2 text-[11px] text-rose-600 border-t border-rose-200">
                Please upload a photo showing a physical handcrafted artifact (e.g. pottery, painting, metal idol, handloom).
              </div>
            </div>
          )}

          {!diagnosis && !rejectionError && (
            <div className="p-12 text-center text-stone-400 text-xs border border-dashed border-stone-200 rounded-xl space-y-2">
              <div className="text-2xl">🩺</div>
              <p>Upload a photo from your device to run AI damage classification, material preservation scoring, and certified repair guild matching.</p>
            </div>
          )}

          {diagnosis && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                    {diagnosis.ticket_number}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    diagnosis.ai_severity === 'High' ? 'bg-amber-200 text-amber-950' : 'bg-emerald-200 text-emerald-950'
                  }`}>
                    Severity: {diagnosis.ai_severity}
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-xs">{diagnosis.ai_damage_type}</h4>
                <p className="text-xs text-stone-700 leading-relaxed">{diagnosis.ai_assessment_text}</p>
                
                {/* Diagnostic Repairability Assessment - Clear Diagnostic Format, No Stars */}
                <div className="pt-3 border-t border-emerald-200 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-emerald-950">Structural Integrity Recovery Index:</span>
                    <span className="text-emerald-800 font-bold font-mono">
                      {(diagnosis.ai_repairability_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-200 text-emerald-900">
                    {diagnosis.ai_repairability_score >= 0.8
                      ? '✓ Full Heritage Restoration Feasible'
                      : diagnosis.ai_repairability_score >= 0.5
                      ? '⚡ Partial Restoration / Stabilization Recommended'
                      : '⚠️ Museum Grade Conservation Required'}
                  </div>
                </div>
              </div>

              {diagnosis.matched_repair_partner && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-[#c55337] tracking-wider">
                      Matched Heritage Restoration Guild
                    </span>
                    <span className="px-2 py-0.5 bg-stone-200 text-stone-800 rounded text-[10px] font-semibold">
                      ✓ Master Guild Accredited
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    {diagnosis.matched_repair_partner.name}
                  </h4>
                  {diagnosis.matched_repair_partner.specialties && (
                    <p className="text-xs text-stone-600">
                      <span className="font-semibold text-stone-700">Specialties:</span> {diagnosis.matched_repair_partner.specialties}
                    </p>
                  )}
                  <p className="text-xs text-stone-600">
                    <span className="font-semibold text-stone-700">Region:</span> {diagnosis.matched_repair_partner.region}
                  </p>
                  <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs text-stone-600">
                    <span>Direct Clinic Contact:</span>
                    <span className="font-mono text-[11px] text-emerald-800 font-bold">
                      {diagnosis.matched_repair_partner.contact_info}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


