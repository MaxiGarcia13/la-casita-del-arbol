import type { ReactNode } from 'react';
import { cn } from '../utils/classes';

export interface LinkButtonProps {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
}

export function LinkButton(props: LinkButtonProps) {
  const {
    href,
    target = '_blank',
    rel = 'noopener noreferrer',
    className = '',
    children,
    ariaLabel,
    onClick,
    disabled = false,
  } = props;

  const classNames = cn(
    'inline-flex items-center justify-center gap-2 text-sm font-medium rounded border-2 px-3 py-1.5',
    className,
  );

  if (disabled) {
    return (
      <span
        className={cn(classNames, 'border-charcoal/40 bg-charcoal/5 text-charcoal/50 cursor-not-allowed')}
        aria-disabled
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(classNames, 'hover:bg-charcoal/10')}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
