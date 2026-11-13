import { useState } from 'react';
import { Home } from 'lucide-react';

interface BrandImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
}

export function BrandImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Residential Care',
  priority = false,
}: BrandImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#E8EFF3] via-[#FAFCFD] to-[#DDF5F4] text-[#17304B] p-6 ${className}`}
      >
        <div className="w-11 h-11 rounded-full bg-white border border-[#E8EFF3] flex items-center justify-center mb-3">
          <Home className="w-5 h-5 text-[#4CA8D8]" aria-hidden="true" />
        </div>
        <span className="text-xs font-medium tracking-wide text-[#263845] text-center">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
