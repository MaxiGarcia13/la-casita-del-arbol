export interface EventCardProps {
  ref?: React.RefObject<HTMLDivElement | null>
  id: string
  title: string
  description?: string
  /** Number of time slots this event spans (1 = 1 hour, 3 = 3 hours, etc.). Used for sizing. */
  spanSlots?: number
  className?: string
  style?: React.CSSProperties
}

export default function EventCard ({
  ref,
  id,
  title,
  description,
  spanSlots = 1,
  className = '',
  style,
}: EventCardProps) {
  return (
    <div
      ref={ref}
      id={id}
      className={`flex flex-col h-full overflow-y-auto overflow-x-hidden p-2 rounded bg-primary text-charcoal ${className}`.trim()}
      data-event-id={id}
      style={style}
    >
      <h3 className='text-lg font-semibold wrap-break-word'>{title}</h3>

      {description &&
        <p className='text-sm wrap-break-word'>{description}</p>}
    </div>
  )
}
