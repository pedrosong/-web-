const { Component } = require("react");

export default class AddMessage extends Component {
  state={
    user: "",
    message:""
  }
  render(){
    const {addMessage} = this.props;
    const {user,message} = this.state;
    return (
      <div className="addMessage">
        <input 
          type="text" 
          placeholder="请输入昵称" 
          value={user}
          onChange={({target})=>{
              this.setState({
                user:target.value
              })
          }}
        />
        <textarea 
          placeholder="请输入留言"
          value={message}
          onChange={({target})=>{
              this.setState({
                message:target.value
              })
          }}
        ></textarea>
        <button onClick={()=>{
            if(user.trim()&&message.trim()){
              addMessage(user,message);
              this.setState({
                user:"",
                message:""
              })
            } else {
              alert("就两项还不填")
            }
        }}>提交留言</button>
      </div>
    )
  }
}