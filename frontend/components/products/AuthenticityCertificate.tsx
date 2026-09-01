export interface CertificateProps {
  certificateId: string;
  certificateHash: string;
  qrCodeUrl?: string;
  craftTradition: string;
  artisanName: string;
  originRegion: string;
  rawMaterials?: string;
  badge?: string;
  issuedAt?: string;
}

export function AuthenticityCertificate({
  certificateId,
  certificateHash,
  qrCodeUrl,
  craftTradition,
  artisanName,
  originRegion,
  rawMaterials,
  badge,
  issuedAt,
}: CertificateProps) {
  return (
    <div className="bg-[#faf8f5] border-2 border-amber-800/20 rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-sm">
      {/* Heritage Watermark Border */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-4 pb-4 border-b border-amber-900/10 mb-4">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold tracking-widest text-[#a5402a] uppercase">
            Government Registered Craft Lineage
          </span>
          <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 mt-0.5 leading-tight">
            Digital Authenticity & Provenance Certificate
          </h3>
          <p className="text-xs text-stone-600 font-mono mt-1 break-all">{certificateId}</p>
        </div>

        <div className="flex sm:flex-col items-center gap-2 sm:gap-1 shrink-0 self-start sm:self-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl border border-stone-300 p-1 shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src={
                qrCodeUrl && !qrCodeUrl.startsWith('data:image/png;base64,iVBORw0KGgoAAA')
                  ? qrCodeUrl
                  : `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fkalakriti-frontend.vercel.app%2Fauthenticity%3Fcert_id%3D${encodeURIComponent(certificateId)}`
              }
              alt="Authenticity Verification QR Code"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-center whitespace-nowrap shadow-2xs">
            ✓ GI Verified
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
        <div>
          <span className="text-stone-500 block text-[11px]">Master Artisan</span>
          <span className="font-semibold text-stone-800 break-words">{artisanName}</span>
        </div>

        <div>
          <span className="text-stone-500 block text-[11px]">Heritage Tradition</span>
          <span className="font-semibold text-stone-800 break-words">{craftTradition}</span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <span className="text-stone-500 block text-[11px]">Origin Region</span>
          <span className="font-semibold text-stone-800 break-words">{originRegion}</span>
        </div>
      </div>

      <div className="bg-white/80 p-2.5 rounded border border-stone-200 font-mono text-[10px] text-stone-600 break-all leading-tight">
        <span className="font-bold text-stone-700">SHA-256 Provenance Hash:</span> {certificateHash}
      </div>
    </div>
  );
}

