import TodoList from "./TodoList";

export default function Todo(props){
    const {id,todo,isDone} = props.data;
    return <div className={isDone?'done':''}>
        id:{id}, todo:{todo}, isDone:{isDone?'Done':'Not Done'}
    </div>
}