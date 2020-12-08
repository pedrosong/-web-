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

  条件输出：||,&&,?:,函数

  循环输出:
    将内容转换成数组
*/
// let arr = [
//   "列表项1",
//   "列表项2",
//   "列表项3",
//   "列表项4"
// ];
/*
  参数=>返回值
*/
let data = {
  a:{
    inner: "列表项1"
  },
  b: {
    inner:"列表项2"
  },
  c: {
    inner:"列表项3"
  }
}
//let lis = arr.map(item=><li>{item}</li>);
Object.keys(data).map(item=>console.log(data[item]))
let ul = <ul>{Object.keys(data).map(item=><li>{data[item].inner}</li>)}</ul>;
ReactDOM.render(
  ul,
  document.querySelector("#root")
);