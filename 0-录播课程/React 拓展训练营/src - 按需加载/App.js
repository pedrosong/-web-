import React, { lazy, Suspense } from 'react';
import {Provider} from "./react-redux/index";
import { useStore } from './store';
const Child = lazy(()=>import("./child"));
function App() {
  let store = useStore();
  return <Provider value={store}>
      <Suspense fallback={<div>视图请求中</div>} >
          <Child />
      </Suspense>
  </Provider>
}
export default App;
