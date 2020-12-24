import { Card } from "antd";
import inner from "./inner";
function GetStartPage() {
  return<div className="view"
    style={{
         background:"green"
      }}
  >
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

export default GetStartPage;