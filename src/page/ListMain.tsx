import React, { useContext, useEffect, useState } from 'react';
import {AppStateContext, SubListType} from '../app-state.tsx';
import { NavLink, useParams } from 'react-router-dom';
import toKebabCase from '../helpers/toKebabCase.js';
 
const ListMain = () => {
const myContextValue = useContext(AppStateContext);
const { listName } = useParams<{ listName: string }>();
const [childLists, setChildLists] = useState<SubListType[] | undefined>()
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
    sublists
} = myContextValue;



// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
   const childLists = sublists.filter(list => list.parentList === listName)
   setChildLists([...childLists])
}, [])
 
  return (
    <>
    <section>        
    {childLists?.map(list =>
    <NavLink to={`/sublist/${toKebabCase(list.name)}`} >
    {list.name}
    {list.isRepeating}
    {list.repeatDays}
    </NavLink>
  )}
    </section>
    <section>
    <NavLink to={`/create-sublist/${toKebabCase(listName)}`} >create new sub list</NavLink>
    </section>
    </>
  )
}
 
export default ListMain