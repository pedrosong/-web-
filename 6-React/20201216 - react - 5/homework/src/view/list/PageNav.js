import { NavLink,useParams } from "react-router-dom"
import { createInner, createNewData } from './useAPI';
const limit = 5 ;

function PageNav(){
    const {type="all" , page="1"} = useParams();
    let newData = createNewData(type)
    let pageLen = Math.ceil(newData.length/limit);

    return(
    <nav className="pagination">
            <NavLink to={page>1? `/list/${type}/${Number(page)-1}` : `/list/${type}/1`}>上一页</NavLink>
            {createInner(type,page,pageLen)}
            <NavLink to={page<pageLen? `/list/${type}/${Number(page)+1}` : `/list/${type}/${pageLen}`}>下一页</NavLink>
    </nav>
    )
}

export default PageNav