import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

function Todo(props){
    const {id, todo, done} = props.data
    const [isEdited, setIsEdited] = useState(false)
    const [editVal, setEditVal] = useState(todo)
    const dispatch = useDispatch()
    const editInput = useRef()
    useEffect(()=>{
        editInput.current.focus()
    })
    return (
        <li className="">
          <div className={done? "todo done" : 'todo '}>
            <div className="display">

              <input className="check" type="checkbox" checked={done} onChange={({target})=>{
                dispatch({
                  type:"TODOS_ISDONE",
                  id:id,
                  done:target.checked
                })
              }}></input>

              <div className="todo-content" onDoubleClick={()=>{
                setIsEdited(true)
            }}>{todo}</div>

              <span className="todo-destroy" onClick={()=>{
                dispatch({
                  type:"TODOS_REMOVE",
                  id:id
                })
              }}></span>

            </div>


            <div className={isEdited?"editing":"edit"} >
              <input
                className="todo-input"
                type="text"
                value={editVal}
                ref={editInput}
                onChange={({target})=>{
                    setEditVal(target.value)
                }}
                onBlur={()=>{
                    dispatch({
                        type:"TODO_CHANGE",
                        id:id,
                        todo:editVal
                    })
                    setIsEdited(false)
                }}
              ></input>
            </div>
          </div>
        </li>
    )
}

export {
    Todo
}