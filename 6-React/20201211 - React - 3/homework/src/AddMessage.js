import { Component } from "react";

class AddMessage extends Component{
    state={
        newName:"",
        newMsg:""
    }
    render(){
        const {newName, newMsg} = this.state
        const { addMeaasge } = this.props
        return <div className="addMessage">
        <input 
            type="text" 
            placeholder="请输入昵称" 
            autoComplete="off"
            value={newName}
            onChange={({target})=>{
                this.setState({
                    newName:target.value
                })
            }}
            />
        <textarea 
            placeholder="请输入留言"
            value={newMsg}
            onChange={({target})=>{
                this.setState({
                    newMsg:target.value
                })
            }}
            ></textarea>
        <button
            onClick={() => {
                addMeaasge(newName,newMsg);
                this.setState({
                    newName:"",
                    newMsg:""
                })
            }}
        >提交留言</button>
    </div>
    }
};

export default AddMessage