import { createContext, ReactElement } from 'react';

export type ShellContextData = {
  AfterHeaderComponent: ReactElement | null;
  BeforeFooterComponent: ReactElement | null;
  setAfterHeaderComponent: (component: ReactElement | null) => void;
  setBeforeFooterComponent: (component: ReactElement | null) => void;
};

export const ShellContext = createContext({} as ShellContextData);
