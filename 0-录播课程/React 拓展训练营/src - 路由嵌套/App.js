import React,{Fragment} from 'react';
import IndexRoutes from './router';
import IndexNav from './component/IndexNav';
import { indexRoutes } from './router/routes';
function App() {
  return <div className="wrap">
    <IndexNav />
    <IndexRoutes 
      routes = {indexRoutes}
    />
  </div>;
}

export default App;
