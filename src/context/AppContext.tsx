import { Site } from '@/core/domain';
import React, { ReactNode } from 'react';

interface AppContexType {
  site: Site;
}

interface AppProviderProps {
  site: Site;
  children: ReactNode;
}

const AppContext = React.createContext<AppContexType | undefined>(undefined);

export const useApp = (): AppContexType => {
  const c = React.useContext(AppContext);
  if (!c) throw new Error('useApp must be used inside an AppProvider.');
  return c;
};

export const AppProvider: React.FC<AppProviderProps> = ({ site, children }) => {
  return <AppContext.Provider value={{ site }}>{children}</AppContext.Provider>;
};
