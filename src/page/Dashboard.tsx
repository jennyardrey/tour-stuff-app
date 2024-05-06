import React, { useContext, useEffect } from 'react';
import plus from "../assets/plus.svg";
import {AppStateContext} from '../app-state.tsx';
import { NavLink } from 'react-router-dom';
import trashIcon from '../assets/trash.svg';
import styles from "../styles/Dashboard.module.scss"

 
const Home = () => {
const myContextValue = useContext(AppStateContext);

// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
    mainLists,
    handleDeleteList
} = myContextValue;


 
  return (
    <>
    <section className={styles.main}>        
    <h1>My Tours</h1>
  <div className={styles.listContainer}>
      {mainLists.map(list =>
      <div key={list.uuid} className={styles.item}><NavLink to={`/list/${list.uuid}`}>
          <div  className={styles.tape}><span >{list.name}</span></div>
        </NavLink>
        <button onClick={() => handleDeleteList(list.uuid)}>
         <img alt="trash icon to delete list" src={trashIcon} />
        </button>
      </div>
    )}
  </div>
  <NavLink className={styles.create} to="/create-list" ><img className={styles.plus} src={plus} alt="plus icon - create a new tour" />Create new tour</NavLink>
    </section>
    </>
  )
}
 
export default Home