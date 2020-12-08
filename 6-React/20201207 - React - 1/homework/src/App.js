import { Component } from "react";
import rootdata from "./data";
import Dd from "./dd";

class App extends Component {
  render() {
    return <div className="friend-list">
    {Object.keys(rootdata).map((item,index)=>{ 
        return <Dd key={index} title={item} data={rootdata[item]} />
    })}
</div>
  }
}
export default App;