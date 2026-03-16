import type { ModalHandle } from '../modal/modal';
import type { CalendarEvent } from './types';
import { InstagramIcon } from '../../assets/instagram';
import { TeacherIcon } from '../../assets/teacher';
import { UserGroupIcon } from '../../assets/user-group';
import { formatDuration } from '../../utils/date';
import { formatPrice } from '../../utils/numbers';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '../modal';
import { WhatsappLinkButton } from '../whatsapp-link-button';
import { formatEventDateTime } from './utils';

export interface EventModalProps extends CalendarEvent {
  ref?: React.RefObject<ModalHandle | null>;
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
}: EventModalProps) {
  const hasTeachers = (teamMembers?.length ?? 0) > 0;
  const teacherNames = teamMembers?.map(t => [t.name, t.surname].filter(Boolean).join(' ').trim() || t.id) ?? [];

  return (
    <Modal
      ref={ref}
      size="full"
      panelClassName={className}
      closeOnEscape
      closeOnOverlayClick
    >
      <ModalHeader className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-xl font-semibold tracking-tight wrap-break-word">
          {title}
        </h2>
        {typeof availableSpots === 'number' && (
          <span className="flex items-center gap-2 text-sm font-normal text-charcoal/80">
            <UserGroupIcon className="size-4" />
            {customerIds.length}
            /
            {availableSpots}
          </span>
        )}
      </ModalHeader>

      <ModalContent className="flex flex-col gap-4">
        {description && (
          <section>
            <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-charcoal/70">
              Descripción
            </h4>
            <p className="wrap-break-word text-sm">{description}</p>
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
                  {teacherNames.length === 1 ? 'Profe' : 'Profes'}
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
      </ModalContent>

      <ModalFooter className="flex gap-4 justify-end items-center">
        <button
          type="button"
          className="w-full cursor-pointer rounded border border-border p-2 max-w-[120px]"
          onClick={() => ref?.current?.close()}
        >
          Cerrar
        </button>
        {typeof availableSpots === 'number' && customerIds.length < availableSpots && (
          <WhatsappLinkButton
            className="shrink-0"
            variant="filled"
            message={`Hola, me gustaría inscribirme en ${title} del ${formatEventDateTime(startDate ?? '')}`}
          >
            Hay lugares disponibles
          </WhatsappLinkButton>
        )}
      </ModalFooter>
    </Modal>
  );
}
