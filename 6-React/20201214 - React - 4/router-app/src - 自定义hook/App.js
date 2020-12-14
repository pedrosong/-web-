import { useEffect, useReducer } from "react";
import { useScroll } from "./hook";

/*
hooks 使用注意事项：
  1. hooks 要保障其调用顺序，所以必须在最外层使用(不能if、for、子函数……等)
  2. hooks 只能在 react 函数中调用
react 函数:
  1. 函数式组件
  2. 自定义 hook 

自定义 hook：
1. hook 就是一个函数
2. 在 React hook 必须以 use 为开始命名  
  

hooks 优势:
- 简化组件逻辑
- 复用状态逻辑
- 无需使用类组件编写

*/
function App() {
  const [Y,setY] = useScroll();
  return <div className="box">
    <style>
        {
          `
            .box div {
              width: 300px;
              height: 300px;
              border: 2px solid #000;
            }
            .box span {
              position: fixed;
              left: 0;
              top: 50%;
              width: 100px;
              font: 30px/50px "宋体";
              color: #fff;
              background: red;
              text-align: center;
            }
          `
        }
    </style>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    {Y>window.innerHeight?<span onClick={()=>{
      setY(0);
    }}>{Y}</span>:""}
  </div>
}
export default App;
