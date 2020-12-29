import {PureComponent } from "react";
/*
  编辑 todo:
    !!! 退出编辑状态时，如果value 为空，todo则保持原有内容，不为空则修改todo
*/
class Todo extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      setEdit: false,
      editVal: props.data.todo //将 todo 备份一份，修改时只修改备份
    }
  }
  
  editText=null;
  componentDidUpdate(prevProps,prevState){
      if((!prevState.setEdit)
      && this.state.setEdit){
          // 让输入框获得焦点
        this.editText.focus();
      }
  }
  render() {
    const {data,remove,changeDone,editTodo} = this.props;
    const {id,todo,done} = data;
    const {setEdit,editVal} = this.state;
    return <li 
      className={setEdit?"editing":""}
    >
          <div className={`todo ${done?"done":""}`}>
            <div className="display">
              <input 
                className="check" 
                type="checkbox" 
                checked={done}
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
                  ref={(node)=>{
                    this.editText = node;
                  }}
                  value={editVal}
                  onChange={({target})=>{
                    this.setState({
                      editVal:target.value
                    })
                  }}
                  onBlur={()=>{
                    if(editVal.trim()){
                      editTodo(id,editVal); //如果编辑框的数据不为空，则修改todo
                    } else {
                      this.setState({
                        editVal:todo
                      })
                    }
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
