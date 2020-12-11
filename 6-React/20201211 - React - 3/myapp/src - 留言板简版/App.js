import {Component} from "react";
import AddMessage from "./addMessage";
import MessageList from "./messageList";

class App extends Component {
  state = {
    data:[
      {
        id: 1,
        user:"钟阿姨",
        message: "这是沙发"
      },{
        id: 2,
        user:"小瑞瑞",
        message: "这是板凳"
      }
    ]
  }
  addMessage=(user,message)=>{
    const {data} = this.state;
    data.push({
      id: Date.now(),
      user,
      message
    });
    this.setState({
      data
    })
  }
  removeMessage=(id)=>{
    const {data} = this.state;
    this.setState({
      data:data.filter(item=>item.id!==id)
    })
  }
  render() {
    const {data} = this.state;
    return (
      <section className="wrap">
        <h2 className="title">留言板</h2>
        <AddMessage 
            addMessage = {this.addMessage}
        />
        <MessageList
          data = {data}
          removeMessage = {this.removeMessage}
        />
      </section>
    );
  }
}

  export default App;
