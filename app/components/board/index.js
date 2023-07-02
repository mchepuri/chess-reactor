import React,{Suspense,useEffect,useState} from 'react';
import './board.scss';
import {Square} from '../square'
import { useSelector,useDispatch } from 'react-redux';
import { pieceMoved } from '../../app_state/actions';
import '../../images/advaith_dp.jpeg'
import store from '../../app_state/store'
// Icons are available at https://github.com/lichess-org/lila/blob/master/public/piece/fantasy/wR.svg
export  const Board = () =>{
    let board=[];
    const _board = useSelector(state=>state._pieceMovementReducer._board);
    const refreshBoard  = useSelector(state=>state._pieceMovementReducer._board.refresh);

    const dispatch = useDispatch();
    if(_board.move && _board.move.from && _board.move.to){
        console.log('Board Subscribe :  moved dispatching piceemove and calling refresh value',_board.refresh);
        dispatch(pieceMoved());
    }
    
    let aToZ={1:'a',2:'b',3:'c',4:'d',5:'e',6:'f',7:'g',8:'h'};
    let rowData;
    for(let rows=0;rows<8;rows++){
        rowData  = [] ;
        for(let col=0;col<8;col++){
            if(rows%2===0){
                rowData.push(<Square  key={aToZ[col+1]+"-"+(rows+1)} identifier={aToZ[col+1]+"-"+(rows+1)} type={col%2===0?"light":"dark"}/>)
            }else{
                rowData.push(<Square key={aToZ[col+1]+"-"+(rows+1)} identifier={aToZ[col+1]+"-"+(rows+1)} type={col%2===0?"dark":"light"}/>)
            }
        }
        board[rows]=rowData;
    }
    console.log('Board',_board);
    return(
    <div className="board_container">
        {/*<div >
        <img src={dp}/>
        </div>*/}
        {board}
    </div>
    );
}
