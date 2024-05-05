import React, { useContext, useEffect, useState } from 'react';
import {AppStateContext, MainListType} from '../app-state.tsx';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../styles/MainList.module.scss'
 
const ListMain = () => {
const myContextValue = useContext(AppStateContext);
const { listId } = useParams<{ listId: any }>();
const [thisList, setThisList] = useState<MainListType>();

// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; 
}
const { 
    subLists,
    setCurrentSublists,
    currentSublists,
    setCurrentMainList,
    mainLists
} = myContextValue;



// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  setCurrentMainList(listId);
  const currentLists = subLists.filter(list => list.parentList === listId);
  setCurrentSublists(currentLists);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [listId, subLists]);

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  const list = mainLists.find(list => list.id === listId);
  if (list) setThisList(list);
}, [listId]);

 
  return (
    <>
     
     <div  className={styles.main}>
    <section className={styles.listContainer}>    
    <h1>{thisList?.name}</h1>    
    {currentSublists?.map(list =>
    <NavLink className={styles.link} key={list.id} to={`/sublist/${list.id}`} >
        <div className={styles.listName}><span>
    {list.name}
    {list.isResetting}
    </span>
    </div>
    </NavLink>
  )}
    </section>
    <section>
    <NavLink className={styles.createButton} to={`/create-sublist/${listId}`} >create new sub list</NavLink>
    </section>
    </div>
    </>
  )
}
 
export default ListMain