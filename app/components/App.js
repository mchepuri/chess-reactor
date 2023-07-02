import React from 'react';
import {Shell} from './layout/shell';
import {IdentitySection} from './identity/identity';
import {Board} from './board';
import {MoveTrail} from './move_trail'
import {ThreeColumnLayout} from './layout/ThreeColumnLayout';
import { Logo } from './icons/logo';
import './app.css';
import { Provider } from 'react-redux';
import store from '../app_state/store';
export  const App = () =>{
        return(
        <div className="app"> 
                {/*Change me*/}
                <Provider store={store}>
                        <Shell identitySection={<IdentitySection/>} logo={<div className="logo"><Logo/><span className="brand">Chess Reactor</span></div>}>
                        <ThreeColumnLayout
                         leftChildren={<div><MoveTrail/></div>} 
                         rightChildren={<div/>}>
                               <Board/>
                        </ThreeColumnLayout>
                        </Shell>
                        
                </Provider>
        </div>
        );
}

export default  App;