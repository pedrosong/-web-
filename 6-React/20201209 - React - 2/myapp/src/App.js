import { Component } from "react";
import AddTodo from "./addTodo";
import "./index.css";
import TodoList from "./todoList";
class App extends Component {
  state={
    data:[
      {
        id: 0,
        todo: "今晚要早点睡"
      }  
    ]
  }
  addTodo=(newTodo)=>{
    const {data} = this.state;
    data.push({
      id: Date.now(),
      todo: newTodo
    });
    this.setState({
      data
    });
  }
  remove=(id)=>{
    const {data} = this.state;
    this.setState({
      data:data.filter(item=>item.id!==id)
    });
  }
  render() {
    const {data} = this.state;
    return <div id="todoapp">
    <div className="title">
      <h1>todo</h1>
    </div>
    <div className="content">
      <AddTodo 
        addTodo={this.addTodo}
      />
      <TodoList 
          data={data}
          remove={this.remove}
      />
    </div>
  </div>
  }
}

export default App;
