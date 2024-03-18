import React, { useContext, useEffect, useRef, useState } from 'react';
import {AppStateContext, SubListType, SubListItem} from '../app-state.tsx';
import { useParams } from 'react-router-dom';
import AddItem from "./AddItem.tsx"

const ListMain = () => {
const myContextValue = useContext(AppStateContext);
const { sublistName } = useParams<{ sublistName: string }>();
const [isAddItemVisible, setIsAddItemVisible] = useState(false);
const [thisList, setThisList] = useState<SubListType>();
const dataRef = useRef()
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   sublists
} = myContextValue;

console.log('param',sublistName)

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
    // get subtask items
    const thisList: SubListType | undefined = sublists.find(list => {
        return list.name === sublistName
    })
    if (thisList) {
        setThisList(thisList)
    }
},[sublists])





const handleAddItemClick = () => {
  setIsAddItemVisible(true);
};
 
  return (
    <>
    <section>        
    {thisList?.items.map(item =>
    <div>
    {item.name}

    </div>
  )}
    </section>
    <section>
    <button onClick={handleAddItemClick}>Add Item</button>
      {isAddItemVisible && <AddItem sublist={thisList} />}
    </section>

    </>
  )
}
 
export default ListMain