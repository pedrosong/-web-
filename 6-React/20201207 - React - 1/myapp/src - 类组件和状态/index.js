import ReactDOM from "react-dom";
import App from "./App";
/*
  在 React 中，将整个视图拆分若干个组件，视图的更新要在组件上控制
*/
ReactDOM.render(
  <App />,
  document.querySelector("#root")
);