import { Component } from "react";
import Child from "./child";
/*
  React 的特殊属性
*/
class App extends Component {
  render() {
    // 调用组件时，如果在标签对中间写内容，该内容会传递给子组件的props.children 属性
    return <Child>
        <div>明天周末了，要约一块做练习吗</div>
        <button>约</button>
        <button>不约，练习太少已经做完了</button>
        {()=>{
          alert("你想干啥")
        }}
    </Child>
  }
}

export default App;
