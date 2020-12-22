import { Component } from "react";

class App extends Component {
  componentDidMount(){
    console.log(this.refs.title);
  }
  render(){
    return <div>
      <h1 ref="title">hello React</h1>
    </div>
  }
}

export default App;
