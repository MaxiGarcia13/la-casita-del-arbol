import type { Event } from '../../services/type';
import { InstagramIcon } from '../../assets/instagram';
import { TeacherIcon } from '../../assets/teacher';
import { UserGroupIcon } from '../../assets/user-group';
import { formatDuration, getStartTimeFromStartDate } from '../../utils/date';
import { formatPrice } from '../../utils/numbers';
import { formatEventDateTime } from '../event-calendar';
import { WhatsappLinkButton } from '../whatsapp-link-button';

export function UpcomingEventCard({ event }: { event: Event }) {
  const {
    title,
    description = '',
    startDate,
    endDate,
    availableSpots,
    price,
    customerIds = [],
    teamMembers = [],
    durationMinutes,
    instagram,
  } = event;
  const ctaLabel = 'Consultar';
  const message = `Hola, me gustaría más información sobre: ${title}`;
  const dateLabel = formatEventDateTime(startDate ?? '') + (endDate ? ` hasta ${getStartTimeFromStartDate(endDate)}` : '');
  const hasSpots = typeof availableSpots === 'number';
  const spotsLabel = hasSpots ? `${customerIds.length}/${availableSpots} plazas` : null;
  const teacherNames = teamMembers.map(t => [t.name, t.surname].filter(Boolean).join(' ').trim() || t.id);

  return (
    <article className="pb-4">
      <header>
        <h3 className="text-lg font-semibold wrap-break-word">{title}</h3>
        <p className="mt-1 text-sm text-charcoal/80">{dateLabel}</p>
      </header>
      {description.trim()
        ? (
            <p className="mt-3 line-clamp-3 text-sm wrap-break-word">
              {description.trim()}
            </p>
          )
        : null}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-charcoal/80">
        {typeof durationMinutes === 'number' && (
          <span>{formatDuration(durationMinutes)}</span>
        )}
        {spotsLabel && (
          <span className="flex items-center gap-1">
            <UserGroupIcon className="size-4" />
            {spotsLabel}
          </span>
        )}
        {typeof price === 'number' && (
          <span>
            Precio:
            {formatPrice(price)}
          </span>
        )}
      </div>
      {teacherNames.length > 0 && (
        <div className="mt-2 flex items-center gap-2 text-sm text-charcoal/80">
          <TeacherIcon className="size-4 shrink-0" />
          <span>{teacherNames.join(', ')}</span>
        </div>
      )}
      {instagram?.trim() && (
        <a
          href={instagram.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 text-sm text-secondary hover:underline"
          aria-label="Instagram"
        >
          <InstagramIcon className="size-4 shrink-0" />
          <span>Instagram</span>
        </a>
      )}
      <footer className="mt-4">
        <WhatsappLinkButton message={message} variant="filled">
          <span>{ctaLabel}</span>
          <span aria-hidden="true">→</span>
        </WhatsappLinkButton>
      </footer>
    </article>
  );
}
