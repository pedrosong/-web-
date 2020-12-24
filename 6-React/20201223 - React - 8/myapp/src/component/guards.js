import { useDispatch, useSelector } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";

function Guards(props) {
    const {Cmp,parentProps} = props;
    const {isLogin} = useSelector(state=>state.guards);
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    if(isLogin){
        return <Cmp {...parentProps} />
    }
    dispatch({
      type: "GUARDS_PATH",
      path: pathname
    });
    return <Redirect to="/login" />
}
// 高阶组件
function withGuards(Cmp) {
  return (props)=>{
      return <Guards 
          parentProps = {props}
          Cmp = {Cmp}
      />
  }
}
export default withGuards;
