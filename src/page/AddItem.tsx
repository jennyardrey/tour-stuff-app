import React, { useContext, useRef, useState } from 'react';
import { AppStateContext, SubListItem, SubListType } from '../app-state.tsx';

function AddItem  ( {sublist} ) {
const myContextValue = useContext(AppStateContext);
const [itemName, setItemName] = useState('');
const [isRepeating, setIsRepeating] = useState(false);
const dataRef = useRef()
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
    sublists, 
    setSublist
} = myContextValue;



console.log('name:',sublist)

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleRepeatingChange = (event) => {
    setIsRepeating(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem: SubListItem = {
      name: itemName,
      isRepeating: isRepeating
    };
    
    const updatedSubtask = {
        ...sublist,
        items: [...sublist.items] // Create a shallow copy of the original array
      };
      
      // Add the new item to the copied array
      updatedSubtask.items.push(newItem);

    console.log('ust',updatedSubtask)
    const updatedSublists: Array<SubListType> = sublists.map((sublist) => {
        if (sublist.name === updatedSubtask.name) {
          return updatedSubtask;
        }
        return sublist;
      });
      setSublist(updatedSublists); // Updating the subtasks array in app state
  
    // Reset form state after submission
    setItemName('');
    setIsRepeating(false);
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
        <label>
          <input
            type="checkbox"
            checked={isRepeating}
            onChange={handleRepeatingChange}
          />
          Do not repeat
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;