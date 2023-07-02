import React,{Suspense} from 'react';
import './hamburger.css';
export const Hamburger = () => {
    return(
        <div className="hamburger hbcontainer">
            <svg viewBox="0 0 512 512"  data-testid="icon-center-align" aria-hidden="true" focusable="false"><path d="M448 147H64c-8 0-15-7-15-15 0-9 7-15 15-15h384c8 0 15 6 15 15 0 8-7 15-15 15zm0 128H64c-8 0-15-7-15-15 0-9 7-15 15-15h384c8 0 15 6 15 15 0 8-7 15-15 15zm0 128H64c-8 0-15-7-15-15 0-9 7-15 15-15h384c8 0 15 6 15 15 0 8-7 15-15 15z"></path></svg>
        </div>
    );
}