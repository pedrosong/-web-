import { NavLink } from "react-router-dom";

function TitleNav(){
    return(
    <nav className="nav">
        <NavLink to="/list/all">全部</NavLink>
        <NavLink to="/list/good">精华</NavLink>
        <NavLink to="/list/share">分享</NavLink>
        <NavLink to="/list/ask">问答</NavLink>
    </nav>
    )
}

export default TitleNav