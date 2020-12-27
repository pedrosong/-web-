import Content from "./todoList/Content"
import Title from "./todoList/Title"
import "./css/index.css"
import { useSelector } from "react-redux";


function App() {
  const todos = useSelector((state) => state.todos);
  console.log(todos)
  return (
    <div id="todoapp">
      <Title />
      <Content />
    </div>
  )
}
export default App;