const { NavLink } = require("react-router-dom");

// function Nav() {
//   return <nav className="nav">
//       <Link to="/">首页</Link>
//       <Link to="/join">加入我们</Link>
//       <Link to="/about">关于我们</Link>
//       <Link to="/list">列表</Link>
//   </nav>
// }
/*
  NavLink：
    1. NavLink 作用跟 Link 类似，都是提供了一个视图跳转链接
    2. NavLink 可以给当前选中项，添加选中效果
        1. NavLink 在匹配当前项时，默认也是 模糊匹配
        activeClassName：当前选中项的class，默认为 active
        activeStyle
        isActive，isActive 接收一个回调函数，通过该回调函数的返回值，决定项当前要不要选中，返回值 为 true 则 选中当前项，false 不选中

*/
function Nav() {
  return <nav className="nav">
      <NavLink 
        to="/"
        exact
      >首页</NavLink>
      <NavLink 
        to="/join"
        exact
      >加入我们</NavLink>
      <NavLink 
        to="/about"
        exact
      >关于我们</NavLink>
      <NavLink 
        to="/list"
      >列表</NavLink>
  </nav>
}
export default Nav;