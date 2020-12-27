import { useSelector } from "react-redux";
import {Todo} from "./Todo";

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  return (
    <ul id="todo-list">
      {todos.map((item) => (
        <Todo key={item.id} data={item}/>
      ))}
    </ul>
  );
}
