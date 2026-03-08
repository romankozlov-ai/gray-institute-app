import { locales } from '@/i18n';

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force static generation
export const dynamic = 'force-static';
