import type { CalendarEvent } from './types';
import { UserGroupIcon } from '../../assets/user-group.tsx';
import { cn } from '../../utils/classes';
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
  customerIds,
  startDate,
}: EventCardProps) {
  return (
    <dialog
      ref={ref}
      className={cn(
        'bg-surface text-charcoal m-auto  h-full max-h-[400px] w-full max-w-[400px] rounded p-4 outline-none',
        className,
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          ref?.current?.close?.();
        }
      }}
    >
      <div className="flex h-full flex-col gap-4">
        <header className="flex flex-wrap items-center justify-between">
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

        <p className="flex-1 overflow-y-auto text-sm wrap-break-word">{description}</p>

        <footer className="flex gap-4">
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
