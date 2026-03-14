const baseClass = 'animate-pulse rounded bg-charcoal/15';

export interface SkeletonProps {
  variant?: 'line' | 'block' | 'calendar';
  className?: string;
  rows?: number;
}

export default function Skeleton({
  variant = 'block',
  className = '',
  rows = 1,
}: SkeletonProps) {
  if (variant === 'line') {
    return (
      <div className={`flex flex-col gap-2 ${className}`.trim()}>
        {Array.from({ length: rows }, (_, i) => (
          <div
            key={i}
            className={`h-4 ${baseClass}`}
            style={{ width: i === rows - 1 && rows > 1 ? '75%' : undefined }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'calendar') {
    const gridRows = rows;
    return (
      <div
        className={`flex flex-col ${className}`.trim()}
        role="status"
        aria-label="Cargando calendario"
      >
        <div className="flex border-b border-border">
          <div className={`w-12 shrink-0 ${baseClass}`} style={{ height: 32 }} />
          <div className="grid flex-1 grid-cols-7 gap-px px-px">
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className={`h-8 ${baseClass}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="flex w-12 shrink-0 flex-col border-r border-border py-1">
            {Array.from({ length: gridRows }, (_, i) => (
              <div key={i} className={`mb-1 h-12 ${baseClass}`} />
            ))}
          </div>
          <div
            className="grid flex-1 grid-cols-7 gap-px p-px"
            style={{ gridAutoRows: '4rem' }}
          >
            {Array.from({ length: 7 * gridRows }, (_, i) => (
              <div key={i} className={`min-h-16 ${baseClass}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div className={`h-20 min-w-32 ${baseClass} ${className}`.trim()} />;
}
