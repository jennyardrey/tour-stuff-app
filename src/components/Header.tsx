import React, { useContext } from 'react';
import { AppStateContext } from '../app-state.tsx';
import logo from "../assets/tourstufflogo.svg"
import { signOut } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase.js';
import { NavLink, useNavigate } from 'react-router-dom';
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
        <NavLink to={'/Home'} >
        <img src={logo} alt="logo for tour stuff" />
        </NavLink>
        {isLoggedIn ? <button onClick={onLogout}>Logout</button> : null}
    </div>
  );
};

export default Header;