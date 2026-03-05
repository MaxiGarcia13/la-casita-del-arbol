import { useRef } from 'react'

export interface EventCardProps {
  ref?: React.RefObject<HTMLDivElement | null>
  id: string
  title: string
  description?: string
  className?: string
  style?: React.CSSProperties
}

export default function EventCard ({
  ref,
  id,
  title,
  description,
  className = '',
  style,
}: EventCardProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  return (
    <>
      <div
        ref={ref}
        id={id}
        className={`flex flex-col h-full overflow-y-auto overflow-x-hidden p-2 cursor-pointer rounded bg-primary text-charcoal ${className}`.trim()}
        data-event-id={id}
        style={style}
        onClick={() => {
          if (dialog.current) {
            dialog.current.showModal()
          }
        }}
      >
        <h3 className='hidden text-sm font-semibold wrap-break-word md:block'>{title}</h3>
      </div>

      <dialog
        ref={dialog}
        className='bg-surface text-charcoal m-auto  h-full max-h-[400px] w-full max-w-[400px] rounded p-4 outline-none'
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialog.current?.close()
          }
        }}
      >
        <div className='flex h-full flex-col gap-4'>
          <h3 className='text-2xl font-semibold wrap-break-word'>{title}</h3>

          <p className='flex-1 overflow-y-auto text-sm wrap-break-word'>{description}</p>

          <button
            className='border-charcoal w-full cursor-pointer rounded border-2 p-2'
            onClick={() => dialog.current?.close()}
          >
            Cerrar
          </button>
        </div>
      </dialog>
    </>
  )
}
