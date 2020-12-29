import { Component } from "react";
import Todo from "./todo";
class TodoList extends Component {
  render() {
    const {data} = this.props;
    return <ul id="todo-list">
        {
          data.map((item,index)=>{
              return <Todo 
                  {...this.props}
                  data={item}
                  key={item.id}
              />
          })
        }
      </ul>
  }
}

export default TodoList;
