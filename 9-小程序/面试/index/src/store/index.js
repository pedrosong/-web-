import { createStore, combineReducers } from "redux";

function todos(
  todos = [
    {
      id: 1,
      todo: "ceshi",
      isDone: true,
    },
  ],
  action
) {
  switch (action.type) {
      case 'ADD_TODO':
          return [
              ...todos,
              {
                  id:Date.now(),
                  todo:action.todo,
                  isDone:false
              }
          ]
      default:
          break;
  }
  return todos;
}

export default createStore(combineReducers({ todos }));
