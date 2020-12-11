import Message from "./message";
const { Component } = require("react");

export default class MessageList extends Component {
  render(){
    const {data}= this.props;
    return (
      <ul className="messageList">
      {data.map((item,index)=> <Message {...this.props} key={index} data={item} />)}
        
      </ul>
    );
  }
}