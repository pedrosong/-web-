import Nav from "../../component/nav";
import qs from "qs";
const indexNavs = [
  {
    to: "/?tab=all",
    title: "全部"
  }, {
    to: "/?tab=good",
    title: "精华"
  }, {
    to: "/?tab=share",
    title: "分享"
  }, {
    to: "/?tab=ask",
    title: "问答"
  }
];
function IndexNav(props) {
  const {tab} = props;
  return <Nav
    data={indexNavs}
    getSelectedKey={() => {
      return indexNavs.findIndex(item => {
        let { tab: itemTab } = qs.parse(item.to.substr(2));
        return tab === itemTab;
      })
    }}
    theme="light"
  />
}
// function IndexNav() {
//   const {search} = useLocation();
//   const getSelectedKey = ()=>{
//       const {tab="all"} = qs.parse(search.substr(1));
//       return indexNavs.findIndex(item=>{
//           let {tab:itemTab} = qs.parse(item.to.substr(2));
//           console.log(tab,itemTab);
//           return tab === itemTab;
//       })
//   };
//   const selectedKey = getSelectedKey();
//   return <Menu
//     mode="horizontal"
//     theme="light"
//     selectedKeys = {[selectedKey+""]}
//   >
//     {
//       indexNavs.map((item,index)=>{
//           return <Menu.Item key={index}>
//               <Link to={item.to}>{item.title}</Link>
//           </Menu.Item>
//       })
//     }
//   </Menu> 
// }
export default IndexNav;