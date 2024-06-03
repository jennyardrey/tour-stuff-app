import React, { useState, useContext, useEffect } from 'react';
import { AppStateContext } from '../app-state.tsx';
import styles from '../styles/Settings.module.scss';
import { db } from '../firebase_setup/firebase.js';
import { useParams } from 'react-router-dom';
import closeIcon from '../assets/closeIcon.svg';


interface SettingsProps {
  sublistId: string | undefined;
  isVisible: boolean;
}

const Settings: React.FC<SettingsProps> = ({ sublistId, isVisible }) => {
  const [resetTime, setResetTime] = useState('');
  const [newName, setNewName] = useState('');
  const myContextValue = useContext(AppStateContext);
  const { listId } = useParams<{ listId: string }>();

  if (!myContextValue) {
    return null;
  }

  const { currentSublists, setSubLists, setSettingsVisible, handleDeleteSublist } = myContextValue;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const sublist = currentSublists.find(sublist => sublist.id === sublistId);
    if (sublist) {
      if (sublist.resetTime) {
        setResetTime(sublist.resetTime);
      }
      setNewName(sublist.name);
    }
  }, [currentSublists, sublistId]);

  const handleResetTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetTime(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleSaveChanges = async () => {
    const updatedSublists = currentSublists.map(sublist => {
      if (sublist.id === sublistId) {
        return { ...sublist, resetTime, name: newName };
      }
      return sublist;
    });

    setSubLists(updatedSublists);

    const sublistToUpdate = updatedSublists.find(sublist => sublist.id === sublistId);
    if (sublistToUpdate) {
      try {
        await db.collection('sublists').doc(sublistId).update({ resetTime, name: newName });
      } catch (error) {
        console.error('Error updating sublist in database:', error);
      }
    }

    setSettingsVisible(prevState => ({
      ...prevState,
      [listId]: !prevState[listId]
    }));
  };

  const handleDelete = async () => {
    await handleDeleteSublist(sublistId);
    setSettingsVisible(prevState => ({
      ...prevState,
      [listId]: !prevState[listId]
    }));
  };
  const handleSettingsClick = (sublistId: string) => {
    setSettingsVisible(prevState => ({
      ...prevState,
      [sublistId]: !prevState[sublistId]
    }));
  };

  return (
    <div className={`${styles.settingsContainer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.settings}>
      <button className={styles.close} onClick={() => handleSettingsClick(sublistId!)}>
      <img src={closeIcon} alt="change settings for list" />
      </button>
        <label>
          List Name:
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Reset Time:
          <input
            type="time"
            value={resetTime}
            onChange={handleResetTimeChange}
          />
        </label>
        <div>
        <button className={styles.save} onClick={handleSaveChanges}>Save</button>
        <button className={styles.save} onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
