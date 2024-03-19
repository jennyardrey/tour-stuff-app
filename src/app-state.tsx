import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, ChangeEvent, FormEvent, useEffect } from 'react';
import { auth, db } from './firebase_setup/firebase';
import 'firebase/firestore';


export interface SubListType {
    isRepeating: boolean;
    name: string;
    repeatDays: Array<string>;
    items: Array<SubListItem>;
    parentList: string;
    id: string;
}

export interface MainListType {
    name: string;
    uuid: string;
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
  mainLists: Array<MainListType>
  setMainList: Dispatch<SetStateAction<MainListType[]>>;
  sublists: Array<SubListType>;
  setSublist: Dispatch<SetStateAction<Array<SubListType>>>;
  createMainList: (listName: any) => Promise<any>;
  fetchSublistsForMainList: (mainListId: string) => Promise<{ id: string; }[]>;
  addSublistToDatabase: (sublist: SubListType) => Promise<any>
}

interface AppStateContextValue extends AppState {}

export const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {

  // state
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
const [userId, setUserId] = useState<string>('')
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('');
const [mainLists, setMainList] = useState<Array<MainListType>>([]);
const [sublists, setSublist] = useState<SubListType[]>([]);

  // functions
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            setIsLoggedIn(true)
            setUserId(uid);
        } else {
            setIsLoggedIn(false)
            setUserId('')
            setEmail('')
            setPassword('')
        }
      });
}, [])

useEffect(() => {
    fetchUserLists()
},[userId])

  //submit to database
  const createMainList = async (listName) => {
    try {
        // Add a new document with a generated ID to the "lists" collection
        const newListRef = await db.collection('mainLists').add({
            name: listName,
            ownerId: userId
        });
        // Return the ID of the newly created list
        return newListRef.id;
    } catch (error) {
        console.error('Error creating main list:', error);
        throw error;
    }
    
};

const fetchUserLists = async () => {
    try {
      // Get current user
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Query Firestore for user's lists
        const listsSnapshot = await db
          .collection('mainLists')
          .where('ownerId', '==', currentUser.uid)
          .get();

        // Extract lists data from snapshot
        const userLists = listsSnapshot.docs.map(doc => ({
          uuid: doc.id,
          name: doc.data().name,

          ...doc.data()
        }));

        // Update state with user's lists
        setMainList(userLists);
        console.log('userlists',userLists)
      }
    } catch (error) {
      console.error('Error fetching user lists:', error);
    }
  }

  // Function to fetch sublists for a given main list
const fetchSublistsForMainList = async (mainListId: string) => {
    try {
      // Query Firestore for sublists associated with the main list
      const sublistsSnapshot = await db
        .collection('sublists')
        .where('parentList', '==', mainListId)
        .get();
  
      // Extract sublists data from snapshot
      const sublists = sublistsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        ...doc.data()
      }));
  
      return sublists;
    } catch (error) {
      console.error('Error fetching sublists:', error);
      throw error;
    }
  };

  const addSublistToDatabase = async (sublistData: SubListType) => {
    try {
      // Add the sublist data to the sublists collection in Firestore
      await db.collection('sublists').add(sublistData);
    } catch (error) {
      console.error('Error adding sublist to database:', error);
      throw error;
    }
  };

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
   setSublist,
   createMainList,
   fetchSublistsForMainList,
   addSublistToDatabase
  };

  

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
