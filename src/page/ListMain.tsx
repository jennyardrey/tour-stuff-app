import React, { useContext, useEffect, useState } from 'react';
import {AppStateContext, SubListType} from '../app-state.tsx';
import { NavLink, useParams } from 'react-router-dom';
import toKebabCase from '../helpers/toKebabCase.js';
 
const ListMain = () => {
const myContextValue = useContext(AppStateContext);
const { listId } = useParams<{ listId: any }>();
const [childLists, setChildLists] = useState<SubListType[] | undefined>()
// Perform a null check on myContextValue
if (!myContextValue) {
    // Handle the case when the context value is undefined
    return null; // or display a loading indicator, error message, etc.
}
const { 
    sublists,
    fetchSublistsForMainList
} = myContextValue;



// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
    console.log('listid working: ', listId)
    console.log('listid kebabed: ', toKebabCase(listId))
    fetchSublistsForMainList(listId)
    .then(res => setChildLists(res))
    console.log('child',childLists)
//    setChildLists([...childLists])
}, [])
 
  return (
    <>
    <section>        
    {childLists?.map(list =>
    <NavLink to={`/sublist/${list.id}`} >
    {list.name}
    {list.isRepeating}
    {list.repeatDays}
    </NavLink>
  )}
    </section>
    <section>
    <NavLink to={`/create-sublist/${listId}`} >create new sub list</NavLink>
    </section>
    </>
  )
}
 
export default ListMain