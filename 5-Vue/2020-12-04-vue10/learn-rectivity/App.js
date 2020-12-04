import { reactive } from "./core/reactivity/index.js";
import { h } from "./core/h.js";
export default {
  render(context) {
    // 写死的用 dom api 来创建的元素
    // diff 算出最优的更新策略来？
    // custom renderer -> 非dom
    // vdom
    // const div = document.createElement("div");
    // div.innerText = context.state.count;

    // 怎么把 div 转换成用 vnode 来表示呢？
    // type -> div
    // props attributes -> null
    // children -> count

    // return div;
    // return h(
    //   "div",
    //   {
    //     id: "hello",
    //   },
    //   String(context.state.count)
    // );

    const children = [
      h("p", null, "hello"),
      h("p", null, String(context.state.count)),
    ];
    return h(
      "div",
      {
        id: context.state.idVal,
      },
      context.state.show ? [h("p", null, "show false")] : children
    );
  },

  setup() {
    //ref
    window.state = reactive({
      count: 0,
      idVal: "hello",
      show: true,
    });

    // 对象
    return {
      state,
    };
  },
};
