/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Message from "./Message";

class MessageList extends Component {
  render() {
    const { data } = this.props;
    return (
      <ul className="messageList">
        {data.map((item) => {
          return <Message 
              {...this.props} 
              data={item} 
              key={item.id} 
            />;
        })}
      </ul>
    );
  }
}

export default MessageList;
