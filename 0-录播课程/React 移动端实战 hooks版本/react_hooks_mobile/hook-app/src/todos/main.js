import React, {useState, useEffect, useRef } from 'react';
function Li(props){
    const [edit,setEdit] = useState(false);
    const elEdit = useRef(null);
    let {inner,changeCompleted,remove,editVal} = props;
    let {id} = inner;
    useEffect(()=>{
        if(edit){
            elEdit.current.select();
        } else {
            if(!inner.val.trim()){
                setEdit(true);
            }
        }
    },[edit]);
    return (
        <li className={inner.completed?"done":""}>
            <div 
                className="view"
                style = {{
                    display: edit?"none":"block"
                }}
            >
                <input 
                    className="toggle" 
                    type="checkbox" 
                    checked = {inner.completed}  
                    onChange = {(e)=>{
                        changeCompleted(id,e.target.checked);
                    }}  
                />
                <label
                    onDoubleClick = {()=>{
                        setEdit(true);
                    }}
                >{inner.val}</label>
                <a className="destroy"
                    onClick={()=>{
                        remove(id);
                    }}
                ></a>
            </div>
            <input 
                className="edit" 
                type="text" 
                value={inner.val} 
                ref = {elEdit}
                style = {{
                    display: edit?"block":"none"
                }}
                onBlur = {()=>{
                    setEdit(false);
                }}
                onChange = {(e)=>{
                    editVal(id,e.target.value);
                }}
            />
        </li>
    )
}
function Mian(props){
  let {todos,changeAllCompleted} = props;
  let completed = todos.filter(item=>item.completed);
  return (
    <section 
        id="main"
        style={{
            display: todos.length > 0 ?"block":"none"
        }}
    >
        <input 
            id="toggle-all" 
            type="checkbox" 
            checked={completed.length == todos.length} 
            onChange = {(e)=>{
                changeAllCompleted(e.target.checked);
            }}    
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
            {
                todos.map(item=>{
                    return <Li
                        key = {item.id}
                        inner = {item}
                        {...props}
                     />
                })  
            }
        </ul>
    </section>
    );
}


export default Mian;
