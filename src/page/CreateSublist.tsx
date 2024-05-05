import React, { useContext, useRef, useState } from 'react';
import {AppStateContext, SubListType} from '../app-state.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import styles from '../styles/CreateList.module.scss'
 
const CreateList = () => {

const navigate = useNavigate();
const [sublistName, setSublistName] = useState('');
const [isResetting, setIsResetting] = useState(false);
const [resetTime, setResetTime] = useState('');
const { listId } = useParams<{ listId: string }>();

const myContextValue = useContext(AppStateContext);
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   currentSublists,
   addSublistToDatabase,
   setSubLists,
   userId
} = myContextValue;


const handleSublistNameChange = (event) => {
    setSublistName(event.target.value);
  };

  const handleResettingChange = (event) => {
    setIsResetting(event.target.checked);
  };

  const handleResetTimeChange = (event) => {
    const selectedTime = event.target.value; // Assuming the event provides the selected time
    setResetTime(selectedTime);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const sublistData: SubListType = {
        name: sublistName,
        isResetting: isResetting,
        resetTime: resetTime,
        items: [],
        parentList: listId,
        ownerId: userId
    };
    const updatedSublists: Array<SubListType> = [...currentSublists, sublistData ]
    addSublistToDatabase(sublistData)
    setSubLists(updatedSublists)
    navigate(`/list/${listId}`); // Navigate back to MainList component
  };

 
  return (
    <>
    <div className={styles.form}>
    <form onSubmit={handleSubmit}>
        <div className={`${styles.form__group} ${styles.field}`}>
        <input 
          type="text" 
          className={styles.form__field} 
          placeholder="Sublist Name" 
          name="name" 
          id='name' 
          value={sublistName}
          onChange={handleSublistNameChange}
          required />
      <label htmlFor="name" className={styles.form__label}>Sublist Name</label>
    </div>
    <div className={styles.resetContainer}>
    Do you want this list to reset?
      <div className={styles.checkbox_wrapper_3}>
        <input
          type="checkbox"
          checked={isResetting}
          onChange={handleResettingChange}
          id={styles.cbx_3}
        />
        <label htmlFor="CreateList_cbx_3__qxUTt" className={styles.toggle}><span></span></label>
      </div>
      <div className={styles.timeContainer}>
      {isResetting && (
   
          <label>
            Reset Time:
            <input
                type="time"
                value={resetTime}
                onChange={handleResetTimeChange}
                required
            />
        </label>
     
      )}
         </div>
       </div>
      <button className={styles.createButton} type="submit">Create Sublist</button>
    </form>
    </div>
    <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
}
 
export default CreateList