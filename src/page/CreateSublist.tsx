import React, { useContext, useRef, useState } from 'react';
import {AppStateContext, SubListType} from '../app-state.tsx';
import { useNavigate, useParams } from 'react-router-dom';
 
const CreateList = () => {

const navigate = useNavigate();
const [sublistName, setSublistName] = useState('');
const [isRepeating, setIsRepeating] = useState(false);
const [repeatDays, setRepeatDays] = useState(['']);
const { listId } = useParams<{ listId: string }>();
const dataRef = useRef()

const myContextValue = useContext(AppStateContext);
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   sublists,
   setSublist,
   addSublistToDatabase
} = myContextValue;
const handleSublistNameChange = (event) => {
    setSublistName(event.target.value);
  };

  const handleRepeatingChange = (event) => {
    setIsRepeating(event.target.checked);
  };

  const handleRepeatDaysChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRepeatDays((prev) => [...prev, value]);
    } else {
      setRepeatDays((prevRepeatDays) =>
        prevRepeatDays.filter((day) => day !== value)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sublistData: SubListType = {
        name: sublistName,
        isRepeating: isRepeating,
        repeatDays: isRepeating ? repeatDays : [],
        items: [],
        parentList: listId
    };
    console.log('listid: ', listId)
    const updatedSublists: Array<SubListType> = [...sublists, sublistData ]
    addSublistToDatabase(sublistData)
    setSublist(updatedSublists)
    navigate(`/list/${listId}`); // Navigate back to MainList component
  };

 
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sublist Name:
        <input
          type="text"
          value={sublistName}
          onChange={handleSublistNameChange}
          required
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={isRepeating}
          onChange={handleRepeatingChange}
        />
        Repeating
      </label>
      {isRepeating && (
        <div>
          <label>Repeat on:</label>
          <br />
          <label>
            <input
              type="checkbox"
              value="sunday"
              checked={repeatDays.includes('sunday')}
              onChange={handleRepeatDaysChange}
            />
            Sunday
          </label>
          <label>
            <input
              type="checkbox"
              value="monday"
              checked={repeatDays.includes('monday')}
              onChange={handleRepeatDaysChange}
            />
            Monday
          </label>
          <label>
            <input
              type="checkbox"
              value="tuesday"
              checked={repeatDays.includes('tuesday')}
              onChange={handleRepeatDaysChange}
            />
            Tuesday
          </label>
          <label>
            <input
              type="checkbox"
              value="wednesday"
              checked={repeatDays.includes('wednesday')}
              onChange={handleRepeatDaysChange}
            />
            Wednesday
          </label>
          <label>
            <input
              type="checkbox"
              value="thursday"
              checked={repeatDays.includes('thursday')}
              onChange={handleRepeatDaysChange}
            />
            Thursday
          </label>
          <label>
            <input
              type="checkbox"
              value="friday"
              checked={repeatDays.includes('friday')}
              onChange={handleRepeatDaysChange}
            />
            Friday
          </label>
          <label>
            <input
              type="checkbox"
              value="saturday"
              checked={repeatDays.includes('saturday')}
              onChange={handleRepeatDaysChange}
            />
            Saturday
          </label>
        </div>
      )}
      <button type="submit">Create Sublist</button>
    </form>
  );
}
 
export default CreateList