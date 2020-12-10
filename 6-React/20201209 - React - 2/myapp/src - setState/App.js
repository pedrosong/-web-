import { Component } from "react";
/*
  - setState(updater, [callback])
    - updater: 更新数据 FUNCTION/OBJECT
    - callback: 更新成功后的回调 FUNCTION
    - 异步: react通常会集齐一批需要更新的组件，然后一次性更新来保证渲染的性能
    - 浅合并 Objecr.assign()，通过setState 修改状态时，只需要传入要修改的state即可，setState 会帮助我们进行浅合并，将 修改sttae 合并入 组件的state 中。
    - 调用 setState 之后，会触发生命周期，重新渲染组件
*/
class App extends Component {
  state={
    count: 1,
    age: 10
  }
  render(){
    console.log("生成虚拟DOM");
    const {count,age} = this.state;
    return <div>
        <p>数字:{count}</p>
        <button onClick={()=>{
            this.setState({
              count: count + 1
            },()=>{
              console.log("组件更新完成");
            })   
        }}>递增</button>
        <p>年龄:{age}</p>
        <button onClick={()=>{
            this.setState({
              age: age + 1
            });  
            console.log(this.state.age);  
        }}>过年了</button>
         <button onClick={()=>{
            // this.setState({
            //   age: age + 1
            // });
            // this.setState({
            //   count: count + 1
            // });
            this.setState(function(){
              
              return {
                  age: age + 1,
                  count: count + 1
              }
            })    
        }}>同时修改</button>
    </div>
  }
}

export default App;
