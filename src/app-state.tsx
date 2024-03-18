import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, ChangeEvent, FormEvent, useEffect } from 'react';
import { auth } from './firebase_setup/firebase';

export interface SubListType {
    isRepeating: boolean;
    name: string;
    repeatDays: Array<string>;
    items: Array<SubListItem>;
    parentList: string;
}

export interface SubListItem {
    name: string;
    isRepeating: boolean;
}
interface AppState {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  mainLists: Array<string>
  setMainList: Dispatch<SetStateAction<string[]>>;
  sublists: Array<SubListType>;
  setSublist: Dispatch<SetStateAction<Array<SubListType>>>;
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
const [mainLists, setMainList] = useState<Array<string>>([]);
const [sublists, setSublist] = useState<SubListType[]>([]);

  // functions
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setIsLoggedIn(true)
          console.log("uid", uid)
        } else {
            setIsLoggedIn(false)
          console.log("user is logged out")
        }
      });
     
}, [])
  //submit to database


  const contextValue: AppStateContextValue = {
   isLoggedIn,
   setIsLoggedIn,
   email,
   setEmail,
   password,
   setPassword,
   mainLists,
   setMainList,
   sublists,
   setSublist
  };

  

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
