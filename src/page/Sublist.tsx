import React, { useContext, useEffect, useState } from 'react';
import {AppStateContext, SubListType} from '../app-state.tsx';
import { useParams } from 'react-router-dom';
import AddItem from "../components/AddItem.tsx"
import styles from '../styles/Sublists.module.scss'
import { useNavigate } from 'react-router-dom';
import plus from '../assets/plus.svg'
import backIcon from '../assets/back.svg'
import { isInaccessible } from '@testing-library/react';


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
   setCurrentItems,
   currentSublists
} = myContextValue;


// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  if (sublistId) {
      const filteredItems = items.filter(items => items.sublistId === sublistId);
      setCurrentItems(filteredItems);
  }
}, [sublistId, items, setCurrentItems]);
// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  const list = currentSublists.find(list => list.id === sublistId);
  if (list) setThisList(list);
}, [sublistId, currentSublists]);
// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  if (thisList && thisList.isResetting && thisList.resetTime) {
      const [hours, minutes] = thisList.resetTime.split(":").map(Number);
      const resetTimeDate = new Date();
      resetTimeDate.setHours(hours);
      resetTimeDate.setMinutes(minutes);

      const resetTimeEpoch = resetTimeDate.getTime();
      const lastResetKey = `lastReset_${sublistId}`;
      const lastResetTime = localStorage.getItem(lastResetKey);

      if (!lastResetTime || (Date.now() > resetTimeEpoch && new Date(Number(lastResetTime)).getDate() !== resetTimeDate.getDate())) {
          currentItems.forEach(item => {
              if (item.id && item.isComplete) {
                  item.isComplete = false;
                  updateItemInDatabase(item.id, item);
              }
          });

          localStorage.setItem(lastResetKey, String(Date.now()));
      }
  }
}, [thisList, currentItems, updateItemInDatabase, sublistId]);




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
  setIsAddItemVisible(!isAddItemVisible);
};
  return (
    <>
      <div className={styles.main}>
        <section>
          <h2>{thisList?.name}</h2>
          {thisList?.isResetting ? <p>This list resets at {thisList.resetTime}</p> : null}
          {currentItems.map(item => (
            <div className={styles.checkbox_wrapper_11} key={item.id}>
              <input
              id={styles.complete}
                type="checkbox"
                name="r"
                value="2"
                checked={item.isComplete}
                onChange={() => item.id && handleItemCheckboxChange(item.id)} />
              <label htmlFor="complete">{item.name}</label>
            </div>
          ))}
        </section>
        <section className={styles.addItemContainer}>
          <button onClick={handleAddItemClick}><img src={plus} alt='add item' /></button>
          {isAddItemVisible && <AddItem sublist={sublistId} />}
        </section>
        <button className={styles.backBtn} onClick={() => navigate(-1)}><img src={backIcon} alt="back to sublists"/>Go back</button>
      </div>
    </>
  );
}
 
export default Sublist