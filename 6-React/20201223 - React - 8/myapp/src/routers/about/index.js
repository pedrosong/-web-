import { Card } from "antd";
import { useState } from "react";
import Popup from "../../component/popup";
import inner from "./inner";
function AboutPage() {
  const [showPopup,setShowPopup] = useState(false);
  return <div className="view"
     style={{
         background:"yellow"
      }}
  >
    <div className="wrap">
      <Card
        type="inner"
        title="关于我们"
      >
        <div dangerouslySetInnerHTML={{
          __html: inner
        }}></div>
      </Card>
      <button onClick={()=>{
        setShowPopup(true);
      }}>弹窗</button>
      {
        showPopup? <Popup 
          render={(clos)=>{
            return <div>
                <h2>关于我们的弹窗</h2>
                <p>弹窗内容</p>
                <p>弹窗内容</p>
                <p>弹窗内容</p>
                <p>弹窗内容</p>
                <p>弹窗内容</p>
                <p>弹窗内容</p>
                <p>弹窗内容</p>
                <button onClick={()=>{
                  clos();
                }}>关于</button>
            </div>   
          }}
          afterClos={()=>{
            setShowPopup(false);
          }}
      />: ""
      }
     
    </div>
  </div>
}
export default AboutPage;