import React, { useContext, useEffect } from 'react';

import {AppStateContext} from '../app-state.tsx';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header.tsx';
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
} = myContextValue;

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
   console.log(mainLists)
     
}, [])
 
  return (
    <>
    <Header />
    <section className={styles.main}>        
    <div>DashMain</div>

    <NavLink to="/create-list" >Create new tour</NavLink>
<div>
    {mainLists.map(list =>
     <NavLink to={`/list/${list.uuid}`}>
     {list.name}
   </NavLink>
  )}
  </div>
    </section>
    </>
  )
}
 
export default Home