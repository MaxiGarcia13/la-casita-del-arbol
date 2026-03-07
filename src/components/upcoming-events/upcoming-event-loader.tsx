import Skeleton from '../skeleton';

export function UpcomingEventLoader({ rows }: { rows?: number }) {
  return (
    <ul
      className="flex flex-col gap-4"
      aria-label="Próximos eventos y novedades"
      aria-busy
    >
      <Skeleton variant="block" rows={rows} />
    </ul>
  );
}
