import { Route ,Switch} from "react-router-dom";
import TodoList from "./view/TodoList";
import HomePage from "./component/HomePage";  

function App() {
  return (
    <Switch>
      <Route path="/todolist" component={TodoList}/>
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

export default App;
