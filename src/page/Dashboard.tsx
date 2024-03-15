import React, { useContext, useEffect } from 'react';

import {AppStateContext} from '../app-state.tsx';

 
const Home = () => {
const myContextValue = useContext(AppStateContext);

// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 

} = myContextValue;

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
   
     
}, [])
 
  return (
    <section>        
    <div>dashboard</div>
    </section>
  )
}
 
export default Home