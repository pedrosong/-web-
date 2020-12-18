import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
/*
  react-redux: react 项目中的 redux 绑定库
*/
// Provider：将 redux 创建好的 store 传递给整个项目的其他组件，在项目中，哪个组件需要使用，就接收 store 的方法，会使用 或 修改 state
ReactDOM.render(
  <Provider
    store={store} 
  >
    <App/>
  </Provider>,
  document.querySelector("#root")
)