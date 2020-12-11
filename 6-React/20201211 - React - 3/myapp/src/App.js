import { Component } from "react";
const data = `<h2>文章标题</h2><p>段落1段落1段落1段落1段落1段落1段落1段落1段落1段落1段落1</p><p>段落2段落2段落2段落2段落2段落2段落2段落2段落2</p>`;
// class App extends Component {
//   render() {
//     return <div ref={(node)=>{
//         node.innerHTML = data;
//     }}>
//     </div>
//   }
// }
class App extends Component {
  render() {
    return <div
      dangerouslySetInnerHTML={{
        __html:data
      }}
    >
    </div>
  }
}

export default App;
