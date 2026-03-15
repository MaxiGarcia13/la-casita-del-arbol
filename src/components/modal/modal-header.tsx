import { cn } from '../../utils/classes';

export function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <header
      id="modal-title"
      className={cn(
        'flex shrink-0 items-center justify-between gap-2 p-4',
        className,
      )}
    >
      {children}
    </header>
  );
}
