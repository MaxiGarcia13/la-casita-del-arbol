import type { CalendarEvent } from './types';
import { useRef } from 'react';
import { UserGroupIcon } from '../../assets/user-group.tsx';
import { cn } from '../../utils/classes';
import EventModal from './event-modal.tsx';

export interface EventCardProps extends CalendarEvent {
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export default function EventCard({
  ref,
  id,
  title,
  className = '',
  type,
  style,
  availableSpots,
  customerIds,
  startDate,
  ...props
}: EventCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div
        ref={ref}
        id={id}
        className={
          cn(
            'flex justify-between  items-center flex-wrap h-full overflow-y-auto overflow-x-hidden p-2 cursor-pointer text-neutral-300',
            className,
            'text-neutral-900 border-l-3',
            type !== 'lesson'
              ? 'bg-secondary/20 border-secondary'
              : 'bg-primary/20 border-primary',
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
          typeof availableSpots === 'number' && (
            <span className="hidden items-center gap-2 md:flex">
              <UserGroupIcon className="size-4" />

              <span className="text-sm">
                {customerIds.length}
                /
                {availableSpots}
              </span>
            </span>
          )
        }
      </div>

      <EventModal
        id={id}
        ref={dialogRef}
        title={title}
        availableSpots={availableSpots}
        customerIds={customerIds}
        startDate={startDate}
        type={type}
        {...props}
      />
    </>
  );
}
