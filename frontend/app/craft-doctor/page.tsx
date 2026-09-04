'use client';

import { useState, useRef } from 'react';
import { apiClient, uploadImage } from '@/services/api-client';
import { useToast } from '@/components/ui/Toast';

export default function CraftDoctorPage() {
  const toast = useToast();
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
    { label: 'Broken Jaipur Urn', url: '/images/crafts/craft-15.jpg' },
    { label: 'Scuffed Bronze Figurine', url: '/images/crafts/craft-8.jpg' },
    { label: 'Faded Madhubani Scroll', url: '/images/crafts/craft-14.jpg' }
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
        toast.error(res.error || 'Failed to upload photo', 'Storage Error');
      } else {
        setPhotoUrl(res.url);
        setUploadSuccess(true);
        toast.success('Photo ready for AI damage diagnostics.', 'Photo Uploaded');
      }
    } catch (err: any) {
      setUploading(false);
      setError(err.message || 'Upload failed');
      toast.error(err.message || 'Upload failed', 'Upload Error');
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
        toast.error(res.error || 'Failed to upload photo', 'Storage Error');
      } else {
        setPhotoUrl(res.url);
        setUploadSuccess(true);
        toast.success('Photo ready for AI damage diagnostics.', 'Photo Uploaded');
      }
    } catch (err: any) {
      setUploading(false);
      setError(err.message || 'Upload failed');
      toast.error(err.message || 'Upload failed', 'Upload Error');
    }
  };

  const handleSelectSample = (url: string) => {
    setError('');
    setRejectionError('');
    setDiagnosis(null);
    setPreviewUrl(url);
    setPhotoUrl(url);
    setUploadSuccess(true);
    toast.info('Sample damaged craft selected.', 'Craft Selected');
  };

  const handleDiagnose = async () => {
    const targetUrl = photoUrl || previewUrl;
    if (!targetUrl) {
      setError('Please upload a damage photo or select a sample craft first.');
      toast.error('Please upload a damage photo first.', 'Missing Photo');
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
      toast.success(
        `Diagnostic ticket ${res.data.ticket_number} created with matched restoration guild!`,
        'Diagnosis Complete'
      );
    } else {
      const errMsg = res.error || 'Failed to get diagnosis from AI Craft Doctor.';
      if (errMsg.includes("doesn't appear to be a photo") || errMsg.includes('screenshot') || errMsg.includes('handcrafted')) {
        setRejectionError(errMsg);
        toast.error(errMsg, 'Craft Verification Failed');
      } else {
        setError(errMsg);
        toast.error(errMsg, 'Diagnosis Error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] py-8 sm:py-12 px-3.5 sm:px-4 max-w-[1280px] mx-auto space-y-10">
      <div className="border-b border-[#E3DACB] pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#2D5A43] font-semibold bg-[#E8F0EA] px-2.5 py-1 rounded">
          Circular Economy & Heritage Restoration
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1C1917] mt-3 tracking-tight">
          Craft Doctor (शिल्प चिकित्सक)
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554E] font-mono mt-2 max-w-2xl leading-relaxed">
          Accidents happen to delicate handcrafted items. Instead of discarding, our Multimodal AI analyzes damage from your photo, verifies craft authenticity, and connects you directly to registered heritage restoration masters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        {/* Upload & Damage Submission */}
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-[#1C1917] text-sm uppercase tracking-wider">
            1. Upload Damaged Craft Photo
          </h3>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-mono">
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
              className="border-2 border-dashed border-[#2D5A43]/40 hover:border-[#2D5A43] bg-[#E8F0EA]/40 rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#2D5A43] flex items-center justify-center text-lg group-hover:scale-110 transition">
                📷
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1917] font-mono">
                  Click to select photo from device or camera
                </p>
                <p className="text-[11px] text-[#5C554E] font-mono mt-0.5">
                  Drag & drop image file here (PNG, JPG, WEBP)
                </p>
              </div>
            </div>
          </div>

          {/* Upload Status Indicator */}
          {uploading && (
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold text-[#2D5A43] bg-[#E8F0EA] py-2 rounded-lg border border-[#BDD4C3]">
              <span className="inline-block w-3 h-3 border-2 border-[#2D5A43] border-t-transparent rounded-full animate-spin"></span>
              Uploading photo to secure storage...
            </div>
          )}

          {uploadSuccess && photoUrl && (
            <div className="p-2.5 bg-[#E8F0EA] border border-[#BDD4C3] rounded-lg text-[11px] font-mono text-[#1B432E] flex flex-wrap items-center justify-between gap-1">
              <span className="font-semibold">✓ Photo ready for analysis</span>
              <span className="text-[10px] text-[#2D5A43] truncate max-w-[140px] sm:max-w-[200px]">{photoUrl}</span>
            </div>
          )}

          {/* Photo Preview */}
          {(previewUrl || photoUrl) && (
            <div className="relative h-48 rounded-xl overflow-hidden border border-[#E3DACB] bg-[#EFE7DA]">
              <img
                src={previewUrl || photoUrl}
                alt="Damage Preview"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#1C1917]/90 text-white rounded text-[10px] font-mono backdrop-blur-sm">
                Photo Preview
              </span>
            </div>
          )}

          {/* Sample damaged items */}
          <div className="pt-2 border-t border-[#E3DACB]">
            <span className="block text-[11px] font-mono text-[#5C554E] mb-1.5">Or try with sample damaged items:</span>
            <div className="flex flex-wrap gap-1.5">
              {sampleDamagedCrafts.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(s.url)}
                  className="px-2 py-1 bg-[#F7F2E7] hover:bg-[#E8F0EA] hover:text-[#1B432E] border border-[#E3DACB] rounded text-[10px] font-mono text-[#2D2824] transition"
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
            className="w-full py-3.5 bg-[#2D5A43] text-white rounded-lg font-mono font-bold text-xs hover:bg-[#1E3E2E] transition shadow-xs disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
        <div className="bg-[#FAF6EE] border border-[#E3DACB] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-[#1C1917] text-sm uppercase tracking-wider">
            2. Diagnostic Certificate & Partner Match
          </h3>

          {/* Non-Craft Photo Rejection Message */}
          {rejectionError && (
            <div className="p-5 bg-[#F7EDE9] border border-[#E8BFB6] text-[#7A2617] rounded-xl space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-mono font-bold text-xs">
                <span className="text-base">⚠️</span>
                <span>Craft Photo Validation Failed</span>
              </div>
              <p className="text-xs leading-relaxed font-mono">{rejectionError}</p>
              <div className="pt-2 text-[11px] font-mono border-t border-[#E8BFB6]/60">
                Please upload a photo showing a physical handcrafted artifact (e.g. pottery, painting, metal idol, handloom).
              </div>
            </div>
          )}

          {!diagnosis && !rejectionError && (
            <div className="p-12 text-center text-[#8C8379] text-xs border border-dashed border-[#E3DACB] rounded-xl space-y-2 font-mono">
              <div className="text-2xl">🩺</div>
              <p>Upload a photo from your device to run AI damage classification, material preservation scoring, and certified repair guild matching.</p>
            </div>
          )}

          {diagnosis && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 bg-[#E8F0EA] border border-[#BDD4C3] rounded-xl space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#1B432E] font-bold bg-[#BDD4C3]/40 px-2 py-0.5 rounded">
                    {diagnosis.ticket_number}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    diagnosis.ai_severity === 'High' ? 'bg-[#F5EFE0] text-[#7A5B15]' : 'bg-[#E8F0EA] text-[#1B432E]'
                  }`}>
                    Severity: {diagnosis.ai_severity}
                  </span>
                </div>
                <h4 className="font-display font-bold text-[#1C1917] text-sm">{diagnosis.ai_damage_type}</h4>
                <p className="text-xs text-[#2D2824] leading-relaxed font-normal">{diagnosis.ai_assessment_text}</p>
                
                <div className="pt-3 border-t border-[#BDD4C3] space-y-1.5 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1B432E]">Structural Integrity Recovery Index:</span>
                    <span className="text-[#1B432E] font-bold">
                      {(diagnosis.ai_repairability_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#BDD4C3]/60 text-[#1B432E]">
                    {diagnosis.ai_repairability_score >= 0.8
                      ? '✓ Full Heritage Restoration Feasible'
                      : diagnosis.ai_repairability_score >= 0.5
                      ? '⚡ Partial Restoration / Stabilization Recommended'
                      : '⚠️ Museum Grade Conservation Required'}
                  </div>
                </div>
              </div>

              {diagnosis.matched_repair_partner && (
                <div className="p-4 bg-[#F7F2E7] border border-[#E3DACB] rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#8C3826] tracking-wider">
                      Matched Heritage Restoration Guild
                    </span>
                    <span className="px-2 py-0.5 bg-[#EFE7DA] text-[#1C1917] rounded text-[10px] font-mono font-semibold">
                      ✓ Master Guild Accredited
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-[#1C1917] text-sm">
                    {diagnosis.matched_repair_partner.name}
                  </h4>
                  {diagnosis.matched_repair_partner.specialties && (
                    <p className="text-xs text-[#5C554E] font-mono">
                      <span className="font-semibold text-[#1C1917]">Specialties:</span> {diagnosis.matched_repair_partner.specialties}
                    </p>
                  )}
                  <p className="text-xs text-[#5C554E] font-mono">
                    <span className="font-semibold text-[#1C1917]">Region:</span> {diagnosis.matched_repair_partner.region}
                  </p>
                  <div className="pt-2 border-t border-[#E3DACB] flex justify-between items-center text-xs text-[#5C554E] font-mono">
                    <span>Direct Clinic Contact:</span>
                    <span className="text-[11px] text-[#2D5A43] font-bold">
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
