import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
function IndexRoutes(props){
    const {routes} = props;
    return <Switch>
        {routes.map((Item,index)=>{
            return <Route 
                path={Item.path}
                key={index}
                exact={Item.exact}
                render={()=><Suspense fallback={<div>视图加载中</div>}>
                        <Item.Component />
                </Suspense>}
             />
        })}
    </Switch>
}

export default IndexRoutes;