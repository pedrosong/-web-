import { createStore } from "redux";
import ReactDOM from "react-dom";
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
function reducer(state = { count: 1 }, action) {
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
/*
纯函数：
1. 相同的输入永远返回相同的输出
2. 不修改函数的输入值
3. 不依赖外部环境状态，只依赖于自己的参数
4. 无任何副作用: DOM操作、异步程序
*/


const store = createStore(reducer);
render();
let unSubscribe = store.subscribe(()=>{
  render();
}); //监听state发生变化
function render() {
  ReactDOM.render(
    <div>
      <p>{store.getState().count}</p>
      <button onClick={()=>{
          store.dispatch({
              type:"ADD"
          })
      }}>递增</button>
      <button onClick={()=>{
           store.dispatch({
              type:"MIUS"
          })
      }}>递减</button>
       <button onClick={()=>{
          unSubscribe();
      }}>取消监听</button>
      <button onClick={()=>{
          unSubscribe();
          unSubscribe = store.subscribe(()=>{
            render();
          }); 
      }}>添加监听</button>
      <button onClick={()=>{
          store.replaceReducer((state={count:1},action)=>{
            switch (action.type) {
              case "ADD":
                return {
                  count: state.count + 2
                }; //reducer 的返回值，是修改后的状态
              case "MIUS":
                return {
                  count: state.count - 2
                }
            }
            return state;
          })
      }}>替换reducer</button>
    </div>,
    document.querySelector("#root")
  )
}