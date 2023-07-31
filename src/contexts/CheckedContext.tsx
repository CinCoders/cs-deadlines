// CheckedContext.tsx
import React, { createContext, useState } from 'react';

export interface CheckedContextType {
  checked: string[];
  setChecked: (checked: string[]) => void;
}

const CheckedContext = createContext<CheckedContextType | null>(null);

type CheckedContextProviderProps = {
  children: React.ReactNode;
};

const CheckedContextProvider: React.FC<CheckedContextProviderProps> = ({ children }) => {
  const [checked, setChecked] = useState<string[]>([]);

  return <CheckedContext.Provider value={{ checked, setChecked }}>{children}</CheckedContext.Provider>;
};

export { CheckedContextProvider, CheckedContext };
