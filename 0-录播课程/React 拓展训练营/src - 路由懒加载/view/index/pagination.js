import React from 'react';
import { Link,useParams } from 'react-router-dom';
function Pagination() {
    let { type = "all", page = 1 } = useParams();
    let pageLen = 20;
    let pageStart = page-2; //获取当前页从哪里开始
    pageStart = pageStart<1?1:pageStart;
    let pageEnd = pageStart + 4;
    pageEnd = pageEnd>pageLen?pageLen: pageEnd;
    pageStart = pageEnd-4>=1?pageEnd-4:1;
    let pageNub = [];
    page -= 0;
    for(let i=pageStart;i<=pageEnd;i++){
        pageNub.push(i);
    }
    return (<nav className="pagination">
        {/* 上一页，当前页不是 1 */}
        {page>1?<Link to={`/${type}/${page-1}`}>上一页</Link>:""}
        {/* 上一组，如果当前不是最开始的，就是现实上一组 */}
        {pageStart>1?<Link title="上一组" to={`/${type}/${page-5>1?page-5:1}`}>{"<"}</Link>:""}
        {
            pageNub.map(item=>{
                return <Link to={`/${type}/${item}`} key={item} className={page==item?"active":""}>{item}</Link>
            })
        }
        {/* 下一组 */}
        {pageEnd<pageLen?<Link title="下一组" to={`/${type}/${page+5>pageLen?pageLen:page+5}`}>{">"}</Link>:""}
        {/* 如果当前页不是最后一页就显示下一页 */}
        {page<pageLen?<Link to={`/${type}/${page+1}`}>下一页</Link>:""}
    </nav>);
}

export default Pagination;
