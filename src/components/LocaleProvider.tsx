'use client';

import { useLocale } from 'next-intl';

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return <>{children}</>;
}
