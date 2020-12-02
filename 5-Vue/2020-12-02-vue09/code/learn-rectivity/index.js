import {
  ref,
  effect,
  ITERATE_KEY,
} from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";

console.log(ref);

// vue -> ref
// 没有区别
// vue -> reactivity 导出的

// watchEffect
// effect -> watchEffect

// 响应式的时候
// 1. 收集依赖
// 2. 触发依赖

// 响应式数据
// let a = ref(10);
// let b;

// // watchEffect
// effect(() => {
//     // 已经收集依赖了
//     // a -> 当前的这个函数
// get -> 收集到的依赖
// 实现原理 下节课
// 手写一个 mini-vue
//   b = a.value + 10;
//   console.log(b)
// });

// a.value = 20
// 当响应式的值 发生变更了
// 触发所有的依赖

const App = {
  // template -> render
  render(context) {
    effect(() => {
      // 构建 UI
      // context 里面的响应式的值 发生变更后
      // vue3 渲染更新的机制
      // 很多问题
      // 这个东西 最核心的

      document.body.innerHTML = ``;
      const div = document.createElement("div");
      div.innerText = context.count.value;

      document.body.append(div);
    });
  },

  setup() {
    window.count = ref(0);

    // 对象
    return {
      count,
    };
  },
};

App.render(App.setup());
