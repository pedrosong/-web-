import { NavLink, useParams } from "react-router-dom";

function ListNav() {
    const {t="good"} = useParams();
    return <nav className="list_nav">
        <NavLink 
          to="/list/good"
          isActive={()=>{
            return t === "good"
          }}
        >精华</NavLink>
        <NavLink to="/list/share">分享</NavLink>
        <NavLink to="/list/ask">问答</NavLink>
    </nav>
}
export default ListNav;