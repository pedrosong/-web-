import { Component } from "react";
import rootdata from "./data";
import Li from "./li";
/*
  props: 在调用子组件时，可以将要传递给子组件的数据，添加子组件的属性上,在子组件上可以通过 props属性 来接收父级传递过来的数据
*/
class App extends Component {
  render() {
    return <ul id="menu">
        {Object.keys(rootdata).map((item,index)=>{
            //console.log(rootdata[item]);
            return <Li 
              key={index} 
              title={item}
              data={rootdata[item]}
            />
        })}
    </ul>
  }
}
export default App;