import { Component } from "react";
import "./index.css";
import AddMessage from "./AddMessage";
import MessageList from "./MessageList";


class App extends Component{
    state = {
        data:[{
                id:0,
                name:"React类组件基础02",
                msg:"组件间通信和生命周期"
            }]
    };
    addMeaasge = (newName, newMsg) => {
      const { data } = this.state;
      let newData = [
        ...data,
        {
          id: Date.now(),
          name: newName,
          msg: newMsg,
        },
      ];
      this.setState({
        data: newData,
      });
    };
    editMessage = (id, newMsg)=>{
      const {data} = this.state;
      for(let i = 0; i < data.length; i++){
          if(id===data[i].id){
            data[i] = {
              ...data[i],
              msg:newMsg
            }
            console.log(data[i])
            break;
          }
      }
     this.setState({
       data
     })
    }
    remove = (id) => {
        const {data} = this.state;
        this.setState({
          data: data.filter((item) => item.id !== id),
        });
    };

    render(){
        let { data } = this.state
        return <section className="wrap">
        <h2 className="title">留言板</h2>
        <AddMessage 
            addMeaasge = {this.addMeaasge}
        />
        <MessageList 
            data = { data }
            remove = { this.remove }
            editMessage = { this.editMessage }
        />
    </section>
    };
}

export default App;