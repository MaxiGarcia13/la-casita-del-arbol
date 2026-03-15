import type { CalendarEvent } from './types';
import { InstagramIcon } from '../../assets/instagram.tsx';
import { TeacherIcon } from '../../assets/teacher.tsx';
import { UserGroupIcon } from '../../assets/user-group.tsx';
import { cn } from '../../utils/classes';
import { formatDuration } from '../../utils/date';
import { formatPrice } from '../../utils/numbers';
import { WhatsappLinkButton } from '../whatsapp-link-button.tsx';
import { formatEventDateTime } from './utils';

export interface EventCardProps extends CalendarEvent {
  ref?: React.RefObject<HTMLDialogElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export default function EventModal({
  ref,
  title,
  description,
  className = '',
  availableSpots,
  startDate,
  customerIds,
  teamMembers,
  price,
  instagram,
  durationMinutes,
}: EventCardProps) {
  const hasTeachers = (teamMembers?.length ?? teamMembers?.length ?? 0) > 0;
  const teacherNames = teamMembers?.map(t => [t.name, t.surname].filter(Boolean).join(' ').trim() || t.id) ?? [];

  return (
    <dialog
      ref={ref}
      className={cn(
        'bg-surface text-charcoal m-auto w-full max-w-[400px] rounded p-4 outline-none',
        // 85vh fallback; 85svh on iOS so height fits visible viewport (avoids address bar)
        'max-h-[85vh] max-h-[85svh]',
        'pb-[max(1rem,env(safe-area-inset-bottom))]',
        className,
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          ref?.current?.close?.();
        }
      }}
    >
      <div className="flex h-full max-h-[inherit] min-h-[300px] flex-col gap-4 relative">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-2xl font-semibold wrap-break-word">{title}</h3>
          {
            typeof availableSpots === 'number' && (
              <span className="flex items-center gap-2">
                <UserGroupIcon className="size-4" />

                <span className="text-sm">
                  {(customerIds.length)}
                  /
                  {availableSpots}
                </span>
              </span>
            )
          }
        </header>

        {description && (
          <section>
            <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-charcoal/70">Descripción</h4>
            <p className="flex-1 overflow-y-auto text-sm wrap-break-word">{description}</p>
          </section>
        )}

        {(hasTeachers || typeof price === 'number' || instagram || typeof durationMinutes === 'number') && (
          <div className="flex flex-col gap-3 text-sm">
            {typeof durationMinutes === 'number' && (
              <span>
                Duración:
                {' '}
                <strong>{formatDuration(durationMinutes)}</strong>
              </span>
            )}
            {hasTeachers && (
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 font-medium">
                  <TeacherIcon className="size-4 shrink-0" />
                  {teacherNames.length === 1 ? 'Docente' : 'Docentes'}
                </span>
                <ul className="list-inside list-disc pl-1 text-charcoal/90">
                  {teacherNames.length > 0
                    ? teacherNames.map((name, i) => (
                        <li key={teamMembers?.[i]?.id ?? i}>{name}</li>
                      ))
                    : (
                        <li>
                          {teamMembers?.length}
                          {' '}
                          miembro(s) del equipo
                        </li>
                      )}
                </ul>
              </div>
            )}
            {typeof price === 'number' && (
              <span>
                Precio por persona:
                {' '}
                <strong>{formatPrice(price)}</strong>
              </span>
            )}
            {instagram?.trim() && (
              <a
                href={instagram.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary hover:underline"
                aria-label="Instagram"
              >
                <InstagramIcon className="size-4 shrink-0" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        )}

        <footer className="mt-auto flex gap-4">
          <button
            className="border border-border w-full cursor-pointer rounded p-2"
            onClick={() => ref?.current?.close?.()}
          >
            Cerrar
          </button>
          {
            typeof availableSpots === 'number' && customerIds.length < availableSpots && (
              <WhatsappLinkButton
                className="shrink-0"
                variant="filled"
                message={`Hola, me gustaría inscribirme en ${title} del ${formatEventDateTime(startDate ?? '')}`}
              >
                Hay lugares disponibles
              </WhatsappLinkButton>
            )
          }
        </footer>
      </div>
    </dialog>
  );
}
