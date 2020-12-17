import { Link, NavLink } from "react-router-dom";

// function Nav() {
//     return <nav>
//         <Link to="/">首页</Link>
//         <span> | </span>
//         <Link to="/about">关于</Link>
//         <span> | </span>
//         <Link to="/join">加入</Link>
//     </nav>
// }
/*
NavLink
  1. NavLink 功能和 Link 一致，并且在 Link 的基础提供了选中项的操作
  2. 在 NavLink 匹配选中项的规则和 Route 一致
- activeClassName 选中项对应class 默认为 active
- activeStyle 
- isActive 参数是函数，作用判断当前项是否应该选中
*/
function Nav() {
  return <nav className="nav">
    {/* <NavLink 
        to="/" 
        exact
        activeClassName = "selected"
        activeStyle={{
          fontWeight: "bold"
        }}
        isActive={()=>{
          return false;//当前选中
        }}
      >首页</NavLink> */}
    <NavLink
      to="/"
      exact
      activeClassName="selected"
      activeStyle={{
        fontWeight: "bold"
      }}
    >首页</NavLink>
    <span> | </span>
    <NavLink
      to="/about"
      activeClassName="selected"
      activeStyle={{
        fontWeight: "bold"
      }}
    >关于</NavLink>
    <span> | </span>
    <NavLink
      to="/join"
      activeClassName="selected"
      activeStyle={{
        fontWeight: "bold"
      }}
    >加入</NavLink>
    <span> | </span>
    <NavLink
      to="/list/1"
      activeClassName="selected"
      activeStyle={{
        fontWeight: "bold"
      }}
    >列表视图</NavLink>
  </nav>
}
export default Nav;