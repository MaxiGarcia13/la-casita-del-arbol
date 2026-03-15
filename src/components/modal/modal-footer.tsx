import { cn } from '../../utils/classes';

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <footer
      className={cn(
        'shrink-0 p-4',
        className,
      )}
    >
      {children}
    </footer>
  );
}
