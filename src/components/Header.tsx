import React, { useContext, useRef, useState } from 'react';
import { AppStateContext, SubListItem, SubListType } from '../app-state.tsx';
import logo from "../assets/FreeLogo.png"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase.js';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Header.module.scss"

function Header () {
const myContextValue = useContext(AppStateContext);
const navigate = useNavigate();

// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
    isLoggedIn,
    setIsLoggedIn
} = myContextValue;

console.log(isLoggedIn)

const onLogout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        setIsLoggedIn(false)
        navigate("/")
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
   
};
  return (
    <div className={styles.main}>
        <img src={logo} alt="logo for tour stuff" />
        {isLoggedIn ? <button onClick={onLogout}>Logout</button> : null}
    </div>
  );
};

export default Header;