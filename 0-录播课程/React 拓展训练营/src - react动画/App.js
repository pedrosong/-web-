import React, { Fragment, useState } from 'react';
import { CSSTransition } from "react-transition-group";
function App() {
  let [isIn,setIn] = useState(false);
  return <div className="wrap">
    <CSSTransition
      classNames={{
        enter: 'my-enter',
        enterDone: 'my-done-enter',
        exit: 'my-exit',
        exitDone: 'my-done-exit'
      }}
      timeout={1000}
      in={isIn}
    >
      <div className="div">开课吧</div>
    </CSSTransition>
    <button onClick={()=>{
        setIn(!isIn);
    }}>动画</button>
  </div>;
}

export default App;
