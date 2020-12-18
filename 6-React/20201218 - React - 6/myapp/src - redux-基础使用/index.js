import { createStore } from "redux";
/*
  理解 Redux 核心几个概念与它们之间的关系

- state 状态
- reducer 纯函数 - 提供修改状态的方法
- store 仓库 - 管理状态
  - dispatch: ƒ dispatch(action) 发起一个 action
      - 调用 dispatch 之后，dispatch 会将通知 store 执行 reducer，并将 action 传递给 reducer
      - dispatch 是同步方法
  - getState: ƒ getState() 获取状态
  - replaceReducer: ƒ replaceReducer(nextReducer)
  - subscribe: ƒ subscribe(listener)
- action 动作 - 对 state 的修改动作
  - action 就是一个 JS 的普通对象
  - action 必须有一个 type 属性，type 属性中，描述了要对 state 做何种修改
  - 潜规则：action的type 必须大写
*/

/**
 * createStore 创建 store
 * store  = createStore(reducer) 
 */
// const fn = (state={
//   count: 1
// })=>{
//     return state;
// };
function reducer(state={count:1},action) {
  //console.log(action);
  switch (action.type) {
    case "ADD":
      return {    
        count: state.count + 1
      }; //reducer 的返回值，是修改后的状态
    case "MIUS":
      return {
        count: state.count - 1
      }
  }
  return state;
}
const store = createStore(reducer);

console.log(store.getState());
store.dispatch({
  type: "ADD"
});//发起一个action修改
console.log(store.getState());
store.dispatch({
  type: "MIUS"
});
console.log(store.getState());