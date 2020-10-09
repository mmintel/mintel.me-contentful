import { Site } from '@/core/domain';
import React, { ReactNode } from 'react';
import { createContext } from './createContext';

interface AppContexType {
  site: Site;
}

interface AppProviderProps {
  site: Site;
  children: ReactNode;
}

const [useApp, CtxProvider] = createContext<
  AppContexType
>();

export const AppProvider: React.FC<AppProviderProps> = ({
  site,
  children
}) => {
  return (
    <CtxProvider value={{ site }}>
      {children}
    </CtxProvider>
  );
};

export {
  useApp,
};
