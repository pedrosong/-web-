import {Component} from "react";
/*
  React 组件分两种，一种是类组件，一种函数组件，在React 16.7 之前 函数组件只能依赖父级进行更新
  类组件: 
    1. 类组件必须继承自 Component
    2. 组件名首字母必须大写
    3. 类组件中必须有一个 render 方法，该方法的返回值，是当前组件要构建的视图
    4. 在组件中，有一个 state 属性，该属性中保存的是组件可变的数据，当 state 更新时，会引起 组件更新，从而改变视图
  事件：
    1. react 中添加事件类似于 JS 的行间事件
    2. 事件名是驼峰命名
    3. 注意事件处理函数的 this 指向 undefined
       将 this 指向 组件实例:
        - 箭头函数
        - bind
  更新状态：
    1. 在组件中要更新状态，需要调用实例的setState方法
    2. setState 本身接收一个参数是 对象的数据，该对象中，是更新后的 state 
*/
// class App extends Component {
//   state={
//     count: 1
//   }
//   render(){
//     const {count} = this.state; 
//     return <div>
//       <p>当前数字{count}</p>
//       <button onClick={()=>{
//         console.log(this);
//       }}>递增</button>
//     </div>
//   }
// }
// class App extends Component {
//   constructor(props){
//       super(props);
//       this.state = {
//         count: 1
//       };
//       this.handler = this.handler.bind(this);
//   }
//   handler(){
//     console.log(this);
//   }
//   render(){
//     const {count} = this.state; 
//     return <div>
//       <p>当前数字{count}</p>
//       <button onClick={this.handler}>递增</button>
//     </div>
//   }
// }
class App extends Component {
  state={
    data: {
      count:1
    }
  }
  handler=()=>{
    const {count} = this.state.data; 
    this.setState({
      data: {
        count: count + 1
      }
    });
  }
  render(){
    const {count} = this.state.data; 
    return <div>
      <p>当前数字{count}</p>
      <button onClick={this.handler}>递增</button>
    </div>
  }
}
export default App;