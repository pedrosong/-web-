import { Component } from "react";
/*
组件间通信
在 React.js 中，数据是从上自下流动（传递）的，也就是一个父组件可以把它的 state / props 通过 props 传递给它的子组件，但是子组件不能修改 props - React.js 是单向数据流，如果子组件需要修改父组件状态（数据），是通过回调函数方式来完成的。
- 父级向子级通信
    把数据添加子组件的属性中，然后子组件中从props属性中，获取父级传递过来的数据
- 子级向父级通信
    在父级中定义相关的数据操作方法(或其他回调), 把该方法传递给子级，在子级中调用该方法父级传递消息    

*/
class Dl extends Component {
  render() {
    let { data, name, openname, changeOpen } = this.props;
    return <dl className={`friend-group ${openname === name? "expanded" : ""}`}>
      <dt onClick={() => {
       changeOpen(openname === name?"":name);
      }}>{data.title}</dt>
      {data.list.map((item, index) => {
        return <dd key={index}>{item.name}</dd>
      })}
    </dl>
  }
}

export default Dl;
