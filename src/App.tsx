import Home from './page/Home.tsx';
import Signup from './components/Signup.tsx';
import Login from './components/Login.tsx';
import React, {useState, useEffect} from 'react';
import styles from "./styles/App.module.scss"
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './page/Dashboard.tsx';
import CreateList from './page/CreateList.tsx';
import ListMain from './page/ListMain.tsx';
import CreateSublist from './page/CreateSublist.tsx';
import Sublist from './page/Sublist.tsx';
import Header from './components/Header.tsx';

function App() {
 
  return (
    <Router>
      <div className={styles.body}>
      <Header />   
        <div className={styles.main}>
            <Routes>     
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Dashboard />}/>                                                                
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/create-list" element={<CreateList/>}/>
                <Route path="/list/:listId" element={<ListMain />} />
                <Route path="/create-sublist/:listId" element={<CreateSublist/>}/>
                <Route path="/sublist/:sublistId" element={<Sublist/>}/>
            </Routes>                    
        </div> 
      </div>
    </Router>
  );
}
 
export default App;