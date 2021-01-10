import React, { useState } from 'react';
import {Provider} from "./react-redux/index";
import Child from "./child";
import { useStore } from './store';
function App() {
  let store = useStore();
  return <Provider value={store}>
      <Child />
  </Provider>
}
export default App;
