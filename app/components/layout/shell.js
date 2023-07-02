import React,{Suspense} from 'react';
import './shell.css';
import { getDeviceType } from '../../utils/deviceutils';
export  const Shell = (props) =>{
    const deviceType=getDeviceType();
    const {logo,menu,identitySection,footer,hamburger} = props;
        return(
        <div>
            <div className="header"> 
                <div className="leftcell">
                    {deviceType==='desktop'?logo:null}
                    {hamburger}
                </div>
                <div className="middlecell">
                    {menu}
                    {deviceType==='mobile'?logo:null}
                </div>
                <div className="rightcell">
                {identitySection}
                </div>
            </div>
            <div className="contentarea">
               {props.children}
            </div>
            <div className="footer">
                {footer}
            </div>
         </div>
        );
}

export default  Shell;