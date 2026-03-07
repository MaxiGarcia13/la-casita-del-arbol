import type { ReactNode } from 'react';
import { WhatsappIcon } from '../assets/whatsapp.tsx';
import { WHATSAPP_NUMBER } from '../constans/business.ts';
import { cn } from '../utils/classes.ts';
import { LinkButton } from './link-button.tsx';

const DEFAULT_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;
const DEFAULT_ARIA_LABEL = 'WhatsApp la casita del árbol';

export interface WhatsappLinkButtonProps {
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  variant?: 'filled' | 'default';
  message?: string;
}

export function WhatsappLinkButton({
  ariaLabel = DEFAULT_ARIA_LABEL,
  className = '',
  children,
  variant = 'default',
  message,
}: WhatsappLinkButtonProps) {
  return (
    <LinkButton
      href={DEFAULT_HREF + (message ? `?text=${message}` : '')}
      ariaLabel={ariaLabel}
      className={cn(variant === 'filled' && 'inline-flex items-center gap-2 rounded border-2 border-[#25D366] bg-[#25D366] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#20bd5a]', className)}
    >
      <WhatsappIcon />
      {children}
    </LinkButton>
  );
}
