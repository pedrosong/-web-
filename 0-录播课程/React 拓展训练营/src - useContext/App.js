import React, { useState } from 'react';
import {Provider} from "./store/index";
import Child from "./child";
function App() {
  let [name, setName] = useState("kkb");
  return <Provider value={{
      name,
      setName
  }}>
      <Child />
  </Provider>
}
export default App;
