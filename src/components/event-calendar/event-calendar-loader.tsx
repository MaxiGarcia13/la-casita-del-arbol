import Skeleton from '../skeleton';

export function EventCalendarLoader({ className, rows }: { className?: string; rows?: number }) {
  return (
    <div
      className={`flex flex-col w-full max-w-full overflow-auto rounded border border-border relative bg-surface ${className}`.trim()}
    >
      <div className="flex-1 min-h-[200px] border-t border-border">
        <Skeleton variant="calendar" rows={rows} className="h-full" />
      </div>
    </div>
  );
}
