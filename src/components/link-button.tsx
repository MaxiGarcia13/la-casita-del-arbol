import { cn } from '../utils/classes';
import type { ReactNode } from 'react';

export interface LinkButtonProps {
  href: string
  target?: string
  rel?: string
  className?: string
  ariaLabel?: string
  children?: ReactNode
}

export function LinkButton (props: LinkButtonProps) {
  const {
    href,
    target = '_blank',
    rel = 'noopener noreferrer',
    className = '',
    children,
    ariaLabel
  } = props;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn('inline-flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2.5', className)}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
