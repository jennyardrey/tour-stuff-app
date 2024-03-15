import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, ChangeEvent, FormEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

interface AppState {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

interface AppStateContextValue extends AppState {}

export const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {

  // state
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('');
  // functions

  const contextValue: AppStateContextValue = {
   isLoggedIn,
   setIsLoggedIn,
   email,
   setEmail,
   password,
   setPassword
  };

  

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
