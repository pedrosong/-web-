import React,{Fragment} from "react";//17 之后，如果模块中只使用了 JSX，没有使用 React 其他方法或组件不需要在引入 React
import ReactDOM from "react-dom";
/*
  React 16 和 17 使用上的区别，模块中只使用到了 JSX 时，17 不需要在引入 React，16 还需要引入 React 
*/

/*
  JSX 注意事项：
    1. JSX 并不是字符串
    2. JSX 是一个值，所以 JSX 中，必须有一个顶层（唯一）父级
       如果父级我们并不希望，在DOM中展示出来，可以使用 Fragment 组件或空标签<></>
    3. JSX 区分大小写，标签要全部小写，组件的首字母要大写
    4. JSX 标签必须闭合
    5. JSX 不是html，很多属性在编写时不一样
    - className
    - style
    6. 列表渲染时，必须有 key 值 
*/

let header = <Fragment>
  <header className="header div" id="header">
      <h1 id="logo">开课吧</h1>
      <nav>
        <a href="/index">a1</a>
        <a href="/about">a2</a>
      </nav>
      <br />
      <input type="text" ></input>
  </header>
  <div>div</div>
</Fragment>;
console.log(header);
ReactDOM.render(
  header,
  document.querySelector("#root"),
  ()=>{
    console.log("构建完成")
  }
);