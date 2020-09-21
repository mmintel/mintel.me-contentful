import { Locale } from '@/core/domain';
import { Page } from '@/core/features/page/domain';
import { Site } from '@/core/features/site/domain';
import React, { useContext } from 'react';

interface PageContextProviderProps {
  value: any;
  children: React.ReactNode;
}

interface PageContextValue {
  site?: Site;
  page?: Page;
  locales?: Locale[];
  defaultLocale?: Locale;
  currentLocale?: Locale;
}

export const PageContext = React.createContext<PageContextValue>({});

export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  value,
  children,
}) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = (): PageContextValue =>
  useContext<PageContextValue>(PageContext);
