'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImageWithSkeleton } from '@/components/ui/image-with-skeleton';

type LightboxImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function LightboxImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  imageClassName,
  priority,
}: LightboxImageProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'group relative w-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            className
          )}
          aria-label={`View ${alt}`}
        >
          <ImageWithSkeleton
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            wrapperClassName="h-full w-full"
            imageClassName={cn(
              'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
              imageClassName
            )}
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <Dialog.Title className="sr-only">{alt}</Dialog.Title>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="100vw"
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            <Dialog.Close
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-foreground shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
