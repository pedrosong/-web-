import { useState } from "react";
import Count from "./count";
import List from "./list";
import Todo from "./todo";

function App() {
  const [showList,setShow] = useState(false)
  return <>
      <Count />
      <hr />
      <Todo />  
      <hr />
      <button onClick={()=>{
          setShow(!showList)
      }}>显示/隐藏</button>
      {showList?<List />:""}
  </>
}
export default App;