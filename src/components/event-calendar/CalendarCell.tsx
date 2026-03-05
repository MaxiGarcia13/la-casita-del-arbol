import { useRef, useEffect } from 'react'
import EventCard from './EventCard.tsx'

export interface CalendarCellEvent {
  id: string
  title: string
  description?: string
  spanSlots?: number
}

export interface CalendarCellProps {
  dayKey: string
  slotIndex: number
  /** Optional event to show in this cell */
  event?: CalendarCellEvent
  isEmpty?: boolean
  /** True when cell is covered by a multi-slot event (keeps grid layout) */
  isPlaceholder?: boolean
  /** True when cell is the last column in its row (no border-right) */
  isLastInRow?: boolean
  className?: string
}

export default function CalendarCell ({
  dayKey,
  slotIndex,
  event,
  isPlaceholder = false,
  className = '',
}: CalendarCellProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rowSpan = event?.spanSlots && event.spanSlots > 1 ? event.spanSlots : undefined

  useEffect(() => {
    if (!event || !cardRef.current) return

    const parentElement = cardRef.current?.parentElement

    if (!parentElement) return

    const spanSlots = event.spanSlots ?? 1

    cardRef.current.style.height = `${(parentElement.clientHeight - 8) * spanSlots}px`
    cardRef.current.style.width = `${(parentElement.clientWidth - 8)}px`

    const observer = new ResizeObserver(() => {
      if (!cardRef.current) return
      const parentElement = cardRef.current.parentElement

      if (parentElement) {
        cardRef.current.style.height = `${(parentElement.clientHeight * (spanSlots - 1)) - 8}px`
        cardRef.current.style.width = `${(parentElement.clientWidth - 8)}px`
      }
    })

    observer.observe(parentElement)

    return () => observer.disconnect()
  }, [event])

  return (
    <div
      className={`event-calendar-cell min-h-(--calendar-slot-height,4rem) p-1 border-b border-r border-black/15 ${className}`.trim()}
      data-day={dayKey}
      data-slot={slotIndex}
      role='gridcell'
      aria-hidden={isPlaceholder}
    >
      {event
        ? (
          <EventCard
            ref={cardRef}
            id={event.id}
            title={event.title}
            description={event.description}
            spanSlots={event.spanSlots ?? 1}
            className={rowSpan ? 'absolute' : undefined}
          />
          )
        : null}
    </div>
  )
}
