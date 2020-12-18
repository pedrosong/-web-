import { useDispatch } from "react-redux";

function Message(props) {
  const {todo,id} = props.data;
  const dispatch = useDispatch();
  return <li>
    {todo} - <a onClick={()=>{
        dispatch({
          type: "TODOS_REMOVE",
          id
        })
    }}>删除</a>
  </li>
}
export default Message;