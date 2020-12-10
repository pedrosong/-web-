import { Component } from "react";
class Todo extends Component {
  render() {
    const {data,remove} = this.props;
    return <li className="">
          <div className="todo ">
            <div className="display">
              <div className="todo-content">{data.todo}</div>
              <span className="todo-destroy"
                onClick={()=>{
                  remove(data.id);
                }}
              ></span>
            </div>
          </div>
        </li>
  }
}

export default Todo;
