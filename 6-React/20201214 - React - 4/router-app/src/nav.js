import { Link } from "react-router-dom";
function Nav() {
    return <nav>
      {/* <a href="/">首页</a> */}
      <Link to="/">首页</Link>
      <span> | </span>
      {/* <a href="/about">关于</a> */}
      <Link to="/about">关于</Link>
      <span> | </span>
      <Link to="/about/details">关于-详情</Link>
      <span> | </span>
      {/* <Link to="https://wwww.baidu.com">百度</Link> */}
      <a href="https://wwww.baidu.com">百度</a>
    </nav>
}

export default Nav;