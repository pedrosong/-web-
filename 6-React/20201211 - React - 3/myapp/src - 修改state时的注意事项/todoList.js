import { Component } from "react";
import Todo from "./todo";
/*
A(0), B(1), C(2), D(3)
B(1), C(2), D(3), A(4)

key 的作用，给虚拟DOM 添加一个标识，方便程序在更新时匹配节点
1. 更新前后，Key 要保持一至
2. key 在同一个列表要保持唯一

!!! 如果列表中的顺序会发生改变一定要用数据的id
A(0), B(1), C(2), D(3)

B(0), C(1), D(2), E(3)

*/
class TodoList extends Component {
  shouldComponentUpdate(nextProps){
      console.log(this.props,nextProps, "list");
      return true;
  }
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
