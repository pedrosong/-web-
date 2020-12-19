import CreateTodo from "./CreateTodo"
import TodoList from "./TodoList"
import TodoStats from "./TodoStats"

export default function Content(){
    return(
        <div className="content">
            <CreateTodo />
            <TodoList />
            <TodoStats />
        </div>
    )
}