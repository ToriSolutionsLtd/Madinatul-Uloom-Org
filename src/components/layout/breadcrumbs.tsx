import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href as '/'}
                  className="hover:text-primary font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold" aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground/60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
