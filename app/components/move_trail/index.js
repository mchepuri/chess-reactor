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
       <li key={`trail-item${index}`} className={"moves_data"}>
                <span className="moves_data_item">
                    {index}
                </span>
                <span  className="moves_data_item">
                    {move.from}
                </span>
                <span  className="moves_data_item">
                    {move.to}
                </span>
        </li>
    );
    moves.unshift(<li key={`trail-item--1}`} className={"moves_data-header"}>
        <span className="moves_data_item">
            #
        </span>
        <span  className="moves_data_item">
                    From
        </span>
        <span  className="moves_data_item">
                   To
        </span>
    </li>);
    console.log('moves',moves);
    return(<ul className="moves_section">{moves}</ul>);
    //return(<div>Move Trail</div>);
}