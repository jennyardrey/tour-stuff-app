import React, { useContext, useState } from 'react';
import { AppStateContext, SubListItem, SubListType } from '../app-state.tsx';


function AddItem  ( {sublist} ) {
const myContextValue = useContext(AppStateContext);
const [itemName, setItemName] = useState('');
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
    setCurrentSublists,
    addItemToDatabase,
    userId,
    setCurrentItems,
    subLists,
    items

} = myContextValue;

const handleItemAdded = (newItem) => {
  setCurrentItems(prevItems => [...prevItems, newItem]);
};

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem: SubListItem = {
      name: itemName,
      sublistId: sublist,
      isComplete: false,
      userId: userId,
    };

    const findSublist: SubListType = subLists.filter(list => list.id === sublist)[0];
     const updatedSubtask: SubListType = {
        ...findSublist,
        items: [...findSublist.items] // Create a shallow copy of the original array
      }; 
      
      // Add the new item to the copied array
      updatedSubtask.items.push(newItem);

      
    const updatedSublists: any = subLists.map((sublist) => {
        if (sublist.name === updatedSubtask.name) {
          return updatedSubtask;
        }
        return sublist;
      });
      items.push(newItem)
      addItemToDatabase(newItem)
      handleItemAdded(newItem)
      setCurrentSublists(updatedSublists); // Updating the subtasks array in app state
  
    // Reset form state after submission
    setItemName('');
  }; 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={handleItemNameChange}
            required
          />
        </label>
       
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddItem;