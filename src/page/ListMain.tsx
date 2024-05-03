import React, { useContext, useEffect } from 'react';
import {AppStateContext} from '../app-state.tsx';
import { NavLink, useParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import styles from '../styles/MainList.module.scss'
 
const ListMain = () => {
const myContextValue = useContext(AppStateContext);
const { listId } = useParams<{ listId: any }>();
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
} = myContextValue;



// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
  setCurrentMainList(listId);
  const currentLists = subLists.filter(list => list.parentList === listId);
  setCurrentSublists(currentLists);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [listId, subLists]);

 
  return (
    <>
     <Header />
     <div  className={styles.main}>
    <section className={styles.listContainer}>        
    {currentSublists?.map(list =>
    <NavLink key={list.id} to={`/sublist/${list.id}`} >
        <div className={styles.tape}><span>
    {list.name}
    {list.isRepeating}
    {list.repeatDays}
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