import { createStore, combineReducers } from "redux";

function todos(
  todos = [
    {
      id: 1,
      todo: "这个是测试",
      done: true,
    },
  ],
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "TODOS_ADD":
      return [
        ...todos,
        {
          id: Date.now(),
          todo: action.todo,
          done: false,
        },
      ];
    case "TODOS_REMOVE":
      return todos.filter((item) => item.id !== action.id);
    case "TODOS_ISDONE":
      todos.forEach(item => {
          if ( item.id === action.id){
              item.done = action.done
          }
      })
      return [...todos];
    case "TODO_CHANGE":
        todos.forEach(item => {
            if (item.id === action.id){
                item.todo = action.todo
            }
        })
        return [...todos];
    case "TODO_REMOVEALLDONE":
        return todos.filter(item => item.done === false)
  }
  return todos;
}

export default createStore(
  combineReducers({
    todos,
  })
);
