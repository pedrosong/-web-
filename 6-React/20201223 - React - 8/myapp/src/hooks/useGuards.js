import {useHistory,useLocation} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
function useGuards() {
  const {isLogin} = useSelector(state=>state.guards);
  const {replace} = useHistory();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  if(!isLogin){
    dispatch({
      type: "GUARDS_PATH",
      path: pathname
    });
    replace("/login");
  }
}

export default useGuards;