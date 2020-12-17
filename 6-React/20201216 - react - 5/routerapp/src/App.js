import { Switch,Route,Redirect } from "react-router-dom";
import Page404 from "./view/404";
import AboutPage from "./view/about";
import IndexPage from "./view/index";
import JoinPage from "./view/join";
import ListPage from "./view/list";
import "./static/index.css";
import Nav from "./component/nav";
/*
  /list
  /list/:type
  /list/:type/:page
*/
/*
  重定向
*/
const types = ["good","share","ask"];
function App() {
  const user = "开课吧";
  return (
    <div className="wrap">
      <Nav />
      <Switch>
        <Route path="/" exact component={IndexPage}/>
        {/* <Route path="/about" exact component={AboutPage} /> */}
        <Redirect from="/index" exact to="/" />
        <Route path="/about" exact render={(routerProps)=>{
            //console.log(routerProps);
            return <AboutPage {...routerProps} user={user}  /> 
        }} />
        <Route path="/join" exact component={JoinPage} />
        <Route path="/list/:t?/:p?" exact 
            render={({match})=>{
              const {t="good",p="1"} = match.params;
              if(types.includes(t)
              && parseInt(p)+"" === p){
                return <ListPage />
              }
                // return <Page404 />
                return <Redirect to="/404" />
            }}
        />
        <Route path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
