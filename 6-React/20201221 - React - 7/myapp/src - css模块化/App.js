import Child from "./child";
import style from "./static/css/index.module.css";
console.log(style);
function App() {
  return <div>
      <Child />
      <div className={style.box}>app - box</div>
      <div className={style.div}>app - div</div>
      <div className={style.div + " " + style.box}>app - div - box</div>
      <div className="div2"></div>
  </div>;
}

export default App;
