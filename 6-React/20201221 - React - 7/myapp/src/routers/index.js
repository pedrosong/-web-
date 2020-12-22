import { Route, Switch } from "react-router-dom";
import { router_list } from "./router.config";
function RootRoutes(props) {
  return <Switch>
    {router_list.map((item, index) =>{
        return <Route
          key={index}
          path={item.path}
          exact={item.exact}
          render={(routerProps) => {
            return item.render({ ...routerProps, ...props });
          }}
      />}
    )}
  </Switch>
}
export default RootRoutes;