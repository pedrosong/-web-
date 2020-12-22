import style from "./static/css/style.module.css";
console.log(style);
function Child(params) {
  return <div>
      <div className={style.box}>child - box</div>
  </div>
}
export default Child;