/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

class MessageList extends Component{
    render(){
        const { data,remove } = this.props

        return <ul className="messageList">
        {data.map((item,index) => {
            return <li key={index}>
            <h3>{item.name}</h3>
            <p>{item.msg}</p>
            <a onClick={()=>{
                const id =item.id
                remove(id)
            }}>删除</a>
        </li>
        })}
    </ul>
    };
};

export default MessageList