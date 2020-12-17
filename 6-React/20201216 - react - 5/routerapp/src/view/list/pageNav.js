import {Link, useParams} from "react-router-dom";
import data from "../../data";
const limit = 5;

function PageNav() {
  const {t="good",p="1"} = useParams();
  let nowData = data[t];
  let pageLen = Math.ceil(nowData.length/limit);
  function getInner() {
    let inner = [];  
    for( let i = 1; i <= pageLen; i++){
        if(i === Number(p)){
          inner.push(<span key={i}>{i}</span>)
        } else {
          inner.push(<Link to={`/list/${t}/${i}`} key={i}>{i}</Link>)
        }
    }
    return inner;
  }
  return <nav className="page_nub">
      {getInner()}
  </nav>
}

export default PageNav;