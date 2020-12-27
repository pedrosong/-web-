/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";

export default function TodoStats() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todos);
  const complateTodos = data.filter((item) => item.done === true).length;
  console.log(complateTodos);
  return (
    <div id="todo-stats">
      <span className="todo-count">
        <span className="number">{data.length - complateTodos}</span>
        <span className="word">项待完成</span>
      </span>
      <span className="todo-clear">
        <a
          onClick={() => {
            dispatch({
              type: "TODO_REMOVEALLDONE",
            });
          }}
        >
          Clear <span>{complateTodos}</span> 已完成事项
        </a>
      </span>
    </div>
  );
}
