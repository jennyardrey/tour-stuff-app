import React, { useContext, useState } from 'react';
import { AppStateContext, SubListItem, SubListType } from '../app-state.tsx';
import { useNavigate } from 'react-router-dom';


function AddItem  ( {sublist} ) {
const myContextValue = useContext(AppStateContext);
const [itemName, setItemName] = useState('');
const [isRepeating, setIsRepeating] = useState(false);
const navigate = useNavigate();
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
    currentSublists, 
    setCurrentSublists,
    addItemToDatabase,
    userId,
    setCurrentItems,
    subLists

} = myContextValue;


const handleItemAdded = (newItem) => {
  setCurrentItems(prevItems => [...prevItems, newItem]);
};

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
      isRepeating: isRepeating,
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
      addItemToDatabase(newItem)
      handleItemAdded(newItem)
      setCurrentSublists(updatedSublists); // Updating the subtasks array in app state
  
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
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default AddItem;