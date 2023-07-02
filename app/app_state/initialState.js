import bP from '../svg/fantasy/bP.svg';
import bN from '../svg/fantasy/bN.svg';
import bK from '../svg/fantasy/bK.svg';
import bQ from '../svg/fantasy/bQ.svg';
import bR from '../svg/fantasy/bR.svg';
import bB from '../svg/fantasy/bB.svg';

import wP from '../svg/fantasy/wP.svg';
import wN from '../svg/fantasy/wN.svg';
import wK from '../svg/fantasy/wK.svg';
import wQ from '../svg/fantasy/wQ.svg';
import wR from '../svg/fantasy/wR.svg';
import wB from '../svg/fantasy/wB.svg';

import {Chess} from '../utils/chess-engine';

export const initialState = {
    _board : {
    "refresh" : false,
    "a-1":{img : bR},
    "a-2":{img : bP},
    "a-3":{},
    "a-4":{},
    "a-5":{},
    "a-6":{},
    "a-7":{img : wP},
    "a-8":{img : wR},
    "b-1":{img : bN},
    "b-2":{img : bP},
    "b-3":{},
    "b-4":{},
    "b-5":{},
    "b-6":{},
    "b-7":{img : wP},
    "b-8":{img : wN},
    "c-1":{img : bB},
    "c-2":{img : bP},
    "c-3":{},
    "c-4":{},
    "c-5":{},
    "c-6":{},
    "c-7":{img : wP},
    "c-8":{img : wB},
    "d-1":{img : bQ},
    "d-2":{img : bP},
    "d-3":{},
    "d-4":{},
    "d-5":{},
    "d-6":{},
    "d-7":{img : wP},
    "d-8":{img : wQ},
    "e-1":{img : bK},
    "e-2":{img : bP},
    "e-3":{},
    "e-4":{},
    "e-5":{},
    "e-6":{},
    "e-7":{img : wP},
    "e-8":{img : wK},
    "f-1":{img : bB},
    "f-2":{img : bP},
    "f-3":{},
    "f-4":{},
    "f-5":{},
    "f-6":{},
    "f-7":{img : wP},
    "f-8":{img : wB},
    "g-1":{img : bN},
    "g-2":{img : bP},
    "g-3":{},
    "g-4":{},
    "g-5":{},
    "g-6":{},
    "g-7":{img : wP},
    "g-8":{img : wN},
    "h-1":{img : bR},
    "h-2":{img : bP},
    "h-3":{},
    "h-4":{},
    "h-5":{},
    "h-6":{},
    "h-7":{img : wP},
    "h-8":{img : wR},
    refresh: false,
    },
    
    moveTrail : [
        {"from":"e5","to":"g6"},
        {"from":"d5","to":"j6"},
        {"from":"h5","to":"s6"},
        {"from":"g5","to":"s6"},
        {"from":"a5","to":"h6"},
        {"from":"e5","to":"g6"}
    ],
    game : new Chess.Game()
}