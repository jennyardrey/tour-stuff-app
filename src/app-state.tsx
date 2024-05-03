import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { auth, db } from './firebase_setup/firebase';
import 'firebase/firestore';


export interface SubListType {
    isRepeating: boolean;
    name: string;
    repeatDays: Array<string>;
    items: Array<SubListItem>;
    parentList: string | undefined;
    id?: string | undefined;
    ownerId: string;
}

export interface MainListType {
    name: string;
    uuid: string;
    id?: string;
}
export interface SubListItem {
    id?: string | undefined;
    name: string;
    isRepeating: boolean;
    sublistId: string;
    isComplete: boolean;
    userId: string;
}
interface AppState {
  userId: string;
  isLoggedIn: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  mainLists: Array<MainListType>
  currentSublists: Array<SubListType>;
  setCurrentSublists: Dispatch<SetStateAction<Array<SubListType>>>;
  createMainList: (listName: any) => Promise<any>;
  addSublistToDatabase: (sublist: SubListType) => Promise<any>;
  addItemToDatabase: (item: SubListItem) => Promise<any>;
  items: Array<SubListItem>;
  updateItemInDatabase: (itemId: string, updatedItemData: SubListItem | undefined) => Promise<any>;
  currentSublistId: string;
  setCurrentSublistId: Dispatch<SetStateAction<string>>;
  subLists: Array<SubListType>;
  handleDeleteList: (listId: string) => Promise<any>;
  setCurrentMainList: Dispatch<SetStateAction<string>>
  currentMainList: string;
  currentItems: Array<SubListItem>; 
  setCurrentItems: Dispatch<SetStateAction<Array<SubListItem>>>
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setMainLists: Dispatch<SetStateAction<Array<MainListType>>>
  setSubLists: Dispatch<SetStateAction<Array<SubListType>>>
  setItems: Dispatch<SetStateAction<Array<SubListItem>>>
}

interface AppStateContextValue extends AppState {}

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      } else {
        setIsLoggedIn(false);
        setUserId('');
      }
    });

    return () => unsubscribe();
  }, []);

  return { isLoggedIn, userId, setIsLoggedIn };
};


const useInitialDataFetch = (userId, shouldFetchData) => {
  const [mainLists, setMainLists] = useState<Array<MainListType>>([]);
  const [subLists, setSubLists] = useState<Array<SubListType>>([]);
  const [items, setItems] = useState<Array<SubListItem>>([]);

  useEffect(() => {
    if (shouldFetchData) {
      const fetchData = async () => {
        try {
          // Fetch all mainLists
          const mainListsSnapshot = await   db
          .collection('/mainLists')
          .where('ownerId', '==', userId)
          .get();
        const mainListsData = mainListsSnapshot.docs.map(doc => ({
          name: doc.data().name,
          uuid: doc.id,
          ...doc.data()
      }));
      setMainLists(mainListsData);

          const subListsSnapshot = await db
          .collection('sublists')
          .where('ownerId', '==', userId)
          .get();
      const subListsData = subListsSnapshot.docs.map(doc => ({
          id: doc.id,
          isRepeating:doc.data().isRepeating,
          name:doc.data().name,
          repeatDays:doc.data().repeatDays,
          items:doc.data().items,
          parentList:doc.data().parentList,
          ownerId:doc.data().ownerId,
          ...doc.data()
      }));
      setSubLists(subListsData);

          const itemsSnapshot = await db
          .collection('items')
          .where('userId', '==', userId)
          .get();
      const itemsData = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          isRepeating:doc.data().isRepeating,
          sublistId:doc.data().parentList,
          isComplete:doc.data().isComplete,
          userId:doc.data().userId,
          ...doc.data()
      }));
          setItems(itemsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [shouldFetchData, userId]);

  return { mainLists, subLists, items, setMainLists, setSubLists, setItems };
};

export const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {

  // state

const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('');

const [currentSublists, setCurrentSublists] = useState<SubListType[]>([]);
const [currentMainList, setCurrentMainList] = useState<string>('')
const [currentSublistId, setCurrentSublistId] = useState<string>("");
const [currentItems, setCurrentItems] = useState<Array<SubListItem>>([]);
const [shouldFetchData, setShouldFetchData] = useState(false);
const { isLoggedIn, userId, setIsLoggedIn } = useAuth();
const { mainLists, subLists, items, setMainLists, setSubLists, setItems } = useInitialDataFetch(userId, shouldFetchData);


useEffect(() => {
  if (isLoggedIn && !shouldFetchData) {
    setShouldFetchData(true);
  }
}, [isLoggedIn, shouldFetchData]);

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

const handleDeleteList = async (listId) => {
  try {
    await db
    .collection('/mainLists')
    .doc(listId).delete();

  } catch(error) {
    console.error('Error deleting list:', error);
        throw error;
  }
}


  const addSublistToDatabase = async (sublistData: SubListType) => {
    try {
      // Add the sublist data to the sublists collection in Firestore
      await db.collection('sublists').add(sublistData);
    } catch (error) {
      console.error('Error adding sublist to database:', error);
      throw error;
    }
  };

  const addItemToDatabase = async (itemData: SubListItem) => {
    try {
        await db.collection('items').add(itemData);
    } catch (error) {
        console.error('Error adding item to database:', error);
        throw error;
    }
  }




    const updateItemInDatabase = async (itemId: string, updatedItemData: SubListItem | undefined) => {
      if (updatedItemData) {
        try {
          await db.collection('items').doc(itemId).update(updatedItemData);
          console.log('Item updated successfully');
          } catch (error) {
            console.error('Error updating item in database: ', error);
            throw error;
          }
        } 
      };

  const contextValue: AppStateContextValue = {
   userId,
   isLoggedIn,
   email,
   setEmail,
   password,
   setPassword,
   mainLists,
   subLists,
   currentSublists,
   setCurrentSublists,
   createMainList,
   addSublistToDatabase,
   addItemToDatabase,
   items,
   updateItemInDatabase,
   currentSublistId, 
   setCurrentSublistId,
   handleDeleteList,
   currentMainList,
   setCurrentMainList,
   currentItems, 
   setCurrentItems,
   setIsLoggedIn,
   setMainLists,
   setSubLists,
   setItems
  };

  

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
