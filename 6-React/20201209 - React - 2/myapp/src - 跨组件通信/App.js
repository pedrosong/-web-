import { Component } from "react";
import Child from "./child";
import {Provider} from "./context";
class App extends Component {
  state={
    count: 1,
    name: "小明"
  }
  setCount=(count)=>{
    this.setState({
      count
    })
  }
  render() {
    const {count,name} = this.state;
    return <>
      <Provider
        value={{
          count,
          name,
          setCount:this.setCount
        }}
      >
        <Child />
      </Provider>  
    </>
  }
}

export default App;
