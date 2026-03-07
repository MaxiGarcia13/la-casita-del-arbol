import { LinkButton } from '../link-button';

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
      <div className="flex items-center gap-2">

        <LinkButton
          className="max-w-[140px] md:max-w-none"
          href={prevHref}
          disabled={isPrevDisabled}
          onClick={(e) => {
            e.preventDefault();
            onPrevClick(e);
          }}
        >
          ←
          {' '}
          <span className="truncate">Semana anterior</span>
        </LinkButton>

        <LinkButton
          href={todayHref}
          onClick={(e) => {
            e.preventDefault();
            onTodayClick(e);
          }}
        >
          Hoy
        </LinkButton>
        <LinkButton
          className="max-w-[140px] md:max-w-none"
          href={nextHref}
          onClick={(e) => {
            e.preventDefault();
            onNextClick(e);
          }}
        >
          <span className="truncate">Semana siguiente</span>
          {' '}
          →
        </LinkButton>
      </div>
    </nav>
  );
}
