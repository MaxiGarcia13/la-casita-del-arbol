import type { CalendarEvent } from './types';
import { useRef } from 'react';
import { UserGroupIcon } from '../../assets/user-group.tsx';
import { cn } from '../../utils/classes';

import { WhatsappLinkButton } from '../whatsapp-link-button.tsx';
import { formatEventDateTime } from './utils';

export interface EventCardProps extends CalendarEvent {
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export default function EventCard({
  ref,
  id,
  title,
  description,
  className = '',
  type,
  style,
  totalSlots,
  slotsOccupied,
  startDate,
}: EventCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div
        ref={ref}
        id={id}
        className={
          cn(
            'flex justify-between items-center flex-wrap h-full overflow-y-auto overflow-x-hidden p-2 cursor-pointer text-charcoal',
            className,
            type !== 'lesson' ? 'bg-secondary' : 'bg-primary',
          )
        }
        data-event-id={id}
        style={style}
        onClick={() => {
          if (dialogRef.current) {
            dialogRef.current.showModal();
          }
        }}
      >
        <h3 className="hidden text-sm font-semibold wrap-break-word md:block">{title}</h3>
        {
          typeof totalSlots === 'number' && (
            <span className="hidden items-center gap-2 md:flex">
              <UserGroupIcon className="size-2" />

              <span className="text-sm">
                {slotsOccupied}

                /
                {totalSlots}
              </span>
            </span>
          )
        }
      </div>

      <dialog
        ref={dialogRef}
        className="bg-surface text-charcoal m-auto  h-full max-h-[400px] w-full max-w-[400px] rounded p-4 outline-none"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="flex h-full flex-col gap-4">
          <header className="flex flex-wrap items-center justify-between">
            <h3 className="text-2xl font-semibold wrap-break-word">{title}</h3>
            {
              typeof totalSlots === 'number' && (
                <span className="flex items-center gap-2">
                  <UserGroupIcon className="size-2" />

                  <span className="text-sm">
                    {(slotsOccupied ?? 0)}
                    /
                    {totalSlots}
                  </span>
                </span>
              )
            }
          </header>

          <p className="flex-1 overflow-y-auto text-sm wrap-break-word">{description}</p>

          <footer className="flex gap-4">
            <button
              className="border-charcoal w-full cursor-pointer rounded border-2 p-2"
              onClick={() => dialogRef.current?.close()}
            >
              Cerrar
            </button>
            {
              typeof totalSlots === 'number' && (slotsOccupied ?? 0) < totalSlots && (
                <WhatsappLinkButton
                  className="shrink-0"
                  variant="filled"
                  message={`Hola, me gustaría inscribirme en ${title} del ${formatEventDateTime(startDate)}`}
                >
                  Hay lugares disponibles
                </WhatsappLinkButton>
              )
            }
          </footer>
        </div>
      </dialog>
    </>
  );
}
