import React,{Suspense} from 'react';
import {Shell} from './layout/shell';
import {Navigation} from './navigation/nav';
import {IdentitySection} from './identity/identity';
import { Hamburger } from './identity/hamburger/hamburger';
import {Board} from './board';
import {MoveTrail} from './move_trail'
import {ThreeColumnLayout} from './layout/ThreeColumnLayout';
import './app.css';
import { Provider } from 'react-redux';
import store from '../app_state/store';
import {SuspenseTest} from '../tests/suspenseTest';
//import {SWRConfig} from '/swr';
//import './nav.css';
export  const App = () =>{
        return(
        <div className="app"> 
                {/*Change me*/}
                <Provider store={store}>
                        <Shell>
                        <ThreeColumnLayout
                         leftChildren={<Suspense fallback={<div>Loading</div>}>  <SuspenseTest/> </Suspense>} 
                         rightChildren={<div><MoveTrail/></div>}>
                               <Board/>
                        </ThreeColumnLayout>
                        </Shell>
                        
                </Provider>
        </div>
        );
}

export default  App;