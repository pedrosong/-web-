import React, { Component, Fragment} from 'react';
import Child from "./child";
import PropTypes from "prop-types";
class App extends Component {
  state = {
    name: "开课吧"
  }
  // 调用 context API ，向子孙级元素传递信息
  getChildContext(){
     // return 定义的是需要通过 context 传递下去的信息
      return {
        name: this.state.name,
        setName: this.handlerName
      }
  }
  handlerName = (newName)=>{
    this.setState({
      name:newName
    })
  }
  render(){
    return <Fragment>
        <Child />
    </Fragment>
  }
}
// 使用 childContext ，必须在 父组件中定义 childContextTypes
App.childContextTypes = {
  name: PropTypes.string,
  setName: PropTypes.func
}
export default App;
