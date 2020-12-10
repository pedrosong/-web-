import { Component } from "react";
import "./index.css";
import data from "./data";
import Dl from "./dl";
class App extends Component {
  state={
    openname:""//openname 记录的是当前应该哪一项展开，如果为空则都不展开
  }
  changeOpen=(name)=>{
    this.setState({
      openname:name
    })
  }
  render() {
    const {openname} = this.state;
    return <div className="friend-list">
        {Object.keys(data).map((item,index)=>{
            return <Dl 
              key={index} 
              data={data[item]} 
              name={item}
              openname={openname}
              changeOpen = {this.changeOpen}
            />
        })}
    </div>
  }
}

export default App;
