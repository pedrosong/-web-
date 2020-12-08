import React,{Fragment} from "react";//17 之后，如果模块中只使用了 JSX，没有使用 React 其他方法或组件不需要在引入 React
import ReactDOM from "react-dom";

/*
  JSX 中的插值表达式
  1. 插入注释
  2. 插值值：表达式
  JavaSript 表达式: 运算之后会返回一个值的代码组合，如，变量，运算式，函数调用

  不同数据类型在插值的表现:
    基础类型：number,string,boolean,null,undefined,Symbol
       number,string: 原样输出
       boolean,null,undefined,Symbol: 输出时会忽略掉
    复合类型：object（object，array，function）
      array 去掉 ，号直接输出
      object:
        1. React Element
        2. 普通对象 不能作为内容输出

*/

let inner = "这是插值表达式插入的内容";
let child = <h2>Child</h2>;
console.log(child);
let header = <Fragment>
  <header className="header div" id="header">
      <h1 id="logo">开课吧</h1>
      {/* 这是注释 */}
      {"asdf"}
      {null}
      {true}
      {[1,2,3,4,5]}
      {/* {{inner:"123"}} */}
      <nav>
        <a href="/index">a1</a>
        <a href="/about">a2</a>
      </nav>
      <br />
      <input type="text" ></input>
  </header>
  <div>{inner}{child}</div>
</Fragment>;
ReactDOM.render(
  header,
  document.querySelector("#root"),
  ()=>{
    console.log("构建完成")
  }
);