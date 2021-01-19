import { useSelector } from "react-redux";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
export default  function TodoList(){
    const todos = useSelector(state => (state.todos))
    return (<><AddTodo/>
        {todos.map(item => (
            <Todo key = {item.id} data = {item}/>
        ))}</>
        
    )
}