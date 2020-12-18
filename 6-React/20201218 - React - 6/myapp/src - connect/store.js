import { createStore } from "redux";
function reducer(state = { count: 1,name:"开课吧" }, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        count: state.count + 1
       
      }; //reducer 的返回值，是修改后的状态
    case "MIUS":
      return {
        ...state,
        count: state.count - 1
       
      }
  }
  return state;
}

export default createStore(reducer);