import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
// 一定注意所有加了 default 的属性，只在组件初始化时执行
/*
封装通用组件
  1. 功能和视图都相似 -- 封装成通用组件，将不一致的地方传参解决
  2. 功能相似但视图不一致 --- hooks/render props/高阶组件
*/
// function Nav() {
//   const {pathname} = useLocation();
//   const getSelectedKey = ()=>{
//       return navs.findIndex(item=>item.to === pathname)
//   };
//   const selectedKey = getSelectedKey();
//   return <Menu
//     mode="horizontal"
//     theme="dark"
//     selectedKeys = {[selectedKey+""]}
//   >
//     {
//       navs.map((item,index)=>{
//           return <Menu.Item key={index}>
//               <Link to={item.to}>{item.title}</Link>
//           </Menu.Item>
//       })
//     }
//   </Menu> 
// }
function Nav(props) {
  const {theme="light",getSelectedKey=(()=>{}),data,...restProps} = props;
  const location = useLocation();
  const selectedKey = getSelectedKey(location);
  return <Menu
    mode="horizontal"
    theme={theme}
    selectedKeys = {[selectedKey+""]}
    {...restProps}
  >
    {
      data.map((item,index)=>{
          return <Menu.Item key={index}>
              <Link to={item.to}>{item.title}</Link>
          </Menu.Item>
      })
    }
  </Menu> 
}
export default Nav;