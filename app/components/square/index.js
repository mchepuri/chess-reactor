import React,{Suspense,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { cellClicked,pieceMoved } from '../../app_state/actions';
import './square.scss';

import store from '../../app_state/store'

export  const Square = (props) =>{
    const {type,identifier,squareClickHandler}=props;
    
    const _board = useSelector(state=>state._pieceMovementReducer._board);
    const isSelected = _board[identifier].selectedCell;
    const dispatch = useDispatch();
    
    console.log('Rerendering sqaure');
    const clickHandler = () => {
        console.log('Click Handler ',_board.move);
        dispatch(cellClicked(identifier)); 
    }
    return(
    <div className= {`sqaure_geo ${type}`} onClick={clickHandler}>
        {isSelected?<SelectedSquare/>:null}
        <span className="squarelabelw">{identifier.charAt(0)==='h'?identifier.charAt(2):null}</span>
        <span className="squarelabelt">{identifier.charAt(2)==='8'?identifier.charAt(0):null}</span>
        {_board[identifier].img? <img src={_board[identifier].img} className={`sqaure_geo  ${(identifier.charAt(0)==='h' || identifier.charAt(2)==='8') ? 'last_column_square' : null}`}/>:null}
    </div>
    );
}

const SelectedSquare = () =>{
    return <div className="selected_square"></div>;
}