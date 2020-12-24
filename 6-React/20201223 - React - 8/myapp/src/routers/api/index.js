import { Card } from "antd";
import inner from "./inner";
/*
代码通用：
  1. 功能和视图都相似 --- 封装成一个通用组件，将不一致的内容都通传参来解决
  2. 功能相似，但是视图不一致：
    1. render props
    2. 高阶组件（HOC,HOCs）
    3. hooks
*/
function ApiPage() {
  return <div className="view"
     style={{
         background:"blue"
      }}
  >
    <div className="wrap">
      <Card
        type="inner"
        title="API"
      >
        <div dangerouslySetInnerHTML={{
          __html: inner
        }}></div>
      </Card>
    </div>
  </div>
}
export default ApiPage;