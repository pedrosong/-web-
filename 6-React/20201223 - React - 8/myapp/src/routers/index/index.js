import IndexList from "./indexList";
import IndexNav from "./indexNav";
import { useLocation } from "react-router-dom";
import qs from "qs";
import IndexPagination from "./index_pagination";
function IndexPage() {
   const {search} = useLocation();
   const {tab="all",page="1"} = qs.parse(search.slice(1));
   return <div className="view"
      style={{
         background:"red"
      }}
   >
         <div className="wrap">
           <IndexNav 
              tab={tab}
           />
           <IndexList 
              tab={tab}
              page={page}
           />
           <IndexPagination 
              tab={tab}
              page={page}
           />
         </div>
   </div>
}
export default IndexPage;