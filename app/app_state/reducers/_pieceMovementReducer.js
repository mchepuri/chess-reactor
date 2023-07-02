import {initialState} from '../initialState';
import cloneDeep from 'lodash/cloneDeep';
const  _pieceMovementReducer = (state = initialState, action) => {
  console.log('state',state);
  //const newState= { ...state};
  const newState=  cloneDeep(state);
  /*newState._board={...state._board};
  newState.moveTrail = [...state.moveTrail];*/
  //newState.game=Object.assign(state.game);
  //newState.game.board=JSON.parse(JSON.stringify(state.game.board));
  //,...state._board={..._board},...state.moveTrail={...moveTrail},...state.game={...game}};
  console.log('newState',newState);
  
  const {_board}= newState;
  const {moveTrail}= newState;
  const {game}= newState;
  console.log('_pieceMovementReducer : ',action.type,' Start');
  switch (action.type) {
  case 'CELLCLICK':
    console.log(action.payload);
    
    if(!_board.move||(_board.move.from&&Object.keys(_board.move.from).length===0)){
      console.log('Move object is null assigning it');
      _board['move'] = {'from':action.payload.cellIdentifier};
      _board[action.payload.cellIdentifier].selectedCell = true;
      _board['refresh']=!_board['refresh'];
    }
    else if(_board.move && _board.move.from === action.payload.cellIdentifier){
      console.log('Same cell clicked removing prev reference');
      _board[action.payload.cellIdentifier].selectedCell = false;
      _board['refresh']=!_board['refresh'];
      _board.move.from={};
    }else{
      console.log('Different cell clicked should make a move');
      let move_result = game.move({
        from: _board.move.from.charAt(0)+_board.move.from.charAt(2), // Required | The field whom the piece comes from (Field must contain a piece! Otherwise you'll get an error)
        to: action.payload.cellIdentifier.charAt(0)+ action.payload.cellIdentifier.charAt(2), // Required | The target field
        rules: true, // Default is 'true' | If the board looks for the rules. If your move is not allowed 'success' in the return object of 'move()' will be 'false'. There will be also an array 'errors' containing the broken rules
        test: false // Default is 'false' | If your move is just a test. That means, the board will not change
      });
      console.log('move_result',move_result);
      if(move_result.success){
        _board.move['to']=action.payload.cellIdentifier;
        _board[_board.move.to] = _board[_board.move.from];
        _board[_board.move.from]={};
        //delete _board.move.from;
        _board[_board.move.to].selectedCell = false;
        _board['refresh']=!_board['refresh'];
      }
    }
    
    console.log('Board',_board);
    console.log('State',state);
    console.log('_pieceMovementReducer : ',action.type,' End');
    //{ ...newState,...newState._board={..._board},...newState.moveTrail={...moveTrail},...newState.game={...game}}
    return newState;
  case 'BOARDREFRESHED': 
    _board['refresh']=!_board['refresh'];
    console.log('_pieceMovementReducer : ',action.type,' End');
    return newState;
  case 'PIECEMOVED':

    if(_board.move && _board.move.from && _board.move.to){      
      moveTrail.push({"from":_board.move.from ,"to":_board.move.to});
      console.log('Making move null')
      delete _board.move;
      //_board['refresh']=true;
      //moveTrail['refresh']=!moveTrail['refresh'];
    }
    let newState1= {...newState};
    newState._board=_board;
    newState1.moveTrail=moveTrail;
    newState1.game=game;
    console.log('returning',newState1);
    console.log('_pieceMovementReducer : ',action.type,' End');
    return newState1;

  default:
    console.log('_pieceMovementReducer : default End returning newState',newState );
    return newState;
  }
}
export default _pieceMovementReducer;
