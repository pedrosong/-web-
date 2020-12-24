import { Route, Switch, useLocation } from "react-router-dom";
import { router_list } from "./router.config";
import { TransitionGroup, CSSTransition } from "react-transition-group";
function RootRoutes(props) {
  const location = useLocation();
  const {pathname} = location;
  return <TransitionGroup>
    <CSSTransition
        timeout={3000}
        key={pathname}
        onEnter={(node)=>{
          //  enter 系列 元素挂载时执行
            //console.log("准备开始动画");
            console.log(node.innerHTML);
            node.style.transition = "3s opacity";
            node.style.opacity = 0;
        }}
        onEntering={(node)=>{
          //console.log("开始动画");
          node.style.opacity = 1;
        }}
        onEntered={(node)=>{
          //console.log("动画结束")
          node.style.transition = "none";
        }}
        onExit={(node)=>{
          console.log(node.innerHTML);
          node.style.transition = "3s opacity";
        }}
        onExiting={(node)=>{
          node.style.opacity = 0;
        }}
        onExited={(node)=>{
            console.log("卸载完成")  
        }}
    >
      <Switch location={location}>
        {router_list.map((item, index) => {
          return <Route
            key={index}
            path={item.path}
            exact={item.exact}
            render={(routerProps) => {
              return item.render({ ...routerProps, ...props });
            }}
          />
        }
        )}
      </Switch>
    </CSSTransition>
  </TransitionGroup>
}
export default RootRoutes;