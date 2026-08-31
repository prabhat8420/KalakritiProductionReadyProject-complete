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
    <div className="bg-[#faf8f5] border-2 border-amber-800/20 rounded-2xl p-6 relative overflow-hidden shadow-sm">
      {/* Heritage Watermark Border */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-900/10 mb-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#a5402a] uppercase">
            Government Registered Craft Lineage
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
            Digital Authenticity & Provenance Certificate
          </h3>
          <p className="text-xs text-stone-600 font-mono mt-1">{certificateId}</p>
        </div>

        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="Authenticity Verification QR"
            className="w-16 h-16 rounded border border-stone-300 bg-white p-1"
          />
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
        <div>
          <span className="text-stone-500 block text-[11px]">Master Artisan</span>
          <span className="font-semibold text-stone-800">{artisanName}</span>
        </div>

        <div>
          <span className="text-stone-500 block text-[11px]">Heritage Tradition</span>
          <span className="font-semibold text-stone-800">{craftTradition}</span>
        </div>

        <div>
          <span className="text-stone-500 block text-[11px]">Origin Region</span>
          <span className="font-semibold text-stone-800">{originRegion}</span>
        </div>
      </div>

      <div className="bg-white/80 p-2.5 rounded border border-stone-200 font-mono text-[10px] text-stone-600 break-all">
        <span className="font-bold text-stone-700">SHA-256 Provenance Hash:</span> {certificateHash}
      </div>
    </div>
  );
}
