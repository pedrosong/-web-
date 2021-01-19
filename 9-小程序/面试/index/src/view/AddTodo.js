import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddTodo() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  return (
    <input
      type="text"
      value={value}
      onChange={({ target }) => {
        if (target.value) {
          setValue(target.value);
        }
      }}
      onKeyDown={({code }) => {
          if(code === "Enter"){
              dispatch({
                  type:"ADD_TODO",
                  todo:value,
              });
              setValue('')
          }
      }}
    />
  );
}
