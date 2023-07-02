import React from 'react';
import './Three_column_layout.scss';
export const ThreeColumnLayout = (props) => {
    return(
    <div className='layout_container '>
        <div className='layout_column layout_column_left'>
            {props.leftChildren}
        </div>
        <div className='layout_column layout_column_center'>
            {props.children}
        </div>
        <div className='layout_column layout_column_right'>
        {props.rightChildren}
        </div>
    </div>
    );
}