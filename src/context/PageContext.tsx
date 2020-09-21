import { Locale } from '@/core/domain';
import { Page } from '@/core/features/page/domain';
import { Site } from '@/core/features/site/domain';
import React, { useContext } from 'react';

interface PageContextProviderProps {
  value: PageContextValue;
  children: React.ReactNode;
}

interface PageContextValue {
  site: Site;
  page: Page;
  locales: Locale[];
  defaultLocale: Locale;
  currentLocale: Locale;
}

export const PageContext = React.createContext<PageContextValue | null>(null);

export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  value,
  children,
}) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = (): PageContextValue => {
  const context = useContext<PageContextValue | null>(PageContext);
  if (!context) {
    throw new Error('PageContext must be initialized.');
  }
  return context;
};
