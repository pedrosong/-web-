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

  条件输出：
    ||
    &&
    ?:
    函数

*/
let is = false;
let is2 = true;
let is3 = false;
let is4 = (nub)=>{
  if(nub < 5){
    return <strong>小于5</strong>
  }
  if(nub < 10){
    return <strong>小于10</strong>
  }
  if(nub < 15){
    return <strong>小于15</strong>
  }
  if(nub < 20){
    return <strong>小于20</strong>
  }
  return <strong>大于等于20</strong>
}
let div = <div>
  <div>{is||<strong>条件不成立时输出</strong>}</div>
  <div>{is2&&<strong>条件成立时输出</strong>}</div>
  <div>{is3?<strong>条件成立时输出</strong>:<strong>条件不成立时输出</strong>}</div>
  <div>{is4(12)}</div>
</div>
ReactDOM.render(
  div,
  document.querySelector("#root")
);