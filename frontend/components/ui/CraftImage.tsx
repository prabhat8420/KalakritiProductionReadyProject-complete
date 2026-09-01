'use client';

import React, { useState } from 'react';

interface CraftImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatioClass?: string;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80';

export function CraftImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  aspectRatioClass = 'aspect-square',
  className = '',
  ...props
}: CraftImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${aspectRatioClass}`}>
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className={`w-full h-full object-cover transition duration-300 ${className}`}
        {...props}
      />
      {hasError && (
        <span className="absolute bottom-2 right-2 bg-stone-900/70 text-white text-[9px] font-medium px-1.5 py-0.5 rounded backdrop-blur-xs">
          Heritage Archive Image
        </span>
      )}
    </div>
  );
}
