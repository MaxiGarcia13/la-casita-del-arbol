export interface WeekNavProps {
  monthLabel: string;
  isPrevDisabled: boolean;
  prevHref: string;
  onPrevClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  todayHref: string;
  onTodayClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  nextHref: string;
  onNextClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function WeekNav({
  monthLabel,
  isPrevDisabled,
  prevHref,
  onPrevClick,
  todayHref,
  onTodayClick,
  nextHref,
  onNextClick,
}: WeekNavProps) {
  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-charcoal bg-surface px-3 py-2"
      aria-label="Navegación por semana"
    >
      <span className="text-sm font-semibold">
        {monthLabel}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {isPrevDisabled
          ? (
              <span
                className="rounded border-2 border-charcoal/40 bg-charcoal/5 px-3 py-1.5 text-sm font-medium text-charcoal/50 cursor-not-allowed"
                aria-disabled
              >
                ← Semana anterior
              </span>
            )
          : (
              <a
                href={prevHref}
                className="rounded border-2 border-charcoal bg-surface px-3 py-1.5 text-sm font-medium transition hover:bg-charcoal/10"
                onClick={(e) => {
                  e.preventDefault();
                  onPrevClick(e);
                }}
              >
                ← Semana anterior
              </a>
            )}
        <a
          href={todayHref}
          className="rounded border-2 border-charcoal bg-surface px-3 py-1.5 text-sm font-medium transition hover:bg-charcoal/10"
          onClick={(e) => {
            e.preventDefault();
            onTodayClick(e);
          }}
        >
          Hoy
        </a>
        <a
          href={nextHref}
          className="rounded border-2 border-charcoal bg-surface px-3 py-1.5 text-sm font-medium transition hover:bg-charcoal/10"
          onClick={(e) => {
            e.preventDefault();
            onNextClick(e);
          }}
        >
          Semana siguiente →
        </a>
      </div>
    </nav>
  );
}
