import type { ReactNode } from 'react';
import * as React from 'react';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/classes.ts';

export interface ModalHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface ModalProps {
  ref?: React.Ref<ModalHandle>;
  children: ReactNode;
  overlayClassName?: string;
  panelClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'max-w-[min(92vw,42rem)]',
} as const;

export function Modal({
  ref,
  children,
  overlayClassName,
  panelClassName,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md',
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const openModal = useCallback(() => setOpen(true), []);
  const toggle = useCallback(() => setOpen(prev => !prev), []);

  useImperativeHandle(
    ref,
    () => ({
      open: openModal,
      close,
      toggle,
    }),
    [openModal, close, toggle],
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape')
        close();
    },
    [close, closeOnEscape],
  );

  useEffect(() => {
    if (!open)
      return;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      previousActiveElementRef.current?.focus?.();
    };
  }, [open, handleEscape]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!closeOnOverlayClick)
      return;
    if (e.target === e.currentTarget)
      close();
  };

  if (!open)
    return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={cn(
        'fixed flex z-50 items-center justify-center p-4 w-full h-full',
        'bg-charcoal/40',
        overlayClassName,
      )}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        role="document"
        className={cn(
          'relative z-10 flex max-h-[85svh] w-full flex-col overflow-hidden rounded border border-border bg-surface text-charcoal shadow',
          sizeClasses[size],
          panelClassName,
        )}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
