import { Component } from "react";
import Child from "./child";
class App extends Component {
  state = {
    count: 1
  }
  setCount = (count)=>{
    this.setState({
      count
    });
  }
  render(){
    const {count} = this.state;
    return <div>
        <Child 
            count = {count}
            setCount = {this.setCount}
        />
    </div>
  }
}

export default App;
