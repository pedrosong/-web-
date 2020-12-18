import { createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
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
// 处理列表状态
function list(list={
  data:[],
  loading:true
},action) {
  switch (action.type) {
    case "LIST_LOAD":
      return {
        data:action.data,
        loading: false
      }
  }
  return list;
}

export default createStore(combineReducers({
  count,
  todos,
  list
}),applyMiddleware(thunk));