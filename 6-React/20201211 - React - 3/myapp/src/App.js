import { Component } from "react";
import AddTodo from "./addTodo";
import "./index.css";
import TodoList from "./todoList";
/*
  !!! 如果 state 中的数据，是一个引用类型，要修改它时，一定记得返回一个新的引用
*/
class App extends Component {
  state={
    data:[
      {
        id: 0,
        todo: "今晚要早点睡",
        done: false,
      },{
        id: 1,
        todo: "中午要掉两颗星",
        done: true,
      }  
    ]
  }
  addTodo=(newTodo)=>{
    const {data} = this.state;
    // 在 React 不要直接修改状态
    /*
        data 是一个引用类型，这里直接修改 data 相对于修改 this.state.data

        在 React 直接修改 this.state，在更新之后，就没有办法获取到更新之前的状态
    */
   let newData = [...data,{
    id: Date.now(),
    todo: newTodo,
    done: false
  }];
    // data.push({
    //   id: Date.now(),
    //   todo: newTodo,
    //   done: false
    // });
    // 调用 setState 完成对 data 的修改
    this.setState({
      data:newData
    });
  }
  remove=(id)=>{
    const {data} = this.state;
    this.setState({
      data:data.filter(item=>item.id!==id)
    });
  }
  changeDone=(id,done)=>{
    const {data} = this.state;
    for(let i = 0; i < data.length; i++){
        if(id===data[i].id){
          //data[i].done = done;
          data[i] = {
            ...data[i],
            done
          }
          break;
        }
    }
   this.setState({
     data
   })
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
          changeDone={this.changeDone}
      />
    </div>
  </div>
  }
}

export default App;
