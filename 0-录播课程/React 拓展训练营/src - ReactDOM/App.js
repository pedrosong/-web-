import React, { useRef, useState } from 'react';
import ReactDOM from "react-dom";
function App() {
  let [name,setName] = useState("kkb");
  let [age,setAge] = useState(9);
  console.log(1);
  return (
    <div className="App">
        <p>{name}</p>
        <p>{age}</p>
        <button onClick={()=>{
          setTimeout(()=>{
            ReactDOM.unstable_batchedUpdates(()=>{
              setName("开课吧");
              setAge(++age);
            });
          });
        }}>按钮</button>
    </div>
  );
}
// function App() {
//   const h1 = useRef();
//   return (
//     <div className="App">
//         <h1 ref={h1}>Hello React</h1>
//         <button onClick={()=>{
//             // //console.log(h1.current);
//             // console.log(ReactDOM.findDOMNode(<App />));
//             ReactDOM.unmountComponentAtNode(document.querySelector("#root"));
//         }}>按钮</button>
//     </div>
//   );
// }

export default App;
