import React, { Component, Fragment} from 'react';
import Child from "./child";
class App extends Component {
  state = {
    show: true,
    name: "开课吧"
  }
  handlerName = (newName)=>{
    this.setState({
      name:newName
    })
  }
  render(){
    let {show,name} = this.state;
    return <Fragment>
        {show?<Child name={name} setName={this.handlerName}  />:""}
    </Fragment>
  }
}

export default App;
