import { useDispatch, useSelector } from "react-redux";

function Count() {
  const count = useSelector(state=>state.count);
  const dispatch = useDispatch();

    return <div>
      <p>{count}</p>
      <button onClick={()=>{
          dispatch({
              type:"COUNT_ADD"
          })
      }}>递增</button>
      <button onClick={()=>{
           dispatch({
              type:"COUNT_MIUS"
          })
      }}>递减</button>
  </div>
}
export default Count;