import React,{Suspense} from 'react';
import './results.css';

import store from '../../app_state/store'

export  const Results = () =>{
    const handleClick = () =>{
        store.dispatch({type:'cart/itemAdded',payload:1});
    }
    return(<div className="button" onClick={handleClick}>Some Button</div>);
}
