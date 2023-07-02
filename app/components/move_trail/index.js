import React,{useState} from 'react';
import './move_trail.scss'
import { useSelector } from 'react-redux';
import store from '../../app_state/store';
export const MoveTrail = () => {
    
    const moveTrail = useSelector(state=>state._pieceMovementReducer.moveTrail);
    const [refreshMovesPanel,setRefreshMovesPanel] = useState(false);
    if(moveTrail.refresh!==refreshMovesPanel){
        setRefreshMovesPanel(moveTrail.refresh);
    }
    store.subscribe(()=>{
        setRefreshMovesPanel(moveTrail.refresh);
    });
    const moves=moveTrail.map((move,index)=>
       <li key={`trail-item${index}`}>
            <div>
                <span>
                    {index}
                </span>
                <span>
                    {move.from}
                </span>
                <span>
                    {move.to}
                </span>
            </div>
        </li>
);
    console.log('moves',moves);
    return(<div><ul>{moves}</ul></div>);
    //return(<div>Move Trail</div>);
}