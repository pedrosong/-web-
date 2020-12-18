import { useState } from "react";
import { useDispatch } from "react-redux";
function AddTodo() {
  const [val, setVal] = useState("");
  const dispatch = useDispatch();
  return <div>
    <input
      type="text"
      value={val}
      onChange={({ target }) => {
        setVal(target.value);
      }}
    />
    <button onClick={() => {
      if (val.trim()) {
        dispatch({
          type: "TODOS_ADD",
          todo: val
        })
        setVal("");
      } else {
        alert("请输入内容")
      }

    }}>添加</button>
  </div>
}

export default AddTodo;