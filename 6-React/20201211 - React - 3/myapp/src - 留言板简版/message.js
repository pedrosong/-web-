const { Component } = require("react");

class Message extends Component {
  render() {
    const {data,removeMessage} = this.props;
    const {id,message,user} = data;
    return (
      <li>
        <h3>{user}</h3>
        <p>{message}</p>
        <a onClick={()=>{
            removeMessage(id);
        }}>删除</a>
      </li>
    )
  }
};
export default Message;