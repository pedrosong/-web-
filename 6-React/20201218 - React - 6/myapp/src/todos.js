import { useSelector } from "react-redux";
import Message from "./message";

function Todos() {
  const todos = useSelector(state=>state.todos);
  return <ul>
      {todos.map(item=><Message key={item.id} data={item} />)}
  </ul>
}
export default Todos;