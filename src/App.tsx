import Home from './page/Home.tsx';
import Signup from './page/Signup.tsx';
import Login from './page/Login.tsx';
import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Dashboard from './page/Dashboard.tsx';
import CreateList from './page/CreateList.tsx';
import ListMain from './page/ListMain.tsx';
import CreateSublist from './page/CreateSublist.tsx';
import Sublist from './page/Sublist.tsx';

function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>     
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Dashboard />}/>                                                                
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/create-list" element={<CreateList/>}/>
                <Route path="/list/:listName" Component={ListMain} />
                <Route path="/create-sublist/:listName" element={<CreateSublist/>}/>
                <Route path="/sublist/:sublistName" element={<Sublist/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;