import "./index.css";
import {Route} from "react-router-dom";
import IndexPage from "./view";
import AboutPage from "./view/about";
import AboutDetailsPage from "./view/aboutdetails";
import Nav from "./nav";
/* 
  Route
    path：该路由要匹配的路径
      匹配模式：
        默认：默认情况 path 是 模糊匹配：url 以 path 为开始时 则匹配成功
        exact: 精确匹配: url 为 path 或 path/ 时匹配
        strict 严格匹配: url === path 可以匹配，设置严格匹配时必须先设置 exact 
        多路径匹配
    component: 路径匹配成功之后，要显示的视图
*/
function App() {
  return <div className="wrap">
      <Nav />
      <hr />
      {/* <Route path="/" exact component={IndexPage} /> */}
      <Route path={["/","/home","/index"]} exact strict component={IndexPage} />
      <Route path="/about" exact  component={AboutPage} />
      <Route path="/about/details" component={AboutDetailsPage} />
  </div>
}
export default App;
