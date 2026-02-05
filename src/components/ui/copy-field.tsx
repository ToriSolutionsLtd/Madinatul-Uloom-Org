'use client';

import { Check, Copy } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type CopyFieldProps = {
  label: string;
  value: string;
  copyValue?: string;
  href?: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export function CopyField({
  label,
  value,
  copyValue,
  href,
  className,
  labelClassName,
  valueClassName,
}: CopyFieldProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = useCallback(async () => {
    const text = copyValue ?? value;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }, [copyValue, value]);

  useEffect(() => {
    if (status === 'idle') return;
    const timeout = setTimeout(() => setStatus('idle'), 1800);
    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3 rounded-xl border bg-background/80 p-3',
        className
      )}
    >
      <div className="space-y-1">
        <p
          className={cn(
            'text-muted-foreground text-sm font-semibold uppercase tracking-wide',
            labelClassName
          )}
        >
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className={cn(
              'text-foreground font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              valueClassName
            )}
          >
            {value}
          </a>
        ) : (
          <p className={cn('text-foreground font-semibold', valueClassName)}>{value}</p>
        )}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          status === 'copied'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : status === 'error'
              ? 'border-red-200 bg-red-50 text-red-600'
              : 'border-border/60 bg-white text-foreground hover:bg-muted/50'
        )}
        aria-live="polite"
      >
        {status === 'copied' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {status === 'copied' ? 'Copied' : status === 'error' ? 'Retry' : 'Copy'}
      </button>
    </div>
  );
}
