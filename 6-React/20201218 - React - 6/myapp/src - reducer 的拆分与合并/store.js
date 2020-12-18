import { createStore,combineReducers } from "redux";
// 拆分 reducer
// function reducer(state = { 
//     count: 1,
//     todos:[]
//   }, action) {
//   return {
//     count:count(state.count,action),
//     todos:todos(state.todos,action)
//   };
// }
// 处理 count 相关的逻辑
function count(count=1,action) {
    switch (action.type) {
      case "COUNT_ADD":
        return count+1;
      case "COUNT_MIUS":
        return count-1;
    }
    return count;
}
// 处理 todo 相关的逻辑
function todos(todos=[],action) {
  switch (action.type) {
    case "TODOS_ADD":
      return [
        ...todos,
        {
          id: Date.now(),
          todo:action.todo
        } 
      ]
    case "TODOS_REMOVE":
      return todos.filter(item=>item.id!==action.id)
  }
  return todos;
}

// const reducer = combineReducers({
//   count:count,
//   todos:todos
// });
// const reducer = combineReducers({
//   count,
//   todos
// });

// export default createStore(reducer);

export default createStore(combineReducers({
  count,
  todos
}));