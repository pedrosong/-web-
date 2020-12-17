 /* react 17 之后，如果该模块中只用到了 JSX，是不需要引入 React */
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  document.getElementById('root')
);
