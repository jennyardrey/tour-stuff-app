import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase_setup/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import styles from "../styles/Login.module.scss"
import logo from "../assets/FreeLogo.png"
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
               
                <section className={styles.main}>
                        <img className={styles.logo} alt="logo for tour stuff" src={logo} />                       
                        <form className={styles.loginBox}>  
                        <h2>Login</h2>                                            
                            <div className={styles.userBox}>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.userBox}>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                  
                                <button                                    
                                    onClick={onLogin}                                        
                                >Login                                                                  
                                </button>
                                                          
                        </form>
                       
                        <p>
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                                                   
                  
                </section>
       
        </>
    )
}
 
export default Login