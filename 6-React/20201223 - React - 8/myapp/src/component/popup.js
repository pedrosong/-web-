import { useEffect, useRef, useState } from "react";

//弹窗组件
function Popup(props) {
    const {render,afterClos} = props;
    const [show,setShow] = useState(true);
    const mask = useRef();
    const popup = useRef();
    //关闭弹窗的方法
    const clos = ()=>{
        setShow(false);
    }
    useEffect(()=>{
        if(show){
          popup.current.style.transform = "translateY(0)";
          mask.current.style.opacity = 1;
          console.log(popup);
        } else {
          mask.current.style.opacity = 0;
          popup.current.style.transform ="translateY(-1000px)";
          setTimeout(() => {
            afterClos();
          }, 500);
        }
    },[show])
    return <>
        <div className="mask" ref={mask}></div>
        <div className="popup" ref={popup}>
            {render(clos)}
        </div>
    </>
}

export default Popup;