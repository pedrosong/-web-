import { Component } from "react";
/*
  在 React 中，默认情况下，父组件更新，会引起所有子组件进行更新
*/
class Todo extends Component {
  shouldComponentUpdate(nextProps,nextState){ // 获取更新前的 props|state 和 更新后的 props|state判断组件是否需要进行更新
    //console.log(nextProps.data.done,this.props.data.done);
   if(nextProps.data !== this.props.data)return true;
   return false;
  }
  render() {
    const {data,remove,changeDone} = this.props;
    const {id,todo,done} = data;
    console.log("render",id);
    return <li className="">
          <div className={`todo ${done?"done":""}`}>
            <div className="display">
              <input 
                className="check" 
                type="checkbox" 
                checked={done}
                onChange={({target})=>{
                  changeDone(id,target.checked);
                }}
              />
              <div className="todo-content">{todo}</div>
              <span className="todo-destroy"
                onClick={()=>{
                  remove(id);
                }}
              ></span>
            </div>
          </div>
        </li>
  }
}

export default Todo;
