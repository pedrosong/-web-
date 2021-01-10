import React from "react";
import {NavLink} from "react-router-dom";

function SubMenu(props){
    const {navData} = props;
    return <ul className="subMenu">
        {navData.map((item,index)=>{
            return <li key={index}>
                <NavLink 
                    to={item.path}
                    exact={item.exact}
                    activeClassName={item.activeClass}
                >{item.title}</NavLink>
            </li>
        })}
    </ul> 
}

export default SubMenu;