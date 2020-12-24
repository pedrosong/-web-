# React 实战
## 课程内容
CNode 实战

### 基于 Hooks 的异步请求

### 渲染属性(Render Props)
http://react.caibaojian.com.cn/docs/render-props.html
术语 “render prop” 是指一种简单的技术，用于使用一个值为函数的 prop 在 React 组件之间的代码共享。
带有渲染属性(Render Props)的组件需要一个返回 React 元素并调用它的函数，而不是实现自己的渲染逻辑。
```
function Popup(props) {
    const {render,afterClose=()=>{}} = props;
    const [showPopup,setShowPopup] = useState(true);
    const close = ()=>{
      setShowPopup(false);
    };
    const mask = useRef();
    const popup = useRef();
    useEffect(()=>{
      if(showPopup){
        mask.current.style.opacity = 1; 
        popup.current.style.transform = "translateY(0)";
      } else {
        mask.current.style.opacity = 0; 
        popup.current.style.transform = "translateY(-1000px)";
        setTimeout(() => {
          afterClose();
        }, 500);
      }
    },[showPopup]);
    return <>
        <div className="mask" ref={mask}></div>
        <div className="popup" ref={popup}>
            {render(close)}
        </div>
    </>
}
```
### 高阶组件
如果一个函数操作其他函数，即将其他函数作为参数或将函数作为返回值，将其称为高阶函数。高阶组件(high-order component)类似于高阶函数，接收 React 组件作为输入，输出一个新的 React 组件。高阶组件让代码更具有复用性、逻辑性与抽象特征。
https://react.docschina.org/docs/higher-order-components.html
### 路由守卫 navigation-guards
路由跳转前做一些验证，比如登录验证，是网站中的普遍需求。

- 高阶组件版
```React
function Guards(props) { 
    const {isLogin} = useSelector(state=>state);
    const {Cmp,parentProps} = props;
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    if(isLogin){
        return <Cmp {...parentProps}/> 
    }
    dispatch({
      type: "setPrevPath",
      path:pathname
    })
    return <Redirect to="/login" />
}
function guards(Cmp) {
  return (props)=>{
    return <Guards Cmp={Cmp} parentProps={props} />
  }
}
```
- hooks 版
```
function useGuards() {
  const isLogin = useSelector(state=>state.isLogin);
  const {replace} = useHistory();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  if(!isLogin){
    dispatch({
      type: "setPrevPath",
      path:pathname
    });
    replace("/login");
  }
}
```
### 路由按需加载处理
- suspense 和 lazy 进行懒加载设置
```
    const Child = lazy(()=>import("./child"));
    <Suspense fallback={<div>视图请求中</div>} >
        <Child />
    </Suspense>
```    
### 路由动画
http://reactcommunity.org/react-transition-group/
入场动画：
```
function App() {
  return <TransitionGroup
    appear={true}
  >
    <CSSTransition
      classNames={{
        appear: "wrap-appear"
      }}
      timeout={1500}
    >
      <div>
        <Header />
        <IndexRouter />
      </div>
    </CSSTransition>
  </TransitionGroup>
}
```

```
function IndexRouter() {
    let location = useLocation();
    return <div className="main-wrap">
        <TransitionGroup>
            <CSSTransition
                timeout={500}
                key={location.pathname}
                onEnter={(node) => {
                    node.style.transform = "translateX(-100%)";
                }}
                onEntering={(node) => {
                    node.style.transform = "translateX(0)";
                }}
                onExit={(node)=>{
                    node.style.transform = "translateX(0)";
                }}
                onExiting={(node)=>{
                    node.style.transform = "translateX(100%)";
                }}
            >
                <Switch location={location}>
                    {routerList.map(item => {
                        return <Route key={item.name} exact={item.exact} path={item.path} render={item.render} />
                    })}
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </div>
}
```    

### 下节课内容：
移动端事件：
1 - Touch事件
2 - 移动端滑屏幻灯片实现
3 - better-scroll 初使用

### 今天练习
2020/12/25 中午12点半前
任务1：参加直播课，学习时长需>=60%
任务2：
    - 完成 React 相关测试题
    - 本次测试题共计 10 道单项选择题
通过标准：
    正确5道及以上者方可通过



































