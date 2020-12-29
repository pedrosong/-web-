import { createRef, PureComponent } from "react";
/*
  PureComponent 功能和 Component 完全一致，只是，在更新时，会进行，props 和 state 的浅对比
*/
/*
  进入编辑状态一定要让输入框获得焦点，这时操作其他地方才可以触发输入的失焦事件
*/
/*
  ref: 用于获取组件实例或 真实DOM节点
  createRef 用来创建一个 ref 对象
  在元素中将 ref={ref 对象}
*/
class Todo extends PureComponent {
  state = {
    setEdit: false
  }
  editText = createRef();
  todoEl = createRef();
  componentDidUpdate(prevProps,prevState){
      if((!prevState.setEdit)
      && this.state.setEdit){
          //console.log("进入编辑状态");
          // 让输入框获得焦点
        this.editText.current.focus();
      }
      //console.log(prevState.setEdit,this.state.setEdit);
  }
  componentDidMount(){
    console.log(this.editText);
    console.log(this.todoEl);
  }
  render() {
    const {data,remove,changeDone} = this.props;
    const {id,todo,done} = data;
    const {setEdit} = this.state;
    return <li 
      className={setEdit?"editing":""}
      ref={this.todoEl}
    >
          <div className={`todo ${done?"done":""}`}>
            <div className="display">
              <input 
                className="check" 
                type="checkbox" 
                checked={done}
                ref={this.editText}
                onChange={({target})=>{
                  changeDone(id,target.checked);
                }}
              />
              <div 
                className="todo-content"
                onDoubleClick={()=>{
                  this.setState({
                    setEdit:true
                  });
                }}
              >{todo}</div>
              <span className="todo-destroy"
                onClick={()=>{
                  remove(id);
                }}
              ></span>
            </div>
            <div className="edit">
                <input 
                  className="todo-input" 
                  type="text" 
                  // ref={this.editText}
                  onBlur={()=>{
                    this.setState({
                      setEdit:false
                    })
                  }}
                />
            </div>
          </div>
        </li>
  }
}

export default Todo;
