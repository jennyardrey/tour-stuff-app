import React, { useContext, useEffect, useState } from 'react';
import {AppStateContext, SubListType} from '../app-state.tsx';
import { useParams } from 'react-router-dom';
import AddItem from "../components/AddItem.tsx"
import Header from '../components/Header.tsx';
import styles from '../styles/Sublists.module.scss'
import { useNavigate } from 'react-router-dom';


const Sublist = () => {
const myContextValue = useContext(AppStateContext);
const { sublistId } = useParams<{ sublistId: string }>();
const [isAddItemVisible, setIsAddItemVisible] = useState(false);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [thisList, setThisList] = useState<SubListType>();
const navigate = useNavigate();

// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
  setCurrentSublists,
   items,
   setItems,
   updateItemInDatabase,
   currentItems, 
   setCurrentItems
} = myContextValue;


// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
        if (sublistId) {
            const filteredItems = items.filter(items => items.sublistId === sublistId);
            setCurrentItems(filteredItems)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
},[sublistId, items])


const handleItemCheckboxChange = (itemId: string) => {
  const updatedItems = currentItems.map(item => {
      if (item.id === itemId) {
          // Create a new object with the updated isComplete property
          return {
              ...item,
              isComplete: !item.isComplete
          };
      }
      // Return the unchanged item for other items
      return item;
  });

  setItems(updatedItems);
  // No need to find the updated item, as it's already in updatedItems
  updateItemInDatabase(itemId, updatedItems.find(item => item.id === itemId));
};

  //think i need to have a useEffect to re-render the data after its updated the item

const handleAddItemClick = () => {
  setIsAddItemVisible(true);
};
  return (
    <>
      <Header />
      <div className={styles.main}>
        <section>
          {currentItems.map(item => (
            <div key={item.id}>
              <input
                type="checkbox"
                checked={item.isComplete}
                onChange={() => item.id && handleItemCheckboxChange(item.id)} />
              <span>{item.name}</span>
            </div>
          ))}
        </section>
        <section>
          <button onClick={handleAddItemClick}>Add Item</button>
          {isAddItemVisible && <AddItem sublist={sublistId} />}
        </section>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  );
}
 
export default Sublist