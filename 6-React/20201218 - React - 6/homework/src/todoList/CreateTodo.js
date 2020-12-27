import { useState } from "react";
import { useDispatch} from "react-redux";

export default function CreateTodo() {
  const [val, setVal] = useState("");
  const dispatch = useDispatch();

  return (
    <div id="create-todo">
      <input
        id="new-todo"
        placeholder="What needs to be done?"
        autoComplete="off"
        type="text"
        value={val}
        onChange={({ target }) => {
          setVal(target.value);
        }}
        onKeyDown={({ code }) => {
          if (code === "Enter") {
            if (val.trim()) {
              dispatch({
                type: "TODOS_ADD",
                todo: val,
              });
              setVal("")
            } else {
              alert("请输入");
            }
          }
        }}
      ></input>
    </div>
  );
}
