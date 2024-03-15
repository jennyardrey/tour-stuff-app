import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import {AppStateContext} from '../app-state.tsx';
import Signup from './Signup.tsx';
import Login from './Login.tsx';
import Dashboard from './Dashboard.tsx';
 
const Home = () => {
const myContextValue = useContext(AppStateContext);

// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   isLoggedIn,
   setIsLoggedIn
} = myContextValue;

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setIsLoggedIn(true)
          console.log("uid", uid)
        } else {
            setIsLoggedIn(false)
          console.log("user is logged out")
        }
      });
     
}, [])
 
  return (
    <section>        
    {isLoggedIn ? <Signup /> : <div> <Dashboard /></div>}
    </section>
  )
}
 
export default Home