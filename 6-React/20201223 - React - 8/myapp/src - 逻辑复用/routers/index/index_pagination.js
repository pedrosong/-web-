import { Pagination } from "antd";
import { useHistory } from "react-router-dom";

function IndexPagination(props) {
    const {tab,page} = props;
    const {push} = useHistory();
    return <div className="IndexPagination">
        <Pagination 
            current={Number(page)}
            total={1000}
            pageSize={20}
            showSizeChanger={false}
            onChange={(nextPage)=>{
              push(`/?tab=${tab}&page=${nextPage}`);
            }}
        />
    </div>
}

export default IndexPagination;