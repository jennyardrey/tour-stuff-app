import React, { useContext } from 'react';
import {AppStateContext} from '../app-state.tsx';
import Dashboard from './Dashboard.tsx';
import Login from '../components/Login.tsx';
import styles from "../styles/Home.module.scss"
 
const Home = () => {
const myContextValue = useContext(AppStateContext);

// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   isLoggedIn,
} = myContextValue;

// eslint-disable-next-line react-hooks/rules-of-hooks

 
  return (
    <section className={styles.background}>        
    {!isLoggedIn ? <Login /> : <div> <Dashboard /></div>}
    </section>
  )
}
 
export default Home