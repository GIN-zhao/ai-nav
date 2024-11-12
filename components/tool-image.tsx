'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ToolImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ToolImage({ src, alt, className }: ToolImageProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {error ? (
        <Image
          src="/placeholder.svg"
          alt={alt}
          width={48}
          height={48}
          className="object-contain"
          priority
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="object-contain"
          priority
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}