import { Component } from "react";
/*
  受控组件: 想要获取表单的一些内部状态时，就可以将表单的内部状态和组件的状态进行绑定，这样就形成受控组件
    checked：将 组件的状态，赋值给控件的 checked 属性，通过 onChange 事件监听控件的 checked 属性发生变化，再赋值给 组件的 state
    value: 将 组件的状态，赋值给控件的 value 属性，通过 onChange 事件监听控件的 value 属性发生变化，再赋值给 组件的 state
  非受控组件：
    1. 需要设置初始值，只设置初始值，并不希望该控件受控，不要用value|checked（只要用 value|checked）react 就认为我们做受控组件. 这里要用 defaultValue 和 defaultChecked
    2. 不需要设置初始值
*/
class App extends Component {
  state={
    val:""
  }
  componentDidMount(){
    let text1 = document.querySelector("#text1");
    text1.oninput = function(){
      console.log(this.value);
    }
  }
  render() {
    const {val} = this.state;
    return <div>
        <input
           type="text" 
           value={val}  
           onChange={({target})=>{
              this.setState({
                val: target.value
              })
           }}
        />
        <input type="text" id="text1" />
        <input type="text" id="text2" defaultValue="初始值" />
        <p>{val}</p>
        <button onClick={()=>{
          this.setState({
            val:""
          })
        }}>重置</button>
    </div>
  }
}

export default App;
