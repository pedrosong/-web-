import React,{Fragment} from "react";//17 之后，如果模块中只使用了 JSX，没有使用 React 其他方法或组件不需要在引入 React
import ReactDOM from "react-dom";

/*
  JSX的特殊属性 - style
  style 注意接收的值是一个对象
*/
/*
  JSX 的注意事项：
    1. JSX 并不是字符串
    2. JSX 是一个值，所以 JSX 中，必须有一个顶层（唯一）父级
       如果父级我们并不希望，在DOM中展示出来，可以使用 Fragment 组件或空标签<></>
    3. JSX 区分大小写，标签要全部小写，组件的首字母要大写
    4. JSX 标签必须闭合
*/
let classname = "div box";
let style = {
  width:"100px",
  height: "100px",
  background: "red"
}
let div = <div
  className={classname}
  style={{
  width:"100px",
  height: "100px",
  background: "red"
}}
>div1</div>
ReactDOM.render(
  div,
  document.querySelector("#root")
);