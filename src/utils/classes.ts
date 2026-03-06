export function cn(...classes: Array<string | undefined | boolean | null>): string {
  return classes.filter(Boolean).join(' ').trim();
}
