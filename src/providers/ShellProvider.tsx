import { useState, ReactNode, ReactElement } from 'react';

import { ShellContext } from '@src/contexts/ShellContext';

export const ShellProvider = ({ children }: { children: ReactNode }) => {
  const [AfterHeaderComponent, setAfterHeaderComponent] =
    useState<ReactElement | null>(null);
  const [BeforeFooterComponent, setBeforeFooterComponent] =
    useState<ReactElement | null>(null);

  return (
    <ShellContext.Provider
      value={{
        AfterHeaderComponent,
        setAfterHeaderComponent,
        BeforeFooterComponent,
        setBeforeFooterComponent,
      }}
    >
      {children}
    </ShellContext.Provider>
  );
};
