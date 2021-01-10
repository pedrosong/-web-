import React,{Fragment} from 'react';
import {indexNavs} from "../router/routes";
import { NavLink } from 'react-router-dom';

function IndexNav(){
    return <nav className="indexNav">
        {indexNavs.map(item=>{
            return <Fragment key={item.title}>
                <NavLink
                    to={item.path}
                    activeStyle={item.activeStyle}
                    exact={item.exact}
                >{item.title}</NavLink>
                <span> | </span>
            </Fragment>
        })}
    </nav>
}

export default IndexNav;