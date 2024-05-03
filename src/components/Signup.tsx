import React, {useState, useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase.js';
import {AppStateContext} from '../app-state.tsx';
import styles from "../styles/Login.module.scss"
import logo from "../assets/FreeLogo.png"

 
const Signup = () => {
    const navigate = useNavigate();
    const myContextValue = useContext(AppStateContext);

    // Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
   email,
   password,
   setEmail,
   setPassword
} = myContextValue;
 

 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
       
        <section className={styles.main}>
 <img className={styles.logo} alt="logo for tour stuff" src={logo} />           
                                                                                                       
                    <form className={styles.loginBox}>  
                    <h2>Sign Up</h2>                                                                                           
                        <div className={styles.userBox}>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div className={styles.userBox}>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
              
         
        </section>

  )
}
 
export default Signup