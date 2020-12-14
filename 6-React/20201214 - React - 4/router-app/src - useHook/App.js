import { useState } from "react";

/*
  hooks (勾子函数)

  hooks 使用注意事项：
    1. hook 必须在组件的最外层调用，不能包含在 if for 或 子函数 等等

    内置 hook
      useState 定义状态 
        `const [state, setState] = useState(initialState);`
            let [状态,修改该状态的方法] = useState(初始值);
            1. 在同一个组件中可以使用 useState 定义多个状态
            2. 注意 useState 返回的 setState 方法，不会进行对象合并
            3. 注意 useState 返回的 setState 方法同样是异步方法
      useEffect
      useRef
    自定义 hook
*/
// function App() {
//     const [count,setCount] = useState(0);
//     const [name,setName] = useState("");
//     return <div>
//         <p>{count}</p>
//         <button onClick={()=>{
//             setCount(count + 1);
//         }}>递增</button>
//         <br />
//         <input 
//           type="text" 
//           value={name} 
//           onChange={({target})=>{
//             setName(target.value);
//           }}
//         />
//         <p>{name}</p>
//     </div>
// }
/*
  function App() {
    const [data,setData] = useState({
      count: 1,
      name:""
    });
    // state 为对象时，hook 的setState 不会帮我们进行浅合并
    const {count,name} = data;
    return <div>
        <p>{count}</p>
        <button onClick={()=>{
            setData({
              ...data,
              count:count + 1
            });
        }}>递增</button>
        <br />
        <input 
          type="text" 
          value={name} 
          onChange={({target})=>{
            setData({
              ...data,
              name:target.value
            });
          }}
        />
        <p>{name}</p>
    </div>
  }
*/
/*
  函数式组件在更新时，是整个函数重新执行一遍
*/
/*
mount阶段：
 rows1: const [count,setCount] = useState(0)
    let state = [0];
    return [state[0],(nub)=>{state[0] = nub; updater()}]
 rows2:const [name,setName] = useState("");
    state.push(""); ---> state=[0,""]
    return  [state[1],(data)=>{state[1] = data; updater()}]
  
updater阶段：
   rows1: const [count,setCount] = useState(0);
   return [state[0],(nub)=>{state[0] = nub; updater()}]
  

*/
function App() {
    const [count,setCount] = useState(0);
    const [name,setName] = useState("");
    const [name2,setName2] = useState("");
    return <div>
        <p>{count}</p>
        <button onClick={()=>{
            setCount(count + 1);
            //console.log(count);
        }}>递增</button>
        <br />
        {/* <input 
          type="text" 
          value={name} 
          onChange={({target})=>{
            setName(target.value);
          }}
        />
        <p>{name}</p> */}
        <button onClick={()=>{
          setCount(0);
          //setName("");
        }}>重置</button>
    </div>
}
export default App;
