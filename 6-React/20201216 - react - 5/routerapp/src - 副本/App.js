import { Route, Switch } from "react-router-dom";
import Nav from "./component/nav";
import IndexPage from "./view";
import UndefinedPage from "./view/404";
import AboutPage from "./view/about";
import JoinPage from "./view/join";
import "./index.css";
import ListPage from "./view/list";
/*
  Switch 组件作用类似于 switch 语句
*/
function App() {
  return (
    <div>
      <Nav />
      <hr />
      <Switch>
        <Route
          path="/"
          exact
          component={IndexPage}
        />
        <Route
          path="/about"
          component={AboutPage}
        />
        <Route
          path="/join"
          component={JoinPage}
        />
         <Route
          path="/list/:page"
          component={ListPage}
        />
        <Route
          component={UndefinedPage}
        />
      </Switch>
    </div>
  );
}

export default App;
