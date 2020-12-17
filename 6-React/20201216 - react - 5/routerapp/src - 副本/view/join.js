/*
  路由组件 - 被 Route 调用的组件称之为路由组件
  路由参数 - Route 调用组件时，传过来的参数
   - history 
        length -（数字）历史记录堆栈中的条目数
        action- （字符串）当前动作（PUSH，REPLACE，或POP）
      - 跳转视图
        push(path, [state]) -（功能）将新条目推入历史记录堆栈
        replace(path, [state]) -（函数）替换历史记录堆栈上的当前条目

        go(n)-（函数）通过n条目在历史记录堆栈中移动指针
        goBack() -（功能）等同于 go(-1)
        goForward() -（功能）等同于 go(1)
      location
   - location-（对象）当前位置。可能具有以下属性：
      pathname -（字符串）URL的路径
      search -（字符串）URL查询字符串
      hash -（字符串）URL哈希片段
      state-（对象）特定于位置的状态，例如push(path, state)在将该位置推入堆栈时所提供的状态。仅在浏览器和内存历史记录中可用。
  - match
    params - 动态路由的值
    isExact - 当前是否是可以被精确匹配
    path - 当前的path
    url - 根据当前 path 规则，匹配到的 pathname
*/
function JoinPage(props) {
  const {history} = props;
  console.log(props.location);
  return (
    <div>
      <h1>加入我们</h1>
      <button
        onClick={()=>{
          history.push("/about",{info:123});
        }}
      >跳转至关于</button>
    </div>
  );
}

export default JoinPage;
