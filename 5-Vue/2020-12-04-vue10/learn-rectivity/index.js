import { createApp } from "./core/index.js";
import App from "./App.js";

createApp(App).mount(document.querySelector("#app"));

// import { watchEffect, reactive } from "./core/reactivity/index.js";

// const App = {
//   // template -> render
//   render(context) {
//     watchEffect(() => {
//       // 构建 UI
//       // context 里面的响应式的值 发生变更后
//       // vue3 渲染更新的机制
//       // 很多问题
//       // 这个东西 最核心的
//       // 1. dom -》 canvas
//       //  写死的 直接用的 dom 的 api
//       // 2. 浪费
//       //  1 个节点会更新
//       document.body.innerHTML = ``;
//       const div = document.createElement("div");
//       div.innerText = context.state.count;

//       document.body.append(div);
//     });
//   },

//   setup() {
//     //ref
//     window.state = reactive({
//       count: 0,
//     });

//     // 对象
//     return {
//       state,
//     };
//   },
// };

// App.render(App.setup());
