import React from 'react';
import ReactDOM from "react-dom";
function Child() {
  return ReactDOM.createPortal(<h1>Hello Child</h1>,document.querySelector("#root2"))
}

export default Child;
