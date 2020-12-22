import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*
  StrictMode React 严格模式
  1. 只在开发环境下有
  2，在组件更新时，有时会执行两次 render
*/
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

