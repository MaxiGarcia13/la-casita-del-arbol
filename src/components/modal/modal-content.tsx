import { cn } from '../../utils/classes';

export function ModalContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex-1 overflow-y-auto overscroll-contain px-5 py-4', className)}>
      {children}
    </div>
  );
}
