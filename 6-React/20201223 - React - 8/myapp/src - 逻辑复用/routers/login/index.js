import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  const {isLogin,prevPath} = useSelector(state=>state.guards);
  const {replace} = useHistory();
  useEffect(()=>{
    if(isLogin){
      replace(prevPath?prevPath:"/");
    }
  },[isLogin])
  return <div className="view">
  <div className="wrap">
      <h1>登陆视图</h1>
      <button onClick={()=>{
        dispatch({
          type: "GUARDS_LOGIN"
        })
      }}>登陆</button>
  </div>
</div>
}
export default LoginPage;