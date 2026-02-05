'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ImageWithSkeletonProps = Omit<ImageProps, 'className'> & {
  wrapperClassName?: string;
  imageClassName?: string;
  skeletonClassName?: string;
};

export function ImageWithSkeleton({
  wrapperClassName,
  imageClassName,
  skeletonClassName,
  onLoadingComplete,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFill = !!props.fill;

  return (
    <div className={cn('relative overflow-hidden', isFill ? 'h-full w-full' : '', wrapperClassName)}>
      <div
        className={cn(
          'absolute inset-0 animate-pulse bg-muted/60',
          isLoaded ? 'opacity-0' : 'opacity-100',
          skeletonClassName
        )}
      />
      <Image
        {...props}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          imageClassName
        )}
        onLoadingComplete={(image) => {
          setIsLoaded(true);
          onLoadingComplete?.(image);
        }}
      />
    </div>
  );
}
