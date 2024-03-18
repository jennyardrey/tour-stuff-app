import React, { useContext, useRef, useState } from 'react';
import {AppStateContext} from '../app-state.tsx';
import { useNavigate } from 'react-router-dom';
 
const CreateList = () => {
const myContextValue = useContext(AppStateContext);
const navigate = useNavigate();
const [newList, setNewList] = useState<string>('')
const dataRef = useRef()
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   setMainList
} = myContextValue;
const handleInputChange = (event) => {
    setNewList(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setMainList(prevList => [...prevList, newList]);
    navigate("/home")
  };

 
  return (
    <>
    <form onSubmit={handleSubmit}>
    <label>
      List Name:
      <input
        type="text"
        value={newList}
        onChange={handleInputChange}
        required
      />
    </label>
    <button type="submit">Create</button>
  </form>
  
  </>
  )
}
 
export default CreateList