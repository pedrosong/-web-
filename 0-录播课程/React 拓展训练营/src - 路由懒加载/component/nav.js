import React from "react";
import {NavLink, useLocation} from "react-router-dom";
const navs = [
    {
        title: "全部",
        to: "/",
        active(url){
            if(url === "/"){
                return true;
            }     
            let urls = url.split("/");
            return urls[1] === "all";
        }
    },{
        title: "精华",
        to: "/good",
        active(url){  
            let urls = url.split("/");
            return urls[1] === "good";
        }
    },{
        title: "分享",
        to: "/share",
        active(url){  
            let urls = url.split("/");
            return urls[1] === "share";
        }
    },{
        title: "问答",
        to: "/ask",
        active(url){  
            let urls = url.split("/");
            return urls[1] === "ask";
        }
    }
];

function Nav(){
    let {pathname} = useLocation();
    return (<nav className="nav">
        {navs.map(item=>{
                return <NavLink 
                    key={item.title}
                    to={item.to}
                    isActive={()=>{
                        return item.active(pathname);
                    }} 
                >{item.title}</NavLink>
        })}
</nav>)
}

export default Nav;