import { Component } from "react";
import "./index.css";
import AddMessage from "./AddMessage";
import MessageList from "./MessageList";
import ManageMessage from "./ManageMessage";
import rootdata from './database';

class App extends Component {
  state = {
    data: rootdata
  };
  addMessage = (newName, newMsg) => {
    const { data } = this.state;
    let newData = [
      ...data,
      {
        id: Date.now(),
        name: newName,
        msg: newMsg,
        isChosen: false,
      },
    ];
    this.setState({
      data: newData,
    });
  };

  remove = (id) => {
    const { data } = this.state;
    this.setState({
      data: data.filter((item) => item.id !== id),
    });
  };

  selectMsg = (id,target) => {
    const {data} = this.state
    for (let i = 0; i < data.length; i++) {
      if ( id ===  data[i].id){
        data[i].isChosen = target.checked
        break
      }      
    }
    this.setState({
      data
    })
  }

  editMessage = (id, newMsg) => {
    const { data } = this.state;
    for (let i = 0; i < data.length; i++) {
      if (id === data[i].id) {
        data[i] = {
          ...data[i],
          msg: newMsg,
        };
        console.log(data[i]);
        break;
      }
    }
    this.setState({
      data,
    });
  };
  
  selectAllOrSelectNone = (evenTarget) => {
    const { data } = this.state;
    if (evenTarget.checked === true) {
      data.map((item) => {
        return (item.isChosen = true);
      });
    } else if (evenTarget.checked === false) {
      data.map((item) => {
        return (item.isChosen = false);
      });
    }
    this.setState({
      data: data,
    });
  };

  removeAllSelectedMessages = () => {
    const { data } = this.state;
    this.setState({
      data: data.filter((item) => item.isChosen !== true),
    });
  };

  render() {
    let { data } = this.state;
    return (
      <section className="wrap">
        <h2 className="title">留言板</h2>
        <AddMessage addMessage={this.addMessage} />
        <MessageList
          data={data}
          remove={this.remove}
          editMessage={this.editMessage}
          selectMsg={this.selectMsg}
        />
        <ManageMessage
          data={data}
          selectAllOrSelectNone={this.selectAllOrSelectNone}
          removeAllSelectedMessages={this.removeAllSelectedMessages}
        />
      </section>
    );
  }
}

export default App;