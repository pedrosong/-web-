import { Component } from "react";
import Child from "./child";

class App extends Component {
  state={
    show: true
  }
  render() {
    const {show} = this.state;
    return <>
        {show?<Child />:""}  
        <button onClick={()=>{
          this.setState({
            show:!show
          });
        }}>显示、隐藏</button>
    </>
  }
}

export default App;
