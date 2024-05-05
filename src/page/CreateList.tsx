import React, { useContext, useState } from 'react';
import {AppStateContext, MainListType} from '../app-state.tsx';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';
import styles from '../styles/CreateList.module.scss'

 
const CreateList = () => {
const myContextValue = useContext(AppStateContext);
const navigate = useNavigate();
const [newList, setNewList] = useState<MainListType>({
  name: '',
  uuid: ''
})
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   setMainList,
   createMainList
} = myContextValue;
const handleInputChange = (event) => {
    setNewList({name: event.target.value, uuid: ""});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMainList(newList?.name)
    .then(res => newList.uuid = res);

    setMainList(prevList => [...prevList, newList]);
    navigate("/home")
  };

 
  return (
    <>
    <div className={styles.form}>
    <form  onSubmit={handleSubmit}>
    <label>
      Add a new tour:
    </label>
    <input
        type="text"
        value={newList.name}
        onChange={handleInputChange}
        required
      />
    <button type="submit">Create</button>
  </form>
    </div>
   <button onClick={() => navigate(-1)}>Go back</button>
  
  </>
  )
}
 
export default CreateList