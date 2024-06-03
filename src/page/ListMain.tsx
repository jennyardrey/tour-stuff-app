/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import { AppStateContext, MainListType } from '../app-state.tsx';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../styles/MainList.module.scss';
import settingsIcon from '../assets/settings.svg';
import closeIcon from '../assets/closeIcon.svg';
import Settings from '../components/Settings.tsx';
import backIcon from '../assets/back.svg'
import { useNavigate } from 'react-router-dom';



const ListMain = () => {
  const myContextValue = useContext(AppStateContext);
  const { listId } = useParams<{ listId: string }>();
  const [thisList, setThisList] = useState<MainListType>();

  if (!myContextValue) {
    return null; // Handle the case when the context value is undefined
  }
  const navigate = useNavigate();


  const {
    subLists,
    setCurrentSublists,
    currentSublists,
    setCurrentMainList,
    mainLists,
    settingsVisible,
    setSettingsVisible
  } = myContextValue;

  useEffect(() => {
    setCurrentMainList(listId);
    const currentLists = subLists.filter(list => list.parentList === listId);
    setCurrentSublists(currentLists);
  }, [listId, subLists, setCurrentMainList, setCurrentSublists]);

  useEffect(() => {
    const list = mainLists.find(list => list.id === listId);
    if (list) setThisList(list);
  }, [listId, mainLists]);

  const handleSettingsClick = (sublistId: string) => {
    setSettingsVisible(prevState => ({
      ...prevState,
      [sublistId]: !prevState[sublistId]
    }));
  };

  return (
    <>
      <div className={styles.main}>
        <section className={styles.listContainer}>
        <button className={styles.backBtn} onClick={() => navigate('/', { replace: true })}><img src={backIcon} alt="back to sublists"/>Go back</button>

          <h1>{thisList?.name}</h1>
          {currentSublists?.map(list => (
            <div key={list.id} className={styles.sublistItem}>
              <NavLink className={styles.link} to={`/sublist/${list.id}`}>
                <div className={styles.listName}>
                  <span>{list.name}</span>
                </div>
              </NavLink>
              <button onClick={() => handleSettingsClick(list.id!)}>
                <img
                  src={settingsIcon}
                  alt="change settings for list"
                />
              </button>
              <Settings sublistId={list.id!} isVisible={settingsVisible[list.id!]} />
            </div>
          ))}
          <NavLink className={styles.createButton} to={`/create-sublist/${listId}`}>
            Create new sublist
          </NavLink>
        </section>
      </div>
    </>
  );
};

export default ListMain;
