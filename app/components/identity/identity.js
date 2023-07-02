import React,{useState} from 'react';
import './identity.css';
import {UserIcon} from '../icons/user/usericon';
import store from '../../app_state/store';
export  const IdentitySection = (props) =>{
    const [itemCount,setItemCount] = useState(0);
    const unsubscribe = store.subscribe(() =>{
        setItemCount(store.getState().itemCount);
    });
    
    return(<div>{itemCount}<UserIcon/></div>);
}