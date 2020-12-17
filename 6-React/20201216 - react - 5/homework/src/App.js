import { Redirect, Route, Switch } from "react-router-dom";
import List from "./view/list/index";
import NotFound from "./view/404/index";
import data from "./database/data";
import "./css/index.css";

function App() {
  const types = [...Object.keys(data), "all"];
  return (
    <Switch>
      <Route
        path="/list/:type?/:page?"
        exact
        render={({ match }) => {
          const { type = "all", page = "1" } = match.params;
          if (types.includes(type) && parseInt(page) === Number(page)) {
            return <List />;
          }
          return <Redirect to="/404" />;
        }}
      />
      <Redirect from="/" exact strict to="/list" />
      <Route path="/404" exact component={NotFound} />
    </Switch>
  );
}

export default App;
