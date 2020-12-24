import { Card } from "antd";
import inner from "./inner";
import withGuards from "../../component/guards";
function GetStartPage() {
  return<div className="view">
  <div className="wrap">
     <Card
        type="inner"
        title="新手入门"
     >
        <div dangerouslySetInnerHTML={{
          __html:inner
        }}></div>
     </Card>
  </div>
</div>
}

export default withGuards(GetStartPage);